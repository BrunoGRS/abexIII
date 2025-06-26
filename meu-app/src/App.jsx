import { React, useState } from "react";
import { Body } from "./components/Body.jsx";
import Listagem from "./components/Listagem.jsx";
import Login from "./components/login.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Forms } from "./components/Forms.jsx";
import MeusDados from "./components/MeusDados.jsx";
import Blog from "./components/Blog.jsx";
import Blog_Id from "./components/Blog_Id.jsx";

export function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/profissionais" element={<Listagem />} />
        <Route path="/sou-profissional" element={<Forms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/meus-dados" element={<MeusDados />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<Blog_Id />} />
      </Routes>
    </Router>
  );
}
