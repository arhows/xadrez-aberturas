// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Taimanov, 6.Be2 (pp. 306–307), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs siciliana-taimanov-b
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-taimanov-b-dicas.cjs.
//
// Só a coluna 11 traz avaliação no fim; nas outras a avaliação vem da nota que continua a coluna.
// Coluna 8: o livro escreve "12 Rc1 Rd8 13 g3 Rd8"; o lance repetido é impossível.
// Usei 12...Rb8 13 g3 Rd8, o mesmo arranjo de torres de Kamsky–Karpov na nota (j).
// Nota (f): depois de 14...Qb8 a casa b8 está ocupada, então "16...Rb8" é impossível; a nota para em 16 c5.
// Nota (o): "9...bxc6" é impossível (o peão já está em b5); usei 9...dxc6, que permite o 12...cxd5 do livro.

const B = '1 e4 c5 2 Nf3 e6 3 d4 cxd4 4 Nxd4 Nc6 5 Nc3 a6 6 Be2'

const colunas = {
  c07: [`${B} Qc7 7 O-O Nf6 8 Be3 Bb4 9 Na4 O-O 10 Nxc6 bxc6 11 Nb6 Rb8 12 Nxc8 Rfxc8 13 Bxa6 Rf8`, 'roque', '7.O-O Nf6 8.Be3 Bb4 9.Na4 O-O', '±',
    'Com 6.Be2 as brancas jogam de forma mais aguda que com 6.g3. Uma marca da Taimanov é ...Bb4, que leva as brancas a sacrificar um peão para controlar casas centrais e da ala da dama. Na coluna as brancas ganham o peão a6 e ficam melhor.'],
  c08: [`${B} Qc7 7 O-O Nf6 8 Be3 Bb4 9 Na4 Be7 10 c4 Nxe4 11 c5 O-O 12 Rc1 Rb8 13 g3 Rd8`, 'roque', '9...Be7 10.c4', '⩲',
    'Com 9...Be7 as pretas recuam o bispo. As brancas sacrificam o peão e4 com 10.c4 Nxe4 11.c5 e recebem pressão nas casas escuras e na ala da dama, com uma pequena vantagem.'],
  c09: [`${B} Qc7 7 O-O Nf6 8 Kh1 Bb4 9 Qd3 O-O 10 Bg5 Bxc3 11 bxc3 Ne5 12 Qe3 Neg4 13 Qh3 Nxf2+`, 'roque', '8.Kh1 Bb4', '=',
    'Com 8.Kh1 as brancas tiram o rei da diagonal antes de f4. Depois de 8...Bb4 9.Qd3 e 10.Bg5 as pretas trocam em c3 e contra-atacam em g4 e f2; as chances de ataque das brancas compensam a pior estrutura de peões.'],
  c10: [`${B} Qc7 7 O-O Nf6 8 Kh1 Nxd4 9 Qxd4 Bc5 10 Qd3 b5 11 f4 Bb7 12 Bf3 h5 13 e5 Ng4`, 'roque', '8...Nxd4', '=',
    'Com 8...Nxd4 9.Qxd4 Bc5 as pretas ganham tempo na dama e se desenvolvem com ...b5 e ...Bb7. O jogo fica igual.'],
  c11: [`${B} Qc7 7 f4 Nxd4 8 Qxd4 b5 9 Be3 Bb7 10 O-O Rc8 11 Rad1 Nf6 12 Bf3 h5 13 Kh1 Be7`, 'outros', '7.f4', '=',
    'Com 7.f4 as brancas ganham espaço logo. As pretas trocam em d4, se desenvolvem com ...b5, ...Bb7 e ...Rc8 e igualam.'],
  c12: [`${B} Nge7 7 Bf4 Ng6 8 Nxc6 bxc6 9 Bd6 Bxd6 10 Qxd6 Qe7 11 O-O-O Qxd6 12 Rxd6 Ke7 13 Rhd1 f6`, 'outros', '6...Nge7', '⩲',
    'Com 6...Nge7 as pretas querem levar o cavalo para g6. Depois de 7.Bf4 Ng6 8.Nxc6! bxc6 9.Bd6 as damas se trocam, e as brancas ficam com um final melhor.'],
}

const notas = [
  // Coluna 7
  ['c07', 'a', 'a', '(a)', '7... b5 8 Nxc6 dxc6 9 a4 b4 10 Nb1 Nf6 11 Nd2 Bc5 12 Bd3 e5 13 Nb3 Ba7 14 h3 a5 15 Qe2 O-O 16 Be3', { a: '±', r: 'Hiberia–Firman, AIG (rápidas) 2006', c: 'Com 7...b5 8.Nxc6 dxc6 9.a4 as brancas ficam melhor.' }],
  ['c07-a', '1', 'a', '(a) 8...Qxc6', '8... Qxc6 9 Bf3 Bb7 10 Re1', { a: '±', c: '8...Qxc6 9.Bf3 Bb7 10.Re1 também deixa as brancas melhor.' }],
  ['c07', 'b', 'b', '(b)', '8... d6', { c: '8...d6, agora ou antes, transpõe para a Scheveningen.' }],
  ['c07', 'c', 'c', '(c)', '9 f3 O-O 10 Na4 d5 11 Nxc6 bxc6 12 Nb6 Rb8 13 Nxc8 Rfxc8 14 Bxa6 Rd8', { a: '∓', r: 'Peterwitz–Christ, Alemanha 1992', c: '9.f3 O-O 10.Na4 d5 deixa as pretas tomarem a iniciativa.' }],
  ['c07', 'd', 'd', '(d)', '10 c4 Bd6 11 g3 Nxe4 12 c5 Be7 13 Rc1 Rd8 14 Bf3 Nf6 15 Re1', { a: '±', r: 'Fressinet–Bauer, Belfort 2003', c: 'Talvez seja melhor 10.c4 logo, com o mesmo sacrifício de peão.' }],
  ['c07', 'e', 'e', '(e)', '10... dxc6 11 c4 Bd6 12 f4 Nxe4 13 Qc2 f5 14 c5 Be7 15 Nb6 Rb8 16 Bd3 Nf6 17 Bd4', { r: 'Tal–Suetin, Sochi 1973', c: '10...dxc6 11.c4 Bd6 12.f4! Nxe4 dá às brancas excelente jogo pelo peão.' }],
  ['c07', 'f', 'f', '(f)', '11 c4 Bd6 12 f4 Nxe4 13 Bd3 Nf6 14 Bb6 Qb8 15 Bd4 Be7 16 c5', { a: '=', r: 'Thipsay–Al Modiahki, Calcutá 1996', c: 'Com 11.c4 Bd6 12.f4 Nxe4 as pretas se defendem e igualam; a partida seguiu com ...d6! depois de Nb6.' }],
  ['c07', 'g', 'g', '(g)', '14 Bd3 Bd6 15 g3 Be5 16 a4 Bxb2 17 Ra2 d5 18 exd5 Nxd5 19 Bd2', { a: '±', r: 'Nisipeanu–De la Riva, Liga Espanhola 2006', c: 'Com 14.Bd3 e o peão a passado as brancas ficam melhor.' }],
  // Coluna 8
  ['c08', 'h-A', 'h', '(h) A', '9... Bd6 10 g3 Be7 11 c4 d6 12 f3 Bd7 13 Rc1 O-O 14 Nxc6 Bxc6 15 Nb6 Rad8 16 b4', { a: '±', r: 'Kasparov–J. Polgár, Linares 1997', c: 'As alternativas deixam as pretas em apuros: 9...Bd6 10.g3 Be7 11.c4! d6 e as brancas ficam melhor.' }],
  ['c08-h-A', '1', 'h', '(h) A 10...b5', '10... b5 11 Nb6', { a: '±', c: '10...b5 11.Nb6! também é bom para as brancas.' }],
  ['c08', 'h-B', 'h', '(h) B', '9... Ne7 10 c4 Nxe4 11 Qc2 Nf6 12 c5', { a: '±', c: '9...Ne7 10.c4 Nxe4 11.Qc2 Nf6 12.c5 deixa as brancas melhor.' }],
  ['c08', 'i', 'i', '(i)', '10 Nxc6 bxc6 11 Bd3 c5 12 c4 Bb7 13 Nc3 O-O 14 f4 d6 15 Qf3 Rad8 16 Qh3 Rfe8 17 Rae1 Nd7 18 Rf3 Nf8 19 f5 Bf6', { a: '=', r: 'Shirov–Anand, Wijk aan Zee 1999', c: 'Com 10.Nxc6 bxc6 11.Bd3 c5 o jogo fica igual.' }],
  ['c08-i', '1', 'i', '(i) 11.Nb6', '11 Nb6 Rb8 12 Nxc8 Qxc8 13 e5 Nd5 14 Bc1 Bc5 15 Qd3 O-O 16 Qg3 Re8 17 Rd1 a5', { a: '=', r: 'Salov–Karpov, Buenos Aires 1994', c: '11.Nb6 Rb8 12.Nxc8 Qxc8 13.e5 Nd5 também é igual.' }],
  ['c08', 'j', 'j', '(j)', '11... Nf6 12 Bf3 O-O 13 Rc1 Rb8 14 g3 g6 15 Nb6 Rd8 16 Qa4', { a: '±', r: 'Kamsky–Karpov, Buenos Aires 1994', c: '11...Nf6 12.Bf3 O-O 13.Rc1 deixa as brancas melhor.' }],
  ['c08', 'k', 'k', '(k)', '14 Bf3 Nf6 15 Re1 d6 16 cxd6 Bxd6 17 Bxc6', { a: '±', r: 'J. Polgár–De la Riva, Andorra 2000', c: 'As brancas ficam um pouco melhor. A partida seguiu 14.Bf3 Nf6 15.Re1 d6?! 16.cxd6 Bxd6, e agora 17.Bxc6 dá grande vantagem.' }],
  // Coluna 9
  ['c09', 'l-A', 'l', '(l) A', '9 Nxc6 bxc6 10 f4 d5 11 e5 Bxc3 12 bxc3 Ne4 13 Bf3 c5 14 c4 Bb7 15 cxd5', { a: '±', r: 'Martorelli–Mrdja, Itália 2005', c: 'O mais agudo é 9.Nxc6 bxc6 10.f4!? d5 11.e5, com vantagem branca.' }],
  ['c09', 'l-B', 'l', '(l) B', '9 Bg5 Bxc3 10 Bxf6 gxf6 11 bxc3 Ne7 12 Qd2 h5 13 Qe3 b6', { a: '=', r: 'Volokitin–Neverov, Campeonato Ucraniano 2001', c: '9.Bg5 Bxc3 10.Bxf6 gxf6 leva a um jogo igual.' }],
  ['c09', 'm', 'm', '(m)', '11... Qe5 12 f4 Qxe4 13 Qg3 Qg6 14 Bd3 Nh5 15 Qe1 f5 16 g4 Nf6', { a: '=', r: 'Steflitsch–Teske, Grécia 2002', c: '11...Qe5 12.f4 Qxe4 também é igual.' }],
  ['c09', 'n', 'n', '(n)', '14 Rxf2 Nxe4 15 Bh4 Nxf2+ 16 Bxf2 d5 17 Bd3 h6', { a: '=', r: 'Oll–van der Werf, Holanda 1996', c: 'Depois de 14.Rxf2 Nxe4 as chances de ataque das brancas compensam a melhor estrutura de peões das pretas.' }],
  // Coluna 10
  ['c10', 'o', 'o', '(o)', '8... b5 9 Nxc6 dxc6 10 f4 Be7 11 e5 Nd5 12 Nxd5 cxd5 13 Be3', { a: '±', r: 'Savanović–Andrijević 2005', c: 'Com 8...b5 9.Nxc6 bxc6 10.f4 as brancas ficam melhor.' }],
  ['c10', 'p', 'p', '(p)', '10... h5 11 Bg5 Ng4 12 f4 f6 13 Bh4 b5 14 e5 f5 15 Nd5 exd5 16 Qxf5 Qc6 17 e6 dxe6 18 Qg6+ Kf8 19 f5 Rh6', { a: '=', r: 'Gallagher–Kobalia, Biel 1997', c: 'Também é razoável 10...h5; a partida terminou empatada por xeque perpétuo.' }],
  ['c10', 'q', 'q', '(q)', '12... O-O 13 e5 Ne8 14 Bxb7 Qxb7 15 f5 f6 16 Bf4 b4', { a: '=', r: 'Lin Yi–Liang Jinrong, Liga Chinesa 2001', c: '12...O-O 13.e5 Ne8 também é igual.' }],
  ['c10', 'r', 'r', '(r)', '14 Bxb7 Qxb7 15 Ne4 Rc8 16 Bd2 Be7 17 Bc3 Nh6', { a: '=', r: 'Nijboer–Kristiansson, Copa Europeia de Clubes 2006', c: 'Com 14.Bxb7 Qxb7 15.Ne4 o jogo fica igual.' }],
  // Coluna 11
  ['c11', 's', 's', '(s)', '7... b5 8 Nxc6 Qxc6 9 Bf3 Bb7 10 e5 Qc7 11 Ne4 Rc8 12 O-O Nh6 13 Be3 Nf5 14 Bf2 d5 15 exd6 Bxd6 16 Nxd6+ Nxd6 17 Bxb7 Nxb7 18 a4 O-O 19 axb5 axb5 20 c3', { a: '±', r: 'Kudrin–Matulović, Belgrado 1988', c: 'Com 7...b5 8.Nxc6 Qxc6 9.Bf3 as brancas ficam melhor.' }],
  ['c11-s', '1', 's', '(s) 12...Qxc2', '12... Qxc2 13 Qxc2 Rxc2 14 Nd6+ Bxd6 15 Bxb7', { a: '±', c: '12...Qxc2 13.Qxc2 Rxc2 14.Nd6+ Bxd6 15.Bxb7 deixa as brancas melhor.' }],
  ['c11', 't', 't', '(t)', '10 O-O-O Rc8 11 Rd2 Nf6 12 Bf3 Be7 13 Rhd1 O-O 14 e5 b4', { a: '=', r: 'Hector–P. Cramling, Valby 1991', c: 'Um jogo mais agressivo com 10.O-O-O também não dá vantagem.' }],
  // Coluna 12
  ['c12', 'u-A', 'u', '(u) A', '7 O-O Nxd4 8 Qxd4 Nc6 9 Qd3 Qc7 10 Bg5 Bd6 11 Kh1 f6 12 Be3 b5 13 f4 Be7 14 e5 O-O 15 exf6 Rxf6 16 f5 Bb7 17 Bg5 Rff8', { a: '=', r: 'Nijboer–van Mil, Eindhoven 1993', c: 'Com 7.O-O Nxd4 8.Qxd4 Nc6 as pretas ficam perto da igualdade.' }],
  ['c12', 'u-B', 'u', '(u) B', '7 Be3 Nxd4 8 Qxd4 b5 9 O-O Nc6 10 Qd2 Be7 11 Rad1 O-O 12 Bf4 f6', { a: '=', r: 'Hjartarson–Taimanov, Leningrado 1984', c: '7.Be3 Nxd4 8.Qxd4 b5! também é igual.' }],
  ['c12', 'v', 'v', '(v)', '9... Qb6 10 O-O c5 11 Bxf8 Rxf8 12 Qd2', { a: '⩲', r: 'Beliavsky–Taimanov, Leningrado 1977', c: 'Com 9...Qb6 as brancas ficam um pouco melhor, mas pelo menos a posição preta é sólida.' }],
  ['c12', 'w-A', 'w', '(w) A', '13... Nf4 14 Bf3', { c: 'Se 13...Nf4, então 14.Bf3!.' }],
  ['c12', 'w-B', 'w', '(w) B', '14 Na4 Ne5 15 Nc5', { a: '⩲', r: 'Djukić–Damjanović, Belgrado 2002', c: 'Depois de 13...f6 14.Na4 Ne5 15.Nc5 as brancas ficam com um final melhor.' }],
]

const capitulo = {
  id: 'siciliana-taimanov-b',
  arquivo: 'siciliana-taimanov-b',
  nome: 'Siciliana Taimanov — 6.Be2',
  fonte: 'Modern Chess Openings — Sicilian Defense, Taimanov Variation, 6 Be2 (pp. 306–307), colunas 7–12',
  base: '1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6 5. Nc3 a6 6. Be2',
  corPadrao: 'b',
  ordem: 306,
  grupos: [
    { id: 'roque', nome: '6...Qc7 7.O-O', colunas: [7, 8, 9, 10] },
    { id: 'outros', nome: '7.f4 e 6...Nge7', colunas: [11, 12] },
  ],
}

module.exports = { capitulo, colunas, notas }
