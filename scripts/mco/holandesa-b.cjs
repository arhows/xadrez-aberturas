// Transcrição do MCO 15ª ed. — Defesa Holandesa, Variante Leningrado: desvios das brancas (pp. 497–498), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs holandesa-b
// Formato: ver gambito-do-rei.cjs. Dicas em holandesa-b-dicas.cjs.
//
// Só a coluna 12 traz avaliação no fim; nas outras usamos a avaliação da nota que continua a coluna.

const L = '1 d4 f5 2 g3 Nf6 3 Bg2 g6'
const F = `${L} 4 Nf3 Bg7 5 O-O O-O 6 b3`

const colunas = {
  c07: [`${F} d6 7 Bb2 Ng4 8 c4 Nd7 9 Nc3 e5 10 dxe5 dxe5 11 e4 Nh6`, 'nf3', '4.Nf3 com 6.b3 d6', '=',
    'Aqui as brancas fogem da linha principal da Leningrado. Com 6.b3 o bispo vai a b2 antes de c4. Depois de 6...d6 7.Bb2 Ng4 8.c4 Nd7 9.Nc3 e5 10.dxe5 dxe5 11.e4 Nh6 as pretas conseguem ...e5 e o jogo é igual.'],
  c08: [`${F} Ne4 7 Bb2 d5 8 c4 c6 9 Nbd2 Be6 10 e3 Nd7 11 Rc1 Kh8`, 'nf3', '6...Ne4', '=',
    'Com 6...Ne4 7.Bb2 d5 as pretas montam uma estrutura do tipo Stonewall com o bispo em g7. Depois de 8.c4 c6 9.Nbd2 Be6 10.e3 Nd7 11.Rc1 Kh8 o jogo é igual (Kharitonov–Bareev, Sochi 1987).'],
  c09: [`${L} 4 c3 Bg7 5 Qb3 Nc6 6 Nf3 e6 7 O-O O-O 8 Nbd2 a5 9 a4 d5 10 Qc2 b6 11 b3 Ne4`, 'c3', '4.c3 Bg7 5.Qb3', '=',
    'Com 4.c3 as brancas adiam o c4 e montam um centro sólido. Depois de 4...Bg7 5.Qb3 (contra o roque preto) Nc6 6.Nf3 e6 7.O-O O-O 8.Nbd2 a5 9.a4 d5 10.Qc2 b6 11.b3 Ne4 o jogo é igual.'],
  c10: [`${L} 4 c3 c6 5 Bg5 Bg7 6 Nd2 d5 7 Nh3 O-O 8 O-O Qe8 9 c4 Ne4 10 Nxe4 dxe4 11 f3 e5`, 'c3', '4...c6', '=',
    'Com 4...c6 as pretas preparam ...d5. Depois de 5.Bg5 Bg7 6.Nd2 d5 7.Nh3 O-O 8.O-O Qe8 9.c4 Ne4 10.Nxe4 dxe4 11.f3 e5 o jogo tem equilíbrio dinâmico.'],
  c11: [`${L} 4 Nh3 Bg7 5 c4 d6 6 d5 O-O 7 Nc3 c6 8 Nf4 e5 9 dxe6 Qe7 10 O-O Bxe6 11 Nxe6 Qxe6`, 'nh3', '4.Nh3 Bg7 5.c4', '⩲',
    'Com 4.Nh3 o cavalo vai a f4, de onde mira e6 e d5. Depois de 4...Bg7 5.c4 d6 6.d5 O-O 7.Nc3 c6 8.Nf4 e5 9.dxe6 Qe7 10.O-O Bxe6 11.Nxe6 Qxe6 as brancas ficam com o par de bispos e um pouco melhor.'],
  c12: [`${L} 4 Nh3 Bg7 5 Nf4 Nc6 6 h4 Ng4 7 d5 Nce5 8 Nc3 Nf7 9 e4 e5 10 dxe6 dxe6 11 Qxd8+ Kxd8`, 'nh3', '5.Nf4', '=',
    'Com 5.Nf4 Nc6! as pretas atacam d4 de imediato. Depois de 6.h4 Ng4 7.d5 Nce5 8.Nc3 Nf7 9.e4 e5 10.dxe6 dxe6 11.Qxd8+ Kxd8 as damas saem do tabuleiro e o jogo é igual (Malaniuk–Borge, Copenhague 1992).'],
}

const notas = [
  // Coluna 7
  ['c07', 'a', 'a', '(a)', '2 c4 Nf6 3 Nc3 g6 4 h4 Bg7 5 h5 Nxh5 6 e4', { a: '∞', r: 'Komarov–Vragoteris, Corfu 1991', c: 'Com a ordem 2.c4 Nf6 3.Nc3 as brancas podem responder 3...g6 com 4.h4!? Bg7 5.h5 Nxh5 6.e4, com jogo perigoso pelo peão.' }],
  ['c07-a', '1', 'a', '(a) 3...d6', '3... d6 4 g3 g6 5 Bg2 Bg7 6 Nf3 O-O 7 O-O', { c: 'As pretas evitam isso com 3...d6: 4.g3 g6 5.Bg2 Bg7 6.Nf3 O-O 7.O-O volta à linha principal da Leningrado.' }],
  ['c07', 'b', 'b', '(b)', '6 b4 Ne4 7 c4 e6 8 Bb2 b6 9 Nc3 Bb7 10 Rc1 a5', { a: '=', r: 'Bareev–Malaniuk, Groningen 1997', c: '6.b4 Ne4 7.c4 e6 8.Bb2 b6 9.Nc3 Bb7 10.Rc1 a5 é igual.' }],
  ['c07', 'c', 'c', '(c)', '8 Nc3 f4 9 h3 Nh6 10 g4 c6', { a: '=', r: 'Ftáčnik–M. Gurevich, Jacarta 1996', c: '8.Nc3 f4 9.h3 Nh6 10.g4 c6 é agudo, mas mais ou menos igual.' }],
  ['c07', 'd', 'd', '(d)', '12 Qc2 c6 13 Rad1 Qe8', { a: '=', r: 'Barbero–Malaniuk, Cattolica 1994', c: '12.Qc2 c6 13.Rad1 Qe8 é igual.' }],
  // Coluna 8
  ['c08', 'e', 'e', '(e)', '11 Nxe4 dxe4 12 Ng5 Bf7 13 f3 exf3 14 Qxf3 e5', { a: '=', r: 'Kharitonov', c: '11.Nxe4 dxe4 12.Ng5 Bf7 13.f3 exf3 14.Qxf3 e5 é igual.' }],
  ['c08', 'f', 'f', '(f)', '12 Qc2 a5 13 a4 Qe8', { a: '=', r: 'Kharitonov–Bareev, Sochi 1987', c: '12.Qc2 a5 13.a4 Qe8 é igual.' }],
  // Coluna 9
  ['c09', 'g', 'g', '(g)', '5... d5 6 Nh3 c6 7 Nd2 Qb6 8 Nf4 Na6 9 Nf3 Ne4 10 h4', { a: '⩲', r: 'Ftáčnik–Schmied, Neckar 2002', c: '5...d5 6.Nh3 c6 7.Nd2 Qb6 8.Nf4 Na6 9.Nf3 Ne4 10.h4 é um pouco melhor para as brancas.' }],
  ['c09', 'h', 'h', '(h)', '12 Ba3 Rf7 13 Rad1 Rd7 14 b4 axb4', { a: '=', r: 'I. Sokolov–Malaniuk, Moscou 1994', c: '12.Ba3 Rf7 13.Rad1 Rd7 14.b4 axb4 é igual.' }],
  // Coluna 10
  ['c10', 'i', 'i', '(i)', '4... Nc6 5 Nd2 d6 6 d5 Ne5 7 Ndf3 Bg7 8 Nd4 Bd7 9 Nh3', { a: '⩲', r: 'Khenkin–Nijboer, Amsterdã 2005', c: '4...Nc6 5.Nd2! d6 6.d5 Ne5 7.Ndf3 Bg7 8.Nd4 Bd7 9.Nh3 é um pouco melhor para as brancas.' }],
  ['c10', 'j', 'j', '(j)', '10... fxe4 11 Qb3 Qf7 12 cxd5 cxd5', { a: '⩲', r: 'Stohl', c: '10...fxe4 11.Qb3 Qf7 12.cxd5 cxd5 deixa as brancas um pouco melhor.' }],
  ['c10', 'k', 'k', '(k)', '11... exf3 12 exf3 Qf7 13 Re1', { r: 'P. Nikolić–Ivanchuk, Olimpíada de Manila 1990', c: '11...e5 é mais claro que 11...exf3 12.exf3 Qf7 13.Re1.' }],
  // Coluna 11
  ['c11', 'l', 'l', '(l)', '10... g5 11 Nfd5 cxd5 12 cxd5 Ne8 13 f4 gxf4 14 Bxf4 Na6 15 e4', { a: '±', r: 'Seirawan–Tisdall, Reykjavik 1990', c: '10...g5? 11.Nfd5 cxd5 12.cxd5 Ne8 13.f4 gxf4 14.Bxf4 Na6 15.e4 é melhor para as brancas.' }],
  ['c11', 'm', 'm', '(m)', '12 Bf4 Qxc4 13 Qxd6 Na6 14 Rfd1', { a: '⩲', r: 'Babula–Balinov, Liga Austríaca 2004', c: '12.Bf4 Qxc4 13.Qxd6 Na6 14.Rfd1 é um pouco melhor para as brancas.' }],
  // Coluna 12
  ['c12', 'n-A', 'n', '(n) A', '5... O-O 6 h4 d6 7 c3 c6 8 Qb3+ d5 9 h5 g5 10 h6 Bh8 11 Nd3', { a: '±', r: 'Savchenko–Malaniuk, Kherson 1989', c: '5...O-O 6.h4 d6 7.c3 c6 8.Qb3+ d5 9.h5 g5 10.h6 Bh8 11.Nd3 é melhor para as brancas.' }],
  ['c12', 'n-B', 'n', '(n) B', '5... c6 6 h4 d6 7 Nc3 e5 8 dxe5 dxe5 9 Qxd8+', { a: '±', r: 'Smyslov–Oll, Rostov 1993', c: '5...c6 6.h4 d6 7.Nc3 e5 8.dxe5 dxe5 9.Qxd8+ é melhor para as brancas.' }],
  ['c12', 'o', 'o', '(o)', '6 d5 Ne5 7 Nc3 c6 8 h4 Nf7 9 e4 O-O 10 exf5 gxf5 11 Nh5 Nxh5 12 Qxh5 e6', { a: '=', r: 'Smyslov–Kindermann, Münster 1993', c: '6.d5 Ne5 7.Nc3 c6 8.h4 Nf7 9.e4 O-O 10.exf5 gxf5 11.Nh5 Nxh5 12.Qxh5 e6 é igual.' }],
  ['c12', 'p', 'p', '(p)', '10... Bxc3+ 11 bxc3 dxe6 12 Qe2 Qf6', { a: '∞', r: 'N. McDonald', c: '10...Bxc3+ 11.bxc3 dxe6 12.Qe2 Qf6 é uma ideia de dois gumes.' }],
]

const capitulo = {
  id: 'holandesa-b',
  arquivo: 'holandesa-b',
  nome: 'Holandesa — Leningrado: 6.b3, 4.c3 e 4.Nh3',
  fonte: 'Modern Chess Openings — Dutch Defense (pp. 497–498), colunas 7–12',
  base: '1. d4 f5',
  corPadrao: 'b',
  ordem: 497,
  grupos: [
    { id: 'nf3', nome: '4.Nf3 com 6.b3', colunas: [7, 8] },
    { id: 'c3', nome: '4.c3', colunas: [9, 10] },
    { id: 'nh3', nome: '4.Nh3', colunas: [11, 12] },
  ],
}

module.exports = { capitulo, colunas, notas }
