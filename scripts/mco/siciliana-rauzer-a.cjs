// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Clássica, Ataque Richter-Rauzer (pp. 320–322), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs siciliana-rauzer-a
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-rauzer-a-dicas.cjs.
//
// Só a coluna 5 traz avaliação no fim; nas outras a avaliação vem da nota que continua a coluna.
// Nota (d): o livro escreve "18 gxf6 ... 20 fxg6"; não há peão branco em g2 que capture em f6, nem peça em g6.
// Usei 18 exf6 e 20 fxg7, a leitura que deixa a linha legal.

const B = '1 e4 c5 2 Nf3 Nc6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 d6 6 Bg5 e6 7 Qd2 Be7 8 O-O-O O-O'

const colunas = {
  c01: [`${B} 9 f4 Nxd4 10 Qxd4 Qa5 11 Bc4 Bd7 12 e5 dxe5 13 fxe5 Bc6 14 Bd2 Nd7 15 Nd5 Qd8 16 Nxe7+ Qxe7`, 'f4', '9.f4 Nxd4 10.Qxd4 Qa5 11.Bc4 Bd7 12.e5', '⩲',
    'No Ataque Richter-Rauzer, 6.Bg5, as brancas cravam o cavalo de f6 indiretamente e preparam Qd2 e O-O-O. Depois do desenvolvimento natural das pretas, 9.f4 cria problemas. Na coluna as brancas abrem o centro com 12.e5 e ficam com uma pequena vantagem.'],
  c02: [`${B} 9 f4 Nxd4 10 Qxd4 Qa5 11 Bc4 Bd7 12 Bb3 Bc6 13 h4 h6 14 Kb1 Qc5 15 Qd3 b5 16 Bxf6 Bxf6`, 'f4', '12.Bb3', '±',
    'Com 12.Bb3 as brancas tiram o bispo do ataque e preparam o avanço na ala do rei. As pretas oferecem a troca das damas com 14...Qc5, mas as brancas ficam melhor.'],
  c03: [`${B} 9 f4 h6 10 Bh4 e5 11 Nf5 Bxf5 12 exf5 exf4 13 Kb1 d5 14 Bxf6 Bxf6 15 Nxd5 Be5 16 Bc4 b5`, 'f4', '9...h6', '±',
    'Com 9...h6 as pretas questionam o bispo antes de jogar ...e5. Depois de 11.Nf5 Bxf5 12.exf5 as pretas sacrificam o peão d5 por atividade, mas as brancas ficam melhor.'],
  c04: [`${B} 9 Nb3 Qb6 10 f3 Rd8 11 Be3 Qc7 12 Qf2 d5 13 exd5 Nxd5 14 Nxd5 Rxd5 15 Rxd5 exd5 16 Bb5 Ne5`, 'nb3', '9.Nb3 Qb6', '=',
    'Com 9.Nb3 as brancas evitam trocas e mantêm as peças. Depois de 9...Qb6 10.f3 Rd8 as pretas liberam o jogo com ...d5 e igualam.'],
  c05: [`${B} 9 Nb3 a5 10 a4 d5 11 Bb5 Nb4 12 e5 Nd7 13 Bxe7 Qxe7 14 f4 b6 15 h4 Nc5 16 Nd4`, 'nb3', '9...a5', '±',
    'Com 9...a5 as pretas ameaçam ...a4 para expulsar o cavalo. Depois de 10.a4 d5 11.Bb5 e 12.e5 as brancas fecham o centro e ficam melhor (Fedorowicz–Winants, Wijk aan Zee 1988).'],
  c06: [`${B} 9 Nb3 a6 10 Bxf6 gxf6 11 Qh6 Kh8 12 Qh5 Qe8 13 f4 Rg8 14 Bd3 Rg7 15 g4 b5 16 h4 b4`, 'nb3', '9...a6', '±',
    'Com 9...a6 as pretas preparam ...b5. As brancas trocam em f6, quebram o roque preto e levam a dama para h5; apesar da posição estranha da dama, ficam claramente melhor.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '8... Nxd4 9 Qxd4 O-O 10 e5 dxe5 11 Qxe5 Qe8 12 h4 Bd7 13 Rh3 Bc6 14 Rg3 Qb8 15 Qe3', { a: '⩲', r: 'Tal–Timman, Bruxelas 1988', c: 'A coluna 1 às vezes surge pela ordem 8...Nxd4 9.Qxd4 O-O 10.f4. Nela as brancas podem jogar 10.e5, que exige defesa cuidadosa.' }],
  ['c01', 'b-A', 'b', '(b) A', '11 Kb1 h6 12 h4 Rd8 13 Qe3 Bd7 14 Bd3 Bc6', { a: '=', r: 'Ács–Wells, Olimpíada de Calvià 2004', c: 'Contra outros lances as pretas têm vida mais fácil: 11.Kb1 h6 12.h4 Rd8 é igual.' }],
  ['c01-b-A', '1', 'b', '(b) A 12.Bh4', '12 Bh4 e5', { a: '=', c: '12.Bh4 e5! também é igual.' }],
  ['c01', 'b-B', 'b', '(b) B', '11 e5 dxe5 12 Qxe5 Qxe5 13 fxe5 Nd5 14 Bxe7 Nxe7 15 Bd3 b6 16 Be4 Rb8 17 Rhe1 Ng6 18 Bxg6 fxg6 19 Nb5 Bb7 20 g3 a6 21 Nd6 Bd5', { a: '=', r: 'Short–Kramnik, Riga 1995', c: '11.e5 dxe5 12.Qxe5 Qxe5 13.fxe5 Nd5 leva a um final igual.' }],
  ['c01-b-B', '1', 'b', '(b) B 12.fxe5', '12 fxe5 Rd8', { a: '∓', c: '12.fxe5?! Rd8 deixa as pretas um pouco melhor.' }],
  ['c01', 'c', 'c', '(c)', '14 Bxf6 gxf6 15 Bd5 f5 16 Bxc6 bxc6 17 g4 Bg5+ 18 Kb1 Rad8', { a: '=', r: 'J. Polgár–Kramnik, Linares 1994', c: 'Com 14.Bxf6 gxf6 15.Bd5 f5! o jogo fica igual.' }],
  ['c01', 'd', 'd', '(d)', '14... Bc5 15 Qh4 Nd7 16 Nd5 Qa4 17 Nf6+ Nxf6 18 exf6 Rfd8 19 Qg5 Bf8 20 fxg7', { a: '±', r: 'Bologan–Kotronias, Olimpíada de Turim 2006', c: 'Com 14...Bc5 15.Qh4 as brancas atacam o rei e ficam melhor.' }],
  ['c01', 'e', 'e', '(e)', '17 Rhe1 Rfd8 18 Qg4 Nf8 19 Bd3 Rxd3 20 cxd3 Qd7 21 Bb4 Qd5 22 Bxf8 Rxf8 23 Kb1', { a: '⩲', r: 'Tiviakov–Atalik, Pequim 1997', c: 'Depois de 17.Rhe1 Rfd8 18.Qg4 Nf8 19.Bd3 as pretas costumam sacrificar a qualidade com 19...Rxd3, mas as brancas mantêm uma pequena vantagem.' }],
  ['c01-e', '1', 'e', '(e) 19...Rd5', '19... Rd5 20 Bb4 Qd8 21 h4 Ng6 22 Bxg6 hxg6 23 h5 g5 24 Bd2 Rd4', { r: 'Yemelin–Kharlov, Campeonato Russo 1996', c: 'As pretas também podem tentar 19...Rd5, com a ideia de responder 23.h5 com 23...g5 24.Bd2 Rd4.' }],
  // Coluna 2
  ['c02', 'f-A', 'f', '(f) A', '12 Rhe1 Bc6 13 f5 b5 14 Bb3 b4 15 e5 bxc3', { a: '∓', r: 'A. Ivanov–Khan, Chicago 1997', c: 'As brancas já tentaram vários lances aqui. Com 12.Rhe1 Bc6 13.f5 b5 as pretas ficam um pouco melhor depois de 15...bxc3!, porque 16.exf6 Qxf5 defende.' }],
  ['c02', 'f-B', 'f', '(f) B', '12 Rd3 Rad8 13 e5 dxe5 14 Qxe5 Qb4 15 Rg3 Kh8 16 Bd3 Bc6 17 Rh3 Rfe8', { a: '=', r: 'Anand–Kramnik, Las Palmas 1996', c: 'Com 12.Rd3 Rad8 13.e5 o jogo fica igual depois de 17...Rfe8!.' }],
  ['c02-f-B', '1', 'f', '(f) B 13.Rg3', '13 Rg3 Kh8', { c: '13.Rg3 Kh8 é a alternativa.' }],
  ['c02-f-B', '2', 'f', '(f) B 18.Bxf6', '18 Bxf6 Bxf6 19 Rxh7+ Kg8', { c: '18.Bxf6?! Bxf6 19.Rxh7+ Kg8 passa a iniciativa às pretas.' }],
  ['c02', 'f-C', 'f', '(f) C', '12 Kb1 Bc6 13 Rhf1 h6 14 Bh4 Qh5', { a: '=', r: 'Tal–Larsen 1969', c: 'Com 12.Kb1 Bc6 13.Rhf1 h6 14.Bh4 Qh5! a dama vai para a ala do rei, um recurso defensivo importante.' }],
  ['c02', 'g', 'g', '(g)', '13 Qd3 b5 14 Kb1 h6 15 Bxf6 Bxf6 16 Qxd6 Qb6', { a: '=', r: 'J. Polgár–Salov, Dos Hermanas 1997', c: 'As pretas ficam bem depois de 13.Qd3 b5!, porque 16.Qxd6 Qb6 e 17...Rfd8 dão jogo ativo.' }],
  ['c02', 'h', 'h', '(h)', '17 Qxd6 Qxd6 18 Rxd6 Rfc8 19 f5', { a: '±', c: 'Com 17.Qxd6 Qxd6 18.Rxd6 Rfc8 19.f5 as brancas ficam melhor.' }],
  ['c02-h', '1', 'h', '(h) 19.e5', '19 e5 Be7 20 Rd2 b4 21 Na4 Rd8', { a: '∓', c: 'Mas não 19.e5 Be7 20.Rd2 b4, que favorece as pretas.' }],
  ['c02-h', '2', 'h', '(h) 16.a3', '16 a3 a5 17 f5 b4', { a: '∓', r: 'Topalov–Kramnik, Novgorod 1995', c: 'Em vez da continuação da coluna, Topalov–Kramnik viu 16.a3?! a5 17.f5 b4, com vantagem preta.' }],
  // Coluna 3
  ['c03', 'i-A', 'i', '(i) A', '9... e5 10 Nf5 Bxf5 11 exf5', { c: 'O imediato 9...e5 10.Nf5 Bxf5 11.exf5 não é tão bom, porque ...exf4 sempre pode ser respondido com Bxf4.' }],
  ['c03', 'i-B', 'i', '(i) B', '9... d5 10 e5 Nd7 11 Bxe7', { c: 'Também é suspeito 9...d5 10.e5 Nd7 11.Bxe7, que troca o bom bispo preto.' }],
  ['c03', 'j', 'j', '(j)', '10 Bxf6 Bxf6 11 Nxc6 bxc6 12 Qxd6 Qb6 13 Qd3 Rb8 14 b3 Rd8 15 Qf3 Rd4 16 Rxd4 Bxd4', { a: '=', r: 'Relange–D. Gurevich, Capelle-la-Grande 1994', c: 'Pegar o peão d dá às pretas o jogo típico nas casas escuras.' }],
  ['c03-j', '1', 'j', '(j) 16.e5', '16 e5 Rxf4', { c: '16.e5? Rxf4 é pior.' }],
  ['c03', 'k', 'k', '(k)', '14 Qxf4 d4 15 Bxf6 Bxf6 16 Ne4 Be5 17 Qf3 Rc8 18 Bc4 b5', { r: 'Matulović–Ivanović, Belgrado 1985', c: '14.Qxf4 d4 15.Bxf6 Bxf6 16.Ne4 Be5 com 18...b5! dá contrajogo às pretas.' }],
  ['c03', 'l', 'l', '(l)', '17 Bb3 a5 18 a3 a4 19 Ba2 b4 20 Nxb4 Qf6 21 Nd5 Qxf5 22 Qd3 Qg5 23 Qe4 Rab8 24 c3', { a: '±', r: 'Sabel–Lensky, por correspondência 1992', c: 'Com 17.Bb3 as brancas mantêm o peão a mais e ficam melhor.' }],
  ['c03-l', '1', 'l', '(l) 17.Bxb5', '17 Bxb5 Rb8 18 c4 Nd4 19 Rhe1 f6', { a: '=', c: '17.Bxb5 Rb8 18.c4 Nd4 é igual.' }],
  // Coluna 4
  ['c04', 'm-A', 'm', '(m) A', '9 Ndb5 Qa5 10 Bxf6 Bxf6 11 Nxd6 Rd8 12 f4 e5', { a: '=', r: 'Korchnoi–Boleslavsky, Campeonato da URSS 1952', c: 'Como sempre, ir atrás do peão d dá bom jogo às pretas.' }],
  ['c04-m-A', '1', 'm', '(m) A 10.Nxd6', '10 Nxd6 Rd8', { c: '10.Nxd6? Rd8 é pior.' }],
  ['c04', 'm-B', 'm', '(m) B', '9 f3 a6 10 g4 d5 11 exd5 Nxd5 12 Bxe7 Ncxe7', { a: '=', r: 'Rasik–Epishin, República Tcheca 1994', c: '9.f3 a6 10.g4 d5 leva a um jogo igual.' }],
  ['c04', 'n', 'n', '(n)', '10... a6 11 h4 Rd8 12 h5 Qc7 13 h6 g6 14 Qf4 Ne8 15 Bxe7', { a: '⩲', r: 'Korneev–Babula, Bundesliga 2007', c: '10...a6 11.h4 e 13.h6! deixam as pretas um pouco soltas na ala do rei.' }],
  ['c04', 'o', 'o', '(o)', '11 Nb5 Rd7 12 Qe1 a6 13 Be3 Qd8 14 N5d4 Nxd4 15 Nxd4 Rc7 16 g4 b5 17 g5 Nd7', { a: '=', r: 'Shirov–Romero Holmes, Liga Espanhola 2006', c: 'Com 11.Nb5 Rd7 o jogo fica igual.' }],
  ['c04', 'p', 'p', '(p)', '12... Nd7 13 Nb5 Qb8 14 g4 a6 15 N5d4', { a: '±', r: 'Fischer–Benko, Campeonato dos EUA 1959/60', c: '12...Nd7 13.Nb5 Qb8 14.g4 deixa as brancas melhor.' }],
  ['c04', 'q', 'q', '(q)', '17 Bxa7 Nc4 18 Bc5 Rxa2', { a: '=', r: 'van der Wiel–Salov, Wijk aan Zee 1992', c: 'Com 17.Bxa7 Nc4 18.Bc5 Rxa2 o jogo fica igual.' }],
  ['c04-q', '1', 'q', '(q) 17.Rd1', '17 Rd1 Nc4', { a: '=', c: '17.Rd1 Nc4 também é igual.' }],
  // Coluna 5
  ['c05', 'r', 'r', '(r)', '10 a3 a4 11 Nd4 d5 12 exd5 Nxd5 13 Bxe7 Ncxe7 14 Bc4 Nb6 15 Ba2 Bd7', { a: '=', r: 'van der Wiel–Sosonko, Wijk aan Zee 1982', c: 'Com 10.a3 a4 11.Nd4 d5 as pretas igualam.' }],
  ['c05', 's', 's', '(s)', '11... dxe4 12 Qxd8 Bxd8 13 Rhe1 Na7 14 Bc4 h6 15 Bxf6 gxf6 16 Nxe4 f5 17 Nd6 Bc7 18 g3 b6 19 Nxf5 exf5 20 Bd5 Be6 21 Bxa8 Rxa8 22 Nd4 Bd5 23 Re7 Rc8 24 Nb5 Nxb5 25 Rxd5', { a: '+−', r: 'Tal–Korchnoi, Torneio de Candidatos de Montpellier 1985', c: 'Capturar em e4 dá às brancas uma forte iniciativa no final: Korchnoi abandonou depois de 24.Nb5!.' }],
  ['c05', 't-A', 't', '(t) A', '12 Rhe1 Bd7 13 e5 Ne8 14 h4 Nc7 15 Nd4', { a: '±', r: 'Z. Wang–Gurevich, Belgrado 1988', c: '12.Rhe1 Bd7 13.e5 Ne8 14.h4! também dá vantagem às brancas.' }],
  ['c05', 't-B', 't', '(t) B', '12... Ne8', { c: 'O jogo seria parecido com o da nota anterior se as pretas respondessem 12...Ne8 a 12.e5.' }],
  // Coluna 6
  ['c06', 'u-A', 'u', '(u) A', '11 f4 Kh8 12 f5 b5 13 Kb1 Rg8 14 Ne2 exf5 15 exf5 Ne5 16 Nbd4 Bb7', { a: '=', r: 'Klovans–Smirin, Genebra 1992', c: 'Com 11.f4 Kh8 12.f5 b5 o jogo fica igual.' }],
  ['c06', 'u-B', 'u', '(u) B', '11 h4 Kh8 12 g4 b5 13 g5 b4 14 Na4 Rg8 15 f4', { a: '⩲', r: 'Short–Karpov, match 1992', c: '11.h4 Kh8 12.g4 b5 13.g5 coloca as pretas sob pressão.' }],
  ['c06', 'v', 'v', '(v)', '17 Ne2 e5 18 f5 a5 19 Kb1 a4 20 Nd2', { a: '±', r: 'Adams–Frías, Londres 1990', c: 'Com 17.Ne2 e5 18.f5 as brancas ficam claramente melhor, apesar da posição estranha da dama.' }],
]

const capitulo = {
  id: 'siciliana-rauzer-a',
  arquivo: 'siciliana-rauzer-a',
  nome: 'Siciliana Clássica — Richter-Rauzer com 8...O-O',
  fonte: 'Modern Chess Openings — Sicilian Defense, Richter-Rauzer Attack (pp. 320–322), colunas 1–6',
  base: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 d6 6. Bg5 e6 7. Qd2 Be7 8. O-O-O O-O',
  corPadrao: 'b',
  ordem: 320,
  grupos: [
    { id: 'f4', nome: '9.f4', colunas: [1, 2, 3] },
    { id: 'nb3', nome: '9.Nb3', colunas: [4, 5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
