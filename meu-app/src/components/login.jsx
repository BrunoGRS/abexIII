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

  const login = async () => {
    const provedor = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provedor);

      localStorage.setItem("user", JSON.stringify(auth));

      setlogado(true);
      setUser(true);
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
