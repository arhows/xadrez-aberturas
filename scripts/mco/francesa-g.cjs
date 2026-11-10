// Transcrição do MCO 15ª ed. — Defesa Francesa, Tarrasch: 3...Nf6 linha principal, 3...Nf6 4.e5 Nfd7 5.f4
// e terceiros lances raros (pp. 230–233), colunas 61–72.
// Gerar: node scripts/mco/gerar.cjs francesa-g
// Formato: ver gambito-do-rei.cjs. Dicas em francesa-g-dicas.cjs.

const B = '1 e4 e6 2 d4 d5 3 Nd2'
const T = `${B} Nf6 4 e5 Nfd7 5 Bd3 c5 6 c3`
const NE = `${T} Nc6 7 Ne2 cxd4 8 cxd4`
const F4 = `${B} Nf6 4 e5 Nfd7 5 f4 c5 6 c3 Nc6`

const colunas = {
  c61: [`${NE} f6 9 exf6 Nxf6 10 O-O Bd6 11 Nf3 Qc7 12 Bg5 O-O 13 Bh4 e5 14 dxe5 Nxe5`, 'ne2', '7.Ne2 … 11.Nf3 Qc7', '±',
    'Esta é a linha principal da Tarrasch com 3...Nf6: depois de 4.e5 Nfd7 5.Bd3 c5 6.c3 Nc6 7.Ne2 as pretas trocam em d4 e quebram com ...f6. Ficam com o peão isolado de d5 e peças ativas; com 11...Qc7 e ...e5 as brancas ficam melhor.'],
  c62: [`${NE} f6 9 exf6 Nxf6 10 O-O Bd6 11 Nf3 O-O 12 Bf4 Bxf4 13 Nxf4 Ne4 14 g3 g5`, 'ne2', '7.Ne2 … 11.Nf3 O-O', '=',
    'Com 11...O-O as pretas trocam os bispos de casas escuras e ocupam e4 com o cavalo: igual.'],
  c63: [`${NE} f6 9 Nf4 Nxd4 10 Qh5+ Ke7 11 exf6+ Nxf6 12 Ng6+ hxg6 13 Qxh8 Kf7 14 O-O e5`, 'ne2', '7.Ne2 … 9.Nf4', '=',
    'Com 9.Nf4 as brancas abrem mão do centro para atacar: depois de 12.Ng6+ hxg6 13.Qxh8 ganham a qualidade, mas as pretas têm um peão e o centro: igual.'],
  c64: [`${NE} Qb6 9 Nf3 f6 10 exf6 Nxf6 11 O-O Bd6 12 Nc3 O-O 13 Be3 Bd7 14 a3 Be8`, 'ne2', '7.Ne2 … 8...Qb6', '=',
    'Com 8...Qb6 as pretas pressionam d4 antes de quebrar com ...f6. O bispo vai a e8 e depois a h5 ou g6: igual.'],
  c65: [`${T} Nc6 7 Ngf3 Qb6 8 O-O cxd4 9 cxd4 Nxd4 10 Nxd4 Qxd4 11 Nf3 Qb6 12 Qa4 Qb4 13 Qc2 Qc5 14 Bxh7 b6`, 'outras6', '7.Ngf3 Qb6', '=',
    'Com 7.Ngf3 as brancas entregam o peão de d4 para ganhar tempo. As pretas devolvem o peão de h7 e se defendem com calma: igual.'],
  c66: [`${T} b6 7 Ne2 Ba6 8 Bxa6 Nxa6 9 O-O b5 10 a4 b4 11 c4 Nc7 12 Nf4 Be7 13 cxd5 exd5 14 dxc5 Nxc5`, 'outras6', '6...b6', '±',
    'Com 6...b6 as pretas trocam o bispo ruim de casas claras por ...Ba6, mas o centro se abre e as brancas ficam melhor.'],
  c67: [`${F4} 7 Ndf3 cxd4 8 cxd4 Qb6 9 g3 Bb4+ 10 Kf2 g5 11 Be3 g4 12 Nd2 f6`, 'f4', '5.f4 … 7...cxd4', '=',
    'Com 5.f4 as brancas reforçam e5 com peões. As pretas atacam o centro com ...cxd4, ...Qb6 e ...g5 e igualam nas complicações.'],
  c68: [`${F4} 7 Ndf3 Qa5 8 Be3 b5 9 dxc5 b4 10 Nd4 Qxc5 11 Qa4 Bb7 12 Bb5 Ncb8`, 'f4', '5.f4 … 7...Qa5', '±',
    'Com 7...Qa5 e ...b5 as pretas atacam no flanco da dama, mas depois de 12...Ncb8 o certo é 13.Kf2!, com vantagem das brancas.'],
  c69: [`${F4} 7 Ngf3 a5 8 Bb5 Qb6 9 Qa4 cxd4 10 Nxd4 Nc5 11 Qc2 Bd7 12 Bxc6 bxc6`, 'f4', '5.f4 … 7.Ngf3', '∓',
    'Com 7.Ngf3 o cavalo de d2 fica no lugar; 10.Nxd4?! é impreciso, e as pretas ficam um pouco melhor.'],
  c70: [`${B} a6 4 Ngf3 c5 5 dxc5 Bxc5 6 Bd3 Nc6 7 O-O Nge7 8 c3 O-O 9 Re1 Ng6 10 exd5 exd5 11 Nb3 Be7 12 h3`, 'raras', '3...a6 4.Ngf3', '⩲',
    'Com 3...a6 as pretas esperam e evitam Bb5. Depois de 5.dxc5 Bxc5 ficam com o peão isolado de d5, e as brancas um pouco melhor.'],
  c71: [`${B} a6 4 e5 Bd7 5 Ngf3 Bb5 6 Be2 Bxe2 7 Qxe2 c5 8 dxc5 Bxc5 9 O-O Nc6 10 c4 Nge7 11 cxd5 Nxd5 12 Qc4 Be7`, 'raras', '3...a6 4.e5', '⩲',
    'Com 4.e5 Bd7 as pretas trocam o bispo ruim por ...Bb5, mas com 10.c4! as brancas abrem o jogo e ficam um pouco melhor.'],
  c72: [`${B} Be7 4 Ngf3 Nf6 5 e5 Nfd7 6 Bd3 c5 7 c3 b6 8 Qe2 cxd4 9 cxd4 a5 10 Nf1 Ba6 11 Bxa6 Rxa6 12 Ng3 Ra7`, 'raras', '3...Be7', '⩲',
    'Com 3...Be7 as pretas esperam que as brancas se comprometam. Elas trocam o bispo ruim por ...Ba6, mas as brancas ficam um pouco melhor.'],
}

const notas = [
  // Coluna 61
  ['c61', 'a', 'a', '(a)', '7... f6 8 Nf4 Qe7 9 exf6 Qxf6 10 Nf3 Bd6 11 Nh5 Qe7 12 O-O Nf6 13 Nxf6+ gxf6 14 Re1', { a: '±', r: 'Spiegel–C. Mann, Liga Alemã 2002', c: 'Também dá para adiar a troca em d4 com 7...f6, mas as brancas ficam melhor.' }],
  ['c61-a', '1', 'a', '(a) 10...cxd4', '10... cxd4 11 O-O', { c: 'Se 10...cxd4, 11.O-O!.' }],
  ['c61', 'b', 'b', '(b)', '9... Qxf6 10 Nf3 h6 11 O-O Bd6 12 Be3 O-O 13 Bc2', { a: '⩲', r: 'Berg–Olsson, Campeonato Sueco 2005', c: 'Retomar com 9...Qxf6 deixa as brancas um pouco melhor.' }],
  ['c61', 'c', 'c', '(c)', '11 f4 Qb6 12 Nf3 O-O 13 Kh1 Bd7 14 a3 Ne7 15 Nc3 Nf5 16 Ne5 Be8 17 g4 Ne7 18 Qe2 Rd8', { a: '∞', r: 'Rodin–Smirov, Campeonato Russo de Clubes 1995', c: 'Merece atenção 11.f4!?: as brancas têm chances de iniciativa numa posição de dois gumes.' }],
  ['c61', 'd-A', 'd', '(d) A', '12 Nc3 a6 13 Bg5 O-O 14 Bh4 Nh5 15 Re1 g6 16 Bg5 Qg7 17 Be3 Bd7 18 Bf1 h6 19 g3 Be8 20 Bg2 g5', { a: '=', r: 'Rogić–Beliavsky, Portorož 1996', c: 'Com 12.Nc3 a6 13.Bg5 as pretas igualam com 15...g6!.' }],
  ['c61', 'd-B', 'd', '(d) B', '12 g3 O-O 13 Bf4 Bd7 14 Rc1 Rae8 15 Qd2', { a: '⩲', r: 'Brynell–Gleizerov, Estocolmo 2000', c: 'Com 12.g3 as brancas ficam um pouco melhor.' }],
  ['c61', 'e', 'e', '(e)', '13 Rc1 Ng4 14 Ng3 g6 15 Nd2 Nf6 16 Nb3', { a: '⩲', r: 'Brynell–Hedman, Copa Rilton 2006', c: 'Com 13.Rc1 as brancas também ficam um pouco melhor.' }],
  ['c61', 'f', 'f', '(f)', '13... Nh5 14 Qc2 h6 15 Bg6', { a: '⩲', c: '13...Nh5 14.Qc2 h6 15.Bg6 deixa as brancas um pouco melhor.' }],
  ['c61-f', '1', 'f', '(f) 15...Rxf3', '15... Rxf3 16 gxf3 Bxh2+ 17 Kh1 Nf4 18 Ng3', { a: '⩲', c: 'Depois de 15...Rxf3 as brancas continuam um pouco melhor.' }],
  ['c61-f', '2', 'f', '(f) 15...Nf4', '15... Nf4 16 Nxf4 Bxf4 17 Rfe1', { a: '⩲', c: 'Com 15...Nf4 também.' }],
  ['c61', 'g', 'g', '(g)', '15 Nxe5 Bxe5 16 Bg3 Bxg3 17 Nxg3 Qb6 18 Qd2 Bd7 19 h3 Rad8 20 Rfe1', { a: '±', r: 'G. Shahade–Sarkar, Nova York 2002', c: 'Depois de 15.Nxe5 as brancas trocam peças e ficam melhor contra o peão isolado.' }],
  // Coluna 62
  ['c62', 'h', 'h', '(h)', '13... Qd6 14 g3 e5 15 dxe5 Nxe5 16 Nxe5 Qxe5 17 Qb3', { a: '±', r: 'Timman–Kuijf, Campeonato Holandês 1987', c: 'Com 13...Qd6 as brancas ficam melhor.' }],
  ['c62', 'i-A', 'i', '(i) A', '14 Ne2 Rxf3 15 gxf3 Ng5 16 Kh1 e5 17 dxe5 Nxf3 18 Bxh7+ Kh8 19 Ng1 Ncd4 20 Nxf3 Bg4 21 Nxd4 Bxd1 22 Raxd1 Kxh7', { a: '=', r: 'Maze–Apicella, Campeonato Francês 2004', c: 'As brancas têm outras opções. Com 14.Ne2 vem 14...Rxf3!, e o jogo fica igual.' }],
  ['c62-i-A', '1', 'i', '(i) 16.f4', '16 f4 Nf3+ 17 Kg2 Qh4 18 Kxf3 Qh3+ 19 Ng3 e5', { a: '∞', c: 'Com 16.f4 a posição fica confusa.' }],
  ['c62', 'i-B', 'i', '(i) B', '14 Qc1 Ng5 15 Nxg5 Qxg5 16 Ne2 Qxc1 17 Raxc1 a6 18 a3 Bd7 19 Rc5 Rac8 20 Rfc1 Na7 21 Rc7 Bc6', { a: '=', r: 'De la Riva–De La Villa, Pamplona 1998', c: 'Com 14.Qc1 as damas são trocadas: igual.' }],
  ['c62', 'j', 'j', '(j)', '15 Nh5 Bd7 16 Ne5 Be8', { a: '=', r: 'Rublevsky–Ulibin, Campeonato Russo 2003', c: 'Depois de 15.Nh5 Bd7 16.Ne5 Be8 fica igual.' }],
  // Coluna 63
  ['c63', 'k', 'k', '(k)', '9 f4 fxe5 10 fxe5 Nxd4', { a: '∓', c: 'As brancas não conseguem manter o centro de peões: com 9.f4 fxe5 10.fxe5?! Nxd4 as pretas ganham um peão sem compensação suficiente.' }],
  ['c63', 'l', 'l', '(l)', '9... Qe7 10 Nf3 fxe5 11 dxe5 Ndxe5 12 Nxe5 Nxe5 13 Qh5+ Nf7 14 O-O g6 15 Qe2 Bg7 16 Bb5+ Kf8 17 Be3', { a: '∞', r: 'C. Horvath–Hoang Thanh Trang, Budapeste 2002', c: 'Com 9...Qe7 as pretas ganham um peão, mas as brancas têm boa compensação. (O livro numera o xeque como 12.Qh5+; é o 13º lance.)' }],
  ['c63', 'm', 'm', '(m)', '13... e5 14 Nf3 Nxf3+ 15 gxf3 Bf5 16 Bxf5 gxf5 17 Bg5 Qa5+ 18 Kf1 e4 19 Qh3', { a: '±', r: 'Kholmov–Jurek, Decin 1996', c: '13...e5!? 14.Nf3 deixa as brancas melhor nas complicações.' }],
  ['c63-m', '1', 'm', '(m) 14.Bxg6', '14 Bxg6 e4 15 O-O Ne2+ 16 Kh1 Nf4', { c: '14.Nf3 é mais seguro que 14.Bxg6.' }],
  ['c63', 'n', 'n', '(n)', '14 Qh4 e5 15 Nf3 Nxf3+ 16 gxf3 Bf5 17 Bxf5 gxf5 18 Bg5 Qa5+ 19 Kf1 g6', { a: '=', r: 'Ni Hua–Wang Hao, China 2003', c: 'Com 14.Qh4 também fica igual.' }],
  ['c63', 'o', 'o', '(o)', '15 Nb3 Nxb3 16 axb3 Bf5 17 Bxf5 gxf5 18 Bg5 Bc5 19 Qh3 Qd7', { a: '=', r: 'Unzicker–Libeau, Münster 1994', c: 'Depois de 15.Nb3 as pretas trocam peças e igualam.' }],
  ['c63-o', '1', 'o', '(o) 15.Nf3', '15 Nf3 Nxf3+', { a: '=', c: 'Com 15.Nf3 Nxf3+ também fica igual.' }],
  // Coluna 64
  ['c64', 'p', 'p', '(p)', '8... Nb6 9 a3 a5 10 b3 Bd7 11 O-O Rc8 12 Bb2 Be7 13 f4', { a: '±', r: 'Estrin–Arapović, Lublin 1978', c: 'Com 8...Nb6 as brancas avançam f4 e ficam melhor.' }],
  ['c64', 'q', 'q', '(q)', '13 a3 Bd7 14 Bg5 Kh8 15 Na4 Qc7 16 Rc1 Be8 17 Qd2 Ng4', { a: '=', r: 'Christiansen–Akobian, Nova York 2003', c: 'Com 13.a3 também fica igual.' }],
  ['c64', 'r', 'r', '(r)', '15 Ng5 Ne7 16 Qc2 Bg6 17 g3 Rfe8', { a: '=', r: 'Barua–Neelotpal, Doha 2003', c: 'Depois de 15.Ng5 o bispo vai a g6 e fica igual.' }],
  // Coluna 65
  ['c65', 's', 's', '(s)', '8... Be7 9 Re1 g5 10 Nf1 cxd4', { a: '∞', c: 'Também é possível recusar o peão: 8...Be7 9.Re1 g5!? leva a posições confusas.' }],
  ['c65', 't', 't', '(t)', '12... Be7 13 Qg4 g6 14 h4', { c: '12...Be7 13.Qg4 g6 14.h4 dá às brancas um ataque perigoso no flanco do rei pelo peão.' }],
  ['c65', 'u', 'u', '(u)', '15 Bf4 Ba6 16 Rfc1 Qxc2 17 Bxc2 Nc5', { a: '=', r: 'Furman–Uhlmann, Polanica Zdrój 1967', c: 'A defesa calma das pretas tira a força do sacrifício de peão: igual.' }],
  ['c65-u', '1', 'u', '(u) 14.Qe2', '14 Qe2 Qb6', { a: '=', c: 'As brancas podem tentar 14.Qe2 Qb6, mas não passam da igualdade.' }],
  // Coluna 66
  ['c66', 'v-A', 'v', '(v) A', '7 Nh3 Ba6 8 Bxa6 Nxa6 9 O-O Nc7 10 Qg4 f5', { a: '=', r: 'Brynell–Yusupov, Copa Rilton 2003', c: 'Com 7.Nh3 fica igual.' }],
  ['c66', 'v-B', 'v', '(v) B', '7 f4 Ba6 8 Bb1 cxd4 9 cxd4 Nc6 10 Ndf3 Qc7 11 Be3 Bb4+ 12 Kf2 Rc8 13 f5', { a: '⩲', r: 'Licina–Horvath, Moscou 1994', c: 'Com 7.f4!? as brancas evitam a troca dos bispos e ganham iniciativa no flanco do rei.' }],
  ['c66', 'w', 'w', '(w)', '9... Nc7 10 Nf4 Be7 11 Qg4 g6 12 Re1 Qc8 13 c4 dxc4 14 Nxc4 O-O 15 dxc5', { a: '±', r: 'Kestler–Keene, Mannheim 1975', c: 'Com 9...Nc7 as brancas também ficam melhor.' }],
  ['c66', 'x', 'x', '(x)', '10 Nf4 Be7 11 Qg4 g6 12 Nf3 c4 13 h4 h5 14 Qg3', { a: '±', r: 'Rublevsky–Kosyrev, Rússia 2005', c: 'As brancas também mantêm vantagem com 10.Nf4.' }],
  ['c66', 'y', 'y', '(y)', '15 Nb3 O-O 16 Be3 N5e6 17 Nxe6 Nxe6 18 f4 g6 19 f5', { a: '±', r: 'Rozentalis–Shabalov, Nova York 1997', c: 'Depois de 15.Nb3 e f4–f5 as brancas ficam melhor.' }],
  // Coluna 67
  ['c67', 'a', 'a', '(a)', '4 Bd3 c5 5 exd5 Qxd5', { a: '=', c: 'Com 4.Bd3 c5 5.exd5 Qxd5 fica igual.' }],
  ['c67-a', '1', 'a', '(a) 5.dxc5', '5 dxc5 dxe4', { a: '=', c: 'Com 5.dxc5 dxe4 também.' }],
  ['c67', 'b', 'b', '(b)', '4... Ne4 5 Bd3 f5 6 exf6 Nxf6 7 Ngf3 Bd6 8 O-O O-O 9 Re1 c5 10 dxc5 Bxc5 11 Nb3 Bb6 12 Nbd4', { a: '±', r: 'Anand–Mariotti, Olimpíada de Salônica 1988', c: 'Com 4...Ne4 as brancas ficam melhor.' }],
  ['c67-b', '1', 'b', '(b) 5...Nxd2', '5... Nxd2 6 Bxd2 c5 7 dxc5', { a: '⩲', c: 'Com 5...Nxd2 as brancas ficam um pouco melhor.' }],
  ['c67', 'c', 'c', '(c)', '5 Ngf3 c5 6 c3 Nc6 7 Bd3', { c: 'Com 5.Ngf3 c5 6.c3 Nc6 7.Bd3 se chega à coluna 65.' }],
  ['c67', 'd', 'd', '(d)', '7... Qb6', { c: 'Joga-se muito 7...Qb6, adiando a troca dos peões; raramente faz diferença.' }],
  ['c67', 'e-A', 'e', '(e) A', '9 h4 Be7 10 g3 a5 11 Kf2 a4 12 Ne2 f6 13 Kg2 O-O 14 h5 a3 15 b3 f5', { a: '∞', r: 'Adams–Dimitrov, Elenite 1993', c: 'O 9.h4 de Spassky pode ser respondido com 9...Be7!, com chances para os dois lados.' }],
  ['c67', 'e-B', 'e', '(e) B', '9 Ne2 f6 10 g3 Bb4+', { a: '=', c: 'Com 9.Ne2 fica igual.' }],
  ['c67', 'f-A', 'f', '(f) A', '11 h3 gxf4 12 Bxf4 f6', { a: '=', r: 'Fernandes–Dias, Lisboa 2000', c: 'Com 11.h3 fica igual.' }],
  ['c67', 'f-B', 'f', '(f) B', '11 fxg5 Ndxe5 12 Nxe5 Nxe5 13 Be3 Nc4', { a: '=', c: 'Com 11.fxg5 também.' }],
  ['c67', 'f-C', 'f', '(f) C', '11 Ne2 f6 12 exf6 gxf4 13 f7+ Kxf7 14 Kg2 Rf8', { a: '∞', r: 'Kempen–Gibbs, correspondência 1994', c: 'Com 11.Ne2 a posição fica confusa.' }],
  ['c67', 'g', 'g', '(g)', '13 a3 fxe5 14 fxe5 Rf8+ 15 Kg2 Bxd2 16 Qxd2 Ncxe5 17 dxe5 d4 18 Bxd4 Qc6+ 19 Nf3 gxf3+', { a: '=', r: 'Furhoff–A. Olsson, Estocolmo 2002', c: 'Depois de 13.a3 as pretas abrem a coluna f e igualam.' }],
  // Coluna 68
  ['c68', 'h', 'h', '(h)', '8 Kf2 Be7 9 Bd3 Qb6 10 Ne2 f6 11 exf6 Bxf6', { a: '=', r: 'Reshevsky–Vaganian, Skopje 1976', c: 'O antigo 8.Kf2 cria poucos problemas para as pretas.' }],
  ['c68', 'i', 'i', '(i)', '8... cxd4 9 Nxd4 Nxd4 10 Bxd4 Nb8 11 Nf3 Nc6 12 Be3 Bd7 13 Bd3', { a: '±', r: 'Solak–Kosyrev, Internet 2002', c: 'Com 8...cxd4 as brancas ficam com vantagem simples.' }],
  ['c68', 'j', 'j', '(j)', '10 a3 b3 11 Ne2 Bxc5 12 Bxc5 Nxc5 13 Ned4 Nxd4 14 Nxd4', { a: '⩲', r: 'Dolmatov–Prandstetter, Hradec Králové 1981', c: 'Com 10.a3 as brancas ficam um pouco melhor.' }],
  ['c68-j', '1', 'j', '(j) 11.Qxb3', '11 Qxb3 Bxc5', { a: '∞', c: 'Com 11.Qxb3 Bxc5 a posição fica confusa.' }],
  ['c68', 'k', 'k', '(k)', '13 Nge2 bxc3 14 bxc3 a6', { a: '∞', r: 'Schandorff–Knudsen, Århus 1983', c: 'Na partida veio 13.Nge2?!, com posição confusa.' }],
  ['c68-k', '1', 'k', '(k) 13.Kf2', '13 Kf2 bxc3 14 Nxe6', { a: '±', c: 'As brancas deveriam jogar 13.Kf2 bxc3 14.Nxe6, com clara vantagem nas complicações.' }],
  // Coluna 69
  ['c69', 'l', 'l', '(l)', '7... Qb6 8 Nb3 cxd4 9 cxd4 a5 10 a4 Bb4+ 11 Kf2 f6 12 Be3 O-O', { a: '=', r: 'Steinitz–Schiffers, Rússia 1896', c: 'Com 7...Qb6 também fica igual.' }],
  ['c69', 'm', 'm', '(m)', '10 cxd4 Na7 11 Bd3 Qb4', { a: '=', c: 'As brancas deveriam aceitar a igualdade com 10.cxd4. A coluna é Palmiotto–Bascetta, correspondência 1989.' }],
  // Coluna 70
  ['c70', 'n', 'n', '(n)', '4... Nf6 5 Bd3 c5 6 exd5 exd5 7 dxc5 Bxc5 8 Nb3 Qe7+ 9 Qe2', { a: '⩲', r: 'Tiviakov–Zhukova, Valle d\'Aosta 2002', c: 'Com 4...Nf6 as brancas ficam um pouco melhor.' }],
  ['c70-n', '1', 'n', '(n) 6...Qxd5', '6... Qxd5', { c: 'Provavelmente é melhor 6...Qxd5.' }],
  ['c70', 'o', 'o', '(o)', '6... Nf6 7 O-O dxe4 8 Nxe4 Be7 9 Qe2 Nbd7 10 c4 O-O 11 Bg5', { a: '±', r: 'Gelfand–Dolmatov, Moscou 1989', c: 'Com 6...Nf6 as brancas ficam claramente melhor. A coluna é Speelman–Schussler, Olimpíada de Salônica 1988: as pretas não tiveram compensação pelo peão isolado.' }],
  // Coluna 71
  ['c71', 'p', 'p', '(p)', '4... c5 5 c3 Nc6 6 Ndf3 Bd7 7 Bd3 Rc8 8 Ne2 cxd4 9 Nexd4 Nge7 10 Qe2 Nxd4 11 Nxd4 Nc6 12 O-O Qc7 13 Nxc6 Bxc6 14 Re1', { a: '±', r: 'Aronin–Shamkovich, URSS 1952', c: 'Com 4...c5 as brancas ficam melhor.' }],
  ['c71-p', '1', 'p', '(p) 7.dxc5', '7 dxc5 Bxc5 8 Bd3 Nge7', { a: '=', c: '7.dxc5?! Bxc5 deixa igual.' }],
  ['c71', 'q', 'q', '(q)', '5 Ne2 c5 6 Nf3 Bb5 7 c3 Nc6 8 Be3 cxd4 9 Nexd4 Bxf1 10 Kxf1 Nge7', { a: '=', r: 'Oll–Topalov, Ibercaja 1992', c: 'Com 5.Ne2 as pretas igualaram rápido.' }],
  ['c71', 'r', 'r', '(r)', '13 Qg4 O-O 14 Ne4', { a: '⩲', c: 'Depois de 13.Qg4 O-O 14.Ne4 as brancas ficam um pouco melhor.' }],
  ['c71-r', '1', 'r', '(r) 11.Rd1', '11 Rd1 O-O 12 Ne4 Qb6', { a: '=', r: 'Lau–Eingorn, Palma de Maiorca 1989', c: 'A coluna melhora 11.Rd1 O-O 12.Ne4 Qb6!, que deixou igual.' }],
  // Coluna 72
  ['c72', 's', 's', '(s)', '3... dxe4 4 Nxe4', { c: '3...dxe4 4.Nxe4 é a Variante Rubinstein. Os outros terceiros lances raros das pretas são suspeitos.' }],
  ['c72', 's-A', 's', '(s) A', '3... f5 4 exf5 exf5 5 Ndf3 Nf6 6 Bd3 Bd6 7 Ne2 O-O 8 O-O', { a: '±', r: 'Psakhis–Shilov, URSS 1978', c: '3...f5?! deixa as brancas melhor depois de 5.Ndf3!.' }],
  ['c72', 's-B', 's', '(s) B', '3... b6 4 Ngf3 Be7 5 Bd3 dxe4 6 Nxe4 Bb7 7 O-O Nf6 8 Qe2 O-O 9 Bf4 Nbd7 10 Rad1', { a: '±', r: 'Hellers–Kekki, Campeonato Nórdico 1985', c: 'Com 3...b6 as brancas também ficam melhor.' }],
  ['c72', 't', 't', '(t)', '13 h4 h6 14 Nh5 g6 15 Nf4 Qc8 16 Be3 Bb4+ 17 Kf1', { a: '⩲', r: 'Ehlvest–Lputian, Interzonal de Manila 1993', c: 'Depois de 13.h4 as brancas ficam um pouco melhor.' }],
]

const capitulo = {
  id: 'francesa-g',
  arquivo: 'francesa-g',
  nome: 'Francesa — Tarrasch, 3...Nf6 e lances raros',
  fonte: 'Modern Chess Openings — French Defense (pp. 230–233), colunas 61–72',
  base: '1. e4 e6 2. d4 d5 3. Nd2',
  corPadrao: 'b',
  ordem: 230,
  grupos: [
    { id: 'ne2', nome: '3...Nf6 4.e5 Nfd7 5.Bd3 c5 6.c3 Nc6 7.Ne2', colunas: [61, 62, 63, 64] },
    { id: 'outras6', nome: '3...Nf6 … 6.c3: 7.Ngf3 e 6...b6', colunas: [65, 66] },
    { id: 'f4', nome: '3...Nf6 4.e5 Nfd7 5.f4', colunas: [67, 68, 69] },
    { id: 'raras', nome: '3...a6 e 3...Be7', colunas: [70, 71, 72] },
  ],
}

module.exports = { capitulo, colunas, notas }
