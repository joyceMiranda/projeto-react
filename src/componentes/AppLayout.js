import React from "react";
import { Outlet } from "react-router-dom"; // Isso renderiza o conteúdo das rotas filhas
import TelaMenu from "./TelaMenu";
import TelaRodape from "./TelaRodape";

const AppLayout = () => {
  return (
    <div>
      <TelaMenu /> {/* O Menu ficará visível em todas as páginas */}
      <main className="container" >
      <Outlet /> {/* Aqui o conteúdo das páginas será renderizado */}
      </main>
      <TelaRodape/>
    </div>
  );
};

export default AppLayout;
