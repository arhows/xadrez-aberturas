// Transcrição do MCO 15ª ed. — Eslava: 4.e3 Bf5, 3.Nc3 e6 (Marshall e Noteboom) e a Variante das Trocas (pp. 486–487), colunas 67–72.
// Gerar: node scripts/mco/gerar.cjs eslava-l
// Formato: ver gambito-do-rei.cjs. Dicas em eslava-l-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Correções: na nota (m) A a linha do livro tem 13 Qxb6, impossível, e deixa o bispo de b4 solto já depois de 9...Nd7; ficou só 8.Qb3 Bb4.
// Na nota (o) o livro segue com 10 Nh4 Be7 11 Rfc1, impossível (as brancas ainda não rocaram); ficou só 9...Qb6.

const B = '1 d4 d5 2 c4 c6'
const T = `${B} 3 cxd5 cxd5 4 Nc3 Nf6 5 Bf4 Nc6`
const F = `${T} 6 e3 Bf5 7 Nf3 e6`

const colunas = {
  c67: [`${B} 3 Nf3 Nf6 4 e3 Bf5 5 Nc3 e6 6 Nh4 Be4 7 Qb3 Qb6 8 Qxb6 axb6 9 Bd2 h6 10 cxd5 exd5`, 'e3', '3.Nf3 Nf6 4.e3 Bf5', '=',
    'Com 4.e3 Bf5 as pretas desenvolvem o bispo antes de fechá-lo com ...e6. Depois de 5.Nc3 e6 6.Nh4 Be4 7.Qb3 Qb6 8.Qxb6 axb6 9.Bd2 h6 10.cxd5 exd5 o final é igual (P. Nikolić–Beliavsky, Sarajevo 1982).'],
  c68: [`${B} 3 Nc3 e6 4 e4 dxe4 5 Nxe4 Bb4+ 6 Bd2 Qxd4 7 Bxb4 Qxe4+ 8 Be2 Na6 9 Bc3 Ne7 10 Bxg7 Rg8`, 'nc3', '3.Nc3 e6 4.e4 (Gambito Marshall)', '=',
    'Com 3.Nc3 e6 4.e4 dxe4 5.Nxe4 Bb4+ 6.Bd2 Qxd4 7.Bxb4 Qxe4+ as brancas entregam o peão (o Gambito Marshall) por casas escuras fracas no campo preto. Depois de 8.Be2 Na6 9.Bc3 Ne7 10.Bxg7 Rg8 o jogo é igual (Sherbakov–Novikov, São Petersburgo 1995).'],
  c69: [`${B} 3 Nc3 e6 4 Nf3 dxc4 5 a4 Bb4 6 e3 b5 7 Bd2 a5 8 axb5 Bxc3 9 Bxc3 cxb5 10 b3 Bb7`, 'nc3', '4.Nf3 dxc4 (Noteboom)', '⩲',
    'Com 4.Nf3 dxc4 5.a4 Bb4 6.e3 b5 (a Variante Abrahams-Noteboom) as pretas ficam com dois peões passados na ala da dama. Depois de 7.Bd2 a5 8.axb5 Bxc3 9.Bxc3 cxb5 10.b3 Bb7 as brancas ficam um pouco melhor (Svetushkin–Tzermiadianos, 2006).'],
  c70: [`${F} 8 Bb5 Nd7 9 Qa4 Rc8 10 O-O a6`, 'troca', '3.cxd5 (Trocas) 8.Bb5', '=',
    'Com 3.cxd5 cxd5 (a Variante das Trocas) a estrutura fica simétrica e as brancas têm só a vantagem do lance. Depois de 4.Nc3 Nf6 5.Bf4 Nc6 6.e3 Bf5 7.Nf3 e6 8.Bb5 Nd7 9.Qa4 Rc8 10.O-O a6 o jogo é igual (Kramnik–Rublevsky, URSS 1990).'],
  c71: [`${F} 8 Ne5 Nxe5 9 Bxe5 Nd7 10 Qb3 Nxe5`, 'troca', '8.Ne5', '=',
    'Com 8.Ne5 Nxe5 9.Bxe5 Nd7 10.Qb3 Nxe5 as pretas trocam os cavalos e o bispo de e5; o jogo é igual (Lautier–Bareev, Biel 1993).'],
  c72: [`${T} 6 e3 e6 7 Nf3 Be7 8 Bd3 O-O 9 h3 Bd7 10 O-O Qb6`, 'troca', '6...e6', '=',
    'Com 6...e6 as pretas fecham o bispo de c8 dentro da cadeia de peões. Depois de 7.Nf3 Be7 8.Bd3 O-O 9.h3 Bd7 10.O-O Qb6 as chances são mais ou menos iguais (Konikowski–Schmidt, Alemanha 1994).'],
}

const notas = [
  // Coluna 67
  ['c67', 'a', 'a', '(a)', '5 cxd5 cxd5 6 Nc3 Nc6 7 Ne5 Bd7 8 Bd3 e6 9 O-O Bd6 10 f4 Ne7 11 Bd2 Bc6 12 Be1 Nf5 13 Qf3 Be7 14 Qh3 Nd6', { a: '∓', r: 'Milov–M. Gurevich, Córsega 2006', c: '5.cxd5 cxd5 6.Nc3 Nc6! 7.Ne5 Bd7 8.Bd3 e6 9.O-O Bd6 10.f4 Ne7 11.Bd2 Bc6 12.Be1 Nf5 13.Qf3 Be7 14.Qh3 Nd6 é melhor para as pretas.' }],
  ['c67-a', '1', 'a', '(a) 6...e6', '6... e6 7 Qb3 Qb6 8 Bb5+ Nc6 9 Na4 Qc7 10 Bd2', { a: '±', c: '6...e6 7.Qb3 Qb6 8.Bb5+ Nc6 9.Na4 Qc7 10.Bd2 é melhor para as brancas.' }],
  ['c67', 'b', 'b', '(b)', '6 Bd3 Bxd3 7 Qxd3 Nbd7 8 O-O Be7 9 e4 dxe4 10 Nxe4 Nxe4 11 Qxe4 O-O 12 Bf4 Qa5', { a: '=', r: 'Sakaev–Rublevsky, Duisburg 1992', c: '6.Bd3 Bxd3 7.Qxd3 Nbd7 8.O-O Be7 9.e4 dxe4 10.Nxe4 Nxe4 11.Qxe4 O-O 12.Bf4 Qa5 é igual.' }],
  ['c67', 'c-A', 'c', '(c) A', '6... Bg4 7 Qb3 Qc7 8 h3 Bh5 9 g4 Bg6 10 g5 dxc4 11 Qxc4 Nd5 12 Nxg6 hxg6 13 Bg2', { a: '±', r: 'Dreev–M. Gurevich, Cap d\'Agde 2000', c: '6...Bg4 7.Qb3 Qc7 8.h3 Bh5 9.g4 Bg6 10.g5 dxc4 11.Qxc4 Nd5 12.Nxg6 hxg6 13.Bg2 é melhor para as brancas.' }],
  ['c67', 'c-B', 'c', '(c) B', '6... Bg6 7 Nxg6 hxg6 8 Rb1 Nbd7 9 c5 a5 10 a3 e5 11 b4 axb4 12 axb4 Qc7 13 f4 exf4 14 exf4 Be7 15 Be2 Nf8 16 O-O Ne6 17 g3 Qd7', { a: '=', r: 'Topalov–Kramnik, Campeonato Mundial 2006', c: '6...Bg6 7.Nxg6 hxg6 8.Rb1!? Nbd7 9.c5 a5 10.a3 e5 11.b4 axb4 12.axb4 Qc7 13.f4 exf4 14.exf4 Be7 15.Be2 Nf8 16.O-O Ne6 17.g3 Qd7 é igual.' }],
  ['c67', 'd', 'd', '(d)', '11 f3 Bh7 12 g4 b5 13 Nf5 h5 14 h3 g6 15 Ng3 h4', { a: '=', r: 'P. Nikolić–Beliavsky, Sarajevo 1982', c: '11.f3 Bh7 12.g4 b5 13.Nf5 h5 14.h3 g6 15.Ng3 h4 é igual.' }],
  // Coluna 68
  ['c68', 'e', 'e', '(e)', '4 Bf4 dxc4 5 e3 b5 6 a4 Qb6 7 Qf3 bxa4 8 Ra2 Qb3 9 Bxb8 Rxb8 10 Qxc6+ Bd7 11 Qxc4 a3', { a: '∓', r: 'Epishin–Boiman, Krasnodar 1982', c: '4.Bf4 dxc4 5.e3 b5 6.a4 Qb6! 7.Qf3? bxa4! 8.Ra2 Qb3 9.Bxb8 Rxb8 10.Qxc6+ Bd7 11.Qxc4 a3 é melhor para as pretas: a falta do bispo branco na ala da dama pesa.' }],
  ['c68', 'f', 'f', '(f)', '6 Nc3 c5 7 a3 Ba5 8 Be3 Nf6 9 Nf3 Nc6 10 dxc5 Qxd1+ 11 Rxd1 Ne4 12 Rc1 Nxc3 13 bxc3 e5 14 Nd2 Bf5', { a: '=', r: 'Lerner–Lukacs, Polanica Zdrój 1986', c: '6.Nc3 c5 7.a3 Ba5 8.Be3 Nf6 9.Nf3 Nc6 10.dxc5 Qxd1+ 11.Rxd1 Ne4 12.Rc1 Nxc3 13.bxc3 e5 14.Nd2 Bf5 é igual.' }],
  ['c68', 'g', 'g', '(g)', '8 Ne2 Na6 9 Bf8 Ne7 10 Bxg7 Nb4 11 Qd6 Nc2+ 12 Kd2 Nxa1 13 Nd4', { a: '±', r: 'Sarkar–Fernández, ICC Open 2005', c: 'Uma boa alternativa é 8.Ne2 Na6 9.Bf8 Ne7 10.Bxg7 Nb4 11.Qd6 Nc2+ 12.Kd2 Nxa1 13.Nd4, com ataque forte das brancas.' }],
  ['c68-g', '1', 'g', '(g) 9...Qe5', '9... Qe5 10 Qd2 Qf6 11 Bd6 Ne7 12 Ng3 O-O 13 Ne4', { a: '±', r: 'Krush–Novikov, 2001', c: '9...Qe5 10.Qd2 Qf6 11.Bd6 Ne7 12.Ng3 O-O 13.Ne4 favorece as brancas.' }],
  ['c68-g', '2', 'g', '(g) 10...Rg8', '10... Rg8', { c: '10...Rg8 é mais seguro.' }],
  ['c68', 'h', 'h', '(h)', '8... c5 9 Bxc5 Qxg2 10 Bf3 Qg5 11 Bd6 Ne7 12 Ne2 Nbc6 13 Rg1 Qa5+ 14 Nc3 Nf5', { a: '=', r: 'Hjartarson–Werf, Reykjavík 1996', c: '8...Na6 é o mais lógico, cuidando do desenvolvimento; tomar em g2 de imediato é arriscado. Às vezes se tenta 8...c5 9.Bxc5 Qxg2 10.Bf3 Qg5 11.Bd6 Ne7 12.Ne2 Nbc6 13.Rg1 Qa5+ 14.Nc3 Nf5, igual.' }],
  ['c68', 'i', 'i', '(i)', '9 Bd6 b6 10 Nf3 Bb7 11 O-O c5 12 Nh4 Qxh4 13 Qa4+ Kd8 14 Rad1 Kc8 15 Qe8+ Qd8 16 Qxd8+ Kxd8 17 Bf8+', { a: '+−', r: 'Onischuk–Shulman, HB Global 2005', c: '9.Bd6 b6 10.Nf3 Bb7 11.O-O c5? 12.Nh4! Qxh4 13.Qa4+ Kd8 14.Rad1 Kc8 15.Qe8+ Qd8 16.Qxd8+ Kxd8 17.Bf8+ ganha.' }],
  ['c68-i', '1', 'i', '(i) 9...Qxg2', '9... Qxg2 10 Bf3 Qg6 11 Ne2 Nf6 12 b4 e5', { a: '∞', r: 'Cmilyte–Kempinski, 2006', c: 'As pretas podem tentar 9...Qxg2 (ou 9...e5) 10.Bf3 Qg6 11.Ne2 Nf6 12.b4 e5, com chances pouco claras.' }],
  ['c68', 'j', 'j', '(j)', '11 Bf6 Qf4 12 Bxe7 Kxe7 13 g3 Qe5 14 Qb1 b6 15 Nf3 Qf6 16 O-O Bb7', { a: '=', r: 'Sherbakov–Novikov, São Petersburgo 1995', c: '11.Bf6 Qf4 12.Bxe7 Kxe7 13.g3 Qe5 14.Qb1 b6 15.Nf3 Qf6 16.O-O Bb7 é igual.' }],
  ['c68-j', '1', 'j', '(j) 12.Bc3', '12 Bc3 Rxg2 13 Nf3 Nf5', { a: '∓', c: '12.Bc3 Rxg2 13.Nf3 Nf5! é melhor para as pretas. (O Stockfish discorda: cerca de +1,5, melhor para as brancas.)' }],
  // Coluna 69
  ['c69', 'k-A', 'k', '(k) A', '5 Bg5 Nf6', { c: 'Contra 5.Bg5 as pretas escolhem entre 5...f6, 5...Qa5 e 5...Nf6, que transpõe para o Gambito Anti-Meran (colunas 43–48).' }],
  ['c69', 'k-B', 'k', '(k) B', '5 e3 b5 6 a4 b4 7 Ne4 Ba6 8 Qc2 Qd5 9 Ned2 c3', { a: '=', c: '5.e3 b5 6.a4 b4 7.Ne4 Ba6 8.Qc2 Qd5 9.Ned2 c3 é igual.' }],
  ['c69', 'l', 'l', '(l)', '11 bxc4 b4 12 Bb2 Nf6 13 Bd3 Nbd7 14 O-O O-O 15 Re1 Re8 16 c5 Bc6 17 Bc2 Ne4 18 Ba4 Qc7 19 Qc2 Rec8 20 Rec1 Qb7 21 Ne1 Nef6 22 f3 Nd5 23 e4', { a: '±', r: 'Svetushkin–Tzermiadianos, Litochoro 2006', c: '11.bxc4 b4 12.Bb2 Nf6 13.Bd3 Nbd7 14.O-O O-O 15.Re1 Re8 16.c5 Bc6 17.Bc2 Ne4 18.Ba4 Qc7 19.Qc2 Rec8 20.Rec1 Qb7 21.Ne1 Nef6 22.f3 Nd5 23.e4 é melhor para as brancas.' }],
  ['c69-l', '1', 'l', '(l) 11.d5', '11 d5 Nf6', { a: '=', c: '11.d5 Nf6 deixa as pretas bem.' }],
  // Coluna 70
  ['c70', 'm-A', 'm', '(m) A', '8 Qb3 Bb4', { a: '=', r: 'Akobian–Finegold, Chicago 2005', c: '8.Qb3 Bb4 leva a um final igual (Akobian–Finegold, Chicago 2005). (A continuação do livro, 9 Bb5 Nd7 10 O-O a6 11 Bxc6 bxc6 12 Rfc1 f6 13 Qxb6…, tem um lance impossível e deixa o bispo de b4 solto já depois de 9...Nd7; ficou só 8...Bb4.)' }],
  ['c70', 'm-B', 'm', '(m) B', '8 Bd3 Bxd3 9 Qxd3 Bd6 10 Bxd6 Qxd6', { a: '=', c: '8.Bd3 Bxd3 9.Qxd3 Bd6 10.Bxd6 Qxd6 é um caminho comum para um empate rápido.' }],
  ['c70', 'n', 'n', '(n)', '9 O-O Be7 10 Bxc6 bxc6 11 Rc1 Rc8 12 Na4 g5 13 Bg3 h5 14 h3 g4', { a: '∓', r: 'Seirawan–Beliavsky, Bruxelas 1988', c: '9.O-O Be7 10.Bxc6 bxc6 11.Rc1 Rc8 é igual, mas 12.Na4? g5! 13.Bg3 h5 14.h3 g4 é melhor para as pretas.' }],
  ['c70', 'o', 'o', '(o)', '9... Qb6', { a: '=', r: 'Lechtynsky–Haba, Liga Tcheca 2005', c: '9...Qb6 é uma alternativa sólida, que levou a um final igual. (A continuação do livro, 10 Nh4 Be7 11 Rfc1…, é impossível antes do roque branco e deixaria o bispo de f5 solto; ficou só o lance 9...Qb6.)' }],
  ['c70', 'p', 'p', '(p)', '11 Bxc6 Rxc6 12 Rfc1 Be7 13 Nd1 b5 14 Qb3 Rc4 15 Nd2 Rxc1 16 Rxc1 O-O 17 Qc3 b4 18 Qc6 Bd3', { a: '=', r: 'Kramnik–Rublevsky, URSS 1990', c: '11.Bxc6 Rxc6 12.Rfc1 Be7 13.Nd1 b5 14.Qb3 Rc4 15.Nd2 Rxc1 16.Rxc1 O-O 17.Qc3 b4 18.Qc6 Bd3 é igual.' }],
  // Coluna 71
  ['c71', 'q', 'q', '(q)', '10 Bg3 a6 11 Bd3 Bxd3 12 Qxd3 Be7 13 O-O O-O 14 Rfc1 Rc8 15 Ne2 Qa5', { a: '=', r: 'U. Andersson–Smeets, Amsterdã 2006', c: '10.Bg3 a6 11.Bd3 Bxd3 12.Qxd3 Be7 13.O-O O-O 14.Rfc1 Rc8 15.Ne2 Qa5 é igual.' }],
  ['c71-q', '1', 'q', '(q) 10.Bb5', '10 Bb5 a6', { a: '=', c: '10.Bb5 a6 também é igual.' }],
  ['c71', 'r', 'r', '(r)', '11 dxe5 Be7 12 Bb5+ Kf8 13 O-O g5 14 Rac1 Kg7 15 Be2 Qb6 16 Nb5 Rhc8 17 Rc3 Bg6 18 Rfc1 Rc6', { a: '=', r: 'Lautier–Bareev, Biel 1993', c: '11.dxe5 Be7 12.Bb5+ Kf8 13.O-O g5 14.Rac1 Kg7 15.Be2 Qb6 16.Nb5 Rhc8 17.Rc3 Bg6 18.Rfc1 Rc6 é igual.' }],
  ['c71-r', '1', 'r', '(r) 12.Qxb7', '12 Qxb7 O-O', { a: '∓', c: '12.Qxb7?! O-O é melhor para as pretas.' }],
  // Coluna 72
  ['c72', 's', 's', '(s)', '6... a6 7 Bd3 Bg4 8 Nge2', { a: '±', c: '6...a6 7.Bd3 Bg4 8.Nge2 é melhor para as brancas.' }],
  ['c72', 't', 't', '(t)', '7... Nh5 8 Bg5 Qb6 9 Bb5 h6 10 Bh4 Bd7 11 O-O Rc8 12 Nd2 Nf6 13 Bxf6 gxf6 14 e4', { a: '±', r: 'Illescas–Magem Badals, Espanha 1995', c: '7...Nh5 8.Bg5 Qb6 9.Bb5 h6 10.Bh4 Bd7 11.O-O Rc8 12.Nd2 Nf6 13.Bxf6 gxf6 14.e4! é melhor para as brancas.' }],
  ['c72', 'u', 'u', '(u)', '11 Qe2 Rfc8 12 Ne5 Be8 13 g4 Qd8', { a: '=', r: 'Konikowski–Schmidt, Alemanha 1994', c: '11.Qe2 Rfc8 12.Ne5 Be8 13.g4 Qd8 dá chances mais ou menos iguais.' }],
]

const capitulo = {
  id: 'eslava-l',
  arquivo: 'eslava-l',
  nome: 'Eslava — 4.e3 Bf5, Gambito Marshall, Noteboom e Variante das Trocas',
  fonte: 'Modern Chess Openings — Slav and Semi-Slav Defense (pp. 486–487), colunas 67–72',
  base: '1. d4 d5 2. c4 c6',
  corPadrao: 'b',
  ordem: 486,
  grupos: [
    { id: 'e3', nome: '3.Nf3 Nf6 4.e3 Bf5', colunas: [67] },
    { id: 'nc3', nome: '3.Nc3 e6', colunas: [68, 69] },
    { id: 'troca', nome: '3.cxd5 (Variante das Trocas)', colunas: [70, 71, 72] },
  ],
}

module.exports = { capitulo, colunas, notas }
