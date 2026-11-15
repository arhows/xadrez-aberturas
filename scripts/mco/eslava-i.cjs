// Transcrição do MCO 15ª ed. — Eslava, 4...dxc4: 5.e3, 5.e4 e 5.a4 (5...Na6 e 5...Bg4) (pp. 480–481), colunas 49–54.
// Gerar: node scripts/mco/gerar.cjs eslava-i
// Formato: ver gambito-do-rei.cjs. Dicas em eslava-i-dicas.cjs.
//
// A tabela traz avaliação só nas colunas 49 (∞); nas outras usamos a avaliação da nota que continua a coluna.

const B = '1 d4 d5 2 c4 c6 3 Nf3 Nf6 4 Nc3 dxc4'
const E = `${B} 5 e4 b5 6 e5 Nd5 7 a4 e6`
const G = `${B} 5 a4 Bg4 6 Ne5 Bh5`

const colunas = {
  c49: [`${B} 5 e3 b5 6 a4 b4 7 Nb1 Ba6 8 Qc2 b3 9 Qd1 e6 10 Be2 Bb4+ 11 Bd2 c5`, 'e3', '5.e3 b5', '∞',
    'Com 4...dxc4 as pretas tomam o peão de c4. Contra 5.e3 elas o defendem com 5...b5; depois de 6.a4 b4 7.Nb1 Ba6 8.Qc2 b3 9.Qd1 e6 10.Be2 Bb4+ 11.Bd2 c5 a posição é pouco clara.'],
  c50: [`${E} 8 axb5 Nxc3 9 bxc3 cxb5 10 Ng5 Bb7 11 Qh5 g6`, 'e4', '5.e4 b5 8.axb5', '=',
    'Com 5.e4 b5 6.e5 Nd5 7.a4 e6 as pretas seguram o peão de c4. Depois de 8.axb5 Nxc3 9.bxc3 cxb5 10.Ng5 Bb7 11.Qh5 g6 as chances das pretas são pelo menos iguais (Magerramov–Sasikiran, Dubai 2002).'],
  c51: [`${E} 8 Ng5 h6 9 Nge4 b4 10 Nb1 Ba6 11 Nbd2 Nf4`, 'e4', '8.Ng5', '∞',
    'Com 8.Ng5 h6 9.Nge4 b4 10.Nb1 Ba6 11.Nbd2 Nf4 o jogo fica agudo; as pretas chegam a dar a qualidade, com ótimo jogo em troca (Fiorito–Smyslov, Buenos Aires 1990).'],
  c52: [`${B} 5 a4 Na6 6 e4 Bg4 7 Bxc4 e6 8 Be3 Be7 9 O-O Nb4 10 Rc1 O-O 11 h3 Bh5`, 'a4', '5.a4 Na6', '±',
    'Com 5.a4 as brancas impedem ...b5. Com 5...Na6 o cavalo vai a b4; depois de 6.e4 Bg4 7.Bxc4 e6 8.Be3 Be7 9.O-O Nb4 10.Rc1 O-O 11.h3 Bh5 as brancas ficam melhor (Pedersen–Grétarsson, Tórshavn 1997).'],
  c53: [`${G} 7 f3 Nfd7 8 Nxc4 e5 9 Ne4 Bb4+ 10 Bd2 Qe7 11 Bxb4 Qxb4+`, 'a4', '5...Bg4 7.f3', '⩲',
    'Com 5...Bg4 6.Ne5 Bh5 7.f3 as brancas preparam e4. Depois de 7...Nfd7 8.Nxc4 e5 9.Ne4 Bb4+ 10.Bd2 Qe7 11.Bxb4 Qxb4+ o final que vem é só um pouco melhor para as brancas (Beliavsky–Rublevsky, Tivat 1995).'],
  c54: [`${G} 7 g3 e6 8 Bg2 Bb4 9 O-O O-O 10 Nxc4 Nd5 11 Qd3 Be7`, 'a4', '7.g3', '∞',
    'Com 7.g3 e6 8.Bg2 Bb4 9.O-O O-O 10.Nxc4 Nd5 11.Qd3 Be7 as brancas recuperam o peão com o bispo na grande diagonal; as chances são para os dois lados (Kamsky–Gelfand, Tilburg 1992).'],
}

const notas = [
  // Coluna 49
  ['c49', 'a', 'a', '(a)', '4... Qb6 5 Qb3 Bf5 6 c5 Qxb3 7 axb3 e6 8 b4 Be7 9 b5', { a: '±', r: 'Horváth–Fehér, Hungria 2006', c: '4...Qb6 5.Qb3 Bf5 6.c5 Qxb3 7.axb3 e6 8.b4 Be7 9.b5 é melhor para as brancas.' }],
  ['c49', 'b', 'b', '(b)', '5 Ne5 b5 6 g3 Bb7 7 Bg2 a6 8 a4 e6 9 Bg5 Qb6 10 O-O Be7 11 e3 h6 12 f4 hxg5 13 fxg5 Rf8 14 gxf6 gxf6 15 Nf3 Nd7', { a: '∞', r: 'Portisch', c: '5.Ne5 b5 6.g3 Bb7 7.Bg2 a6 8.a4 e6 9.Bg5 Qb6 10.O-O Be7 11.e3 h6 12.f4 hxg5 13.fxg5 Rf8! 14.gxf6 gxf6 15.Nf3 Nd7 dá chances aos dois lados (Portisch).' }],
  ['c49', 'c', 'c', '(c)', '7 Na2 e6 8 Bxc4 Bb7 9 O-O Be7 10 Qe2 O-O 11 Rd1 a5 12 Bd2 Nbd7 13 Nc1 Qb6 14 Nb3 c5 15 Be1 Rfd8', { a: '=', r: 'Reshevsky–Smyslov, match pelo rádio EUA × URSS 1945', c: '7.Na2 e6 8.Bxc4 Bb7 9.O-O Be7 10.Qe2 O-O 11.Rd1 a5 12.Bd2 Nbd7 13.Nc1 Qb6 14.Nb3 c5 15.Be1 Rfd8 é igual.' }],
  ['c49', 'd', 'd', '(d)', '8 Be2 e6 9 O-O Be7 10 Nbd2 c3 11 bxc3 bxc3 12 Nb1 Qa5 13 Ba3 c5', { a: '=', r: 'P. Nikolić–Bareev, Pula 1997', c: '8.Be2 e6 9.O-O Be7 10.Nbd2 c3 11.bxc3 bxc3 12.Nb1 Qa5 13.Ba3 c5 é igual.' }],
  ['c49', 'e', 'e', '(e)', '8... e6 9 Bxc4 Bxc4 10 Qxc4 Qd5 11 Nbd2 Nbd7 12 Qe2 Ne4', { a: '=', r: 'Ståhlberg–Euwe, Olimpíada de Estocolmo 1937', c: '8...e6 9.Bxc4 Bxc4 10.Qxc4 Qd5 11.Nbd2 Nbd7 12.Qe2 Ne4 é igual.' }],
  ['c49', 'f', 'f', '(f)', '10 Nbd2 Qd5 11 Be2 Nbd7 12 O-O Rb8 13 Nb1 Ne4', { a: '∓', r: 'Adorján–Torre, Toluca 1982', c: '10.Nbd2?! Qd5 11.Be2 Nbd7 12.O-O Rb8! 13.Nb1 Ne4 é melhor para as pretas.' }],
  ['c49', 'g', 'g', '(g)', '10... Nd5 11 O-O Nb4 12 Na3 Nd3 13 Nxc4', { a: '±', r: 'Varnusz–Utasi, Hungria 1990', c: '10...Nd5?! 11.O-O Nb4 12.Na3 Nd3?! 13.Nxc4 é melhor para as brancas.' }],
  // Coluna 50
  ['c50', 'h', 'h', '(h)', '7 Ng5 f6 8 Nge4 f5 9 Ng5 e6 10 h4 Na6 11 Be2 Be7 12 Bh5+ g6 13 Be2 Nab4 14 Nf3 Nxc3 15 bxc3 Nd5', { a: '∓', r: 'Wockenfuss–Weimer, Bundesliga 1983–84', c: '7.Ng5 f6! 8.Nge4 f5 9.Ng5 e6 10.h4 Na6 11.Be2 Be7 12.Bh5+ g6 13.Be2 Nab4 14.Nf3 Nxc3 15.bxc3 Nd5 é melhor para as pretas.' }],
  ['c50', 'i', 'i', '(i)', '11 Qg4 Bd5 12 Be2 Nc6 13 O-O a5 14 Ne4 h5 15 Qf4 Be7', { a: '=', r: 'R. Rodríguez–Thipsay, Bangalore 1981', c: '11.Qg4 Bd5 12.Be2 Nc6 13.O-O a5 14.Ne4 h5 15.Qf4 Be7 é igual.' }],
  ['c50', 'j-A', 'j', '(j) A', '11... Qd7 12 Be2 Bd5 13 Nxh7 Nc6 14 Nf6+ gxf6 15 Qxh8 O-O-O 16 Qh3', { a: '±', c: '11...g6 é melhor que 11...Qd7 12.Be2 Bd5 13.Nxh7 Nc6 14.Nf6+ gxf6 15.Qxh8 O-O-O 16.Qh3, melhor para as brancas.' }],
  ['c50', 'j-B', 'j', '(j) B', '12 Qg4 Be7 13 Be2 Bd5 14 Bf3 Nc6 15 Ne4 h5 16 Qf4 a5 17 O-O Ra7', { a: '∓', r: 'Magerramov–Sasikiran, Dubai 2002', c: 'Depois de 11...g6 12.Qg4 Be7 13.Be2 Bd5 as chances das pretas são pelo menos iguais, por exemplo 14.Bf3 Nc6 15.Ne4 h5 16.Qf4 a5 17.O-O Ra7, melhor para as pretas.' }],
  // Coluna 51
  ['c51', 'k', 'k', '(k)', '8... Be7 9 Nge4 b4 10 Nb1 Ba6 11 Qg4 Kf8 12 Be2 Nd7', { a: '=', r: 'Sosonko–Hübner, Bruxelas (blitz) 1987', c: '8...Be7 9.Nge4 b4 10.Nb1 Ba6 11.Qg4 Kf8 12.Be2 Nd7 é igual.' }],
  ['c51-k', '1', 'k', '(k) 10...f5', '10... f5', { c: 'Também é bom 10...f5!.' }],
  ['c51', 'l', 'l', '(l)', '10... Qh4 11 Qf3 f5 12 exf6 Nxf6 13 Nxf6+ Qxf6 14 Qe4', { a: '⩲', r: 'Donaldson', c: '10...Qh4 11.Qf3 f5 12.exf6 Nxf6 13.Nxf6+ Qxf6 14.Qe4! é um pouco melhor para as brancas (Donaldson).' }],
  ['c51', 'm', 'm', '(m)', '12 Qg4 Nd3+ 13 Bxd3 cxd3 14 Nd6+ Bxd6 15 Qxg7 Bf8 16 Qxh8 Qxd4 17 O-O Nd7 18 Nf3 Qg4 19 Bxh6 Qh5 20 Bg7 Qxh8 21 Bxh8 Bh6', { a: '∞', r: 'Fiorito–Smyslov, Buenos Aires 1990', c: '12.Qg4 Nd3+ 13.Bxd3 cxd3 14.Nd6+ Bxd6 15.Qxg7 Bf8! 16.Qxh8 Qxd4 17.O-O Nd7 18.Nf3 Qg4! 19.Bxh6 Qh5 20.Bg7 Qxh8 21.Bxh8 Bh6 dá às pretas ótimo jogo pela qualidade.' }],
  // Coluna 52
  ['c52', 'n', 'n', '(n)', '6 e3 Bg4 7 Bxc4 e6 8 h3 Bh5 9 O-O Nb4 10 Qe2 Be7 11 Rd1 O-O 12 g4 Bg6 13 e4 Nd7', { a: '=', r: 'Kramnik–Short, Moscou 1996', c: '6.e3 Bg4 7.Bxc4 e6 8.h3 Bh5 9.O-O Nb4 10.Qe2 Be7 11.Rd1 O-O 12.g4 Bg6 13.e4 Nd7! é igual.' }],
  ['c52', 'o', 'o', '(o)', '7... Bxf3 8 gxf3 e6 9 Bxa6 bxa6', { a: '∞', r: 'Ivanchuk–Smyslov, Tallinn (rápido) 1996', c: '7...Bxf3 8.gxf3 e6 9.Bxa6?! bxa6 dá bom contrajogo às pretas, apesar dos peões fracos.' }],
  ['c52-o', '1', 'o', '(o) 9.Be3', '9 Be3', { c: 'Vale tentar 9.Be3.' }],
  ['c52', 'p', 'p', '(p)', '8... Nb4 9 Be2 a5 10 O-O Be7 11 Ne5 Bxe2 12 Qxe2 O-O 13 Rad1 Nd7 14 f4 f6 15 Nc4', { a: '±', r: 'Wilder–Christiansen, Campeonato dos EUA 1987', c: '8...Nb4 9.Be2 a5 10.O-O Be7 11.Ne5 Bxe2 12.Qxe2 O-O 13.Rad1 Nd7 14.f4 f6 15.Nc4 é melhor para as brancas.' }],
  ['c52', 'q', 'q', '(q)', '12 Qe2 c5 13 dxc5 Qa5 14 g4 Bg6 15 Nd2', { a: '±', r: 'Pedersen–Grétarsson, Tórshavn 1997', c: '12.Qe2 c5 13.dxc5 Qa5 14.g4 Bg6 15.Nd2 é melhor para as brancas.' }],
  ['c52-q', '1', 'q', '(q) 12...Qa5', '12... Qa5 13 g4 Bg6 14 Nd2 Rfd8 15 f4', { a: '±', c: '12...Qa5 13.g4! Bg6 14.Nd2 Rfd8 15.f4 é melhor para as brancas.' }],
  // Coluna 53
  ['c53', 'r', 'r', '(r)', '9 Be3 Bg6 10 h4 f6 11 dxe5 Nxe5 12 Qxd8+ Kxd8 13 Nxe5 fxe5 14 h5', { a: '±', r: 'Krasenkow–Sapis, Campeonato da Polônia 1997', c: '9.Be3 Bg6 10.h4 f6 11.dxe5 Nxe5 12.Qxd8+ Kxd8 13.Nxe5 fxe5 14.h5 é melhor para as brancas.' }],
  ['c53', 's', 's', '(s)', '11 dxe5 O-O 12 Rc1 b5 13 Bxb4 Qxb4+ 14 Qd2 Qxa4 15 Qa5 Qxa5+ 16 Nxa5 Bg6', { a: '=', r: 'Dohosian–Bareev, Irkutsk 1986', c: '11.dxe5 O-O 12.Rc1 b5 13.Bxb4 Qxb4+ 14.Qd2 Qxa4 15.Qa5 Qxa5+ 16.Nxa5 Bg6 é igual.' }],
  ['c53', 't', 't', '(t)', '12 Qd2 Qxd2+ 13 Kxd2 exd4 14 Ned6+ Ke7 15 Nf5+ Kf6 16 Nxd4 Rd8 17 e4 Nc5 18 Ke3 Rxd4 19 Kxd4 Nb3+ 20 Kc3 Nxa1 21 Be2 Ke7 22 Rxa1', { a: '⩲', r: 'Beliavsky–Rublevsky, Tivat 1995', c: '12.Qd2 Qxd2+ 13.Kxd2 exd4 14.Ned6+ Ke7 15.Nf5+ Kf6 16.Nxd4 Rd8 17.e4 Nc5 18.Ke3 Rxd4 19.Kxd4 Nb3+ 20.Kc3 Nxa1 21.Be2 Ke7 22.Rxa1 deixa as brancas com um final só um pouco melhor.' }],
  // Coluna 54
  ['c54', 'u', 'u', '(u)', '12 e4 Nb4 13 Qd2 N8a6 14 b3 Qc7', { a: '∞', r: 'Kamsky–Gelfand, Tilburg 1992', c: '12.e4 Nb4 13.Qd2 N8a6 14.b3 Qc7 dá chances aos dois lados.' }],
]

const capitulo = {
  id: 'eslava-i',
  arquivo: 'eslava-i',
  nome: 'Eslava — 4...dxc4: 5.e3, 5.e4 e 5.a4 (5...Na6 e 5...Bg4)',
  fonte: 'Modern Chess Openings — Slav and Semi-Slav Defense (pp. 480–481), colunas 49–54',
  base: '1. d4 d5 2. c4 c6',
  corPadrao: 'b',
  ordem: 480,
  grupos: [
    { id: 'e3', nome: '5.e3', colunas: [49] },
    { id: 'e4', nome: '5.e4 b5', colunas: [50, 51] },
    { id: 'a4', nome: '5.a4: 5...Na6 e 5...Bg4', colunas: [52, 53, 54] },
  ],
}

module.exports = { capitulo, colunas, notas }
