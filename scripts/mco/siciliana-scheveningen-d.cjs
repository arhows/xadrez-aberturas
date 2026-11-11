// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Scheveningen, Ataque Inglês (pp. 300–301), colunas 19–24.
// Gerar: node scripts/mco/gerar.cjs siciliana-scheveningen-d
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-scheveningen-d-dicas.cjs.
//
// A tabela só traz avaliação no fim da coluna 20; nas outras a avaliação vem da nota que continua a coluna.
// Coluna 19: o livro termina com "14...Nxa4(f)", mas a nota (f) é da coluna 20; a continuação está na nota (e).
// Nota (e): o livro escreve "22...Bb4"; há um peão branco em b4, então é 22...Bxb4.
// Nota (l): o livro escreve "7...Nc6 8 Bg5 Nd7"; a transposição para o Ataque Keres é 8 g5 Nd7.

const B = '1 e4 c5 2 Nf3 e6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 d6 6 Be3'

const colunas = {
  c19: [`${B} a6 7 f3 b5 8 g4 h6 9 Qd2 Bb7 10 O-O-O Nbd7 11 h4 b4 12 Na4 Qa5 13 b3 Nc5 14 a3 Nxa4`, 'f3', '7.f3 b5 8.g4 h6', '=',
    'No Ataque Inglês as brancas jogam Be3, f3, Qd2 e g4, rocam grande e atacam na ala do rei. As pretas respondem com ...b5 e contra-atacam na ala da dama. Com 8...h6 o avanço g5 fica mais lento, e o jogo termina igual.'],
  c20: [`${B} a6 7 f3 b5 8 g4 Bb7 9 Qd2 Nfd7 10 O-O-O Nb6 11 Qf2 N8d7 12 Bd3 Rc8 13 Nce2 Na4 14 Kb1 Ndc5`, 'f3', '8...Bb7 9.Qd2 Nfd7', '∓',
    'Com 8...Bb7 e 9...Nfd7 as pretas trazem os cavalos para b6, a4 e c5, onde pressionam o rei branco já rocado. As pretas ficam um pouco melhor.'],
  c21: [`${B} a6 7 f3 b5 8 Qd2 Bb7 9 O-O-O Nbd7 10 g4 Nb6 11 h4 Rc8 12 h5 Nfd7 13 g5 b4 14 Nb1 d5`, 'f3', '8.Qd2 Bb7', '∓',
    'Com 8.Qd2 as brancas rocam antes de g4. O avanço 11.h4?! é lento demais: as pretas expulsam o cavalo com ...b4, abrem o centro com ...d5 e ficam um pouco melhor.'],
  c22: [`${B} a6 7 g4 e5 8 Nf5 g6 9 g5 gxf5 10 exf5 d5 11 Qf3 d4 12 O-O-O Nbd7 13 Bd2 Qa5 14 a3 dxc3`, 'outros', '6...a6 7.g4', '±',
    'Com 7.g4 as brancas jogam como no Ataque Keres. Depois de 7...e5 8.Nf5 g6 9.g5 elas sacrificam uma peça para abrir o rei preto e ficam melhor.'],
  c23: [`${B} Nc6 7 f3 Be7 8 Qd2 O-O 9 O-O-O d5 10 exd5 Nxd5 11 Nxd5 Qxd5 12 Nxc6 Qxc6 13 Bd3 Rd8 14 Qa5 Rd5`, 'outros', '6...Nc6 7.f3', '±',
    'Com 6...Nc6 e 9...d5 as pretas abrem o centro logo depois do roque grande. As peças se trocam, e as brancas ficam melhor.'],
  c24: [`${B} Nc6 7 f4 Be7 8 Qf3 Qc7 9 O-O-O a6 10 g4 Nxd4 11 Bxd4 e5 12 fxe5 dxe5 13 Qg3 Bd6 14 Be3 Bxg4`, 'outros', '7.f4', '∞',
    'Com 7.f4 e 8.Qf3 as brancas preparam o roque grande e g4. As pretas pegam o peão de g4, mas as brancas têm boa compensação.'],
}

const notas = [
  // Coluna 19
  ['c19', 'a', 'a', '(a)', '7 Qd2 b5 8 f3', { c: '7.Qd2 b5 8.f3 costuma só transpor para as colunas seguintes.' }],
  ['c19-a', '1', 'a', '(a) 7...Ng4', '7... Ng4 8 Bg5', { a: '⩲', c: 'As brancas ficam contentes se as pretas escolherem 7...Ng4?! 8.Bg5.' }],
  ['c19', 'b', 'b', '(b)', '9 h4 b4 10 Nce2 e5 11 Nb3 Be6 12 Rg1 Nfd7 13 g5 hxg5 14 hxg5 g6', { a: '=', r: 'Socko–Najer, Campeonato Europeu 2001', c: 'Com 9.h4 b4 10.Nce2 e5 o jogo fica igual.' }],
  ['c19', 'c', 'c', '(c)', '11 Bd3 Ne5 12 Rhe1 Rc8 13 Kb1 Nfd7 14 f4 Nc4 15 Qe2 Nxe3', { a: '=', r: 'Ozolin–Smirnov, Privolzhsky 2005', c: 'Com 11.Bd3 Ne5 as pretas trocam o bispo de e3 e igualam.' }],
  ['c19', 'd', 'd', '(d)', '12 Nce2 d5 13 Bh3 dxe4 14 g5 hxg5 15 hxg5 exf3 16 Ng3 Ne4', { a: '∓', r: 'Sanchez–Arlandi, Aosta 2003', c: '12.Nce2 d5 favorece as pretas.' }],
  ['c19', 'e', 'e', '(e)', '15 axb4 Qc7 16 bxa4 d5 17 e5 Nd7 18 f4 Nb6 19 f5 Nxa4 20 fxe6 Nc3 21 exf7+ Kxf7 22 Bd3 Bxb4 23 Qf2+ Kg8 24 Rdf1', { a: '=', r: 'Ambartsumian–Minasian, Erevan 2007', c: 'Depois de 15.axb4 Qc7 16.bxa4 d5 as chances ficam mais ou menos iguais.' }],
  // Coluna 20
  ['c20', 'f', 'f', '(f)', '9 g5 Nfd7 10 a3 Nb6 11 Qd2 N8d7 12 f4 Nc5 13 Bd3 d5', { a: '∓', r: 'Fogarasi–Nakamura, Budapeste 2002', c: 'Com 9.g5 Nfd7 as pretas ficam um pouco melhor.' }],
  ['c20', 'g', 'g', '(g)', '9... Nc6 10 O-O-O Be7 11 Nxc6 Bxc6 12 Ne2 O-O 13 g5 Nd7 14 Nd4 Bb7 15 h4 d5', { a: '=', r: 'Gelfand–J. Polgár, partida rápida 2003', c: '9...Nc6 também iguala.' }],
  ['c20', 'h-A', 'h', '(h) A', '11 Bd3 N8d7 12 h4 Rc8 13 Kb1 Ne5', { a: '=', r: 'Pedersen–Vasquez, Copenhague 2005', c: 'Com 11.Bd3 N8d7 o jogo fica igual.' }],
  ['c20', 'h-B', 'h', '(h) B', '11 Nb3', { c: '11.Nb3, com a ideia de Na5, é razoável.' }],
  ['c20', 'i', 'i', '(i)', '12 Kb1 Rc8 13 Bd3 Rxc3 14 bxc3 Qc7', { r: 'Movsesian–Kasparov, Bósnia 2000', c: 'Com 12.Kb1 Rc8 13.Bd3 Rxc3!? as pretas têm jogo ativo pela qualidade.' }],
  // Coluna 21
  ['c21', 'j-A', 'j', '(j) A', '11 Qf2 Nfd7', { c: 'Melhor é 11.Qf2 Nfd7, que transpõe para a coluna anterior.' }],
  ['c21', 'j-B', 'j', '(j) B', '11 Nb3 Rc8 12 Na5 Ba8', { r: 'De la Riva–Grischuk, Olimpíada de Calvià 2004', c: 'Com 11.Nb3 Rc8! 12.Na5 Ba8 as pretas ficam com um jogo ativo.' }],
  ['c21', 'k', 'k', '(k)', '15 Bh3 Nc4 16 Qe2 Qa5', { a: '∓', r: 'Shulman–M. Frank, U.S. Amateur East 2002', c: 'Com 15.Bh3?! Nc4 as pretas ficam um pouco melhor.' }],
  // Coluna 22
  ['c22', 'l-A', 'l', '(l) A', '7... Nc6 8 g5 Nd7', { c: 'As pretas podem transpor para o Ataque Keres com 7...Nc6 8.g5 Nd7.' }],
  ['c22', 'l-B', 'l', '(l) B', '7... h6 8 f4 Nc6 9 h3 Qc7', { a: '=', r: 'Brunello–Vallejo Pons, Saint Vincent 2005', c: '7...h6 8.f4 Nc6 9.h3 Qc7 dá chances razoáveis às pretas.' }],
  ['c22', 'm', 'm', '(m)', '11 gxf6 d4 12 Bc4 Qc7 13 Qd3 dxe3 14 O-O-O exf2 15 Bxf7+ Kxf7 16 Qd5+ Kxf6 17 Ne4+ Ke7 18 f6+ Ke8 19 f7+ Ke7 20 Qd2 Qb6 21 Qg5+ Kxf7 22 Rhf1 Bh6 23 Rxf2+ Ke8 24 Rd8+ Qxd8 25 Qxh6 Qe7 26 Nf6+ Kd8 27 Nd5 Qe6 28 Qg5+ Kd7 29 Qg7+ Kc6 30 Rf6', { a: '±', r: 'Carlsen–Sammalvuo, Gausdal 2004', c: 'Também é perigoso 11.gxf6, com um ataque longo sobre o rei preto.' }],
  ['c22', 'n', 'n', '(n)', '15 Bxc3 Qa4 16 gxf6', { a: '±', r: 'Ivanchuk–van Wely, Melody Amber 2005', c: 'Com 15.Bxc3 Qa4 16.gxf6 as brancas ficam melhor.' }],
  // Coluna 23
  ['c23', 'o', 'o', '(o)', '8... a6 9 g4 O-O 10 O-O-O Nxd4 11 Qxd4 b5 12 g5 Nd7 13 h4', { a: '±', r: 'Mahia–Vasquez, Assunção 2003', c: 'Com 8...a6 9.g4 o ataque branco chega primeiro.' }],
  ['c23', 'p', 'p', '(p)', '9 g4 d5 10 g5 Nh5 11 O-O-O Nxd4 12 Qxd4 Bxg5 13 Kb1 Kh8 14 Rg1 e5 15 Qxd5 Qxd5', { a: '=', r: 'Z. Almási–Balogh, Aeroflot Open 2007', c: 'Com 9.g4 d5 o jogo fica igual.' }],
  ['c23', 'q', 'q', '(q)', '10 Qe1 e5 11 Nxc6 bxc6 12 exd5 cxd5 13 Bg5 Be6 14 Bc4 Bb4 15 Qxe5 Bxc3 16 bxc3 Nd7', { a: '∓', r: 'Korneev–Timofeev, Montreal 2007', c: 'Com 10.Qe1 e5 as pretas ficam um pouco melhor.' }],
  ['c23', 'r', 'r', '(r)', '15 Qe1 Bd7 16 Kb1', { a: '±', r: 'Kovalev–Kaufeld, Eupen 2006', c: 'Com 15.Qe1 Bd7 16.Kb1 as brancas ficam melhor.' }],
  // Coluna 24
  ['c24', 's', 's', '(s)', '7... e5 8 Nf3 Ng4 9 Qd2 Nxe3 10 Qxe3 exf4 11 Qxf4 Be7 12 O-O-O Be6 13 Nd5 O-O 14 Kb1 Rc8', { a: '=', r: 'Sutovsky–Topalov, Dortmund 2005', c: 'Uma alternativa mais segura é 7...e5 8.Nf3 Ng4, que troca o bispo de e3 e iguala.' }],
  ['c24', 't', 't', '(t)', '15 Rd3', { a: '∞', r: 'Hamdouchi–Goullev, Bordeaux 2005', c: 'Com 15.Rd3 as brancas têm boa compensação pelo peão.' }],
]

const capitulo = {
  id: 'siciliana-scheveningen-d',
  arquivo: 'siciliana-scheveningen-d',
  nome: 'Siciliana Scheveningen — Ataque Inglês (6.Be3)',
  fonte: 'Modern Chess Openings — Sicilian Defense, Scheveningen Variation, English Attack (pp. 300–301), colunas 19–24',
  base: '1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 d6 6. Be3',
  corPadrao: 'b',
  ordem: 300,
  grupos: [
    { id: 'f3', nome: '6...a6 7.f3', colunas: [19, 20, 21] },
    { id: 'outros', nome: '7.g4 e 6...Nc6', colunas: [22, 23, 24] },
  ],
}

module.exports = { capitulo, colunas, notas }
