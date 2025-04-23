import { auth } from "../../Backend/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/Login.css";
import { useState } from "react";
import Logado from "./Logado";

const Login = () => {
  const [logado, setlogado] = useState(false);

  const login = async () => {
    const provedor = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provedor);
    } catch (error) {
      toast.error("Erro ao logar via Google.");
      console.log(error);
    }

    setlogado(true);
  };

  return (
    <div>
      {logado ? (
        <Logado />
      ) : (
        <button className="botao-login" onClick={login}>
          Logar
        </button>
      )}
    </div>
  );
};

export default Login;
