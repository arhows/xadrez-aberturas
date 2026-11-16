// Transcrição do MCO 15ª ed. — Jogos do Peão da Dama: Colle, Stonewall com as brancas, Polonesa e 1...Nc6 (pp. 511–512), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs peao-dama-b
// Formato: ver gambito-do-rei.cjs. Dicas em peao-dama-b-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// As notas (a) e (n) só falam de outras ordens de lances que chegam à coluna; o texto foi para o resumo.
// Correções:
// - Nota (c): o livro traz 10 cxd4; as brancas não têm peão que alcance d4 por c, e o lance é 10.exd4.
// - Nota (s): o livro traz 5...Bb4+ 6 Nd2 ... 11 Nf1, impossível (o cavalo de b1 já está em c3, e ...Bb4 nem é xeque);
//   a linha ficou cortada em 5...Bb4.

const D = '1 d4 d5 2 e3 Nf6'
const C = `${D} 3 Nf3 e6 4 Bd3 c5`

const colunas = {
  c07: [`${C} 5 b3 Nc6 6 O-O Be7 7 Bb2 O-O 8 Nbd2 b6`, 'colle', 'Colle com 5.b3', '=',
    'No Sistema Colle as brancas desenvolvem a ala do rei com e3, Nf3 e Bd3 antes de lutar pelo centro. A posição também nasce de 1.d4 Nf6 2.Nf3 e6 3.e3 d5 ou de 1.d4 d5 2.Nf3 e6 3.e3 Nf6. Com 5.b3 o bispo de c1 vai a b2, no estilo Colle-Zukertort. Depois de 5...Nc6 6.O-O Be7 7.Bb2 O-O 8.Nbd2 b6 as pretas fazem o mesmo e o jogo é igual.'],
  c08: [`${C} 5 c3 Nc6 6 Nbd2 Bd6 7 O-O O-O 8 Qe2 e5`, 'colle', '5.c3', '=',
    'Com 5.c3 as brancas montam o Colle clássico: firmam d4 e preparam e4 para abrir o jogo contra o roque preto. Depois de 5...Nc6 6.Nbd2 Bd6 7.O-O O-O 8.Qe2 as pretas avançam primeiro com 8...e5!, e o jogo é igual.'],
  c09: [`${D} 3 Bd3 c5 4 c3 Nc6 5 f4 Bg4 6 Nf3 Ne4 7 O-O e6 8 Qe1 Bxf3`, 'stonewall', 'Stonewall com as brancas', '∞',
    'No Stonewall invertido as brancas jogam como as pretas na Holandesa: peões em c3, d4, e3 e f4 e o cavalo apoiado em e5. A estrutura é rígida e dá às pretas várias defesas. Depois de 3.Bd3 c5 4.c3 Nc6 5.f4 Bg4 6.Nf3 Ne4 7.O-O e6 8.Qe1 Bxf3 as pretas trocam o cavalo que iria a e5, com chances para os dois lados.'],
  c10: ['1 d4 b5 2 e4 Bb7 3 Bd3 e6 4 Nf3 c5 5 c3 Nf6 6 Nbd2 Qb6 7 dxc5 Bxc5 8 O-O d5', 'polonesa', '1...b5 (Polonesa) 2.e4', '±',
    'Na Defesa Polonesa, 1...b5, as pretas tiram c4 das brancas e fazem o fianqueto do bispo da dama. O problema é 2.e4: as brancas simplesmente tomam o centro. Depois de 2...Bb7 3.Bd3 e6 4.Nf3 c5 5.c3 Nf6 6.Nbd2 Qb6 7.dxc5 Bxc5 8.O-O d5 o centro branco dá vantagem às brancas.'],
  c11: ['1 d4 b5 2 Nf3 Bb7 3 g3 e6 4 Bg2 Nf6 5 O-O c5 6 c3 Be7 7 Bg5 Na6 8 Nbd2 O-O', 'polonesa', '2.Nf3', '=',
    'Contra 2.Nf3 a Polonesa fica bem mais segura, porque as brancas não tomam o centro com e4. A posição costuma nascer de 1.d4 Nf6 2.Nf3 e6 3.g3 b5 4.Bg2 Bb7. Depois de 5.O-O c5 6.c3 Be7 7.Bg5 Na6 8.Nbd2 O-O o jogo é igual.'],
  c12: ['1 d4 Nc6 2 c4 e5 3 d5 Nce7 4 Nc3 Ng6 5 e4 Bc5 6 Bd3 Nf6 7 h3 O-O 8 Nge2 Nh5', 'nc6', '1...Nc6 (Defesa do Cavalo da Dama)', '⩲',
    'A Defesa do Cavalo da Dama, 1...Nc6, não é tão ruim se as pretas aceitarem transpor para a Chigorin depois de 2.Nf3 d5 3.c4. Com 2.c4 e5 3.d5 as brancas expulsam o cavalo e ganham espaço. Depois de 3...Nce7 4.Nc3 Ng6 5.e4 Bc5 6.Bd3 Nf6 7.h3! O-O 8.Nge2 Nh5 as brancas ficam com mais espaço.'],
}

const notas = [
  // Coluna 7
  ['c07', 'b', 'b', '(b)', '5... Nbd7 6 O-O b6 7 Bb2 Bb7 8 Ne5 Be7 9 Nd2 O-O 10 Qe2 Ne4 11 Bxe4 dxe4 12 Nxd7 Qxd7 13 dxc5 Bxc5', { a: '=', r: 'Ubilava–San Segundo, Alcobendas 1994', c: 'As pretas igualam imitando a estratégia das brancas: 5...Nbd7 6.O-O b6 7.Bb2 Bb7 8.Ne5 Be7 9.Nd2 O-O 10.Qe2 Ne4! 11.Bxe4 dxe4 12.Nxd7 Qxd7 13.dxc5 Bxc5 é igual.' }],
  ['c07', 'c', 'c', '(c)', '6... Bd6 7 Bb2 O-O 8 Nbd2 Qe7 9 Ne5 cxd4 10 exd4 Ba3 11 Bxa3 Qxa3 12 c3 Bd7 13 f4', { a: '⩲', r: 'Hoi–Danielsen, Campeonato Dinamarquês 1995', c: '6...Bd6 7.Bb2 O-O 8.Nbd2 Qe7 9.Ne5 cxd4 10.exd4 Ba3 11.Bxa3 Qxa3 12.c3 Bd7 13.f4 dá às brancas chances de ataque. (O livro traz 10.cxd4, impossível.)' }],
  ['c07', 'd', 'd', '(d)', '9 c4 Bb7 10 Rc1 Rc8 11 Qe2 Rc7 12 Rfd1 dxc4 13 bxc4 Qa8', { a: '=', r: 'Olesen–Ashley, Nova York 1993', c: '9.c4 Bb7 10.Rc1 Rc8 11.Qe2 Rc7 12.Rfd1 dxc4 13.bxc4 Qa8 é igual.' }],
  ['c07-d', '1', 'd', '(d) 9.Ne5', '9 Ne5 Bb7 10 f4 Rc8', { a: '=', c: '9.Ne5 Bb7 10.f4 Rc8 é igual.' }],
  // Coluna 8
  ['c08', 'e', 'e', '(e)', '5... Nbd7 6 Nbd2 Be7 7 O-O O-O 8 Qe2 b6 9 e4 dxe4 10 Nxe4 Bb7 11 Nxf6+ Nxf6', { a: '=', r: 'Svidler–Hartman, Gausdal 1991', c: 'Outra defesa é 5...Nbd7 6.Nbd2 Be7 7.O-O O-O 8.Qe2 b6 9.e4 dxe4 10.Nxe4 Bb7 11.Nxf6+ Nxf6, igual.' }],
  ['c08', 'f', 'f', '(f)', '8 e4 cxd4 9 cxd4 dxe4 10 Nxe4 Be7 11 Ng3 Qd5 12 Re1 Rd8', { a: '=', r: 'Colle–Loman, Holanda 1923', c: '8.e4 cxd4 9.cxd4 dxe4 10.Nxe4 Be7 11.Ng3 Qd5 12.Re1 Rd8 é mais ou menos igual.' }],
  ['c08', 'g', 'g', '(g)', '9 dxc5 Bxc5 10 e4 Bg4 11 exd5 Qxd5 12 Bc4 Qd7 13 h3 Bh5 14 Ne4 Nxe4 15 Qxe4 Qc7', { a: '=', r: 'Koltanowski–Fine, Hastings 1935', c: '9.dxc5 Bxc5 10.e4 Bg4 11.exd5 Qxd5 12.Bc4 Qd7 13.h3 Bh5 14.Ne4 Nxe4 15.Qxe4 Qc7 é igual.' }],
  // Coluna 9
  ['c09', 'h', 'h', '(h)', '3... g6 4 f4 Bg7 5 Nf3 c5 6 c3 b6 7 Nbd2 O-O 8 Qe2 Bb7 9 O-O Nbd7', { a: '=', r: 'Wall–McDonald, Hastings 1995', c: 'Muitos jogadores preferem 3...g6 contra Bd3, para fechar a diagonal do bispo branco até h7. Depois de 4.f4 Bg7 5.Nf3 c5 6.c3 b6 7.Nbd2 O-O 8.Qe2 Bb7 9.O-O Nbd7 o jogo é igual.' }],
  ['c09', 'i', 'i', '(i)', '9 Rxf3 f5 10 Nd2 Qb6 11 Kh1 Be7 12 Qe2 O-O', { a: '∞', r: 'Liskov–Moskvitin, Novgorod 1997', c: '9.Rxf3 f5 10.Nd2 Qb6 11.Kh1 Be7 12.Qe2 O-O dá chances para os dois lados.' }],
  // Coluna 10
  ['c10', 'j', 'j', '(j)', '3 f3 a6 4 Be3 e6 5 Nd2 Nf6 6 c3 Be7 7 Bd3 d6 8 a4 c6 9 Ne2 Nbd7 10 O-O O-O', { a: '=', r: 'Petrosian–Spassky, Campeonato Mundial 1966', c: '3.f3 é menos forte: 3...a6 4.Be3 e6 5.Nd2 Nf6 6.c3 Be7 7.Bd3 d6 8.a4 c6! 9.Ne2 Nbd7 10.O-O O-O é igual.' }],
  ['c10', 'k-A', 'k', '(k) A', '7 O-O', { a: '±', c: 'As brancas também ficam claramente melhor com o simples 7.O-O, mantendo o centro de peões.' }],
  ['c10', 'k-B', 'k', '(k) B', '7 Qe2', { a: '±', c: '7.Qe2, mantendo o centro de peões, também dá clara vantagem às brancas.' }],
  ['c10', 'l-A', 'l', '(l) A', '9 e5 Ne4 10 Qe2', { a: '±', c: '9.e5 Ne4 10.Qe2 é melhor para as brancas.' }],
  ['c10', 'l-B', 'l', '(l) B', '8... O-O 9 e5 Nd5 10 Bxh7+ Kxh7 11 Ng5+ Kg6 12 Qg4 f5 13 Qh4', { a: '+-', r: 'Tarjan–Hodgson, Manchester 1983', c: 'Pior ainda é 8...O-O? 9.e5 Nd5 10.Bxh7+! Kxh7 11.Ng5+ Kg6 12.Qg4 f5 13.Qh4, e as brancas ganham.' }],
  // Coluna 11
  ['c11', 'm', 'm', '(m)', '3 e3 a6 4 c4 bxc4 5 Bxc4 e6 6 Nc3 Nf6 7 O-O d5 8 Be2 c5', { a: '=', r: 'Andersson–Miles, Tilburg 1984', c: '3.e3 a6 4.c4 bxc4 5.Bxc4 e6 6.Nc3 Nf6 7.O-O d5 8.Be2 c5 é igual.' }],
  ['c11-m', '1', 'm', '(m) 4.b3', '4 b3 e6 5 Nbd2 Nf6 6 c4', { a: '±', c: '4.b3! e6 5.Nbd2 Nf6 6.c4 é melhor para as brancas.' }],
  ['c11', 'o', 'o', '(o)', '5 Bg5 c5 6 Bxf6 Qxf6 7 O-O Qd8 8 c3 Be7', { a: '=', r: 'Kengis–Aleksandrov, Pula 1997', c: '5.Bg5 c5 6.Bxf6 Qxf6 7.O-O Qd8 8.c3 Be7 é igual.' }],
  ['c11', 'p', 'p', '(p)', '9 Ne5 Bxg2 10 Kxg2 Qc7 11 e3 h6 12 Bxf6 Bxf6 13 f4 d6', { a: '=', r: 'Andersson–Seirawan, Reykjavik 1990', c: '9.Ne5 Bxg2 10.Kxg2 Qc7 11.e3 h6 12.Bxf6 Bxf6 13.f4 d6 é igual.' }],
  // Coluna 12
  ['c12', 'q-A', 'q', '(q) A', '1... e5 2 dxe5 d6 3 exd6 Bxd6 4 Nf3 Nf6 5 Bg5 h6 6 Bh4', { a: '±', c: 'O Gambito Englund, 1...e5 2.dxe5, é especulativo: 2...d6 3.exd6 Bxd6 4.Nf3 Nf6 5.Bg5 h6 6.Bh4 é melhor para as brancas.' }],
  ['c12', 'q-B', 'q', '(q) B', '1... e5 2 dxe5 Nc6 3 Nf3 Nge7 4 Bf4 Ng6 5 Bg3 Qe7 6 Nc3 Qb4 7 Qc1 Qa5 8 a3', { a: '±', r: 'McCarthy–Zilbermints, Nova York 1997', c: 'No Gambito Englund, 2...Nc6 3.Nf3 Nge7 4.Bf4 Ng6 5.Bg3 Qe7 é uma tentativa melhor, mas 6.Nc3! Qb4 7.Qc1 Qa5 8.a3 ainda deixa as brancas com grande vantagem.' }],
  ['c12-q-B', '1', 'q', '(q) B 6...Ngxe5', '6... Ngxe5 7 Nxe5 Nxe5 8 Nd5 Qd6 9 Qd4', { a: '±', c: '6...Ngxe5 7.Nxe5 Nxe5 8.Nd5 Qd6 9.Qd4 é melhor para as brancas.' }],
  ['c12', 'r-A', 'r', '(r) A', '2 d5 Ne5 3 e4 e6 4 f4 Ng6 5 dxe6 dxe6 6 Bd3 Bc5', { a: '=', r: 'Dizdar–Mohr, Bled 1996', c: '2.d5 Ne5 3.e4 e6 4.f4 Ng6 5.dxe6 dxe6 6.Bd3 Bc5 é igual.' }],
  ['c12', 'r-B', 'r', '(r) B', '2 Nf3 d5 3 c4', { c: 'O melhor para as brancas provavelmente é 2.Nf3 d5 3.c4, que transpõe para a Defesa Chigorin.' }],
  ['c12', 's', 's', '(s)', '5 Be3 Bb4', { a: '∓', r: 'Kaidanov–Miles, Palma de Mallorca 1989', c: '5.Be3 Bb4 dá às pretas um jogo muito ativo. (O livro segue com 6.Nd2 Nf6 7.f3 Qe7 8.g3 O-O 9.h3 c6! 10.a3 Bc5 11.Nf1 b5, impossível: o cavalo de b1 já está em c3; a linha foi cortada aqui.)' }],
  ['c12', 't', 't', '(t)', '9 g3', { a: '⩲', r: 'Jelen–Mestrović, Campeonato Esloveno 1996', c: '9.g3 deixa as brancas com mais espaço.' }],
]

const capitulo = {
  id: 'peao-dama-b',
  arquivo: 'peao-dama-b',
  nome: 'Peão da Dama — Colle, Stonewall, Polonesa e 1...Nc6',
  fonte: 'Modern Chess Openings — Queen’s Pawn Games (pp. 511–512), colunas 7–12',
  base: '1. d4',
  corPadrao: 'w',
  ordem: 511,
  grupos: [
    { id: 'colle', nome: 'Sistema Colle', colunas: [7, 8] },
    { id: 'stonewall', nome: 'Stonewall com as brancas', colunas: [9] },
    { id: 'polonesa', nome: 'Defesa Polonesa (1...b5)', colunas: [10, 11] },
    { id: 'nc6', nome: '1...Nc6', colunas: [12] },
  ],
}

module.exports = { capitulo, colunas, notas }
