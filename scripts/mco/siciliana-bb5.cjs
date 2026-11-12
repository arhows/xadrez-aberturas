// Transcrição do MCO 15ª ed. — Siciliana com 3.Bb5: Rossolimo e Moscou (pp. 355–357), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs siciliana-bb5
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-bb5-dicas.cjs.
//
// Só a coluna 5 traz avaliação na tabela; as outras recebem a da nota que as continua.

const B = '1 e4 c5 2 Nf3'

const colunas = {
  c01: [`${B} Nc6 3 Bb5 g6 4 O-O Bg7 5 Re1 Nf6 6 c3 O-O 7 d4 d5 8 e5 Ne4 9 Nbd2 cxd4 10 cxd4 Qb6`, 'nc6', 'Rossolimo 3...g6 4.O-O', '=',
    'Na Rossolimo as brancas desenvolvem o bispo em b5 antes de d4 e ameaçam dobrar os peões pretos em c6. Contra 3...g6 4.O-O Bg7 5.Re1 as pretas respondem com 7...d5! e 8...Ne4, e o jogo fica igual.'],
  c02: [`${B} Nc6 3 Bb5 g6 4 Bxc6 bxc6 5 O-O Bg7 6 Re1 Nh6 7 c3 O-O 8 d4 cxd4 9 cxd4 f6 10 Nc3 d6`, 'nc6', '4.Bxc6 bxc6', '⩲',
    'Com 4.Bxc6 as brancas dobram os peões pretos. As pretas ficam com o par de bispos e manobram o cavalo por h6 para f7; as brancas mantêm pequena vantagem.'],
  c03: [`${B} Nc6 3 Bb5 e6 4 O-O Nge7 5 c3 a6 6 Be2 d5 7 exd5 Nxd5 8 d4 cxd4 9 Nxd4 Bd6 10 Nxc6 bxc6`, 'nc6', '3...e6 4.O-O Nge7', '⩲',
    'Com 3...e6 e 4...Nge7 as pretas preparam ...a6 e ...d5 sem deixar os peões ser dobrados. O bispo recua para e2, o centro se abre e as brancas mantêm pequena vantagem.'],
  c04: [`${B} Nc6 3 Bb5 Nf6 4 Nc3 Nd4 5 e5 Nxb5 6 Nxb5 Nd5 7 Ng5 f5 8 O-O a6 9 Nc3 Nxc3 10 dxc3 Qb6`, 'nc6', '3...Nf6 4.Nc3', '⩲',
    'Com 3...Nf6 as pretas atacam e4, mas 4.Nc3 Nd4 5.e5 leva a um jogo ativo para as brancas. Depois de 7.Ng5! as pretas enfraquecem o roque com ...f5, e as brancas ficam um pouco melhor.'],
  c05: [`${B} d6 3 Bb5+ Bd7 4 Bxd7+ Qxd7 5 O-O Nc6 6 c3 Nf6 7 Re1 e6 8 d4 cxd4 9 cxd4 d5 10 e5 Ne4`, 'd6', 'Moscou 3...Bd7', '=',
    'Na Variante Moscou, 3.Bb5+ evita a teoria da Najdorf e da Dragão. Com 3...Bd7 os bispos se trocam; as pretas jogam ...e6 e ...d5 e, depois de 10.e5 Ne4, igualam. A coluna é Knežević–Fischer, Skopje 1967.'],
  c06: [`${B} d6 3 Bb5+ Nd7 4 d4 Nf6 5 Nc3 cxd4 6 Qxd4 e5 7 Qd3 h6 8 Be3 Be7 9 Bc4 a6 10 a4 Qa5`, 'd6', '3...Nd7 4.d4', '⩲',
    'Com 3...Nd7 as pretas mantêm os bispos, mas 4.d4 abre o jogo enquanto elas ainda estão atrasadas no desenvolvimento. Depois de 6...e5 a dama recua para d3, e as brancas ficam com pequena vantagem.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '5 c3 Nf6 6 e5 Nd5 7 d4 cxd4 8 cxd4 O-O 9 Nc3 Nc7 10 Re1 Nxb5 11 Nxb5 d6 12 exd6 exd6 13 d5 Ne5', { a: '=', r: 'Fressinet–Mamedov, Kuşadası 2006', c: '5.c3 Nf6 6.e5 Nd5 7.d4 leva à igualdade.' }],
  ['c01-a', '1', 'a', '(a) 6.d4', '6 d4 cxd4 7 cxd4 Nxe4 8 d5 Nd6', { c: '6.d4 cxd4 7.cxd4 Nxe4 8.d5 Nd6! dá às brancas compensação pelo peão, mas nada mais.' }],
  ['c01-a', '2', 'a', '(a) 9...Nxc3', '9... Nxc3 10 bxc3 d6 11 exd6 Qxd6 12 a4', { a: '⩲', c: '9...Nxc3 10.bxc3 d6 dá pequena vantagem às brancas.' }],
  ['c01', 'b-A', 'b', '(b) A', '5... e5 6 Bxc6 bxc6 7 c3', { c: 'Contra 5...e5, 6.Bxc6 bxc6 7.c3 transpõe para a nota (g).' }],
  ['c01', 'b-B', 'b', '(b) B', '5... e5 6 b4 cxb4 7 a3 Nge7 8 axb4 O-O 9 Bxc6 bxc6 10 Bb2 d6 11 d4', { a: '⩲', r: 'Stellwagen–Carlsen, Wijk aan Zee 2005', c: 'Contra 5...e5 também serve 6.b4. Capturar o peão b com 8...O-O! é melhor do que ficar com ele, porque permite Ba3.' }],
  ['c01', 'c-A', 'c', '(c) A', '6 e5 Nd5 7 Nc3 Nc7 8 Bxc6 dxc6 9 Ne4 Ne6 10 d3 O-O 11 Be3 b6 12 Qd2 f5', { a: '=', r: 'Kramnik–Kasparov, Moscou (rápida) 1996', c: '6.e5 Nd5 7.Nc3 dá menos problemas às pretas.' }],
  ['c01', 'c-B', 'c', '(c) B', '6 Nc3 O-O 7 e5 Ne8', { a: '=', c: '6.Nc3 O-O 7.e5 Ne8 também é igual.' }],
  ['c01', 'd', 'd', '(d)', '8 exd5 Qxd5 9 c4 Qd6 10 d5 Nd4 11 Nxd4 cxd4', { a: '∓', r: 'Gubanov–Svidler, São Petersburgo 1995', c: '8.exd5 Qxd5 9.c4 Qd6 10.d5?! Nd4! deixa as pretas melhor.' }],
  ['c01-d', '1', 'd', '(d) 12.Qxd4', '12 Qxd4 Ng4 13 Qf4 Qxf4 14 Bxf4 Bxb2', { a: '∓', c: 'Se 12.Qxd4, as brancas perdem a qualidade depois de 12...Ng4.' }],
  ['c01', 'e', 'e', '(e)', '11 Bxc6 Qxc6 12 Nxe4 dxe4 13 d5 Qc4 14 Ng5 Bxe5 15 Rxe4 Qc7', { a: '=', r: 'Skripchenko–Anchimeg, Olimpíada de Bled 2002', c: 'Com 11.Bxc6 Qxc6 12.Nxe4 o jogo fica igual.' }],
  // Coluna 2
  ['c02', 'f', 'f', '(f)', '4... dxc6 5 d3 Bg7 6 h3 e5 7 Nc3 Qe7 8 Be3 Nf6 9 Qd2 Nd7 10 Bh6 Bxh6 11 Qxh6 f6 12 O-O-O Nf8 13 Nh4 Be6', { a: '=', r: 'Kveinys–Kelečević, Liechtenstein 2004', c: 'Também serve 4...dxc6: as pretas abrem as linhas das peças e igualam.' }],
  ['c02', 'g-A', 'g', '(g) A', '6... Nf6 7 e5 Nd5 8 c4 Nc7 9 d4 cxd4 10 Qxd4', { a: '⩲', r: 'Kasparov–Salov, Dortmund 1992', c: '6...Nf6 7.e5 Nd5 8.c4 dá pequena vantagem às brancas.' }],
  ['c02', 'g-B', 'g', '(g) B', '6... e5 7 c3 Ne7 8 d4 cxd4 9 cxd4 exd4 10 Nxd4 O-O 11 Nc3 Bb7 12 Bg5 h6 13 Bh4 g5 14 Bg3', { a: '⩲', r: 'Smyslov–Zsu. Polgár, Mônaco 1994', c: '6...e5 7.c3! também favorece as brancas.' }],
  ['c02', 'h', 'h', '(h)', '11 b3 Bd7 12 Bb2 Nf7 13 Qc2 Rc8 14 h3 Qc7 15 Rad1 Rfe8 16 Qd2 Qa5', { a: '⩲', r: 'Rublevsky–Svidler, Rússia 1996', c: 'Depois de 11.b3 Bd7 12.Bb2 Nf7 as pretas têm chances quase iguais.' }],
  // Coluna 3
  ['c03', 'i', 'i', '(i)', '4 Bxc6 bxc6 5 O-O Ne7 6 b3 Ng6 7 Bb2 f6 8 e5 Be7 9 d3 O-O 10 Nbd2 Qc7', { a: '=', r: 'Cuartas–Gulko, Olimpíada de Bled 2002', c: '4.Bxc6 bxc6 5.O-O Ne7 leva à igualdade.' }],
  ['c03', 'j', 'j', '(j)', '5 Nc3 a6 6 Bxc6 Nxc6 7 d4 cxd4 8 Nxd4 Qc7 9 Re1 Bd6 10 Nd5 exd5 11 exd5+ Ne5 12 f4 O-O', { a: '=', r: 'Timman–Lautier, Horgen 1995', c: '5.Nc3 a6 6.Bxc6 Nxc6 7.d4 leva à igualdade depois de 9...Bd6!.' }],
  ['c03-j', '1', 'j', '(j) 5...Nd4', '5... Nd4 6 Nxd4 cxd4 7 Ne2 a6 8 Ba4 Nc6 9 d3 Bc5 10 c4 Rb8 11 Bf4 d6 12 b4 Bxb4 13 Nxd4', { a: '⩲', r: 'W. Watson–Nunn, Kilkenny 1996', c: '5...Nd4 6.Nxd4 cxd4 7.Ne2 dá pequena vantagem às brancas depois de 12.b4!.' }],
  ['c03', 'k', 'k', '(k)', '6 Ba4 b5 7 Bc2 Bb7 8 a4 Ng6', { a: '=', r: 'Spassov–Gulko, Interzonal de Biel 1993', c: 'Depois de 6.Ba4 b5 7.Bc2 as pretas não têm problemas.' }],
  ['c03', 'l', 'l', '(l)', '11 Bf3 Qc7 12 g3 O-O 13 Nd2 e5 14 Nc4', { a: '⩲', r: 'Svidler–Radjabov, Linares 2006', c: 'Com 11.Bf3 Qc7 12.g3 e 14.Nc4 as brancas ficam com pequena vantagem.' }],
  // Coluna 4
  ['c04', 'm-A', 'm', '(m) A', '3... Qb6 4 Bxc6 Qxc6 5 O-O d6 6 d4 cxd4 7 Nxd4 Qxe4 8 Nc3 Qg4 9 Qd3', { a: '⩲', r: 'Plaskett–Larsen, Londres 1989', c: '3...Qb6 4.Bxc6 Qxc6 5.O-O permite às pretas ganhar um peão, mas as brancas ficam com iniciativa.' }],
  ['c04', 'm-B', 'm', '(m) B', '3... d6', { c: '3...d6 transpõe para a nota (u).' }],
  ['c04', 'n', 'n', '(n)', '4... g6 5 e5 Ng4 6 Bxc6 dxc6 7 h3 Nh6 8 Ne4 b6 9 Qe2 Nf5 10 c3 Bg7 11 g4', { a: '⩲', r: 'Rytshagov–Spassov, Olimpíada de Erevan 1996', c: '4...g6 5.e5 Ng4 6.Bxc6 dá pequena vantagem às brancas.' }],
  ['c04', 'o-A', 'o', '(o) A', '7... h6 8 Nxf7 Kxf7 9 Qf3+ Ke6 10 c4 Nb6 11 d4 d5 12 dxc5 dxc4 13 Be3 Na4 14 Nd4+', { a: '+−', r: 'Rasin–Schmitt, Boylston 1994', c: '7...h6? é punido com 8.Nxf7!: depois de 14.Nd4+ as pretas abandonaram.' }],
  ['c04', 'o-B', 'o', '(o) B', '7... f6 8 Ne4 f5 9 c4 Nc7 10 Nxc5', { a: '⩲', r: 'Tal–Mnatsakanian, Erevan 1986', c: '7...f6 8.Ne4 f5 9.c4 deixa as brancas com pequena vantagem.' }],
  ['c04', 'p', 'p', '(p)', '11 a4 Qc6 12 b4 b5 13 axb5 axb5 14 Rxa8 Qxa8 15 e6 dxe6 16 Qe2', { a: '⩲', r: 'De la Villa–González, Campeonato Espanhol Aberto 2006', c: '11.a4 Qc6 12.b4 dá pequena vantagem às brancas.' }],
  // Coluna 5
  ['c05', 'q', 'q', '(q)', '4... Nxd7 5 O-O Ngf6 6 Qe2 e6 7 d4 cxd4 8 Nxd4 Be7 9 c4 O-O 10 b3 Re8 11 Bb2 a6 12 Nc3 Rc8', { a: '⩲', r: 'Oral–Stefánsson, Pardubice 2000', c: 'Também serve 4...Nxd7: as brancas ficam só com um pouco mais de espaço.' }],
  ['c05-q', '1', 'q', '(q) 5.c4', '5 c4 Ne5', { c: '5.c4 é bem respondido com 5...Ne5!.' }],
  ['c05', 'r-A', 'r', '(r) A', '5 c4 Qg4 6 O-O Qxe4 7 d4 cxd4 8 Nxd4', { a: '±', c: 'Contra 5.c4 as pretas não devem pegar o peão com 5...Qg4?: depois de 8.Nxd4 as brancas têm forte iniciativa.' }],
  ['c05', 'r-B', 'r', '(r) B', '5 c4 Nc6 6 O-O g6 7 d4 cxd4 8 Nxd4 Bg7 9 Be3 Nf6', { a: '=', c: 'Contra 5.c4 é seguro 5...Nc6 6.O-O g6, com igualdade.' }],
  ['c05', 's', 's', '(s)', '6 b3 Nf6 7 Re1 g6 8 c3 Bg7 9 d4 cxd4 10 cxd4 d5 11 e5 Ne4 12 Bb2 O-O 13 Nbd2 Nxd2 14 Qxd2 e6', { a: '=', c: 'Uma linha traiçoeira é 6.b3: depois de 13.Nbd2, o lance 13...Nxd2 14.Qxd2 e6 iguala.' }],
  ['c05-s', '1', 's', '(s) 13...f5', '13... f5 14 exf6 Nxd2 15 Ne5 Nxe5 16 dxe5', { a: '±', r: 'Christiansen–C. Hansen, Reykjavík 1998', c: 'O atraente 13...f5?! 14.exf6 Nxd2 15.Ne5! deixou as pretas em dificuldades.' }],
  ['c05', 't', 't', '(t)', '7 d4 Nxe4 8 d5 Ne5 9 Nxe5 dxe5 10 Re1 Nf6 11 Rxe5 e6 12 c4 Bd6 13 Re1 O-O-O', { a: '=', c: '7.d4 Nxe4 8.d5 Ne5! leva à igualdade.' }],
  // Coluna 6
  ['c06', 'u', 'u', '(u)', '3... Nc6 4 O-O Bd7 5 Re1 Nf6 6 c3 a6 7 Bxc6 Bxc6 8 d4 Bxe4 9 Bg5 Bd5 10 Nbd2 c4 11 b3 b5 12 Qe2 Rc8 13 a4', { a: '∞', r: 'Brynell–Rogers, Londres 1990', c: '3...Nc6 4.O-O Bd7 é raro sem motivo especial. Depois de 8...Bxe4 as brancas têm compensação pelo peão.' }],
  ['c06-u', '1', 'u', '(u) 6...e6', '6... e6 7 d4', { a: '⩲', c: '6...e6 7.d4 dá pequena vantagem às brancas.' }],
  ['c06-u', '2', 'u', '(u) 5...a6', '5... a6 6 Bxc6 Bxc6 7 d4 cxd4 8 Nxd4 Nf6 9 Bg5 e6 10 Nxc6 bxc6 11 Qf3 e5 12 Bxf6 Qxf6 13 Qc3', { a: '±', r: 'Timman–Cifuentes, Holanda 1996', c: 'As pretas precisam ser precisas: 5...a6?! e depois 11...e5? as deixaram em dificuldades.' }],
  ['c06', 'v', 'v', '(v)', '5... a6 6 Bxd7+ Nxd7 7 O-O e6 8 Bg5 Qc7 9 dxc5 Nxc5 10 Qd4 f6 11 Be3 Be7 12 a4 Nd7 13 Qd1 Ne5 14 Nd4', { a: '⩲', r: 'Krays–Browne, Filadélfia 1997', c: '5...a6 6.Bxd7+ Nxd7 dá pequena vantagem às brancas.' }],
  ['c06', 'w-A', 'w', '(w) A', '6... e6 7 Bg5 a6 8 Bxd7+ Bxd7 9 O-O-O', { a: '⩲', r: 'Rublevsky–Ruban, Rússia 1995', c: 'Com 6...e6 7.Bg5 as pretas ficam sob pressão.' }],
  ['c06', 'w-B', 'w', '(w) B', '6... g6 7 e5 dxe5 8 Nxe5 Bg7 9 Bg5 O-O 10 O-O-O Qa5 11 Nc4 Qc7 12 Rhe1 Qxh2 13 Rxe7 Qxg2 14 Qh4', { a: '±', r: 'Timman–Lautier, Wijk aan Zee 1997', c: '6...g6 7.e5 também deixa as pretas sob pressão.' }],
  ['c06', 'x', 'x', '(x)', '11 O-O Nc5 12 Bxc5 Qxc5 13 Nd5 Nxd5 14 Qxd5 Qxd5 15 Bxd5 Rb8 16 Rfd1 Be6', { a: '⩲', r: 'Glek–Vorobiov, Moscou 2006', c: 'Depois de 11.O-O Nc5 e as trocas, as brancas ficam só com uma pequena vantagem.' }],
]

const capitulo = {
  id: 'siciliana-bb5',
  arquivo: 'siciliana-bb5',
  nome: 'Siciliana — 3.Bb5 (Rossolimo e Moscou)',
  fonte: 'Modern Chess Openings — Sicilian Defense, With 3 Bb5 (pp. 355–357), colunas 1–6',
  base: '1. e4 c5 2. Nf3',
  corPadrao: 'b',
  ordem: 355,
  grupos: [
    { id: 'nc6', nome: '2...Nc6 3.Bb5 (Rossolimo)', colunas: [1, 2, 3, 4] },
    { id: 'd6', nome: '2...d6 3.Bb5+ (Moscou)', colunas: [5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
