import React, { useState } from "react";
import Logo from "./imgs/logo.png";
import "./css/Navbar.css";
import { Link } from "react-router-dom";

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
            <a>Como funciona</a>
          </li>
          <li>
            <Link to="/profissionais">Achar um profissional</Link>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Quem somos</a>
          </li>
        </ul>
      </nav>
    </section>
  );
}
