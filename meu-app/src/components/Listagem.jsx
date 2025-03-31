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
        const data = await response.json();
        const listaProfissionais = Array.isArray(data.msg) ? data.msg : [];
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
      return (
        !filtroNome ||
        prof.S_Nome_Profissional.toLowerCase().includes(
          filtroNome.toLowerCase()
        ) /* &&
        (!filtroEspecialidade ||
          prof.S_Especialidade.toLowerCase().includes(
            filtroEspecialidade.toLowerCase()
          ))*/
      );
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
            placeholder="Buscar por especialidade"
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
