// Transcrição do MCO 15ª ed. — Índia do Rei, Ataque dos Quatro Peões (pp. 616–617), colunas 49–54.
// Gerar: node scripts/mco/gerar.cjs india-rei-i
// Formato: ver gambito-do-rei.cjs. Dicas em india-rei-i-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua:
// 49 (e) =, 50 (j) =, 51 (n) =, 52 (p) =, 53 (v) =, 54 (w) ∓.
// Avaliações tiradas do texto: (a) "bom para as brancas" ficou ±; (b) "está bem para as pretas" ficou =; (c) 9.e5?!
// "bom para as pretas" ficou ∓; (e) "pelo menos igual para as pretas" ficou =; (f) "pequena vantagem" ficou ⩲;
// (g) e (v) "empate combinado" ficaram =; (h) 19.gxf3! "bom para as brancas" ficou ±; (j) "mais ou menos igual"
// ficou =; (k) "jogo ativo das pretas" ficou =; (q) 8.Nxe5 "bom para as pretas" ficou ∓; (r) "bom para as pretas"
// ficou ∓; (t) "obscuro" ficou ∞.
// Sinais conferidos com zoom: (a) 9...Qa5, (f) 8.Bd3 ⩲; (l) 14...Qa5, (q) A ±; (g) 9...Qc7, (n) 15.g3, (u), (w) ∓.
// Notação: o livro omite o xeque em (l) 14...Qb6+, (n) 14...Qh4+ e 15...Qxf2+, (r) 14...Bd4+ e (v) 26...Rxf1+.

const F = '1 d4 Nf6 2 c4 g6 3 Nc3 Bg7 4 e4 d6 5 f4 O-O 6 Nf3'
const B = `${F} c5 7 Be2 cxd4 8 Nxd4 Nc6 9 Be3`

const colunas = {
  c49: [`${F} c5 7 d5 e6 8 Be2 exd5 9 exd5 Re8 10 O-O Bf5 11 Bd3 Qd7 12 h3 Na6 13 a3 Nc7`, 'c5', '6...c5 7.d5 e6', '=',
    'O Ataque dos Quatro Peões ocupa o centro com c4, d4, e4 e f4. As pretas respondem com 6...c5, golpeando o centro antes que ele avance. Depois de 7.d5 e6 8.Be2 exd5 9.exd5 Re8 10.O-O Bf5 11.Bd3 Qd7 12.h3 Na6 13.a3 Nc7 as pretas ficam pelo menos iguais.'],
  c50: [`${F} c5 7 dxc5 Qa5 8 Bd3 Qxc5 9 Qe2 Bg4 10 Be3 Qa5 11 O-O Nc6 12 Rac1 Nd7 13 Qf2 Bxf3`, 'c5', '7.dxc5 Qa5', '=',
    'Com 7.dxc5 as brancas abrem o jogo, mas 7...Qa5 recupera o peão. Depois de 8.Bd3 Qxc5 9.Qe2 Bg4! 10.Be3 Qa5 11.O-O Nc6 12.Rac1 Nd7 13.Qf2 Bxf3 o jogo fica igual.'],
  c51: [`${B} Ng4 10 Bxg4 Bxd4 11 Bxd4 Bxg4 12 Qd2 Nxd4 13 Qxd4 e5`, 'c5', '7.Be2 cxd4 8.Nxd4 Nc6 9.Be3 Ng4', '=',
    'Com 7.Be2 cxd4 8.Nxd4 Nc6 9.Be3 a posição lembra uma Siciliana Dragão. Depois de 9...Ng4 10.Bxg4 Bxd4 11.Bxd4 Bxg4 12.Qd2 Nxd4 13.Qxd4 e5! o jogo fica igual.'],
  c52: [`${B} Bg4 10 Bxg4 Nxg4 11 Qxg4 Nxd4 12 Qd1 Nc6 13 Rc1 Qa5`, 'c5', '9...Bg4!?', '=',
    'O 9...Bg4!? troca peças para aliviar a posição. Depois de 10.Bxg4 Nxg4 11.Qxg4 Nxd4 12.Qd1 Nc6 13.Rc1 Qa5 o jogo fica igual.'],
  c53: [`${F} Na6 7 Be2 e5 8 fxe5 dxe5 9 d5 Nc5 10 Bg5 h6 11 Bxf6 Qxf6 12 b4 Na6 13 a3 c5`, 'na6', '6...Na6 7.Be2 e5', '=',
    'Com 6...Na6 as pretas preparam ...e5. Depois de 7.Be2 e5 8.fxe5 dxe5 9.d5 Nc5 10.Bg5 h6 11.Bxf6 Qxf6 12.b4 Na6 13.a3 c5 o jogo fica igual.'],
  c54: [`${F} Na6 7 Bd3 Bg4 8 O-O Nd7 9 Be3 e5 10 fxe5 c5 11 d5 Nxe5 12 Be2 Nxf3+ 13 Bxf3 Bxf3`, 'na6', '7.Bd3 Bg4', '∓',
    'Contra 7.Bd3 as pretas jogam 7...Bg4 e trocam o cavalo de f3. Depois de 8.O-O Nd7 9.Be3 e5 10.fxe5 c5! 11.d5 Nxe5 12.Be2 Nxf3+ 13.Bxf3 Bxf3 as pretas ficam um pouco melhor.'],
}

const notas = [
  // Coluna 49
  ['c49', 'a', 'a', '(a)', '7... b5 8 cxb5 a6 9 a4 e6 10 dxe6 Bxe6 11 Be2 axb5 12 Bxb5 Na6 13 O-O Nb4 14 f5', { a: '±', r: 'Lalić–Zakić, Iugoslávia 1986', c: '7...b5 8.cxb5 a6 9.a4 e6 10.dxe6 Bxe6 11.Be2 axb5 12.Bxb5 Na6 13.O-O Nb4 14.f5! é bom para as brancas.' }],
  ['c49-a', '1', 'a', '(a) 9...Qa5', '9... Qa5 10 Bd2 Qb4 11 Qc2', { a: '⩲', c: '9...Qa5 10.Bd2 Qb4 11.Qc2 é um pouco melhor para as brancas.' }],
  ['c49', 'b', 'b', '(b)', '8 dxe6 fxe6 9 e5 dxe5 10 Qxd8 Rxd8 11 Nxe5 Nfd7', { a: '=', c: '8.dxe6 fxe6! (recapturar com o bispo é passivo) 9.e5 dxe5 10.Qxd8 Rxd8 11.Nxe5 Nfd7 está bem para as pretas.' }],
  ['c49-b', '1', 'b', '(b) 9.Bd3', '9 Bd3 Nh5 10 Ne2 Nc6 11 O-O e5', { c: '9.Bd3 Nh5 10.Ne2 Nc6 11.O-O e5! deixa a posição branca solta.' }],
  ['c49', 'c-A', 'c', '(c) A', '9 cxd5', { c: '9.cxd5 é mais jogado e é estudado no Ataque dos Quatro Peões da Benoni.' }],
  ['c49', 'c-B', 'c', '(c) B', '9 e5 Ne4 10 cxd5 Nxc3 11 bxc3 Nd7', { a: '∓', c: '9.e5?! Ne4! 10.cxd5 Nxc3 11.bxc3 Nd7 é bom para as pretas.' }],
  ['c49', 'd', 'd', '(d)', '9... Nh5 10 O-O Bxc3 11 bxc3 f5 12 Bd3 Ng7 13 Bd2 Nd7 14 Be1 Nf6', { a: '=', r: 'Vladimirov–Gligorić, Iugoslávia 1963', c: '9...Nh5 é uma boa alternativa: 10.O-O Bxc3! 11.bxc3 f5 12.Bd3 Ng7 13.Bd2 Nd7 14.Be1 Nf6 leva à igualdade.' }],
  ['c49', 'e', 'e', '(e)', '14 g4 Bxg4 15 hxg4 Qxg4+ 16 Kh2 b5', { a: '=', r: 'Conquest–Mestel, Hastings 1986/87', c: '14.g4 Bxg4 15.hxg4 Qxg4+ 16.Kh2 b5 é pelo menos igual para as pretas.' }],
  ['c49-e', '1', 'e', '(e) 14...Bxd3', '14... Bxd3 15 Qxd3 b5', { a: '∞', c: '14...Bxd3 15.Qxd3 b5 deixa o jogo obscuro.' }],
  // Coluna 50
  ['c50', 'f', 'f', '(f)', '7... dxc5 8 Qxd8 Rxd8 9 e5 Nfd7 10 Nd5', { a: '⩲', c: '7...dxc5?! 8.Qxd8 Rxd8 9.e5 Nfd7 10.Nd5 dá uma pequena vantagem às brancas.' }],
  ['c50-f', '1', 'f', '(f) 8.Bd3', '8 Bd3 Nc6 9 e5 Nb4 10 Bb1 Qxd1+ 11 Nxd1 Ne8 12 Be3 b6 13 Be4 Rb8 14 a3 Na6 15 Nc3', { a: '⩲', r: 'Grétarsson–Mossin, Reykjavik 1994', c: '8.Bd3 Nc6 9.e5 Nb4 10.Bb1 Qxd1+ 11.Nxd1 Ne8 12.Be3 b6 13.Be4 Rb8 14.a3 Na6 15.Nc3 é um pouco melhor para as brancas.' }],
  ['c50', 'g', 'g', '(g)', '8 Bd2 Qxc5 9 b4 Qb6 10 Bd3 Bg4 11 Rb1 Nc6 12 h3 Bxf3 13 Qxf3 e5 14 Be3 Qd8 15 f5 a5 16 b5 Nb4 17 Bg5 h6 18 Bxf6 Qxf6 19 O-O', { a: '=', r: 'Dorfman–Sznapik, Varsóvia 1983', c: '8.Bd2 Qxc5 9.b4 Qb6 10.Bd3 Bg4 11.Rb1 Nc6 12.h3 Bxf3 13.Qxf3 e5 14.Be3 Qd8 15.f5 a5 16.b5 Nb4 17.Bg5 h6 18.Bxf6 Qxf6 19.O-O e o empate foi combinado.' }],
  ['c50-g', '1', 'g', '(g) 9...Qxb4', '9... Qxb4 10 Na4 Qa3 11 Bc1', { a: '=', c: '9...Qxb4 10.Na4 Qa3 11.Bc1 leva à igualdade.' }],
  ['c50-g', '2', 'g', '(g) 9...Qc7', '9... Qc7 10 Rc1 Bg4 11 h3 Bxf3 12 Qxf3 Nc6 13 Nd5 Qd8 14 Bc3 e6', { a: '∓', r: 'Harald–Uhlmann, Campeonato da Alemanha Oriental 1983', c: '9...Qc7 10.Rc1 Bg4 11.h3 Bxf3 12.Qxf3 Nc6 13.Nd5 Qd8 14.Bc3 e6 é melhor para as pretas.' }],
  ['c50', 'h', 'h', '(h)', '10... Qc7 11 O-O Nbd7 12 Rac1 e5 13 f5 gxf5 14 exf5 Rae8 15 Ne4 Qc6 16 Bg5 d5 17 cxd5 Qxd5 18 h3 Bxf3 19 gxf3', { a: '±', r: 'Grétarsson–Molvig, Copenhague 1994', c: '10...Qc7 11.O-O Nbd7 12.Rac1 e5 13.f5 gxf5 14.exf5 Rae8 15.Ne4 Qc6 16.Bg5 d5?! 17.cxd5 Qxd5 18.h3 Bxf3 e agora 19.gxf3! é bom para as brancas.' }],
  ['c50-h', '1', 'h', '(h) 16...h6', '16... h6', { a: '=', c: '16...h6 mantém a igualdade.' }],
  ['c50', 'i', 'i', '(i)', '13 Qd2 Bxf3 14 Rxf3 Nc5 15 Bb1 Rfc8 16 Rf2 Na4 17 Nd1 Qxd2', { a: '=', r: 'Spraggett–Barlov, Candas Open 1992', c: '13.Qd2 Bxf3 14.Rxf3 Nc5 15.Bb1 Rfc8 16.Rf2 Na4 17.Nd1 Qxd2 leva à igualdade.' }],
  ['c50', 'j', 'j', '(j)', '14 gxf3 Nc5 15 Bb1 Na4 16 Nxa4 Qxa4 17 Rfd1 Rac8 18 b3 Qa5', { a: '=', r: 'Topalov–Dolmatov, Bulgária 1995', c: '14.gxf3 Nc5 15.Bb1 Na4 16.Nxa4 Qxa4 17.Rfd1 Rac8 18.b3 Qa5 fica mais ou menos igual.' }],
  // Coluna 51
  ['c51', 'k', 'k', '(k)', '9 Nc2 Be6 10 O-O Rc8 11 Rb1 a6 12 b3 b5 13 cxb5 axb5 14 Bf3 Qa5', { a: '=', r: 'Korn–Richter, por correspondência 1958', c: '9.Nc2 Be6 10.O-O Rc8 11.Rb1 a6 12.b3 b5 13.cxb5 axb5 14.Bf3 Qa5 dá jogo ativo às pretas.' }],
  ['c51', 'l', 'l', '(l)', '12 Qxg4 Nxd4 13 Qd1 Nc6 14 O-O Qb6+ 15 Rf2 Qc5 16 b3 Rae8 17 Nd5 Nb4', { a: '=', r: 'Martz–Visier, Lanzarote 1974', c: '12.Qxg4 Nxd4 13.Qd1 Nc6 14.O-O Qb6+ 15.Rf2 Qc5 16.b3 Rae8 17.Nd5 Nb4 leva à igualdade.' }],
  ['c51-l', '1', 'l', '(l) 14...Qa5', '14... Qa5 15 Kh1 Qb4 16 Qe2 Na5 17 Nd5', { a: '±', r: 'Pomar–Geller, Interzonal de Estocolmo 1962', c: '14...Qa5 15.Kh1 Qb4 16.Qe2 Na5?! 17.Nd5 é melhor para as brancas.' }],
  ['c51', 'm', 'm', '(m)', '12... Be6 13 b3 Nxd4 14 Qxd4 Qa5', { a: '=', r: 'Eslon–Westerinen, Rilton Cup 1987', c: '12...Be6 13.b3 Nxd4 14.Qxd4 Qa5 leva à igualdade.' }],
  ['c51', 'n', 'n', '(n)', '14 fxe5 Qh4+ 15 Qf2 Qxf2+ 16 Kxf2 dxe5', { a: '=', r: 'Uhlmann–Fischer, Olimpíada de Leipzig 1960', c: '14.fxe5 Qh4+ 15.Qf2 Qxf2+ 16.Kxf2 dxe5 leva à igualdade.' }],
  ['c51-n', '1', 'n', '(n) 15.g3', '15 g3 dxe5 16 Qxe5 Qh3', { a: '∓', r: 'Uhlmann', c: '15.g3 dxe5 16.Qxe5 Qh3 é melhor para as pretas.' }],
  // Coluna 52
  ['c52', 'o-A', 'o', '(o) A', '10 Nxc6 Bxe2 11 Nxd8 Bxd1 12 Rxd1 Rfxd8', { a: '=', r: 'Berthold–Tal, Munique 1958', c: '10.Nxc6 Bxe2 11.Nxd8 Bxd1 12.Rxd1 Rfxd8 leva à igualdade.' }],
  ['c52', 'o-B', 'o', '(o) B', '10 Nf3 e5 11 fxe5 dxe5 12 O-O Qa5', { a: '=', r: 'Uhlmann–Geller, Dresden 1959', c: '10.Nf3 e5 11.fxe5 dxe5 12.O-O Qa5 leva à igualdade.' }],
  ['c52', 'p', 'p', '(p)', '14 a3 f5 15 exf5 Qxf5 16 O-O Kh8 17 b4 Rac8 18 Qd2 b6', { a: '=', r: 'Benko–Reshevsky, Los Angeles 1963', c: '14.a3 f5 15.exf5 Qxf5 16.O-O Kh8 17.b4 Rac8 18.Qd2 b6 leva à igualdade.' }],
  ['c52-p', '1', 'p', '(p) 15...Rxf5', '15... Rxf5', { r: 'Bisguier–Evans, Nova York 1967', c: '15...Rxf5!? também foi jogado.' }],
  // Coluna 53
  ['c53', 'q-A', 'q', '(q) A', '6... e5 7 fxe5 dxe5 8 d5 Nbd7 9 Bd3 Nc5 10 Bc2 a5 11 O-O Qd6 12 Qe1 Bd7 13 Qh4', { a: '±', r: 'Alekhine–Ed. Lasker, Nova York 1924', c: '6...e5?! 7.fxe5 dxe5 8.d5 Nbd7 9.Bd3 Nc5 10.Bc2 a5 11.O-O Qd6 12.Qe1 Bd7 13.Qh4 é melhor para as brancas.' }],
  ['c53-q-A', '1', 'q', '(q) A 8.Nxe5', '8 Nxe5 c5', { a: '∓', c: '8.Nxe5 c5! é bom para as pretas.' }],
  ['c53-q-A-1', '1', 'q', '(q) A 9.d5', '9 d5 Nxe4', { c: 'Se 9.d5, então 9...Nxe4.' }],
  ['c53', 'q-B', 'q', '(q) B', '6... c6', { c: '6...c6?! é passivo: as pretas precisam atacar o centro branco logo.' }],
  ['c53', 'r', 'r', '(r)', '8 dxe5 dxe5 9 Qxd8 Rxd8 10 Nxe5 Nc5 11 Bf3 Be6 12 Nd5 Nfd7 13 Nxd7 Rxd7 14 O-O Bd4+ 15 Kh1 Nd3', { a: '∓', c: '8.dxe5 dxe5 9.Qxd8 Rxd8 10.Nxe5 Nc5 11.Bf3 Be6 12.Nd5 Nfd7 13.Nxd7 Rxd7 14.O-O Bd4+ 15.Kh1 Nd3 é bom para as pretas.' }],
  ['c53-r', '1', 'r', '(r) 13.Nxc7', '13 Nxc7 Nxe5 14 fxe5 Bxc4', { c: '13.Nxc7 Nxe5 14.fxe5 Bxc4! também é bom para as pretas.' }],
  ['c53', 's', 's', '(s)', '9 Nxe5 c5 10 Be3 Nb4', { c: '9.Nxe5 c5 10.Be3 Nb4! é uma ideia forte de Arizmendi.' }],
  ['c53', 't', 't', '(t)', '10 Qc2 Nfxe4 11 Nxe4 Bf5 12 Bd3 Bxe4 13 Bxe4 f5 14 Bxf5 gxf5 15 O-O e4 16 Be3 Nd3 17 Nd4', { a: '∞', c: '10.Qc2 Nfxe4!? 11.Nxe4 Bf5 12.Bd3 Bxe4 13.Bxe4 f5 14.Bxf5 gxf5 15.O-O e4 16.Be3 Nd3 17.Nd4 deixa o jogo obscuro.' }],
  ['c53', 'u', 'u', '(u)', '12... Nd7 13 c5 a5 14 a3 axb4 15 axb4 Rxa1 16 Qxa1 Qf4 17 g3 Qe3', { a: '∓', r: 'Hausner–Khalifman, Bundesliga 1991', c: '12...Nd7 13.c5?! a5 14.a3 axb4 15.axb4 Rxa1 16.Qxa1 Qf4 17.g3 Qe3 é melhor para as pretas.' }],
  ['c53', 'v', 'v', '(v)', '14 Rb1 Bd7 15 b5 Nc7 16 d6 Ne6 17 Nd5 Qd8 18 Qd2 Nd4 19 O-O Be6 20 Nxd4 Bxd5 21 Nc6 bxc6 22 cxd5 cxb5 23 Rxb5 Qxd6 24 Qa5 f5 25 Rxc5 fxe4 26 Rc6 Rxf1+ 27 Bxf1 Qf8 28 Rxg6', { a: '=', r: 'Lautier–Kasparov, Amsterdã (Memorial Euwe) 1995', c: '14.Rb1 Bd7 15.b5 Nc7 16.d6 Ne6 17.Nd5 Qd8 18.Qd2 Nd4 19.O-O Be6 20.Nxd4 Bxd5 21.Nc6 bxc6 22.cxd5 cxb5 23.Rxb5 Qxd6 24.Qa5 f5 25.Rxc5 fxe4 26.Rc6 Rxf1+ 27.Bxf1 Qf8 28.Rxg6 e o empate foi combinado.' }],
  // Coluna 54
  ['c54', 'w', 'w', '(w)', '14 Qxf3 Qe7', { a: '∓', r: 'Parker–Gallagher, Birmingham 2001', c: '14.Qxf3 Qe7! é um pouco melhor para as pretas.' }],
]

const capitulo = {
  id: 'india-rei-i',
  arquivo: 'india-rei-i',
  nome: 'Índia do Rei — Quatro Peões',
  fonte: "Modern Chess Openings — King's Indian Defense (pp. 616–617), colunas 49–54",
  base: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f4 O-O 6. Nf3',
  corPadrao: 'b',
  ordem: 616,
  grupos: [
    { id: 'c5', nome: '6...c5', colunas: [49, 50, 51, 52] },
    { id: 'na6', nome: '6...Na6', colunas: [53, 54] },
  ],
}

module.exports = { capitulo, colunas, notas }
