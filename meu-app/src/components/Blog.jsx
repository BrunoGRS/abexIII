import { React, useState, useEffect } from "react";
import "./css/Blog.css";
import { auth } from "../../Backend/firebaseConfig";
import { Link } from "react-router-dom";

const Blog = () => {
  const [post, setPost] = useState([]);
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/blog/buscar");
        const inf = await response.json();
        const listaBlog = Array.isArray(inf.data) ? inf.data : [];
        setPost(listaBlog);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  return (
    <section className="section-main">
      <h2>Blog IXMed!</h2>
      <div className="button-adm">
        <button>Sou ADM!</button>
      </div>
      <main class="blog-container">
        {post.length > 0
          ? post.map((pt) => (
              <article class="blog-card">
                <img src="https://plus.unsplash.com/premium_photo-1725075086636-b996a2d07782?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <div class="blog-content">
                  <a href="#">Ler artigo</a>
                  <h2>{pt.S_Titulo}</h2>
                  <p>{pt.S_Conteudo}</p>
                </div>
              </article>
            ))
          : "Sem registro"}
      </main>
    </section>
  );
};

export default Blog;
