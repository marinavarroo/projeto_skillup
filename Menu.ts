import readlinesync = require('readline-sync');
import { colors } from './src/util/Colors';
import { ContaController } from './src/controller/ContaController';
import { Estudante } from './src/model/Estudante';

let cursosDisponiveis = [
    { id: 1, titulo: "TypeScript para Iniciantes", descricao: "Aprenda a tipar seu código JS.", valor: "R$49,90" },
    { id: 2, titulo: "Node.js Essencial", descricao: "Desenvolvimento de servidores e APIs.", valor: "R$59,90" },
    { id: 3, titulo: "React Completo", descricao: "Desenvolvimento Front-end moderno.", valor: "R$79,90" },
    { id: 4, titulo: "JavaScript Avançado", descricao: "Conceitos avançados e boas práticas.", valor: "R$69,90" },
    { id: 5, titulo: "CSS Flexbox e Grid", descricao: "Layouts responsivos com CSS.", valor: "R$39,90" },
    { id: 6, titulo: "HTML5 Sem Segredos", descricao: "Estrutura completa para sites modernos.", valor: "R$29,90" },
    { id: 7, titulo: "Express.js na Prática", descricao: "Framework para servidores Node.js.", valor: "R$54,90" },
    { id: 8, titulo: "MongoDB para Desenvolvedores", descricao: "Banco de dados NoSQL para apps.", valor: "R$64,90" },
    { id: 9, titulo: "Git e GitHub Essenciais", descricao: "Controle de versão e colaboração.", valor: "R$34,90" },
    { id: 10, titulo: "Testes Automatizados com Jest", descricao: "Garantindo qualidade no código.", valor: "R$44,90" },
    { id: 11, titulo: "Next.js: React SSR", descricao: "Renderização server-side com React.", valor: "R$84,90" }
];
let cursosComprados: { id: number, titulo: string, valor: number }[] = [];


export function main() {

    let contas: ContaController = new ContaController();

    let opcao: number;
    let nome: string, senha: string;


    while (true){

        console.clear();
        console.log(colors.bg.black, colors.fg.cyan, '');

        console.log('╔══════════════════════════════════════════════╗');
        console.log('║    📚 SkillUp - Onde sua vida evolui 📚      ║');
        console.log('╠══════════════════════════════════════════════╣');
        console.log('║                                              ║');
        console.log('║ 1 - Cadastrar                                ║');
        console.log('║ 2 - Sobre Nos                                ║');
        console.log('║ 3 - Comprar Curso                            ║');
        console.log('║ 4 - Meus Cursos                              ║');
        console.log('║ 5 - Acessar Contas                           ║');
        console.log('║ 6 - Contas Ativas                            ║');
        console.log('║ 7 - Atualizar Cadastro                       ║');
        console.log('║ 8 - Deletar Conta                            ║');        
        console.log('║ 9 - Sair                                     ║');
        console.log('║                                              ║');
        console.log('╚══════════════════════════════════════════════╝'), console.log(colors.reset);
        
        opcao = readlinesync.questionInt('\nSeja muito bem vindo!! \nPor favor informe a opcao desejada: ');
        
        if (opcao == 9) {
            console.log('\nSkillUp agradece sua visita ☺️');
            sobre();
            process.exit(0);
        }

        switch (opcao) {

            case 1:
                console.log(colors.fg.cyan, '\n**** Cadastro de Usuario ****', colors.reset);
    
                nome = readlinesync.question('Digite seu nome de usuario: ');
    
                let email = readlinesync.questionEMail('Digite seu e-mail: ');
    
                senha = readlinesync.question('Digite sua senha: ', { hideEchoBack: true, mask: '-' });
    
                try {
                    const conta = new Estudante(contas.gerarNumero(), email, senha, nome);
                    contas.cadastrar(conta);
                } catch (error: any) {
                    console.log(colors.fg.red, `Erro ao cadastrar: ${error.message}`, colors.reset);
                }
    
                keyPress();
                break;

            case 2:
                console.log('\n══════════════════════════════════════════════════════════════════════════');
                console.log('                             📚 Quem somos? 📚                             ');
                console.log('══════════════════════════════════════════════════════════════════════════\n');

                console.log('O SkillUp nasceu com um propósito: ajudar você a evoluir suas habilidades,');
                console.log('construindo um futuro melhor através do conhecimento. Aqui, acreditamos   ');
                console.log('que aprender transforma vidas, e estamos prontos para caminhar ao seu lado.');
                
                console.log('\nNosso foco é oferecer cursos práticos, acessíveis e de qualidade,');
                console.log('para que estudantes e professores cresçam juntos, formando uma comunidade ');
                console.log('unida pelo conhecimento e pela vontade de fazer a diferença.');
                console.log('══════════════════════════════════════════════════════════════════════════\n');
                
                keyPress();
                break;
                
            case 3:
                console.log('\n**** Comprar Curso ****');

                if (cursosDisponiveis.length === 0) {
                    console.log('\nNenhum curso disponível no momento.');
                } else {
                    let continuar = true;

                    while (continuar) {
                        console.log('\nCursos disponíveis:\n');

                        for (const curso of cursosDisponiveis) {
                            console.log(`ID: ${curso.id} | ${curso.titulo} - ${curso.valor}`);
                            console.log(`Descrição: ${curso.descricao}\n`);
                        }

                        console.log('Digite 0 para sair da compra de cursos.');

                        const idCurso = readlinesync.questionInt('Digite o ID do curso que deseja comprar: ');

                        if (idCurso === 0) {
                            continuar = false;
                            console.log('\nVoltando ao menu principal...');
                            break;
                        }

                        const cursoSelecionado = cursosDisponiveis.find(curso => curso.id === idCurso);

                        if (cursoSelecionado) {
                            // Verifica se o curso já foi comprado para não duplicar
                            const jaComprado = cursosComprados.some(c => c.id === cursoSelecionado.id);
                            if (jaComprado) {
                                console.log(`\n⚠️ Você já comprou o curso: ${cursoSelecionado.titulo}`);
                            } else {
                                cursosComprados.push({
                                    id: cursoSelecionado.id,
                                    titulo: cursoSelecionado.titulo,
                                    valor: Number(cursoSelecionado.valor.replace('R$', '').replace(',', '.').trim())
                                });
                                console.log(`\n✅ Você comprou o curso: ${cursoSelecionado.titulo}`);
                            }
                        } else {
                            console.log('\n❌ Curso não encontrado!');
                        }
                    }
                }

                keyPress();
                break;

            case 4:
                console.log('\n**** Meus Cursos ****');

                if (cursosComprados.length === 0) {
                    console.log('\nVocê ainda não comprou nenhum curso.');
                } else {
                    console.log('\nSeus cursos comprados:\n');

                    for (const curso of cursosComprados) {
                        console.log(`📚 ${curso.titulo} - R$ ${curso.valor}`);
                    }
                }

                keyPress();
                break;

            case 5:
                console.log('\n**** Acessar Contas ****');

                let numero = readlinesync.questionInt('Digite o numero da conta: ');
                contas.procurarPorNumero(numero); 

                keyPress();
                break;

            case 6:
                console.log('\n**** Contas Ativas ****');
                contas.listarTodas();


                keyPress();
                break;

            case 7:
                console.log('\n**** Atualizar Cadastro ****');

                let numeroAtualizar = readlinesync.questionInt('Digite o numero da conta que deseja atualizar: ');

                let conta = contas.buscarNoArray(numeroAtualizar);

                if (conta !== null) {
                    nome = readlinesync.question('Digite seu novo nome de usuario: ');
                    let emailNovo = readlinesync.questionEMail('Digite seu novo e-mail: ');
                    senha = readlinesync.question('Digite sua nova senha: ', { hideEchoBack: true, mask: '-' });

                    try {
                        conta.nome = nome;
                        conta.email = emailNovo;
                        conta.senha = senha;
                        contas.atualizar(conta);
                        console.log('\n✅ Cadastro atualizado com sucesso!');
                    } catch (error: any) {
                        console.log(colors.fg.red, `Erro ao atualizar: ${error.message}`, colors.reset);
                    }
                } else {
                    console.log(`\nConta número ${numeroAtualizar} não foi encontrada`);
                }

                keyPress();
                break;

            case 8:
                console.log('\n**** Deletar Conta ****');

                numero = readlinesync.questionInt('Digite o numero da conta: ');
                contas.deletar(numero);

                keyPress();
                break;

            default:
                console.log('\n**** Opcao Invalida :( ****')

                keyPress();
                break;
        }

    }



}

    export function sobre() {
    console.log('                                                                                               ')
    console.log('═════════════════════════════════════════════════════════════════════════════════════════════════════════');
    console.log('                                SkillUp - Onde sua vida evolui                                 ');
    console.log('                                                                                               ')
    console.log('                               Desenvolvido por: Maria Navarro                                 ');
    console.log('                                      Versão: 1.0.0                                            ');
    console.log('                        Generation Brasil - mariacdnavarro@gmail.com                           ');
    console.log('                                   github.com/marinavarroo                                     ');
    console.log('═════════════════════════════════════════════════════════════════════════════════════════════════════════');
    }

    
function keyPress(): void {
    console.log(colors.reset, '');
    console.log('\nPressione enter para continuar...');
    readlinesync.prompt();
}

main();