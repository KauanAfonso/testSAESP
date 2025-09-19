import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Coluna } from "./Coluna";
import {DndContext} from '@dnd-kit/core'; //é o uso da biblioteca de clicar e arrastar

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

    // Separando tarefas por status
    const tarefasAfazer = tarefas.filter(tarefa => tarefa.status === "AF");
    const tarefasAFazendo = tarefas.filter(tarefa => tarefa.status === "F");
    const tarefasAPronto = tarefas.filter(tarefa => tarefa.status === "P");

    return (
        <main className="conteiner">
            <h1>Meu Quadro</h1>
            <section>
            <Coluna titulo="A Fazer" tarefas={tarefasAfazer} />
            <Coluna titulo="Fazendo" tarefas={tarefasAFazendo} />
            <Coluna titulo="Pronto" tarefas={tarefasAPronto} />
            </section>

        </main>
    );
}
