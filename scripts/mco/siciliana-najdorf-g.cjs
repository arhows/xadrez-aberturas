// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Najdorf: 6.f4 e outros 6º lances (pp. 267–268), colunas 43–48.
// Gerar: node scripts/mco/gerar.cjs siciliana-najdorf-g
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-najdorf-g-dicas.cjs.
//
// Erros do livro corrigidos:
// - Nota (g): "15 Be3" é impossível (o bispo já está em e3 desde o lance 13) → 15.Qg3, que leva a dama de e1 para g3 e permite 16.Bd4.

const B = '1 e4 c5 2 Nf3 d6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 a6'
const E = `${B} 6 f4 e5 7 Nf3 Nbd7 8 a4 Be7 9 Bd3 O-O 10 O-O`

const colunas = {
  c43: [`${E} Nc5 11 Kh1 exf4 12 Bxf4 Bg4 13 Be3 Rc8`, 'f4-e5', '6.f4 e5 … 10...Nc5', '=',
    'O 6.f4 é uma tentativa direta de ganhar espaço. Com 6...e5 7.Nf3 Nbd7 as pretas disputam o centro; depois de 10...Nc5 e 12...Bg4! fica igual.'],
  c44: [`${E} exf4 11 Bxf4 Qb6+ 12 Kh1 Qxb2 13 Qe1 Qb6`, 'f4-e5', '10...exf4', '=',
    'Com 10...exf4 e 11...Qb6+ as pretas pegam o peão de b2. As brancas ficam com desenvolvimento e iniciativa, e o jogo fica igual.'],
  c45: [`${B} 6 f4 Qc7 7 Bd3 g6 8 O-O Bg7 9 Nf3 Nbd7 10 Qe1 b5 11 e5 dxe5 12 fxe5 Ng4 13 e6 fxe6`, 'f4-outras', '6.f4 Qc7', '⩲',
    'Com 6...Qc7 e o fianqueto as pretas montam um Dragão. As brancas rocam pequeno, levam a dama para e1 e h4, e com 13.e6 ficam um pouco melhor.'],
  c46: [`${B} 6 f4 Nbd7 7 Be2 e5 8 fxe5 dxe5 9 Nf5 Qb6 10 Bf3 g6 11 Ne3 Bb4 12 O-O Bxc3 13 bxc3 O-O`, 'f4-outras', '6.f4 Nbd7', '⩲',
    'Com 6...Nbd7 e 7...e5 as pretas trocam em e5. Depois de 9.Nf5 Qb6 elas impedem o roque por um tempo, mas as brancas ficam um pouco melhor.'],
  c47: [`${B} 6 a4 Nc6 7 Be2 e5 8 Nxc6 bxc6 9 f4 Qa5 10 O-O Rb8 11 Kh1 Be7 12 fxe5 dxe5 13 Bc4 O-O`, 'a4', '6.a4', '=',
    'Com 6.a4 as brancas impedem ...b5 de uma vez. As pretas respondem com 6...Nc6 e 7...e5, ficam com o peão dobrado em c6, mas igualam.'],
  c48: [`${B} 6 f3 Qb6 7 g4 Nc6 8 Nb3 e6 9 Bf4 Qc7 10 Qd2 Ne5 11 Be2 Be7 12 Bg3 b5 13 g5 Nfd7`, 'f3', '6.f3', '=',
    'O 6.f3!? prepara g4 e o Ataque Inglês. Com 6...Qb6 as pretas evitam as linhas mais conhecidas e igualam.'],
}

const notas = [
  // Coluna 43
  ['c43', 'a', 'a', '(a)', '4 Qxd4 Nc6 5 Bb5 Bd7 6 Bxc6 Bxc6 7 Nc3 Nf6 8 Bg5 e6 9 O-O-O Be7 10 Rhe1 O-O 11 Qd2 h6 12 Bf4 e5', { a: '=', r: 'Karjakin–Topalov, Dubai (rápidas) 2002', c: '4.Qxd4 é jogado por quem quer fugir da teoria; fica igual.' }],
  ['c43-a', '1', 'a', '(a) 12.Bh4', '12 Bh4 Nxe4', { a: '∓', c: 'Com 12.Bh4 as pretas pegam o peão: 12...Nxe4!.' }],
  ['c43-a', '2', 'a', '(a) 4...a6', '4... a6 5 c4 Nc6 6 Qd2 g6', { a: '=', c: '4...a6 também é razoável.' }],
  ['c43', 'b-A', 'b', '(b) A', '8 Bd3 b5 9 O-O Be7 10 Kh1 O-O', { a: '=', c: 'As brancas precisam frear as pretas na ala da dama para jogar pela vantagem. Com 8.Bd3 b5 fica igual.' }],
  ['c43', 'b-B', 'b', '(b) B', '8 Bc4 b5 9 Bd5 Rb8', { a: '=', c: 'Com 8.Bc4 b5 também fica igual.' }],
  ['c43', 'c', 'c', '(c)', '8... Qc7 9 Bd3 g6 10 O-O Bg7 11 Qe1 b6 12 Qh4 Bb7 13 Kh1 O-O 14 f5', { a: '⩲', r: 'P. Cramling–Arnason, Reykjavík 1994', c: 'Com 8...Qc7 e o fianqueto as brancas ficam com boas chances de ataque.' }],
  ['c43', 'd', 'd', '(d)', '9 Bc4 Qa5 10 Qe2 exf4 11 Bxf4 O-O 12 O-O Ne5 13 Nd5 Nxd5 14 Bxd5 Qb6+ 15 Kh1 Nxf3 16 Qxf3 Be6', { a: '=', r: 'Leko–Sutovsky, Tilburg 1996', c: 'Com 9.Bc4 fica igual.' }],
  ['c43-d', '1', 'd', '(d) 10.Bd2', '10 Bd2 exf4', { a: '=', c: 'Com 10.Bd2 também.' }],
  ['c43', 'e', 'e', '(e)', '11... d5 12 Nxe5 dxe4 13 Be2 Qc7 14 Be3 b6 15 Qe1 Bb7 16 Qg3 Rad8 17 Rad1', { a: '⩲', r: 'Psakhis–Balashov, Irkutsk 1986', c: 'Com 11...d5 as brancas ficam um pouco melhor.' }],
  ['c43-e', '1', 'e', '(e) 13...Qxd1', '13... Qxd1 14 Rxd1', { a: '⩲', c: 'Com a troca de damas também.' }],
  ['c43', 'f', 'f', '(f)', '13 Qd2 Bh5 14 Rae1 Bg6 15 b4 Nxd3 16 cxd3 d5', { a: '=', r: 'Z. Almasi–Oll, Olimpíada de Yerevan 1996', c: 'Com 13.Qd2 as pretas abrem o centro com 16...d5! e igualam.' }],
  ['c43', 'g-A', 'g', '(g) A', '14 Qe1 Bh5 15 Qg3 Bg6 16 Bd4 Re8', { a: '=', r: 'Friedel–Onyekwere, North American Open 2006', c: 'Depois de 14.Qe1 fica igual. (O livro traz "15.Be3", que é impossível; a dama vai para g3.)' }],
  ['c43', 'g-B', 'g', '(g) B', '14 Qd2 Nxd3 15 cxd3 d5', { a: '=', c: 'Com 14.Qd2 também fica igual.' }],
  ['c43-g-B', '1', 'g', '(g) B 15.Qxd3', '15 Qxd3 Be6', { a: '=', c: 'Ou 15.Qxd3 Be6, igual.' }],
  // Coluna 44
  ['c44', 'h', 'h', '(h)', '11 Kh1 Nh5 12 Nd5 Nc5 13 Nxf4 Bg4 14 Qe1 Re8 15 Nd5 Rc8', { a: '=', r: 'Semeniuk–Popov, Liga Russa 2004', c: 'As brancas podem evitar o sacrifício do peão com 11.Kh1 Nh5!?; fica igual.' }],
  ['c44-h', '1', 'h', '(h) 12.Nd4', '12 Nd4 Ndf6 13 Be2 g6', { a: '=', r: 'J. Polgár–Gelfand, Linares 1997', c: 'Com 12.Nd4 também fica igual.' }],
  ['c44', 'i', 'i', '(i)', '13 Nd5 Nxd5 14 exd5 Qb4', { a: '∓', c: 'Com 13.Nd5 vem 14...Qb4! e as pretas ficam um pouco melhor.' }],
  ['c44', 'j', 'j', '(j)', '14 Nd5 Nxd5 15 exd5 Qd8 16 c4 Nc5 17 Bc2 Bg4 18 Qg3 Bxf3 19 Rxf3 Bh4', { a: '=', r: 'Mahesh–Arghyadip, Índia 2000', c: 'Depois de 14.Nd5 e 15...Qd8! as chances ficam iguais.' }],
  // Coluna 45
  ['c45', 'k', 'k', '(k)', '7 a4 Nc6 8 Be2 g6 9 O-O Bg7 10 Nb3 O-O 11 Kh1 b6 12 Nd5 Nxd5 13 exd5 Nb4 14 c3 Bf5', { a: '=', r: 'P. Carlsson–Froehlich, Budapeste 2000', c: 'Com 7.a4 as pretas ficam com contrajogo depois de 14...Bf5!.' }],
  ['c45', 'l', 'l', '(l)', '7... e5 8 Nf3 b5', { a: '=', c: 'As pretas podem tentar o incomum 7...e5 8.Nf3 b5!?, com chances razoáveis.' }],
  ['c45', 'm', 'm', '(m)', '10... O-O 11 f5 b5 12 Qh4 Bb7 13 Bh6', { a: '±', c: 'Com 10...O-O 11.f5! as brancas ficam com um ataque perigoso.' }],
  ['c45-m', '1', 'm', '(m) 13.fxg6', '13 fxg6', { a: '±', c: '13.fxg6 também dá ataque perigoso.' }],
  ['c45', 'n', 'n', '(n)', '14 Qh4 Nde5 15 Nxe5 Nxe5 16 Be4 Bb7 17 Bxb7 Qxb7 18 Bh6', { a: '⩲', r: 'Z. Almasi–Lalić, Croácia 1996 (até 16...Bb7)', c: 'Depois de 14.Qh4 e 18.Bh6 as brancas ficam um pouco melhor.' }],
  ['c45-n', '1', 'n', '(n) 14...Ngf6', '14... Ngf6 15 Bh6', { a: '⩲', c: 'Com 14...Ngf6 também.' }],
  // Coluna 46
  ['c46', 'o-A', 'o', '(o) A', '6... g6 7 Nf3 Bg7 8 e5 Nh5 9 Bc4 O-O 10 Ng5 e6 11 g4', { a: '±', r: 'Kavalek–R. Byrne, Campeonato dos EUA 1978', c: 'Com 6...g6?! 7.Nf3! as brancas avançam o peão e e ficam claramente melhor.' }],
  ['c46', 'o-B', 'o', '(o) B', '6... e6', { c: '6...e6 transpõe para a Variante Scheveningen.' }],
  ['c46', 'p', 'p', '(p)', '7... g6 8 O-O Bg7 9 a4 O-O 10 Kh1 Nc5 11 Bf3', { a: '⩲', r: 'Stoica–Buljovčić, Bajmok 1984', c: 'Com 7...g6 as brancas ficam um pouco melhor.' }],
  ['c46', 'q', 'q', '(q)', '10 Nd5 Nxd5 11 Qxd5 Qc5 12 Qb3 Nf6 13 Bc4 Qb4+', { a: '=', r: 'Kasparov–Gelfand, Horgen 1994', c: 'Com 10.Nd5 fica igual.' }],
  ['c46', 'r', 'r', '(r)', '14 Qe1 Nc5 15 Kh1 Be6 16 Qh4', { a: '⩲', r: 'Wallace–Agrest, Suécia 1995', c: 'Depois de 14.Qe1 e 16.Qh4 as brancas ficam um pouco melhor.' }],
  // Coluna 47
  ['c47', 's', 's', '(s)', '6... e5 7 Nf3 h6 8 Bc4 Qc7 9 Bb3 Be6 10 O-O Nbd7 11 Nh4', { a: '⩲', r: 'Balashov–Sunye, Wijk aan Zee 1982', c: 'Com 6...e5 o cavalo branco vai para h4 e mira f5; as brancas ficam um pouco melhor.' }],
  ['c47', 't', 't', '(t)', '9... a5 10 O-O Be7 11 Qe1 O-O 12 Kh1 Nd7', { a: '=', c: '9...a5 também é razoável.' }],
  ['c47', 'u', 'u', '(u)', '14 Qe1 Kh8', { a: '=', r: 'Fishbein–Browne, EUA 1994', c: 'Depois de 14.Qe1 fica igual.' }],
  // Coluna 48
  ['c48', 'v-A', 'v', '(v) A', '6 h3 e5 7 Nde2 Be6 8 g4', { a: '⩲', c: 'Os outros sextos lances têm pouca importância teórica. Contra 6.h3 as pretas igualam fácil com 6...e6, 6...g6 ou 6...Nc6, mas não com 6...e5?!, que justifica um pouco o 6.h3.' }],
  ['c48', 'v-B', 'v', '(v) B', '6 Bd3 e5 7 Nde2 Be7 8 O-O O-O 9 Be3 b5 10 a3 Nbd7', { a: '=', r: 'Hassabis–de Firmian, Reykjavík 1990', c: 'Com 6.Bd3 fica igual.' }],
  ['c48', 'v-C', 'v', '(v) C', '6 Rg1 e5 7 Nb3 h5 8 Bg5 Be7 9 Be2 Nbd7 10 a4 b6 11 Nd2 Bb7 12 Nc4 Qc7 13 Ne3 Qc5 14 Qd3 Qd4', { a: '=', r: 'Glek–Lautier, Bad Zwesten 1999', c: '6.Rg1!? prepara g4, como no Ataque Keres; com 7...h5!? fica igual.' }],
  ['c48', 'w', 'w', '(w)', '6... b5 7 a4 b4 8 Nd5', { a: '⩲', c: 'O mais comum é transpor para o Ataque Inglês com 6...e5 ou 6...e6 (Scheveningen). Com 6...b5 as brancas ficam um pouco melhor.' }],
  ['c48', 'x', 'x', '(x)', '14 h4 Nb6 15 Qd4 O-O', { a: '=', r: 'Svidler–Grischuk, Memorial Tal 2006', c: 'Depois de 14.h4 fica igual.' }],
]

const capitulo = {
  id: 'siciliana-najdorf-g',
  arquivo: 'siciliana-najdorf-g',
  nome: 'Siciliana Najdorf — 6.f4 e outros',
  fonte: 'Modern Chess Openings — Sicilian Defense, Najdorf Variation, 6 f4 and 6 Misc. (pp. 267–268), colunas 43–48',
  base: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6',
  corPadrao: 'b',
  ordem: 267,
  grupos: [
    { id: 'f4-e5', nome: '6.f4 e5 7.Nf3 Nbd7', colunas: [43, 44] },
    { id: 'f4-outras', nome: '6.f4 Qc7 e 6.f4 Nbd7', colunas: [45, 46] },
    { id: 'a4', nome: '6.a4', colunas: [47] },
    { id: 'f3', nome: '6.f3', colunas: [48] },
  ],
}

module.exports = { capitulo, colunas, notas }
