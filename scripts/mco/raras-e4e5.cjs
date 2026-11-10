// Transcrição do MCO 15ª ed. — Unusual Double King Pawn Openings (pp. 154–156).
// Gerar: node scripts/mco/gerar.cjs raras-e4e5
// Formato: ver gambito-do-rei.cjs. Dicas em raras-e4e5-dicas.cjs.

const HU = '1 e4 e5 2 Nf3 Nc6 3 Bc4'
const QP = '1 e4 e5 2 Nf3 d5 3 exd5 e4 4 Qe2'

const colunas = {
  c01: [`${HU} Be7 4 d4 d6 5 d5 Nb8 6 Bd3 Nf6 7 c4 O-O 8 h3 Nbd7 9 Nc3 Ne8`, 'hungara', 'Defesa Húngara: 5.d5', '⩲',
    'A Defesa Húngara, 3...Be7!?, evita as complicações do Giuoco Piano e dos Dois Cavalos. Tem fama de sólida e um pouco passiva. Depois de 4.d4 d6, com 5.d5 e c4 as brancas ganham espaço na ala da dama, num jogo que lembra a Índia do Rei.'],
  c02: [`${HU} Be7 4 d4 d6 5 Nc3 Nf6 6 h3 O-O 7 O-O a6 8 a4 exd4 9 Nxd4 Nb4`, 'hungara', 'Defesa Húngara: 5.Nc3', '⩲',
    'Com 5.Nc3 as brancas preferem um jogo de peças mais fluido. Os dois caminhos costumam dar uma pequena vantagem.'],
  c03: [`${HU} d6 4 c3 Be7 5 Qb3 Nh6 6 d4 O-O 7 Bxh6 gxh6 8 Nbd2 Na5 9 Qc2 Nxc4`, 'hungara', '3...d6', '⩲',
    '3...d6 é outra tentativa de neutralizar o esquema branco; o jogo fica agudo, com pequena vantagem branca. É um território pouco explorado.'],
  c04: [`${QP} Nf6 5 Nc3 Be7 6 Nxe4 O-O 7 d3 Nxd5 8 Qd1 Nc6 9 Be2 f5`, 'contragambito', 'Contragambito do Peão da Dama: 4...Nf6', '±',
    'O ousado Contragambito do Peão da Dama, 2...d5, é uma tentativa impaciente de tomar a iniciativa: as pretas entregam um peão, às vezes dois, para se desenvolver e desalojar a dama branca. Quase nunca é jogado em alto nível.'],
  c05: [`${QP} f5 5 d3 Nf6 6 dxe4 fxe4 7 Nc3 Bb4 8 Qb5+ c6 9 Qxb4 exf3`, 'contragambito', 'Contragambito do Peão da Dama: 4...f5', '±',
    'Com 4...f5 as pretas sustentam o peão de e4, mas as brancas ficam melhor.'],
  c06: [`1 e4 e5 2 Ne2 Nf6 3 f4 Nxe4 4 d3 Nc5 5 fxe5 d5 6 d4 Ne6 7 Nf4 c5 8 Nc3 cxd4 9 Ncxd5 Nc6`, 'alapin', 'Abertura Alapin: 2.Ne2', '=',
    'A Abertura Alapin, 2.Ne2, é uma curiosidade de um século atrás.'],
}

const notas = [
  ['c01', 'a', 'a', '(a)', '4... exd4 5 Nxd4 d6 6 Nc3 Nf6 7 O-O O-O 8 h3 Nxd4 9 Qxd4 c6 10 a4', { a: '⩲', r: 'Spassky–Hort, Reykjavik 1977', c: 'Com 4...exd4 as brancas ficam um pouco melhor.' }],
  ['c01', 'b', 'b', '(b)', '5 dxe5 dxe5 6 Qxd8+ Bxd8 7 Nc3 Nf6', { a: '⩲', r: 'van der Wiel–P. Nikolić, Malta 1980', c: 'Com 5.dxe5 as brancas buscam uma pequena vantagem no final.' }],
  ['c01-b', '1', 'b', '(b) 5...Nxe5', '5... Nxe5 6 Nxe5 dxe5 7 Qh5', { a: '±', c: 'Com 5...Nxe5 as brancas ficam melhor.' }],
  ['c01-b', '2', 'b', '(b) 6.Bd5', '6 Bd5 Bd7 7 Ng5 Bxg5 8 Qh5', { a: '⩲', r: 'Bronstein–Scherbakov, URSS 1955', c: 'Ou 6.Bd5.' }],
  ['c01', 'c', 'c', '(c)', '6 Nc3 Nf6 7 h3 c6', { a: '=', r: 'Chekover–Rabinovich, URSS 1938', c: 'Com 6.Nc3 o jogo fica igual.' }],
  ['c01', 'd', 'd', '(d)', '7... Nbd7 8 Nc3 Nf8 9 h3 Ng6 10 O-O O-O 11 Be3 Nh5 12 Re1 Nhf4 13 Bf1 f5 14 Kh2 Qe8 15 exf5 Bxf5 16 Ng1', { a: '⩲', r: 'Lukovnikov–Malevinsky, URSS 1976', c: 'Com 7...Nbd7 as brancas ficaram melhor.' }],
  ['c01', 'e', 'e', '(e)', '8 Nc3 c6 9 O-O Nbd7 10 Rb1 Re8', { a: '=', r: 'Mestel–Smyslov, Las Palmas 1982', c: 'Com 8.Nc3 o jogo fica igual.' }],
  ['c01', 'f', 'f', '(f)', '10 O-O g6 11 Bh6 Ng7 12 Qe2', { a: '⩲', r: 'Fuchs–Kholmov, URSS 1967', c: 'As brancas ficam um pouco melhor.' }],
  ['c02', 'g', 'g', '(g)', '5... Bg4 6 Bb5 exd4 7 Qxd4 Bxf3 8 gxf3 Nf6 9 Rg1 Kf8 10 Bxc6 bxc6 11 Be3', { a: '⩲', r: 'Sveshnikov–Padevski, Plovdiv 1973', c: 'Com 5...Bg4 as brancas ficam um pouco melhor.' }],
  ['c02', 'h-A', 'h', '(h) A', '7... exd4', { c: '7...exd4 transporia para Spassky–Hort, da nota (a).' }],
  ['c02', 'h-B', 'h', '(h) B', '7... h6 8 Re1 Re8 9 Be3 exd4 10 Nxd4 Bf8 11 Bf4', { a: '⩲', r: 'Tal–Filip, Miskolc 1963', c: 'Com 7...h6 as brancas ficam um pouco melhor.' }],
  ['c02', 'h-C', 'h', '(h) C', '7... Nxe4 8 Nxe4 d5 9 Bxd5 Qxd5 10 Nc3 Qd6 11 dxe5', { a: '⩲', r: 'Mariotti–Osterman, Iugoslávia 1975', c: 'Com 7...Nxe4 também.' }],
  ['c02', 'i', 'i', '(i)', '10 Nd5 Nbxd5 11 exd5', { a: '⩲', r: 'Lipnitsky–Petrosian, URSS 1951', c: 'As brancas ficam um pouco melhor.' }],
  ['c03', 'j-A', 'j', '(j) A', '3... g6 4 d4 exd4 5 c3 d3 6 O-O Bg7 7 Qb3 Qe7 8 Bg5', { a: '⩲', r: 'Macijewski–Schinzel, Lodz 1980', c: 'Com 3...g6 as brancas ficam com vantagem.' }],
  ['c03-j-A', '1', 'j', '(j) 5...dxc3', '5... dxc3 6 Nxc3 Bg7 7 Qb3', { a: '±', c: '5...dxc3 é perigoso para as pretas.' }],
  ['c03', 'j-B', 'j', '(j) B', '3... Nd4 4 Nxd4 exd4 5 c3 dxc3 6 Nxc3', { a: '±', r: 'Unzicker', c: 'Com 3...Nd4 as brancas ficam melhor.' }],
  ['c03-j-B', '1', 'j', '(j) 4.Nxe5', '4 Nxe5 Qg5 5 Bxf7+ Ke7 6 O-O Qxe5 7 Bxg8 Rxg8 8 c3', { a: '∞', c: '4.Nxe5 é especulativo.' }],
  ['c03', 'k-A', 'k', '(k) A', '4 d4 Bg4 5 h3 Bxf3 6 Qxf3 Qf6 7 Qb3 Nd8 8 dxe5', { a: '⩲', r: 'Gavrikov–Vladimirov, URSS 1978', c: 'Com 4.d4 as brancas ficam um pouco melhor. (O livro acrescenta "se 7...Nf6, 8.Qb3 ou 8.d5", o que não cabe na posição, já que a dama está em b3; foi omitido.)' }],
  ['c03', 'k-B', 'k', '(k) B', '4 O-O Be6 5 Bxe6 fxe6 6 d4 exd4 7 Nxd4', { a: '⩲', r: 'Solomon–Sarapu, Manila 1992', c: 'Com 4.O-O também.' }],
  ['c03', 'l-A', 'l', '(l) A', '4... Bg4 5 d4 Qe7 6 Be3 Nf6 7 Qb3', { a: '⩲', r: 'Levenfish–Tolush, URSS 1936', c: 'Com 4...Bg4 as brancas ficam um pouco melhor.' }],
  ['c03', 'l-B', 'l', '(l) B', '4... g6 5 O-O Bg7 6 d4 Nf6 7 dxe5 dxe5 8 Qxd8+', { a: '⩲', r: 'Bologan–Kr. Georgiev, Capelle-la-Grande 1992', c: 'Com 4...g6 também.' }],
  ['c03', 'm', 'm', '(m)', '10 Nxc4 f5 11 Ne3', { a: '⩲', r: 'Makarichev–Averbakh, URSS 1978', c: 'As brancas ficam um pouco melhor.' }],
  ['c04', 'n-A', 'n', '(n) A', '2... Qe7 3 Nc3 c6 4 d4 d6 5 Bg5 Nf6 6 Qd2', { a: '⩲', r: 'T. Georgadze–Kupreichik, URSS 1971', c: 'Outros lances raros: 2...Qe7.' }],
  ['c04', 'n-B', 'n', '(n) B', '2... f6 3 Nxe5 Qe7 4 Nf3 d5 5 d3 dxe4 6 dxe4', { a: '±', r: 'Schiffers–Chigorin, São Petersburgo 1897', c: 'A Defesa Damiano, 2...f6: as brancas ficam melhor.' }],
  ['c04', 'n-C', 'n', '(n) C', '2... c6 3 Nxe5 Nf6 4 d4 Nxe4 5 Bd3 Nf6 6 O-O Be7 7 h3', { a: '⩲', r: 'Malyutin–Bondarenko, Moscou 1991', c: 'Com 2...c6 as brancas ficam um pouco melhor.' }],
  ['c04', 'o', 'o', '(o)', '3 Nxe5 Bd6 4 d4 dxe4 5 Bc4 Bxe5 6 Qh5 Qf6 7 dxe5', { a: '⩲', c: 'Com 3.Nxe5 as brancas também ficam um pouco melhor.' }],
  ['c04', 'p', 'p', '(p)', '3... Bd6 4 d4 e4 5 Ne5 Nf6 6 Nc3 O-O 7 Bc4', { a: '±', r: 'Motwani–Rogers, Plymouth 1989', c: 'O Gambito Elefante, 3...Bd6: as brancas ficam melhor.' }],
  ['c04', 'q', 'q', '(q)', '4... Be7 5 Qxe4 Nf6 6 Bb5+ Bd7 7 Qe2', { a: '±', r: 'Morphy–Paulsen, Nova York 1857', c: 'Com 4...Be7 as brancas ficam melhor.' }],
  ['c04', 'r', 'r', '(r)', '5 d3 Be7 6 dxe4 O-O 7 Nc3 Re8 8 Bd2 Bb4 9 O-O-O', { a: '±', c: '5.d3 também é bom para as brancas.' }],
  ['c04', 's', 's', '(s)', '7 Nxf6+ Bxf6 8 d4 Re8 9 Be3', { a: '±', r: 'Khaled–Volpinar, Novi Sad 1990', c: 'Com 7.Nxf6+ as brancas ficam melhor.' }],
  ['c04', 't', 't', '(t)', '10 Ng3 Bf6 11 O-O g5 12 h3 h6 13 c3', { a: '±', r: 'Molina Barrera–De Kaey, Campeonato Mundial Universitário 2000', c: 'As brancas ficam melhor.' }],
  ['c05', 'u', 'u', '(u)', '10 Bg5 cxd5 11 O-O-O Nc6', { r: 'Tal–Lutikov, Tallinn 1964', c: 'Partida Tal–Lutikov.' }],
  ['c05-u', '1', 'u', '(u) 12.Qc5', '12 Qc5', { a: '±', c: 'Agora 12.Qc5 dá clara vantagem às brancas. (O livro escreve 12.Qe5, casa a que a dama de b4 não chega; o lance coerente é 12.Qc5.)' }],
  ['c06', 'v-A', 'v', '(v) A', '2... Bc5 3 c3 Nc6 4 d4 Bb6 5 f4 Nf6 6 fxe5 Nxe4 7 Nd2', { a: '⩲', r: 'Alapin–Halprin, Viena 1898', c: 'Com 2...Bc5 as brancas ficam um pouco melhor.' }],
  ['c06', 'v-B', 'v', '(v) B', '2... Nc6 3 Nbc3 Bc5 4 Na4 Be7 5 d4 Nf6 6 dxe5 Nxe5 7 f4 Nc6 8 e5 Ng4 9 h3 Nh6', { a: '=', r: 'Cheab–Lodhi, Novi Sad 1990', c: 'Com 2...Nc6 o jogo fica igual.' }],
  ['c06', 'w', 'w', '(w)', '3 Nbc3 Nc6 4 f4 d5 5 fxe5 Nxe4 6 d4 Bb4 7 Bd2 Bg4 8 Nxe4 dxe4 9 c3', { a: '=', r: 'Bakonyi–Exner, Hungria 1925', c: 'Com 3.Nbc3 o jogo fica igual.' }],
  ['c06', 'x-A', 'x', '(x) A', '3... exf4 4 Nxf4 d5 5 Nxd5 Nxd5 6 exd5 Qxd5 7 Nc3 Qe5+ 8 Qe2', { a: '=', r: 'Hemra–Arulaid, URSS 1948', c: 'Com 3...exf4 o jogo fica igual.' }],
  ['c06', 'x-B', 'x', '(x) B', '3... d5 4 fxe5 Nxe4 5 d3 Nc5 6 Be3 Nc6 7 d4 Ne4 8 Nd2 Bf5 9 Nxe4 Bxe4', { a: '=', r: 'Plater–Kolarov, Moscou 1956', c: 'Com 3...d5 também.' }],
  ['c06', 'y', 'y', '(y)', '6... Ne4 7 Nd2 Nxd2 8 Bxd2 Bg4', { a: '=', r: 'Keres', c: 'Com 6...Ne4 o jogo fica igual.' }],
  ['c06', 'z', 'z', '(z)', '7... Be7 8 Nc3 c6 9 Be3 O-O 10 Bd3 g6 11 Qd2', { a: '⩲', r: 'Bakony–Kostić, Špindlerův Mlýn 1948 (até 9...O-O)', c: 'Com 7...Be7, 10.Bd3 g6 11.Qd2 com a ideia de O-O-O deixa as brancas um pouco melhor.' }],
  ['c06', 'aa-A', 'aa', '(aa) A', '10 Bd2 Nxf4 11 Nxf4 Nxe5 12 Bb5+ Bd7 13 Qe2 Bd6', { a: '∓', r: 'Alapin–Rubinstein, Viena 1908', c: '10.Bd2?! é impreciso: as pretas ficam melhor.' }],
  ['c06', 'aa-B', 'aa', '(aa) B', '10 Bb5 Nxf4 11 Bxc6+ bxc6 12 Nxf4 Bb4+', { a: '=', r: 'Fine', c: 'As brancas devem jogar 10.Bb5, com chances iguais.' }],
]

const capitulo = {
  id: 'raras-e4e5',
  arquivo: 'raras-e4e5',
  nome: 'Aberturas raras de 1.e4 e5',
  fonte: 'Modern Chess Openings — Unusual Double King Pawn Openings (pp. 154–156), colunas 1–6',
  base: '1. e4 e5',
  corPadrao: 'w',
  ordem: 154,
  grupos: [
    { id: 'hungara', nome: 'Defesa Húngara e 3...d6', colunas: [1, 2, 3] },
    { id: 'contragambito', nome: 'Contragambito do Peão da Dama (2...d5)', colunas: [4, 5] },
    { id: 'alapin', nome: 'Abertura Alapin (2.Ne2)', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
