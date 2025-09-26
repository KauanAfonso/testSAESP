import { render, screen, fireEventm, waitFor } from "@testing-library/react";
import { describe, expect } from "vitest";
import { CadUsuario } from "../paginas/CadUsuario"
// render: renderiza a minha tela
//screen: eu vejo os elementos que estão sendo exibidos
//fireEvent: simula

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