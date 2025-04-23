import { React, useState, useEffect, useRef } from "react";
import "./css/Logado.css";
import { Link } from "react-router-dom";
import Login from "./login";

const Logado = (props) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuAberto((prev) => !prev);
  };

  // Fechar o menu se clicar fora
  useEffect(() => {
    const handleClickFora = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAberto(false);
      }
    };

    document.addEventListener("click", handleClickFora);
    return () => {
      document.removeEventListener("click", handleClickFora);
    };
  }, []);

  const backLogin = () => {
    return <Logado />;
  };

  return (
    <div class="user-menu" ref={menuRef}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
        class="user-icon"
        id="userIcon"
        alt="Usuário"
        onClick={toggleMenu}
      />

      {menuAberto && (
        <ul className="dropdown" id="dropdownMenu">
          <li>
            <a href="#">Meus dados</a>
          </li>
          <li>
            <a href="#">Agendas</a>
          </li>
          <li>
            <button onClick={backLogin}>Sair</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Logado;
