// Transcrição do MCO 15ª ed. — Gambito da Dama Recusado, Variante Cambridge Springs (pp. 409–411), colunas 37–42.
// Gerar: node scripts/mco/gerar.cjs gdr-g
// Formato: ver gambito-do-rei.cjs. Dicas em gdr-g-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Correções: na nota (f) o livro traz 9...Bxc3+ e 10...Qxc3+, mas o cavalo de d2 bloqueia os xeques; ficaram sem o sinal.
// Na nota (u) o livro traz 15...Nd7, mas já há um cavalo em d7; ficou 15...Ne7 (depois o livro joga ...Nf8 e ...Neg6).

const B = '1 d4 d5 2 c4 e6 3 Nc3 Nf6 4 Bg5 Nbd7 5 Nf3 c6 6 e3 Qa5'
const N = `${B} 7 Nd2 Bb4 8 Qc2`
const X = `${B} 7 cxd5 Nxd5 8 Qd2 Bb4 9 Rc1 O-O 10 Bd3`

const colunas = {
  c37: [`${N} e5 9 Nb3 Qc7 10 Be2 dxc4 11 Bxc4 O-O 12 O-O Bd6 13 h3 a6`, 'nd2', '8...e5 9.Nb3', '⩲',
    'Na Cambridge Springs a dama preta vai a a5 para cravar o cavalo de c3 e aproveitar o bispo de g5 longe da defesa. Com 7.Nd2 as brancas desfazem a pressão em g5 e c3; depois de 8.Qc2 e5 9.Nb3 a dama recua e as brancas ficam com uma pequena vantagem (Kramnik–Kamsky, Linares 1993).'],
  c38: [`${N} e5 9 dxe5 Ne4 10 Ndxe4 dxe4 11 O-O-O f6 12 exf6 Qxg5 13 Nxe4 Qa5`, 'nd2', '8...e5 9.dxe5', '∞',
    'Com 9.dxe5 Ne4 o jogo fica muito tático. Depois de 11.O-O-O f6 12.exf6 Qxg5 13.Nxe4 Qa5 o rei preto fica no centro, mas as pretas ganham uma peça por peões; a posição é indefinida.'],
  c39: [`${N} O-O 9 Be2 e5 10 O-O exd4 11 Nb3 Qc7 12 Nxd4 Bxc3 13 bxc3 dxc4`, 'nd2', '8...O-O 9.Be2 e5', '⩲',
    'Com 8...O-O as pretas rocam antes de decidir a ruptura. Depois de 9.Be2 e5 10.O-O exd4 11.Nb3 Qc7 elas trocam em c3 e ganham o peão c4, mas as brancas ficam com o par de bispos e uma pequena vantagem (Ruban).'],
  c40: [`${N} O-O 9 Be2 c5 10 O-O cxd4 11 Nb3 Qb6 12 exd4 dxc4 13 Bxc4 Qc7`, 'nd2', '9...c5', '∞',
    'Com 9...c5 a posição fica parecida com uma Nimzo-Índia, mas com o cavalo branco em b3 em vez de f3. Depois de 12.exd4 dxc4 13.Bxc4 Qc7 as brancas ficam com o peão isolado e a posição é indefinida (Azmaiparashvili–Ivanchuk, Tilburg 1994).'],
  c41: [`${X} h6 11 Bh4 e5 12 O-O exd4 13 exd4 Re8`, 'cxd5', '7.cxd5 Nxd5 10...h6', '=',
    'Com 7.cxd5 Nxd5 8.Qd2 as brancas defendem c3 com a dama. Depois de 8...Bb4 9.Rc1 O-O 10.Bd3 h6 11.Bh4 e5 as pretas liberam o jogo; com o peão isolado das brancas, a posição fica equilibrada (Uhlmann–Smagin, Dortmund 1991).'],
  c42: [`${X} e5 11 O-O exd4 12 exd4 f6 13 Bh4 Rd8`, 'cxd5', '10...e5', '±',
    'Com 10...e5 as pretas rompem sem ...h6, mas depois de 11.O-O exd4 12.exd4 f6 13.Bh4 Rd8 elas ficam com escolhas pouco atraentes; Kasparov ganhou o final contra Smyslov (Vilnius 1984).'],
}

const notas = [
  // Coluna 37
  ['c37', 'a-A', 'a', '(a) A', '5... Bb4', { c: '5...Bb4 é a Variante Manhattan, uma espécie de Ragozin com o cavalo preto já em d7; é vista na Ragozin.' }],
  ['c37', 'a-B', 'a', '(a) B', '5... h6 6 Bh4 dxc4 7 e4 Bb4 8 Qc2 c5 9 Bxc4 cxd4 10 Nxd4', { a: '⩲', r: 'Vaganian–Taimanov, URSS 1974', c: '5...h6 6.Bh4 dxc4 7.e4 Bb4 8.Qc2 c5 9.Bxc4 cxd4 10.Nxd4 foi um pouco melhor para as brancas.' }],
  ['c37', 'b', 'b', '(b)', '6 e4 dxe4 7 Nxe4 Be7 8 Nc3 O-O', { a: '=', r: 'Alekhine–Lundin, Örebro 1935', c: '6.e4 dxe4 7.Nxe4 Be7 8.Nc3 O-O é igual.' }],
  ['c37-b', '1', 'b', '(b) 7...a6', '7... a6 8 Nxf6+ Nxf6 9 Bc1 c5 10 a3 Be7', { a: '=', r: 'Neishtadt', c: '7...a6 8.Nxf6+ Nxf6 9.Bc1 c5 10.a3 Be7 também é igual.' }],
  ['c37', 'c', 'c', '(c)', '7... dxc4 8 Bxf6 Nxf6 9 Nxc4 Qc7 10 Rc1 Be7 11 g3 O-O 12 Bg2 Rd8 13 O-O Nd5 14 a3 Bd7 15 b4 Be8 16 Qb3', { a: '⩲', r: 'Ivanchuk–Aseev, Yerevan 2004', c: '7...dxc4 8.Bxf6 Nxf6 9.Nxc4 Qc7 10.Rc1 Be7 11.g3 O-O dá pequena vantagem às brancas.' }],
  ['c37', 'd', 'd', '(d)', '10... Ne4 11 Bh4 exd4 12 Nxd4 Qa5 13 O-O Bxc3 14 cxd5 cxd5 15 bxc3 Qxc3 16 Qd1', { a: '±', r: 'Kramnik', c: '10...Ne4 11.Bh4 exd4 12.Nxd4 Qa5 13.O-O Bxc3 14.cxd5 cxd5 15.bxc3 Qxc3 16.Qd1 é bom para as brancas, segundo Kramnik.' }],
  ['c37', 'e', 'e', '(e)', '13... Re8 14 Rad1 exd4 15 Nxd4 Be5 16 f4 Bxd4 17 Rxd4 Rxe3 18 Rfd1', { a: '⩲', r: 'Kramnik–Kamsky, Linares 1993', c: 'Em Kramnik–Kamsky seguiu 13...Re8 14.Rad1 exd4 15.Nxd4 Be5 16.f4 Bxd4 17.Rxd4 Rxe3 18.Rfd1, um pouco melhor para as brancas: as pretas jogaram ativo demais. Depois de 13...a6 a posição provavelmente também é um pouco melhor para as brancas. (O Stockfish vai além: depois de 17...Rxe3 18.Rfd1 as brancas já estão bem melhor.)' }],
  // Coluna 38
  ['c38', 'f', 'f', '(f)', '9... Bxc3 10 Qxc3 Qxc3 11 bxc3 Nxe5 12 Bxf6 gxf6 13 cxd5 cxd5', { a: '=', r: 'M. Gurevich', c: '9...Bxc3 10.Qxc3 Qxc3 11.bxc3 Nxe5 12.Bxf6 gxf6 13.cxd5 cxd5 é igual (M. Gurevich). (O livro marca xeque em 9...Bxc3 e 10...Qxc3, mas o cavalo de d2 bloqueia.)' }],
  ['c38', 'g', 'g', '(g)', '11... Bxc3 12 Qxc3 Qxc3+ 13 bxc3 O-O 14 Rd4', { a: '⩲', c: '11...Bxc3 12.Qxc3 Qxc3+ 13.bxc3 O-O 14.Rd4 é um pouco melhor para as brancas.' }],
  ['c38', 'h', 'h', '(h)', '12... Bxc3 13 bxc3 Qxg5 14 Qxe4+ Qe5 15 f7+', { a: '+−', c: 'Não 12...Bxc3? 13.bxc3 Qxg5 14.Qxe4+ Qe5 15.f7+, que ganha.' }],
  ['c38', 'i-A', 'i', '(i)', '14 a3 Bf8 15 fxg7 Bxg7 16 Nd6+ Ke7 17 Qe4+ Qe5', { a: '∞', c: 'Depois de 13...Qa5 14.a3 Bf8 15.fxg7 Bxg7 16.Nd6+ Ke7 17.Qe4+ Qe5 a posição é indefinida.' }],
  ['c38', 'i-B', 'i', '(i) 13...Qe5', '13... Qe5 14 f4 Qa5 15 a3 Bf8 16 fxg7 Bxg7 17 Nd6+', { a: '+−', r: 'Lutz–M. Gurevich, Munique 1993', c: 'Em Lutz–M. Gurevich as pretas erraram com 13...Qe5?, e 14.f4 Qa5 15.a3 Bf8 16.fxg7 Bxg7 17.Nd6+ ganhava para as brancas.' }],
  // Coluna 39
  ['c39', 'j-A', 'j', '(j) A', '8... dxc4 9 Bxf6 Nxf6 10 Nxc4 Qc7 11 a3 Be7 12 g3 Bd7 13 b4 O-O 14 Bg2 Rfd8 15 O-O Be8 16 Rfd1 b6 17 e4', { a: '⩲', r: 'Plachetka–Lechtýnský, Campeonato Tcheco 2002', c: '8...dxc4 9.Bxf6 Nxf6 10.Nxc4 Qc7 11.a3 Be7 12.g3 dá pequena vantagem às brancas.' }],
  ['c39', 'j-B', 'j', '(j) B', '8... Ne4 9 Ndxe4 dxe4 10 Bh4 O-O 11 a3 Bxc3+ 12 Qxc3', { a: '⩲', r: 'Hort–Janošević, Madonna di Campiglio 1974', c: '8...Ne4 9.Ndxe4 dxe4 10.Bh4 O-O 11.a3 Bxc3+ 12.Qxc3 é um pouco melhor para as brancas.' }],
  ['c39', 'k', 'k', '(k)', '11... Qb6 12 exd4 dxc4 13 Bxc4 a5 14 a4 Qc7 15 Rae1 h6 16 Bh4 Bd6 17 h3 Nb6 18 Bxf6 Nxc4 19 Ne4 Bh2+ 20 Kh1', { a: '⩲', r: 'Carlsen–Kasparov, Reykjavík (rápidas) 2004', c: '11...Qb6 12.exd4 dxc4 13.Bxc4 a5 14.a4 Qc7 15.Rae1 é um pouco melhor para as brancas.' }],
  ['c39', 'l', 'l', '(l)', '12... dxc4 13 Bxc4 Qe5 14 Nf3 Qe7', { a: '⩲', r: 'Beliavsky–Smagin, URSS 1986', c: '12...dxc4 13.Bxc4 Qe5 14.Nf3 Qe7 é um pouco melhor para as brancas.' }],
  ['c39', 'm', 'm', '(m)', '14 Bxc4 Qe5 15 Bf4 Qc5 16 Bd3 Ne5 17 Bxe5 Qxe5 18 e4', { a: '⩲', r: 'Ruban', c: '14.Bxc4 Qe5 e agora 15.Bf4 Qc5 16.Bd3 Ne5 17.Bxe5 Qxe5 18.e4, um pouco melhor para as brancas (Ruban).' }],
  ['c39-m', '1', 'm', '(m) 15.Bh4', '15 Bh4 Qe4', { a: '=', r: 'Ruban–Cvetković, Iugoslávia 1993', c: 'Não 15.Bh4 Qe4, com igualdade.' }],
  // Coluna 40
  ['c40', 'n', 'n', '(n)', '12 Na4 Qc7 13 Nxd4 dxc4 14 Bxc4 Bd6 15 Rac1 Bxh2+ 16 Kh1 Bd6 17 Nb5 Qb8 18 Be2 a6 19 Nxd6 Qxd6 20 Rfd1 Qb4 21 Rd4', { r: 'Ivanchuk–Bacrot, Wijk aan Zee 2006', c: '12.Na4 Qc7 13.Nxd4 dxc4 14.Bxc4 Bd6 15.Rac1 Bxh2+ 16.Kh1 dá às brancas jogo pelo peão.' }],
  ['c40', 'o', 'o', '(o)', '14 Qe2 Bxc3 15 bxc3 Ne4 16 Qxe4 Qxc4', { a: '∞', r: 'Azmaiparashvili–Ivanchuk, Tilburg 1994', c: 'A partida virou uma espécie de Nimzo-Índia com o cavalo branco em b3 em vez de f3. Depois de 14.Qe2 Bxc3 15.bxc3 Ne4 16.Qxe4 Qxc4 a posição ficou indefinida.' }],
  ['c40-o', '1', 'o', '(o) 14.Nb5', '14 Nb5 Qc6 15 a3 Be7 16 Na5 Qb6 17 b4 a6 18 Nc3 Qxd4 19 Rad1 Qg4 20 f4', { r: 'Azmaiparashvili', c: 'Azmaiparashvili menciona 14.Nb5 Qc6 15.a3 Be7 16.Na5 como alternativa especulativa das brancas.' }],
  // Coluna 41
  ['c41', 'p', 'p', '(p)', '7... Ne4 8 dxe6 fxe6 9 Qa4 Qxa4 10 Nxa4 Bb4+ 11 Ke2 b5 12 Nc5 Ndxc5 13 dxc5 Bxc5 14 Rc1', { a: '⩲', r: 'Filip', c: 'Nem 7...exd5 nem 7...cxd5 estão no espírito da Cambridge Springs. Ljubojević tentou 7...Ne4, mas depois de 8.dxe6 fxe6 9.Qa4 Qxa4 10.Nxa4 as brancas ficam melhor (Filip).' }],
  ['c41-p', '1', 'p', '(p) 9.Bh4', '9 Bh4', { c: '9.Bh4 também já foi jogado.' }],
  ['c41', 'q', 'q', '(q)', '8... N7b6 9 Bd3 f6 10 Bh4 Nxc3 11 bxc3 Ba3 12 Rb1', { a: '⩲', r: 'Vaganian–Smyslov, Montpellier 1985', c: '8...N7b6 9.Bd3 f6 10.Bh4 Nxc3 11.bxc3 Ba3 12.Rb1 é um pouco melhor para as brancas.' }],
  ['c41', 'r', 'r', '(r)', '9... h6 10 Bh4 c5 11 a3 Bxc3 12 bxc3 Qxa3 13 e4 N5f6 14 Bd3 Qa5 15 d5 c4 16 Bxc4 exd5 17 Bxd5', { a: '⩲', r: 'M. Gurevich–Cardon, Bélgica 1994', c: '9...h6 10.Bh4 c5 11.a3 Bxc3 12.bxc3 Qxa3 13.e4 dá às brancas compensação e pequena vantagem.' }],
  ['c41', 's', 's', '(s)', '12 a3 Bxc3 13 bxc3 exd4 14 cxd4 Qxa3 15 O-O Re8 16 e4 N5b6 17 Rfe1', { a: '∞', r: 'Rogers–Smagin, Praga 1992; Ftáčnik', c: 'Com 12.a3 Bxc3 13.bxc3 exd4 14.cxd4 Qxa3 15.O-O Re8, Ftáčnik sugere 16.e4 N5b6 17.Rfe1; não está claro se as brancas têm o bastante pelo peão.' }],
  ['c41', 't-A', 't', '(t) A', '14 Bb1 Nf8 15 Ne5 Be6 16 Qd3 Nf4 17 Qf3 N4g6 18 Bg3 Nxe5', { a: '=', r: 'Uhlmann–Smagin, Dortmund 1991', c: 'Depois de 14.Bb1 Nf8 15.Ne5 Be6 as brancas têm várias tentativas: 16.Qd3 Nf4 17.Qf3 N4g6 18.Bg3 Nxe5 é igual.' }],
  ['c41', 't-B', 't', '(t) B', '14 Bb1 Nf8 15 Ne5 Be6 16 Rfe1 c5 17 Nc4 Qa6 18 Ne3 Nxe3 19 fxe3 Bxa2', { a: '∓', r: 'Oll–Smagin, Copenhague 1993', c: '16.Rfe1 c5 17.Nc4 Qa6 18.Ne3 Nxe3 19.fxe3 Bxa2 é um pouco melhor para as pretas.' }],
  ['c41-t-B', '1', 't', '(t) B 17.Nf3', '17 Nf3', { r: 'Smagin', c: 'Smagin recomendou 17.Nf3 em vez de 17.Nc4.' }],
  // Coluna 42
  ['c42', 'u', 'u', '(u)', '11 a3 Bxc3 12 bxc3 h6 13 Bh4 Re8 14 c4 Qxd2+ 15 Nxd2 Ne7 16 O-O exd4 17 exd4 Nf8 18 Rfe1 Bf5 19 Bf1 Neg6', { a: '=', r: 'Bareev–I. Sokolov, Poikovsky 2006', c: '11.a3 Bxc3 12.bxc3 h6 13.Bh4 Re8 14.c4 Qxd2+ 15.Nxd2 leva à igualdade. (O livro traz 15...Nd7, mas já há um cavalo em d7; ficou 15...Ne7.)' }],
  ['c42', 'v', 'v', '(v)', '14 a3 Bxc3 15 bxc3 Nf8 16 Bg3 Be6 17 Rfe1 Bf7 18 c4 Qxd2 19 Nxd2 Nb6 20 Nb3 Na4 21 Bf1 Rd7 22 Na5 Ne6 23 d5 Nd4 24 dxc6 Nxc6 25 Nxc6 bxc6 26 c5 Re8 27 Rxe8+ Bxe8 28 Bd6 Bf7 29 Rb1 Bd5 30 Rb8+ Kf7 31 Rf8+ Ke6 32 g3 g6 33 Ba6 Rxd6 34 cxd6 Kxd6 35 Rxf6+ Ke5 36 Rf8 c5 37 Re8+ Kd4 38 Rd8 Ke5 39 f4+ Ke4 40 Bf1 Bb3 41 Kf2 Nb2', { a: '±', r: 'Kasparov–Smyslov, Vilnius 1984 (1–0)', c: 'Depois de 14.a3 as pretas têm duas escolhas pouco atraentes. Kasparov–Smyslov seguiu 14...Bxc3 15.bxc3 Nf8 16.Bg3, e as brancas ganharam com uma técnica de filigrana de Kasparov. (O Stockfish confirma que a posição final está ganha.)' }],
  ['c42-v', '1', 'v', '(v) 14.Qc2', '14 Qc2 Nf8 15 Nxd5 cxd5 16 Bg3 Bd6', { a: '=', c: 'Com 14.Qc2 Nf8 15.Nxd5 cxd5 16.Bg3 Bd6 as pretas igualam.' }],
  ['c42-v', '2', 'v', '(v) 14...Bd6', '14... Bd6 15 Nxd5 Qxd2 16 Nxf6+ Nxf6 17 Nxd2 Bf4 18 Rcd1 Rxd4 19 Nf3', { a: '±', r: 'Kasparov', c: 'Com 14...Bd6 15.Nxd5 Qxd2 16.Nxf6+ Nxf6 17.Nxd2 Bf4 18.Rcd1 Rxd4 19.Nf3, Kasparov considera o final muito favorável às brancas.' }],
  ['c42-v', '3', 'v', '(v) 15...Qxa3', '15... Qxa3 16 c4', { a: '±', c: 'Se 15...Qxa3, 16.c4 dá grande vantagem às brancas.' }],
]

const capitulo = {
  id: 'gdr-g',
  arquivo: 'gdr-g',
  nome: 'Gambito da Dama Recusado — Cambridge Springs (6...Qa5)',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Declined (pp. 409–411), colunas 37–42',
  base: '1. d4 d5 2. c4 e6',
  corPadrao: 'b',
  ordem: 409,
  grupos: [
    { id: 'nd2', nome: '7.Nd2', colunas: [37, 38, 39, 40] },
    { id: 'cxd5', nome: '7.cxd5', colunas: [41, 42] },
  ],
}

module.exports = { capitulo, colunas, notas }
