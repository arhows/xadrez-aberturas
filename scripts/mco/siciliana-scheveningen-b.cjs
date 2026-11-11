// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Scheveningen, 6.Be2 e 6.f4 (pp. 295–296), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs siciliana-scheveningen-b
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-scheveningen-b-dicas.cjs.
//
// A tabela traz avaliação no fim das colunas 9, 11 e 12; nas outras a avaliação vem da última nota.
// Correções de impressão: nota (a), "10...Bd7 11 Bf3 Bd7" repete o lance do bispo; usei 11...Bc6.
// Nota (d) B, "13 Rf2 Bc6 14 Rf2" repete o lance da torre; usei 14 Rd2 (a torre que toma em d6 no lance 18
// precisa estar na coluna d, e o xeque 15...Qb6+ exige f2 livre). Nota (i) não diz para qual coluna transpõe.

const B = '1 e4 c5 2 Nf3 e6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 d6'

const colunas = {
  c07: [`${B} 6 Be2 Be7 7 O-O Nc6 8 Be3 O-O 9 f4 Bd7 10 Nb3 a6 11 a4 Na5 12 e5 Ne8 13 Nxa5 Qxa5 14 Qd2 Rc8`, 'be2', '6.Be2 Be7 7.O-O Nc6 8.Be3 O-O 9.f4 Bd7', '⩲',
    'Com 9...Bd7 as pretas adiam ...a6. Depois de 10.Nb3 a6 11.a4 Na5 12.e5 o cavalo preto vai para e8, e as brancas controlam mais espaço.'],
  c08: [`${B} 6 Be2 a6 7 O-O Qc7 8 f4 Be7 9 Kh1 O-O 10 Bf3 Nc6 11 Nxc6 bxc6 12 Na4 Bb7 13 c4 c5 14 Qc2 Nd7`, 'be2', '6...a6 7.O-O Qc7', '⩲',
    'Com 6...a6 e 7...Qc7 as pretas mantêm a opção de ...Nbd7. Depois de 11.Nxc6 bxc6 12.Na4 as brancas fixam a ala da dama e ficam só um pouco melhor.'],
  c09: [`${B} 6 Be2 a6 7 Be3 Nbd7 8 g4 h6 9 f4 Nc5 10 Bf3 e5 11 Nf5 Bxf5 12 exf5 Qb6 13 Nd5 Nxd5 14 Qxd5`, 'be2', '7.Be3 Nbd7 8.g4', '±',
    'Com 7.Be3 Nbd7 as brancas atacam logo com 8.g4. O lance 8...h6?! enfraquece a ala do rei, e depois de 11.Nf5 e 13.Nd5 as brancas ficam melhor (Liang–Rodríguez, Penang 1991).'],
  c10: [`${B} 6 f4 a6 7 Qf3 Qb6 8 Nb3 Qc7 9 g4 b5 10 Bd3 Bb7 11 g5 Nfd7 12 Be3 Nc5 13 a3 Nc6 14 O-O Nxb3`, 'f4', '6.f4 a6 7.Qf3', '=',
    'Com 6.f4 as brancas preparam e5 ou g4. Contra 7.Qf3 o lance 7...Qb6! ataca o cavalo de d4; depois de 9.g4 b5 as pretas contra-atacam na ala da dama e ficam iguais.'],
  c11: [`${B} 6 f4 a6 7 Bd3 Be7 8 O-O O-O 9 Nf3 Nbd7 10 Qe1 Nc5 11 Be3 Nxd3 12 cxd3 b5 13 Qg3 Re8 14 e5 Nd5`, 'f4', '7.Bd3', '=',
    'Com 7.Bd3 e 10.Qe1 as brancas preparam ataque na ala do rei. As pretas trocam o bispo de d3 com o cavalo e ficam iguais (Mokry–Nguyen Anh Dung, Olimpíada de Yerevan 1996).'],
  c12: [`${B} 6 g3 Nc6 7 Bg2 Bd7 8 O-O Be7 9 Re1 O-O 10 Nxc6 Bxc6 11 a4 Qd7 12 Re3 Rfd8 13 Rd3 b6`, 'g3', '6.g3', '=',
    'Com 6.g3 as brancas fazem o fianqueto do bispo de f1. As pretas desenvolvem com calma, trocam em c6 e ficam iguais.'],
}

const notas = [
  // Coluna 7
  ['c07', 'a', 'a', '(a)', '8 Kh1 O-O 9 f4 Nxd4 10 Qxd4 Bd7 11 Bf3 Bc6 12 a4 Qc7 13 Be3 Rfd8 14 a5 d5', { a: '=', r: 'Benjamin–Shabalov, Pleasantville 1993', c: 'Com 8.Kh1 O-O 9.f4 Nxd4 fica igual.' }],
  ['c07', 'b', 'b', '(b)', '9... e5 10 fxe5 dxe5 11 Nf5 Bxf5 12 Rxf5 g6 13 Rf2 Nd4 14 Bd3', { a: '⩲', c: 'Com 9...e5 as brancas ficam um pouco melhor.' }],
  ['c07', 'c', 'c', '(c)', '10 Qe1 Nxd4 11 Bxd4 Bc6 12 Qg3 g6 13 f5 e5 14 Be3 Nxe4 15 Nxe4 Bxe4 16 Bh6 Re8 17 Kh1 Rc8', { a: '∓', c: 'Com 10.Qe1 e 13.f5?! as pretas ficam um pouco melhor; a dama em d8 ajuda na defesa.' }],
  ['c07-c', '1', 'c', '(c) 13.Bf3', '13 Bf3 b5', { a: '=', c: '13.Bf3 b5 é igual.' }],
  ['c07', 'd-A', 'd', '(d) A', '10... Qc7 11 Bf3 Rfd8 12 Kh1 Be8 13 Qe2 Nd7 14 Rad1', { a: '⩲', r: 'Andersson–Akoral, Växjö 1992', c: 'Com 10...Qc7 as brancas ficam um pouco melhor.' }],
  ['c07', 'd-B', 'd', '(d) B', '10... a5 11 a4 Nb4 12 Bf3 e5 13 Rf2 Bc6 14 Rd2 exf4 15 Bxf4 Qb6+ 16 Kh1 Nd7 17 Bxd6 Bxd6 18 Rxd6 Ne5 19 Nd5 Qf2 20 Ne7+ Kh8 21 c3', { a: '⩲', r: 'Mokry–Bönsch, Brno 1991', c: 'Com 10...a5 11.a4 Nb4 as brancas também ficam um pouco melhor.' }],
  ['c07', 'e', 'e', '(e)', '11... b6 12 Bf3 Rb8 13 Qe2 Nb4 14 Rad1 Qc7 15 g4', { a: '±', r: 'Fishbein–Cebalo, Herning 1991', c: 'Se as pretas permitem 12.a5, ficam apertadas na ala da dama. Com 11...b6 e 15.g4 as brancas ficam claramente melhor.' }],
  ['c07', 'f-A', 'f', '(f) A', '14... Qc7 15 Bd4', { a: '⩲', c: 'Ou 14...Qc7 15.Bd4, um pouco melhor para as brancas.' }],
  ['c07', 'f-B', 'f', '(f) B', '15 Bf3 Qc7 16 a5 Bc6 17 Bb6 Qb8 18 Rae1', { a: '⩲', r: 'Geller–Espig, Dortmund 1991', c: 'Depois de 14...Rc8 15.Bf3 as brancas controlam mais espaço.' }],
  // Coluna 8
  ['c08', 'g', 'g', '(g)', '7... Nbd7 8 f4 b5 9 Bf3 Bb7 10 e5 Bxf3 11 Nxf3 dxe5 12 fxe5 Ng4 13 Qe2 b4 14 Na4 h5 15 Ng5 Nh6 16 Nxe6 Qc8 17 Nxf8 Nxf8 18 Nb6', { a: '+−', r: 'A. Stein–Matikozian, National Open 2006', c: 'Com 7...Nbd7 8.f4 b5 e 14...h5?! 15.Ng5! as pretas abandonaram depois de 18.Nb6.' }],
  ['c08-g', '1', 'g', '(g) 8.a4', '8 a4', { c: '8.a4 também é razoável.' }],
  ['c08-g', '2', 'g', '(g) 14...Rc8', '14... Rc8', { c: '14...Rc8 era melhor.' }],
  ['c08', 'h', 'h', '(h)', '8... b5 9 Bf3 Bb7 10 e5 dxe5 11 fxe5 Nfd7 12 Bf4 b4 13 Ne4 Nxe5 14 Kh1 Be7 15 Ng5 Bxg5 16 Bxb7 Qxb7 17 Bxe5 O-O 18 Qg4', { a: '±', r: 'Karpov–Ljubojević, Turim 1982', c: 'Com 8...b5 9.Bf3 Bb7 10.e5 as brancas ficam melhor.' }],
  ['c08', 'i', 'i', '(i)', '10 a4 Nc6 11 Be3', { a: '⩲', c: '10.a4 Nc6 11.Be3 transpõe para uma das colunas anteriores, um pouco melhor para as brancas.' }],
  ['c08', 'j', 'j', '(j)', '15 Be3 Rad8 16 b3 Rfe8 17 Rad1 Bc6 18 Nc3 Nf8 19 g3 Bf6', { a: '⩲', r: 'Landa–Milov, Oberwart 1994', c: 'Depois de 15.Be3 as brancas ficam só um pouco melhor.' }],
  // Coluna 9
  ['c09', 'k', 'k', '(k)', '7 a4', { c: 'As brancas sempre podem responder a ...a6 com a4, se aceitarem as linhas principais das colunas 1–3.' }],
  ['c09', 'l', 'l', '(l)', '7... Be7 8 f4 O-O 9 O-O Nc6', { c: 'As pretas também podem jogar o habitual 7...Be7; depois de 8.f4 O-O 9.O-O Nc6 chega-se à linha principal das colunas 1–6.' }],
  ['c09', 'm', 'm', '(m)', '8... Nc5 9 Bf3 h6 10 h4 g6', { a: '=', r: 'Kasparov', c: 'O melhor para as pretas é a sugestão de Kasparov, ainda não testada: 8...Nc5 9.Bf3 h6 10.h4 g6!, com igualdade.' }],
  ['c09-m', '1', 'm', '(m) 9.f3', '9 f3 b5 10 a3 Qc7 11 g5 Nfd7 12 Qd2 Nb6', { a: '∞', r: 'Pierrot–Bastidas, Argentina 1997', c: '9.f3 b5 levou a jogo pouco claro.' }],
  ['c09', 'n', 'n', '(n)', '11... g6 12 fxe5 Nfxe4 13 Nxe4 Nxe4 14 Nxd6+ Bxd6 15 exd6', { a: '±', c: '11...g6 12.fxe5! deixa as brancas melhor.' }],
  // Coluna 10
  ['c10', 'o-A', 'o', '(o) A', '6... Nc6 7 Be3', { c: '6...Nc6 7.Be3 transpõe para as linhas de 6.Be3, coluna 24.' }],
  ['c10', 'o-B', 'o', '(o) B', '6... Be7', { c: '6...Be7 tem pouco significado próprio e transpõe para as colunas 11 ou 24.' }],
  ['c10', 'p', 'p', '(p)', '8 a3 Nc6 9 Nb3 Qc7', { a: '=', c: 'Com 8.a3 Nc6 9.Nb3 Qc7 fica igual.' }],
  ['c10-p', '1', 'p', '(p) 8...Qxd4', '8... Qxd4 9 Be3', { a: '+−', c: '8...Qxd4? 9.Be3 ganha a dama.' }],
  ['c10', 'q', 'q', '(q)', '10 g5 b4 11 Nb5 axb5 12 gxf6 Nd7 13 Bxb5 gxf6 14 f5 Qb6', { a: '=', r: 'Gipslis–van Wely, Gausdal 1992', c: 'Com 10.g5 b4 11.Nb5 fica igual.' }],
  ['c10', 'r', 'r', '(r)', '15 cxb3 g6 16 Rad1 h6', { a: '=', c: 'Depois de 15.cxb3 g6! fica igual.' }],
  // Coluna 11
  ['c11', 's', 's', '(s)', '7 Be3 b5 8 Qf3 Bb7 9 Bd3 Nbd7 10 g4 b4 11 Nce2 e5', { a: '=', r: 'Micayabas–Browne, Nova York 1984', c: 'Com 7.Be3 b5 fica igual.' }],
  ['c11', 't', 't', '(t)', '8... Nc6 9 Nxc6 bxc6 10 Kh1', { a: '⩲', c: 'As pretas devem tentar trocar um cavalo pelo bispo de d3 para amortecer o ataque. Com 8...Nc6 9.Nxc6 bxc6 10.Kh1, planejando Na4 e c4, as brancas ficam um pouco melhor.' }],
  // Coluna 12
  ['c12', 'u-A', 'u', '(u) A', '6 Bc4', { c: '6.Bc4 a6 é a Variante Najdorf, e 6.Bc4 Nc6 é a Variante Sozin.' }],
  ['c12', 'u-B', 'u', '(u) B', '6 Bg5 h6 7 Bxf6 Qxf6', { a: '=', c: '6.Bg5 h6 7.Bxf6 Qxf6 é igual.' }],
  ['c12', 'v', 'v', '(v)', '13... Ne8', { r: 'Browne–Petrosian, San Antonio 1972', c: 'Se as pretas jogam ...a6 agora ou nos próximos lances, a posição transpõe para a Taimanov com 6.g3. A coluna é Browne–Petrosian, com 13...b6 no lugar de 13...Ne8 de Petrosian.' }],
]

const capitulo = {
  id: 'siciliana-scheveningen-b',
  arquivo: 'siciliana-scheveningen-b',
  nome: 'Siciliana Scheveningen — 6.Be2, 6.f4 e 6.g3',
  fonte: 'Modern Chess Openings — Sicilian Defense, Scheveningen Variation, 6 Be2 and 6 f4 (pp. 295–296), colunas 7–12',
  base: '1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 d6',
  corPadrao: 'b',
  ordem: 295,
  grupos: [
    { id: 'be2', nome: '6.Be2', colunas: [7, 8, 9] },
    { id: 'f4', nome: '6.f4', colunas: [10, 11] },
    { id: 'g3', nome: '6.g3', colunas: [12] },
  ],
}

module.exports = { capitulo, colunas, notas }
