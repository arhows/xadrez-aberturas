// Transcrição do MCO 15ª ed. — Defesa Francesa, Tarrasch com 3...c5: 4.exd5 exd5, 4.exd5 Qxd5 e 4.Ngf3
// (pp. 234–238), colunas 73–84.
// Gerar: node scripts/mco/gerar.cjs francesa-h
// Formato: ver gambito-do-rei.cjs. Dicas em francesa-h-dicas.cjs.

const C = '1 e4 e6 2 d4 d5 3 Nd2 c5'
const E = `${C} 4 exd5 exd5`
const N = `${E} 5 Ngf3 Nc6 6 Bb5 Bd6`
const Q = `${C} 4 exd5 Qxd5 5 Ngf3 cxd4 6 Bc4 Qd6 7 O-O Nf6 8 Nb3 Nc6 9 Nbxd4 Nxd4`

const colunas = {
  c73: [`${N} 7 dxc5 Bxc5 8 O-O Ne7 9 Nb3 Bd6 10 Re1 O-O 11 Bd3 h6 12 h3 Nf5 13 c3 Qf6`, 'exd5', '5.Ngf3 Nc6 … 7.dxc5', '±',
    'Com 3...c5 4.exd5 exd5 as pretas aceitam o peão isolado de d5 em troca de peças ativas. Com 7.dxc5 Bxc5 as brancas bloqueiam d4 e pressionam o peão isolado: vantagem das brancas.'],
  c74: [`${N} 7 O-O cxd4 8 Nb3 Ne7 9 Nbxd4 O-O 10 Be3 Bg4 11 h3 Bh5 12 Qd2 Rc8 13 c3 Bb8`, 'exd5', '5.Ngf3 Nc6 … 7.O-O', '=',
    'Com 7.O-O as pretas trocam em d4 e as brancas retomam com o cavalo, bloqueando o peão isolado. As pretas têm peças ativas: igual.'],
  c75: [`${E} 5 Ngf3 a6 6 Be2 c4 7 O-O Bd6 8 b3 b5 9 a4 Bb7 10 bxc4 bxc4 11 Bxc4 dxc4 12 Nxc4 Be7 13 Re1 Qc7`, 'exd5', '5.Ngf3 a6', '±',
    'Com 5...a6 e ...c4 as pretas ganham espaço no flanco da dama, mas as brancas sacrificam uma peça com 11.Bxc4! e atacam forte o rei preto no centro.'],
  c76: [`${E} 5 Ngf3 Nf6 6 Bb5+ Bd7 7 Bxd7+ Nbxd7 8 O-O Be7 9 dxc5 Nxc5 10 Nb3 Nce4 11 Nfd4 Qd7 12 f3 Nd6 13 Nc5 Qc7`, 'exd5', '5.Ngf3 Nf6', '=',
    'Com 5...Nf6 as pretas aceitam a troca dos bispos de casas claras. Ficam com o peão isolado, mas com peças bem colocadas: igual.'],
  c77: [`${E} 5 Bb5+ Nc6 6 Qe2+ Be7 7 dxc5 Nf6 8 Nb3 O-O 9 Be3 Re8 10 Nf3 a6 11 Bd3 d4 12 Nfxd4 Nxd4 13 Nxd4 Bxc5`, 'bb5', '5.Bb5+ Nc6', '=',
    'Com 5.Bb5+ e 6.Qe2+ as brancas forçam ...Be7 e pegam o peão de c5. As pretas devolvem o peão de d com 11...d4! e ficam com peças ativas: igual.'],
  c78: [`${E} 5 Bb5+ Bd7 6 Qe2+ Be7 7 dxc5 Nf6 8 Nb3 O-O 9 Be3 Re8 10 O-O-O a6 11 Bxd7 Nbxd7 12 Qd2 a5 13 a4 Qc7`, 'bb5', '5.Bb5+ Bd7', '=',
    'Com 5...Bd7 as pretas oferecem a troca dos bispos. Depois de 6.Qe2+ Be7! 7.dxc5 sacrificam o peão de c5 pelo desenvolvimento e ataque no flanco da dama: igual.'],
  c79: [`${Q} 10 Nxd4 Bd7 11 b3 O-O-O 12 Bb2 Qc7 13 Qe2 h5`, 'qxd5', '4...Qxd5 … 10...Bd7', '=',
    'Com 4...Qxd5 as pretas evitam o peão isolado: a dama vai ao centro e as pretas trocam o peão de c por d4. Com 10...Bd7 e roque grande o jogo fica afiado e igual.'],
  c80: [`${Q} 10 Nxd4 a6 11 Re1 Qc7 12 Bb3 Bd6 13 Nf5 Bxh2+`, 'qxd5', '4...Qxd5 … 10...a6 11.Re1', '±',
    'Com 10...a6 11.Re1 Qc7 12.Bb3 Bd6 13.Nf5! as pretas pegam o peão de h2 com xeque, mas as brancas ficam melhor no ataque que se segue.'],
  c81: [`${Q} 10 Nxd4 a6 11 b3 Qc7 12 Bb2 Bd6 13 Nf3 b5`, 'qxd5', '4...Qxd5 … 10...a6 11.b3', '=',
    'Com 11.b3 o bispo vai a b2; as pretas desenvolvem com ...Bd6 e ...b5 e igualam.'],
  c82: [`${Q} 10 Qxd4 Bd7 11 Bf4 Qxd4 12 Nxd4 Rc8 13 Be2 Nd5`, 'qxd5', '4...Qxd5 … 10.Qxd4', '=',
    'Com 10.Qxd4 as damas são trocadas logo; as pretas têm desenvolvimento livre e igualam.'],
  c83: [`${C} 4 Ngf3 Nc6 5 Bb5 dxe4 6 Nxe4 Bd7 7 Bg5 Qa5+ 8 Nc3 a6 9 Bxc6 Bxc6 10 d5 Bxd5 11 O-O Bc6 12 Ne5 Qc7 13 Re1 Nf6`, 'ngf3', '4.Ngf3 Nc6', '=',
    'Com 4.Ngf3 as brancas adiam a troca no centro. Depois de 4...Nc6 5.Bb5 dxe4 as brancas sacrificam o peão de d com 10.d5 e têm compensação: igual.'],
  c84: [`${C} 4 Ngf3 cxd4 5 Nxd4 Nf6 6 exd5 Nxd5 7 N2f3 Be7 8 Bc4 a6 9 O-O b5 10 Bb3 Bb7 11 c3 O-O 12 Re1 Nc6 13 Nf5 Bf6`, 'ngf3', '4.Ngf3 cxd4', '⩲',
    'Com 4...cxd4 5.Nxd4 Nf6 as pretas evitam o peão isolado, mas as brancas ficam com melhor desenvolvimento e um pouco melhor.'],
}

const notas = [
  // Coluna 73
  ['c73', 'a-A', 'a', '(a) A', '6... Qe7+ 7 Be2 cxd4 8 O-O Qd8 9 Nb3 Bd6 10 Nbxd4 Nge7 11 b3 O-O 12 Bb2 Ng6 13 c4', { a: '±', r: 'Tal–Holm, Kapfenberg 1970', c: 'Outros lances não bastam: com 6...Qe7+?! 7.Be2! as brancas ficam melhor.' }],
  ['c73', 'a-B', 'a', '(a) B', '6... a6 7 Bxc6+ bxc6 8 O-O Bd6 9 dxc5 Bxc5 10 Nb3 Bb6 11 Be3 Bxe3 12 Re1', { a: '±', c: 'Com 6...a6 as brancas trocam em c6 e ficam melhor depois de 11.Be3!.' }],
  ['c73', 'a-C', 'a', '(a) C', '6... Bd7 7 O-O Nxd4 8 Nxd4 cxd4 9 Qe2+ Be7 10 Nf3', { a: '±', r: 'Alekhine–Bartoszek, Praga 1943', c: 'Com 6...Bd7 as brancas também ficam melhor.' }],
  ['c73', 'b', 'b', '(b)', '7... Qe7+ 8 Qe2 Bxc5 9 Nb3 Qxe2+ 10 Kxe2 Bb6 11 Be3 Bg4 12 h3 Bh5 13 Bxb6', { a: '±', r: 'Tal–Korchnoi, Campeonato da URSS 1973', c: 'Com 7...Qe7+ as damas são trocadas, e as brancas ficam melhor no final contra o peão isolado.' }],
  ['c73', 'c', 'c', '(c)', '9... Bb6 10 Re1 O-O 11 Be3 Bxe3 12 Rxe3 Bg4 13 h3 Bh5 14 Qd2 Bxf3 15 Rxf3 Qb6 16 a4', { a: '⩲', r: 'McShane–Korchnoi, Reykjavík 2003', c: '9...Bb6 não é tão confiável: as brancas ficam um pouco melhor.' }],
  ['c73', 'd-A', 'd', '(d) A', '10 Nbd4', { c: '10.Nbd4 leva à coluna seguinte.' }],
  ['c73', 'd-B', 'd', '(d) B', '10 Bg5 O-O 11 Bh4 Qb6 12 Bd3 a5 13 a4 Nf5', { a: '=', r: 'Klundt–Korchnoi, Campeonato Europeu Sênior 2006', c: 'Com 10.Bg5 as pretas igualam com 13...Nf5!.' }],
  ['c73', 'd-C', 'd', '(d) C', '10 Bxc6+ bxc6 11 Qd4 O-O 12 Bf4 Nf5 13 Qa4 a5 14 Rfe1 Be6', { a: '=', r: 'Smagin–W. Schmidt, Copenhague 1990', c: 'Com 10.Bxc6+ as pretas ficam com peões dobrados, mas igualam com 13...a5!.' }],
  ['c73', 'e', 'e', '(e)', '11 Bg5 Bg4', { c: 'Uma alternativa importante é 11.Bg5 Bg4, com várias opções para as brancas.' }],
  ['c73-e', 'A', 'e', '(e) A', '12 Bh4 Qc7 13 Bg3 Rad8 14 c3 Nf5 15 Bxd6 Rxd6 16 h3', { a: '±', r: 'Fedorchuk–Vaganian, Bundesliga 2006', c: 'Com 12.Bh4 as brancas ficam melhor.' }],
  ['c73-e', 'B', 'e', '(e) B', '12 h3 Bh5 13 Bxc6 bxc6 14 Nbd4 Rc8 15 c4 h6 16 Bxe7 Bxe7 17 g4 Bg6 18 Ne5 Bc5', { a: '=', r: 'Wolff–Gulko, Nova York 1987', c: 'Com 12.h3 fica igual.' }],
  ['c73-e-B', '1', 'e', '(e) 16.Bh4', '16 Bh4 g5', { c: 'Se 16.Bh4, 16...g5.' }],
  ['c73-e', 'C', 'e', '(e) C', '12 Be2 Re8 13 c3 h6 14 Bh4 Qb6 15 Bxe7 Rxe7 16 Qxd5 Rae8 17 Qd2 a5', { a: '∞', r: 'Psakhis–Vaganian, Moscou 1981', c: 'Com 12.Be2 as pretas entregam o peão de d5 e ficam com jogo ativo.' }],
  ['c73', 'f', 'f', '(f)', '14 Bc2 Rd8 15 Qd3 g6 16 Qd2 Bf8 17 Qf4 Bg7 18 Bd2 g5 19 Qh2', { a: '±', r: 'Adams–Yusupov, Liga Francesa 2005', c: 'Depois de 14.Bc2 as brancas ficam melhor.' }],
  ['c73-f', '1', 'f', '(f) 14...Be6', '14... Be6 15 Qd3 Rfe8 16 Bd2 g6 17 Re2 Bf8 18 Rae1', { a: '±', r: 'Wolff–Benjamin, São Francisco 1991', c: 'Com 14...Be6 também.' }],
  // Coluna 74
  ['c74', 'g', 'g', '(g)', '8 Nxd4 Bxh2+ 9 Kxh2 Qh4+ 10 Kg1 Qxd4', { a: '∓', r: 'Geller–Ivkov, Skopje 1969', c: '8.Nxd4?! permite 8...Bxh2+!, e as pretas ganham um peão.' }],
  ['c74', 'h', 'h', '(h)', '10 c3 Bg4 11 Qa4 Qd7 12 Be3 a6 13 Be2 Nxd4 14 Qxd4 Nc6', { a: '=', r: 'Karpov–Korchnoi, Campeonato Mundial 1974', c: 'Com 10.c3 fica igual.' }],
  ['c74-h', '1', 'h', '(h) 10.Bg5', '10 Bg5 f6 11 Be3 Ne5 12 Re1 a6', { a: '=', c: 'Com 10.Bg5 f6 também.' }],
  ['c74', 'i', 'i', '(i)', '14 Bf4 Bxf4 15 Qxf4 Bxf3 16 Nxf3 Qb6 17 Bxc6 bxc6', { a: '=', r: 'Kunzelman–Schwarz, correspondência 1989', c: 'Depois de 14.Bf4 fica igual. A linha é mais confortável para as brancas, mas não dá vantagem significativa.' }],
  // Coluna 75
  ['c75', 'j', 'j', '(j)', '6 dxc5 Bxc5 7 Nb3 Ba7 8 Bg5 Nf6 9 Qe2+ Be6 10 Nbd4 Qe7 11 O-O-O O-O 12 Nf5', { a: '±', r: 'Jansa–Andersson, Interzonal de Biel 1985', c: 'As brancas também ficam melhor com o simples 6.dxc5.' }],
  ['c75-j', '1', 'j', '(j) 8...Ne7', '8... Ne7 9 Qd2 O-O 10 O-O-O', { a: '±', c: 'Com 8...Ne7 também.' }],
  ['c75', 'k', 'k', '(k)', '6... Nf6 7 O-O Be7 8 dxc5 Bxc5 9 Nb3 Ba7 10 Bg5 O-O 11 c3 Re8 12 Nfd4', { a: '⩲', r: 'Pavasovic–Tkachiev, Liga Austríaca 2006', c: 'Menos comprometedor é 6...Nf6, mas as brancas ficam um pouco melhor.' }],
  ['c75', 'l', 'l', '(l)', '8... cxb3 9 axb3 Ne7 10 Re1 O-O 11 Nf1 Nbc6 12 Ne3 Bf4 13 c3 Re8 14 Bd3 Be6 15 Ra2', { a: '⩲', r: 'Molchanova–Grabuzova, Liga Russa 2004', c: 'Mais seguro é 8...cxb3: as brancas ficam só um pouco melhor.' }],
  ['c75', 'm', 'm', '(m)', '9... c3 10 axb5 cxd2 11 Bxd2', { c: 'Com 9...c3?! 10.axb5! cxd2 11.Bxd2 as brancas têm grande compensação pela peça.' }],
  ['c75', 'n', 'n', '(n)', '14 Rb1 Qxc4 15 Rxb7 Nc6 16 Nd2 Qxd4 17 Bb2 Qxa4 18 Re4 Qa2 19 Bxg7 O-O-O 20 Rb3 Bf6 21 Qg4+ Kc7 22 Qf4+ Kc8 23 Bxf6 Nxf6 24 Qxf6 Qxc2 25 Qf5+', { a: '+-', r: 'Geller–Dreev, Nova York 1990', c: 'As pretas estão sob ataque forte. Na partida, depois de 16.Nd2! e 25.Qf5+, as pretas abandonaram.' }],
  // Coluna 76
  ['c76', 'o', 'o', '(o)', '5... c4 6 b3 cxb3 7 axb3 Bb4 8 Ne5 Ne7 9 Bd3 Nbc6 10 O-O Bc3 11 Ra4 Bxd4 12 Nxc6 Nxc6 13 Ba3 Be6 14 Nf3 Bb6 15 Qa1', { a: '∞', r: 'Carlsen–P. Nikolić, Wijk aan Zee 2005', c: 'Com 5...c4 as pretas ganham um peão, mas as brancas têm chances de ataque como compensação.' }],
  ['c76', 'p-A', 'p', '(p) A', '10 Nd4 Qd7 11 Qf3 O-O 12 N2b3 Nce4 13 Qf5 Rfc8 14 Re1 Bf8 15 c3', { a: '⩲', r: 'Kasparov–Kharitonov, Campeonato da URSS 1988', c: 'Com 10.Nd4 as brancas ficam com uma vantagem mínima.' }],
  ['c76-p-A', '1', 'p', '(p) 13.Nf5', '13 Nf5 Bd8', { a: '=', c: 'Com 13.Nf5 Bd8! fica igual.' }],
  ['c76', 'p-B', 'p', '(p) B', '10 Re1 O-O 11 Nf1 Re8 12 Be3 a5 13 Re2 b5 14 Bd4 Ne6', { a: '=', r: 'Rozentalis–Bareev, Olimpíada de Elista 1998', c: 'Com 10.Re1 fica mais ou menos igual.' }],
  ['c76', 'q', 'q', '(q)', '14 Nd3 O-O 15 b3 Rad8 16 Be3 Rc8 17 Qd2 Bd8 18 Bf2 Qa5', { a: '=', r: 'Navara–Socko, Bundesliga 2006', c: 'Depois de 14.Nd3 as pretas igualam com 17...Bd8!. (O livro escreve 16...Rac8, mas a torre de a8 já foi para d8: é a torre de d8 que vai a c8, liberando d8 para o bispo.)' }],
  ['c76-q', '1', 'q', '(q) 15.c3', '15 c3', { c: 'Também se pode jogar 15.c3!?.' }],
  // Coluna 77
  ['c77', 'r', 'r', '(r)', '6 Ne2 Nf6 7 O-O Bd6 8 dxc5 Bxc5 9 Nb3 Bb6 10 Ned4 O-O 11 Nxc6 bxc6 12 Bxc6 Ng4', { a: '-+', r: 'Yudasin–Vaganian, URSS 1982', c: 'Com 6.Ne2 as pretas rocam com 10...O-O!; depois de 12.Bxc6?! Ng4! ameaçam 13...Qh4 com ataque mortal.' }],
  ['c77', 's', 's', '(s)', '6... Qe7 7 dxc5 Qxe2+ 8 Nxe2 Bxc5 9 Nb3 Bb6 10 Bd2 Bd7 11 Bc3 f6 12 O-O Nge7 13 Bd4', { a: '±', r: 'segundo Keres', c: 'Com 6...Qe7 as damas são trocadas, e as brancas ficam com o melhor final.' }],
  ['c77-s', '1', 's', '(s) 10...Ne7', '10... Ne7 11 Bb4', { a: '±', r: 'Euwe–Botvinnik, 1948', c: 'Com 10...Ne7 também (o livro escreve Nge7, mas o cavalo de c6 está cravado).' }],
  ['c77', 't', 't', '(t)', '9 Nf3 Re8 10 Be3 Ne4', { c: 'Com 9.Nf3 Re8 10.Be3 Ne4 as pretas recuperam o peão de c5 com bom jogo. (O livro numera 10.Nf3 Re8 11.Be3: aqui o cavalo sai no 9º lance, no lugar de 9.Be3.)' }],
  ['c77', 'u', 'u', '(u)', '14 c3 Ng4 15 O-O Qh4 16 h3 Nxe3 17 fxe3 Bxh3 18 gxh3 Bxd4 19 cxd4 Qg3+ 20 Kh1 Rxe3 21 Bxh7+', { a: '=', r: 'Brynell–Schmidt, Næstved 1988', c: 'Depois de 14.c3 as pretas sacrificam o bispo em h3, e a partida termina em xeque perpétuo: igual.' }],
  // Coluna 78
  ['c78', 'v', 'v', '(v)', '8 Ngf3 O-O 9 O-O Bxc5 10 Nb3 Re8 11 Qd3 Bb6 12 Bg5 Bxb5 13 Qxb5 Qd7', { a: '=', r: 'Pokorna–Medic, Istambul 2003', c: 'Com 8.Ngf3 também fica igual.' }],
  ['c78', 'w', 'w', '(w)', '9 Bg5 Re8 10 O-O-O a5 11 a4 Na6 12 Nh3 Nc7 13 Bxd7 Qxd7 14 Qe5 Ne6 15 Bxf6 Bxf6 16 Qxd5 Qxa4', { a: '∓', r: 'Dvoirys–Gruenberg, Sochi 1983', c: 'Com 9.Bg5 vem 10...a5!: o peão de a dá às pretas boas chances de ataque.' }],
  ['c78', 'x', 'x', '(x)', '10 Nf3 a6 11 Bd3 a5 12 a4 Ng4 13 O-O Na6 14 c6 Bxc6 15 Bd4 Nb4', { a: '=', r: 'Karpov–Bareev, Tilburg 1994', c: 'Com 10.Nf3 também fica igual. A coluna é Robatsch–Spassky, Beverwijk 1967.' }],
  // Coluna 79
  ['c79', 'a', 'a', '(a)', '5... Nc6 6 Bc4 Qd8 7 dxc5 Bxc5 8 O-O Nf6 9 Qe2 Qc7 10 Ne4 Be7 11 Re1 Bd7 12 b3 O-O-O 13 Bb2', { a: '±', r: 'Nunn–Levitt, Londres 1983', c: 'Com 5...Nc6 as brancas ficam melhor.' }],
  ['c79', 'b-A', 'b', '(b) A', '6... Qc5 7 Qe2 Nc6 8 Nb3 Qb6 9 O-O Nge7 10 Rd1 Nf5 11 Bd3 Nd6 12 a4 a6 13 a5 Qa7 14 Ra4 Nb5 15 Bxb5 axb5 16 Raxd4 Nxd4 17 Nfxd4', { a: '±', r: 'Beliavsky–P. Nikolić, Wijk aan Zee 1984', c: 'Tentar manter o peão a mais com 6...Qc5 dá problemas: as brancas ficam melhor.' }],
  ['c79', 'b-B', 'b', '(b) B', '6... Qd8 7 O-O a6 8 Nb3 Qc7 9 Bd3 Nc6 10 Nbxd4 Nxd4 11 Nxd4 Bd6 12 h3 Ne7 13 Re1 O-O 14 Qh5 Ng6 15 Nf3', { a: '⩲', r: 'Adams–Dreev, Londres 1995', c: 'Com 6...Qd8 as brancas ficam com iniciativa no flanco do rei.' }],
  ['c79', 'c', 'c', '(c)', '7 Qe2 Nf6 8 Nb3 Nc6 9 Bg5 Qb4+ 10 Bd2 Qb6 11 O-O-O Bd7', { a: '=', r: 'Oleksenko–Ni Hua, Balagne 2007', c: 'Também é possível rocar grande, com 7.Qe2: igual.' }],
  ['c79', 'd', 'd', '(d)', '9 Re1 Bd7 10 g3 Qc7 11 Bf4 Bd6 12 Bxd6 Qxd6', { a: '=', r: 'Bensiek–Michel, correspondência 1989', c: '9.Re1 cria poucos problemas para as pretas: igual.' }],
  ['c79-d', '1', 'd', '(d) 10.Nbxd4', '10 Nbxd4', { a: '=', c: 'Com 10.Nbxd4 também fica igual.' }],
  ['c79', 'e-A', 'e', '(e) A', '11 c3 Qc7 12 Qe2 Bd6 13 Nb5 Bxb5 14 Bxb5+ Ke7 15 g3 Rhd8 16 Re1 Kf8 17 Qf3', { a: '±', r: 'Adams–Seirawan, Bermudas 2000', c: 'Uma alternativa importante é 11.c3: as brancas ficam melhor.' }],
  ['c79-e-A', '1', 'e', '(e) 11...O-O-O', '11... O-O-O 12 Qe2 Qc7 13 a4', { a: '±', c: 'Com 11...O-O-O vem 13.a4!.' }],
  ['c79-e-A', '2', 'e', '(e) 12...Be7', '12... Be7 13 Nb5 Qb8 14 g3', { a: '⩲', r: 'Adams–Glek, Places 1996', c: 'Com 12...Be7 as brancas ficam um pouco melhor.' }],
  ['c79', 'e-B', 'e', '(e) B', '11 Bb3 Be7 12 Bg5 O-O 13 Re1 Rfd8 14 c3 Qc5 15 Bh4 b5', { a: '=', r: 'Ivanchuk–M. Gurevich, Campeonato da URSS 1988', c: 'Com 11.Bb3 fica igual.' }],
  ['c79', 'f', 'f', '(f)', '11... Be7 12 a4 Qc7 13 Re1 O-O 14 Bb2 Bd6 15 h3 a6 16 Qf3', { a: '⩲', r: 'Stromberg–Nordstrom, Suécia 1994', c: 'Menos afiado é 11...Be7: as brancas ficam um pouco melhor.' }],
  ['c79', 'g', 'g', '(g)', '14 h3 Ng4 15 Nf3 Bc6 16 Ne5 Ba3 17 Bxa3 Nxe5', { a: '=', r: 'Estrada Nieto–Matamoros, Guayaquil 2003', c: 'Depois de 14.h3 Ng4! fica igual.' }],
  // Coluna 80
  ['c80', 'h', 'h', '(h)', '11... Bd7 12 Bb3 O-O-O 13 Be3 Qc7 14 Qe2 Kb8 15 h3 Bc5 16 Rad1', { a: '±', r: 'Pavasović–Kovačević, Liburnija 2006', c: 'Com 11...Bd7 e roque grande as brancas ficam melhor.' }],
  ['c80', 'i', 'i', '(i)', '12... Bd7 13 Qf3 Bd6 14 h3 O-O-O 15 Bd2 Bc6 16 Nxc6 Bh2+ 17 Kh1 Rxd2 18 Nb4', { a: '±', r: 'Marciano–Goldewicht, Utasellato 1991', c: 'As pretas podem evitar as complicações com 12...Bd7, mas as brancas continuam melhor.' }],
  ['c80', 'j-A', 'j', '(j) A', '14 Kh1 Kf8 15 Qd4 h6 16 g3 exf5 17 Bf4 Qc6+ 18 Kxh2', { a: '±', r: 'Beliavsky–Hertneck, Munique 1991', c: 'Depois de 14.Kh1 há duas defesas. 14...Kf8?! deixa as brancas melhor.' }],
  ['c80-j-A', '1', 'j', '(j) 15...exf5', '15... exf5 16 Qxf6', { a: '±', c: 'Se 15...exf5, 16.Qxf6!.' }],
  ['c80', 'j-B', 'j', '(j) B', '14 Kh1 O-O 15 Nxg7 Rd8 16 Qf3 Kxg7 17 Bh6+ Kg6 18 c3 Nh5 19 Bc1 Bf4 20 g4 Ng3+ 21 fxg3 Bxc1 22 Raxc1 Bd7 23 Kh2 Bc6 24 Qe3 Qe7 25 Rf1', { a: '⩲', r: 'Pavlov–Alexeev, Simferopol 2003', c: 'Com 14...O-O as brancas recuperam a peça e ficam um pouco melhor depois de 19.Bc1!.' }],
  ['c80-j-B', '1', 'j', '(j) 19...f5', '19... f5 20 g4 b5 21 gxh5+ Kg7 22 Qg2+', { a: '±', r: 'Adams–McDonald, Inglaterra 1997', c: 'Com 19...f5 20.g4! as brancas ficam melhor.' }],
  // Coluna 81
  ['c81', 'k', 'k', '(k)', '11 a4 Qc7 12 Qe2 Bd6 13 h3 O-O 14 Rd1 b6 15 Bg5 Bh2+ 16 Kh1 Be5', { a: '=', r: 'Ljubojević–Hübner, Wijk aan Zee 1988', c: 'Com 11.a4 fica igual.' }],
  ['c81', 'l', 'l', '(l)', '12 Qe2 Bc5 13 Bb2 O-O 14 Rad1 b5 15 Bd3 Bb7 16 Nf3 Qf4', { a: '=', r: 'Kotronias–Kindermann, Debrecen 1989', c: 'Com 12.Qe2 as pretas não têm dificuldades.' }],
  ['c81', 'm', 'm', '(m)', '14 Bd3 Bb7 15 h3 O-O 16 Qe2 h6 17 Ne5 Rfd8 18 f4 Bc5+ 19 Kh2 Bd4', { a: '=', r: 'Tal–Hübner, Bruxelas 1987', c: 'Depois de 14.Bd3 fica igual.' }],
  // Coluna 82
  ['c82', 'n', 'n', '(n)', '10... Qxd4 11 Nxd4 a6 12 Be2 Bd7 13 Bf4 Nd5 14 Bg3 Bc5 15 Rfd1', { a: '⩲', r: 'van der Wiel–Chernin, Wijk aan Zee 1986', c: 'A troca imediata das damas com 10...Qxd4 dá às brancas uma pequena vantagem.' }],
  ['c82-n', '1', 'n', '(n) 11...Bd7', '11... Bd7 12 Be2 Bc5 13 Nb3 Bb6 14 Bd2', { a: '⩲', r: 'Tiviakov–Chernin, Podolsk 1993', c: 'Com 11...Bd7 também.' }],
  ['c82', 'o', 'o', '(o)', '14 Bg3 Bc5 15 Nb3 Bb6 16 c4 Ne7 17 Rfd1 Nf5', { a: '=', r: 'Womacka–Luther, Dresden 1987', c: 'Depois de 14.Bg3 fica igual.' }],
  // Coluna 83
  ['c83', 'p', 'p', '(p)', '5... cxd4 6 Nxd4 Bd7 7 Nxc6 Bxc6 8 Bxc6+ bxc6 9 c4 Bc5 10 O-O Ne7', { a: '=', c: 'Igualmente bom é 5...cxd4.' }],
  ['c83-p', '1', 'p', '(p) 9...Nf6', '9... Nf6 10 Qa4 Qd7 11 e5', { c: '9...Nf6?! 10.Qa4 Qd7?! 11.e5 é pior para as pretas.' }],
  ['c83', 'q', 'q', '(q)', '7 dxc5 Qa5+ 8 Nc3 Bxc5 9 O-O Nf6 10 Bg5 Rd8 11 Bxf6 gxf6 12 a3 Be7', { a: '=', r: 'Sutovsky–Luther, Campeonato Europeu por Equipes 2003', c: 'Com 7.dxc5 fica igual.' }],
  ['c83', 'r', 'r', '(r)', '8... cxd4 9 Nxd4 Bb4 10 O-O Bxc3 11 bxc3 Qxc3 12 Nf5 exf5 13 Re1+ Be6 14 Qd6 a6 15 Bd2 Qxc2 16 Bb4', { a: '+-', r: 'Tal–Uhlmann, Moscou 1971', c: 'Com 8...cxd4 9.Nxd4 Bb4?! as pretas sofreram uma catástrofe: 12.Nf5! e 15.Bd2! ganham.' }],
  ['c83', 's', 's', '(s)', '14 Bxf6 gxf6 15 Nxc6 Qxc6 16 Qh5 Be7', { a: '=', r: 'Gibbs–Roels, correspondência 1988', c: 'As brancas têm só compensação pelo peão: igual.' }],
  // Coluna 84
  ['c84', 't-A', 't', '(t) A', '4... a6', { c: 'Há transposições: 4...a6 leva a 3...a6 (coluna 70).' }],
  ['c84', 't-B', 't', '(t) B', '4... Nf6 5 e5 Nfd7', { c: '4...Nf6 5.e5 Nfd7 leva a 3...Nf6 4.e5.' }],
  ['c84', 't-C', 't', '(t) C', '4... Nf6 5 exd5 exd5', { c: '4...Nf6 5.exd5 exd5 leva a 4.exd5 exd5 (coluna 76).' }],
  ['c84', 'u', 'u', '(u)', '5 exd5 Qxd5 6 Bc4', { c: 'As brancas podem jogar 5.exd5 Qxd5 6.Bc4, chegando a 4.exd5 Qxd5 (coluna 79).' }],
  ['c84', 'v', 'v', '(v)', '6 e5 Nfd7 7 N2f3 Nc6 8 Nxc6 bxc6 9 Bd3 Ba6 10 O-O Bxd3 11 Qxd3 Be7 12 c4 O-O', { a: '=', r: 'Svidler–Dreev, Rostov 1993', c: 'Com 6.e5 as pretas trocam o bispo ruim com 9...Ba6! e igualam.' }],
  ['c84', 'w', 'w', '(w)', '14 Bxd5 exf5 15 Bf4', { a: '⩲', r: 'Timman–Levitt, Memorial Staunton 2006', c: 'Depois de 14.Bxd5 as brancas ficam um pouco melhor.' }],
]

const capitulo = {
  id: 'francesa-h',
  arquivo: 'francesa-h',
  nome: 'Francesa — Tarrasch, 3...c5',
  fonte: 'Modern Chess Openings — French Defense (pp. 234–238), colunas 73–84',
  base: '1. e4 e6 2. d4 d5 3. Nd2 c5',
  corPadrao: 'b',
  ordem: 234,
  grupos: [
    { id: 'exd5', nome: '4.exd5 exd5 5.Ngf3', colunas: [73, 74, 75, 76] },
    { id: 'bb5', nome: '4.exd5 exd5 5.Bb5+', colunas: [77, 78] },
    { id: 'qxd5', nome: '4.exd5 Qxd5', colunas: [79, 80, 81, 82] },
    { id: 'ngf3', nome: '4.Ngf3', colunas: [83, 84] },
  ],
}

module.exports = { capitulo, colunas, notas }
