import React, { useState } from "react";
import Logo from "./imgs/logo.png";
import "./css/Navbar.css";
import { Link } from "react-router-dom";
import Login from "./login";

export function Navbar() {
  return (
    <section>
      <style src="./css/Navbar.css"></style>
      <nav className="navbar">
        <div className="logo">
          <img src={Logo} />
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Como Funciona</Link>
          </li>
          <li>
            <Link to="/profissionais">Achar um profissional</Link>
          </li>
          <li>
            <Link to="/Blog">Blog</Link>
          </li>
          <li>
            <Link to="/sou-profissional">Sou profissional</Link>
          </li>
        </ul>
        <Login />
      </nav>
    </section>
  );
}
