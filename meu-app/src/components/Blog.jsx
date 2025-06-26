import React, { useState, useEffect } from "react";
import "./css/Blog.css";
import { auth } from "../../Backend/firebaseConfig";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/blog/buscar");
        const data = await response.json();
        const lista = Array.isArray(data.data) ? data.data : [];
        setPosts(lista);
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="section-main">
      <h1 className="blog-title">Blog IXMed 🩺</h1>
      <p className="blog-subtitle">
        Dicas, novidades e conteúdos exclusivos para profissionais da saúde!
      </p>

      <main className="blog-container">
        {posts.length > 0 ? (
          posts.map((pt) => (
            <article key={pt.Id} className="blog-card">
              <div className="blog-content">
                <h2>{pt.S_Titulo}</h2>
                <p>
                  {pt.S_Conteudo.length > 120
                    ? pt.S_Conteudo.substring(0, 120) + "..."
                    : pt.S_Conteudo}
                </p>
                <Link to={`/Blog/${pt.Id}`} id={pt.Id}>
                  Ler artigo completo →
                </Link>
              </div>
            </article>
          ))
        ) : (
          <p className="sem-registro">Nenhum artigo encontrado.</p>
        )}
      </main>
    </section>
  );
};

export default Blog;
