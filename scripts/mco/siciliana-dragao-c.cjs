// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante do Dragão: Ataque Iugoslavo, 9.O-O-O, 9.g4 e outros (pp. 277–279), colunas 13–18.
// Gerar: node scripts/mco/gerar.cjs siciliana-dragao-c
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-dragao-c-dicas.cjs.
//
// A tabela só traz avaliação no fim da coluna 14; nas outras a avaliação vem da última nota.
// Coluna 14: o livro escreve "15...Qf4†="; o lance dá xeque (Qf4+).

const B = '1 e4 c5 2 Nf3 d6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 g6 6 Be3 Bg7 7 f3'
const O = `${B} O-O 8 Qd2 Nc6`

const colunas = {
  c13: [`${O} 9 O-O-O d5 10 exd5 Nxd5 11 Nxc6 bxc6 12 Bd4 e5 13 Bc5 Be6 14 Ne4 Rb8 15 Bc4 Re8`, 'roque', '9.O-O-O d5 10.exd5', '⩲',
    'Com 9.O-O-O as brancas não perdem tempo com Bc4. O problema sempre foi o contra-ataque central 9...d5. Na abordagem posicional desta coluna, as brancas trocam em d5 e c6, e com 13.Bc5 e 14.Ne4 ficam um pouco melhor.'],
  c14: [`${O} 9 O-O-O d5 10 Qe1 e6 11 h4 Qc7 12 h5 Nxh5 13 exd5 exd5 14 Ndb5 Qg3 15 Bf2 Qf4+`, 'roque', '10.Qe1', '=',
    'Com 10.Qe1 as brancas tiram a dama da coluna d e preparam h4–h5. As pretas defendem com 10...e6, e depois de 15...Qf4+ fica igual.'],
  c15: [`${O} 9 O-O-O Nxd4 10 Bxd4 Be6 11 Kb1 Qc7 12 Nd5 Bxd5 13 exd5 Rfc8 14 Rc1 a5 15 Bb5 a4`, 'roque', '9...Nxd4', '⩲',
    'Com 9...Nxd4 e 10...Be6 as pretas evitam a luta central. Depois de 12.Nd5 e da troca em d5 as brancas ficam um pouco melhor.'],
  c16: [`${O} 9 g4 Be6 10 O-O-O Nxd4 11 Bxd4 Qa5 12 a3 Rfc8 13 h4 Rab8 14 h5 b5 15 hxg6 fxg6`, 'g4', '9.g4 Be6 10.O-O-O Nxd4', '∞',
    'Com 9.g4 as brancas avançam logo na ala do rei. As pretas desenvolvem com 9...Be6, trocam em d4 e avançam ...b5; o jogo fica com chances para os dois lados.'],
  c17: [`${O} 9 g4 Be6 10 O-O-O Ne5 11 h4 Bc4 12 Bh3 Ba6 13 b3 Qa5 14 Kb1 Rfc8 15 Nd5 Qxd2`, 'g4', '10...Ne5', '=',
    'Com 10...Ne5 e 11...Bc4 as pretas trocam ou expulsam o bispo de f1. Depois da troca das damas em d2 fica igual.'],
  c18: [`${B} Nc6 8 Qd2 Bd7 9 O-O-O Rc8 10 g4 Ne5 11 h4 h5 12 g5 Nh7 13 Kb1 O-O 14 f4 Ng4 15 Bg1 a6`, 'adiado', '7...Nc6 (roque adiado)', '⩲',
    'Com 7...Nc6 e 8...Bd7 as pretas adiam o roque. É um sistema arriscado: as brancas ganham espaço na ala do rei e ficam um pouco melhor.'],
}

const notas = [
  // Coluna 13
  ['c13', 'a', 'a', '(a)', '7 Bc4 Ng4 8 Bb5+ Kf8', { a: '=', c: '7.Bc4 Ng4! 8.Bb5+ Kf8 dá às pretas chances totalmente iguais.' }],
  ['c13', 'b', 'b', '(b)', '12 Nxd5 cxd5 13 Qxd5 Qc7 14 Qc5 Qb7 15 Qa3 Bf5 16 Bd3 Rab8 17 b3 Rfc8', { a: '=', r: 'Vachier-Lagrave–Mamedov, Heraklion 2005', c: 'As brancas também podem tentar pegar o peão com 12.Nxd5; fica igual.' }],
  ['c13-b', '1', 'b', '(b) 14.Qxa8', '14 Qxa8 Bf5', { a: '⩱', c: '14.Qxa8?! Bf5 deixa as pretas um pouco melhor.' }],
  ['c13-b', '2', 'b', '(b) 14...Qb8', '14... Qb8 15 Qa3', { a: '⩲', c: 'Com 14...Qb8 15.Qa3 as brancas ficam um pouco melhor.' }],
  ['c13', 'c-A', 'c', '(c) A', '12... Nxc3 13 Qxc3 Bh6+ 14 Be3 Bxe3+ 15 Qxe3 Qb6 16 Qxe7 Be6 17 Qa3 Rad8 18 Bd3 Rd5 19 Qc3 Rc5 20 Qf6 Bxa2', { a: '=', r: 'Eggleston–Ward, British Rapidplay 2006', c: 'As pretas já experimentaram alternativas. Com 12...Nxc3 e 13...Bh6+ fica igual.' }],
  ['c13-c-A', '1', 'c', '(c) A 18.Re1', '18 Re1', { c: '18.Re1 pode ser melhor.' }],
  ['c13', 'c-B', 'c', '(c) B', '12... Bxd4 13 Qxd4 Qb6 14 Na4 Qa5 15 b3 Bf5 16 g4 Be6 17 Qe5 Qb4 18 c4', { a: '⩲', r: 'Herrera–Hernández, Havana 1993', c: 'Com 12...Bxd4 e 14.Na4! as brancas ficam um pouco melhor.' }],
  ['c13-c-B', '1', 'c', '(c) B 13...Qc7', '13... Qc7 14 Bc4', { a: '⩲', c: 'Com 13...Qc7 14.Bc4 também.' }],
  ['c13-c-B', '2', 'c', '(c) B 16...Bxc2', '16... Bxc2 17 Rd2', { c: '16...Bxc2 17.Rd2!.' }],
  ['c13', 'd', 'd', '(d)', '13... Re8 14 Nxd5 cxd5 15 Qxd5 Qxd5 16 Rxd5 Be6 17 Rd2 Bxa2 18 b4 a5 19 Bb5 Rec8', { a: '⩲', c: 'As pretas ainda não precisam se preocupar com Bxf8, pois teriam boa compensação nas casas escuras. 13...Re8 permite 14.Nxd5, com pequena vantagem branca.' }],
  ['c13-d', '1', 'd', '(d) 14.Ne4', '14 Ne4 f5 15 Nd6 Bf8 16 Bb5 Bd7 17 Ba4 Re6 18 Nb7 Qh4 19 Bxf8 Qxa4 20 Ba3 Qc4 21 b3 Qa6 22 Na5', { a: '±', c: 'Mais forte ainda é 14.Ne4 (14...Be6 transpõe para a nota e). Com 14...f5 as brancas ficam no controle.' }],
  ['c13-d-1', '1', 'd', '(d) 17...Qh4', '17... Qh4 18 Bb3', { c: '17...Qh4 18.Bb3.' }],
  ['c13', 'e-A', 'e', '(e) A', '14... Re8 15 h4 h5 16 Bc4 a5 17 a4 Nf4 18 Qxd8 Raxd8 19 Rxd8 Rxd8 20 Bxe6 Nxe6 21 Bb6', { a: '⩲', r: 'Kudrin–Golubev, Moscou 1995', c: 'Com 14...Re8 15.h4 h5 as brancas ficam com vantagem no final.' }],
  ['c13-e-A', '1', 'e', '(e) A 15...f5', '15... f5 16 Ng5 Bh6 17 c4', { a: '⩲', c: '15...f5 16.Ng5 Bh6 17.c4 é bom para as brancas.' }],
  ['c13-e-A', '2', 'e', '(e) A 15...h6', '15... h6 16 g4 Qc7 17 g5 h5 18 Bc4', { a: '⩲', r: 'Ehlvest–Marin, Calcutá 1997', c: 'Com 15...h6 também.' }],
  ['c13-e-A', '3', 'e', '(e) A 15...Nf4', '15... Nf4 16 Qe1 Qc7 17 g3 Nd5 18 g4 a5 19 a4', { a: '⩲', r: 'Živković–Milošević, Pula 1996', c: 'Com 15...Nf4 também.' }],
  ['c13', 'e-B', 'e', '(e) B', '14... Qc7 15 Bxf8 Bxf8 16 Bc4 Rd8 17 h4', { a: '±', r: 'Shulman–Steiner, National Open 2001', c: 'Com 14...Qc7 as brancas pegam a qualidade e ficam melhor.' }],
  ['c13', 'f', 'f', '(f)', '15 c4 Re8 16 g4 Qc8 17 Nd6 Qa6 18 b3 Nf6 19 Nxe8 Rxe8 20 Bd3 Nd7', { r: 'Hendriks–Traut, por correspondência 1990', c: 'Uma continuação aguda é 15.c4; as pretas ficam com compensação pela qualidade.' }],
  ['c13', 'g-A', 'g', '(g) A', '15... Qc8 16 Bxf8 Qxf8 17 Qa5', { a: '±', c: 'Não 15...Qc8?, pois as brancas finalmente pegam a qualidade com segurança.' }],
  ['c13', 'g-B', 'g', '(g) B', '16 h4 h6 17 g4 a5 18 g5 h5 19 Bb3', { a: '⩲', r: 'Ong–Jones, Grécia 2004', c: 'Depois de 15...Re8 16.h4 as brancas ficam um pouco melhor.' }],
  // Coluna 14
  ['c14', 'h', 'h', '(h)', '10 Kb1 Nxd4 11 e5 Nf5 12 exf6 Bxf6 13 Nxd5 Qxd5 14 Qxd5 Nxe3 15 Qd2 Nxd1 16 Qxd1 Be6 17 Bb5 a6', { a: '=', r: 'Ronchetti–Cebalo, Reggio Emilia 2005', c: '10.Kb1 Nxd4 11.e5! é mais uma opção das brancas; fica igual.' }],
  ['c14', 'i', 'i', '(i)', '10... e5 11 Nxc6 bxc6 12 exd5 Nxd5 13 Bc4 Be6 14 Ne4 Qc7 15 Bc5 Rfd8 16 g4 Nf4', { a: '=', r: 'Nedev–Rogozenko, Skopje 2002', c: 'Com 10...e5 e 12...Nxd5! fica igual.' }],
  ['c14-i', '1', 'i', '(i) 12...cxd5', '12... cxd5 13 Bg5 Be6 14 Bc4', { a: '±', c: '12...cxd5?! deixa as brancas melhor.' }],
  ['c14', 'j', 'j', '(j)', '11 g4 e5 12 Nxc6 bxc6 13 exd5 cxd5 14 Bg5 Bb7 15 Qxe5 h6 16 Bh4 g5 17 Be1 Nxg4', { a: '∓', r: 'Morozevich–Savchenko, Moscou 1991', c: 'Com 11.g4 vem 11...e5!, porque f3 fica sem defesa; as pretas ficam melhor.' }],
  ['c14-j', '1', 'j', '(j) 14.g5', '14 g5 d4 15 gxf6 Qxf6 16 Ne4 Qxf3', { a: '∓', c: 'Com 14.g5 d4 também.' }],
  ['c14', 'k', 'k', '(k)', '12 exd5 exd5 13 Qd2 h5 14 Bf4 Qe7 15 Bg5 Qb4 16 Nb3 d4 17 Nxd4 Nxd4 18 Qxd4 Qxd4 19 Rxd4 Nh7', { a: '=', r: 'Gallagher–Hodgson, Berna 1996', c: 'Com 12.exd5 fica igual. A coluna é Adams–Tiviakov, Wijk aan Zee 1996.' }],
  // Coluna 15
  ['c15', 'l-A', 'l', '(l) A', '9... Bd7 10 g4 Rc8 11 h4 Ne5 12 h5 Nxf3 13 Nxf3 Bxg4 14 h6 Bh8 15 Be2', { a: '±', r: 'Ehlvest–Henley, Nova York 1997', c: 'Com 9...Bd7 e o sacrifício 12...Nxf3!? as brancas ficam melhor depois de 14.h6!.' }],
  ['c15', 'l-B', 'l', '(l) B', '9... Be6 10 Nxe6 fxe6 11 g3', { a: '±', c: 'Com 9...Be6 10.Nxe6 fxe6 11.g3! o bispo branco pressiona de h3.' }],
  ['c15', 'm', 'm', '(m)', '12 h4 Rfc8 13 h5 Qa5 14 hxg6 hxg6 15 a3 Rab8 16 Bd3 Bc4 17 Bxc4 Rxc4 18 Qc1 e6 19 g4', { a: '⩲', r: 'Pârligras–Cebalo, HIT Open 2004', c: '12.h4 leva a complicações selvagens; as brancas ficam um pouco melhor.' }],
  ['c15-m', '1', 'm', '(m) 16...b5', '16... b5 17 Qg5', { a: '⩲', c: 'Com 16...b5 17.Qg5 também.' }],
  ['c15', 'n', 'n', '(n)', '16 c4 Nd7 17 Bxg7 Kxg7 18 h4', { a: '⩲', r: 'K. Georgiev–Ward, Gibraltar 2005', c: 'Depois de 16.c4 as brancas ficam um pouco melhor.' }],
  // Coluna 16
  ['c16', 'o-A', 'o', '(o) A', '9... Nxd4 10 Bxd4 Be6 11 h4 Qa5 12 h5 Rfc8 13 hxg6 hxg6 14 a3 Rab8 15 Bd3', { a: '⩲', r: 'Nunn–Ward, Lloyds Bank 1984', c: 'As pretas devem esperar o roque branco antes de trocar em d4. Com 9...Nxd4 as brancas ficam com perspectivas de ataque.' }],
  ['c16', 'o-B', 'o', '(o) B', '9... Bxg4 10 fxg4 Nxg4 11 Nb3 a5 12 a4 Rc8 13 O-O-O Nce5 14 Kb1', { a: '±', r: 'Zsu. Polgár–Ashley, Nova York 1992', c: 'O sacrifício 9...Bxg4?! não dá compensação suficiente.' }],
  ['c16', 'o-C', 'o', '(o) C', '9... e6 10 O-O-O d5 11 Be2 Nxd4 12 Bxd4 dxe4 13 g5 Nh5 14 Qe3 Qc7 15 Bxg7 Kxg7 16 Nxe4', { a: '⩲', r: 'Morris–Kudrin, Gausdal 1982', c: 'Com 9...e6 e 10...d5 as brancas ficam um pouco melhor.' }],
  ['c16', 'p', 'p', '(p)', '10 Nxe6 fxe6 11 O-O-O Ne5 12 Be2 Qc8 13 h4 Nc4 14 Bxc4 Qxc4', { a: '=', r: 'segundo Ward', c: '10.Nxe6 fxe6 dá às pretas um centro compacto e a coluna f aberta contra f3; fica igual.' }],
  ['c16-p', '1', 'p', '(p) 12...Rc8', '12... Rc8 13 h4 Qa5 14 h5', { a: '⩲', c: 'Pior é 12...Rc8.' }],
  ['c16', 'q', 'q', '(q)', '12... Rab8 13 h4 b5 14 Nd5 Qxd2+ 15 Rxd2 Bxd5 16 exd5 a5 17 Bh3 Nd7 18 f4 Bxd4 19 Rxd4 Rfc8 20 g5', { a: '⩲', r: 'Stripunsky–Obsivac, Fera Vrana 1992', c: 'Com 12...Rab8 as brancas ficam com pequena vantagem no final.' }],
  ['c16', 'r', 'r', '(r)', '15 h6 b4 16 Nb5 Rxb5 17 Bxb5 Qxb5 18 hxg7 bxa3 19 Qd3 axb2+ 20 Bxb2 Bc4', { a: '∞', r: 'Shirov–Golubev, URSS 1985', c: '15.h6 b4! leva a uma confusão tática.' }],
  ['c16-r', '1', 'r', '(r) 16.hxg7', '16 hxg7 bxa3', { a: '∓', c: '16.hxg7 bxa3! deixa as pretas melhor.' }],
  ['c16', 's-A', 's', '(s) A', '15... hxg6 16 Qg5', { a: '±', c: 'Não 15...hxg6? 16.Qg5.' }],
  ['c16', 's-B', 's', '(s) B', '15... b4 16 Nd5 Bxd5 17 g5', { a: '±', r: 'Zsu. Polgár–Lindemann, Viena 1991', c: 'Nem 15...b4? 16.Nd5!.' }],
  ['c16', 's-C', 's', '(s) C', '16 g5 Nh5 17 Bxg7 Kxg7 18 Qd4+ Kf7 19 Nd5 b4', { a: '∞', r: 'Black–Belezky, Gibraltar 2005 (até 17.Bxg7)', c: 'Depois de 15...fxg6 16.g5 Nh5 e 19...b4!? as chances ficam para os dois lados.' }],
  // Coluna 17
  ['c17', 't', 't', '(t)', '11 g5 Nh5 12 f4 Nc4 13 Bxc4 Bxc4 14 b3 Be6 15 Nce2 Bg4', { a: '=', r: 'Herbrechtsmeier–Kern, por correspondência 1983', c: 'Com 11.g5 fica igual.' }],
  ['c17', 'u', 'u', '(u)', '14... Qa3 15 g5 Nh5 16 f4 Nc6 17 Bg4 Nxd4 18 Bxd4 Bxd4 19 Qxd4 Nxf4 20 e5', { a: '⩲', r: 'Anand–Milenković, Sharjah 1985', c: '14...Qa3?! deixa as brancas um pouco melhor.' }],
  ['c17', 'v', 'v', '(v)', '16 Rxd2 Nxd5 17 exd5 Rc3', { a: '=', c: 'Depois de 16.Rxd2 fica igual.' }],
  // Coluna 18
  ['c18', 'w', 'w', '(w)', '9 Bc4 Rc8 10 Bb3 Ne5 11 O-O-O Qa5 12 h4 Nc4 13 Bxc4 Rxc4 14 Nb3 Qc7 15 Bd4 Bc6 16 e5 dxe5 17 Bxe5', { a: '±', r: 'Fischer–Cámara, Olimpíada de Siegen 1970', c: '9.Bc4 também é razoável contra este roque adiado. Com 11...Qa5?! e 15...Bc6?! as brancas ficaram com grande vantagem.' }],
  ['c18-w', '1', 'w', '(w) 11...Nc4', '11... Nc4', { c: '11...Nc4, como nas linhas usuais, é melhor.' }],
  ['c18', 'x', 'x', '(x)', '16 Nde2 b5 17 Nd5 Bc6 18 Bg2 Re8 19 Ne3', { a: '⩲', r: 'Myo–Tiviakov, Jacarta 1997', c: 'Depois de 16.Nde2 as brancas ficam um pouco melhor.' }],
]

const capitulo = {
  id: 'siciliana-dragao-c',
  arquivo: 'siciliana-dragao-c',
  nome: 'Siciliana Dragão — Iugoslavo, 9.O-O-O e 9.g4',
  fonte: 'Modern Chess Openings — Sicilian Defense, Dragon Variation, Yugoslav Attack, 9 0-0-0, 9 g4, Misc. (pp. 277–279), colunas 13–18',
  base: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3',
  corPadrao: 'b',
  ordem: 277,
  grupos: [
    { id: 'roque', nome: '9.O-O-O', colunas: [13, 14, 15] },
    { id: 'g4', nome: '9.g4', colunas: [16, 17] },
    { id: 'adiado', nome: '7...Nc6 (roque adiado)', colunas: [18] },
  ],
}

module.exports = { capitulo, colunas, notas }
