// Transcrição do MCO 15ª ed. — Semi-Eslava, Reynolds com 10...c4 11.dxe6 fxe6 12.Bc2 (pp. 470–471), colunas 19–24.
// Gerar: node scripts/mco/gerar.cjs eslava-d
// Formato: ver gambito-do-rei.cjs. Dicas em eslava-d-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas (só a coluna 21 tem ∞); nas outras usamos a avaliação da nota que continua a coluna.
// Correções: na nota (q) o livro traz o parêntese "23 Re7 Rb8 24 h3 Kf8 25 Re6 Rc6 26 Re3", impossível ali (h3 já foi jogado e já há torre em b8); ficou de fora.
// Na nota (u) o livro traz 22 Qc4 nos dois ramos; é captura (Qxc4). Faltavam também sinais de xeque (24.Re5+, 28.Qxb8+) e a captura em 25.Rxc5.
// Stockfish: no fim da coluna 20 dá cerca de +3 para as brancas (o livro diz =); anotado.

const B = '1 d4 d5 2 c4 c6 3 Nf3 Nf6 4 Nc3 e6 5 e3 Nbd7 6 Bd3 dxc4 7 Bxc4 b5 8 Bd3 a6 9 e4 c5 10 d5 c4 11 dxe6 fxe6 12 Bc2'
const Q = `${B} Qc7 13 O-O`
const P = `${B} Bb7 13 O-O Qc7`

const colunas = {
  c19: [`${B} Qc7 13 Ng5 Nc5 14 f4 h6 15 e5 hxg5 16 Bg6+ Ke7 17 exf6+ gxf6 18 fxg5 Qe5+ 19 Ne2 Bg7`, 'qc7', '12...Qc7 13.Ng5', '∞',
    'Com 12...Qc7 13.Ng5 as brancas atacam e6 de imediato. Depois de 13...Nc5 14.f4 h6 15.e5 hxg5 16.Bg6+ Ke7 o jogo vira uma briga tática, e as chances são para os dois lados (Weichert–Bauer, Bundesliga 1995).'],
  c20: [`${Q} Bd6 14 Nd4 Nb6 15 Kh1 Bd7 16 f4 e5 17 Nf3 Bg4 18 a4 b4 19 a5 Bxf3`, 'qc7', '13.O-O Bd6 14.Nd4', '=',
    'Com 13.O-O Bd6 14.Nd4 o cavalo ataca e6 e prepara f4 e Nxb5, o plano mais enérgico. Depois de 15.Kh1 Bd7 16.f4 e5 17.Nf3 Bg4 18.a4 b4 19.a5 Bxf3 o jogo é igual (Østergaard–Gausel, Copenhague 1996). (O Stockfish discorda: cerca de +3, melhor para as brancas.)'],
  c21: [`${Q} Bc5 14 e5 Nxe5 15 Bf4 Bd6 16 Bxe5 Bxe5 17 Nxe5 Qxe5 18 Re1 Qc7 19 a4 Rb8`, 'qc7', '13...Bc5 14.e5', '∞',
    'Com 13...Bc5 14.e5 as brancas sacrificam um peão para abrir o jogo. Depois de 14...Nxe5 15.Bf4 Bd6 16.Bxe5 Bxe5 17.Nxe5 Qxe5 18.Re1 Qc7 19.a4 Rb8 a posição não é clara (Schandorff–Hector, Copenhague 1998).'],
  c22: [`${Q} Bc5 14 Qe2 Ne5 15 Nxe5 Qxe5 16 Be3 Bxe3 17 Qxe3 Ng4 18 Qh3 h5 19 Bd1 g5`, 'qc7', '14.Qe2', '=',
    'Com 14.Qe2 Ne5 15.Nxe5 Qxe5 16.Be3 as brancas trocam o bispo forte de c5. Depois de 16...Bxe3 17.Qxe3 Ng4 18.Qh3 h5 19.Bd1 g5 o jogo é igual (Collas–Hector, Genebra 1995).'],
  c23: [`${P} 14 Ng5 Nc5 15 e5 Qxe5 16 Re1 Qd6 17 Qxd6 Bxd6 18 Be3 O-O 19 Rad1 Be7`, 'bb7', '12...Bb7 14.Ng5', '=',
    'Com 12...Bb7 13.O-O Qc7 14.Ng5 Nc5 15.e5 Qxe5 16.Re1 Qd6 17.Qxd6 Bxd6 18.Be3 O-O 19.Rad1 Be7 as damas saem do tabuleiro e o final é igual (Kramnik–Shirov, Novgorod 1994).'],
  c24: [`${P} 14 Qe2 Bd6 15 Nd4 Nc5 16 f4 e5 17 Ndxb5 axb5 18 Nxb5 Qb6 19 Nxd6+ Qxd6`, 'bb7', '14.Qe2', '=',
    'Com 14.Qe2 Bd6 15.Nd4 Nc5 16.f4 e5 17.Ndxb5!? as brancas sacrificam o cavalo por dois peões e o par de bispos. Depois de 17...axb5 18.Nxb5 Qb6 19.Nxd6+ Qxd6 as pretas empataram com conforto (Flear–Galkin, 2001).'],
}

const notas = [
  // Coluna 19
  ['c19', 'a-A', 'a', '(a) A', '12... Nc5 13 Qxd8+ Kxd8 14 O-O Bb7 15 Ng5 Ke7 16 e5 Nfd7 17 f4 b4 18 Nce4 h6 19 Be3', { a: '±', r: 'Forintos–D. Ćirić, Sarajevo 1965', c: '12...Nc5 13.Qxd8+ Kxd8 14.O-O Bb7 15.Ng5 Ke7 16.e5 Nfd7 17.f4 b4 18.Nce4 h6 19.Be3! é melhor para as brancas.' }],
  ['c19', 'a-B', 'a', '(a) B', '12... Qb6 13 O-O Bb7 14 Qe2 O-O-O 15 a4 b4 16 a5 Qc7 17 Na4 b3 18 Bb1 Bb4 19 Bf4', { a: '±', r: 'Christiansen–Nikolac, Wijk aan Zee 1976', c: '12...Qb6 13.O-O Bb7 14.Qe2 O-O-O 15.a4 b4 16.a5 Qc7 17.Na4 b3 18.Bb1 Bb4 19.Bf4! é melhor para as brancas.' }],
  ['c19', 'b', 'b', '(b)', '14... Bb7 15 e5 Rd8 16 Bd2 Nd5 17 Qh5+ g6 18 Bxg6+ hxg6 19 Qxh8 Nxf4 20 O-O-O Qxe5 21 Qxe5 Nfd3+ 22 Kc2 Nxe5 23 Be3', { a: '±', r: 'Faragó–Chandler, Belgrado 1982', c: '14...Bb7?! 15.e5 Rd8 16.Bd2 Nd5 17.Qh5+ g6 18.Bxg6+ hxg6 19.Qxh8 Nxf4 20.O-O-O Qxe5 21.Qxe5 Nfd3+ 22.Kc2 Nxe5 23.Be3! é melhor para as brancas.' }],
  ['c19', 'c', 'c', '(c)', '20 Bf4 Qd5 21 Qxd5 exd5 22 O-O-O f5 23 Rxd5 Nd3+ 24 Kb1 Be6', { a: '∞', r: 'Weichert–Bauer, Bundesliga 1995', c: '20.Bf4 Qd5 21.Qxd5 exd5 22.O-O-O f5 23.Rxd5 Nd3+ 24.Kb1 Be6 dá chances aos dois lados.' }],
  // Coluna 20
  ['c20', 'd', 'd', '(d)', '14 Bg5 O-O 15 Bxf6 Nxf6 16 Re1 Be5 17 Qd2 Ng4 18 h3 Bh2+ 19 Kh1 Bf4 20 Qe2 Ne5', { a: '∓', r: 'Ostenstad–Gausel, Gausdal 1995', c: 'Os outros lances são menos eficazes: 14.Bg5 O-O 15.Bxf6?! Nxf6 16.Re1 Be5! 17.Qd2 Ng4 18.h3 Bh2+ 19.Kh1 Bf4 20.Qe2 Ne5, e as pretas dominam.' }],
  ['c20', 'e-A', 'e', '(e) A', '15 f4 e5 16 Nf3 Bg4 17 h3 O-O-O 18 Kh1 Bxf3 19 Qxf3 exf4', { a: '∓', r: 'Faragó–Radulov, Băile Herculane 1982', c: '15.f4?! e5 16.Nf3 Bg4 17.h3 O-O-O 18.Kh1 Bxf3 19.Qxf3 exf4 é melhor para as pretas.' }],
  ['c20', 'e-B', 'e', '(e) B', '15 a4 b4 16 a5 bxc3 17 axb6 cxb2 18 Bxb2 Qxb6 19 Rb1', { a: '±', r: 'Donaldson', c: 'O melhor das brancas talvez seja 15.a4! b4 16.a5 bxc3 17.axb6 cxb2 18.Bxb2 Qxb6 19.Rb1, melhor para as brancas (Donaldson).' }],
  ['c20', 'f', 'f', '(f)', '18... Bxf3 19 Qxf3 b4 20 fxe5 Bxe5 21 a5 Nbd7 22 Nd5 Qd6 23 Nxf6+ Nxf6 24 Ba4+ Kf7 25 Qh5+ Kg8', { a: '=', r: 'Zubov–Matrovasilis, Azerbaijão 2003', c: '18...Bxf3 19.Qxf3 b4 20.fxe5 Bxe5 21.a5 Nbd7 22.Nd5 Qd6 23.Nxf6+ Nxf6 24.Ba4+ Kf7 25.Qh5+ Kg8 deixa as pretas com um jogo sólido.' }],
  ['c20', 'g-A', 'g', '(g) A', '19... bxc3 20 axb6 Qxb6 21 Ba4+ Kf7 22 fxe5 cxb2 23 exf6 bxa1=Q 24 Qd5+', { a: '+−', r: 'Yevseev–Ignatiev, 2004', c: '19...Bxf3 é melhor que 19...bxc3?! 20.axb6 Qxb6 21.Ba4+ Kf7 22.fxe5 cxb2 23.exf6 bxa1=Q 24.Qd5+, com ataque de mate. (O Stockfish confirma: é mate.)' }],
  ['c20', 'g', 'g', '(g)', '20 Rxf3 Nbd7 21 Nd5 Nxd5 22 Qxd5 O-O-O', { a: '=', r: 'Østergaard–Gausel, Copenhague 1996', c: '20.Rxf3 Nbd7 21.Nd5 Nxd5 22.Qxd5 O-O-O! é igual.' }],
  // Coluna 21
  ['c21', 'h-A', 'h', '(h) A', '14 b3 O-O 15 h3 Ne5 16 bxc4 Nfg4 17 Nxe5 Nxf2 18 Qh5 g6 19 Qe2 Nxh3+ 20 Kh2 Qxe5+ 21 Kxh3 Qxc3+', { a: '−+', r: 'Vaganian–Panchenko, Moscou 1981 (0–1)', c: '14.b3?! O-O 15.h3 Ne5 16.bxc4 Nfg4! 17.Nxe5 Nxf2 18.Qh5 g6 19.Qe2 Nxh3+ 20.Kh2 Qxe5+ 21.Kxh3 Qxc3+, e as brancas abandonaram.' }],
  ['c21', 'h-B', 'h', '(h) B', '14 Ng5 Ne5 15 Bf4 O-O 16 Bg3 h6 17 Nh3 Bb7 18 Qe2 Bd4 19 Rad1 Rad8 20 Nf4 Qb6 21 h3 b4 22 Na4 Qc6', { a: '∓', r: 'Georgadze–Yusupov, Campeonato da URSS 1980/81', c: '14.Ng5?! Ne5! 15.Bf4 O-O 16.Bg3 h6 17.Nh3 Bb7 18.Qe2 Bd4 19.Rad1 Rad8 20.Nf4 Qb6 21.h3 b4 22.Na4 Qc6 é melhor para as pretas.' }],
  ['c21', 'i', 'i', '(i)', '16 Re1 Nxf3+ 17 Qxf3 Bxf4 18 Qxa8 Bxh2+', { a: '∞', c: '16.Re1 Nxf3+ 17.Qxf3 Bxf4 18.Qxa8 Bxh2+ dá às pretas boa compensação pela qualidade.' }],
  ['c21', 'j', 'j', '(j)', '18... Qc5 19 Ne4 Nxe4 20 Bxe4 Ra7 21 b4 Qg5 22 f4 Qh4 23 g3 Qd8 24 Qh5+', { a: '±', r: 'Lautier–Piket, match 1996', c: '18...Qc5 19.Ne4 Nxe4 20.Bxe4 Ra7 21.b4! Qg5 22.f4! Qh4 23.g3 Qd8 24.Qh5+ é melhor para as brancas.' }],
  // Coluna 22
  ['c22', 'k', 'k', '(k)', '15 Bf4 Nxf3+ 16 Qxf3 e5 17 Bg5 O-O 18 Bxf6 gxf6 19 a4 Rb8 20 axb5 axb5 21 b3 Bd4 22 Nd5 Qg7', { a: '=', r: 'Lautier–Beliavsky, Linares 1995', c: '15.Bf4 Nxf3+ 16.Qxf3 e5 17.Bg5 O-O 18.Bxf6 gxf6 19.a4 Rb8 20.axb5 axb5 21.b3 Bd4 22.Nd5 Qg7 é igual.' }],
  ['c22', 'l', 'l', '(l)', '16 Kh1 Bb7 17 f4 Qh5 18 Qxh5+ Nxh5 19 e5 O-O-O 20 Ne4 Bxe4 21 Bxe4 Rd4 22 Bc2 g6 23 Be3 Rd5 24 Bxc5 Rxc5 25 g4', { a: '±', r: 'Peralta–Vera, Andorra 2006', c: 'Sem trocar antes em e3, os bispos pretos ficam muito fortes; ainda assim, 16.Kh1 Bb7 17.f4 Qh5 18.Qxh5+ Nxh5 19.e5 O-O-O 20.Ne4! Bxe4 21.Bxe4 Rd4 22.Bc2 g6 23.Be3 Rd5 24.Bxc5 Rxc5 25.g4 deu vantagem às brancas.' }],
  ['c22', 'm', 'm', '(m)', '17... O-O 18 Rad1 Ng4 19 Qg3 Qxg3 20 hxg3 Ra7 21 Rd2 b4 22 Na4 Rc7', { a: '=', r: 'Hort–Sehner, Bundesliga 1985–86', c: 'Também é bom 17...O-O 18.Rad1 Ng4 19.Qg3 Qxg3 20.hxg3 Ra7 21.Rd2 b4 22.Na4 Rc7, com chances pelo menos iguais.' }],
  ['c22', 'n', 'n', '(n)', '20 Bxg4 hxg4 21 Qg3 Qxg3 22 fxg3 Ra7 23 e5 Rah7 24 Ne4 Rxh2 25 Nd6+ Kd7 26 Rf7+ Kc6 27 Kf2 Bd7', { a: '=', r: 'Collas–Hector, Genebra 1995', c: '20.Bxg4 hxg4 21.Qg3 Qxg3 22.fxg3 Ra7 23.e5 Rah7 24.Ne4 Rxh2 25.Nd6+ Kd7 26.Rf7+ Kc6 27.Kf2 Bd7 é igual.' }],
  ['c22-n', '1', 'n', '(n) 20.Rc1', '20 Rc1 Ra7 21 b3 Rf7', { a: '∓', r: 'Tukmakov–Bareev, Campeonato da Rússia 1998', c: '20.Rc1 Ra7 21.b3 Rf7 é melhor para as pretas.' }],
  // Coluna 23
  ['c23', 'o', 'o', '(o)', '8... Bb7 9 O-O a6 10 e4 c5 11 d5 Qc7 12 dxe6 fxe6 13 Bc2 c4', { c: 'A mesma posição pode surgir pela ordem 8...Bb7 9.O-O a6 10.e4 c5 11.d5 Qc7 12.dxe6 fxe6 13.Bc2 c4.' }],
  ['c23', 'p', 'p', '(p)', '15 f4 h6 16 e5 Nd3 17 Bxd3 O-O-O 18 Nf3 Rxd3 19 Qe2 Bc5+ 20 Kh1 Nd5 21 Ne4 Rf8 22 Ne1 Rd4 23 Nxc5 Qxc5 24 Qg4 Qe7 25 Nf3 Rdxf4 26 Bxf4 Rxf4 27 Qg3 g5 28 Rae1 Qb4 29 Rf2 Ne7', { a: '∓', r: 'Gligorić–Yusupov, Vrbas 1980', c: '15.f4 h6 16.e5?! Nd3 17.Bxd3 O-O-O! 18.Nf3 Rxd3 19.Qe2 Bc5+ 20.Kh1 Nd5 21.Ne4 Rf8! 22.Ne1 Rd4 23.Nxc5 Qxc5 24.Qg4 Qe7 25.Nf3 Rdxf4 26.Bxf4 Rxf4 27.Qg3 g5 28.Rae1 Qb4 29.Rf2 Ne7! é melhor para as pretas. (O Stockfish vai além: cerca de −4.)' }],
  ['c23', 'q', 'q', '(q)', '20 Bxc5 Bxc5 21 Nxe6 Rfc8 22 h3 Rab8 23 Nxc5 Rxc5 24 Re6 b4 25 Na4 Rg5', { a: '=', r: 'Kramnik–Shirov, Novgorod 1994', c: '20.Bxc5 Bxc5 21.Nxe6 Rfc8 22.h3 Rab8 23.Nxc5 Rxc5 24.Re6 b4 25.Na4 Rg5 é igual. (O livro traz ainda um parêntese, 23.Re7 Rb8 24.h3…, impossível nesta posição; ficou de fora.)' }],
  // Coluna 24
  ['c24', 'r', 'r', '(r)', '14... Bc5 15 e5 Ng4 16 Be4 O-O 17 Bxh7+ Kxh7 18 Ng5+ Kg8 19 Qxg4 Qxe5 20 Qxe6+', { a: '±', r: 'Portisch–Inkiov, Olimpíada de Lucerna 1982', c: '14...Bc5 15.e5 Ng4 16.Be4! O-O 17.Bxh7+ Kxh7 18.Ng5+ Kg8 19.Qxg4 Qxe5 20.Qxe6+ é melhor para as brancas.' }],
  ['c24', 's', 's', '(s)', '15 Bg5 O-O 16 Rad1 Bf4 17 b3 cxb3 18 Bxb3 Nc5 19 Bxf4 Qxf4 20 Nd4 Kh8', { a: '∓', r: 'Nikolov–Korneev, 2005', c: '15.Bg5 O-O 16.Rad1 Bf4 17.b3 cxb3 18.Bxb3 Nc5 19.Bxf4 Qxf4 20.Nd4 Kh8 é melhor para as pretas.' }],
  ['c24', 't', 't', '(t)', '17 Nf5 O-O 18 Nxd6 Qxd6 19 fxe5 Qxe5 20 Rf5 Qc7', { a: '=', r: 'Horváth–Savchenko, Eslovênia 1997', c: '17.Nf5 O-O 18.Nxd6 Qxd6 19.fxe5 Qxe5 20.Rf5 Qc7 é igual.' }],
  ['c24', 'u', 'u', '(u)', '20 fxe5 Qxe5 21 Rf5 Qe7 22 Qxc4 Rc8 23 Qb5+ Ncd7 24 Qxb7 Rxc2 25 Bg5 Qd6 26 Bxf6 gxf6 27 Qa8+ Qb8 28 Qxb8+ Nxb8 29 Rxf6 Rxb2', { a: '=', r: 'Flear–Galkin, Monarch Assurance 2001', c: '20.fxe5 Qxe5 21.Rf5 Qe7 22.Qxc4 Rc8 23.Qb5+ Ncd7 24.Qxb7 Rxc2 25.Bg5 Qd6 26.Bxf6 gxf6 27.Qa8+ Qb8 28.Qxb8+ Nxb8 29.Rxf6 Rxb2, e as pretas empataram com conforto.' }],
  ['c24-u', '1', 'u', '(u) 21...Qc7', '21... Qc7 22 Qxc4 Rc8 23 Bf4 Qc6 24 Re5+ Kf8 25 Rxc5', { a: '+−', r: 'Kožul–Bilobrk, Bósnia 2004 (1–0)', c: '21...Qc7? 22.Qxc4 Rc8 23.Bf4 Qc6 24.Re5+ Kf8 25.Rxc5, e as pretas abandonaram.' }],
  ['c24-u', '2', 'u', '(u) 26.Qa8+', '26 Qa8+ Qb8', { a: '=', c: '26.Qa8+ Qb8 também é igual.' }],
]

const capitulo = {
  id: 'eslava-d',
  arquivo: 'eslava-d',
  nome: 'Semi-Eslava — Reynolds com 10...c4 11.dxe6 fxe6 12.Bc2',
  fonte: 'Modern Chess Openings — Slav and Semi-Slav Defense (pp. 470–471), colunas 19–24',
  base: '1. d4 d5 2. c4 c6',
  corPadrao: 'b',
  ordem: 470,
  grupos: [
    { id: 'qc7', nome: '12...Qc7', colunas: [19, 20, 21, 22] },
    { id: 'bb7', nome: '12...Bb7', colunas: [23, 24] },
  ],
}

module.exports = { capitulo, colunas, notas }
