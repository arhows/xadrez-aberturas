// Transcrição do MCO 15ª ed. — Defesa Nimzo-Índia, Rubinstein 4.e3 O-O: desvios e Variante Reshevsky (pp. 551–552), colunas 31–36.
// Gerar: node scripts/mco/gerar.cjs nimzo-f
// Formato: ver gambito-do-rei.cjs. Dicas em nimzo-f-dicas.cjs.
//
// Só a coluna 33 traz avaliação no fim; as outras usam a da nota que as continua.
// Nota (o): "permite às brancas uma cunha na ala da dama" ficou ⩲.
// Notas só com comentário: (a) A e B, (i) A.

const R = '1 d4 Nf6 2 c4 e6 3 Nc3 Bb4 4 e3 O-O'

const colunas = {
  c31: [`${R} 5 Bd3 d5 6 Nf3 b6 7 O-O Bb7 8 a3 Bd6 9 b4 dxc4 10 Bxc4 Nbd7 11 Bb2 a5 12 b5 Qe7`, 'b6', '5.Bd3 d5 6.Nf3 b6 7.O-O Bb7 8.a3', '=',
    'Com 6...b6 as pretas jogam pelo controle das casas brancas. Depois de 7.O-O Bb7 8.a3 Bd6 9.b4 dxc4 10.Bxc4 Nbd7 11.Bb2 a5 12.b5 Qe7, com 13.Be2 Rad8 14.Qc2 e5 o jogo é igual.'],
  c32: [`${R} 5 Bd3 d5 6 Nf3 b6 7 O-O Bb7 8 cxd5 exd5 9 a3 Bd6 10 b4 a6 11 Qb3 Nbd7 12 a4 Qe7`, 'b6', '8.cxd5', '=',
    'Com 8.cxd5 exd5 9.a3 Bd6 10.b4 as brancas ganham espaço na ala da dama. Depois de 10...a6 11.Qb3 Nbd7 12.a4 Qe7, com 13.Rb1 Rfd8 14.b5 o jogo é igual.'],
  c33: [`${R} 5 Bd3 d5 6 a3 Bxc3+ 7 bxc3 dxc4 8 Bxc4 c5 9 Ne2 Nc6 10 a4 Qc7 11 Ba3 b6 12 Qc2 Rd8`, 'a3', '6.a3', '=',
    'Com 6.a3 as brancas forçam a troca em c3 antes de desenvolver o cavalo do rei. Depois de 6...Bxc3+ 7.bxc3 dxc4 8.Bxc4 c5 9.Ne2 Nc6 10.a4 Qc7! 11.Ba3 b6 12.Qc2 Rd8 o jogo é igual.'],
  c34: [`${R} 5 Bd3 d5 6 Ne2 dxc4 7 Bxc4 c5 8 O-O cxd4 9 exd4 Nc6 10 a3 Bd6 11 h3 b6 12 Bg5 Be7`, 'nge2', '6.Ne2', '=',
    'Com 6.Ne2 o cavalo do rei vai a e2 para evitar os peões dobrados. Depois de 6...dxc4 7.Bxc4 c5 8.O-O cxd4 9.exd4 Nc6 10.a3 Bd6 11.h3 b6 12.Bg5 Be7 as brancas têm o peão isolado em d4 e, com 13.Qd3 h6, o jogo é igual.'],
  c35: [`${R} 5 Ne2 d5 6 a3 Be7 7 cxd5 Nxd5 8 Qc2 Nd7 9 e4 Nxc3 10 Nxc3 c5 11 d5 Nb6 12 dxe6 Bxe6`, 'reshevsky', '5.Ne2 d5', '=',
    'Na Variante Reshevsky, 5.Ne2, as brancas evitam os peões dobrados e querem expulsar o bispo com a3; em troca, o bispo de f1 fica bloqueado por enquanto. Depois de 5...d5 6.a3 Be7 7.cxd5 Nxd5 8.Qc2 Nd7 9.e4 Nxc3 10.Nxc3 c5 11.d5 Nb6 12.dxe6 Bxe6 o jogo é igual.'],
  c36: [`${R} 5 Ne2 Re8 6 a3 Bf8 7 d5 exd5 8 cxd5 c5 9 Ng3 d6 10 Be2 b6 11 O-O Ba6 12 e4 Bxe2`, 'reshevsky', '5...Re8', '=',
    'Com 5...Re8 6.a3 Bf8 as pretas preparam ...d5 ou ...e5. Depois de 7.d5 exd5 8.cxd5 c5! 9.Ng3 d6 10.Be2 b6 11.O-O Ba6 12.e4 Bxe2 a estrutura lembra uma Benoni e o jogo é igual.'],
}

const notas = [
  // Coluna 31
  ['c31', 'a-A', 'a', '(a) A', '6... Nc6', { c: 'Com 6...Nc6 as pretas transpõem para a Variante Ragozin do Gambito da Dama Recusado.' }],
  ['c31', 'a-B', 'a', '(a) B', '6... c6', { c: 'Com 6...c6 as pretas transpõem para a Variante Romih da Semi-Eslava.' }],
  ['c31', 'b', 'b', '(b)', '8... Bxc3 9 bxc3 Nbd7 10 cxd5 exd5 11 a4 c5 12 Nd2 Re8 13 Re1 Qc7 14 f3 Rad8 15 Nf1 Nf8 16 Ra2', { a: '⩲', r: 'Ivanchuk–Kamsky, Tilburg 1992', c: '8...Bxc3 9.bxc3 Nbd7 10.cxd5 exd5 11.a4 c5 12.Nd2 Re8 13.Re1 Qc7 14.f3 Rad8 15.Nf1 Nf8 16.Ra2 é um pouco melhor para as brancas.' }],
  ['c31', 'c', 'c', '(c)', '9 b3 Nbd7 10 Nb5 Be7 11 Bb2 dxc4 12 bxc4 c5 13 Qe2 Re8', { a: '=', r: 'Lukacs–Z. Almasi, Hungria 1994', c: '9.b3 Nbd7 10.Nb5 Be7 11.Bb2 dxc4! 12.bxc4 c5 13.Qe2 Re8 é igual.' }],
  ['c31', 'd', 'd', '(d)', '13 Be2 Rad8 14 Qc2 e5 15 a4 Rfe8', { a: '=', r: 'Shabalov–Benjamin, Campeonato dos EUA 1993', c: '13.Be2 Rad8 14.Qc2 e5 15.a4 Rfe8 é igual.' }],
  // Coluna 32
  ['c32', 'e', 'e', '(e)', '9 Ne5 Bd6 10 f4 c5 11 Qf3 Nc6 12 Qh3 g6 13 Bd2 cxd4 14 Nxc6 Bxc6 15 exd4 Ne4 16 Bxe4 dxe4 17 f5 Bc5', { a: '=', r: 'Vaiser–Arnason, Helsinque 1991', c: '9.Ne5 Bd6 10.f4 c5 11.Qf3 Nc6 12.Qh3 g6 13.Bd2 cxd4 14.Nxc6 Bxc6 15.exd4 Ne4 16.Bxe4 dxe4 17.f5 Bc5! é igual.' }],
  ['c32', 'f', 'f', '(f)', '13 Rb1 Rfd8 14 b5 Nf8 15 Bb2 Ne6 16 Rbc1 axb5 17 axb5 Ne4', { a: '=', r: 'Kasimdzhanov–Vallejo Pons, Linares 2005', c: '13.Rb1 Rfd8 14.b5 Nf8 15.Bb2 Ne6 16.Rbc1 axb5 17.axb5 Ne4 é igual.' }],
  // Coluna 33
  ['c33', 'g', 'g', '(g)', '6... dxc4 7 Bxh7+ Kxh7 8 axb4 Nc6 9 Nf3 Nxb4 10 O-O c5 11 dxc5 Qxd1 12 Rxd1 Nd3 13 Ra4', { a: '⩲', r: 'Milov–Schönthier, Alemanha 1996', c: '6...dxc4 7.Bxh7+ Kxh7 8.axb4 Nc6 9.Nf3 Nxb4 10.O-O c5 11.dxc5 Qxd1 12.Rxd1 Nd3 13.Ra4 é um pouco melhor para as brancas.' }],
  ['c33', 'h', 'h', '(h)', '7... c5 8 cxd5 exd5 9 Ne2 b6 10 O-O Ba6 11 Bxa6 Nxa6 12 f3 Nc7 13 Ng3 Re8 14 Re1 Qd7 15 e4', { a: '⩲', r: 'Vaganian–Antoshin, Campeonato da URSS 1970', c: '7...c5 8.cxd5 exd5 9.Ne2 b6 10.O-O Ba6 11.Bxa6 Nxa6 12.f3 Nc7 13.Ng3 Re8 14.Re1 Qd7 15.e4 é um pouco melhor para as brancas.' }],
  ['c33', 'i-A', 'i', '(i) A', '9 Nf3 Nc6 10 O-O', { c: '9.Nf3 Nc6 10.O-O transpõe para a coluna 19.' }],
  ['c33', 'i-B', 'i', '(i) B', '9 Bb2 Qa5 10 Ne2 cxd4 11 exd4 b6 12 O-O Ba6', { a: '=', r: 'Yusupov–Z. Almasi, Dortmund 1996', c: '9.Bb2 Qa5 10.Ne2 cxd4 11.exd4 b6 12.O-O Ba6 é igual. A coluna é Botvinnik–Reshevsky, match EUA–URSS 1946.' }],
  // Coluna 34
  ['c34', 'j', 'j', '(j)', '6 cxd5 exd5 7 Ne2 Bd6 8 a3 Re8 9 b4 c6 10 Ra2 Nbd7 11 f3 a5', { a: '=', r: 'D. Gurevich–de Firmian, Campeonato dos EUA 1997', c: '6.cxd5 exd5 7.Ne2 Bd6 8.a3 Re8 9.b4 c6 10.Ra2 Nbd7 11.f3 a5 é igual.' }],
  ['c34', 'k', 'k', '(k)', '6... b6 7 cxd5 exd5 8 O-O Bb7 9 a3 Bd6 10 b4 c6 11 Qb3 a5', { a: '∞', r: 'Stojanović–Želčić, Budapeste 1996', c: '6...b6 7.cxd5 exd5 8.O-O Bb7 9.a3 Bd6 10.b4 c6 11.Qb3 a5 leva a uma posição pouco clara.' }],
  ['c34', 'l', 'l', '(l)', '7... e5 8 a3 Bd6 9 Nb5 Nc6 10 Nxd6 Qxd6 11 O-O Rd8 12 h3 Be6', { a: '=', r: 'Mascarinas–Christiansen, Olimpíada de Tessalônica 1988', c: '7...e5!? 8.a3 Bd6 9.Nb5 Nc6 10.Nxd6 Qxd6 11.O-O Rd8 12.h3 Be6 é igual.' }],
  ['c34', 'm', 'm', '(m)', '13 Qd3 h6 14 Bh4 Bb7 15 Rad1 Nd5 16 Bg3 Bf6 17 Ne4 Be7', { a: '=', r: 'Korchnoi–Salov, Madri 1996', c: '13.Qd3 h6 14.Bh4 Bb7 15.Rad1 Nd5 16.Bg3 Bf6 17.Ne4 Be7 é igual.' }],
  // Coluna 35
  ['c35', 'n', 'n', '(n)', '6 cxd5 exd5 7 g3 c6 8 Bg2 Na6 9 O-O Bf5 10 f3 Re8 11 g4 Bg6 12 Nf4 Nd7', { a: '∞', r: 'Bönsch–Hübner, Munique 1990', c: '6.cxd5 exd5 7.g3 c6 8.Bg2 Na6 9.O-O Bf5 10.f3 Re8 11.g4 Bg6 12.Nf4 Nd7 dá chances para os dois lados.' }],
  ['c35', 'o', 'o', '(o)', '6... Bd6 7 c5 Be7 8 b4 b6 9 Nf4 bxc5 10 bxc5', { a: '⩲', r: 'Saidy–Fischer, Campeonato dos EUA 1961', c: '6...Bd6?! 7.c5 Be7 8.b4 b6 9.Nf4 bxc5 10.bxc5 dá às brancas uma cunha na ala da dama.' }],
  ['c35', 'p', 'p', '(p)', '7 Nf4 c6 8 Bd3 dxc4 9 Bxc4 Nbd7', { a: '=', r: 'Zaja–Farago, Bolzano 1998', c: '7.Nf4 c6 8.Bd3 dxc4! 9.Bxc4 Nbd7 é igual.' }],
  ['c35', 'q', 'q', '(q)', '7... exd5 8 g3 c6 9 Bg2 Na6 10 Bd2 Nc7 11 Qc2 g6 12 f3 Ne6 13 Na4 Re8 14 O-O a5', { a: '=', r: 'Karpov–Piket, match 1999', c: 'Também é razoável o método antigo 7...exd5 8.g3 c6 9.Bg2 Na6 10.Bd2 Nc7 11.Qc2 g6 12.f3 Ne6 13.Na4 Re8 14.O-O a5, com igualdade.' }],
  ['c35', 'r', 'r', '(r)', '13 Be2 Bf6 14 O-O a6', { a: '=', r: 'Georgadze–Salov, Campeonato Russo 1998', c: '13.Be2 Bf6 14.O-O a6 é igual.' }],
  // Coluna 36
  ['c36', 's', 's', '(s)', '6 g3 d5 7 Bg2 dxc4 8 O-O c6 9 Qc2 Nbd7 10 Ne4 Nb6', { a: '=', r: 'Georgadze–Bacrot, Groningen 1997', c: '6.g3 d5 7.Bg2 dxc4 8.O-O c6 9.Qc2 Nbd7 10.Ne4 Nb6 é mais ou menos igual.' }],
  ['c36', 't', 't', '(t)', '7 e4 d5 8 e5 Nfd7 9 cxd5 exd5 10 Be3 c5 11 f4 Nc6 12 dxc5 Bxc5 13 Bxc5 Nxc5 14 b4 Ne6 15 Qxd5 Qb6 16 Qe4 a5', { a: '∞', r: 'Shulman–Moiseenko, Dallas 2004', c: '7.e4 d5 8.e5 Nfd7 9.cxd5 exd5 10.Be3 c5 11.f4 Nc6 12.dxc5 Bxc5 13.Bxc5 Nxc5 14.b4 Ne6 15.Qxd5 Qb6 16.Qe4 a5 dá chances para os dois lados.' }],
  ['c36', 'u', 'u', '(u)', '13 Qxe2 g6 14 Bg5 Nbd7 15 f4 Bg7 16 Rad1 a6', { a: '=', r: 'M. Gurevich–Wedberg, Nova York 1989', c: '13.Qxe2 g6 14.Bg5 Nbd7 15.f4 Bg7 16.Rad1 a6 é igual.' }],
]

const capitulo = {
  id: 'nimzo-f',
  arquivo: 'nimzo-f',
  nome: 'Nimzo-Índia — Rubinstein, desvios e Variante Reshevsky',
  fonte: 'Modern Chess Openings — Nimzo-Indian Defense (pp. 551–552), colunas 31–36',
  base: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4',
  corPadrao: 'b',
  ordem: 551,
  grupos: [
    { id: 'b6', nome: '5.Bd3 d5 6.Nf3 b6', colunas: [31, 32] },
    { id: 'a3', nome: '5.Bd3 d5 6.a3', colunas: [33] },
    { id: 'nge2', nome: '5.Bd3 d5 6.Ne2', colunas: [34] },
    { id: 'reshevsky', nome: '5.Ne2 (Reshevsky)', colunas: [35, 36] },
  ],
}

module.exports = { capitulo, colunas, notas }
