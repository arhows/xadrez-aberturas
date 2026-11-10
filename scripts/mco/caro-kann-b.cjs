// Transcrição do MCO 15ª ed. — Caro-Kann, 4...Nd7 (pp. 178–182), colunas 13–24.
// Gerar: node scripts/mco/gerar.cjs caro-kann-b
// Formato: ver gambito-do-rei.cjs. Dicas em caro-kann-b-dicas.cjs.

const B4 = '1 e4 c6 2 d4 d5 3 Nc3 dxe4 4 Nxe4 Nd7'
const BD = `${B4} 5 Bd3 Ngf6 6 Ng5 e6 7 N1f3`
const BC = `${B4} 5 Bc4 Ngf6 6 Ng5 e6 7 Qe2 Nb6`

const colunas = {
  c13: [`${BD} Bd6 8 Qe2 h6 9 Ne4 Nxe4 10 Qxe4 Nf6 11 Qe2 Qc7 12 Bd2 b6 13 O-O-O Bb7`, 'bd3', '5.Bd3 … 10...Nf6', '=',
    'Com 4...Nd7 as pretas preparam ...Ngf6 sem aceitar peões dobrados depois de Nxf6+. O plano das brancas com 5.Bd3 e 6.Ng5 é agressivo, mas com jogo cuidadoso as pretas igualam.'],
  c14: [`${BD} Bd6 8 Qe2 h6 9 Ne4 Nxe4 10 Qxe4 Qc7 11 O-O b6 12 Qg4 Kf8 13 b3 Bb7`, 'bd3', '5.Bd3 … 10...Qc7', '=',
    'Com 10...Qc7 as pretas deixam o cavalo em d7; com 12...Kf8 defendem g7 e igualam.'],
  c15: [`${BD} h6 8 Nxe6 fxe6 9 Bg6+ Ke7 10 Bf4 Qa5+ 11 c3 Kd8 12 O-O Be7 13 Re1 Nf8`, 'bd3', '7...h6 8.Nxe6!', '⩲',
    'Com 7...h6 as pretas convidam o sacrifício de cavalo em e6. As brancas ficam com as melhores chances, mas é fácil errar com elas.'],
  c16: [`${B4} 5 Ng5 Ndf6 6 N1f3 Bg4 7 h3 Bxf3 8 Nxf3 e6 9 g3 Bd6 10 Bg2 Ne7 11 O-O O-O 12 Qe2 Qc7 13 c4 b6`, 'ng5-ng3', '5.Ng5 Ndf6', '⩲',
    'Com 5...Ndf6 as pretas evitam a coluna 13, mas cedem o par de bispos e as brancas ficam um pouco melhor.'],
  c17: [`${B4} 5 Nf3 Ngf6 6 Ng3 e6 7 Bd3 c5 8 O-O cxd4 9 Nxd4 Bc5 10 c3 O-O 11 Bc2 Re8 12 Bg5 a6 13 Qf3 Bxd4`, 'ng5-ng3', '5.Nf3 Ngf6 6.Ng3 e6', '=',
    'Com 6.Ng3 as brancas evitam a troca de cavalos; as pretas abrem o jogo com ...c5 e igualam.'],
  c18: [`${B4} 5 Nf3 Ngf6 6 Ng3 c5 7 dxc5 e6 8 b4 b6 9 Be2 bxc5 10 b5 Bb7 11 O-O Qc7 12 c4 Bd6 13 Qd2 Ne5`, 'ng5-ng3', '5.Nf3 Ngf6 6.Ng3 c5', '=',
    'Com 6...c5 as pretas atacam o centro de imediato e igualam.'],
  c19: [`${B4} 5 Nf3 Ngf6 6 Nxf6+ Nxf6 7 Ne5 Be6 8 Be2 g6 9 O-O Bg7 10 c4 O-O 11 Be3 Ne4 12 f4 Nd6 13 b3 Qc7`, 'nf3', '5.Nf3 Ngf6 6.Nxf6+ Nxf6 7.Ne5 Be6', '=',
    'Com 6.Nxf6+ as brancas trocam os cavalos; com o fianqueto do bispo de f8 as pretas igualam.'],
  c20: [`${B4} 5 Nf3 Ngf6 6 Nxf6+ Nxf6 7 Ne5 Nd7 8 Bf4 Nxe5 9 Bxe5 Qd5 10 c4 Qa5+ 11 Qd2 Qxd2+ 12 Kxd2 Bf5 13 Bd3 Bxd3`, 'nf3', '5.Nf3 … 7...Nd7', '=',
    'Com 7...Nd7 as pretas trocam o cavalo de e5 e as damas: um final igual.'],
  c21: [`${BC} 8 Bb3 h6 9 N5f3 a5 10 c3 c5 11 a3 Qc7 12 Nh3 Bd7 13 O-O cxd4`, 'bc4', '5.Bc4 … 9...a5', '=',
    'Com 5.Bc4 e 6.Ng5 as brancas miram e6 e f7; com 7...Nb6 as pretas expulsam o bispo e igualam.'],
  c22: [`${BC} 8 Bb3 h6 9 N5f3 c5 10 Bf4 Nbd5 11 Be5 Qa5+ 12 Nd2 b5 13 dxc5 Bxc5`, 'bc4', '5.Bc4 … 9...c5', '=',
    'Com 9...c5 e 10...Nbd5 as pretas trocam o centro e igualam.'],
  c23: [`${BC} 8 Bd3 h6 9 N5f3 c5 10 dxc5 Bxc5 11 Ne5 Nbd7 12 Ngf3 Qc7 13 O-O O-O`, 'bc4', '5.Bc4 … 8.Bd3', '⩲',
    'Com 8.Bd3 o bispo fica na diagonal do roque preto; as brancas ficam um pouco melhor.'],
  c24: [`${B4} 5 Bc4 Ngf6 6 Nxf6+ Nxf6 7 c3 Qc7 8 Qb3 e6 9 Nf3 Bd6 10 Bg5 Nd5 11 O-O b6 12 Rfe1 O-O 13 Qc2 h6`, 'bc4', '5.Bc4 Ngf6 6.Nxf6+', '=',
    'Com 6.Nxf6+ e 8.Qb3 as brancas pressionam f7 e b7, mas as pretas igualam.'],
}

const notas = [
  // Coluna 13
  ['c13', 'a', 'a', '(a)', '5... Ndf6 6 Ng5 Bg4 7 N1f3 Bh5 8 c3 e6 9 Qb3 Qc7 10 Ne5 Bd6 11 h3', { a: '⩲', r: 'van der Wiel–Karpov, Amsterdã 1988', c: 'Com 5...Ndf6 as brancas ficam um pouco melhor.' }],
  ['c13-a', '1', 'a', '(a) 7...h6?', '7... h6 8 Nxf7 Bxf3 9 Bg6 Qa5+ 10 Bd2', { a: '+-', c: '7...h6? perde.' }],
  ['c13-a', '2', 'a', '(a) 7...e6', '7... e6 8 h3', { a: '±', c: 'Com 7...e6 as brancas ficam melhor.' }],
  ['c13-a', '3', 'a', '(a) 8...Qc7', '8... Qc7 9 Qc2 h6 10 Ne6 Qd6 11 Nxf8', { a: '±', c: 'Com 8...Qc7 vem 10.Ne6!.' }],
  ['c13', 'b-A', 'b', '(b) A', '6... h6 7 Ne6 Qa5+ 8 Bd2 Qb6 9 Nf3 fxe6 10 Bg6+ Kd8 11 O-O c5 12 c4 cxd4 13 Nxd4 e5 14 c5 Nxc5 15 Ba5 exd4 16 Qxd4+ Ncd7 17 Bxb6+ axb6 18 Rac1 e5 19 Qc4 Bc5 20 Rfd1 Rf8 21 b4 Bd4 22 Rxd4', { a: '+-', r: 'Tal–Oll, URSS 1986', c: '6...h6? foi castigado com dureza: as pretas abandonaram.' }],
  ['c13-b-A', '1', 'b', '(b) 9.Nxf8', '9 Nxf8', { a: '±', c: 'Também 9.Nxf8 é bom.' }],
  ['c13-b-A', '2', 'b', '(b) 22...exd4', '22... exd4 23 Qc7+ Ke7 24 Re1+', { a: '+-', c: 'Se 22...exd4, 23.Qc7+ e 24.Re1+.' }],
  ['c13', 'b-B', 'b', '(b) B', '6... g6 7 N1f3 Bg7 8 Qe2 O-O 9 h4 h6 10 h5 Nxh5 11 g4 Nhf6 12 Ne6 fxe6 13 Qxe6+', { a: '±', r: 'Dizdarević–Menken, Hessen 1994', c: 'Com 6...g6 as brancas atacam.' }],
  ['c13', 'c', 'c', '(c)', '8 O-O h6 9 Ne4 Nxe4 10 Bxe4 O-O 11 c3 c5 12 Bc2 Qc7 13 Re1 Rd8 14 h3 Nf6 15 Qe2 cxd4 16 Nxd4 Bh2+ 17 Kh1 Bf4', { a: '=', r: 'Kamsky–Karpov, Tilburg 1991', c: 'As brancas não ganham nada se não forçarem a iniciativa.' }],
  ['c13', 'd', 'd', '(d)', '11 Qh4 Ke7 12 Ne5 Bxe5 13 dxe5 Qa5+ 14 c3 Qxe5+ 15 Be3 b6 16 O-O-O Rd8 17 h3 Qa5', { a: '=', r: 'Visweswaran–Koneru, Goodricke Open 2002', c: '11.Qh4 Ke7!? (ameaçando 12...g5!) dá chances iguais.' }],
  ['c13', 'e', 'e', '(e)', '11... c5 12 dxc5 Bxc5 13 Bd2 Qb6 14 O-O-O Bd7 15 Ne5', { a: '±', r: 'Benjamin–Orlov, Campeonato dos EUA 1994', c: 'Com 11...c5 as brancas ficam melhor.' }],
  ['c13', 'f', 'f', '(f)', '14 Ne5 O-O-O 15 f4 Kb8 16 Rhf1 c5 17 dxc5 Bxc5 18 g4 Nd5', { a: '=', r: 'Sutovsky–Aaberg, Gibraltar 2006', c: 'Talvez 16.Kb1 e 17.a3 seja um plano melhor.' }],
  ['c13-f', '1', 'f', '(f) 14...c5', '14... c5 15 Bb5+ Ke7 16 dxc5 Qxc5 17 a3 a5 18 Bc3', { a: '⩲', c: 'Com 14...c5 as brancas ficam um pouco melhor.' }],
  // Coluna 14
  ['c14', 'g', 'g', '(g)', '10... c5 11 O-O Nf6 12 Qh4 cxd4 13 Re1 Bd7 14 Nxd4 Qa5 15 Be3 g5 16 Qh3 O-O-O 17 Qf3', { a: '⩲', r: 'Kramnik–Ponomariov, Mtel Masters 2005', c: 'Com 10...c5 as brancas ficam um pouco melhor.' }],
  ['c14', 'h', 'h', '(h)', '11 Qg4 Kf8 12 O-O c5 13 b3 e5 14 c3 exd4 15 cxd4 Ne5 16 Qe4 Nxf3+ 17 Qxf3 Bxh2+', { a: '=', r: 'Bacrot–Bologan, Saint Vincent 2005', c: 'Com 11.Qg4 também fica igual.' }],
  ['c14', 'i', 'i', '(i)', '12... g5 13 Qh3 Rg8 14 Re1 g4 15 Qxh6 gxf3 16 Rxe6+', { a: '±', r: 'Anand–Bologan, Dortmund 2003', c: 'Com 12...g5 13.Qh3 Rg8 14.Re1! as brancas têm esse plano.' }],
  ['c14', 'j', 'j', '(j)', '14 Bb2 Nf6 15 Qh4 Nd5 16 Rfe1 Nf4', { a: '=', r: 'Anand–Wojtaszek, Bundesliga 2007', c: 'Ou 14.Bb2, também igual.' }],
  // Coluna 15
  ['c15', 'k-A', 'k', '(k) A', '7... Qc7 8 Qe2 h6 9 Bg6 hxg5 10 Bxf7+ Kd8 11 Nxg5 Nb6 12 g3', { a: '±', r: 'van der Wiel–Karpov, Amsterdã 1987', c: 'Com 7...Qc7?! as brancas ficam melhor.' }],
  ['c15', 'k-B', 'k', '(k) B', '7... Be7 8 O-O h6 9 Ne4 Nxe4 10 Bxe4 Nf6 11 Bd3 O-O 12 Bf4 c5 13 dxc5 Bxc5 14 Qe2', { a: '⩲', r: 'Khalifman', c: 'Com 7...Be7 as brancas ficam um pouco melhor.' }],
  ['c15-k-B', '1', 'k', '(k) 8.Qe2', '8 Qe2 h6 9 Nxe6 fxe6 10 Bg6+ Kf8 11 O-O Nb6 12 Ne5', { a: '∞', r: 'Z. Almasi–Kumaran, Kópavogur 1994', c: 'Ou 8.Qe2, com compensação pelo cavalo.' }],
  ['c15', 'l', 'l', '(l)', '8... Qe7 9 O-O fxe6 10 Bg6+ Kd8 11 Bf4 b5 12 a4 Bb7 13 Re1 Nd5 14 Bg3 Kc8 15 axb5 cxb5 16 Qd3 Bc6 17 Bf5 exf5 18 Rxe7 Bxe7 19 c4', { a: '+-', r: 'Deep Blue–Kasparov, Nova York 1997', c: 'Com 8...Qe7 o ataque é ainda mais forte. Kasparov abandonou nesta posição, a última partida do match contra o Deep Blue.' }],
  ['c15-l', '1', 'l', '(l) 19...bxc4', '19... bxc4 20 Qxc4 Kb7 21 Qa6#', { c: 'As pretas podiam lutar, mas viram 19...bxc4?! 20.Qxc4 Kb7 21.Qa6 mate.' }],
  ['c15', 'm', 'm', '(m)', '10 O-O Qc7 11 Re1 Kd8 12 c4 Bb4 13 Re2 Nf8 14 Ne5 Nxg6 15 Nxg6 Re8', { a: '∓', r: 'Wolff–Granda Zúñiga, Nova York 1992', c: 'Com 10.O-O as brancas perderam o rumo.' }],
  ['c15-m', '1', 'm', '(m) 12.Rxe6', '12 Rxe6 Bd6 13 Re1 Nf8', { a: '∓', c: 'Se 12.Rxe6, 12...Bd6 13.Re1 Nf8 e as pretas ficam melhor.' }],
  ['c15-m', '2', 'm', '(m) 14.Bc2', '14 Bc2', { a: '∞', c: '14.Ne5? foi o erro; 14.Bc2 era melhor.' }],
  ['c15', 'n', 'n', '(n)', '14 Bd3 Bd7 15 Ne5 Kc8 16 b4 Qb6 17 Nf7 Nd5 18 Bg3 Rg8 19 c4 Nxb4 20 Be4 Be8 21 Nd6+ Bxd6 22 Bxd6 a5 23 a3 Na6 24 Qf3', { a: '±', r: 'McDonald–Summerscale, Londres 1994', c: 'O domínio do tabuleiro compensa a peça a menos. O sacrifício 8.Nxe6 dá às brancas as melhores chances, mas é fácil errar com elas.' }],
  // Coluna 16
  ['c16', 'o', 'o', '(o)', '5... Ngf6 6 Bd3', { c: 'O lance mais comum é 5...Ngf6 6.Bd3, transpondo para a coluna 13. Também 6.Bd3 depois de 5...Ndf6 transpõe para a nota (a).' }],
  ['c16', 'p', 'p', '(p)', '6 Bc4 e6 7 Ne2 c5 8 O-O h6 9 Nf3 a6 10 a4 cxd4 11 Nexd4 Bd6 12 Qe2 Ne7 13 Ne5 Qc7', { a: '=', r: 'de Firmian–Karpov, Biel 1990', c: 'Com 6.Bc4 as pretas igualam com ...c5.' }],
  ['c16', 'q', 'q', '(q)', '6... h6 7 Nxf7 Kxf7 8 Ne5+ Ke8 9 Bd3', { a: '+-', c: '6...h6? perde.' }],
  ['c16', 'r', 'r', '(r)', '14 b3 Rad8 15 Bb2 Rfe8 16 Rad1', { a: '⩲', r: 'de Firmian–A. Fernandes, Nova York 1993', c: 'Ou 14.b3, e as brancas ficam um pouco melhor.' }],
  // Coluna 17
  ['c17', 's', 's', '(s)', '8... Be7 9 Qe2 O-O 10 Rd1 Qc7 11 c4 cxd4 12 Nxd4 a6 13 b3 Re8 14 Bb2', { a: '⩲', r: 'Kasparov–Karpov, Amsterdã 1988', c: 'Com 8...Be7 as brancas ficam um pouco melhor.' }],
  ['c17', 't', 't', '(t)', '10... Bxd4 11 cxd4 O-O 12 Bg5 h6 13 Bf4 Nb6 14 Bc2 Nbd5 15 Be5 Qb6 16 Qd3 Nb4 17 Qd2 Nxc2 18 Bxf6 Nxa1 19 Nh5 e5 20 dxe5 g5 21 e6 Qxe6 22 h3 Qf5 23 Rxa1 Be6 24 Re1 Qg6 25 g4 Rac8 26 Bc3 Rfd8 27 Qe3 Rd3 28 Qe5 Rcxc3 29 bxc3 Kh7 30 Nf6+ Kg7 31 Nd5+ Kh7 32 Ne7', { a: '+-', r: 'Tal–Flesch, Lvov 1981', c: 'Depois de 15.Be5 as brancas já ficam um pouco melhor. Uma obra-prima de Tal: com uma torre a menos ele joga calmamente pelas casas do roque, e as pretas abandonaram.' }],
  ['c17', 'u', 'u', '(u)', '14 cxd4 Qa5 15 Be3 Qd5 16 Qe2 b6 17 Bb3 Qd6 18 Qf3 Ra7', { a: '=', r: 'Taulbut–Speelman, Hastings 1981', c: 'Depois de 14.cxd4 as pretas igualam.' }],
  // Coluna 18
  ['c18', 'v', 'v', '(v)', '6... g6 7 Bc4 Nb6 8 Bb3 Bg7 9 O-O O-O 10 h3 a5 11 a4', { a: '⩲', r: 'Farago–Szabo, Budapeste 1996', c: 'Com 6...g6 as brancas ficam com uma vantagem mínima.' }],
  ['c18', 'w', 'w', '(w)', '7 Bd3 cxd4 8 O-O g6 9 Nxd4 Bg7 10 Re1 O-O', { a: '=', r: 'Zapata–Spiridonov, Moscou 1989', c: 'Com 7.Bd3 as pretas igualam com o fianqueto.' }],
  ['c18', 'x', 'x', '(x)', '8 c6 bxc6 9 Be2 Be7 10 O-O Qb6 11 Rb1 O-O', { a: '=', r: 'Ye Jiangchuan–Karpov, Shenyang 2000', c: 'Com 8.c6 também fica igual.' }],
  ['c18', 'y', 'y', '(y)', '14 Nxe5 Bxe5 15 Bb2 Bxb2', { a: '=', r: 'Beshukov–Huzman, Biel 2002', c: 'Os bispos se trocam e o jogo fica igual.' }],
  // Coluna 19
  ['c19', 'a', 'a', '(a)', '7 c3 Bg4 8 h3 Bxf3 9 Qxf3 e6 10 Bc4 Be7 11 O-O Nd5 12 Be3 Qb6 13 Qe2 O-O', { a: '=', r: 'Kasparov–Karpov, Campeonato Mundial 1987', c: '7.Bc4 leva a posições da coluna 24.' }],
  ['c19', 'b', 'b', '(b)', '10 c3 O-O 11 Re1 Nd7 12 Nd3 Bc4 13 Bg5 Re8 14 Bf1 Bxd3 15 Bxd3 Bf6 16 Bxf6 Nxf6', { a: '=', r: 'Browne–Loftsson, Lone Pine 1976', c: 'Com 10.c3 as pretas igualam.' }],
  ['c19', 'c', 'c', '(c)', '11... Nd7 12 Nf3 Bg4 13 h3 Bxf3 14 Bxf3 Qc7 15 Qc2', { a: '⩲', r: 'Mithrankanth–Speelman, Goodricke Open 1999', c: 'Sem 11...Ne4 as pretas não igualam.' }],
  ['c19', 'd', 'd', '(d)', '14 Qd2 Rad8', { a: '=', r: 'Warakomski–Wojtaszek, Czech Open 2006', c: 'Ou 14.Qd2 Rad8, igual.' }],
  // Coluna 20
  ['c20', 'e', 'e', '(e)', '7... Bf5 8 c3 e6 9 g4 Bg6 10 h4', { a: '⩲', c: 'Com 7...Bf5?! as pretas ficam com problemas para o bispo de casas brancas.' }],
  ['c20', 'f', 'f', '(f)', '8 Nd3 g6 9 c3 Bg7 10 Be2 e5 11 dxe5 Nxe5 12 Nxe5 Qxd1+ 13 Bxd1 Bxe5', { a: '=', r: 'Leko–Karpov, Belgrado 1996', c: 'Com 8.Nd3 as damas saem e fica igual.' }],
  ['c20', 'g', 'g', '(g)', '9... Qb6 10 Bd3 f6 11 Bg3 Be6 12 Qe2 Bf7 13 O-O e6 14 c3 O-O-O 15 Bc4 Re8 16 b4 h5 17 h4 Rg8 18 Qf3 Be7 19 a4 g5 20 a5 Qd8 21 a6 gxh4 22 axb7+ Kxb7 23 Rxa7+', { a: '+-', r: 'Larsen–Rogoff, Lone Pine 1978', c: '9...Qb6?! 10.Bd3!: as pretas abandonaram.' }],
  ['c20', 'h', 'h', '(h)', '10 Be2 Qxg2 11 Bf3 Qg5 12 Qe2', { a: '∞', r: 'Kavalek–Christiansen, Campeonato dos EUA 1986', c: 'A coluna rendeu muitos empates. Mais interessante é 10.Be2!?, com complicações.' }],
  // Coluna 21
  ['c21', 'i', 'i', '(i)', '6... Nd5 7 N1f3 h6 8 Ne4 N7b6 9 Bd3 Nb4 10 O-O Nxd3 11 Qxd3 e6 12 Ne5', { a: '⩲', r: 'Fischer', c: 'Com 6...Nd5 as brancas ficam um pouco melhor.' }],
  ['c21', 'j', 'j', '(j)', '7... Be7 8 Nxf7', { a: '+-', c: 'Não 7...Be7? por 8.Nxf7!, ganhando.' }],
  ['c21', 'k', 'k', '(k)', '8... Qxd4 9 N1f3 Qd5 10 Ne5 Qxg2 11 Rf1 Be7 12 Nef3 Qg4 13 Nxf7', { a: '±', r: 'Arnason–Helmers, Reykjavík 1982', c: 'Pegar o peão é perigoso demais.' }],
  ['c21', 'l', 'l', '(l)', '10 a4 c5 11 Bf4 Bd7 12 Ne5 Nbd5 13 Bg3 cxd4', { a: '=', r: 'Hector–Schandorff, Copenhague 2002', c: 'Com 10.a4 as pretas igualam.' }],
  ['c21', 'm', 'm', '(m)', '11 dxc5 Bxc5 12 Ne5 O-O 13 Ngf3 Nbd7 14 O-O Nxe5 15 Nxe5 b6 16 Qf3 Qc7', { a: '=', r: 'Adams–Seirawan, Bermudas 1999', c: 'Com 11.dxc5 também fica igual.' }],
  ['c21', 'n', 'n', '(n)', '14 Bf4 Bd6 15 Bxd6 Qxd6 16 Rad1 O-O 17 Rxd4 Qc5', { a: '=', r: 'Short–Gulko, match 1994', c: 'Ou 14.Bf4, trocando os bispos: igual.' }],
  // Coluna 22
  ['c22', 'o', 'o', '(o)', '10 c3 Be7 11 Be3 Nbd5 12 Ne5 O-O 13 Ngf3 Qc7 14 Bd2 b6 15 O-O Bd6 16 Rfe1 Bb7', { a: '=', r: 'Dvoiris–Meduna, Sochi 1983', c: 'Com 10.c3 as pretas igualam.' }],
  ['c22-o', '1', 'o', '(o) 11.dxc5', '11 dxc5 Nbd7', { c: 'Ou 11.dxc5 Nbd7.' }],
  ['c22', 'p', 'p', '(p)', '12... cxd4 13 Nf3 Be7 14 Nxd4 O-O 15 O-O-O Bd7 16 Kb1 Qb6 17 c4 Nb4 18 Ne4 Nxe4 19 Qxe4', { a: '⩲', r: 'Anand–Khalifman, Interzonal de Biel 1993', c: 'Com 12...cxd4 as brancas ficam um pouco melhor.' }],
  ['c22', 'q', 'q', '(q)', '14 c3 Bb7 15 Ngf3 Qb6 16 O-O O-O', { a: '=', r: 'Anand–Ivanchuk, Wijk aan Zee 2001', c: 'Ou 14.c3, igual.' }],
  // Coluna 23
  // O livro dá 10 Be3 Nbd5 11 Ngf3 Qc7 12 O-O Bd6 13 Nc4 Be7 =, mas 11.Ngf3 é impossível
  // (já há um cavalo em f3 desde 9.N5f3); a linha para em 10...Nbd5.
  ['c23', 'r', 'r', '(r)', '10 Be3 Nbd5', { a: '=', r: 'Hector–Hjelm, Copenhague 2003', c: 'Com 10.Be3 Nbd5 fica igual. (A continuação do livro, 11.Ngf3, é impossível: f3 já está ocupada.)' }],
  ['c23', 's', 's', '(s)', '10... Nbd7 11 b4 b6 12 Nd4 Nd5 13 Bb2 Nxb4 14 Nxe6 Nxd3+ 15 Qxd3 Qe7 16 O-O-O fxe6 17 Qe4 Rb8 18 c6 Nc5 19 Qg6+ Qf7 20 c7 Ra8 21 Rd8+ Ke7 22 Qxf7+ Kxf7 23 Nf3', { a: '±', c: '10...Nbd7 leva a complicações.' }],
  ['c23-s', '1', 's', '(s) 12...bxc5?', '12... bxc5 13 Nc6 Qc7 14 Qxe6+ fxe6 15 Bg6#', { c: '12...bxc5? 13.Nc6 Qc7 14.Qxe6+! fxe6 15.Bg6 mate!' }],
  ['c23-s', '2', 's', '(s) 11...Nd5', '11... Nd5 12 Bd2 Qf6 13 Rb1 a5 14 a3', { a: '⩲', c: 'As pretas reduziriam os problemas com 11...Nd5.' }],
  ['c23', 't', 't', '(t)', '12... Nxe5 13 Nxe5 O-O 14 Bd2 Qd5 15 O-O-O Qxa2 16 c3 b5 17 Bxh6 Bb7 18 Nd7 Nxd7 19 Qg4 Qa1+ 20 Bb1 g6 21 Rxd7 Ba3 22 bxa3 Qxc3+ 23 Kd1 Rfd8 24 Rd2 Rxd2+ 25 Bxd2 Rd8 26 Qg5 Bf3+ 27 gxf3 Qxf3+', { a: '∓', r: 'Barlov–Radulov, Belgrado 1982', c: 'Jogável é a longa e complicada 12...Nxe5.' }],
  ['c23-t', '1', 't', '(t) 18.Bb1', '18 Bb1 Qa4', { a: '=', c: 'Se 18.Bb1, 18...Qa4 e fica igual.' }],
  ['c23', 'u-A', 'u', '(u) A', '13 Bd2 Nxe5 14 Nxe5 Bxf2+ 15 Kxf2 Qxe5 16 Qxe5 Ng4+', { a: '∓', c: '13.Bd2? perde um peão.' }],
  ['c23', 'u-B', 'u', '(u) B', '13 Bf4 Bb4+ 14 Nd2 Bxd2+ 15 Kxd2 O-O 16 Rhd1 Nc5 17 Ke1 Nd5', { a: '=', r: 'Timman–Karpov, match 1993', c: 'Com 13.Bf4 Bb4+! as pretas igualam.' }],
  ['c23', 'v', 'v', '(v)', '14 Re1 Bd6 15 Bf4 Nd5 16 Bg3 N7f6 17 Nd4', { a: '⩲', r: 'Brynell–Wessman, Excelsior Cup 2002', c: 'Ou 14.Re1, e as brancas ficam um pouco melhor.' }],
  // Coluna 24
  ['c24', 'w', 'w', '(w)', '7 Nf3 Bf5 8 Qe2 e6 9 Bg5 Be7 10 O-O-O Bg4 11 h3 Bxf3 12 Qxf3 Nd5', { a: '=', r: 'Fischer–Petrosian, Bled 1961', c: 'Com 7.Nf3 as pretas igualam.' }],
  ['c24', 'x', 'x', '(x)', '14 Bh4 Ne7 15 Bxe7 Qxe7 16 Ne5 c5', { a: '=', r: 'Balashov–Hort, Tilburg 1977', c: 'Ou 14.Bh4 Ne7!, igual.' }],
]

const capitulo = {
  id: 'caro-kann-b',
  arquivo: 'caro-kann-b',
  nome: 'Caro-Kann — 4...Nd7',
  fonte: 'Modern Chess Openings — Caro-Kann Defense (pp. 178–182), colunas 13–24',
  base: '1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nd7',
  corPadrao: 'b',
  ordem: 178,
  grupos: [
    { id: 'bd3', nome: '5.Bd3 Ngf6 6.Ng5', colunas: [13, 14, 15] },
    { id: 'ng5-ng3', nome: '5.Ng5 e 5.Nf3 Ngf6 6.Ng3', colunas: [16, 17, 18] },
    { id: 'nf3', nome: '5.Nf3 Ngf6 6.Nxf6+', colunas: [19, 20] },
    { id: 'bc4', nome: '5.Bc4', colunas: [21, 22, 23, 24] },
  ],
}

module.exports = { capitulo, colunas, notas }
