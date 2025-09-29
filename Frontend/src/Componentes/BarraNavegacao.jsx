import { Link } from "react-router";


/* 

Esse componente é a barra de navegação do site

*/
export function BarraNavegacao(){
    return(
        <nav className="barra">
            <ul>
                <li><Link to ='/cadUsuario'>Cadastro de Usuário</Link></li>
                <li><Link to='cadTarefa'>Cadastro de Tarefa</Link></li>
                <li><Link to='/'>Gerenciamento de Tarefas</Link></li>
            </ul>
        </nav>
    )
}