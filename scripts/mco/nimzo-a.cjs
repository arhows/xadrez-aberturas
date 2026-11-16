// Transcrição do MCO 15ª ed. — Defesa Nimzo-Índia, Variante Clássica 4.Qc2 O-O 5.a3 Bxc3+ 6.Qxc3 (pp. 540–542), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs nimzo-a
// Formato: ver gambito-do-rei.cjs. Dicas em nimzo-a-dicas.cjs.
//
// Erratas:
// - nota (f): "19 ... B5" → 19...b5;
// - nota (l): "8 g3 d5 9 Bg5 dxc4 10 Qxc4 Nbd7 11 0-0" é impossível (o bispo de f1 nunca sai) → 9.Bg2.
// As colunas 1, 3, 5 e 6 não trazem avaliação no fim; cada uma usa a da nota que a continua.
// Notas só com comentário (sem avaliação no livro): (b)A, (d) 11.Bxf6, (h), (m) 10...Ng5, (p), (q), (s), (u) 12...e4, (v) 14.b5.

const A = '1 d4 Nf6 2 c4 e6 3 Nc3 Bb4 4 Qc2 O-O 5 a3 Bxc3+ 6 Qxc3'

const colunas = {
  c01: [`${A} b6 7 Bg5 Bb7 8 f3 h6 9 Bh4 d5 10 e3 Nbd7 11 cxd5 Nxd5 12 Bxd8 Nxc3 13 Bh4 Nd5`, 'b6', '6...b6 7.Bg5 Bb7 8.f3', '⩲',
    'Na Variante Clássica as brancas evitam os peões dobrados e, depois de 5.a3 Bxc3+ 6.Qxc3, ficam com o par de bispos. Com 6...b6 7.Bg5 Bb7 8.f3 as brancas impedem ...Ne4. Depois de 8...h6 9.Bh4 d5 10.e3 Nbd7 11.cxd5 Nxd5! 12.Bxd8 Nxc3 13.Bh4 Nd5 as damas saem do tabuleiro e, com 14.Bf2, as brancas têm só uma vantagem mínima.'],
  c02: [`${A} b6 7 Bg5 Bb7 8 e3 d6 9 f3 Nbd7 10 Bd3 c5 11 Ne2 Rc8 12 Qb3 h6 13 Bh4 d5`, 'b6', '8.e3', '=',
    'Com 8.e3 d6 9.f3 Nbd7 10.Bd3 as brancas desenvolvem a ala do rei com calma. Depois de 10...c5 11.Ne2 Rc8 12.Qb3 h6 13.Bh4 d5 as pretas abrem o centro e, com 14.cxd5 Bxd5 15.Qa4 cxd4 16.exd4 Bc6!, o jogo é igual.'],
  c03: [`${A} b6 7 Nf3 Bb7 8 e3 d6 9 b4 Nbd7 10 Bb2 a5 11 Be2 Ne4 12 Qc2 c5 13 dxc5 bxc5`, 'b6', '7.Nf3', '=',
    'Com 7.Nf3 Bb7 8.e3 d6 9.b4 as brancas ganham espaço na ala da dama e controlam e4. Depois de 9...Nbd7 10.Bb2 a5 11.Be2 Ne4 12.Qc2 c5 13.dxc5 bxc5, com 14.b5 f5 15.O-O e5 a posição é de dois gumes e mais ou menos igual.'],
  c04: [`${A} Ne4 7 Qc2 f5 8 Nf3 b6 9 g3 Bb7 10 Bg2 Nf6 11 O-O Be4 12 Qc3 Qe8 13 b4 d6`, 'ne4', '6...Ne4', '=',
    'Com 6...Ne4 o cavalo expulsa a dama logo. Depois de 7.Qc2 f5 8.Nf3 b6 9.g3 Bb7 10.Bg2 Nf6! 11.O-O Be4 12.Qc3 Qe8 13.b4 d6 as pretas controlam e4 e o jogo é igual.'],
  c05: [`${A} d6 7 Bg5 Nbd7 8 e3 h6 9 Bh4 Re8 10 Bd3 e5 11 Ne2 Qe7 12 O-O Nf8 13 f3 g5`, 'd6', '6...d6', '±',
    'Com 6...d6 as pretas jogam por ...e5. Depois de 7.Bg5 Nbd7 8.e3 h6 9.Bh4 Re8 10.Bd3 e5 11.Ne2 Qe7 12.O-O Nf8 13.f3 g5, com 14.Bf2 e4 15.fxe4 Nxe4 16.Bxe4 Qxe4 17.Ng3 Qg6 18.e4 as brancas ficam melhor.'],
  c06: [`${A} b5 7 cxb5 c6 8 Bg5 cxb5 9 e3 Bb7 10 Nf3 a6 11 Be2 Nc6 12 O-O Ne4 13 Qxc6 Bxc6`, 'b5', '6...b5!?', '⩲',
    'Com 6...b5!? as pretas oferecem um peão pelo desenvolvimento. Depois de 7.cxb5 c6 8.Bg5 cxb5 9.e3 Bb7 10.Nf3 a6 11.Be2 Nc6 12.O-O Ne4 13.Qxc6 Bxc6, com 14.Bxd8 Rfxd8 15.Rfc1 as brancas ficam um pouco melhor no final.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a-A1', 'a', '(a) A1', '5 e4 d5 6 e5 Ne4 7 a3 Bxc3+ 8 bxc3 c5 9 Bd3 cxd4 10 cxd4 Qa5+ 11 Kf1 f6 12 Bxe4 dxe4 13 exf6 Rxf6 14 Ne2 Bd7 15 Be3 Bc6', { a: '=', r: 'Vallejo Pons–Schandorff, Saint Vincent 2005', c: 'Hoje é popular 5.e4 d5 6.e5 Ne4. Com 7.a3 Bxc3+ 8.bxc3 c5 9.Bd3 cxd4 10.cxd4 Qa5+ 11.Kf1 f6 12.Bxe4 dxe4 13.exf6 Rxf6 14.Ne2 Bd7 15.Be3 Bc6 o jogo é mais ou menos igual.' }],
  ['c01', 'a-A2', 'a', '(a) A2', '5 e4 d5 6 e5 Ne4 7 Bd3 c5 8 Ne2 cxd4 9 Nxd4 Nd7 10 Nf3 Ndc5', { a: '=', r: 'Rogers–Tirto, Dato Tan 2006', c: '5.e4 d5 6.e5 Ne4 7.Bd3 c5 8.Ne2 cxd4 9.Nxd4 Nd7 10.Nf3 Ndc5 está bem para as pretas.' }],
  ['c01', 'a-B', 'a', '(a) B', '5 Nf3 c5 6 dxc5 Na6', { a: '=', c: '5.Nf3 c5! 6.dxc5 Na6 é igual e transpõe para a coluna 14, nota (f).' }],
  ['c01', 'b-A', 'b', '(b) A', '7... c5 8 dxc5 bxc5 9 e3 d6 10 Bd3 Nbd7 11 Ne2 Rb8', { c: 'Uma alternativa importante é 7...c5 8.dxc5 bxc5 9.e3 d6 10.Bd3 Nbd7 11.Ne2 Rb8: as brancas têm o par de bispos e pressão indireta em d6, mas as pretas têm contrajogo razoável se ficarem atentas.' }],
  ['c01-b-A', '1', 'b', '(b) A 9...Nc6', '9... Nc6 10 Bd3 Rb8 11 Ne2 Qa5 12 Bxf6 gxf6 13 O-O-O Qxc3+ 14 Nxc3', { a: '⩲', r: 'Alterman–Ehlvest, Groningen 1993', c: '9...Nc6 10.Bd3 Rb8 11.Ne2 Qa5 12.Bxf6 gxf6 13.O-O-O Qxc3+ 14.Nxc3 é um pouco melhor para as brancas.' }],
  ['c01-b-A', '2', 'b', '(b) A 12.Rd1', '12 Rd1 Ne4 13 Bxe4 Qxg5 14 Rxd6 Qe5', { a: '=', r: 'Lutz', c: '12.Rd1 Ne4! 13.Bxe4 Qxg5 14.Rxd6 Qe5 é igual.' }],
  ['c01-b-A', '3', 'b', '(b) A 12.O-O', '12 O-O h6 13 Bh4 Ne4 14 Bxd8 Nxc3 15 Be7 Nxe2+ 16 Bxe2 Re8 17 Bxd6 Rxb2', { a: '=', r: 'Salov–Kamsky, match 1995', c: '12.O-O h6 13.Bh4 Ne4 14.Bxd8 Nxc3 15.Be7 Nxe2+ 16.Bxe2 Re8 17.Bxd6 Rxb2 é igual.' }],
  ['c01', 'b-B', 'b', '(b) B', '7... Ba6 8 Nf3 d6 9 Nd2 Nbd7 10 e3 c5 11 dxc5 Nxc5 12 Bxf6', { a: '⩲', r: 'Stefansson–E. Berg, Rilton Cup 2003', c: '7...Ba6 8.Nf3 d6 9.Nd2 Nbd7 10.e3 c5 11.dxc5 Nxc5 12.Bxf6 é um pouco melhor para as brancas.' }],
  ['c01', 'c-A', 'c', '(c) A', '8... c5 9 dxc5 bxc5 10 e3 Nc6 11 Nh3 h6 12 Bh4 Qa5 13 Qxa5 Nxa5 14 b4', { a: '⩲', r: 'M. Gurevich–Andersson, Reggio Emilia 1989/90', c: '8...c5 9.dxc5 bxc5 10.e3 Nc6 11.Nh3 h6 12.Bh4 Qa5 13.Qxa5 Nxa5 14.b4 deixa as brancas com vantagem no final.' }],
  ['c01-c-A', '1', 'c', '(c) A 12...d6', '12... d6 13 O-O-O', { a: '⩲', c: '12...d6 13.O-O-O é um pouco melhor para as brancas.' }],
  ['c01', 'c-B', 'c', '(c) B', '8... d6 9 e4 c5 10 d5 Nbd7 11 Nh3 exd5 12 cxd5 a6 13 Bd3', { a: '±', r: 'Kasparov–Hjartarson, Reykjavik 1988', c: '8...d6 9.e4 c5 10.d5 Nbd7 11.Nh3 exd5 12.cxd5 a6 13.Bd3 parece uma Benoni sem o bispo de casas escuras das pretas, que ficam pior.' }],
  ['c01', 'd', 'd', '(d)', '10 cxd5 exd5 11 e3 Re8 12 Nh3 Qe7 13 Bf2 c5 14 Bb5 Bc6', { a: '=', r: 'Gulko–Chandler, Hastings 1989/90', c: '10.cxd5 exd5 11.e3 Re8 12.Nh3 Qe7 13.Bf2 c5 14.Bb5 Bc6 é igual.' }],
  ['c01-d', '1', 'd', '(d) 11.Bxf6', '11 Bxf6 Qxf6 12 Qxc7 Ba6 13 Qe5 Qg6', { c: '11.Bxf6 Qxf6 12.Qxc7 Ba6 13.Qe5 Qg6 deixa as pretas ativas.' }],
  ['c01', 'e', 'e', '(e)', '11 Nh3 c5 12 cxd5 cxd4 13 Qxd4 e5 14 Qd1 Bxd5', { a: '=', r: 'Gagunashvili–Lutz, Olimpíada de Turim 2006', c: '11.Nh3 c5 12.cxd5 cxd4! 13.Qxd4 e5 14.Qd1 Bxd5 é igual.' }],
  ['c01', 'f', 'f', '(f)', '13 Bxc7 Nd5 14 Bd6 Nxe3 15 Kf2 Nc2 16 Rd1 Rfc8 17 Bb5 Nf6 18 Ne2 a6 19 Ba4 b5 20 Bb3 Bd5 21 Bxd5 Nxd5 22 Rd3 Rc6 23 Bc5 e5', { a: '=', r: 'Salov–Karpov, Skellefteå 1989', c: '13.Bxc7 Nd5 14.Bd6 Nxe3 15.Kf2 Nc2 16.Rd1 Rfc8 17.Bb5 Nf6 18.Ne2 a6 19.Ba4 b5 20.Bb3 Bd5 21.Bxd5 Nxd5 22.Rd3 Rc6 23.Bc5 e5! leva a um jogo igual.' }],
  ['c01', 'g', 'g', '(g)', '14 Bf2 c5 15 e4 Ne7 16 Ne2 Rac8', { a: '⩲', r: 'Kramnik–Leko, Dortmund 2006', c: '14.Bf2 c5 15.e4 Ne7 16.Ne2 Rac8 dá às brancas só uma vantagem mínima.' }],
  // Coluna 2
  ['c02', 'h', 'h', '(h)', '8 Nh3 h6 9 Bh4 d5 10 cxd5 exd5 11 e3 c5 12 dxc5 d4 13 Qxd4 Qxd4 14 exd4 Re8+ 15 Kd2 g5 16 Bg3 Nc6 17 Bb5 Red8', { r: 'Flear–Hellers, San Bernardino 1990', c: '8.Nh3 h6 9.Bh4 d5 10.cxd5 exd5 11.e3 c5! 12.dxc5 d4 13.Qxd4 Qxd4 14.exd4 Re8+ 15.Kd2 g5 16.Bg3 Nc6 17.Bb5 Red8: a atividade das pretas compensa os peões.' }],
  ['c02-h', '1', 'h', '(h) 12.Bd3', '12 Bd3 Nc6', { a: '=', c: 'Mais seguro é 12.Bd3 Nc6, com igualdade.' }],
  ['c02', 'i', 'i', '(i)', '9 Nf3 Nbd7 10 Be2 c5 11 O-O Ne4 12 Bxd8 Nxc3', { a: '∓', c: 'É importante controlar e4. O natural 9.Nf3 é ineficaz: 9...Nbd7 10.Be2 c5 11.O-O?! Ne4 12.Bxd8 Nxc3 é melhor para as pretas.' }],
  ['c02-i', '1', 'i', '(i) 10.Qc2', '10 Qc2 Qe8 11 Nd2 c5 12 dxc5 bxc5 13 b4 e5', { a: '=', r: 'Reshevsky–Keres, Torneio do Campeonato Mundial 1948', c: '10.Qc2 Qe8 11.Nd2 c5 12.dxc5 bxc5 13.b4 e5 é igual.' }],
  ['c02', 'j', 'j', '(j)', '10... h6 11 Bh4 e5 12 Bf5 exd4 13 Qxd4 Ne5 14 O-O-O c5 15 Qc3', { a: '⩲', r: 'Goldin–Alterman, Rishon LeZion 1996', c: 'Depois de 10...h6 11.Bh4 e5 12.Bf5 os bispos brancos incomodam: 12...exd4 13.Qxd4 Ne5 14.O-O-O c5 15.Qc3 é um pouco melhor para as brancas.' }],
  ['c02', 'k', 'k', '(k)', '14 cxd5 Bxd5 15 Qa4 cxd4 16 exd4 Bc6', { a: '=', r: 'Bareev–Leko, Rússia vs. Resto do Mundo (rápidas) 2002', c: '14.cxd5 Bxd5 15.Qa4 cxd4 16.exd4 Bc6! é igual.' }],
  // Coluna 3
  ['c03', 'l', 'l', '(l)', '8 g3 d5 9 Bg2 dxc4 10 Qxc4 Nbd7 11 O-O c5', { a: '=', c: '8.g3 d5 9.Bg2 dxc4 10.Qxc4 Nbd7 11.O-O c5 é igual.' }],
  ['c03', 'm', 'm', '(m)', '9 Be2 Ne4 10 Qc2 f5 11 O-O Nd7 12 b4', { a: '=', c: 'Contra 9.Be2 Ne4 10.Qc2 f5 11.O-O Nd7 12.b4 as pretas têm jogo razoável com 12...Qe7 e 13...c5, ou com 12...Rf6, mirando a ala do rei.' }],
  ['c03-m', '1', 'm', '(m) 10...Ng5', '10... Ng5', { c: '10...Ng5!? também é possível.' }],
  ['c03', 'n', 'n', '(n)', '14 b5 f5 15 O-O e5', { a: '=', r: 'Gudmundsson–Arnason, Grindavik 1984', c: '14.b5 f5 15.O-O e5 dá uma posição de dois gumes e mais ou menos igual.' }],
  // Coluna 4
  ['c04', 'o', 'o', '(o)', '8 f3 Qh4+', { c: 'Não 8.f3? Qh4+.' }],
  ['c04', 'o-A', 'o', '(o) A', '8 Nh3 d6 9 f3 Nf6 10 e3 e5 11 dxe5 dxe5 12 Be2 a5 13 b3 c5 14 Nf2 Nc6', { a: '=', r: 'Vigorito–Sarkar, Las Vegas 2006', c: '8.Nh3 d6 9.f3 Nf6 10.e3 e5 11.dxe5 dxe5 12.Be2 a5 13.b3 c5 14.Nf2 Nc6 é igual.' }],
  ['c04', 'o-B', 'o', '(o) B', '8 e3 b6 9 Ne2 Bb7 10 f3 Nd6', { a: '∞', r: 'Beliavsky–Lobron, Dortmund 1995', c: '8.e3 b6 9.Ne2!? Bb7 10.f3 Nd6 leva a uma posição pouco clara.' }],
  ['c04', 'p', 'p', '(p)', '9 e3 Bb7 10 Be2 d6', { c: '9.e3 Bb7 10.Be2 d6 transpõe para a nota (m) da coluna 3.' }],
  ['c04', 'q', 'q', '(q)', '10... d6 11 Ng5', { c: 'Depois de 10...d6?! 11.Ng5! as pretas têm problemas na grande diagonal. A coluna é Adianto–de Firmian, Biel 1995.' }],
  // Coluna 5
  ['c05', 'r', 'r', '(r)', '7 Nf3 Nbd7 8 g3 b6 9 Bg2 Bb7 10 O-O c5 11 Rd1 Qe7 12 b3', { a: '⩲', r: 'Gavrikov–Kosten, Palma de Mallorca 1989', c: '7.Nf3 Nbd7 8.g3 b6 9.Bg2 Bb7 10.O-O c5 11.Rd1 Qe7 12.b3 é um pouco melhor para as brancas: o fianqueto funciona melhor quando as pretas já jogaram ...d6.' }],
  ['c05', 's', 's', '(s)', '8... b6 9 Bd3 Bb7 10 f3', { c: 'Provavelmente o melhor para as pretas é 8...b6 9.Bd3 Bb7 10.f3, que transpõe para a coluna 2.' }],
  ['c05', 't', 't', '(t)', '11... exd4 12 exd4 Nf8 13 Qc2 Bg4 14 f3 Bh5 15 O-O Bg6 16 Nc3 Bxd3 17 Qxd3 Ng6 18 Bxf6 Qxf6 19 f4 c6 20 f5 Nf8 21 Ne4', { a: '±', r: 'I. Sokolov–Wilder, Haninge 1989', c: '11...exd4 12.exd4 Nf8 13.Qc2 Bg4 14.f3 Bh5 15.O-O Bg6 16.Nc3 Bxd3 17.Qxd3 Ng6 18.Bxf6 Qxf6 19.f4! c6 20.f5 Nf8 21.Ne4 é melhor para as brancas.' }],
  ['c05', 'u', 'u', '(u)', '14 Bf2 e4 15 fxe4 Nxe4 16 Bxe4 Qxe4 17 Ng3 Qg6 18 e4', { a: '±', r: 'Drasko–Bogdanović, Sestola 1991', c: '14.Bf2 e4 15.fxe4 Nxe4 16.Bxe4 Qxe4 17.Ng3 Qg6 18.e4 é melhor para as brancas.' }],
  ['c05-u', '1', 'u', '(u) 12...e4', '12... e4', { c: 'As pretas melhorariam um pouco com 12...e4, mas as brancas ainda têm alguma vantagem.' }],
  // Coluna 6
  ['c06', 'v', 'v', '(v)', '8 bxc6 Nxc6 9 b4 Ba6 10 Bg5 h6 11 Bxf6 Qxf6 12 Nf3 Rac8 13 Qb2 Rc7 14 e3 Bxf1 15 Kxf1 Rfc8', { a: '=', r: 'Polugaevsky–Dzindzichashvili, Reykjavik 1990', c: 'Aceitar o gambito dá às pretas compensação pelo desenvolvimento e pelas casas brancas: 8.bxc6 Nxc6 9.b4 Ba6 10.Bg5 h6 11.Bxf6 Qxf6 12.Nf3 Rac8 13.Qb2 Rc7! 14.e3 Bxf1 15.Kxf1 Rfc8 é igual.' }],
  ['c06-v', '1', 'v', '(v) 14.b5', '14 b5 Bxb5 15 Qxb5 Nxd4', { c: 'Não 14.b5? Bxb5 15.Qxb5 Nxd4.' }],
  ['c06', 'w', 'w', '(w)', '14 Bxd8 Rfxd8 15 Rfc1', { a: '⩲', r: 'Bareev–Anand, Melody Amber 2005', c: '14.Bxd8 Rfxd8 15.Rfc1 é um pouco melhor para as brancas.' }],
]

const capitulo = {
  id: 'nimzo-a',
  arquivo: 'nimzo-a',
  nome: 'Nimzo-Índia — Clássica 5.a3 Bxc3+ 6.Qxc3',
  fonte: 'Modern Chess Openings — Nimzo-Indian Defense (pp. 540–542), colunas 1–6',
  base: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4',
  corPadrao: 'b',
  ordem: 540,
  grupos: [
    { id: 'b6', nome: '6...b6', colunas: [1, 2, 3] },
    { id: 'ne4', nome: '6...Ne4', colunas: [4] },
    { id: 'd6', nome: '6...d6', colunas: [5] },
    { id: 'b5', nome: '6...b5!?', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
