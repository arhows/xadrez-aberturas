// Transcrição do MCO 15ª ed. — Índia do Rei, quintos lances diversos e Averbakh (pp. 618–619), colunas 55–60.
// Gerar: node scripts/mco/gerar.cjs india-rei-j
// Formato: ver gambito-do-rei.cjs. Dicas em india-rei-j-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua:
// 55 (c) ∓, 56 (f) ⩲, 57 (m) ⩲, 58 (p) ⩲, 59 (u) =, 60 (z) =.
// Avaliações tiradas do texto: (h) 9...Bg4 "igual" ficou =; (j) A "uma boa Benoni" ficou =; (k) "jogo razoável
// para as pretas" ficou =; (p) "iniciativa que vale mais que o peão" ficou ⩲. (i) "sacrifício especulativo" ficou sem sinal.
// Sinais conferidos com zoom: (a), (d) 8.g3, (e) 9.g4, (f), (h), (l), (m), (o), (r), (s) A e B, (s) 11.Qxc2, (v) A e B,
// (w) B ⩲; (d) 12.Ng3 e (q) ±; (c) ∓; (x) B e (y) ⩱.
// Errata: (n) 9...b5! → 9...d5! (com ...b5 o 11.exd5 cxd5 seguinte é impossível; ...d5 é o lance que o torna legal);
// (v) B 7...Rxd8 → Kxd8 (as pretas ainda não rocaram).
// Notação: (s) B o livro marca xeque em 10...Nxc2, que não é xeque (o rei branco está em g1); acrescentado o xeque
// em (l) 15...Qxd2+ e (v) B 7.Qxd8+.
// A nota (g) ("o Sistema Averbakh") foi para o resumo da coluna 57.

const H = '1 d4 Nf6 2 c4 g6 3 Nc3 Bg7 4 e4 d6 5 h3 O-O'
const A = '1 d4 Nf6 2 c4 g6 3 Nc3 Bg7 4 e4 d6 5 Be2 O-O 6 Bg5'

const colunas = {
  c55: [`${H} 6 Nf3 e5 7 d5 Nh5 8 Be3 Na6 9 Nh2 Qe8 10 Be2 Nf4 11 Bf3 f5 12 h4 Qe7 13 g3 Nb4`, 'h3', '5.h3 O-O 6.Nf3 e5', '∓',
    'O 5.h3 prepara Be3 e g4 sem permitir ...Ng4. Com 6.Nf3 e5 7.d5 Nh5 8.Be3 Na6 9.Nh2 Qe8 10.Be2 Nf4 11.Bf3 f5 as pretas ganham atividade; depois de 12.h4?! Qe7 13.g3 Nb4 14.Qb3 Nfd3+ 15.Ke2 f4! as pretas ficam melhor.'],
  c56: [`${H} 6 Bg5 c6 7 Bd3 e5 8 d5 Na6 9 Nge2 Nc5 10 Bc2 Qb6 11 O-O cxd5 12 cxd5 Bd7 13 Rb1 a5`, 'h3', '6.Bg5 c6', '⩲',
    'Com 6.Bg5 as brancas cravam o cavalo e seguram ...e5. Depois de 6...c6 7.Bd3 e5 8.d5 Na6 9.Nge2 Nc5 10.Bc2 Qb6 11.O-O cxd5 12.cxd5 Bd7 13.Rb1 a5 14.Qd2 as brancas ficam um pouco melhor.'],
  c57: [`${A} c5 7 d5 e6 8 Qd2 exd5 9 exd5 Re8 10 Nf3 Bg4 11 O-O Nbd7 12 h3 Bxf3 13 Bxf3 a6`, 'averbakh', '6...c5 7.d5 e6', '⩲',
    'O Sistema Averbakh: 5.Be2 e 6.Bg5 impedem ...e5 por enquanto. As pretas golpeiam com 6...c5; depois de 7.d5 e6 8.Qd2 exd5 9.exd5 Re8 10.Nf3 Bg4 11.O-O Nbd7 12.h3 Bxf3 13.Bxf3 a6 14.a4 as brancas ficam um pouco melhor.'],
  c58: [`${A} Nbd7 7 Qd2 c6 8 Nf3 d5 9 exd5 cxd5 10 O-O a6 11 Ne5 dxc4 12 Bxc4 Qc7 13 Bb3 Nxe5`, 'averbakh', '6...Nbd7 7.Qd2 c6', '⩲',
    'Com 6...Nbd7 e ...c6 as pretas preparam ...d5. Depois de 7.Qd2 c6 8.Nf3 d5 9.exd5 cxd5 10.O-O a6 11.Ne5 dxc4 12.Bxc4 Qc7 13.Bb3 Nxe5 14.dxe5 Qxe5 as pretas ganham um peão, mas as brancas ficam com iniciativa que vale mais que ele.'],
  c59: ['1 d4 Nf6 2 c4 g6 3 Nc3 Bg7 4 e4 d6 5 Bd3 O-O 6 Nge2 Nc6 7 O-O e5 8 d5 Nd4 9 Nxd4 exd4 10 Nb5 Re8 11 Re1 a6 12 Nxd4 Nxd5 13 cxd5 Bxd4', 'outras', '5.Bd3', '=',
    'Com 5.Bd3 e 6.Nge2 as brancas apoiam e4 com peças. Depois de 6...Nc6 7.O-O e5 8.d5 Nd4 9.Nxd4 exd4 10.Nb5 Re8 11.Re1 a6! 12.Nxd4 Nxd5 13.cxd5 Bxd4 14.Qc2 Bd7 o jogo fica igual.'],
  c60: ['1 d4 Nf6 2 c4 g6 3 Nc3 Bg7 4 e4 d6 5 Nge2 O-O 6 Ng3 h5 7 Be2 h4 8 Nf1 Nc6 9 d5 Ne5 10 h3 c6 11 Bg5 Qa5 12 Nd2 b5 13 O-O bxc4', 'outras', '5.Nge2', '=',
    'Com 5.Nge2 e 6.Ng3 as brancas firmam e4; as pretas respondem com 6...h5, expulsando o cavalo. Depois de 7.Be2 h4 8.Nf1 Nc6 9.d5 Ne5 10.h3 c6 11.Bg5 Qa5 12.Nd2 b5 13.O-O bxc4 14.Nxc4 Nxc4 15.Bxc4 Rb8 o jogo fica igual.'],
}

const notas = [
  // Coluna 55
  ['c55', 'a', 'a', '(a)', '6... c6 7 Be3 a6 8 Bd3 b5 9 cxb5 cxb5 10 a3', { a: '⩲', r: 'J. Medina–Clemente, Espanha 1993', c: '6...c6 7.Be3 a6 8.Bd3 b5 9.cxb5 cxb5 10.a3 é um pouco melhor para as brancas.' }],
  ['c55-a', '1', 'a', '(a) 6...Nbd7', '6... Nbd7', { c: '6...Nbd7!? também é possível.' }],
  ['c55', 'b', 'b', '(b)', '7 dxe5 dxe5 8 Qxd8 Rxd8', { a: '=', c: '7.dxe5 dxe5 8.Qxd8 Rxd8 leva à igualdade.' }],
  ['c55', 'c', 'c', '(c)', '14 Qb3 Nfd3+ 15 Ke2 f4', { a: '∓', r: 'Kavalek–Kasparov, Bugojno 1982', c: '14.Qb3 Nfd3+ 15.Ke2 f4! é melhor para as pretas.' }],
  // Coluna 56
  ['c56', 'd', 'd', '(d)', '6 Be3 e5 7 d5 Na6 8 g4 Nc5 9 f3 a5 10 Qd2 c6 11 dxc6 bxc6 12 O-O-O Nb7 13 c5 d5 14 exd5 Nxd5', { a: '=', r: 'Gómez–Topalov, Sevilha 1992', c: '6.Be3 e5 7.d5 Na6 8.g4 Nc5 9.f3 a5 10.Qd2 c6 11.dxc6?! bxc6 12.O-O-O Nb7 13.c5 d5 14.exd5 Nxd5 leva à igualdade.' }],
  ['c56-d', '1', 'd', '(d) 7...Nh5', '7... Nh5 8 g3', { a: '⩲', c: '7...Nh5 8.g3 é um pouco melhor para as brancas.' }],
  ['c56-d', '2', 'd', '(d) 7...Ne8', '7... Ne8 8 g4 f5 9 gxf5 gxf5 10 exf5 Bxf5 11 Nge2 Nd7 12 Ng3', { a: '±', r: 'Dzindzichashvili–Rohwer, Filadélfia 1993', c: '7...Ne8 8.g4 f5 9.gxf5 gxf5 10.exf5 Bxf5 11.Nge2 Nd7 12.Ng3 é melhor para as brancas.' }],
  ['c56-d', '3', 'd', '(d) 11.Nge2', '11 Nge2', { c: '11.Nge2 era melhor que 11.dxc6.' }],
  ['c56', 'e', 'e', '(e)', '6... Qe8 7 Be2 Na6 8 Nf3 e5 9 d5 Nh5 10 g3 f6', { a: '=', r: 'Gyimesi–Shirov, Moscou 2001', c: 'O flexível 6...Qe8! mantém as opções: 7.Be2 Na6 8.Nf3 e5 9.d5 Nh5 10.g3 f6 leva à igualdade.' }],
  ['c56-e', '1', 'e', '(e) 7.Nf3', '7 Nf3 e5 8 d5 Nh5 9 Be2 Nf4', { a: '=', c: '7.Nf3 e5 8.d5 Nh5 9.Be2 Nf4 leva à igualdade.' }],
  ['c56-e', '2', 'e', '(e) 6...Na6', '6... Na6 7 Bd3 e5 8 d5 Qe8 9 g4', { a: '⩲', r: 'Beliavsky–Kozul, Portorož 1997', c: '6...Na6 de imediato é menos bom: 7.Bd3 e5 8.d5 Qe8 9.g4 é um pouco melhor para as brancas.' }],
  ['c56', 'f', 'f', '(f)', '14 Qd2', { a: '⩲', r: 'Ivanchuk–Kasparov, Novgorod 1994', c: '14.Qd2 é um pouco melhor para as brancas.' }],
  // Coluna 57
  ['c57', 'h', 'h', '(h)', '7 dxc5 Qa5 8 Bd2 Qxc5 9 Nf3 Nbd7 10 Be3 Qa5 11 Nd2', { a: '⩲', r: 'Ubilava–Westerinen, Espanha 1993', c: '7.dxc5 Qa5! 8.Bd2 Qxc5 9.Nf3 Nbd7 10.Be3 Qa5 11.Nd2 é um pouco melhor para as brancas.' }],
  ['c57-h', '1', 'h', '(h) 9...Bg4', '9... Bg4', { a: '=', c: '9...Bg4! seguido de ...Nc6 leva à igualdade.' }],
  ['c57', 'i', 'i', '(i)', '7... b5 8 cxb5 a6 9 a4 Qa5 10 Bd2', { r: 'Kaidanov–Schrage, Cincinnati 1992', c: '7...b5!? 8.cxb5 a6 9.a4 Qa5 10.Bd2 é um sacrifício de peão especulativo.' }],
  ['c57', 'j-A', 'j', '(j) A', '8 Nf3 exd5 9 cxd5 h6', { a: '=', c: '8.Nf3 exd5 9.cxd5 h6 dá uma boa Benoni às pretas.' }],
  ['c57-j-A', '1', 'j', '(j) A 9.Nxd5', '9 Nxd5 Be6', { a: '=', c: '9.Nxd5 Be6 leva à igualdade.' }],
  ['c57', 'j-B', 'j', '(j) B', '8 dxe6 Bxe6', { a: '=', c: '8.dxe6?! Bxe6 leva à igualdade.' }],
  ['c57', 'k', 'k', '(k)', '9 cxd5 Re8', { a: '=', c: '9.cxd5 Re8 dá uma Benoni em que as pretas têm jogo razoável.' }],
  ['c57', 'l', 'l', '(l)', '9... Qb6 10 Nf3 Bf5 11 Nh4 Ne4 12 Nxe4 Bxe4 13 f3 Qxb2 14 Rc1 h6 15 Bxh6 Qxd2+ 16 Bxd2', { a: '⩲', c: '9...Qb6!? 10.Nf3 Bf5 11.Nh4 Ne4 12.Nxe4 Bxe4 13.f3 Qxb2 14.Rc1 h6 15.Bxh6 Qxd2+ 16.Bxd2 é um pouco melhor para as brancas.' }],
  ['c57', 'm', 'm', '(m)', '14 a4 Qc7 15 a5 h5 16 Qc2 Nh7 17 Bd2', { a: '⩲', r: 'Kaidanov–Kamsky, Campeonato dos EUA 1993', c: '14.a4 Qc7 15.a5 h5 16.Qc2 Nh7 17.Bd2 é um pouco melhor para as brancas.' }],
  // Coluna 58
  ['c58', 'n', 'n', '(n)', '6... Na6 7 Qd2 e5 8 d5 c6 9 f3 cxd5 10 cxd5 Bd7 11 g4 h6 12 Be3 h5', { a: '=', r: 'Houchard–Ye Jiangchuan, Belfort 2000', c: 'O sólido 6...Na6 7.Qd2 e5 8.d5 c6 9.f3 cxd5 10.cxd5 Bd7 11.g4 h6 12.Be3 h5 leva à igualdade.' }],
  ['c58-n', '1', 'n', '(n) 7.f4', '7 f4 c6 8 Nf3 Nc7 9 Qd2 d5 10 Bxf6 exf6 11 exd5 cxd5', { a: '=', c: '7.f4 c6 8.Nf3 Nc7 9.Qd2 d5! 10.Bxf6 exf6! 11.exd5 cxd5 leva à igualdade.' }],
  ['c58', 'o', 'o', '(o)', '7... e5 8 d5 Nc5 9 f3 a5 10 O-O-O Bd7 11 Kb1 Qe8 12 g4', { a: '⩲', r: 'Alburt–Cebalo, Taxco 1985', c: '7...e5 8.d5 Nc5 9.f3 a5 10.O-O-O Bd7 11.Kb1 Qe8 12.g4 é um pouco melhor para as brancas.' }],
  ['c58', 'p', 'p', '(p)', '14 dxe5 Qxe5 15 Rfe1 Qd6 16 Qe2 Qc5 17 Bxf6 exf6 18 Nd5', { a: '⩲', r: 'Gelfand–Svidler, Groningen 1996', c: '14.dxe5 Qxe5 15.Rfe1 Qd6 16.Qe2 Qc5 17.Bxf6 exf6 18.Nd5 dá às brancas iniciativa que vale mais que o peão.' }],
  // Coluna 59
  ['c59', 'q', 'q', '(q)', '5... e5 6 d5 a5 7 Nge2 Na6 8 f3 Nd7 9 Be3 Bh6 10 Qd2 Bxe3 11 Qxe3 c6 12 Qh6 Ndc5 13 Rd1', { a: '±', r: 'Seirawan–Ivanchuk, Groningen 1997', c: '5...e5 6.d5 a5 7.Nge2 Na6 8.f3 Nd7 9.Be3 Bh6 10.Qd2 Bxe3 11.Qxe3 c6?! 12.Qh6 Ndc5 13.Rd1 é melhor para as brancas.' }],
  ['c59-q', '1', 'q', '(q) 11...O-O', '11... O-O', { c: '11...O-O!? era melhor.' }],
  ['c59', 'r', 'r', '(r)', '6... e5 7 d5', { a: '⩲', c: '6...e5 7.d5 é um pouco melhor para as brancas.' }],
  ['c59', 's-A', 's', '(s) A', '7... Nh5 8 Be3 e5 9 d5 Ne7 10 Qd2 f5 11 exf5 gxf5 12 Bg5 f4 13 f3', { a: '⩲', r: 'Christiansen–Gallagher, Berna 1996', c: '7...Nh5 8.Be3 e5 9.d5 Ne7 10.Qd2 f5 11.exf5 gxf5 12.Bg5 f4 13.f3 é um pouco melhor para as brancas.' }],
  ['c59', 's-B', 's', '(s) B', '7... Nd7 8 Be3 e5 9 d5 Ne7 10 Ng3 h5 11 h3 h4 12 Nge2 f5 13 exf5 gxf5 14 f4', { a: '⩲', r: 'Seirawan–J. Polgár, Melody Amber (rápidas) 1994', c: '7...Nd7 8.Be3 e5 9.d5 Ne7 10.Ng3 h5 11.h3 h4 12.Nge2 f5 13.exf5 gxf5 14.f4 é um pouco melhor para as brancas.' }],
  ['c59-s-B', '1', 's', '(s) B 8.Bc2', '8 Bc2', { c: '8.Bc2!? também é possível.' }],
  ['c59-s-B', '2', 's', '(s) B 9...Nd4', '9... Nd4 10 Bc2 Nxc2 11 Qxc2', { a: '⩲', c: '9...Nd4 10.Bc2 Nxc2 11.Qxc2 é um pouco melhor para as brancas.' }],
  ['c59', 't', 't', '(t)', '13 exd5 Rxe1+ 14 Qxe1 Bxd4', { a: '=', c: '13.exd5 Rxe1+ 14.Qxe1 Bxd4 leva à igualdade.' }],
  ['c59', 'u', 'u', '(u)', '14 Qc2 Bd7', { a: '=', c: '14.Qc2 Bd7 leva à igualdade.' }],
  // Coluna 60
  ['c60', 'v-A', 'v', '(v) A', '5... c6 6 Ng3 h5 7 Be2 a6 8 O-O b5 9 e5 dxe5 10 dxe5 Qxd1 11 Rxd1', { a: '⩲', r: 'Novikov–van Wely, Helsinque 1992', c: '5...c6 6.Ng3 h5 7.Be2 a6 8.O-O b5 9.e5 dxe5 10.dxe5 Qxd1 11.Rxd1 é um pouco melhor para as brancas.' }],
  ['c60', 'v-B', 'v', '(v) B', '5... c5 6 dxc5 dxc5 7 Qxd8+ Kxd8 8 Be3', { a: '⩲', c: '5...c5?! 6.dxc5! dxc5 7.Qxd8+ Kxd8 8.Be3 é um pouco melhor para as brancas.' }],
  ['c60', 'w-A', 'w', '(w) A', '6... Nc6 7 d5 Ne5 8 Be2 h5 9 O-O h4 10 Nh1', { a: '=', c: '6...Nc6!? 7.d5 Ne5 8.Be2 h5 9.O-O h4 10.Nh1 leva à igualdade.' }],
  ['c60', 'w-B', 'w', '(w) B', '6... e5 7 d5 a5 8 Be2 Na6 9 h4 c6 10 h5 cxd5 11 cxd5 Nc5 12 Be3 Qb6 13 Rb1 Bd7 14 Nf1 a4 15 Nd2', { a: '⩲', r: 'Lutz–Gelfand, Horgen 1994', c: '6...e5 7.d5 a5 8.Be2 Na6 9.h4 c6 10.h5 cxd5 11.cxd5 Nc5 12.Be3 Qb6 13.Rb1 Bd7 14.Nf1 a4 15.Nd2 é um pouco melhor para as brancas.' }],
  ['c60', 'x-A', 'x', '(x) A', '7 Bg5 Nh7 8 Be3 e5 9 d5 h4 10 Nge2 Bf6 11 Qd2 Bg5 12 O-O-O Bxe3 13 Qxe3 Qg5', { a: '=', c: '7.Bg5 Nh7 8.Be3 e5 9.d5 h4 10.Nge2 Bf6 11.Qd2 Bg5 12.O-O-O Bxe3 13.Qxe3 Qg5 leva à igualdade.' }],
  ['c60', 'x-B', 'x', '(x) B', '7 h4 e5 8 d5 Nh7 9 Be2 Bf6 10 Be3 Nd7 11 Qd2 Bxh4', { a: '⩱', r: 'Farrell–Rowson, Escócia 1994', c: '7.h4 e5 8.d5 Nh7 9.Be2 Bf6 10.Be3 Nd7 11.Qd2 Bxh4 é um pouco melhor para as pretas.' }],
  ['c60-x-B', '1', 'x', '(x) B 7...Nc6', '7... Nc6', { c: '7...Nc6!? também é possível.' }],
  ['c60', 'y', 'y', '(y)', '8... c5 9 d5 b5 10 cxb5 a6', { a: '⩱', c: '8...c5 9.d5 b5!? 10.cxb5 a6 é um pouco melhor para as pretas.' }],
  ['c60-y', '1', 'y', '(y) 8...h3', '8... h3', { c: '8...h3!? também é possível.' }],
  ['c60', 'z', 'z', '(z)', '14 Nxc4 Nxc4 15 Bxc4 Rb8 16 Qe2 Rxb2 17 Qxb2 Nxe4', { a: '=', c: '14.Nxc4 Nxc4 15.Bxc4 Rb8 16.Qe2 Rxb2!? 17.Qxb2 Nxe4 leva à igualdade.' }],
]

const capitulo = {
  id: 'india-rei-j',
  arquivo: 'india-rei-j',
  nome: 'Índia do Rei — 5.h3, Averbakh e outras',
  fonte: "Modern Chess Openings — King's Indian Defense (pp. 618–619), colunas 55–60",
  base: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6',
  corPadrao: 'b',
  ordem: 618,
  grupos: [
    { id: 'h3', nome: '5.h3', colunas: [55, 56] },
    { id: 'averbakh', nome: 'Averbakh (5.Be2 e 6.Bg5)', colunas: [57, 58] },
    { id: 'outras', nome: '5.Bd3 e 5.Nge2', colunas: [59, 60] },
  ],
}

module.exports = { capitulo, colunas, notas }
