// Transcrição do MCO 15ª ed. — Índia do Rei, Variante Sämisch (pp. 613–615), colunas 43–48.
// Gerar: node scripts/mco/gerar.cjs india-rei-h
// Formato: ver gambito-do-rei.cjs. Dicas em india-rei-h-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua:
// 43 (f) ⩲, 44 (h) =, 45 (n) ⩲, 46 (p) ⩲, 47 (s) ∞, 48 (x) ⩲.
// Avaliações tiradas do texto: (e) "mais ou menos igual" ficou =; (i) "bom jogo para as pretas" e "excelente
// compensação" ficaram =; (m) "favorece as brancas" ficou ⩲; (s) "contrajogo na coluna b" ficou ∞.
// Sinais conferidos com zoom: (a) 6...Nc6, (i) 7...exd4 8.Nxd4 e (j) 8...f5, (m) 13...a6, (u), (w) ±; (b), (d) C,
// (f), (g), (j) A e B, (k), (l), (m) 14...Bd7, (n), (p), (q), (r), (t) A e B, (v), (x) ⩲; (c) C, (d) A e B, (o)
// 10.Rd1 ∓.
// Notação: (e) "19 e6 Re6" ficou 19...Rxe6 (a torre toma o peão) e "17...Nfd7" ficou 17...Nd7; (d) A "18 Nd5" é
// ambíguo e ficou 18.Ncd5 (o cavalo de c3, atacado por 17...b4).
// Errata: (t) A "10...Nxd6" é impossível (nenhum cavalo preto alcança d6 de d7 ou b8); ficou 10...exd6.

const F = '1 d4 Nf6 2 c4 g6 3 Nc3 Bg7 4 e4 d6 5 f3 O-O 6 Be3'

const colunas = {
  c43: [`${F} Nc6 7 Qd2 a6 8 Nge2 Rb8 9 Nc1 e5 10 d5 Nd4 11 N1e2 Nxe2 12 Bxe2 Nh5 13 O-O-O f5 14 Kb1 Nf4`, 'nc6', '6...Nc6 7.Qd2 a6', '⩲',
    'O Sämisch (5.f3) firma e4 e prepara Be3, Qd2 e às vezes o roque grande com ataque na ala do rei. Com 6...Nc6 e ...a6 as pretas preparam ...Rb8 e ...b5. Depois de 7.Qd2 a6 8.Nge2 Rb8 9.Nc1 e5 10.d5 Nd4 11.N1e2 Nxe2 12.Bxe2 Nh5 13.O-O-O f5 14.Kb1 Nf4 as brancas ficam um pouco melhor.'],
  c44: [`${F} Nc6 7 Nge2 a6 8 a3 Bd7 9 b4 Qb8 10 Nc1 b5 11 cxb5 axb5 12 Nb3 e5 13 d5 Ne7 14 Be2 Rd8`, 'nc6', '7.Nge2', '=',
    'Com 7.Nge2 o cavalo segue para c1 e b3. Depois de 7...a6 8.a3 Bd7 9.b4 Qb8!? 10.Nc1 b5 11.cxb5 axb5 12.Nb3 e5 13.d5 Ne7 14.Be2 Rd8 o jogo fica igual.'],
  c45: [`${F} e5 7 d5 c6 8 Bd3 cxd5 9 cxd5 Ne8 10 Qd2 f5 11 exf5 gxf5 12 Nge2 Nd7 13 O-O Kh8 14 Kh1 a6`, 'e5', '6...e5 7.d5 c6', '⩲',
    'Com 6...e5 as pretas desafiam o centro já. Depois de 7.d5 c6 8.Bd3 cxd5 9.cxd5 Ne8 10.Qd2 f5 11.exf5 gxf5 12.Nge2 Nd7 13.O-O Kh8 14.Kh1 a6 as brancas ficam um pouco melhor.'],
  c46: [`${F} c5 7 d5 e6 8 Qd2 exd5 9 cxd5 a6 10 a4 Nbd7 11 Nge2 Re8 12 Ng3 h5 13 Be2 h4 14 Nf1 h3`, 'c5', '6...c5', '⩲',
    'O 6...c5 golpeia d4 e leva a uma estrutura de Benoni. Depois de 7.d5 e6 8.Qd2 exd5 9.cxd5 a6 10.a4 Nbd7 11.Nge2 Re8 12.Ng3 h5 13.Be2 h4 14.Nf1 h3 as brancas ficam um pouco melhor.'],
  c47: [`${F} a6 7 Qd2 Nbd7 8 Bd3 c5 9 d5 b5 10 cxb5 Qa5 11 Nge2 Nb6 12 a4 axb5 13 Bxb5 Ba6 14 Bxa6 Qxa6`, 'a6', '6...a6', '∞',
    'O 6...a6 prepara ...b5 ou ...c5. Depois de 7.Qd2 Nbd7 8.Bd3 c5 9.d5 b5 10.cxb5 Qa5 11.Nge2 Nb6 12.a4 axb5 13.Bxb5 Ba6 14.Bxa6 Qxa6 as pretas têm um gambito no estilo Benko e contrajogo na coluna b.'],
  c48: [`${F} c6 7 Bd3 a6 8 a4 a5 9 Nge2 e5 10 O-O Na6 11 Qd2 exd4 12 Nxd4 Re8 13 Rad1 Nc5 14 Bc2 Qe7`, 'c6', '6...c6', '⩲',
    'O 6...c6 prepara ...a6 e ...b5. Depois de 7.Bd3 a6 8.a4 a5 9.Nge2 e5 10.O-O Na6 11.Qd2 exd4 12.Nxd4 Re8 13.Rad1 Nc5 14.Bc2 Qe7 as brancas ficam um pouco melhor.'],
}

const notas = [
  // Coluna 43
  ['c43', 'a', 'a', '(a)', '6 Bg5 a6', { c: '6.Bg5!? a6 é outra forma de jogar o Sämisch.' }],
  ['c43-a', '1', 'a', '(a) 6...h6', '6... h6 7 Be3', { c: '6...h6!? 7.Be3 volta às linhas com Be3.' }],
  ['c43-a', '2', 'a', '(a) 6...Nc6', '6... Nc6 7 Nge2 a6 8 Qd2 Bd7 9 h4 h5 10 O-O-O b5 11 Bh6 e5 12 Nd5 Bxh6 13 Qxh6', { a: '±', r: 'Sadler–Nunn, Hastings 1992/93', c: '6...Nc6 7.Nge2 a6 8.Qd2 Bd7 9.h4 h5 10.O-O-O b5 11.Bh6 e5 12.Nd5 Bxh6 13.Qxh6 é melhor para as brancas.' }],
  ['c43-a', '3', 'a', '(a) 6...c5', '6... c5 7 d5 e6 8 Qd2 exd5 9 cxd5', { c: '6...c5 7.d5 e6 8.Qd2 exd5 9.cxd5 é muito jogado e pertence à Benoni.' }],
  ['c43', 'b', 'b', '(b)', '7... e5 8 d5 Nd4 9 Nge2 Nxe2 10 Bxe2', { a: '⩲', c: '7...e5?! 8.d5 Nd4 9.Nge2 Nxe2 10.Bxe2 é um pouco melhor para as brancas.' }],
  ['c43', 'c-A', 'c', '(c) A', '8 Bd3 Nd7 9 Nge2 e5 10 d5 Nd4', { a: '=', c: '8.Bd3 Nd7 9.Nge2 e5 10.d5 Nd4 leva à igualdade.' }],
  ['c43', 'c-B', 'c', '(c) B', '8 h4 h5 9 Bd3 e5', { a: '=', c: '8.h4 h5 9.Bd3 e5 leva à igualdade.' }],
  ['c43', 'c-C', 'c', '(c) C', '8 a3 e5 9 d5 Nd4', { a: '∓', c: '8.a3? e5 9.d5 Nd4 é melhor para as pretas.' }],
  ['c43', 'd-A', 'd', '(d) A', '9 Bh6 Bxh6 10 Qxh6 e5 11 O-O-O exd4 12 Nxd4 Ne5 13 h4 c5 14 Nc2 Be6 15 Ne3 b5 16 h5 Rb7 17 Qg5 b4 18 Ncd5 Nxd5 19 Qxd8 Rxd8', { a: '∓', r: 'Gvein–Burgess, Gausdal 1995', c: '9.Bh6 Bxh6 10.Qxh6 e5 11.O-O-O exd4 12.Nxd4 Ne5 13.h4 c5 14.Nc2 Be6 15.Ne3 b5 16.h5 Rb7 17.Qg5 b4 18.Ncd5 Nxd5 19.Qxd8 Rxd8 é melhor para as pretas.' }],
  ['c43', 'd-B', 'd', '(d) B', '9 g4 b5 10 h4 h5 11 gxh5 Nxh5 12 cxb5 axb5 13 O-O-O b4', { a: '∓', r: 'Djukić–Dragović, Iugoslávia 1994', c: '9.g4 b5 10.h4 h5 11.gxh5 Nxh5 12.cxb5 axb5 13.O-O-O b4 é melhor para as pretas.' }],
  ['c43', 'd-C', 'd', '(d) C', '9 h4 h5 10 Nc1 e5 11 d5 Nd4 12 N1e2 c5 13 dxc6 bxc6 14 Nxd4 exd4 15 Bxd4 Re8 16 Be2 d5 17 cxd5 cxd5 18 e5', { a: '⩲', r: 'Karpov–Kindermann, Baden-Baden 1992', c: '9.h4!? h5 10.Nc1 e5 11.d5 Nd4 12.N1e2 c5 13.dxc6 bxc6 14.Nxd4 exd4 15.Bxd4 Re8 16.Be2 d5 17.cxd5 cxd5 18.e5 é um pouco melhor para as brancas.' }],
  ['c43', 'e', 'e', '(e)', '11... c5 12 dxc6 bxc6 13 Nxd4 exd4 14 Bxd4 Re8 15 Be2 d5 16 cxd5 cxd5 17 e5 Nd7 18 f4 f6 19 e6 Rxe6', { a: '=', c: '11...c5 12.dxc6 bxc6 13.Nxd4 exd4 14.Bxd4 Re8 15.Be2 d5 16.cxd5 cxd5 17.e5 Nd7 18.f4 f6 19.e6 Rxe6 fica mais ou menos igual.' }],
  ['c43', 'f', 'f', '(f)', '15 Bf1 b6 16 g3 Nh5 17 Be2 Nf6 18 Bg5 Qe8 19 Bd3 fxe4 20 Nxe4', { a: '⩲', r: 'Karpov–C. Hansen, Groningen 1995', c: '15.Bf1 b6 16.g3 Nh5 17.Be2 Nf6 18.Bg5 Qe8 19.Bd3 fxe4 20.Nxe4 é um pouco melhor para as brancas.' }],
  // Coluna 44
  ['c44', 'g', 'g', '(g)', '8 Rb1 e5 9 d5 Na5 10 Ng3 c5 11 Bd3 b5 12 cxb5 axb5 13 Bxb5 h5 14 O-O', { a: '⩲', r: 'Gulko–Djurhuus, Copenhague 1996', c: '8.Rb1!? e5 9.d5 Na5 10.Ng3 c5 11.Bd3 b5 12.cxb5 axb5 13.Bxb5 h5 14.O-O é um pouco melhor para as brancas.' }],
  ['c44-g', '1', 'g', '(g) 8...Rb8', '8... Rb8', { c: '8...Rb8 também é possível.' }],
  ['c44', 'h', 'h', '(h)', '15 O-O c6', { a: '=', r: 'Brunner–Xie Jun, Berna 1995', c: '15.O-O c6! leva à igualdade.' }],
  // Coluna 45
  ['c45', 'i', 'i', '(i)', '7 Nge2 c6 8 Qd2 Nbd7 9 O-O-O a6 10 Kb1 b5 11 Nc1 exd4 12 Bxd4 Re8 13 Bxf6 Qxf6 14 Qxd6 Qxd6 15 Rxd6 Ne5 16 f4 Ng4 17 e5 Nf2 18 Rg1 Bf5+', { a: '=', r: 'Shirov–Kasparov, Dortmund 1992', c: '7.Nge2 c6 8.Qd2 Nbd7 9.O-O-O a6 10.Kb1 b5 11.Nc1 exd4 12.Bxd4 Re8 13.Bxf6 Qxf6 14.Qxd6 Qxd6 15.Rxd6 Ne5 16.f4 Ng4 17.e5 Nf2 18.Rg1 Bf5+ dá às pretas excelente compensação pelo peão.' }],
  ['c45-i', '1', 'i', '(i) 7...exd4', '7... exd4 8 Nxd4', { a: '⩲', c: '7...exd4 8.Nxd4 é um pouco melhor para as brancas.' }],
  ['c45-i', '2', 'i', '(i) 8...exd4', '8... exd4 9 Nxd4 Re8 10 Be2 d5 11 exd5 cxd5 12 O-O Nc6 13 c5 Rxe3 14 Qxe3 Qf8 15 Ncb5 Qxc5', { a: '=', r: 'Gelfand–Kasparov, Linares 1992', c: '8...exd4 9.Nxd4 Re8 10.Be2 d5 11.exd5 cxd5 12.O-O Nc6 13.c5 Rxe3 14.Qxe3 Qf8! 15.Ncb5 Qxc5 dá bom jogo às pretas.' }],
  ['c45', 'j-A', 'j', '(j) A', '7... Nh5 8 Qd2 Qh4+ 9 g3 Nxg3 10 Qf2 Nxf1 11 Qxh4 Nxe3 12 Ke2 Nxc4 13 Rc1 Na6 14 Nd1 Nb6 15 Ne3 Bd7 16 Nh3', { a: '⩲', c: '7...Nh5 8.Qd2 Qh4+ 9.g3 Nxg3 10.Qf2 Nxf1 11.Qxh4 Nxe3 12.Ke2 Nxc4 13.Rc1 Na6 14.Nd1 Nb6 15.Ne3 Bd7 16.Nh3 é um pouco melhor para as brancas: a posição preta é sólida, mas a dama vale mais.' }],
  ['c45-j-A', '1', 'j', '(j) A 8...f5', '8... f5 9 O-O-O f4 10 Bf2 Bf6 11 Qe1 Be7 12 g4 Ng7 13 h4 Nd7 14 Nge2', { a: '±', c: '8...f5 9.O-O-O f4 10.Bf2 Bf6 11.Qe1 Be7 12.g4 Ng7 13.h4 Nd7 14.Nge2 é melhor para as brancas.' }],
  ['c45-j-A', '2', 'j', '(j) A 9.Bf2', '9 Bf2 Qf4', { c: '9.Bf2 Qf4 também é possível.' }],
  ['c45', 'j-B', 'j', '(j) B', '7... Ne8 8 Qd2 f5 9 O-O-O', { a: '⩲', c: '7...Ne8 8.Qd2 f5 9.O-O-O é um pouco melhor para as brancas.' }],
  ['c45', 'k', 'k', '(k)', '8 Nge2 cxd5 9 cxd5 a6 10 Qd2 Nbd7 11 g4 h5 12 h3 Nh7 13 Rg1 hxg4 14 hxg4', { a: '⩲', c: '8.Nge2 cxd5 9.cxd5 a6 10.Qd2 Nbd7 11.g4 h5 12.h3 Nh7 13.Rg1 hxg4 14.hxg4 é um pouco melhor para as brancas.' }],
  ['c45-k', '1', 'k', '(k) 9...Nbd7', '9... Nbd7', { c: '9...Nbd7 também é jogado.' }],
  ['c45', 'l', 'l', '(l)', '8... b5 9 a3 cxd5 10 cxd5 a6 11 Nge2 Ne8 12 O-O Nd7 13 Kh1 Kh8 14 b4 f5 15 exf5 gxf5 16 a4', { a: '⩲', r: 'Ivanchuk–Piket, Tilburg 1989', c: '8...b5 9.a3 cxd5 10.cxd5 a6 11.Nge2 Ne8 12.O-O Nd7 13.Kh1 Kh8 14.b4 f5 15.exf5 gxf5 16.a4 é um pouco melhor para as brancas.' }],
  ['c45-l', '1', 'l', '(l) 9.Nge2', '9 Nge2 bxc4 10 Bxc4 c5 11 a3 Nfd7 12 Qd2 Nb6 13 Bd3', { a: '⩲', c: '9.Nge2 bxc4 10.Bxc4 c5 11.a3 Nfd7 12.Qd2 Nb6 13.Bd3 é um pouco melhor para as brancas.' }],
  ['c45', 'm', 'm', '(m)', '9... Nh5 10 Nge2 f5 11 exf5 gxf5 12 O-O Nd7 13 Qd2 Ndf6 14 Kh1 Kh8 15 Bg5 Bd7 16 Qc2', { a: '⩲', r: 'Lautier–Smirin, Birmingham 2006', c: '9...Nh5 10.Nge2 f5 11.exf5 gxf5 12.O-O Nd7 13.Qd2 Ndf6 14.Kh1 Kh8 15.Bg5 Bd7 16.Qc2! favorece as brancas.' }],
  ['c45-m', '1', 'm', '(m) 13...a6', '13... a6 14 Bxf5 Rxf5 15 g4', { a: '±', c: '13...a6 14.Bxf5! Rxf5 15.g4! é melhor para as brancas.' }],
  ['c45-m', '2', 'm', '(m) 14...Bd7', '14... Bd7 15 a4 a6 16 a5', { a: '⩲', r: 'Fedorowicz–Sherzer, Campeonato dos EUA 1992', c: '14...Bd7 15.a4 a6 16.a5 é um pouco melhor para as brancas.' }],
  ['c45', 'n', 'n', '(n)', '15 Rac1 b5 16 Bg5 Bf6 17 Bh6 Bg7 18 Bxg7+ Nxg7 19 f4', { a: '⩲', r: 'Christiansen–Kožul, Biel 1991', c: '15.Rac1 b5 16.Bg5 Bf6 17.Bh6 Bg7 18.Bxg7+ Nxg7 19.f4 é um pouco melhor para as brancas.' }],
  // Coluna 46
  ['c46', 'o', 'o', '(o)', '7 dxc5 dxc5 8 Qxd8 Rxd8 9 Bxc5 Nc6 10 Nd5 Nd7 11 Bxe7 Nxe7 12 Nxe7+ Kf8 13 Nd5 Bxb2 14 Rd1 Nc5 15 Ne2 Bd7 16 Nec3 Be6 17 Be2 Rac8', { a: '=', r: 'Timman–J. Polgar, Paris (rápidas) 1992', c: 'O sacrifício de peão depois de 7.dxc5 dxc5 8.Qxd8 Rxd8 9.Bxc5 é uma das melhores linhas das pretas: o contrajogo vem das casas escuras. 9...Nc6 10.Nd5 Nd7 11.Bxe7 Nxe7 12.Nxe7+ Kf8 13.Nd5 Bxb2 14.Rd1 Nc5 15.Ne2 Bd7 16.Nec3 Be6 17.Be2 Rac8 leva à igualdade.' }],
  ['c46-o', '1', 'o', '(o) 7.Nge2', '7 Nge2', { c: '7.Nge2!? também é possível.' }],
  ['c46-o', '2', 'o', '(o) 8.e5', '8 e5 Nfd7 9 f4 f6 10 exf6 exf6 11 Nf3', { a: '=', c: '8.e5!? Nfd7 9.f4 f6 10.exf6 exf6 11.Nf3 leva à igualdade.' }],
  ['c46-o-2', '1', 'o', '(o) 10...Nxf6', '10... Nxf6', { c: '10...Nxf6!? também é possível.' }],
  ['c46-o', '3', 'o', '(o) 10.Rd1', '10 Rd1 Rxd1+ 11 Nxd1 Nd7 12 Ba3 a5 13 Ne3 Nb4 14 Nh3 Nc5 15 Nf2 e6 16 Be2 b6', { a: '∓', r: 'Razuvaev–Shirov, Alemanha 1991', c: '10.Rd1 Rxd1+ 11.Nxd1 Nd7 12.Ba3 a5 13.Ne3 Nb4 14.Nh3 Nc5 15.Nf2 e6 16.Be2 b6 é melhor para as pretas.' }],
  ['c46-o', '4', 'o', '(o) 10.Ba3', '10 Ba3 a5 11 Rd1 Be6 12 Nd5 Bxd5 13 cxd5 Nb4 14 Bb5 Nc2+ 15 Kf2 Nxa3 16 bxa3 Rac8', { a: '=', r: 'Knaak–Piket, Olimpíada de Novi Sad 1990', c: '10.Ba3 a5 11.Rd1 Be6 12.Nd5 Bxd5 13.cxd5 Nb4 14.Bb5 Nc2+ 15.Kf2 Nxa3 16.bxa3 Rac8 leva à igualdade.' }],
  ['c46', 'p', 'p', '(p)', '15 g4 Ne5 16 Ng3 Bd7 17 O-O', { a: '⩲', r: 'Wallace–Hebden, Hastings Open 1995', c: '15.g4 Ne5 16.Ng3 Bd7 17.O-O é um pouco melhor para as brancas; as pretas talvez fiquem melhor sem ...h4 e ...h3.' }],
  // Coluna 47
  ['c47', 'q', 'q', '(q)', '8 Nh3 c5 9 Nf2 Qa5 10 dxc5 dxc5 11 f4 e5 12 f5', { a: '⩲', r: 'Lautier–Inarkiev, Esmirna 2004', c: 'Aqui as brancas podiam levar o cavalo a f2 com 8.Nh3! c5 9.Nf2 Qa5 10.dxc5 dxc5 11.f4 e5 12.f5, um pouco melhor para elas.' }],
  ['c47', 'r', 'r', '(r)', '9 Nge2 cxd4 10 Nxd4 e6 11 O-O', { a: '⩲', c: 'O mais sólido é 9.Nge2 cxd4 10.Nxd4 e6 11.O-O, um pouco melhor para as brancas.' }],
  ['c47', 's', 's', '(s)', '15 Qc2 Rfb8', { a: '∞', c: '15.Qc2 Rfb8 e as pretas terão contrajogo na coluna b.' }],
  // Coluna 48
  ['c48', 't-A', 't', '(t) A', '6... b6 7 Bd3 a6 8 Nge2 c5 9 e5 Nfd7 10 exd6 exd6 11 O-O', { a: '⩲', c: '6...b6 7.Bd3 a6 8.Nge2 c5 9.e5! Nfd7 10.exd6 exd6 11.O-O é um pouco melhor para as brancas. (O livro imprime "10...Nxd6".)' }],
  ['c48-t-A', '1', 't', '(t) A 7.Qd2', '7 Qd2', { c: '7.Qd2!? também é possível.' }],
  ['c48', 't-B', 't', '(t) B', '6... Nbd7 7 Nh3 c6 8 Qd2 e5 9 d5 cxd5 10 cxd5 a6 11 Nf2 Nh5 12 Nd3', { a: '⩲', r: 'Dragimov–Mittelman, Biel Open 1997', c: '6...Nbd7!? 7.Nh3 c6 8.Qd2 e5 9.d5 cxd5 10.cxd5 a6 11.Nf2 Nh5 12.Nd3 é um pouco melhor para as brancas.' }],
  ['c48', 'u', 'u', '(u)', '7 Qd2 a6 8 O-O-O b5 9 Bh6 Bxh6 10 Qxh6 Qa5 11 Kb1 Nbd7 12 h4 Rb8 13 Qd2 Re8 14 g4', { a: '±', c: '7.Qd2 a6 8.O-O-O b5 9.Bh6 Bxh6 10.Qxh6 Qa5 11.Kb1 Nbd7 12.h4 Rb8 13.Qd2 Re8 14.g4 é melhor para as brancas; contra 8.O-O-O as pretas podem jogar no centro.' }],
  ['c48', 'v', 'v', '(v)', '8 Nge2 b5 9 O-O Nbd7 10 a3 Bb7 11 b4 e5 12 Qb3', { a: '⩲', r: 'Seirawan–Fedorowicz, Campeonato dos EUA 1984', c: '8.Nge2 b5 9.O-O Nbd7 10.a3 Bb7 11.b4 e5 12.Qb3 é um pouco melhor para as brancas.' }],
  ['c48-v', '1', 'v', '(v) 9.b3', '9 b3', { c: '9.b3!? também é possível.' }],
  ['c48-v', '2', 'v', '(v) 9.cxb5', '9 cxb5 cxb5 10 b4', { a: '⩲', c: '9.cxb5 cxb5 10.b4 é um pouco melhor para as brancas.' }],
  ['c48-v-2', '1', 'v', '(v) 9...axb5', '9... axb5', { c: '9...axb5!? também é possível.' }],
  ['c48', 'w', 'w', '(w)', '8... Nbd7 9 Nge2 e5 10 d5 c5 11 Qd2 Rb8 12 g4', { a: '±', r: 'Haecker–Kern, Alemanha 1988', c: '8...Nbd7 9.Nge2 e5 10.d5 c5 11.Qd2 Rb8 12.g4 é melhor para as brancas.' }],
  ['c48', 'x', 'x', '(x)', '15 Nb3 Nxb3 16 Bxb3', { a: '⩲', r: 'H. Olafsson–Wheeler, St. Martin 1993', c: '15.Nb3 Nxb3 16.Bxb3 é um pouco melhor para as brancas.' }],
]

const capitulo = {
  id: 'india-rei-h',
  arquivo: 'india-rei-h',
  nome: 'Índia do Rei — Sämisch',
  fonte: "Modern Chess Openings — King's Indian Defense (pp. 613–615), colunas 43–48",
  base: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3',
  corPadrao: 'b',
  ordem: 613,
  grupos: [
    { id: 'nc6', nome: '6...Nc6', colunas: [43, 44] },
    { id: 'e5', nome: '6...e5', colunas: [45] },
    { id: 'c5', nome: '6...c5', colunas: [46] },
    { id: 'a6', nome: '6...a6', colunas: [47] },
    { id: 'c6', nome: '6...c6', colunas: [48] },
  ],
}

module.exports = { capitulo, colunas, notas }
