import { useEffect, useState } from "react";
import "./css/Listagem.css"; // Importando o CSS

const Listagem = () => {
  const [profissionais, setProfissionais] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroEspecialidade, setFiltroEspecialidade] = useState("");
  const [resultados, setResultados] = useState([]);

  // Buscar profissionais na API
  useEffect(() => {
    const fetchProfissionais = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/profissional/buscar"
        );
        const inf = await response.json();
        const listaProfissionais = Array.isArray(inf.data) ? inf.data : [];
        setProfissionais(listaProfissionais);
        setResultados(listaProfissionais); // Atualiza os resultados iniciais
      } catch (error) {
        console.log("Erro ao trazer profissionais", error);
      }
    };

    fetchProfissionais();
  }, []);

  // Função para filtrar os profissionais
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
          filtroEspecialidade.toLowerCase() // valida se tem descrição, se não tem, não conta para o filtro
        );

      return nomeCondicao && especialidadeCondicao; // Ambos os filtros são aplicados corretamente
    });

    setResultados(filtrados);
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

      <div className="container">
        {resultados.length > 0 ? (
          resultados.map((prof) => (
            <div key={prof.id} className="card">
              <h3>{prof.S_Nome_Profissional}</h3>
              <p>Email: {prof.S_Email}</p>
              <p>Telefone: {prof.S_Telefone || "Não informado"}</p>
              <p className="especialidade">
                Especialidade:{" "}
                {prof.S_Descricao_Especialidade || "Não Informado"}
              </p>
              <div className="whatsapp-container">
                <a
                  href="https://api.whatsapp.com/send?phone=5549998316596&text=Olá!%20Encontrei%20seu%20perfil%20na IXMed%20e%20gostaria%20de%20mais%20informações."
                  target="_blank"
                  rel="noreferrer"
                  className="whatsapp-button"
                >
                  WhatsApp!
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum profissional encontrado.</p>
        )}
      </div>
    </section>
  );
};

export default Listagem;
