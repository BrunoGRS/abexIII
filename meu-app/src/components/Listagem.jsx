import { use, useEffect, useState } from "react";
import "./css/Listagem.css";
import { ckb, ptBR } from "date-fns/locale";
import { format, addDays, isSameDay, isBefore, startOfDay } from "date-fns";
import { auth } from "../../Backend/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Listagem = () => {
  const [profissionais, setProfissionais] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroEspecialidade, setFiltroEspecialidade] = useState("");
  const [resultados, setResultados] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [visibleDaysCount] = useState(1);
  const [agendamentos, setAgendamentos] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState({});
  const [id, setId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [profAgendar, setProfAgendar] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  const indiceInicio = (paginaAtual - 1) * itensPorPagina;
  const indiceFim = indiceInicio + itensPorPagina;
  const profissionaisPaginados = profissionais.slice(indiceInicio, indiceFim);
  const totalPaginas = Math.ceil(profissionais.length / itensPorPagina);

  const generateDays = (start = startDate, numDays = visibleDaysCount) => {
    const today = startOfDay(new Date());
    const startDay = startOfDay(start);
    const baseDate = isBefore(startDay, today) ? today : startDay;

    const days = [];
    for (let i = 0; i < numDays; i++) {
      const date = addDays(baseDate, i);
      days.push({
        date,
        label: getDayLabel(date, i),
        formatted: format(date, "dd MMM", { locale: ptBR }),
        dayOfWeek: format(date, "EEE", { locale: ptBR }),
        times: getAvailableTimes(),
      });
    }
    return days;
  };

  const getDayLabel = (date, index) => {
    const today = new Date();
    if (index === 0 && isSameDay(date, today)) return "Hoje";
    if (index === 1 && isSameDay(date, addDays(today, 1))) return "Amanhã";
    return format(date, "EEE", { locale: ptBR });
  };

  const getAvailableTimes = () => {
    const times = [];
    for (let hour = 8; hour <= 18; hour++) {
      times.push(`${String(hour).padStart(2, "0")}:00`);
      if (hour < 18) times.push(`${String(hour).padStart(2, "0")}:30`);
    }
    return times;
  };

  const days = generateDays();

  useEffect(() => {
    const fetchProfissionais = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/profissional/buscar"
        );
        const inf = await response.json();
        const listaProfissionais = Array.isArray(inf.data) ? inf.data : [];
        setProfissionais(listaProfissionais);
        setResultados(listaProfissionais);
      } catch (error) {
        console.log("Erro ao trazer profissionais", error);
      }
    };

    fetchProfissionais();
  }, []);

  const filtrarProfissionais = () => {
    const filtrados = profissionais.filter((prof) => {
      const nomeCondicao =
        !filtroNome ||
        prof.S_Nome_Profissional.toLowerCase().includes(
          filtroNome.toLowerCase()
        );
      const especialidadeCondicao =
        !filtroEspecialidade ||
        prof.S_Descricao_Especialidade?.toLowerCase().includes(
          filtroEspecialidade.toLowerCase()
        );
      return nomeCondicao && especialidadeCondicao;
    });
    setResultados(filtrados);
  };

  const handleSlotSelection = (profId, date, time) => {
    setSelectedSlots({
      ...selectedSlots,
      [profId]: { date, time },
    });
  };

  const openModal = (prof) => {
    if (auth.currentUser) {
      const slot = selectedSlots[prof.id];
      if (!slot) return toast.error(`Selecione um horário!`);
      setProfAgendar(prof);
      setShowModal(true);
    } else {
      toast.error(`Precisa estar logado para Agendar.`);
    }
  };

  const agendarConsulta = async (id, idUsuario, data, hora) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/agendamento/agendar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            I_Id_Profissional: id,
            I_Id_Usuario: idUsuario,
            D_Data_Agenda: data,
            T_Hora_Agenda: hora,
          }),
        }
      );

      response.status != 201
        ? toast.error(`Erro ao agendar! Erro: ${error}`)
        : toast.success("Agendamento realizado!");
    } catch (error) {
      throw new Error(toast.error(`Erro ao agendar! Data já agendada`));
    }
  };

  const confirmarAgendamento = () => {
    const prof = profAgendar;
    const slot = selectedSlots[prof.id];
    const user = auth.currentUser;

    if (auth.currentUser) {
      setAgendamentos([...agendamentos, { prof, ...slot }]);
      console.log(prof.Id);
      agendarConsulta(
        prof.Id,
        user.uid,
        format(slot.date, "dd/MM/yyyy"),
        slot.time
      );
    } else {
      toast.error("Erro ao enviar formulário!");
    }

    setShowModal(false);
    setProfAgendar(null);
  };

  return (
    <section>
      <div className="container">
        <div className="filtros">
          <input
            type="text"
            placeholder="Buscar por nome"
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Buscar por Especialidade"
            value={filtroEspecialidade}
            onChange={(e) => setFiltroEspecialidade(e.target.value)}
          />
          <button onClick={filtrarProfissionais}>Buscar</button>
        </div>
      </div>

      {profissionaisPaginados.map((prof) => (
        <div className="container" key={prof.id}>
          <div className="card">
            <div className="info-profissional">
              <h3>{prof.S_Nome_Profissional}</h3>
              <p>Email: {prof.S_Email}</p>
              <p>Telefone: {prof.S_Telefone || "Não informado"}</p>
              <p className="especialidade">
                Especialidade:{" "}
                {prof.S_Descricao_Especialidade || "Não Informado"}
              </p>
              <div className="whatsapp-container">
                <a
                  href={`https://api.whatsapp.com/send?phone=5549998316596&text=Olá!%20Encontrei%20seu%20perfil%20na IXMed%20e%20gostaria%20de%20mais%20informações.`}
                  target="_blank"
                  rel="noreferrer"
                  className="whatsapp-button"
                >
                  WhatsApp!
                </a>
              </div>
            </div>

            <div className="container-agenda">
              <div className="agenda-header">
                <button
                  className="arrow-button"
                  onClick={() =>
                    setStartDate(addDays(startDate, -visibleDaysCount))
                  }
                >
                  &lt;
                </button>
                <button
                  className="arrow-button"
                  onClick={() =>
                    setStartDate(addDays(startDate, visibleDaysCount))
                  }
                >
                  &gt;
                </button>
              </div>

              {days.map((day) => (
                <div key={day.formatted} className="dia-agenda">
                  <h4>
                    {day.label} - {day.formatted}
                  </h4>
                  <div className="horarios">
                    {day.times.map((time) => (
                      <button
                        key={time}
                        className={`horario-btn ${
                          selectedSlots[prof.id]?.date === day.date &&
                          selectedSlots[prof.id]?.time === time
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          handleSlotSelection(prof.id, day.date, time)
                        }
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button className="agendar-btn" onClick={() => openModal(prof)}>
                Agendar
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Modal de confirmação */}
      {showModal && profAgendar && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>
              Confirmar agendamento com {profAgendar.S_Nome_Profissional} em{" "}
              {format(selectedSlots[profAgendar.id].date, "dd/MM/yyyy")} às{" "}
              {selectedSlots[profAgendar.id].time}?
            </p>
            <button onClick={confirmarAgendamento}>Confirmar</button>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {profissionais.length > itensPorPagina && (
        <div className="paginacao">
          <button
            onClick={() => setPaginaAtual(paginaAtual - 1)}
            disabled={paginaAtual === 1}
          >
            Anterior
          </button>

          <span style={{ margin: "0 10px" }}>
            {paginaAtual} de {totalPaginas}
          </span>

          <button
            onClick={() => setPaginaAtual(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
          >
            Próxima
          </button>
        </div>
      )}

      <ToastContainer />
    </section>
  );
};

export default Listagem;
