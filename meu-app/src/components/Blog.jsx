import { React, useState } from "react";
import "./css/Blog.css";
import { auth } from "../../Backend/firebaseConfig";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <section className="section-main">
      <h2>Blog IXMed!</h2>
      <div className="button-adm">
        <button>Sou ADM!</button>
      </div>

      <main class="blog-container">
        <article class="blog-card">
          <img src="https://plus.unsplash.com/premium_photo-1725075086636-b996a2d07782?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <div class="blog-content">
            <a href="#">Ler artigo</a>
            <h2>Como cuidar da sua saúde mental</h2>
            <p>
              Descubra estratégias simples para manter sua mente equilibrada no
              dia a dia.
            </p>
          </div>
        </article>

        <article class="blog-card">
          <img
            src="https://plus.unsplash.com/premium_photo-1725075086636-b996a2d07782?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Imagem artigo"
          />
          <div class="blog-content">
            <a href="#">Ler artigo</a>
            <h2>O impacto das redes sociais no emocional</h2>
            <p>
              Saiba como o uso excessivo das redes sociais pode afetar seu
              bem-estar emocional.
            </p>
          </div>
        </article>

        <article class="blog-card">
          <img
            src="https://plus.unsplash.com/premium_photo-1725075086636-b996a2d07782?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Imagem artigo"
          />
          <div class="blog-content">
            <a href="#">Ler artigo</a>
            <h2>Dicas para melhorar seu sono</h2>
            <p>
              Melhore sua qualidade de vida dormindo melhor com essas dicas
              práticas.
            </p>
          </div>
        </article>

        <article class="blog-card">
          <img
            src="https://plus.unsplash.com/premium_photo-1725075086636-b996a2d07782?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Imagem artigo"
          />
          <div class="blog-content">
            <a href="#">Ler artigo</a>
            <h2>Dicas para melhorar seu sono</h2>
            <p>
              Melhore sua qualidade de vida dormindo melhor com essas dicas
              práticas.
            </p>
          </div>
        </article>
      </main>
    </section>
  );
};

export default Blog;
