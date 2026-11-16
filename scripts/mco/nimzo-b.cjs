// Transcrição do MCO 15ª ed. — Defesa Nimzo-Índia, Variante Clássica 4...d5 (pp. 543–544), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs nimzo-b
// Formato: ver gambito-do-rei.cjs. Dicas em nimzo-b-dicas.cjs.
//
// Errata: nota (e)B, "12 Qxa5 Na5" → 12...Nxa5.
// Só a coluna 7 não tem nota no fim; as outras usam a avaliação da nota que as continua.
// Coluna 8: "jogo suficiente pela peça" (nota h) ficou =; coluna 10: "chances para os dois lados" (nota p) ficou ∞.
// Notas só com comentário: (a), (d) 10...dxe3 e 12.Be2, (j).

const B = '1 d4 Nf6 2 c4 e6 3 Nc3 Bb4 4 Qc2 d5'
const A3 = `${B} 5 a3 Bxc3+ 6 Qxc3`

const colunas = {
  c07: [`${A3} Ne4 7 Qc2 Nc6 8 e3 e5 9 cxd5 Qxd5 10 Bc4 Qa5+ 11 b4 Nxb4 12 Qxe4 Nc2+`, 'a3', '5.a3 Bxc3+ 6.Qxc3 Ne4 7.Qc2 Nc6', '=',
    'Com 4...d5 as pretas disputam o centro logo. Depois de 5.a3 Bxc3+ 6.Qxc3 Ne4 7.Qc2 Nc6 8.e3 e5 9.cxd5 Qxd5 10.Bc4 Qa5+ 11.b4 Nxb4 12.Qxe4 Nc2+ a posição fica muito complicada, mas as chances são mais ou menos iguais.'],
  c08: [`${A3} Ne4 7 Qc2 c5 8 dxc5 Nc6 9 cxd5 exd5 10 Nf3 Bf5 11 b4 O-O 12 Bb2 b6`, 'a3', '7...c5', '=',
    'Com 7...c5 as pretas sacrificam material pelo desenvolvimento. Depois de 8.dxc5 Nc6 9.cxd5 exd5 10.Nf3 Bf5 11.b4 O-O 12.Bb2 b6!, com 13.b5 bxc5 14.bxc6, as pretas têm jogo suficiente pela peça.'],
  c09: [`${A3} Nc6 7 Nf3 Ne4 8 Qb3 Na5 9 Qa4+ c6 10 cxd5 exd5 11 e3 Bf5 12 Bd2 Nxd2`, 'a3', '6...Nc6', '⩲',
    'Com 6...Nc6 7.Nf3 Ne4 8.Qb3 Na5 as pretas atacam a dama. Depois de 9.Qa4+ c6 10.cxd5 exd5 11.e3 Bf5 12.Bd2 Nxd2 13.Nxd2 o rei branco fica seguro e a ala da dama das pretas, fraca: as brancas ficam um pouco melhor.'],
  c10: [`${B} 5 cxd5 Qxd5 6 Nf3 Qf5 7 Qd1 c5 8 e3 cxd4 9 exd4 Ne4 10 Bd2 Nc6 11 Bd3 Nxf2 12 Bxf5 Nxd1`, 'cxd5-qxd5', '5.cxd5 Qxd5 6.Nf3 Qf5!', '∞',
    'Com 5.cxd5 Qxd5 6.Nf3 Qf5! as pretas oferecem a troca de damas. Depois de 7.Qd1 c5 8.e3 cxd4 9.exd4 Ne4 10.Bd2 Nc6 11.Bd3 Nxf2!? 12.Bxf5 Nxd1 a posição fica complicada, com chances para os dois lados.'],
  c11: [`${B} 5 cxd5 Qxd5 6 Nf3 c5 7 Bd2 Bxc3 8 Bxc3 cxd4 9 Rd1 Nc6 10 Nxd4 O-O 11 a3 Nxd4 12 Rxd4 Qc6`, 'cxd5-qxd5', '6...c5', '⩲',
    'Com 6...c5 7.Bd2 Bxc3 8.Bxc3 cxd4 9.Rd1! as brancas usam a cravada na coluna d. Depois de 9...Nc6 10.Nxd4 O-O 11.a3 Nxd4 12.Rxd4 Qc6, com 13.e4 e5 14.Rc4 as brancas ficam um pouco melhor.'],
  c12: [`${B} 5 cxd5 exd5 6 Bg5 h6 7 Bxf6 Qxf6 8 a3 Bxc3+ 9 Qxc3 O-O 10 e3 Bf5 11 Ne2 Rc8 12 Ng3 Be6`, 'cxd5-exd5', '5.cxd5 exd5', '⩲',
    'Com 5...exd5 as pretas ficam com a estrutura da Variante das Trocas. Depois de 6.Bg5 h6 7.Bxf6 Qxf6 8.a3 Bxc3+ 9.Qxc3 O-O 10.e3 Bf5 11.Ne2! Rc8 12.Ng3 Be6, com 13.b4 as brancas ganham espaço na ala da dama e ficam um pouco melhor.'],
}

const notas = [
  // Coluna 7
  ['c07', 'a', 'a', '(a)', '8 Nf3 e5 9 e3 Bf5 10 Bd3 exd4', { c: '8.Nf3 e5 9.e3 Bf5 10.Bd3 exd4 deixa as peças pretas entrarem bem no jogo.' }],
  ['c07-a', '1', 'a', '(a) 9.dxe5', '9 dxe5 Bf5 10 Qb3 Na5', { a: '∓', c: '9.dxe5 Bf5 10.Qb3 Na5! é melhor para as pretas.' }],
  ['c07', 'b', 'b', '(b)', '9 f3 Nf6 10 dxe5 Nxe5 11 cxd5 Qxd5 12 e4 Qe6 13 Ne2', { a: '⩲', r: 'Khalifman–Kuzubov, Aeroflot Open 2007', c: 'Menos complicado é 9.f3 Nf6 10.dxe5 Nxe5 11.cxd5 Qxd5 12.e4 Qe6 13.Ne2, um pouco melhor para as brancas.' }],
  ['c07', 'c', 'c', '(c)', '13 Ke2 Qe1+ 14 Kf3 Nxa1 15 Bb2 O-O 16 Kg3 h6 17 h4 Re8 18 Kh2 Qxf2 19 Bxa1 Bf5', { a: '=', r: 'Kasparov–Adams, Izmir 2004', c: '13.Ke2 Qe1+ 14.Kf3 Nxa1 15.Bb2 O-O 16.Kg3 h6 17.h4 Re8 18.Kh2 Qxf2 19.Bxa1 Bf5 dá chances mais ou menos iguais numa posição complicada.' }],
  // Coluna 8
  ['c08', 'd', 'd', '(d)', '7... e5 8 cxd5 Qxd5 9 e3 exd4 10 Nf3 Nd6 11 Nxd4 Bd7 12 Bd2 Nc6', { a: '=', r: 'Atalik–Shaked, Nova York 1988', c: 'Pouco jogada, mas boa, é 7...e5 8.cxd5 Qxd5 9.e3 exd4 10.Nf3! Nd6! 11.Nxd4 Bd7! 12.Bd2 Nc6, com igualdade.' }],
  ['c08-d', '1', 'd', '(d) 10...dxe3', '10... dxe3 11 Bc4 exf2+ 12 Kf1 Qc6 13 Ne5', { c: '10...dxe3? 11.Bc4 exf2+ 12.Kf1 Qc6 13.Ne5 ganha.' }],
  ['c08-d', '2', 'd', '(d) 12.Be2', '12 Be2', { c: 'Talvez 12.Be2!? seja bom.' }],
  ['c08', 'e-A', 'e', '(e) A', '9 Nf3 Qa5+ 10 Nd2 Nd4 11 Qd3 e5 12 b4 Qa4', { a: '=', r: 'Bronstein–Boleslavsky, Saltsjöbaden 1948', c: 'As brancas ganham pouco com as alternativas: 9.Nf3 Qa5+ 10.Nd2 Nd4 11.Qd3 e5 12.b4 Qa4 é igual.' }],
  ['c08', 'e-B', 'e', '(e) B', '9 e3 Qa5+ 10 Bd2 Nxd2 11 Qxd2 dxc4 12 Qxa5 Nxa5 13 Rc1 b5 14 cxb6 Bb7 15 Nf3 Ke7', { a: '=', r: 'Tolush–Sokolsky, Leningrado 1934', c: '9.e3 Qa5+ 10.Bd2 Nxd2 11.Qxd2 dxc4 12.Qxa5 Nxa5 13.Rc1 b5 14.cxb6 Bb7 15.Nf3 Ke7! dá bom jogo às pretas.' }],
  ['c08', 'f', 'f', '(f)', '10... Qa5+ 11 Bd2 Nxd2 12 Qxd2 Qxc5 13 e3', { a: '⩲', c: '10...Qa5+ 11.Bd2 Nxd2 12.Qxd2 Qxc5 13.e3 dá às brancas uma vantagem pequena, mas simples.' }],
  ['c08', 'g-A', 'g', '(g) A', '11... Ng3 12 Qb2 Nxh1 13 Qxg7 Rf8 14 Bh6 Qe7 15 Qxf8+ Qxf8 16 Bxf8 Kxf8 17 g3', { a: '±', r: 'I. Sokolov', c: '11...Ng3?! 12.Qb2 Nxh1 13.Qxg7 Rf8 14.Bh6 Qe7 15.Qxf8+ Qxf8 16.Bxf8 Kxf8 17.g3 é melhor para as brancas.' }],
  ['c08', 'g-B', 'g', '(g) B', '11... d4 12 g4 Bg6 13 Qc4 Qe7 14 Bg2 Rd8 15 O-O', { a: '⩲', r: 'Furman–Averbakh, Campeonato da URSS 1948', c: '11...d4 12.g4! Bg6 13.Qc4 Qe7 14.Bg2 Rd8 15.O-O é um pouco melhor para as brancas.' }],
  ['c08', 'h', 'h', '(h)', '13 b5 bxc5 14 bxc6 Qa5+ 15 Nd2 Rab8 16 c7 Qxc7 17 Nxe4 Bxe4 18 Qd2 d4', { a: '=', r: 'Rogers–Ward, Kenilworth 1997', c: '13.b5 bxc5 14.bxc6 Qa5+ 15.Nd2 Rab8 16.c7 Qxc7 17.Nxe4 Bxe4 18.Qd2 d4 dá às pretas jogo suficiente pela peça.' }],
  // Coluna 9
  ['c09', 'i-A', 'i', '(i) A', '7 e3 e5 8 dxe5 Ne4 9 Qd3 Nc5 10 Qc2 dxc4 11 Bxc4 Nxe5 12 Bb5+ c6 13 Qxc5 Qa5+', { a: '=', r: 'Kotov–Szabo, Budapeste 1950', c: '7.e3 e5 8.dxe5 Ne4 9.Qd3 Nc5 10.Qc2 dxc4 11.Bxc4 Nxe5 12.Bb5+ c6 13.Qxc5 Qa5+ é igual.' }],
  ['c09', 'i-B', 'i', '(i) B', '7 Bg5 h6 8 Bxf6 Qxf6 9 e3 dxc4 10 Bxc4 O-O 11 Nf3', { a: '⩲', r: 'I. Sokolov', c: '7.Bg5!? h6 8.Bxf6 Qxf6 9.e3 dxc4 10.Bxc4 O-O 11.Nf3 é uma boa alternativa para as brancas.' }],
  ['c09', 'j', 'j', '(j)', '8 Qc2 e5', { c: '8.Qc2 e5 transpõe para a nota (a) da coluna 7.' }],
  ['c09', 'k', 'k', '(k)', '13 Nxd2 O-O 14 Be2 b5 15 Qb4 Nc4 16 b3 a5 17 Qc5 Nxd2 18 Kxd2', { a: '⩲', c: '13.Nxd2 O-O 14.Be2 b5 15.Qb4 Nc4 16.b3 a5 17.Qc5 Nxd2 18.Kxd2 é um pouco melhor para as brancas: o rei está seguro e a ala da dama das pretas é fraca.' }],
  // Coluna 10
  ['c10', 'l', 'l', '(l)', '5 e3 O-O 6 Nf3 c5 7 a3 Bxc3+ 8 bxc3 Nc6', { a: '=', c: '5.e3 O-O 6.Nf3 c5 7.a3 Bxc3+ 8.bxc3 Nc6 é igual.' }],
  ['c10', 'm', 'm', '(m)', '6 e3 c5 7 a3 Bxc3+ 8 bxc3 Nc6 9 Nf3 O-O 10 c4 Qd6 11 Bb2 cxd4 12 exd4 b6', { a: '=', r: 'Alekhine–Euwe, Campeonato Mundial 1937', c: '6.e3 c5 7.a3 Bxc3+ 8.bxc3 Nc6 9.Nf3 O-O 10.c4 Qd6 11.Bb2 cxd4 12.exd4 b6 é igual.' }],
  ['c10', 'n-A', 'n', '(n) A', '7 Qxf5 exf5 8 a3 Be7 9 Bf4 c6 10 e3 Nbd7 11 Bc4 Nb6', { a: '=', r: 'Topalov–Anand, Melody Amber 2005', c: '7.Qxf5 exf5 8.a3 Be7 9.Bf4 c6 10.e3 Nbd7 11.Bc4 Nb6 dá às pretas uma posição sólida.' }],
  ['c10', 'n-B', 'n', '(n) B', '7 Qb3 Nc6 8 g3 O-O 9 Bg2 e5 10 d5 Bxc3+ 11 bxc3 Na5 12 Qa4 b6', { a: '=', r: 'Dreev–Bareev, Campeonato Russo 1998', c: '7.Qb3 Nc6 8.g3 O-O 9.Bg2 e5 10.d5 Bxc3+ 11.bxc3 Na5 12.Qa4 b6 é igual.' }],
  ['c10', 'o', 'o', '(o)', '11... Nxc3 12 Bxc3 Qa5 13 O-O O-O 14 Qc2', { a: '⩲', r: 'I. Sokolov–Korchnoi, Dresden 1998', c: '11...Nxc3 12.Bxc3 Qa5 13.O-O O-O 14.Qc2 é um pouco melhor para as brancas.' }],
  ['c10', 'p', 'p', '(p)', '13 Rxd1 exf5 14 d5 Na5 15 a3 Bd6 16 Nb5 Nc4 17 b3 a6', { a: '∞', c: '13.Rxd1 exf5 14.d5 Na5 15.a3 Bd6 16.Nb5 Nc4 17.b3 a6 dá chances para os dois lados numa posição complicada.' }],
  // Coluna 11
  ['c11', 'q-A', 'q', '(q) A', '9... e5 10 Bxd4', { a: '±', c: '9...e5 10.Bxd4! é melhor para as brancas.' }],
  ['c11', 'q-B', 'q', '(q) B', '9... Qxa2 10 Rxd4 Nc6 11 Ra4', { a: '±', c: '9...Qxa2 10.Rxd4 Nc6 11.Ra4 é melhor para as brancas.' }],
  ['c11', 'r', 'r', '(r)', '13 e4 e5 14 Rc4 Qe6 15 Rc5', { a: '⩲', r: 'Capablanca–Najdorf, Margate 1939', c: '13.e4 e5 14.Rc4 Qe6 15.Rc5 é um pouco melhor para as brancas.' }],
  // Coluna 12
  ['c12', 's', 's', '(s)', '6... Be6 7 e3 Nbd7 8 f4 h6 9 Bxf6 Qxf6 10 Bd3 Nb6 11 Nf3 O-O 12 O-O Rac8 13 Na4', { a: '⩲', r: 'Ragozin–Botvinnik, match 1940', c: '6...Be6 7.e3 Nbd7 8.f4 h6 9.Bxf6 Qxf6 10.Bd3 Nb6 11.Nf3 O-O 12.O-O Rac8 13.Na4 é um pouco melhor para as brancas, que têm jogo na ala da dama e no centro.' }],
  ['c12', 't', 't', '(t)', '7 Bh4 c5 8 dxc5 Nc6 9 e3 g5 10 Bg3 Ne4 11 Nf3 Qa5 12 Nd2 Nxc3 13 bxc3 Bxc3 14 Rb1 Qxc5 15 Rb5 Qa3 16 Rb3 Bxd2+', { a: '=', r: 'Spassky–Fischer, match 1992', c: '7.Bh4 c5 8.dxc5 Nc6 9.e3 g5 10.Bg3 Ne4 11.Nf3 Qa5 12.Nd2 Nxc3 13.bxc3 Bxc3 14.Rb1 Qxc5! 15.Rb5 Qa3 16.Rb3 Bxd2+ é igual.' }],
  ['c12', 'u', 'u', '(u)', '13 b4 a5 14 Be2 axb4 15 axb4 Rxa1+ 16 Qxa1', { a: '⩲', r: 'Seirawan–Shaked, Merrillville 1997', c: '13.b4 a5 14.Be2 axb4 15.axb4 Rxa1+ 16.Qxa1 é um pouco melhor para as brancas.' }],
]

const capitulo = {
  id: 'nimzo-b',
  arquivo: 'nimzo-b',
  nome: 'Nimzo-Índia — Clássica 4...d5',
  fonte: 'Modern Chess Openings — Nimzo-Indian Defense (pp. 543–544), colunas 7–12',
  base: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4',
  corPadrao: 'b',
  ordem: 543,
  grupos: [
    { id: 'a3', nome: '5.a3 Bxc3+ 6.Qxc3', colunas: [7, 8, 9] },
    { id: 'cxd5-qxd5', nome: '5.cxd5 Qxd5', colunas: [10, 11] },
    { id: 'cxd5-exd5', nome: '5.cxd5 exd5', colunas: [12] },
  ],
}

module.exports = { capitulo, colunas, notas }
