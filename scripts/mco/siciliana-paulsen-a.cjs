// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Paulsen (Kan) (pp. 310–312), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs siciliana-paulsen-a
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-paulsen-a-dicas.cjs.
//
// Só a coluna 4 traz avaliação no fim; nas outras a avaliação vem da nota que continua a coluna.

const B = '1 e4 c5 2 Nf3 e6 3 d4 cxd4 4 Nxd4 a6'

const colunas = {
  c01: [`${B} 5 Bd3 Nf6 6 O-O d6 7 c4 Be7 8 Nc3 O-O 9 Qe2 Nbd7 10 b3 Qc7 11 Bb2 b6 12 Rae1 Bb7`, 'bd3', '5.Bd3 Nf6 6.O-O d6 7.c4', '±',
    'Na Paulsen (ou Kan), 4...a6, as pretas ficam ainda mais flexíveis que na Taimanov, porque o cavalo da dama não precisa ir para c6. Com 5.Bd3 as brancas preparam um ataque na ala do rei; com 7.c4 tomam espaço, e as pretas montam um ouriço. As brancas ficam melhor.'],
  c02: [`${B} 5 Bd3 Nf6 6 O-O Qc7 7 Qe2 Bd6 8 Kh1 Nc6 9 Nxc6 bxc6 10 f4 e5 11 Nd2 O-O 12 Nc4 Re8`, 'bd3', '6...Qc7 7.Qe2 Bd6', '±',
    'Com 6...Qc7 e 7...Bd6 as pretas desenvolvem rápido. Depois de 10.f4 e5 11.Nd2 o cavalo branco vai para c4, e as brancas ficam melhor.'],
  c03: [`${B} 5 Bd3 Nc6 6 Nxc6 dxc6 7 Nd2 e5 8 Qh5 Bd6 9 Nc4 Nf6 10 Nxd6+ Qxd6 11 Qe2 Be6 12 O-O Nd7`, 'bd3', '5...Nc6 6.Nxc6 dxc6', '±',
    'Com 5...Nc6 6.Nxc6 dxc6 as pretas abrem a coluna d. As brancas ganham o par de bispos com Nc4xd6 e ficam melhor.'],
  c04: [`${B} 5 Bd3 Bc5 6 Nb3 Ba7 7 Nc3 Nc6 8 Qe2 d6 9 Be3 Bxe3 10 Qxe3 Nf6 11 f4 Qc7 12 g4`, 'bd3', '5...Bc5', '±',
    'Com 5...Bc5 as pretas expulsam o cavalo de d4 e trocam o bispo de casas escuras. As brancas avançam f4 e g4 e ficam melhor (Browne–Ramírez, Arizona 1990).'],
  c05: [`${B} 5 c4 Nf6 6 Nc3 Bb4 7 Bd3 Nc6 8 Nxc6 dxc6 9 e5 Qa5 10 exf6 Bxc3+ 11 bxc3 Qxc3+ 12 Qd2 Qxa1`, 'c4', '5.c4 Nf6 6.Nc3 Bb4', '∓',
    'Com 5.c4 as brancas tentam controlar o centro, mas as pretas devem reagir com agressividade. Com 6...Bb4 e 9...Qa5! elas ganham a torre de a1, e as brancas têm só uma compensação especulativa.'],
  c06: [`${B} 5 c4 Nf6 6 Nc3 Qc7 7 Be2 Bb4 8 O-O O-O 9 Bg5 Bxc3 10 Bxf6 Bxb2 11 Rb1 gxf6 12 Rxb2 Kh8`, 'c4', '6...Qc7', '±',
    'Com 6...Qc7 as pretas jogam com mais calma. As brancas sacrificam com 9.Bg5 e 10.Bxf6, abrem o rei preto e ficam melhor.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '5... g6 6 c4 Bg7 7 Nb3 Ne7 8 O-O Nbc6 9 Nc3 d5 10 cxd5 exd5 11 Bg5', { a: '±', r: 'Adams–Lalić, Southend 2001', c: 'Com 5...g6 6.c4 Bg7 as brancas ficam melhor.' }],
  ['c01', 'b', 'b', '(b)', '7 f4 Be7 8 Kh1 Nbd7 9 Qe2 Nc5 10 Nd2 O-O 11 N2f3 Nxd3 12 cxd3 Bd7', { a: '=', r: 'Lesiège–Shamkovich, Nova York 1989', c: 'Com 7.c4 as brancas tomam espaço. A posição preta é flexível demais para cair com um jogo direto na ala do rei: 7.f4 não traz problemas às pretas.' }],
  ['c01', 'c-A', 'c', '(c) A', '7... g6 8 Nc3 Bg7 9 Be3 O-O 10 Re1 b6 11 f3 Bb7 12 Bf1 Nbd7 13 Qd2', { a: '±', c: 'Com 7...g6 8.Nc3 Bg7 9.Be3 O-O 10.Re1! as brancas chegam a uma boa posição contra o ouriço.' }],
  ['c01-c-A', '1', 'c', '(c) A 10...Nbd7', '10... Nbd7 11 Bf1 d5 12 exd5 exd5 13 cxd5 Nb6 14 Nb3 Nbxd5 15 Bc5 Nxc3 16 bxc3 Re8 17 Qxd8 Rxd8 18 Be7 Re8 19 Bxf6 Rxe1 20 Rxe1 Bxf6 21 Re8+', { a: '±', c: '10...Nbd7 11.Bf1 d5 leva a um final em que 21.Re8+ crava o bispo de c8.' }],
  ['c01', 'c-B', 'c', '(c) B', '7... b6 8 Nc3 Bb7 9 f4 Be7 10 Kh1 Nc6 11 Nxc6 Bxc6 12 Qe2 O-O 13 b3 Qc7 14 Bb2', { a: '±', r: 'Matulović–Tringov, Vrnjačka Banja 1986', c: 'Com 7...b6 8.Nc3 Bb7 9.f4 as brancas também ficam melhor.' }],
  ['c01', 'd', 'd', '(d)', '9... Nc6 10 Nxc6 bxc6 11 f4 e5 12 Kh1 Nd7 13 f5 a5 14 Be3', { a: '±', r: 'Adams–Christiansen, Reykjavík 1990', c: 'Com 9...Nc6 10.Nxc6 bxc6 11.f4 as brancas ficam melhor.' }],
  ['c01', 'e', 'e', '(e)', '12 Rad1 Bb7 13 f4 Rfe8 14 Kh1 Bf8 15 Nf3 g6', { a: '=', r: 'Ginsburg–Yudasin, World Open 2003', c: 'Com 12.Rad1 Bb7 13.f4 o jogo fica igual.' }],
  ['c01', 'f', 'f', '(f)', '13 Kh1 Rac8 14 f4 Qb8 15 e5 Ne8 16 Nd5', { a: '±', r: 'Gulko–Hummel, CCA 1999', c: 'Com 13.Kh1 Rac8 14.f4 e 16.Nd5! as brancas ficam melhor.' }],
  ['c01-f', '1', 'f', '(f) 13...Rfe8', '13... Rfe8', { a: '⩲', c: 'As pretas se defenderiam melhor com 13...Rfe8 e 14...g6, mas as brancas ainda ficariam com vantagem.' }],
  // Coluna 2
  ['c02', 'g', 'g', '(g)', '7 c4 Nc6 8 Nxc6 dxc6 9 f4 e5 10 f5 Bc5+ 11 Kh1 h5 12 Nc3 Ng4 13 Qf3 Qd8 14 Nd1 Qh4', { r: 'Murey–Psakhis, Tel Aviv 1991', c: '7.c4 Nc6 8.Nxc6 dxc6! permite às pretas um jogo ativo.' }],
  ['c02', 'h', 'h', '(h)', '7... d6 8 c4 g6 9 Nc3 Bg7 10 Rd1 O-O 11 Nf3 Nc6 12 Bf4 e5 13 Be3 Bg4 14 Bc2 Rab8 15 Bb3 Na5 16 Rac1', { a: '±', r: 'Kurnosov–Kachur, Varsóvia 2005', c: 'Com 7...d6 8.c4 g6 as brancas ficam melhor.' }],
  ['c02-h', '1', 'h', '(h) 12...Nd7', '12... Nd7 13 Rac1 Nde5 14 b3', { a: '⩲', c: '12...Nd7 13.Rac1 Nde5 14.b3 deixa as brancas um pouco melhor.' }],
  ['c02-h', '2', 'h', '(h) 14.h3', '14 h3 Nd4', { c: '14.h3 Nd4 é a alternativa.' }],
  ['c02', 'i', 'i', '(i)', '13 Qf3 Bb7 14 fxe5 Bxe5 15 Nxe5 Qxe5 16 Bf4', { a: '±', r: 'Grischuk–Miladinović, Mainz (rápidas) 2003', c: 'Com 13.Qf3 e 16.Bf4 as brancas ficam melhor.' }],
  // Coluna 3
  ['c03', 'j', 'j', '(j)', '6... bxc6 7 O-O d5 8 c4 Nf6 9 cxd5 cxd5 10 exd5 exd5 11 Nc3 Be7 12 Qa4+ Qd7 13 Re1 Qxa4 14 Nxa4 Be6 15 Be3 O-O 16 Bc5 Rfe8 17 Bxe7 Rxe7 18 b4 Kf8 19 Nc5 Bc8 20 f3', { a: '±', r: 'Fischer–Petrosian, match 1971', c: '6...bxc6 é considerado suspeito desde Fischer–Petrosian: com as peças mais ativas, Fischer venceu.' }],
  ['c03', 'k', 'k', '(k)', '9... Bc7 10 Bg5 Nf6 11 Qe2 h6 12 Bh4 Qe7 13 O-O-O Be6 14 f4 Bxc4 15 Bxc4 b5 16 Bb3 O-O 17 Bxf6 Qxf6 18 Rd7', { a: '±', r: 'Tseshkovsky–Miles, Bled/Portorož 1979', c: 'Com 9...Bc7 10.Bg5 e 13.O-O-O! as brancas ficam melhor.' }],
  ['c03', 'l', 'l', '(l)', '13 Rd1 Qc7 14 b3 O-O 15 a4', { a: '±', r: 'Nygren–Miezis, Gausdal 2003', c: 'Com o par de bispos as brancas ficam melhor.' }],
  // Coluna 4
  ['c04', 'm', 'm', '(m)', '5... Qb6 6 Nf3 Nc6 7 O-O Qc7 8 b3 Nge7 9 Bb2 Ng6 10 c4 Bc5 11 Nc3', { a: '±', r: 'Gufeld–Ehlvest, Las Vegas 1997', c: 'Com 5...Qb6 6.Nf3 Nc6 7.O-O Qc7 8.b3! as brancas ficam melhor.' }],
  ['c04', 'n', 'n', '(n)', '6... Be7 7 O-O d6 8 c4 b6 9 Nc3 Bb7 10 f4 Nd7 11 Qe2 Ngf6 12 Bd2 O-O 13 Rae1', { a: '⩲', r: 'Glek–Rublevsky, Istambul 2003', c: 'Mais usado hoje é 6...Be7, que deixa as brancas só um pouco melhor.' }],
  ['c04', 'o-A', 'o', '(o) A', '11 g4 e5 12 g5 Nh5 13 Nd5 Be6', { r: 'Giaccio–Giardelli, Buenos Aires 1993', c: '11.g4 e5! 12.g5 Nh5 dá às pretas jogo nas casas escuras.' }],
  ['c04', 'o-B', 'o', '(o) B', '11 O-O-O O-O 12 f4', { a: '⩲', c: 'O normal 11.O-O-O O-O 12.f4 também dá vantagem às brancas.' }],
  ['c04-o-B', '1', 'o', '(o) B 11...e5', '11... e5', { c: 'Mas 11...e5 vale a tentativa.' }],
  // Coluna 5
  ['c05', 'p', 'p', '(p)', '6 Bd3 Nc6 7 Nxc6 dxc6 8 O-O e5 9 Nc3 Be6 10 h3 Be7 11 Be3 Nd7', { a: '=', r: 'Levitan–Frías, Nova York 1993', c: 'Depois de 6.Bd3 Nc6 7.Nxc6 dxc6 as pretas igualam com facilidade.' }],
  ['c05', 'q-A', 'q', '(q) A', '7 Qd3 d5 8 exd5 exd5 9 Be2 O-O 10 O-O Nc6 11 Nxc6 bxc6 12 Bg5 Bxc3 13 bxc3 Be6', { a: '=', r: 'Anand–Svidler, Melody Amber 2005', c: '7.Qd3 d5 8.exd5 exd5 leva a um jogo igual.' }],
  ['c05', 'q-B', 'q', '(q) B', '7 e5 Ne4 8 Qg4 Nxc3 9 a3 Bf8', { a: '=', c: '7.e5 Ne4 8.Qg4 Nxc3 9.a3 Bf8! dá às pretas pelo menos igualdade.' }],
  ['c05', 'r', 'r', '(r)', '8 Bc2 Qc7 9 O-O Nxd4 10 Qxd4 Ng4 11 e5 Nxe5 12 Ne4 d6 13 f4 Qxc4 14 Be3 Qxd4 15 Bxd4 d5 16 fxe5 dxe4 17 Bxe4 O-O 18 Rac1', { a: '∞', r: 'Hector–Páramos Domínguez, La Coruña 1995', c: 'A principal alternativa é 8.Bc2; depois de 9...Nxd4 as brancas têm compensação pelo peão.' }],
  ['c05-r', '1', 'r', '(r) 9...O-O', '9... O-O 10 Kh1 Nxd4 11 Qxd4 Ng4 12 f4 b5 13 Qd1 Bxc3 14 bxc3 Qxc4 15 Rb1', { a: '∞', c: '9...O-O 10.Kh1 Nxd4 11.Qxd4 Ng4 12.f4 b5! leva a um jogo pouco claro.' }],
  ['c05', 's', 's', '(s)', '12 Bd2 Qxd3 13 fxg7 Rg8 14 Bh6 Qc3+ 15 Kf1 Qf6', { a: '=', r: 'Poulsen–Farago, Svendborg 1981', c: '12.Bd2 Qxd3 13.fxg7 Rg8 é mais ou menos igual.' }],
  ['c05', 't', 't', '(t)', '13 O-O Qxf6 14 Bb2 Qe7 15 Bxg7 Rg8', { a: '∓', r: 'Spaan–Nijboer, Amsterdã 2005', c: 'Com 13.O-O Qxf6 14.Bb2 Qe7! as pretas ficam um pouco melhor.' }],
  ['c05-t', '1', 't', '(t) 14.Ba3', '14 Ba3', { c: 'Melhor é 14.Ba3, mas a compensação ainda é especulativa.' }],
  // Coluna 6
  ['c06', 'u', 'u', '(u)', '7 Bd3 Nc6 8 Nf3 b6 9 O-O Ng4 10 h3 h5 11 g3 Nge5 12 Be3 h4', { a: '∓', r: 'Kamsky–I. Gurevich, Nova York 1991', c: 'Com 7.Bd3 Nc6 8.Nf3 b6 9.O-O Ng4 10.h3?! as pretas ficam um pouco melhor.' }],
  ['c06-u', '1', 'u', '(u) 10.g3', '10 g3', { a: '=', c: '10.g3 seria igual.' }],
  ['c06', 'v', 'v', '(v)', '7... b6 8 O-O Bb7 9 f3 Bd6 10 Kh1 Be7 11 Be3', { a: '±', r: 'Z. Almási–Bezold, Hungria 1997', c: 'Com 7...b6 8.O-O Bb7 9.f3 Bd6?! 10.Kh1! as brancas ficam melhor.' }],
  ['c06-v', '1', 'v', '(v) 9...Nc6', '9... Nc6', { c: 'Melhor é 9...Nc6.' }],
  ['c06-v', '2', 'v', '(v) 10...Bxh2', '10... Bxh2 11 f4 Bg3 12 Qd3', { c: '10...Bxh2 11.f4 Bg3 12.Qd3 prende o bispo.' }],
  ['c06', 'w', 'w', '(w)', '8... Bxc3 9 bxc3 Nxe4 10 Bf3 Nc5 11 Nb3 O-O 12 Nxc5 Qxc5 13 Qb3 Qc7 14 Ba3', { a: '∞', r: 'Bologan–Paragua, Trípoli 2004', c: 'Com 8...Bxc3 9.bxc3 Nxe4 as pretas ganham um peão, mas as brancas têm jogo por ele.' }],
  ['c06', 'x', 'x', '(x)', '13 Qd2 d6 14 Rd1 Nd7 15 Nb3 Nc5 16 Qf4 Qe7 17 Rbd2', { a: '±', r: 'Hector–Csom, Århus 1991', c: 'Com 13.Qd2 e 16.Qf4 as brancas ficam melhor.' }],
]

const capitulo = {
  id: 'siciliana-paulsen-a',
  arquivo: 'siciliana-paulsen-a',
  nome: 'Siciliana Paulsen (Kan) — 5.Bd3 e 5.c4',
  fonte: 'Modern Chess Openings — Sicilian Defense, Paulsen Variation (pp. 310–312), colunas 1–6',
  base: '1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 a6',
  corPadrao: 'b',
  ordem: 310,
  grupos: [
    { id: 'bd3', nome: '5.Bd3', colunas: [1, 2, 3, 4] },
    { id: 'c4', nome: '5.c4', colunas: [5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
