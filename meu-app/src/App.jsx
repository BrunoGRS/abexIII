import React, { useState } from "react";
import { Header } from "./components/Header.jsx";
import { Body } from "./components/Body.jsx";

export function App() {
  //ter o nome da função igual o nome do arquivo //exportar a função para se utilizar em outros arquivos

  const [num, setNum] = useState(10);

  return (
    <>
      <Header />
      <Body />
    </>
  );
}
