import axios from 'axios';
import { useForm } from 'react-hook-form'; //hook(use) aqui permite a validação de formulario
import { any, z } from 'zod'; //zod é ma descrição de como eu validar, quais seriam as regras
import { zodResolver } from '@hookform/resolvers/zod'; //é o liga o hook form com o zod

//validação de formulário -- estou usando as regras do zod, que pode ser consultada na web
const schemaCadUsuario = z.object({
    nome: z.string()
        .min(1, 'Insira ao menos 1 caractere')
        .max(30, 'Insira até 30 caracteres')
        .regex(
            /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/,
            "Digite nome completo (nome e sobrenome), sem números ou símbolos, sem espaços no início/fim"
        )
        .regex(/^[^\s].*$/, 'Não comece com espaço em branco'),
    email: z.string()
        .min(1, 'Insira seu email')
        .max(30, 'Insira um endereço de email com até 30 carateres')
        .email("Formato de email invalido")
        .regex(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Formato de email inválido"
        ),

})


export function CadUsuario() {

    const {
        register, //registra para mim o que o usuário faz
        handleSubmit, //no momento em que ele der um submit (botão)
        formState: { errors }, //no formulario, se der ruim guarda os erros na variavel errors
        reset
    } = useForm({
        resolver: zodResolver(schemaCadUsuario)
    })

    // Tratamento para o campo nome (apenas para prevenir entrada inválida antes do submit)
    const handleNomeChange = (e) => {
        let valor = e.target.value;
        valor = valor.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ ]+/g, ""); // só letras e espaço
        valor = valor.replace(/\s{2,}/g, " "); // evita espaços duplos
        if (valor.length > 30) valor = valor.slice(0, 30); // máximo 30 chars
        setValue("name", valor);
    };


    // Tratamento para o campo email
    const handleEmailChange = (e) => {
        let valor = e.target.value.trim();
        if (valor.length > 50) valor = valor.slice(0, 50); // máximo 50 chars
        setValue("email", valor);
    };


    async function obterdados(data) {
        console.log('dados informados pelo user:', data);

        //para grande parte das interações com outra plataforma é nescessario usar o try
        try {
            await axios.post("http://127.0.0.1:8000/api/usuario/", data);
            alert("Usuário cadastrado com sucesso");
            reset(); //limpeza do formulario
        } catch (error) {
            alert("È não rolou na proxima talvez");
            console.log("Erros", error)
        }
    }


    return (
        <section>
        <h2 className='inicialTitulo'> Cadastro do Usuário</h2> 
        <form className="formularios" onSubmit={handleSubmit(obterdados)}>
            <label htmlFor='nome'>Nome:</label>
            <input type='text' id='nome' onChange={handleNomeChange} placeholder='Jose da Silva' {...register("nome")} />
            {/* aqui eu vejo a variavel errors no campo nome exibo a mensagem para o usuário */}
            {errors.nome && <p className='errors'>{errors.nome.message}</p>}

            <label htmlFor='email'>E-mail</label>
            <input type='email' id='email' onChange={handleEmailChange} placeholder='email@email.com' {...register("email")} />
            
            {errors.email && <p className='errors'>{errors.email.message}</p>}

            <button type='submit'>Cadastrar</button>
        </form>
        </section>

    )
}