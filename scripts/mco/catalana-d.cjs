// Transcrição do MCO 15ª ed. — Abertura Catalã, Variante Aberta com 5...a6 (pp. 526–527), colunas 19–24.
// Gerar: node scripts/mco/gerar.cjs catalana-d
// Formato: ver gambito-do-rei.cjs. Dicas em catalana-d-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; usamos a avaliação da nota que continua a coluna.
// A nota (k) não tem lances (só "a posição é mais ou menos igual"): entrou no resumo da coluna 22.
// Correção: a nota (b) traz "8 Nxc6 Qb69 9 Ne5"; o "9" grudado foi tirado (8.Nxc6 Qb6 9.Ne5).

const A = '1 d4 Nf6 2 c4 e6 3 g3 d5 4 Bg2 dxc4 5 Nf3 a6'
const B = `${A} 6 O-O b5 7 Ne5 Nd5 8 a4 Bb7`
const C = `${A} 6 O-O Nc6 7 e3 Bd7`

const colunas = {
  c19: [`${B} 9 b3 c3 10 axb5 axb5 11 Rxa8 Bxa8 12 e4 Nf6 13 Nxc3 b4`, 'b5', '6.O-O b5 7.Ne5 Nd5 8.a4 Bb7 9.b3 c3', '∞',
    'Com 5...a6 as pretas preparam ...b5 para segurar o peão de c4. Depois de 6.O-O b5 7.Ne5 Nd5 8.a4 Bb7 9.b3 as brancas atacam logo a corrente de peões. Com 9...c3 10.axb5 axb5 11.Rxa8 Bxa8 12.e4 Nf6 13.Nxc3 b4 as pretas mantêm um peão a mais, mas depois de 14.Nb5! as brancas têm ótima compensação.'],
  c20: [`${B} 9 b3 cxb3 10 Qxb3 Nc6 11 Rd1 Bd6 12 Nxc6 Bxc6 13 e4 bxa4`, 'b5', '9...cxb3', '∞',
    'Com 9...cxb3 10.Qxb3 Nc6 as pretas devolvem a estrutura e se desenvolvem. Depois de 11.Rd1 Bd6 12.Nxc6 Bxc6 13.e4 bxa4 as pretas ficam com um peão a mais, mas as brancas têm iniciativa; a posição é pouco clara.'],
  c21: [`${B} 9 axb5 axb5 10 Rxa8 Bxa8 11 e4 Nf6 12 Nc3 c6 13 d5 Be7`, 'b5', '9.axb5', '±',
    'Com 9.axb5 axb5 10.Rxa8 Bxa8 11.e4 Nf6 12.Nc3 c6 13.d5 as brancas abrem o centro contra o rei preto, que ainda não rocou. Depois de 13...Be7 14.dxe6 fxe6 as brancas ficam bem melhor.'],
  c22: [`${C} 8 Qe2 b5 9 Rd1 Be7 10 e4 O-O 11 Nc3 Re8 12 Ne5 Rb8 13 Be3 Bf8`, 'nc6', '6.O-O Nc6 7.e3 Bd7 8.Qe2', '=',
    'Com 6...Nc6 as pretas pressionam d4 e deixam ...b5 para depois. Depois de 7.e3 Bd7 8.Qe2 b5 9.Rd1 Be7 10.e4 O-O 11.Nc3 Re8 12.Ne5 Rb8 13.Be3 Bf8 a posição é mais ou menos igual: as brancas têm compensação pelo peão (K. Urban–Dautov, Pula 1997).'],
  c23: [`${C} 8 Nc3 Bd6 9 Qe2 b5 10 Rd1 O-O 11 e4 e5 12 dxe5 Nxe5 13 Nxe5 Bxe5`, 'nc6', '8.Nc3', '=',
    'Com 8.Nc3 Bd6 9.Qe2 b5 10.Rd1 O-O 11.e4 as brancas montam o centro. Com 11...e5 12.dxe5 Nxe5 13.Nxe5 Bxe5 as pretas trocam peças e ficam com o peão de c4; o jogo é igual.'],
  c24: [`${A} 6 Ne5 c5 7 Na3 cxd4 8 Naxc4 Be7 9 Bd2 a5 10 Qb3 Nbd7 11 Bxb7 a4 12 Qf3 Bxb7 13 Qxb7 Nxe5`, 'ne5', '6.Ne5', '=',
    'Com 6.Ne5 as brancas adiam o roque e vão recuperar o peão de c4. Depois de 6...c5 7.Na3 cxd4 8.Naxc4 Be7 9.Bd2 a5 10.Qb3 Nbd7 11.Bxb7 a4 12.Qf3 Bxb7 13.Qxb7 Nxe5 as pretas trocam peças e conseguem igualar.'],
}

const notas = [
  // Coluna 19
  ['c19', 'a', 'a', '(a)', '6... c5 7 dxc5 Qxd1 8 Rxd1 Bxc5 9 Ne5', { a: '±', r: 'Razuvaev–Geller, URSS 1988', c: '6...c5 7.dxc5 Qxd1 8.Rxd1 Bxc5 9.Ne5 é melhor para as brancas.' }],
  ['c19', 'b', 'b', '(b)', '7... c6 8 b3 cxb3 9 Nxc6 Qb6 10 Na5 Ra7 11 Nxb3 Rd7 12 e4', { a: '±', r: 'Krasenkow–Kohlweyer, Ostende 1996', c: '7...c6 8.b3 cxb3 9.Nxc6 Qb6 10.Na5 Ra7 11.Nxb3 Rd7 12.e4 é melhor para as brancas.' }],
  ['c19-b', '1', 'b', '(b) 8.Nxc6', '8 Nxc6 Qb6 9 Ne5 Bb7 10 a4 Bxg2 11 Kxg2 Qb7+ 12 Kg1 Nbd7', { a: '=', r: 'Cebalo–Sveshnikov, Atenas 1983', c: '8.Nxc6 Qb6 9.Ne5 Bb7 10.a4 Bxg2 11.Kxg2 Qb7+ 12.Kg1 Nbd7 é igual.' }],
  ['c19', 'c', 'c', '(c)', '8 Nc3 Bb7 9 Nxd5 exd5', { a: '=', c: 'Depois de 8.Nc3 Bb7 9.Nxd5 exd5, nem 10.e4 nem 10.b3 dão vantagem às brancas.' }],
  ['c19', 'd', 'd', '(d)', '12... b4 13 exd5 Bxd5 14 Bxd5 Qxd5 15 Qd3 Bd6', { a: '=', r: 'Aaberg–Kaidanov, Gibraltar 2007', c: 'Provavelmente o melhor é o sacrifício 12...b4! 13.exd5 Bxd5 14.Bxd5 Qxd5 15.Qd3 Bd6, com chances mais ou menos iguais.' }],
  ['c19', 'e', 'e', '(e)', '14 Nb5 c6 15 d5 cxb5 16 dxe6 Qxd1 17 exf7+ Ke7 18 Rxd1', { a: '∞', r: 'Vladimirov–Thórhallsson, Gausdal 1991', c: '14.Nb5 c6 15.d5 cxb5 16.dxe6 foi a partida. Depois de 16...Qxd1 17.exf7+ Ke7 18.Rxd1 as brancas têm ótima compensação (Vladimirov).' }],
  // Coluna 20
  ['c20', 'f', 'f', '(f)', '10 axb5 axb5 11 Rxa8 Bxa8 12 Qxb3 c6 13 Nc3 Nd7', { a: '=', c: '10.axb5 axb5 11.Rxa8 Bxa8 12.Qxb3 c6 13.Nc3 Nd7 é igual.' }],
  ['c20', 'g', 'g', '(g)', '14 Qf3 Ne7 15 Qg4 Ng6 16 d5', { a: '∞', r: 'Gelfand–Riemersma, Arnhem 1987', c: 'Depois de 14.Qf3 Ne7 15.Qg4 o correto é 15...Ng6 16.d5, com posição pouco clara.' }],
  ['c20-g', '1', 'g', '(g) 15...O-O', '15... O-O 16 e5', { a: '±', c: '15...O-O? 16.e5 é melhor para as brancas.' }],
  // Coluna 21
  ['c21', 'h', 'h', '(h)', '12... b4 13 Qa4+ Nbd7 14 Nb5', { a: '±', c: '12...b4 é ruim por causa de 13.Qa4+ Nbd7 14.Nb5 (Dunnington).' }],
  ['c21', 'i-A', 'i', '(i) A', '13... exd5 14 exd5 Nxd5 15 Qh5', { a: '±', c: 'Em vez de 13...Be7, 13...exd5 14.exd5 Nxd5 15.Qh5 é forte para as brancas.' }],
  ['c21', 'i-B', 'i', '(i) B', '13... Bd6 14 Ng4 b4 15 Nxf6+ gxf6 16 Nb1', { a: '±', r: 'Romero–Antunes, Havana 1991', c: 'Também 13...Bd6 14.Ng4 b4 15.Nxf6+ gxf6; agora 16.Nb1 seria melhor para as brancas.' }],
  ['c21', 'i-C', 'i', '(i) C', '14 dxe6 fxe6 15 Qe2 O-O 16 Bh3 Qe8 17 Bxe6+ Kh8 18 Bf5', { a: '±', r: 'Krasenkow–Kaidanov, Gausdal 1991', c: 'Depois de 13...Be7 14.dxe6 fxe6 15.Qe2 O-O 16.Bh3 Qe8 17.Bxe6+ Kh8 18.Bf5 as brancas têm uma vantagem significativa.' }],
  ['c21-i-C', '1', 'i', '(i) C 16...Qc8', '16... Qc8 17 Nf3', { a: '±', r: 'Zilberstein–Novikov, URSS 1988', c: '16...Qc8 17.Nf3 também é melhor para as brancas.' }],
  // Coluna 22
  ['c22', 'j', 'j', '(j)', '10 Nc3 O-O 11 Ne5 Qe8 12 b3 Nd5 13 Bxd5 exd5 14 Nxd5 Nxe5 15 dxe5 Ra7 16 bxc4', { a: '±', r: 'Aronian–Carlsen, Morelia/Linares 2007', c: '10.Nc3 O-O 11.Ne5 Qe8 12.b3 Nd5!? 13.Bxd5 exd5 14.Nxd5 Nxe5 15.dxe5 Ra7 16.bxc4 é melhor para as brancas. A linha é complicada e pode haver melhorias.' }],
  // Coluna 23
  ['c23', 'l', 'l', '(l)', '8... Rb8 9 Ne5 Na5', { a: '∞', r: 'Gulko–Korneev, Mondariz 1997', c: '8...Rb8 9.Ne5 Na5: o espaço e a iniciativa central das brancas compensam o peão.' }],
  ['c23', 'm', 'm', '(m)', '9 Ne5 Bxe5 10 dxe5 Nxe5 11 Bxb7 Rb8 12 Bg2 O-O 13 Qd4', { a: '⩲', r: 'Tibensky–Haba, República Tcheca 1991', c: '9.Ne5 Bxe5 10.dxe5 Nxe5 11.Bxb7 Rb8 12.Bg2 foi a partida; agora 12...O-O 13.Qd4 é um pouco melhor para as brancas.' }],
  ['c23-m', '1', 'm', '(m) 12.f4', '12 f4 Nd3 13 Bxa6 Nxb2', { a: '∓', r: 'Bouwmeester–Oim, por correspondência 1993', c: '12.f4 Nd3 13.Bxa6 Nxb2 é melhor para as pretas.' }],
  ['c23', 'n', 'n', '(n)', '10 a4 Rb8 11 e4 Be7', { a: '=', r: 'Neishtadt–Oim, por correspondência 1990', c: '10.a4 Rb8 11.e4 Be7 é igual.' }],
  ['c23', 'o', 'o', '(o)', '14 Bg5 c6 15 Bxf6 gxf6 16 f4 Bxc3 17 bxc3 Qe7', { a: '=', r: 'Razuvaev–A. Petrosian, Tashkent 1994', c: '14.Bg5 c6 15.Bxf6 gxf6 16.f4 Bxc3 17.bxc3 Qe7 e empate combinado. As fraquezas na ala do rei das pretas são compensadas pelo peão a mais.' }],
  ['c23-o', '1', 'o', '(o) 16.Bh3', '16 Bh3 Bxh3', { a: '∓', r: 'Sterud–Neishtadt, por correspondência 1990', c: '16.Bh3? Bxh3 é melhor para as pretas.' }],
  // Coluna 24
  ['c24', 'p', 'p', '(p)', '7 Be3 Nd5 8 dxc5 Nd7', { a: '=', c: 'Depois de 7.Be3 Nd5 8.dxc5 Nd7, nem 9.Nxc4 nem 9.Bd4 dão vantagem às brancas.' }],
  ['c24', 'q', 'q', '(q)', '7... Qxd4 8 Qxd4 cxd4 9 Naxc4 Nfd7', { a: '=', r: 'Ehlvest–Azmaiparashvili, Liepaja 2006', c: '7...Qxd4!? 8.Qxd4 cxd4 9.Naxc4 Nfd7 foi bom para as pretas.' }],
  ['c24', 'r', 'r', '(r)', '14 Nxe5 Qd5 15 Qc6+ Qxc6 16 Nxc6 Bc5 17 Rc1 Bb6', { a: '=', r: 'I. Almasi–Vadasz, Budapeste 1997', c: '14.Nxe5 Qd5 15.Qc6+ Qxc6 16.Nxc6 foi a partida; agora as pretas igualam com 16...Bc5 17.Rc1 Bb6.' }],
]

const capitulo = {
  id: 'catalana-d',
  arquivo: 'catalana-d',
  nome: 'Catalã — Aberta com 5...a6',
  fonte: 'Modern Chess Openings — Catalan Opening (pp. 526–527), colunas 19–24',
  base: '1. d4 Nf6 2. c4 e6 3. g3',
  corPadrao: 'w',
  ordem: 526,
  grupos: [
    { id: 'b5', nome: '6.O-O b5', colunas: [19, 20, 21] },
    { id: 'nc6', nome: '6.O-O Nc6', colunas: [22, 23] },
    { id: 'ne5', nome: '6.Ne5', colunas: [24] },
  ],
}

module.exports = { capitulo, colunas, notas }
