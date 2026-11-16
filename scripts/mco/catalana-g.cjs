// Transcrição do MCO 15ª ed. — Abertura Catalã, Variante Fechada com 7.Qc2 c6 (pp. 532–533), colunas 37–42.
// Gerar: node scripts/mco/gerar.cjs catalana-g
// Formato: ver gambito-do-rei.cjs. Dicas em catalana-g-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua.
// As notas (p) e a sugestão 18.f3 da nota (q) não trazem avaliação (só comentário).

const A = '1 d4 Nf6 2 c4 e6 3 g3 d5 4 Bg2 Be7 5 Nf3 O-O 6 O-O Nbd7 7 Qc2 c6'
const N = `${A} 8 Nbd2 b6`
const B = `${A} 8 b3 b6 9 Rd1`

const colunas = {
  c37: [`${N} 9 e4 Bb7 10 e5 Ne8 11 b3 Rc8 12 Bb2 c5 13 dxc5 Nxc5 14 Rfd1 Qc7 15 Rac1 Qb8`, 'nbd2-e4', '8.Nbd2 b6 9.e4 Bb7', '⩲',
    'Na Variante Fechada as pretas mantêm o peão em d5 e preparam ...b6 e ...c5. Com 8.Nbd2 b6 9.e4 as brancas ocupam o centro. Depois de 9...Bb7 10.e5 Ne8 11.b3 Rc8 12.Bb2 c5 13.dxc5 Nxc5 14.Rfd1 Qc7 15.Rac1 Qb8, com 16.cxd5 as brancas ficam um pouco melhor.'],
  c38: [`${N} 9 e4 Ba6 10 e5 Ne8 11 Re1 Rc8 12 Bf1 Nc7 13 b3 dxc4 14 Nxc4 Nd5 15 Qe4 b5`, 'nbd2-e4', '9...Ba6', '±',
    'Com 9...Ba6 o bispo pressiona c4. Depois de 10.e5 Ne8 11.Re1 Rc8 12.Bf1 Nc7 13.b3 dxc4 14.Nxc4 Nd5 15.Qe4 b5, com 16.Ne3 as brancas têm jogo na ala do rei e ficam melhor.'],
  c39: [`${N} 9 b3 Ba6 10 Rd1 Rc8 11 e4 c5 12 exd5 exd5 13 Bb2 b5 14 cxd5 c4 15 bxc4 bxc4`, 'nbd2-b3', '8.Nbd2 b6 9.b3 Ba6', '⩲',
    'Com 9.b3 as brancas protegem c4 antes de jogar e4. Depois de 9...Ba6 10.Rd1 Rc8 11.e4 c5 12.exd5 exd5 13.Bb2 b5 14.cxd5 c4 15.bxc4 bxc4 as pretas têm um peão passado em c4, mas com 16.Ne5 as brancas ficam um pouco melhor.'],
  c40: [`${N} 9 b3 a5 10 Bb2 Ba6 11 e4 Rc8 12 Rfe1 c5 13 exd5 exd5 14 Rad1 cxd4 15 Nxd4 Bb4`, 'nbd2-b3', '9...a5', '⩲',
    'Com 9...a5 as pretas ganham espaço na ala da dama. Depois de 10.Bb2 Ba6 11.e4 Rc8 12.Rfe1 c5 13.exd5 exd5 14.Rad1 cxd4 15.Nxd4 Bb4 as pretas ficam com o peão isolado em d5 e, com 16.a3, as brancas ficam um pouco melhor.'],
  c41: [`${B} Bb7 10 Nc3 Rc8 11 e4 dxe4 12 Nxe4 Nxe4 13 Qxe4 b5 14 Bf4 bxc4 15 bxc4 Qa5`, 'b3', '8.b3 b6 9.Rd1 Bb7', '⩲',
    'Com 8.b3 b6 9.Rd1 as brancas protegem c4 e apoiam d4. Depois de 9...Bb7 10.Nc3 Rc8 11.e4 dxe4 12.Nxe4 Nxe4 13.Qxe4 b5 14.Bf4 bxc4 15.bxc4 Qa5 as pretas atacam os peões soltos, mas com 16.Qc2 as brancas ficam um pouco melhor.'],
  c42: [`${B} Ba6 10 Bb2 Rc8 11 Nc3 b5 12 c5 b4 13 Na4 Bb5 14 Ne1 Rb8 15 Nd3 Ne8`, 'b3', '9...Ba6', '⩲',
    'Com 9...Ba6 10.Bb2 Rc8 11.Nc3 b5 12.c5 as brancas fecham a ala da dama. Depois de 12...b4 13.Na4 Bb5 14.Ne1 Rb8 15.Nd3 Ne8 as pretas preparam ...f5, mas as brancas ficam um pouco melhor.'],
}

const notas = [
  // Coluna 37
  ['c37', 'a', 'a', '(a)', '8... b5 9 c5 a5 10 e4 Nxe4 11 Nxe4 dxe4 12 Qxe4 Nf6 13 Qc2', { a: '⩲', r: 'Rajković–Čolović, Cetinje 1993', c: '8...b5 9.c5 a5 10.e4 Nxe4 11.Nxe4 dxe4 12.Qxe4 Nf6 13.Qc2 é um pouco melhor para as brancas.' }],
  ['c37', 'b', 'b', '(b)', '10 cxd5 cxd5 11 e5 Ne8 12 Re1 Ba6 13 Nf1 Rc8 14 Qd1 Nb8 15 h4 Nc6 16 Bg5 Bxg5 17 hxg5 Ne7', { a: '=', r: 'Filipov–Khenkin, Copa Europeia de Clubes 2006', c: '10.cxd5 cxd5 11.e5 Ne8 12.Re1 Ba6! 13.Nf1 Rc8 14.Qd1 Nb8 15.h4 Nc6 16.Bg5 Bxg5 17.hxg5 Ne7 é igual.' }],
  ['c37-b', '1', 'b', '(b) 14.Qa4', '14 Qa4 Nc7', { c: '14.Qa4 Nc7 é a alternativa.' }],
  ['c37', 'c', 'c', '(c)', '13 Rac1 Nc7', { a: '=', c: 'Se 13.Rac1, as pretas jogam 13...Nc7, com igualdade.' }],
  ['c37-c', '1', 'c', '(c) 13...Qc7', '13... Qc7 14 cxd5 Bxd5 15 Ne4 Qb7 16 Rfe1', { a: '⩲', r: 'Goldin–Bousoukis, Filadélfia 1992', c: 'Não 13...Qc7 14.cxd5 Bxd5 15.Ne4 Qb7 16.Rfe1, um pouco melhor para as brancas.' }],
  ['c37', 'd', 'd', '(d)', '16 cxd5 exd5 17 Nf1 Ne4 18 Qe2', { a: '⩲', r: 'Shirov–Vaganian, Bundesliga 2006', c: '16.cxd5 exd5 17.Nf1 Ne4 18.Qe2 é um pouco melhor para as brancas.' }],
  // Coluna 38
  ['c38', 'e', 'e', '(e)', '16 Ne3 Re8 17 h4 Nf8 18 Nxd5 cxd5 19 Qg4 Rc6 20 h5', { a: '±', r: 'Cifuentes–Flear, Polanica Zdrój 1992', c: '16.Ne3 Re8 17.h4 Nf8 18.Nxd5 cxd5 19.Qg4 Rc6 20.h5 foi bom para as brancas.' }],
  // Coluna 39
  ['c39', 'f', 'f', '(f)', '10... c5 11 e4 dxc4 12 bxc4 cxd4 13 e5 Ng4 14 Qe4 h5 15 h3 Nc5 16 Qb1 Nh6 17 Nb3', { a: '±', r: 'Kunte–Barua, Índia 2003', c: '10...c5 11.e4 dxc4 12.bxc4 cxd4 13.e5 Ng4 14.Qe4 h5 15.h3 Nc5 16.Qb1 Nh6 17.Nb3 é melhor para as brancas.' }],
  ['c39', 'g', 'g', '(g)', '13 Qf5 g6 14 Qh3 h5 15 Bb2 Rc7 16 Bh1 Bb7 17 Re1 Ng4', { a: '⩲', r: 'Cifuentes–Sosonko, Campeonato Holandês 1992', c: '13.Qf5 g6 14.Qh3 h5 15.Bb2 Rc7 16.Bh1 Bb7 17.Re1 Ng4: a posição provavelmente é um pouco favorável às brancas.' }],
  ['c39-g', '1', 'g', '(g) 15...Bb7', '15... Bb7', { a: '=', r: 'Tal–Lputian, Interzonal de Manila 1990', c: '15...Bb7 e empate combinado.' }],
  ['c39', 'h', 'h', '(h)', '13... cxd4 14 Nxd4 b5 15 Qf5 bxc4 16 bxc4 Bxc4 17 Nxc4 Rxc4 18 Bxd5', { a: '⩲', r: 'Ghitescu–Radulov, Bucareste 1971', c: '13...cxd4 14.Nxd4 b5 15.Qf5 bxc4 16.bxc4 Bxc4 17.Nxc4 Rxc4 18.Bxd5 é um pouco melhor para as brancas.' }],
  ['c39', 'i', 'i', '(i)', '16 Ne5 Nxd5 17 Ne4', { a: '⩲', r: 'Umanskaya–Ilinsky, Rússia 1995', c: '16.Ne5 Nxd5 17.Ne4 é um pouco melhor para as brancas.' }],
  // Coluna 40
  ['c40', 'j', 'j', '(j)', '12 e5 Ne8 13 Rfc1 Nc7', { a: '=', r: 'Cobo–Minev, Baja 1971', c: '12.e5 Ne8 13.Rfc1 Nc7 é igual. 12.Rfd1, 12.Rac1 e 12.Ne5 também são possíveis aqui.' }],
  ['c40', 'k', 'k', '(k)', '16 a3 Bc5 17 Qf5 dxc4 18 bxc4', { a: '⩲', r: 'Gligorić–Nedeljković, Campeonato Iugoslavo 1951', c: '16.a3 Bc5 17.Qf5 dxc4 18.bxc4 é um pouco melhor para as brancas.' }],
  // Coluna 41
  ['c41', 'l', 'l', '(l)', '12... c5 13 Nxf6+ Bxf6 14 Ng5 Bxg5 15 Bxb7 Rc7 16 Be4 f5 17 Bg2', { a: '⩲', r: 'Epishin–Belotti, Reggio Emilia 1996', c: '12...c5 13.Nxf6+ Bxf6 14.Ng5 Bxg5 15.Bxb7 Rc7 16.Be4 f5 17.Bg2 é um pouco melhor para as brancas.' }],
  ['c41', 'm', 'm', '(m)', '13... Nf6 14 Qc2 Qc7 15 Bf4 Bd6 16 Bxd6 Qxd6 17 c5 Qe7 18 Ne5', { a: '±', r: 'Sher–Bobbia, Ticino 1994', c: '13...Nf6 14.Qc2 Qc7 15.Bf4 Bd6 16.Bxd6 Qxd6 17.c5 Qe7 18.Ne5 é melhor para as brancas.' }],
  ['c41', 'n', 'n', '(n)', '16 Qc2 Ba8 17 c5', { a: '⩲', r: 'Salov–Spassky, França 1994', c: '16.Qc2 Ba8 17.c5 é um pouco melhor para as brancas.' }],
  // Coluna 42
  ['c42', 'o', 'o', '(o)', '11... dxc4 12 bxc4 Bxc4 13 Ne5 Nxe5 14 dxe5 Nd7 15 Ne4', { a: '∞', c: '11...dxc4 12.bxc4 Bxc4 13.Ne5 Nxe5 14.dxe5 Nd7 15.Ne4 daria às brancas boa compensação, numa posição pouco clara.' }],
  ['c42', 'p', 'p', '(p)', '14... Bxa4', { c: '14...Bxa4 enfraqueceria demais as casas brancas.' }],
  ['c42', 'q', 'q', '(q)', '16 Rab1 a5 17 e3 f5 18 a3 bxa3 19 Bxa3 Nc7 20 Bc1', { a: '⩲', r: 'Tisdall–Hjartarson, Reykjavik 1996', c: '16.Rab1 a5 17.e3 f5 18.a3 bxa3 19.Bxa3 Nc7 20.Bc1 é um pouco melhor para as brancas.' }],
  ['c42-q', '1', 'q', '(q) 18.f3', '18 f3', { c: 'Hjartarson sugere 18.f3.' }],
]

const capitulo = {
  id: 'catalana-g',
  arquivo: 'catalana-g',
  nome: 'Catalã — Fechada com 7.Qc2 c6',
  fonte: 'Modern Chess Openings — Catalan Opening (pp. 532–533), colunas 37–42',
  base: '1. d4 Nf6 2. c4 e6 3. g3',
  corPadrao: 'w',
  ordem: 532,
  grupos: [
    { id: 'nbd2-e4', nome: '8.Nbd2 b6 9.e4', colunas: [37, 38] },
    { id: 'nbd2-b3', nome: '8.Nbd2 b6 9.b3', colunas: [39, 40] },
    { id: 'b3', nome: '8.b3 b6 9.Rd1', colunas: [41, 42] },
  ],
}

module.exports = { capitulo, colunas, notas }
