import React, { useEffect, useState } from "react";
import { auth } from "../../Backend/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./css/MeusDados.css";
import { toast, ToastContainer } from "react-toastify";
import { format } from "date-fns";

const MeusDados = (props) => {
  const [agendamento, setAgendamentos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [agendaParaExcluir, setAgendaParaExcluir] = useState(null);
  const itensPorPagina = 2;

  const user = auth.currentUser;
  const nav = useNavigate();
  let data = new Date(user.metadata.lastSignInTime);
  let dataFinal = data.toLocaleString("pt-BR");

  const backPage = () => {
    nav("/");
  };

  const abrirModalExcluir = (agenda) => {
    setAgendaParaExcluir(agenda);
    setShowModalExcluir(true);
  };

  // Função para confirmar exclusão
  const confirmarExcluir = async () => {
    if (!agendaParaExcluir) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/agendamento/excluir/${agendaParaExcluir.Id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setAgendamentos((prev) =>
          prev.filter((item) => item.Id !== agendaParaExcluir.Id)
        );
        toast.success("Agendamento excluído com sucesso!");
      } else {
        toast.error("Erro ao excluir o agendamento.");
      }
    } catch (error) {
      console.error("Erro ao excluir agendamento:", error);
      toast.error("Erro ao excluir o agendamento.");
    } finally {
      setShowModalExcluir(false);
      setAgendaParaExcluir(null);
    }
  };

  useEffect(() => {
    const agendamentos = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/agendamento/buscar/${user.uid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const inf = await response.json();
        const listaAgendamentos = Array.isArray(inf.data) ? inf.data : [];
        setAgendamentos(listaAgendamentos);
      } catch (error) {
        console.log("Erro ao trazer agendamentos", error);
      }
    };
    agendamentos();
  }, []);

  const indiceInicio = (paginaAtual - 1) * itensPorPagina;
  const indiceFim = indiceInicio + itensPorPagina;
  const agendamentosPaginados = agendamento.slice(indiceInicio, indiceFim);
  const totalPaginas = Math.ceil(agendamento.length / itensPorPagina);

  return (
    <section>
      <div className="container-meus-dados">
        <h2>Meus Dados</h2>

        <div className="user-info">
          {user && user.photoURL ? (
            <img src={user.photoURL} width="100" height="100" />
          ) : (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              width="150"
              height="150"
              alt="Foto padrão"
            />
          )}

          <label>Nome:</label>
          <p id="nomeUsuario">{user.displayName}</p>

          <label>Email:</label>
          <p id="emailUsuario">{user.email}</p>

          <label>Telefone:</label>
          <p id="telefoneUsuario">
            {user.phoneNumber ? user.phoneNumber : "Não Informado"}
          </p>

          <label>Último Login:</label>
          <p id="ultimoLogin">{dataFinal}</p>
        </div>

        <div className="backPage">
          <button className="button-back" onClick={backPage}>
            Voltar
          </button>
        </div>
      </div>

      <div className="agendamento-wrapper">
        <div className="container-meus-dados">
          <h3>Agendamentos</h3>

          {agendamentosPaginados.map((agenda) => (
            <div key={agenda.Id} className="agenda-card">
              <div className="info-agenda">
                <p>
                  <strong>Profissional:</strong> {agenda.S_Nome_Profissional}
                </p>
                <p>
                  <strong>Email:</strong> {agenda.S_Email || "Não informado"}
                </p>
                <p>
                  <strong>Telefone:</strong>{" "}
                  {agenda.S_Telefone || "Não informado"}
                </p>
                <p>
                  <strong>Dia:</strong>{" "}
                  {agenda.D_Data_Agenda || "Não informado"}
                </p>
                <p>
                  <strong>Hora:</strong>{" "}
                  {agenda.T_Hora_Agenda || "Não informado"}
                </p>
                <button
                  className="btn-excluir"
                  onClick={() => abrirModalExcluir(agenda)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}

          {/* Controles de paginação */}
          {agendamento.length > itensPorPagina && (
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
        </div>
      </div>
      {/* Modal de confirmação de exclusão */}
      {showModalExcluir && agendaParaExcluir && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>
              Confirmar exclusão do agendamento com{" "}
              <strong>{agendaParaExcluir.S_Nome_Profissional}</strong> no dia{" "}
              <strong>
                {format(
                  new Date(agendaParaExcluir.D_Data_Agenda),
                  "dd/MM/yyyy"
                )}
              </strong>{" "}
              às <strong>{agendaParaExcluir.T_Hora_Agenda}</strong>?
            </p>
            <button className="btn-confirm" onClick={confirmarExcluir}>
              Confirmar
            </button>
            <button
              className="btn-cancel"
              onClick={() => {
                setShowModalExcluir(false);
                setAgendaParaExcluir(null);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </section>
  );
};

export default MeusDados;
