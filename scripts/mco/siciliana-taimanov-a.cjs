// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Taimanov (pp. 304–305), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs siciliana-taimanov-a
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-taimanov-a-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; a avaliação vem da nota que continua cada coluna.
// A nota (a) só comenta a ordem de lances (...a6, ...Nc6 e ...Qc7 podem vir em qualquer ordem); entrou no resumo da coluna 1.
// Nota (t) A: o livro diz só que 6...Nge7 "ameaça 7...Nxd4 8 Qxd4 Nc6"; usei 7 Bg2 como lance neutro das brancas.

const B = '1 e4 c5 2 Nf3 e6 3 d4 cxd4 4 Nxd4 Nc6 5 Nc3 a6 6 g3'

const colunas = {
  c01: [`${B} Qc7 7 Bg2 Nf6 8 O-O Be7 9 Re1 Nxd4 10 Qxd4 Bc5 11 Qd1 d6 12 Be3 Bxe3 13 Rxe3 Bd7`, 'qc7', '6...Qc7 7.Bg2 Nf6 8.O-O Be7', '±',
    'Na Taimanov as pretas jogam ...Nc6, ...a6 e ...Qc7 (em qualquer ordem) e adiam ...d6 e ...Nf6. Com 6.g3 as brancas fianquetam o bispo e pressionam o centro. Na coluna as pretas trocam os bispos de casas escuras, mas as brancas ficam melhor.'],
  c02: [`${B} Qc7 7 Bg2 Nf6 8 O-O Bc5 9 Nxc6 dxc6 10 Na4 Ba7 11 c4 Nd7 12 b4 a5 13 b5 e5`, 'qc7', '8...Bc5', '=',
    'Com 8...Bc5 o bispo vai para a diagonal a7–g1. Depois de 9.Nxc6 dxc6 10.Na4 as brancas ganham espaço na ala da dama, mas as pretas igualam.'],
  c03: [`${B} Qc7 7 Bg2 Nf6 8 O-O Nxd4 9 Qxd4 Bc5 10 Bf4 d6 11 Qd2 h6 12 Rad1 e5 13 Be3 Bg4`, 'qc7', '8...Nxd4', '⩲',
    'Com 8...Nxd4 9.Qxd4 Bc5 as pretas ganham tempo na dama, mas 10.Bf4! é um contragolpe. Na partida Fischer–Taimanov (1971) as brancas ficaram com um final melhor e venceram.'],
  c04: [`${B} Qc7 7 Bg2 Nf6 8 O-O d6 9 Re1 Be7 10 Nxc6 bxc6 11 e5 dxe5 12 Rxe5 O-O 13 Bf4 Qb7`, 'qc7', '8...d6', '⩲',
    'Com 8...d6 as pretas montam uma Scheveningen. Depois de 10.Nxc6 bxc6 11.e5 as brancas abrem o centro e ficam com a melhor estrutura de peões.'],
  c05: [`${B} d6 7 Bg2 Bd7 8 O-O Nf6 9 a4 Be7 10 Nb3 O-O 11 f4 Qc7 12 g4 d5 13 e5 Ne8`, 'outros', '6...d6', '=',
    'Com 6...d6 e 7...Bd7 as pretas jogam sem ...Qc7 cedo. As brancas avançam f4 e g4, mas 12...d5! dá contrajogo, e o jogo fica igual.'],
  c06: [`${B} Nge7 7 Nb3 d6 8 a4 Bd7 9 Bg2 Nc8 10 O-O Be7 11 Qe2 O-O 12 Be3 Qc7 13 f4 Nb4`, 'outros', '6...Nge7', '⩲',
    'Com 6...Nge7 as pretas ameaçam trocar em d4 e voltar com o cavalo para c6. As brancas evitam com 7.Nb3 e ficam um pouco melhor.'],
}

const notas = [
  // Coluna 1
  ['c01', 'b-A', 'b', '(b) A', '9 a4 O-O 10 Nb3 d6 11 f4 Bd7', { c: '9.a4 O-O 10.Nb3 d6 11.f4 Bd7 transpõe para a coluna 5.' }],
  ['c01', 'b-B', 'b', '(b) B', '9 b3 O-O 10 Bb2 d6 11 Nce2 Nxd4 12 Nxd4 e5 13 Nf5 Bxf5 14 exf5 d5', { a: '=', r: 'Parma–Matanović, Zagreb 1965', c: 'Com 9.b3 e 10.Bb2 as pretas liberam o jogo com ...e5 e ...d5!.' }],
  ['c01', 'c-A', 'c', '(c) A', '9... d6', { c: '9...d6 transpõe para a coluna 4.' }],
  ['c01', 'c-B', 'c', '(c) B', '9... O-O 10 Nxc6 dxc6 11 e5 Rd8 12 Qf3 Nd5 13 h4 Nxc3 14 Qxc3 Bd7 15 Bg5', { a: '±', r: 'Berescu–Stoma, Varsóvia 2005', c: 'Com 9...O-O 10.Nxc6 dxc6 11.e5 as brancas ganham espaço e ficam melhor.' }],
  ['c01', 'd', 'd', '(d)', '10 e5 Nb5 11 exf6 gxf6 12 Nxb5 axb5 13 Qg4 Qxc2 14 Be4 Qa4 15 Qg7', { a: '±', r: 'Gerigt–Arnold, Alemanha 1998', c: 'Aqui 10.e5 é possível; depois de 10...Nb5 11.exf6 as brancas invadem a ala do rei.' }],
  ['c01-d', '1', 'd', '(d) 10...Nc6', '10... Nc6 11 exf6 gxf6 12 Qg4', { a: '⩲', c: '10...Nc6 11.exf6 gxf6 12.Qg4 dá às brancas uma invasão na ala do rei.' }],
  ['c01-d', '2', 'd', '(d) 11...Nxc3', '11... Nxc3 12 fxg7 Rg8 13 Qd3', { a: '±', c: '11...Nxc3 12.fxg7 Rg8 13.Qd3 também deixa as brancas melhor.' }],
  ['c01', 'e', 'e', '(e)', '11 Bf4 d6 12 Qd2 e5 13 Bg5 Ng4 14 Nd5 Qc6 15 Rf1 h6 16 h3 Be6 17 hxg4 hxg5', { a: '=', r: 'Tal–Barlov, Sochi 1984', c: '11.Bf4 d6 12.Qd2 leva a um jogo igual.' }],
  ['c01', 'f', 'f', '(f)', '14 Rd3 Ke7 15 Qd2 Bc6 16 Rd1', { a: '±', r: 'Korneev–Chebotarev, Moscou 2006', c: 'Com 14.Rd3 e as torres na coluna d as brancas pressionam o peão d6 e ficam melhor.' }],
  // Coluna 2
  ['c02', 'g-A', 'g', '(g) A', '9 Bf4 e5 10 Nb3 exf4 11 Nxc5 fxg3 12 hxg3 d6 13 Nd3 Be6', { a: '=', r: 'Vogt–Moor, Copa Europeia de Clubes 2006', c: '9.Bf4 e5 10.Nb3 exf4 leva a um jogo igual.' }],
  ['c02', 'g-B', 'g', '(g) B', '9 Nb3 Ba7 10 Kh1 d6 11 f4 h5 12 h3 Bd7', { a: '=', r: 'de Firmian–Benjamin, Campeonato dos EUA 1995', c: 'Com 9.Nb3 Ba7 10.Kh1 as pretas respondem com ...d6 e ...h5 e igualam.' }],
  ['c02-g-B', '1', 'g', '(g) B 10.Bg5', '10 Bg5 Ne5', { a: '=', c: '10.Bg5 Ne5 também é igual.' }],
  ['c02', 'g-C', 'g', '(g) C', '9 Be3 Ne5 10 h3 b5', { a: '=', r: 'de Firmian–Sjöberg, Estocolmo 1998', c: '9.Be3 Ne5 10.h3 b5 é igual.' }],
  ['c02', 'h', 'h', '(h)', '12... b5 13 Nb2 c5 14 bxc5 Bxc5 15 Qg4 Kf8 16 Nd3', { a: '±', r: 'Tiviakov–Liang, Pequim 1997', c: '12...b5?! 13.Nb2 c5 deixa as brancas melhor.' }],
  ['c02', 'i', 'i', '(i)', '14 Rb1 Bd4 15 Bb2 c5 16 Bxd4 cxd4 17 c5 Nxc5 18 Rc1 b6 19 Qc2 Be6 20 Nxc5 bxc5 21 Qxc5 Qxc5 22 Rxc5 Bxa2 23 Rxe5+ Be6', { a: '=', r: 'Souleidis–Skripchenko, Bundesliga 2004', c: 'Depois de 14.Rb1 Bd4 as peças se trocam e o final é igual.' }],
  // Coluna 3
  ['c03', 'j', 'j', '(j)', '8... h6 9 Re1 Nxd4 10 e5 Nb5 11 Nxb5 axb5 12 exf6 gxf6 13 c3 d6 14 Be3 Bd7 15 Qf3', { a: '±', r: 'de Firmian–Rohde, Nova York 1988', c: 'Com 8...h6 9.Re1 Nxd4 10.e5! as brancas recuperam o peão com 15.Qf3 e ficam com posição superior.' }],
  ['c03', 'k', 'k', '(k)', '10... Bxd4 11 Bxc7 d5 12 exd5 Bxc3 13 bxc3 Nxd5 14 Be5 f6 15 c4', { a: '±', r: 'Honfi–Kozma, Wijk aan Zee 1969', c: 'Depois de 10...Bxd4 11.Bxc7 d5 12.exd5 as pretas ficam com um final ruim.' }],
  ['c03', 'l-A', 'l', '(l) A', '13... Ke7 14 Bxc5 Qxc5 15 Na4 Qc6 16 f4 a5 17 Qd3 b5 18 Nc3 Be6 19 Qxb5 Qxb5 20 Nxb5 Bc4 21 Nxd6 Bxf1 22 Nf5+', { a: '±', r: 'Kotronias–Damjanović, Belgrado 1993', c: 'Se 13...Ke7, então 16.f4! e 19.Qxb5! deixam as brancas claramente na frente.' }],
  ['c03', 'l-B', 'l', '(l) B', '14 Bxc5 dxc5 15 f3 Be6 16 f4 Rd8 17 Nd5 Bxd5 18 exd5 e4 19 Rfe1 Rxd5 20 Rxe4+ Kd8 21 Qe2 Rxd1+ 22 Qxd1+ Qd7 23 Qxd7+ Kxd7 24 Re5', { a: '⩲', r: 'Fischer–Taimanov, match 1971', c: 'Depois de 13...Bg4 14.Bxc5 dxc5 as brancas ficam melhor no final; Fischer converteu a vantagem de forma brilhante.' }],
  // Coluna 4
  ['c04', 'm-A', 'm', '(m) A', '9... Rb8 10 Nxc6 bxc6 11 e5 d5 12 Ne2 c5 13 c4 d4 14 Nf4 g6 15 Nd3', { a: '±', r: 'Tiviakov–Plachetka, Torcy 1991', c: 'Com 9...Rb8 10.Nxc6 bxc6 11.e5 d5 12.Ne2! as brancas ficam melhor.' }],
  ['c04', 'm-B', 'm', '(m) B', '9... Bd7 10 Nxc6 bxc6 11 Na4 Rb8 12 c4 c5 13 Nc3 Be7 14 Bf4 e5 15 Bc1', { a: '±', r: 'Kavalek–García González, Olimpíada de Buenos Aires 1978', c: 'Com 9...Bd7 10.Nxc6 bxc6 11.Na4 as brancas também ficam melhor.' }],
  ['c04-m-B', '1', 'm', '(m) B 14...Rxb2', '14... Rxb2 15 e5', { c: '14...Rxb2 15.e5! é bom para as brancas.' }],
  ['c04', 'n', 'n', '(n)', '12... Nd5 13 Nxd5 cxd5 14 Bf4 Bd6 15 Qxd5', { a: '±', c: '12...Nd5 13.Nxd5 cxd5 14.Bf4 Bd6 15.Qxd5! deixa as brancas melhor.' }],
  ['c04', 'o', 'o', '(o)', '14 Na4 Nd5 15 Bd2 Bf6 16 Re2', { a: '⩲', r: 'A. Ivanov–Ashley, Filadélfia 1989', c: 'Com 14.Na4 as brancas ficam com a melhor estrutura de peões.' }],
  // Coluna 5
  ['c05', 'p', 'p', '(p)', '8... Qc7 9 Nxc6 Bxc6 10 Re1 Be7 11 Bf4 Nf6 12 e5 dxe5 13 Bxe5 Qc8 14 Ne4 Nxe4 15 Bxe4 Bxe4 16 Rxe4', { a: '±', r: 'Sutovsky–Brodsky, Groningen 1993', c: 'Com 8...Qc7 9.Nxc6 Bxc6 10.Re1 as brancas abrem o centro com e5 e ficam melhor.' }],
  ['c05', 'q', 'q', '(q)', '9 Re1 Be7 10 Nxc6 Bxc6 11 e5 dxe5 12 Bxc6+ bxc6', { a: '=', c: '9.Re1 Be7 10.Nxc6 Bxc6 11.e5 dxe5 12.Bxc6+ bxc6 é igual.' }],
  ['c05-q', '1', 'q', '(q) 11.a4', '11 a4 O-O 12 a5 Nd7 13 Be3 Qc7 14 Na4 Rae8', { a: '=', c: '11.a4 O-O 12.a5 Nd7 13.Be3 Qc7 14.Na4 Rae8! também é igual.' }],
  ['c05', 'r', 'r', '(r)', '13 exd5 Nb4 14 dxe6 Bxe6', { c: '13.exd5 Nb4! 14.dxe6 Bxe6 dá às pretas grande atividade pelo peão.' }],
  ['c05', 's', 's', '(s)', '14 Be3 Bb4 15 Ne2 f6 16 c3 Be7 17 exf6 Nxf6 18 Ng3 Bd6', { a: '=', r: 'de Firmian–Zviagintsev, Biel 1995', c: 'Com 14.Be3 Bb4 15.Ne2 f6! as pretas liberam o jogo e igualam.' }],
  // Coluna 6
  ['c06', 't-A', 't', '(t) A', '7 Bg2 Nxd4 8 Qxd4 Nc6', { a: '=', c: '6...Nge7 ameaça 7...Nxd4 8.Qxd4 Nc6, ganhando tempo na dama, com igualdade.' }],
  ['c06', 't-B', 't', '(t) B', '6... Nxd4 7 Qxd4 Ne7 8 Bf4 Nc6 9 Qd2 b5 10 Bg2 Bb7 11 O-O Be7 12 Rfd1 Na5 13 b3 Rc8 14 Ne2 O-O 15 c3 Bc6 16 Nd4', { a: '⩲', r: 'A. Ivanov–Christiansen, Campeonato dos EUA 1994', c: 'A troca imediata 6...Nxd4 7.Qxd4 Ne7 deixa as brancas com uma pequena vantagem.' }],
  ['c06', 'u-A', 'u', '(u) A', '7... Na5 8 Qh5 Nec6 9 Bg5 Qc7 10 Bf4 d6 11 Nxa5 Nxa5 12 O-O-O', { a: '±', r: 'Timman–Andersson, Tallinn 1973', c: 'Com 7...Na5 8.Qh5! as brancas ficam melhor.' }],
  ['c06', 'u-B', 'u', '(u) B', '7... b5 8 Bg2 Qc7 9 Be3 Bb7 10 f4', { a: '⩲', c: '7...b5 8.Bg2 Qc7 9.Be3 Bb7 10.f4 deixa as brancas um pouco melhor.' }],
  ['c06', 'v', 'v', '(v)', '14 Qf2 Rb8 15 Rfd1', { a: '⩲', r: 'Tiviakov–Romanishin, Istambul 2003', c: 'Depois de 14.Qf2 Rb8, 15.Rfd1 dá às brancas uma pequena vantagem.' }],
]

const capitulo = {
  id: 'siciliana-taimanov-a',
  arquivo: 'siciliana-taimanov-a',
  nome: 'Siciliana Taimanov — 6.g3',
  fonte: 'Modern Chess Openings — Sicilian Defense, Taimanov Variation (pp. 304–305), colunas 1–6',
  base: '1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6 5. Nc3 a6 6. g3',
  corPadrao: 'b',
  ordem: 304,
  grupos: [
    { id: 'qc7', nome: '6...Qc7', colunas: [1, 2, 3, 4] },
    { id: 'outros', nome: '6...d6 e 6...Nge7', colunas: [5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
