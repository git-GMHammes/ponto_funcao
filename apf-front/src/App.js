import React, { useState } from "react";
import "./App.css";

import ImportarContagem from "./Components/importarContagem/ImportarContagem";
import CriarProjeto from "./Components/criarProjeto/CriarProjeto";

const App = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleMenuClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div className="app">
      <nav id="navbar">
        <div className="nav-logo-container">
          <h1>Sistema de Contagem de Pontos de Função</h1>
        </div>
        <div className="navbar-links-container">
          <div className="navbar-links">
            <a href="#criarProjeto" onClick={() => handleMenuClick("criarProjeto")} role="button">CRIAR NOVO PROJETO</a>
            <a href="#importar" onClick={() => handleMenuClick("importar")} role="button">IMPORTAR</a>
          </div>
        </div>
      </nav>
      <main className="main-content">
        {activeComponent === "criarProjeto" && <CriarProjeto />}
        {activeComponent === "importar" && <ImportarContagem />}
      </main>
    </div>
  );
};

export default App;