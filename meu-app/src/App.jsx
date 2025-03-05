import React from "react";
import Logo from './components/imgs/react.png'
import Banner from './components/imgs/banner.jpg'

export function App(){//ter o nome da função igual o nome do arquivo //exportar a função para se utilizar em outros arquivos

 const canal = () =>{
  return 'Curso de React'
 }

  return(
  <>
  <p>{canal()}: <img src={Logo}/></p>
  </>
  )

};
