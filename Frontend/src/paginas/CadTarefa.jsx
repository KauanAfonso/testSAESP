import axios from 'axios';
import { useForm } from 'react-hook-form'; //hook(use) aqui permite a validação de formulario
import { any, z } from 'zod'; //zod é ma descrição de como eu validar, quais seriam as regras
import { zodResolver } from '@hookform/resolvers/zod'; //é o liga o hook form com o zod
import { useEffect, useState } from 'react';

//validação de formulário -- estou usando as regras do zod, que pode ser consultada na web
const schemaCadTarefa = z.object({
    descricao: z.string()
        .min(1, 'Insira ao menos 1 caractere')
        .max(100, 'Insira até 100 caracteres')
        .regex(/^[^\s].*$/, 'Não comece com espaço em branco'),
    nomeSala: z.string()
        .min(1, 'Insira o setor com pelo menos 1 caracteres')
        .max(50, 'Insira o setor com até 50 carateres')
        .regex(/^[^\s].*$/, 'Não comece com espaço em branco'),
    prioridade: z.string()
        .min(1, "Defina a prioridade")
        .max(5, "Defina a prioridade"),
    status: z.string()
        .min(1, "Defina o status")
        .max(7, "Defina o status da tarefa até 15 caracteres"),

    //Mandar a data corretamente para o backend    
    dataCadastro: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida. Use o formato YYYY-MM-DD")
        .refine((dateStr) => {
            const year = parseInt(dateStr.split('-')[0], 10);
            return year >= 2000;
        }, {
            message: "A data deve ser do ano 2000 para frente",
        }),

    id_usuario: z.string().transform(val => parseInt(val, 10)),
    id_usuario: z.string().transform(val => parseInt(val, 10)),

})


export function CadTarefa() {

    const [usuarios, setUsuarios] = useState([])

    const {
        register, //registra para mim o que o usuário faz
        handleSubmit, //no momento em que ele der um submit (botão)
        formState: { errors }, //no formulario, se der ruim guarda os erros na variavel errors
        reset
    } = useForm({
        resolver: zodResolver(schemaCadTarefa)
    })

    async function obterdados(data) {
        console.log('dados informados pelo user:', data);

        //para grande parte das interações com outra plataforma é nescessario usar o try
        try {
            await axios.post("http://127.0.0.1:8000/api/tarefas/", data);
            alert("Tarefa cadastrado com sucesso");
            reset(); //limpeza do formulario
        } catch (error) {
            alert("È não rolou na proxima talvez");
            console.log("Erros", error)
        }
    }

    useEffect(() => {
        async function getUsers() {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/usuario/")
                setUsuarios(res.data)

            } catch (error) {
                console.log("Erros", error)
            }
        }

        getUsers()
    }, [usuarios]);



    return (
        <section>
            <h2 className='inicialTitulo'>Cadastro de Tarefas</h2>
            <form role='form' className="formularios" onSubmit={handleSubmit(obterdados)}>

                <label htmlFor="descricao">Descrição da Tarefa:</label>
                <input id="descricao" name='descricao' type="text" placeholder="Descrição da tarefa" {...register("descricao")} required />
                {errors.descricao && <p className="errors">{errors.descricao.message}</p>}

                <label htmlFor="nomeSala">Nome da sala:</label>
                <input id="nomeSala" type="text" placeholder="A102" {...register("nomeSala")} required />
                {errors.nomeSala && <p className="errors">{errors.nomeSala.message}</p>}

                <label htmlFor="prioridade">Defina prioridade:</label>
                <select id="prioridade" {...register("prioridade")} required>
                    <option value="B">Baixa</option>
                    <option value="M">Média</option>
                    <option value="A">Alta</option>
                </select>
                {errors.prioridade && <p className="errors">{errors.prioridade.message}</p>}

                <label htmlFor="status">Defina o status:</label>
                <select id="status" {...register("status")} required disabled>
                    <option value="AF">A Fazer</option>
                    <option value="F">Fazendo</option>
                    <option value="P">Pronto</option>
                </select>
                {errors.status && <p className="errors">{errors.status.message}</p>}

                <label htmlFor="dataCadastro">Data da tarefa:</label>
                <input id="dataCadastro" type="date" {...register("dataCadastro")} required />
                {errors.dataCadastro && <p className="errors">{errors.dataCadastro.message}</p>}

                <label htmlFor="id_usuario">Responsável:</label>
                <select id="id_usuario" {...register("id_usuario")} required defaultValue="">
                <option value="" disabled>Selecione</option>
                {usuarios.map((user) => (
                    <option key={user.id} value={user.id}>{user.nome}</option>
                ))}
                </select>

                {errors.id_usuario && <p className="errors">{errors.id_usuario.message}</p>}

                <button name='Cadastrar' type="submit">Cadastrar</button>
            </form>
        </section>


    )
}