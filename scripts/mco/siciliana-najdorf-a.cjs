// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Najdorf: 6.Be3 e 6.g3 (pp. 248–251), colunas 1–12.
// Gerar: node scripts/mco/gerar.cjs siciliana-najdorf-a
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-najdorf-a-dicas.cjs.
//
// Erros do livro corrigidos:
// - Col. 2–4, lance 10: o "g5" das brancas está impresso na coluna 2, mas é da coluna 4
//   (9 g4 Nb6 10 g5 Nh5); nas colunas 2 e 3 o lance 10 é 0-0-0, como na coluna 1.
// - Col. 5: "13 Bxb6 Qxb7" → 13...Qxb6 (a dama retoma em b6 e só no lance 14 vai para b7).
// - Nota (i): falta o lance 15 ("14 exd5 Nd7 16 Kb1 a4"); a nota vai só até 14...Nd7.
// - Nota (s) da col. 6 ("13 0-0 0-0 14 c4 ... Bg6") não cabe na coluna (as brancas já rocaram
//   grande no lance 10 e o bispo de e6 não chega a g6); ficou de fora.

const B = '1 e4 c5 2 Nf3 d6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 a6'
const I = `${B} 6 Be3 e5 7 Nb3 Be6`

const colunas = {
  c01: [`${I} 8 f3 Be7 9 Qd2 O-O 10 O-O-O Nbd7 11 g4 b5 12 g5 b4 13 Ne2 Ne8 14 f4 a5`, 'ingles', '8.f3 Be7 … 10.O-O-O Nbd7', '=',
    'O Ataque Inglês: 6.Be3, f3, Qd2, roque grande e avanço dos peões g e h. Na linha principal 6...e5 7.Nb3 Be6 as pretas cobrem d5 e os dois lados atacam em alas opostas. Depois de 11.g4 b5 12.g5 b4 a corrida é equilibrada.'],
  c02: [`${I} 8 f3 Be7 9 Qd2 O-O 10 O-O-O Qc7 11 g4 Rc8 12 g5 Nh5 13 Kb1 Nd7 14 Qf2 b5`, 'ingles', '10.O-O-O Qc7', '⩲',
    'Com 10...Qc7 as pretas jogam primeiro na coluna c. As brancas mantêm uma pequena vantagem.'],
  c03: [`${I} 8 f3 Be7 9 Qd2 O-O 10 O-O-O b5 11 Nd5 Bxd5 12 exd5 Qc7 13 g4 Rc8 14 Kb1 b4`, 'ingles', '10.O-O-O b5', '⩲',
    'Com 10...b5 as pretas avançam logo na ala da dama. As brancas trocam em d5, ganham a casa e ficam um pouco melhor.'],
  c04: [`${I} 8 f3 Nbd7 9 g4 Nb6 10 g5 Nh5 11 Qd2 Be7 12 O-O-O O-O 13 Rg1 Rc8 14 Kb1 g6`, 'ingles', '8...Nbd7 9.g4', '⩲',
    'Com 8...Nbd7 9.g4 as brancas avançam os peões antes de Qd2. O cavalo de f6 vai para h5 e as brancas ficam um pouco melhor.'],
  c05: [`${I} 8 f3 Nbd7 9 Qd2 b5 10 a4 b4 11 Nd5 Bxd5 12 exd5 Nb6 13 Bxb6 Qxb6 14 a5 Qb7`, 'ingles', '8...Nbd7 9.Qd2 b5 10.a4', '⩲',
    'Com 9...b5 10.a4 as brancas freiam a ala da dama das pretas. Depois das trocas em d5 e b6 a posição é aguda, mas as brancas ficam um pouco melhor.'],
  c06: [`${I} 8 f3 h5 9 Qd2 Be7 10 O-O-O Nbd7 11 Kb1 Rc8 12 Bd3 b5 13 h3 h4 14 f4 Qc7`, 'ingles', '8...h5', '⩲',
    'Com 8...h5 as pretas impedem g4. As brancas rocam grande e abrem o jogo com f4; elas ficam um pouco melhor.'],
  c07: [`${B} 6 Be3 e5 7 Nf3 Be7 8 Bc4 O-O 9 O-O Be6 10 Qe2 b5 11 Bb3 h6 12 Rfd1 Nbd7 13 a3 Qe8`, 'be3', '6.Be3 e5 7.Nf3 Be7', '⩲',
    'Com 7.Nf3 o cavalo vigia d5 de longe e o bispo vai para c4. É uma linha sólida em que as brancas ficam um pouco melhor.'],
  c08: [`${B} 6 Be3 e5 7 Nf3 Qc7 8 a4 Be7 9 a5 O-O 10 Be2 Nbd7 11 O-O b5 12 axb6 Nxb6 13 Qd3 Bb7`, 'be3', '7.Nf3 Qc7', '⩲',
    'Com 7...Qc7 8.a4 as brancas tiram a expansão das pretas na ala da dama. Elas ficam um pouco melhor.'],
  c09: [`${B} 6 Be3 Ng4 7 Bg5 h6 8 Bh4 g5 9 Bg3 Bg7 10 Be2 h5 11 Bxg4 Bxg4 12 f3 Bd7 13 O-O Nc6`, 'be3', '6...Ng4', '=',
    'Com 6...Ng4 as pretas caçam o bispo de e3 e ganham espaço na ala do rei com ...h6 e ...g5. A posição fica igual.'],
  c10: [`${B} 6 Be3 Ng4 7 Bg5 h6 8 Bh4 g5 9 Bg3 Bg7 10 h3 Ne5 11 Nf5 Bxf5 12 exf5 Nbc6 13 Nd5 e6`, 'be3', '6...Ng4 … 10.h3', '⩲',
    'Com 10.h3 o cavalo de g4 vai para e5. As brancas pegam a casa f5 e a casa d5 e ficam um pouco melhor.'],
  c11: [`${B} 6 g3 e5 7 Nde2 b5 8 Bg5 Nbd7 9 Nd5 Be7 10 Bxf6 Nxf6 11 Nec3 Be6 12 a4 b4 13 Nxb4 Qa5`, 'g3', '6.g3 e5 7.Nde2', '∞',
    'O 6.g3 é posicional: o bispo vai para g2 e as brancas lutam pela casa d5. Com 12...b4! as pretas entregam um peão e ficam com compensação na ala da dama.'],
  c12: [`${B} 6 g3 e5 7 Nb3 Be7 8 Bg2 O-O 9 O-O Be6 10 a4 Nbd7 11 a5 Qc7 12 Re1 Rfc8 13 h3 h6`, 'g3', '6.g3 e5 7.Nb3', '=',
    'Com 7.Nb3 as brancas mantêm as peças leves. As pretas desenvolvem normalmente e igualam.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '7... Be7', { c: '7...Be7 também serve, desde que as pretas joguem logo ...Be6 e voltem à coluna. É importante cobrir a casa d5.' }],
  ['c01', 'b', 'b', '(b)', '8 Qd2 Be7 9 f3', { c: '8.Qd2 Be7 9.f3 é só outra ordem de lances.' }],
  ['c01', 'c-A', 'c', '(c) A', '9 g4 d5 10 g5 d4', { a: '⩱', c: 'Com 9.g4 d5! as pretas já ficam um pouco melhor, depois de 10.g5 d4…' }],
  ['c01-c-A', '1', 'c', '(c) A 10.exd5', '10 exd5 Nxd5', { a: '⩱', c: '…ou de 10.exd5 Nxd5.' }],
  ['c01', 'c-B', 'c', '(c) B', '9 Nd5 Nxd5 10 exd5 Bf5 11 Bd3 Bg5', { a: '=', c: 'Com 9.Nd5 as peças são trocadas e fica igual.' }],
  ['c01', 'd', 'd', '(d)', '10 g4 d5', { a: '=', c: 'De novo 10.g4 d5! é bom para as pretas.' }],
  ['c01', 'e', 'e', '(e)', '11... Qc7 12 h4 b5 13 Nd5 Bxd5 14 exd5 Rfc8 15 Kb1 Nb6 16 Bxb6 Qxb6 17 Qe1 a5 18 g5 Nh5 19 a3', { a: '⩲', r: 'Adams–Kobalia, Mundial da FIDE (KO) 2001', c: 'Com 11...Qc7 as brancas ficam um pouco melhor.' }],
  ['c01', 'f', 'f', '(f)', '13... Nh5 14 Ng3 Nf4 15 h4 a5 16 Kb1 a4 17 Nd4', { a: '⩲', r: 'Topalov–de Firmian, Polanica Zdrój 1995', c: 'Com 13...Nh5 o cavalo vai para f4, mas as brancas ficam um pouco melhor.' }],
  ['c01', 'g', 'g', '(g)', '14 h4 a5 15 Kb1 Nb6 16 Ng3 a4 17 Nc1 d5 18 Bxb6 Qxb6 19 exd5 Rd8 20 Bc4 Nc7 21 dxe6 Rxd2 22 exf7+ Kh8 23 Rxd2 Nb5', { a: '=', r: 'Karjakin–Anand, Wijk aan Zee 2007', c: 'Com 14.h4 a partida termina em complicações iguais.' }],
  ['c01', 'h', 'h', '(h)', '15 f5 a4 16 Nbd4 exd4 17 Nxd4 b3 18 Kb1 bxc2+ 19 Nxc2 Bb3 20 axb3 axb3 21 Na3 Ne5 22 h4 Ra4', { a: '=', r: 'Shirov–van Wely, Wijk aan Zee 2007', c: 'Com 15.f5 as brancas entregam um cavalo em d4 e as pretas abrem a ala da dama: igual.' }],
  // Coluna 2
  ['c02', 'i', 'i', '(i)', '13 Nd5 Bxd5 14 exd5 Nd7', { a: '=', r: 'Adams–Bates, 4NCL 2005', c: 'Com 13.Nd5 fica igual. (O livro pula o lance 15 e continua com 16.Kb1 a4.)' }],
  ['c02', 'j', 'j', '(j)', '15 h4 Rcb8 16 f4 exf4 17 Bxf4 Nxf4 18 Qxf4 Ne5 19 Nd4', { a: '⩲', r: 'Karjakin–Nunn, Amsterdã 2006', c: 'Depois de 15.h4 as brancas abrem a coluna f e ficam um pouco melhor.' }],
  // Coluna 3
  ['c03', 'k', 'k', '(k)', '10... a5 11 Bb5 Na6 12 Kb1 Nc7 13 Bb6 Qb8 14 Ba4 Nd7 15 Bxc7 Qxc7 16 Bxd7 Qxd7 17 Nd5', { a: '⩲', r: 'Landa–Popović, Liga Belga 2004', c: 'Com 10...a5 as brancas trocam as peças leves e ocupam d5.' }],
  ['c03', 'l', 'l', '(l)', '11 Kb1 b4 12 Nd5 Bxd5 13 exd5 a5 14 g4 Qc7 15 g5 Nfd7 16 h4 Rc8 17 Bh3', { a: '⩲', r: 'Memedov–Maenhout, Istambul 2005', c: '11.Kb1 também dá às brancas uma pequena vantagem.' }],
  ['c03', 'm', 'm', '(m)', '15 g5 Nfd7 16 h4 a5 17 Bh3 a4 18 Nc1 Na6 19 h5', { a: '⩲', r: 'Topalov–van Wely, Wijk aan Zee 2007', c: 'Depois de 15.g5 o ataque das brancas anda mais rápido.' }],
  // Coluna 4
  ['c04', 'n-A', 'n', '(n) A', '9... h6 10 Qd2 Qc7 11 O-O-O b5 12 Kb1 Nb6 13 Qf2 Rb8 14 Bd3 Nc4 15 h4', { a: '⩲', r: 'Fressinet–Bologan, Cap d’Agde 2002', c: 'Com 9...h6 as brancas ficam um pouco melhor.' }],
  ['c04', 'n-B', 'n', '(n) B', '9... b5 10 g5 b4 11 Ne2 Nh5 12 Qd2 a5 13 Ng3 Nxg3 14 hxg3 a4 15 Nc1 Qa5 16 f4', { a: '⩲', r: 'Motylev–Nechepurenko, Liga Russa 2006', c: 'Com 9...b5 as brancas ganham a coluna h aberta.' }],
  ['c04', 'o', 'o', '(o)', '10... Nfd7 11 Qd2 Rc8 12 O-O-O Qc7 13 Kb1 Be7 14 h4 Nc4 15 Bxc4 Bxc4 16 h5', { a: '⩲', r: 'Sakaev–de Firmian, Politiken Cup 2003', c: 'Com 10...Nfd7 as brancas ficam um pouco melhor.' }],
  ['c04', 'p', 'p', '(p)', '15 Qf2 Nc4 16 Bxc4 Bxc4 17 Na4 Be6 18 Nb6 Rc7 19 Qd2 Rc6 20 Nd5 Bxd5 21 exd5 Rc8 22 Qd3 Qd7 23 Nd2 f6 24 gxf6 Rxf6 25 c4 Rf7 26 c5', { a: '⩲', r: 'Bacrot–Lautier, Aix-les-Bains 2003', c: 'Com 15.Qf2 o cavalo das brancas chega a d5 e elas ficam um pouco melhor.' }],
  // Coluna 5
  ['c05', 'q', 'q', '(q)', '10 g4 Nb6 11 g5 Nfd7 12 Nd5 Rc8 13 O-O-O Bxd5 14 exd5 Nc4', { a: '=', r: 'Schneider–Szeberényi, Budapeste 2003', c: 'Com 10.g4 o cavalo das pretas chega a c4 e fica igual.' }],
  ['c05', 'r', 'r', '(r)', '15 Bc4 Be7 16 Ra4 Rb8 17 Qd3 Ra8 18 Qd2 Rb8 19 Nc1 Bd8 20 b3 O-O 21 Na2 e4 22 Nxb4 Re8 23 Kd1', { a: '⩲', r: 'Shirov–Ponomariov, Wijk aan Zee 2007', c: 'As brancas ficam um pouco melhor, embora a posição seja aguda.' }],
  // Coluna 6
  ['c06', 't', 't', '(t)', '15 Rhe1 Nb6 16 Bxb6 Qxb6 17 Nd5 Bxd5 18 exd5 Rh5 19 fxe5', { a: '⩲', r: 'Kramnik–Anand, Melody Amber 2003', c: 'Depois de 15.Rhe1 as brancas ficam um pouco melhor.' }],
  // Coluna 7
  ['c07', 'a-A', 'a', '(a) A', '6... e6', { c: 'Uma resposta comum é 6...e6, que leva à Variante Scheveningen.' }],
  ['c07', 'a-B', 'a', '(a) B', '6... Nbd7 7 g4 d5 8 Nb3 Nxe4 9 Nxd5 Nd6 10 Qe2 e6 11 Bf4 Nb6 12 Nxb6 Qxb6 13 O-O-O', { a: '±', r: 'Sax–Balashov, Baile Herculane 1982', c: 'Com 6...Nbd7 7.g4 d5 8.Nb3! as brancas ficam claramente melhor.' }],
  ['c07', 'b', 'b', '(b)', '7... h6 8 Bc4 Be7 9 O-O O-O 10 Nh4 Qc7 11 Bb3 Nc6 12 Nf5 Bxf5 13 exf5 Na5 14 Nd5 Nxd5 15 Bxd5 Nc4 16 Qd3', { a: '⩲', r: 'Ibarra Jerez–Cheparinov, Andorra 2003', c: 'Com 7...h6 as brancas ficam um pouco melhor.' }],
  ['c07', 'c', 'c', '(c)', '8... Be6 9 Bxe6 fxe6 10 Ng5 Qd7 11 Qf3 d5 12 O-O-O d4 13 Bxd4 exd4 14 e5 Nc6 15 exf6 Bxf6 16 Nce4 Bxg5+ 17 Nxg5 O-O-O 18 Qh3', { a: '⩲', r: 'Hellers–de Firmian, Reykjavík 1990', c: 'Com 8...Be6 as brancas sacrificam o bispo com 13.Bxd4! e ficam um pouco melhor.' }],
  ['c07', 'd', 'd', '(d)', '10 Bxe6 fxe6 11 Na4 Ng4 12 Qd3 Nxe3 13 Qxe3 b5 14 Nb6 Ra7 15 Nd5 Rb7 16 Qd2 Nc6 17 Rad1 Bh4', { a: '=', r: 'Ivanchuk–Topalov, Linares 2007', c: 'Com 10.Bxe6 fica igual.' }],
  ['c07', 'e', 'e', '(e)', '14 Ne1 Nc5 15 Bxc5 dxc5 16 Bxe6 fxe6 17 a4 b4 18 Nb1 Nh5 19 g3 Qg6', { a: '⩲', r: 'Short–Kasparov, Horgen 1995', c: 'Short diz que fica igual, mas a maioria dos jogadores prefere as brancas.' }],
  ['c07-e', '1', 'e', '(e) 13...Rc8', '13... Rc8 14 Nh4 Rxc3 15 bxc3 Nxe4 16 Bxe6 fxe6 17 Qg4 Bxh4', { a: '=', c: 'As pretas devem considerar 13...Rc8: com o sacrifício de qualidade em c3 fica igual.' }],
  // Coluna 8
  ['c08', 'f', 'f', '(f)', '14 Nd2 Rac8 15 Nb3 Nc4 16 Bc1 h6 17 Rd1', { a: '⩲', r: 'Stefansson–Gausel, Olimpíada de Moscou 1994', c: 'Depois de 14.Nd2 as brancas ficam um pouco melhor.' }],
  // Coluna 9
  ['c09', 'g', 'g', '(g)', '10 Qd2 Nc6 11 Nb3 b5 12 f3 Nge5 13 Bf2 Na5 14 Nxa5 Qxa5 15 Nd5 Qxd2+ 16 Kxd2 Rb8 17 c3 Bb7', { a: '=', r: 'Aronian–H. Olafsson, Olimpíada de Yerevan 1996', c: 'Com 10.Qd2 fica igual.' }],
  ['c09-g', '1', 'g', '(g) 12.h4', '12 h4 gxh4 13 Bxh4 Be6', { a: '=', c: 'Com 12.h4 também fica igual.' }],
  ['c09-g', '2', 'g', '(g) 13...Rb8', '13... Rb8 14 Nd4 b4 15 Nd1 Nxd4 16 Bxd4 d5', { a: '∞', r: 'Ivanchuk–Kasparov, Linares 1999', c: 'Ou 13...Rb8 e 16...d5!, com chances para os dois lados.' }],
  ['c09-g', '3', 'g', '(g) 11...f5', '11... f5 12 exf5 Bxf5 13 h4 Qd7 14 O-O-O Nb4 15 Nd4 Rc8 16 a3 Bxd4 17 Qxd4 Nxc2', { a: '∞', r: 'Anand–Gelfand, Biel 1997', c: 'Uma ideia aguda é 11...f5; depois de 16.a3 o livro recomenda 16...Bxd4! 17.Qxd4 Nxc2.' }],
  ['c09', 'h', 'h', '(h)', '11 Nf5 Bxf5 12 exf5 h4 13 Bxh4 Qa5 14 Bxg5 Nxf2 15 Kxf2 Qxf5+', { a: '=', r: 'Balogh–Sakaev, Aeroflot Open 2006', c: 'Com 11.Nf5 as pretas devolvem o material e fica igual.' }],
  ['c09', 'i', 'i', '(i)', '11... hxg4 12 Qd2 Qa5 13 Nb3 Bxc3', { a: '=', r: 'Jwad–Rowson, Bled 2002', c: 'Também é bom 11...hxg4.' }],
  ['c09', 'j', 'j', '(j)', '14 Bf2 e6 15 Nce2 Ne5 16 b3 g4 17 f4 h4 18 Be3 h3 19 g3 Nc6', { a: '=', r: 'Shirov–Kasparov, Linares 1997', c: 'Depois de 14.Bf2 os peões das pretas avançam na ala do rei e fica igual.' }],
  // Coluna 10
  ['c10', 'k', 'k', '(k)', '10... Nf6 11 Qe2 Nc6 12 Nxc6 bxc6 13 e5 dxe5 14 Bxe5 O-O 15 h4 g4 16 g3', { a: '⩲', r: 'Rowson–de Firmian, Selfoss 2003', c: 'Com 10...Nf6 as brancas ficam um pouco melhor.' }],
  ['c10', 'l', 'l', '(l)', '14 fxe6 fxe6 15 Ne3 O-O 16 Be2 Qe7 17 O-O', { a: '⩲', r: 'Kasimdzhanov–Anand, San Luis 2005', c: 'Depois de 14.fxe6 as brancas ficam um pouco melhor.' }],
  // Coluna 11
  ['c11', 'm-A', 'm', '(m) A', '6... e6', { c: 'As linhas com 6...e6 estão nas Variantes Taimanov e Scheveningen.' }],
  ['c11', 'm-B', 'm', '(m) B', '6... g6 7 Bg2 Bg7 8 h3 Qc7 9 Bg5 Nbd7 10 Qd2 Nb6 11 b3', { a: '⩲', r: 'Tal–Hulak, Novi Sad 1974', c: 'Com 6...g6 as brancas ficam um pouco melhor.' }],
  ['c11', 'n', 'n', '(n)', '7... Nbd7 8 a4 b6 9 Bg2 Bb7 10 h3 Be7 11 g4 Nc5 12 Ng3 O-O 13 O-O g6 14 f4 exf4 15 Bxf4', { a: '⩲', r: 'A. Ivanov–Browne, Las Vegas 1996', c: 'Com 7...Nbd7 as brancas ficam um pouco melhor.' }],
  ['c11', 'o-A', 'o', '(o) A', '8 Bg2 Nbd7 9 h3 Be7 10 g4 O-O 11 Ng3 Nc5 12 O-O Bb7 13 Be3 Rc8 14 a3 g6', { a: '=', r: 'Kamsky–Wolff, Campeonato dos EUA 1993', c: 'Com 8.Bg2 fica igual.' }],
  ['c11', 'o-B', 'o', '(o) B', '8 a4 Bb7 9 Bg2 Be7 10 axb5 axb5 11 Rxa8 Bxa8 12 Bg5 Nbd7', { a: '=', r: 'Peters–Tarjan, Campeonato dos EUA 1984', c: 'Com 8.a4 também fica igual.' }],
  ['c11', 'p', 'p', '(p)', '14 Nc6 Qc5 15 Nxe7 Kxe7 16 Qd2 Rhb8 17 Rb1 Rb4 18 Bd3 Rab8 19 O-O a5', { a: '∞', r: 'A. Ivanov–de Firmian, Campeonato dos EUA 1989', c: 'As pretas têm compensação pelo peão com a pressão na ala da dama e o jogo nas casas escuras.' }],
  // Coluna 12
  ['c12', 'q-A', 'q', '(q) A', '7... b5 8 Bg5 Be7 9 Bxf6 Bxf6 10 a4', { a: '±', r: 'Sharapov–Karjakin, Ucrânia 2003', c: 'Com 7...b5 as brancas ficam claramente melhor.' }],
  ['c12-q-A', '1', 'q', '(q) A 8...Nbd7', '8... Nbd7 9 a4 b4 10 Nd5', { a: '±', c: 'Com 8...Nbd7 o cavalo branco chega a d5.' }],
  ['c12', 'q-B', 'q', '(q) B', '7... Nbd7 8 a4 b6 9 Bc4 Bb7 10 Bg5 Be7 11 Qd3 O-O 12 O-O Qc7 13 Rfd1 Rfc8 14 Bxf6 Nxf6 15 Nd2', { a: '⩲', r: 'Kudrin–Vigorito, Filadélfia 1997', c: 'Com 7...Nbd7 as brancas ficam um pouco melhor pelo controle de d5.' }],
  ['c12', 'r', 'r', '(r)', '8... Nbd7 9 a4 b6 10 O-O Bb7 11 Re1 Rc8 12 Nd2 Rc5 13 Nf1 Qa8 14 Qd3 O-O 15 Ne3 g6 16 Nc4 d5', { a: '∞', r: 'P. Popović–Schumi, Viena 1994', c: 'Com 8...Nbd7 e 12...Rc5!? o jogo fica incerto.' }],
  ['c12-r', '1', 'r', '(r) 14.g4', '14 g4 Rxc3', { c: 'Se 14.g4, as pretas respondem 14...Rxc3!.' }],
  ['c12', 's', 's', '(s)', '9... Nbd7 10 a4 b6 11 Re1 Bb7 12 Nd2 Rc8 13 Nf1 Nc5 14 Bg5 Ne6 15 Bxf6 Bxf6 16 Ne3', { a: '±', r: 'P. Popović–Polugaevsky, Sarajevo 1987', c: 'Com 9...Nbd7 o cavalo branco vai de f1 para e3 e as brancas ficam claramente melhor.' }],
  ['c12', 't', 't', '(t)', '14 Be3 b5 15 axb6 Nxb6', { a: '=', r: 'Leko–Topalov, Wijk aan Zee 2006', c: 'Depois de 14.Be3 fica igual.' }],
]

const capitulo = {
  id: 'siciliana-najdorf-a',
  arquivo: 'siciliana-najdorf-a',
  nome: 'Siciliana Najdorf — 6.Be3 e 6.g3',
  fonte: 'Modern Chess Openings — Sicilian Defense, Najdorf Variation (pp. 248–251), colunas 1–12',
  base: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6',
  corPadrao: 'b',
  ordem: 248,
  grupos: [
    { id: 'ingles', nome: 'Ataque Inglês: 6.Be3 e5 7.Nb3 Be6', colunas: [1, 2, 3, 4, 5, 6] },
    { id: 'be3', nome: '6.Be3: 7.Nf3 e 6...Ng4', colunas: [7, 8, 9, 10] },
    { id: 'g3', nome: '6.g3', colunas: [11, 12] },
  ],
}

module.exports = { capitulo, colunas, notas }
