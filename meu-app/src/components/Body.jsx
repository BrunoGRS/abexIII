import React, { useEffect, useState } from "react";
import { Footer } from "./Footer.jsx";
import "./css/Body.css";
import Profissionais from "./imgs/profissionais.jpg";
import Terapeuta from "./imgs/terapeuta.jpg";
import { Link } from "react-router-dom";

export function Body() {
  /*useEffect(()=>{
        setMostrarForm(true)
    }, []);*/ //mudar algo baseado em algum valor

  const [vbForms, setForms] = useState(false);

  return (
    <section>
      <style src="./css/Body.css" />
      <section className="inicio">
        <div className="imagem-prof">
          <img className="prof" src={Profissionais}></img>
          <h2>Profissionais de Saúde Online</h2>
          <p>Ache sua solucação Agora!</p>
          <Link to="/profissionais">
            <button className="btn">Encontrar!</button>
          </Link>
        </div>
      </section>
      <section className="about-us">
        <div class="about-text">
          <h2>Sobre Nós</h2>
          <p>
            Nossa plataforma foi desenvolvida para garantir acesso a médicos,
            psicólogos, fisioterapeutas e outros profissionais
            capacitados,proporcionando um atendimento de qualidade e acessível.
          </p>
        </div>
        <div className="foto">
          <img src={Terapeuta} className="foto-terapeuta" />
        </div>
      </section>
      <section className="how-works">
        <div className="how-works-title">
          <h2>
            <span class="highlight">Como funciona nosso atendimento?</span>
          </h2>
        </div>
        <div className="how-works-text">
          <p>
            O site de atendimento facilita a interação entre{" "}
            <span class="highlight-cliente">clientes</span> e{" "}
            <span class="highlight-prestador">prestadores de serviços</span>,
            oferecendo cadastro e agendamento online. O sistema conta com
            recursos de busca, filtros e avaliações para otimizar a escolha do
            profissional!
          </p>
        </div>
      </section>
      <Footer />
    </section>
  );
}
