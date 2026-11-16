// Transcrição do MCO 15ª ed. — Abertura Catalã, alternativas iniciais (pp. 530–531), colunas 31–36.
// Gerar: node scripts/mco/gerar.cjs catalana-f
// Formato: ver gambito-do-rei.cjs. Dicas em catalana-f-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua.
// A nota (a) não tem lances (linhas com ...Bb4+ costumam transpor para a Bogo-Índia): entrou no resumo da coluna 31.
// Correções: na nota (b) o livro traz "12...Rac8", mas a torre já está em b8 (7...Rb8): é 12...Rc8.
// Na nota (d) o livro traz "16...Rfc8", mas o rei preto está em e7 e a torre em h8: é 16...Rhc8.

const A = '1 d4 Nf6 2 c4 e6 3 g3'
const Q = `${A} d5 4 Bg2 dxc4 5 Qa4+ Nbd7 6 Nf3 a6`
const C = `${A} c5 4 Nf3 cxd4 5 Nxd4 d5 6 Bg2 e5 7 Nf3 d4 8 O-O Nc6 9 e3`

const colunas = {
  c31: [`${Q} 7 Nc3 Be7 8 Ne5 O-O 9 Nxd7 Bxd7 10 Qxc4 b5 11 Qb3 b4`, 'qa4', '3...d5 4.Bg2 dxc4 5.Qa4+ Nbd7 6.Nf3 a6 7.Nc3', '=',
    'Com 5.Qa4+ as brancas recuperam logo o peão de c4. Depois de 5...Nbd7 6.Nf3 a6 7.Nc3 Be7 8.Ne5 O-O 9.Nxd7 Bxd7 10.Qxc4 b5 11.Qb3 b4 as pretas ganham espaço na ala da dama e o jogo é igual. As linhas com ...Bb4+ costumam transpor para a Defesa Bogo-Índia.'],
  c32: [`${Q} 7 Qxc4 b5 8 Qc6 Rb8 9 Bf4 Bb4+ 10 Nbd2 Bb7 11 Qc2 Nd5`, 'qa4', '7.Qxc4', '=',
    'Com 7.Qxc4 b5 8.Qc6 Rb8 9.Bf4 Bb4+ 10.Nbd2 Bb7 11.Qc2 Nd5 as pretas ganham tempo contra a dama e o bispo de f4; o jogo é mais ou menos igual.'],
  c33: [`${C} Bc5 10 exd4 exd4 11 Re1+ Be6`, 'c5', '3...c5 4.Nf3 cxd4 5.Nxd4 d5 6.Bg2 e5 7.Nf3 d4', '∞',
    'Com 3...c5 as pretas desafiam o centro na hora. Depois de 4.Nf3 cxd4 5.Nxd4 d5 6.Bg2 e5 7.Nf3 d4 as pretas ficam com um centro de peões forte. Após 8.O-O Nc6 9.e3 Bc5 10.exd4 exd4 11.Re1+ Be6 as pretas têm um peão passado em d4 e o jogo é pouco claro.'],
  c34: [`${C} Bc5 10 exd4 Bxd4 11 Nxd4 Nxd4`, 'c5', '10...Bxd4', '=',
    'Com 10...Bxd4 11.Nxd4 Nxd4 as pretas recapturam com peças e mantêm um cavalo forte em d4. O jogo é mais ou menos igual.'],
  c35: [`${C} Be7 10 exd4 exd4 11 Bf4 O-O`, 'c5', '9...Be7', '±',
    'Com 9...Be7 10.exd4 exd4 11.Bf4 O-O as pretas ficam com o peão passado em d4, mas depois de 12.Ne5 as brancas ficam melhor.'],
  c36: [`${C} d3 10 Nc3 Bb4 11 Bd2 Be6`, 'c5', '9...d3', '∞',
    'Com 9...d3 as pretas avançam o peão até a terceira fileira das brancas. Depois de 10.Nc3 Bb4 11.Bd2 Be6 12.Nxe5 as brancas ganham um peão, mas as pretas têm compensação.'],
}

const notas = [
  // Coluna 31
  ['c31', 'b', 'b', '(b)', '7... Rb8 8 Qxc4 b5 9 Qd3 Bb7 10 O-O c5 11 dxc5 Bxc5 12 Bf4 Rc8 13 Rad1 b4 14 Na4 Be7 15 Ne5', { a: '±', r: 'Andersson–Milov, Groningen 1997', c: '7...Rb8 8.Qxc4 b5 9.Qd3 Bb7 10.O-O c5 11.dxc5 Bxc5 12.Bf4 Rc8 13.Rad1 b4 14.Na4 Be7 15.Ne5 é melhor para as brancas.' }],
  ['c31-b', '1', 'b', '(b) 13...O-O', '13... O-O', { r: 'Andersson–Karpov, Wijk aan Zee 1988', c: 'Melhor é 13...O-O.' }],
  ['c31', 'c', 'c', '(c)', '12 Ne4 Bb5 13 Nxf6+ Bxf6 14 Be3 Rb8 15 Rd1 c5 16 dxc5 Qa5', { a: '=', r: 'Andersson–An. Sokolov, Bar 1997', c: '12.Ne4 Bb5 13.Nxf6+ Bxf6 14.Be3 Rb8 15.Rd1 c5 16.dxc5 Qa5 é igual.' }],
  ['c31-c', '1', 'c', '(c) 14.Bxa8', '14 Bxa8', { c: '14.Bxa8 seria arriscado.' }],
  // Coluna 32
  ['c32', 'd', 'd', '(d)', '9... Nd5 10 Bg5 Be7 11 Bxe7 Qxe7 12 Nc3 Bb7 13 Nxd5 Bxc6 14 Nxe7 Kxe7 15 Rc1 Bd5 16 Rxc7 Rhc8 17 Ra7 Ra8 18 Rxa8 Bxa8 19 Kd2 Nf6', { a: '=', r: 'Ivanchuk–Leko, Melody Amber 2002', c: '9...Nd5 10.Bg5 Be7 11.Bxe7 Qxe7 12.Nc3, e agora há um sacrifício de peão que iguala: 12...Bb7 13.Nxd5 Bxc6 14.Nxe7 Kxe7 15.Rc1 Bd5 16.Rxc7 Rhc8 17.Ra7 Ra8 18.Rxa8 Bxa8 19.Kd2 Nf6, com chances iguais.' }],
  ['c32', 'e', 'e', '(e)', '11 Qxc7 Qxc7 12 Bxc7 Rc8 13 Bf4 Nd5 14 Kd1 Nxf4 15 gxf4 Nb6', { a: '∞', c: '11.Qxc7 Qxc7 12.Bxc7 Rc8 13.Bf4 Nd5 14.Kd1 Nxf4 15.gxf4 Nb6 dá às pretas boa compensação.' }],
  ['c32', 'f', 'f', '(f)', '12 Bg5 f6 13 Bf4 g5 14 Be3 c5 15 a3 Ba5 16 O-O c4', { a: '=', r: 'Bricard–Loffler, Wijk aan Zee 1996', c: '12.Bg5 f6 13.Bf4 g5 14.Be3 foi a partida; agora 14...c5 15.a3 Ba5 16.O-O c4 é mais ou menos igual (Loffler).' }],
  // Coluna 33
  ['c33', 'g-A', 'g', '(g) A', '7 Nb3', { a: '=', c: '7.Nb3 é tranquilo demais para dar algo às brancas.' }],
  ['c33', 'g-B', 'g', '(g) B', '7 Nc2', { a: '=', c: '7.Nc2 é tranquilo demais para dar algo às brancas.' }],
  ['c33', 'h', 'h', '(h)', '12 Ng5 O-O 13 Nxe6 fxe6 14 Nd2 e5 15 Ne4 Qb6 16 Qb3 Nxe4 17 Qxb6 axb6 18 Bxe4 d3', { a: '∞', r: 'Beliavsky–M. Gurevich, Nikšić 1996', c: '12.Ng5 O-O 13.Nxe6 fxe6 14.Nd2 e5 15.Ne4 foi a partida. Beliavsky recomenda 15...Qb6 16.Qb3 Nxe4 17.Qxb6 axb6 18.Bxe4 d3, com contrajogo para as pretas.' }],
  ['c33-h', '1', 'h', '(h) 14.Rxe6', '14 Rxe6 d3 15 Bxc6 bxc6 16 Be3 Bd4 17 Nc3 Qd7 18 Qxd3 Qxe6 19 Qxd4 Rad8', { a: '∓', r: 'Nenashev–Kasparov, Tashkent 1978', c: '14.Rxe6 d3 15.Bxc6 bxc6 16.Be3 Bd4 17.Nc3 Qd7 18.Qxd3 Qxe6 19.Qxd4 Rad8 favoreceu as pretas.' }],
  ['c33-h', '2', 'h', '(h) 15...Nxe4?', '15... Nxe4 16 Bxe4 Qf6 17 Rf1', { a: '±', c: '15...Nxe4? 16.Bxe4 Qf6 17.Rf1 favoreceu as brancas.' }],
  // Coluna 34
  ['c34', 'i-A', 'i', '(i) A', '12 Nc3 O-O 13 Nd5 Be6 14 Nxf6+ Qxf6 15 b3 Qg6 16 Bb2', { a: '=', r: 'Rogers–Rublevsky, Polanica Zdrój 1997', c: '12.Nc3 O-O 13.Nd5 Be6 14.Nxf6+ Qxf6 15.b3 Qg6 16.Bb2 e empate combinado.' }],
  ['c34', 'i-B', 'i', '(i) B', '12 Bg5 O-O 13 Nc3 h6 14 Bxf6 Qxf6 15 f4 Qb6 16 Rf2 Nc6 17 f5', { a: '±', r: 'Beliavsky–Rublevsky, Groningen 1997', c: '12.Bg5 O-O 13.Nc3 h6 14.Bxf6 Qxf6 e agora 15.f4 Qb6 16.Rf2 Nc6 17.f5 foi melhor para as brancas.' }],
  ['c34-i-B', '1', 'i', '(i) B 15.b3', '15 b3 Qg6 16 Re1 Re8 17 Qxd4 exd4 18 Rxe8+ Kh7 19 Nd5 d3', { a: '∞', r: 'Beliavsky–Rublevsky, Groningen 1997', c: 'Beliavsky também tentou 15.b3 Qg6 16.Re1; depois de 16...Re8 17.Qxd4 exd4 18.Rxe8+ Kh7 19.Nd5 d3 a posição é confusa (Beliavsky).' }],
  // Coluna 35
  ['c35', 'j', 'j', '(j)', '11 Nbd2 O-O 12 Nb3 d3 13 Be3 Bg4 14 Nc5 Ne5 15 Nxb7 Qc8', { a: '∓', r: 'Schoof–Farago, Böblingen 1996', c: '11.Nbd2 O-O 12.Nb3 d3 13.Be3 Bg4 14.Nc5 Ne5 15.Nxb7 Qc8 favoreceu as pretas.' }],
  ['c35', 'k', 'k', '(k)', '12 Ne5 Qb6 13 Qb3 Qa6 14 Nd2', { a: '±', r: 'Kabatiansky–Kuchera, URSS 1989', c: '12.Ne5 Qb6 13.Qb3 Qa6 14.Nd2 é melhor para as brancas.' }],
  ['c35-k', '1', 'k', '(k) 12...Nxe5', '12... Nxe5 13 Bxe5 Bc5 14 Nd2', { a: '±', c: '12...Nxe5 13.Bxe5 Bc5 14.Nd2: agora tanto 14...Re8 quanto 14...Ng4 parecem melhores para as brancas.' }],
  // Coluna 36
  ['c36', 'l', 'l', '(l)', '10... Bg4 11 h3 Be6 12 b3 h6 13 Bb2 Qd7 14 Kh2 g5', { a: '∞', r: 'Rotshtein–Mikhalchishin, Lviv 1996', c: '10...Bg4 11.h3 Be6 12.b3 h6 13.Bb2 Qd7 14.Kh2 g5 levou a uma posição selvagem, com chances para os dois lados.' }],
  ['c36', 'm', 'm', '(m)', '12 Nxe5 Nxe5 13 Qa4+ Nc6 14 Bxc6+ bxc6 15 Qxb4 Rb8 16 Qa3 h5', { a: '∞', r: 'Gelfand–Lautier, Groningen 1997', c: '12.Nxe5 Nxe5 13.Qa4+ Nc6 14.Bxc6+ bxc6 15.Qxb4 Rb8 16.Qa3 h5: as pretas têm compensação pelo peão.' }],
]

const capitulo = {
  id: 'catalana-f',
  arquivo: 'catalana-f',
  nome: 'Catalã — alternativas iniciais',
  fonte: 'Modern Chess Openings — Catalan Opening (pp. 530–531), colunas 31–36',
  base: '1. d4 Nf6 2. c4 e6 3. g3',
  corPadrao: 'w',
  ordem: 530,
  grupos: [
    { id: 'qa4', nome: '3...d5 4.Bg2 dxc4 5.Qa4+', colunas: [31, 32] },
    { id: 'c5', nome: '3...c5', colunas: [33, 34, 35, 36] },
  ],
}

module.exports = { capitulo, colunas, notas }
