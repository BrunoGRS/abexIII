import React from "react";
import "./css/Footer.css";
import {
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
} from "react-icons/fa";

export function Footer() {
  return (
    <footer className="footer-novo">
      <div className="footer-topo">
        <div className="logo-social">
          <div className="logo-area">
            <span className="nome-site">IXMed, saúde ao seu alcance</span>
          </div>
          <div className="social-icons">
            <a href="#" className="circle whatsapp">
              <FaWhatsapp />
            </a>
            <a href="#" className="circle instagram">
              <FaInstagram />
            </a>
            <a href="#" className="circle youtube">
              <FaYoutube />
            </a>
            <a href="#" className="circle facebook">
              <FaFacebookF />
            </a>
          </div>
        </div>

        <div className="footer-colunas">
          <div className="coluna">
            <h4>Navegação</h4>
            <ul>
              <li>
                <a href="/">Início</a>
              </li>
              <li>
                <a href="/">Como Funciona</a>
              </li>
              <li>
                <a href="/sou-profissional">Quero Começar</a>
              </li>
              <li>
                <a href="/profissionais">Sou Profissional</a>
              </li>
              <li>
                <a href="/">Contato</a>
              </li>
            </ul>
          </div>

          <div className="coluna">
            <h4>Contato</h4>
            <p>(11) 99999-9999</p>
            <p>contato@ixmed.com.br</p>
            <p>Rua Exemplo, 123 - São Paulo, SP</p>
          </div>

          <div className="coluna">
            <h4>Especialidades</h4>
            <ul>
              <li>Alergologia</li>
              <li>Cardiologia</li>
              <li>Pediatria</li>
              <li>Ginecologia</li>
              <li>
                <a href="/profissionais">Ver mais →</a>
              </li>
            </ul>
          </div>

          <div className="coluna">
            <h4>Links Recomendados</h4>
            <ul>
              <li>
                <a href="#">Ministério da Saúde</a>
              </li>
              <li>
                <a href="#">ANS</a>
              </li>
              <li>
                <a href="#">Código de Ética Médica</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-base">
        <p>
          &copy; {new Date().getFullYear()} IXMed. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
