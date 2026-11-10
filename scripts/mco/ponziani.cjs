// Transcrição do MCO 15ª ed. — Abertura Ponziani (pp. 135–137).
// Gerar: node scripts/mco/gerar.cjs ponziani
// Formato: ver gambito-do-rei.cjs. Dicas em ponziani-dicas.cjs.

const PZ = '1 e4 e5 2 Nf3 Nc6 3 c3'

const colunas = {
  c01: [`${PZ} Nf6 4 d4 Nxe4 5 d5 Ne7 6 Nxe5 Ng6 7 Nxg6 hxg6 8 Qe2 Qe7 9 Bf4 d6 10 Na3 Rh5 11 O-O-O Rf5`, 'nf6', '3...Nf6 4.d4 Nxe4 5.d5 Ne7', '=',
    'Abertura Ponziani: com 3.c3 as brancas preparam d4 para montar um centro forte de peões. O plano é um pouco cru: com 3...Nf6 4.d4 Nxe4 as pretas eliminam o peão de e4 e igualam com facilidade.'],
  c02: [`${PZ} Nf6 4 d4 Nxe4 5 d5 Nb8 6 Bd3 Nc5 7 Nxe5 Nxd3+ 8 Nxd3 d6 9 O-O Be7 10 Qf3 O-O 11 Be3 Nd7`, 'nf6', '3...Nf6: 5...Nb8', '=',
    'Com 5...Nb8 o cavalo volta para casa e depois troca o bispo de d3. O jogo fica igual.'],
  c03: [`${PZ} Nf6 4 d4 d5 5 Bb5 exd4 6 e5 Ne4 7 Nxd4 Bc5 8 O-O O-O 9 Bxc6 bxc6 10 Be3 Qe8 11 f3 Nd6`, 'nf6', '3...Nf6 4.d4 d5', '=',
    'Com 4...d5 as pretas forçam trocas no centro e igualam.'],
  c04: [`${PZ} d5 4 Qa4 Nf6 5 Nxe5 Bd6 6 Nxc6 bxc6 7 d3 O-O 8 Be2 Re8 9 Bg5 Rb8 10 Qc2 h6 11 Bxf6 Qxf6`, 'd5', '3...d5 4.Qa4 Nf6', '=',
    'Com 3...d5 as pretas buscam a iniciativa e o jogo fica agudo. Depois de 4.Qa4 elas entregam o peão de e5 com 4...Nf6 e têm compensação suficiente.'],
  c05: [`${PZ} d5 4 Qa4 f6 5 Bb5 Ne7 6 exd5 Qxd5 7 d4 e4 8 c4 Qd7 9 d5 exf3 10 gxf3 Qh3 11 dxc6 b6`, 'd5', '3...d5 4.Qa4 f6', '=',
    'Com 4...f6 as pretas solidificam o centro em vez de sacrificar. As duas maneiras levam a uma igualdade aproximada.'],
  c06: [`${PZ} d5 4 Bb5 dxe4 5 Nxe5 Qd5 6 Qa4 Ne7 7 f4 exf3 8 Nxf3 Be6 9 O-O O-O-O 10 d4 Qh5 11 c4 Bg4`, 'd5', '3...d5 4.Bb5', '=',
    'Com 4.Bb5 surge uma posição aguda, com chances para os dois lados.'],
}

const notas = [
  ['c01', 'a', 'a', '(a)', '5... Bc5 6 dxc6 Bxf2+ 7 Ke2 bxc6 8 Qa4 f5 9 Nbd2 O-O 10 Nxe4 fxe4 11 Qxe4 Bb6 12 Kd2 d6 13 Bd3 Bf5 14 Qxc6', { a: '±', r: 'Hector–Sandström, Copenhague 1991', c: 'Com 5...Bc5 as brancas ficam melhor.' }],
  ['c01-a', '1', 'a', '(a) 6...Nxf2', '6... Nxf2 7 Qd5 Qe7 8 cxb7', { a: '±', c: 'Com 6...Nxf2 também.' }],
  ['c01', 'b-A', 'b', '(b) A', '7 Bd3 Nxe5 8 Bxe4 Bc5 9 Qh5 d6 10 Bg5 Bg4', { a: '∓', r: 'análise de Anand', c: 'Com 7.Bd3, 10...Bg4! deixa as pretas melhor.' }],
  ['c01', 'b-B', 'b', '(b) B', '7 Qd4 Qf6 8 Qxe4 Qxe5', { a: '=', r: 'Lukin–Guliev, Katowice 1991', c: 'Com 7.Qd4 o jogo fica igual.' }],
  ['c01', 'c', 'c', '(c)', '9 Be3 Rh5 10 c4 Qe5 11 f4 Bb4+ 12 Kd1 Qe7', { a: '=', r: 'Makropoulos–P. Nikolić, Atenas 1985', c: 'Com 9.Be3 o jogo fica mais ou menos igual.' }],
  ['c01', 'd', 'd', '(d)', '10... Nf6 11 O-O-O Qxe2 12 Bxe2 Bg4 13 f3 Bd7 14 Nb5', { a: '⩲', r: 'Delchev–Plachetka, Metz 2002', c: 'Com 10...Nf6 as brancas ficam um pouco melhor.' }],
  ['c01', 'e', 'e', '(e)', '12 Qe3', { a: '=', r: 'Hector–Khalifman, Londres 1991', c: 'Com 12.Qe3 o jogo fica igual. (O livro continua 12...Bf6 13.Bb5+ Kd8, mas o bispo de f8 não chega a f6 com a dama em e7.)' }],
  ['c02', 'f', 'f', '(f)', '6 Nxe5 Qe7 7 Qd4 Nxc3 8 Nxc3 d6 9 Bb5+ Nd7', { a: '∓', r: 'Söderberg–Ernst, Copa Sueca 2001', c: 'Com 6.Nxe5 as pretas ficam melhor.' }],
  ['c02', 'g', 'g', '(g)', '6... Nf6 7 Nxe5 Bc5 8 O-O O-O 9 b4 Bb6 10 Bg5 h6 11 Bh4 d6 12 Nc4', { a: '⩲', r: 'Chigorin–Gunsberg, Havana 1890', c: 'Com 6...Nf6 as brancas ficam um pouco melhor.' }],
  ['c02', 'h', 'h', '(h)', '8... Be7 9 Qg4 O-O 10 Bh6 Bf6 11 d6', { a: '⩲', r: 'Blad–Clarke, Lugano 1968', c: 'Com 8...Be7 também.' }],
  ['c02', 'i', 'i', '(i)', '12 Nd2 Bf6 13 h3', { a: '=', r: 'Dueckstein–Prameshuber, Krems 1967', c: 'O jogo fica igual.' }],
  ['c03', 'j', 'j', '(j)', '4... d6 5 Bd3 Be7 6 O-O O-O 7 h3 exd4 8 cxd4 Nb4 9 Nc3 Nxd3 10 Qxd3', { a: '⩲', r: 'Dolmatov–Plachetka, Hradec Králové 1981', c: 'Com 4...d6 as brancas ficam com uma pequena vantagem.' }],
  ['c03-j', '1', 'j', '(j) 5.Bb5', '5 Bb5 Bd7', { c: '5.Bb5 Bd7 transporia para a Ruy López.' }],
  ['c03', 'k', 'k', '(k)', '5... Nxe4 6 Nxe5 Bd7 7 Bxc6 bxc6 8 O-O Be7 9 Nd2 Nxd2', { a: '=', r: 'Pérez González–Hernández, Humanidad Open 2006', c: 'Com 5...Nxe4 o jogo fica igual.' }],
  ['c03', 'l', 'l', '(l)', '7... Bd7 8 Qb3 a6 9 Be2 Bc8 10 Nxc6 bxc6', { a: '=', r: 'Makropoulos–Dorfman, Zamárdi 1980', c: '7...Bd7 também é possível; as chances ficam iguais.' }],
  ['c03', 'm', 'm', '(m)', '10 b4 Bxd4 11 cxd4 Ba6 12 Re1 Qh4', { a: '∓', r: 'Bator–Berkell, Suécia 1986', c: 'Com 10.b4 as pretas ficam melhor.' }],
  ['c04', 'n', 'n', '(n)', '3... f5 4 d4 fxe4 5 Nxe5 Qf6 6 Ng4 Qg6 7 d5 Nb8 8 Bf4 d6 9 Ne3', { a: '±', r: 'Bogdanov–Tsvetkov, Sófia 1955', c: '3...f5 lembra um Gambito Letão; as brancas ficam melhor.' }],
  ['c04', 'o', 'o', '(o)', '4... Bd7 5 exd5 Nd4 6 Qd1 Nxf3+ 7 Qxf3 Nf6 8 Bc4 e4 9 Qe2 Bd6 10 d3 O-O 11 dxe4 Nxe4 12 Be3 f5 13 Nd2 Nxd2 14 Qxd2 f4 15 Bd4 Qe7+', { a: '=', r: 'Kranzl–Blatny, Viena 1991', c: 'Com 4...Bd7 as chances ficam mais ou menos iguais.' }],
  ['c04', 'p-A', 'p', '(p) A', '7 Qxc6+ Bd7 8 Qa6 dxe4', { c: 'Pegar o peão com 7.Qxc6+ não é bom para as brancas. (O livro escreve 8...dxe5; o peão de d5 captura em e4.)' }],
  ['c04', 'p-B', 'p', '(p) B', '7 d4 dxe4 8 Ba6 Bd7 9 Bb7 c5', { c: '7.d4 também não é bom para as brancas. (O livro escreve 7...dxe5; o peão de d5 captura em e4.)' }],
  ['c04', 'q', 'q', '(q)', '8... Qe8 9 Nd2 Rb8 10 O-O c5', { a: '∞', r: 'Nowak–Kaikamdzhozov, Sófia 1970', c: 'Com 8...Qe8 as pretas têm compensação suficiente pelo peão.' }],
  ['c04', 'r', 'r', '(r)', '12 Nd2 Qg6 13 Bf3 dxe4 14 dxe4 Ba6 15 O-O-O c5', { a: '=', r: 'Kurnosov–Smirnov, Rússia 2002', c: 'O jogo fica igual.' }],
  ['c05', 's-A', 's', '(s) A', '7... Bd7 8 Be3 exd4 9 cxd4 Ne5 10 Nc3 Nxf3+ 11 gxf3 Qf5 12 O-O-O a6 13 d5', { a: '±', r: 'Maas–Mitchell, Londres 1912', c: 'Com 7...Bd7 as brancas ficam melhor.' }],
  ['c05', 's-B', 's', '(s) B', '7... a6 8 Bc4 Qe4+ 9 Be3 exd4 10 cxd4 Bd7', { a: '∞', c: '7...a6 talvez seja jogável.' }],
  ['c05', 't', 't', '(t)', '12 Qd1 Ng6', { a: '=', r: 'análise de Zagorovsky', c: 'As chances ficam iguais.' }],
  ['c06', 'u', 'u', '(u)', '4... Qd6 5 exd5 Qxd5 6 Qe2 f6 7 d4 Bd7 8 dxe5 Nxe5 9 Bxd7+ Kxd7 10 Nxe5+ Qxe5 11 Qxe5 fxe5 12 Nd2', { a: '⩲', r: 'Sakaev–N. Mitkov, Leningrado 1991', c: 'Com 4...Qd6 as brancas ficam um pouco melhor.' }],
  ['c06-u', '1', 'u', '(u) 7...Bg4', '7... Bg4 8 c4 Bxf3 9 cxd5 Bxe2 10 Kxe2 a6 11 dxc6 axb5 12 cxb7', { a: '±', r: 'Sakaev–A. Ivanov, Leningrado 1990', c: 'Com 7...Bg4 as brancas ficam melhor.' }],
  ['c06', 'v', 'v', '(v)', '5... Qg5 6 Qa4 Qxg2 7 Bxc6+ bxc6 8 Qxc6+ Kd8 9 Rf1 Bh3 10 Qxa8+ Ke7 11 Kd1 Qxf1+ 12 Kc2 Bf5 13 Na3', { a: '∞', r: 'Berg–K. Mueller, correspondência 1991', c: 'Com 5...Qg5 o jogo fica confuso (6.d4 também é possível).' }],
  ['c06', 'w', 'w', '(w)', '7... Bd7 8 Nxd7 Kxd7 9 Bc4 Qf5 10 d4 exd3', { a: '=', r: 'Olsson–Hector, Suécia 2003', c: 'Com 7...Bd7 o jogo fica igual.' }],
  ['c06', 'x', 'x', '(x)', '8... Bd7 9 O-O O-O-O 10 d4 Qh5 11 Nbd2', { a: '⩲', r: 'Falkbeer–Anderssen, Berlim 1851 (até 10...Qh5)', c: 'Com 8...Bd7, 11.Nbd2 dá uma pequena vantagem às brancas.' }],
  ['c06', 'y', 'y', '(y)', '12 d5 Nf5 13 Bf4 Bc5+ 14 Kh1 Ncd4 15 b4 Bxf3 16 Rxf3 Nxf3 17 bxc5 Nxh2 18 Bxh2 Ng3+', { a: '=', r: 'Filchev–Pelitov, Sófia 1954 (até 15.b4); análise de Filchev', c: 'A sequência termina em empate.' }],
  ['c06', 'y-B', 'y', '(y) 11.Nbd2', '11 Nbd2', { c: 'Em vez de 11.c4, as brancas poderiam tentar 11.Nbd2.' }],
]

const capitulo = {
  id: 'ponziani',
  arquivo: 'ponziani',
  nome: 'Abertura Ponziani',
  fonte: 'Modern Chess Openings — Ponziani’s Opening (pp. 135–137), colunas 1–6',
  base: '1. e4 e5 2. Nf3 Nc6 3. c3',
  corPadrao: 'w',
  ordem: 135,
  grupos: [
    { id: 'nf6', nome: '3...Nf6', colunas: [1, 2, 3] },
    { id: 'd5', nome: '3...d5', colunas: [4, 5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
