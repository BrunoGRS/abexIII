import React from "react";
import "./css/Footer.css";

export function Footer() {
  return (
    <footer>
      <div className="footer-container">
        {/* Seção Sobre Nós */}
        <div className="footer-section">
          <h3>Sobre Nós</h3>
          <p>
            Conectamos você aos melhores profissionais de saúde. Atendimento
            rápido, seguro e humanizado para você e sua família.
          </p>
        </div>

        {/* Seção Links Úteis */}
        <div className="footer-section">
          <h3>Links Úteis</h3>
          <ul>
            <li>
              <a href="#">Início</a>
            </li>
            <li>
              <a href="#">Serviços</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Contato</a>
            </li>
          </ul>
        </div>

        {/* Seção Contato */}
        <div className="footer-section">
          <h3>Contato</h3>
          <p>📍 Rua Exemplo, 123 - São Paulo, SP</p>
          <p>📞 (11) 99999-9999</p>
          <p>✉ contato@exemplo.com</p>

          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Rodapé Inferior */}
      <div className="footer-bottom">
        <p>
          &copy; 2025 Todos os direitos reservados |{" "}
          <a href="#">Política de Privacidade</a>
        </p>
      </div>
    </footer>
  );
}
