// Transcrição do MCO 15ª ed. — Defesa Pirc, Ataque Austríaco (pp. 365–366), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs pirc-austriaco-a
// Formato: ver gambito-do-rei.cjs. Dicas em pirc-austriaco-a-dicas.cjs.
//
// Só as colunas 5 e 6 trazem avaliação na tabela; as outras recebem a da nota que as continua.
// Erros do livro:
//  - (f) A (12...Nc6 13.Qd2 Be6 14.Bxe5 Nxe5 15.Nf6+) é impossível: 15.Nf6+ não existe e 12...Nc6 e 13...Be6 deixam peças para dxc6/dxe6. A nota foi omitida.
//  - (v) traz "13 dxe5", mas as brancas não têm peão d; usamos 13.fxe5.

const B = '1 e4 d6 2 d4 Nf6 3 Nc3 g6 4 f4 Bg7 5 Nf3 O-O'

const colunas = {
  c01: [`${B} 6 Bd3 Nc6 7 O-O Bg4 8 e5 dxe5 9 dxe5 Nd5 10 h3 Nxc3 11 bxc3 Bf5 12 Bxf5 Qxd1 13 Rxd1 gxf5`, 'nc6', '6.Bd3 Nc6 7.O-O Bg4', '⩲',
    'No Ataque Austríaco as brancas montam o centro com e4, d4 e f4 e preparam o avanço e5. Com 6...Nc6 7.O-O Bg4 8.e5 as damas saem cedo, e as brancas ficam com pequena vantagem no final por causa dos peões dobrados pretos.'],
  c02: [`${B} 6 Bd3 Nc6 7 O-O e5 8 fxe5 dxe5 9 d5 Nd4 10 Nxe5 Nxe4 11 Bxe4 Bxe5 12 Bf4 Bg7 13 Qd2 Nf5`, 'nc6', '7.O-O e5', '⩲',
    'Com 7...e5 as pretas golpeiam o centro de imediato. Depois de 9.d5 Nd4 surge uma sequência tática que termina com as brancas tendo mais espaço e mobilidade.'],
  c03: [`${B} 6 Bd3 Nc6 7 e5 dxe5 8 dxe5 Nd5 9 Bd2 Bg4 10 Be4 e6 11 h3 Bxf3 12 Qxf3 Nd4 13 Qf2 c5`, 'nc6', '7.e5', '=',
    'Com 7.e5 as brancas avançam antes de rocar. As pretas centralizam os cavalos em d5 e d4, trocam o bispo por f3 e igualam.'],
  c04: [`${B} 6 Bd3 Na6 7 O-O c5 8 d5 Rb8 9 Qe2 Nc7 10 a4 a6 11 a5 Bd7 12 Na4 Bg4 13 c4 e6`, 'na6', '6...Na6 7.O-O c5', '⩲',
    'O lance criativo 6...Na6 prepara ...c5 sem bloquear o peão c. Depois de 8.d5 as pretas se expandem na ala da dama, mas as brancas mantêm pequena vantagem.'],
  c05: [`${B} 6 Bd3 Na6 7 e5 Nd7 8 Be3 Nb6 9 a3 c5 10 Bxa6 cxd4 11 Bxd4 bxa6 12 exd6 Qxd6 13 Bxg7 Qxd1+`, 'na6', '7.e5 Nd7', '=',
    'Com 7.e5 Nd7 8.Be3 as brancas ganham espaço, mas 9...c5 abre o jogo. As damas se trocam e o final é igual.'],
  c06: [`${B} 6 Be3 b6 7 Bc4 Bb7 8 e5 Ng4 9 Qe2 c5 10 O-O-O Nxe3 11 Qxe3 cxd4 12 Nxd4 dxe5 13 Ne6 Qc8`, 'be3', '6.Be3 b6', '=',
    'Com 6.Be3 as brancas preparam Qd2 e o roque grande. As pretas respondem com o fianqueto duplo e contra-atacam com ...c5; a posição fica aguda, mas igual.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '10 Qe1 Ndb4 11 Be4 f5 12 Bxc6 Nxc6 13 Be3 Bxf3 14 Rxf3 e6 15 Bc5 Rf7 16 Rd1 Rd7', { a: '=', r: 'Ljubojević–Timman, Hilversum 1987', c: '10.Qe1 leva a um jogo mais agudo, mas igual depois de 11...f5!.' }],
  ['c01', 'b', 'b', '(b)', '12... gxf5 13 Qe1 Qd5 14 Be3', { a: '⩲', c: '12...gxf5 13.Qe1 dá às brancas chances de ataque contra o roque enfraquecido.' }],
  ['c01', 'c', 'c', '(c)', '14 Nd4 Rfd8 15 Be3 Nxd4 16 cxd4 e6 17 Rab1 b6 18 g4', { a: '⩲', r: 'Bozanić–Dumpor, Summer Open 2006', c: '14.Nd4 Rfd8 15.Be3 dá às brancas um final um pouco melhor.' }],
  ['c01-c', '1', 'c', '(c) 15.Ba3', '15 Ba3', { c: '15.Ba3!? é uma alternativa.' }],
  // Coluna 2
  ['c02', 'd', 'd', '(d)', '9... Ne7 10 Nxe5 Nfxd5 11 Nxf7 Nxc3 12 bxc3 Rxf7 13 Rxf7 Kxf7 14 Bc4+ Be6 15 Qf1+ Bf6 16 Bxe6+ Kxe6 17 Qc4+ Kd7 18 Bf4 Ke8 19 Rf1', { r: 'Nijboer–Cuipers, Campeonato Holandês 1989', c: '9...Ne7 10.Nxe5 Nfxd5 11.Nxf7! dá às brancas um ataque forte pela peça.' }],
  ['c02-d', '1', 'd', '(d) 10...c6', '10... c6 11 Bg5 cxd5 12 Bxf6 Qb6+ 13 Kh1 Bxf6 14 Nxd5 Nxd5 15 Nc4 Qd8 16 exd5 b5 17 Nd2 Bb7 18 c4', { a: '±', r: 'Bellon–McNab, Gibraltar 2005', c: '10...c6 11.Bg5 também favorece as brancas depois de 17.Nd2!.' }],
  ['c02', 'e', 'e', '(e)', '10... Nxd5 11 Nxd5 Bxe5 12 Bf4 Qd6 13 Qd2 c6 14 Bxe5 Qxe5 15 Nf6+', { a: '⩲', r: 'Karjakin–Zubov, Campeonato Ucraniano 2003', c: '10...Nxd5 11.Nxd5 Bxe5 dá pequena vantagem às brancas.' }],
  ['c02', 'f-B', 'f', '(f) B', '12... Bxf4 13 Rxf4 Nf5 14 Bxf5 Bxf5 15 Qd4 Bxc2 16 Re1', { r: 'J. Polgár–Ftáčnik, Budapeste 1993', c: '12...Bxf4 13.Rxf4 Nf5 deixa as brancas com excelente jogo pelo peão.' }],
  ['c02', 'g-A', 'g', '(g) A', '13... Bd7 14 Rae1 Nf5 15 Bxf5 Bxf5 16 Nb5', { a: '±', r: 'de Firmian–Bjorgvinsson, Reykjavík 1998', c: '13...Bd7?! é fraco: depois de 16.Nb5 as brancas ficam melhor.' }],
  ['c02', 'g-B', 'g', '(g) B', '14 Bxf5 Bxf5 15 Nb5 Rc8 16 c4', { a: '⩲', c: 'Depois de 13...Nf5 14.Bxf5! Bxf5 15.Nb5 Rc8 16.c4! as brancas têm mais espaço e mobilidade.' }],
  ['c02-g-B', '1', 'g', '(g) B 15...c6', '15... c6 16 Nc7 Rc8 17 d6', { a: '±', c: '15...c6 16.Nc7 Rc8 17.d6 favorece as brancas.' }],
  // Coluna 3
  ['c03', 'h', 'h', '(h)', '8 fxe5 Nh5 9 Be3 Bg4 10 Be2 f6 11 exf6 exf6 12 O-O', { a: '⩲', r: 'Shirov–Volokitin, Grécia 2002', c: 'Mais agudo é 8.fxe5 Nh5 9.Be3, com pequena vantagem branca.' }],
  ['c03', 'i', 'i', '(i)', '9... Ncb4 10 Be4 c6 11 Nxd5 cxd5 12 Bxb4 dxe4', { a: '=', r: 'Zude–Bernard, Val 1988', c: 'Também serve 9...Ncb4, com igualdade.' }],
  ['c03', 'j', 'j', '(j)', '14 Ne2 Nxe2 15 Qxe2 Qh4+', { a: '=', r: 'Olenin–Balashov, Moscou 1995', c: '14.Ne2 Nxe2 15.Qxe2 Qh4+ leva à igualdade.' }],
  // Coluna 4
  ['c04', 'k-A', 'k', '(k) A', '6... Nbd7 7 e5 Ne8 8 Ne4 c5 9 c3 Qb6 10 h4', { a: '⩲', c: '6...Nbd7 7.e5 Ne8 dá às brancas um ataque promissor.' }],
  ['c04', 'k-B', 'k', '(k) B', '6... c6 7 O-O Bg4 8 Kh1', { a: '⩲', c: '6...c6 7.O-O Bg4 8.Kh1 deixa as brancas no controle.' }],
  ['c04', 'k-C', 'k', '(k) C', '6... Bg4 7 h3 Bxf3 8 Qxf3 Nc6 9 Be3 e5 10 dxe5 dxe5 11 f5', { a: '±', c: '6...Bg4 7.h3 Bxf3 8.Qxf3 favorece as brancas.' }],
  ['c04', 'l', 'l', '(l)', '8... Bg4 9 Kh1 Nc7 10 Qe1 Bxf3 11 Rxf3 e6 12 dxe6 fxe6 13 f5 Ng4 14 Bf4 Ne5 15 Bxe5 Bxe5 16 Qf2 Kg7 17 Rf1 Qe7 18 Nd1 Rae8 19 c3 Bf6 20 Ne3', { a: '⩲', r: 'Fernández–Del Río, Campeonato Espanhol 2003', c: 'A principal alternativa é 8...Bg4, com pequena vantagem branca.' }],
  ['c04', 'm', 'm', '(m)', '9 Kh1 Nc7 10 a4 b6 11 Qe1 a6 12 Qh4', { a: '⩲', c: 'Também é bom 9.Kh1 Nc7 10.a4, com sérias perspectivas de ataque.' }],
  ['c04-m', '1', 'm', '(m) 9...Bg4', '9... Bg4 10 Qe1 Nb4 11 Qh4 b5 12 a3 Nxd3 13 cxd3 a5 14 f5', { a: '⩲', r: 'de Firmian–Markowski, Polanica Zdrój 1995', c: '9...Bg4 10.Qe1 também é bom para as brancas.' }],
  ['c04', 'n', 'n', '(n)', '11... b5 12 axb6 Rxb6 13 Na4 Rb8 14 c4', { a: '⩲', r: 'Dolmatov–Marin, Calcutá 1999', c: '11...b5 12.axb6 Rxb6 13.Na4 dá pequena vantagem às brancas.' }],
  ['c04', 'o', 'o', '(o)', '14 h3 exd5 15 exd5 Re8 16 Qd1 Bxf3 17 Qxf3 Nd7 18 Bd2', { a: '⩲', r: 'Olivier–Sheshkachev, Cannes 1995', c: '14.h3 exd5 15.exd5 dá pequena vantagem às brancas.' }],
  // Coluna 5
  ['c05', 'p', 'p', '(p)', '8 h4 c5 9 h5 cxd4 10 hxg6 hxg6 11 Ng5 Nxe5 12 fxe5 dxc3 13 Kf2', { c: 'Divertido é 8.h4: depois de 13.Kf2! as brancas ameaçam 14.Rh8+ Bxh8 15.Qh1.' }],
  ['c05-p', '1', 'p', '(p) 13...Bxe5', '13... Bxe5', { c: '13...Bxe5 deve defender.' }],
  ['c05', 'q-A', 'q', '(q) A', '8... Nb4 9 Be2 c5 10 a3 cxd4 11 Nxd4 dxe5 12 fxe5 Nc6 13 e6 Nxd4 14 exf7+ Rxf7 15 Bxd4 Ne5', { a: '=', r: 'de Firmian–Leski, EUA 1987', c: 'Também serve 8...Nb4 9.Be2 c5!, com igualdade.' }],
  ['c05', 'q-B', 'q', '(q) B', '8... c5 9 Bxa6 cxd4 10 Bxd4 dxe5 11 fxe5 bxa6 12 e6 fxe6 13 Bxg7 Kxg7 14 Qd4+ Nf6 15 O-O-O', { a: '±', r: 'Timman–Nunn, Wijk aan Zee 1982', c: '8...c5? 9.Bxa6 cxd4 10.Bxd4 favorece as brancas depois de 12.e6!. A coluna é van der Wiel–Short, Marbella 1982.' }],
  // Coluna 6
  ['c06', 'r-A', 'r', '(r) A', '6... Nc6 7 Be2 e6 8 h3 b6 9 g4 Bb7 10 g5 Nh5 11 Rg1', { a: '⩲', r: 'van der Wiel–Azmaiparashvili, Groningen 1994', c: '6...Nc6 7.Be2 e6 dá pequena vantagem às brancas.' }],
  ['c06-r-A', '1', 'r', '(r) A 7...Ng4', '7... Ng4 8 Bg1 e5 9 fxe5 dxe5 10 d5', { a: '⩲', c: '7...Ng4 8.Bg1 e5 também favorece as brancas.' }],
  ['c06', 'r-B', 'r', '(r) B', '6... c5 7 dxc5 Qa5 8 Qd2 dxc5 9 Nb5 Qxd2+ 10 Nxd2 Na6 11 O-O-O', { a: '⩲', r: 'Beliavsky–Mednis, Viena 1986', c: '6...c5 7.dxc5 Qa5 leva a um final um pouco melhor para as brancas.' }],
  ['c06', 'r-C', 'r', '(r) C', '6... Nbd7 7 Qd2 c5 8 O-O-O Ng4 9 Bg1 cxd4 10 Nxd4 e5 11 Nde2 exf4 12 Nxf4 Qa5 13 Bd4 Nge5', { a: '=', r: 'Beliavsky–Azmaiparashvili, Campeonato Soviético 1986', c: 'A alternativa recomendável é 6...Nbd7, com igualdade.' }],
  ['c06-r-C', '1', 'r', '(r) C 7.e5', '7 e5 Ng4 8 Bg1 c5', { a: '=', c: '7.e5 Ng4 8.Bg1 c5 também é igual.' }],
  ['c06', 's', 's', '(s)', '7 e5 Ng4 8 Bg1 c5 9 h3 Nh6 10 d5 Bb7 11 Qd2 Nf5 12 Bh2 dxe5 13 fxe5 e6', { a: '=', r: 'Beliavsky–Anand, Munique 1991', c: '7.e5 Ng4 8.Bg1 c5 leva à igualdade.' }],
  ['c06', 't', 't', '(t)', '7... e6 8 Qe2 d5 9 Bd3 dxe4 10 Nxe4 Nbd7 11 O-O-O Bb7 12 Nxf6+ Nxf6 13 Kb1 Nd5 14 Bd2 c5 15 h4', { a: '⩲', r: 'Bologan–Pfleger, Alemanha 1994', c: '7...e6?! 8.Qe2 d5 dá às brancas boas chances de ataque.' }],
  ['c06', 'u', 'u', '(u)', '12... Qc7 13 Bd5 dxe5 14 fxe5 Bxd5 15 Nxd5 Qxe5', { a: '=', r: 'S. Ivanov–Nyback, Finlândia 2006', c: '12...Qc7 13.Bd5 dxe5 também é igual.' }],
  ['c06', 'v', 'v', '(v)', '14 Nxf8 Qxc4', { a: '=', c: '14.Nxf8 Qxc4 (Gipslis) deixa as pretas com compensação total pela qualidade.' }],
  ['c06-v', '1', 'v', '(v) 13.fxe5', '13 fxe5 Qc8 14 Bd5 e6', { a: '=', c: '13.fxe5 Qc8 14.Bd5 e6 seria igual.' }],
]

const capitulo = {
  id: 'pirc-austriaco-a',
  arquivo: 'pirc-austriaco-a',
  nome: 'Pirc — Ataque Austríaco (5...O-O)',
  fonte: 'Modern Chess Openings — Pirc Defense, Austrian Attack (pp. 365–366), colunas 1–6',
  base: '1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. f4 Bg7 5. Nf3 O-O',
  corPadrao: 'b',
  ordem: 365,
  grupos: [
    { id: 'nc6', nome: '6.Bd3 Nc6', colunas: [1, 2, 3] },
    { id: 'na6', nome: '6.Bd3 Na6', colunas: [4, 5] },
    { id: 'be3', nome: '6.Be3', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
