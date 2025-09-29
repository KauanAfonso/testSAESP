import { BarraNavegacao } from "../Componentes/BarraNavegacao";
import { Cabecalho } from "../Componentes/Cabecalho";
import { Outlet } from "react-router";
import { Footer } from "../Componentes/Footer";


export function Inicial(){
return (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Cabecalho />
    <BarraNavegacao />
    <main style={{ flex: 1 }}>
      <Outlet />
    </main>
    <Footer />
  </div>
);
}