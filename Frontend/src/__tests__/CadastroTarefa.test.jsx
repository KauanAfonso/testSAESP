import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect } from "vitest";
import { CadTarefa } from "../paginas/CadTarefa"
import { id, no } from "zod/v4/locales";
// render: renderiza a minha tela
//screen: eu vejo os elementos que estão sendo exibidos
//fireEvent: simula

//passou
describe("Cadastro de tarefa", ()=>{
    it("A tela é exibida", ()=>{
        render(<CadTarefa/>)
        const descricaoInput = screen.getByLabelText(/Descrição/i)
        const nome_sala = screen.getByLabelText(/nome da sala/i)
        const prioridadeInput = screen.getByLabelText(/prioridade/i)
        const statusInput = screen.getByLabelText(/status/i)
        const dataCadastroInput = screen.getByLabelText(/Data da tarefa/i)
        const id_usuarioInput = screen.getByLabelText(/Responsável/i)
        const botao = screen.getByRole("button", {name:/Cadastrar/i})

        expect(descricaoInput).toBeTruthy();
        expect(nome_sala).toBeTruthy();
        expect(prioridadeInput).toBeTruthy();
        expect(statusInput).toBeTruthy();
        expect(dataCadastroInput).toBeTruthy();
        expect(id_usuarioInput).toBeTruthy();
        expect(botao).toBeTruthy();
    })
})



it("Deve limpar os campos quando enviados", async () => {
    render(<CadTarefa />);

    const descricaoInput = screen.getByLabelText(/Descrição/i)
    const nome_sala = screen.getByLabelText(/nome da sala/i)
    const prioridadeInput = screen.getByLabelText(/prioridade/i)
    const statusInput = screen.getByLabelText(/status/i)
    const dataCadastroInput = screen.getByLabelText(/Data da tarefa/i)
    const id_usuarioInput = screen.getByLabelText(/Responsável/i)


    fireEvent.input(descricaoInput, { target: { value: "Tarefa" } });
    fireEvent.input(nome_sala, { target: { value: "A108" } });
    fireEvent.input(dataCadastroInput, { target: { value: "2023-10-10" } });
    fireEvent.input(prioridadeInput, { target: { value: "A" } });
    fireEvent.input(statusInput, { target: { value: "AF" } });
    fireEvent.input(id_usuarioInput, { target: { value: "15" } });

    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

  await waitFor(() => {
    expect(descricaoInput.value).toBeTruthy("");
    expect(nome_sala.value).toBeTruthy("");
    expect(dataCadastroInput.value).toBeTruthy("");
    expect(prioridadeInput.value).toBeTruthy("");
    expect(statusInput.value).toBeTruthy("");
    expect(id_usuarioInput.value).toBeTruthy("");
  });
});



let descricaoGrande = "K".repeat(101)
it("Deve mostrar erros de não inserir mais de 100 caracteres na descrição", async () => {
    render(<CadTarefa/>);
    const descricaoInput = screen.getByLabelText(/Descrição/i)
    const nome_sala = screen.getByLabelText(/nome da sala/i)
    const prioridadeInput = screen.getByLabelText(/prioridade/i)
    const statusInput = screen.getByLabelText(/status/i)
    const dataCadastroInput = screen.getByLabelText(/Data da tarefa/i)
    const id_usuarioInput = screen.getByLabelText(/Responsável/i)


    fireEvent.input(descricaoInput, { target: { value: descricaoGrande } });
    fireEvent.input(nome_sala, { target: { value: "A108" } });
    fireEvent.input(dataCadastroInput, { target: { value: "2023-10-10" } });
    fireEvent.input(prioridadeInput, { target: { value: "A" } });
    fireEvent.input(statusInput, { target: { value: "AF" } });
    fireEvent.input(id_usuarioInput, { target: { value: "15" } });

    fireEvent.submit(screen.getByRole("form") || screen.getByRole("button", { name:/Cadastrar/i }));

    await waitFor(() => {
        expect(screen.getByText(/Insira até 100 caracteres/i)).toBeTruthy()
    });

    
});

let nomeSalaGrande = "K".repeat(101)
it("Deve mostrar erros de não inserir mais de 50 caracteres no nome da sala", async () => {
    render(<CadTarefa/>);
    const descricaoInput = screen.getByLabelText(/Descrição/i)
    const nome_sala = screen.getByLabelText(/nome da sala/i)
    const prioridadeInput = screen.getByLabelText(/prioridade/i)
    const statusInput = screen.getByLabelText(/status/i)
    const dataCadastroInput = screen.getByLabelText(/Data da tarefa/i)
    const id_usuarioInput = screen.getByLabelText(/Responsável/i)


    fireEvent.input(descricaoInput, { target: { value: "teste" } });
    fireEvent.input(nome_sala, { target: { value: nomeSalaGrande } });
    fireEvent.input(dataCadastroInput, { target: { value: "2023-10-10" } });
    fireEvent.input(prioridadeInput, { target: { value: "A" } });
    fireEvent.input(statusInput, { target: { value: "AF" } });
    fireEvent.input(id_usuarioInput, { target: { value: "15" } });

    fireEvent.submit(screen.getByRole("form") || screen.getByRole("button", { name:/Cadastrar/i }));

    await waitFor(() => {
        expect(screen.getByText(/Insira o setor com até 50 carateres/i)).toBeTruthy()
    });

    
});



it("Deve mostrar erro de data inválida", async () => {
    render(<CadTarefa/>);
    const descricaoInput = screen.getByLabelText(/Descrição/i)
    const nome_sala = screen.getByLabelText(/nome da sala/i)
    const prioridadeInput = screen.getByLabelText(/prioridade/i)
    const statusInput = screen.getByLabelText(/status/i)
    const dataCadastroInput = screen.getByLabelText(/Data da tarefa/i)
    const id_usuarioInput = screen.getByLabelText(/Responsável/i)


    fireEvent.input(descricaoInput, { target: { value: "teste" } });
    fireEvent.input(nome_sala, { target: { value: "A44" } });
    fireEvent.input(dataCadastroInput, { target: { value: "1900-10-10" } });
    fireEvent.input(prioridadeInput, { target: { value: "A" } });
    fireEvent.input(statusInput, { target: { value: "AF" } });
    fireEvent.input(id_usuarioInput, { target: { value: "15" } });

    fireEvent.submit(screen.getByRole("form") || screen.getByRole("button", { name:/Cadastrar/i }));

    await waitFor(() => {
        expect(screen.getByText(/A data Deve ser do ano 2000 para frente/i)).toBeTruthy()
    });

    
});


it("Deve mostrar erro de data formtado de data inválido YYYY-MM-DD", async () => {
    render(<CadTarefa/>);
    const descricaoInput = screen.getByLabelText(/Descrição/i)
    const nome_sala = screen.getByLabelText(/nome da sala/i)
    const prioridadeInput = screen.getByLabelText(/prioridade/i)
    const statusInput = screen.getByLabelText(/status/i)
    const dataCadastroInput = screen.getByLabelText(/Data da tarefa/i)
    const id_usuarioInput = screen.getByLabelText(/Responsável/i)


    fireEvent.input(descricaoInput, { target: { value: "teste" } });
    fireEvent.input(nome_sala, { target: { value: "A44" } });
    fireEvent.input(dataCadastroInput, { target: { value: "10/410/5" } });
    fireEvent.input(prioridadeInput, { target: { value: "A" } });
    fireEvent.input(statusInput, { target: { value: "AF" } });
    fireEvent.input(id_usuarioInput, { target: { value: "15" } });

    fireEvent.submit(screen.getByRole("form") || screen.getByRole("button", { name:/Cadastrar/i }));

    await waitFor(() => {
        expect(screen.getByText(/Data inválida. Use o formato YYYY-MM-DD/i)).toBeTruthy()
    });

    
});


it("Deve mostrar erro de inserir pelo meos 1 caracteres no campo", async () => {
    render(<CadTarefa/>);
    const descricaoInput = screen.getByLabelText(/Descrição/i)
    const nome_sala = screen.getByLabelText(/nome da sala/i)
    const prioridadeInput = screen.getByLabelText(/prioridade/i)
    const statusInput = screen.getByLabelText(/status/i)
    const dataCadastroInput = screen.getByLabelText(/Data da tarefa/i)
    const id_usuarioInput = screen.getByLabelText(/Responsável/i)


    fireEvent.input(descricaoInput, { target: { value: "" } });
    fireEvent.input(nome_sala, { target: { value: "" } });
    fireEvent.input(dataCadastroInput, { target: { value: "2025-05-10" } });
    fireEvent.input(prioridadeInput, { target: { value: "A" } });
    fireEvent.input(statusInput, { target: { value: "AF" } });
    fireEvent.input(id_usuarioInput, { target: { value: "15" } });

    fireEvent.submit(screen.getByRole("form") || screen.getByRole("button", { name:/Cadastrar/i }));

    await waitFor(() => {
        expect(screen.getByText(/Insira ao menos 1 caractere/i)).toBeTruthy()
    });

    
});


it("Deve mostrar erro de inserir pelo meos 1 caracteres no campo de sala", async () => {
    render(<CadTarefa/>);
    const descricaoInput = screen.getByLabelText(/Descrição/i)
    const nome_sala = screen.getByLabelText(/nome da sala/i)
    const prioridadeInput = screen.getByLabelText(/prioridade/i)
    const statusInput = screen.getByLabelText(/status/i)
    const dataCadastroInput = screen.getByLabelText(/Data da tarefa/i)
    const id_usuarioInput = screen.getByLabelText(/Responsável/i)


    fireEvent.input(descricaoInput, { target: { value: "teste" } });
    fireEvent.input(nome_sala, { target: { value: "" } });
    fireEvent.input(dataCadastroInput, { target: { value: "2022-10-15" } });
    fireEvent.input(prioridadeInput, { target: { value: "A" } });
    fireEvent.input(statusInput, { target: { value: "AF" } });
    fireEvent.input(id_usuarioInput, { target: { value: "15" } });

    fireEvent.submit(screen.getByRole("form") || screen.getByRole("button", { name:/Cadastrar/i }));

    await waitFor(() => {
         expect(screen.getByText(/Insira o setor com pelo menos 1 caracteres/i)).toBeTruthy()
    });
    
});


it("Deve mostrar erros de espaçamento em descrição", async () => {
    render(<CadTarefa/>);
    const descricaoInput = screen.getByLabelText(/Descrição/i)
    const nome_sala = screen.getByLabelText(/nome da sala/i)
    const prioridadeInput = screen.getByLabelText(/prioridade/i)
    const statusInput = screen.getByLabelText(/status/i)
    const dataCadastroInput = screen.getByLabelText(/Data da tarefa/i)
    const id_usuarioInput = screen.getByLabelText(/Responsável/i)


    fireEvent.input(descricaoInput, { target: { value: "        kauannn" } });
    fireEvent.input(nome_sala, { target: { value: "A545" } });
    fireEvent.input(dataCadastroInput, { target: { value: "2022-10-05" } });
    fireEvent.input(prioridadeInput, { target: { value: "A" } });
    fireEvent.input(statusInput, { target: { value: "AF" } });
    fireEvent.input(id_usuarioInput, { target: { value: "15" } });

    fireEvent.submit(screen.getByRole("form") || screen.getByRole("button", { name:/Cadastrar/i }));

    await waitFor(() => {
        expect(screen.getByText(/Não comece com espaço em branco/i)).toBeTruthy()

    });
    
});



it("Deve mostrar erros de tamanho de caracteres ao colocar uma letra de música da xuxa em descrição:", async () => {
    render(<CadTarefa/>);
    const descricaoInput = screen.getByLabelText(/Descrição/i)
    const nome_sala = screen.getByLabelText(/nome da sala/i)
    const prioridadeInput = screen.getByLabelText(/prioridade/i)
    const statusInput = screen.getByLabelText(/status/i)
    const dataCadastroInput = screen.getByLabelText(/Data da tarefa/i)
    const id_usuarioInput = screen.getByLabelText(/Responsável/i)


    fireEvent.input(descricaoInput, { target: { value: musica_xuxa} });
    fireEvent.input(nome_sala, { target: { value: "A545" } });
    fireEvent.input(dataCadastroInput, { target: { value: "2022-10-05" } });
    fireEvent.input(prioridadeInput, { target: { value: "A" } });
    fireEvent.input(statusInput, { target: { value: "AF" } }); 
    fireEvent.input(id_usuarioInput, { target: { value: "15" } });

    fireEvent.submit(screen.getByRole("form") || screen.getByRole("button", { name:/Cadastrar/i }));

    await waitFor(() => {
        expect(screen.getByText(/Insira até 100 caracteres/i)).toBeTruthy()

    });

})



it("Deve mostrar erros de tamanho de caracteres ao colocar uma letra de música da xuxa em descrição:", async () => {
    render(<CadTarefa/>);
    const descricaoInput = screen.getByLabelText(/Descrição/i)
    const nome_sala = screen.getByLabelText(/nome da sala/i)
    const prioridadeInput = screen.getByLabelText(/prioridade/i)
    const statusInput = screen.getByLabelText(/status/i)
    const dataCadastroInput = screen.getByLabelText(/Data da tarefa/i)
    const id_usuarioInput = screen.getByLabelText(/Responsável/i)


    fireEvent.input(descricaoInput, { target: { value: "kauan"} });
    fireEvent.input(nome_sala, { target: { value: musica_xuxa } });
    fireEvent.input(dataCadastroInput, { target: { value: "2022-10-05" } });
    fireEvent.input(prioridadeInput, { target: { value: "A" } });
    fireEvent.input(statusInput, { target: { value: "AF" } }); 
    fireEvent.input(id_usuarioInput, { target: { value: "15" } });

    fireEvent.submit(screen.getByRole("form") || screen.getByRole("button", { name:/Cadastrar/i }));

    await waitFor(() => {
        expect(screen.getByText(/Insira o setor com até 50 carateres/i)).toBeTruthy()

    });

})


it("Deve mostrar erros de espaçamento em setor", async () => {
    render(<CadTarefa/>);
    const descricaoInput = screen.getByLabelText(/Descrição/i)
    const nome_sala = screen.getByLabelText(/nome da sala/i)
    const prioridadeInput = screen.getByLabelText(/prioridade/i)
    const statusInput = screen.getByLabelText(/status/i)
    const dataCadastroInput = screen.getByLabelText(/Data da tarefa/i)
    const id_usuarioInput = screen.getByLabelText(/Responsável/i)


    fireEvent.input(descricaoInput, { target: { value: "kauannn" } });
    fireEvent.input(nome_sala, { target: { value: " A545" } });
    fireEvent.input(dataCadastroInput, { target: { value: "2022-10-05" } });
    fireEvent.input(prioridadeInput, { target: { value: "A" } });
    fireEvent.input(statusInput, { target: { value: "AF" } }); 
    fireEvent.input(id_usuarioInput, { target: { value: "15" } });

    fireEvent.submit(screen.getByRole("form") || screen.getByRole("button", { name:/Cadastrar/i }));

    await waitFor(() => {
        expect(screen.getByText(/Não comece com espaço em branco/i)).toBeTruthy()

    });
});





let musica_xuxa = `Hoje vai ser uma festa
Bolo e guaraná
Muito doce pra você
É o seu aniversário
Vamos festejar
E os amigos receber

Mil felicidades
E amor no coração
Que a sua vida seja
Sempre doce e emoção

Bate, bate palma
Que é hora de cantar
Agora todos juntos
Vamos lá!

Parabéns, parabéns!
Hoje é o seu dia
Que dia mais feliz

Parabéns, parabéns!
Cante novamente
Que a gente pede bis

É big, é big
É big, é big, é big
É hora, é hora
É hora, é hora, é hora
Rá-tim-bum!

Hoje vai ser uma festa
Bolo e guaraná
Muito doce pra você

É o seu aniversário
Vamos festejar
E os amigos receber

Mil felicidades
E amor no coração
Que a sua vida seja
Sempre doce e emoção

Bate, bate palma
Que é hora de cantar
Agora todos juntos
Vamos lá!

Parabéns, parabéns!
Hoje é o seu dia
Que dia mais feliz

Parabéns, parabéns!
Cante novamente
Que a gente pede bis

Parabéns, parabéns!
Hoje é o seu dia
Que dia mais feliz

Parabéns, parabéns!
Cante novamente
Que a gente pede bis

Parabéns, parabéns!
Hoje é o seu dia
Que dia mais feliz

Parabéns, parabéns!
Cante novamente
Que a gente pede bis`;
