// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Clássica: Rauzer Menor, Variante Boleslavsky e sextos lances raros (pp. 328–329), colunas 19–24.
// Gerar: node scripts/mco/gerar.cjs siciliana-boleslavsky
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-boleslavsky-dicas.cjs.
//
// A tabela traz avaliação só no fim da coluna 22; nas outras a avaliação vem da nota que continua a coluna.
// Nota (c): o livro numera "12 bxc3 Nxd5 13 c4 ...", mas a nota continua a coluna depois de 12...Bxc3; os lances são 13.bxc3 em diante.

const B = '1 e4 c5 2 Nf3 Nc6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 d6'

const colunas = {
  c19: [`${B} 6 Bg5 e6 7 Qd3 Be7 8 O-O-O O-O 9 Nb3 d5 10 Bxf6 Bxf6 11 exd5 Nb4 12 Qb5 Bxc3`, 'bg5', '6.Bg5 e6 7.Qd3', '=',
    'No Rauzer Menor as brancas jogam 6.Bg5 sem o plano com Qd2. Com 7.Qd3 e o roque grande elas pressionam d6, mas as pretas quebram com 9...d5! e, depois de 12...Bxc3, igualam.'],
  c20: [`${B} 6 Bg5 Bd7 7 Qd2 Rc8 8 O-O-O Nxd4 9 Qxd4 Qa5 10 f4 h6 11 Bxf6 gxf6 12 Be2 Qc5`, 'bg5', '6...Bd7 (plano de Larsen)', '⩲',
    'Com 6...Bd7 e 7...Rc8 as pretas seguem o plano de Larsen: atacam pela coluna c e aceitam peões dobrados em f6 em troca do par de bispos. As brancas mantêm uma pequena vantagem.'],
  c21: [`${B} 6 Bg5 Qb6 7 Nb3 e6 8 Bd3 Be7 9 O-O a6 10 Kh1 Qc7 11 f4 Bd7 12 Qe2 h6`, 'bg5', '6...Qb6', '±',
    'Com 6...Qb6 a dama ataca o cavalo de d4 e o peão b2. As brancas recuam para b3, rocam pequeno e avançam f4; depois de 12...h6 elas ficam melhor.'],
  c22: [`${B} 6 Be2 e5 7 Nb3 Be7 8 O-O O-O 9 Be3 Be6 10 Bf3 a5 11 Nd5 Bxd5 12 exd5 Nb4`, 'boleslavsky', '6.Be2 e5 7.Nb3', '=',
    'Na Variante Boleslavsky as pretas respondem a 6.Be2 com 6...e5!, expulsando o cavalo de d4 e aceitando a casa fraca em d5. Com ...a5 e ...Nb4 elas pressionam o peão d5 e igualam.'],
  c23: [`${B} 6 Be2 e5 7 Nf3 h6 8 O-O Be7 9 Re1 O-O 10 h3 Be6 11 Bf1 Nb8 12 a4 Nbd7`, 'boleslavsky', '7.Nf3', '∞',
    'Com 7.Nf3 o cavalo vigia d4 e e5. As pretas impedem Bg5 com 7...h6 e levam o cavalo de c6 para d7 por b8, com chances para os dois lados.'],
  c24: [`${B} 6 f3 e5 7 Nb3 Be7 8 Be3 Be6 9 Nd5 Bxd5 10 exd5 Nb4 11 c4 a5 12 Qd2 b6`, 'raros', '6.f3', '=',
    'Com 6.f3 as brancas reforçam e4 e preparam Be3 e g4. As pretas jogam 6...e5 como na Boleslavsky e, depois de 9.Nd5 Bxd5 10.exd5 Nb4, igualam.'],
}

const notas = [
  // Coluna 19
  ['c19', 'a-A', 'a', '(a) A', '7 Bb5 Bd7 8 Bxc6 bxc6 9 Qf3 h6 10 Bh4 Qb6 11 O-O-O Be7 12 Nb3 Qc7', { a: '=', r: 'Rensch–Shabalov, North American Open 2003', c: '7.Bb5 Bd7 8.Bxc6 bxc6 9.Qf3 leva a um jogo igual.' }],
  ['c19', 'a-B', 'a', '(a) B', '7 Be2 Be7 8 O-O O-O 9 Qd3 h6', { a: '=', r: 'Bronstein–Keres, Budapeste 1951', c: '7.Be2 Be7 8.O-O O-O 9.Qd3 h6 também é igual.' }],
  ['c19-a-B', '1', 'a', '(a) B 9...Nxd4', '9... Nxd4 10 Qxd4 Nxe4 11 Nxe4 Bxg5', { a: '=', c: '9...Nxd4 10.Qxd4 Nxe4! 11.Nxe4 Bxg5 também iguala.' }],
  ['c19', 'b', 'b', '(b)', '7... a6 8 O-O-O Bd7 9 f4 h6 10 Bh4 g5 11 fxg5 Ng4 12 Nxc6 Bxc6 13 Kb1 hxg5', { a: '=', r: 'Tolnai–Atalik, Budapeste 1992', c: '7...a6 8.O-O-O Bd7 9.f4 h6 10.Bh4 g5 também leva à igualdade.' }],
  ['c19', 'c', 'c', '(c)', '13 bxc3 Nxd5 14 c4 Bd7 15 Qxb7 Qg5+ 16 Rd2 Nf6', { a: '=', r: 'Yudasin–Khalifman, Campeonato Soviético 1990', c: 'Com 13.bxc3 Nxd5 14.c4 Bd7 15.Qxb7 Qg5+ as pretas têm compensação pelo peão, e o jogo fica igual.' }],
  // Coluna 20
  ['c20', 'd-A', 'd', '(d) A', '7 Be2 e6 8 Qd2 a6 9 O-O-O', { c: '6...Bd7 é o plano de Larsen. 7.Be2 e6 8.Qd2 a6 9.O-O-O transpõe para a coluna 12 (Richter-Rauzer B).' }],
  ['c20', 'd-B', 'd', '(d) B', '7 Bxf6 gxf6', { a: '=', c: '7.Bxf6 gxf6 é igual.' }],
  ['c20', 'e', 'e', '(e)', '7... Nxd4 8 Qxd4 Qa5 9 Bd2 Qc7 10 Bc4 e6 11 Bb3', { a: '±', r: 'R. Byrne–Benko, EUA 1970', c: '7...Nxd4 8.Qxd4 Qa5 9.Bd2 deixa as brancas melhor.' }],
  ['c20', 'f', 'f', '(f)', '10 Bd2 a6 11 Kb1 Qc5 12 Qxc5 Rxc5 13 f3 Rc8', { a: '=', r: 'Xie Jun–Dreev, Copa Sanjin 2004', c: 'Com 10.Bd2 a6 11.Kb1 Qc5 as damas saem e o jogo fica igual.' }],
  ['c20', 'g-A', 'g', '(g) A', '10... e6 11 e5 dxe5 12 fxe5 Bc6 13 Nb5 Bxb5 14 exf6 Bc6 15 h4 g6 16 Bc4 Bc5 17 Qg4 h5 18 Qe2', { a: '±', r: 'Varga–Robatsch, Áustria 1995', c: '10...e6 11.e5! dxe5 12.fxe5 deixa as brancas melhor.' }],
  ['c20-g-A', '1', 'g', '(g) A 14...Ba4', '14... Ba4 15 Bd2 Rxc2+ 16 Kb1', { a: '±', c: '14...Ba4 15.Bd2! Rxc2+ 16.Kb1 também deixa as brancas melhor.' }],
  ['c20', 'g-B', 'g', '(g) B', '10... Rxc3 11 bxc3 e5 12 Qb4 Qxb4 13 cxb4 Nxe4 14 Bh4 g5 15 fxg5 Be7 16 Bc4', { a: '±', r: 'Schlosser–Lendwai, Campeonato Austríaco 1992', c: 'O sacrifício de qualidade 10...Rxc3 quase funciona, mas as brancas ficam melhor.' }],
  ['c20', 'h-A', 'h', '(h) A', '13 Qd2 Bg7 14 Kb1 f5 15 e5 O-O', { a: '∓', r: 'Svidler–Aseev, São Petersburgo 1997', c: '13.Qd2 Bg7 14.Kb1?! f5 entrega a iniciativa às pretas.' }],
  ['c20', 'h-B', 'h', '(h) B', '12 f5 h5 13 Kb1 Qc5 14 Qd3 h4 15 Be2', { a: '⩲', r: 'Dolmatov–Dorfman, Campeonato Soviético 1980', c: 'As brancas fazem melhor com 12.f5 h5 13.Kb1, com uma pequena vantagem.' }],
  // Coluna 21
  ['c21', 'i', 'i', '(i)', '6... a6', { c: '6...a6 costuma surgir da Najdorf (6.Bg5 Nc6) e é tratado naquela seção, se as brancas jogarem 7.f4 em vez de 7.Qd2 e6.' }],
  ['c21', 'j', 'j', '(j)', '8 Bxf6 gxf6 9 Be2 a6 10 O-O Be7 11 Kh1 O-O 12 f4 Kh8', { r: 'Tarjan–Ostojić, Veneza 1974', c: '8.Bxf6 gxf6 9.Be2 dá menos problemas às pretas.' }],
  ['c21', 'k', 'k', '(k)', '13 Bh4 g5 14 Bg3 gxf4 15 Rxf4 Ne5 16 Raf1', { a: '±', r: 'R. Byrne–Benjamin, Campeonato dos EUA 1984', c: 'Com 13.Bh4 g5?! 14.Bg3! gxf4 15.Rxf4 as brancas ficam melhor.' }],
  // Coluna 22
  ['c22', 'l', 'l', '(l)', '8 Bg5 Nxe4 9 Bxe7 Nxc3 10 Bxd8 Nxd1 11 Rxd1 Kxd8 12 Rxd6+ Ke7', { a: '=', r: 'Böök–Bronstein, Saltsjöbaden 1948', c: '8.Bg5 Nxe4! leva a muitas trocas e a um final igual.' }],
  ['c22', 'm', 'm', '(m)', '9 f4 a5 10 a4 Nb4 11 Kh1 Be6 12 f5 Bd7 13 Bg5 Bc6', { a: '=', r: 'V. Onischuk–S. Ivanov, Tallinn 2007', c: '9.f4 a5! (lance típico da Boleslavsky) 10.a4 Nb4 leva à igualdade.' }],
  ['c22', 'n', 'n', '(n)', '10 f4 exf4 11 Bxf4 d5', { a: '=', c: '10.f4 exf4 11.Bxf4 d5 é completamente igual. A coluna é Spassky–Ioseliani, Mônaco 1994.' }],
  // Coluna 23
  ['c23', 'o', 'o', '(o)', '7... Be7 8 Bg5 O-O 9 O-O Be6 10 Bxf6 Bxf6 11 Nd5', { a: '⩲', c: 'Depois de 7...Be7 8.Bg5 as brancas trocam em f6 e controlam d5, com uma pequena vantagem.' }],
  ['c23', 'p', 'p', '(p)', '10 Bf1 Bg4 11 h3 Bh5 12 Be2 Bg6 13 Bd3 Rc8', { a: '=', r: 'Thipsay–Yermolinsky, Londres 1994', c: 'Com 10.Bf1 Bg4 o jogo fica igual.' }],
  ['c23', 'q', 'q', '(q)', '10... Re8 11 Bf1 Bf8 12 b3 a6 13 Bb2 b5 14 a4 b4 15 Nd5 Nxd5 16 exd5 Ne7 17 a5 Bb7 18 Bc4 Rc8', { a: '=', r: 'Xie Jun–Demina, Olimpíada de Manila 1992', c: 'As pretas também ficam bem com 10...Re8.' }],
  ['c23', 'r', 'r', '(r)', '13 a5 a6 14 Nd5 Nxd5 15 exd5 Bf5', { a: '∞', r: 'Zagrebelny–Benjamin, Lucerna 1993', c: 'Com 13.a5 a6 14.Nd5 o jogo tem chances para os dois lados.' }],
  // Coluna 24
  ['c24', 's-A', 's', '(s) A', '6 g3 Nxd4 7 Qxd4 g6 8 Bg2 Bg7 9 O-O O-O', { a: '=', c: '6.g3 Nxd4 7.Qxd4 g6 transpõe para uma linha sem graça contra o Dragão.' }],
  ['c24', 's-B', 's', '(s) B', '6 Be3 Ng4 7 Bg5 h6 8 Bh4 g5 9 Bg3 Bg7 10 Nb3 Be6', { a: '=', r: 'Adams–Kramnik, Belgrado 1995', c: '6.Be3 Ng4 ataca o bispo; 7.Bg5 h6 8.Bh4 g5 leva à igualdade.' }],
  ['c24-s-B', '1', 's', '(s) B 7.Bb5', '7 Bb5 Nxe3', { a: '=', c: '7.Bb5 Nxe3 é igual.' }],
  ['c24', 's-C', 's', '(s) C', '6 f4 e5 7 Nf3 Be7 8 Bd3 Qb6 9 Rb1 O-O 10 Qe2 Bg4', { a: '=', r: 'Sznapik–Hort, Olimpíada de Lucerna 1982', c: '6.f4 e5 7.Nf3 Be7 8.Bd3 Qb6! impede o roque e leva à igualdade.' }],
  ['c24-s-C', '1', 's', '(s) C 8.Bc4', '8 Bc4 O-O 9 Bb3 Bg4', { a: '=', c: '8.Bc4 O-O 9.Bb3 Bg4 também é igual.' }],
  ['c24', 't', 't', '(t)', '6... e6 7 Be3 Be7', { c: '6...e6 7.Be3 Be7 transpõe para a Scheveningen (6.Be3 Be7 7.f3 Nc6).' }],
  ['c24', 'u', 'u', '(u)', '7 Nde2 Be7 8 Be3 Be6 9 Qd2 Qa5', { a: '=', r: 'Dysing–Degerman, Estocolmo 1995', c: 'Com 7.Nde2 Be7 8.Be3 Be6 o jogo fica igual.' }],
  ['c24', 'v', 'v', '(v)', '13 Nc1 O-O 14 Be2 Na6 15 O-O Nc5', { a: '=', r: 'Movsesian–Shabalov, Bermudas 2003', c: 'Com 13.Nc1 O-O 14.Be2 Na6 o cavalo chega a c5, e o jogo fica igual.' }],
]

const capitulo = {
  id: 'siciliana-boleslavsky',
  arquivo: 'siciliana-boleslavsky',
  nome: 'Siciliana Clássica — Rauzer Menor, Boleslavsky e 6º lances raros',
  fonte: 'Modern Chess Openings — Sicilian Defense, Minor Richter-Rauzer, Boleslavsky Variation, Rare Sixth Moves (pp. 328–329), colunas 19–24',
  base: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 d6',
  corPadrao: 'b',
  ordem: 328,
  grupos: [
    { id: 'bg5', nome: '6.Bg5 (Rauzer Menor)', colunas: [19, 20, 21] },
    { id: 'boleslavsky', nome: '6.Be2 e5 (Boleslavsky)', colunas: [22, 23] },
    { id: 'raros', nome: '6.f3 e outros', colunas: [24] },
  ],
}

module.exports = { capitulo, colunas, notas }
