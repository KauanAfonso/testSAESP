import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect } from "vitest";
import { CadTarefa } from "../paginas/CadTarefa"
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


it("Deve mostrar erros de não começar com espaço em branco", async () => {
    render(<CadTarefa/>);
    fireEvent.input(screen.getByLabelText(/Descrição/i), { target: { value: "  Descrição inválida" } });
    fireEvent.input(screen.getByLabelText(/nome da sala/i), { target: { value: "  A102" } });   
    fireEvent.input(screen.getByLabelText(/Data da tarefa/i), { target: { value: "2023-10-10" } });
    fireEvent.input(screen.getByLabelText(/prioridade/i), { target: { value: "M" } });   
    fireEvent.input(screen.getByLabelText(/status/i), { target: { value: "AF" } });
    fireEvent.input(screen.getByLabelText(/Responsável/i), { target: { value: "5" } });

    fireEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

    await waitFor(() => {
        expect(screen.getByText(/Não comece com espaço em branco/i)).toBeTruthy();
    });
    
});