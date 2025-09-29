import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Coluna } from "./Coluna";
import {DndContext} from '@dnd-kit/core'; // qual é o ambiente que vai permitir o darg and drop
import { restrictToFirstScrollableAncestor } from '@dnd-kit/modifiers';


/*

Esse componente é utilizado para o quadro das 
colunas que contém as tarefas. Também compõe
a função de drag paras as colunas.

*/
export function Quadro() {
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        const apiURL = `http://127.0.0.1:8000/api/tarefas/`;

        axios.get(apiURL)
            .then(response => {
                console.log("Tarefas da API:", response.data);
                setTarefas(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar tarefas:", error);
            });
    }, []);



    //function para arrastar o card e atualizar seu status
    function handleDragEnd(event){
        const { active, over } =event;
 
        if(over && active){
            const tarefaId = active.id; //quero pegar o ID da tarefa que ta sofrendo o evento
            const novaColuna =over.id; //quero pegar a coluna da tarefa
            setTarefas (prev=>
                prev.map(tarefa => tarefaId === tarefa.id ? {...tarefa, status: novaColuna} : tarefa)
            );
            //Atualiza o status do card (muda a situação do card {a fazer/ fazendo / pronto})
            axios.patch(`http://127.0.0.1:8000/api/tarefas/${tarefaId}/`,{
                status: novaColuna
            })
            
            .catch(err => console.error("Erro ao  atualizar status: ", err));
        }

    }


    // Separando tarefas por status
    const tarefasAfazer = tarefas.filter(tarefa => tarefa.status === "AF");
    const tarefasAFazendo = tarefas.filter(tarefa => tarefa.status === "F");
    const tarefasAPronto = tarefas.filter(tarefa => tarefa.status === "P");

    return (

        <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToFirstScrollableAncestor]}>
        <main className="conteiner" aria-label="Quadro que contém as tarefas sendo eles as colunas A fazer, Fazendo e Pronto">
            <h1 className="inicialTitulo">Meu Quadro</h1>
            <section >
            <Coluna id = "AF" titulo="A Fazer" tarefas={tarefasAfazer} />
            <Coluna id = "F" titulo="Fazendo" tarefas={tarefasAFazendo} />
            <Coluna id = "P" titulo="Pronto" tarefas={tarefasAPronto} />
            </section>

        </main>
        </DndContext>
    );
}
