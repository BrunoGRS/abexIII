import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/css/Forms.css";

export function Forms() {
  const [forms, setForms] = useState({
    S_Nome_Profissional: "",
    S_Email: "",
    S_Telefone: "",
    S_Cod_Registro: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForms((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const dados = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/profissional/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(forms),
        }
      );

      console.log(response.status);
      if (response.status != 201) {
        toast.error(`Erro ao enviar formulário! Erro: ${error}`);
      } else {
        toast.success("Informações enviadas para o pré-cadastro.");
      }
    } catch (error) {
      throw new Error(toast.error(`Erro ao enviar formulário!`));
    }
  };

  return (
    <section
      style={{
        backgroundColor: "#d9ebf8",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <style src="./css/Forms.css" />
      <div class="form-container">
        <h2>Pré cadastro de Profissional</h2>
        <form onSubmit={dados}>
          <div class="input-group">
            <label>Nome Completo</label>
            <input
              type="text"
              name="S_Nome_Profissional"
              value={forms.S_Nome_Profissional}
              onChange={handleChange}
              required
            />
          </div>
          <div class="input-group">
            <label>Email</label>
            <input
              type="email"
              name="S_Email"
              value={forms.S_Email}
              onChange={handleChange}
              required
            />
          </div>
          <div class="input-group">
            <label>Telefone</label>
            <input
              type="tel"
              name="S_Telefone"
              value={forms.S_Telefone}
              onChange={handleChange}
              equired
            />
          </div>
          <div class="input-group">
            <label>Especialidade</label>
            <input type="text" name="especialidade" required />
          </div>
          <div class="input-group">
            <label>Código Especialidade</label>
            <input
              type="text"
              name="S_Cod_Registro"
              value={forms.S_Cod_Registro}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" class="submit-btn">
            Cadastrar
          </button>
          <label className="checkbox-container">
            <input type="checkbox" required />
            <span>
              Aceito compartilhar meus dados com o portal para uso exclusivo no
              mesmo.
            </span>
          </label>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
}
