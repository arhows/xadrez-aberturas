// Transcrição do MCO 15ª ed. — Defesa Nimzo-Índia, Variante Clássica: 4...c5, 4...Nc6 e 4...d6 (pp. 545–546), colunas 13–18.
// Gerar: node scripts/mco/gerar.cjs nimzo-c
// Formato: ver gambito-do-rei.cjs. Dicas em nimzo-c-dicas.cjs.
//
// Errata: nota (c), "8 Bf4 d5 9 Qc2" é impossível (a dama já está em c2 desde o 4º lance);
// a linha foi cortada em 8...d5, e o comentário registra a transposição para o GDR 5.Bf4.
// As colunas 13, 15, 16 e 18 não trazem avaliação no fim; cada uma usa a da nota que a continua.
// Errata: nota (j), 14...Nd7 é impossível (cavalos pretos em d8 e h5); linha cortada em 14.O-O-O.
// Notas só com comentário: (c), (d), (n)A, (p).

const C = '1 d4 Nf6 2 c4 e6 3 Nc3 Bb4 4 Qc2'

const colunas = {
  c13: [`${C} c5 5 dxc5 O-O 6 a3 Bxc5 7 Nf3 Nc6 8 Bg5 Nd4 9 Nxd4 Bxd4 10 e3 Qa5 11 exd4 Qxg5 12 Qd2 Qxd2+`, 'c5', '4...c5 5.dxc5 O-O 6.a3!', '⩲',
    'Com 4...c5 as pretas atacam d4 logo. Depois de 5.dxc5 O-O 6.a3! Bxc5 7.Nf3 Nc6 8.Bg5! Nd4 9.Nxd4 Bxd4 10.e3 Qa5 11.exd4 Qxg5 12.Qd2 Qxd2+ 13.Kxd2 as brancas ficam com um final melhor: é o problema de 4...c5.'],
  c14: [`${C} c5 5 dxc5 O-O 6 Bg5 Na6 7 a3 Bxc3+ 8 Qxc3 Nxc5 9 Bxf6 Qxf6 10 Qxf6 gxf6 11 f3 a5 12 e4 b6`, 'c5', '6.Bg5', '=',
    'Com 6.Bg5 Na6 7.a3 Bxc3+ 8.Qxc3 Nxc5 as pretas recuperam o peão. Depois de 9.Bxf6 Qxf6 10.Qxf6 gxf6 11.f3 a5 12.e4 b6 o final é igual.'],
  c15: [`${C} Nc6 5 Nf3 d6 6 Bd2 O-O 7 a3 Bxc3 8 Bxc3 Qe7 9 g3 e5 10 d5 Nd8 11 Nh4 Nh5 12 e4 g6`, 'nc6', '4...Nc6 5.Nf3 d6', '⩲',
    'Na Variante Milner-Barry, 4...Nc6, as pretas preparam ...d6 e ...e5. Depois de 5.Nf3 d6 6.Bd2! O-O 7.a3 Bxc3 8.Bxc3 Qe7 9.g3 e5 10.d5 Nd8 11.Nh4 Nh5 12.e4 g6, com 13.Bd3 as brancas ficam um pouco melhor.'],
  c16: [`${C} Nc6 5 Nf3 O-O 6 Bg5 h6 7 Bh4 d6 8 e3 Qe7 9 Be2 e5 10 d5 Nb8 11 Nd2 Nbd7 12 O-O a5`, 'nc6', '5...O-O', '⩲',
    'Com 5...O-O 6.Bg5 h6 7.Bh4 d6 8.e3 Qe7 9.Be2 e5 10.d5 o cavalo de c6 precisa recuar. Depois de 10...Nb8 11.Nd2 Nbd7 12.O-O a5, com 13.Rae1 e 14.f4 as brancas ficam um pouco melhor.'],
  c17: [`${C} d6 5 Bg5 c5 6 e3 cxd4 7 exd4 Qa5 8 Bxf6 Bxc3+ 9 bxc3 gxf6 10 Nf3 Nd7 11 Nd2 b6 12 Rb1`, 'd6', '4...d6 5.Bg5', '⩲',
    'Com 4...d6 as pretas jogam com calma. Depois de 5.Bg5 c5 6.e3 cxd4 7.exd4 Qa5 8.Bxf6 Bxc3+ 9.bxc3 gxf6 10.Nf3 Nd7 11.Nd2 b6 12.Rb1 as pretas têm a estrutura arruinada e as brancas ficam um pouco melhor.'],
  c18: [`${C} d6 5 Nf3 Nbd7 6 g3 b6 7 Bg2 Bb7 8 O-O Bxc3 9 Qxc3 a5 10 Rd1 O-O 11 b3 h6 12 Bb2 Re8`, 'd6', '5.Nf3', '⩲',
    'Com 5.Nf3 Nbd7 6.g3 b6 7.Bg2 Bb7 8.O-O as brancas fazem o fianqueto. Depois de 8...Bxc3 9.Qxc3 a5 10.Rd1 O-O 11.b3 h6 12.Bb2 Re8, com 13.Rac1 e 14.d5 as brancas ficam um pouco melhor.'],
}

const notas = [
  // Coluna 13
  ['c13', 'a-A', 'a', '(a) A', '5... Na6 6 a3 Bxc3+ 7 Qxc3 Nxc5 8 b4 Nce4 9 Qb2 d5 10 c5 h6 11 Be3 O-O 12 f3 Ng5 13 Bd4', { a: '±', r: 'Serper–Ippolito, Campeonato dos EUA 2003', c: '5...Na6 6.a3 Bxc3+ 7.Qxc3 Nxc5 8.b4 Nce4 9.Qb2 d5 10.c5 h6 11.Be3 O-O 12.f3 Ng5 13.Bd4 é melhor para as brancas.' }],
  ['c13-a-A', '1', 'a', '(a) A 8.f3', '8 f3 d5 9 cxd5 b6', { a: '∞', c: '8.f3 d5! 9.cxd5 b6 leva a uma posição pouco clara.' }],
  ['c13', 'a-B', 'a', '(a) B', '5... Qc7 6 a3 Bxc5 7 b4 Be7 8 Nb5 Qc6 9 e4 a6 10 Nc3', { a: '±', r: 'Korchnoi–Akopian, Enghien-les-Bains 2003', c: '5...Qc7?! 6.a3 Bxc5 7.b4 Be7 8.Nb5 Qc6 9.e4! a6 10.Nc3 é melhor para as brancas.' }],
  ['c13', 'b', 'b', '(b)', '7... b6 8 Bf4 Bb7 9 Rd1 Nc6 10 e4 Ng4 11 Bg3', { a: '⩲', r: 'Lautier–Wahls, Baden-Baden 1992', c: '7...b6 8.Bf4 Bb7 9.Rd1 Nc6 10.e4 Ng4 11.Bg3 é um pouco melhor para as brancas.' }],
  ['c13-b', '1', 'b', '(b) 8...Nh5', '8... Nh5 9 Bg5 Be7 10 h4 Bb7 11 O-O-O d6 12 e4', { a: '⩲', r: 'Eljanov–Gulko, Montreal 2006', c: '8...Nh5!? 9.Bg5 Be7 10.h4 Bb7 11.O-O-O d6 12.e4 é um pouco melhor para as brancas.' }],
  ['c13', 'c', 'c', '(c)', '8 Bf4 d5', { c: '8.Bf4 d5 transpõe para uma linha mais ou menos igual do Gambito da Dama Recusado (5.Bf4). O livro continua com "9.Qc2", impossível porque a dama já está em c2.' }],
  ['c13', 'd', 'd', '(d)', '8... Be7 9 Rd1 b6 10 e3 Bb7 11 Be2 d6 12 Rd2 Qb8 13 O-O', { r: 'Korchnoi–Tiviakov, Tilburg 1992', c: '8...Be7 9.Rd1 b6 10.e3 Bb7 11.Be2 d6 12.Rd2 Qb8 13.O-O: as pretas têm dificuldade para liberar a posição.' }],
  ['c13', 'e', 'e', '(e)', '13 Kxd2 b6 14 b4 d6 15 Bd3 Rd8 16 f3', { a: '⩲', r: 'Kasparov–Kramnik, Tilburg 1997', c: '13.Kxd2 b6 14.b4 d6 15.Bd3 Rd8 16.f3 é um pouco melhor para as brancas. Esse é o problema de 4...c5: as brancas ficam com um final melhor.' }],
  // Coluna 14
  ['c14', 'f-A', 'f', '(f) A', '6 Nf3 Na6 7 g3 Nxc5 8 Bg2 Nce4 9 O-O Nxc3 10 bxc3 Be7 11 Rd1 Qc7 12 Qd3 Rd8', { a: '=', r: 'Wilder–Pinter, Dortmund 1988', c: '6.Nf3 Na6! 7.g3 Nxc5 8.Bg2 Nce4 9.O-O Nxc3 10.bxc3 Be7 11.Rd1 Qc7 12.Qd3 Rd8 é igual.' }],
  ['c14-f-A', '1', 'f', '(f) A 7.a3', '7 a3 Bxc3+ 8 Qxc3 Nxc5', { a: '=', c: '7.a3 Bxc3+ 8.Qxc3 Nxc5 é igual.' }],
  ['c14', 'f-B', 'f', '(f) B', '6 Bf4 Na6 7 Bd6 Re8 8 a3 Qa5 9 Rc1 Bxc3+ 10 Qxc3 Qxc3+ 11 Rxc3 Ne4', { a: '=', r: 'Donner–Karpov, Amsterdã 1981', c: '6.Bf4 Na6 7.Bd6 Re8 8.a3 Qa5 9.Rc1 Bxc3+ 10.Qxc3 Qxc3+ 11.Rxc3 Ne4 é igual.' }],
  ['c14', 'g', 'g', '(g)', '9 f3 Nfe4 10 Bxd8 Nxc3 11 Be7 Nb3 12 Bxf8 Kxf8', { a: '∓', c: '9.f3 Nfe4! 10.Bxd8 Nxc3 11.Be7 Nb3 12.Bxf8 Kxf8 é melhor para as pretas. A coluna é Kotov–Averbakh, Campeonato da URSS 1951.' }],
  ['c14-g', '1', 'g', '(g) 9.Nf3', '9 Nf3 Nfe4', { a: '=', c: '9.Nf3 Nfe4! é parecido, com igualdade.' }],
  // Coluna 15
  ['c15', 'h', 'h', '(h)', '6 a3 Bxc3+ 7 Qxc3 a5 8 b3 O-O 9 Bb2 Re8 10 Rd1 Qe7 11 d5 Nb8', { a: '=', r: 'Donner–Reshevsky, Amsterdã 1950', c: '6.a3 Bxc3+ 7.Qxc3 a5 8.b3 O-O 9.Bb2 Re8 10.Rd1 Qe7 11.d5 Nb8 é igual.' }],
  ['c15', 'i', 'i', '(i)', '6... e5 7 dxe5 dxe5 8 O-O-O Bxc3 9 Bxc3 Qe7 10 e3 Bg4 11 h3 Bh5 12 Qb3 Rb8 13 g4 Bg6 14 Nh4', { a: '±', r: 'Ragozin–Lisitsin, Campeonato da URSS 1944', c: '6...e5 7.dxe5 dxe5 8.O-O-O! Bxc3 9.Bxc3 Qe7 10.e3 Bg4 11.h3 Bh5 12.Qb3 Rb8 13.g4 Bg6 14.Nh4 é melhor para as brancas.' }],
  ['c15', 'j', 'j', '(j)', '13 Bd3 a5 14 O-O-O', { a: '⩲', r: 'Rowson–Berzinsh, 4NCL 2007', c: '13.Bd3 a5 14.O-O-O é um pouco melhor para as brancas. O livro segue com 14...Nd7 15.Qd2 Nc5 16.Bc2 a4 17.f4, mas 14...Nd7 é impossível (os cavalos pretos estão em d8 e h5).' }],
  // Coluna 16
  ['c16', 'k', 'k', '(k)', '6 e4 Bxc3+ 7 bxc3 e5 8 Ba3 Re8 9 d5 Nb8 10 c5', { a: '⩲', c: '6.e4 Bxc3+ 7.bxc3 e5 8.Ba3 Re8 9.d5 Nb8 10.c5 é tão bom quanto a coluna e também dá alguma vantagem às brancas.' }],
  ['c16', 'l', 'l', '(l)', '13 Rae1 Re8 14 f4', { a: '⩲', r: 'Keres–Euwe, match 1940', c: '13.Rae1 Re8 14.f4 é um pouco melhor para as brancas.' }],
  // Coluna 17
  ['c17', 'm', 'm', '(m)', '4... b6 5 e4 Bxc3+ 6 bxc3 Nc6 7 e5 Ng8 8 Nf3 Ba6 9 Bd3 Na5 10 Bxh7 Ne7 11 Bd3', { a: '±', r: 'Bronstein–Bisguier, Tallinn 1971', c: '4...b6?! 5.e4 Bxc3+ 6.bxc3 Nc6 7.e5 Ng8 8.Nf3 Ba6 9.Bd3 Na5 10.Bxh7 Ne7 11.Bd3 é melhor para as brancas.' }],
  ['c17', 'n-A', 'n', '(n) A', '5... O-O 6 a3 Bxc3+ 7 Qxc3', { c: '5...O-O 6.a3 Bxc3+ 7.Qxc3 transpõe para a coluna 5.' }],
  ['c17', 'n-B', 'n', '(n) B', '5... Nbd7 6 e3 b6 7 f3 Bxc3+ 8 Qxc3 c5 9 Nh3', { a: '⩲', r: 'Alekhine–Nimzovich, Nova York 1927', c: '5...Nbd7 6.e3 b6 7.f3 Bxc3+ 8.Qxc3 c5 9.Nh3 é um pouco melhor para as brancas.' }],
  ['c17', 'o', 'o', '(o)', '6... h6 7 Bh4 Nc6 8 dxc5 dxc5 9 a3 Bxc3+ 10 Qxc3 e5 11 Bd3 Qa5 12 Ne2', { a: '⩲', r: 'Greenfeld–Smyslov, Beersheba 1990', c: '6...h6 7.Bh4 Nc6 8.dxc5 dxc5 9.a3 Bxc3+ 10.Qxc3 e5 11.Bd3 Qa5 12.Ne2 terminou empatado, mas as brancas estão um pouco melhor. A coluna é Bacrot–Smyslov, França 1996.' }],
  // Coluna 18
  ['c18', 'p', 'p', '(p)', '5 a3 Bxc3+ 6 Qxc3 O-O', { c: '5.a3 Bxc3+ 6.Qxc3 O-O transpõe para a coluna 5, mas as pretas também podem jogar 6...Nbd7, como nesta coluna.' }],
  ['c18', 'q', 'q', '(q)', '13 Rac1 Qe7 14 d5 Nc5 15 Nd4', { a: '⩲', r: 'Bareev–Adams, Cap d’Agde 2003', c: '13.Rac1 Qe7 14.d5 Nc5 15.Nd4 é um pouco melhor para as brancas.' }],
]

const capitulo = {
  id: 'nimzo-c',
  arquivo: 'nimzo-c',
  nome: 'Nimzo-Índia — Clássica 4...c5, 4...Nc6 e 4...d6',
  fonte: 'Modern Chess Openings — Nimzo-Indian Defense (pp. 545–546), colunas 13–18',
  base: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4',
  corPadrao: 'b',
  ordem: 545,
  grupos: [
    { id: 'c5', nome: '4...c5', colunas: [13, 14] },
    { id: 'nc6', nome: '4...Nc6 (Milner-Barry)', colunas: [15, 16] },
    { id: 'd6', nome: '4...d6', colunas: [17, 18] },
  ],
}

module.exports = { capitulo, colunas, notas }
