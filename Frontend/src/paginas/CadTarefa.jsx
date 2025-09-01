import axios from 'axios';
import { useForm } from 'react-hook-form'; //hook(use) aqui permite a validação de formulario
import { any, z } from 'zod'; //zod é ma descrição de como eu validar, quais seriam as regras
import { zodResolver } from '@hookform/resolvers/zod'; //é o liga o hook form com o zod
import { useEffect, useState } from 'react';

//validação de formulário -- estou usando as regras do zod, que pode ser consultada na web
const schemaCadTarefa = z.object({
    descricao: z.string()
        .min(1, 'Insira ao menos 1 caractere')
        .max(150, 'Insira até 250 caracteres')
        .regex(/^[^\s].*$/, 'Não comece com espaço em branco'),
    nomeSala: z.string()
        .min(1, 'Insira o nome da sala com pelo menos 1 caracteres')
        .max(155, 'Insira um endereço de email com até 155 carateres')
        .regex(/^[^\s].*$/, 'Não comece com espaço em branco'),
    prioridade: z.string()
        .min(1, "Defina a prioridade")
        .max(5, "Defina a prioridade"),
    status: z.string()
        .min(1, "Defina o status")
        .max(7, "Defina o status da tarefa até 15 caracteres"),

    //Mandar a data corretamente para o backend    
    dataCadastro: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida. Use o formato YYYY-MM-DD"),
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

    useEffect(() =>{
        async function getUsers() {
            try{
                const res = await axios.get("http://127.0.0.1:8000/api/usuario/")
                setUsuarios(res.data)
            
            }catch(error){
                console.log("Erros", error)
            }
        }

        getUsers()
    }, [usuarios]);

    

    return (
        <form className="formularios" onSubmit={handleSubmit(obterdados)}>
            <h2>Cadastro do tarefas</h2>

            <label>Descrição da Tarefa:</label>
            <input type='text' placeholder='Descrição da tarefa' {...register("descricao")} required />
            {/* aqui eu vejo a variavel errors no campo descricao exibo a mensagem para o usuário */}
            {errors.descricao && <p className='errors'>{errors.descricao.message}</p>}

            <label>Nome da sala:</label>
            <input type='text'  placeholder='A102' {...register("nomeSala")} required/>
            {/* aqui eu vejo a variavel errors no campo nome exibo a mensagem para o usuário */}
            {errors.nomeSala && <p className='errors'>{errors.nomeSala.message}</p>}

            <label>Defina prioridade:</label>
            <select {...register("prioridade")} required>
                <option value="B">Baixa</option>
                <option value="M">Media</option>
                <option value="A">Alta</option>
            </select>
            {errors.prioridade && <p className='errors'>{errors.prioridade.message}</p>}

            <label>Defina o status:</label>
            <select {...register("status")} required disabled>
                <option value="AF">A Fazer</option>
                <option value="F">Fazendo</option>
                <option value="P">Pronto</option>
            </select>
            {errors.status && <p className='errors'>{errors.status.message}</p>}

            <label>Data da tarefa:</label>
            <input type="date" name="" id=""  {...register("dataCadastro")} required />
            {errors.dataCadastro && <p className='errors'>{errors.dataCadastro.message}</p>}

            <label>Responsável:</label>
            <select {...register("id_usuario")} required >
            {usuarios.map((user)=>{
                return(
                    <option  key={user.id} value={user.id}>{user.nome}</option>
                )
            })}
            </select>
            {errors.id_usuario && <p className='errors'>{errors.id_usuario.message}</p>}

            <button type='submit'>Cadastrar</button>
        </form>
    )
}