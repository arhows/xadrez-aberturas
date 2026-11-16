// Transcrição do MCO 15ª ed. — Defesa Nimzo-Índia, Variante Rubinstein 4.e3, linha principal 7...Nc6 8.a3 (pp. 547–548), colunas 19–24.
// Gerar: node scripts/mco/gerar.cjs nimzo-d
// Formato: ver gambito-do-rei.cjs. Dicas em nimzo-d-dicas.cjs.
//
// Errata: nota (q), "11 cxd4" → 11.exd4 (as brancas já não têm peão em c).
// As colunas 20–24 não trazem avaliação no fim; cada uma usa a da nota que a continua.
// Coluna 23: "as brancas têm ataque pelo material perdido" (nota s) ficou ∞.
// Notas só com comentário: (m), (o) 16...g6, (u) 16.Ng5.

const R = '1 d4 Nf6 2 c4 e6 3 Nc3 Bb4 4 e3 O-O 5 Bd3 d5 6 Nf3 c5 7 O-O Nc6 8 a3'

const colunas = {
  c19: [`${R} Bxc3 9 bxc3 dxc4 10 Bxc4 Qc7 11 Ba2 e5 12 h3 e4 13 Nh2 Na5 14 Bb2 b6 15 c4 cxd4 16 Bxd4 Qc6`, 'bxc3', '8...Bxc3 9.bxc3 dxc4 10.Bxc4 Qc7 11.Ba2', '=',
    'Na Variante Rubinstein as brancas desenvolvem a ala do rei e firmam o centro. Na linha principal, 8...Bxc3 9.bxc3 dxc4 10.Bxc4 Qc7 dá às brancas o par de bispos e às pretas pressão em c3 e e4. Depois de 11.Ba2 e5 12.h3 e4 13.Nh2 Na5 14.Bb2 b6 15.c4 cxd4 16.Bxd4 Qc6 o jogo é igual.'],
  c20: [`${R} Bxc3 9 bxc3 dxc4 10 Bxc4 Qc7 11 Qc2 e5 12 Bd3 Re8 13 dxe5 Nxe5 14 Nxe5 Qxe5 15 f3 Bd7 16 a4 Bc6`, 'bxc3', '11.Qc2', '=',
    'Com 11.Qc2 e5 12.Bd3 Re8 as brancas preparam e4. Depois de 13.dxe5 Nxe5 14.Nxe5 Qxe5 15.f3 Bd7 16.a4 Bc6, com 17.Re1 h5 18.e4 Nd5 o jogo é igual.'],
  c21: [`${R} Bxc3 9 bxc3 Qc7 10 cxd5 exd5 11 Nh4 Ne7 12 a4 Re8 13 Ba3 c4 14 Bc2 Ng6 15 Nf5 Ne4 16 Qh5 Nxc3`, 'bxc3', '9...Qc7', '⩲',
    'Com 9...Qc7 as pretas mantêm a tensão no centro. Depois de 10.cxd5 exd5 11.Nh4 Ne7 12.a4 Re8 13.Ba3 c4 14.Bc2 Ng6 15.Nf5 Ne4 16.Qh5!? Nxc3, com 17.Ng3 b5 18.Bb4 as brancas ficam um pouco melhor.'],
  c22: [`${R} dxc4 9 Bxc4 cxd4 10 exd4 Be7 11 Re1 b6 12 Bd3 Bb7 13 Bc2 Re8 14 Qd3 g6 15 h4 Qd6 16 Bg5 Rad8`, 'dxc4', '8...dxc4 9.Bxc4 cxd4', '⩲',
    'Com 8...dxc4 9.Bxc4 cxd4 10.exd4 as brancas ficam com o peão isolado em d4 e jogo ativo. Depois de 10...Be7 11.Re1 b6 12.Bd3 Bb7 13.Bc2 Re8 14.Qd3 g6 15.h4 Qd6 16.Bg5 Rad8, com 17.Rad1 as brancas ficam um pouco melhor.'],
  c23: [`${R} dxc4 9 Bxc4 Ba5 10 Qd3 a6 11 Rd1 b5 12 Ba2 c4 13 Qe2 Qe8 14 e4 e5 15 d5 Nd4 16 Nxd4 exd4`, 'dxc4', '9...Ba5', '∞',
    'Com 9...Ba5 as pretas mantêm a tensão. Depois de 10.Qd3 a6 11.Rd1 b5 12.Ba2 c4 13.Qe2 Qe8 14.e4 e5 15.d5 Nd4 16.Nxd4 exd4, com 17.Rxd4 as brancas têm ataque pelo material.'],
  c24: [`${R} Ba5 9 cxd5 exd5 10 dxc5 Bxc3 11 bxc3 Bg4 12 c4 Ne5 13 Bb2 Nxf3+ 14 gxf3 Bh3 15 cxd5 Qxd5 16 Bxf6 gxf6`, 'ba5', '8...Ba5', '⩲',
    'Com 8...Ba5 o bispo recua sem trocar. Depois de 9.cxd5 exd5 10.dxc5 Bxc3 11.bxc3 Bg4 12.c4 Ne5 13.Bb2 Nxf3+ 14.gxf3 Bh3 15.cxd5! Qxd5 16.Bxf6 gxf6 os dois reis ficam expostos e, com 17.Kh1, as brancas ficam um pouco melhor.'],
}

const notas = [
  // Coluna 19
  ['c19', 'a', 'a', '(a)', '11... b6 12 Re1 e5 13 e4 Bg4 14 dxc5 bxc5 15 h3 Rad8 16 Qe2 Bxf3 17 Qxf3', { a: '±', r: 'Kasparov–Kramnik, Linares 1997', c: '11...b6?! 12.Re1 e5 13.e4 Bg4 14.dxc5 bxc5 15.h3 Rad8 16.Qe2 Bxf3 17.Qxf3 é melhor para as brancas.' }],
  ['c19', 'b', 'b', '(b)', '13... Bf5 14 Ng4 Nxg4 15 hxg4 Bg6 16 a4 Rfd8 17 Qe2 b6 18 Ba3', { a: '⩲', c: '13...Bf5 14.Ng4 Nxg4 15.hxg4 Bg6 16.a4 Rfd8 17.Qe2 b6 18.Ba3 é um pouco melhor para as brancas.' }],
  ['c19', 'c', 'c', '(c)', '15... Bf5 16 Qe2 Nd7 17 Rac1 Rad8 18 Rfd1 Rfe8 19 Nf1', { a: '⩲', r: 'Sherbakov–Kholmov, Ekaterinburg 1997', c: '15...Bf5 16.Qe2 Nd7 17.Rac1 Rad8 18.Rfd1 Rfe8 19.Nf1 é um pouco melhor para as brancas.' }],
  // Coluna 20
  ['c20', 'd-A', 'd', '(d) A', '11 Bb2 e5 12 h3 e4 13 Nd2 Re8 14 Qe2 Bf5', { a: '=', r: 'Agrest–Beliavsky, Bundesliga 2004', c: 'Os outros lances não dão vantagem às brancas: 11.Bb2 e5 12.h3 e4 13.Nd2 Re8 14.Qe2 Bf5 é igual.' }],
  ['c20', 'd-B', 'd', '(d) B', '11 Bb5 a6 12 Be2 Rd8 13 Qc2 e5 14 Bb2 Bg4', { a: '=', r: 'Lautier–Yermolinsky, Wijk aan Zee 1997', c: '11.Bb5 a6 12.Be2 Rd8 13.Qc2 e5 14.Bb2 Bg4 é igual.' }],
  ['c20', 'd-C', 'd', '(d) C', '11 a4 b6 12 Ba3 Rd8 13 Qe2 Bb7 14 h3 Rac8 15 Ba2 Na5 16 Ne5 Bd5', { a: '∓', r: 'Hübner–Lobron, Munique 1992', c: '11.a4 b6 12.Ba3 Rd8 13.Qe2 Bb7 14.h3 Rac8 15.Ba2 Na5 16.Ne5 Bd5! é melhor para as pretas.' }],
  ['c20', 'e', 'e', '(e)', '13 e4 exd4 14 cxd4 Bg4 15 e5 Bxf3 16 exf6 Nxd4 17 Bxh7+ Kh8 18 fxg7+ Kxg7 19 Bb2 Rad8 20 gxf3 Rh8 21 Kh1 Rxh7 22 Rg1+ Kh8 23 Rg3 Qe5 24 Rag1', { a: '⩲', r: 'I. Sokolov–Kasparov, Wijk aan Zee 1999', c: '13.e4 exd4 14.cxd4 Bg4 15.e5 Bxf3 16.exf6 Nxd4 17.Bxh7+ Kh8 18.fxg7+ Kxg7 19.Bb2 Rad8 20.gxf3 Rh8 21.Kh1 Rxh7 22.Rg1+ Kh8 23.Rg3 Qe5 24.Rag1 dá às brancas chances de ataque um pouco melhores.' }],
  ['c20-e', '1', 'e', '(e) 13...c4', '13... c4 14 Bxc4 exd4 15 cxd4 Na5 16 Bd3 Qxc2 17 Bxc2 Nxe4', { a: '=', c: '13...c4 14.Bxc4 exd4 15.cxd4 Na5 16.Bd3 Qxc2 17.Bxc2 Nxe4 é mais ou menos igual.' }],
  ['c20', 'f', 'f', '(f)', '15... Be6 16 e4 Rad8 17 Be2 b6 18 a4 Bd7 19 Rd1 Bc6', { a: '=', r: 'Karpov–Spassky, match 1974', c: '15...Be6 16.e4 Rad8 17.Be2 b6 18.a4 Bd7 19.Rd1 Bc6 também estava bem para as pretas.' }],
  ['c20', 'g', 'g', '(g)', '17 Re1 h5 18 e4 Nd5 19 Bd2 Nf4 20 Bf1 h4', { a: '=', r: 'Gligorić–Pachman, Portorož 1958', c: '17.Re1 h5 18.e4 Nd5 19.Bd2 Nf4 20.Bf1 h4 é igual.' }],
  // Coluna 21
  ['c21', 'h', 'h', '(h)', '9... b6 10 cxd5 exd5 11 Ne5 Bb7 12 Bb2 c4 13 Nxc6 Bxc6 14 Bc2 Re8 15 a4', { a: '⩲', r: 'Yusupov–Lobron, Munique 1993', c: '9...b6 10.cxd5 exd5 11.Ne5 Bb7 12.Bb2 c4 13.Nxc6 Bxc6 14.Bc2 Re8 15.a4 é um pouco melhor para as brancas.' }],
  ['c21', 'i', 'i', '(i)', '11 a4 Re8 12 Ba3 c4 13 Bc2 Ne4 14 Bxe4 Rxe4 15 Nd2', { a: '⩲', r: 'Kamsky–Z. Almasi, Groningen 1995', c: 'Também é bom 11.a4 Re8 12.Ba3 c4 13.Bc2 Ne4 14.Bxe4 Rxe4 15.Nd2, com pequena vantagem.' }],
  ['c21', 'j', 'j', '(j)', '11... Qa5 12 Bb2 Re8 13 Qe1 Bd7 14 f3 Ne7 15 c4 Qxe1 16 Rfxe1 dxc4 17 Bxc4', { a: '⩲', r: 'Sadler–Ehlvest, Groningen 1997', c: '11...Qa5 12.Bb2 Re8 13.Qe1 Bd7 14.f3 Ne7 15.c4 Qxe1 16.Rfxe1 dxc4 17.Bxc4 é um pouco melhor para as brancas.' }],
  ['c21', 'k', 'k', '(k)', '17 Ng3 b5 18 Bb4 Nxa4 19 Qxd5 Bd7 20 Bxa4', { a: '⩲', r: 'Knaak–Tischbierek, Berlim 1989', c: '17.Ng3 b5 18.Bb4 Nxa4 19.Qxd5 Bd7 20.Bxa4 é um pouco melhor para as brancas.' }],
  // Coluna 22
  ['c22', 'l', 'l', '(l)', '10 axb4 dxc3 11 bxc3 Qc7 12 Qb3 b6 13 Bb2 Bb7 14 Be2 a5', { a: '=', r: 'Aleksandrov–U. Andersson, Olimpíada de Bled 2002', c: '10.axb4 dxc3 11.bxc3 Qc7 12.Qb3 b6 13.Bb2 Bb7 14.Be2 a5 é igual.' }],
  ['c22-l', '1', 'l', '(l) 11.Qxd8', '11 Qxd8', { a: '⩲', c: '11.Qxd8 leva a um final agradável para as brancas; as pretas evitam isso jogando 8...cxd4 antes de ...dxc4.' }],
  ['c22', 'm', 'm', '(m)', '10... Bxc3 11 bxc3 Qc7 12 Qe2 Na5 13 Bd3 Qxc3 14 Bd2 Qc7 15 Qe5', { c: '10...Bxc3 11.bxc3 Qc7 12.Qe2 Na5 13.Bd3 Qxc3? 14.Bd2 Qc7 15.Qe5! ganha.' }],
  ['c22', 'n', 'n', '(n)', '11 Qd3 b6 12 Bg5 Bb7 13 Rfe1 Nd5 14 Bxd5 exd5 15 Bxe7 Nxe7 16 Ng5 Ng6 17 h4', { a: '⩲', r: 'Averbakh', c: '11.Qd3 b6 12.Bg5 Bb7 13.Rfe1 Nd5 14.Bxd5 exd5 15.Bxe7 Nxe7 16.Ng5 Ng6 17.h4 também é um pouco favorável às brancas.' }],
  ['c22', 'o', 'o', '(o)', '14... Rc8 15 d5 exd5 16 Bg5 Ne4 17 Nxe4 dxe4 18 Qxe4 g6 19 Qh4', { a: '±', r: 'Portisch–Karpov, Milão 1975', c: '14...Rc8? 15.d5! exd5 16.Bg5! Ne4 17.Nxe4 dxe4 18.Qxe4 g6 19.Qh4 é melhor para as brancas.' }],
  ['c22-o', '1', 'o', '(o) 16...g6', '16... g6 17 Rxe7 Qxe7 18 Nxd5', { c: '16...g6? 17.Rxe7 Qxe7 18.Nxd5 ganha.' }],
  ['c22', 'p', 'p', '(p)', '17 Rad1 Qb8 18 Bb3', { a: '⩲', r: 'Yusupov–Lobron, Nussloch 1996', c: '17.Rad1 Qb8 18.Bb3 é um pouco melhor para as brancas.' }],
  ['c22-p', '1', 'p', '(p) 18...a6', '18... a6 19 d5', { a: '±', c: '18...a6?! 19.d5! é melhor para as brancas.' }],
  // Coluna 23
  ['c23', 'q', 'q', '(q)', '10 Bd3 cxd4 11 exd4 Bb6 12 Be3 Nd5 13 Nxd5 exd5 14 h3 Ne7 15 Bg5 f6 16 Bf4 Bf5', { a: '=', r: 'Gligorić–Karpov, Hastings 1971/72', c: '10.Bd3 cxd4 11.exd4 Bb6 12.Be3 Nd5 13.Nxd5 exd5 14.h3 Ne7 15.Bg5 f6 16.Bf4 Bf5 é igual.' }],
  ['c23', 'r', 'r', '(r)', '11 Ne4 b5 12 Nxf6+ Qxf6 13 Qe4 Bb7 14 Bd3 g6 15 dxc5 Nb4 16 Qe5 Qxe5 17 Nxe5 Nxd3 18 Nxd3 Rfd8 19 Ne5 Bc7 20 Nf3 Bxf3 21 gxf3 a5 22 Rb1 b4', { a: '=', r: 'Timman–Tal, Hastings 1973/74', c: '11.Ne4 b5 12.Nxf6+ Qxf6 13.Qe4 Bb7 14.Bd3 g6 15.dxc5 Nb4! 16.Qe5 Qxe5 17.Nxe5 Nxd3 18.Nxd3 Rfd8 19.Ne5 Bc7 20.Nf3 Bxf3 21.gxf3 a5! 22.Rb1 b4 é igual.' }],
  ['c23', 's', 's', '(s)', '17 Rxd4 Qe5 18 Be3 Ng4 19 f4 Qb8 20 Rad1 Nxe3 21 Qxe3 Bb6', { a: '∞', r: 'Gligorić–Gheorghiu, Skopje 1968', c: '17.Rxd4 Qe5 18.Be3 Ng4 19.f4 Qb8 20.Rad1 Nxe3 21.Qxe3 Bb6: as brancas têm ataque pelo material perdido.' }],
  // Coluna 24
  ['c24', 't', 't', '(t)', '9 Re1 a6 10 cxd5 exd5 11 dxc5 Bxc3 12 bxc3 Bg4 13 h3 Bh5 14 Be2 Ne4', { a: '=', r: 'Djurhuus–Petursson, Reykjavik 1995', c: '9.Re1 a6 10.cxd5 exd5 11.dxc5 Bxc3 12.bxc3 Bg4 13.h3 Bh5 14.Be2 Ne4 é igual.' }],
  ['c24', 'u', 'u', '(u)', '9... cxd4 10 dxc6 dxc3 11 b4 Bb6 12 Qc2 Qc7 13 Qxc3 Qxc6 14 Qxc6 bxc6 15 Bb2 c5 16 Rac1 cxb4', { a: '=', r: 'Krupkova–Chilingorova, Rússia 1993', c: '9...cxd4!? 10.dxc6 dxc3 11.b4 Bb6 12.Qc2 Qc7 13.Qxc3 Qxc6 14.Qxc6 bxc6 15.Bb2 c5 16.Rac1 cxb4 é igual.' }],
  ['c24-u', '1', 'u', '(u) 16.Ng5', '16 Ng5', { c: '16.Ng5!? também merece atenção.' }],
  ['c24', 'v', 'v', '(v)', '13 cxd5 Bxf3 14 gxf3 Qxd5 15 Be2 Qxc5 16 Bb2 Rad8 17 Bd4', { a: '⩲', r: 'Peralta–Khenkin, Espanha 2005', c: '13.cxd5 Bxf3 14.gxf3 Qxd5 15.Be2 Qxc5 16.Bb2 Rad8 17.Bd4 também pode ser um pouco melhor para as brancas.' }],
  ['c24', 'w', 'w', '(w)', '17 Kh1 Rfd8 18 Rg1+ Kh8 19 Be4 Bg2+ 20 Kxg2 Qg5+ 21 Kh1 Rxd1 22 Raxd1', { a: '⩲', r: 'Beliavsky–Tal, URSS 1975', c: '17.Kh1 Rfd8 18.Rg1+ Kh8 19.Be4! Bg2+ 20.Kxg2 Qg5+ 21.Kh1 Rxd1 22.Raxd1 é um pouco melhor para as brancas.' }],
]

const capitulo = {
  id: 'nimzo-d',
  arquivo: 'nimzo-d',
  nome: 'Nimzo-Índia — Rubinstein 7...Nc6 8.a3',
  fonte: 'Modern Chess Openings — Nimzo-Indian Defense (pp. 547–548), colunas 19–24',
  base: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4',
  corPadrao: 'b',
  ordem: 547,
  grupos: [
    { id: 'bxc3', nome: '8...Bxc3', colunas: [19, 20, 21] },
    { id: 'dxc4', nome: '8...dxc4', colunas: [22, 23] },
    { id: 'ba5', nome: '8...Ba5', colunas: [24] },
  ],
}

module.exports = { capitulo, colunas, notas }
