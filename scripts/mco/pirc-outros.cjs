// Transcrição do MCO 15ª ed. — Defesa Pirc, outros quartos lances (pp. 371–372), colunas 19–24.
// Gerar: node scripts/mco/gerar.cjs pirc-outros
// Formato: ver gambito-do-rei.cjs. Dicas em pirc-outros-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; a avaliação vem da nota que continua cada coluna.
// Erros do livro: em (j) o livro traz "24 Rxd4!! exd4" (o peão de e5 já saiu; o lance é 24...cxd4, como na partida
// Kasparov–Topalov); em (t) "14 cxd5" (as brancas não têm peão c para isso; é 14.exd5).

const B = '1 e4 d6 2 d4 Nf6 3 Nc3 g6'

const colunas = {
  c19: [`${B} 4 Bg5 Bg7 5 Qd2 c6 6 f4 O-O 7 Nf3 b5 8 Bd3 Bg4 9 e5 b4 10 Ne2 Bxf3 11 gxf3 Nd5`, 'bg5', '4.Bg5 Bg7 5.Qd2 c6 6.f4', '=',
    'Com 4.Bg5 as brancas preparam Qd2 e Bh6 para trocar o bispo de g7. As pretas respondem com ...c6 e ...b5, buscando contrajogo na ala da dama; depois de 9.e5 b4 o cavalo preto chega a d5 e o jogo fica igual.'],
  c20: [`${B} 4 f3 c6 5 Be3 Nbd7 6 Qd2 b5 7 Nh3 Bb7 8 Be2 e5 9 O-O a6 10 Rad1 Bg7 11 Nf2 O-O`, 'f3', '4.f3 c6 5.Be3', '=',
    'Com 4.f3 as brancas firmam o peão de e4 e preparam Be3, Qd2 e um ataque na ala do rei. As pretas expandem-se na ala da dama com ...c6 e ...b5, golpeiam com ...e5 e igualam.'],
  c21: [`${B} 4 Be3 c6 5 Qd2 b5 6 f3 Nbd7 7 g4 Nb6 8 h4 h5 9 g5 Nfd7 10 d5 Ne5 11 dxc6 Nbc4`, 'be3', '4.Be3 c6!', '=',
    'Com 4.Be3 as brancas planejam Qd2, f3 e roque grande, como no Ataque Inglês. As pretas devem responder logo com 4...c6! e ...b5; depois de 7.g4 o jogo fica agudo, mas os cavalos pretos chegam a e5 e c4 e as chances se equilibram.'],
  c22: [`${B} 4 Bc4 Bg7 5 Qe2 c6 6 e5 Nd5 7 Bd2 O-O 8 O-O-O Nxc3 9 Bxc3 b5 10 Bd3 dxe5 11 dxe5 Qd5`, 'bc4', '4.Bc4 Bg7 5.Qe2', '∞',
    'Com 4.Bc4 e 5.Qe2 as brancas preparam e5. As pretas respondem com 5...c6 e, depois de 6.e5 Nd5, trocam o cavalo de c3; com roques opostos e a dama preta ativa em d5, o jogo fica indefinido.'],
  c23: [`${B} 4 g3 Bg7 5 Bg2 O-O 6 Nge2 e5 7 h3 c6 8 a4 a5 9 O-O Na6 10 Be3 Nb4 11 Qd2 d5`, 'g3', '4.g3 Bg7 5.Bg2', '=',
    'Com 4.g3 as brancas fazem o fianqueto e jogam de modo posicional. As pretas golpeiam com 6...e5, instalam o cavalo em b4 e liberam o jogo com 11...d5, com igualdade.'],
  c24: [`${B} 4 Be2 Bg7 5 h4 h5 6 Nf3 O-O 7 Ng5 Nc6 8 Be3 e5 9 d5 Ne7 10 f3 c6 11 Bc4 b5`, 'be2', '4.Be2 Bg7 5.h4', '∓',
    'Com 4.Be2 e 5.h4!? as brancas atacam diretamente o roque preto. As pretas freiam o peão com 5...h5, golpeiam o centro com ...e5 e ...c6, e o impreciso 11.Bc4?! deixa as pretas um pouco melhor depois de 11...b5!.'],
}

const notas = [
  // Coluna 19 (inclui as notas do 3º lance)
  ['c19', 'a', 'a', '(a)', '3 f3 e5 4 dxe5 dxe5 5 Qxd8+ Kxd8 6 Bc4 Ke8 7 Bg5 Nbd7 8 Nd2 Be7 9 Ne2 Nb6 10 Bb3 Nfd7 11 Be3 Bc5', { a: '=', r: 'Korchnoi–Speelman, Antuérpia 1993', c: '3.f3 e5 4.dxe5 dxe5 5.Qxd8+ leva a um final igual.' }],
  ['c19', 'b-A', 'b', '(b) A', '3... e5 4 Nf3 Nbd7', { c: '3...e5 4.Nf3 Nbd7 transpõe para a Defesa Philidor.' }],
  ['c19', 'b-B', 'b', '(b) B', '3... c6 4 f4 Qa5 5 Bd3 e5 6 Nf3 Bg4 7 Be3 Nbd7 8 O-O Be7 9 h3', { a: '±', r: 'Browne–Benjamin, Campeonato dos EUA 1995', c: 'A Defesa Prybil é 3...c6 4.f4 Qa5. É pouco convencional e também suspeita depois de 5.Bd3 e5 6.Nf3.' }],
  ['c19', 'c-A', 'c', '(c) A', '4... h6 5 Be3 c6 6 Qd2 b5 7 f3 Nbd7 8 a4 b4 9 Nd1', { a: '±', r: 'Romanishin–Puthiyenen, Ierevan 1976', c: '4...h6 5.Be3 c6 6.Qd2 favorece as brancas.' }],
  ['c19', 'c-B', 'c', '(c) B', '4... c6 5 Qd2 b5 6 Bd3 h6 7 Bf4', { a: '±', c: '4...c6 5.Qd2 b5 6.Bd3 também favorece as brancas.' }],
  ['c19', 'd', 'd', '(d)', '5 f4 h6 6 Bh4 c5 7 dxc5 Qa5 8 Bd3 Qxc5 9 Qd2 Nc6 10 Nge2 O-O 11 O-O-O', { a: '±', r: 'Yermolinsky–Gulko, Campeonato dos EUA 1996', c: '5.f4 h6 6.Bh4 c5 dá vantagem às brancas.' }],
  ['c19-d', '1', 'd', '(d) 5...O-O', '5... O-O', { c: '5...O-O provavelmente volta à coluna.' }],
  ['c19', 'e', 'e', '(e)', '5... h6 6 Bh4 Nbd7 7 O-O-O g5 8 Bg3 Nh5 9 e5 dxe5 10 dxe5 e6 11 Be2 Nxg3 12 hxg3 Qe7 13 f4 Nb6 14 Nf3', { a: '±', r: 'Z. Almasi–Beliavsky, Iugoslávia 1997', c: '5...h6 6.Bh4 Nbd7 7.O-O-O g5 8.Bg3 Nh5 9.e5!? favorece as brancas.' }],
  ['c19-e', '1', 'e', '(e) 9.Nge2', '9 Nge2 c5', { a: '=', c: '9.Nge2 c5 é igual.' }],
  ['c19', 'f', 'f', '(f)', '9 f5 d5 10 e5 Ne4 11 Qf4 Bxf5 12 Nxe4 dxe4 13 Bxe4 Bxe4 14 Qxe4 f6', { a: '=', r: 'Rocha–Fernandes, Campeonato Português 2005', c: '9.f5 d5! 10.e5 Ne4 leva à igualdade.' }],
  ['c19', 'g', 'g', '(g)', '12 Bc4 a5 13 O-O-O f6 14 exf6 exf6 15 Bh4 Bh6 16 Bf2 Nd7', { a: '=', r: 'Dreev–Zaharević, Rússia 1996', c: '12.Bc4 a5 13.O-O-O f6 leva à igualdade.' }],
  // Coluna 20
  ['c20', 'h', 'h', '(h)', '5... Qb6 6 Qc1 Bg7 7 Nge2 h5 8 Nf4 Qc7 9 Qd2 Nbd7 10 O-O-O b5', { a: '∞', r: 'Yudasin–Svidler, Haifa 1995', c: '5...Qb6 6.Qc1 Bg7 leva a um jogo indefinido.' }],
  ['c20', 'i', 'i', '(i)', '12 dxe5 dxe5 13 Nd3 Qc7 14 Nc5 Rad8', { a: '=', r: 'Jiménez–Botvinnik, Palma de Mallorca 1967', c: '12.dxe5 dxe5 13.Nd3 Qc7 é mais ou menos igual. (O Stockfish aponta 13.g4!, que ameaça g5 e tira o defensor do cavalo de d7, com clara vantagem branca.)' }],
  // Coluna 21
  ['c21', 'j', 'j', '(j)', '4... Bg7 5 Qd2 c6 6 f3 b5 7 Nge2 Nbd7 8 Bh6 Bxh6 9 Qxh6 Bb7 10 a3 e5 11 O-O-O Qe7 12 Kb1 a6 13 Nc1 O-O-O 14 Nb3 exd4 15 Rxd4 c5 16 Rd1 Nb6 17 g3 Kb8 18 Na5 Ba8 19 Bh3 d5 20 Qf4+ Ka7 21 Rhe1 d4 22 Nd5 Nbxd5 23 exd5 Qd6 24 Rxd4 cxd4 25 Re7+ Kb6 26 Qxd4+ Kxa5 27 b4+ Ka4 28 Qc3 Qxd5 29 Ra7 Bb7 30 Rxb7 Qc4 31 Qxf6 Kxa3 32 Qxa6+ Kxb4 33 c3+ Kxc3 34 Qa1+ Kd2 35 Qb2+ Kd1 36 Bf1 Rd2 37 Rd7', { a: '+−', r: 'Kasparov–Topalov, Wijk aan Zee 1999', c: 'A expansão na ala da dama é necessária, e quanto antes melhor. Depois de 4...Bg7 5.Qd2 c6 6.f3 b5 veio a famosa partida em que Kasparov sacrificou a torre com 24.Rxd4!! e ganhou.' }],
  ['c21-j', '1', 'j', '(j) 5...O-O', '5... O-O 6 O-O-O Nc6 7 f3 e5 8 Nge2 exd4 9 Nxd4 Nxd4 10 Bxd4 Be6 11 Be3 Re8 12 Bg5 Qe7 13 g4', { a: '±', r: 'Chernin–Zaichik, Lvov 1987', c: '5...O-O 6.O-O-O Nc6?! permite às brancas um ataque forte.' }],
  ['c21-j-1', '1', 'j', '(j) 6...c6', '6... c6', { c: '6...c6 é melhor.' }],
  ['c21-j', '2', 'j', '(j) 25...Qxe7', '25... Qxe7 26 Qxd4+ Kb8 27 Qb6+', { a: '+−', c: '25...Qxe7 26.Qxd4+ Kb8 27.Qb6+ leva ao mate.' }],
  ['c21', 'k', 'k', '(k)', '6 Bd3 Nbd7 7 Nf3 Qc7 8 h3 Bb7 9 b3 Bg7 10 O-O O-O 11 Bh6 e5', { a: '=', r: 'Tirard–M. Gurevich, França 2003', c: '6.Bd3 Nbd7 7.Nf3 Qc7 leva à igualdade.' }],
  ['c21-k', '1', 'k', '(k) 7...e5', '7... e5 8 dxe5 dxe5 9 h3', { a: '⩲', c: '7...e5 8.dxe5 dxe5 9.h3 dá pequena vantagem às brancas.' }],
  ['c21', 'l', 'l', '(l)', '12 Bxc4 Nxc4 13 Qd4 Rg8 14 Nge2 Be6', { a: '=', r: 'Firman–Nijboer, Varsóvia 2005', c: '12.Bxc4 Nxc4 13.Qd4 Rg8 leva à igualdade.' }],
  ['c21-l', '1', 'l', '(l) 14.Nxb5', '14 Nxb5 Qa5+ 15 Nc3 Be6', { a: '∓', c: '14.Nxb5?! Qa5+ 15.Nc3 Be6 deixa as pretas um pouco melhor.' }],
  // Coluna 22
  ['c22', 'm', 'm', '(m)', '5... Nc6 6 e5 Nd7 7 Nf3 Nb6 8 Bb3 O-O 9 h3 Na5 10 O-O Nxb3 11 axb3 Bf5', { a: '=', r: 'Lenic–Beliavsky, Memorial Vidmar 2003', c: 'Uma linha aguda é 5...Nc6 6.e5 Nd7, que leva à igualdade.' }],
  ['c22-m', '1', 'm', '(m) 6...Nxd4', '6... Nxd4 7 exf6 Nxe2 8 fxg7', { a: '±', c: '6...Nxd4 7.exf6 Nxe2 8.fxg7 favorece as brancas.' }],
  ['c22-m', '2', 'm', '(m) 7.Bxf7+', '7 Bxf7+ Kxf7 8 e6+ Kg8', { a: '=', c: '7.Bxf7+ Kxf7 8.e6+ Kg8 só dá igualdade.' }],
  ['c22', 'n', 'n', '(n)', '8 Bb3 a5 9 a4 dxe5 10 dxe5 Na6 11 Nf3 Nc5', { a: '=', r: 'Tan–Smyslov, Interzonal de Petrópolis 1973', c: '8.Bb3 a5 9.a4 leva à igualdade.' }],
  ['c22', 'o', 'o', '(o)', '12 Kb1 Be6 13 b3 Qc5 14 Bb2 a5', { a: '∞', r: 'Englebert–Movsesian, Hamburgo 1992', c: '12.Kb1 Be6 13.b3 leva a chances para os dois lados.' }],
  // Coluna 23
  ['c23', 'p', 'p', '(p)', '6 Nf3 Bg4 7 O-O Nc6 8 h3 Bxf3 9 Bxf3 e5 10 dxe5 dxe5 11 Be3 Nd4', { a: '=', r: 'Pachow–Belov, Katowice 1993', c: '6.Nf3 Bg4! 7.O-O Nc6 leva à igualdade.' }],
  ['c23', 'q-A', 'q', '(q) A', '7... Nbd7 8 O-O c6 9 a4 Re8 10 Re1', { a: '⩲', c: '7...Nbd7 permite às brancas a formação que elas buscam.' }],
  ['c23', 'q-B', 'q', '(q) B', '7... Nc6 8 Be3 exd4 9 Nxd4 Bd7 10 O-O Re8 11 Re1 a6 12 a4 Nb4 13 g4 c5 14 Nde2 Bc6', { a: '∞', r: 'Magem Badals–Svidler, Olimpíada de Ierevan 1996', c: '7...Nc6!? 8.Be3 exd4 9.Nxd4 dá contrajogo às pretas.' }],
  ['c23', 'r', 'r', '(r)', '12 exd5 Nfxd5 13 Nxd5 Nxd5', { a: '=', r: 'Ivanchuk–Gagunashvili, Istambul 2003', c: '12.exd5 Nfxd5 13.Nxd5 Nxd5 é igual.' }],
  // Coluna 24
  ['c24', 's', 's', '(s)', '5... Nc6 6 h5 gxh5 7 Nh3 e5 8 dxe5 dxe5 9 Qxd8+', { a: '⩲', r: 'Nisipeanu–Itkis, Romênia 1995', c: 'As brancas têm mais chances depois de 5...Nc6 6.h5.' }],
  ['c24', 't-A', 't', '(t) A', '12 Bb3 b4 13 Ne2 cxd5 14 exd5 Bb7', { a: '∓', r: 'García Palermo–Moreno, Espanha 1994', c: '12.Bb3 b4 13.Ne2 cxd5 deixa as pretas um pouco melhor. (O livro traz 14.cxd5, mas as brancas não têm peão c para isso; é 14.exd5.)' }],
  ['c24', 't-B', 't', '(t) B', '11 Qd2', { a: '=', c: '11.Qd2 teria sido mais sensato, com igualdade.' }],
]

const capitulo = {
  id: 'pirc-outros',
  arquivo: 'pirc-outros',
  nome: 'Pirc — Outros quartos lances (4.Bg5, 4.f3, 4.Be3, 4.Bc4, 4.g3, 4.Be2)',
  fonte: 'Modern Chess Openings — Pirc Defense (pp. 371–372), colunas 19–24',
  base: '1. e4 d6 2. d4 Nf6 3. Nc3 g6',
  corPadrao: 'b',
  ordem: 371,
  grupos: [
    { id: 'bg5', nome: '4.Bg5', colunas: [19] },
    { id: 'f3', nome: '4.f3', colunas: [20] },
    { id: 'be3', nome: '4.Be3', colunas: [21] },
    { id: 'bc4', nome: '4.Bc4', colunas: [22] },
    { id: 'g3', nome: '4.g3', colunas: [23] },
    { id: 'be2', nome: '4.Be2', colunas: [24] },
  ],
}

module.exports = { capitulo, colunas, notas }
