// Transcrição do MCO 15ª ed. — Defesa Tarrasch, outras linhas (pp. 447–448), colunas 13–18.
// Gerar: node scripts/mco/gerar.cjs tarrasch-c
// Formato: ver gambito-do-rei.cjs. Dicas em tarrasch-c-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// A nota (s) não traz lances ("esta posição pode surgir por várias ordens de lances e de várias aberturas"); o comentário entrou no resumo da coluna 17.
// Correções: nas notas (x) e (y) o livro traz ...cxd5, mas o peão c preto já saiu (4...cxd4); ficou ...exd5.
// Na nota (w) a partida Karpov–Morović ficou até 16...Qb6: a sequência seguinte do livro (17...Rc8 com a torre já em c8) tem erro de impressão.

const B = '1 d4 d5 2 c4 e6 3 Nc3 c5 4 cxd5'
const N = `${B} exd5 5 Nf3 Nc6`

const colunas = {
  c13: [`${N} 6 g3 c4 7 Bg2 Bb4 8 O-O Nge7 9 e4 O-O 10 exd5 Nxd5 11 Nxd5 Qxd5`, 'nf3', '6.g3 c4 (Variante Sueca)', '⩲',
    'Com 6.g3 c4 as pretas fecham a ala da dama e ganham espaço, em vez de aceitar o peão isolado. Depois de 7.Bg2 Bb4 8.O-O Nge7 9.e4! as brancas abrem o centro, e com 11...Qxd5 a dama preta fica exposta; as brancas ficam melhor (Becerra Rivero–Palao, Cuba 1995).'],
  c14: [`${N} 6 Bg5 Be7 7 Bxe7 Ngxe7 8 e3 cxd4 9 Nxd4 Qb6 10 Bb5 O-O 11 O-O Nxd4`, 'nf3', '6.Bg5', '=',
    'Com 6.Bg5 as brancas trocam o bispo de casas escuras para enfraquecer d5. Depois de 6...Be7 7.Bxe7 Ngxe7 8.e3 cxd4 9.Nxd4 Qb6 as pretas pressionam b2 e trocam peças; o jogo fica igual (Milos–Lima, São Paulo 2005).'],
  c15: [`${B} exd5 5 dxc5 d4 6 Ne4 Nc6 7 Nf3 Bf5 8 Ng3 Bg4 9 Qc2 Nf6 10 h3 d3 11 Qxd3 Qxd3`, 'dxc5', '5.dxc5 d4', '=',
    'Com 5.dxc5 d4 as pretas sacrificam um peão para ganhar espaço e tempo. Depois de 6.Ne4 Nc6 7.Nf3 Bf5 8.Ng3 Bg4 9.Qc2 Nf6 10.h3 d3 as damas se trocam e a posição fica mais ou menos igual (Bareev–Lobron, Dortmund 1995).'],
  c16: [`${B} exd5 5 e4 dxe4 6 d5 f5 7 Bf4 Bd6 8 Bb5+ Kf7 9 Nh3 Nf6 10 Bc4 a6 11 a4 h6`, 'e4', '5.e4 (Gambito Marshall)', '∓',
    'Com 5.e4 dxe4 6.d5 as brancas sacrificam um peão para fechar o centro. Depois de 6...f5 7.Bf4 Bd6 8.Bb5+ Kf7 o rei preto fica em f7, mas as pretas defendem tudo, e as brancas não têm compensação suficiente pelo peão (Bronstein–Marjanović, Kirovakan 1978).'],
  c17: [`${B} exd5 5 e3 Nc6 6 Nf3 Nf6 7 Bb5 Bd6 8 O-O O-O 9 h3 cxd4 10 exd4 h6 11 Re1 Qc7`, 'e3', '5.e3', '=',
    'Com 5.e3 as brancas jogam de forma tranquila. A posição depois de 5...Nc6 6.Nf3 Nf6 pode surgir por várias ordens de lances e de várias aberturas. Depois de 7.Bb5 Bd6 8.O-O O-O 9.h3 cxd4 10.exd4 o peão isolado é das brancas, e as pretas têm boas chances.'],
  c18: [`${B} cxd4 5 Qa4+ Bd7 6 Qxd4 exd5 7 Qxd5 Nc6 8 e3 Nf6 9 Qd1 Qb6 10 Be2 Bb4 11 Nf3 O-O`, 'cxd4', '4...cxd4 (Gambito von Hennig-Schara)', '⩲',
    'Com 4...cxd4 as pretas entram no Gambito von Hennig-Schara. Depois de 5.Qa4+ Bd7 6.Qxd4 exd5 7.Qxd5 Nc6 as brancas ficam com o peão a mais, e as pretas, com desenvolvimento rápido; com 9.Qd1 Qb6 10.Be2 as brancas consolidam e ficam um pouco melhor (Horváth–Giacometti, Porto San Giorgio 2004).'],
}

const notas = [
  // Coluna 13
  ['c13', 'a', 'a', '(a)', '7 e4 dxe4 8 Ng5 Qxd4 9 Be3 Qxd1+ 10 Rxd1 h6 11 Nd5 Bb4+ 12 Nxb4 Nxb4 13 Nxe4 Nc2+ 14 Kd2 Nxe3', { a: '=', r: 'Zaitsev–Mikėnas, URSS 1962', c: 'O imediato 7.e4 dxe4 8.Ng5 Qxd4 9.Be3 Qxd1+ 10.Rxd1 levou à igualdade.' }],
  ['c13', 'b', 'b', '(b)', '9 a3 Ba5 10 Ne5 O-O 11 Bg5 h6 12 Bxe7 Nxe7', { a: '=', r: 'Onischuk–Nadanian, Aeroflot Open 2002', c: '9.a3 Ba5 10.Ne5 O-O 11.Bg5 h6 12.Bxe7 Nxe7 é igual.' }],
  ['c13-b', '1', 'b', '(b) 10.b4', '10 b4 Bb6', { a: '=', r: 'Balduan–Savchenko, Solingen 2005', c: '10.b4 Bb6! também é igual.' }],
  ['c13', 'c', 'c', '(c)', '9... dxe4 10 Nxe4 O-O 11 Qc2 Qd5 12 Be3 Ng6 13 Nh4 Qb5 14 Nxg6 hxg6 15 a3 Be7 16 d5', { a: '±', r: 'Reshevsky–Ståhlberg, Zurique 1953', c: '9...dxe4 10.Nxe4 O-O 11.Qc2 Qd5 12.Be3 Ng6 13.Nh4 é melhor para as brancas.' }],
  ['c13', 'd-A', 'd', '(d) A', '11 Bg5 Qa5 12 Nxd5 Qxd5 13 Ne5 Qxd4 14 Nxc6 Qxd1', { a: '∞', r: 'Kasparov', c: '11.Bg5 Qa5 12.Nxd5 Qxd5 13.Ne5 Qxd4 14.Nxc6 Qxd1 leva a um final indefinido (Kasparov).' }],
  ['c13', 'd-B', 'd', '(d) B', '11 Ng5 Nf6 12 d5 Ne7 13 Qd4 Bxc3 14 Qxc3 h6 15 Ne4 Nxe4 16 Bxe4 Nxd5', { a: '=', r: 'Magerramov–Lputian, URSS 1991', c: '11.Ng5 Nf6 12.d5 Ne7 13.Qd4 Bxc3 14.Qxc3 h6 15.Ne4 Nxe4 16.Bxe4 Nxd5 foi mais ou menos igual.' }],
  ['c13', 'e', 'e', '(e)', '12 Be3 Bf5 13 Ne5 Qb5 14 Qf3 Bd3 15 Nxd3 cxd3 16 Qd5', { a: '±', r: 'Becerra Rivero–Palao, Cuba 1995', c: 'Depois de 12.Be3 Bf5 13.Ne5 Qb5 14.Qf3 Bd3 15.Nxd3 cxd3 16.Qd5 as brancas ficaram melhor.' }],
  ['c13-e', '1', 'e', '(e) 12...Bg4', '12... Bg4 13 Ne5 Qxg2+ 14 Kxg2 Bxd1 15 Nxc6 bxc6 16 Rfxd1', { a: '±', c: '12...Bg4 13.Ne5 Qxg2+ 14.Kxg2 Bxd1 15.Nxc6 bxc6 16.Rfxd1 é melhor para as brancas.' }],
  // Coluna 14
  ['c14', 'f', 'f', '(f)', '6... f6 7 Be3 c4 8 g3 Bb4 9 Bg2 Nge7 10 O-O O-O 11 Ne1 Bf5 12 Nc2', { a: '⩲', r: 'Lputian–Tseitlin, Gemersky Pohar 1991', c: '6...f6 7.Be3 c4 8.g3 Bb4 9.Bg2 Nge7 10.O-O O-O 11.Ne1 Bf5 12.Nc2 é um pouco melhor para as brancas.' }],
  ['c14', 'g', 'g', '(g)', '8 dxc5 d4 9 Ne4 O-O 10 g3 Bf5', { a: '=', r: 'Nimzowitsch–Spielmann, Carlsbad 1907', c: '8.dxc5 d4 9.Ne4 O-O 10.g3 Bf5 é igual.' }],
  ['c14', 'h-A', 'h', '(h) A', '8... c4 9 Be2 Rb8 10 b3 Qa5 11 Rc1 b5 12 bxc4 bxc4', { a: '=', r: 'Tal–Vera, Málaga 1981', c: 'Outros lances aqui: 8...c4 9.Be2 Rb8 10.b3 Qa5 11.Rc1 b5 12.bxc4 bxc4 é igual.' }],
  ['c14', 'h-B', 'h', '(h) B', '8... Qb6 9 Bb5 O-O 10 O-O Bg4 11 Bxc6 Qxc6 12 dxc5 Qxc5 13 Qd4', { a: '⩲', r: 'Geller–Aronin, URSS 1949', c: '8...Qb6 9.Bb5 O-O 10.O-O Bg4 11.Bxc6 Qxc6 12.dxc5 Qxc5 13.Qd4 é um pouco melhor para as brancas.' }],
  ['c14', 'h-C', 'h', '(h) C', '8... O-O 9 dxc5 Qa5 10 Bb5 a6 11 Bxc6 bxc6 12 O-O', { a: '⩲', r: 'Szabó–Duckstein, Krems 1967', c: '8...O-O 9.dxc5 Qa5 10.Bb5 a6 11.Bxc6 bxc6 12.O-O é um pouco melhor para as brancas.' }],
  ['c14', 'i', 'i', '(i)', '9... O-O 10 Nxc6 bxc6 11 Be2 Be6 12 O-O', { a: '⩲', r: 'P. Nikolić–Kotronias, Kavala 1985', c: '9...O-O 10.Nxc6 bxc6 11.Be2 Be6 12.O-O é um pouco melhor para as brancas.' }],
  ['c14', 'j', 'j', '(j)', '12 Qxd4 Qxd4 13 exd4 Be6', { a: '=', r: 'Milos–Lima, São Paulo 2005', c: '12.Qxd4 Qxd4 13.exd4 Be6 é igual.' }],
  // Coluna 15
  ['c15', 'k', 'k', '(k)', '6 Na4 b5 7 cxb6 axb6 8 b3 Nf6 9 e3 Bd7 10 Qxd4 Nc6 11 Qb2 Ne4', { a: '∞', r: 'Kasparov', c: 'A linha antiga é 6.Na4 b5 7.cxb6 axb6 8.b3 Nf6 9.e3 Bd7 10.Qxd4 Nc6 11.Qb2 Ne4, quando as pretas têm jogo muito ativo pelo material (Kasparov).' }],
  ['c15', 'l', 'l', '(l)', '6... Qd5 7 Nd6+ Bxd6 8 cxd6 Nc6 9 e3', { a: '⩲', r: 'Bareev', c: '6...Qd5 7.Nd6+ Bxd6 8.cxd6 Nc6 9.e3 é um pouco melhor para as brancas (Bareev).' }],
  ['c15', 'm', 'm', '(m)', '7... Bxc5 8 Nxc5 Qa5+ 9 Bd2 Qxc5', { a: '=', c: '7...Bxc5 8.Nxc5 Qa5+ 9.Bd2 Qxc5 é outro plano razoável para as pretas.' }],
  ['c15', 'n', 'n', '(n)', '12 exd3 Bxf3 13 gxf3 Bxc5', { a: '=', r: 'Bareev–Lobron, Dortmund 1995', c: 'Depois de 12.exd3 Bxf3 13.gxf3 Bxc5 a posição é mais ou menos igual.' }],
  // Coluna 16
  ['c16', 'o', 'o', '(o)', '6... Nf6 7 Bg5 Be7 8 Bb5+ Kf8 9 Nge2 a6 10 Ba4 b5 11 Bc2 Bb7', { a: '=', r: 'Bronstein–Aronin, Moscou 1962', c: 'Depois de 6...Nf6 7.Bg5 Be7 8.Bb5+ Kf8 9.Nge2 a6 10.Ba4 b5 11.Bc2 Bb7 o jogo ficou mais ou menos igual.' }],
  ['c16', 'p', 'p', '(p)', '8 Nh3 a6 9 Qa4+ Bd7 10 Bb5', { a: '∓', r: 'Gerstner–Honsch, Bodensee 1998', c: 'Talvez seja melhor 8.Nh3 a6 9.Qa4+ Bd7 10.Bb5, com compensação quase suficiente pelo peão.' }],
  ['c16', 'q', 'q', '(q)', '10 Ng5+ Kg6 11 Qd2 Bxf4 12 Qxf4 Nh5 13 Qe5 Qxg5 14 h4 Qf4', { a: '∓', r: 'B. Vladimirov–Pankratov, URSS 1957', c: '10.Ng5+ Kg6 11.Qd2 Bxf4 12.Qxf4 Nh5 13.Qe5 Qxg5 14.h4, e agora 14...Qf4 é claramente melhor para as pretas.' }],
  ['c16', 'r', 'r', '(r)', '12 f3 exf3 13 Qxf3 Re8+ 14 Be2 b6 15 O-O Ra7 16 Qg3 Bxf4', { a: '∓', r: 'Bronstein–Marjanović, Kirovakan 1978', c: 'Depois de 12.f3 exf3 13.Qxf3 Re8+ 14.Be2 b6 15.O-O Ra7 16.Qg3 Bxf4 as brancas não têm compensação suficiente pelo peão.' }],
  // Coluna 17
  ['c17', 't', 't', '(t)', '7 Be2 cxd4 8 Nxd4 Bd6 9 O-O O-O 10 b3 Be5 11 Nxc6 bxc6 12 Bb2 Qd6 13 h3 Qe6 14 Bf3 Ne4', { a: '=', r: 'Hansen–Leko, Wijk aan Zee 1994', c: '7.Be2 cxd4 8.Nxd4 Bd6 9.O-O O-O 10.b3 Be5 é igual.' }],
  ['c17', 'u', 'u', '(u)', '8 dxc5 Bxc5 9 O-O O-O 10 b3 Bg4 11 Bb2 Rc8 12 Rc1 Bd6 13 h3 Bh5 14 Be2 Bb8 15 Nh4 Qd6 16 g3 Bxe2 17 Nxe2 Qe6', { a: '⩲', r: 'Karpov–Lautier, Melody Amber 2000', c: '8.dxc5 Bxc5 9.O-O O-O 10.b3 Bg4 11.Bb2 Rc8 deu só uma vantagem mínima às brancas.' }],
  ['c17', 'v', 'v', '(v)', '9... Be6 10 dxc5 Bxc5 11 b3', { a: '⩲', r: 'Karpov', c: '9...Be6 10.dxc5 Bxc5 11.b3 é um pouco melhor para as brancas (Karpov).' }],
  ['c17', 'w', 'w', '(w)', '11... Bd7 12 Ne5 Rc8 13 a3 a6 14 Ba4 b5 15 Bb3 Be6 16 Bc2 Qb6', { r: 'Karpov–Morović, Las Palmas 1994 (1–0)', c: 'As pretas têm chances razoáveis. O lance do texto melhora 11...Bd7?! de Karpov–Morović, que seguiu 12.Ne5 Rc8 13.a3 a6 14.Ba4 b5 15.Bb3 Be6 16.Bc2 Qb6, e Karpov venceu de forma brilhante com um ataque na ala do rei. (A continuação do livro tem um erro de impressão; a linha ficou até 16...Qb6.)' }],
  // Coluna 18
  ['c18', 'x', 'x', '(x)', '5 Qxd4 Nc6 6 Qd1 exd5 7 Qxd5 Be6', { c: '5.Qxd4 costuma levar à mesma posição do texto; o xeque 5.Qa4+ evita 5...Nc6 6.Qd1 exd5 7.Qxd5 Be6. (O livro traz 6...cxd5; o peão c preto já saiu.)' }],
  ['c18', 'y', 'y', '(y)', '5... b5 6 Qxd4 Nc6 7 Qd2 exd5 8 Qxd5 Bd7 9 Bg5 Nf6 10 Bxf6', { a: '⩲', r: 'Bareev–Ljubojević, Linares 1993', c: '5...b5?! 6.Qxd4 Nc6 7.Qd2 exd5 8.Qxd5 Bd7, e agora 9.Bg5 Nf6 10.Bxf6 é um pouco melhor para as brancas (Bareev). (O livro traz 7...cxd5; o peão c preto já saiu.)' }],
  ['c18', 'z', 'z', '(z)', '12 O-O Rfd8 13 a3', { a: '⩲', r: 'Horváth–Giacometti, Porto San Giorgio 2004', c: '12.O-O Rfd8 13.a3 é um pouco melhor para as brancas.' }],
]

const capitulo = {
  id: 'tarrasch-c',
  arquivo: 'tarrasch-c',
  nome: 'Defesa Tarrasch — outras linhas',
  fonte: 'Modern Chess Openings — Tarrasch Defense (pp. 447–448), colunas 13–18',
  base: '1. d4 d5 2. c4 e6 3. Nc3 c5',
  corPadrao: 'b',
  ordem: 447,
  grupos: [
    { id: 'nf3', nome: '5.Nf3 Nc6 sem 9.Bg5', colunas: [13, 14] },
    { id: 'dxc5', nome: '5.dxc5', colunas: [15] },
    { id: 'e4', nome: '5.e4', colunas: [16] },
    { id: 'e3', nome: '5.e3', colunas: [17] },
    { id: 'cxd4', nome: '4...cxd4', colunas: [18] },
  ],
}

module.exports = { capitulo, colunas, notas }
