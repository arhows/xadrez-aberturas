// Transcrição do MCO 15ª ed. — Abertura Catalã, Variante Aberta, outros 5º lances das pretas (pp. 528–529), colunas 25–30.
// Gerar: node scripts/mco/gerar.cjs catalana-e
// Formato: ver gambito-do-rei.cjs. Dicas em catalana-e-dicas.cjs.
//
// Só a coluna 30 traz avaliação no fim; nas outras usamos a avaliação da nota que continua a coluna.
// Coluna 27: a nota (h) dá duas continuações às brancas, (A) = e (B) ±; ficou ±.
// Correção: na coluna 28 a impressão traz "10 Qxc6", impossível; o lance é 10.Qxc4 (a dama recupera o cavalo de c4).
// A nota (r) traz "14 Bxc6" sem o sinal de xeque: é 14.Bxc6+.

const A = '1 d4 Nf6 2 c4 e6 3 g3 d5 4 Bg2 dxc4 5 Nf3'

const colunas = {
  c25: [`${A} Nc6 6 Qa4 Bb4+ 7 Bd2 Bd6 8 O-O O-O 9 Qxc4 e5 10 dxe5 Nxe5 11 Nxe5 Bxe5 12 Bc3 Qe7`, 'nc6', '5...Nc6 6.Qa4 Bb4+', '=',
    'Com 5...Nc6 as pretas pressionam d4. Depois de 6.Qa4 a dama crava o cavalo e vai recuperar c4. Após 6...Bb4+ 7.Bd2 Bd6 8.O-O O-O 9.Qxc4 e5 as pretas liberam o jogo; com 10.dxe5 Nxe5 11.Nxe5 Bxe5 12.Bc3 Qe7 o jogo é igual.'],
  c26: [`${A} Nc6 6 Qa4 Nd7 7 Qxc4 Nb6 8 Qd3 e5 9 Bg5 f6 10 Be3 exd4 11 Nxd4 Bb4+ 12 Nc3 Nxd4`, 'nc6', '6...Nd7', '=',
    'Com 6...Nd7 7.Qxc4 Nb6 8.Qd3 e5 as pretas desafiam logo o centro. Depois de 9.Bg5 f6 10.Be3 exd4 11.Nxd4 Bb4+ 12.Nc3 Nxd4 13.Bxd4 c5 o jogo é igual.'],
  c27: [`${A} Bd7 6 Ne5 Bc6 7 Nxc6 Nxc6 8 O-O Qd7 9 e3 Rb8 10 Qe2 b5 11 b3 cxb3 12 axb3 Rb6`, 'bd7', '5...Bd7', '±',
    'Com 5...Bd7 o bispo vai a c6 para enfrentar o de g2. Depois de 6.Ne5 Bc6 7.Nxc6 Nxc6 as brancas ficam com o par de bispos. Após 8.O-O Qd7 9.e3 Rb8 10.Qe2 b5 11.b3 cxb3 12.axb3 Rb6, com 13.Bxc6 as brancas ficam melhor.'],
  c28: [`${A} Nbd7 6 O-O Be7 7 Nfd2 Nb6 8 Nxc4 Nxc4 9 Qa4+ Nd7 10 Qxc4 Nb6 11 Qd3 O-O 12 Nc3 Nd5`, 'nbd7', '5...Nbd7', '⩲',
    'Com 5...Nbd7 o cavalo vai a b6 para segurar c4. Depois de 6.O-O Be7 7.Nfd2 Nb6 8.Nxc4 Nxc4 9.Qa4+ Nd7 10.Qxc4 as brancas recuperam o peão. Após 10...Nb6 11.Qd3 O-O 12.Nc3 Nd5 13.Rd1 as brancas ficam um pouco melhor.'],
  c29: [`${A} b5 6 a4 c6 7 axb5 cxb5 8 Ne5 Nd5 9 Nc3 Bb4 10 O-O Bxc3 11 e4 Bxb2 12 exd5 Bxa1`, 'b5', '5...b5', '⩲',
    'Com 5...b5 as pretas seguram logo o peão de c4. Depois de 6.a4 c6 7.axb5 cxb5 8.Ne5 Nd5 9.Nc3 Bb4 10.O-O Bxc3 11.e4! Bxb2 12.exd5 Bxa1 as pretas ganham material, mas depois de 13.Ba3 a5 14.dxe6 Bxe6 15.Bxa8 as brancas ficam um pouco melhor.'],
  c30: [`${A} Bb4+ 6 Bd2 Be7 7 O-O Bd7 8 Ne5 Nc6 9 Nxd7 Qxd7 10 e3 Rb8 11 Qc1 e5 12 dxe5 Nxe5`, 'bb4', '5...Bb4+', '=',
    'Com 5...Bb4+ 6.Bd2 Be7 as pretas atraem o bispo para d2, onde ele fica menos ativo. Depois de 7.O-O Bd7 8.Ne5 Nc6 9.Nxd7 Qxd7 10.e3 Rb8 11.Qc1 e5 12.dxe5 Nxe5 o jogo é igual.'],
}

const notas = [
  // Coluna 25
  ['c25', 'a-A', 'a', '(a) A', '6... Qd5 7 O-O Bd7 8 Nc3 Qh5 9 Qxc4', { a: '±', r: 'Bukić–Cvetković, Portorož 1971', c: '6...Qd5 7.O-O Bd7 8.Nc3 Qh5 9.Qxc4 é melhor para as brancas.' }],
  ['c25', 'a-B', 'a', '(a) B', '6... Bd7 7 Qxc4 Na5 8 Qd3 c5 9 O-O Rc8 10 Nc3 Bc6 11 Rd1', { a: '±', r: 'Dizdarević–Vuković, Iugoslávia 1990', c: '6...Bd7 7.Qxc4 Na5 8.Qd3 c5 9.O-O Rc8 10.Nc3 Bc6 11.Rd1 é melhor para as brancas.' }],
  ['c25', 'b', 'b', '(b)', '9 Bc3 Nd5 10 Qxc4 Nxc3 11 bxc3 Na5 12 Qd3 c5 13 Nbd2 cxd4 14 cxd4 Bd7 15 Ne4 Be7', { a: '=', r: 'Carlsen–Ponomariov, Memorial Tal 2006', c: '9.Bc3 Nd5 10.Qxc4 Nxc3 11.bxc3 Na5 12.Qd3 c5 13.Nbd2 cxd4 14.cxd4 Bd7 15.Ne4 Be7 é igual.' }],
  ['c25', 'c', 'c', '(c)', '13 Bxe5 Qxe5 14 Nc3 c6', { a: '=', r: 'Karpov–Kramnik, Wijk aan Zee 1998', c: '13.Bxe5 Qxe5 14.Nc3 c6 é igual.' }],
  // Coluna 26
  ['c26', 'd', 'd', '(d)', '8 Qb5 Bd7 9 Qb3 Na5 10 Qd3 c5 11 dxc5 Bxc5 12 Qc3 Rc8 13 Qxg7 Bf8 14 Qg5 Qxg5 15 Bxg5 Bg7', { a: '=', r: 'Kramnik–Naiditsch, Dortmund 2006', c: 'Manobrar com 8.Qb5 Bd7 9.Qb3 permite 9...Na5 10.Qd3 c5 11.dxc5 Bxc5 12.Qc3 Rc8! 13.Qxg7 Bf8 14.Qg5 Qxg5 15.Bxg5 Bg7, com igualdade.' }],
  ['c26', 'e', 'e', '(e)', '9 Nxe5 Nb4 10 Qc3 Qxd4 11 O-O Qxc3 12 Nxc3 Bd6 13 Nf3 c6 14 Nd4 O-O', { a: '=', r: 'Beliavsky–Adams, Madri 1998', c: '9.Nxe5 Nb4 10.Qc3 Qxd4 11.O-O Qxc3 12.Nxc3 Bd6 13.Nf3 c6 14.Nd4 O-O é igual.' }],
  ['c26', 'f', 'f', '(f)', '13 Bxd4 c5', { a: '=', r: 'Wojtkiewicz–Mikhalchishin, Nova Gorica 1997', c: '13.Bxd4 c5 é igual.' }],
  // Coluna 27
  ['c27', 'g-A', 'g', '(g) A', '8 e3 Nd5 9 O-O Be7 10 Qe2 Nb6', { a: '=', r: 'Beliavsky–Portisch, Linares 1988', c: '8.e3 Nd5 9.O-O Be7 10.Qe2 Nb6 é igual.' }],
  ['c27', 'g-B', 'g', '(g) B', '8 Qa4 Qd7 9 Qxc4 Nxd4 10 O-O c5 11 Nc3 Rd8 12 Bg5 b5 13 Qd3 Be7', { a: '⩱', r: 'Sosonko–Lukacs, Volmac–Spartacus 1987', c: '8.Qa4 Qd7 9.Qxc4 Nxd4 10.O-O c5 11.Nc3 Rd8 foi a partida. Depois de 12.Bg5 b5 13.Qd3 Be7, Lukacs avalia a posição como um pouco melhor para as pretas.' }],
  ['c27', 'h-A', 'h', '(h) A', '13 Rd1 a6 14 Nc3 Be7 15 Bb2 Nb4 16 e4 O-O', { a: '=', r: 'Petursson–So. Polgar, Århus 1993', c: '13.Rd1 a6 14.Nc3 Be7 15.Bb2 Nb4 16.e4 O-O: a vantagem de espaço das brancas compensa totalmente o peão.' }],
  ['c27', 'h-B', 'h', '(h) B', '13 Bxc6 Rxc6 14 Rxa7 Bd6 15 Ba3 Bxa3 16 Nxa3', { a: '±', r: 'Stohl–Zsu. Polgar, Rimavská Sobota 1991', c: '13.Bxc6 Rxc6 14.Rxa7 Bd6 15.Ba3 Bxa3 16.Nxa3 é melhor para as brancas.' }],
  // Coluna 28
  ['c28', 'i', 'i', '(i)', '6 Qa4 Be7 7 Qxc4 O-O 8 O-O', { a: '±', r: 'Gronn–H. Hunt, Gausdal 1992', c: '6.Qa4 também é possível: 6...Be7 (6...a6 transpõe para a coluna 31) 7.Qxc4 O-O 8.O-O é melhor para as brancas.' }],
  ['c28', 'j', 'j', '(j)', '6... c5 7 Na3 Nb6 8 Bg5 c3', { a: '=', r: 'Atalik–Sturua, Calcídica 1996', c: '6...c5 7.Na3 Nb6 8.Bg5 foi a partida; agora Atalik sugere 8...c3, com igualdade.' }],
  ['c28', 'k', 'k', '(k)', '10... c5', { a: '⩲', c: 'O lance habitual era 10...c5, mas aí as brancas ficam um pouco melhor.' }],
  ['c28', 'l', 'l', '(l)', '13 Rd1', { a: '⩲', r: 'Krasenkow–Hübner, Polanica Zdrój 1996', c: '13.Rd1 dá uma pequena vantagem às brancas.' }],
  // Coluna 29
  ['c29', 'm', 'm', '(m)', '7 Ne5 Nd5 8 O-O Bb7 9 b3 cxb3 10 axb5 cxb5 11 Qxb3 a6 12 e4', { a: '∞', r: 'Agzamov–Foisor, Sochi 1985', c: '7.Ne5 Nd5 8.O-O Bb7 9.b3 é outro caminho. Depois de 9...cxb3 10.axb5 cxb5 11.Qxb3 a6 12.e4, o jogo central das brancas foi compensação mais que suficiente pelo peão.' }],
  ['c29', 'n-A', 'n', '(n) A', '11... Bxd4 12 Qxd4 Qb6 13 Nf3', { a: '⩲', c: '11...Bxd4 12.Qxd4 Qb6 13.Nf3 é um pouco melhor para as brancas.' }],
  ['c29', 'n-B', 'n', '(n) B', '11... Nf6 12 bxc3 Nbd7 13 Nc6', { a: '±', r: 'Kinsman–Bryson, Edimburgo 1996', c: '11...Nf6 12.bxc3 Nbd7 13.Nc6 é melhor para as brancas.' }],
  ['c29', 'n-C', 'n', '(n) C', '11... Ne7', { a: '⩲', c: '11...Ne7 também não iguala.' }],
  ['c29', 'n-D', 'n', '(n) D', '11... Bb4', { a: '⩲', c: '11...Bb4 também não iguala.' }],
  ['c29', 'o', 'o', '(o)', '13 Ba3 a5 14 dxe6 Bxe6 15 Bxa8 b4 16 Qxa1 O-O 17 Bc1', { a: '⩲', r: 'Kengis–Meister, Togliatti 1985', c: '13.Ba3 a5 14.dxe6 Bxe6 15.Bxa8 foi a partida; depois de 15...b4 16.Qxa1 O-O 17.Bc1 as brancas ficam um pouco melhor.' }],
  ['c29-o', '1', 'o', '(o) 15...Qxd4', '15... Qxd4 16 Qxa1 Qxa1 17 Rxa1 b4 18 Bc1', { a: '⩲', c: '15...Qxd4 16.Qxa1 Qxa1 17.Rxa1 b4 18.Bc1 também é um pouco melhor para as brancas.' }],
  // Coluna 30
  ['c30', 'p', 'p', '(p)', '7 Qc2 Bd7 8 Qxc4 Bc6 9 Nc3 Ne4', { a: '=', r: 'Beliavsky–Kovačević, Sarajevo 1982', c: '7.Qc2 Bd7 8.Qxc4 Bc6 9.Nc3 Ne4 é igual.' }],
  ['c30', 'q', 'q', '(q)', '9 Nxc6 Bxc6 10 Bxc6+ bxc6', { a: '⩱', c: '9.Nxc6 Bxc6 10.Bxc6+ bxc6 favoreceria as pretas.' }],
  ['c30', 'r', 'r', '(r)', '12 Rd1 exd4 13 Be1 Qe6 14 Bxc6+ Qxc6 15 Rxd4 b5', { a: '∓', r: 'Hudeček–Verdikhanov, Pardubice 1997', c: '12.Rd1 exd4 13.Be1 foi a partida; Verdikhanov dá 13...Qe6 14.Bxc6+ Qxc6 15.Rxd4 b5, melhor para as pretas.' }],
]

const capitulo = {
  id: 'catalana-e',
  arquivo: 'catalana-e',
  nome: 'Catalã — Aberta, outros 5º lances',
  fonte: 'Modern Chess Openings — Catalan Opening (pp. 528–529), colunas 25–30',
  base: '1. d4 Nf6 2. c4 e6 3. g3',
  corPadrao: 'w',
  ordem: 528,
  grupos: [
    { id: 'nc6', nome: '5...Nc6', colunas: [25, 26] },
    { id: 'bd7', nome: '5...Bd7', colunas: [27] },
    { id: 'nbd7', nome: '5...Nbd7', colunas: [28] },
    { id: 'b5', nome: '5...b5', colunas: [29] },
    { id: 'bb4', nome: '5...Bb4+', colunas: [30] },
  ],
}

module.exports = { capitulo, colunas, notas }
