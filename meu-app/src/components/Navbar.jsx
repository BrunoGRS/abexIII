import React, { useState } from "react";
import Logo from "./imgs/logo.png";
import "./css/Navbar.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Forms } from "./Forms.jsx";

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
            <a href="#">Achar um profissional</a>
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
