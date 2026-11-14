// Transcrição do MCO 15ª ed. — Gambito da Dama Aceito, 3.Nf3 com 4.Nc3, 3...c5, 3...a6 e 3...b5 (pp. 456–457), colunas 13–18.
// Gerar: node scripts/mco/gerar.cjs gda-c
// Formato: ver gambito-do-rei.cjs. Dicas em gda-c-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.

const B = '1 d4 d5 2 c4 dxc4 3 Nf3'

const colunas = {
  c13: [`${B} Nf6 4 Nc3 a6 5 e4 b5 6 e5 Nd5 7 a4 Nxc3 8 bxc3 Qd5 9 g3 Bb7 10 Bg2 Qd7`, 'nf6', '4.Nc3 a6 5.e4 b5', '⩲',
    'Com 4.Nc3 as brancas preparam e4 sem gastar tempo com e3. Depois de 4...a6 5.e4 b5 6.e5 Nd5 7.a4 Nxc3 8.bxc3 Qd5 as pretas ficam com o peão a mais, mas as brancas têm compensação muito boa no centro e na ala da dama (Peralta–Granda Zúñiga, Barcelona 2006).'],
  c14: [`${B} Nf6 4 Nc3 e6 5 e4 Bb4 6 e5 Nd5 7 Bd2 Nb6 8 Be2 Nc6 9 Be3 O-O 10 Qc2 Be7`, 'nf6', '4...e6 5.e4 Bb4', '∞',
    'Com 4...e6 5.e4 Bb4 as pretas cravam o cavalo e contra-atacam e4. Depois de 6.e5 Nd5 7.Bd2 Nb6 8.Be2 Nc6 9.Be3 O-O as brancas ficam com o centro e as pretas com o peão de c4; as chances são para os dois lados (Schroll–Rabiega, Liga Austríaca 2004).'],
  c15: [`${B} c5 4 d5 Nf6 5 Nc3 e6 6 e4 exd5 7 e5 Nfd7 8 Bg5 Be7 9 Bxe7 Qxe7 10 Nxd5 Qd8`, 'c5', '3...c5 4.d5 Nf6', '⩲',
    'Com 3...c5 as pretas golpeiam d4 de imediato. Depois de 4.d5 Nf6 5.Nc3 e6 6.e4 exd5 7.e5 Nfd7 8.Bg5 as brancas trocam o bispo de e7 e recuperam o peão em d5, com uma pequena vantagem (Halkias–Szymczak, Amsterdã 2006).'],
  c16: [`${B} c5 4 d5 e6 5 Nc3 Ne7 6 e4 exd5 7 exd5 Nf5 8 Bxc4 Nd6 9 O-O Be7 10 Re1 O-O`, 'c5', '4...e6 5...Ne7', '⩲',
    'Com 4...e6 5.Nc3 Ne7 o cavalo vai a f5 e d6 para bloquear o peão passado de d5. Depois de 6.e4 exd5 7.exd5 Nf5 8.Bxc4 Nd6 as brancas ficam com o peão avançado e uma pequena vantagem (Wojtaszek–Lima, Olimpíada de Turim 2006).'],
  c17: [`${B} a6 4 e4 b5 5 a4 Bb7 6 axb5 axb5 7 Rxa8 Bxa8 8 Nc3 e6 9 Nxb5 Bxe4 10 Bxc4 Nf6`, 'a6', '3...a6', '=',
    'Com 3...a6 as pretas preparam ...b5 para manter o peão. Depois de 4.e4 b5 5.a4 Bb7 6.axb5 axb5 7.Rxa8 Bxa8 8.Nc3 e6 9.Nxb5 Bxe4 10.Bxc4 Nf6 o material se equilibra e as chances são quase iguais (Jansen–Struik, Nijmegen 2001).'],
  c18: [`${B} b5 4 a4 c6 5 e3 e6 6 axb5 cxb5 7 b3 Bb4+ 8 Bd2 Bxd2+ 9 Nbxd2 a5 10 bxc4 b4`, 'b5', '3...b5', '⩲',
    'Com 3...b5 as pretas defendem o peão de imediato. Depois de 4.a4 c6 5.e3 e6 6.axb5 cxb5 7.b3 as brancas atacam a cadeia de peões; com 10.bxc4 b4 as pretas ficam com um peão passado em b4, mas as brancas dominam o centro e ficam um pouco melhor (Neishtadt).'],
}

const notas = [
  // Coluna 13
  ['c13', 'a-A', 'a', '(a) A', '4... c6', { c: '4...c6 transpõe para a Defesa Eslava.' }],
  ['c13', 'a-B', 'a', '(a) B', '4... c5 5 d5', { c: '4...c5 5.d5 transpõe para a coluna 15.' }],
  ['c13-a-B', '1', 'a', '(a) B 5.e4', '5 e4 cxd4 6 Qxd4 Qxd4 7 Nxd4 e5 8 Ndb5 Kd8 9 Be3 Be6 10 Bxa7 Nbd7', { a: '∞', c: 'As brancas também podem jogar 5.e4 cxd4 6.Qxd4 Qxd4 7.Nxd4 e5 8.Ndb5 Kd8 9.Be3 Be6 10.Bxa7 Nbd7, indefinido.' }],
  ['c13', 'b', 'b', '(b)', '5 a4 Nc6 6 e4 Bg4 7 Be3 e5 8 dxe5 Nd7 9 Bxc4 Ndxe5', { a: '=', r: 'Euwe', c: 'Impedir 5...b5 é mais seguro, mas menos promissor: 5.a4 Nc6! 6.e4 Bg4 7.Be3 e5 8.dxe5 Nd7! 9.Bxc4 Ndxe5, e as pretas ficam bem (Euwe).' }],
  ['c13-b', '1', 'b', '(b) 6.d5', '6 d5 Nb4 7 e4 e6', { a: '=', c: '6.d5 Nb4 7.e4 e6 é igual.' }],
  ['c13-b', '2', 'b', '(b) 6.e3', '6 e3 Na5 7 Ne5 e6 8 Nxc4 Nxc4 9 Bxc4 c5', { a: '=', c: '6.e3 Na5 7.Ne5 e6 8.Nxc4 Nxc4 9.Bxc4 c5 também é igual.' }],
  ['c13-b', '3', 'b', '(b) 8.d5', '8 d5 Na5', { c: '8.d5 Na5.' }],
  ['c13', 'c', 'c', '(c)', '7 Ng5 e6 8 Qh5 Qd7 9 Be2 Bb7 10 Bf3 g6 11 Qg4 b4 12 Nce4 Nc6 13 Be3 h6', { a: '=', r: 'Pétursson–Zaltsman, Reykjavík 1984', c: '7.Ng5 e6 8.Qh5 Qd7 9.Be2 Bb7 10.Bf3 g6 11.Qg4 b4 12.Nce4 Nc6 13.Be3 h6 é uma posição mais ou menos igual. (O Stockfish discorda: depois de 13...h6 o cavalo de g5 fica sem boas casas, e ele dá cerca de −3 para as pretas.)' }],
  ['c13-c', '1', 'c', '(c) 9.Nxd5', '9 Nxd5 exd5 10 e6 Qe7', { c: '9.Nxd5 exd5 10.e6 Qe7! também é possível.' }],
  ['c13', 'd-A', 'd', '(d) A', '7... Bb7 8 e6 fxe6 9 Be2 Nxc3 10 bxc3 Qd5 11 Ng5 Qxg2 12 Rf1 Bd5 13 axb5 a5 14 Bf4', { a: '±', r: 'Mamedyarov–Najer, Rússia 2005', c: 'As alternativas são menos promissoras: 7...Bb7 8.e6! fxe6 9.Be2 Nxc3 10.bxc3 Qd5 11.Ng5 Qxg2 12.Rf1 Bd5 13.axb5 a5 14.Bf4 é melhor para as brancas.' }],
  ['c13', 'd-B', 'd', '(d) B', '7... c6 8 axb5 Nxc3 9 bxc3 cxb5 10 Ng5 f6 11 Qf3 Ra7 12 e6 Bb7 13 d5 Bxd5 14 Qe3 fxg5 15 Qxa7 g6 16 Bxg5 Bg7 17 Rd1 Bxc3+ 18 Ke2 Qd6 19 Rxd5 Qxe6+ 20 Qe3', { a: '+−', r: 'Grotnes–Murshed, Gausdal 1992', c: '7...c6 8.axb5 Nxc3 9.bxc3 cxb5 10.Ng5 f6 11.Qf3 Ra7 12.e6! Bb7 13.d5 Bxd5 14.Qe3 fxg5 15.Qxa7 g6 16.Bxg5 Bg7, e 17.Rd1! Bxc3+ 18.Ke2 Qd6 19.Rxd5 Qxe6+ 20.Qe3 ganha.' }],
  ['c13', 'd-C', 'd', '(d) C', '7... Nb4 8 Be2 Bf5 9 O-O Nc2 10 Ra2 Nb4 11 Ra3 Nc2 12 Nh4', { a: '±', c: '7...Nb4 8.Be2 Bf5 9.O-O Nc2 10.Ra2 Nb4 11.Ra3 Nc2 12.Nh4 é melhor para as brancas.' }],
  ['c13', 'd-D', 'd', '(d) D', '7... e6 8 axb5 Bb4 9 Qc2 Nb6 10 Qe4 Qd5 11 Qg4 axb5 12 Rxa8 Qxa8 13 Be2 Nd5 14 Qxg7 Rf8 15 O-O Bxc3 16 Ng5 Bb4 17 Bh5 Kd7 18 Nxh7', { a: '±', r: 'Sakaev–Harlov, Budapeste 1996', c: '7...e6 8.axb5 Bb4 9.Qc2 Nb6 10.Qe4 Qd5 11.Qg4 axb5 12.Rxa8 Qxa8 13.Be2! Nd5 14.Qxg7 Rf8 15.O-O Bxc3 16.Ng5! Bb4 17.Bh5 Kd7 18.Nxh7 é melhor para as brancas. (O Stockfish vai além: cerca de +6, vantagem decisiva.)' }],
  ['c13', 'e', 'e', '(e)', '8... Bb7 9 e6 f6 10 Be2 g6 11 O-O Bg7 12 Nh4 Bd5 13 Bf3', { a: '±', r: 'Lobron–Raetsky, Cap d\'Agde 1994', c: '8...Bb7 9.e6! f6 10.Be2 g6 11.O-O Bg7 12.Nh4 Bd5 13.Bf3 é melhor para as brancas.' }],
  ['c13', 'f', 'f', '(f)', '11 Ba3 g6 12 O-O Bg7 13 Re1', { a: '⩲', r: 'Peralta–Granda Zúñiga, Barcelona 2006', c: '11.Ba3 g6 12.O-O Bg7 13.Re1 dá às brancas compensação muito boa pelo peão.' }],
  // Coluna 14
  ['c14', 'g', 'g', '(g)', '5... c5 6 Bxc4 cxd4 7 Nxd4 Bc5 8 Be3 Nbd7 9 Bxe6 fxe6 10 Nxe6 Qa5 11 O-O Bxe3 12 fxe3 Kf7 13 Qb3 Kg6 14 Rf5', { a: '±', r: 'Capablanca–Bogoljubow, Moscou 1925', c: '5...c5 6.Bxc4 cxd4 7.Nxd4 deixa as brancas se desenvolverem rápido. Capablanca–Bogoljubow seguiu 7...Bc5 8.Be3 Nbd7 9.Bxe6!? fxe6 10.Nxe6 Qa5?! 11.O-O Bxe3 12.fxe3 Kf7 13.Qb3 Kg6 14.Rf5, com ataque forte. (O Stockfish confirma: cerca de +5.)' }],
  ['c14-g', '1', 'g', '(g) 10...Qb6', '10... Qb6 11 Nxc5 Nxc5 12 O-O', { a: '⩲', c: '10...Qb6 11.Nxc5 Nxc5 12.O-O é um pouco melhor para as brancas.' }],
  ['c14', 'h', 'h', '(h)', '6 Bg5 c5 7 Bxc4 cxd4 8 Nxd4 Bxc3+ 9 bxc3 Qa5 10 Bb5+ Bd7 11 Bxf6 gxf6 12 Qb3 a6 13 Be2 Nc6 14 O-O', { a: '⩲', r: 'Lobron–Brunner, Alemanha 1994', c: '6.Bg5 transpõe para a Variante Viena do Gambito da Dama Recusado. Depois de 6...c5 7.Bxc4 cxd4 8.Nxd4 Bxc3+ 9.bxc3 Qa5 10.Bb5+ Bd7 11.Bxf6 gxf6 12.Qb3 a6 13.Be2 Nc6 14.O-O as brancas ficam um pouco melhor.' }],
  ['c14', 'i', 'i', '(i)', '7... Bxc3 8 bxc3 b5 9 a4 c6 10 Ng5', { a: '±', r: 'Keres–Apšenieks, Kemeri 1937', c: '7...Bxc3 8.bxc3 b5 9.a4 c6 10.Ng5 dá às brancas um jogo excelente pelo peão.' }],
  ['c14', 'j', 'j', '(j)', '11 a3 Na5 12 Rd1 Nd5 13 Bc1 Bd7', { a: '∞', r: 'Schroll–Rabiega, Liga Austríaca 2004', c: '11.a3 Na5 12.Rd1 Nd5 13.Bc1 Bd7 dá chances aos dois lados.' }],
  // Coluna 15
  ['c15', 'k-A', 'k', '(k) A', '4 e3 cxd4 5 Bxc4 Qc7 6 Qb3 e6 7 exd4 Nc6 8 O-O a6', { a: '=', r: 'Wojtkiewicz–Baburin, San Francisco 1997', c: '4.e3 cxd4 5.Bxc4 Qc7 6.Qb3 e6 7.exd4 Nc6 8.O-O a6 é igual.' }],
  ['c15-k-A', '1', 'k', '(k) A 5.exd4', '5 exd4 Qc7', { a: '=', c: '5.exd4 Qc7 também é igual.' }],
  ['c15', 'k-B', 'k', '(k) B', '4 e4 cxd4 5 Qxd4 Qxd4 6 Nxd4 Bd7 7 Bxc4 Nc6 8 Nxc6 Bxc6 9 f3 e6 10 Be3 Nf6 11 Nd2', { a: '⩲', r: 'Portisch–Seirawan, Reykjavík 1991', c: '4.e4 cxd4 5.Qxd4 Qxd4 6.Nxd4 Bd7 7.Bxc4 Nc6 8.Nxc6 Bxc6 9.f3 e6 10.Be3 Nf6 11.Nd2 dá só uma vantagem mínima às brancas.' }],
  ['c15', 'l', 'l', '(l)', '8 Qxd5 Nb6 9 Qxd8+ Kxd8 10 Bg5+ Be7 11 O-O-O+ Ke8 12 Nb5 Na6 13 Bxe7 Kxe7', { a: '=', r: 'Torre–Seirawan, Londres 1984', c: '8.Qxd5 Nb6! 9.Qxd8+ Kxd8 10.Bg5+ Be7 11.O-O-O+ Ke8 12.Nb5 Na6 13.Bxe7 Kxe7 é igual.' }],
  ['c15', 'm', 'm', '(m)', '11 Bxc4 Nc6 12 Qe2 Qa5+ 13 b4 Nxb4 14 O-O', { a: '⩲', r: 'Halkias–Szymczak, Amsterdã 2006', c: '11.Bxc4 Nc6 12.Qe2 Qa5+ 13.b4 Nxb4 14.O-O é um pouco melhor para as brancas. (O Stockfish vai além: cerca de +4.)' }],
  ['c15-m', '1', 'm', '(m) 12...Nb6', '12... Nb6 13 Nxb6', { a: '⩲', c: '12...Nb6 13.Nxb6 é um pouco melhor para as brancas.' }],
  ['c15-m', '2', 'm', '(m) 13...cxb4', '13... cxb4 14 e6', { c: '13...cxb4?! 14.e6!' }],
  // Coluna 16
  ['c16', 'n', 'n', '(n)', '4... b5 5 e4 Nf6 6 a4 Nxe4 7 axb5 Nd6 8 Nc3', { a: '⩲', r: 'Marshall–Gunsberg, Hannover 1902', c: '4...b5 5.e4 Nf6 6.a4! Nxe4 7.axb5 Nd6 8.Nc3 é um pouco melhor para as brancas.' }],
  ['c16', 'o', 'o', '(o)', '5... exd5 6 Qxd5 Qxd5 7 Nxd5 Bd6 8 Nd2 Ne7 9 Nxc4 Nxd5 10 Nxd6+ Ke7 11 Nxc8+ Rxc8 12 g3 Nb4 13 Bh3 Rd8 14 O-O N8c6 15 Bg5+ f6 16 Be3', { a: '⩲', r: 'Salov–Seirawan, Wijk aan Zee 1992', c: '5...exd5 6.Qxd5 Qxd5 7.Nxd5 Bd6 8.Nd2! Ne7 9.Nxc4 Nxd5 10.Nxd6+ Ke7 11.Nxc8+ Rxc8 12.g3! deixa as brancas com um final favorável.' }],
  ['c16', 'p', 'p', '(p)', '11 Bf1 Bg4 12 h3 Bxf3 13 Qxf3', { a: '⩲', r: 'Wojtaszek–Lima, Olimpíada de Turim 2006', c: '11.Bf1 Bg4 12.h3 Bxf3 13.Qxf3 é um pouco melhor para as brancas.' }],
  // Coluna 17
  ['c17', 'q', 'q', '(q)', '4 e3 Bg4 5 Bxc4 e6 6 Qb3 Bxf3 7 gxf3 b5 8 Be2 Nd7 9 a4', { a: '⩲', r: 'Botvinnik–Smyslov, Campeonato Mundial 1954', c: 'Também é razoável 4.e3 Bg4 5.Bxc4 e6 6.Qb3 Bxf3 7.gxf3 b5 8.Be2 Nd7 9.a4.' }],
  ['c17-q', '1', 'q', '(q) 4...b5', '4... b5 5 b3', { a: '±', c: '4...b5 5.b3 é melhor para as brancas.' }],
  ['c17', 'r-A', 'r', '(r) A', '8... b4 9 Qa4+', { a: '±', c: 'Não 8...b4? 9.Qa4+.' }],
  ['c17', 'r-B', 'r', '(r) B', '8... c6 9 Bg5 h6 10 Bh4 Qb6 11 Be2 e6 12 O-O Be7', { a: '=', c: 'É razoável 8...c6 9.Bg5 h6 10.Bh4 Qb6 11.Be2 e6 12.O-O Be7, com chances mais ou menos iguais.' }],
  ['c17', 's', 's', '(s)', '11 O-O c6 12 Nc3 Bg6 13 Re1 Qc7', { a: '=', r: 'Jansen–Struik, Nijmegen 2001', c: '11.O-O c6 12.Nc3 Bg6 13.Re1 Qc7 dá chances quase iguais.' }],
  // Coluna 18
  ['c18', 't', 't', '(t)', '5... a6 6 axb5 cxb5 7 b3 cxb3 8 Bxb5+', { a: '±', c: '5...a6? 6.axb5 cxb5 7.b3 cxb3 8.Bxb5+ recupera o peão com uma posição excelente.' }],
  ['c18', 'u', 'u', '(u)', '11 Bd3 Nf6 12 g4 Bb7 13 g5 Nfd7 14 Ne4 Qc7 15 c5 O-O 16 Rg1', { a: '⩲', r: 'Neishtadt', c: '11.Bd3 Nf6 12.g4 Bb7 13.g5 Nfd7 14.Ne4 Qc7 15.c5 O-O 16.Rg1 é um pouco melhor para as brancas (Neishtadt).' }],
]

const capitulo = {
  id: 'gda-c',
  arquivo: 'gda-c',
  nome: 'Gambito da Dama Aceito — 4.Nc3, 3...c5, 3...a6 e 3...b5',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Accepted (pp. 456–457), colunas 13–18',
  base: '1. d4 d5 2. c4 dxc4',
  corPadrao: 'b',
  ordem: 456,
  grupos: [
    { id: 'nf6', nome: '3...Nf6 4.Nc3', colunas: [13, 14] },
    { id: 'c5', nome: '3...c5 4.d5', colunas: [15, 16] },
    { id: 'a6', nome: '3...a6', colunas: [17] },
    { id: 'b5', nome: '3...b5', colunas: [18] },
  ],
}

module.exports = { capitulo, colunas, notas }
