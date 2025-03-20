import React from "react";
import "./css/Footer.css";

export function Footer(props) {
  return (
    <footer>
      <style src="./css/Footer.css" />
      <div class="footer-container">
        <div class="footer-section">
          <h3>Sobre Nós</h3>
          <p>
            Oferecemos os melhores <br></br> serviços de saúde para<br></br>{" "}
            você e sua família.
          </p>
        </div>
        <div class="footer-section">
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
        <div class="footer-section">
          <h3>Contato</h3>
          <p>📍 Rua Exemplo, 123, São Paulo - SP</p>
          <p>📞 (11) 99999-9999</p>
          <p>✉ contato@exemplo.com</p>
          <div class="social-icons">
            <a href="#">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i class="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>
          &copy; 2025 Todos os direitos reservados |{" "}
          <a href="#">Política de Privacidade</a>
        </p>
      </div>
    </footer>
  );
}
