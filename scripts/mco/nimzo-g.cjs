// Transcrição do MCO 15ª ed. — Defesa Nimzo-Índia, Rubinstein com o Sistema Fischer 4...b6 (pp. 553–554), colunas 37–42.
// Gerar: node scripts/mco/gerar.cjs nimzo-g
// Formato: ver gambito-do-rei.cjs. Dicas em nimzo-g-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua.
// Nota (m): "mais do que compensação suficiente pelo peão" ficou ⩲. Nota (o): "pelo menos a igualdade para as pretas" ficou =.
// Notas só com comentário: (q) B, (t) 12...Rc8 (com ⩲ pela "vantagem de espaço").

const F = '1 d4 Nf6 2 c4 e6 3 Nc3 Bb4 4 e3 b6'

const colunas = {
  c37: [`${F} 5 Ne2 Ne4 6 Bd2 Nxd2 7 Qxd2 Ba6 8 a3 Bxc3 9 Nxc3 d5 10 b3 Nc6 11 Be2 dxc4 12 Rb1 O-O`, 'ne2', '5.Ne2 Ne4 6.Bd2', '⩲',
    'No Sistema Fischer, 4...b6, as pretas seguram os peões centrais e controlam as casas com as peças. Contra 5.Ne2 as pretas não podem jogar 5...d5 (6.Qa4+!). Depois de 5...Ne4 6.Bd2 Nxd2 7.Qxd2 Ba6 8.a3 Bxc3 9.Nxc3 d5 10.b3 Nc6 11.Be2 dxc4 12.Rb1 O-O as brancas ficam com o par de bispos e uma pequena vantagem.'],
  c38: [`${F} 5 Ne2 Ne4 6 Qc2 Bb7 7 Nf4 O-O 8 Bd3 f5 9 O-O Nxc3 10 bxc3 Bd6 11 Rb1 Bxf4 12 exf4 Rf6`, 'ne2', '6.Qc2', '⩲',
    'Com 6.Qc2 Bb7 7.Nf4 O-O 8.Bd3 f5 as pretas firmam e4. Depois de 9.O-O Nxc3 10.bxc3 Bd6 11.Rb1 Bxf4 12.exf4 Rf6 as pretas não têm um ataque real na ala do rei, e as brancas têm jogo na ala da dama e no centro.'],
  c39: [`${F} 5 Ne2 Ba6 6 Ng3 Bxc3+ 7 bxc3 d5 8 Ba3 Bxc4 9 Bxc4 dxc4 10 O-O h5 11 Qf3 Qd5 12 e4 Qg5`, 'ne2', '5...Ba6', '=',
    'Com 5...Ba6 o bispo ataca c4. Depois de 6.Ng3 Bxc3+ 7.bxc3 d5 8.Ba3 Bxc4 9.Bxc4 dxc4 10.O-O h5! 11.Qf3 Qd5 12.e4 Qg5 as pretas têm um peão a mais e o rei no centro; com 13.h3 Nc6 o jogo é igual.'],
  c40: [`${F} 5 Ne2 Bb7 6 a3 Be7 7 d5 O-O 8 Ng3 d6 9 Be2 c6 10 e4 cxd5 11 exd5 exd5 12 cxd5 Re8`, 'ne2', '5...Bb7', '⩲',
    'Com 5...Bb7 6.a3 Be7 7.d5 as brancas ganham espaço no centro. Depois de 7...O-O 8.Ng3 d6 9.Be2 c6 10.e4 cxd5 11.exd5 exd5 12.cxd5 Re8 as brancas simplesmente têm mais espaço e ficam um pouco melhor.'],
  c41: [`${F} 5 Bd3 Bb7 6 Nf3 O-O 7 O-O c5 8 Na4 cxd4 9 exd4 Be7 10 Re1 d6 11 b4 Nbd7 12 Bb2 a5`, 'bd3', '5.Bd3 Bb7 6.Nf3 O-O', '=',
    'Com 5.Bd3 Bb7 6.Nf3 O-O 7.O-O c5 8.Na4 as brancas evitam a troca em c3. Depois de 8...cxd4 9.exd4 Be7 10.Re1 d6 11.b4 Nbd7 12.Bb2 a5 as pretas jogam com precisão e igualam.'],
  c42: [`${F} 5 Bd3 Bb7 6 Nf3 Ne4 7 O-O f5 8 d5 Bxc3 9 bxc3 Nc5 10 Nd4 O-O 11 Ba3 Nba6 12 Rb1 e5`, 'bd3', '6...Ne4', '⩲',
    'Com 6...Ne4 7.O-O! f5 as pretas montam a formação holandesa. Depois de 8.d5!? Bxc3 9.bxc3 Nc5 10.Nd4 O-O 11.Ba3 Nba6 12.Rb1 e5, com 13.Bc2! as brancas ficam um pouco melhor.'],
}

const notas = [
  // Coluna 37
  ['c37', 'a-A', 'a', '(a) A', '7... d5 8 cxd5 exd5 9 a3 Be7 10 g3 c6 11 Bg2', { a: '⩲', r: 'M. Gurevich–Enders, Aberto de Eger 1987', c: 'As pretas não ficam totalmente satisfeitas com as alternativas: 7...d5 8.cxd5 exd5 9.a3 Be7 10.g3 c6 11.Bg2 é um pouco melhor para as brancas.' }],
  ['c37', 'a-B', 'a', '(a) B', '7... O-O 8 a3 Be7 9 g3 Ba6 10 b3 c6 11 Bg2 d5 12 cxd5 cxd5 13 e4', { a: '⩲', r: 'Petursson–Wedberg, Estocolmo 1992', c: '7...O-O 8.a3 Be7 9.g3 Ba6 10.b3 c6 11.Bg2 d5 12.cxd5 cxd5 13.e4 é um pouco melhor para as brancas.' }],
  ['c37', 'a-C', 'a', '(a) C', '7... Bb7 8 d5 Na6 9 a3 Bxc3 10 Nxc3 Nc5 11 Rd1', { a: '⩲', r: 'Shirov–Adams, León 1995', c: '7...Bb7 8.d5 Na6 9.a3 Bxc3 10.Nxc3 Nc5 11.Rd1 é um pouco melhor para as brancas.' }],
  ['c37', 'a-D', 'a', '(a) D', '7... f5 8 a3 Be7 9 d5', { a: '⩲', c: '7...f5 8.a3 Be7 9.d5 é um pouco melhor para as brancas.' }],
  ['c37', 'b', 'b', '(b)', '8... Be7 9 Nf4 Bg5 10 Nh5 g6 11 Ng3 d5 12 cxd5 Bxf1 13 Nxf1', { a: '⩲', r: 'D. Gurevich–Christiansen, Campeonato dos EUA 1984', c: '8...Be7 9.Nf4 Bg5 10.Nh5 g6 11.Ng3 d5 12.cxd5 Bxf1 13.Nxf1 é um pouco melhor para as brancas.' }],
  ['c37', 'c', 'c', '(c)', '10 b4 dxc4 11 b5 Bb7 12 e4 a6 13 Bxc4 O-O 14 O-O axb5 15 Bxb5 c6 16 Be2 Ba6', { a: '=', c: '10.b4 dxc4 11.b5 Bb7 12.e4 a6 13.Bxc4 O-O 14.O-O axb5 15.Bxb5 c6 16.Be2 Ba6 é igual.' }],
  ['c37', 'd', 'd', '(d)', '13 O-O Ne7 14 Rfd1 Qd7 15 bxc4 Rfd8', { a: '⩲', r: 'Epishin–de Firmian, Copa Politiken 2002', c: '13.O-O Ne7 14.Rfd1 Qd7 15.bxc4 Rfd8 dá às brancas uma pequena vantagem.' }],
  // Coluna 38
  ['c38', 'e', 'e', '(e)', '6... f5 7 a3 Bxc3+ 8 Nxc3 Bb7 9 d5 Nxc3 10 Qxc3 Qe7 11 Be2 O-O 12 O-O', { a: '⩲', c: '6...f5 7.a3 Bxc3+ 8.Nxc3 Bb7 9.d5 Nxc3 10.Qxc3 Qe7 11.Be2 O-O 12.O-O é um pouco melhor para as brancas.' }],
  ['c38', 'f', 'f', '(f)', '7 a3 Bxc3+ 8 Nxc3 Nxc3 9 Qxc3 O-O 10 b4 d6 11 Bb2 f5 12 d5 e5 13 Bd3 Nd7', { a: '=', r: 'Ornstein–Hellers, Suécia 1992', c: 'As pretas têm chances iguais depois do simples 7.a3 Bxc3+ 8.Nxc3 Nxc3 9.Qxc3 O-O 10.b4 d6 11.Bb2 f5! 12.d5 e5 13.Bd3 Nd7.' }],
  ['c38', 'g', 'g', '(g)', '9... Bxc3 10 bxc3 c5 11 f3 Nd6 12 e4 Nc6 13 e5 Nf7 14 Qf2', { a: '⩲', r: 'Nakamura–Ward, Gibraltar 2005', c: '9...Bxc3 10.bxc3 c5 11.f3 Nd6 12.e4 Nc6 13.e5 Nf7 14.Qf2 é um pouco melhor para as brancas.' }],
  ['c38', 'h', 'h', '(h)', '11... c5 12 e4 fxe4 13 Bxe4 Bxe4 14 Qxe4 Nc6', { a: '∞', c: 'As pretas podem tentar 11...c5 12.e4 fxe4 13.Bxe4 Bxe4 14.Qxe4 Nc6, com posição pouco clara.' }],
  ['c38', 'i', 'i', '(i)', '13 Be3 Rh6 14 f3 Nc6 15 c5 Qh4 16 g3', { a: '⩲', r: 'I. Sokolov–Korchnoi, Nova York 1996', c: '13.Be3 Rh6 14.f3 Nc6 15.c5 Qh4 16.g3 é um pouco melhor para as brancas: as pretas não têm ataque real na ala do rei, e as brancas têm jogo na ala da dama e no centro.' }],
  // Coluna 39
  ['c39', 'j', 'j', '(j)', '6 a3 Bxc3+ 7 Nxc3 d5 8 b3 O-O 9 Be2 Nc6 10 a4 dxc4 11 Ba3 Re8 12 b4 Ne7 13 b5 Bb7 14 O-O', { a: '⩲', r: 'Fischer', c: '6.a3 Bxc3+ 7.Nxc3 d5 8.b3 O-O 9.Be2 Nc6 10.a4 dxc4 11.Ba3 Re8 12.b4 Ne7 13.b5 Bb7 14.O-O dá às brancas uma pequena vantagem.' }],
  ['c39', 'k', 'k', '(k)', '6... O-O 7 e4 d5 8 cxd5 Bxf1 9 Kxf1 Bxc3 10 bxc3 exd5 11 e5 Ne4 12 f3', { a: '±', r: 'Gligorić–Hecht, Berlim 1971', c: '6...O-O 7.e4 d5 8.cxd5 Bxf1 9.Kxf1 Bxc3 10.bxc3 exd5 11.e5 Ne4 12.f3 é melhor para as brancas.' }],
  ['c39', 'l', 'l', '(l)', '13 h3 Nc6 14 Qe2 Qb5', { a: '=', r: 'Stocek–Istratescu, Aberto de Rohde 2003', c: '13.h3 Nc6 14.Qe2 Qb5 é igual.' }],
  // Coluna 40
  ['c40', 'm', 'm', '(m)', '6... Bxc3+ 7 Nxc3 O-O 8 Bd3 Bxg2 9 Rg1 Bb7 10 e4', { a: '⩲', c: '6...Bxc3+ 7.Nxc3 O-O 8.Bd3! Bxg2 9.Rg1 Bb7 10.e4 dá às brancas mais do que compensação suficiente pelo peão.' }],
  ['c40-m', '1', 'm', '(m) 7...d5', '7... d5 8 cxd5 exd5 9 b4', { a: '⩲', c: '7...d5 8.cxd5 exd5 9.b4 é um pouco melhor para as brancas.' }],
  ['c40', 'n', 'n', '(n)', '13 O-O Nbd7 14 Nf5 Bf8 15 Bf4', { a: '⩲', r: 'M. Gurevich–Khalifman, Campeonato da URSS 1987', c: '13.O-O Nbd7 14.Nf5 Bf8 15.Bf4 é um pouco melhor para as brancas. Depois de 7.d5 as brancas simplesmente têm mais espaço.' }],
  // Coluna 41
  ['c41', 'o', 'o', '(o)', '5 f3 O-O 6 e4 Ba6 7 Bd3 c5 8 d5 Bxc3+ 9 bxc3 d6 10 Nh3 Nbd7', { a: '=', r: 'Volzhin–Timman, Køge 1997', c: '5.f3 O-O 6.e4 Ba6 7.Bd3 c5! 8.d5 Bxc3+ 9.bxc3 d6 10.Nh3 Nbd7 dá às pretas pelo menos a igualdade.' }],
  ['c41', 'p', 'p', '(p)', '6 Ne2 Bxg2 7 Rg1 Be4 8 a3 Bxc3+ 9 Nxc3 Bxd3 10 Qxd3 Nh5 11 e4 Nc6', { a: '∓', r: 'Dzindzichashvili–de Firmian, Nova York 1996', c: '6.Ne2 Bxg2 7.Rg1 Be4 8.a3 Bxc3+ 9.Nxc3 Bxd3 10.Qxd3 Nh5! 11.e4 Nc6 é melhor para as pretas.' }],
  ['c41', 'q-A', 'q', '(q) A', '7... Bxc3 8 bxc3 Be4 9 Be2 c5 10 Nd2 Bg6 11 Nb3', { a: '⩲', r: 'Gligorić–Bisguier, EUA 1972', c: '7...Bxc3 8.bxc3 Be4 9.Be2 c5 10.Nd2 Bg6 11.Nb3 é um pouco melhor para as brancas.' }],
  ['c41', 'q-B', 'q', '(q) B', '7... d5', { c: '7...d5 transpõe para a coluna 31.' }],
  ['c41', 'r', 'r', '(r)', '8 Bd2 cxd4 9 exd4 d5 10 cxd5 Nxd5 11 Re1 Be7 12 Rc1 Nd7 13 Qe2 N7f6 14 Ne4 Rc8 15 Ne5 Rxc1 16 Rxc1 Qa8', { a: '=', r: 'Lukacs–Wells, Liga Austríaca 2000', c: '8.Bd2 cxd4 9.exd4 d5 10.cxd5 Nxd5 11.Re1 Be7 12.Rc1 Nd7 13.Qe2 N7f6 14.Ne4 Rc8 15.Ne5 Rxc1 16.Rxc1 Qa8 é igual.' }],
  ['c41', 's', 's', '(s)', '9... Qc7 10 Bg5 Ng4 11 d5 b5 12 h3 Ne5 13 cxb5 Bxd5 14 Rc1 Nxf3+ 15 Qxf3 Qa5 16 Qh5 f5 17 Nc3', { a: '⩲', r: 'Babula–Timman, Bundesliga 1998', c: '9...Qc7!? 10.Bg5 Ng4 11.d5 b5 12.h3 Ne5 13.cxb5 Bxd5 14.Rc1 Nxf3+ 15.Qxf3! Qa5 16.Qh5 f5 17.Nc3 é um pouco melhor para as brancas.' }],
  ['c41', 't', 't', '(t)', '13 a3 axb4 14 axb4 b5 15 cxb5 Nb6', { a: '=', r: 'Kane–Kaplan, EUA 1970', c: '13.a3 axb4 14.axb4 b5! 15.cxb5 Nb6 é igual: as pretas jogam com precisão para igualar.' }],
  ['c41-t', '1', 't', '(t) 13.b5', '13 b5 d5', { a: '=', c: '13.b5 d5 é igual.' }],
  ['c41-t', '2', 't', '(t) 12...Rc8', '12... Rc8 13 Nc3 Re8 14 Bf1 Qc7 15 h3', { a: '⩲', r: 'Malaniuk–Tiviakov, Porto San Giorgio 1994', c: 'Se 12...Rc8?! 13.Nc3 Re8 14.Bf1 Qc7 15.h3, as brancas mantêm a vantagem de espaço.' }],
  // Coluna 42
  ['c42', 'u-A', 'u', '(u) A', '7... Nxc3 8 bxc3 Bxc3 9 Rb1 Nc6 10 Rb3 Ba5 11 e4', { a: '±', r: 'Gligorić–Larsen, Lugano 1970', c: '7...Nxc3 8.bxc3 Bxc3 9.Rb1 Nc6 10.Rb3 Ba5 11.e4 é melhor para as brancas.' }],
  ['c42', 'u-B', 'u', '(u) B', '7... Bxc3 8 bxc3 f5 9 Ne1 O-O 10 f3 Nf6 11 Nc2', { a: '⩲', r: 'Gligorić–Kuzmin, Bled 1979', c: '7...Bxc3 8.bxc3 f5 9.Ne1 O-O 10.f3 Nf6 11.Nc2 é um pouco melhor para as brancas.' }],
  ['c42', 'v', 'v', '(v)', '13 Bc2 g6 14 f4 d6 15 fxe5 dxe5 16 Nb3', { a: '⩲', r: 'Atalik–Wedberg, Nova York 1997', c: '13.Bc2! g6 14.f4 d6 15.fxe5 dxe5 16.Nb3 é um pouco melhor para as brancas.' }],
]

const capitulo = {
  id: 'nimzo-g',
  arquivo: 'nimzo-g',
  nome: 'Nimzo-Índia — Rubinstein, Sistema Fischer 4...b6',
  fonte: 'Modern Chess Openings — Nimzo-Indian Defense (pp. 553–554), colunas 37–42',
  base: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4',
  corPadrao: 'b',
  ordem: 553,
  grupos: [
    { id: 'ne2', nome: '5.Ne2', colunas: [37, 38, 39, 40] },
    { id: 'bd3', nome: '5.Bd3', colunas: [41, 42] },
  ],
}

module.exports = { capitulo, colunas, notas }
