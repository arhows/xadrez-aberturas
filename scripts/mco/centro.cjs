// Transcrição do MCO 15ª ed. — Jogo do Centro (pp. 151–153).
// Gerar: node scripts/mco/gerar.cjs centro
// Formato: ver gambito-do-rei.cjs. Dicas em centro-dicas.cjs.

const CG = '1 e4 e5 2 d4 exd4 3 Qxd4 Nc6'
const ML = `${CG} 4 Qe3 Nf6 5 Nc3 Bb4 6 Bd2 O-O 7 O-O-O Re8 8 Qg3`

const colunas = {
  c01: [`${ML} Rxe4 9 a3 Bd6 10 f4 Re8 11 Nf3 Bc5`, 'principal', '8.Qg3 Rxe4', '∓',
    'Jogo do Centro: como no Gambito do Rei, as brancas eliminam o ponto forte preto em e5, mas a dama exposta deixa as pretas se desenvolverem com ganho de tempo. A linha principal é 4.Qe3 Nf6 5.Nc3 Bb4 6.Bd2 O-O 7.O-O-O Re8 8.Qg3, e 8...Rxe4 é a suposta refutação.'],
  c02: [`${ML} d6 9 f3 Ne5 10 h4 Kh8 11 Nh3 Nh5`, 'principal', '8.Qg3 d6', '=',
    'O mais conservador 8...d6, preferido por Karpov, também equilibra.'],
  c03: [`${CG} 4 Qe3 Nf6 5 Nc3 Be7 6 Bd2 d5 7 exd5 Nxd5 8 Qg3 Nxc3 9 Bxc3 Bf6 10 Bxf6 Qxf6 11 O-O-O O-O`, 'outras', '5...Be7', '⩲',
    '5...Be7 é um modo mais tranquilo de equilibrar o jogo.'],
  c04: [`${CG} 4 Qe3 Nf6 5 e5 Ng4 6 Qe4 d5 7 exd6+ Be6 8 Be2 Nf6 9 dxc7 Qxc7 10 Qa4 Bc5 11 c3 O-O`, 'outras', '5.e5', '=',
    'O desvio branco 5.e5 não é tão ruim.'],
  c05: [`${CG} 4 Qe3 g6 5 Nc3 Bg7 6 Bd2 Nf6 7 O-O-O O-O 8 Be2 d6 9 h4 Ne5 10 h5 Neg4 11 Qg3 Nxh5`, 'outras', '4...g6', '∞',
    '4...g6 é um modo razoável de evitar as linhas principais.'],
  c06: [`${CG} 4 Qa4 Nf6 5 Bg5 Be7 6 Nc3 O-O 7 Nf3 d6 8 O-O-O Bd7 9 Qc4 Be6 10 Qe2 Nd7 11 h4 Nde5`, 'qa4', '4.Qa4', '=',
    'Com 4.Qa4 surge uma Defesa Escandinava com um tempo a mais para as brancas. O jogo fica igual.'],
}

const notas = [
  ['c01', 'a', 'a', '(a)', '3... Qf6 4 Qe3 Bb4+ 5 c3 Ba5 6 Bc4 d6 7 f4 Ne7 8 Nf3 Nbc6 9 Qe2 Bb6', { a: '=', r: 'Thorsteinsson–Gunnarsson, Reykjavik 1990', c: 'As pretas podem tentar 3...Qf6; o jogo fica igual.' }],
  ['c01', 'b-A', 'b', '(b) A', '4 Qc4 Nf6 5 Nc3 d5', { a: '=', r: 'Mieses–Leonhardt, Berlim 1920', c: 'Com 4.Qc4 o jogo fica igual.' }],
  ['c01', 'b-B', 'b', '(b) B', '4 Qd2', { c: 'O incomum 4.Qd2.' }],
  ['c01', 'b-C', 'b', '(b) C', '4 Qd1', { c: 'Ou 4.Qd1.' }],
  ['c01', 'c', 'c', '(c)', '4... Bb4+ 5 c3 Ba5 6 Qg3 Nf6 7 b4 Bb6 8 b5 O-O', { a: '=', r: 'Vavra–Londyn, República Tcheca 2005', c: '4...Bb4+ é uma alternativa interessante; com 8...O-O! o jogo fica igual.' }],
  ['c01-c', '1', 'c', '(c) 5.Nc3', '5 Nc3 Nge7 6 Bd2 O-O 7 O-O-O d6 8 Qg3 Kh8 9 f4 f5', { a: '=', r: 'Tolush–Botvinnik, URSS 1944', c: 'Com 5.Nc3 o jogo fica igual.' }],
  ['c01-c', '2', 'c', '(c) 7.Qxg7', '7 Qxg7 Rg8 8 Qh6 Rg6', { c: 'Se 7.Qxg7 Rg8 8.Qh6 Rg6, e depois 9...Nxe4.' }],
  ['c01', 'd', 'd', '(d)', '8 Bc4 d6 9 Nh3 Ne5 10 Bb3 Be6', { a: '=', r: 'Ekdyshman–Studnicka, Aberto Tcheco 2006', c: 'Com 8.Bc4 o jogo fica igual.' }],
  ['c01', 'e', 'e', '(e)', '8... Nxe4 9 Nxe4 Rxe4 10 c3 Bf8 11 Bd3 Re8 12 Nf3', { a: '∞', c: 'Com 8...Nxe4 as brancas têm compensação pelo peão.' }],
  ['c01', 'f-A', 'f', '(f) A', '9 f4 d5 10 Bd3 Re8', { a: '∓', r: 'Wallyn–Sharif, Lyon 1990', c: 'Com 9.f4 as pretas ficam melhor.' }],
  ['c01', 'f-B', 'f', '(f) B', '9 Bd3 Rg4 10 Qh3 d6', { a: '∓', r: 'Zinn–Sax, Baja 1972 (até 10.Qh3)', c: 'Com 9.Bd3 também.' }],
  ['c01', 'g', 'g', '(g)', '9... Rg4 10 Qe3 Ba5 11 f3 Rd4 12 Bd3 Bxc3 13 Bxc3 Nd5', { a: '∓', r: 'Campora–De la Paz, Espanha 2003', c: '9...Rg4 é ousado, mas provavelmente bom.' }],
  ['c01', 'h', 'h', '(h)', '12 Bd3 d6 13 Rde1 Rxe1+ 14 Rxe1 Ne7', { a: '∓', r: 'Restuccia–Stefanova, Mar del Plata 2003', c: 'As brancas têm algum jogo pelo peão.' }],
  ['c02', 'i-A', 'i', '(i) A', '10... c6 11 h5', { a: '±', r: 'Morozevich–Hebden, Londres 1994', c: '10...c6?! deu errado para as pretas.' }],
  ['c02', 'i-B', 'i', '(i) B', '10... h6 11 Qh2', { r: 'Karpov', c: 'Contra 10...h6 o certo é 11.Qh2, preparando g4.' }],
  ['c02-i-B', '1', 'i', '(i) 11.Bxh6', '11 Bxh6 Nh5 12 Qg5 Qxg5+ 13 Bxg5 Bxc3', { a: '∞', c: 'Não 11.Bxh6: as pretas têm compensação.' }],
  ['c02', 'j', 'j', '(j)', '12 Qh2 c6 13 a3 Ba5', { r: 'Shirov–Karpov, Dos Hermanas 1995', c: 'Partida Shirov–Karpov.' }],
  ['c02-j', '1', 'j', '(j) 14.Nf4', '14 Nf4', { a: '=', c: 'Agora 14.Nf4 teria mantido o equilíbrio.' }],
  ['c02-j', '2', 'j', '(j) 14.Ng5', '14 Ng5', { a: '=', c: 'Ou 14.Ng5.' }],
  ['c03', 'k-A', 'k', '(k) A', '6 Qg3 O-O 7 Bh6 Ne8 8 Bf4 d6 9 O-O-O Be6', { a: '⩲', r: 'Winawer–Janowski, Nuremberg 1896', c: '6.Qg3 é uma alternativa; as brancas ficaram um pouco melhor.' }],
  ['c03', 'k-B', 'k', '(k) B', '6 Bc4 Nb4 7 Qd2 O-O 8 a3 Nc6', { a: '=', r: 'Soloviev–Yudovic, URSS 1955', c: 'Com 6.Bc4 as brancas não tiveram vantagem.' }],
  ['c03', 'l', 'l', '(l)', '8 Nxd5 Qxd5 9 Ne2 Bg4 10 Nf4 Qd7 11 f3 O-O-O 12 O-O-O Bf5 13 Bd3 Bd6', { a: '∓', r: 'Griffiths', c: '8.Qg3 é melhor que 8.Nxd5, que deixa as pretas melhor.' }],
  ['c03', 'm', 'm', '(m)', '8... O-O 9 Bh6 Bf6 10 O-O-O Be6 11 Ne4 Kh8', { a: '=', r: 'Anand', c: 'Anand recomenda 8...O-O; o jogo fica igual.' }],
  ['c03', 'n', 'n', '(n)', '12 Nf3', { a: '⩲', r: 'Adams–Anand, Linares 1994', c: 'Depois de 12.Nf3 as brancas ficam com uma pequena vantagem.' }],
  ['c04', 'o', 'o', '(o)', '6 Qe2 d6 7 f3 Nh6', { a: '∓', c: 'Com 6.Qe2 d6 7.f3 Nh6 as pretas ficam melhor.' }],
  ['c04-o', '1', 'o', '(o) 8.Bxh6', '8 Bxh6 Qh4+ 9 Qf2 Qxh6', { a: '∓', c: 'Tanto 8.Bxh6 Qh4+ 9.Qf2 Qxh6…' }],
  ['c04-o', '2', 'o', '(o) 8.exd6+', '8 exd6+ Be6', { a: '∓', c: '…quanto 8.exd6+ Be6 favorecem as pretas.' }],
  ['c04-o', '3', 'o', '(o) 6...d5', '6... d5 7 h3 Nh6 8 Bxh6 gxh6 9 Nf3', { a: '±', c: 'Com 6...d5 as brancas ficam melhor.' }],
  ['c04-o', '4', 'o', '(o) 7.exd6+', '7 exd6+ Be6 8 dxc7 Qxc7 9 Nf3 Bc5', { a: '∓', r: 'Makovets–Maróczy, Budapeste 1895', c: '7.exd6+ também não ajuda.' }],
  ['c04-o', '5', 'o', '(o) 7.h3', '7 h3 Ngxe5 8 f4 Qh4+ 9 Kd1', { a: '∓', c: 'Nem 7.h3. (O livro continua 9...Ne4, casa a que nenhum cavalo preto chega; a linha foi cortada em 9.Kd1.)' }],
  ['c04', 'p-A', 'p', '(p) A', '8 dxc7 Qd1+ 9 Kxd1 Nxf2+ 10 Ke1 Nxe4', { a: '∓', c: 'Com 8.dxc7 as pretas ficam melhor.' }],
  ['c04', 'p-B', 'p', '(p) B', '8 Ba6 Qxd6 9 Bxb7 Qb4+ 10 Qxb4 Nxb4 11 Na3 Rb8 12 Bf3 Ne5', { a: '∓', r: 'Mieses–Burn, Breslau 1912', c: 'Com 8.Ba6 também.' }],
  ['c04', 'p-C', 'p', '(p) C', '8 Bc4', { c: '8.Bc4 também é possível.' }],
  ['c04', 'p-D', 'p', '(p) D', '8 Bb5', { c: 'Assim como 8.Bb5.' }],
  ['c04', 'q', 'q', '(q)', '12 Nf3 Ng4 13 O-O Qb6 14 Ng5 Nxf2 15 Qc2 Nh3+ 16 Kh1 Nxg5 17 Bxg5 Be3', { a: '=', r: 'Ghinda–Lukacs, Băile Herculane 1982', c: 'O jogo fica igual.' }],
  ['c05', 'r', 'r', '(r)', '5 Bc4 Bg7 6 Ne2 Nge7 7 Nbc3 O-O', { a: '=', r: 'Skripchenko–E. Atalik, Accentus Ladies 2006', c: 'Com 5.Bc4 o jogo fica igual.' }],
  ['c05', 's', 's', '(s)', '6 Nf3 Nge7 7 Bc4 d6 8 Bd2 O-O 9 O-O-O a6', { a: '=', r: 'Smederevac–Kicović, Iugoslávia 1954', c: 'Com 6.Nf3 o jogo fica provavelmente igual.' }],
  ['c05', 't', 't', '(t)', '6... Nge7 7 O-O-O O-O 8 Bc4 d6 9 h4', { a: '⩲', r: 'Mieses–Spielmann, Breslau 1912', c: 'Com 6...Nge7 as brancas ficam um pouco melhor.' }],
  ['c05', 'u', 'u', '(u)', '12 Rxh5 gxh5 13 f3', { a: '∞', r: 'Chigorin–Otto, São Petersburgo 1883', c: 'As brancas têm jogo razoável pelo material sacrificado.' }],
  ['c06', 'v-A', 'v', '(v) A', '4... Bc5', { c: '4...Bc5 deve ser razoável.' }],
  ['c06', 'v-B', 'v', '(v) B', '4... Be7', { c: 'Assim como 4...Be7.' }],
  ['c06', 'v-C', 'v', '(v) C', '4... g6', { c: 'E 4...g6.' }],
  ['c06', 'w', 'w', '(w)', '5 Nf3 d5 6 Nc3 dxe4', { a: '=', c: 'Com 5.Nf3 as pretas igualam de imediato.' }],
  ['c06', 'x', 'x', '(x)', '5... h6 6 Bh4 Qe7 7 Nc3 Qb4 8 Qxb4 Bxb4 9 Bxf6 gxf6 10 Ne2', { a: '⩲', r: 'Keres', c: 'Com 5...h6 as brancas ficam um pouco melhor.' }],
  ['c06', 'y', 'y', '(y)', '8... Ng4 9 Bxe7 Qxe7 10 Rd2', { a: '=', c: '8...Ng4 também é possível; as brancas têm dificuldade de provar vantagem.' }],
  ['c06', 'z', 'z', '(z)', '11 Bxe7 Qxe7', { a: '=', c: '11.h4 é uma tentativa de animar o jogo. Depois de 11.Bxe7 Qxe7 o espaço um pouco maior das brancas vale pouco. A coluna é Milev–Chipev, Bulgária 1961.' }],
]

const capitulo = {
  id: 'centro',
  arquivo: 'centro',
  nome: 'Jogo do Centro',
  fonte: 'Modern Chess Openings — Center Game (pp. 151–153), colunas 1–6',
  base: '1. e4 e5 2. d4 exd4 3. Qxd4',
  corPadrao: 'w',
  ordem: 151,
  grupos: [
    { id: 'principal', nome: 'Linha principal (8.Qg3)', colunas: [1, 2] },
    { id: 'outras', nome: '4.Qe3: outras linhas', colunas: [3, 4, 5] },
    { id: 'qa4', nome: '4.Qa4', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
