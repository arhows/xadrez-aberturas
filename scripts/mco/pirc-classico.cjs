// Transcrição do MCO 15ª ed. — Defesa Pirc, Sistema Clássico (pp. 369–370), colunas 13–18.
// Gerar: node scripts/mco/gerar.cjs pirc-classico
// Formato: ver gambito-do-rei.cjs. Dicas em pirc-classico-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas 13–17; a avaliação vem da nota que continua cada coluna.

const B = '1 e4 d6 2 d4 Nf6 3 Nc3 g6 4 Nf3 Bg7'

const colunas = {
  c13: [`${B} 5 Be2 O-O 6 O-O Bg4 7 Be3 Nc6 8 d5 Bxf3 9 Bxf3 Ne5 10 Be2 c6 11 f4 Ned7 12 dxc6 bxc6`, 'bg4', '6...Bg4 7.Be3 Nc6 8.d5', '=',
    'No Sistema Clássico as brancas se desenvolvem com calma (Nf3, Be2, roque). Com 6...Bg4 e 7...Nc6 as pretas pressionam d4; depois de 8.d5 Bxf3 e 11.f4 as brancas ganham espaço, mas as pretas abrem a coluna b e igualam.'],
  c14: [`${B} 5 Be2 O-O 6 O-O Bg4 7 Be3 Nc6 8 Qd2 e5 9 d5 Ne7 10 Rad1 Bd7 11 Ne1 Ng4 12 Bxg4 Bxg4`, 'bg4', '8.Qd2 e5 9.d5', '=',
    'Com 8.Qd2 as brancas centralizam as peças. As pretas respondem logo com 8...e5; depois de 9.d5 Ne7 o centro fecha, e a troca dos bispos de casas brancas deixa o jogo igual.'],
  c15: [`${B} 5 Be2 O-O 6 O-O c6 7 Re1 Nbd7 8 e5 dxe5 9 dxe5 Ng4 10 e6 fxe6 11 h3 Nge5 12 Nxe5 Nxe5`, 'c6', '6...c6 7.Re1 Nbd7 8.e5', '=',
    'Com 6...c6 as pretas preparam ...b5 ou ...e5 com flexibilidade. Contra 7.Re1 Nbd7 as brancas abrem com 8.e5 e sacrificam o peão em e6; as pretas ficam com peões dobrados, mas o jogo fica igual.'],
  c16: [`${B} 5 Be2 O-O 6 O-O c5 7 d5 Na6 8 Bf4 Nc7 9 a4 b6 10 Re1 Bb7 11 Bc4 Nh5 12 Bg5 Nf6`, 'c5', '6...c5 7.d5 Na6', '⩲',
    'Com 6...c5 as pretas atacam d4 de imediato. As brancas avançam 7.d5 e ganham espaço; o cavalo preto vai por a6–c7 e as pretas preparam ...b5, mas as brancas mantêm uma pequena vantagem.'],
  c17: [`${B} 5 h3 O-O 6 Be3 c6 7 a4 d5 8 e5 Ne4 9 Nxe4 dxe4 10 Ng5 c5 11 c3 Qd5 12 Qc2 Nc6`, 'h3', '5.h3 O-O 6.Be3', '∓',
    'Com 5.h3 as brancas impedem ...Bg4 e preparam Be3 e Qd2. As pretas reagem com 6...c6 e 7...d5; depois de 8.e5 Ne4 o peão de e4 fica forte e as pretas ficam um pouco melhor.'],
  c18: [`${B} 5 Bc4 c6 6 e5 dxe5 7 Nxe5 O-O 8 O-O Nbd7 9 Bg5 Nb6 10 Bb3 a5 11 a4 Nbd5 12 Re1 Be6`, 'bc4', '5.Bc4 c6 6.e5', '=',
    'Com 5.Bc4 o bispo mira f7. As pretas respondem com 5...c6, preparando ...d5 ou ...b5; depois de 6.e5 dxe5 7.Nxe5 elas cravam um cavalo em d5 com ...a5 e igualam.'],
}

const notas = [
  // Coluna 13
  ['c13', 'a', 'a', '(a)', '7 h3 Bxf3 8 Bxf3 Nc6 9 Ne2 e5 10 c3 Re8 11 d5 Ne7 12 c4 Nd7 13 Nc3 f5 14 b4 a5', { a: '=', r: 'Jenni–Priss, Campeonato Suíço por Equipes 2000', c: '7.h3 Bxf3 8.Bxf3 Nc6 9.Ne2 e5 leva à igualdade.' }],
  ['c13-a', '1', 'a', '(a) 9.d5', '9 d5 Ne5 10 Be2 c6', { a: '=', c: '9.d5 Ne5 10.Be2 c6 também é igual.' }],
  ['c13', 'b', 'b', '(b)', '7... Nbd7 8 Nd2 Bxe2 9 Qxe2 e5 10 d5 c6 11 a4 cxd5 12 exd5', { a: '±', r: 'Kavalek–Christiansen, match de 1987', c: '7...Nbd7 8.Nd2 Bxe2 9.Qxe2 e5 10.d5 deixa as brancas melhor.' }],
  ['c13', 'c', 'c', '(c)', '13 Qd3 Rb8 14 Rab1 Qc7 15 Rfd1 Nb6 16 a4 a5 17 Bf3 Rfd8', { a: '=', r: 'Rogovski–Ajrapetjan, Alushta 2006', c: '13.Qd3 Rb8 14.Rab1 Qc7 leva à igualdade.' }],
  // Coluna 14
  ['c14', 'd', 'd', '(d)', '8... Re8 9 Rad1 a6 10 Rfe1 e5 11 dxe5 dxe5 12 Qc1 Qe7 13 Nd5 Nxd5 14 exd5 Nd8 15 c4', { a: '±', r: 'Geller–Pribyl, Sóchi 1984', c: 'Esperar deixa as brancas centralizarem as peças: 8...Re8 9.Rad1 a6 10.Rfe1 e5 favorece as brancas.' }],
  ['c14', 'e', 'e', '(e)', '9 dxe5 dxe5 10 Rad1 Qc8 11 Qc1 Rd8 12 Rxd8+ Nxd8 13 Rd1 Ne6 14 h3 Bxf3 15 Bxf3 c6 16 Ne2', { a: '=', r: 'Blatny–Nunn, Pardubice 1993 (empate)', c: 'As brancas não ganham nada com a simplificação 9.dxe5 dxe5 10.Rad1.' }],
  ['c14-e', '1', 'e', '(e) 12...Qxd8', '12... Qxd8', { a: '=', c: '12...Qxd8 também está bem.' }],
  ['c14', 'f', 'f', '(f)', '10 Ne1 Bxe2 11 Qxe2 c6 12 dxc6 bxc6 13 Rd1 Qc7 14 Nd3 d5', { a: '=', r: 'García Martínez–Pérez, Memorial Capablanca 2005', c: '10.Ne1 Bxe2 11.Qxe2 c6! leva à igualdade.' }],
  ['c14', 'g', 'g', '(g)', '11... b5 12 a3 a5 13 Nd3 Qb8 14 f3 c6 15 dxc6 Bxc6 16 b4 d5 17 Bc5 Re8', { a: '=', r: 'Kuczynski–Chernin, Budapeste 1993', c: '11...b5 12.a3 a5 também leva à igualdade depois de 16...d5!.' }],
  ['c14', 'h', 'h', '(h)', '13 f3 Bd7 14 f4 Bg4 15 Nf3 f5 16 fxe5 dxe5 17 h3 Bxf3 18 Rxf3 Nc8 19 exf5 gxf5 20 Bh6 Nd6', { a: '=', r: 'Geller–Thipsay, Nova Délhi 1987', c: '13.f3 Bd7 14.f4 Bg4 15.Nf3 f5 leva à igualdade.' }],
  ['c14-h', '1', 'h', '(h) 15.Rb1', '15 Rb1 c6 16 h3 Bd7', { a: '∞', c: '15.Rb1 c6 16.h3 Bd7 deixa o jogo indefinido.' }],
  // Coluna 15
  ['c15', 'i-A', 'i', '(i) A', '7 h3 Qc7 8 Bf4 Nh5 9 Be3 e5 10 Qd2 Nd7 11 a4 Re8 12 Rad1 exd4 13 Nxd4 Nhf6 14 f3 a6 15 Nb3 d5 16 Bf4 Ne5', { a: '=', r: 'Tal–Gipslis, Saint John 1988', c: '7.h3 Qc7 8.Bf4 Nh5 9.Be3 e5 leva à igualdade depois de 15...d5!.' }],
  ['c15-i-A', '1', 'i', '(i) A 9.Bh2', '9 Bh2 e5 10 a4 Re8 11 dxe5 dxe5 12 Bc4 Be6', { a: '=', r: 'Mephisto–Piket, AEGON 1992', c: '9.Bh2 e5 10.a4 Re8 também é igual.' }],
  ['c15', 'i-B', 'i', '(i) B', '7 a4 Qc7 8 a5 Nbd7 9 Be3 Rb8 10 Nd2 b5 11 axb6 axb6', { a: '=', r: 'Flear–Hodgson, Londres 1990', c: '7.a4 Qc7 8.a5 Nbd7 leva à igualdade.' }],
  ['c15', 'i-C', 'i', '(i) C', '7 Bf4 Nbd7 8 Qd2 e5 9 dxe5 dxe5 10 Nxe5 Nxe4', { a: '=', r: 'Cvek–Navara, República Tcheca 2005', c: '7.Bf4 Nbd7 8.Qd2 e5 9.dxe5 dxe5 10.Nxe5 Nxe4! é igual.' }],
  ['c15', 'j', 'j', '(j)', '7... Qc7 8 e5 dxe5 9 Nxe5 Nbd7 10 Bf4 Nxe5 11 Bxe5', { a: '⩲', r: 'Parma', c: '7...Qc7 8.e5 dxe5 9.Nxe5 dá pequena vantagem às brancas.' }],
  ['c15-j', '1', 'j', '(j) 9...Be6', '9... Be6 10 Bf4', { a: '⩲', c: '9...Be6 10.Bf4 também favorece um pouco as brancas.' }],
  ['c15-j', '2', 'j', '(j) 9...Nfd7', '9... Nfd7 10 Nc4 Nb6 11 Ne4 Bf5 12 Bf1', { a: '⩲', r: 'Kweits–Siroky, por correspondência 1985', c: '9...Nfd7 10.Nc4 Nb6 11.Ne4 Bf5 12.Bf1 também favorece um pouco as brancas.' }],
  ['c15', 'k', 'k', '(k)', '11... Ngf6 12 Bc4 Nd5 13 Ne4 Ne5 14 Nxe5 Bxe5 15 Qe2', { a: '⩲', r: 'Karpov–Shirov, Linares 1995', c: '11...Ngf6 12.Bc4 Nd5 13.Ne4! dá pequena vantagem às brancas.' }],
  ['c15', 'l', 'l', '(l)', '13 Qxd8 Rxd8 14 Bf4 Nf7 15 Bd3 e5', { a: '=', r: 'Potkin–Minasian, Batumi 2002', c: '13.Qxd8 Rxd8 14.Bf4 Nf7 leva à igualdade.' }],
  // Coluna 16
  ['c16', 'm-A', 'm', '(m) A', '6... Nc6 7 h3 e5 8 dxe5 dxe5 9 Qxd8 Rxd8 10 Bc4', { a: '⩲', r: 'Rozentalis–Ehlvest, Koszalin 1998', c: '6...Nc6 7.h3 e5 8.dxe5 dxe5 9.Qxd8 dá às brancas um final um pouco melhor.' }],
  ['c16', 'm-B', 'm', '(m) B', '6... Nbd7 7 e5 dxe5 8 dxe5 Ng4 9 e6', { a: '⩲', r: 'Kasparov–Sendur, Wattignies 1976', c: '6...Nbd7 7.e5 dxe5?! 8.dxe5 Ng4 9.e6 favorece as brancas.' }],
  ['c16-m-B', '1', 'm', '(m) B 7...Ne8', '7... Ne8 8 Bg5', { a: '⩲', c: '7...Ne8 8.Bg5 também favorece um pouco as brancas.' }],
  ['c16', 'n', 'n', '(n)', '7 dxc5 dxc5 8 Be3 b6 9 Qc1 Bb7 10 Rd1 Qc8 11 Nd5 Nc6 12 Ne5 Re8', { a: '=', r: 'Lyell–Speelman, 4NCL 2005', c: '7.dxc5 dxc5 8.Be3 b6 leva à igualdade.' }],
  ['c16', 'o', 'o', '(o)', '7... Ne8 8 Bf4 Nd7 9 Qd2 Rb8 10 Bh6 Nc7 11 a4 a6 12 a5', { a: '⩲', r: 'Rotstein–Minasian, Paris 1994', c: 'As pretas podem tentar vários lances, por exemplo 7...Ne8 8.Bf4 Nd7. Mesmo um pouco piores, elas mantêm possibilidades dinâmicas.' }],
  ['c16', 'p', 'p', '(p)', '13 Qd2 a6 14 Rad1 Rb8 15 h3 Nd7 16 Qd3', { a: '⩲', r: 'Karpov–Korchnoi, Campeonato Mundial 1978', c: '13.Qd2 a6 14.Rad1 Rb8 dá pequena vantagem às brancas. (O livro traz 13.Qd3, mas a dama vai a d3 no 16º lance; 13.Qd2 é o lance legal.)' }],
  // Coluna 17
  ['c17', 'q', 'q', '(q)', '6... a6 7 a4 b6 8 Bc4 e6 9 O-O Bb7 10 d5 exd5 11 exd5 Re8 12 Re1 Nbd7 13 Bd4 Rxe1+ 14 Qxe1 Nc5 15 b4 Ncd7 16 Qd2', { a: '⩲', r: 'Istrățescu–Chernin, Olimpíada de Moscou 1994', c: '6...a6 7.a4 b6 8.Bc4 e6 leva a uma posição em que 16.Qd2 dá pequena vantagem às brancas.' }],
  ['c17', 'r', 'r', '(r)', '7... Nbd7 8 a5 Qc7 9 Be2 e5 10 dxe5 dxe5 11 O-O Rd8 12 Qb1 Nf8 13 Bc4 Be6 14 Qa2 b5', { a: '=', r: 'Brynell–McShane, Malmö 2003', c: '7...Nbd7 8.a5 Qc7 9.Be2 e5 leva à igualdade depois de 14...b5!.' }],
  ['c17', 's', 's', '(s)', '11 dxc5 Qc7 12 Bc4 Nc6 13 Nxe4 Qxe5', { a: '=', r: 'Gachet–Leski, França 2003', c: 'Mais cauteloso é 11.dxc5 Qc7 12.Bc4 Nc6, com igualdade.' }],
  ['c17', 't', 't', '(t)', '13 Qxe4 Qb3 14 Bb5 h6 15 Nf3 Bf5', { a: '∓', r: 'Kudrin–Raubal, Nova York 1996', c: '13.Qxe4 Qb3 14.Bb5 h6 deixa as pretas um pouco melhor.' }],
  // Coluna 18
  ['c18', 'u', 'u', '(u)', '5 Bf4 O-O 6 Qd2 Bg4 7 O-O-O c6 8 Bh6 Qa5 9 Kb1 Nbd7 10 Be2 e5 11 Bxg7 Kxg7 12 h3 Bxf3 13 Bxf3 b5', { a: '∞', r: 'Christiansen–Benjamin, Campeonato dos EUA 1997', c: '5.Bf4 O-O 6.Qd2 Bg4 7.O-O-O leva a roques opostos, com chances para os dois lados.' }],
  ['c18', 'v', 'v', '(v)', '5... O-O 6 Qe2 Bg4 7 e5 Nh5 8 h3 Bxf3 9 Qxf3 dxe5 10 Qxb7 Nd7 11 dxe5 Nxe5 12 Be2 Nf6', { a: '=', r: 'Hort–Planinc, Iugoslávia 1977', c: '5...O-O 6.Qe2 Bg4 7.e5 Nh5 leva à igualdade depois de 9...dxe5!.' }],
]

const capitulo = {
  id: 'pirc-classico',
  arquivo: 'pirc-classico',
  nome: 'Pirc — Sistema Clássico (4.Nf3)',
  fonte: 'Modern Chess Openings — Pirc Defense, Classical System (pp. 369–370), colunas 13–18',
  base: '1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Nf3 Bg7',
  corPadrao: 'b',
  ordem: 369,
  grupos: [
    { id: 'bg4', nome: '5.Be2 O-O 6.O-O Bg4', colunas: [13, 14] },
    { id: 'c6', nome: '6...c6', colunas: [15] },
    { id: 'c5', nome: '6...c5', colunas: [16] },
    { id: 'h3', nome: '5.h3', colunas: [17] },
    { id: 'bc4', nome: '5.Bc4', colunas: [18] },
  ],
}

module.exports = { capitulo, colunas, notas }
