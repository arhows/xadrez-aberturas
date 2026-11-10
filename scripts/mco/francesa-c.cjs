// Transcrição do MCO 15ª ed. — Defesa Francesa, Variante Rubinstein (pp. 212–213), colunas 19–24.
// Gerar: node scripts/mco/gerar.cjs francesa-c
// Formato: ver gambito-do-rei.cjs. Dicas em francesa-c-dicas.cjs.
// O livro dá 3 Nc3 (ou 3 Nd2) dxe4 4 Nxe4; aqui segue 3 Nc3.

const RB = '1 e4 e6 2 d4 d5 3 Nc3 dxe4 4 Nxe4'
const NF = `${RB} Nd7 5 Nf3 Ngf6 6 Nxf6+ Nxf6`

const colunas = {
  c19: [`${NF} 7 Bg5 h6 8 Bxf6 Qxf6 9 Bb5+ c6 10 Bd3 Bd7 11 c3 Bd6 12 Qe2 c5`, 'ngf6', '7.Bg5 h6', '=',
    'Na Rubinstein as pretas trocam em e4 e desenvolvem com ...Nd7 e ...Ngf6, aceitando um pouco menos de espaço em troca de uma posição sólida. Com 7.Bg5 h6 8.Bxf6 as brancas buscam uma pequena vantagem, mas as pretas igualam.'],
  c20: [`${NF} 7 Bg5 c5 8 Bb5+ Bd7 9 Bxd7+ Qxd7 10 Qe2 Be7 11 O-O-O O-O 12 dxc5 Qc6`, 'ngf6', '7.Bg5 c5', '=',
    'Com 7...c5 as pretas atacam o centro de imediato; depois dos roques em lados opostos a posição fica igual.'],
  c21: [`${NF} 7 Bd3 c5 8 dxc5 Bxc5 9 Qe2 Qc7 10 Bd2 O-O 11 O-O-O b6 12 Ne5 Bb7`, 'ngf6', '7.Bd3 c5', '=',
    'Com 7.Bd3 o bispo mira o roque preto; as pretas respondem com ...c5, fianqueto da dama e igualam.'],
  c22: [`${NF} 7 Bd3 Be7 8 Qe2 O-O 9 Bg5 c5 10 dxc5 Qa5+ 11 c3 Qxc5 12 O-O-O g6`, 'ngf6', '7.Bd3 Be7', '±',
    'Com 7...Be7 as pretas rocam primeiro; as brancas rocam grande e atacam com h4–h5: vantagem das brancas.'],
  c23: [`${RB} Nd7 5 Nf3 Be7 6 Bd3 Ngf6 7 Qe2 O-O 8 O-O b6 9 Nxf6+ Nxf6 10 c4 Bb7 11 Rd1 Qe8 12 Bd2 Rd8`, 'be7', '5...Be7', '⩲',
    'Com 5...Be7 as pretas adiam ...Ngf6; as brancas mantêm o centro com c4 e ficam um pouco melhor.'],
  c24: [`${RB} Bd7 5 Nf3 Bc6 6 Bd3 Nd7 7 O-O Ngf6 8 Ng3 Be7 9 b3 O-O 10 Bb2 Bxf3 11 Qxf3 c6 12 c4 Re8`, 'fortknox', 'Fort Knox (4...Bd7)', '⩲',
    'Na Variante Fort Knox o bispo de c8 sai por d7 e c6 e se troca pelo cavalo de f3. A posição preta é muito sólida, mas as brancas ficam com o par de bispos e um pouco melhor.'],
}

const notas = [
  // Coluna 19
  ['c19', 'a-A', 'a', '(a) A', '6 Bd3 Nxe4 7 Bxe4 Nf6 8 Bg5 Qd6 9 Bxf6 gxf6 10 c3 Bg7 11 Qe2 c6 12 Nd2 Bd7 13 O-O-O O-O-O 14 Kb1', { a: '⩲', r: 'Kobalia–Zhang Zhong, Sibéria 2005', c: 'Com 6.Bd3 Nxe4 7.Bxe4 Nf6 8.Bg5 Qd6! as brancas ficam só um pouco melhor. 8.Bd3 transpõe para a coluna 21.' }],
  ['c19', 'a-B', 'a', '(a) B', '6 Bg5 Be7', { c: '6.Bg5 Be7 transpõe para a Variante Burn, coluna 18; já 6.Bg5 h6 7.Nxf6+ Nxf6 é esta coluna.' }],
  ['c19', 'b-A', 'b', '(b) A', '8 Bh4 c5 9 Bb5+ Bd7 10 Bxd7+ Qxd7 11 Qe2 cxd4 12 O-O-O Bc5 13 Qe5 Rc8 14 Bxf6 gxf6 15 Qxf6 Rg8', { a: '∓', r: 'Stein–Akobian, Los Angeles 2005', c: 'A troca simples em f6 busca uma pequena vantagem. Com 8.Bh4 c5 9.Bb5+ as pretas ficam melhor depois de 13...Rc8!.' }],
  ['c19', 'b-B', 'b', '(b) B', '8 Bh4 c5 9 Ne5 Qa5+ 10 c3 cxd4 11 Qxd4 Bc5', { a: '=', r: 'Topalov–Milov, Ajaccio 2004', c: 'Com 9.Ne5 Qa5+ fica igual.' }],
  ['c19', 'b-C', 'b', '(b) C', '8 Bh4 c5 9 Bc4 cxd4 10 O-O Be7 11 Qe2 O-O 12 Rad1', { c: 'Depois de 8.Bh4 c5, 9.Bc4 talvez seja a melhor chance das brancas.' }],
  ['c19', 'c', 'c', '(c)', '10... g6 11 c3 Bg7 12 Qe2 O-O 13 O-O Rd8 14 Rad1 Bd7 15 Ne5', { a: '±', r: 'Smyslov–Dolmatov, Rostov 1993', c: 'Com 10...g6 as brancas ficam melhor.' }],
  ['c19', 'd', 'd', '(d)', '13 O-O cxd4 14 cxd4 Qe7 15 Ne5 Bxe5 16 dxe5 Bc6', { a: '=', r: 'Anand–Ivanchuk, Monte Carlo 2004', c: 'Depois de 13.O-O fica igual.' }],
  // Coluna 20
  ['c20', 'e', 'e', '(e)', '8 Bc4 cxd4 9 O-O Be7 10 Qe2 h6 11 Bf4 O-O 12 Rad1 Bd7 13 Rxd4', { r: 'Tal–Portisch e Tal–Benko', c: 'Fora de moda, mas ainda perigoso, é o 8.Bc4 de Tal, que sacrifica um peão pelo ataque. Recomendado só para jogadores de ataque.' }],
  ['c20-e', '1', 'e', '(e) 9...Bc5!?', '9... Bc5', { c: 'Também se joga 9...Bc5!?.' }],
  ['c20', 'f', 'f', '(f)', '10 Bxf6 gxf6 11 c3 cxd4 12 Nxd4 Bc5 13 Qf3 O-O-O', { a: '=', r: 'Spassky–Petrosian, Campeonato Mundial 1966', c: 'Com 10.Bxf6 gxf6 fica igual.' }],
  ['c20', 'g', 'g', '(g)', '10... cxd4 11 O-O-O Bc5 12 Qe5 Be7 13 Nxd4 Rc8 14 f4 O-O 15 Nf5 Qc7 16 Nxe7+ Qxe7 17 Rd2', { a: '±', r: 'Fischer–Sarapu, Sousse 1967', c: '10...cxd4?! deixa as brancas melhor.' }],
  ['c20', 'h', 'h', '(h)', '13 Kb1 Qxc5 14 Ne5 Rfd8 15 Bxf6 Bxf6 16 Nd7 Qe7 17 Qb5 a6', { a: '=', r: 'Timman–Korchnoi, Lucerna 1989 (até 16.Nd7)', c: 'Depois de 13.Kb1 Qxc5 14.Ne5 Rfd8 15.Bxf6 Bxf6 16.Nd7 Qe7 17.Qb5 a6! fica igual, segundo Timman.' }],
  ['c20-h', '1', 'h', '(h) 18.Qxb7?', '18 Qxb7 Rdb8', { a: '-+', c: '18.Qxb7? Rdb8 ganha para as pretas: a dama fica presa.' }],
  // Coluna 21
  ['c21', 'i', 'i', '(i)', '7 Ne5 a6 8 Be3 c5 9 dxc5 Qa5+ 10 c3 Bxc5 11 Nc4 Qc7', { a: '=', r: 'Radulski–Jeremic, Liga Sérvia 2006', c: 'Com 7.Ne5 também fica igual.' }],
  ['c21', 'j', 'j', '(j)', '8 O-O cxd4 9 Nxd4 Bc5 10 c3 Bxd4 11 cxd4 Bd7', { a: '=', r: 'Gallego–Bareev, Internet 2004', c: 'Com 8.O-O fica igual.' }],
  ['c21', 'k', 'k', '(k)', '9 O-O O-O 10 Qe2 Qc7 11 Bg5 b6 12 Ne5 Bb7 13 Bxf6 gxf6 14 Bxh7+ Kxh7 15 Qh5+', { a: '=', r: 'Ivanchuk–Karpov, Las Palmas 1996', c: 'Com 9.O-O O-O 10.Qe2 Qc7 11.Bg5 b6! fica igual; a partida terminou em xeque perpétuo.' }],
  ['c21', 'l', 'l', '(l)', '13 f4 Nd5 14 Kb1 f6 15 Nf3 Nxf4 16 Bxf4 Qxf4 17 Qxe6+ Kh8', { a: '=', r: 'Topalov–Nogueiras, Olimpíada de Yerevan 1996', c: 'Depois de 13.f4 fica igual.' }],
  // Coluna 22
  ['c22', 'm', 'm', '(m)', '7... b6 8 Qe2 Bb7 9 Bg5 Be7 10 O-O-O O-O 11 h4', { r: 'Bronstein–Kan, Moscou 1947', c: 'Com 7...b6 as brancas rocam grande e têm chances de ataque.' }],
  ['c22', 'n', 'n', '(n)', '8 O-O O-O 9 Qe2 b6 10 Bg5 Bb7 11 Rad1', { r: 'Szabo–Snaevarr, Munique 1936', c: 'Menos agressivo é 8.O-O, mas mesmo assim as brancas mantêm chances de ataque.' }],
  ['c22', 'o', 'o', '(o)', '13 h4 b6 14 h5 Bb7 15 hxg6 hxg6 16 Be3 Qa5 17 Bd4', { a: '±', r: 'Kupreichik–Kataev, Sverdlovsk 1984', c: 'Com 13.h4 as brancas abrem a coluna h e ficam melhor.' }],
  // Coluna 23
  ['c23', 'p-A', 'p', '(p) A', '6 c4 Ngf6 7 Nc3 O-O 8 Bd3 c5 9 O-O cxd4 10 Nxd4', { a: '±', r: 'Sax–Ree, Amsterdã 1984', c: 'As brancas têm outras boas escolhas. Com 6.c4 elas ficam melhor.' }],
  ['c23', 'p-B', 'p', '(p) B', '6 Bf4 Ngf6 7 Nxf6+ Nxf6 8 Bd3 c5 9 dxc5 Qa5+ 10 c3 Qxc5 11 O-O', { a: '⩲', r: 'Oll–Tal, Sevilha 1992', c: 'Com 6.Bf4 as brancas ficam um pouco melhor.' }],
  ['c23', 'q-A', 'q', '(q) A', '7... Nxe4 8 Qxe4 c5 9 Qg4 Bf6 10 Be3 cxd4 11 Bxd4 Bxd4 12 Qxd4 Qf6 13 Qb4', { a: '±', r: 'Svidler–Haba, Olimpíada de Yerevan 1996', c: 'Com 7...Nxe4 as brancas ficam melhor.' }],
  ['c23', 'q-B', 'q', '(q) B', '7... c5 8 Nxf6+ Bxf6 9 d5 Nb6 10 Bb5+ Kf8 11 dxe6 Bxe6 12 a4', { a: '±', r: 'Timman–Granda Zúñiga, Amsterdã 1995', c: 'Com 7...c5 vem 9.d5!, e as brancas ficam melhor.' }],
  ['c23', 'r', 'r', '(r)', '13 Bc3 Nd7 14 h4 c5 15 Bc2', { a: '⩲', r: 'Najdorf–Stahlberg, Budapeste 1950', c: 'A partida seguiu 13.Bc3 Nd7 14.h4 c5; agora 15.Bc2 parece promissor para as brancas.' }],
  // Coluna 24
  ['c24', 's', 's', '(s)', '7 c3 Ngf6 8 Nxf6+ Nxf6 9 O-O Bxf3 10 Qxf3 Qd5 11 Qe2 Be7 12 Re1 O-O 13 Bf4', { a: '±', r: 'Adams–Rozentalis, Belgrado 1999', c: 'Com 7.c3 as brancas ficam melhor.' }],
  ['c24', 't', 't', '(t)', '8 Neg5 Bd6 9 Re1 h6 10 Nh3 Bxf3 11 Qxf3 c6 12 Nf4 O-O 13 Nh5', { a: '±', r: 'Korchnoi–Dreev, Brno 1992', c: '8.Ng3 é o mais natural, mas o mais agressivo é 8.Neg5!?, e as brancas ficam melhor.' }],
  ['c24-t', '1', 't', '(t) 8...h6?!', '8... h6 9 Nxe6 fxe6 10 Bg6+', { a: '±', c: '8...h6?! permite 9.Nxe6! fxe6 10.Bg6+, com ataque forte.' }],
  ['c24', 'u', 'u', '(u)', '13 Rad1 Qc7 14 Rfe1', { a: '⩲', r: 'Navara–Rustemov, Bundesliga 2007', c: 'Depois de 13.Rad1 Qc7 14.Rfe1 as brancas ficam um pouco melhor, mas a posição preta é sólida.' }],
]

const capitulo = {
  id: 'francesa-c',
  arquivo: 'francesa-c',
  nome: 'Francesa — Variante Rubinstein',
  fonte: 'Modern Chess Openings — French Defense (pp. 212–213), colunas 19–24',
  base: '1. e4 e6 2. d4 d5 3. Nc3 dxe4 4. Nxe4',
  corPadrao: 'b',
  ordem: 212,
  grupos: [
    { id: 'ngf6', nome: '4...Nd7 5.Nf3 Ngf6', colunas: [19, 20, 21, 22] },
    { id: 'be7', nome: '4...Nd7 5.Nf3 Be7', colunas: [23] },
    { id: 'fortknox', nome: 'Fort Knox (4...Bd7)', colunas: [24] },
  ],
}

module.exports = { capitulo, colunas, notas }
