// Transcrição do MCO 15ª ed. — Semi-Eslava, 5.Bg5: Moscou (5...h6) e Anti-Moscou/Botvinnik (5...dxc4) (pp. 476–477), colunas 37–42.
// Gerar: node scripts/mco/gerar.cjs eslava-g
// Formato: ver gambito-do-rei.cjs. Dicas em eslava-g-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Correções: na nota (p) A o livro traz 18...Rf4, impossível (nenhuma torre preta chega a f4); é 18...Bf4.
// Na nota (r) o livro escreve 19...Qe2, que é captura do bispo (Qxe2); faltavam xeques em 17.Qa4+ (p B) e 20.Qxh4+ (r).
// Stockfish discorda em (l), (n), (o) 14.Nc3 e (r); anotado nas notas.

const B = '1 d4 d5 2 c4 c6 3 Nf3 Nf6 4 Nc3 e6 5 Bg5'
const H = `${B} h6 6 Bxf6 Qxf6`
const D = `${B} dxc4 6 e4 b5`
const A = `${D} 7 a4 Bb7`
const E = `${D} 7 e5 h6 8 Bh4 g5 9 exf6 gxh4 10 Ne5 Qxf6`

const colunas = {
  c37: [`${H} 7 e3 Nd7 8 Bd3 dxc4 9 Bxc4 g6 10 O-O Bg7 11 b4 O-O 12 Rc1 Qe7`, 'h6', '5...h6 6.Bxf6 Qxf6 7.e3', '=',
    'Com 5...h6 6.Bxf6 Qxf6 (a Variante Moscou) as pretas ficam com o par de bispos, e as brancas com vantagem de desenvolvimento. Depois de 7.e3 Nd7 8.Bd3 dxc4 9.Bxc4 g6 10.O-O Bg7 11.b4 O-O 12.Rc1 Qe7 o jogo é igual (Ivanchuk–Karjakin, Ucrânia 2006).'],
  c38: [`${H} 7 g3 Nd7 8 Bg2 dxc4 9 O-O Be7 10 e3 O-O 11 Nd2 Nb6 12 f4 Qf5`, 'h6', '7.g3', '=',
    'Com 7.g3 Nd7 8.Bg2 dxc4 9.O-O Be7 10.e3 O-O 11.Nd2 Nb6 12.f4 Qf5 o bispo de g2 pressiona a grande diagonal, mas o jogo é igual (Zontakh–Borovikov, Polônia 2001).'],
  c39: [`${A} 8 e5 h6 9 Bh4 g5 10 exf6 gxh4 11 axb5 cxb5 12 Nxb5 Bb4+`, 'dxc4', '5...dxc4 6.e4 b5 7.a4 Bb7 8.e5 9.Bh4', '∓',
    'Com 5...dxc4 6.e4 b5 as pretas ficam com o peão de c4. Depois de 7.a4 Bb7 8.e5?! h6 9.Bh4 g5 10.exf6 gxh4 11.axb5 cxb5 12.Nxb5 Bb4+ as pretas ficam claramente melhor.'],
  c40: [`${A} 8 e5 h6 9 Bxf6 gxf6 10 axb5 cxb5 11 Nxb5 Qb6 12 Qa4 Nc6`, 'dxc4', '9.Bxf6', '∓',
    'Com 9.Bxf6 gxf6 10.axb5 cxb5 11.Nxb5 Qb6 12.Qa4 Nc6 as brancas recuperam o peão de b5, mas as pretas ficam melhor (Ilić–Lukacs, Vrnjačka Banja 1987).'],
  c41: [`${E} 11 a4 c5 12 Be2 cxd4`, 'dxc4', '7.e5 (Botvinnik) 11.a4', '∓',
    'Com 7.e5 h6 8.Bh4 g5 9.exf6 gxh4 10.Ne5 Qxf6 o jogo fica muito agudo: as pretas têm peões a mais, as brancas atividade. Depois de 11.a4 c5 12.Be2 cxd4 as complicações são enormes, mas as pretas devem estar melhor (Goldin–Shabalov, Foxwoods 2005).'],
  c42: [`${E} 11 Be2 Nd7 12 Nxc6 Bb7`, 'dxc4', '11.Be2', '=',
    'Com 11.Be2 Nd7 12.Nxc6 Bb7 o cavalo branco entra em c6, e as pretas o atacam; o jogo é igual (Kravtsov–S. Ivanov, Campeonato Russo por equipes 1999).'],
}

const notas = [
  // Coluna 37
  ['c37', 'a-A', 'a', '(a) A', '5 Qb3 dxc4 6 Qxc4 b5 7 Qd3 a6 8 Bg5 c5 9 e3 Nbd7 10 Be2 Bb7 11 O-O Be7 12 dxc5 Nxc5', { a: '∓', r: 'Andersson–Beliavsky, Pärnu 1997', c: '5.Qb3 dxc4 6.Qxc4 b5 7.Qd3 a6 8.Bg5 c5 9.e3 Nbd7 10.Be2 Bb7 11.O-O Be7 12.dxc5 Nxc5 é melhor para as pretas.' }],
  ['c37', 'a-B', 'a', '(a) B', '5 g3 dxc4 6 Bg2 Nbd7 7 O-O Be7 8 e4 O-O 9 a4 b6 10 Qe2 Ba6 11 Rd1 Rc8 12 Bf4 Re8 13 h3 Bb4 14 g4 Bxc3 15 bxc3 Qe7 16 Bg5 h6 17 Bc1 Nh7', { a: '±', r: 'Kopec–Bisguier, US Open 1987', c: '5.g3 dxc4 6.Bg2 Nbd7 7.O-O Be7 8.e4 O-O 9.a4 b6 10.Qe2 Ba6 11.Rd1 Rc8 12.Bf4 Re8 13.h3 Bb4 14.g4 Bxc3 15.bxc3 Qe7 16.Bg5 h6 17.Bc1 Nh7 é melhor para as brancas.' }],
  ['c37', 'b', 'b', '(b)', '6 Bh4 dxc4 7 e4 g5 8 Bg3 b5 9 Be2 Bb7 10 h4 g4 11 Ne5 Nbd7 12 Bxg4 Rg8 13 Nxd7 Qxd7 14 Bf3 O-O-O 15 Bf4 a6 16 a4 Bb4 17 e5 c5 18 exf6 cxd4 19 axb5 Qxb5 20 Qc2 Bxf3 21 gxf3 dxc3 22 bxc3', { a: '∞', r: 'Gelfand–Kazimdzhanov, match de Candidatos 2007 (empate)', c: 'Uma alternativa aguda é 6.Bh4 dxc4 7.e4 g5 8.Bg3 b5 9.Be2 Bb7 10.h4 g4 11.Ne5 Nbd7 12.Bxg4 Rg8 13.Nxd7 Qxd7 14.Bf3 O-O-O 15.Bf4 a6 16.a4 Bb4 17.e5 c5 18.exf6 cxd4 19.axb5 Qxb5 20.Qc2 Bxf3 21.gxf3 dxc3 22.bxc3, uma posição confusa que terminou empatada.' }],
  ['c37-b', '1', 'b', '(b) 7...b5', '7... b5', { c: '7...b5 transpõe para as colunas 39–42.' }],
  ['c37-b', '2', 'b', '(b) 9...Bb4', '9... Bb4 10 O-O Bxc3 11 bxc3 Nxe4 12 Ne5 Nd7 13 Bh5 O-O 14 Nxf7 Rxf7 15 Bxf7+ Kxf7 16 Qc2', { a: '∞', r: 'Yusupov–Akopian, Úbeda 1997', c: '9...Bb4 10.O-O Bxc3 11.bxc3 Nxe4 12.Ne5!? Nd7 13.Bh5 O-O 14.Nxf7!? Rxf7 15.Bxf7+ Kxf7 16.Qc2, posição pouco clara.' }],
  ['c37', 'c-A', 'c', '(c) A', '8 Rc1 g6 9 Bd3 dxc4 10 Bxc4 Bg7 11 O-O O-O 12 Qc2 Kh7 13 Bb3 Qe7 14 Rfd1 e5 15 d5 Nb6 16 d6 Qe8 17 Ne4 Bf5 18 Nfd2 Nd7 19 Qc4 Be6 20 Qb4', { a: '=', r: 'Hebden–Ashton, Hastings 2006', c: '8.Rc1 g6 9.Bd3 dxc4 10.Bxc4 Bg7 11.O-O O-O 12.Qc2 Kh7 13.Bb3 Qe7 14.Rfd1 e5 15.d5 Nb6 16.d6 Qe8 17.Ne4 Bf5 18.Nfd2 Nd7 19.Qc4 Be6 20.Qb4 é igual.' }],
  ['c37', 'c-B', 'c', '(c) B', '8 Qc2 g6 9 cxd5 exd5 10 Bd3 Bg7 11 b4 Qd6 12 Rb1 O-O 13 O-O a5 14 bxa5 Rxa5', { a: '=', r: 'Halkias–Hoffman, Bad Wiessee 2006', c: '8.Qc2 g6 9.cxd5 exd5 10.Bd3 Bg7 11.b4 Qd6 12.Rb1 O-O 13.O-O a5 14.bxa5 Rxa5 é igual.' }],
  ['c37', 'd', 'd', '(d)', '8... Bd6 9 O-O Qe7 10 c5 Bc7 11 e4 dxe4 12 Bxe4 O-O 13 b4 Rd8 14 Re1 Nf6 15 Bc2 b6 16 Ba4', { a: '±', r: 'Polugaevsky–Mecking, match 1977', c: '8...Bd6 9.O-O Qe7 10.c5 Bc7 11.e4 dxe4 12.Bxe4 O-O 13.b4 Rd8 14.Re1 Nf6 15.Bc2 b6 16.Ba4! é melhor para as brancas.' }],
  ['c37', 'e', 'e', '(e)', '13 Qb3 b6 14 b5 Bb7 15 bxc6 Bxc6 16 Rfd1 Rfd8 17 Qb1 Bb7 18 Bd3 Rac8 19 Be4 Nf6 20 Bxb7 Qxb7', { a: '=', r: 'Ivanchuk–Karjakin, Ucrânia 2006', c: '13.Qb3 b6 14.b5 Bb7 15.bxc6 Bxc6 16.Rfd1 Rfd8 17.Qb1 Bb7 18.Bd3 Rac8 19.Be4 Nf6 20.Bxb7 Qxb7 é igual.' }],
  // Coluna 38
  ['c38', 'f-A', 'f', '(f) A', '7 Qc2 Nd7 8 e4 dxe4 9 Qxe4 Bb4 10 Bd3 Qe7 11 O-O Nf6 12 Qh4 c5', { a: '=', r: 'Murey–Mednis, Amsterdã 1987', c: '7.Qc2 Nd7 8.e4 dxe4 9.Qxe4 Bb4! 10.Bd3 Qe7 11.O-O Nf6 12.Qh4 c5 é igual.' }],
  ['c38', 'f-B', 'f', '(f) B', '7 a3 dxc4 8 Ne5 c5 9 Nxc4 cxd4 10 Nb5 Qd8 11 Qxd4 Qxd4 12 Nxd4 Bd7 13 g3 Bc5 14 Nb3 Be7 15 Nca5 Bc6 16 Nxc6 Nxc6 17 Bg2 Rc8', { a: '=', r: 'Kasparov–Sveshnikov, Campeonato da URSS 1981', c: '7.a3 dxc4 8.Ne5 c5 9.Nxc4 cxd4 10.Nb5 Qd8 11.Qxd4 Qxd4 12.Nxd4 Bd7 13.g3 Bc5 14.Nb3 Be7 15.Nca5 Bc6 16.Nxc6 Nxc6 17.Bg2 Rc8 é igual.' }],
  ['c38', 'f-C', 'f', '(f) C', '7 e4 dxe4 8 Nxe4 Bb4+ 9 Ke2 Qf4 10 Qd3 O-O 11 g3 Qc7 12 Bg2 Be7 13 Rhe1 Nd7 14 Kf1 e5', { a: '∓', c: '7.e4 dxe4 8.Nxe4 Bb4+ 9.Ke2 Qf4 10.Qd3 O-O 11.g3 Qc7 12.Bg2 Be7 13.Rhe1 Nd7 14.Kf1 e5 é melhor para as pretas.' }],
  ['c38', 'g', 'g', '(g)', '11 Qe2 e5 12 Qxc4 exd4 13 Nxd4 Re8 14 Rfd1 Bf8 15 Rac1 Qg6 16 h3', { a: '±', r: 'Oms Pallisé–Granda Zúñiga, Tarragona 2006', c: '11.Qe2 e5 12.Qxc4 exd4 13.Nxd4 Re8 14.Rfd1 Bf8 15.Rac1 Qg6 16.h3 é melhor para as brancas.' }],
  ['c38', 'h', 'h', '(h)', '13 Be4 Qa5 14 Qe2 c5 15 d5 exd5 16 Nxd5 Nxd5 17 Bxd5 Bg4 18 Qxg4 Qxd2', { a: '=', r: 'A. Zontakh–Borovikov, Polônia 2001', c: '13.Be4 Qa5 14.Qe2 c5 15.d5 exd5 16.Nxd5 Nxd5 17.Bxd5 Bg4 18.Qxg4 Qxd2 é igual.' }],
  // Coluna 39
  ['c39', 'i-A', 'i', '(i) A', '6 a4 Bb4 7 e4 Bxc3+ 8 bxc3 Qa5 9 e5 Ne4 10 Bd2 Qd5 11 Be2 c5', { a: '∓', r: 'Cebalo–Pinter, Goas–Honvéd 1987', c: '6.a4 Bb4 7.e4 Bxc3+ 8.bxc3 Qa5 9.e5 Ne4 10.Bd2 Qd5 11.Be2 c5! é melhor para as pretas.' }],
  ['c39', 'i-B', 'i', '(i) B', '6 e3 b5 7 a4 Bb4 8 Nd2 a6 9 axb5 cxb5 10 Nxb5 axb5 11 Rxa8 Bb7 12 Bxf6 gxf6 13 Ra1 e5', { a: '∞', r: 'Koerholz–Karsa, Luxemburgo 1986', c: '6.e3 b5 7.a4 Bb4 8.Nd2 a6 9.axb5 cxb5 10.Nxb5 axb5! 11.Rxa8 Bb7 12.Bxf6 gxf6 13.Ra1 e5, posição pouco clara.' }],
  ['c39', 'j', 'j', '(j)', '8 axb5 cxb5 9 Nxb5 Bxe4 10 Qa4 Nc6 11 Ne5 Bb4+ 12 Nc3 Rc8 13 f3 Bd5', { a: '=', r: 'Dizdar–Pinter, Áustria 1997', c: '8.e5 é agudo, mas é melhor 8.axb5 cxb5 9.Nxb5 Bxe4 10.Qa4 Nc6 11.Ne5 Bb4+ 12.Nc3 Rc8! 13.f3 Bd5, igual.' }],
  ['c39', 'k', 'k', '(k)', '10 Nxg5 hxg5 11 Bxg5 Nbd7 12 b3 c5', { a: '∓', c: '10.Nxg5 hxg5 11.Bxg5 Nbd7 12.b3 c5! é melhor para as pretas: é a Anti-Meran normal, com o útil ...Bb7 contra a2–a4.' }],
  ['c39-k', '1', 'k', '(k) 12.axb5', '12 axb5 cxb5 13 Nxb5 Qb6', { a: '−+', c: '12.axb5 cxb5 13.Nxb5 Qb6 ganha para as pretas.' }],
  ['c39', 'l', 'l', '(l)', '11 Ne5 Nd7 12 Be2 Nxe5 13 dxe5 Qc7 14 Qd4 h3 15 O-O-O hxg2 16 Rhg1 bxa4 17 Bxc4 a3', { a: '∓', r: 'Kohlweyer–Ribli, Dortmund 1986', c: '11.Ne5 Nd7 12.Be2 Nxe5 13.dxe5 Qc7 14.Qd4 h3 15.O-O-O hxg2 16.Rhg1 bxa4 17.Bxc4 a3 é melhor para as pretas. (O Stockfish discorda: cerca de +1,5, melhor para as brancas.)' }],
  ['c39', 'm', 'm', '(m)', '13 Nc3 O-O 14 Bxc4 Qxf6', { a: '∓', r: 'Kir. Georgiev–Nogueiras, Sarajevo 1985', c: '13.Nc3 O-O! 14.Bxc4 Qxf6 deixa as pretas claramente melhor.' }],
  // Coluna 40
  ['c40', 'n', 'n', '(n)', '9 exf6 hxg5 10 fxg7 Bxg7 11 Ne4 c5 12 Nxc5 Bxf3 13 Qxf3 Qxd4 14 Qxa8 O-O 15 Ne4 Qxb2 16 Rd1 Bc3+ 17 Nxc3 Qxc3+', { a: '=', r: 'Lukacs', c: 'Talvez o melhor das brancas aqui seja 9.exf6 hxg5 10.fxg7 Bxg7 11.Ne4 c5 12.Nxc5 Bxf3 13.Qxf3 Qxd4 14.Qxa8 O-O 15.Ne4 Qxb2 16.Rd1 Bc3+ 17.Nxc3 Qxc3+, igual (Lukacs). (O Stockfish discorda: cerca de −5, vantagem decisiva das pretas.)' }],
  ['c40', 'o', 'o', '(o)', '13 Bxc4 a6 14 Na3 Rg8 15 O-O O-O-O 16 Rfc1 Kb8 17 d5 Nxe5 18 Nxe5 fxe5', { a: '∓', r: 'Ilić–Lukacs, Vrnjačka Banja 1987', c: '13.Bxc4 a6 14.Na3? Rg8 15.O-O O-O-O 16.Rfc1 Kb8 17.d5 Nxe5! 18.Nxe5 fxe5 é melhor para as pretas.' }],
  ['c40-o', '1', 'o', '(o) 14.Nc3', '14 Nc3', { a: '∓', c: '14.Nc3 também é melhor para as pretas. (O Stockfish discorda: cerca de +1,5, melhor para as brancas.)' }],
  // Coluna 41
  ['c41', 'p-A', 'p', '(p) A', '11... h3 12 gxh3 Bd6 13 Qh5 Rg8 14 Ng4 Qg6 15 Qxg6 Rxg6 16 axb5 Bb7 17 Bg2 f5 18 Ne3 Bf4 19 Bf3 Rg7', { a: '=', r: 'Kaidanov–Ippolito, Campeonato dos EUA 2006', c: '11...h3 12.gxh3 Bd6 13.Qh5 Rg8 14.Ng4 Qg6 15.Qxg6 Rxg6 16.axb5 Bb7 17.Bg2 f5 18.Ne3 Bf4 19.Bf3 Rg7, posição confusa mas igual. (O livro traz 18...Rf4, impossível; é 18...Bf4.)' }],
  ['c41', 'p-B', 'p', '(p) B', '11... Bb7 12 axb5 c5 13 Be2 h3 14 Bf3 Bxf3 15 gxf3 Bg7 16 b6 a5 17 Qa4+', { a: '±', r: 'P. Cramling–Hermansson, Suécia 2002', c: '11...Bb7 12.axb5 c5 13.Be2 h3 14.Bf3 Bxf3 15.gxf3 Bg7 16.b6 a5 17.Qa4+ é melhor para as brancas. (O Stockfish vai além: cerca de +6.)' }],
  ['c41', 'q', 'q', '(q)', '12 Ng4 Qe7 13 Be2 Bg7 14 dxc5 b4 15 Nb5 O-O', { a: '=', r: 'Epishin–Dzhandzhava, Vilnius 1988', c: '12.Ng4 Qe7 13.Be2 Bg7 14.dxc5 b4 15.Nb5 O-O é igual.' }],
  ['c41', 'r', 'r', '(r)', '13 Qxd4 Nd7 14 Qe4 Qxe5 15 Qxa8 Bb4 16 O-O Ke7 17 Qf3 Bd6 18 Qh3 b4 19 Nb5 Qxe2 20 Qxh4+ f6', { a: '∓', r: 'Goldin–Shabalov, Foxwoods 2005', c: '13.Qxd4 Nd7 14.Qe4 Qxe5 15.Qxa8 Bb4 16.O-O Ke7 17.Qf3 Bd6 18.Qh3 b4 19.Nb5 Qxe2 20.Qxh4+ f6: complicações enormes, mas as pretas devem estar melhor. (O Stockfish discorda: cerca de +3,5, vantagem das brancas.)' }],
  // Coluna 42
  ['c42', 's', 's', '(s)', '11 g3 Nd7 12 Qe2 c5 13 Bg2 cxd4 14 Nxd7 Bxd7 15 Nd5 Qg7 16 Nc7+ Kd8 17 Nxa8 Bb4+ 18 Kf1 d3 19 Qd1 Qxb2 20 Rb1 Qd2 21 f4 Qxd1+ 22 Rxd1 Ke7 23 Rb1 Ba3 24 Ke1 c3 25 Rb3 b4', { a: '∓', r: 'Murshed–Ivanchuk, Sharjah 1985', c: '11.g3?! Nd7 12.Qe2 c5 13.Bg2 cxd4 14.Nxd7 Bxd7 15.Nd5 Qg7 16.Nc7+ Kd8 17.Nxa8 Bb4+ 18.Kf1 d3 19.Qd1 Qxb2 20.Rb1 Qd2 21.f4 Qxd1+ 22.Rxd1 Ke7 23.Rb1 Ba3 24.Ke1 c3 25.Rb3 b4 é melhor para as pretas. (O Stockfish vai além: cerca de −7.)' }],
  ['c42', 't', 't', '(t)', '13 Bf3 a6 14 O-O Bg7 15 a4 b4 16 Ne4 Qf4 17 Qc1 Qc7 18 Qxc4 Bxc6 19 Rac1 Rc8 20 Qxb4 Bf8', { a: '=', r: 'Kravtsov–S. Ivanov, Campeonato Russo por equipes 1999', c: '13.Bf3 a6 14.O-O Bg7 15.a4 b4 16.Ne4 Qf4 17.Qc1 Qc7 18.Qxc4 Bxc6 19.Rac1 Rc8 20.Qxb4 Bf8 é igual.' }],
]

const capitulo = {
  id: 'eslava-g',
  arquivo: 'eslava-g',
  nome: 'Semi-Eslava — 5.Bg5: 5...h6 (Moscou) e 5...dxc4 (Botvinnik)',
  fonte: 'Modern Chess Openings — Slav and Semi-Slav Defense (pp. 476–477), colunas 37–42',
  base: '1. d4 d5 2. c4 c6',
  corPadrao: 'b',
  ordem: 476,
  grupos: [
    { id: 'h6', nome: '5...h6 6.Bxf6 Qxf6', colunas: [37, 38] },
    { id: 'dxc4', nome: '5...dxc4 6.e4 b5', colunas: [39, 40, 41, 42] },
  ],
}

module.exports = { capitulo, colunas, notas }
