// Transcrição do MCO 15ª ed. — Defesa Robatsch (Moderna), 3.Nf3, 3.c3 e 3.c4 (pp. 376–377), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs robatsch-b
// Formato: ver gambito-do-rei.cjs. Dicas em robatsch-b-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; a avaliação vem da nota que continua cada coluna.
// Erro do livro: em (i) "14 Ncxe4 h6" perde uma peça (15.Nf3); usei 14...d5!, que recupera o material.

const B = '1 e4 g6 2 d4 Bg7'

const colunas = {
  c07: [`${B} 3 Nf3 d6 4 Bc4 Nf6 5 Qe2 O-O 6 O-O Bg4 7 e5 dxe5 8 dxe5 Nd5 9 Nbd2 Nb6 10 Bb3 Nc6`, 'nf3', '3.Nf3 d6 4.Bc4', '=',
    'O lance 3.Nf3 é simples e bom. Contra 4.Bc4 Nf6 5.Qe2 as pretas rocam, cravam o cavalo com 6...Bg4 e, depois de 7.e5 dxe5 8.dxe5 Nd5, atacam o peão de e5 com os cavalos, igualando.'],
  c08: [`${B} 3 Nf3 d6 4 c3 Nc6 5 Bd3 e5 6 dxe5 dxe5 7 O-O Nf6 8 b4 a6 9 a4 O-O 10 Ba3 Re8`, 'nf3', '4.c3 Nc6 5.Bd3 e5', '=',
    'Com 4.c3 as brancas fecham a grande diagonal do bispo de g7. As pretas reagem no centro com 4...Nc6 e 5...e5, como recomenda o livro contra as linhas com c3, e igualam.'],
  c09: [`${B} 3 c3 d6 4 f4 Nf6 5 Bd3 e5 6 Nf3 exd4 7 cxd4 O-O 8 Nc3 Nc6 9 O-O Bg4 10 Be3 Re8`, 'c3', '3.c3 d6 4.f4', '=',
    'Com 3.c3 e 4.f4 as brancas montam um centro largo. As pretas golpeiam com 5...e5, trocam em d4 e pressionam e4 com as peças; o jogo fica igual.'],
  c10: [`${B} 3 c4 d6 4 Nc3 Nc6 5 d5 Nd4 6 Be3 c5 7 Nge2 Qb6 8 Na4 Qa5+ 9 Bd2 Qd8 10 Bc3 e5`, 'c4', '3.c4 d6 4.Nc3 Nc6', '⩲',
    'Depois de 3.c4 d6 4.Nc3 as pretas podem transpor para a Índia do Rei com 4...Nf6 ou jogar à moda da Robatsch. Com 4...Nc6 5.d5 Nd4 o cavalo se instala no centro, mas as brancas o expulsam e ficam um pouco melhor.'],
  c11: [`${B} 3 c4 d6 4 Nc3 e5 5 dxe5 dxe5 6 Qxd8+ Kxd8 7 f4 Be6 8 Nf3 Nd7 9 Be2 Ne7 10 O-O h6`, 'c4', '4...e5 5.dxe5', '=',
    'Com 4...e5 as pretas golpeiam o centro de imediato. Depois de 5.dxe5 dxe5 6.Qxd8+ o rei preto perde o roque, mas o final é sólido e termina em igualdade.'],
  c12: [`${B} 3 c4 d6 4 Nc3 Nd7 5 Nf3 e5 6 Be2 c6 7 O-O Nh6 8 dxe5 dxe5 9 Rb1 O-O 10 b4 f6`, 'c4', '4...Nd7 5.Nf3 e5', '⩲',
    'Com 4...Nd7 as pretas preparam ...e5 sem permitir a troca das damas. O cavalo do rei vai por h6 para f7, e as brancas avançam na ala da dama com Rb1 e b4, ficando um pouco melhor.'],
}

const notas = [
  // Coluna 7
  ['c07', 'a', 'a', '(a)', '4... e6 5 Bb3 Ne7 6 O-O O-O 7 c3 b6 8 Nbd2 Nbc6 9 Re1 Na5 10 Bc2 c5 11 Nf1', { a: '⩲', r: 'Hübner–Petrosian, Interzonal de Biel 1976', c: '4...e6 5.Bb3 Ne7 dá pequena vantagem às brancas.' }],
  ['c07', 'b', 'b', '(b)', '5... c6 6 Bb3 O-O 7 O-O Bg4 8 Nbd2 e5 9 dxe5 dxe5 10 h3 Bxf3 11 Nxf3 Nbd7 12 c3', { a: '⩲', r: 'Kotronias–Rukavina, Pucarevo 1987', c: '5...c6 6.Bb3 O-O dá pequena vantagem às brancas.' }],
  ['c07-b', '1', 'b', '(b) 5...Nc6', '5... Nc6 6 c3', { a: '⩲', c: '5...Nc6 6.c3 também favorece um pouco as brancas.' }],
  ['c07', 'c', 'c', '(c)', '11 e6 f5 12 c3 Na5 13 Bc2 Qd5', { a: '=', r: 'Schlosser–Bologan, França 2001', c: '11.e6 f5 12.c3 Na5 leva à igualdade.' }],
  // Coluna 8
  ['c08', 'd', 'd', '(d)', '4... Nf6 5 Qc2 O-O 6 Be2 c6 7 O-O Qc7 8 h3 e5 9 dxe5 dxe5 10 a4 Nh5 11 Re1 Nf4 12 Bc4 Be6 13 Na3', { a: '⩲', r: 'Panno–Gulko, Viña del Mar 1988', c: '4...Nf6 5.Qc2 O-O dá uma pequena vantagem às brancas.' }],
  ['c08', 'e', 'e', '(e)', '5 Bg5 h6 6 Bh4 g5 7 Bg3 e6 8 h4 f5 9 exf5 exf5 10 d5', { a: '⩲', r: 'Tiviakov–van der Wiel, Wijk aan Zee 2004', c: '5.Bg5!? h6 6.Bh4 g5 dá pequena vantagem às brancas.' }],
  ['c08', 'f', 'f', '(f)', '11 Qc2 Bg4 12 Nbd2 Nh5 13 h3 Be6 14 Bc4 Nf4 15 Rfd1 Qf6', { a: '=', r: 'Magem Badals–Hickl, Horgen 1994', c: '11.Qc2 Bg4 12.Nbd2 Nh5 leva à igualdade.' }],
  // Coluna 9
  ['c09', 'g', 'g', '(g)', '3... d5 4 exd5 Qxd5 5 Nf3 c5 6 Na3 cxd4 7 Bc4 Qd8 8 Qb3 e6 9 Nxd4 Ne7 10 Bg5', { a: '⩲', r: 'Sveshnikov–Cvitan, Tilburg 1993', c: '3...d5 4.exd5 Qxd5 5.Nf3 c5 dá pequena vantagem às brancas.' }],
  ['c09', 'h', 'h', '(h)', '5 e5 dxe5 6 fxe5 Nd5 7 Nf3 O-O 8 Bc4 Be6 9 Bb3 c5 10 O-O cxd4 11 cxd4 Nc6', { a: '∞', r: 'Plachetka–Hoi, Ostrava 1992', c: '5.e5 dxe5 6.fxe5 Nd5 leva a chances para os dois lados.' }],
  ['c09', 'i', 'i', '(i)', '11 h3 Bf5 12 Ng5 Nxe4 13 Bxe4 Bxe4 14 Ncxe4 d5', { a: '=', r: 'Saidy–Czerniak, Netanya 1973', c: '11.h3 Bf5! 12.Ng5 Nxe4 leva à igualdade. (O livro traz 14...h6, que perde uma peça para 15.Nf3; o lance que recupera a peça é 14...d5!, que ataca os cavalos na coluna e.)' }],
  // Coluna 10
  ['c10', 'j', 'j', '(j)', '3... c5 4 Nf3 cxd4 5 Nxd4', { c: '3...c5 4.Nf3 cxd4 5.Nxd4 transpõe para a Siciliana, Dragão Acelerado (Bind de Maróczy).' }],
  ['c10-j', '1', 'j', '(j) 4.d5', '4 d5', { c: '4.d5 leva a posições da Benoni.' }],
  ['c10', 'k', 'k', '(k)', '8 Nxd4 cxd4 9 Na4 Qa5+ 10 Bd2 Qc7 11 Bd3 Nf6 12 b4 Ng4 13 Rc1 O-O 14 O-O Ne5 15 Nb2 a5', { a: '=', r: 'Korchnoi–Speelman, Beer-Sheva 1987', c: '8.Nxd4 cxd4 9.Na4 Qa5+ leva à igualdade depois de 15...a5!.' }],
  ['c10', 'l', 'l', '(l)', '11 dxe6 Nxe6 12 Bxg7 Nxg7 13 Qd2 Nf6 14 f3 Be6 15 Nf4 Qe7 16 O-O-O', { a: '⩲', r: 'Gelfand–Azmaiparashvili, Dortmund 1990', c: '11.dxe6 (en passant) Nxe6 12.Bxg7 Nxg7 dá pequena vantagem às brancas.' }],
  // Coluna 11
  ['c11', 'm-A', 'm', '(m) A', '5 d5 Nd7 6 Bd3 Ne7 7 Nge2 O-O 8 O-O Nc5 9 Bc2 a5 10 Rb1 f5', { a: '=', r: 'Aleksandrov–Balashov, Copa de Smolensk 1991', c: '5.d5 Nd7 6.Bd3 Ne7 leva à igualdade.' }],
  ['c11', 'm-B', 'm', '(m) B', '5 Nf3 exd4 6 Nxd4 Nc6 7 Be3 Nge7 8 Be2 O-O 9 O-O f5 10 exf5 Bxd4 11 Bxd4 Nxf5 12 Be3 Nxe3', { a: '=', r: 'Hjartarson–Azmaiparashvili, Madri 1988', c: '5.Nf3 exd4 6.Nxd4 Nc6 é igual depois de 10...Bxd4!.' }],
  ['c11', 'n', 'n', '(n)', '7... Nc6 8 Nf3 Nd4 9 Kf2 exf4 10 Bxf4 Ne6 11 Bg3 Nh6 12 Bd3 Bxc3 13 bxc3 f6 14 Rhe1 Bd7 15 Rad1 Ke8 16 Kg1 Nf7 17 e5 f5 18 c5', { a: '⩲', r: 'Petursson–Nikolaidis, Atenas 1993', c: '7...Nc6 8.Nf3 Nd4 9.Kf2: depois de 17.e5! f5 18.c5! a posição branca fica ativa.' }],
  ['c11', 'o', 'o', '(o)', '11 Nd5 c6 12 Nxe7 Kxe7 13 f5 gxf5 14 exf5 Bxf5 15 Nxe5 Be6 16 Nxd7', { a: '=', r: 'Vaganian–Azmaiparashvili, Reggio Emilia 1992 (empate)', c: '11.Nd5 c6 12.Nxe7 Kxe7 13.f5 leva à igualdade.' }],
  // Coluna 12
  ['c12', 'p-A', 'p', '(p) A', '5 f4 e5 6 fxe5 dxe5 7 d5 Ngf6 8 Nf3 O-O 9 Bd3 c6 10 O-O Qb6+', { a: '=', r: 'Hjartarson–Berg, Akureyri 1994', c: '5.f4 e5 6.fxe5 dxe5 7.d5 leva a chances iguais.' }],
  ['c12', 'p-B', 'p', '(p) B', '5 Be3 e5 6 Nge2 Ngf6 7 f3', { c: '5.Be3 e5 6.Nge2 Ngf6 7.f3 lembra a Índia do Rei, Variante Sämisch.' }],
  ['c12', 'q', 'q', '(q)', '6... Ne7 7 d5 O-O 8 h4 f5 9 h5', { a: '⩲', r: 'Polugaevsky', c: '6...Ne7 7.d5 O-O 8.h4! f5 9.h5 toma casas na ala do rei.' }],
  ['c12', 'r', 'r', '(r)', '11 c5 Nf7 12 Bc4 Qe7 13 Be3 Kh8 14 Qc2 a5 15 a3', { a: '⩲', r: 'Hjartarson–Zaichik, Filadélfia 1991', c: '11.c5 Nf7 12.Bc4 Qe7 dá pequena vantagem às brancas.' }],
]

const capitulo = {
  id: 'robatsch-b',
  arquivo: 'robatsch-b',
  nome: 'Robatsch (Moderna) — 3.Nf3, 3.c3 e 3.c4',
  fonte: 'Modern Chess Openings — Robatsch Defense (pp. 376–377), colunas 7–12',
  base: '1. e4 g6 2. d4 Bg7',
  corPadrao: 'b',
  ordem: 376,
  grupos: [
    { id: 'nf3', nome: '3.Nf3', colunas: [7, 8] },
    { id: 'c3', nome: '3.c3', colunas: [9] },
    { id: 'c4', nome: '3.c4 d6 4.Nc3', colunas: [10, 11, 12] },
  ],
}

module.exports = { capitulo, colunas, notas }
