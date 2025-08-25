import { Link } from "react-router";

export function BarraNavegacao(){
    return(
        <nav className="barra">
            <ul>
                <Link to ='/cadUsuario'><li >Cadastro de Usuário</li></Link>
                <Link to='cadTarefa'><li>Cadasro de Tarefa</li></Link>
                <Link to='/'><li>Gerenciamento de Tarefas</li></Link>
            </ul>
        </nav>
    )
}