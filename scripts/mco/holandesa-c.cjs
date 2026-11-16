// Transcrição do MCO 15ª ed. — Defesa Holandesa, Stonewall e Ilyin-Zhenevsky (pp. 499–500), colunas 13–18.
// Gerar: node scripts/mco/gerar.cjs holandesa-c
// Formato: ver gambito-do-rei.cjs. Dicas em holandesa-c-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Correção: na nota (g) B o livro traz 7 b3 c6 8 Ba3 Nbd7, impossível (o peão preto já está em c6 desde o 5º lance); ficou só 7.b3.

const B = '1 d4 f5 2 c4 Nf6 3 g3 e6 4 Bg2'
const S = `${B} d5 5 Nf3 c6 6 O-O`
const I = `${B} Be7 5 Nf3 O-O 6 O-O d6 7 Nc3 Qe8`

const colunas = {
  c13: [`${S} Bd6 7 b3 Qe7 8 Bb2 b6 9 Ne5 Bb7 10 Nd2 O-O 11 Rc1 a5 12 e3 Na6`, 'stonewall', '4...d5 (Stonewall) 6...Bd6 7.b3', '⩲',
    'No Stonewall as pretas montam a corrente de peões f5, e6, d5 e c6 e seguram a casa e4. O custo é o buraco em e5 e um bispo de c8 preso atrás dos peões. Depois de 6...Bd6 7.b3 Qe7 8.Bb2 b6 9.Ne5 Bb7 10.Nd2 O-O 11.Rc1 a5 12.e3 Na6 as brancas ficam um pouco melhor (Sturua–Vaisser, Olimpíada de Yerevan 1996).'],
  c14: [`${S} Bd6 7 Bf4 Bxf4 8 gxf4 O-O 9 Nbd2 Bd7 10 Ne5 Be8 11 Qb3 Qb6 12 Qc3 Nbd7`, 'stonewall', '7.Bf4', '⩲',
    'Com 7.Bf4 as brancas trocam o bom bispo preto de casas escuras. Depois de 7...Bxf4 8.gxf4 O-O 9.Nbd2 Bd7 10.Ne5 Be8 (o bispo procura h5) 11.Qb3 Qb6 12.Qc3 Nbd7 as brancas ficam um pouco melhor (Browne–Christiansen, Los Angeles 1996).'],
  c15: [`${S} Be7 7 Nbd2 O-O 8 Qc2 Bd7 9 Ne5 Be8 10 Ndf3 Ne4 11 b3 Kh8 12 Bb2 Bd6`, 'stonewall', '6...Be7', '⩲',
    'Com 6...Be7 o bispo fica mais modesto. Depois de 7.Nbd2 O-O 8.Qc2 Bd7 9.Ne5 Be8 10.Ndf3 Ne4 11.b3 Kh8 12.Bb2 Bd6 a posição das brancas é mais flexível (I. Sokolov–Yusupov, Nussloch 1996).'],
  c16: [`${B} d5 5 Nh3 Be7 6 O-O O-O 7 b3 c6 8 Bb2 Ne4 9 Nd2 Bf6 10 Nxe4 dxe4 11 Qc2 Qe7 12 f3 c5`, 'stonewall', '5.Nh3', '⩲',
    'Com 5.Nh3 o cavalo vai a f4, de onde pressiona e6 e d5. Depois de 5...Be7 6.O-O O-O 7.b3 c6 8.Bb2 Ne4 9.Nd2 Bf6 10.Nxe4 dxe4 11.Qc2 Qe7 12.f3 c5 as pretas ficam com mais casas fracas que as brancas (Khenkin–Tukmakov, Metz 1991).'],
  c17: [`${I} 8 Re1 Qg6 9 e4 fxe4 10 Nxe4 Nxe4 11 Rxe4 Nc6 12 Re1 e5`, 'ilyin', '4...Be7 (Ilyin-Zhenevsky) 8.Re1', '±',
    'No Sistema Ilyin-Zhenevsky os peões pretos ficam em d6 e e6, e as pretas preparam ...e5. Com 8.Re1 as brancas rompem com e4 antes. Depois de 8...Qg6 9.e4 fxe4 10.Nxe4 Nxe4 11.Rxe4 Nc6 12.Re1 e5 as brancas ficam melhor (Yermolinsky–Zelensky, EUA 1997).'],
  c18: [`${I} 8 b3 a5 9 Bb2 Na6 10 a3 Bd7 11 Ne1 c6 12 Nd3 Bd8`, 'ilyin', '8.b3', '=',
    'Com 8.b3 as brancas jogam com calma, e as pretas ficam com chances razoáveis. Depois de 8...a5 9.Bb2 Na6 10.a3 Bd7 11.Ne1 c6 12.Nd3 Bd8 as pretas podem avançar no centro, e o jogo é mais ou menos igual (Farago–Lucaroni, Marostica 1997).'],
}

const notas = [
  // Coluna 13
  ['c13', 'a', 'a', '(a)', '8 a4 a5 9 Ba3 Bxa3 10 Nxa3 O-O 11 Nc2 Rd8 12 Qc1 b6 13 Nce1', { a: '⩲', r: 'I. Sokolov–Salov, Nova York 1996', c: 'As brancas também podem trocar logo os bispos de casas escuras: 8.a4 a5 9.Ba3 Bxa3 10.Nxa3 O-O 11.Nc2 Rd8 12.Qc1 b6 13.Nce1 é um pouco melhor para elas.' }],
  ['c13', 'b', 'b', '(b)', '9 Qc1 Bb7 10 Ba3 Nbd7 11 Bxd6 Qxd6', { a: '=', r: 'Kramnik', c: '9.Qc1 Bb7 10.Ba3 Nbd7 11.Bxd6 Qxd6 é igual, segundo Kramnik.' }],
  ['c13', 'c', 'c', '(c)', '13 Qe2 a4 14 bxa4 Bxe5 15 dxe5 Nd7 16 a5', { a: '⩲', r: 'Sturua–Vaisser, Olimpíada de Yerevan 1996', c: '13.Qe2 a4 14.bxa4 Bxe5 15.dxe5 Nd7 16.a5 é um pouco melhor para as brancas.' }],
  // Coluna 14
  ['c14', 'd-A', 'd', '(d) A', '9 Nc3 Nbd7 10 Ne5 Ne4', { a: '=', r: 'Shabalov–Vyzhmanavin, URSS 1987', c: '9.Nc3 Nbd7 10.Ne5 Ne4 está bem para as pretas.' }],
  ['c14', 'd-B', 'd', '(d) B', '9 e3 Qe7 10 Nbd2 Nbd7 11 Qc2 Ne4', { a: '=', r: 'Novikov–Kramnik, Moscou 1991', c: '9.e3 Qe7 10.Nbd2 Nbd7 11.Qc2 Ne4 é igual.' }],
  ['c14', 'e', 'e', '(e)', '9... Nbd7 10 e3 Qe7 11 Qc2 Ne4 12 Kh1 Ndf6 13 Ne5 Bd7 14 Nxe4 fxe4 15 f3', { a: '⩲', r: 'Panchenko–Shumilov, Ucrânia 2006', c: '9...Nbd7 10.e3 Qe7 11.Qc2 Ne4 12.Kh1 Ndf6 13.Ne5 Bd7 14.Nxe4 fxe4 15.f3 é um pouco melhor para as brancas.' }],
  ['c14', 'f', 'f', '(f)', '13 e3 Rd8 14 cxd5 cxd5 15 f3 h6 16 Nb3 Nxe5 17 fxe5', { a: '⩲', r: 'Browne–Christiansen, Los Angeles 1996', c: '13.e3 Rd8 14.cxd5 cxd5 15.f3 h6 16.Nb3 Nxe5 17.fxe5 é um pouco melhor para as brancas.' }],
  // Coluna 15
  ['c15', 'g-A', 'g', '(g) A', '7 Nc3 O-O 8 Bg5 Ne4', { a: '=', c: '7.Nc3 O-O 8.Bg5 (8.Rb1!? também é possível) Ne4 é mais ou menos igual.' }],
  ['c15', 'g-B', 'g', '(g) B', '7 b3', { a: '=', r: 'Gligorić–Mariotti, Olimpíada de Nice 1974', c: '7.b3 leva à igualdade. O livro segue com 7...c6 8.Ba3 Nbd7, impossível, porque o peão preto já está em c6.' }],
  ['c15', 'h-A', 'h', '(h) A', '8... Qe8 9 Ne5 Nbd7 10 Nd3', { a: '⩲', c: 'As pretas também não igualam com 8...Qe8 9.Ne5 Nbd7 10.Nd3, um pouco melhor para as brancas.' }],
  ['c15', 'h-B', 'h', '(h) B', '8... Ne4 9 Ne5 Nd7 10 Nd3', { a: '⩲', c: '8...Ne4 9.Ne5 Nd7 10.Nd3 também é um pouco melhor para as brancas.' }],
  ['c15', 'i', 'i', '(i)', '13 Ne1 Nd7 14 N1d3', { a: '⩲', r: 'I. Sokolov–Yusupov, Nussloch 1996', c: '13.Ne1 Nd7 14.N1d3 deixa as brancas com uma posição mais flexível.' }],
  // Coluna 16
  ['c16', 'j', 'j', '(j)', '5... Bd6 6 O-O O-O 7 Qc2 c6 8 Bf4 Be7 9 Nd2 Nh5 10 Nf3 Nxf4 11 Nxf4 Bd6 12 Ne5 Qe7', { a: '⩲', r: 'Kempiński–Radjabov, Antalya 2004', c: '5...Bd6 é uma boa alternativa: depois de 6.O-O O-O 7.Qc2 c6 8.Bf4 Be7 9.Nd2 Nh5 10.Nf3 Nxf4 11.Nxf4 Bd6 12.Ne5 Qe7 a vantagem das brancas é pequena.' }],
  ['c16', 'k', 'k', '(k)', '7... Nc6', { c: 'Em vez do Stonewall clássico, as pretas podem experimentar 7...Nc6 seguido de ...a5.' }],
  ['c16', 'l', 'l', '(l)', '13 fxe4 Bxd4+ 14 Bxd4 cxd4 15 exf5 exf5 16 Nf4', { a: '⩲', r: 'Khenkin–Tukmakov, Metz 1991', c: '13.fxe4 Bxd4+ 14.Bxd4 cxd4 15.exf5 exf5 16.Nf4 deixa as pretas com mais casas fracas que as brancas.' }],
  // Coluna 17
  ['c17', 'm', 'm', '(m)', '6... a5 7 Nc3 d5 8 b3 Ne4 9 Bb2 Bf6 10 e3 c6 11 Rc1 Nd7 12 Ne1 Nxc3 13 Bxc3 b5', { a: '=', r: 'Crouch–Rogers, 4NCL 2004', c: '6...a5 7.Nc3 (talvez não seja a melhor casa agora) d5 8.b3 Ne4 9.Bb2 Bf6 10.e3 c6 11.Rc1 Nd7 12.Ne1 Nxc3 13.Bxc3 b5 é igual.' }],
  ['c17', 'n', 'n', '(n)', '8... Nc6 9 e4 Nxe4 10 Nxe4 fxe4 11 Rxe4 Qg6 12 Qe2 Bf6 13 Bd2 e5 14 dxe5 dxe5 15 Bc3 Bf5 16 Nh4', { a: '⩲', r: 'Yakovich–Dyakhkov, Rússia 1998', c: '8...Nc6 9.e4 Nxe4 10.Nxe4 fxe4 11.Rxe4 Qg6 12.Qe2 Bf6 13.Bd2 e5 14.dxe5 dxe5 15.Bc3! Bf5 16.Nh4 dá jogo ativo às brancas.' }],
  ['c17', 'o', 'o', '(o)', '13 dxe5 Bg4 14 h3 Bxf3 15 Bxf3 Nxe5 16 Bxb7', { a: '±', r: 'Yermolinsky–Zelensky, EUA 1997', c: '13.dxe5 Bg4 14.h3 Bxf3 15.Bxf3 Nxe5 16.Bxb7 é melhor para as brancas. (O Stockfish vai além: cerca de +4.) Com 12...Nb4 ou 12...Bf6 as pretas limitariam o estrago e ficariam só um pouco piores.' }],
  // Coluna 18
  ['c18', 'p', 'p', '(p)', '9 Ba3 Na6 10 e3 c6 11 Rc1 Rb8', { a: '=', r: 'Ribli–Lobron, Alemanha 1996', c: '9.Ba3 Na6 10.e3 c6 11.Rc1 Rb8 é igual.' }],
  ['c18', 'q', 'q', '(q)', '9... c6 10 Re1 d5 11 e3', { a: '⩲', r: 'Chulelov–Spice, Eupen 1997', c: '9...c6 10.Re1 d5 11.e3 é um pouco melhor para as brancas.' }],
  ['c18', 'r', 'r', '(r)', '12... Nc7 13 e4 fxe4 14 Nxe4 Nxe4 15 Bxe4', { a: '⩲', c: '12...Bd8 é melhor que 12...Nc7 13.e4 fxe4 14.Nxe4 Nxe4 15.Bxe4, um pouco melhor para as brancas.' }],
]

const capitulo = {
  id: 'holandesa-c',
  arquivo: 'holandesa-c',
  nome: 'Holandesa — Stonewall e Ilyin-Zhenevsky',
  fonte: 'Modern Chess Openings — Dutch Defense (pp. 499–500), colunas 13–18',
  base: '1. d4 f5',
  corPadrao: 'b',
  ordem: 499,
  grupos: [
    { id: 'stonewall', nome: '4...d5 (Stonewall)', colunas: [13, 14, 15, 16] },
    { id: 'ilyin', nome: '4...Be7 (Ilyin-Zhenevsky)', colunas: [17, 18] },
  ],
}

module.exports = { capitulo, colunas, notas }
