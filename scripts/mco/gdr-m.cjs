// Transcrição do MCO 15ª ed. — Gambito da Dama Recusado, Variante Ragozin (pp. 426–428), colunas 73–78.
// Gerar: node scripts/mco/gerar.cjs gdr-m
// Formato: ver gambito-do-rei.cjs. Dicas em gdr-m-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// A coluna 73 fica sem avaliação: as notas (f) e (g) tratam de alternativas, não da continuação.
// Na nota (bb) o livro escreve 14 Rab1; como a outra torre não chega a b1, o lance é 14 Rb1.

const B = '1 d4 d5 2 c4 e6 3 Nc3 Nf6 4 Nf3 Bb4'
const V = `${B} 5 Bg5 dxc4 6 e4 c5`
const X = `${B} 5 cxd5 exd5 6 Bg5 Nbd7`

const colunas = {
  c73: [`${V} 7 Bxc4 cxd4 8 Nxd4 Bxc3+ 9 bxc3 Qa5 10 Bb5+ Bd7 11 Bxf6 gxf6 12 Qb3 a6`, 'viena', 'Viena: 10.Bb5+ Bd7', null,
    'A Ragozin mistura o Gambito da Dama com a Nimzo-Índia: as pretas cravam o cavalo de c3 com 4...Bb4. Com 5.Bg5 dxc4 6.e4 c5 chega-se à Variante Viena, muito aguda: depois de 7.Bxc4 cxd4 8.Nxd4 Bxc3+ 9.bxc3 Qa5 as pretas atacam o peão c3 e as brancas jogam pelo desenvolvimento.'],
  c74: [`${V} 7 Bxc4 cxd4 8 Nxd4 Bxc3+ 9 bxc3 Qa5 10 Bb5+ Nbd7 11 Bxf6 Qxc3+ 12 Kf1 gxf6`, 'viena', '10...Nbd7', '=',
    'Com 10...Nbd7 as pretas ganham o peão c3 com xeque e tiram o roque das brancas. O rei preto também fica no centro, e o jogo é mais ou menos igual (San Segundo–Wells, Plovdiv 2003).'],
  c75: [`${V} 7 e5 cxd4 8 Qa4+ Nc6 9 O-O-O Bd7 10 Ne4 Be7 11 exf6 gxf6 12 Bh4 Rc8`, 'viena', '7.e5', '=',
    'Com 7.e5 as brancas atacam o cavalo de f6 em vez de recuperar o peão. Depois de 7...cxd4 8.Qa4+ Nc6 9.O-O-O Bd7 10.Ne4 o jogo fica caótico, mas mais ou menos igual (Babula–Ribli, Bundesliga 2006).'],
  c76: [`${X} 7 Qc2 h6 8 Bh4 c5 9 e3 c4 10 Be2 Qa5 11 Nd2 O-O 12 Bf3 Bxc3`, 'cxd5', '5.cxd5 exd5 6.Bg5 7.Qc2', '±',
    'Com 5.cxd5 exd5 6.Bg5 chega-se a uma Variante das Trocas em que o bispo preto está em b4. Depois de 6...Nbd7 7.Qc2 h6 8.Bh4 c5 9.e3 c4 as pretas ganham espaço na ala da dama, mas as brancas ficaram com boa vantagem (Kransenkow–García Ilundain, Las Palmas 1993).'],
  c77: [`${X} 7 e3 c5 8 Bd3 c4 9 Bf5 Qa5 10 Qc2 O-O 11 O-O Re8 12 Nd2 g6`, 'cxd5', '7.e3 c5', '=',
    'Com 7.e3 c5 8.Bd3 c4 as pretas ganham espaço e o bispo branco vai a f5. Depois de 9.Bf5 Qa5 10.Qc2 O-O 11.O-O Re8 12.Nd2 g6 o jogo fica equilibrado (Kamsky–J. Polgar, Dos Hermanas 1995).'],
  c78: [`${B} 5 Qa4+ Nc6 6 Ne5 Bd7 7 Nxd7 Qxd7 8 e3 Ne4 9 Qc2 Nxc3 10 bxc3 Be7 11 cxd5 exd5 12 Bd3 h6`, 'qa4', '5.Qa4+', '∞',
    'Com 5.Qa4+ Nc6 6.Ne5 as brancas trocam o bispo de c8. Depois de 8.e3 Ne4 9.Qc2 Nxc3 10.bxc3 as pretas ficam com controle de c4; as duas partes têm chances (Karpov–Lautier, Baden-Baden 1992).'],
}

const notas = [
  // Coluna 73
  ['c73', 'a', 'a', '(a)', '5... h6 6 Bxf6 Qxf6 7 e3 O-O 8 Qb3 Bxc3+ 9 Qxc3 c6 10 Be2', { a: '⩲', r: 'Bacrot–Zhao Xue, Cap d\'Agde 2006', c: '5...h6 6.Bxf6 Qxf6 7.e3 O-O 8.Qb3 Bxc3+ 9.Qxc3 c6 10.Be2 dá vantagem às brancas.' }],
  ['c73', 'b', 'b', '(b)', '6 Qa4+ Nc6 7 e4 Bd7 8 Qc2 h6 9 Bd2 b5 10 Nxb5 Bxd2+ 11 Nxd2 a6 12 Na3 Nxd4', { a: '=', r: 'Lipnitski', c: '6.Qa4+ Nc6 7.e4 Bd7 8.Qc2 h6 9.Bd2 b5 10.Nxb5 Bxd2+ é igual depois de 11.Nxd2 a6 12.Na3 Nxd4 (Lipnitski).' }],
  ['c73', 'c', 'c', '(c)', '6... h6 7 Bxf6 Qxf6 8 Bxc4 O-O 9 O-O Rd8 10 Qe2 Nc6 11 e5', { a: '±', r: 'Chernin–Frias, Saint John 1988', c: '6...h6 7.Bxf6 Qxf6 8.Bxc4 O-O 9.O-O Rd8 10.Qe2 Nc6 11.e5 é melhor para as brancas.' }],
  ['c73', 'd-A', 'd', '(d) A', '8... Qa5 9 Bd2 Qc5 10 Bb5+ Bd7 11 Nb3', { a: '⩲', r: 'Dautov–Levin, URSS 1987', c: '8...Qa5 9.Bd2 Qc5 10.Bb5+ Bd7 11.Nb3 é um pouco melhor para as brancas.' }],
  ['c73', 'd-B', 'd', '(d) B', '8... Qc7 9 Qb3 Bxc3+ 10 Qxc3 Nxe4 11 Nb5 Qc5 12 Qxg7', { a: '±', r: 'Averbakh–Estrin, Moscou 1967', c: '8...Qc7 9.Qb3 Bxc3+ 10.Qxc3 Nxe4 11.Nb5 Qc5 12.Qxg7 foi melhor para as brancas. (O Stockfish vai além: dá cerca de +5, vantagem decisiva.)' }],
  ['c73', 'e-A', 'e', '(e) A', '10 Nb5 Nxe4 11 Qd4 O-O 12 Qxe4 a6 13 Be7 axb5', { a: '=', r: 'Karpov–Timman, match 1993 (8ª partida)', c: '10.Nb5 foi muito testado no match Karpov–Timman de 1993. Depois de 10...Nxe4, nem 11.Qd4 O-O 12.Qxe4 a6 13.Be7 axb5 parece dar vantagem às brancas.' }],
  ['c73-e-A', '1', 'e', '(e) A 11.Bf4', '11 Bf4 O-O 12 O-O Nd7', { a: '=', c: 'Nem 11.Bf4 O-O 12.O-O Nd7 dá vantagem às brancas.' }],
  ['c73', 'e-B', 'e', '(e) B', '10 Bxf6 Qxc3+ 11 Kf1 gxf6 12 Rc1 Qa5 13 h4 Ke7 14 Rh3 Nc6', { a: '∞', r: 'Åkesson–Landa, Bad Wiessee 2005', c: '10.Bxf6 Qxc3+ 11.Kf1 gxf6 12.Rc1 Qa5 13.h4 Ke7 14.Rh3 Nc6 é indefinido.' }],
  ['c73', 'f', 'f', '(f)', '12 Bxd7+ Nxd7 13 O-O a6 14 Rb1 Qc7 15 Qd2 Rc8 16 Rfd1 Nc5 17 Qh6 Qe5 18 f4 Qxe4 19 f5 Rg8 20 Rb2 Rd8 21 Qxf6 e5 22 Kf1 Qf4+ 23 Kg1 Qe4 24 Kf1', { a: '=', r: 'Akopian–Landa, Port Erin 2006', c: 'Ultimamente é popular 12.Bxd7+ Nxd7 13.O-O a6 14.Rb1 Qc7 15.Qd2, mas as pretas parecem estar bem: em Akopian–Landa os jogadores repetiram lances.' }],
  ['c73', 'g', 'g', '(g)', '12... O-O 13 O-O Bxb5 14 Nxb5 Nc6 15 c4', { a: '⩲', r: 'Vallejo Pons–Topalov, Morelia/Linares 2006', c: '12...O-O 13.O-O Bxb5 14.Nxb5 Nc6 15.c4 dá uma pequena vantagem às brancas.' }],
  // Coluna 74
  ['c74', 'h', 'h', '(h)', '13 h4 a6 14 Rh3 Qa5 15 Be2 Ne5 16 Qb3 b5 17 Rd1 Bd7 18 f4 Nc4 19 Bxc4 bxc4 20 Qb7 Rd8 21 Nc6 Bxc6 22 Qxc6+', { a: '=', r: 'San Segundo–Wells, Plovdiv 2003 (empate)', c: 'Depois de 13.h4 a6 14.Rh3 Qa5 15.Be2 Ne5 16.Qb3 b5 a partida terminou empatada.' }],
  ['c74-h', '1', 'h', '(h) 13...Ke7', '13... Ke7 14 Rh3 Qa5 15 Rb1 Rd8 16 Qc1', { a: '±', r: 'Dzhandzhava–Maliutin, URSS 1991', c: '13...Ke7 14.Rh3 Qa5 15.Rb1 Rd8 16.Qc1 é melhor para as brancas.' }],
  // Coluna 75
  ['c75', 'i', 'i', '(i)', '8 Nxd4 Qa5 9 exf6 Bxc3+ 10 bxc3 Qxg5 11 fxg7 Qxg7 12 Qd2', { a: '⩲', r: 'Shulman–van Wely, Foxwoods 2006', c: '8.Nxd4 Qa5 9.exf6 Bxc3+ 10.bxc3 Qxg5 11.fxg7 Qxg7 12.Qd2 é um pouco melhor para as brancas.' }],
  ['c75', 'j', 'j', '(j)', '9... h6 10 exf6 hxg5 11 fxg7 Rg8 12 Nxd4 Bxc3 13 bxc3 Qa5 14 Qxa5', { a: '⩲', r: 'Timman–Karpov, Amsterdã 1987', c: '9...h6 10.exf6 hxg5 11.fxg7 Rg8 12.Nxd4 Bxc3 13.bxc3 Qa5 14.Qxa5 é um pouco melhor para as brancas.' }],
  ['c75', 'k', 'k', '(k)', '13 Kb1 Na5 14 Qc2 e5 15 Nxd4 exd4 16 Rxd4 Qb6 17 Rd5 Be6 18 Rh5 Bg4 19 Qa4+ Nc6 20 Rb5 Qa6 21 Qxa6 bxa6', { a: '=', r: 'Babula–Ribli, Bundesliga 2006', c: 'Depois de 13.Kb1 Na5 14.Qc2 e5 15.Nxd4 exd4 16.Rxd4 Qb6 o jogo terminou num final mais ou menos igual.' }],
  // Coluna 76
  ['c76', 'l', 'l', '(l)', '5 Qb3 c5 6 dxc5 Nc6 7 e3 O-O 8 Be2 Qe7', { a: '⩲', r: 'Skembris–Barle, Debrecen 1992', c: '5.Qb3 c5 6.dxc5 Nc6 7.e3 O-O 8.Be2 Qe7 deu uma pequena vantagem às brancas.' }],
  ['c76-l', '1', 'l', '(l) 7...Qa5', '7... Qa5', { r: 'Skembris', c: 'Skembris sugere 7...Qa5.' }],
  ['c76', 'm', 'm', '(m)', '6... h6 7 Bh4 g5 8 Bg3 Ne4 9 Nd2 Nxc3 10 bxc3 Bxc3 11 Rc1 Ba5 12 h4 g4', { a: '∞', r: 'Khalifman–Serper, São Petersburgo 1994', c: '6...h6 7.Bh4 g5 8.Bg3 Ne4 9.Nd2 Nxc3 10.bxc3 Bxc3 11.Rc1 Ba5 12.h4 g4 é uma faca de dois gumes.' }],
  ['c76-m', '1', 'm', '(m) 11...Bb2', '11... Bb2 12 Bxc7 Qd7 13 Be5', { a: '∞', r: 'Khalifman', c: '11...Bb2 12.Bxc7 Qd7 13.Be5 é indefinido (Khalifman).' }],
  ['c76', 'n', 'n', '(n)', '7 Rc1 h6 8 Bh4 c5 9 dxc5 Qa5 10 Qd4 O-O 11 a3 Bxc5 12 Qd2', { a: '⩲', r: 'Epishin–Serper, Moscou 1992', c: '7.Rc1 h6 8.Bh4 (8.Bxf6 é o habitual) 8...c5 9.dxc5 Qa5 10.Qd4 O-O 11.a3 Bxc5 12.Qd2 é uma pequena vantagem para as brancas.' }],
  ['c76', 'o', 'o', '(o)', '7... c5 8 dxc5 h6 9 Bd2 Bxc5 10 e3 O-O 11 Bd3', { a: '⩲', r: 'Dreev–Zvjaginsev, Poikovsky 2006', c: '7...c5 8.dxc5 h6 9.Bd2 Bxc5 10.e3 O-O 11.Bd3 é um pouco melhor para as brancas.' }],
  ['c76', 'p', 'p', '(p)', '8... g5 9 Bg3 Ne4 10 e3 Nb6 11 Bd3 Bf5 12 Nd2', { a: '⩲', r: 'Sánchez Jiménez–Campos Moreno, Linares 1991', c: '8...g5 é violento demais: 9.Bg3 Ne4 10.e3 Nb6 11.Bd3 Bf5 12.Nd2 é um pouco melhor para as brancas.' }],
  ['c76', 'q', 'q', '(q)', '11 O-O Bxc3 12 bxc3 Ne4 13 Rfc1 Nb6 14 a4', { a: '⩲', r: 'Kramnik–Lautier, Cannes 1993', c: '11.Nd2 é uma melhoria sobre 11.O-O Bxc3 12.bxc3 Ne4 13.Rfc1 Nb6 14.a4, que foi um pouco favorável às brancas.' }],
  ['c76', 'r', 'r', '(r)', '13 bxc3 Qa3 14 O-O b5 15 Rfb1', { a: '±', r: 'Kransenkow–García Ilundain, Las Palmas 1993', c: 'As brancas tinham boa vantagem depois de 13.bxc3 Qa3 14.O-O b5 15.Rfb1.' }],
  // Coluna 77
  ['c77', 's', 's', '(s)', '8 Be2 Qa5 9 O-O O-O 10 Nd2 Bxc3 11 bxc3 Qxc3 12 Rc1 Qa3 13 dxc5 Qxa2', { a: '∓', r: 'Morozevich–Aronian, Morelia/Linares 2007', c: '8.Be2 Qa5 9.O-O O-O 10.Nd2 Bxc3 11.bxc3 Qxc3 12.Rc1 Qa3 13.dxc5 Qxa2 deu certo para as pretas.' }],
  ['c77', 't', 't', '(t)', '9 Bxf6 Qxf6 10 Bc2 Nb6 11 Ba4+ Kf8 12 Ne5 Qg5 13 O-O Bh3 14 Qf3 Qxg2+', { a: '=', r: 'Naumkin–Landa, Capelle-la-Grande 2007', c: '9.Bxf6 Qxf6 10.Bc2 Nb6 11.Ba4+ Kf8 12.Ne5 Qg5 13.O-O Bh3 14.Qf3 Qxg2+ levou a um final mais ou menos equilibrado.' }],
  ['c77', 'u', 'u', '(u)', '12 Bh4 g6 13 Bh3 Bxc3 14 bxc3', { a: '=', r: 'Ubilava–Serper, Manila 1992', c: '12.Bh4 g6 13.Bh3 Bxc3 14.bxc3 é igual.' }],
  ['c77-u', '1', 'u', '(u) 13...Ne4', '13... Ne4 14 Bxd7 Bxd7 15 Ne5 Bxc3 16 Nxd7 Qb5 17 bxc3 Qxd7', { a: '⩲', r: 'F. Levin–G. Georgadze, Belgrado 1992', c: '13...Ne4 14.Bxd7 Bxd7 15.Ne5 Bxc3 16.Nxd7 Qb5 17.bxc3 Qxd7 é um pouco melhor para as brancas.' }],
  ['c77', 'v', 'v', '(v)', '13 Bxd7 Nxd7 14 f3 Nb6 15 Bf4 Bf8 16 g4 Bd7', { a: '∞', r: 'Hebden–Winants, Ostende 1992', c: '13.Bxd7 Nxd7. Agora, contra 14.f3 Nb6 15.Bf4 Bf8 de Hebden–Winants, o melhor seria 16.g4 Bd7, indefinido.' }],
  ['c77-v', '1', 'v', '(v) 15...Bd7', '15... Bd7 16 e4 Rac8', { a: '=', r: 'P. Cramling–Blatný, Manila 1992', c: '15...Bd7 16.e4 Rac8 foi equilibrado.' }],
  ['c77-v', '2', 'v', '(v) 14.Rfe1', '14 Rfe1 Nb6 15 f3 Na4', { a: '=', r: 'Kamsky–J. Polgar, Dos Hermanas 1995', c: '14.Rfe1 Nb6 15.f3 Na4 é igual.' }],
  // Coluna 78
  ['c78', 'w-A', 'w', '(w) A', '6 cxd5 exd5 7 Bg5 h6 8 Bxf6 Qxf6 9 e3 O-O 10 Be2 Be6 11 O-O a6 12 Rfc1 Bd6 13 Qd1 Ne7 14 Na4 b6 15 b4 g5 16 Nb2 Ng6', { a: '∞', r: 'Beliavsky–Lautier, Biel 1992', c: '6.cxd5 exd5 7.Bg5 h6 8.Bxf6 Qxf6 9.e3 O-O 10.Be2 Be6 11.O-O a6 foi indefinido.' }],
  ['c78-w-A', '1', 'w', '(w) A 14...Rad8', '14... Rad8 15 Nc5 Bc8 16 Qb3', { a: '⩲', r: 'Lautier', c: '14...Rad8 15.Nc5 Bc8 16.Qb3 é um pouco melhor para as brancas (Lautier).' }],
  ['c78-w-A', '2', 'w', '(w) A 15.Nc3', '15 Nc3', { c: '15.Nc3 é o habitual.' }],
  ['c78', 'w-B', 'w', '(w) B', '6 Bg5 h6 7 Bxf6 Qxf6 8 e3 O-O 9 Rc1 Qg6 10 Qc2', { a: '⩲', r: 'Bacrot–Aronian, Wijk aan Zee 2006', c: '6.Bg5 h6 7.Bxf6 Qxf6 8.e3 O-O 9.Rc1 Qg6 10.Qc2 deixou as brancas um pouco melhor.' }],
  ['c78', 'x', 'x', '(x)', '8 a3 Bxc3+ 9 bxc3 O-O 10 e3 a6 11 Qc2 Na5 12 cxd5 exd5', { a: '=', r: 'Porreca–Milev, Zagreb 1955', c: '8.a3 Bxc3+ 9.bxc3 O-O 10.e3 a6 11.Qc2 Na5 12.cxd5 exd5 é igual.' }],
  ['c78', 'y', 'y', '(y)', '8... e5 9 dxe5 d4 10 a3 Bxc3+ 11 bxc3 dxe3 12 Bxe3 Ng4', { a: '∓', r: 'Spielmann–Fine, Zandvoort 1936', c: '8...e5 9.dxe5 d4 10.a3 Bxc3+ 11.bxc3 dxe3 12.Bxe3 Ng4 é considerado bom para as pretas.' }],
  ['c78', 'z', 'z', '(z)', '9... Bxc3+ 10 bxc3 Na5 11 cxd5 exd5 12 Bd3 Nd6', { a: '=', r: 'Karpov', c: 'Karpov menciona 9...Bxc3+ 10.bxc3 Na5 11.cxd5 exd5 12.Bd3 Nd6, com controle de c4.' }],
  ['c78', 'aa', 'aa', '(aa)', '11 Rb1', { r: 'Karpov', c: 'Outras possibilidades são 11.Rb1 ou 11.c4 (Karpov).' }],
  ['c78', 'bb', 'bb', '(bb)', '13 Qa4 a6 14 Rb1 Ra7 15 c4 b5 16 cxb5 axb5 17 Qxb5 O-O', { a: '∞', r: 'Karpov–Lautier, Baden-Baden 1992', c: 'Depois de 13.Qa4 a6 14.Rb1 Ra7 15.c4 b5 16.cxb5 axb5 17.Qxb5 O-O as duas partes têm chances.' }],
  ['c78-bb', '1', 'bb', '(bb) 13...O-O', '13... O-O 14 Rb1 Rab8 15 c4', { a: '⩲', c: '13...O-O 14.Rb1 Rab8 15.c4 é um pouco melhor para as brancas.' }],
]

const capitulo = {
  id: 'gdr-m',
  arquivo: 'gdr-m',
  nome: 'Gambito da Dama Recusado — Variante Ragozin (4.Nf3 Bb4)',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Declined (pp. 426–428), colunas 73–78',
  base: '1. d4 d5 2. c4 e6',
  corPadrao: 'b',
  ordem: 426,
  grupos: [
    { id: 'viena', nome: '5.Bg5 dxc4 6.e4 c5 (Viena)', colunas: [73, 74, 75] },
    { id: 'cxd5', nome: '5.cxd5 exd5 6.Bg5', colunas: [76, 77] },
    { id: 'qa4', nome: '5.Qa4+', colunas: [78] },
  ],
}

module.exports = { capitulo, colunas, notas }
