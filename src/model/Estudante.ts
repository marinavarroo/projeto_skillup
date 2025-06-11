import { Conta } from "./Conta";

export class Estudante extends Conta {
    constructor(numero: number, email: string, senha: string, usuario: string) {
        super(numero, email, senha, usuario);
    }
}