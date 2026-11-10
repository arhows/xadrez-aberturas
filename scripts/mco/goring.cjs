// Transcrição do MCO 15ª ed. — Gambito Göring (pp. 138–140).
// Gerar: node scripts/mco/gerar.cjs goring
// Formato: ver gambito-do-rei.cjs. Dicas em goring-dicas.cjs.

const GG = '1 e4 e5 2 Nf3 Nc6 3 d4 exd4 4 c3'

const colunas = {
  c01: [`${GG} dxc3 5 Nxc3 Bb4 6 Bc4 d6 7 O-O Bxc3 8 bxc3 Nf6 9 e5 Nxe5 10 Nxe5 dxe5 11 Qb3 Qe7 12 Ba3 c5`, 'aceito', '4...dxc3 5.Nxc3 Bb4', '⩱',
    'Gambito Göring: as brancas entregam um peão para se desenvolver depressa e tirar o peão preto do centro, com o bispo em c4 mirando f7. Aceitando com 4...dxc3 5.Nxc3 Bb4 as pretas ficam com chances iguais ou um pouco melhores.'],
  c02: [`${GG} dxc3 5 Nxc3 d6 6 Bc4 Nf6 7 Qb3 Qd7 8 Ng5 Ne5 9 Bb5 c6 10 f4 Neg4 11 Bc4 d5 12 Nxd5 Nxd5`, 'aceito', '4...dxc3 5.Nxc3 d6', '∞',
    'Com 5...d6 as pretas seguram o peão a mais e aceitam um jogo agudo, em que as peças brancas pressionam f7.'],
  c03: [`${GG} dxc3 5 Bc4 cxb2 6 Bxb2 d6 7 O-O Be6 8 Bxe6 fxe6 9 Qb3 Qd7 10 Ng5 Nd8 11 f4 Nf6 12 Nd2 Be7`, 'aceito', '4...dxc3 5.Bc4', '∞',
    'Com 5.Bc4, à moda do Gambito Dinamarquês, as brancas entregam dois peões pelos bispos apontados para o rei. As pretas defendem o material e o jogo fica com chances para os dois lados.'],
  c04: [`${GG} d3 5 Bxd3 d6 6 O-O Nf6 7 Nd4 Be7 8 f4 O-O 9 Qc2 Re8 10 Nd2 Bf8 11 N2f3 g6 12 Bd2 Bg7`, 'recusado', '4...d3', '⩲',
    'Recusar o gambito é mais seguro. Com 4...d3 as pretas devolvem o peão na hora, mas as brancas podem ficar com uma pequena vantagem posicional.'],
  c05: [`${GG} Nf6 5 e5 Ne4 6 Qe2 f5 7 exf6 d5 8 Nbd2 Qxf6 9 Nxe4 dxe4 10 Qxe4+ Qe6 11 Bd3 dxc3 12 O-O Qxe4`, 'recusado', '4...Nf6', '⩲',
    'Com 4...Nf6 o jogo fica complicado e pouco explorado.'],
  c06: [`${GG} d5 5 exd5 Qxd5 6 cxd4 Bb4+ 7 Nc3 Bg4 8 Be2 Bxf3 9 Bxf3 Qc4 10 Bxc6+ bxc6 11 Qe2+ Qxe2+ 12 Kxe2 Ne7`, 'recusado', '4...d5 (linha de Capablanca)', '=',
    'A linha de empate de Capablanca: com 4...d5 as pretas trocam peças e igualam. É um dos motivos de o Gambito Göring ser pouco jogado.'],
}

const notas = [
  ['c01', 'a', 'a', '(a)', '6... Nf6 7 e5 d5 8 exf6 dxc4 9 Qxd8+ Nxd8 10 fxg7 Bxc3+ 11 bxc3 Rg8 12 Bh6 f6', { a: '=', r: 'Dolgov–Kaverin, correspondência 1991', c: '6...Nf6 é uma alternativa jogável; o jogo fica igual.' }],
  ['c01', 'b', 'b', '(b)', '7 Qb3 Bxc3+ 8 bxc3 Qd7 9 Qc2 Nf6', { a: '⩱', r: 'Ciocaltea–Kovacs, Puja 1971', c: 'Com 7.Qb3 imediato as pretas ficam um pouco melhor.' }],
  ['c01-b', '1', 'b', '(b) 8.Qxc3', '8 Qxc3', { c: '8.Qxc3 talvez seja melhor.' }],
  ['c01', 'c-A', 'c', '(c) A', '8... Bg4 9 Qb3 Bxf3 10 Bxf7+ Kf8 11 gxf3 Ne5 12 Bxg8 Rxg8 13 f4 Nf3+ 14 Kh1 Qd7', { a: '=', c: 'Com 8...Bg4 o livro dá chances iguais. (O livro segue 15.c4, mas aí 15...Qh3 dá mate em dois lances; a linha foi cortada em 14...Qd7.)' }],
  ['c01-c-A', '1', 'c', '(c) 15.f5', '15 f5 Qc6', { r: 'Cargnel–Hegeler, correspondência 1986', c: 'Ou 15.f5 Qc6.' }],
  ['c01', 'c-B', 'c', '(c) B', '8... Be6 9 Bxe6 fxe6 10 Qb3 Qd7 11 Qxb7', { a: '=', r: 'Bjerring–Lein, Varna 1974', c: 'Com 8...Be6 o jogo fica igual.' }],
  ['c01', 'd', 'd', '(d)', '9 Ba3 Bg4 10 Qb3 Bxf3 11 Bxf7+ Kf8 12 gxf3 Ne5 13 Be6', { a: '⩲', r: 'Styazhkin–Bunich, Leningrado 1984', c: '9.Ba3 é interessante; as brancas ficam um pouco melhor.' }],
  ['c01', 'e', 'e', '(e)', '9... dxe5 10 Qb3 O-O 11 Ng5 Qe8 12 Ba3 Na5 13 Qb4 Nxc4 14 Qxc4 c6', { a: '=', r: 'Hagberg–Turpin, Rilton Cup 2005', c: 'Com 9...dxe5 o jogo fica igual.' }],
  ['c01', 'f', 'f', '(f)', '13 Bb5+ Kf8 14 f4 e4 15 f5 h5 16 Rad1 Qc7', { a: '⩱', r: 'Saksis–Prieditis, correspondência 1997', c: '13.Bb5+ Kf8 é o caminho mais desafiador; as brancas provavelmente ficam um pouco pior.' }],
  ['c01-f', '1', 'f', '(f) 13...Bd7', '13... Bd7 14 Bxd7+ Nxd7 15 Qxb7 Rb8 16 Qxa7 O-O', { a: '=', r: 'Chudinovskikh–Saharov, URSS 1979', c: 'Com 13...Bd7 o jogo fica igual.' }],
  ['c01-f', '2', 'f', '(f) 13...Nd7', '13... Nd7 14 Bxd7+ Bxd7 15 Qxb7', { a: '=', r: 'Velimirović–Littleton, Haia 1966', c: 'Com 13...Nd7 também.' }],
  ['c01-f', '3', 'f', '(f) 15...h6', '15... h6', { c: '15...h6 é possível.' }],
  ['c02', 'g', 'g', '(g)', '6... Be6 7 Bxe6 fxe6 8 Qb3 Qd7 9 Qxb7 Rb8 10 Qa6 Be7 11 O-O Bf6 12 e5 Nxe5 13 Nxe5 Bxe5 14 Qxa7', { a: '=', r: 'Levy–Feller, Praia da Rocha 1969', c: 'Com 6...Be6 o jogo fica mais ou menos igual.' }],
  ['c02-g', '1', 'g', '(g) 11...Nf6', '11... Nf6 12 Rd1 O-O 13 Qe2 e5 14 Nd5', { a: '±', r: 'Klovans–Tolush, URSS 1962', c: 'Com 11...Nf6 as brancas ficam melhor.' }],
  ['c02-g', '2', 'g', '(g) 8...Qc8', '8... Qc8 9 Ng5 Nd8 10 f4 Be7 11 f5 Bxg5 12 Bxg5', { a: '±', r: 'Zhuravlev–Tarve, URSS 1968', c: '8...Qc8?! é duvidoso; as brancas ficam melhor.' }],
  ['c02', 'h', 'h', '(h)', '10... cxb5 11 fxe5 dxe5 12 Be3 a5 13 O-O a4 14 Qxb5 Bd6 15 Qe2', { a: '∞', r: 'Mastrovasilis–Nikolaidis, Grécia 2003', c: 'Com 10...cxb5 as brancas têm compensação pelo peão.' }],
  ['c02', 'i', 'i', '(i)', '11 h3 cxb5 12 hxg4 h6 13 Nxb5 d5', { a: '=', r: 'análise de Lepeshkin', c: 'Com 11.h3 o jogo fica igual.' }],
  ['c02', 'j', 'j', '(j)', '13 exd5 Bc5 14 dxc6 Qe7+ 15 Kf1 O-O 16 Bd2 Bf5', { a: '∞', r: 'Fedoseev–Obultov, Rússia 1996', c: 'As pretas tiveram boa compensação pelo material.' }],
  ['c03', 'k', 'k', '(k)', '6... Bb4+ 7 Nc3 Nf6 8 Qc2 d6 9 O-O-O Bxc3 10 Bxc3 Be6 11 Bxe6 fxe6 12 e5 Nd5 13 exd6 O-O', { a: '∓', r: 'Mestani–Samil, Campeonato Turco 2004', c: '6...Bb4+ é mais agressivo; depois de 8.Qc2?! as pretas ficam melhor.' }],
  ['c03-k', '1', 'k', '(k) 8.O-O', '8 O-O O-O 9 e5', { c: 'As brancas jogam melhor com 8.O-O O-O 9.e5.' }],
  ['c03', 'l', 'l', '(l)', '7 Nc3 Be7 8 Qb3 Nh6 9 Nd5 f6 10 O-O Na5', { a: '∓', r: 'Csom–Barcza, Hungria 1967', c: 'Com 7.Nc3 as pretas ficaram bem.' }],
  ['c03', 'm', 'm', '(m)', '13 Rad1 h6 14 e5 hxg5 15 exf6 Bxf6 16 fxg5 Bxb2 17 Qxb2', { a: '∞', r: 'Dolgov–Wulthauser, correspondência 1990', c: 'Há chances para os dois lados.' }],
  ['c04', 'n', 'n', '(n)', '5... Bc5 6 O-O d6 7 b4 Bb6 8 a4 a6 9 Na3', { a: '⩲', r: 'Milner-Barry–Hilton, Inglaterra 1959', c: 'Com 5...Bc5 as brancas ficam um pouco melhor.' }],
  ['c04', 'o', 'o', '(o)', '13 Rae1 Nd7 14 b4', { a: '⩲', r: 'Shevelev–Zarubin, Voronezh 1987', c: 'As brancas ficam um pouco melhor.' }],
  ['c05', 'p', 'p', '(p)', '5... Nd5 6 cxd4 d6 7 Bb5 Be7 8 Nc3 Nxc3 9 bxc3 O-O 10 O-O Bg4 11 Qd3 Qc8 12 Bf4', { a: '⩲', r: 'Lukin–Ceshkovski, Rússia 1995', c: 'Com 5...Nd5 as brancas ficam com uma pequena vantagem.' }],
  ['c05', 'q', 'q', '(q)', '6... d5 7 exd6 f5 8 Nxd4 Bxd6 9 f3 Qh4+ 10 g3 Bxg3+ 11 hxg3 Qxh1 12 Bf4', { a: '⩲', c: 'Com 6...d5 as brancas ficam um pouco melhor. (O livro escreve 12.Bf5, casa a que nenhum bispo branco chega; o lance coerente é 12.Bf4.)' }],
  ['c05-q', '1', 'q', '(q) 8.Nbd2', '8 Nbd2 Qxd6 9 Nxe4 fxe4 10 Qxe4+ Qe6 11 Bd3 dxc3', { a: '=', r: 'Dueckstein–Xi Jun, Viena 1993', c: 'Com 8.Nbd2 o jogo fica igual. (O livro escreve 9.Bxe4; quem captura em e4 é o cavalo de d2.)' }],
  ['c05', 'r', 'r', '(r)', '7 Nxd4 Bc5 8 Nxf5 O-O 9 Qxe4 d5 10 exd6 Bxf2+', { a: '∓', r: 'análise de Soltis', c: 'Com 7.Nxd4 as pretas ficam melhor.' }],
  ['c05', 's-A', 's', '(s) A', '8 Ng5 Qxf6 9 f3 d3 10 Nxe4 dxe4 11 Qxe4+ Be6 12 Bxd3 O-O-O', { a: '⩱', r: 'Speransky–Yakovlev, Leningrado 1983', c: 'Com 8.Ng5 as pretas ficam com bom jogo.' }],
  ['c05', 's-B', 's', '(s) B', '8 Nxd4 Nxd4 9 cxd4 Kf7 10 fxg7 Bb4+ 11 Kd1 Re8', { a: '∓', r: 'Levy–Boey, Siegen 1970', c: 'Com 8.Nxd4 as pretas ficam melhor.' }],
  ['c05', 't', 't', '(t)', '13 Bxe4 Bd7 14 bxc3 O-O-O 15 Ng5 Re8 16 Bxh7', { a: '⩲', r: 'Al Modiahki–Kharlov, Dubai 2001', c: 'As brancas ficam um pouco melhor.' }],
  ['c06', 'u', 'u', '(u)', '6... Nf6 7 Nc3 Bb4 8 Be2 Ne4 9 Bd2 Bxc3 10 bxc3 O-O 11 O-O Nxd2', { a: '=', r: 'Ljubojević–Portisch, Milão 1975', c: 'Com 6...Nf6 o jogo fica igual.' }],
  ['c06', 'v', 'v', '(v)', '8... O-O-O 9 O-O Qd7 10 Be3 Nf6 11 Qa4', { a: '⩲', r: 'Mieses–Levy, Viena 1907', c: 'Com 8...O-O-O as brancas ficam um pouco melhor.' }],
  ['c06-v', '1', 'v', '(v) 9...Qa5', '9... Qa5 10 Be3 Nge7 11 Na4 Ng6 12 h3 Be6', { a: '±', r: 'Estrin–Sevecek, correspondência 1968', c: 'Com 9...Qa5 as brancas ficam melhor.' }],
  ['c06', 'w-A', 'w', '(w) A', '10 Qb3 Qxb3 11 axb3 Nge7 12 O-O a6', { a: '=', r: 'Ljubojević–Ree, Amsterdã 1972', c: 'Com 10.Qb3 o jogo fica igual.' }],
  ['c06', 'w-B', 'w', '(w) B', '10 Be3 Bxc3+ 11 bxc3 Qxc3+ 12 Kf1 Qc4+ 13 Kg1 Nge7 14 Rc1 Qxa2 15 Ra1', { a: '=', r: 'Marshall–Capablanca, Lake Hopatcong 1926', c: 'Com 10.Be3 a partida terminou empatada.' }],
  ['c06', 'x', 'x', '(x)', '10... Qxc6 11 O-O Ne7 12 Qb3 Bxc3 13 bxc3 O-O 14 c4', { a: '⩲', r: 'Neumeier–Svidler, Dortmund 1991', c: 'Com 10...Qxc6 as brancas ficam com uma pequena vantagem.' }],
  ['c06', 'y', 'y', '(y)', '13 Rd1 O-O-O 14 Be3 Rhe8', { a: '=', r: 'Varitski–Pedersen, Pardubice 2005', c: 'O jogo fica igual.' }],
]

const capitulo = {
  id: 'goring',
  arquivo: 'goring',
  nome: 'Gambito Göring',
  fonte: 'Modern Chess Openings — Göring Gambit (pp. 138–140), colunas 1–6',
  base: '1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. c3',
  corPadrao: 'w',
  ordem: 138,
  grupos: [
    { id: 'aceito', nome: '4...dxc3 (aceito)', colunas: [1, 2, 3] },
    { id: 'recusado', nome: 'Recusado', colunas: [4, 5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
