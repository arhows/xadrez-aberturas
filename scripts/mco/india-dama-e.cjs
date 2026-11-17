// Transcrição do MCO 15ª ed. — Defesa Índia da Dama, 4.g3 Bb7 (6.Nc3, 5...c5, 5...Bb4+) e 4.g3 Bb4+ (pp. 576–577), colunas 25–30.
// Gerar: node scripts/mco/gerar.cjs india-dama-e
// Formato: ver gambito-do-rei.cjs. Dicas em india-dama-e-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua.
// Avaliações tiradas do texto: (g) e (j) "chances para os dois lados" ficaram ∞; (i) "as pretas ficam um pouco
// desconfortáveis no final" ficou ⩲; (o) B "tem sido confiável para as pretas" ficou =; (t) "as pretas ficam só um
// pouquinho pior" ficou ⩲; (v) "chances iguais" ficou =.
// Notas só com comentário: (h) 11...Bxf6, (k), (l) 8...d6.
// Errata: na nota (o) B o livro dá "8 Na5 Ra7", mas nenhum cavalo branco chega a a5; a linha foi cortada em 7...Ba6.

const F = '1 d4 Nf6 2 c4 e6 3 Nf3 b6 4 g3'

const colunas = {
  c25: [`${F} Bb7 5 Bg2 Be7 6 Nc3 Ne4 7 Bd2 Bf6 8 Qc2 Nxd2 9 Qxd2 d6 10 d5 O-O 11 Nd4 Bxd4 12 Qxd4 c5`, 'nc3', '5...Be7 6.Nc3 Ne4 7.Bd2 Bf6', '=',
    'Adiar o roque com 6.Nc3 é uma das linhas mais agressivas contra 4.g3: a luta por e4 e d5 começa logo. Depois de 6...Ne4 7.Bd2 Bf6 8.Qc2 Nxd2 9.Qxd2 d6 10.d5 O-O 11.Nd4 Bxd4 12.Qxd4 c5 o jogo é igual.'],
  c26: [`${F} Bb7 5 Bg2 Be7 6 Nc3 Ne4 7 Bd2 f5 8 d5 Bf6 9 Qc2 Qe7 10 O-O Na6 11 Rad1 Nd6 12 dxe6 dxe6`, 'nc3', '7...f5', '∞',
    'Com 7...f5 as pretas firmam o cavalo em e4. Depois de 8.d5 Bf6 9.Qc2 Qe7 10.O-O Na6 11.Rad1 Nd6 12.dxe6 dxe6 há chances para os dois lados.'],
  c27: [`${F} Bb7 5 Bg2 c5 6 d5 exd5 7 Nh4 Na6 8 cxd5 d6 9 O-O g6 10 Nc3 Bg7 11 f4 O-O 12 e4 Re8`, 'c5', '5...c5', '∞',
    'Com 5...c5 6.d5 exd5 7.Nh4 a posição lembra uma Benoni. Depois de 7...Na6! 8.cxd5 d6 9.O-O g6 10.Nc3 Bg7 11.f4 O-O 12.e4 Re8 há chances para os dois lados.'],
  c28: [`${F} Bb7 5 Bg2 Bb4+ 6 Bd2 Be7 7 Nc3 O-O 8 O-O Na6 9 Rc1 d6 10 Re1 c5 11 e4 cxd4 12 Nxd4 Nc5`, 'bb4', '5...Bb4+', '⩲',
    'Com 5...Bb4+ 6.Bd2 Be7 as pretas tiram o bispo branco da diagonal natural. Depois de 7.Nc3 O-O 8.O-O Na6 9.Rc1 d6 10.Re1 c5 11.e4 cxd4 12.Nxd4 Nc5 as pretas têm um ouriço, e as brancas uma posição agradável.'],
  c29: [`${F} Bb4+ 5 Bd2 Bxd2+ 6 Qxd2 Ba6 7 b3 c6 8 Nc3 d5 9 e4 Nxe4 10 Nxe4 dxe4 11 Ng5 Nd7 12 Bg2 Nf6`, 'bb4j', '4...Bb4+ 5.Bd2', '⩲',
    'Com 4...Bb4+, como na Bogo-Índia, as pretas trocam o bispo para aliviar o espaço. Depois de 5.Bd2 Bxd2+ 6.Qxd2 Ba6 7.b3 c6 8.Nc3 d5 9.e4! Nxe4 10.Nxe4 dxe4 11.Ng5 Nd7 12.Bg2 Nf6 as brancas recuperam o peão com vantagem.'],
  c30: [`${F} Bb4+ 5 Nbd2 Bb7 6 Bg2 O-O 7 O-O d5 8 cxd5 exd5 9 Ne5 Re8 10 Ndc4 c6 11 Ne3 Bd6 12 Nd3 g6`, 'bb4j', '5.Nbd2', '=',
    'Com 5.Nbd2 as brancas mudam a arrumação natural das peças. Depois de 5...Bb7 6.Bg2 O-O 7.O-O d5 8.cxd5 exd5 9.Ne5 Re8 10.Ndc4 c6! 11.Ne3 Bd6 12.Nd3 g6 as pretas igualam.'],
}

const notas = [
  // Coluna 25
  ['c25', 'a', 'a', '(a)', '6... O-O 7 Qc2 c5 8 d5 exd5 9 Ng5 h6 10 Nxd5 Bxd5 11 Bxd5 Nc6 12 Bxc6', { a: '⩲', r: 'H. Olafsson–Stefansson, Campeonato Islandês 1993', c: '6...O-O?! 7.Qc2 c5 8.d5 exd5 9.Ng5 h6 10.Nxd5 Bxd5 11.Bxd5 Nc6 12.Bxc6 é um pouco melhor para as brancas.' }],
  ['c25', 'b', 'b', '(b)', '8 Rc1 Bxd4 9 Nxd4 Nxc3 10 Bxb7 Nxd1 11 Rxd1 c6 12 Bf4 O-O 13 Bd6 Re8 14 Bxa8 Qc8 15 b4 Na6 16 b5 Qxa8 17 bxa6 c5 18 Nf3 Qe4', { a: '∓', r: 'Karpov–Salov, Roterdã 1989', c: '8.Rc1 Bxd4! 9.Nxd4 Nxc3 10.Bxb7 Nxd1 11.Rxd1 c6 12.Bf4 O-O 13.Bd6 Re8 14.Bxa8 Qc8 15.b4 Na6 16.b5 Qxa8 17.bxa6 c5 18.Nf3 Qe4 é melhor para as pretas.' }],
  ['c25', 'c', 'c', '(c)', '11... e5 12 Nc6 Qd7 13 Nxb8 Rfxb8 14 h4 a5 15 a4 Rf8 16 e4 h5 17 O-O-O', { a: '±', r: 'Karpov–Yusupov, Tilburg 1993', c: '11...e5 12.Nc6 Qd7 13.Nxb8 Rfxb8 14.h4 a5?! 15.a4 Rf8 16.e4 h5 17.O-O-O! é melhor para as brancas.' }],
  ['c25', 'd', 'd', '(d)', '13 Qd2 Nd7 14 O-O e5 15 f4 Qe7', { a: '=', r: 'Izoria–Fedorchuk, Dubai 2006', c: '13.Qd2 Nd7 14.O-O e5 15.f4 Qe7 leva à igualdade.' }],
  // Coluna 26
  ['c26', 'e', 'e', '(e)', '7... O-O 8 d5 f5 9 Qc2 exd5 10 Nxd5 Nc6 11 O-O a5 12 Rad1 Bf6 13 Be3 Nb4', { a: '=', r: 'Gelfand–Tiviakov, Wijk aan Zee 2006', c: '7...O-O 8.d5 f5 9.Qc2 exd5 10.Nxd5 Nc6 11.O-O a5 12.Rad1 Bf6 13.Be3 Nb4 leva à igualdade.' }],
  ['c26', 'f', 'f', '(f)', '11... Nb4 12 Qb3 a5 13 Nb5 O-O 14 Nxc7 Rac8 15 a3 Rxc7 16 axb4 Nxd2 17 Nxd2 Qxb4 18 Qxb4 axb4 19 d6 Bxg2 20 dxc7 Bxf1 21 Nxf1 Bxb2 22 Rxd7 Bf6 23 Rd6', { a: '±', r: 'Schneider–Cosma, Belgrado 1995', c: '11...Nb4?! 12.Qb3 a5 13.Nb5 O-O 14.Nxc7 Rac8 15.a3! Rxc7 16.axb4 Nxd2 17.Nxd2 Qxb4 18.Qxb4 axb4 19.d6! Bxg2 20.dxc7 Bxf1 21.Nxf1 Bxb2 22.Rxd7 Bf6 23.Rd6 é melhor para as brancas.' }],
  ['c26', 'g', 'g', '(g)', '13 Qa4+ Kf7 14 Be3 Nc5 15 Bxc5 bxc5', { a: '∞', r: 'Petursson–Rozentalis, Malmö 1993', c: '13.Qa4+ Kf7 14.Be3 Nc5 15.Bxc5 bxc5 dá chances para os dois lados.' }],
  // Coluna 27
  ['c27', 'h', 'h', '(h)', '7... g6 8 Nc3 Bg7 9 O-O O-O 10 Bg5 h6 11 Bxf6 Qxf6 12 Nxd5', { a: '⩲', r: 'Brynell–Bentsen, Bygger\'n Masters 2005', c: '7...g6 8.Nc3 Bg7 9.O-O O-O 10.Bg5 h6 11.Bxf6 Qxf6 12.Nxd5 é um pouco melhor para as brancas.' }],
  ['c27-h', '1', 'h', '(h) 11...Bxf6', '11... Bxf6 12 Nxg6', { c: '11...Bxf6? é respondido por 12.Nxg6!.' }],
  ['c27', 'i', 'i', '(i)', '11 Qa4+ Qd7 12 Qxd7+ Kxd7 13 e4', { a: '⩲', c: '11.Qa4!?+ Qd7 12.Qxd7+ Kxd7 13.e4 deixa as pretas um pouco desconfortáveis no final.' }],
  ['c27', 'j', 'j', '(j)', '13 Re1 Nc7 14 a4 Rb8', { a: '∞', r: 'Adianto–Campora, Buenos Aires 1997', c: '13.Re1 Nc7 14.a4 Rb8 dá chances para os dois lados.' }],
  // Coluna 28
  ['c28', 'k', 'k', '(k)', '6 Nbd2', { c: '6.Nbd2 transpõe para a coluna 30.' }],
  ['c28', 'l', 'l', '(l)', '6... Bxd2+ 7 Qxd2 O-O 8 Nc3 Ne4 9 Qd3 Nxc3 10 Ng5 Ne4 11 Bxe4 Bxe4 12 Qxe4 Qxg5 13 Qxa8 Nc6 14 Qb7 Nxd4 15 Rd1 Qe5 16 e3 Nc2+ 17 Ke2', { a: '⩲', r: 'Novikov–Christiansen, Antuérpia 1995', c: 'Um sacrifício de qualidade interessante surge depois de 6...Bxd2+ 7.Qxd2 O-O 8.Nc3 Ne4 9.Qd3 Nxc3 10.Ng5! Ne4 11.Bxe4 Bxe4 12.Qxe4 Qxg5 13.Qxa8 Nc6 14.Qb7 Nxd4 15.Rd1 Qe5 16.e3 Nc2+ 17.Ke2, um pouco melhor para as brancas.' }],
  ['c28-l', '1', 'l', '(l) 8...d6', '8... d6 9 Qc2', { a: '⩲', c: '8...d6 9.Qc2 e 10.e4 é um pouco melhor para as brancas.' }],
  ['c28', 'm', 'm', '(m)', '9 Ne5 Bxg2 10 Kxg2 c5 11 d5 exd5 12 cxd5 Qb8 13 Nf3 b5 14 Bg5 d6', { a: '=', r: 'P. Nikolić–Oll, Interzonal de Biel 1993', c: '9.Ne5 Bxg2 10.Kxg2 c5 11.d5 exd5 12.cxd5 Qb8! 13.Nf3 b5 14.Bg5 d6 leva à igualdade.' }],
  ['c28', 'n', 'n', '(n)', '13 Qe2 Rc8 14 Red1 Qc7 15 Ndb5 Qb8 16 Bf4', { a: '⩲', r: 'Vyzhmanavin–Scheider, Leningrado 1990', c: '13.Qe2 Rc8 14.Red1 Qc7 15.Ndb5 Qb8 16.Bf4 é um pouco melhor para as brancas, com uma posição de ouriço agradável.' }],
  // Coluna 29
  ['c29', 'o-A', 'o', '(o) A', '5... Be7 6 Nc3 c6 7 e4 d5 8 Bd3 dxc4 9 Bxc4 O-O 10 Qe2', { a: '⩲', r: 'Epishin–Contreras, HB Global 2005', c: '5...Be7 6.Nc3 c6 7.e4 d5 8.Bd3!? dxc4 9.Bxc4 O-O 10.Qe2 é um pouco melhor para as brancas.' }],
  ['c29', 'o-B', 'o', '(o) B', '5... a5 6 Bg2 O-O 7 O-O Ba6', { a: '=', c: '5...a5 6.Bg2 O-O 7.O-O Ba6 tem sido confiável para as pretas na prática. (O livro continua com "8 Na5 Ra7", mas nenhum cavalo branco chega a a5; a linha foi cortada.)' }],
  ['c29', 'p', 'p', '(p)', '7 Na3 O-O 8 Bg2 Bb7 9 O-O d6 10 Rad1 Nbd7', { a: '=', r: 'Peletier–Carlsen, Biel 2006', c: '7.Na3 O-O 8.Bg2 Bb7 9.O-O d6 10.Rad1 Nbd7 leva à igualdade.' }],
  ['c29', 'q', 'q', '(q)', '7... Bb7 8 Bg2 c5 9 dxc5 bxc5 10 Nc3 O-O 11 O-O Qe7 12 Rfd1 Rd8 13 Qd6', { a: '⩲', r: 'Atalik–Oll, Nova Gorica 1999', c: '7...Bb7 8.Bg2 c5 9.dxc5 bxc5 10.Nc3 O-O 11.O-O Qe7 12.Rfd1 Rd8 13.Qd6 é um pouco melhor para as brancas.' }],
  ['c29', 'r', 'r', '(r)', '13 Nxe4 Nxe4 14 Bxe4 Bb7 15 O-O O-O 16 Qe3 Qf6 17 Rad1', { a: '⩲', r: 'Hjartarson–de Firmian, Akureyri 1994', c: '13.Nxe4 Nxe4 14.Bxe4 Bb7 15.O-O O-O 16.Qe3 Qf6 17.Rad1 é um pouco melhor para as brancas.' }],
  // Coluna 30
  ['c30', 's', 's', '(s)', '5... Ba6 6 Qc2 Bb7 7 Bg2 Be4 8 Qb3 Bxd2+ 9 Bxd2 O-O 10 O-O d6 11 Qa3 Nbd7 12 Rac1', { a: '⩲', r: 'Romanishin–Timman, Taxco 1985', c: '5...Ba6 6.Qc2 Bb7 7.Bg2 Be4 8.Qb3 Bxd2+ 9.Bxd2 O-O 10.O-O d6 11.Qa3 Nbd7 12.Rac1 é um pouco melhor para as brancas.' }],
  ['c30', 't', 't', '(t)', '7... Bxd2 8 Bxd2 d6 9 Qc2 Nbd7 10 Rad1 a5', { a: '⩲', r: 'Ftáčnik–Donaldson, Oregon 1991', c: 'As pretas ficam só um pouquinho pior depois de 7...Bxd2 8.Bxd2 d6 9.Qc2 Nbd7 10.Rad1 a5.' }],
  ['c30', 'u', 'u', '(u)', '9... Bd6 10 Ndc4 Re8 11 Bg5 Be7 12 Ne3 h6 13 Bxf6 Bxf6 14 f4', { a: '⩲', r: 'Gelfand–Georgadze, Uzhgorod 1987', c: '9...Bd6 10.Ndc4! Re8 11.Bg5 Be7 12.Ne3 h6 13.Bxf6 Bxf6 14.f4 é um pouco melhor para as brancas.' }],
  ['c30', 'v', 'v', '(v)', '13 b4 Nbd7', { a: '=', r: 'D. Gurevich–Khalifman, Moscou 1992', c: '13.b4 foi a partida; agora 13...Nbd7 e ...a5 dá chances iguais às pretas.' }],
]

const capitulo = {
  id: 'india-dama-e',
  arquivo: 'india-dama-e',
  nome: 'Índia da Dama — 4.g3, 6.Nc3 e 4...Bb4+',
  fonte: 'Modern Chess Openings — Queen\'s Indian Defense (pp. 576–577), colunas 25–30',
  base: '1. d4 Nf6 2. c4 e6 3. Nf3 b6',
  corPadrao: 'b',
  ordem: 576,
  grupos: [
    { id: 'nc3', nome: '5...Be7 6.Nc3', colunas: [25, 26] },
    { id: 'c5', nome: '5...c5', colunas: [27] },
    { id: 'bb4', nome: '5...Bb4+', colunas: [28] },
    { id: 'bb4j', nome: '4...Bb4+', colunas: [29, 30] },
  ],
}

module.exports = { capitulo, colunas, notas }
