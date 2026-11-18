// Transcrição do MCO 15ª ed. — Defesa Bogo-Índia, 4.Bd2 (pp. 584–585), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs bogo-a
// Formato: ver gambito-do-rei.cjs. Dicas em bogo-a-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua.
// Avaliações tiradas do texto: (b) "as brancas mantêm uma pequena vantagem" ficou ⩲; (c) "boas chances de igualar"
// ficou ⩲ (as três linhas da nota terminam em =); (d) "mais espaço, mas posição preta sólida" ficou ⩲; (n) "quase
// igual" ficou ⩲; (o) "bom para as brancas" ficou ±; (p) "melhor estrutura de peões" ficou ⩲; (r) 13...Nc6 = e a torre
// de h4 mal colocada ficou =; (u) "controle de casas demais" ficou ⩲.
// Sinais conferidos com zoom: (a) ∓; (g), (k), (s) B, (v) ±; (g) 12...Nd8, (h), (i), (j), (m), (t) ⩲.
// (g) 13...Nd7: o sinal está ilegível na impressão ("1"); a subnota ficou só com comentário.
// Notação: (h) 10...Rfe8 virou 10...Re8 (o bispo de c8 bloqueia a outra torre).
// Notas (e) e (u) explicam lances da coluna; (e) foi para o resumo da coluna 2.

const F = '1 d4 Nf6 2 c4 e6 3 Nf3 Bb4+ 4 Bd2'

const colunas = {
  c1: [`${F} Qe7 5 g3 Nc6 6 Bg2 Bxd2+ 7 Nbxd2 d6 8 O-O a5 9 e4 e5 10 d5 Nb8 11 Ne1 h5`, 'qe7', '4...Qe7 5.g3', '⩲',
    'Com 4...Qe7 as pretas mantêm o bispo em b4 e defendem-no com a dama. Depois de 5.g3 Nc6 6.Bg2 Bxd2+ 7.Nbxd2 d6 8.O-O a5 9.e4 e5 10.d5 Nb8 11.Ne1 h5 as pretas montam um bloqueio nas casas escuras com o rei no centro e têm boas chances de igualar.'],
  c2: [`${F} Qe7 5 Nc3 O-O 6 g3 d6 7 Bg2 Bxc3 8 Bxc3 Ne4 9 Rc1 Nc6 10 O-O Nxc3 11 Rxc3 e5`, 'qe7', '5.Nc3', '±',
    'Com 5.Nc3 O-O 6.g3 d6 7.Bg2 as pretas trocam em c3 e jogam ...Ne4 antes de as brancas rocarem, para que Be1 não seja possível. Depois de 7...Bxc3 8.Bxc3 Ne4 9.Rc1 Nc6 10.O-O Nxc3 11.Rxc3 e5 as brancas ficam melhor.'],
  c3: [`${F} Bxd2+ 5 Qxd2 O-O 6 g3 d6 7 Bg2 Nc6 8 Nc3 e5 9 d5 Ne7 10 O-O Ng6 11 Ne1 Ng4`, 'bxd2', '4...Bxd2+', '±',
    'Com 4...Bxd2+ as pretas trocam os bispos logo. Depois de 5.Qxd2 O-O 6.g3 d6 7.Bg2 Nc6 8.Nc3 e5 9.d5 Ne7 10.O-O Ng6 11.Ne1 Ng4 as brancas ficam melhor.'],
  c4: [`${F} a5 5 g3 d5 6 Qc2 Nc6 7 Bg2 dxc4 8 Qxc4 Qd5 9 Qxd5 exd5 10 Nc3 Bg4 11 e3 O-O`, 'a5', '4...a5 5.g3 d5', '⩲',
    'Com 4...a5 o peão sustenta o bispo em b4. Depois de 5.g3 d5 6.Qc2 Nc6 7.Bg2 dxc4 8.Qxc4 Qd5 9.Qxd5 exd5 10.Nc3 Bg4 11.e3 O-O o final é quase igual.'],
  c5: [`${F} a5 5 g3 O-O 6 Bg2 b6 7 O-O Ba6 8 Qc2 c5 9 Rd1 Ra7 10 e4 cxd4 11 Bxb4 axb4`, 'a5', '5...O-O', '=',
    'Com 5...O-O 6.Bg2 b6 as pretas seguem um plano de Índia da Dama. Depois de 7.O-O Ba6 8.Qc2 c5 9.Rd1 Ra7 10.e4 cxd4 11.Bxb4 axb4 o jogo é igual.'],
  c6: [`${F} c5 5 Bxb4 cxb4 6 Qd3 d6 7 e4 O-O 8 Nbd2 a5 9 Be2 b6 10 O-O Bb7 11 Rfe1 Nbd7`, 'c5', '4...c5', '±',
    'Com 4...c5 as pretas atacam d4. Depois de 5.Bxb4 cxb4 6.Qd3 d6 7.e4 O-O 8.Nbd2 a5 9.Be2 b6 10.O-O Bb7 11.Rfe1 Nbd7 as brancas ficam melhor.'],
}

const notas = [
  // Coluna 1
  ['c1', 'a', 'a', '(a)', '7 Qxd2 Ne4 8 Qc2 Qb4+ 9 Nc3 Nxc3 10 Qxc3 Qxc3+', { a: '∓', c: '7.Qxd2?! Ne4 8.Qc2 Qb4+ 9.Nc3 Nxc3 10.Qxc3 Qxc3+ é melhor para as pretas.' }],
  ['c1', 'b', 'b', '(b)', '8... O-O 9 e4 e5 10 d5 Nb8 11 Ne1 a5 12 Nd3 Na6 13 f4', { a: '⩲', r: 'D. Gurevich–Benjamin, Campeonato dos EUA 2000', c: 'As pretas jogam por um bloqueio nas casas escuras com o rei no centro. Parece mais natural 8...O-O, mas depois de 9.e4 e5 10.d5 Nb8 11.Ne1 a5 12.Nd3 Na6 13.f4 as brancas mantêm uma pequena vantagem.' }],
  ['c1', 'c-A', 'c', '(c) A', '12 h3 h4 13 g4 Nbd7 14 Nd3 g5 15 b3 Nf8 16 a3 Ng6 17 Re1 O-O 18 b4 Bd7 19 f3 b6 20 Qc2 c5', { a: '=', r: 'Piket–Shaked, Tilburg 1997', c: 'As pretas têm boas chances de igualar: 12.h3 h4 13.g4 Nbd7 14.Nd3 g5 15.b3 Nf8 16.a3 Ng6 17.Re1 O-O 18.b4 Bd7 19.f3 b6 20.Qc2 c5, com igualdade.' }],
  ['c1', 'c-B', 'c', '(c) B', '12 h4 Bg4 13 f3 Bd7 14 Qb3 b6 15 Qe3 Na6', { a: '=', r: 'Greet–Rowson, 4NCL 2005', c: '12.h4 Bg4 13.f3 Bd7 14.Qb3 b6 15.Qe3 Na6 leva à igualdade.' }],
  ['c1', 'c-C', 'c', '(c) C', '12 Nd3 h4 13 Rc1 b6', { a: '=', c: '12.Nd3 h4 13.Rc1 b6 leva à igualdade.' }],
  // Coluna 2
  ['c2', 'd', 'd', '(d)', '6 e3 Bxc3 7 Bxc3 Ne4 8 Rc1 Nxc3 9 Rxc3 d6 10 Be2 e5 11 O-O Nd7', { a: '⩲', c: '6.e3 Bxc3 7.Bxc3 Ne4 8.Rc1 Nxc3 9.Rxc3 d6 10.Be2 e5 11.O-O Nd7 deixa as brancas com mais espaço, embora as pretas tenham uma posição bem sólida.' }],
  ['c2', 'f', 'f', '(f)', '9 Qc2 f5 10 O-O Nd7 11 Rac1 e5 12 b4', { a: '⩲', c: 'Também 9.Qc2 f5 10.O-O Nd7 11.Rac1 e5 12.b4 é um pouco melhor para as brancas.' }],
  ['c2', 'g', 'g', '(g)', '12 d5 Nb8 13 Nd2 a5 14 c5 Bd7 15 Nc4 Bb5 16 Qb3 Bxc4 17 Qxb7', { a: '±', r: 'Razuvaev–Benjamin, Moscou 1987', c: '12.d5 Nb8 13.Nd2 a5?! 14.c5! Bd7 15.Nc4 Bb5 16.Qb3 Bxc4 17.Qxb7! é melhor para as brancas.' }],
  ['c2-g', '1', 'g', '(g) 12...Nd8', '12... Nd8 13 Nd2', { a: '⩲', c: '12...Nd8 13.Nd2 é um pouco melhor para as brancas.' }],
  ['c2-g', '2', 'g', '(g) 13...Nd7', '13... Nd7', { c: '13...Nd7 era melhor que 13...a5?! (o sinal de avaliação está ilegível no livro).' }],
  // Coluna 3
  ['c3', 'h', 'h', '(h)', '6... d5 7 Bg2 Nbd7 8 O-O c6 9 Rc1 Qe7 10 Qe3 dxc4 11 a4 Re8 12 Na3 e5 13 Nxc4 e4 14 Nfe5 Nxe5 15 dxe5', { a: '⩲', r: 'Bacrot–Andersson, Pamplona 1997/98', c: '6...d5 7.Bg2 Nbd7 8.O-O c6 9.Rc1 Qe7 10.Qe3 dxc4 11.a4 Re8 12.Na3 e5 13.Nxc4 e4 14.Nfe5 Nxe5 15.dxe5 é um pouco melhor para as brancas.' }],
  ['c3-h', '1', 'h', '(h) 10...Re8', '10... Re8 11 Nbd2 e5 12 dxe5', { a: '⩲', c: '10...Re8 11.Nbd2 e5 12.dxe5 é um pouco melhor para as brancas.' }],
  ['c3', 'i', 'i', '(i)', '7... Nbd7 8 Nc3 e5 9 O-O a5 10 dxe5 dxe5 11 Rfd1 Re8 12 Ng5 Ra6 13 Nb5', { a: '⩲', r: 'Farago–Manca, Bolzano 1997', c: '7...Nbd7 8.Nc3 e5 9.O-O a5 10.dxe5 dxe5 11.Rfd1 Re8 12.Ng5 Ra6 13.Nb5 é um pouco melhor para as brancas.' }],
  ['c3', 'j', 'j', '(j)', '9 O-O Bg4 10 e3 Qd7 11 Nd5 Ne4 12 Qd3 f5 13 Nh4 Ng5 14 f4', { a: '⩲', r: 'van Wely–Porte, Vlissingen 2001', c: 'Também é razoável 9.O-O Bg4 10.e3 Qd7 11.Nd5 Ne4 12.Qd3 f5 13.Nh4 Ng5 14.f4, um pouco melhor para as brancas.' }],
  ['c3', 'k', 'k', '(k)', '12 f3 Nh6 13 Nd3 f5 14 f4 exf4 15 Nxf4 Nxf4 16 Rxf4 Bd7 17 e4', { a: '±', r: 'Skembris–Andersson, Bor 1997', c: '12.f3 Nh6 13.Nd3 f5 14.f4 exf4 15.Nxf4 Nxf4 16.Rxf4 Bd7 17.e4 é melhor para as brancas.' }],
  // Coluna 4
  ['c4', 'l-A', 'l', '(l) A', '5 e3 b6 6 Bd3 Bb7 7 O-O O-O 8 Nc3 d6 9 Qe2 Nbd7 10 a3 Bxc3 11 Bxc3 Ne4', { a: '=', r: 'Lein–Christiansen, Lone Pine 1981', c: '5.e3 b6 6.Bd3 Bb7 7.O-O O-O 8.Nc3 d6 9.Qe2 Nbd7 10.a3 Bxc3 11.Bxc3 Ne4 leva à igualdade.' }],
  ['c4', 'l-B', 'l', '(l) B', '5 Nc3 d6 6 Qc2 Nc6 7 a3 Bxc3 8 Bxc3 O-O 9 e4 e5 10 dxe5 dxe5 11 Nxe5 Nxe5 12 Bxe5 Re8 13 Rd1 Qe7 14 Bxf6 gxf6 15 Be2 f5', { a: '=', r: 'Züger–Andersson, Praga 1996', c: '5.Nc3!? d6 6.Qc2 Nc6 7.a3 Bxc3 8.Bxc3 O-O 9.e4 e5! 10.dxe5 dxe5 11.Nxe5 Nxe5 12.Bxe5 Re8 13.Rd1 Qe7 14.Bxf6 gxf6! 15.Be2 f5 leva à igualdade.' }],
  ['c4', 'm', 'm', '(m)', '7 a3 Be7 8 Bg2 O-O 9 O-O Bd7 10 Bf4 dxc4 11 Qxc4 Nd5 12 Nc3 Nxf4 13 gxf4', { a: '⩲', r: 'Sakaev–Taimanov, São Petersburgo 1995', c: '7.a3 Be7 8.Bg2 O-O 9.O-O Bd7 10.Bf4 dxc4 11.Qxc4 Nd5 12.Nc3 Nxf4 13.gxf4 é um pouco melhor para as brancas.' }],
  ['c4-m', '1', 'm', '(m) 7...Bxd2+', '7... Bxd2+ 8 Nbxd2 dxc4 9 Qxc4 O-O 10 Rc1', { a: '⩲', c: '7...Bxd2+ 8.Nbxd2 dxc4 9.Qxc4 O-O 10.Rc1 é um pouco melhor para as brancas.' }],
  ['c4-m', '2', 'm', '(m) 8...Bd7', '8... Bd7 9 O-O a4 10 cxd5', { a: '⩲', r: 'Sakaev–Taimanov, São Petersburgo 2001', c: '8...Bd7 9.O-O a4 10.cxd5 é um pouco melhor para as brancas.' }],
  ['c4', 'n', 'n', '(n)', '12 a3 Bxc3 13 Bxc3 Bxf3 14 Bxf3 Ne4', { a: '⩲', r: 'David–Aleksandrov, Plovdiv 2003', c: '12.a3 Bxc3 13.Bxc3 Bxf3 14.Bxf3 Ne4 é quase igual.' }],
  // Coluna 5
  ['c5', 'o', 'o', '(o)', '5... d6 6 Bg2 Nbd7 7 O-O e5 8 Bg5 exd4 9 Nxd4 h6 10 Bf4 O-O 11 a3 Bc5 12 b3 Ne5 13 Nc3 Ng6 14 Bc1 c6 15 Bb2 Re8 16 Rc1', { a: '±', r: 'Flear–Wilder, Londres 1987', c: '5...d6 6.Bg2 Nbd7 7.O-O e5 8.Bg5 exd4 9.Nxd4 h6 10.Bf4 O-O 11.a3 Bc5 12.b3 Ne5 13.Nc3 Ng6 14.Bc1 c6 15.Bb2 Re8 16.Rc1 é bom para as brancas.' }],
  ['c5', 'p', 'p', '(p)', '6... d5 7 Bxb4 axb4 8 Nbd2 b6 9 O-O c5 10 Qc2 Nbd7 11 Rfd1 Bb7 12 cxd5 exd5 13 dxc5 bxc5 14 e4 dxe4 15 Ng5 Qe7 16 Ngxe4', { a: '⩲', r: 'Nedobora–Guimarães, Adimar 1995', c: '6...d5 7.Bxb4 axb4 8.Nbd2 b6 9.O-O c5 10.Qc2 Nbd7 11.Rfd1 Bb7 12.cxd5 exd5 13.dxc5 bxc5 14.e4! dxe4 15.Ng5 Qe7 16.Ngxe4 dá às brancas a melhor estrutura de peões.' }],
  ['c5', 'q', 'q', '(q)', '7 Ne5 Ra7 8 O-O Bb7 9 Bxb7 Rxb7 10 Bf4 Be7 11 Qa4 c5', { a: '=', r: 'Mikhalevski–Ibragimov, Montreal 2006', c: '7.Ne5 Ra7 8.O-O Bb7 9.Bxb7 Rxb7 10.Bf4 Be7 11.Qa4 c5 leva à igualdade.' }],
  ['c5', 'r', 'r', '(r)', '12 e5 Ne8 13 Rxd4 Nc6 14 Rh4 h6 15 Nbd2 d6 16 exd6 Nxd6 17 Nd4 Ne7', { a: '=', r: 'Yusupov–Lobron, Alemanha 1991', c: '12.e5 Ne8 13.Rxd4 Nc6 é igual; depois de 14.Rh4?! h6 15.Nbd2 d6 16.exd6 Nxd6 17.Nd4 Ne7 a torre branca fica mal colocada em h4.' }],
  // Coluna 6
  ['c6', 's-A', 's', '(s) A', '5 dxc5 Bxc5 6 e3 O-O 7 Nc3 b6 8 Be2 Bb7 9 O-O Be7 10 a3 d6 11 Qc2 Nbd7 12 Rfc1 a6', { a: '=', r: 'Scherrer–Lehtivara, Suíça 1992', c: '5.dxc5 Bxc5 6.e3 O-O 7.Nc3 b6 8.Be2 Bb7 9.O-O Be7 10.a3 d6 11.Qc2 Nbd7 12.Rfc1 a6 leva à igualdade.' }],
  ['c6', 's-B', 's', '(s) B', '5 a3 Bxd2+ 6 Qxd2 cxd4 7 Nxd4 O-O 8 Nc3 d5 9 e3 e5 10 Nf3 e4 11 Nd4 dxc4 12 Bxc4', { a: '±', r: 'Miles–Korchnoi, Biel 1992', c: '5.a3 Bxd2+ 6.Qxd2 cxd4 7.Nxd4 O-O 8.Nc3 d5 9.e3 e5 10.Nf3 e4 11.Nd4 dxc4 12.Bxc4 é melhor para as brancas.' }],
  ['c6', 't', 't', '(t)', '6 g3 O-O 7 Bg2 Nc6 8 O-O d6 9 Nbd2 Qb6 10 e3 Bd7 11 h3 Rac8 12 g4 h6 13 Qe2 a5 14 Rfc1', { a: '⩲', r: 'Piket–I. Sokolov, Antuérpia 1997', c: 'Ou 6.g3 O-O 7.Bg2 Nc6 8.O-O d6 9.Nbd2 Qb6 10.e3 Bd7 11.h3 Rac8 12.g4 h6 13.Qe2 a5 14.Rfc1, um pouco melhor para as brancas.' }],
  ['c6', 'u', 'u', '(u)', '6... d5 7 Nbd2', { a: '⩲', c: '6...d5?! 7.Nbd2 dá às brancas o controle de casas demais; uma troca em d5 na hora certa desarruma os peões pretos.' }],
  ['c6', 'v', 'v', '(v)', '12 Bd1 e5 13 Nf1 Qc7 14 Ba4', { a: '±', r: 'Epishin–Prasanna, Sitges 2006', c: '12.Bd1 e5 13.Nf1 Qc7 14.Ba4 é melhor para as brancas.' }],
]

const capitulo = {
  id: 'bogo-a',
  arquivo: 'bogo-a',
  nome: 'Bogo-Índia — 4.Bd2',
  fonte: 'Modern Chess Openings — Bogo-Indian Defense (pp. 584–585), colunas 1–6',
  base: '1. d4 Nf6 2. c4 e6 3. Nf3 Bb4+',
  corPadrao: 'b',
  ordem: 584,
  grupos: [
    { id: 'qe7', nome: '4...Qe7', colunas: [1, 2] },
    { id: 'bxd2', nome: '4...Bxd2+', colunas: [3] },
    { id: 'a5', nome: '4...a5', colunas: [4, 5] },
    { id: 'c5', nome: '4...c5', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
