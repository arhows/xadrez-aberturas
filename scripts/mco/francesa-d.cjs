// Transcrição do MCO 15ª ed. — Defesa Francesa, Variante Steinitz (pp. 214–216), colunas 25–30.
// Gerar: node scripts/mco/gerar.cjs francesa-d
// Formato: ver gambito-do-rei.cjs. Dicas em francesa-d-dicas.cjs.
// A base vai até 4.e5 porque a nota (a) é 4...Ne4.

const ST = '1 e4 e6 2 d4 d5 3 Nc3 Nf6 4 e5 Nfd7'
const F4 = `${ST} 5 f4 c5 6 Nf3 Nc6 7 Be3`
const A4 = `${F4} Qb6 8 Na4 Qa5+ 9 c3`

const colunas = {
  c25: [`${A4} cxd4 10 b4 Nxb4 11 cxb4 Bxb4+ 12 Bd2 Bxd2+ 13 Nxd2 b6`, 'qb6', '7...Qb6 8.Na4 … 9...cxd4', '±',
    'Na Steinitz as brancas fecham o centro com 4.e5 e sustentam a cunha com 5.f4. Aqui as pretas sacrificam uma peça por três peões com 10...Nxb4; segundo Timman, o cavalo a mais vale mais e as brancas ficam melhor.'],
  c26: [`${A4} c4 10 b4 Qc7 11 Be2 Be7 12 O-O O-O 13 g4 b5`, 'qb6', '7...Qb6 8.Na4 … 9...c4', '=',
    'Com 9...c4 as pretas fecham o flanco da dama e jogam ...b5; as brancas avançam no flanco do rei com g4, e a posição fica igual.'],
  c27: [`${F4} cxd4 8 Nxd4 Qb6 9 Qd2 Qxb2 10 Rb1 Qa3 11 Bb5 Nxd4 12 Bxd4 Bb4 13 O-O a6`, 'cxd4', '7...cxd4 8.Nxd4 Qb6', '⩲',
    'Com 8...Qb6 as pretas pegam o peão de b2; as brancas entregam o peão em troca de desenvolvimento e ficam com a iniciativa.'],
  c28: [`${F4} cxd4 8 Nxd4 Bc5 9 Qd2 O-O 10 O-O-O a6 11 h4 Nxd4 12 Bxd4 b5 13 Kb1 Qc7`, 'cxd4', '7...cxd4 8.Nxd4 Bc5', '=',
    'Com 8...Bc5 as pretas trocam o bispo de casas escuras; depois dos roques em lados opostos cada lado ataca o rei do outro, e a posição fica igual.'],
  c29: [`${F4} a6 8 Qd2 b5 9 dxc5 Bxc5 10 Bxc5 Nxc5 11 Qf2 Qb6 12 Bd3 Rb8 13 O-O Na4`, 'a6', '7...a6', '=',
    'Com 7...a6 as pretas preparam ...b5 antes de decidir o centro; trocam os bispos de casas escuras e igualam.'],
  c30: [`${ST} 5 Nf3 c5 6 dxc5 Nc6 7 Bf4 Bxc5 8 Bd3 f6 9 exf6 Nxf6 10 O-O O-O 11 Ne5 Bd7 12 Nxc6 Bxc6 13 Qe2 Qe7`, 'nf3', '5.Nf3', '=',
    'Com 5.Nf3 as brancas trocam em c5 e jogam com as peças em vez de sustentar e5 com f4. A coluna é Spassky–Petrosian, Campeonato Mundial 1966: igual.'],
}

const notas = [
  // Coluna 25
  ['c25', 'a', 'a', '(a)', '4... Ne4 5 Nxe4 dxe4 6 Bc4 a6 7 a4 b6 8 Ne2 Bb7 9 O-O Nc6 10 c3 Ne7 11 Ng3 c5 12 Be3 Qc7 13 Qe2 Ng6 14 Bb3 Rc8 15 Rac1 Qb8 16 Bc2 Qa8 17 Qg4', { a: '±', r: 'Georgadze–Toria, Tbilisi 1986', c: 'Com 4...Ne4 as brancas ficam melhor.' }],
  ['c25', 'b', 'b', '(b)', '6... Qb6 7 Be3 a6 8 a3 Nc6 9 dxc5 Bxc5 10 Na4 Qa5+ 11 b4 Qxa4 12 bxc5 O-O 13 c4 Qa5+ 14 Qd2', { a: '⩲', r: 'Wang Hao–A. Grigorian, Yerevan 2006', c: 'Com 6...Qb6 as brancas ficam um pouco melhor.' }],
  ['c25-b', '1', 'b', '(b) 7...Qxb2?', '7... Qxb2 8 Nb5', { a: '±', c: '7...Qxb2? é respondido por 8.Nb5!.' }],
  ['c25', 'c', 'c', '(c)', '8 a3 cxd4 9 Nxd4 Bc5 10 Na4 Qa5+ 11 c3 Bxd4 12 Bxd4 Nxd4 13 Qxd4 b6 14 Qb4 Qxb4 15 axb4 Ke7', { a: '=', r: 'Nunn–Ehlvest, Reykjavik 1990', c: 'Com 8.a3 fica igual; o cavalo branco fica mal colocado em a4.' }],
  ['c25', 'd', 'd', '(d)', '10... Qc7 11 Nxd4', { a: '±', c: 'Recuar com 10...Qc7 permite 11.Nxd4, e as brancas ficam com uma vantagem clara pelo controle de d4 e c5.' }],
  ['c25', 'e', 'e', '(e)', '13... g5 14 Rb1 gxf4 15 Bb5 Rb8 16 Nc5 Qc3 17 Nd3', { a: '±', r: 'Short–Timman, Amsterdã 1994', c: 'Em vez de 13...b6, 13...g5?! deixa as brancas com grande vantagem.' }],
  ['c25', 'e-A', 'e', '(e) A', '14 Bd3 Nc5 15 Nxc5 bxc5 16 O-O g6 17 Rc1 Qb6 18 Qa4+ Bd7 19 Qa3 Rc8 20 Rb1', { a: '±', r: 'análise de Timman', c: 'Depois de 13...b6 14.Bd3! o cavalo a mais vale mais que os três peões pretos. 14...Nc5?! 15.Nxc5 bxc5 e a torre branca entra pela coluna b.' }],
  ['c25-e-A', '1', 'e', '(e) 16...O-O', '16... O-O 17 Bxh7+ Kxh7 18 Qh5+ Kg8 19 Nf3 f6 20 Ng5', { a: '+-', c: '16...O-O 17.Bxh7+! ganha, segundo Timman.' }],
  ['c25-e-A', '2', 'e', '(e) 19...c4', '19... c4 20 Bxc4', { c: 'Se 19...c4, 20.Bxc4.' }],
  ['c25', 'e-B', 'e', '(e) B', '14 Bd3 Ba6 15 Nb2 Nc5 16 Bxa6 Qxa6 17 Qe2 Qa3 18 Qb5+ Ke7 19 O-O Qe3+ 20 Rf2 Rhc8 21 Nf1 Qc3 22 Rf3 d3 23 Rd1 Qd4+ 24 Kh1 Ne4 25 Nxd3', { a: '±', r: 'Nunn–Zysk, Alemanha 1987', c: 'Com 14...Ba6 as brancas também ficam melhor.' }],
  // Coluna 26
  ['c26', 'f', 'f', '(f)', '9... b6 10 Bd2 c4 11 b4 Nxb4 12 cxb4 Bxb4 13 Rc1 Bxd2+ 14 Nxd2 b5 15 Nc3 b4 16 Qa4', { a: '⩲', r: 'Nijboer–Visser, Essent 2002 (até 15...b4)', c: 'Com 9...b6 as brancas ficam um pouco melhor.' }],
  ['c26', 'g', 'g', '(g)', '12... b5 13 Nc5 a5 14 a3 axb4 15 axb4 Rxa1 16 Qxa1', { a: '⩲', r: 'Grischuk–Nogueiras, Olimpíada de Turim 2006', c: 'Com 12...b5 as brancas ficam um pouco melhor.' }],
  ['c26-g', '1', 'g', '(g) 14...Nxc5', '14... Nxc5 15 bxc5', { c: 'Ou 14...Nxc5 15.bxc5.' }],
  ['c26', 'h', 'h', '(h)', '14 Nc5 a5 15 a3 axb4 16 Nxd7 Bxd7 17 axb4 f5', { a: '=', r: 'Kulaots–Ivanchuk, Gotemburgo 2005', c: 'Depois de 14.Nc5 fica igual.' }],
  // Coluna 27
  ['c27', 'i-A', 'i', '(i) A', '9 Be2 Bc5 10 Na4 Qa5+ 11 c3 Bxd4 12 Bxd4 Nxd4 13 Qxd4 b6', { a: '=', r: 'Gaprindashvili–Ree, Wijk aan Zee 1979', c: 'Com 9.Be2 Bc5! as pretas têm pelo menos a igualdade.' }],
  ['c27', 'i-B', 'i', '(i) B', '9 Ncb5 a6 10 Nf5 Bc5', { a: '∓', c: 'Com 9.Ncb5 a6! as pretas ficam um pouco melhor.' }],
  ['c27', 'j', 'j', '(j)', '11... Ndb8 12 O-O a6 13 f5 axb5 14 fxe6 Bxe6 15 Nxe6 fxe6 16 Nxb5 Qa5 17 Qf2', { a: '+-', r: 'Poluyakov–O. Ivanov, URSS 1989', c: '11...Ndb8?! permite 13.f5!, e as brancas ganham.' }],
  ['c27', 'k', 'k', '(k)', '13 Rb3 Qa5 14 a3 Be7 15 f5 exf5 16 Nxd5 Bh4+ 17 Kd1', { a: '=', c: 'Com 13.Rb3 a partida fica aguda; com a defesa certa as pretas igualam.' }],
  ['c27-k', '1', 'k', '(k) 14...Bxa3?', '14... Bxa3 15 Nxd5', { a: '±', c: '14...Bxa3? 15.Nxd5 deixa as brancas melhor.' }],
  ['c27-k', '2', 'k', '(k) A 17...Qd8?', '17... Qd8 18 Nf6+ gxf6 19 exf6 O-O 20 Rg3+ Kh8 21 Qh6 Rg8 22 Rg7', { a: '+-', r: 'de Firmian–Hübner, Polanica Zdroj 1995', c: '17...Qd8? perde: 18.Nf6+! e as pretas abandonaram depois de 22.Rg7. O livro traz 19.gxf6, impossível (não há peão branco em g5); o lance é 19.exf6.' }],
  ['c27-k', '3', 'k', '(k) B 17...Qxd2+', '17... Qxd2+ 18 Kxd2 Bd8 19 Rg3 a6 20 Bxd7+ Bxd7 21 Rxg7 Be6 22 Nf6+ Kf8', { a: '=', c: 'O certo é 17...Qxd2+ 18.Kxd2 Bd8!, e fica igual.' }],
  ['c27', 'l-A', 'l', '(l) A', '13... O-O 14 Rb3 Qa5 15 Qf2 f5 16 Rfb1 Be7 17 Bxd7 Bxd7 18 Rxb7', { a: '±', r: 'Kruppa–Kaidanov, URSS 1988', c: '13...a6 é melhor que 13...O-O, que permite 15.Qf2! e as brancas ficam melhor.' }],
  ['c27-l-A', '1', 'l', '(l) 15...a6?', '15... a6 16 Bxd7 Bxd7 17 Bb6', { a: '+-', c: '15...a6? 16.Bxd7 Bxd7 17.Bb6 ganha a dama.' }],
  ['c27', 'l-B', 'l', '(l) B', '14 Rb3 Qa5 15 Rfb1 Be7 16 Bxd7+ Bxd7 17 Rxb7 Rc8 18 Qe3 Rc4 19 f5', { a: '⩲', r: 'Degraeve–Lampen, Halkidiki 2002', c: 'Depois de 13...a6 14.Rb3 Qa5 15.Rfb1 as brancas ficam com a iniciativa.' }],
  // Coluna 28
  ['c28', 'm', 'm', '(m)', '8... Nxd4 9 Bxd4 Nb8 10 Bd3 Nc6 11 Bf2 Be7 12 Qh5 Qa5 13 O-O', { a: '±', r: 'Nunn–Sutton, Peterborough 1984', c: '8...Nxd4 deixa as pretas em dificuldade.' }],
  ['c28', 'n', 'n', '(n)', '9... Nxd4 10 Bxd4 Bxd4 11 Qxd4 Qb6 12 Qxb6 Nxb6 13 Nb5 Ke7', { a: '⩲', c: 'As pretas podem jogar pelo empate com 9...Nxd4. As brancas ficam um pouco melhor pelo bispo melhor, mas a posição preta é difícil de romper.' }],
  ['c28-n', '1', 'n', '(n) 12.Qd2!?', '12 Qd2', { c: 'Mais dinâmico e mais arriscado é 12.Qd2!?, de Kasparov.' }],
  ['c28', 'o', 'o', '(o)', '13 Rh3 Bb7 14 Rg3 Qc7 15 a3 Bxd4 16 Qxd4 f6', { a: '=', r: 'Nijboer–Stellwagen, Leeuwarden 2005', c: 'Com 13.Rh3 também fica igual.' }],
  ['c28', 'p', 'p', '(p)', '14 Rh3 b4 15 Na4 Bxd4 16 Qxd4 Rb8 17 Re3 a5', { a: '=', r: 'Anand–Buhmann, Bundesliga 2002', c: 'Depois de 14.Rh3 fica igual.' }],
  // Coluna 29
  ['c29', 'q-A', 'q', '(q) A', '9 h4 b4 10 Ne2 Be7 11 dxc5 Nxc5 12 Ng3 h5 13 Be2 g6', { a: '=', r: 'Anand–Morozevich, Melody Amber 2004', c: 'Não está claro qual é o melhor lance das brancas. Com 9.h4 fica igual.' }],
  ['c29', 'q-B', 'q', '(q) B', '9 Qf2 Qb6 10 Bd3 cxd4 11 Nxd4 Nxd4 12 Bxd4 Bc5 13 Ne2 Bxd4 14 Nxd4 Nc5 15 O-O O-O', { a: '⩲', r: 'Kruppa–Savchenko, Minsk 1996', c: 'Com 9.Qf2 as brancas podem ficar um pouco melhor.' }],
  ['c29', 'q-C', 'q', '(q) C', '9 a3 Bb7 10 Bd3 cxd4 11 Nxd4 Nxd4 12 Bxd4 Bc5 13 Ne2 Bxd4 14 Nxd4', { a: '⩲', r: 'Vasiukov–Dokhoian, Moscou 1990', c: 'Com 9.a3 as brancas ficam um pouco melhor.' }],
  ['c29', 'q-D', 'q', '(q) D', '9 Be2 Bb7 10 a3 Rc8 11 Nd1 cxd4 12 Nxd4 Bc5 13 c3 Na5', { a: '=', r: 'Topalov–Shirov, Wijk aan Zee 1999', c: 'Com 9.Be2 fica igual.' }],
  ['c29', 'r', 'r', '(r)', '11 Bd3 b4 12 Ne2 Qb6 13 Ned4 Nxd4 14 Nxd4 a5 15 Qe3 O-O 16 O-O Ba6', { a: '=', r: 'Nunn–Korchnoi, Amsterdã 1988', c: 'Com 11.Bd3 também fica igual.' }],
  ['c29', 's', 's', '(s)', '14 Nxa4 bxa4 15 Qxb6 Rxb6 16 b3 Ke7', { a: '=', r: 'Mokry–Schmidt, Olimpíada de Moscou 1994', c: 'Depois de 14.Nxa4 as damas saem e fica igual.' }],
  // Coluna 30
  ['c30', 't', 't', '(t)', '5 Nce2 c5 6 c3 Nc6 7 f4 b5 8 Nf3 b4 9 f5 bxc3 10 fxe6 fxe6 11 bxc3 cxd4 12 cxd4 Bb4+', { a: '=', r: 'Sax–Korchnoi, match 1991', c: '5.Nce2 seguido de c3 e f4 tenta manter o centro de peões; depois de 7...b5 a partida fica igual.' }],
  ['c30', 'u', 'u', '(u)', '7 Bb5 Bxc5 8 O-O O-O 9 Na4 Be7 10 Re1 Qa5', { a: '=', c: 'O 7.Bb5 de Rigo pode ser respondido com 7...Bxc5, e fica igual.' }],
  ['c30', 'v', 'v', '(v)', '11... Ne4 12 Bxe4 Rxf4 13 Nd3 Bxf2+ 14 Rxf2 Rxf2 15 Bxh7+ Kxh7 16 Qh5+ Kg8 17 Nxf2 e5 18 Rd1 d4 19 Nfe4 Qe7 20 Rf1 dxc3 21 Ng5 Qxg5 22 Qxg5 cxb2 23 Rb1', { a: '+-', r: 'Ljubojević–Bednarski, Olimpíada de Skopje 1972', c: 'O avanço 11...Ne4?! é prematuro; depois de 17.Nxf2 as brancas ficam melhor, e 18...d4? perdeu.' }],
  ['c30-v', '1', 'v', '(v) 18...Be6', '18... Be6', { c: 'Melhor era 18...Be6.' }],
]

const capitulo = {
  id: 'francesa-d',
  arquivo: 'francesa-d',
  nome: 'Francesa — Variante Steinitz',
  fonte: 'Modern Chess Openings — French Defense (pp. 214–216), colunas 25–30',
  base: '1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. e5',
  corPadrao: 'b',
  ordem: 214,
  grupos: [
    { id: 'qb6', nome: '5.f4 … 7...Qb6', colunas: [25, 26] },
    { id: 'cxd4', nome: '5.f4 … 7...cxd4', colunas: [27, 28] },
    { id: 'a6', nome: '5.f4 … 7...a6', colunas: [29] },
    { id: 'nf3', nome: '5.Nf3', colunas: [30] },
  ],
}

module.exports = { capitulo, colunas, notas }
