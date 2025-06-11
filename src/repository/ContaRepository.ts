import { Conta } from '../model/Conta';

export interface ContaRepository {

    // CRUD da conta
    cadastrar(conta: Conta): void;
    listarTodas(): void;
    procurarPorNumero(numero: number): void;
    atualizar(conta: Conta): void;
    deletar(numero: number): void;

}

