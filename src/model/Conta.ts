export abstract class Conta {
    private _numero: number;
    private _email: string;
    private _senha: string;
    private _usuario: string;
    nome!: string;

    constructor(numero: number, email: string, senha: string, usuario: string) {
        this._numero = numero;
        this._email = email;
        this._senha = senha;
        this._usuario = usuario;
    }

    public get numero(): number {
        return this._numero;
    }

    public set numero(numero: number) {
        if (numero <= 0) {
            throw new Error('O número da conta deve ser um valor positivo.');
        }
        this._numero = numero;
    }

    public get email(): string {
        return this._email;
    }

    public set email(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!emailRegex.test(email)) {
            throw new Error('E-mail inválido. Informe um e-mail válido, exemplo: nome@dominio.com');
        }

        this._email = email.toLowerCase().trim(); 
}

public get senha(): string {
    return this._senha;
}

public set senha(senha: string) {
    this._senha = senha;
}


    public get usuario(): string {
        return this._usuario;
    }

set usuario(usuario: string) {
    if (!usuario.trim() || usuario.length < 3) {
        throw new Error('O nome de usuário não pode estar vazio ou ter menos de 3 letras.');
    }
    this._usuario = usuario;
}

public visualizar(): void {
    console.log('\n══════════════════════════════════════════════════════════════════════════');
    console.log('                              DADOS DA CONTA                              ');
    console.log('══════════════════════════════════════════════════════════════════════════\n');

    console.log(`ID:            ${this._numero}`);
    console.log(`Usuário:       ${this._usuario}`);
    console.log(`E-mail:        ${this._email}`);
    
    console.log('\n══════════════════════════════════════════════════════════════════════════');
}


}

