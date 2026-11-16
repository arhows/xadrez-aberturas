// Transcrição do MCO 15ª ed. — Jogos do Peão da Dama: Trompowsky, Veresov e Torre (pp. 508–510), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs peao-dama-a
// Formato: ver gambito-do-rei.cjs. Dicas em peao-dama-a-dicas.cjs.
//
// Só a coluna 5 traz avaliação no fim; nas outras usamos a avaliação da nota que continua a coluna.
// A nota (p) não tem avaliação; usamos ∞ (o livro fala em contrajogo das pretas).
// Correção: na nota (n) A, a sublinha 7.h3 Bg7 8.Bc4 Nc6 9.d5 Ne5 10.Nxe5 é impossível (nenhum cavalo branco
// alcança e5); a linha ficou cortada em 9...Ne5.
// Stockfish: discorda da sublinha (r) A 8.Re1 cxd4 (motor +1,3 com 9.Bxf6) e da nota (u) (motor −1,1 com 12...g4).
// - Na nota (e) A o livro traz 8 Nge2; o cavalo de c3 está cravado por ...Bb4, então o lance se escreve 8.Ne2.

const D = '1 d4 d5'
const N = '1 d4 Nf6'

const colunas = {
  c01: [`${D} 2 Bg5 c6 3 e3 Qb6 4 Qc1 h6 5 Bf4 Bf5 6 Nf3 Nf6 7 c4 Nbd7 8 Nc3 e6 9 c5 Qd8`, 'd5', '1...d5 2.Bg5 (Trompowsky)', '∞',
    'Contra 1...d5 o bispo vai logo a g5, antes de c4. Com 2...c6 e 3...Qb6 as pretas atacam b2, e as brancas defendem com 4.Qc1. Depois de 4...h6 5.Bf4 Bf5 6.Nf3 Nf6 7.c4 Nbd7 8.Nc3 e6 9.c5 Qd8 as brancas ganham espaço na ala da dama, e as pretas preparam ...e5 ou ...g5; há chances para os dois lados.'],
  c02: [`${D} 2 Nc3 Nf6 3 Bg5 Nbd7 4 Nf3 h6 5 Bh4 e6 6 e3 Be7 7 Bd3 c5 8 O-O a6 9 a4 b6`, 'd5', '2.Nc3 Nf6 3.Bg5 (Veresov)', '=',
    'No Ataque Veresov o cavalo vai a c3 antes de c4, e o bispo cravar o cavalo de f6. Com 3...Nbd7 as pretas evitam peões dobrados. Depois de 4.Nf3 h6 5.Bh4 e6 6.e3 Be7 7.Bd3 c5 8.O-O a6 9.a4 b6 o jogo é igual.'],
  c03: [`${D} 2 Nf3 Nf6 3 Bg5 Ne4 4 Bf4 c5 5 e3 Qb6 6 Qc1 Nc6 7 c3 Bf5 8 Nbd2 Rc8 9 Be2 e6`, 'd5', '2.Nf3 Nf6 3.Bg5', '=',
    'Com 2.Nf3 e 3.Bg5 as brancas jogam um Torre contra 1...d5. O cavalo pula para e4 e ataca o bispo. Depois de 4.Bf4 c5 5.e3 Qb6 6.Qc1 Nc6 7.c3 Bf5! 8.Nbd2 Rc8 9.Be2 e6 as pretas estão bem desenvolvidas e o jogo é igual.'],
  c04: [`${N} 2 Bg5 Ne4 3 Bh4 c5 4 f3 g5 5 fxe4 gxh4 6 e3 Bh6 7 Kf2 cxd4 8 exd4 Qb6 9 Nc3 e6`, 'nf6', '1...Nf6 2.Bg5 Ne4 (Trompowsky)', '∞',
    'No Ataque Trompowsky as brancas ameaçam trocar o cavalo de f6 e dobrar os peões das pretas. Com 2...Ne4 o cavalo foge e ataca o bispo. Depois de 3.Bh4 c5 4.f3 g5! 5.fxe4 gxh4 as brancas ficam com o centro e as pretas com o par de bispos; após 6.e3 Bh6 7.Kf2 cxd4 8.exd4 Qb6 9.Nc3 e6 a posição é desequilibrada.'],
  c05: [`${N} 2 Nf3 e6 3 Bg5 c5 4 e3 Be7 5 c3 b6 6 Bd3 cxd4 7 exd4 Ba6 8 Bxa6 Nxa6 9 Nbd2 O-O`, 'nf6', '2.Nf3 e6 3.Bg5 c5 (Torre)', '=',
    'No Ataque Torre as brancas jogam Nf3 e Bg5 sem c4, com uma estrutura sólida de peões em c3, d4 e e3. Contra 3...c5 o simples 4.e3 mantém tudo protegido. Depois de 4...Be7 5.c3 b6 6.Bd3 cxd4 7.exd4 Ba6 as pretas trocam o bom bispo branco; após 8.Bxa6 Nxa6 9.Nbd2 O-O o jogo é igual (Kamsky–Hübner, Dortmund 1992).'],
  c06: [`${N} 2 Nf3 e6 3 Bg5 h6 4 Bxf6 Qxf6 5 e4 d6 6 Nc3 Nd7 7 Qd2 a6 8 O-O-O Qd8 9 h4 b5`, 'nf6', '3...h6', '=',
    'Com 3...h6 as pretas perguntam logo ao bispo. Depois de 4.Bxf6 Qxf6 as brancas ganham tempo e montam o centro com 5.e4. Após 5...d6 6.Nc3 Nd7 7.Qd2 a6 8.O-O-O Qd8 9.h4 b5 os reis ficam em lados opostos, mas as pretas têm o par de bispos e a posição fechada lhes dá tempo; as chances são iguais.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a-A', 'a', '(a) A', '2... Nf6 3 Bxf6 gxf6 4 c4 dxc4 5 e3 c5 6 Bxc4 cxd4 7 exd4 Bg7 8 Qh5 O-O 9 Nf3 Nc6', { a: '=', r: 'Stefanova–Kovalevskaya, Sochi 2005', c: '2...Nf6 3.Bxf6 gxf6 também é razoável. Depois de 4.c4 dxc4 5.e3 c5 6.Bxc4 cxd4 7.exd4 Bg7! 8.Qh5 O-O 9.Nf3 Nc6 o jogo é igual.' }],
  ['c01-a-A', '1', 'a', '(a) A 3...exf6', '3... exf6 4 e3 Bd6 5 c4', { a: '⩲', c: '3...exf6 4.e3 Bd6 5.c4 dá às brancas uma pequena vantagem.' }],
  ['c01-a-A', '2', 'a', '(a) A 4.e3', '4 e3 c5 5 c4 cxd4 6 exd4 Nc6', { a: '=', c: '4.e3 c5 5.c4 cxd4 6.exd4 Nc6 é igual.' }],
  ['c01', 'a-B', 'a', '(a) B', '2... h6 3 Bh4 c6 4 Nf3 Qb6 5 b3 Bf5 6 e3 e6', { a: '=', r: 'Dishman–Rublevsky, Halkidiki 2002', c: '2...h6 3.Bh4 c6 4.Nf3 Qb6 5.b3 Bf5 6.e3 e6 é outro bom plano para igualar.' }],
  ['c01', 'b', 'b', '(b)', '3 Nf3 Bg4 4 Nbd2 Nd7 5 e3 Ngf6 6 h3 Bxf3 7 Nxf3 e6 8 Bd3 Be7 9 O-O Nh5 10 Bxe7 Qxe7', { a: '=', r: 'Ye–Serper, Jacarta 1994', c: '3.Nf3 Bg4 4.Nbd2 Nd7 5.e3 Ngf6 6.h3 Bxf3 7.Nxf3 e6 8.Bd3 Be7 9.O-O Nh5 10.Bxe7 Qxe7 é igual.' }],
  ['c01', 'c', 'c', '(c)', '5 Bh4 e5 6 c3 Nd7 7 Nf3 Bd6 8 Be2 Ne7 9 Bxe7 Kxe7 10 c4 e4 11 Nfd2 Bb8', { a: '=', r: 'Chernin–Kramnik, Nova York (rápidas) 1995', c: '5.Bh4 e5! 6.c3 Nd7 7.Nf3 Bd6 8.Be2 Ne7 9.Bxe7 Kxe7 10.c4 e4 11.Nfd2 Bb8 é igual.' }],
  ['c01-c', '1', 'c', '(c) 6.dxe5?', '6 dxe5 Qb4+', { c: '6.dxe5? perde o bispo: 6...Qb4+ e depois ...Qxh4.' }],
  ['c01', 'd', 'd', '(d)', '10 b4 g5 11 Bg3 Nh5 12 Be5 f6 13 Bg3 Nxg3 14 hxg3 Bg7 15 Nd2 e5', { a: '∞', r: 'Miles–Grétarsson, Wijk aan Zee 1996', c: '10.b4 g5 11.Bg3 Nh5 12.Be5 f6 13.Bg3 Nxg3 14.hxg3 Bg7 15.Nd2 e5 dá chances para os dois lados.' }],
  // Coluna 2
  ['c02', 'e-A', 'e', '(e) A', '3... Bf5 4 Bxf6 exf6 5 e3 c6 6 Bd3 Bxd3 7 Qxd3 Bb4 8 Ne2 O-O 9 O-O Nd7 10 e4 Nb6 11 Ng3 g6', { a: '=', r: 'Rozsa–Boros, Keszthely 1994', c: '3...Bf5 4.Bxf6 exf6 5.e3 c6 6.Bd3 Bxd3 7.Qxd3 Bb4 8.Ne2 O-O 9.O-O Nd7 10.e4 Nb6 11.Ng3 g6 é igual.' }],
  ['c02-e-A', '1', 'e', '(e) A 4.f3', '4 f3 Nbd7 5 Nxd5 Nxd5 6 e4 h6 7 Bh4 c6', { a: '=', c: '4.f3 Nbd7 5.Nxd5 Nxd5 6.e4 h6 7.Bh4 c6 é igual: as pretas devolvem a peça e ficam bem.' }],
  ['c02', 'e-B', 'e', '(e) B', '3... c5 4 Bxf6 gxf6 5 e4 dxe4 6 dxc5 Qa5 7 Qh5 Bg7', { a: '∞', r: 'Hoi–Berg, Dinamarca 1991', c: '3...c5 4.Bxf6 gxf6 5.e4 dxe4 6.dxc5 Qa5 7.Qh5 Bg7 leva a um jogo pouco claro.' }],
  ['c02', 'f', 'f', '(f)', '4 f3 c6 5 e4 dxe4 6 fxe4 e5 7 dxe5 Qa5 8 Bxf6 gxf6 9 exf6 Nxf6 10 Qd4 Bg7', { a: '∞', r: 'Walton–Crouch, Banwell Masters 2003', c: '4.f3 c6 5.e4 dxe4 6.fxe4 e5! 7.dxe5 Qa5 8.Bxf6 gxf6 9.exf6 Nxf6 10.Qd4 Bg7 dá às pretas compensação pelo peão.' }],
  ['c02-f', '1', 'f', '(f) 4...c5', '4... c5 5 dxc5 Qa5 6 Bxf6 Nxf6 7 Qd4', { a: '±', c: '4...c5 5.dxc5 Qa5 6.Bxf6 Nxf6 7.Qd4 é melhor para as brancas.' }],
  ['c02', 'g', 'g', '(g)', '4... g6 5 e3 Bg7 6 Bd3 O-O 7 O-O c5 8 Re1 b6 9 e4 dxe4 10 Nxe4 Bb7 11 Nxf6+ exf6 12 Bh4 Bxf3 13 Qxf3 cxd4', { a: '∞', r: 'Speelman–Miles, Londres 1982', c: 'Uma alternativa complicada é 4...g6 5.e3 Bg7 6.Bd3 O-O 7.O-O c5 8.Re1 b6 9.e4 dxe4 10.Nxe4 Bb7 11.Nxf6+ exf6 12.Bh4 Bxf3 13.Qxf3 cxd4, com chances para os dois lados.' }],
  ['c02', 'h', 'h', '(h)', '6 e4 g5 7 Bg3 Nxe4 8 Nxe4 dxe4 9 Ne5 Bg7 10 h4 Nxe5 11 Bxe5 Bxe5 12 dxe5 Bd7', { a: '∓', r: 'Reynolds–Nunn, Londres 1987', c: '6.e4?! g5 7.Bg3 Nxe4 8.Nxe4 dxe4 9.Ne5 Bg7 10.h4 Nxe5 11.Bxe5 Bxe5 12.dxe5 Bd7 é melhor para as pretas.' }],
  ['c02', 'i', 'i', '(i)', '10 Ne5 Nxe5 11 dxe5 Nd7 12 Bxe7 Qxe7 13 f4 Bb7', { a: '=', r: 'Hector–Larsen, Campeonato Nórdico 1992', c: '10.Ne5 Nxe5 11.dxe5 Nd7 12.Bxe7 Qxe7 13.f4 Bb7 é igual.' }],
  // Coluna 3
  ['c03', 'j-A', 'j', '(j) A', '3... e6 4 e3 c5 5 c3', { a: '=', c: '3...e6 4.e3 c5 5.c3 leva à estrutura da coluna 5 (o livro diz que transpõe para ela).' }],
  ['c03-j-A', '1', 'j', '(j) A 4...Be7', '4... Be7 5 c4', { c: '4...Be7 5.c4 transpõe para o Gambito da Dama Recusado.' }],
  ['c03', 'j-B', 'j', '(j) B', '3... g6 4 Bxf6 exf6 5 e3 Bg7 6 c4 dxc4 7 Bxc4 O-O', { a: '⩲', r: 'Stefanova–Paciencia, Surabaya 2002', c: '3...g6 4.Bxf6 exf6 5.e3 Bg7 6.c4 dxc4 7.Bxc4 O-O é só um pouco melhor para as brancas.' }],
  ['c03', 'k', 'k', '(k)', '4 Bh4 c5 5 dxc5 Nc6 6 e3 Qa5+ 7 Nbd2 e6 8 a3 Nxd2 9 Nxd2 Qxc5', { a: '=', r: 'Shirazi–Gulko, Los Angeles 1987', c: '4.Bh4 c5 5.dxc5 Nc6 6.e3 Qa5+ 7.Nbd2 e6 8.a3 Nxd2 9.Nxd2 Qxc5 é igual.' }],
  ['c03', 'l', 'l', '(l)', '6 Nbd2 Nxd2 7 Nxd2 cxd4 8 exd4 Qxd4 9 Bxb8 Rxb8 10 Bb5+ Kd8 11 O-O e6', { a: '∓', r: 'Shtern–Kaidanov, Dallas 1996', c: 'Depois de 6.Nbd2 Nxd2 7.Nxd2 cxd4 8.exd4 Qxd4 9.Bxb8 Rxb8 10.Bb5+ Kd8 11.O-O e6 as brancas não têm compensação suficiente pelo peão.' }],
  ['c03', 'm', 'm', '(m)', '10 O-O Be7 11 Nxe4 Bxe4', { a: '=', r: 'Vera–Santos, São Paulo 2004', c: '10.O-O Be7 11.Nxe4 Bxe4 é igual.' }],
  // Coluna 4
  ['c04', 'n-A', 'n', '(n) A', '2... e6 3 e4 h6 4 Bxf6 Qxf6 5 Nc3 d6 6 Qd2 g5 7 Bc4 Nc6 8 Nge2 Bg7 9 Rd1 Bd7 10 O-O O-O-O 11 Nb5 a6 12 Na3 g4 13 f4 gxf3 14 Rxf3 Qe7 15 Rdf1 Rdf8', { a: '∞', r: 'Anand–Karpov, Campeonato Mundial 1997/98', c: '2...e6 3.e4 h6 4.Bxf6 Qxf6 5.Nc3 d6 6.Qd2 g5 7.Bc4 Nc6 8.Nge2 Bg7 9.Rd1 Bd7 10.O-O O-O-O 11.Nb5 a6 12.Na3 g4 13.f4 gxf3 14.Rxf3 Qe7 15.Rdf1 Rdf8 leva a um jogo pouco claro.' }],
  ['c04-n-A', '1', 'n', '(n) A 3.Nf3', '3 Nf3', { c: '3.Nf3 transpõe para a coluna 5.' }],
  ['c04-n-A', '2', 'n', '(n) A 5...Bb4', '5... Bb4 6 Qd2 Nc6 7 Nf3 e5', { a: '=', r: 'Benjamin–de Firmian, Nova York 1995', c: '5...Bb4 6.Qd2 Nc6 7.Nf3 e5 é igual.' }],
  ['c04-n-A', '3', 'n', '(n) A 7.h3', '7 h3 Bg7 8 Bc4 Nc6 9 d5 Ne5', { a: '±', r: 'Speelman–Karpov, Roquebrune 1992', c: '7.h3 Bg7 8.Bc4 Nc6 9.d5 Ne5 é melhor para as brancas. (O livro segue com 10.Nxe5, impossível: nenhum cavalo branco alcança e5; a linha foi cortada aqui.)' }],
  ['c04-n-A', '4', 'n', '(n) A 12...Qg6', '12... Qg6', { c: '12...Qg6!? merece atenção.' }],
  ['c04', 'n-B', 'n', '(n) B', '2... c5 3 Bxf6 gxf6 4 d5 Qb6 5 Qc1 Bg7 6 e3 f5 7 c3 e6 8 Bc4 Na6 9 Ne2 Nc7', { a: '=', r: 'Tamarkin–Salman, Mineola 2006', c: '2...c5 3.Bxf6 gxf6 4.d5 Qb6 5.Qc1 Bg7 6.e3 f5 7.c3 e6 8.Bc4 Na6 9.Ne2 Nc7 é igual.' }],
  ['c04', 'n-C', 'n', '(n) C', '2... g6 3 Bxf6 exf6 4 e3 f5 5 g3 Bg7 6 Ne2 d6 7 Bg2 O-O 8 c4', { a: '⩲', r: 'I. Sokolov–Spassov, Burgas 1992', c: '2...g6 3.Bxf6 exf6 4.e3 f5 5.g3 Bg7 6.Ne2 d6 7.Bg2 O-O 8.c4 é um pouco melhor para as brancas.' }],
  ['c04', 'o', 'o', '(o)', '3 Bf4 d5 4 f3 Nf6 5 Nc3 e6 6 e4 Bb4 7 e5 Nfd7 8 a3 Be7 9 Be3 c5 10 f4 cxd4 11 Qxd4 Nc6', { a: '=', r: 'Adams–Smirin, Nova York 1994', c: '3.Bf4 d5 4.f3 Nf6 5.Nc3 e6 6.e4 Bb4 7.e5 Nfd7 8.a3 Be7 9.Be3 c5 10.f4 cxd4 11.Qxd4 Nc6 dá chances mais ou menos iguais.' }],
  ['c04', 'p', 'p', '(p)', '10 Nf3 Nc6 11 Bb5 O-O 12 Re1 Bg7 13 Bxc6 bxc6 14 Na4 Qa5 15 c3 d6 16 b4 Qb5 17 e5 c5 18 dxc5 Bd7 19 Nb2 dxc5 20 a4 Qb7 21 b5', { a: '∞', r: 'Dumitrescu–So. Polgár, República Tcheca 1995', c: '10.Nf3 Nc6 11.Bb5 O-O 12.Re1 Bg7 13.Bxc6 bxc6 14.Na4 Qa5 15.c3 d6 16.b4 Qb5 17.e5 c5 18.dxc5 Bd7 19.Nb2 dxc5 20.a4 Qb7 21.b5; agora 21...f6, abrindo a posição para os bispos, dá contrajogo às pretas.' }],
  // Coluna 5
  ['c05', 'q', 'q', '(q)', '3... d5 4 c4', { c: '3...d5 4.c4 é o Gambito da Dama Recusado.' }],
  ['c05-q', '1', 'q', '(q) 4.e3', '4 e3 Be7 5 Bd3 c5 6 c3', { a: '=', c: 'As brancas também podem escolher 4.e3 Be7 5.Bd3 c5 6.c3, voltando à estrutura da coluna.' }],
  ['c05', 'r-A', 'r', '(r) A', '4... Qb6 5 Nbd2 Qxb2 6 Bd3 Qc3 7 O-O d5 8 Bxf6 gxf6 9 dxc5 Bg7 10 Rb1 Qxc5 11 e4 dxe4 12 Nxe4 Qc7 13 Bb5+ Kf8', { a: '∞', r: 'Benjamin–Yudasin, Nova York 1990', c: 'A principal alternativa é o agudo 4...Qb6. Depois de 5.Nbd2 Qxb2 6.Bd3 Qc3 7.O-O d5 8.Bxf6 gxf6 9.dxc5 as brancas têm compensação pelo peão; por exemplo, 9...Bg7 10.Rb1 Qxc5 11.e4 dxe4 12.Nxe4 Qc7 13.Bb5+ Kf8 é pouco claro.' }],
  ['c05-r-A', '1', 'r', '(r) A 5.Qc1', '5 Qc1 Nc6 6 c3 d5', { a: '=', c: '5.Qc1 Nc6 6.c3 d5 é igual.' }],
  ['c05-r-A', '2', 'r', '(r) A 6...Nc6', '6... Nc6 7 O-O d5 8 Bxf6 gxf6 9 c4', { a: '∞', c: '6...Nc6 7.O-O d5 8.Bxf6 gxf6 9.c4 dá às brancas boa compensação.' }],
  ['c05-r-A', '3', 'r', '(r) A 8.Re1', '8 Re1 cxd4', { a: '∓', c: '8.Re1 cxd4! é melhor para as pretas. (O Stockfish discorda: depois de 9.Bxf6 as brancas ficam melhor, cerca de +1,3.)' }],
  ['c05', 'r-B', 'r', '(r) B', '4... b6 5 d5 exd5 6 Nc3 Bb7 7 Nxd5 Bxd5 8 Bxf6 Qxf6 9 Qxd5 Nc6 10 Bc4 Be7 11 O-O-O', { a: '±', r: 'Petrosian–Kozma, Munique 1958', c: '4...b6?! 5.d5! exd5 6.Nc3 Bb7 7.Nxd5 Bxd5 8.Bxf6 Qxf6 9.Qxd5 Nc6 10.Bc4 Be7 11.O-O-O é melhor para as brancas.' }],
  ['c05', 'r-C', 'r', '(r) C', '4... d5 5 c3 Nc6 6 Nbd2 Be7 7 Bd3 b6 8 O-O Bb7 9 Qe2 O-O 10 Ne5', { a: '⩲', c: '4...d5 5.c3 Nc6 6.Nbd2 Be7 7.Bd3 b6 8.O-O Bb7 9.Qe2 O-O 10.Ne5 é um pouco mais confortável para as brancas.' }],
  ['c05', 's', 's', '(s)', '5 dxc5 Bxc5 6 c4 Bb4+ 7 Nbd2 b6 8 Bd3 Nc6 9 O-O Be7 10 Rc1 Bb7 11 Qe2 O-O 12 Rfd1 Qc7 13 Bf4 d6 14 h3 Rac8', { a: '=', r: 'Yusupov–Karpov, match 1989', c: '5.dxc5 Bxc5 6.c4 Bb4+! (que põe o cavalo da dama numa casa passiva) 7.Nbd2 b6 8.Bd3 Nc6 9.O-O Be7 10.Rc1 Bb7 11.Qe2 O-O 12.Rfd1 Qc7 13.Bf4 d6 14.h3 Rac8 é igual.' }],
  // Coluna 6
  ['c06', 't', 't', '(t)', '4 Bh4 c5 5 e3 cxd4 6 exd4 Be7 7 Bd3 O-O 8 c3 b6 9 Qe2 Bb7 10 Nbd2 Nc6', { a: '=', r: 'I. Sokolov–Karpov, Linares 1995', c: '4.Bh4 c5 5.e3 cxd4 6.exd4 Be7 7.Bd3 O-O 8.c3 b6 9.Qe2 Bb7 10.Nbd2 Nc6 é igual, porque 11.O-O Nd5 troca peças.' }],
  ['c06-t', '1', 't', '(t) 8.c4', '8 c4 b6 9 Nc3 Bb7 10 O-O d5', { a: '=', c: '8.c4 b6 9.Nc3 Bb7 10.O-O d5 é igual.' }],
  ['c06', 'u', 'u', '(u)', '6... g5 7 e5 Qe7 8 Bb5+ Bd7 9 O-O d5 10 Bd3 Nc6 11 Nb5 O-O-O 12 c3', { a: '±', r: 'Timman–Karpov, Campeonato Mundial 1993', c: '6...g5 avança rápido demais: 7.e5 Qe7 8.Bb5+ Bd7 9.O-O d5 10.Bd3 Nc6 11.Nb5 O-O-O 12.c3 é melhor para as brancas. (O Stockfish discorda: aqui 12...g4 deixa as pretas melhor, cerca de −1,1.)' }],
  ['c06', 'v', 'v', '(v)', '10 Rh3 Bb7 11 Qf4 b4 12 Ne2 c5', { a: '=', r: 'Crouch–Adams, Inglaterra 1996', c: '10.Rh3 Bb7 11.Qf4 b4 12.Ne2 c5 dá chances iguais. Nesta linha as pretas podem se desenvolver devagar porque a posição não está aberta.' }],
]

const capitulo = {
  id: 'peao-dama-a',
  arquivo: 'peao-dama-a',
  nome: 'Peão da Dama — Trompowsky, Veresov e Torre',
  fonte: 'Modern Chess Openings — Queen’s Pawn Games (pp. 508–510), colunas 1–6',
  base: '1. d4',
  corPadrao: 'w',
  ordem: 506,
  grupos: [
    { id: 'd5', nome: '1...d5', colunas: [1, 2, 3] },
    { id: 'nf6', nome: '1...Nf6', colunas: [4, 5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
