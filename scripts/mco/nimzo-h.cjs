// Transcrição do MCO 15ª ed. — Defesa Nimzo-Índia, Rubinstein 4...c5 (e outros 4º lances) (pp. 555–556), colunas 43–48.
// Gerar: node scripts/mco/gerar.cjs nimzo-h
// Formato: ver gambito-do-rei.cjs. Dicas em nimzo-h-dicas.cjs.
//
// Só a coluna 48 traz avaliação no fim (⩲); as outras usam a da nota que as continua.
// Avaliações tiradas do texto: (a) "bom jogo pelo peão" ficou ⩲; (m) e (u) "chances para os dois lados" ficaram ∞;
// (p) "pelo menos a igualdade para as pretas" ficou =; (s) "final um pouco melhor para as brancas" ficou ⩲.
// Notas só com comentário: (i) A, (l) 13.fxe5, (q), (r).
// Notação: na nota (i) o livro escreve 6.Nge2, mas o cavalo de c3 está cravado; ficou 6.Ne2.

const F = '1 d4 Nf6 2 c4 e6 3 Nc3 Bb4 4 e3'

const colunas = {
  c43: [`${F} c5 5 Ne2 cxd4 6 exd4 d5 7 c5 Ne4 8 Bd2 Nxd2 9 Qxd2 a5 10 a3 Bxc3 11 Nxc3 a4 12 Bd3 b6`, 'c5ne2', '4...c5 5.Ne2 cxd4', '=',
    'Contra 4...c5 o cavalo vai a e2 para recapturar em c3 sem dobrar os peões. Depois de 5...cxd4 6.exd4 d5 7.c5 as brancas fecham a ala da dama, e as pretas respondem com 7...Ne4 8.Bd2 Nxd2 9.Qxd2 a5 10.a3 Bxc3 11.Nxc3 a4 12.Bd3 b6, minando a corrente de peões; o jogo é igual.'],
  c44: [`${F} c5 5 Ne2 b6 6 a3 Ba5 7 Rb1 Na6 8 f3 O-O 9 d5 d6 10 e4 exd5 11 cxd5 b5 12 Ng3 Rb8`, 'c5ne2', '5...b6', '=',
    'Com 5...b6 6.a3 Ba5 as pretas mantêm o bispo. Depois de 7.Rb1 Na6 8.f3 O-O 9.d5 d6 10.e4 exd5 11.cxd5 b5 12.Ng3 Rb8 a estrutura lembra uma Benoni, e as pretas igualam com o contrajogo na ala da dama.'],
  c45: [`${F} c5 5 Bd3 Nc6 6 Nf3 Bxc3+ 7 bxc3 d6 8 e4 e5 9 d5 Ne7 10 Nh4 h6 11 f3 Qa5 12 Bd2 Ng6`, 'hubner', 'Sistema Hübner, 8.e4', '∞',
    'O Sistema Hübner: 5.Bd3 Nc6 6.Nf3 Bxc3+ 7.bxc3 d6 e as pretas fecham o centro com ...e5, deixando os bispos brancos sem diagonais. Depois de 8.e4 e5 9.d5 Ne7 10.Nh4 h6 11.f3 Qa5 12.Bd2 Ng6 há chances para os dois lados.'],
  c46: [`${F} c5 5 Bd3 Nc6 6 Nf3 Bxc3+ 7 bxc3 d6 8 O-O e5 9 Qc2 O-O 10 Ng5 h6 11 Ne4 b6 12 Nxf6+ Qxf6`, 'hubner', '8.O-O', '=',
    'Com 8.O-O e5 9.Qc2 O-O as brancas adiam e4. Depois de 10.Ng5 h6 11.Ne4 b6 12.Nxf6+ Qxf6 as pretas ficam com pelo menos a igualdade.'],
  c47: [`${F} d5 5 a3 Be7 6 Bd3 b6 7 cxd5 exd5 8 Nge2 O-O 9 b4 Nbd7 10 Qb3 Bb7 11 O-O Re8 12 b5 Bd6`, 'd5', '4...d5 5.a3', '⩲',
    'Com 4...d5 5.a3 Be7 a posição lembra um Gambito da Dama Recusado em que as brancas ganharam a3. Depois de 6.Bd3 b6 7.cxd5 exd5 8.Nge2 O-O 9.b4 Nbd7 10.Qb3 Bb7 11.O-O Re8 12.b5 Bd6 as brancas ficam um pouco melhor.'],
  c48: [`${F} Nc6 5 Ne2 d5 6 a3 Be7 7 cxd5 exd5 8 Nf4 O-O 9 Be2 Bf5 10 g4 Be6 11 g5`, 'nc6', '4...Nc6', '⩲',
    'O raro 4...Nc6 bloqueia o peão c. Depois de 5.Ne2 d5 6.a3 Be7 7.cxd5 exd5 8.Nf4 O-O 9.Be2 Bf5 10.g4! Be6 11.g5 as brancas expulsam o cavalo de f6 e ficam um pouco melhor.'],
}

const notas = [
  // Coluna 43
  ['c43', 'a', 'a', '(a)', '6... O-O 7 a3 Be7 8 d5 exd5 9 cxd5 Re8 10 d6 Bf8 11 g3 Re6 12 Bf4 Nh5 13 Be3 Rxd6 14 Qc2 Nc6 15 Bg2 Nf6 16 O-O', { a: '⩲', r: 'Makarov–Xu Jun, Belgrado 1988', c: '6...O-O 7.a3 Be7 8.d5 exd5 9.cxd5 Re8 10.d6 Bf8 11.g3 Re6 12.Bf4 Nh5 13.Be3 Rxd6 14.Qc2 Nc6 15.Bg2 Nf6 16.O-O deixa as brancas com bom jogo pelo peão.' }],
  ['c43', 'b', 'b', '(b)', '7 a3 Be7 8 c5 O-O 9 g3 b6 10 b4 bxc5 11 dxc5 a5 12 Rb1 Nc6 13 Bg2 Rb8 14 Bf4 axb4 15 Bxb8 bxc3', { a: '∓', r: 'Salov–M. Gurevich, Leningrado 1987', c: '7.a3 Be7 8.c5 O-O 9.g3 b6 10.b4 bxc5 11.dxc5 a5 12.Rb1 Nc6 13.Bg2 Rb8! 14.Bf4?! axb4 15.Bxb8 bxc3 é melhor para as pretas.' }],
  ['c43', 'c', 'c', '(c)', '9... Qd7 10 a3 Ba5 11 g3 O-O 12 Bg2 Bd8 13 O-O b6 14 f4 Na6 15 b4', { a: '±', r: 'Sadler–Kosten, Campeonato Britânico 1997', c: 'As pretas perdem tempo demais com 9...Qd7?! 10.a3 Ba5 11.g3 O-O 12.Bg2 Bd8 13.O-O b6 14.f4 Na6 15.b4, e as brancas ficam melhor.' }],
  ['c43', 'd', 'd', '(d)', '11... Bd7 12 Bd3 a4 13 O-O Nc6 14 Bc2 Ne7 15 Rfe1 b6 16 Qd1 bxc5 17 dxc5 Qa5 18 Nxd5 exd5 19 Qxd5 Be6 20 Qg5 Ng6 21 Re4 O-O', { a: '=', r: 'Rechlis–Portisch, Interzonal de Manila 1990', c: 'As pretas também têm 11...Bd7 12.Bd3 a4 13.O-O Nc6! 14.Bc2 Ne7 15.Rfe1 b6 16.Qd1 bxc5 17.dxc5 Qa5 18.Nxd5!? exd5 19.Qxd5 Be6 20.Qg5 Ng6 21.Re4 O-O, com igualdade.' }],
  ['c43', 'e', 'e', '(e)', '13 cxb6 Qxb6 14 Bc2 Bd7 15 O-O O-O 16 Rfe1 Bc6 17 Re3 Nd7 18 Rg3 Rfc8 19 Rd1 Nf8', { a: '=', r: 'Speelman–Khalifman, Reykjavik 1991', c: '13.cxb6 Qxb6 14.Bc2 Bd7 15.O-O O-O 16.Rfe1 Bc6! 17.Re3 Nd7 18.Rg3 Rfc8 19.Rd1 Nf8 leva à igualdade.' }],
  // Coluna 44
  ['c44', 'f', 'f', '(f)', '5... d5 6 a3 Bxc3+ 7 Nxc3 cxd4 8 exd4 dxc4 9 Bxc4 Nc6 10 Be3 O-O 11 O-O b6 12 Qf3 Bb7 13 Bd3 Rc8 14 Rad1', { a: '⩲', r: 'Kasparov–Psakhis, match 1990', c: 'As brancas ficam com jogo ativo depois de 5...d5 6.a3 Bxc3+ 7.Nxc3 cxd4 8.exd4 dxc4 9.Bxc4 Nc6 10.Be3 O-O 11.O-O b6 12.Qf3 Bb7 13.Bd3 Rc8 14.Rad1, um pouco melhor para as brancas.' }],
  ['c44', 'g', 'g', '(g)', '8 Qa4 Bb7 9 Bd2 Qe7 10 Ng3 O-O 11 d5 Bxc3 12 Bxc3 Nc7 13 Bxf6 Qxf6 14 Qxd7 Rac8 15 d6 Rfd8', { a: '=', r: 'Beliavsky–Gyimesi, Liga Austríaca 2006', c: '8.Qa4 Bb7 9.Bd2 Qe7 10.Ng3 O-O 11.d5 Bxc3 12.Bxc3 Nc7 13.Bxf6 Qxf6 14.Qxd7 Rac8 15.d6 Rfd8 leva à igualdade.' }],
  ['c44', 'h', 'h', '(h)', '13 Be3 b4 14 axb4 Rxb4', { a: '=', r: 'Ushenina–Romanishin, Alushta 2004', c: '13.Be3 b4 14.axb4 Rxb4 leva à igualdade.' }],
  // Coluna 45
  ['c45', 'i-A', 'i', '(i) A', '6 Ne2 cxd4 7 exd4 d5 8 O-O dxc4 9 Bxc4', { c: '6.Ne2 é visto com frequência. Depois de 6...cxd4 7.exd4 d5 8.O-O dxc4 9.Bxc4 o jogo transpõe para a coluna 34.' }],
  ['c45', 'i-B', 'i', '(i) B', '6 Ne2 cxd4 7 exd4 d5 8 cxd5 Nxd5 9 a3 Nxc3 10 bxc3 Be7 11 Be4 Bd7 12 O-O Rc8 13 Nf4 Na5', { a: '=', r: 'Milov–Anand, Biel 1997', c: 'Também 6.Ne2 cxd4 7.exd4 d5 8.cxd5 Nxd5 9.a3 Nxc3 10.bxc3 Be7 11.Be4 Bd7 12.O-O Rc8 13.Nf4 Na5 leva à igualdade.' }],
  ['c45', 'j', 'j', '(j)', '6... d6 7 Qc2 e5 8 dxe5 dxe5 9 Nd2 Bxc3 10 Qxc3', { a: '⩲', r: 'Petrosian–Romanishin, URSS 1976', c: '6...d6 7.Qc2 e5 8.dxe5 dxe5 9.Nd2 Bxc3 10.Qxc3 é um pouco melhor para as brancas, que mantêm o par de bispos sem peões dobrados.' }],
  ['c45', 'k', 'k', '(k)', '9 h3 h6 10 Be3 Qa5 11 O-O O-O 12 Bd2 Qc7 13 d5 Ne7 14 Ne1 Ng6 15 Qf3 Nh7', { a: '=', r: 'van der Sterren–P. Nikolić, Roterdã 1998', c: '9.h3 h6 10.Be3 Qa5 11.O-O O-O 12.Bd2 Qc7 13.d5 Ne7 14.Ne1 Ng6 15.Qf3 Nh7 leva à igualdade.' }],
  ['c45', 'l', 'l', '(l)', '11 f4 Ng6 12 Nxg6 fxg6 13 O-O O-O 14 f5 b5 15 g4 Qa5', { a: '=', c: '11.f4 Ng6! 12.Nxg6 fxg6 13.O-O O-O 14.f5 b5 15.g4 Qa5 leva à igualdade.' }],
  ['c45-l', '1', 'l', '(l) 13.fxe5', '13 fxe5', { c: '13.fxe5?, jogado em Spassky–Fischer, Campeonato Mundial de 1972, deixa a posição fechada demais para os bispos brancos.' }],
  ['c45', 'm', 'm', '(m)', '13 Nf5 Bxf5 14 exf5 Nf4 15 Bf1 Nd7 16 a4 O-O-O 17 g3 Nh5 18 Bd3 Nhf6 19 O-O e4 20 fxe4 Ne5', { a: '∞', r: 'Hoffman–Zarnicki, Buenos Aires 1997', c: '13.Nf5 Bxf5 14.exf5 Nf4 15.Bf1 Nd7 16.a4 O-O-O 17.g3 Nh5 18.Bd3 Nhf6 19.O-O e4 20.fxe4 Ne5 dá chances para os dois lados.' }],
  // Coluna 46
  ['c46', 'n', 'n', '(n)', '8 Nd2 e5 9 Nb3 b6 10 O-O O-O 11 f4 e4 12 Be2 Qd7 13 a4 a5 14 Ra2 Qf5', { a: '=', r: 'Feldman–Allen, Zonal da Oceania 2001', c: '8.Nd2 e5 9.Nb3 b6 10.O-O O-O 11.f4 e4 12.Be2 Qd7 13.a4 a5 14.Ra2 Qf5 leva à igualdade.' }],
  ['c46', 'o', 'o', '(o)', '9 Ng5 O-O 10 f4 exd4 11 cxd4 cxd4 12 exd4 Nxd4 13 Nxh7 Nxh7 14 Bxh7+ Kxh7 15 Qxd4 Qb6', { a: '=', r: 'Christiansen–de Firmian, Campeonato dos EUA 1984', c: '9.Ng5 O-O 10.f4 exd4 11.cxd4 cxd4 12.exd4 Nxd4 13.Nxh7 Nxh7 14.Bxh7+ Kxh7 15.Qxd4 Qb6 leva à igualdade.' }],
  ['c46', 'p', 'p', '(p)', '13 Be4 Bb7 14 dxc5 dxc5 15 Bd5 Na5 16 e4 Qg6', { a: '=', r: 'Yusupov–Ivanchuk, match 1991', c: '13.Be4 Bb7 14.dxc5 dxc5 15.Bd5 Na5 16.e4 Qg6 dá às pretas pelo menos a igualdade.' }],
  // Coluna 47
  ['c47', 'q', 'q', '(q)', '5 Nf3 O-O 6 Bd3', { c: '5.Nf3 O-O 6.Bd3 transpõe para a linha principal da Rubinstein (colunas 19–20).' }],
  ['c47', 'r', 'r', '(r)', '5... Bxc3+', { c: '5...Bxc3+ transpõe para a Variante Sämisch, coluna 49.' }],
  ['c47', 's', 's', '(s)', '6... dxc4 7 Bxc4 c5 8 dxc5 Qxd1+ 9 Kxd1 Bxc5 10 b4', { a: '⩲', c: '6...dxc4 7.Bxc4 c5 8.dxc5 Qxd1+ 9.Kxd1 Bxc5 10.b4 é um final um pouco melhor para as brancas, mas as pretas podem escolhê-lo se aceitarem o empate.' }],
  ['c47', 't', 't', '(t)', '13 h3 Nf8 14 a4', { a: '⩲', c: '13.h3 Nf8 14.a4 é um pouco melhor para as brancas.' }],
  // Coluna 48
  ['c48', 'u', 'u', '(u)', '5 Bd3 e5 6 Ne2 d5 7 cxd5 Nxd5 8 e4 Nb6 9 d5 Ne7 10 Bg5 h6 11 Bh4 a6 12 Qc2 g5 13 Bg3 Ng6', { a: '∞', r: 'Bareev–Rashkovsky, Rússia 1995', c: '5.Bd3 e5 6.Ne2 d5 7.cxd5 Nxd5 8.e4 Nb6 9.d5 Ne7 10.Bg5 h6 11.Bh4 a6 12.Qc2 g5 13.Bg3 Ng6 dá chances para os dois lados.' }],
  ['c48', 'v', 'v', '(v)', '9... Na5 10 b4 Nc4 11 Ncxd5 Nxd5 12 Bxc4 Nxf4 13 exf4', { a: '±', r: 'Lobron–Gostica, Zonal Europeu 1995', c: '9...Na5?! 10.b4 Nc4 11.Ncxd5! Nxd5 12.Bxc4 Nxf4 13.exf4 é melhor para as brancas. A coluna é Golenichev–Aleshin, URSS 1952.' }],
]

const capitulo = {
  id: 'nimzo-h',
  arquivo: 'nimzo-h',
  nome: 'Nimzo-Índia — Rubinstein 4...c5 e outros 4º lances',
  fonte: 'Modern Chess Openings — Nimzo-Indian Defense (pp. 555–556), colunas 43–48',
  base: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4',
  corPadrao: 'b',
  ordem: 555,
  grupos: [
    { id: 'c5ne2', nome: '4...c5 5.Ne2', colunas: [43, 44] },
    { id: 'hubner', nome: 'Sistema Hübner', colunas: [45, 46] },
    { id: 'd5', nome: '4...d5', colunas: [47] },
    { id: 'nc6', nome: '4...Nc6', colunas: [48] },
  ],
}

module.exports = { capitulo, colunas, notas }
