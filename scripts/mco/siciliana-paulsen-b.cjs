// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Paulsen (Kan) (pp. 313–314), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs siciliana-paulsen-b
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-paulsen-b-dicas.cjs.
//
// Colunas 7 e 11 trazem avaliação no fim; nas outras a avaliação vem da nota que continua a coluna.
// Nota (d): "15 Ra1" precisa indicar a torre (as duas chegam a a1); ficou Raa1.
// Nota (m): o livro escreve "9...bxc6" e "10...bxc6", mas o peão b já está em b5; usei dxc6 nas duas.

const B = '1 e4 c5 2 Nf3 e6 3 d4 cxd4 4 Nxd4 a6'

const colunas = {
  c07: [`${B} 5 Nc3 Qc7 6 Bd3 Nf6 7 O-O d6 8 f4 Nbd7 9 Kh1 Be7 10 Qe2 O-O 11 Bd2 g6 12 Rae1`, 'nc3', '5.Nc3 Qc7 6.Bd3', '±',
    'Com 5.Nc3 a posição vira Taimanov se as pretas jogarem ...Nc6. Na Paulsen elas jogam ...Qc7, ...Nf6 e ...d6 sem o cavalo em c6. Com 6.Bd3 e 8.f4 as brancas mantêm a iniciativa (Jansa–Dankert, Hamburgo 1993).'],
  c08: [`${B} 5 Nc3 Qc7 6 Be2 b5 7 O-O Bb7 8 Re1 Nc6 9 Nxc6 dxc6 10 e5 Bb4 11 Bd3 Ne7 12 Qg4 c5`, 'nc3', '6.Be2 b5', '=',
    'Com 6.Be2 b5 as pretas ganham espaço na ala da dama e fianquetam o bispo. Depois de 9.Nxc6 dxc6 10.e5 Bb4 elas pressionam o cavalo de c3 e igualam.'],
  c09: [`${B} 5 Nc3 Qc7 6 g3 Bb4 7 Ne2 Nf6 8 Bg2 Be7 9 O-O O-O 10 Nf4 d6 11 Nd3 Nc6 12 f4 Nd7`, 'nc3', '6.g3 Bb4!', '=',
    'Com 6.g3 as brancas fianquetam. 6...Bb4! força uma concessão: o cavalo sai de d4, e as pretas desenvolvem tranquilamente para uma posição igual.'],
  c10: [`${B} 5 Nc3 b5 6 Bd3 Bb7 7 O-O Ne7 8 Re1 Nbc6 9 Nxc6 Bxc6 10 Bg5 f6 11 Bh4 Ng6 12 Qh5 Be7`, 'nc3', '5...b5', '±',
    'Com 5...b5 as pretas ganham espaço logo, mas atrasam o desenvolvimento da ala do rei. Depois de 10.Bg5 f6 as brancas ficam claramente melhor.'],
  c11: [`${B} 5 Nd2 d6 6 Bd3 Nf6 7 O-O Nbd7 8 c4 g6 9 b3 Bg7 10 Bb2 b6 11 Qe2 Bb7 12 Rae1 O-O`, 'outros', '5.Nd2', '=',
    'Com 5.Nd2 as brancas querem montar c4 sem bloquear o peão c. Não é perigoso: as pretas fianquetam os dois bispos e igualam.'],
  c12: [`${B} 5 g3 d5 6 Nf3 Nf6 7 exd5 exd5 8 Bg2 Bc5 9 O-O O-O 10 Nbd2 Nc6 11 Nb3 Ba7 12 Nbd4 Bg4`, 'outros', '5.g3 d5', '=',
    'Com 5.g3 as brancas fianquetam logo, mas 5...d5 abre o centro. As pretas ficam com o peão isolado em d5 e peças ativas, com igualdade.'],
}

const notas = [
  // Coluna 7
  ['c07', 'a-A', 'a', '(a) A', '6... Nc6 7 Nxc6 dxc6 8 O-O Nf6 9 f4 e5 10 Kh1 Bd6 11 f5 b5 12 a4', { a: '±', r: 'Nunn–Stellwagen, Amsterdã 2006', c: 'As alternativas deixam as brancas melhor: 6...Nc6 7.Nxc6 dxc6 8.O-O Nf6 9.f4.' }],
  ['c07', 'a-B', 'a', '(a) B', '6... b5 7 O-O Bb7 8 Qe2 Nc6 9 Nxc6 Qxc6 10 a4 b4 11 Nd5 Nf6 12 Bc4', { a: '±', r: 'Kupreichik–Sunyé, Palma de Mallorca 1989', c: '6...b5 7.O-O Bb7 8.Qe2 também deixa as brancas melhor.' }],
  ['c07', 'b', 'b', '(b)', '7... Bc5 8 Nb3 Be7 9 f4 d6 10 Qf3 Nbd7 11 Bd2 b6 12 Qg3 g6 13 Rae1', { a: '±', r: 'Minasian–Lein, Las Vegas 1991', c: 'Com 7...Bc5 8.Nb3 Be7 9.f4 as brancas ficam melhor.' }],
  ['c07-b', '1', 'b', '(b) 8...Ba7', '8... Ba7 9 Qf3 d6 10 Bh6', { a: '±', c: '8...Ba7 9.Qf3 d6 10.Bh6! é bom para as brancas.' }],
  ['c07', 'c', 'c', '(c)', '10 Qf3 b5 11 Bd2 Bb7 12 a3 O-O 13 Rae1 Nc5 14 b4 Nxd3 15 cxd3 Rac8', { a: '=', r: 'Ljubojević–Velikov, Groningen 1970', c: '10.Qf3 b5 não traz problemas às pretas.' }],
  ['c07', 'd', 'd', '(d)', '10... b5 11 Bd2 Bb7 12 b4 O-O 13 a4 bxa4 14 Rxa4 Nb6 15 Raa1', { a: '±', r: 'Short–Seirawan, Holanda 1983', c: '10...b5?! 11.Bd2 Bb7 12.b4! deixa as brancas melhor.' }],
  // Coluna 8
  ['c08', 'e-A', 'e', '(e) A', '6... Nc6', { c: '6...Nc6 transpõe para a Taimanov.' }],
  ['c08', 'e-B', 'e', '(e) B', '6... d6', { c: '6...d6 transpõe para a Scheveningen.' }],
  ['c08', 'e-C', 'e', '(e) C', '6... Nf6 7 O-O Bb4 8 Qd3 Nc6 9 Bg5', { a: '±', c: '6...Nf6 7.O-O Bb4 8.Qd3 Nc6 9.Bg5 deixa as brancas melhor.' }],
  ['c08', 'f', 'f', '(f)', '8 Bf3 Nc6 9 a4 b4 10 Nxc6 Bxc6 11 Nb1 Nf6 12 Nd2 a5', { a: '=', r: 'Paglietti–Gheorghiu, Biel 1989', c: '8.Bf3 Nc6 9.a4 b4 é só igual.' }],
  ['c08', 'g', 'g', '(g)', '10... Rd8 11 Bd3 c5 12 Qg4 Ne7 13 Bg5 Rd4', { a: '=', r: 'Efimenko–Svidler, Copa Europeia 2006', c: 'Também serve 10...Rd8, com igualdade.' }],
  ['c08', 'h', 'h', '(h)', '13 Bg5 Bxc3 14 bxc3 h5 15 Qg3 c4', { a: '=', r: 'Polzin–Hellsten, Rethymnon 2003', c: 'Com 13.Bg5 Bxc3 14.bxc3 h5 o jogo fica igual.' }],
  // Coluna 9
  ['c09', 'i-A', 'i', '(i) A', '6... Nc6', { c: 'As pretas costumam transpor para a Taimanov com 6...Nc6 ou 6...Nf6; o lance do texto força uma concessão.' }],
  ['c09', 'i-B', 'i', '(i) B', '6... Nf6', { c: '6...Nf6 também transpõe.' }],
  ['c09', 'j', 'j', '(j)', '7 Bd2 Nf6 8 Bg2 Nc6 9 Nb3 Be7 10 f4 d6 11 O-O b5 12 Qe2 Bb7 13 Rae1 O-O', { a: '=', r: 'Svidler–Shulman, São Petersburgo 1994', c: 'Com 7.Bd2 Nf6 8.Bg2 Nc6 o jogo fica igual.' }],
  ['c09', 'k', 'k', '(k)', '13 Be3 Re8 14 Kh1 Bf8 15 Bg1 b6 16 Qd2 Bb7', { a: '=', r: 'Boudre–Spraggett, Torcy 1991', c: 'Com 13.Be3 Re8 a posição fica totalmente igual.' }],
  // Coluna 10
  ['c10', 'l', 'l', '(l)', '6 g3 Bb7 7 Bg2 Nf6 8 a3 d6 9 O-O Qc7 10 Re1 Be7 11 a4 b4 12 Na2 O-O 13 Bg5 Nbd7 14 Qd2 a5', { a: '∞', r: 'Topalov–Short, Dortmund 1997', c: 'Com 6.g3 Bb7 7.Bg2 as chances são dos dois lados.' }],
  ['c10', 'm', 'm', '(m)', '6... Qb6 7 Be3 Bc5 8 Be2 Nc6 9 Nxc6 dxc6 10 Bxc5 Qxc5 11 Qd3 Nf6 12 f4 e5 13 O-O-O O-O 14 f5', { a: '±', r: 'Timman–Werle, Remco Heite 2006', c: 'Com 6...Qb6 7.Be3 Bc5 as brancas trocam os bispos e ficam melhor.' }],
  ['c10-m', '1', 'm', '(m) 9...Bxe3', '9... Bxe3 10 fxe3 dxc6 11 Qd4', { a: '±', c: '9...Bxe3 10.fxe3 dxc6 11.Qd4 também deixa as brancas melhor.' }],
  ['c10', 'n', 'n', '(n)', '13 a4 bxa4 14 Nxa4 O-O 15 Bg3', { a: '±', r: 'Stocek–Gipslis 1995', c: 'Com 13.a4 bxa4 14.Nxa4 as brancas ficam com vantagem clara.' }],
  // Coluna 11
  ['c11', 'o', 'o', '(o)', '5... Nf6 6 e5 Nd5 7 Bc4 d6 8 exd6 Nf6 9 O-O Bxd6 10 N2f3', { a: '±', r: 'Geller–Gipslis, Interzonal de Sousse 1967', c: 'Com 5...Nf6 6.e5 Nd5 7.Bc4 as brancas ficam melhor.' }],
  ['c11', 'p', 'p', '(p)', '7... Be7 8 c4 O-O 9 b3 Nbd7 10 Bb2 Qc7 11 Rc1 b6 12 Qe2 Bb7 13 Bb1', { a: '⩲', r: 'Kapengut–Grigorian, Campeonato da URSS 1971', c: 'Com 7...Be7 8.c4 O-O 9.b3 as brancas têm chances de ataque. A coluna é Needleman–Urday, Mar del Plata 1997.' }],
  // Coluna 12
  ['c12', 'q', 'q', '(q)', '6 Nc3 dxe4 7 Nxe4 e5 8 Nb3 Qxd1+ 9 Kxd1 Nc6 10 Bg2 Bg4+ 11 f3 O-O-O+', { a: '∓', r: 'A. Ivanov–Zapata, Linares 1992', c: '6.Nc3?! dxe4 7.Nxe4 e5 deixa as pretas um pouco melhor.' }],
  ['c12', 'r', 'r', '(r)', '7... Qxd5 8 Qxd5 Nxd5 9 Bg2 Bc5 10 O-O O-O 11 Nbd2 Nc6 12 Nc4 b5 13 Nce5 Nxe5 14 Nxe5', { a: '⩲', r: 'Anand–Lobron, Munique 1994', c: '7...Qxd5 8.Qxd5 Nxd5 9.Bg2 também é bom para as pretas, mas depois de 9...Bc5?! Lobron se complicou contra Anand.' }],
  ['c12-r', '1', 'r', '(r) 9...Be7', '9... Be7', { c: 'Melhor é 9...Be7.' }],
  ['c12', 's', 's', '(s)', '13 Be3 Ne5 14 c3 Re8 15 Nc2 Bb6', { a: '=', r: 'Sherzer–Bezold, Brno 1993', c: 'Com 13.Be3 Ne5 o jogo fica igual.' }],
]

const capitulo = {
  id: 'siciliana-paulsen-b',
  arquivo: 'siciliana-paulsen-b',
  nome: 'Siciliana Paulsen (Kan) — 5.Nc3, 5.Nd2 e 5.g3',
  fonte: 'Modern Chess Openings — Sicilian Defense, Paulsen Variation (pp. 313–314), colunas 7–12',
  base: '1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 a6',
  corPadrao: 'b',
  ordem: 313,
  grupos: [
    { id: 'nc3', nome: '5.Nc3', colunas: [7, 8, 9, 10] },
    { id: 'outros', nome: '5.Nd2 e 5.g3', colunas: [11, 12] },
  ],
}

module.exports = { capitulo, colunas, notas }
