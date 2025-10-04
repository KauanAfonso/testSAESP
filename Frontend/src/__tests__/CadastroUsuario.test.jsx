import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect } from "vitest";
import { CadUsuario } from "../paginas/CadUsuario"
// render: renderiza a minha tela
//screen: eu vejo os elementos que estão sendo exibidos
//fireEvent: simula


//passou
describe("Cadastro de usuario", ()=>{
    it("A tela é exibida", ()=>{
        render(<CadUsuario/>)
        const nomeInput = screen.getByLabelText(/Nome/i)
        const emailInput = screen.getByLabelText(/E-mail/i)
        const botao = screen.getByRole("button", {name:/Cadastrar/i})

        expect(nomeInput).toBeTruthy();
        expect(emailInput).toBeTruthy();
        expect(botao).toBeTruthy();
    })
})


//passou
it("deve mostrar erros quando campos estiverem vazios", async () => {
    render(<CadUsuario />);
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText("Insira ao menos 1 caractere")).toBeTruthy();
      expect(screen.getByText("Insira seu email")).toBeTruthy();
    });
  });


//passou
it("deve mostrar erro quando o email tiver formato inválido", async () => {
    render(<CadUsuario />);
    fireEvent.input(screen.getByLabelText(/Nome/i), { target: { value: "Maria" } });
    fireEvent.input(screen.getByLabelText(/E-mail/i), { target: { value: "emailinvalido" } });

    fireEvent.submit(screen.getByRole("form") || screen.getByRole("button", { name:/Cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByText(/Formato de email invalido/i)).toBeTruthy();
    });
  });

//passou -> o nome deve conter o segundo nome
it("deve resetar os campos após submissão", async () => {
    render(<CadUsuario />);
    const nomeInput = screen.getByLabelText(/Nome/i);
    const emailInput = screen.getByLabelText(/E-mail/i);

    fireEvent.input(nomeInput, { target: { value: "Maria José" } });
    fireEvent.input(emailInput, { target: { value: "maria@email.com" } });

    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
     
      expect(nomeInput.value).toBe("");
      expect(emailInput.value).toBe("");
    });

});
