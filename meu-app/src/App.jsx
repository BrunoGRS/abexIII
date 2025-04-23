import React from "react";
import { Body } from "./components/Body.jsx";
import Listagem from "./components/Listagem.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Forms } from "./components/Forms.jsx";

export function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/profissionais" element={<Listagem />} />
        <Route path="/sou-profissional" element={<Forms />}></Route>
      </Routes>
    </Router>
  );
}
