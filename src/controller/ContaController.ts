import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";

export class ContaController implements ContaRepository {

    private listaContas: Array<Conta> = new Array<Conta>()
    id: number = 0;
    numero: number = 0;

    procurarPorNumero(numero: number): void {
        let buscarConta = this.buscarNoArray(numero);

        if (buscarConta !== null) {
            buscarConta.visualizar();
        } else {
            console.log(`\nA conta numero ${numero} não foi encontrada`)
        }
    }

    listarTodas(): void {
        for (let conta of this.listaContas){
            conta.visualizar();
        }
    }

    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(`\nConta numero ${conta.numero} foi criada com sucesso!!!`)

    }

    atualizar(conta: Conta): void {
        let buscarConta = this.buscarNoArray(conta.numero);

        if (buscarConta !== null) {
            this.listaContas[this.listaContas.indexOf(buscarConta)] = conta;
            console.log(`\nA conta numero ${conta.numero} foi atualizada com sucesso!!`);
        } else {
            console.log(`\nA conta numero ${conta.numero} nao foi encontrada!!`);
        }
    }

    deletar(numero: number): void {
        let buscarConta = this.buscarNoArray(numero);

        if (buscarConta !== null) {
            this.listaContas.splice(this.listaContas.indexOf(buscarConta),1)
            console.log(`\nA conta numero ${numero} foi apagada com sucesso!!`)
        } else {
            console.log(`\nA conta numero ${numero} não foi encontrada`)
        }

    }

    public gerarNumero(): number {
        return ++ this.numero;
    }

        public buscarNoArray(numero: number): Conta | null {
        for (let conta of this.listaContas) {
            if (conta.numero === numero){
                return conta;
            }
                
        }

        return null;

    }
    
} 