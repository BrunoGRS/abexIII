import React from "react";
import { auth } from "../../Backend/firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./css/MeusDados.css";

const MeusDados = (props) => {
  const user = auth.currentUser;
  const nav = useNavigate();
  let data = new Date(user.metadata.lastSignInTime);
  let dataFinal = data.toLocaleString("pt-BR");

  const backPage = () => {
    nav("/");
  };

  return (
    <section>
      <div class="container-meus-dados">
        <h2>Meus Dados</h2>

        <div class="user-info">
          {user && user.photoURL ? (
            <img src={user.photoURL} width="100" height="100" />
          ) : (
            (<img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              width="150"
              height="150"
              alt="Foto padrão"
            />)("")
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
    </section>
  );
};

export default MeusDados;
