// Transcrição do MCO 15ª ed. — Gambito da Dama Aceito, 3º lances alternativos das brancas (pp. 458–459), colunas 19–24.
// Gerar: node scripts/mco/gerar.cjs gda-d
// Formato: ver gambito-do-rei.cjs. Dicas em gda-d-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.

const B = '1 d4 d5 2 c4 dxc4'

const colunas = {
  c19: [`${B} 3 e4 e5 4 Nf3 exd4 5 Bxc4 Bb4+ 6 Nbd2 Nc6 7 O-O Nf6 8 e5 Nd5 9 Nb3 Nb6 10 Bg5 Be7`, 'e4', '3.e4 e5', '⩲',
    'Com 3.e4 as brancas ocupam o centro de imediato. A resposta mais ativa é 3...e5: depois de 4.Nf3 exd4 5.Bxc4 Bb4+ 6.Nbd2 Nc6 7.O-O Nf6 8.e5 Nd5 9.Nb3 as brancas recuperam o peão de d4 e ficam um pouco melhor (Dreev–T. Christensen, Rethymnon 2003).'],
  c20: [`${B} 3 e4 Nf6 4 e5 Nd5 5 Bxc4 Nb6 6 Bb3 Nc6 7 Ne2 Bf5 8 Nbc3 e6 9 O-O Qd7 10 a3 Be7`, 'e4', '3...Nf6', '=',
    'Com 3...Nf6 as pretas atacam e4 e provocam o avanço. Depois de 4.e5 Nd5 5.Bxc4 Nb6 6.Bb3 Nc6 7.Ne2 Bf5 8.Nbc3 e6 as pretas pressionam d4 e o jogo fica igual (Karpov–Shirov, Córsega 2003).'],
  c21: [`${B} 3 e4 Nc6 4 Be3 Nf6 5 f3 e5 6 d5 Nd4 7 Bxd4 exd4 8 Qxd4 c6 9 Nc3 cxd5 10 O-O-O Bb4`, 'e4', '3...Nc6', '∞',
    'Com 3...Nc6 as pretas pressionam d4. Depois de 4.Be3 Nf6 5.f3 e5 6.d5 Nd4! 7.Bxd4 exd4 8.Qxd4 c6 9.Nc3 cxd5 10.O-O-O Bb4 as pretas sacrificam um peão por jogo ativo e têm compensação (Balogh–Gruns, Copa Mitropa 2000).'],
  c22: [`${B} 3 e3 e5 4 Bxc4 exd4 5 exd4 Nf6 6 Nf3 Be7 7 Nc3 O-O 8 h3 Nbd7 9 O-O Nb6 10 Bb3 c6`, 'e3', '3.e3 e5', '⩲',
    'Com 3.e3 as brancas recuperam o peão com calma. Contra 3...e5 4.Bxc4 exd4 5.exd4 elas ficam com o peão isolado; depois de 5...Nf6 6.Nf3 Be7 7.Nc3 O-O 8.h3 o peão isolado dá às brancas uma pequena vantagem (Karpov–Timman, Amsterdã 1991).'],
  c23: [`${B} 3 Nc3 a6 4 e4 b5 5 a4 b4 6 Na2 Bb7 7 f3 Nc6 8 d5 Na5 9 Bd2 e6 10 dxe6 fxe6`, 'nc3', '3.Nc3 a6', '∓',
    'Com 3.Nc3 as brancas preparam e4. Depois de 3...a6 4.e4 b5 5.a4 b4 6.Na2 Bb7 7.f3 Nc6! 8.d5 Na5 as pretas mantêm o peão e contra-atacam o centro; depois de 10.dxe6 fxe6 as pretas ficam um pouco melhor (Alterman–Bykhovsky, Israel 1994).'],
  c24: [`${B} 3 Nf3 Nf6 4 Qa4+ c6 5 Qxc4 Bf5 6 Nc3 e6 7 g3 Nbd7 8 Bg2 Be7 9 O-O O-O 10 e3 Ne4`, 'nf3', '3.Nf3 Nf6 4.Qa4+', '∞',
    'Com 3.Nf3 Nf6 4.Qa4+ as brancas recuperam o peão de imediato com a dama. Depois de 4...c6 5.Qxc4 Bf5 6.Nc3 e6 7.g3 as pretas desenvolvem o bispo fora da cadeia de peões, e as chances são para os dois lados (Akopian–Shirov, Wijk aan Zee 1993).'],
}

const notas = [
  // Coluna 19
  ['c19', 'a', 'a', '(a)', '4... Bb4+ 5 Bd2 Bxd2+ 6 Qxd2 exd4 7 Qxd4 Nf6 8 Qxd8+ Kxd8 9 Nc3 Be6 10 Nd4 Ke7 11 Nxe6 fxe6 12 Bxc4 Rd8 13 f3', { a: '⩲', r: 'Karpov–Ivanchuk, Roquebrune 1992', c: '4...Bb4+ 5.Bd2 Bxd2+ 6.Qxd2 exd4 7.Qxd4 Nf6 8.Qxd8+ Kxd8 9.Nc3 Be6 10.Nd4 Ke7 11.Nxe6 fxe6 12.Bxc4 Rd8 13.f3 deixa as brancas só um pouco melhor no final.' }],
  ['c19-a', '1', 'a', '(a) 5.Nbd2', '5 Nbd2 exd4 6 Bxc4', { c: '5.Nbd2 exd4 6.Bxc4 transpõe de volta para a coluna.' }],
  ['c19', 'b', 'b', '(b)', '5... Nc6 6 O-O Be6 7 Bxe6 fxe6 8 Qb3 Qd7 9 Qxb7 Rb8 10 Qa6 Nf6 11 Nbd2 Bb4 12 Nc4 O-O 13 a3 Bc5 14 b4 Nxe4 15 bxc5 Rxf3 16 gxf3 Nxc5', { a: '∞', r: 'van Wely–Sutovsky, Holanda 1997', c: '5...Nc6 6.O-O Be6 7.Bxe6 fxe6 8.Qb3 Qd7 9.Qxb7 Rb8 10.Qa6 Nf6 é uma alternativa aguda; van Wely–Sutovsky seguiu 11.Nbd2 Bb4 12.Nc4 O-O 13.a3 Bc5 14.b4 Nxe4!, com a ideia de responder 15.bxc5 com 15...Rxf3 16.gxf3 Nxc5. (O Stockfish confirma a ideia: depois de 16...Nxc5 dá cerca de −5, e as brancas não devem aceitar o bispo.)' }],
  ['c19', 'c', 'c', '(c)', '6 Bd2 Bxd2+ 7 Nbxd2 Nc6 8 O-O Qf6 9 b4 Nge7 10 b5 Ne5 11 Nxe5 Qxe5 12 f4', { a: '⩲', r: 'Aronian–Bacrot, Espanha 2006', c: '6.Bd2 Bxd2+ 7.Nbxd2 Nc6 8.O-O Qf6 9.b4 Nge7 10.b5 Ne5 11.Nxe5 Qxe5 12.f4 é um pouco melhor para as brancas.' }],
  ['c19', 'd', 'd', '(d)', '10 Bb5 Qd5 11 Nbxd4 O-O 12 Bxc6 bxc6 13 Qc2 c5', { a: '=', r: 'Bologan–Rublevsky, Aerosvit 2006', c: '10.Bb5 Qd5! 11.Nbxd4 O-O 12.Bxc6 bxc6 13.Qc2 c5 é igual.' }],
  ['c19', 'e', 'e', '(e)', '11 Bxe7 Qxe7 12 Bb5 Bd7 13 Bxc6 Bxc6 14 Nfxd4', { a: '⩲', r: 'Dreev–T. Christensen, Rethymnon 2003', c: '11.Bxe7 Qxe7 12.Bb5 Bd7 13.Bxc6 Bxc6 14.Nfxd4 é um pouco melhor para as brancas.' }],
  ['c19-e', '1', 'e', '(e) 11...Nxe7', '11... Nxe7 12 Bd3 Ng6 13 Nfxd4 Nf4 14 Bb5+ c6 15 Qf3', { a: '⩲', r: 'Ftáčnik–C. Hansen, Olimpíada de Yerevan 1996', c: '11...Nxe7 12.Bd3 Ng6 13.Nfxd4 Nf4 14.Bb5+ c6 15.Qf3! é um pouco melhor para as brancas.' }],
  // Coluna 20
  ['c20', 'f', 'f', '(f)', '4 Nc3 e5 5 Nf3 exd4 6 Qxd4 Qxd4 7 Nxd4 Bc5 8 Ndb5 Na6', { a: '=', r: 'Azmaiparashvili–Petrosian, Campeonato da URSS 1983', c: '4.Nc3 é respondido com 4...e5 5.Nf3 exd4 6.Qxd4 Qxd4 7.Nxd4 Bc5 8.Ndb5 Na6, igual.' }],
  ['c20', 'g', 'g', '(g)', '6 Bd3 Nc6 7 Ne2 Bg4 8 f3 Be6 9 Nbc3 Bc4 10 Bxc4 Nxc4 11 Qb3 Nb6 12 e6 fxe6 13 Be3 Qd7', { a: '=', r: 'Khalifman–Karjakin, Aeroflot Open 2004', c: '6.Bd3 Nc6 7.Ne2 Bg4 8.f3 Be6 9.Nbc3 Bc4! 10.Bxc4 Nxc4 11.Qb3 Nb6 12.e6 fxe6 13.Be3 Qd7 é igual.' }],
  ['c20-g', '1', 'g', '(g) 7.Be3', '7 Be3 Nb4 8 Be4 f5 9 exf6 exf6 10 Nc3 f5', { a: '∞', c: '7.Be3 Nb4 8.Be4 f5 9.exf6 exf6 10.Nc3 f5 é indefinido.' }],
  ['c20', 'h', 'h', '(h)', '7 Nf3 Bg4 8 Bxf7+ Kxf7 9 Ng5+ Ke8 10 Qxg4 Qxd4 11 Qe2 Qxe5 12 Be3 Nd5 13 Nf3 Qf5 14 O-O Rd8 15 Nc3 e6 16 Rfe1 Be7', { a: '⩲', r: 'Seirawan–Speelman, match 1988', c: '7.Nf3 Bg4 8.Bxf7+ Kxf7 9.Ng5+ Ke8 10.Qxg4 Qxd4 11.Qe2 Qxe5 deu às brancas só uma vantagem mínima.' }],
  ['c20', 'i', 'i', '(i)', '11 Be3 O-O-O 12 Qc1 f6 13 exf6 Bxf6', { a: '=', r: 'Karpov–Shirov, Córsega 2003', c: '11.Be3 O-O-O 12.Qc1 f6 13.exf6 Bxf6 é igual.' }],
  // Coluna 21
  ['c21', 'j-A', 'j', '(j) A', '3... c5 4 d5 e6 5 Bxc4 Nf6 6 Nc3 exd5 7 Nxd5 Nxd5 8 Bxd5 Be7 9 Nf3 O-O 10 O-O Qb6 11 Be3 Na6 12 Ne5', { a: '⩲', r: 'Milov–Afek, Budapeste 1993', c: '3...c5 4.d5 e6 5.Bxc4 Nf6 6.Nc3 exd5 7.Nxd5! Nxd5 8.Bxd5 Be7 9.Nf3 O-O 10.O-O Qb6 11.Be3 Na6 12.Ne5 é um pouco melhor para as brancas.' }],
  ['c21', 'j-B', 'j', '(j) B', '3... b5 4 a4 c6 5 b3 Nf6 6 e5 Nd5 7 axb5 cxb5 8 bxc4', { a: '⩲', r: 'Herndl–Z. Almási, Viena 1996', c: '3...b5 4.a4 c6 5.b3! Nf6 6.e5 Nd5 7.axb5 cxb5 8.bxc4 é um pouco melhor para as brancas.' }],
  ['c21', 'k-A', 'k', '(k) A', '4 d5 Ne5 5 Bf4 Ng6 6 Bg3 e5 7 Nf3 Bd6 8 Bxc4 a6', { a: '=', c: '4.d5 Ne5 5.Bf4 Ng6 6.Bg3 e5 7.Nf3 Bd6 8.Bxc4 a6 é igual.' }],
  ['c21', 'k-B', 'k', '(k) B', '4 Nf3 Bg4 5 Bxc4 e6 6 Bb5 Ne7 7 Nbd2 a6 8 Be2 Ng6 9 h3 Bxf3 10 Nxf3 Nh4', { a: '=', r: 'Ward–Sadler, Ilha de Man 1994', c: '4.Nf3 Bg4 5.Bxc4 e6 6.Bb5 Ne7 7.Nbd2 a6 8.Be2 Ng6 9.h3 Bxf3 10.Nxf3 Nh4 é igual.' }],
  ['c21', 'l', 'l', '(l)', '11 Bxc4 Bxc3 12 bxc3 O-O 13 exd5 b5 14 Bb3 Qd6', { a: '∞', r: 'Balogh–Gruns, Copa Mitropa 2000', c: '11.Bxc4 Bxc3 12.bxc3 O-O 13.exd5 b5 14.Bb3 Qd6 dá às pretas compensação pelo peão.' }],
  // Coluna 22
  ['c22', 'm-A', 'm', '(m) A', '3... Nf6 4 Bxc4 e6 5 Nf3 c5', { c: 'As pretas podem transpor para as linhas principais com 3...Nf6 4.Bxc4 e6 5.Nf3 c5.' }],
  ['c22', 'm-B', 'm', '(m) B', '3... b5 4 a4 c6 5 axb5 cxb5 6 Qf3', { a: '+−', c: 'Tentar manter o peão com 3...b5? 4.a4 c6 5.axb5 cxb5 6.Qf3! perderia uma peça.' }],
  ['c22', 'n', 'n', '(n)', '6 Qb3 Qe7+ 7 Ne2 Qb4+ 8 Nbc3 Qxb3 9 Bxb3 Bd6', { a: '=', c: '6.Qb3 ataca f7, mas as pretas podem responder com 6...Qe7+ 7.Ne2 Qb4+ 8.Nbc3 Qxb3 9.Bxb3 Bd6, igual.' }],
  ['c22', 'o', 'o', '(o)', '8 O-O Bg4 9 h3 Bh5 10 g4 Bg6 11 Ne5 c5 12 Be3 cxd4 13 Qxd4', { a: '⩲', c: '8.O-O Bg4 9.h3 Bh5 10.g4 Bg6 11.Ne5 c5 12.Be3 cxd4 13.Qxd4 também dá vantagem às brancas, que ganham o par de bispos.' }],
  ['c22', 'p', 'p', '(p)', '11 Re1 Nfd5 12 Ne4 Bf5 13 Ne5 Nd7 14 Qf3', { a: '⩲', r: 'Karpov–Timman, Amsterdã 1991', c: '11.Re1 Nfd5 12.Ne4 Bf5 13.Ne5 Nd7 14.Qf3 é um pouco melhor para as brancas.' }],
  // Coluna 23
  ['c23', 'q', 'q', '(q)', '3... e5 4 e3 exd4 5 exd4 Nf6 6 Bxc4 Be7 7 Nf3', { c: '3...e5 4.e3 exd4 5.exd4 Nf6 6.Bxc4 Be7 7.Nf3 transpõe para a coluna anterior.' }],
  ['c23', 'r', 'r', '(r)', '6... e6 7 Bxc4 Bb7 8 f3 c5 9 Ne2 cxd4 10 Nxd4 Bd6 11 Be3 Ne7 12 Qd2', { a: '±', r: 'I. Sokolov–Kramnik, Pamplona 1994', c: '6...e6 7.Bxc4 Bb7 8.f3 c5 9.Ne2 cxd4 10.Nxd4 Bd6 11.Be3 Ne7 12.Qd2 é melhor para as brancas.' }],
  ['c23', 's', 's', '(s)', '11 Bxb4 Bxb4+ 12 Nxb4 Qh4+ 13 g3 Qe7', { a: '∓', r: 'Alterman–Bykhovsky, Israel 1994', c: '11.Bxb4 Bxb4+ 12.Nxb4 Qh4+ 13.g3 Qe7 é um pouco melhor para as pretas.' }],
  // Coluna 24
  ['c24', 't-A', 't', '(t) A', '4... Nc6 5 Nc3 Nd5 6 e4 Nb6 7 Qd1 Bg4 8 d5 Ne5 9 Bf4 Bxf3 10 gxf3 Qd6 11 Bg3 g5 12 h4', { a: '⩲', r: 'Engqvist–Sadler, Ilha de Man 1995', c: '4...Nc6 5.Nc3 Nd5 6.e4! Nb6 7.Qd1 Bg4 8.d5 Ne5 9.Bf4 Bxf3 10.gxf3 Qd6 11.Bg3 g5 12.h4 é um pouco melhor para as brancas.' }],
  ['c24', 't-B', 't', '(t) B', '4... Nbd7 5 Nc3 e6 6 e4', { a: '⩲', c: '4...Nbd7 5.Nc3 e6 6.e4 é um pouco melhor para as brancas.' }],
  ['c24', 'u', 'u', '(u)', '11 Qe2 Nxc3 12 bxc3 Be4 13 c4 c5 14 Rd1 Qc7 15 Bb2 Nb6 16 Rac1 Bf6 17 Bf1 Na4', { a: '∞', r: 'Akopian–Shirov, Wijk aan Zee 1993', c: '11.Qe2 Nxc3 12.bxc3 Be4 13.c4 c5 14.Rd1 Qc7 15.Bb2 Nb6 16.Rac1 Bf6 17.Bf1 Na4 dá chances aos dois lados.' }],
]

const capitulo = {
  id: 'gda-d',
  arquivo: 'gda-d',
  nome: 'Gambito da Dama Aceito — 3º lances alternativos das brancas',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Accepted (pp. 458–459), colunas 19–24',
  base: '1. d4 d5 2. c4 dxc4',
  corPadrao: 'b',
  ordem: 458,
  grupos: [
    { id: 'e4', nome: '3.e4', colunas: [19, 20, 21] },
    { id: 'e3', nome: '3.e3', colunas: [22] },
    { id: 'nc3', nome: '3.Nc3', colunas: [23] },
    { id: 'nf3', nome: '3.Nf3 Nf6 4.Qa4+', colunas: [24] },
  ],
}

module.exports = { capitulo, colunas, notas }
