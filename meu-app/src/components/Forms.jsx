import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/css/Forms.css";

export function Forms() {
  const [showForm, setShowForm] = useState(false);
  const [forms, setForms] = useState({
    S_Nome_Profissional: "",
    S_Email: "",
    S_Telefone: "",
    S_Cod_Registro: "",
    Especialidade: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForms((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !forms.S_Nome_Profissional ||
      !forms.S_Email ||
      !forms.S_Telefone ||
      !forms.Especialidade ||
      !forms.S_Cod_Registro
    ) {
      toast.warn("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

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

      if (response.status === 201) {
        toast.success("✅ Pré-cadastro enviado com sucesso!");
        setForms({
          S_Nome_Profissional: "",
          S_Email: "",
          S_Telefone: "",
          S_Cod_Registro: "",
          Especialidade: "",
        });
        setShowForm(false);
      } else {
        toast.error("❌ Erro ao enviar o formulário. Tente novamente.");
      }
    } catch (error) {
      toast.error("❌ Erro na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form-section">
      <div className="presentation-container">
        <h1>Seja um Profissional Parceiro!</h1>
        <p>
          Estamos em busca de profissionais de saúde que desejam fazer parte do
          nosso portal. Ao se cadastrar, suas informações passarão por uma
          análise e, após validação, seu perfil será divulgado para milhares de
          pacientes.
        </p>
        <ul>
          <li>✅ Maior visibilidade para seus serviços</li>
          <li>✅ Facilidade de agendamentos</li>
          <li>✅ Participação em campanhas do portal</li>
        </ul>

        {!showForm && (
          <button className="open-form-btn" onClick={() => setShowForm(true)}>
            Quero me Cadastrar
          </button>
        )}
      </div>

      {showForm && (
        <div className="form-container">
          <h2>Pré-Cadastro de Profissional</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Nome Completo</label>
              <input
                type="text"
                name="S_Nome_Profissional"
                placeholder="Ex: Dr. João Silva"
                value={forms.S_Nome_Profissional}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="S_Email"
                placeholder="exemplo@dominio.com"
                value={forms.S_Email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Telefone</label>
              <input
                type="tel"
                name="S_Telefone"
                placeholder="(XX) XXXXX-XXXX"
                value={forms.S_Telefone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Especialidade</label>
              <input
                type="text"
                name="Especialidade"
                placeholder="Ex: Cardiologia, Pediatria..."
                value={forms.Especialidade}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Código da Especialidade</label>
              <input
                type="text"
                name="S_Cod_Registro"
                placeholder="Ex: CRM 12345"
                value={forms.S_Cod_Registro}
                onChange={handleChange}
                required
              />
            </div>

            <label className="checkbox-container">
              <input type="checkbox" required />
              <span>
                Aceito compartilhar meus dados com o portal para uso exclusivo.
              </span>
            </label>

            <button
              type="submit"
              className={`submit-btn ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Enviando..." : "Cadastrar"}
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </section>
  );
}
