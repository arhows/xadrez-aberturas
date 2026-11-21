// Transcrição do MCO 15ª ed. — Índia do Rei, Sistema do Fianqueto, Variante Clássica (pp. 620–621), colunas 61–66.
// Gerar: node scripts/mco/gerar.cjs india-rei-k
// Formato: ver gambito-do-rei.cjs. Dicas em india-rei-k-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua:
// 61 (b) ⩲, 62 (e) A ∓, 63 (i) B ⩲, 64 (k) =, 65 (m) ⩲, 66 (n) ∓.
// A nota (i) traz primeiro uma alternativa (16...Nxe5) e depois a continuação da coluna (16...Qa6 17.f4...); viraram
// (i) A e (i) B.
// Avaliações tiradas do texto: (e) B "apesar do material as brancas estão pior" e (e) C "bom para as pretas" ficaram ∓;
// (g) "boa compensação pelo peão" ficou =; (i) A "põe as pretas em dificuldades" ficou ±; (i) B "as brancas ficaram
// melhor numa luta complicada" ficou ⩲; (k) "está bem para as pretas" ficou =; (n) "as brancas ficaram seriamente
// apertadas" ficou ∓.
// Sinais conferidos com zoom: (b), (f), (j), (l), (m) ⩲; (h) ±; (e) A ∓.
// Errata: (j) 18...Nd7 → Nc7 (o único cavalo preto está em e8 e não chega a d7; troquei pelo lance de uma letra de
// diferença que leva o cavalo a d5).
// As notas (c) ("muitas transposições") e (d) ("f3 pode ser omitido quando a torre de e8 não está protegida")
// foram para o resumo da coluna 62.

const B = '1 d4 Nf6 2 c4 g6 3 g3 Bg7 4 Bg2 O-O 5 Nc3 d6 6 Nf3 Nbd7 7 O-O e5'
const E = `${B} 8 e4 c6 9 h3`

const colunas = {
  c61: [`${E} exd4 10 Nxd4 Re8 11 Rb1 a5 12 Re1 Nc5 13 b3 Nh5 14 Be3 Qe7 15 Qd2 Qf8 16 Rbd1 Nf6`, 'e4', '9...exd4', '⩲',
    'Na Variante Clássica do Fianqueto as pretas montam ...Nbd7, ...e5 e ...c6. Com 9...exd4 10.Nxd4 Re8 elas pressionam e4; depois de 11.Rb1 a5 12.Re1 Nc5 13.b3 Nh5 14.Be3 Qe7 15.Qd2 Qf8 16.Rbd1 Nf6 17.Qc2 as brancas ficam com vantagem de espaço, como é comum nesta variante.'],
  c62: [`${E} Re8 10 Be3 exd4 11 Nxd4 Nc5 12 Qc2 Qe7 13 Rfe1 Bd7 14 f3 Nh5 15 Kh2 f5 16 exf5 Nxg3`, 'e4', '9...Re8', '∓',
    'Com 9...Re8 as pretas mantêm a tensão; estas linhas transpõem muito umas para as outras. Depois de 10.Be3 exd4 11.Nxd4 Nc5 12.Qc2 Qe7 13.Rfe1 Bd7 14.f3 (f3 só é necessário quando a torre de e8 fica desprotegida) 14...Nh5 15.Kh2 f5 16.exf5 Nxg3! as pretas recuperam a peça e ficam melhor.'],
  c63: [`${E} Qb6 10 c5 dxc5 11 dxe5 Ne8 12 Be3 Nc7 13 Qc2 Ne6 14 Na4 Qb5 15 Rfd1 c4 16 Nd2 Qa6`, 'e4', '9...Qb6', '⩲',
    'Com 9...Qb6 a dama pressiona d4 e b2. O 10.c5! é a resposta mais forte; depois de 10...dxc5 11.dxe5 Ne8 12.Be3! Nc7 13.Qc2 Ne6 14.Na4 Qb5 15.Rfd1 c4 16.Nd2 Qa6 17.f4 as brancas ficam melhor numa luta complicada.'],
  c64: [`${E} Qa5 10 Re1 exd4 11 Nxd4 Ne5 12 Bf1 Re8 13 Nb3 Qc7 14 f4 Ned7 15 Bg2 a5 16 Be3 a4`, 'e4', '9...Qa5', '=',
    'Com 9...Qa5 a dama pressiona c3. Depois de 10.Re1 exd4 11.Nxd4 Ne5 12.Bf1 Re8 13.Nb3 Qc7 14.f4 Ned7 15.Bg2 a5 16.Be3 a4 17.Nd4 Nc5 as pretas ficam bem.'],
  c65: [`${E} a6 10 Be3 Re8 11 Qc2 b5 12 dxe5 Nxe5 13 Nxe5 dxe5 14 Rfd1 Qe7 15 cxb5 cxb5 16 a4 Bd7`, 'e4', '9...a6', '⩲',
    'Com 9...a6 as pretas preparam ...b5. Depois de 10.Be3 Re8 11.Qc2 b5 12.dxe5 Nxe5 13.Nxe5 dxe5 14.Rfd1 Qe7 15.cxb5 cxb5 16.a4 Bd7 17.axb5 axb5 18.Qb3 a ala da dama preta fica aberta e as brancas ficam um pouco melhor.'],
  c66: [`${B} 8 Qc2 Re8 9 Rd1 e4 10 Ng5 e3 11 f4 h6 12 Nge4 Nxe4 13 Bxe4 Nf6 14 Bg2 Ng4 15 d5 Nf2 16 Rf1 Bf5`, 'qc2', '8.Qc2 Re8 9.Rd1 e4!?', '∓',
    'Com 8.Qc2 e 9.Rd1 as brancas pressionam d6 sem jogar e4. As pretas respondem com 9...e4!? 10.Ng5 e3; depois de 11.f4 h6 12.Nge4 Nxe4 13.Bxe4 Nf6 14.Bg2 Ng4 15.d5 Nf2 16.Rf1 Bf5 o peão de e3 aperta a posição branca.'],
}

const notas = [
  // Coluna 61
  ['c61', 'a', 'a', '(a)', '8 h3 exd4 9 Nxd4 Nb6 10 b3 d5 11 Ba3 Re8 12 c5 Nbd7 13 c6 Ne5 14 cxb7 Bxb7 15 Rc1 Rc8 16 Na4 Ne4 17 Nc5 Nxc5 18 Bxc5 Nd7', { a: '=', r: 'Akopian–Avrukh, Amsterdã 2005', c: '8.h3 exd4!? 9.Nxd4 Nb6!? 10.b3 d5 11.Ba3 Re8 12.c5 Nbd7 13.c6 Ne5 14.cxb7 Bxb7 15.Rc1 Rc8 16.Na4 Ne4 17.Nc5 Nxc5 18.Bxc5 Nd7 leva à igualdade.' }],
  ['c61-a', '1', 'a', '(a) 8...c6', '8... c6 9 e4', { c: '8...c6 9.e4 volta à coluna.' }],
  ['c61', 'b', 'b', '(b)', '17 Qc2 Nfd7 18 f4', { a: '⩲', r: 'Wojtkiewicz–Bjarnason, New York Open 1994', c: '17.Qc2 Nfd7 18.f4 dá às brancas vantagem de espaço, como é comum nesta variante.' }],
  // Coluna 62
  ['c62', 'e-A', 'e', '(e) A', '17 Kxg3 Bxd4 18 Bxd4 Qg5+', { a: '∓', c: '17.Kxg3 Bxd4! 18.Bxd4 Qg5+ recupera a peça com bom jogo para as pretas.' }],
  ['c62', 'e-B', 'e', '(e) B', '17 Bf2 Qf6 18 Bxg3 Qxd4 19 fxg6 Qd3', { a: '∓', r: 'Portisch–Groszpeter, Hungria 1993', c: '17.Bf2!? Qf6 18.Bxg3 Qxd4 19.fxg6 Qd3! deixa as brancas pior, apesar do material a mais.' }],
  ['c62', 'e-C', 'e', '(e) C', '17 fxg6 Nh5 18 gxh7+ Kh8 19 f4 Qh4 20 Nf3 Qg3+ 21 Kg1 Nxf4', { a: '∓', r: 'Ionov–Z. Almasi, Tilburg 1994', c: '17.fxg6?! Nh5 18.gxh7+ Kh8 19.f4 Qh4 20.Nf3 Qg3+ 21.Kg1 Nxf4 foi bom para as pretas.' }],
  // Coluna 63
  ['c63', 'f', 'f', '(f)', '10 Re1 Ne8 11 d5 c5 12 Bd2 Qd8 13 Re2 f6 14 Qc2', { a: '⩲', r: 'Gutman–Benjamin, Londres 1987', c: '10.c5 é a resposta mais forte a 9...Qb6. Também dá para jogar 10.Re1 Ne8 11.d5 c5 12.Bd2 Qd8 13.Re2 f6 14.Qc2, com posição branca mais flexível.' }],
  ['c63', 'g', 'g', '(g)', '12 e6 fxe6 13 Ng5 Ne5 14 f4 Nf7 15 Nxf7 Bd4+ 16 Kh2 Rxf7 17 e5 Qc7 18 h4', { a: '=', r: 'Gaprindashvili–Kotronias, Filadélfia 2000', c: '12.e6 fxe6 13.Ng5 Ne5 14.f4 Nf7 15.Nxf7 Bd4+ 16.Kh2 Rxf7 17.e5 Qc7 18.h4 também é razoável, com boa compensação pelo peão.' }],
  ['c63', 'h', 'h', '(h)', '12... Qxb2 13 Na4 Qb5 14 Rb1 Qa5 15 Qc2 b6 16 Nd2 Nxe5 17 f4 Nd7 18 e5', { a: '±', c: '12...Qxb2 13.Na4 Qb5 14.Rb1 Qa5 15.Qc2 b6 16.Nd2 Nxe5 17.f4 Nd7 18.e5 dá às brancas desenvolvimento e espaço.' }],
  ['c63', 'i-A', 'i', '(i) A', '16... Nxe5 17 f4 Nd3 18 Nxc4 Nb4 19 Qb3', { a: '±', c: '16...Nxe5 17.f4 Nd3 18.Nxc4 Nb4 19.Qb3 põe as pretas em dificuldades.' }],
  ['c63', 'i-B', 'i', '(i) B', '17 f4 b5 18 Nc3 Bh6 19 Nf3 Ndc5 20 b3 Qa3 21 Rab1 Nd3 22 Bf1', { a: '⩲', r: 'Mikhalchishin–Kotronias, Iugoslávia 1997', c: 'Depois de 16...Qa6 17.f4 b5 18.Nc3 Bh6 19.Nf3 Ndc5 20.b3 Qa3 21.Rab1 Nd3 22.Bf1! as brancas ficaram melhor numa luta complicada.' }],
  // Coluna 64
  ['c64', 'j', 'j', '(j)', '12... Be6 13 f4 Nxc4 14 Nxe6 fxe6 15 Kg2 d5 16 e5 Ne8 17 Bxc4 dxc4 18 Qd4 Nc7 19 Qxc4', { a: '⩲', r: 'K. Georgiev–Ivanišević, Karađorđe 2004', c: '12...Be6!? 13.f4 Nxc4 14.Nxe6 fxe6 15.Kg2 d5 16.e5 Ne8 17.Bxc4 dxc4 18.Qd4 Nc7 19.Qxc4 é um pouco melhor para as brancas.' }],
  ['c64-j', '1', 'j', '(j) 13.Nxe6', '13 Nxe6 fxe6 14 Kg2 Rad8 15 Bd2 Qc7 16 f4 Nf7', { a: '=', r: 'Narciso–Damjanović, Mondariz 2002', c: '13.Nxe6 fxe6 14.Kg2 Rad8 15.Bd2 Qc7 16.f4 Nf7 leva à igualdade.' }],
  ['c64', 'k', 'k', '(k)', '17 Nd4 Nc5 18 Bf2 h5 19 Qc2 Bd7 20 Nf3 a3', { a: '=', r: 'Wojtkiewicz–Forster, Genebra 1997', c: '17.Nd4 Nc5 18.Bf2 h5!? 19.Qc2 Bd7 20.Nf3 a3! está bem para as pretas.' }],
  // Coluna 65
  ['c65', 'l', 'l', '(l)', '9... Ne8 10 d5 c5 11 Bg5 f6 12 Be3 Qe7 13 Qd2 f5 14 Rac1 Nef6 15 Ng5', { a: '⩲', r: 'Kornyushin–Saltaev, Vladivostok 1995', c: '9...Ne8 10.d5 c5 11.Bg5 f6 12.Be3 Qe7 13.Qd2 f5 14.Rac1 Nef6 15.Ng5 deixa a posição preta solta.' }],
  ['c65-l', '1', 'l', '(l) 13.Nh4', '13 Nh4', { c: '13.Nh4! é mais forte.' }],
  ['c65', 'm', 'm', '(m)', '17 axb5 axb5 18 Qb3 Rxa1 19 Rxa1 b4 20 Nd5', { a: '⩲', r: 'Milos–Fedorowicz, Buenos Aires 1991', c: '17.axb5 axb5 18.Qb3 Rxa1 19.Rxa1 b4 20.Nd5 deixa a ala da dama preta escancarada.' }],
  // Coluna 66
  ['c66', 'n', 'n', '(n)', '17 Qb3 Nh3+ 18 Kh1 Nf2+ 19 Kg1 Qc8 20 Nd1 Nxd1 21 Qxd1 Be4', { a: '∓', r: 'Maiwald–Ketevan, Alemanha 1994', c: '17.Qb3 Nh3+ 18.Kh1 Nf2+ 19.Kg1 Qc8 20.Nd1 Nxd1 21.Qxd1 Be4 deixa as brancas seriamente apertadas pelo peão de e3.' }],
]

const capitulo = {
  id: 'india-rei-k',
  arquivo: 'india-rei-k',
  nome: 'Índia do Rei — Fianqueto clássico',
  fonte: "Modern Chess Openings — King's Indian Defense (pp. 620–621), colunas 61–66",
  base: '1. d4 Nf6 2. c4 g6 3. g3 Bg7 4. Bg2 O-O 5. Nc3 d6 6. Nf3 Nbd7 7. O-O e5',
  corPadrao: 'b',
  ordem: 620,
  grupos: [
    { id: 'e4', nome: '8.e4 c6 9.h3', colunas: [61, 62, 63, 64, 65] },
    { id: 'qc2', nome: '8.Qc2', colunas: [66] },
  ],
}

module.exports = { capitulo, colunas, notas }
