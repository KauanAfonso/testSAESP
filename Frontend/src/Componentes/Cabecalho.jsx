import { Link } from "react-router"


/*

Esse componente é para ser o Cabeçalho da tela

*/

export function Cabecalho(){
    return(
        <header className="cabecalho">
            <Link to='/'><h1>Gerenciamento de Tarefas</h1></Link>
        </header>
    )
}