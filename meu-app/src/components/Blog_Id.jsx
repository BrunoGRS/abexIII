import React, { useState, useEffect } from "react";
import "./css/Blog_Id.css";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

const BlogPostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/blog/ler/${id}`
        );
        const data = await response.json();

        if (data.data && data.data.length > 0) {
          setPost(data.data[0]);
        }
      } catch (error) {
        console.error("Erro ao buscar post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <p className="loading">Carregando artigo...</p>;
  }

  return (
    <section className="post-section">
      <div className="post-container">
        <h1 className="post-title">{post.S_Titulo}</h1>
        <p className="post-date">
          Publicado em: {new Date(post.D_CreateAt).toLocaleDateString("pt-BR")}
        </p>

        <div className="post-content">
          {post.S_Conteudo.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <p className="post-date">
          Escrito por: <b>{post.S_Nome_Usuario}</b>
        </p>

        <Link to="/blog" className="back-link">
          ← Voltar para o Blog
        </Link>
      </div>
    </section>
  );
};

export default BlogPostDetail;
