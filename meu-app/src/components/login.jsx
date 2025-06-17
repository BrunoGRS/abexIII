import { auth } from "../../Backend/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/Login.css";
import { useState, useEffect } from "react";
import Logado from "./Logado";

const Login = () => {
  const [logado, setlogado] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setlogado(true);
    }
  }, []);

  const validarUsuario = async (user) => {
    try {
      const user = auth.currentUser;

      const response = await fetch(
        "http://localhost:3000/api/usuario/validar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Id: user.uid,
            S_Nome_Usuario: user.displayName,
            S_Email: user.email,
          }),
        }
      );

      console.log(response.status);
      if (response.status != 200) {
        const responseUser = await fetch(
          "http://localhost:3000/api/usuario/criar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Id: user.uid,
              S_Nome_Usuario: user.displayName,
              S_Email: user.email,
            }),
          }
        );
        if (responseUser === 201) {
          console.log("deu certo");
        }
      } else {
        console.log("caiu aqui");
      }
    } catch (error) {}
  };

  const login = async () => {
    const provedor = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provedor);
      const usuario = result.user;

      localStorage.setItem("user", JSON.stringify(auth));

      setlogado(true);
      setUser(true);
      await validarUsuario(usuario);
    } catch (error) {
      toast.error("Erro ao logar via Google.");
      console.log(error);
    }
  };

  return (
    <div>
      {logado ? (
        <Logado logado={logado} setlogado={setlogado} />
      ) : (
        <button className="botao-login" onClick={login}>
          Logar
        </button>
      )}
    </div>
  );
};

export default Login;
