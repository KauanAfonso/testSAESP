import { BarraNavegacao } from "../Componentes/BarraNavegacao";
import { Cabecalho } from "../Componentes/Cabecalho";
import { Outlet } from "react-router";


export function Inicial(){
    return(
        <>
            <BarraNavegacao/>
            <Cabecalho/>
            <Outlet/>
        </>
    )
}