import { describe, it, expect } from "vitest";

//describe = como eu descrevo esse test
describe("Matematica basica", ()=>{
    //qual cenário de teste estou executando
    it("Soma 2 + 2", ()=>{
        // o que eu espero receber como respostas
        expect(2 + 2).toBe(4)
    })
})