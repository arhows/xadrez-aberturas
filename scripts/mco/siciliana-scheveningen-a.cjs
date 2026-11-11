// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Scheveningen, linha principal com 6.Be2 (pp. 292–294), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs siciliana-scheveningen-a
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-scheveningen-a-dicas.cjs.
//
// A tabela só traz avaliação no fim da coluna 6; nas outras a avaliação vem da última nota.
// Correções de impressão: coluna 4, "16 dxe5" → 16 fxe5 (as brancas não têm peão d); nota (t), "14 dxe5" → 14 fxe5;
// nota (e) A, "16...Qxd6" → 16...Qxc6 e "22 Nxg5" → 22 Bxg5; nota (g), "23...Nc6" → 23...Nd6 (o único cavalo preto está em e8);
// nota (o) remete à nota (r), mas a transposição é para a nota (s).
// Nota (s): "19 Nxf6 Nf3" — o cavalo preto captura em f3 (Nxf3).

const B = '1 e4 c5 2 Nf3 e6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 d6 6 Be2 Be7 7 O-O Nc6 8 Be3 O-O 9 f4 a6'
const A = `${B} 10 a4 Qc7 11 Kh1 Re8 12 Bf3`

const colunas = {
  c01: [`${A} Rb8 13 g4 Nxd4 14 Bxd4 e5 15 fxe5 dxe5 16 Ba7 Ra8 17 g5 Rd8`, 'a4', '10.a4 Qc7 11.Kh1 Re8 12.Bf3 Rb8 13.g4', '⩲',
    'Na linha principal da Scheveningen as brancas jogam 6.Be2, roque pequeno, Be3 e f4. Com 10.a4 elas impedem ...b5. Depois de 11.Kh1 Re8 12.Bf3 Rb8, o avanço 13.g4 ataca na ala do rei e as brancas ficam um pouco melhor.'],
  c02: [`${A} Rb8 13 Qd2 Na5 14 Qf2 Nc4 15 Bc1 e5 16 Nde2 exf4 17 Nxf4 Be6`, 'a4', '13.Qd2', '∞',
    'Com 13.Qd2 as brancas jogam de forma mais posicional. As pretas levam o cavalo a c4 e abrem o jogo com ...e5; há chances para os dois lados (Anand–Kasparov, Linares 1997).'],
  c03: [`${A} Bd7 13 Nb3 b6 14 g4 Bc8 15 g5 Nd7 16 Bg2 Bb7 17 Rf3 g6`, 'a4', '12...Bd7', '⩲',
    'Com 12...Bd7 as pretas desenvolvem o bispo de c8. Depois de 13.Nb3 e do avanço g4–g5 as brancas ficam um pouco melhor.'],
  c04: [`${B} 10 Qe1 Qc7 11 Qg3 Nxd4 12 Bxd4 b5 13 a3 Bb7 14 Rae1 Bc6 15 Bd3 e5 16 fxe5 Nh5 17 exd6 Nxg3`, 'qe1', '10.Qe1 Qc7 11.Qg3', '=',
    'Com 10.Qe1 e 11.Qg3 a dama branca vai para a ala do rei. As pretas trocam em d4 e avançam ...b5; depois de 15...e5 e 16...Nh5 a dama é trocada por peças e fica igual.'],
  c05: [`${B} 10 Qe1 Qc7 11 Kh1 Nxd4 12 Bxd4 b5 13 a3 Bb7 14 Qg3 Bc6 15 Rae1 Rae8 16 Bd3 e5 17 fxe5 Nh5`, 'qe1', '11.Kh1', '=',
    'Com 11.Kh1 as brancas tiram o rei da diagonal antes de Qg3. As pretas seguem o mesmo plano, com ...b5, ...Bc6 e ...e5, e ficam iguais.'],
  c06: [`${B} 10 Qe1 Bd7 11 Rd1 Nxd4 12 Bxd4 Bc6 13 Bf3 Qc7 14 e5 Nd7 15 exd6 Bxd6 16 Bxc6 Qxc6 17 Qg3 g6`, 'qe1', '10...Bd7', '=',
    'Com 10...Bd7 a dama preta não vai logo para c7, o que economiza um tempo. Depois de 14.e5 as peças se trocam e fica igual.'],
}

const notas = [
  // Colunas 1–3
  ['c01', 'a', 'a', '(a)', '10... Bd7 11 Nb3', { c: 'Várias ordens de lances levam a esta posição. 10...Bd7 11.Nb3 transpõe para a coluna 7.' }],
  ['c01', 'b-A', 'b', '(b) A', '11 Nb3 b6 12 Bf3 Rb8 13 Qe2 Nd7 14 Rfd1 Na5', { r: 'Yuja–Arnason, Salônica 1984', c: '11.Kh1 é um lance de espera útil. O recuo 11.Nb3 b6 permite jogo ativo às pretas com 14...Na5!.' }],
  ['c01', 'b-B', 'b', '(b) B', '11 Qe1 Nxd4 12 Bxd4 e5 13 Be3 exf4 14 Bxf4 Be6 15 Qg3 Nd7 16 Bh6 Qc5+ 17 Kh1 Qe5 18 Bf4 Qc5 19 Nd5 Bxd5 20 exd5 Ne5 21 Bxe5 dxe5 22 Qxe5 Bd6 23 Qf5 Rae8', { a: '=', c: 'Com 11.Qe1 Nxd4 12.Bxd4 e5 as pretas entregam um peão, mas no meio-jogo com bispos de cores opostas têm bom jogo por ele.' }],
  ['c01', 'c-A', 'c', '(c) A', '11... Rd8 12 Qe1 Nxd4 13 Bxd4 e5 14 Bg1 exf4 15 a5 Re8 16 Bb6 Qb8 17 Rxf4 Be6 18 Qg3 Nd7 19 Bd4 Ne5 20 Na4 Qc7 21 Nb6 Rab8 22 c4', { a: '⩲', r: 'Kloväns–Maksimenko, Riga 1988', c: 'Com 11...Rd8 12.Qe1 e 14.Bg1! as brancas ficam um pouco melhor.' }],
  ['c01-c-A', '1', 'c', '(c) A 12.Bf3', '12 Bf3 Ne5', { c: '12.Bf3?! Ne5! é bom para as pretas.' }],
  ['c01-c-A', '2', 'c', '(c) A 17...d5', '17... d5 18 Qf2 dxe4 19 Bc4', { a: '±', c: '17...d5?! 18.Qf2 dxe4 19.Bc4! deixa as brancas melhor.' }],
  ['c01', 'c-B', 'c', '(c) B', '11... Bd7 12 Qe1 Nxd4 13 Bxd4 Bc6 14 Qg3', { a: '⩲', c: 'Com 11...Bd7 12.Qe1 as brancas ficam um pouco melhor.' }],
  ['c01', 'd-A', 'd', '(d) A', '12 Bd3 Nb4 13 a5 Bd7 14 Nf3 Rac8 15 Bb6 Qb8 16 Qe2 Bc6 17 Nd4 Nxd3 18 cxd3 d5', { a: '=', r: 'Anand–Kasparov, Campeonato Mundial 1995', c: 'Com 12.Bd3 Nb4 13.a5 fica igual.' }],
  ['c01-d-A', '1', 'd', '(d) A 15.Bd4', '15 Bd4 Bc6 16 Qe1 Nd7 17 Qg3 Bf8', { a: '=', r: 'Svidler–Anand, Linares 1999', c: '15.Bd4 Bc6 também é igual.' }],
  ['c01', 'd-B', 'd', '(d) B', '12 Qe1 Nxd4 13 Bxd4 e5 14 fxe5 dxe5 15 Qg3 Bd8', { a: '=', c: 'Com 12.Qe1 Nxd4 13.Bxd4 e5 e 15...Bd8! fica igual.' }],
  ['c01', 'e-A', 'e', '(e) A', '12... Bf8 13 Nb3 b6 14 e5 dxe5 15 fxe5 Nd7 16 Bxc6 Qxc6 17 Nd4 Qb7 18 Qh5 g6 19 Qh4 Nxe5 20 Ne4 Be7 21 Ng5 Bxg5 22 Bxg5 f5 23 Rae1 Qd5 24 Ne2 Nf7 25 Nf4 Qc6 26 Nh5', { a: '⩲', r: 'Adams–Topalov, San Luis 2005', c: 'Uma alternativa importante é 12...Bf8. A linha é longa e complicada; depois de 26.Nh5! as brancas ficam um pouco melhor.' }],
  ['c01', 'e-B', 'e', '(e) B', '12... Nxd4 13 Qxd4 e5 14 Qd2 exf4 15 Bxf4 Be6 16 Rfd1 Rad8 17 h3', { a: '⩲', r: 'Panchenko–A. Sokolov, Moscou 1981', c: 'Com 12...Nxd4 13.Qxd4 e5 as brancas ficam um pouco melhor.' }],
  ['c01', 'f', 'f', '(f)', '13... Bf8 14 g5 Nd7 15 Bg2 g6 16 Qd2', { a: '⩲', r: 'de Firmian–Schroer, Filadélfia 1997', c: 'Com 13...Bf8 14.g5 as brancas ficam um pouco melhor.' }],
  ['c01', 'g', 'g', '(g)', '18 Qe2 Ne8 19 Be3 Be6 20 Qf2 Qc4 21 Nd5 Bxd5 22 b3 Qc3 23 exd5 Nd6 24 Rac1', { a: '⩲', r: 'G. Shahade–Benjamin, Nova York 2002', c: 'Com 18.Qe2 e 19.Be3 as brancas ficam um pouco melhor.' }],
  ['c01-g', '1', 'g', '(g) 19.Qf2', '19 Qf2 Rxa7', { c: '19.Qf2? Rxa7! pega o bispo.' }],
  ['c02', 'h-A', 'h', '(h) A', '13... Bd7 14 Nb3 b6 15 g4 Bc8 16 g5 Nd7 17 Bg2', { c: '13...Bd7 14.Nb3 b6 15.g4 Bc8 16.g5 Nd7 17.Bg2 é parecido com a coluna seguinte.' }],
  ['c02', 'h-B', 'h', '(h) B', '13... Nxd4 14 Bxd4 e5 15 Ba7 Ra8 16 Be3 Bd7 17 a5 Rac8 18 Be2 Bc6', { a: '∞', r: 'Karpov–Kasparov, Campeonato Mundial 1985', c: 'Com 13...Nxd4 14.Bxd4 e5 15.Ba7 Ra8 o jogo fica pouco claro.' }],
  ['c02-h-B', '1', 'h', '(h) B 16...exf4', '16... exf4 17 Bxf4 Be6 18 Rfd1', { a: '⩲', c: '16...exf4 17.Bxf4 Be6 18.Rfd1 é a nota (e), um pouco melhor para as brancas.' }],
  ['c02', 'i', 'i', '(i)', '18 b3 Ne5 19 Bb2 Rbc8 20 Rac1 Qc5 21 Qg3 g6', { a: '∞', r: 'Anand–Kasparov, Linares 1997', c: 'Depois de 18.b3 Ne5 há chances para os dois lados.' }],
  ['c03', 'j', 'j', '(j)', '13... Na5 14 Nxa5 Qxa5 15 Qd3 Rad8 16 Rfd1 Bc6 17 b4 Qc7 18 b5 Bd7 19 Rab1 axb5 20 Nxb5', { a: '⩲', r: 'Anand–Kasparov, Campeonato Mundial 1995', c: 'Com 13...Na5 14.Nxa5 Qxa5 e 17.b4! as brancas ficam com a iniciativa.' }],
  ['c03', 'k', 'k', '(k)', '14 Qd2 Rab8 15 Bf2 Bc8 16 Bg3 Nd7 17 e5 dxe5 18 Rae1 Bb7 19 fxe5 Ncxe5 20 Bxb7 Rxb7 21 Qe2 f6 22 Qxa6 Bb4 23 Nb5 Qc8 24 c3 Bf8', { a: '⩲', r: 'Anand–Topalov, Linares 1999', c: 'Com 14.Qd2 e 15.Bf2!? as brancas ficam só um pouco melhor.' }],
  ['c03', 'l', 'l', '(l)', '16... Rb8 17 Qh5 g6 18 Qh3 Nb4 19 f5 Ne5 20 Nd4 exf5 21 exf5 Bb7 22 Ne4', { a: '⩲', r: 'Rachels–Browne, Campeonato dos EUA 1989', c: 'Com 16...Rb8 17.Qh5 e 19.f5! as brancas ficam um pouco melhor.' }],
  ['c03-l', '1', 'l', '(l) 19...Nxc2', '19... Nxc2 20 fxg6 fxg6 21 Rf7', { c: '19...Nxc2? 20.fxg6 fxg6 21.Rf7! é forte para as brancas.' }],
  ['c03', 'm', 'm', '(m)', '18 Rh3 Bf8 19 Qe1', { a: '⩲', r: 'Popov–Grekh, Memorial Vasylyshyn 2006', c: 'Com 18.Rh3 e 19.Qe1 as brancas ficam um pouco melhor.' }],
  // Coluna 4
  ['c04', 'n', 'n', '(n)', '10 Kh1 Bd7 11 Qe1 b5 12 a3 Qb8 13 Qg3 b4 14 axb4 Qxb4', { a: '=', c: 'Lento é 10.Kh1 Bd7 11.Qe1 b5 12.a3 Qb8!; fica igual. Repare que a dama preta economizou um tempo por não ir a c7.' }],
  ['c04-n', '1', 'n', '(n) 11.a4', '11 a4 Nxd4 12 Bxd4 Bc6', { a: '=', c: '11.a4 Nxd4 12.Bxd4 Bc6 é igual.' }],
  ['c04', 'o', 'o', '(o)', '11... Bd7 12 Kh1', { c: '11...Bd7 12.Kh1 transpõe para a nota (s).' }],
  ['c04', 'p', 'p', '(p)', '15... Rae8 16 e5 dxe5 17 fxe5 Nd7 18 Rf4 g6 19 b4', { a: '⩲', r: 'Macieja–Vescovi, Bermudas 2005', c: 'Com 15...Rae8 16.e5 as brancas ficam um pouco melhor.' }],
  ['c04', 'q', 'q', '(q)', '17 Qf3 dxe5 18 Nd5 Bxd5 19 exd5 exd4', { a: '=', r: 'Hazai–Averkin, Sochi 1982', c: 'Com 17.Qf3 dxe5 fica igual.' }],
  ['c04', 'r', 'r', '(r)', '18 dxc7 Nxf1 19 Nd5 Bxd5 20 exd5 Bd6 21 Be5 Rfe8 22 Bxd6 Rxe1', { a: '=', r: 'Tomanović–Bošković, Campeonato Sérvio 2000', c: 'Depois de 18.dxc7 Nxf1 o material se equilibra e fica igual.' }],
  // Coluna 5
  ['c05', 's', 's', '(s)', '11... Bd7 12 Qg3 b5 13 e5 dxe5 14 fxe5 Nxe5 15 Rxf6 Bxf6 16 Bf4 b4 17 Ne4 Kh8 18 Nf3 Qxc2 19 Nxe5 Qxe4 20 Bf3 Qc2', { a: '=', c: 'As pretas podem de novo entrar numa variante crítica com 11...Bd7 12.Qg3 b5 13.e5. Com 19...Qxe4 20.Bf3 Qc2 elas têm chances razoáveis.' }],
  ['c05-s', '1', 's', '(s) 12...Kh8', '12... Kh8 13 a3 b5 14 Bd3', { a: '⩲', c: '12...Kh8 13.a3 b5 14.Bd3 deixa as brancas um pouco melhor.' }],
  ['c05-s', '2', 's', '(s) 19.Nxf6', '19 Nxf6 Nxf3', { a: '∞', c: '19.Nxf6 Nxf3 é pouco claro.' }],
  ['c05-s', '3', 's', '(s) 19...Qxe2', '19... Qxe2 20 Nxf6 gxf6 21 Bh6', { a: '+−', r: 'Reyes–Eseban, Jaca 1990', c: 'Na partida seguiu 19...Qxe2? 20.Nxf6 gxf6? 21.Bh6, e as pretas abandonaram.' }],
  ['c05', 't', 't', '(t)', '13 e5 dxe5 14 fxe5 Nd7 15 Ne4 Bb7 16 Bd3 Rad8 17 Qg3 Bxe4 18 Bxe4 Nc5', { a: '=', r: 'Chandler–Ribli, Alemanha 1991', c: 'Com 13.e5 dxe5 14.fxe5 Nd7 a partida terminou empatada.' }],
  ['c05', 'u', 'u', '(u)', '15... Qb7 16 Bd3 b4 17 Nd1 bxa3 18 bxa3 g6 19 Nf2 Nh5 20 Qe3 Nxf4 21 Qxf4 e5 22 Ng4', { a: '±', r: 'Shirov–Benjamin, Horgen 1994', c: 'A defesa antiga 15...Qb7 deixa as brancas com perspectivas de ataque; depois de 17.Nd1! e 22.Ng4! elas ficam melhor.' }],
  ['c05', 'v', 'v', '(v)', '18 Qh3 dxe5 19 Be3 Nf4 20 Bxf4 exf4 21 e5 g6', { a: '=', r: 'Brenjo–Abramović, Iugoslávia 1996', c: 'Depois de 18.Qh3 dxe5 fica igual.' }],
  // Coluna 6
  ['c06', 'w', 'w', '(w)', '10... Nxd4 11 Bxd4 b5 12 Rd1 Bb7 13 Bf3 Qc7 14 e5 dxe5 15 fxe5 Nd7 16 Bxb7 Qxb7 17 Ne4 Qc7 18 Qg3 Kh8 19 Nd6 Kg8 20 c3', { a: '⩲', c: 'Com 10...Nxd4 11.Bxd4 b5 12.Rd1!? e 14.e5 as brancas ficam um pouco melhor.' }],
  ['c06-w', '1', 'w', '(w) 12...b4', '12... b4 13 Na4 Nxe4 14 Bf3', { c: '12...b4?! 13.Na4 Nxe4? 14.Bf3 é ruim para as pretas.' }],
  ['c06', 'x', 'x', '(x)', '11 Qg3 Nxd4 12 Bxd4 Bc6 13 Rae1 b5 14 a3 Qd7', { a: '=', c: 'Com 11.Qg3 Nxd4 12.Bxd4 Bc6 as pretas ganham contrajogo rápido com 14...Qd7! e ...a5.' }],
  ['c06-x', '1', 'x', '(x) 11.a4', '11 a4', { c: 'Segundo Kasparov, as brancas deviam tentar 11.a4, já que a coluna não dá vantagem.' }],
]

const capitulo = {
  id: 'siciliana-scheveningen-a',
  arquivo: 'siciliana-scheveningen-a',
  nome: 'Siciliana Scheveningen — Linha principal (6.Be2)',
  fonte: 'Modern Chess Openings — Sicilian Defense, Scheveningen Variation, Main Line (6 Be2) (pp. 292–294), colunas 1–6',
  base: '1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 d6 6. Be2 Be7 7. O-O Nc6 8. Be3 O-O 9. f4 a6',
  corPadrao: 'b',
  ordem: 292,
  grupos: [
    { id: 'a4', nome: '10.a4 Qc7 11.Kh1 Re8 12.Bf3', colunas: [1, 2, 3] },
    { id: 'qe1', nome: '10.Qe1', colunas: [4, 5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
