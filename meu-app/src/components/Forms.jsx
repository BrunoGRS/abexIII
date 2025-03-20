import React from "react";
import "../components/css/Forms.css";

export function Forms() {
  return (
    <section>
      <style src="./css/Forms.css" />
      <div class="form-container">
        <h2>Cadastro de Profissional</h2>
        <form>
          <div class="input-group">
            <input type="text" required />
            <label>Nome Completo</label>
          </div>
          <div class="input-group">
            <input type="email" required />
            <label>Email</label>
          </div>
          <div class="input-group">
            <input type="tel" required />
            <label>Telefone</label>
          </div>
          <div class="input-group">
            <input type="text" required />
            <label>Especialidade</label>
          </div>
          <button type="submit" class="submit-btn">
            Cadastrar
          </button>
        </form>
      </div>
    </section>
  );
}
