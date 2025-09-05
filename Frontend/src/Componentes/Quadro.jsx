
import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Coluna } from "./Coluna";

export function Quadro(){

    const {tarefas, SetTarefas} = useState([]);

    //o effect é um hook que permite a renderização de alguma coisa a tela
    useEffect(()=>{
        const apiURL = `htpp://127.0.0.1:8000/api/tarefas/`;

        //axios permite a chamada di endereço
        axios.get(apiURL)
            .then(response => {SetTarefas(response.data)})
            .catch(error => {
                console.error("Deu ruim aqui hein", error)
            });
    },[])

    //estou armazendo em variaveis o resultado de uma função callback 
    const tarefasAfazer = tarefas.filter(tarefas => tarefas.status == "A Fazer");
    const tarefasAFazendo = tarefas.filter(tarefas => tarefas.status == "A Fazendo");
    const tarefasAPronto = tarefas.filter(tarefas => tarefas.status == "Pronto");

    return(
        <main className="conteiner">
            <h1>Meu Quadro</h1>
            <Coluna titulo="A fazer" tarefas={tarefasAfazer}/>
            <Coluna titulo="Fazendo" tarefas={tarefasAFazendo}/>
            <Coluna titulo="Pronto" tarefas={tarefasAPronto}/>
        </main>
    );
}