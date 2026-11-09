// Transcrição do MCO 15ª ed. — Defesa Philidor (pp. 132–134).
// Gerar: node scripts/mco/gerar.cjs philidor
// Formato: ver gambito-do-rei.cjs. Dicas em philidor-dicas.cjs.

const PH = '1 e4 e5 2 Nf3 d6'

const colunas = {
  c01: [`${PH} 3 d4 Nf6 4 Nc3 Nbd7 5 Bc4 Be7 6 O-O O-O 7 a4 c6 8 Re1 b6 9 Bg5 a6 10 dxe5 Nxe5`, 'nf6-nd7', 'Nimzovich: 3...Nf6 4.Nc3 Nbd7 ... 8.Re1', '=',
    'Defesa Philidor: as pretas defendem e5 com o peão d. Com 3...Nf6 (ordem de Nimzovich) elas evitam as linhas mais agudas contra 3...Nd7 e mantêm o ponto forte em e5. As brancas ficam com uma leve vantagem de espaço, mas o jogo fica igual.'],
  c02: [`${PH} 3 d4 Nf6 4 Nc3 Nbd7 5 Bc4 Be7 6 O-O O-O 7 a4 c6 8 Qe2 exd4 9 Nxd4 Re8 10 Ba2 Bf8`, 'nf6-nd7', 'Nimzovich: 8.Qe2 exd4', '=',
    'Com 8.Qe2 as pretas trocam em d4 e pressionam e4 com a torre. O jogo fica igual.'],
  c03: [`${PH} 3 d4 Nd7 4 Bc4 c6 5 Nc3 Be7 6 dxe5 dxe5 7 Ng5 Bxg5 8 Qh5 Qe7 9 Qxg5 Ngf6 10 a4 O-O`, 'nf6-nd7', 'Variante Hanham: 3...Nd7', '⩲',
    'Variante Hanham: o cavalo vai para d7 para sustentar e5. O agressivo 7.Ng5 perdeu parte da força, e a linha voltou a ser jogada; as brancas ficam um pouco melhor.'],
  c04: [`${PH} 3 d4 exd4 4 Qxd4 Nf6 5 Bg5 Be7 6 Nc3 O-O 7 O-O-O Nc6 8 Qd2 a6 9 Kb1 b5 10 Bd3 Ne5`, 'exd4', '3...exd4 4.Qxd4', '=',
    'Com 3...exd4 as pretas abrem mão do centro. Retomando com a dama, as brancas rocam grande e o jogo fica agudo, com roques opostos.'],
  c05: [`${PH} 3 d4 exd4 4 Nxd4 Nf6 5 Nc3 Be7 6 Bf4 O-O 7 Qd2 c6 8 O-O-O b5 9 f3 b4 10 Nce2 c5`, 'exd4', '3...exd4 4.Nxd4', '=',
    'Retomando com o cavalo, as brancas também rocam grande; as pretas atacam com os peões do flanco da dama. Posição aguda, com chances para os dois lados.'],
  c06: [`${PH} 3 Bc4 Be7 4 O-O Nf6 5 d3 O-O 6 c3 c6 7 Bb3 Bg4 8 Nbd2 Nbd7 9 h3 Bh5 10 Re1 Nc5`, 'bc4', '3.Bc4', '=',
    'Com 3.Bc4 as brancas jogam de forma lenta e segura, mas com poucas chances de vantagem. A posição lembra algumas linhas tranquilas da Abertura do Bispo.'],
}

const notas = [
  ['c01', 'a', 'a', '(a)', '3... f5 4 exf5 e4 5 Ng5', { a: '⩲', r: 'análise de Larsen', c: 'Contra 3...f5 o mais simples é 4.exf5 e4 5.Ng5, seguido de f3.' }],
  ['c01', 'b', 'b', '(b)', '4 dxe5 Nxe4 5 Qd5 Nc5 6 Bg5 Qd7 7 exd6 Bxd6 8 Nc3 Qe6+ 9 Qxe6+ Nxe6 10 Be3 Bb4', { a: '=', r: 'Garrido Domínguez–Campora, Sevilha 2005', c: '4.dxe5 é uma tentativa de aproveitar esta ordem de lances, mas o jogo fica igual.' }],
  ['c01-b', '1', 'b', '(b) 5.Nbd2', '5 Nbd2 Nxd2 6 Bxd2 Be7 7 Bf4 d5', { a: '=', r: 'Geller–Campora, Moscou 1989', c: 'Com 5.Nbd2 também.' }],
  ['c01-b', '2', 'b', '(b) 9.Be3', '9 Be3', { a: '⩲', c: '9.Be3 é um pouco melhor para as brancas.' }],
  ['c01', 'c', 'c', '(c)', '5 g3 Be7 6 Bg2 O-O 7 O-O c6 8 a4 Re8 9 h3 Bf8 10 Re1 Qc7 11 a5', { a: '⩲', r: 'L. Milov–Kunin, Alemanha 2004', c: 'Uma estratégia lenta, mas sólida, é o fianqueto com 5.g3.' }],
  ['c01', 'd', 'd', '(d)', '6 dxe5 dxe5 7 Bxf7+ Kxf7 8 Ng5+ Kg8 9 Ne6 Qe8 10 Nxc7 Qg6 11 Nxa8 Qxg2 12 Rf1 Nc5', { a: '=', c: 'O sacrifício em f7 leva a chances iguais.' }],
  ['c01', 'e', 'e', '(e)', '7 dxe5 dxe5 8 Qe2 c6 9 a4 Qc7 10 h3 Nc5 11 Rd1 Ne6 12 Be3 a5', { a: '=', r: 'Rozentalis–Yanvarev, Uzhgorod 1987', c: 'Com 7.dxe5 o jogo fica igual.' }],
  ['c01', 'f', 'f', '(f)', '9 d5 cxd5 10 Nxd5 Nxd5 11 Bxd5 Rb8 12 Qd3 Nf6 13 Bb3 h6 14 Bd2 Bb7', { a: '=', r: 'O. Korneev–Panchenko, Rússia 1995', c: 'Com 9.d5 o jogo fica igual.' }],
  ['c01', 'g', 'g', '(g)', '11 Nxe5 dxe5 12 Qf3 Nd7 13 Be3 Bc5 14 Rad1 Qe7', { a: '=', r: 'Leskur–Stiković, Sérvia 2006', c: 'O jogo fica igual.' }],
  ['c01', 'g-B', 'g', '(g) 11.Be2', '11 Be2 h6 12 Bf4 Ng6 13 Be3 Ng4', { a: '=', r: 'Luciano–Kosten, Imperia 1993', c: 'Com 11.Be2 também.' }],
  ['c02', 'h-A', 'h', '(h) A', '8... a5 9 Rd1 exd4 10 Nxd4 Re8 11 Bf4 Ne5 12 Bb3 Nfd7', { a: '=', r: 'Petrushin–Savon, Podolsk 1992', c: 'Com 8...a5 o jogo fica mais ou menos igual.' }],
  ['c02', 'h-B', 'h', '(h) B', '8... Qc7 9 h3 b6 10 Rd1 Bb7 11 dxe5 Nxe5 12 Bb3 a5', { a: '⩲', c: 'Com 8...Qc7 as brancas ficam um pouco melhor.' }],
  ['c02', 'h-C', 'h', '(h) C', '8... b6 9 Rd1 Qc7 10 d5 c5 11 Nh4 a6 12 Nf5', { a: '⩲', r: 'J. Polgár–Izeta, Dos Hermanas 1993', c: 'Com 8...b6 também.' }],
  ['c02', 'i', 'i', '(i)', '11 Qf3 Ne5 12 Qd1 Ng6 13 Re1 a6', { a: '=', r: 'Skripchenko–Dorfman, França 2003', c: 'O jogo fica igual.' }],
  ['c03', 'j', 'j', '(j)', '4... Be7 5 dxe5 Nxe5 6 Nxe5 dxe5 7 Qh5', { a: '±', c: '4...Be7? perde um peão.' }],
  ['c03', 'k-A', 'k', '(k) A', '5 O-O Be7 6 dxe5 dxe5 7 Ng5', { c: '5.O-O Be7 6.dxe5 dxe5 7.Ng5 é parecido com a coluna.' }],
  ['c03', 'k-B', 'k', '(k) B', '5 Ng5 Nh6 6 O-O Be7 7 Qh5 O-O 8 c3 Nf6', { a: '=', c: 'Com 5.Ng5 o jogo fica mais ou menos igual.' }],
  ['c03', 'l', 'l', '(l)', '9 Bxg5 Ngf6', { a: '=', c: 'Com 9.Bxg5 o jogo fica igual.' }],
  ['c03', 'm', 'm', '(m)', '11 b3', { a: '⩲', r: 'Brenjo–Đošić, Belgrado 2005 (que seguiu 11.O-O Qb4)', c: 'Agora 11.b3, em vez de 11.O-O Qb4, deixa as brancas um pouco melhor.' }],
  ['c04', 'n-A', 'n', '(n) A', '4... a6 5 Bg5 Nc6 6 Qd2 Be7 7 Bxe7 Ngxe7 8 Nc3 O-O 9 h3', { a: '⩲', r: 'Sutovsky–Bacrot, Internet 2003', c: 'Muitos lances já foram jogados aqui; com 4...a6 as brancas ficam com uma vantagem muito pequena.' }],
  ['c04', 'n-B', 'n', '(n) B', '4... Nc6 5 Bb5 Bd7 6 Bxc6', { c: '4...Nc6 5.Bb5 Bd7 6.Bxc6 foi jogado em muitas partidas do século XIX.' }],
  ['c04', 'n-C', 'n', '(n) C', '4... Bd7 5 Bf4 Nc6 6 Qd2 Nge7 7 Nc3 Ng6 8 Bg5 Be7 9 Bxe7 Qxe7 10 O-O-O', { a: '⩲', r: 'Kurajica–Westerinen, Solingen 1974', c: 'Com 4...Bd7 as brancas ficam um pouco melhor.' }],
  ['c04', 'o', 'o', '(o)', '5 e5 dxe5 6 Qxd8+ Kxd8 7 Nxe5 Be6 8 Bc4 Bxc4', { a: '=', c: '5.e5 leva à igualdade.' }],
  ['c04', 'p', 'p', '(p)', '8... Be6 9 h4 Re8 10 Bb5 a6 11 Bxc6 bxc6 12 Nd4 Bd7 13 f3 h6 14 Be3 d5 15 exd5 Nxd5 16 Nxc6', { a: '⩲', r: 'Rozentalis–Glek, Budapeste 1996', c: 'Com 8...Be6 as brancas ficam um pouco melhor.' }],
  ['c04', 'q', 'q', '(q)', '11 Nxe5 dxe5 12 f3 c6', { a: '=', r: 'Sax–Tseshkovsky, Banja Luka 1981', c: 'O jogo fica igual.' }],
  ['c05', 'r', 'r', '(r)', '4... g6 5 Nc3 Bg7 6 Be3 Nf6 7 Qd2 O-O 8 O-O-O Re8 9 f3 Nc6 10 h4 Nxd4 11 Bxd4 Be6', { a: '±', r: 'V. Chernov–Negulescu, Romênia 1995', c: '4...g6 é outra linha; as brancas atacam com o roque grande e h4. (O livro repete “6 Be3 Bg7”; o lance preto é 6...Nf6.)' }],
  ['c05', 't', 't', '(t)', '7... d5 8 Ndb5 Bb4 9 O-O-O c6 10 Nc7 Nxe4 11 Qe3 Bc5 12 Qxe4 Qxc7 13 Bxc7', { a: '±', c: 'Com 7...d5 as brancas ficam melhor. (No 6º lance as brancas também podem jogar 6.Bc4, 6.Be2, 6.g3 ou até 6.Qf3.)' }],
  ['c05-t', '1', 't', '(t) 11...Nxc3', '11... Nxc3 12 bxc3 Ba3+ 13 Kb1 Na6 14 Nxa8', { a: '±', r: 'Kalegin–Ryabchenko, Rússia 1992', c: 'Com 11...Nxc3 também.' }],
  ['c05', 'u', 'u', '(u)', '8... d5 9 exd5 Nxd5 10 Nxd5 Qxd5 11 Kb1', { a: '⩲', r: 'Leko–Barbero, Hungria 1994', c: 'Com 8...d5 as brancas ficam um pouco melhor.' }],
  ['c05', 'v', 'v', '(v)', '10 Nb1', { a: '=', r: 'recomendação de Am. Rodríguez', c: '10.Nb1! é pelo menos igual para as brancas.' }],
  ['c05', 'w', 'w', '(w)', '11 Nf5 Bxf5 12 exf5 d5 13 g4 d4', { a: '⩱', r: 'Am. Rodríguez–Conquest, Cienfuegos 1996 (até 12.exf5)', c: 'Agora 12...d5 13.g4 d4 favoreceria levemente as pretas.' }],
  ['c06', 'y', 'y', '(y)', '4 d4 exd4 5 Nxd4', { c: '4.d4 exd4 5.Nxd4 transpõe para a coluna 5. (Outras escolhas no 3º lance preto: 3...Nd7, 3...Qf6, 3...Be6, 3...Bg4 e 3...Nc6.)' }],
  ['c06', 'z', 'z', '(z)', '7... Be6', { c: '7...Be6 e 7...Nbd7 também podem ser jogados.' }],
  ['c06', 'aa-A', 'aa', '(aa) 10...d5?!', '10... d5 11 exd5 cxd5 12 g4 Bg6 13 Nxe5 Nxe5 14 Rxe5', { a: '±', c: '10...d5?! é bom para as brancas: as pretas não têm compensação suficiente pelo peão. (O livro escreve 11.cxd5; o peão que captura é o de e4.)' }],
  ['c06', 'aa', 'aa', '(aa)', '11 Bc2 Ne6 12 Nf1 Nd7 13 Ng3 Bxf3 14 Qxf3 g6 15 Be3 Bg5', { a: '=', r: 'Gelfand–Yusupov, Munique 1994', c: 'Depois de 10...Nc5 o jogo fica completamente igual.' }],
]

const capitulo = {
  id: 'philidor',
  arquivo: 'philidor',
  nome: 'Defesa Philidor',
  fonte: 'Modern Chess Openings — Philidor’s Defense (pp. 132–134), colunas 1–6',
  base: '1. e4 e5 2. Nf3 d6',
  corPadrao: 'b',
  ordem: 132,
  grupos: [
    { id: 'nf6-nd7', nome: '3.d4 — Nimzovich (3...Nf6) e Hanham (3...Nd7)', colunas: [1, 2, 3] },
    { id: 'exd4', nome: '3.d4 exd4', colunas: [4, 5] },
    { id: 'bc4', nome: '3.Bc4', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
