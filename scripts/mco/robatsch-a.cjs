// Transcrição do MCO 15ª ed. — Defesa Robatsch (Moderna), 3.Nc3 (pp. 374–375), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs robatsch-a
// Formato: ver gambito-do-rei.cjs. Dicas em robatsch-a-dicas.cjs.
//
// A tabela só traz avaliação no fim da coluna 2; nas outras a avaliação vem da nota que continua a coluna.

const B = '1 e4 g6 2 d4 Bg7 3 Nc3'

const colunas = {
  c01: [`${B} d6 4 f4 c6 5 Nf3 Bg4 6 Be3 Qb6 7 Qd2 Bxf3 8 gxf3 Nd7 9 O-O-O Qa5 10 Kb1 O-O-O`, 'f4', '3...d6 4.f4 c6', '⩲',
    'Na Defesa Robatsch (ou Moderna) as pretas fazem o fianqueto antes de ...Nf6 e deixam o centro às brancas. Contra 4.f4 c6 5.Nf3 Bg4 as pretas trocam o bispo pelo cavalo e atacam b2 com a dama, mas 7.Qd2! deixa as brancas com o centro e um pouco melhor.'],
  c02: [`${B} d6 4 f4 Nc6 5 Be3 e5 6 dxe5 dxe5 7 Qxd8+ Kxd8 8 O-O-O+ Bd7 9 Nf3 Nh6 10 h3`, 'f4', '4...Nc6 5.Be3 e5?!', '±',
    'Com 4...Nc6 as pretas pressionam d4 e preparam ...e5. Depois de 5.Be3 e5?! 6.dxe5! as damas se trocam e o rei preto perde o roque; o final é melhor para as brancas.'],
  c03: [`${B} d6 4 Be3 c6 5 Qd2 b5 6 f3 Nd7 7 Nh3 Bb7 8 Nf2 a6 9 g4 Qc7 10 h4 h5`, 'be3', '4.Be3 c6 5.Qd2 b5', '=',
    'Com 4.Be3, Qd2 e f3 as brancas montam um esquema agressivo. As pretas guardam o cavalo de g8 e se expandem na ala da dama com ...c6, ...b5 e ...a6; depois de 9.g4 e 10.h4 h5 o jogo fica equilibrado.'],
  c04: [`${B} d6 4 Nf3 c6 5 Be2 Nd7 6 a4 b6 7 O-O Bb7 8 Re1 a6 9 Bc4 e6 10 Bg5 Ne7`, 'nf3', '4.Nf3 c6 5.Be2', '⩲',
    'O clássico 4.Nf3 é seguro e sólido. As pretas montam uma posição flexível com ...c6, ...b6 e ...e6, típica da Robatsch: as brancas têm uma pequena vantagem, mas as pretas não têm fraquezas.'],
  c05: [`${B} c6 4 Bc4 b5 5 Bb3 b4 6 Nce2 d6 7 Nf3 Nf6 8 e5 dxe5 9 Nxe5 O-O 10 O-O Nfd7`, 'c6', '3...c6 4.Bc4 b5', '⩲',
    'Com 3...c6 as pretas chegam a posições menos conhecidas, preparando ...b5 ou ...d5. Contra 4.Bc4 b5 5.Bb3 b4 o cavalo de c3 é expulso, mas as brancas mantêm uma pequena vantagem no centro.'],
  c06: [`${B} c6 4 Nf3 b5 5 Bd3 d6 6 h3 Bb7 7 O-O Nd7 8 Re1 Qc7 9 e5 dxe5 10 Nxe5 Ngf6`, 'c6', '4.Nf3 b5 5.Bd3', '⩲',
    'Contra 4.Nf3 as pretas seguem com ...b5, ...Bb7 e ...Nd7. As brancas rocam, abrem o centro com 9.e5 e ficam um pouco melhor.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a-A', 'a', '(a) A', '5... Qb6 6 Bc4', { a: '±', c: '5...Qb6 6.Bc4 favorece claramente as brancas.' }],
  ['c01', 'a-B', 'a', '(a) B', '5... d5 6 e5 Bg4 7 Be3 e6', { a: '⩲', c: 'Melhor é 5...d5 6.e5 Bg4 7.Be3 e6, um pouco melhor para as brancas mas estrategicamente complexo. Alguns jogadores gostam de jogar com as pretas aqui.' }],
  ['c01', 'b', 'b', '(b)', '6... Nd7 7 h3 Bxf3 8 Qxf3 c5 9 dxc5 Bxc3+ 10 bxc3 Qa5 11 Bd4 e5 12 fxe5 dxe5 13 Bc4 exd4 14 Qxf7+ Kd8 15 O-O Qxc3 16 Bb5', { a: '+−', r: 'Hector–Zaitsev, Jyväskylä 1994', c: '6...Nd7 7.h3 Bxf3 8.Qxf3 c5 abriu o jogo para as brancas, e depois de 16.Bb5 as pretas abandonaram.' }],
  ['c01', 'c', 'c', '(c)', '8... Qxb2 9 Rb1 Qa3 10 Rxb7', { a: '±', r: 'Hoang Thanh Trang–Paschall, Budapeste 2005', c: '8...Qxb2 9.Rb1 Qa3 10.Rxb7 favorece as brancas.' }],
  ['c01', 'd-A', 'd', '(d) A', '10... b5 11 f5', { a: '⩲', c: 'Ou 10...b5 11.f5, com pequena vantagem branca.' }],
  ['c01', 'd-B', 'd', '(d) B', '11 Rg1 Kb8 12 Rg5 Qc7 13 d5 Nb6 14 dxc6 bxc6 15 Qd3', { a: '⩲', r: 'J. Polgár–Crouch, Hastings 1992/93', c: 'Depois de 10...O-O-O 11.Rg1 Kb8 12.Rg5 as brancas têm uma pequena vantagem.' }],
  // Coluna 2
  ['c02', 'e', 'e', '(e)', '4... a6 5 Nf3 b5 6 Bd3 Bb7 7 O-O Nd7 8 e5 c5 9 Be4 Bxe4 10 Nxe4 cxd4 11 exd6 Qb6 12 f5 gxf5 13 Ng3', { a: '±', r: 'Bareev–Pekarek, Dortmund 1990', c: '4...a6 5.Nf3 b5 6.Bd3 favorece as brancas.' }],
  ['c02', 'f', 'f', '(f)', '5 Nf3 Bg4 6 Be3 Bxf3 7 gxf3 d5', { c: '5.Nf3 também é bom, mas permite o plano 5...Bg4 6.Be3 Bxf3 7.gxf3 d5!?.' }],
  ['c02-f', '1', 'f', '(f) 8.Nxd5', '8 Nxd5 e6 9 Nc3 Nxd4', { a: '=', c: '8.Nxd5?! e6 9.Nc3 Nxd4 é igual.' }],
  ['c02', 'g-A', 'g', '(g) A', '5... Nf6', { c: 'Provavelmente é melhor transpor agora para a Defesa Pirc com 5...Nf6.' }],
  ['c02', 'g-B', 'g', '(g) B', '5... e6', { a: '⩲', c: '5...e6 apenas deixa as brancas com mais espaço.' }],
  ['c02', 'h', 'h', '(h)', '7... Nxd8 8 Nb5 Ne6 9 f5 a6 10 fxe6 axb5 11 Bxb5+ c6 12 exf7+', { a: '±', r: 'Shirov–Vial, Oviedo 1992', c: '7...Nxd8 8.Nb5 Ne6 9.f5 a6 10.fxe6 axb5 11.Bxb5+ c6 12.exf7+ ganha um peão.' }],
  // Coluna 3
  ['c03', 'i', 'i', '(i)', '4... a6 5 h4 h5 6 Qd2 b5 7 Nh3 Nf6 8 f3 Nbd7 9 O-O-O Bb7 10 Ng5', { a: '⩲', r: 'Berg–Hillarp Persson, Campeonato Sueco 2003', c: '4...a6 5.h4 h5 6.Qd2 b5 dá pequena vantagem às brancas.' }],
  ['c03', 'j', 'j', '(j)', '6 Bd3 Nd7 7 Nf3 Bb7 8 O-O Qc7 9 a4 b4 10 Ne2 c5', { a: '=', r: 'Jansa–Hickl, Bad Wörishofen 1992', c: '6.Bd3 Nd7 7.Nf3 Bb7 leva à igualdade.' }],
  ['c03', 'k', 'k', '(k)', '11 g5 e6 12 a4 b4', { a: '=', r: 'Ramu–Murshed, UI&VL 2005', c: '11.g5 e6 12.a4 b4 é igual.' }],
  // Coluna 4
  ['c04', 'l-A', 'l', '(l) A', '4 Bg5 Nc6 5 Bb5 a6 6 Bxc6+ bxc6 7 Nge2 Rb8 8 b3 Nf6 9 O-O Bb7 10 f3 h6 11 Be3 O-O', { a: '=', r: 'Winants–Speelman, Bruxelas 1988', c: '4.Bg5 Nc6! 5.Bb5 a6 leva à igualdade.' }],
  ['c04', 'l-B', 'l', '(l) B', '4 Bc4 c6 5 Qf3 e6 6 Nge2 b5 7 Bb3 a5 8 a3 Ba6 9 d5 cxd5 10 exd5 e5 11 Ne4 h6 12 g4 Nf6 13 N2g3 Nxe4 14 Nxe4 O-O 15 Qh3 f5 16 gxf5 Bc8 17 Ng3 Rxf5', { a: '∞', r: 'Izmukhambetov–Bologan, Sebastopol 1997', c: 'Aguda e maluca é 4.Bc4 c6 5.Qf3 e6, com jogo indefinido.' }],
  ['c04', 'm-A', 'm', '(m) A', '4... Bg4 5 Be2 Nc6 6 Be3 e5 7 d5 Nce7 8 Ng5 Bd7 9 f4', { a: '⩲', r: 'Balashov–Beszterczey, Wisla 1992', c: '4...Bg4 5.Be2 Nc6 6.Be3 e5 7.d5 dá pequena vantagem às brancas.' }],
  ['c04', 'm-B', 'm', '(m) B', '4... Nd7 5 Bc4 e6 6 Bg5 Ne7 7 Qd2 h6 8 Be3 a6 9 a4', { a: '⩲', r: 'Emms–Buckley, Campeonato Britânico 1994', c: '4...Nd7 5.Bc4 e6 6.Bg5 também dá pequena vantagem às brancas.' }],
  ['c04', 'm-C', 'm', '(m) C', '4... Nf6', { c: '4...Nf6 transpõe para a Defesa Pirc.' }],
  ['c04', 'n', 'n', '(n)', '5... b5 6 O-O Qc7 7 a3 a6 8 Be3 Nd7 9 Qd2 Bb7 10 Rad1 h6 11 Rfe1 e6 12 Bf1 Ne7 13 Bf4', { a: '⩲', r: 'Jorgensen–Pedersen, Dinamarca 1994', c: '5...b5 6.O-O Qc7 é um exemplo típico da Robatsch: as brancas têm uma pequena vantagem e as pretas uma posição flexível.' }],
  ['c04', 'o', 'o', '(o)', '11 Qd2 h6 12 Be3 d5 13 exd5 cxd5 14 Bd3 Kf8 15 Ne2 Kg8 16 Ng3', { a: '⩲', r: 'Bologan–Chernin, Genebra 1996', c: '11.Qd2 h6 12.Be3 d5 dá pequena vantagem às brancas.' }],
  // Coluna 5
  ['c05', 'p', 'p', '(p)', '4... d5 5 exd5 b5 6 Bb3 b4 7 Nce2 cxd5 8 Bd2 a5 9 a3 bxa3 10 Rxa3 Nc6 11 Nf3 e6 12 Ba4 Bd7 13 Bxc6 Bxc6 14 Qa1 a4 15 O-O Ne7 16 Bb4', { a: '⩲', r: 'Z. Almasi–Teplicky, Budapeste 1993', c: '4...d5 5.exd5 b5 6.Bb3 b4 dá pequena vantagem às brancas.' }],
  ['c05', 'q', 'q', '(q)', '11 Nd3 Na6 12 a3', { a: '⩲', r: 'Dreev–Malisauskas, Dresden 1992', c: '11.Nd3 Na6 12.a3 dá pequena vantagem às brancas.' }],
  // Coluna 6
  ['c06', 'r', 'r', '(r)', '4 f4 d5 5 e5', { c: '4.f4 d5 5.e5 transpõe para a Caro-Kann, linha 3...g6 (coluna 55).' }],
  ['c06', 's-A', 's', '(s) A', '4... d5 5 h3 dxe4 6 Nxe4', { c: '4...d5 5.h3 dxe4 6.Nxe4 transpõe para a Caro-Kann, linha 3...g6 (coluna 56).' }],
  ['c06', 's-B', 's', '(s) B', '4... d6', { c: '4...d6 transpõe para a coluna 4 desta seção.' }],
  ['c06', 't', 't', '(t)', '11 Bf4 Nxe5 12 Bxe5 Qd7 13 a4 a6 14 Ne4', { a: '⩲', r: 'Glek–Hanken, Filadélfia 1990', c: '11.Bf4 Nxe5 12.Bxe5 Qd7 13.a4 dá pequena vantagem às brancas. (O Stockfish vê mais: depois de 14.Ne4 o salto Nc5, contra a dama e o bispo de b7, dá clara vantagem branca.)' }],
]

const capitulo = {
  id: 'robatsch-a',
  arquivo: 'robatsch-a',
  nome: 'Robatsch (Moderna) — 3.Nc3',
  fonte: 'Modern Chess Openings — Robatsch Defense (pp. 374–375), colunas 1–6',
  base: '1. e4 g6 2. d4 Bg7 3. Nc3',
  corPadrao: 'b',
  ordem: 374,
  grupos: [
    { id: 'f4', nome: '3...d6 4.f4', colunas: [1, 2] },
    { id: 'be3', nome: '3...d6 4.Be3', colunas: [3] },
    { id: 'nf3', nome: '3...d6 4.Nf3', colunas: [4] },
    { id: 'c6', nome: '3...c6', colunas: [5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
