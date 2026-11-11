// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante dos Quatro Cavalos e Contra-ataque Siciliano (pp. 315–317), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs siciliana-quatro-cavalos
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-quatro-cavalos-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; a avaliação vem da nota que continua cada coluna.

const B = '1 e4 c5 2 Nf3 e6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3'

const colunas = {
  c01: [`${B} Nc6 6 Ndb5 Bb4 7 a3 Bxc3+ 8 Nxc3 d5 9 exd5 exd5 10 Bd3 O-O 11 O-O d4 12 Ne2 Qd5`, 'nc6', '5...Nc6 6.Ndb5 Bb4 7.a3', '±',
    'A Variante dos Quatro Cavalos, 4...Nf6 5.Nc3 Nc6, é pouco jogada, mas razoável pelo efeito surpresa. Com 6.Ndb5 Bb4 7.a3! as brancas ganham o par de bispos; as pretas ficam com o peão isolado em d5, e as brancas ficam melhor. É a única continuação que dá vantagem.'],
  c02: [`${B} Nc6 6 Ndb5 Bb4 7 Bf4 Nxe4 8 Qf3 d5 9 Nc7+ Kf8 10 O-O-O Bxc3 11 bxc3 e5 12 Nxd5 Ng5`, 'nc6', '7.Bf4', '=',
    'Com 7.Bf4 as brancas buscam complicações: depois de 7...Nxe4 8.Qf3 d5 9.Nc7+ o rei preto perde o roque, mas as pretas contra-atacam com ...e5 e ...Ng5 e igualam.'],
  c03: [`${B} Nc6 6 Nxc6 bxc6 7 e5 Nd5 8 Ne4 Qc7 9 f4 Qb6 10 c4 Bb4+ 11 Ke2 f5 12 Nf2 Ba6`, 'nc6', '6.Nxc6', '±',
    'Com 6.Nxc6 bxc6 7.e5 Nd5 8.Ne4 as brancas ganham espaço. As pretas dão xeques e pressionam c4, mas a posição continua delicada para elas.'],
  c04: [`${B} Nc6 6 g3 d5 7 exd5 Nxd5 8 Bg2 Ndb4 9 Nxc6 Qxd1+ 10 Kxd1 bxc6 11 a3 Nd5 12 Ne4 Ba6`, 'nc6', '6.g3', '±',
    'Com 6.g3 d5 as damas saem cedo. As pretas ficam com o peão c6 fraco, e as brancas ficam melhor no final.'],
  c05: [`${B} Bb4 6 e5 Nd5 7 Bd2 Nxc3 8 bxc3 Be7 9 Qg4 O-O 10 Bh6 g6 11 h4 Qa5 12 Qg3 d6`, 'bb4', '5...Bb4 6.e5 Nd5 7.Bd2', '±',
    'O Contra-ataque Siciliano, 5...Bb4, é tático e promete contra um adversário despreparado, mas é simplesmente ruim se as brancas sabem o que fazer. Com 7.Bd2! as brancas aceitam peões dobrados e atacam o rei preto.'],
  c06: [`${B} Bb4 6 e5 Ne4 7 Qg4 Qa5 8 Qxe4 Bxc3+ 9 bxc3 Qxc3+ 10 Kd1 Qxa1 11 Nb5 d5 12 Qb4 Nc6`, 'bb4', '6...Ne4', '±',
    'Com 6...Ne4 7.Qg4 Qa5 as pretas ganham a torre de a1, mas o rei preto fica preso no centro, e 11.Nb5! e 12.Qb4! dão às brancas um ataque decisivo.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '6... d6 7 Bf4 e5 8 Nd5 Nxd5 9 exd5 exf4 10 dxc6 bxc6 11 Qf3 d5 12 O-O-O Be7 13 Qc3 O-O 14 Qxc6 Be6 15 Nc7 Rc8 16 Nxe6 Rxc6 17 Nxd8 Rxd8', { a: '=', r: 'Kuznetsov–Chelushkina, URSS 1991', c: 'Com 6...d6 7.Bf4 e5 8.Nd5!? o final fica igual.' }],
  ['c01-a', '1', 'a', '(a) 8.Bg5', '8 Bg5', { c: '8.Bg5 transpõe para as linhas principais da Sveshnikov.' }],
  ['c01', 'b', 'b', '(b)', '9 Bd3 dxe4 10 Nxe4 Nxe4 11 Bxe4 Qxd1+ 12 Kxd1 e5 13 Re1', { a: '⩲', r: 'de Firmian–Illescas, Linares 1994', c: '9.Bd3 dxe4?! deixa as brancas um pouco melhor no final.' }],
  ['c01-b', '1', 'b', '(b) 9...Ne5', '9... Ne5 10 Bb5+ Bd7 11 Qd4 Nc6', { a: '=', r: 'Christiansen–Alburt, Campeonato dos EUA 1996', c: 'As pretas devem jogar 9...Ne5!, com igualdade.' }],
  ['c01', 'c', 'c', '(c)', '9... Nxd5 10 Bd2 Nxc3 11 Bxc3 Qxd1+ 12 Rxd1 f6 13 f4', { a: '⩲', r: 'Psakhis–Andersson, Olimpíada de Manila 1992', c: '9...Nxd5 10.Bd2! deixa as brancas com o par de bispos no final.' }],
  ['c01', 'd-A', 'd', '(d) A', '11... h6 12 Bf4 d4 13 Nb5 Nd5 14 Bg3 Be6 15 Re1 Qd7 16 Nd6', { a: '±', r: 'J. Polgár–Stein, Dortmund 1991', c: 'Com 11...h6 12.Bf4 d4 13.Nb5! as brancas ficam melhor.' }],
  ['c01-d-A', '1', 'd', '(d) A 14.Qf3', '14 Qf3 Be6 15 Rfe1 Qd7 16 Be5', { c: 'A ideia de Timoshenko, 14.Qf3 Be6 15.Rfe1 Qd7 16.Be5, talvez seja melhor.' }],
  ['c01', 'd-B', 'd', '(d) B', '11... Bg4 12 f3 Be6 13 Bg5', { a: '±', r: 'Janowski–Blackburne, Mônaco 1901', c: '11...Bg4 12.f3 Be6 13.Bg5 também deixa as brancas melhor.' }],
  ['c01', 'e', 'e', '(e)', '12 Ne4 Bf5 13 Bg5 Bxe4 14 Bxe4 h6 15 Bh4 g5 16 Bxc6 bxc6 17 Bg3 Qd5 18 Qd3 Ne4 19 Rfe1 Rfe8 20 Rad1 Rad8', { a: '=', r: 'Alonso–Lima, Campeonato Continental Americano 2005', c: 'Com 12.Ne4 Bf5 o jogo fica igual.' }],
  ['c01', 'f', 'f', '(f)', '13 Nf4 Qd6 14 Nh5 Nxh5 15 Qxh5 h6 16 Re1', { a: '±', r: 'Korneev–Alonso, Sevilha 2001', c: 'Depois de 12...Qd5 13.Nf4 Qd6 14.Nh5 as brancas ficam melhor.' }],
  ['c01-f', 'A', 'f', '(f) A 12...h6', '12... h6 13 b4 Bg4 14 Bb2 a6 15 f3 Be6 16 Kh1', { a: '±', r: 'Rytshagov–Liva, Estônia 1996', c: 'As pretas já tentaram outros 12º lances: 12...h6 13.b4 deixa as brancas melhor.' }],
  ['c01-f', 'B', 'f', '(f) B 12...Bg4', '12... Bg4 13 f3 Bh5 14 Bg5 Qd6 15 Qd2', { a: '±', r: 'Hermansson–Wirig, Saint Vincent 2005', c: '12...Bg4 (talvez o melhor) 13.f3 Bh5 14.Bg5 ainda deixa as brancas melhor.' }],
  // Coluna 2
  ['c02', 'g', 'g', '(g)', '7 Nd6+ Ke7 8 Nxc8+ Rxc8', { a: '∓', c: '7.Nd6+?! Ke7 8.Nxc8+ Rxc8 dá às pretas vantagem de desenvolvimento.' }],
  ['c02', 'h', 'h', '(h)', '10 Nxa8 e5 11 O-O-O Bxc3 12 bxc3 exf4 13 Bc4 Be6 14 Qxf4 Qxa8', { c: '10.Nxa8 e5 11.O-O-O Bxc3 deixa as pretas com dois cavalos pela torre.' }],
  ['c02-h', '1', 'h', '(h) 13.Qxf4', '13 Qxf4 Qa5', { c: '13.Qxf4 Qa5 é a alternativa.' }],
  ['c02', 'i', 'i', '(i)', '11... g5 12 Qxe4 Qxc7 13 Bxc7 dxe4 14 h4 g4 15 Bb5 f6', { a: '=', r: 'Rasik–Rogozenko, Campeonato Europeu Júnior 1992', c: '11...g5 12.Qxe4 Qxc7 13.Bxc7 dxe4 leva a um final igual.' }],
  ['c02', 'j', 'j', '(j)', '13 Bxg5 Qxg5+ 14 Kb1 h5 15 h4 Qg4', { a: '=', r: 'Martínez–Khenkin, Alcobendas 1994', c: 'Com 13.Bxg5 Qxg5+ 14.Kb1 h5! o jogo fica igual.' }],
  ['c02-j', '1', 'j', '(j) 13.Qe3', '13 Qe3 exf4', { c: '13.Qe3?! exf4 é pior para as brancas.' }],
  // Coluna 3
  ['c03', 'k', 'k', '(k)', '8 Nxd5 cxd5 9 Bd3 Ba6 10 O-O Bxd3 11 Qxd3 Qc7 12 Re1 Rc8 13 c3 g6 14 Be3 Bg7', { a: '=', r: 'Cámpora–Illescas, Buenos Aires 1993', c: 'Com 8.Nxd5 cxd5 9.Bd3 Ba6! as pretas trocam o bom bispo branco e igualam.' }],
  ['c03-k', '1', 'k', '(k) 10.Bxa6', '10 Bxa6 Qa5+', { c: '10.Bxa6 Qa5+ recupera a peça.' }],
  ['c03', 'l', 'l', '(l)', '8... Qa5+ 9 Bd2 Qc7 10 f4 Qb6 11 Bd3 Be7 12 Qe2', { a: '⩲', r: 'Emms–Sutovsky, Gausdal 1995', c: 'Com 8...Qa5+ 9.Bd2 as brancas ficam com perspectivas de ataque.' }],
  ['c03', 'm', 'm', '(m)', '10 Bd3 Ba6 11 Bxa6 Qxa6 12 Qe2 Qxe2+ 13 Kxe2 f5 14 Nf2 Rb8 15 c4 Nb4', { a: '=', r: 'De la Villa–Nunn, León 1997', c: '10.Bd3 Ba6 leva a um final igual.' }],
  ['c03', 'n', 'n', '(n)', '12 exf6 Nxf6 13 Be3 Qa5 14 Nxf6+ gxf6 15 Kf2 O-O 16 Bd3 Rf7 17 a3 Bc5', { a: '⩲', c: '12.exf6 Nxf6 já apareceu várias vezes entre grandes mestres: as brancas ficam um pouco mais confortáveis, nada mais.' }],
  ['c03', 'o', 'o', '(o)', '13 Kf3 Ne7 14 Qa4 c5 15 h4 O-O 16 Be3', { a: '±', r: 'de Firmian–Shabalov, Campeonato dos EUA 2000', c: 'Com 13.Kf3 Ne7 14.Qa4! as brancas ficam melhor, embora a posição ainda seja traiçoeira.' }],
  // Coluna 4
  ['c04', 'p', 'p', '(p)', '6 Be2 Bb4 7 O-O Bxc3 8 bxc3 Nxe4 9 Bd3 d5 10 Ba3 Nxd4 11 cxd4 Qa5 12 Qc1 Bd7', { a: '=', c: '6.Be2 Bb4 7.O-O Bxc3 8.bxc3 Nxe4 leva a um jogo igual.' }],
  ['c04', 'q-A', 'q', '(q) A', '6... a6 7 Bg2 Qc7', { c: '6...a6 7.Bg2 Qc7 transpõe para a Taimanov com 6.g3.' }],
  ['c04', 'q-B', 'q', '(q) B', '6... Bb4 7 Bg2 d5 8 exd5 Nxd5 9 O-O Bxc3 10 bxc3 Nxc3 11 Bxc6+ bxc6 12 Qf3', { a: '±', r: 'Mestel–Sveshnikov, Hastings 1977/78', c: '6...Bb4 é agudo e arriscado: depois de 9.O-O! as brancas ficam melhor.' }],
  ['c04-q-B', '1', 'q', '(q) B 9...Nxc3', '9... Nxc3 10 Nxc6 bxc6 11 bxc3 Bxc3 12 Bxc6+ Bd7 13 Qf3', { a: '±', c: '9...Nxc3 10.Nxc6! bxc6 11.bxc3 também deixa as brancas melhor.' }],
  ['c04', 'r', 'r', '(r)', '8... Nxc3 9 bxc3 Nxd4 10 Qxd4 Be7 11 Qxd8+ Bxd8 12 O-O f6 13 c4 Rb8', { a: '⩲', r: 'Movsesian–Chekhov, Alemanha 1996', c: 'Depois de 8...Nxc3 9.bxc3 Nxd4 as pretas ficam com um final pior, mas defensável.' }],
  ['c04', 's', 's', '(s)', '13 Nd2 O-O-O 14 c4 Bxc4 15 Nxc4 Ne3+ 16 Ke2 Nxc4 17 Bxc6', { a: '±', r: 'Kaidanov–Khenkin, Nova York 1994', c: 'Com 13.Nd2 O-O-O 14.c4! as brancas ficam melhor.' }],
  // Coluna 5
  ['c05', 't', 't', '(t)', '7 Qg4 O-O 8 Bh6 g6 9 Bxf8 Qxf8 10 Qg3 Qc5 11 Ne2 Nc6', { a: '=', c: '7.Qg4 O-O! 8.Bh6 g6 9.Bxf8 Qxf8: as pretas ganham o peão e5 e ficam com chances quase iguais.' }],
  ['c05', 'u', 'u', '(u)', '8... Ba5 9 Qg4 O-O 10 Bd3 d6 11 Nf3 g6 12 h4 dxe5 13 h5 f5 14 Bxf5 exf5 15 Qc4+ Rf7 16 hxg6 hxg6 17 Ng5 Qc7 18 Qh4', { a: '+−', r: 'Wagman–Barle, Biel 1981', c: 'Com 8...Ba5 9.Qg4 O-O 10.Bd3 as brancas atacam e vencem.' }],
  ['c05', 'v', 'v', '(v)', '13 Nb5 Nd7 14 h5 Nxe5 15 f4 Bd7 16 fxe5 Bxb5 17 Bxb5 Qxb5 18 Bxf8', { a: '±', r: 'Czarnota–Sulkis, Varsóvia 2005', c: 'Com 13.Nb5 Nd7 14.h5 as brancas ganham a qualidade.' }],
  // Coluna 6
  ['c06', 'w', 'w', '(w)', '6... Qa5 7 exf6 Bxc3+ 8 bxc3 Qxc3+ 9 Qd2 Qxa1 10 fxg7 Rg8 11 c3 Qb1 12 Bd3 Qb6 13 Qh6 Qc5 14 O-O Qe5 15 Nb5 Na6 16 Bg5 Qxg7 17 Nd6+ Kf8 18 Qh5', { a: '+−', r: 'Kriviashvili–Paksashvili, Děčín 1996', c: 'Uma linha antiga e traiçoeira, 6...Qa5?!, ainda aparece de vez em quando; depois de 9.Qd2! Qxa1 10.fxg7 as pretas ficam em apuros.' }],
  ['c06', 'x', 'x', '(x)', '7... Nxc3 8 Qxg7 Rf8 9 a3 Nb5+ 10 axb4 Nxd4 11 Bg5 Qb6 12 Bh6 Qxb4+ 13 c3 Nf5 14 cxb4 Nxg7 15 Bxg7', { a: '±', r: 'Szabó–Mikėnas, Kemeri 1939', c: '7...Nxc3 8.Qxg7! Rf8 9.a3 deixa as brancas melhor.' }],
  ['c06', 'y-A', 'y', '(y) A', '12... Qxe5 13 f4 Nc6 14 fxe5 Nxb4 15 Nc7+', { a: '±', c: 'Ou 12...Qxe5 13.f4 Nc6 14.fxe5 Nxb4 15.Nc7+, com vantagem branca.' }],
  ['c06', 'y-B', 'y', '(y) B', '13 Nc7+ Kd8 14 Qd6+ Bd7 15 Nxa8 Qxe5 16 Ba3 Qd4+ 17 Kc1 Qa1+ 18 Kd2 Qd4+ 19 Bd3 Qxf2+ 20 Kd1 Qxg2 21 Qc7+ Ke8 22 Rf1 e5 23 Qxb7 f6 24 Nc7+ Kf7 25 Ne6', { a: '+−', r: 'Berg–Johnsen, Gausdal 1993', c: 'Depois de 12...Nc6 13.Nc7+ Kd8 14.Qd6+ as brancas vencem; na partida, 24.Nc7+ Kf7 25.Ne6! decidia.' }],
]

const capitulo = {
  id: 'siciliana-quatro-cavalos',
  arquivo: 'siciliana-quatro-cavalos',
  nome: 'Siciliana — Quatro Cavalos e Contra-ataque Siciliano',
  fonte: 'Modern Chess Openings — Sicilian Defense, Four Knights’ Variation and Sicilian Counter Attack (pp. 315–317), colunas 1–6',
  base: '1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3',
  corPadrao: 'b',
  ordem: 315,
  grupos: [
    { id: 'nc6', nome: '5...Nc6 (Quatro Cavalos)', colunas: [1, 2, 3, 4] },
    { id: 'bb4', nome: '5...Bb4 (Contra-ataque Siciliano)', colunas: [5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
