// Transcrição do MCO 15ª ed. — Defesa Nimzo-Índia, Variante Sämisch (pp. 557–558), colunas 49–54.
// Gerar: node scripts/mco/gerar.cjs nimzo-i
// Formato: ver gambito-do-rei.cjs. Dicas em nimzo-i-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua.
// Avaliações tiradas do texto: (e) e (f) "empate" ficaram =; (i) "vantagem mínima das brancas" ficou ⩲;
// (j) "bom para as pretas" ficou =; (m) "boa compensação pelo peão" (das pretas) ficou =;
// (u) "posição aguda, mais ou menos igual" ficou =; (x) "pequena vantagem das brancas" ficou ⩲.
// Notas só com comentário: (f) 23...Rd2, (n), (o) 11.dxc5, (s).
// Errata: na nota (f) o livro termina com 27.Qf8+ (xeque perpétuo), mas a dama de c4 não alcança f8; a linha foi cortada em 26...R8d3.

const F = '1 d4 Nf6 2 c4 e6 3 Nc3 Bb4 4 a3 Bxc3+ 5 bxc3'

const colunas = {
  c49: [`${F} d5 6 f3 c5 7 cxd5 Nxd5 8 dxc5 Qa5 9 e4 Ne7 10 Be3 O-O 11 Qb3 Qc7 12 a4 e5 13 Bc4 Nec6`, 'd5', '5...d5 6.f3 c5 7.cxd5 Nxd5 8.dxc5 Qa5', '=',
    'Na Sämisch as brancas entregam um tempo e aceitam os peões dobrados em troca do par de bispos e do centro. Com 5...d5 6.f3 c5 7.cxd5 Nxd5 8.dxc5 Qa5 as pretas atacam c3 e c5. Depois de 9.e4 Ne7! 10.Be3 O-O 11.Qb3 Qc7 12.a4 e5 13.Bc4 Nec6 o jogo termina em empate nas partidas de referência.'],
  c50: [`${F} d5 6 f3 c5 7 cxd5 Nxd5 8 dxc5 f5 9 Qc2 O-O 10 e4 fxe4 11 fxe4 Nf4 12 Nf3 Qc7 13 Be3 Nd7`, 'd5', '8...f5', '⩲',
    'Com 8...f5 as pretas impedem e4 por um momento. Depois de 9.Qc2 O-O 10.e4 fxe4 11.fxe4 Nf4 12.Nf3 Qc7 13.Be3 Nd7 as pretas recuperam c5, e as brancas ficam só com uma vantagem mínima.'],
  c51: [`${F} d5 6 f3 c5 7 cxd5 Nxd5 8 Qd3 b6 9 e4 Ba6 10 Qd2 Bxf1 11 Kxf1 Ne7 12 Ne2 Nbc6 13 dxc5 Qc7`, 'd5', '8.Qd3', '=',
    'Com 8.Qd3 as brancas protegem c3 e preparam e4. Depois de 8...b6 9.e4 Ba6 10.Qd2 Bxf1 11.Kxf1 Ne7 12.Ne2 Nbc6 13.dxc5 Qc7! as pretas entregam um peão, mas têm boa compensação pelo rei branco sem roque.'],
  c52: [`${F} c5 6 e3 O-O 7 Bd3 Nc6 8 Ne2 b6 9 e4 Ne8 10 O-O Ba6 11 f4 f5 12 Ng3 g6 13 Be3 cxd4`, 'c5', '5...c5 6.e3', '∓',
    'Com 5...c5 6.e3 O-O 7.Bd3 Nc6 as pretas pressionam c4, o ponto fraco dos peões dobrados. Depois de 8.Ne2 b6 9.e4 Ne8! 10.O-O Ba6 11.f4 f5 as pretas freiam o ataque branco, e com 12.Ng3 g6 13.Be3 cxd4! ficam um pouco melhor.'],
  c53: [`${F} c5 6 f3 Nc6 7 e4 d6 8 Be3 b6 9 Bd3 Na5 10 Ne2 Ba6 11 Ng3 Qc7 12 O-O O-O-O 13 Qe2 Nd7`, 'c5', '6.f3', '=',
    'Com 6.f3 Nc6 7.e4 d6 as pretas montam um Sistema Hübner contra o centro branco. Depois de 8.Be3 b6 9.Bd3 Na5 10.Ne2 Ba6 11.Ng3 Qc7 12.O-O O-O-O 13.Qe2 Nd7 os reis rocaram em lados opostos, e a posição é aguda e mais ou menos igual.'],
  c54: [`${F} O-O 6 f3 Ne8 7 e4 b6 8 Bd3 Ba6 9 Nh3 c5 10 d5 Qh4+ 11 Nf2 Nd6 12 Qe2 exd5 13 cxd5 Bxd3`, 'oo', '5...O-O', '⩲',
    'Com 5...O-O 6.f3 Ne8 as pretas evitam que e4 venha com ganho de tempo e preparam ...b6 e ...Ba6 contra c4. Depois de 7.e4 b6 8.Bd3 Ba6 9.Nh3 c5 10.d5 Qh4+ 11.Nf2 Nd6 12.Qe2 exd5 13.cxd5 Bxd3 as brancas ficam com uma pequena vantagem.'],
}

const notas = [
  // Coluna 49
  ['c49', 'a-A', 'a', '(a) A', '6 Bg5 c5 7 cxd5 exd5 8 e3 Qa5 9 Ne2 Ne4 10 Bf4 cxd4 11 exd4 O-O', { a: '=', r: 'Taimanov', c: '6.Bg5 c5 7.cxd5 exd5 8.e3 Qa5 9.Ne2 Ne4 10.Bf4 cxd4 11.exd4 O-O leva à igualdade.' }],
  ['c49', 'a-B', 'a', '(a) B', '6 e3 c5 7 cxd5 Nxd5 8 Bd2 Nc6', { a: '∞', c: '6.e3 c5 7.cxd5 Nxd5 8.Bd2 Nc6 leva a uma posição pouco clara.' }],
  ['c49', 'b', 'b', '(b)', '6... O-O 7 cxd5 exd5 8 e3 Bf5 9 Ne2 Nbd7 10 Ng3 Bg6 11 Bd3 c5 12 O-O Re8 13 Re1 Qc7 14 Bxg6 hxg6 15 e4', { a: '⩲', r: 'Botvinnik–Tal, Campeonato Mundial 1960', c: '6...O-O 7.cxd5 exd5 8.e3 Bf5 9.Ne2 Nbd7 10.Ng3 Bg6 11.Bd3 c5 12.O-O Re8 13.Re1 Qc7 14.Bxg6 hxg6 15.e4 é um pouco melhor para as brancas.' }],
  ['c49', 'c', 'c', '(c)', '7... exd5 8 e3 Qc7 9 Ra2 Bf5 10 Ne2 Nc6 11 g4 Be6 12 Nf4', { a: '⩲', r: 'Shirov–Lerner, Lvov 1990', c: '7...exd5 8.e3 Qc7 9.Ra2 Bf5 10.Ne2 Nc6 11.g4 Be6 12.Nf4 é um pouco melhor para as brancas.' }],
  ['c49-c', '1', 'c', '(c) 8...O-O', '8... O-O 9 Bd3 b6 10 Ne2', { a: '⩲', c: '8...O-O 9.Bd3 b6 10.Ne2 é um pouco melhor para as brancas.' }],
  ['c49', 'd-A', 'd', '(d) A', '9... Nxc3 10 Qd2 Nc6 11 Bb2 Na4 12 Bxg7', { a: '±', r: 'Polugaevsky–Shapashnikov, URSS 1958', c: '9...Nxc3 10.Qd2 Nc6 11.Bb2 Na4 12.Bxg7 é melhor para as brancas.' }],
  ['c49', 'd-B', 'd', '(d) B', '9... Qxc3+ 10 Bd2 Qe5 11 Ne2', { a: '±', c: '9...Qxc3+ 10.Bd2 Qe5 11.Ne2 é melhor para as brancas.' }],
  ['c49', 'e', 'e', '(e)', '12 Rb1 Nd7 13 Qc4 Ne5 14 Qb3 Nd7 15 Qc4 Ne5 16 Qb3', { a: '=', r: 'Khenkin–Anand, Bundesliga 2003', c: '12.Rb1 Nd7 13.Qc4 Ne5 14.Qb3 Nd7 15.Qc4 Ne5 16.Qb3 terminou empatada.' }],
  ['c49', 'f', 'f', '(f)', '14 Qa3 Na5 15 Bd5 Na6 16 Rb1 Be6 17 Bxe6 fxe6 18 Qa2 Nxc5 19 Bxc5 Qxc5 20 Qxe6+ Kh8 21 Ne2 Qe3 22 Qxe5 Rad8 23 Qxa5', { a: '=', r: 'Gelfand–de Firmian, Moscou 1990', c: '14.Qa3 Na5 15.Bd5 Na6 16.Rb1 Be6 17.Bxe6 fxe6 18.Qa2 Nxc5 19.Bxc5 Qxc5 20.Qxe6+ Kh8 21.Ne2 Qe3 22.Qxe5 Rad8! 23.Qxa5 terminou empatada.' }],
  ['c49-f', '1', 'f', '(f) 23...Rd2', '23... Rd2 24 Qb5 Rfd8 25 Qc4 h6 26 Rf1 R8d3', { c: 'Depois de 23...Rd2 24.Qb5 Rfd8 25.Qc4 h6 26.Rf1 R8d3 as brancas dão xeque perpétuo.' }],
  // Coluna 50
  ['c50', 'g-A', 'g', '(g) A', '9 Nh3 O-O 10 Nf4 Na6 11 Nxd5 exd5 12 Qd4 Qa5 13 Bf4 Nxc5', { a: '=', r: 'Nyback–Beliavsky, Gotemburgo 2005', c: '9.Nh3 O-O 10.Nf4 Na6 11.Nxd5 exd5 12.Qd4 Qa5 13.Bf4 Nxc5 leva à igualdade.' }],
  ['c50-g-A', '1', 'g', '(g) A 10.c4', '10 c4 Qh4+', { a: '=', c: '10.c4 Qh4+ leva à igualdade.' }],
  ['c50', 'g-B', 'g', '(g) B', '9 e4 fxe4 10 Qc2 e3 11 Bd3 Nd7 12 Ne2 Nxc5', { a: '=', r: 'Malaniuk–Balashov, Campeonato da URSS 1990', c: '9.e4 fxe4 10.Qc2 e3 11.Bd3 Nd7 12.Ne2 Nxc5 leva à igualdade.' }],
  ['c50', 'h', 'h', '(h)', '9... f4 10 g3 O-O 11 c4 Ne3 12 Bxe3 fxe3 13 Qc3 Qg5 14 f4 Qxc5 15 Bg2', { a: '⩲', r: 'Sakaev–Brodsky, Kherson 1991', c: '9...f4 10.g3 O-O 11.c4 Ne3 12.Bxe3 fxe3 13.Qc3 Qg5 14.f4 Qxc5 15.Bg2 é um pouco melhor para as brancas.' }],
  ['c50', 'i', 'i', '(i)', '14 Bc4 Nxc5 15 O-O Bd7 16 Rae1 b6 17 Bd4 Ba4 18 Qd2 Nb3 19 Bxb3 Bxb3 20 Ne5 Ng6', { a: '⩲', r: 'Timman–Karpov, Reykjavik 1990', c: '14.Bc4 Nxc5 15.O-O Bd7 16.Rae1 b6 17.Bd4 Ba4 18.Qd2 Nb3 19.Bxb3 Bxb3 20.Ne5 Ng6! deixa as brancas com uma vantagem mínima.' }],
  // Coluna 51
  ['c51', 'j', 'j', '(j)', '8 Qd2 f5 9 Nh3 O-O 10 e3 Nc6 11 Bc4 Na5 12 Ba2 cxd4 13 cxd4 Bd7', { a: '=', r: 'Shirov–Beliavsky, Biel 1992', c: '8.Qd2 f5 9.Nh3 O-O 10.e3 Nc6 11.Bc4 Na5 12.Ba2 foi a partida; agora 12...cxd4 13.cxd4 Bd7 é bom para as pretas.' }],
  ['c51', 'k', 'k', '(k)', '8... cxd4 9 cxd4 Nc6 10 e4 Nb6 11 Be3 O-O 12 Be2 f5 13 Rd1 Kh8 14 Nh3 fxe4 15 Qxe4 Nd5 16 Ng5 Nf6 17 Qd3 Qa5+ 18 Rd2 Ne7 19 O-O Ned5', { a: '=', r: 'Savchenko–Gipslis, Gausdal 1992', c: 'Uma alternativa razoável é 8...cxd4 9.cxd4 Nc6 10.e4 Nb6 11.Be3 O-O 12.Be2 f5 13.Rd1 Kh8 14.Nh3 fxe4 15.Qxe4 Nd5 16.Ng5 Nf6 17.Qd3 Qa5+ 18.Rd2 Ne7! 19.O-O Ned5, com igualdade.' }],
  ['c51', 'l', 'l', '(l)', '10 c4 Nc7 11 d5 exd5 12 exd5 O-O', { a: '∓', r: 'Saldano–Zarnicki, Buenos Aires 1994', c: '10.c4 Nc7 11.d5 exd5 12.exd5 O-O é um pouco melhor para as pretas.' }],
  ['c51', 'm', 'm', '(m)', '14 Qf4 e5 15 Qg4 O-O', { a: '=', r: 'Shirov–Karpov, Biel 1992', c: '14.Qf4 e5 15.Qg4 O-O dá às pretas boa compensação pelo peão.' }],
  ['c51-m', '1', 'm', '(m) 14.Qd6', '14 Qd6 Qxd6 15 cxd6 Nc8', { a: '=', c: '14.Qd6 Qxd6 15.cxd6 Nc8 leva à igualdade.' }],
  // Coluna 52
  ['c52', 'n', 'n', '(n)', '8 Nf3 d6 9 e4 e5', { c: '8.Nf3?! d6 9.e4 e5 é o Sistema Hübner com as brancas tendo perdido um tempo com a2-a3.' }],
  ['c52', 'o', 'o', '(o)', '10 Be3 Ba6 11 Qa4 Qc8 12 O-O d6', { a: '=', r: 'Dimitrević–Andonov, Belgrado 2005', c: '10.Be3 Ba6 11.Qa4 Qc8 12.O-O foi a partida; agora 12...d6 mantém o equilíbrio.' }],
  ['c52-o', '1', 'o', '(o) 11.dxc5', '11 dxc5 Ne5', { c: '11.dxc5?! Ne5 é duvidoso para as brancas.' }],
  ['c52', 'p', 'p', '(p)', '11 Qa4 Qc8 12 Be3 Na5 13 dxc5 d6 14 Ng3 dxc5 15 e5 f5', { a: '=', r: 'Szabo–Portisch, Hungria 1959', c: '11.Qa4 Qc8 12.Be3 Na5 13.dxc5 d6! 14.Ng3 dxc5 15.e5 f5 leva à igualdade.' }],
  ['c52', 'q', 'q', '(q)', '11... Na5 12 f5 exf5 13 exf5 Nf6 14 Bg5 h6 15 Bh4 Bxc4 16 Nf4 d5 17 Nh5', { a: '±', r: 'Hoi–Kveinys, Ostrava 1992', c: 'As brancas conseguem o ataque que procuram depois de 11...Na5?! 12.f5! exf5 13.exf5 Nf6 14.Bg5 h6 15.Bh4 Bxc4 16.Nf4 d5 17.Nh5, e ficam melhor.' }],
  ['c52', 'r', 'r', '(r)', '14 cxd4 d5 15 cxd5 Bxd3 16 Qxd3 fxe4 17 Qxe4 Qxd5', { a: '∓', r: 'Yusupov–Karpov, Linares 1993', c: '14.cxd4 d5! 15.cxd5 Bxd3 16.Qxd3 fxe4 17.Qxe4 Qxd5 é um pouco melhor para as pretas.' }],
  // Coluna 53
  ['c53', 's', 's', '(s)', '6... d5', { c: '6...d5 é o mais jogado e transpõe para a coluna 49.' }],
  ['c53', 't', 't', '(t)', '8 Ne2 b6 9 Bg5 h6 10 Be3 Qd7 11 Ng3 Ba6 12 Bd3 O-O-O 13 a4 Kb8', { a: '=', r: 'Gutman–Spassky, Bundesliga 1986', c: '8.Ne2 b6 9.Bg5 h6 10.Be3 Qd7 11.Ng3 Ba6 12.Bd3 O-O-O 13.a4 Kb8 leva à igualdade.' }],
  ['c53', 'u', 'u', '(u)', '14 f4 Rde8 15 e5 f5', { a: '=', r: 'Sagalchik–Ashley, Nova York 1995', c: '14.f4 Rde8 15.e5 f5 leva a uma posição aguda, mais ou menos igual.' }],
  // Coluna 54
  ['c54', 'v', 'v', '(v)', '5... b6 6 f3 Ba6 7 e4 Nc6 8 e5 Ng8 9 Nh3 Na5 10 Qa4 Ne7 11 Bd3 O-O 12 Bg5', { a: '±', r: 'Kotov–Keres, Budapeste 1950', c: '5...b6 6.f3 Ba6 7.e4 Nc6 8.e5 Ng8 9.Nh3 Na5 10.Qa4 Ne7?! 11.Bd3 O-O 12.Bg5! é melhor para as brancas.' }],
  ['c54-v', '1', 'v', '(v) 10...h6', '10... h6', { a: '⩲', c: '10...h6 é um pouco melhor para as brancas.' }],
  ['c54', 'w', 'w', '(w)', '6... Nh5 7 Nh3 f5 8 e3 d6 9 Bd3 Nc6 10 O-O Qe8 11 g4', { a: '⩲', r: 'Karaklajić–O\'Kelly, Túnis 1964', c: '6...Nh5 7.Nh3 f5 8.e3 d6 9.Bd3 Nc6 10.O-O Qe8 11.g4 é um pouco melhor para as brancas.' }],
  ['c54', 'x', 'x', '(x)', '14 Qxd3', { a: '⩲', r: 'Acs–Beliavsky, Memorial György Marx 2004', c: '14.Qxd3 dá às brancas uma pequena vantagem.' }],
]

const capitulo = {
  id: 'nimzo-i',
  arquivo: 'nimzo-i',
  nome: 'Nimzo-Índia — Variante Sämisch',
  fonte: 'Modern Chess Openings — Nimzo-Indian Defense (pp. 557–558), colunas 49–54',
  base: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4',
  corPadrao: 'b',
  ordem: 557,
  grupos: [
    { id: 'd5', nome: '5...d5 6.f3', colunas: [49, 50, 51] },
    { id: 'c5', nome: '5...c5', colunas: [52, 53] },
    { id: 'oo', nome: '5...O-O', colunas: [54] },
  ],
}

module.exports = { capitulo, colunas, notas }
