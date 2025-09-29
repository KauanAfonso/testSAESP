import { Tarefa } from "./Tarefa";
import { useDroppable } from "@dnd-kit/core";


/* 

Esse componente é responsável por ser as colunas do
Kanban.

*/
export function Coluna({titulo, tarefas=[], id}){
  //fazendo o controle do ambiente de soltura
  const { setNodeRef } = useDroppable({ id })

    return(
        <section className="coluna" ref={setNodeRef}>
            <h2 className="titulo">{titulo}</h2>
            {tarefas.map(tarefa => {
                console.log("Rederizando", tarefa);
                return<Tarefa key={tarefa.id} tarefa={tarefa}/>
            })}
        </section>
    )
}