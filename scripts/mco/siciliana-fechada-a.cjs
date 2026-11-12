// Transcrição do MCO 15ª ed. — Sicilianas não abertas: Variante Fechada, linhas principais (pp. 348–349), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs siciliana-fechada-a
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-fechada-a-dicas.cjs.
//
// A tabela traz avaliação no fim das colunas 2 e 6; nas outras a avaliação vem da nota que continua a coluna.

const B = '1 e4 c5 2 Nc3 Nc6 3 g3 g6 4 Bg2 Bg7 5 d3 d6'

const colunas = {
  c01: [`${B} 6 f4 e6 7 Nf3 Nge7 8 O-O O-O 9 Be3 Nd4 10 e5 Nef5 11 Bf2 Nxf3+ 12 Qxf3 Nd4`, 'f4', '6.f4 e6 7.Nf3', '=',
    'Na Siciliana Fechada as brancas não abrem o centro: fianquetam o bispo do rei e avançam os peões da ala do rei. Contra 6.f4 e6 7.Nf3 Nge7 as pretas ocupam d4 com o cavalo; depois de 10.e5 Nef5 o jogo fica igual.'],
  c02: [`${B} 6 f4 e5 7 Nh3 Nge7 8 O-O exf4 9 Nxf4 O-O 10 Be3 Rb8 11 Qd2 b5 12 a3 a5`, 'f4', '6...e5 7.Nh3', '=',
    'Com 6...e5 as pretas fecham d4 com o peão. As brancas levam o cavalo para h3 e f4; depois de 8...exf4! as pretas atacam na ala da dama com ...b5, e o jogo fica igual.'],
  c03: [`${B} 6 Be3 e5 7 Qd2 Nge7 8 Nf3 O-O 9 O-O f5 10 Bh6 Be6 11 Bxg7 Kxg7 12 Ng5 Bg8`, 'be3', '6.Be3 e5', '∞',
    'Com 6.Be3 e 7.Qd2 as brancas preparam Bh6 para trocar o bispo de g7. Depois de 9...f5 e 12.Ng5 Bg8 o jogo tem chances para os dois lados.'],
  c04: [`${B} 6 Be3 e6 7 Qd2 Nge7 8 Bh6 Bxh6 9 Qxh6 Nd4 10 O-O-O Qa5 11 Qg7 Rf8 12 Qxh7 Nec6`, 'be3', '6...e6 8.Bh6', '∞',
    'Com 8.Bh6 Bxh6 9.Qxh6 a dama branca entra na ala do rei e ganha o peão h7, mas o rei preto fica no centro e as pretas atacam o roque grande. Elas têm boa compensação pelo peão.'],
  c05: [`${B} 6 Nh3 e6 7 O-O Nge7 8 Be3 O-O 9 Qd2 Nd4 10 f4 Rb8 11 Nd1 f5 12 c3 Ndc6`, 'outros', '6.Nh3', '=',
    'Com 6.Nh3 o cavalo vai para f2 ou f4, deixando o peão f livre. As pretas ocupam d4, avançam ...f5 e o jogo fica igual.'],
  c06: [`${B} 6 Nge2 e5 7 O-O Nge7 8 Be3 O-O 9 a3 Be6 10 Rb1 Qd7 11 b4 Nd4 12 Nd5 b6`, 'outros', '6.Nge2', '=',
    'Contra 6.Nge2 o lance 6...e5 é o mais eficaz, porque o avanço f4–f5 fica mais difícil para as brancas. Depois de 11.b4 Nd4 12.Nd5 b6 o jogo fica igual.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '5... e6 6 Be3 Nd4 7 Nce2 Ne7 8 c3 Nxe2 9 Nxe2 d6 10 O-O O-O 11 Qd2 Re8 12 d4', { a: '⩲', r: 'Smyslov–Golombek, Londres 1947', c: '5...e6 6.Be3 Nd4 7.Nce2 dá uma pequena vantagem às brancas.' }],
  ['c01-a', '1', 'a', '(a) 6...d6', '6... d6', { c: '6...d6 transpõe para a coluna 4.' }],
  ['c01', 'b', 'b', '(b)', '8... Rb8 9 e5 d5 10 Nb5 O-O 11 Nd6', { a: '⩲', r: 'Brih–Bellaiche, Liga Francesa 2001', c: '8...Rb8?! 9.e5! d5!? 10.Nb5 dá uma pequena vantagem às brancas.' }],
  ['c01', 'c', 'c', '(c)', '9 Bd2 Rb8 10 Rb1 b5 11 a3 Qd7 12 Kh1 a5 13 a4 b4 14 Nb5 Na7', { a: '=', r: 'Spassky–J. Polgár, Mônaco 1994', c: 'Com 9.Bd2 Rb8 10.Rb1 o jogo fica igual.' }],
  ['c01', 'd', 'd', '(d)', '10 Qd2 Rb8 11 Rae1 b5 12 Nh4 b4 13 Nd1 f5', { a: '=', r: 'Csom–Minić, Berlim 1968', c: 'Menos tático é 10.Qd2 Rb8 11.Rae1, com igualdade.' }],
  ['c01', 'e', 'e', '(e)', '13 Qd1 dxe5 14 fxe5 Bxe5 15 Ne4 f5 16 Nxc5 Qc7 17 b4 Bg7 18 c3 Nb5 19 Qb3 Nxc3 20 Rae1 Qf7 21 Nxe6 Bxe6 22 Rxe6 a5', { a: '=', r: 'Balashov–Karpman, Moscou 1989', c: 'Com 13.Qd1 dxe5 14.fxe5 Bxe5 o jogo fica igual.' }],
  ['c01-e', '1', 'e', '(e) 18.Re1', '18 Re1 a5 19 c3 Nb5', { a: '∓', c: '18.Re1 a5! 19.c3 Nb5 deixa as pretas um pouco melhor.' }],
  // Coluna 2
  ['c02', 'f', 'f', '(f)', '6... Nf6 7 Nf3 O-O 8 O-O Rb8 9 h3 b5 10 a3 a5 11 Be3 b4 12 axb4 axb4 13 Ne2 Bb7 14 b3 Ra8 15 Rc1 Ra2 16 g4 Qa8 17 Qe1 Qa6 18 Qf2 Na7 19 f5', { a: '⩲', r: 'Spassky–Geller, match 1966', c: '6...Nf6 7.Nf3 O-O dá às brancas chances de ataque, mas as pretas têm contrajogo. Van Wely gosta de jogar esta linha de pretas.' }],
  ['c02', 'g', 'g', '(g)', '7 Nf3 Nge7 8 O-O O-O 9 Be3 Nd4 10 Qd2 exf4 11 Bxf4 Nxf3+ 12 Rxf3 Be6 13 Bh6 Nc6 14 Bxg7 Kxg7', { a: '=', r: 'Smyslov–Tal, Leningrado 1962', c: 'Depois de 7.Nf3 Nge7 as pretas igualam sem dificuldade.' }],
  ['c02', 'h-A', 'h', '(h) A', '8... O-O 9 f5 gxf5 10 exf5 Bxf5 11 Rxf5 Nxf5 12 Be4', { a: '±', c: 'Uma armadilha antiga é 8...O-O?! 9.f5! gxf5 10.exf5 Bxf5 11.Rxf5 Nxf5 12.Be4, e as brancas ficam melhor.' }],
  ['c02-h-A', '1', 'h', '(h) A 12...Nfe7', '12... Nfe7 13 Bxh7+ Kxh7 14 Qh5+ Kg8 15 Ng5', { a: '+−', c: '12...Nfe7? 13.Bxh7+ Kxh7 14.Qh5+ Kg8 15.Ng5 ganha na hora.' }],
  ['c02', 'h-B', 'h', '(h) B', '8... Nd4 9 f5 gxf5 10 Qh5 h6 11 Rf2 Be6 12 Be3 Qd7 13 Raf1 O-O-O 14 Bxd4 cxd4 15 exf5 Nxf5 16 Nd5 Ne3 17 Rxf7 Nxd5 18 Rxd7', { a: '±', r: 'Sale–Psakhis, Portorož 1995', c: '8...Nd4 9.f5! também é difícil para as pretas. A coluna é Balashov–Kharlov, Liga Russa 2001.' }],
  // Coluna 3
  ['c03', 'i', 'i', '(i)', '7... Be6 8 f4 Nge7 9 Nf3 Nd4 10 O-O O-O 11 Rae1 Nxf3+ 12 Bxf3 Qd7', { a: '=', r: 'Hort–Tal, Wijk aan Zee 1968', c: 'As pretas também igualam com 7...Be6.' }],
  ['c03', 'j', 'j', '(j)', '8 Bh6 O-O 9 h4 Bxh6 10 Qxh6 f6 11 Qd2 Nd4', { a: '=', r: 'Orlov–Tischbierek, Porto San Giorgio 2003', c: 'Com 8.Bh6 O-O 9.h4 Bxh6 10.Qxh6 f6 o jogo fica igual.' }],
  ['c03', 'k', 'k', '(k)', '13 exf5 Nxf5 14 Kh1 Nfd4', { a: '∞', r: 'Pekarek–Gschnitzer, Alemanha 1993', c: 'Com 13.exf5 Nxf5 14.Kh1 Nfd4 o jogo tem chances para os dois lados.' }],
  // Coluna 4
  ['c04', 'l', 'l', '(l)', '6... Rb8 7 Qd2 b5 8 f4 b4 9 Nd1 e6 10 Nf3 Nge7 11 g4 f5', { a: '=', r: 'La Rota–Kudrin, Nova York 1996', c: 'As pretas podem jogar logo na ala da dama: 6...Rb8 7.Qd2 b5, e depois de 11...f5! o jogo fica igual.' }],
  ['c04', 'm', 'm', '(m)', '8 f4 O-O 9 Nf3 Nd4 10 O-O', { c: '8.f4 O-O 9.Nf3 Nd4 10.O-O transpõe para a nota (d).' }],
  ['c04', 'n', 'n', '(n)', '8... O-O 9 Bxg7 Kxg7 10 h4 h6 11 f4 f6 12 g4 Nd4 13 Nh3 Nec6 14 O-O', { a: '⩲', r: 'Smyslov–Brinck-Claussen, Copenhague 1986', c: 'Depois de 8...O-O 9.Bxg7 Kxg7 10.h4 as brancas ganham chances de ataque.' }],
  ['c04', 'o', 'o', '(o)', '13 Kb1 Bd7 14 Nf3 Nb4', { a: '∞', r: 'Wanzek–Movsesian, Eslováquia 1995', c: 'Com 13.Kb1 Bd7 14.Nf3 Nb4 as pretas têm boas possibilidades de ataque pelo peão.' }],
  // Coluna 5
  ['c05', 'p', 'p', '(p)', '6... e5 7 O-O Nge7 8 f4', { c: '6...e5 7.O-O Nge7 8.f4 transpõe para a coluna 2.' }],
  ['c05', 'q', 'q', '(q)', '9... b6 10 Bh6 Bxh6 11 Qxh6 f6 12 Qd2 Bb7 13 f4 d5 14 Nf2 Qd7 15 Rae1 f5 16 Qc1 d4 17 Ne2', { a: '⩲', r: 'C. Hansen–van Wely, Cap d’Agde 1996', c: '9...b6 10.Bh6 Bxh6 11.Qxh6 dá uma pequena vantagem às brancas.' }],
  ['c05', 'r', 'r', '(r)', '13 Kh1 b6 14 Bg1 d5 15 exd5 Nxd5', { a: '=', r: 'Spraggett–Yrjölä, Olimpíada de Yerevan 1996', c: 'Com 13.Kh1 b6 14.Bg1 d5 o jogo fica igual.' }],
  // Coluna 6
  ['c06', 's-A', 's', '(s) A', '6... e6 7 O-O Nge7 8 Bg5 O-O 9 Qd2 Rb8 10 Bh6 b5 11 Bxg7 Kxg7 12 f4 Nd4 13 Nxd4 cxd4 14 Ne2 e5', { a: '=', r: 'Spassky–Karpov, Bugojno 1986', c: 'Com 6...e6 as pretas igualam mais devagar.' }],
  ['c06', 's-B', 's', '(s) B', '6... Nf6 7 O-O O-O', { a: '=', c: '6...Nf6 7.O-O O-O também é aceitável para as pretas.' }],
  ['c06', 't', 't', '(t)', '9 Qd2 Rb8 10 h3 b5 11 f4 b4 12 Nd1 Nd4 13 g4 Nxe2+ 14 Qxe2 exf4', { a: '∓', r: 'Kholmov–Doda, Leningrado 1967', c: '9.Qd2 Rb8 10.h3 b5 deixa as pretas um pouco melhor. A coluna é Ekström–Åkesson, Suécia 1995.' }],
]

const capitulo = {
  id: 'siciliana-fechada-a',
  arquivo: 'siciliana-fechada-a',
  nome: 'Siciliana Fechada A — linhas principais',
  fonte: 'Modern Chess Openings — Sicilian Defense, Closed Variation, main lines (pp. 348–349), colunas 1–6',
  base: '1. e4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. d3 d6',
  corPadrao: 'b',
  ordem: 348,
  grupos: [
    { id: 'f4', nome: '6.f4', colunas: [1, 2] },
    { id: 'be3', nome: '6.Be3', colunas: [3, 4] },
    { id: 'outros', nome: '6.Nh3 e 6.Nge2', colunas: [5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
