// Transcrição do MCO 15ª ed. — Defesa Bogo-Índia, 4.Nbd2 (pp. 586–587), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs bogo-b
// Formato: ver gambito-do-rei.cjs. Dicas em bogo-b-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua.
// Avaliações tiradas do texto: (a) A "simplesmente melhor para as brancas" ficou ±; (c) "talvez consigam igualar"
// ficou ⩲; (d) "pequena vantagem", (e) "leve vantagem de espaço", (g) "vantagem mínima", (n) "só uma pequena pressão"
// e (u) "pequena vantagem" ficaram ⩲; (f) "jogo suficiente pelo peão" ficou =; (i) = está no texto; (j) "o par de
// bispos dá a vantagem" ficou ⩲; (k) "põe as pretas em dificuldades" ficou ±; (r) A "mais ou menos igual" ficou =;
// (s) "bom jogo nas casas claras para as pretas" ficou =.
// Sinais conferidos com zoom: (a) B, (b), (q), (r) B, (t) ⩲; (m), (p) ∓.
// Notação: (o) "14 Re1" é ambíguo (as duas torres chegam a e1); ficou 14.Rfe1. Coluna 8: 12...Rxa1+ dá xeque.
// Nomes como estão no livro: "Mewdon" (m), "Oarnu" (r) A.

const F = '1 d4 Nf6 2 c4 e6 3 Nf3 Bb4+ 4 Nbd2'

const colunas = {
  c7: [`${F} O-O 5 a3 Be7 6 b4 d5 7 Qc2 Nbd7 8 c5 c6 9 e3 Qc7 10 Bb2 b6 11 Bd3 bxc5 12 bxc5 a5`, 'oo', '4...O-O 5.a3 Be7', '⩲',
    'Com 4.Nbd2 as brancas evitam a troca de bispos em d2 e ficam prontas para ganhar o par de bispos com a3. Depois de 4...O-O 5.a3 Be7 6.b4 d5 7.Qc2 Nbd7 8.c5 c6 9.e3 Qc7 10.Bb2 b6 11.Bd3 bxc5 12.bxc5 a5 as brancas ficam com uma pequena vantagem.'],
  c8: [`${F} O-O 5 a3 Bxd2+ 6 Qxd2 b6 7 e3 Bb7 8 Be2 d6 9 b4 a5 10 Bb2 Ne4 11 Qc2 axb4 12 axb4 Rxa1+`, 'oo', '5...Bxd2+', '⩲',
    'Com 5...Bxd2+ 6.Qxd2 b6 as pretas entregam o par de bispos e seguem um plano de Índia da Dama. Depois de 7.e3 Bb7 8.Be2 d6 9.b4 a5 10.Bb2 Ne4 11.Qc2 axb4 12.axb4 Rxa1 as brancas ficam só um pouco melhor.'],
  c9: [`${F} d6 5 a3 Bxd2+ 6 Qxd2 Nbd7 7 e3 e5 8 dxe5 dxe5 9 b4 e4 10 Nd4 Ne5 11 Bb2 O-O 12 Be2 Qe7`, 'd6', '4...d6', '±',
    'Com 4...d6 as pretas colocam os peões nas casas escuras do centro. Depois de 5.a3 Bxd2+ 6.Qxd2 Nbd7 7.e3 e5 8.dxe5 dxe5 9.b4 e4 10.Nd4 Ne5 11.Bb2 O-O 12.Be2 Qe7 o par de bispos dá vantagem às brancas.'],
  c10: [`${F} c5 5 a3 Bxd2+ 6 Qxd2 cxd4 7 Qxd4 Nc6 8 Qd6 Ne4 9 Qd3 d5 10 e3 O-O 11 Qc2 Qa5+ 12 Nd2 Rd8`, 'c5', '4...c5', '⩲',
    'Com 4...c5 as pretas golpeiam o centro. Depois de 5.a3 Bxd2+ 6.Qxd2 cxd4 7.Qxd4 Nc6 8.Qd6 Ne4 9.Qd3 d5 10.e3 O-O 11.Qc2 Qa5+ 12.Nd2 Rd8 as peças pretas ficam ativas e as brancas têm só uma pequena pressão.'],
  c11: [`${F} b6 5 a3 Bxd2+ 6 Bxd2 Bb7 7 Bg5 h6 8 Bh4 d6 9 e3 Nbd7 10 Qc2 Qe7 11 Rd1 g5 12 Bg3 h5`, 'b6', '4...b6', '⩲',
    'Com 4...b6 as pretas seguem um plano de Índia da Dama. Depois de 5.a3 Bxd2+ 6.Bxd2 Bb7 7.Bg5 h6 8.Bh4 d6 9.e3 Nbd7 10.Qc2 Qe7 11.Rd1 g5 12.Bg3 h5 as brancas ficam um pouco melhor.'],
  c12: [`${F} d5 5 Qa4+ Nc6 6 a3 Bxd2+ 7 Bxd2 Ne4 8 Rd1 O-O 9 e3 Bd7 10 Qc2 a5 11 Bd3 f5 12 O-O Be8`, 'd5', '4...d5', '⩲',
    'Com 4...d5 as pretas ocupam o centro. Depois de 5.Qa4+ Nc6 6.a3 Bxd2+ 7.Bxd2 Ne4 8.Rd1 O-O 9.e3 Bd7 10.Qc2 a5 11.Bd3 f5 12.O-O Be8 as brancas ficam um pouco melhor.'],
}

const notas = [
  // Coluna 7
  ['c7', 'a-A', 'a', '(a) A', '6 e4 d6 7 Bd3 Nbd7 8 b4 e5 9 Bb2', { a: '±', c: 'As brancas têm uma alternativa séria em 6.e4. Agora 6...d6 7.Bd3 Nbd7 8.b4 e5 9.Bb2 é simplesmente melhor para as brancas.' }],
  ['c7', 'a-B', 'a', '(a) B', '6 e4 d5 7 Qc2 dxe4 8 Nxe4 Nc6 9 Be3 Ng4 10 Bd3 f5 11 Nc3 Bf6 12 O-O-O g6 13 h3 Nxe3 14 fxe3 Bg7 15 Kb1 Rb8 16 h4', { a: '⩲', r: 'Bologan–Jakovenko, Poikovsky 2007', c: '6.e4 d5 7.Qc2 dxe4 8.Nxe4 Nc6 9.Be3 Ng4 10.Bd3 f5 11.Nc3 Bf6 12.O-O-O g6 13.h3 Nxe3 14.fxe3 Bg7 15.Kb1 Rb8 16.h4 é um pouco melhor para as brancas.' }],
  ['c7', 'b', 'b', '(b)', '7... a5 8 b5 dxc4 9 e4 c5 10 Bb2 b6 11 Bxc4', { a: '⩲', c: '7...a5 8.b5 dxc4 9.e4 c5 10.Bb2 b6 11.Bxc4 é um pouco melhor para as brancas.' }],
  ['c7', 'c', 'c', '(c)', '11... a5 12 O-O Ba6', { a: '⩲', c: 'As pretas talvez consigam igualar com a sugestão de Krasenkow, 11...a5 12.O-O Ba6.' }],
  ['c7', 'd', 'd', '(d)', '13 O-O Ba6 14 Bxa6 Rxa6 15 a4', { a: '⩲', r: 'Krasenkow–Wahls, Alemanha 1998', c: '13.O-O Ba6 14.Bxa6 Rxa6 15.a4 dá uma pequena vantagem às brancas.' }],
  // Coluna 8
  ['c8', 'e', 'e', '(e)', '6 Bxd2 b6 7 Bg5 Bb7 8 e3 d6 9 Be2 Nbd7 10 O-O Qe8 11 Nd2 Ne4 12 Nxe4 Bxe4 13 f3', { a: '⩲', r: 'P. Cramling–Tempone, Buenos Aires 1994', c: '6.Bxd2 b6 7.Bg5 Bb7 8.e3 d6 9.Be2 Nbd7 10.O-O Qe8 11.Nd2 Ne4 12.Nxe4 Bxe4 13.f3 deixa as brancas com uma leve vantagem de espaço.' }],
  ['c8-e', '1', 'e', '(e) 10...Re8', '10... Re8', { c: 'As pretas podiam melhorar um pouco com 10...Re8 e o plano ...h6, ...Nf8 e ...Ng6.' }],
  ['c8', 'f', 'f', '(f)', '6... d6 7 b4 a5 8 Bb2 axb4 9 axb4 Rxa1+ 10 Bxa1 b5 11 cxb5 Bd7 12 e3 Qe8 13 Qd3 c6 14 bxc6 Nxc6', { a: '=', r: 'Bilobrk–Kurajica, Liga Croata 2004', c: 'As pretas podem tentar 6...d6 7.b4 a5 8.Bb2 axb4 9.axb4 Rxa1+ 10.Bxa1 b5! 11.cxb5 Bd7 12.e3 Qe8 13.Qd3 c6 14.bxc6 Nxc6, com jogo suficiente pelo peão.' }],
  ['c8', 'g', 'g', '(g)', '13 Bxa1 Nd7 14 O-O Ng5 15 Nd2 f5 16 f3', { a: '⩲', r: 'Siegel–Horvath, Alemanha 1995', c: '13.Bxa1 Nd7 14.O-O Ng5 15.Nd2 f5 16.f3 deixa as brancas com uma vantagem mínima.' }],
  // Coluna 9
  ['c9', 'h', 'h', '(h)', '5 g3 O-O 6 Bg2 Qe7 7 O-O Bxd2 8 Qxd2 e5 9 b3 Re8 10 dxe5 dxe5 11 Bb2 Nc6 12 Rad1 h6', { a: '=', r: 'Browne–Goldin, Los Angeles 1991', c: '5.g3 O-O 6.Bg2 Qe7 7.O-O Bxd2 (8.Nb3 seria o próximo lance) 8.Qxd2 e5 9.b3 Re8 10.dxe5 dxe5 11.Bb2 Nc6 12.Rad1 h6 leva à igualdade.' }],
  ['c9', 'i', 'i', '(i)', '6 Bxd2 Nbd7 7 Bg5 h6 8 Bh4 Nf8', { a: '=', c: 'As brancas não conseguem nada com 6.Bxd2 Nbd7 7.Bg5 h6 8.Bh4 Nf8 e ...Ng6, com igualdade.' }],
  ['c9', 'j', 'j', '(j)', '9... O-O 10 Bb2 Qe7 11 O-O-O', { a: '⩲', c: 'Depois de 9...O-O 10.Bb2 Qe7 11.O-O-O o par de bispos dá vantagem às brancas.' }],
  ['c9', 'k', 'k', '(k)', '13 Qc3 Re8 14 O-O-O Bg4 15 f3 exf3 16 gxf3 Bh5 17 Rhg1 Bg6 18 f4', { a: '±', r: 'análise de Walter Browne', c: '13.Qc3 Re8 14.O-O-O Bg4 15.f3 exf3 16.gxf3 Bh5 17.Rhg1 Bg6 18.f4! põe as pretas em dificuldades.' }],
  // Coluna 10
  ['c10', 'l', 'l', '(l)', '7 Nxd4 d5 8 e3 O-O 9 b3 b6 10 Bb2 Bb7 11 f3', { a: '⩲', r: 'M. Gurevich–van der Sterren, Holanda 2003', c: 'Também 7.Nxd4 d5 8.e3 O-O 9.b3 b6 10.Bb2 Bb7 11.f3 pode dar alguma vantagem às brancas.' }],
  ['c10', 'm', 'm', '(m)', '8 Qh4 O-O 9 Bg5 Qa5+ 10 Bd2 Qf5 11 e3 Qc2', { a: '∓', r: 'Prie–Korchnoi, Mewdon 1984', c: '8.Qh4 O-O 9.Bg5?! Qa5+ 10.Bd2 Qf5 11.e3 Qc2! é melhor para as pretas.' }],
  ['c10', 'n', 'n', '(n)', '13 Rb1 Ne5 14 b4 Qc7 15 Nxe4 dxe4 16 Qxe4 f5 17 Qc2 b5 18 c5 Bb7 19 f3', { a: '⩲', r: 'M. Gurevich–Miezis, Vlissingen 1997', c: '13.Rb1 Ne5 14.b4 Qc7 15.Nxe4 dxe4 16.Qxe4 f5 17.Qc2 b5 18.c5 Bb7 19.f3 dá às brancas só uma pequena pressão, porque as peças pretas estão ativas.' }],
  // Coluna 11
  ['c11', 'o', 'o', '(o)', '6 Qxd2 Bb7 7 g3 d5 8 cxd5 Bxd5 9 Bg2 a5 10 O-O O-O 11 Qc3 Nc6 12 Bg5 h6 13 Bxf6 Qxf6 14 Rfe1 Be4', { a: '=', r: 'Seirawan–Granda Zúñiga, Amsterdã 1995', c: '6.Qxd2?! Bb7 7.g3 d5 8.cxd5 Bxd5 9.Bg2 a5 10.O-O O-O 11.Qc3 Nc6 12.Bg5 h6 13.Bxf6 Qxf6 14.Rfe1 Be4 leva à igualdade. (O livro escreve "14 Re1", que é ambíguo: as duas torres chegam a e1.)' }],
  ['c11', 'p', 'p', '(p)', '10 Bd3 g5 11 Bg3 h5 12 h4 g4 13 Ng5 Bxg2 14 Rg1 Bb7', { a: '∓', r: 'Kadzioka–Socko, Campeonato Polonês 2007', c: '10.Bd3 g5 11.Bg3 h5 12.h4 g4 13.Ng5 Bxg2 14.Rg1 Bb7 é melhor para as pretas.' }],
  ['c11', 'q', 'q', '(q)', '13 h4 Ne4 14 Nxg5 Nxg3 15 fxg3 O-O-O 16 Qf2 f6 17 Nh3', { a: '⩲', r: 'Moiseenko–Zelcic, Kusadasi 2006', c: '13.h4 Ne4 14.Nxg5 Nxg3 15.fxg3 O-O-O 16.Qf2 f6 17.Nh3 é um pouco melhor para as brancas.' }],
  // Coluna 12
  ['c12', 'r-A', 'r', '(r) A', '5 a3 Be7 6 Qc2 Nbd7 7 e3 O-O 8 b4 a5 9 Rb1 axb4 10 axb4 b6 11 Bd3 c5 12 dxc5 bxc5 13 b5 Bb7 14 O-O Bd6 15 Bb2 h6', { a: '=', r: 'I. Sokolov–Hraček, Oarnu 1996', c: '5.a3 Be7 6.Qc2 Nbd7 7.e3 O-O 8.b4 a5 9.Rb1 axb4 10.axb4 b6 11.Bd3 c5 12.dxc5 bxc5 13.b5 Bb7 14.O-O Bd6 15.Bb2 h6 é mais ou menos igual.' }],
  ['c12', 'r-B', 'r', '(r) B', '5 Qc2 O-O 6 a3 Be7 7 g3 a5 8 Bg2 Nc6 9 O-O dxc4 10 Qxc4 a4 11 Rd1 Bd7 12 Qd3 h6 13 Nc4', { a: '⩲', r: 'Grivas–Angelis, Katerini 1993', c: '5.Qc2 O-O 6.a3 Be7 7.g3 a5 8.Bg2 Nc6 9.O-O dxc4 10.Qxc4 a4 11.Rd1 Bd7 12.Qd3 h6 13.Nc4 é um pouco melhor para as brancas, mas o jogo das pretas é duvidoso.' }],
  ['c12', 'r-C', 'r', '(r) C', '5 e3 O-O 6 a3 Be7 7 Bd3 c5 8 dxc5 a5 9 b3 Nbd7 10 Bb2 Nxc5 11 Bc2 b6 12 O-O Ba6 13 Ne5', { a: '=', r: 'P. Cramling–C. Hansen, Malmö 1996', c: '5.e3 O-O 6.a3 Be7 7.Bd3 c5 8.dxc5 a5 9.b3 Nbd7 10.Bb2 Nxc5 11.Bc2 b6 12.O-O Ba6 13.Ne5 leva à igualdade.' }],
  ['c12', 's', 's', '(s)', '6 Ne5 Bd7 7 Nxc6 Bxd2+ 8 Bxd2 Bxc6 9 Qc2 dxc4 10 Qxc4 Ne4 11 Be3 Nd6', { a: '=', r: 'Korchnoi–Kalesis, Arnó Liosia 1995', c: '6.Ne5?! Bd7 7.Nxc6 Bxd2+ 8.Bxd2 Bxc6 9.Qc2 dxc4 10.Qxc4 Ne4 11.Be3 Nd6 dá às pretas bom jogo nas casas claras.' }],
  ['c12', 't', 't', '(t)', '6... Be7 7 Qc2 O-O 8 e3 a5 9 b3 Nb8 10 Bb2 c6 11 Bd3 Nbd7 12 O-O b6 13 cxd5 cxd5 14 Ne5 Bb7 15 Nc6', { a: '⩲', r: 'Karpov–Adams, Roquebrune 1992', c: '6...Be7 7.Qc2 O-O 8.e3 a5 9.b3 Nb8 10.Bb2 c6 11.Bd3 Nbd7 12.O-O b6 13.cxd5 cxd5 14.Ne5 Bb7 15.Nc6 é um pouco melhor para as brancas.' }],
  ['c12', 'u', 'u', '(u)', '13 Ne1 Bg6 14 f3 Nxd2 15 Rxd2 Ne7 16 Qc3', { a: '⩲', r: 'Prohaszka–Ilinic, Budapeste 2006', c: '13.Ne1 Bg6 14.f3 Nxd2 15.Rxd2 Ne7 16.Qc3 dá uma pequena vantagem às brancas.' }],
]

const capitulo = {
  id: 'bogo-b',
  arquivo: 'bogo-b',
  nome: 'Bogo-Índia — 4.Nbd2',
  fonte: 'Modern Chess Openings — Bogo-Indian Defense (pp. 586–587), colunas 7–12',
  base: '1. d4 Nf6 2. c4 e6 3. Nf3 Bb4+',
  corPadrao: 'b',
  ordem: 586,
  grupos: [
    { id: 'oo', nome: '4...O-O', colunas: [7, 8] },
    { id: 'd6', nome: '4...d6', colunas: [9] },
    { id: 'c5', nome: '4...c5', colunas: [10] },
    { id: 'b6', nome: '4...b6', colunas: [11] },
    { id: 'd5', nome: '4...d5', colunas: [12] },
  ],
}

module.exports = { capitulo, colunas, notas }
