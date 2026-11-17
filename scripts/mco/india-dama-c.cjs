// Transcrição do MCO 15ª ed. — Defesa Índia da Dama, Sistema Petrosian, variantes no 4º e 5º lances (pp. 571–573), colunas 13–18.
// Gerar: node scripts/mco/gerar.cjs india-dama-c
// Formato: ver gambito-do-rei.cjs. Dicas em india-dama-c-dicas.cjs.
//
// Só a coluna 17 traz avaliação no fim (=); as outras usam a da nota que as continua.
// Avaliações tiradas do texto: (a) "sem problemas para as pretas" ficou =; (b) B "11.e4 deve dar vantagem às brancas" ficou ⩲;
// (e) "boas chances de igualar" ficou ⩲; (j) "bom jogo pela qualidade" ficou =; (k) "compensação insuficiente" ficou ⩲;
// (q) A "contrajogo das pretas" ficou =; (u) "pressão no centro" ficou ⩲; (v) "excelente jogo pelo peão" ficou ⩲;
// (w) "iniciativa pelo peão" ficou =; (y) "ataque forte pelo peão" ficou ±.
// Notas só com comentário: (c) 12.Bxb5, (d), (g) 8...Qe7, (m) A, (p) 11.O-O.
// Erratas:
//   (s): o sinal final aparece como "2" no livro (impressão borrada); ficou =, que é o que o Stockfish dá (+0,1).
//   (x): o livro pula do 15º para "17 Qd7"; a linha foi cortada em 15...Na6.

const F = '1 d4 Nf6 2 c4 e6 3 Nf3 b6 4 a3'

const colunas = {
  c13: [`${F} Bb7 5 Nc3 Ne4 6 Nxe4 Bxe4 7 Nd2 Bb7 8 e4 g6 9 Bd3 Bg7 10 Nf3 d6 11 O-O O-O`, 'bb7', '4...Bb7 5.Nc3 Ne4', '⩲',
    'Com 4...Bb7 5.Nc3 Ne4 as pretas trocam um cavalo logo; antes se achava ruim, mas as pretas podem estar bem. Depois de 6.Nxe4 Bxe4 7.Nd2 Bb7 8.e4 g6 9.Bd3 Bg7 10.Nf3 d6 11.O-O O-O as brancas têm mais espaço, e as pretas têm boas chances de igualar.'],
  c14: [`${F} Bb7 5 Nc3 g6 6 Qc2 Bxf3 7 gxf3 Nc6 8 e3 Bg7 9 f4 O-O 10 Bg2 Na5 11 Ne2 d5`, 'bb7', '5...g6 (Romanishin)', '⩲',
    'A ideia de Romanishin, 5...g6, leva o outro bispo para a grande diagonal. Depois de 6.Qc2 Bxf3 7.gxf3 Nc6 8.e3 Bg7 9.f4 O-O 10.Bg2 Na5 11.Ne2! d5 as pretas entregam um peão, mas não têm compensação suficiente.'],
  c15: [`${F} Ba6 5 Qc2 Bb7 6 Nc3 c5 7 e4 cxd4 8 Nxd4 Nc6 9 Nxc6 Bxc6 10 Bf4 Nh5 11 Be3 Qb8`, 'ba6', '4...Ba6 5.Qc2 Bb7 6.Nc3 c5', '⩲',
    'Com 4...Ba6 5.Qc2 Bb7 as pretas fazem as brancas gastarem um tempo com a dama, que não fica bem em c2. Depois de 6.Nc3 c5 7.e4 cxd4 8.Nxd4 Nc6 9.Nxc6 Bxc6 10.Bf4 Nh5 11.Be3 Qb8 as brancas ficam um pouco melhor.'],
  c16: [`${F} Ba6 5 Qc2 Bb7 6 Nc3 c5 7 e4 cxd4 8 Nxd4 Bc5 9 Nb3 Nc6 10 Bg5 h6 11 Bh4 Nd4`, 'ba6', '8...Bc5', '=',
    'Com 8...Bc5 o bispo ataca o cavalo de d4. Depois de 9.Nb3 Nc6 10.Bg5 h6 11.Bh4 Nd4 o cavalo preto ocupa d4, e o jogo é igual.'],
  c17: [`${F} Ba6 5 Qc2 Bb7 6 Nc3 c5 7 dxc5 bxc5 8 Bf4 Bxf3 9 gxf3 Nc6 10 e3 Nh5 11 Bg3 Nxg3`, 'ba6', '7.dxc5', '=',
    'Com 7.dxc5 bxc5 8.Bf4 as brancas evitam o centro aberto. Depois de 8...Bxf3! 9.gxf3 Nc6 10.e3 Nh5 11.Bg3 Nxg3 as pretas tiram o par de bispos das brancas, e o jogo é igual.'],
  c18: [`${F} c5 5 d5 Ba6 6 Qc2 exd5 7 cxd5 g6 8 Nc3 Bg7 9 g3 O-O 10 Bg2 d6 11 O-O Re8`, 'c5', '4...c5', '⩲',
    'Com 4...c5 5.d5 Ba6 as pretas buscam uma estrutura de Benoni, atacando c4. Depois de 6.Qc2 exd5 7.cxd5 g6 8.Nc3 Bg7 9.g3 O-O 10.Bg2 d6 11.O-O Re8 as brancas ficam um pouco melhor.'],
}

const notas = [
  // Coluna 13
  ['c13', 'a', 'a', '(a)', '6 Bd2 Be7 7 d5 f5 8 g3 Bf6', { a: '=', r: 'Shaked–de Firmian, Campeonato dos EUA 1998', c: '6.Bd2 Be7 7.d5 f5! 8.g3 Bf6 não cria problemas para as pretas.' }],
  ['c13', 'b-A', 'b', '(b) A', '7 e3 Be7 8 Bd3 Bxd3 9 Qxd3 d5 10 e4 O-O 11 O-O dxe4 12 Qxe4 Nd7 13 Qc6 Nf6 14 Bf4 Qd7', { a: '=', r: 'Timman–Andersson, Wijk aan Zee 1981', c: '7.e3 Be7 8.Bd3 Bxd3 9.Qxd3 d5 10.e4 O-O 11.O-O dxe4 12.Qxe4 Nd7 13.Qc6 Nf6 14.Bf4 Qd7! leva à igualdade.' }],
  ['c13', 'b-B', 'b', '(b) B', '7 Bf4 Be7 8 e3 O-O 9 Bd3 Bxd3 10 Qxd3 a5 11 e4', { a: '⩲', r: 'Gelfand–Portisch, Moscou 1990', c: 'Talvez o melhor seja 7.Bf4 Be7 8.e3 O-O 9.Bd3 Bxd3 10.Qxd3 a5, e agora 11.e4 deve dar vantagem às brancas.' }],
  ['c13-b-B', '1', 'b', '(b) B 7...d6', '7... d6 8 e3 Nd7 9 Bd3', { a: '⩲', r: 'Christiansen–de Firmian, Campeonato dos EUA 2002', c: '7...d6 8.e3 Nd7 9.Bd3 é um pouco melhor para as brancas.' }],
  ['c13', 'c', 'c', '(c)', '7... Bg6 8 g3 Nc6 9 e3 a6 10 b4 b5 11 cxb5 axb5 12 Bb2 Na7 13 h4 h6 14 d5 exd5 15 Bg2 c6 16 O-O', { a: '±', r: 'Kasparov–Andersson, Tilburg 1981', c: '7...Bg6?! 8.g3 Nc6 9.e3 a6 10.b4 b5 11.cxb5 axb5 12.Bb2 Na7 13.h4 h6 14.d5! exd5 15.Bg2 c6 16.O-O é melhor para as brancas, com peças ativas e pressão na ala do rei; Kasparov venceu uma partida brilhante.' }],
  ['c13-c', '1', 'c', '(c) 12.Bxb5', '12 Bxb5 Nxb4', { c: '12.Bxb5? Nxb4 perde o peão b.' }],
  ['c13', 'd', 'd', '(d)', '11 Bg5 Qd7 12 Qd2 h6 13 Be3 Nc6 14 O-O Ne7', { r: 'Psakhis–de Firmian, Copenhague 2001', c: '11.Bg5 Qd7 12.Qd2 h6 13.Be3 Nc6 14.O-O, e agora 14...Ne7 é melhor que o 14...e5 da partida.' }],
  ['c13-d', '1', 'd', '(d) 14...e5', '14... e5 15 d5', { a: '⩲', c: '14...e5 15.d5, como na partida, é um pouco melhor para as brancas.' }],
  ['c13', 'e', 'e', '(e)', '12 Bg5 Bf6', { a: '⩲', r: 'Polugaevsky–Christiansen, Olimpíada de Salônica 1984', c: '12.Bg5 Bf6 dá às pretas boas chances de igualar.' }],
  ['c13-e', '1', 'e', '(e) 12...Qd7', '12... Qd7 13 Qd2 Nc6 14 d5', { a: '⩲', c: 'Na partida, 12...Qd7?! 13.Qd2 Nc6 14.d5 foi um pouco melhor para as brancas.' }],
  // Coluna 14
  ['c14', 'f', 'f', '(f)', '5... Be7 6 d5 d6 7 e4 c6 8 dxe6 fxe6 9 Ng5 Bc8 10 f4 O-O 11 Bd3', { a: '±', r: 'Petrosian–Keres, Zurique 1961', c: '5...Be7?! 6.d5! é a ideia do 4.a3 de Petrosian: as brancas simplesmente ganham espaço, por exemplo 6...d6 7.e4 c6 8.dxe6 fxe6 9.Ng5 Bc8 10.f4 O-O 11.Bd3, melhor para as brancas.' }],
  ['c14', 'g', 'g', '(g)', '6 d5 Bg7 7 e4 exd5 8 cxd5 O-O 9 Bd3 c6 10 d6 c5 11 O-O Nc6 12 h3', { a: '⩲', r: 'Xu Jun–Zhang Zhong, Copa Sanjin 2004', c: '6.d5 Bg7 7.e4 exd5 8.cxd5 O-O 9.Bd3 c6 10.d6 c5 11.O-O Nc6 12.h3 é um pouco melhor para as brancas.' }],
  ['c14-g', '1', 'g', '(g) 8...Qe7', '8... Qe7', { c: '8...Qe7!? é uma alternativa.' }],
  ['c14', 'h', 'h', '(h)', '6... Bg7 7 e4 O-O 8 Bg5 h6 9 Bh4 g5 10 Bg3 Nh5 11 O-O-O d6 12 Be2', { a: '±', r: 'M. Gurevich–Chuchelov, Bélgica 1993', c: '6...Bg7 7.e4 O-O 8.Bg5 h6 9.Bh4 g5 10.Bg3 Nh5 11.O-O-O d6 12.Be2 é melhor para as brancas.' }],
  ['c14', 'i', 'i', '(i)', '7 exf3 Bg7 8 Bg5 c5 9 d5 h6 10 Be3', { a: '±', r: 'Khalifman–Romanishin, Lucerna 1997', c: '7.exf3!? Bg7 8.Bg5 c5?! 9.d5 h6 10.Be3 é melhor para as brancas; as pretas deveriam jogar 8...O-O.' }],
  ['c14', 'j', 'j', '(j)', '11 Bxa8 Qxa8 12 O-O Nxc4 13 Qe2 d5', { a: '=', r: 'Dokhoian–Shirov, URSS 1988', c: '11.Bxa8 Qxa8 12.O-O Nxc4 13.Qe2 d5 dá às pretas bom jogo pela qualidade.' }],
  ['c14', 'k', 'k', '(k)', '12 cxd5 exd5 13 O-O c6 14 Bd2 Nc4 15 Bb4 Re8 16 b3 Nd6 17 Qxc6 Nde4 18 Bh3', { a: '⩲', r: 'Akopian–Romanishin, Lucerna 1993', c: '12.cxd5 exd5 13.O-O c6!? 14.Bd2 Nc4 15.Bb4 Re8 16.b3 Nd6 17.Qxc6 Nde4 18.Bh3 deixa as pretas sem compensação suficiente pelo peão.' }],
  ['c14-k', '1', 'k', '(k) 13...Qd7', '13... Qd7 14 Bd2', { a: '⩲', c: '13...Qd7 14.Bd2 é um pouco melhor para as brancas.' }],
  // Coluna 15
  ['c15', 'l-A', 'l', '(l) A', '5 Nbd2 Bb7 6 Qc2 d5 7 cxd5 exd5 8 g3 Bd6 9 Bg2 Nbd7 10 O-O O-O 11 Nh4 Re8', { a: '=', r: 'Rohde–Miles, Campeonato dos EUA 1989', c: 'As alternativas não dão vantagem às brancas: 5.Nbd2 Bb7 6.Qc2 d5 7.cxd5 exd5 8.g3 Bd6 9.Bg2 Nbd7 10.O-O O-O 11.Nh4 Re8 leva à igualdade.' }],
  ['c15', 'l-B', 'l', '(l) B', '5 e3 d5 6 Nbd2 Be7 7 b4 O-O 8 Bb2 Nbd7 9 Qc2 c5', { a: '=', r: 'Kozul–Beliavsky, Portorož 1997', c: '5.e3 d5 6.Nbd2 Be7 7.b4 O-O 8.Bb2 Nbd7 9.Qc2 c5 leva à igualdade.' }],
  ['c15', 'l-C', 'l', '(l) C', '5 Qb3 c5 6 d5 exd5 7 cxd5 d6 8 Nc3 Be7', { a: '=', c: '5.Qb3 c5 6.d5 exd5 7.cxd5 d6 8.Nc3 Be7 leva à igualdade.' }],
  ['c15', 'm-A', 'm', '(m) A', '5... c5 6 d5', { c: '5...c5 6.d5 transpõe para a coluna 18.' }],
  ['c15', 'm-B', 'm', '(m) B', '5... d5 6 cxd5 exd5 7 Nc3 c6 8 g3 Bd6 9 Bg2 O-O 10 O-O Nbd7 11 Re1', { a: '⩲', r: 'Petrosian–Korchnoi, match 1980', c: '5...d5 6.cxd5 exd5 7.Nc3 c6 8.g3 Bd6 9.Bg2 O-O 10.O-O Nbd7 11.Re1 é um pouco melhor para as brancas.' }],
  ['c15', 'n', 'n', '(n)', '10... Bc5 11 Be2 O-O 12 Rd1 a5 13 O-O Qe7 14 Bg5', { a: '⩲', r: 'Dreev–Tiviakov, Varsóvia 2005', c: '10...Bc5 11.Be2 O-O 12.Rd1 a5 13.O-O Qe7 14.Bg5 é um pouco melhor para as brancas.' }],
  ['c15', 'o', 'o', '(o)', '12 g3 Bc5 13 Bxc5 bxc5 14 O-O-O Nf6 15 f4', { a: '⩲', r: 'Khalifman–Nisipeanu, Las Vegas 1999', c: '12.g3 Bc5 13.Bxc5 bxc5 14.O-O-O Nf6 15.f4 é um pouco melhor para as brancas.' }],
  // Coluna 16
  ['c16', 'p', 'p', '(p)', '8... d6 9 Be2 Be7 10 Be3 a6 11 O-O-O Qc7 12 g4 Nfd7 13 f4 O-O 14 f5', { a: '±', r: 'Zu Chen–Zhang, Pequim 1997', c: '8...d6 9.Be2 Be7 10.Be3 a6 11.O-O-O!? Qc7 12.g4 Nfd7 13.f4 O-O 14.f5 é melhor para as brancas.' }],
  ['c16-p', '1', 'p', '(p) 11.O-O', '11 O-O', { c: '11.O-O leva a posições mais típicas de ouriço.' }],
  ['c16', 'q-A', 'q', '(q) A', '10 Bf4 O-O 11 Nxc5 bxc5 12 Bd6 Nd4 13 Qd3 Re8 14 b4 e5', { a: '=', r: 'Bosboom–Alekseev, Wijk aan Zee 2005', c: '10.Bf4 O-O! 11.Nxc5 bxc5 12.Bd6 Nd4 13.Qd3 Re8 14.b4 e5 dá contrajogo às pretas.' }],
  ['c16', 'q-B', 'q', '(q) B', '10 Bd3 d6 11 O-O O-O', { a: '=', r: 'Psakhis–Salov, Campeonato da URSS 1987', c: '10.Bd3 d6 11.O-O O-O leva à igualdade.' }],
  ['c16', 'r', 'r', '(r)', '12 Nxd4 Bxd4 13 Bd3 Qb8 14 Bg3 Be5 15 O-O-O O-O 16 Kb1 Rc8', { a: '=', r: 'Bologan–Zhang Zhong, Wijk aan Zee 2004', c: '12.Nxd4 Bxd4 13.Bd3 Qb8 14.Bg3 Be5 15.O-O-O O-O 16.Kb1 Rc8 leva à igualdade.' }],
  // Coluna 17
  ['c17', 's', 's', '(s)', '7 d5 exd5 8 cxd5 Nxd5 9 Bg5 Be7 10 Nb5 O-O 11 Nd6 Ne3 12 fxe3 Bxf3 13 exf3 Bxg5', { a: '=', r: 'Dzhandzhava–Chernin, Lvov 1987', c: '7.d5?! exd5 8.cxd5 Nxd5 9.Bg5 Be7 10.Nb5 O-O 11.Nd6 Ne3! 12.fxe3 Bxf3 13.exf3 Bxg5 leva a uma posição igual (o sinal do livro está ilegível).' }],
  ['c17', 't', 't', '(t)', '8 Bg5 Be7 9 e3 O-O 10 Be2 Qb6 11 O-O Rd8 12 Rfd1 d6 13 Rab1 Nbd7 14 b4 cxb4 15 axb4 Rac8 16 Qa2 a6', { a: '=', r: 'C. Hansen–Karpov, Biel 1992', c: '8.Bg5 Be7 9.e3 O-O 10.Be2 Qb6 11.O-O Rd8 12.Rfd1 d6 13.Rab1 Nbd7 14.b4 cxb4 15.axb4 Rac8 16.Qa2 a6 leva à igualdade.' }],
  ['c17', 'u', 'u', '(u)', '8... d6 9 Rd1 Qb6 10 e3 Be7 11 Be2 O-O 12 O-O Nbd7 13 Rd2 Rfd8 14 Rfd1', { a: '⩲', r: 'Portisch–Gulko, Reykjavik 1991', c: '8...d6 9.Rd1 Qb6 10.e3 Be7 11.Be2 O-O 12.O-O Nbd7 13.Rd2 Rfd8 14.Rfd1 dá às brancas pressão no centro. A coluna é Bareev–Beliavsky, Linares 1993.' }],
  // Coluna 18
  ['c18', 'v', 'v', '(v)', '5... exd5 6 cxd5 g6 7 e4 Nxe4 8 Bd3 Nf6 9 O-O Bg7 10 Re1+ Kf8 11 d6 Bb7 12 Nc3', { a: '⩲', r: 'Benjamin–de Firmian, Campeonato dos EUA 1986', c: '5...exd5?! 6.cxd5 g6 7.e4! Nxe4 8.Bd3 Nf6 9.O-O Bg7 10.Re1+ Kf8 11.d6 Bb7 12.Nc3 dá às brancas excelente jogo pelo peão.' }],
  ['c18', 'w', 'w', '(w)', '6 Nc3 Bxc4 7 e4 Bxf1 8 Rxf1', { a: '=', r: 'Plaskett–M. Turner, Nottingham 1998', c: 'Os aventureiros podem tentar 6.Nc3!? Bxc4 7.e4 Bxf1 8.Rxf1, com iniciativa pelo peão.' }],
  ['c18', 'x', 'x', '(x)', '6... Qe7 7 Nc3 Bxc4 8 Bg5 exd5 9 e4 h6 10 Bxf6 Qxf6 11 exd5 Bxf1 12 Kxf1 d6 13 Re1+ Be7 14 Qa4+ Kf8 15 Qg4 Na6', { a: '±', r: 'Miles–Kudrin, Londres 1982', c: '6...Qe7?! 7.Nc3 Bxc4 8.Bg5 exd5 9.e4! h6 10.Bxf6 Qxf6 11.exd5 Bxf1 12.Kxf1 d6 13.Re1+ Be7 14.Qa4+ Kf8 15.Qg4 Na6 é melhor para as brancas. (O livro continua com "17 Qd7", pulando o 16º lance; a linha foi cortada.)' }],
  ['c18', 'y', 'y', '(y)', '7... Bb7 8 e4 Qe7 9 Bd3 Nxd5 10 O-O Nc7 11 Nc3 Qd8 12 Re1 Be7 13 e5 h6 14 Ne4', { a: '±', r: 'Short–Palmer, Kilkenny 1993', c: '7...Bb7 8.e4 Qe7 9.Bd3 Nxd5 10.O-O Nc7 11.Nc3 Qd8 12.Re1 Be7 13.e5 h6 14.Ne4 dá às brancas um ataque forte pelo peão.' }],
  ['c18', 'z', 'z', '(z)', '12 Re1 Nbd7 13 h3 b5 14 Bf4 Qb6 15 e4 Rac8 16 Be3 Bb7 17 Nd2', { a: '⩲', r: 'Chernin–Z. Almasi, Lillafüred 1999', c: '12.Re1 Nbd7 13.h3 b5 14.Bf4 Qb6 15.e4 Rac8 16.Be3 Bb7 17.Nd2 é um pouco melhor para as brancas.' }],
  ['c18-z', '1', 'z', '(z) 14.e4', '14 e4 Qc8 15 Bf4 b4', { a: '=', r: 'Gelfand–Kasparov, Novgorod 1997', c: '14.e4 Qc8 15.Bf4 b4 leva à igualdade.' }],
]

const capitulo = {
  id: 'india-dama-c',
  arquivo: 'india-dama-c',
  nome: 'Índia da Dama — Sistema Petrosian, 4º e 5º lances',
  fonte: 'Modern Chess Openings — Queen\'s Indian Defense (pp. 571–573), colunas 13–18',
  base: '1. d4 Nf6 2. c4 e6 3. Nf3 b6',
  corPadrao: 'b',
  ordem: 571,
  grupos: [
    { id: 'bb7', nome: '4...Bb7 5.Nc3', colunas: [13, 14] },
    { id: 'ba6', nome: '4...Ba6 5.Qc2', colunas: [15, 16, 17] },
    { id: 'c5', nome: '4...c5', colunas: [18] },
  ],
}

module.exports = { capitulo, colunas, notas }
