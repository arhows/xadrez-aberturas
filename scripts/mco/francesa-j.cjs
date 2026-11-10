// Transcrição do MCO 15ª ed. — Defesa Francesa, Variante das Trocas e linhas raras (pp. 242–243), colunas 91–96.
// Gerar: node scripts/mco/gerar.cjs francesa-j
// Formato: ver gambito-do-rei.cjs. Dicas em francesa-j-dicas.cjs.

const B = '1 e4 e6'
const X = `${B} 2 d4 d5 3 exd5 exd5`

const colunas = {
  c91: [`${X} 4 Bd3 Bd6 5 c3 Nc6 6 Nf3 Nge7 7 O-O Bg4 8 Re1 Qd7 9 Nbd2 O-O 10 h3 Bf5`, 'trocas', '4.Bd3', '=',
    'Na Variante das Trocas, 3.exd5 exd5, a estrutura de peões fica simétrica e as pretas não sofrem pressão. Com 4.Bd3 Bd6 as duas partes desenvolvem do mesmo jeito: igual. A coluna é Tal–Korchnoi, URSS 1955.'],
  c92: [`${X} 4 Nf3 Bd6 5 c4 Nf6 6 Nc3 O-O 7 cxd5 Nbd7 8 Bg5 h6 9 Bh4 Nb6 10 Be2 Be7`, 'trocas', '4.Nf3 … 5.c4', '±',
    'Com 4.Nf3 e 5.c4 as brancas atacam d5 e quebram a simetria. As pretas recuperam o peão, mas as brancas ficam melhor.'],
  c93: [`${X} 4 Nc3 Bb4 5 Bd3 Nc6 6 Ne2 Nge7 7 O-O Bf5 8 Ng3 Bxd3 9 Qxd3 O-O 10 Nce2 Qd7`, 'trocas', '4.Nc3', '=',
    'Com 4.Nc3 Bb4 se chega a uma posição que também surge de 3.Nc3 Bb4 4.exd5 exd5. As pretas trocam os bispos de casas claras e igualam.'],
  c94: [`${B} 2 Qe2 c5 3 Nf3 Nc6 4 g3 g6 5 Bg2 Bg7 6 O-O Nge7 7 d3 O-O 8 c3 d6 9 a3 b6 10 Nbd2 h6`, 'raras', '2.Qe2', '=',
    'Com 2.Qe2 as brancas impedem ...d5 por um lance e jogam num esquema de Ataque Índio do Rei. As pretas fianquetam o bispo do rei e igualam.'],
  c95: [`${B} 2 d3 d5 3 Nd2 Nf6 4 g3 dxe4 5 dxe4 e5 6 Bg2 Nc6 7 Ngf3 Bc5 8 O-O O-O 9 c3 a5 10 Qe2 b6`, 'raras', '2.d3', '=',
    'Com 2.d3 as brancas escolhem o Ataque Índio do Rei. Com 4...dxe4 e 5...e5 as pretas ganham jogo fácil e igualam.'],
  c96: [`${B} 2 Nf3 d5 3 Nc3 d4 4 Ne2 c5 5 c3 Nf6 6 d3 Nc6 7 g3 e5 8 Bg2 Be7 9 O-O O-O 10 Ne1`, 'raras', '2.Nf3 d5 3.Nc3', '=',
    'Com 2.Nf3 d5 3.Nc3 d4! as pretas ganham espaço e chegam a uma estrutura de Índia do Rei com as cores invertidas. A posição fica mais ou menos igual, mas quem gosta dessa estrutura de peões vai preferir as brancas.'],
}

const notas = [
  // Coluna 91
  ['c91', 'a-A', 'a', '(a) A', '4... c5', { c: 'Como as pretas não sofrem pressão, há vários lances razoáveis: 4...c5, 4...Nc6 ou 4...Nf6. O lance do texto é o mais simples.' }],
  ['c91', 'a-B', 'a', '(a) B', '4... Nc6', { c: 'Também é razoável 4...Nc6.' }],
  ['c91', 'a-C', 'a', '(a) C', '4... Nf6', { c: 'Também é razoável 4...Nf6.' }],
  ['c91', 'b', 'b', '(b)', '5... c6 6 Ne2 Ne7 7 Bf4 O-O 8 O-O Bf5 9 Bxd6 Qxd6 10 Ng3 Bxd3 11 Qxd3 Nd7 12 Nd2', { a: '=', r: 'Hort–Petrosian, Hastings 1977/78', c: 'Manter a simetria é um caminho comum para o empate, como nesta partida.' }],
  ['c91', 'c', 'c', '(c)', '6 Qf3 Nf6 7 h3 O-O 8 Ne2 Re8 9 Bg5 Be7 10 Be3 Ne4 11 Bxe4 dxe4 12 Qxe4 Nb4 13 Kd1 Nd5 14 Nf4 Nxe3+ 15 fxe3 Bd6 16 Qf3 c5', { a: '∞', r: 'Malaniuk–Psakhis, Moscou 1983', c: 'Com 6.Qf3 as pretas entregam um peão com 10...Ne4! e 12...Nb4! e ficam com jogo ativo por ele.' }],
  ['c91', 'd', 'd', '(d)', '9... O-O-O', { c: 'As pretas podem jogar 9...O-O-O se quiserem um jogo mais afiado.' }],
  // Coluna 92
  ['c92', 'e', 'e', '(e)', '4... Nf6 5 Bg5 Be7 6 Bd3 Bg4 7 O-O Nbd7 8 Nbd2 O-O 9 c3 c6', { a: '=', r: 'Fishbein–Wright, Chicago 2002', c: 'Um caminho simples para a igualdade é 4...Nf6.' }],
  ['c92', 'f', 'f', '(f)', '5 Bd3 Nf6 6 O-O O-O 7 Bg5 Bg4 8 Nbd2 Nbd7', { a: '=', r: 'Capablanca–Maróczy, Lake Hopatcong 1926', c: 'Com 5.Bd3 fica igual; 5.c4 tem mais força.' }],
  ['c92', 'g-A', 'g', '(g) A', '6... dxc4 7 Bxc4 O-O 8 O-O Bg4 9 h3 Bh5 10 g4 Bg6 11 Ne5', { a: '±', r: 'Ulibin–Lautier, Sochi 1989', c: 'Com 6...dxc4 e 8...Bg4?! as brancas ficam melhor.' }],
  ['c92', 'g-B', 'g', '(g) B', '6... c6 7 Bg5 O-O 8 cxd5 Qb6 9 Bxf6 Qxb2', { a: '=', r: 'Teske–Knaak, Stralsund 1988', c: 'Com 6...c6 e 8...Qb6!? as pretas ficaram bem.' }],
  ['c92', 'h', 'h', '(h)', '11 Bxf6 Bxf6 12 Qb3 Bg4 13 O-O Bxf3 14 Bxf3 Bxd4 15 Rad1', { a: '±', r: 'Ulibin–Monin, URSS 1986', c: 'Depois de 11.Bxf6 as brancas ficam melhor.' }],
  // Coluna 93
  ['c93', 'i', 'i', '(i)', '4 c4 Nf6 5 Nc3 Be7 6 Nf3 O-O 7 cxd5 Nxd5 8 Bc4 Nb6 9 Bb3 Bf5 10 O-O Nc6 11 a3 Bf6', { a: '=', r: 'Meijers–Nutsil, Praga 2007', c: 'Com 4.c4 fica igual, mas alguns jogadores gostam da posição aberta das brancas.' }],
  ['c93', 'j', 'j', '(j)', '4... Nf6 5 Bg5 Be7', { c: '4...Nf6 5.Bg5 Be7 é uma alternativa sólida.' }],
  ['c93', 'k', 'k', '(k)', '6 a3 Bxc3+ 7 bxc3 Nge7 8 Qf3 Be6 9 Nh3 Qd7 10 Nf4 Bf5 11 O-O O-O-O', { a: '=', r: 'Short–Timman, Tilburg 1990', c: 'Com 6.a3 as pretas trocam o bispo e igualam.' }],
  ['c93', 'l', 'l', '(l)', '11 c3 Bd6 12 Bf4 a6 13 Rfe1 Rae8 14 Qf3 Nd8', { a: '=', r: 'Spielmann–Euwe, Zandvoort 1936', c: 'Depois de 11.c3 fica igual.' }],
  // Coluna 94
  ['c94', 'm', 'm', '(m)', '2... Nc6', { c: 'Outras escolhas razoáveis são 2...Nc6, 2...Be7 e 2...b6.' }],
  ['c94-m', '1', 'm', '(m) 2...e5', '2... e5 3 f4', { a: '⩲', c: 'As pretas devem evitar 2...e5 3.f4!: as brancas ficam com um Gambito do Rei melhorado.' }],
  ['c94', 'n', 'n', '(n)', '4... Be7 5 Bg2 d5 6 d3 Nf6 7 O-O O-O 8 e5 Ne8 9 c4', { a: '⩲', r: 'Psakhis–Stiković, Olimpíada de Yerevan 1996', c: 'Com 4...Be7 as brancas ganham uma pequena iniciativa.' }],
  ['c94', 'o', 'o', '(o)', '11 Rd1 e5 12 b4 Be6 13 Bb2 b5', { a: '=', r: 'Hort–Gheorghiu, Interzonal de Manila 1976', c: 'Depois de 11.Rd1 fica igual.' }],
  // Coluna 95
  ['c95', 'p', 'p', '(p)', '4 Ngf3 c5 5 g3 Nc6 6 Bg2 Be7 7 O-O', { c: 'Também se joga muito 4.Ngf3 c5 5.g3, chegando ao Ataque Índio do Rei. As brancas deveriam considerar essa ordem, já que a coluna dá jogo fácil às pretas.' }],
  ['c95', 'q', 'q', '(q)', '11 Nc4 Ba6 12 Nfd2 Qd7 13 h3', { r: 'Timpel–Schmidt, Alemanha 1994', c: 'Depois de 11.Nc4 Ba6 12.Nfd2 Qd7 13.h3...' }],
  ['c95-q', '1', 'q', '(q) 13...Qe6', '13... Qe6', { a: '=', c: '...13...Qe6 dá às pretas pelo menos chances iguais.' }],
  // Coluna 96
  ['c96', 'r', 'r', '(r)', '2 c4 d5 3 exd5 exd5 4 cxd5 Nf6 5 Bb5+ Nbd7 6 Nc3 Be7 7 Qf3 O-O 8 Bxd7 Qxd7 9 Nge2 Rd8 10 Nf4 Bd6', { a: '=', r: 'segundo Keres e Minev', c: 'Com 2.c4 as pretas recuperam o peão e igualam. (4.d4 é a nota (i) da coluna 93.)' }],
  ['c96', 's-A', 's', '(s) A', '3... Nf6 4 e5 Nfd7 5 d4 c5', { c: 'As pretas podem levar o jogo a linhas mais comuns com 3...Nf6 4.e5 Nfd7 5.d4 c5, a Variante Steinitz.' }],
  ['c96', 's-B', 's', '(s) B', '3... Bb4 4 e5 Ne7', { c: 'Ou 3...Bb4 4.e5 Ne7, provavelmente chegando à Variante Winawer.' }],
  ['c96', 't', 't', '(t)', '7 cxd4 cxd4 8 Qa4 Bd7 9 Nexd4 Bb4+ 10 Kd1 Bc5 11 Qc4 Nxe4 12 dxe4 Nxd4 13 Nxd4 Bxd4', { a: '∓', r: 'Kiriakov–Kapengut, URSS 1965', c: 'Com 7.cxd4 as pretas ficam um pouco melhor depois de 11...Nxe4!.' }],
]

const capitulo = {
  id: 'francesa-j',
  arquivo: 'francesa-j',
  nome: 'Francesa — Trocas e linhas raras',
  fonte: 'Modern Chess Openings — French Defense (pp. 242–243), colunas 91–96',
  base: '1. e4 e6',
  corPadrao: 'b',
  ordem: 242,
  grupos: [
    { id: 'trocas', nome: 'Variante das Trocas: 2.d4 d5 3.exd5 exd5', colunas: [91, 92, 93] },
    { id: 'raras', nome: '2.Qe2, 2.d3 e 2.Nf3', colunas: [94, 95, 96] },
  ],
}

module.exports = { capitulo, colunas, notas }
