// Transcrição do MCO 15ª ed. — Defesa Nimzovich, 1.e4 Nc6 (pp. 382–383), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs nimzovich
// Formato: ver gambito-do-rei.cjs. Dicas em nimzovich-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; a avaliação vem da nota que continua cada coluna.
// Livro ambíguo: em (k) "9 Nc3" (os dois cavalos chegam a c3); usei 9.Nbc3, o cavalo de b5 atacado por ...a6.

const B = '1 e4 Nc6'

const colunas = {
  c01: [`${B} 2 d4 e5 3 d5 Nce7 4 Nf3 Ng6 5 h4 h5 6 Bg5 Nf6 7 Nc3 Bc5 8 Na4 Bb4+`, 'e5', '2.d4 e5 3.d5 Nce7 4.Nf3', '±',
    'Na Defesa Nimzovich as pretas atacam d4 com o cavalo logo no 1º lance. A resposta mais confiável é 2...e5, mas depois de 3.d5 Nce7 4.Nf3 Ng6 o forte 5.h4! ameaça h5 contra o cavalo e as brancas ficam com clara vantagem.'],
  c02: [`${B} 2 d4 e5 3 dxe5 Nxe5 4 Nf3 Nxf3+ 5 Qxf3 Qf6 6 Qg3 Bb4+ 7 c3 Bd6 8 f4 Qg6`, 'e5', '3.dxe5 Nxe5 4.Nf3', '=',
    'Com 3.dxe5 Nxe5 4.Nf3 as brancas trocam os cavalos e ficam com a dama ativa. As pretas respondem com 5...Qf6 e o xeque em b4; depois de 8.f4 Qg6 o jogo fica igual.'],
  c03: [`${B} 2 d4 d5 3 e5 Bf5 4 c3 e6 5 f4 h5 6 Nf3 Nh6 7 Be3 Bg4 8 Nbd2 Be7`, 'd5', '2...d5 3.e5 Bf5', '⩲',
    'O lance 2...d5 sempre foi visto como menos fiel aos princípios. Com 3.e5 as brancas fecham o centro e ganham espaço; as pretas desenvolvem o bispo em f5 e freiam a ala do rei com ...h5, mas as brancas ficam um pouco melhor.'],
  c04: [`${B} 2 d4 d5 3 Nc3 dxe4 4 d5 Nb8 5 Nxe4 e6 6 Bb5+ c6 7 dxc6 Qxd1+ 8 Kxd1 Nxc6`, 'd5', '3.Nc3 dxe4 4.d5', '=',
    'Com 3.Nc3 dxe4 4.d5 as brancas expulsam o cavalo e recuperam o peão. Depois de 6.Bb5+ c6 7.dxc6 as damas se trocam e o final fica igual.'],
  c05: [`${B} 2 Nf3 d6 3 d4 Nf6 4 Nc3 Bg4 5 Be3 e6 6 Be2 Be7 7 d5 exd5 8 exd5 Bxf3`, 'nf3', '2.Nf3 d6 3.d4 Nf6 4.Nc3 Bg4 5.Be3', '⩲',
    'Contra 2.Nf3 as pretas recusam o convite para 2...e5 e jogam o 2...d6 de Nimzovich, que leva a posições pouco exploradas. Com 5.Be3 e 7.d5 as brancas ganham espaço e ficam com o par de bispos e uma pequena vantagem.'],
  c06: [`${B} 2 Nf3 d6 3 d4 Nf6 4 Nc3 Bg4 5 d5 Nb8 6 Be2 g6 7 O-O Bg7 8 a4 O-O`, 'nf3', '5.d5 Nb8', '=',
    'Com 5.d5 as brancas expulsam o cavalo de imediato. As pretas o recuam para b8, fazem o fianqueto e rocam, numa posição parecida com a Pirc, e igualam.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '4 Bd3 Ng6 5 Be3 Nf6 6 h3 Bb4+ 7 Nd2 O-O 8 c3 Be7 9 Ne2 d6 10 c4 h6 11 Qc2 Nd7 12 Nc3 Bg5', { a: '=', r: 'Gallagher–Rogers, Biel 1996', c: '4.Bd3 Ng6 5.Be3 Nf6 leva à igualdade.' }],
  ['c01', 'b', 'b', '(b)', '4... d6 5 Nc3', { a: '⩲', c: '4...d6 5.Nc3 é um pouco melhor para as brancas, mas é pouco testado e pode levar a uma posição confusa.' }],
  ['c01', 'c', 'c', '(c)', '9 c3 Be7 10 Bxf6 Bxf6 11 d6 cxd6 12 g3 d5 13 Qxd5 d6 14 Bb5+ Kf8 15 O-O-O', { a: '±', r: 'A. Ivanov–Benjamin, Campeonato dos EUA 1996', c: '9.c3 Be7 10.Bxf6 Bxf6 11.d6! deixa as brancas com clara vantagem.' }],
  // Coluna 2
  ['c02', 'd', 'd', '(d)', '4... Bb4+ 5 c3 Nxf3+ 6 Qxf3 Bc5 7 Bd3 Qf6 8 Qg3 Ne7 9 Nd2', { a: '⩲', r: 'Aagaard–Linberg, Suécia 2004', c: '4...Bb4+ 5.c3 Nxf3+ 6.Qxf3 dá pequena vantagem às brancas.' }],
  ['c02', 'e', 'e', '(e)', '6... Qg6 7 Qxc7 Bd6 8 Qc4 Nf6 9 Nc3 O-O 10 Be3 Be5 11 O-O-O', { a: '±', r: 'Simonenko–Malinin, por correspondência 1994', c: '6...Qg6 7.Qxc7 Bd6 dá às pretas desenvolvimento pelo peão, mas não basta.' }],
  ['c02-e', '1', 'e', '(e) 7...Qxe4+', '7... Qxe4+ 8 Be3', { a: '±', c: '7...Qxe4+?! 8.Be3 favorece as brancas.' }],
  ['c02', 'f-A', 'f', '(f) A', '9 Bd3 Qxg3+ 10 hxg3 Bc5 11 Nd2 d6 12 Nc4 a6 13 a4 Nf6', { a: '=', r: 'Hübner–Hort, Oslo 1984', c: '9.Bd3 Qxg3+ 10.hxg3 leva a um final igual.' }],
  ['c02', 'f-B', 'f', '(f) B', '9 Qf3 Bc5 10 Bd3 d6 11 h3 Ne7 12 f5 Qf6 13 Bf4 Nc6', { a: '∞', r: 'Miln–Tomescu, Bucareste 1992', c: 'Mais agudo é 9.Qf3 Bc5 10.Bd3, com jogo indefinido.' }],
  // Coluna 3
  ['c03', 'g', 'g', '(g)', '2... d6 3 d5 Nb8 4 Nf3 e5 5 dxe6 fxe6 6 Nc3 Nc6 7 Bc4 Nf6 8 a3 g6 9 Bg5 Bg7 10 Qd2', { a: '±', r: 'Najdorf–Pérez García, Mar del Plata 1974', c: '2...d6 3.d5 Nb8 favorece as brancas.' }],
  ['c03', 'h', 'h', '(h)', '3... f6 4 f4 Bf5 5 Ne2 e6 6 Ng3 fxe5 7 fxe5 Qd7 8 Nxf5', { a: '±', r: 'Koste–Nimzovich, Baden-Baden 1925', c: '3...f6 4.f4 Bf5 favorece as brancas. Nimzovich conseguiu ganhar essa partida, o que manteve seu interesse na abertura.' }],
  ['c03-h', '1', 'h', '(h) 4.Bd3', '4 Bd3 g6', { c: '4.Bd3 g6 é a alternativa.' }],
  ['c03-h', '2', 'h', '(h) 7...Qh4', '7... Qh4', { a: '±', c: '7...Qh4 também favorece as brancas.' }],
  ['c03', 'i', 'i', '(i)', '9 Bd3 Qd7 10 Bf2 Nf5 11 h3', { a: '⩲', r: 'Hermansson–Furhoff, Suécia 2002', c: '9.Bd3 Qd7 10.Bf2 dá pequena vantagem às brancas.' }],
  // Coluna 4
  ['c04', 'j', 'j', '(j)', '3 exd5 Qxd5 4 Nf3 Bg4 5 Be2 O-O-O 6 c4 Qf5 7 Be3 Nf6 8 Nbd2 e5 9 d5 Nb4 10 Rc1 Nxa2 11 Ra1 Nb4 12 O-O a6 13 h3', { a: '∞', r: 'de Firmian–Waitzkin, Nova York 1990', c: '3.exd5 Qxd5 4.Nf3 Bg4 leva a uma posição em que as brancas têm bom jogo pelo peão.' }],
  ['c04', 'k', 'k', '(k)', '4... Ne5 5 Qd4 Ng6 6 Bb5+ Bd7 7 Nge2 Bxb5 8 Nxb5 a6 9 Nbc3', { a: '±', r: 'Nasell–Tournier, Pan-Americano Sub-18 2001', c: '4...Ne5 5.Qd4 Ng6 6.Bb5+ favorece as brancas.' }],
  ['c04', 'l', 'l', '(l)', '9 Bxc6+ bxc6 10 c3 Ba6 11 Be3 O-O-O+ 12 Ke1 Kb8', { a: '=', r: 'Gara–Molnar, Budapeste 1994', c: '9.Bxc6+ bxc6 10.c3 Ba6 leva à igualdade.' }],
  // Coluna 5
  ['c05', 'm', 'm', '(m)', '2... e5', { c: '2...e5 aceita o convite e transpõe para 1.e4 e5 2.Nf3 Nc6.' }],
  ['c05', 'n', 'n', '(n)', '3... Bg4 4 Be2 Nf6 5 Nc3', { c: '3...Bg4 pode voltar à coluna depois de 4.Be2 Nf6 5.Nc3.' }],
  ['c05-n', '1', 'n', '(n) 4.c3', '4 c3 Nf6 5 h3 Bh5 6 Nbd2', { a: '⩲', c: 'Também pode levar as brancas a jogar 4.c3 Nf6 5.h3 Bh5 6.Nbd2, com pequena vantagem.' }],
  ['c05', 'o', 'o', '(o)', '6 h3 Bh5 7 Bb5 a6 8 Bxc6+ bxc6 9 Qe2', { a: '⩲', c: '6.h3 Bh5 7.Bb5 a6 8.Bxc6+ bxc6 9.Qe2 e 10.O-O-O dá alguma vantagem às brancas, embora a posição possa ficar de duplo gume.' }],
  ['c05', 'p', 'p', '(p)', '9 Bxf3 Ne5 10 Be2 Qd7 11 O-O O-O 12 h3 Rfe8 13 Qd2 a6 14 a4 Bd8 15 Rfe1', { a: '⩲', r: 'Sznapik–Castro, Lublin 1979', c: '9.Bxf3 Ne5 10.Be2: as brancas têm a vantagem simples do par de bispos e de mais espaço.' }],
  // Coluna 6
  ['c06', 'q-A', 'q', '(q) A', '5 Be2 e5 6 d5 Ne7 7 Nh4 Bd7 8 Bg5 Ng6 9 Nf5 h6', { a: '=', r: 'Kočovski–Mestrović, Pula 1991', c: '5.Be2 e5 6.d5 Ne7 7.Nh4 leva à igualdade depois de 9...h6.' }],
  ['c06', 'q-B', 'q', '(q) B', '5 Bb5 a6 6 Bxc6+ bxc6 7 h3 Bh5 8 Qe2', { a: '⩲', c: '5.Bb5 a6 6.Bxc6+ bxc6 7.h3 Bh5 8.Qe2 (parecido com a nota o) é um pouco melhor para as brancas, mas de duplo gume pelo centro compacto das pretas.' }],
  ['c06', 'r', 'r', '(r)', '5... Ne5 6 Bb5+ c6 7 dxc6 Nxc6 8 e5 dxe5 9 Qxd8+ Rxd8 10 Bxc6+ bxc6 11 Nxe5 Bd7 12 Be3', { a: '±', r: 'Timman–Miles, Tilburg 1981', c: '5...Ne5?! 6.Bb5+ c6 7.dxc6 favorece as brancas.' }],
  ['c06-r', '1', 'r', '(r) 7.Nxe5', '7 Nxe5 Bxd1 8 dxc6 dxe5 9 c7+ Qd7', { c: '7.dxc6 é melhor que 7.Nxe5 Bxd1 8.dxc6 dxe5 9.c7+ Qd7.' }],
  ['c06', 's', 's', '(s)', '9 a5 c6 10 Be3 Qc7 11 h3 Bxf3 12 Bxf3 Rc8', { a: '=', r: 'Wolff–Benjamin, Nova York 1990', c: '9.a5 c6 10.Be3 Qc7 leva à igualdade.' }],
]

const capitulo = {
  id: 'nimzovich',
  arquivo: 'nimzovich',
  nome: 'Defesa Nimzovich (1...Nc6)',
  fonte: 'Modern Chess Openings — Nimzovich Defense (pp. 382–383), colunas 1–6',
  base: '1. e4 Nc6',
  corPadrao: 'b',
  ordem: 382,
  grupos: [
    { id: 'e5', nome: '2.d4 e5', colunas: [1, 2] },
    { id: 'd5', nome: '2.d4 d5', colunas: [3, 4] },
    { id: 'nf3', nome: '2.Nf3 d6', colunas: [5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
