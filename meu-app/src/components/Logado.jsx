import { React, useState, useEffect, useRef } from "react";
import "./css/Logado.css";
import { signOut } from "firebase/auth";
import { auth } from "../../Backend/firebaseConfig";
import { Link } from "react-router-dom";

const Logado = (props) => {
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);
  const user = auth.currentUser;

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
    signOut(auth)
      .then(() => {
        props.setlogado(false);
        localStorage.removeItem("user");
      })
      .catch((error) => {
        console.error("Erro ao deslogar:", error);
      });
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
            <Link to="/meus-dados" auth={auth}>
              Meus Dados
            </Link>
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
