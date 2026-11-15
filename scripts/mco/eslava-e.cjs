// Transcrição do MCO 15ª ed. — Semi-Eslava, Meran: 8...Bb7, 8...b4, 8.Bb3 e 8.Be2 (pp. 472–473), colunas 25–30.
// Gerar: node scripts/mco/gerar.cjs eslava-e
// Formato: ver gambito-do-rei.cjs. Dicas em eslava-e-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Correções: na nota (b) B o livro traz 13...Ne7!?, impossível com a continuação 14...O-O e 20.Bxd5; a linha funciona com 13...Be7 (14...O-O em vez de 14...Qa5).
// Na nota (i) A o livro traz "15 d5" depois de 16...Bxf6; é 17.d5.
// Stockfish: na nota (g) A, depois de 26.Ne5, dá cerca de +3,5 para as brancas (o livro diz ∞); anotado.

const B = '1 d4 d5 2 c4 c6 3 Nf3 Nf6 4 Nc3 e6 5 e3 Nbd7 6 Bd3 dxc4 7 Bxc4 b5'
const S = `${B} 8 Bd3 Bb7`
const Q = `${B} 8 Bd3 b4 9 Ne4`

const colunas = {
  c25: [`${S} 9 e4 b4 10 Na4 c5 11 e5 Nd5 12 O-O cxd4 13 Re1 g6 14 Bg5 Qa5`, 'bb7', '8...Bb7 9.e4', '=',
    'Com 8...Bb7 9.e4 b4 10.Na4 c5 11.e5 Nd5 as brancas ganham espaço e as pretas ficam com o cavalo forte em d5. Depois de 12.O-O cxd4 13.Re1 g6 14.Bg5 Qa5 o jogo é igual (Yusupov–Ippolito, World Open 2006).'],
  c26: [`${S} 9 O-O b4 10 Ne4 Be7 11 Nxf6+ Nxf6 12 e4 O-O 13 e5 Nd7 14 Be4 Rb8`, 'bb7', '9.O-O', '=',
    'Com 9.O-O b4 10.Ne4 Be7 11.Nxf6+ Nxf6 12.e4 O-O 13.e5 Nd7 14.Be4 as brancas trocam um par de cavalos e pressionam pela grande diagonal; com 14...Rb8 o jogo é igual (Beliavsky–Anand, Reggio Emilia 1992).'],
  c27: [`${Q} Be7 10 Nxf6+ Nxf6 11 e4 Bb7 12 Qe2 Nd7 13 O-O O-O 14 Rd1 Qc7`, 'b4', '8...b4 9.Ne4 Be7', '=',
    'Com 8...b4 9.Ne4 Be7 10.Nxf6+ Nxf6 11.e4 Bb7 12.Qe2 Nd7! as pretas se preparam para ...c5. Depois de 13.O-O O-O 14.Rd1 Qc7! o jogo é igual (Levin–Antunes, Sevilha 1994).'],
  c28: [`${Q} Nxe4 10 Bxe4 Bb7 11 Qa4 Qb6 12 Nd2 Rc8 13 a3 bxa3 14 b3 Ba6`, 'b4', '9...Nxe4', '=',
    'Com 9...Nxe4 10.Bxe4 Bb7 11.Qa4 Qb6 12.Nd2 Rc8 13.a3 bxa3 14.b3 Ba6 as brancas sacrificam um peão por iniciativa, e o jogo é igual (Donaldson).'],
  c29: [`${B} 8 Bb3 Be7 9 O-O O-O 10 Re1 Bb7 11 e4 b4 12 Na4 c5 13 d5 exd5 14 e5 Ne8`, 'outros', '8.Bb3', '=',
    'Com 8.Bb3 Be7 9.O-O O-O 10.Re1 Bb7 11.e4 b4 12.Na4 c5 13.d5 exd5 14.e5 Ne8 o jogo é igual (Tatai–Pinter, Roma 1984).'],
  c30: [`${B} 8 Be2 Bb7 9 O-O Be7 10 e4 b4 11 e5 bxc3 12 exf6 Nxf6 13 bxc3 O-O 14 Rb1 Qc7`, 'outros', '8.Be2', '=',
    'Com 8.Be2 Bb7 9.O-O Be7 10.e4 b4 11.e5 bxc3 12.exf6 Nxf6 13.bxc3 O-O 14.Rb1 Qc7 a estrutura se simplifica e o jogo é igual (Chernin–Portisch, Reggio Emilia 1986/87).'],
}

const notas = [
  // Coluna 25
  ['c25', 'a-A', 'a', '(a) A', '13 Nxd4 g6 14 Qg4 Bg7 15 Bg5 Nxe5 16 Nxe6', { a: '±', r: 'Razuvaev–Bagirov, URSS 1987', c: 'Contra 13.Nxd4 as pretas não devem jogar 13...g6?! 14.Qg4 Bg7 15.Bg5 Nxe5 16.Nxe6!, melhor para as brancas.' }],
  ['c25', 'a-B', 'a', '(a) B', '13 Nxd4 a6 14 Nxe6 fxe6 15 Qh5+ Ke7 16 Bg5+', { a: '±', c: 'Nem 13...a6?! 14.Nxe6 fxe6 15.Qh5+ Ke7 16.Bg5+, melhor para as brancas. (O Stockfish vai além: cerca de +6.)' }],
  ['c25', 'a-C', 'a', '(a) C', '13 Nxd4 Nxe5 14 Bb5+ Nd7 15 Re1 Rc8 16 Qh5 g6 17 Qe2 a6 18 Bc4 Rxc4 19 Qxc4 Qh4 20 b3 Bd6 21 Nf3 Qxc4 22 bxc4 N5f6', { a: '=', r: 'Illescas–Dreev, Dos Hermanas 2005', c: 'O certo é 13...Nxe5 14.Bb5+ Nd7 15.Re1 Rc8 16.Qh5 g6 17.Qe2 a6!, desviando as peças de ataque, e 18.Bc4 Rxc4 19.Qxc4 Qh4 20.b3 Bd6 21.Nf3 Qxc4 22.bxc4 N5f6 dá bom jogo às pretas.' }],
  ['c25', 'b-A', 'b', '(b) A', '13... Be7 14 Nxd4 Qa5 15 Bd2 Rd8 16 a3 N5b6 17 Bb5 Nxa4 18 Bxb4', { a: '±', r: 'Kaidanov–Shabalov, Nova York 1993', c: '13...Be7 14.Nxd4 Qa5 15.Bd2 Rd8 16.a3 N5b6 17.Bb5 Nxa4 18.Bxb4! é melhor para as brancas.' }],
  ['c25', 'b-B', 'b', '(b) B', '13... Be7 14 Nxd4 O-O 15 Qg4 Re8 16 Bb5 Kh8 17 Nc6 Bxc6 18 Bxc6 Rc8 19 Bb7 Rc7 20 Bxd5 exd5 21 Bf4', { a: '⩲', r: 'Cvitan–L\'Ami, Olimpíada de Turim 2006', c: '13...Be7 14.Nxd4 O-O 15.Qg4 Re8 16.Bb5 Kh8 17.Nc6 Bxc6 18.Bxc6 Rc8 19.Bb7 Rc7 20.Bxd5 exd5 21.Bf4 é um pouco melhor para as brancas. (O livro traz 13...Ne7!?, impossível com o roque e o 20.Bxd5 que vêm depois; a linha funciona com 13...Be7.)' }],
  ['c25', 'c', 'c', '(c)', '15 Nd2 Ba6 16 Nc4 Bxc4 17 Bxc4 Bg7 18 Qxd4 Qxa4 19 Bxd5 exd5 20 Qxd5 Nb6 21 Qd6 Qd7', { a: '=', r: 'Yusupov–Ippolito, World Open 2006', c: '15.Nd2 Ba6 16.Nc4 Bxc4 17.Bxc4 Bg7 18.Qxd4 Qxa4 19.Bxd5 exd5 20.Qxd5 Nb6 21.Qd6 Qd7 é igual.' }],
  // Coluna 26
  ['c26', 'd', 'd', '(d)', '10... Nxe4 11 Bxe4 Bd6 12 Qa4 O-O 13 Bd2 f5 14 Bd3 c5 15 Be2 Rf6 16 Rfc1 Bd5 17 Qd1 Rb8', { a: '=', r: 'Kaidanov–Zu Chen, Gibraltar 2007', c: '10...Nxe4 11.Bxe4 Bd6 12.Qa4 O-O 13.Bd2 f5 14.Bd3 c5 15.Be2 Rf6 16.Rfc1 Bd5 17.Qd1 Rb8 é igual.' }],
  ['c26', 'e', 'e', '(e)', '13 Qe2 c5 14 dxc5 Nd7 15 c6 Bxc6 16 Be3 Bb7 17 Rac1 Qa5', { a: '=', r: 'Vavruk–Novikov, Dallas 2004', c: '13.Qe2 c5 14.dxc5 Nd7 15.c6 Bxc6 16.Be3 Bb7 17.Rac1 Qa5 é igual.' }],
  ['c26', 'f', 'f', '(f)', '13... Nd5 14 Qc2 g6 15 Bh6 Re8 16 Nd2', { a: '±', r: 'Mednis', c: '13...Nd5?! 14.Qc2 g6 15.Bh6 Re8 16.Nd2, com a ideia Nb3 ou Ne4 para controlar c5, é melhor para as brancas (Mednis).' }],
  ['c26', 'g-A', 'g', '(g) A', '15 a3 bxa3 16 b4 h6 17 Bb1 Bxb4 18 Qd3 f5 19 exf6 Nxf6 20 Bxh6 gxh6 21 Qg6+ Kh8 22 Qxh6+ Kg8 23 Qg5+ Kh8 24 Qh4+ Kg8 25 Qg3+ Kh8 26 Ne5', { a: '∞', r: 'Moiseenko–Novikov, Dallas 2004', c: '15.a3!? bxa3 16.b4 h6 17.Bb1 Bxb4 18.Qd3 f5 19.exf6 Nxf6 20.Bxh6 gxh6 21.Qg6+ Kh8 22.Qxh6+ Kg8 23.Qg5+ Kh8 24.Qh4+ Kg8 25.Qg3+ Kh8: aqui as brancas recusaram o empate com 26.Ne5!?, com chances pouco claras. (O Stockfish discorda: cerca de +3,5, vantagem das brancas.)' }],
  ['c26-g-A', '1', 'g', '(g) 16...Bxb4', '16... Bxb4 17 Bxh7+', { a: '+−', c: '16...Bxb4? permite o golpe 17.Bxh7+!.' }],
  ['c26', 'g-B', 'g', '(g) B', '15 Qc2 h6 16 Be3 c5 17 Bxb7 Rxb7 18 dxc5 Nxc5 19 Rfd1 Qb8 20 Qc4 Nd7', { a: '=', r: 'Beliavsky–Anand, Reggio Emilia 1992', c: '15.Qc2 h6 16.Be3 c5! 17.Bxb7 Rxb7 18.dxc5 Nxc5 19.Rfd1 Qb8 20.Qc4 Nd7 é igual.' }],
  // Coluna 27
  ['c27', 'h', 'h', '(h)', '12 O-O', { c: '12.O-O é a coluna 26 (por outra ordem de lances), igual.' }],
  ['c27', 'i-A', 'i', '(i) A', '12... Qb6 13 O-O Rc8 14 Bg5 h6 15 Bh4 c5 16 Bxf6 Bxf6 17 d5', { a: '±', r: 'Korchnoi', c: 'As pretas precisam ter cuidado: 12...Qb6 13.O-O Rc8 14.Bg5 h6 15.Bh4 c5 16.Bxf6 Bxf6 17.d5 é melhor para as brancas (Korchnoi).' }],
  ['c27', 'i-B', 'i', '(i) B', '12... c5 13 dxc5 O-O 14 O-O Nd7 15 c6 Bxc6 16 Be3 Qa5 17 Nd4 Ne5 18 f4', { a: '+−', r: 'Sriram–Prakash, Campeonato da Índia 2000 (1–0)', c: '12...c5 13.dxc5 O-O 14.O-O Nd7 15.c6 Bxc6 16.Be3 Qa5 17.Nd4 Ne5? 18.f4, e as pretas abandonaram.' }],
  ['c27', 'i-C', 'i', '(i) C', '12... O-O 13 e5 Nd7 14 Qe4 g6 15 h4 Re8 16 h5 Nf8 17 hxg6 fxg6 18 Bh6 Qd7 19 Qg4', { a: '±', r: 'Lautier–M. Gurevich, Campeonato Holandês de Blitz 2001', c: '12...O-O?! 13.e5 Nd7 14.Qe4 g6 15.h4 Re8 16.h5 Nf8 17.hxg6 fxg6 18.Bh6 Qd7 19.Qg4 dá às brancas um ataque forte.' }],
  ['c27', 'j', 'j', '(j)', '15 Be3 Rac8 16 Ba6 Qb6 17 Bxb7 Qxb7 18 Rac1 c5', { a: '=', r: 'Levin–Antunes, Sevilha 1994', c: '15.Be3 Rac8 16.Ba6 Qb6 17.Bxb7 Qxb7 18.Rac1 c5 é igual.' }],
  // Coluna 28
  ['c28', 'k', 'k', '(k)', '11 O-O Bd6 12 b3 Nf6 13 Bd3 c5 14 Bb5+ Ke7 15 Bb2 cxd4 16 Bxd4 Qa5 17 Be2 Ne4 18 Qe1 Nc3', { a: '=', r: 'Ponomariov–Motylev, Wijk aan Zee 2007', c: '11.O-O Bd6 12.b3 Nf6 13.Bd3 c5 14.Bb5+ Ke7 15.Bb2 cxd4 16.Bxd4 Qa5 17.Be2 Ne4 18.Qe1 Nc3 é igual.' }],
  ['c28', 'l', 'l', '(l)', '14 Nc4 Qa6 15 Qb3 Rb8 16 O-O c5 17 Bxb7 Qxb7 18 Qxa3 cxd4 19 Nd6+ Bxd6 20 Qxd6 Qb6 21 Qa3 Qc5 22 Qxa7 Qxa7 23 Rxa7 Nf6 24 exd4 O-O 25 Rc7 Nd5 26 Rc4 h6 27 Rd1 Rfc8 28 Rxc8+', { a: '=', r: 'Tukmakov–Ornstein, Vrnjačka Banja 1979 (empate)', c: '14.Nc4 Qa6 15.Qb3 Rb8 16.O-O c5 17.Bxb7 Qxb7 18.Qxa3 cxd4 19.Nd6+ Bxd6 20.Qxd6 Qb6 21.Qa3 Qc5 22.Qxa7 Qxa7 23.Rxa7 Nf6 24.exd4 O-O 25.Rc7 Nd5 26.Rc4 h6 27.Rd1 Rfc8 28.Rxc8+, empate: as pretas têm compensação total pelo peão.' }],
  ['c28', 'm', 'm', '(m)', '15 Nc4 Qb4+ 16 Qxb4 Bxb4+ 17 Bd2 Bxc4 18 Bxb4 Bxb3 19 Rxa3 Bd5 20 Bxd5 cxd5 21 Rxa7 Nb8 22 Re7+ Kd8 23 Rb7 Nc6 24 Bd6 Na5', { a: '=', r: 'Donaldson', c: '15.Nc4 Qb4+ 16.Qxb4 Bxb4+ 17.Bd2 Bxc4 18.Bxb4 Bxb3 19.Rxa3 Bd5 20.Bxd5 cxd5 21.Rxa7 Nb8! 22.Re7+ Kd8 23.Rb7 Nc6 24.Bd6 Na5 é igual (Donaldson).' }],
  ['c28-m', '1', 'm', '(m) 15...Qb5', '15... Qb5 16 Rxa3', { a: '±', c: '15...Qb5?! 16.Rxa3! é melhor para as brancas.' }],
  ['c28-m', '2', 'm', '(m) 22.Ra8', '22 Ra8 Kd7 23 Kd2 Nc6', { a: '=', c: '22.Ra8 Kd7 23.Kd2 Nc6 é igual.' }],
  ['c28-m', '3', 'm', '(m) 22.Bc5', '22 Bc5 Nc6 23 Rb7 Rb8', { a: '=', c: '22.Bc5 Nc6 23.Rb7 Rb8 é igual.' }],
  ['c28-m', '4', 'm', '(m) 24.Bc5', '24 Bc5 Rb8', { c: 'Se 24.Bc5, 24...Rb8.' }],
  // Coluna 29
  ['c29', 'n', 'n', '(n)', '10 e4 b4 11 e5 bxc3 12 exf6 Nxf6 13 bxc3 Bb7 14 Rb1 c5', { a: '=', r: 'Fairhurst–Reshevsky, Margate 1935', c: '10.e4 b4 11.e5 bxc3 12.exf6 Nxf6 13.bxc3 Bb7 14.Rb1 c5! é igual.' }],
  ['c29', 'o', 'o', '(o)', '13 e5 Nd5 14 Qd3 Rc8 15 Nxc5 Nxc5 16 dxc5 Rxc5 17 Bc2 g6 18 Bh6 Re8 19 Ba4 Nb6', { a: '⩱', r: 'Korchnoi–Ribli, Montpellier 1985', c: '13.e5 Nd5 14.Qd3 Rc8 15.Nxc5 Nxc5 16.dxc5 Rxc5 17.Bc2 g6 18.Bh6 Re8 19.Ba4 Nb6! dá uma pequena vantagem às pretas.' }],
  ['c29', 'p', 'p', '(p)', '15 Bxd5 Bxd5 16 Qxd5 Nb6', { a: '=', r: 'Tatai–Pinter, Roma 1984', c: '15.Bxd5 Bxd5 16.Qxd5 Nb6 é igual.' }],
  // Coluna 30
  ['c30', 'q-A', 'q', '(q) A', '9 a3 b4 10 Na4 bxa3 11 bxa3 Be7 12 O-O O-O 13 Bb2 c5', { a: '=', r: 'Karpov–Kasparov, Campeonato Mundial 1984/85 (empate)', c: '9.a3 b4! 10.Na4 bxa3 11.bxa3 Be7 12.O-O O-O 13.Bb2 c5, empate.' }],
  ['c30', 'q-B', 'q', '(q) B', '9 e4 b4 10 e5 bxc3 11 exf6 cxb2 12 fxg7 bxa1=Q 13 gxh8=Q Qa5+ 14 Bd2 Qxd1+ 15 Bxd1 Qf5 16 O-O O-O-O 17 Qg8 Be7 18 Qg7 Qg6', { a: '=', r: 'Chekhover–Suetin, URSS 1951', c: '9.e4 b4 10.e5 bxc3 11.exf6 cxb2 12.fxg7 bxa1=Q 13.gxh8=Q Qa5+ 14.Bd2 Qxd1+ 15.Bxd1 Qf5 16.O-O O-O-O 17.Qg8 Be7 18.Qg7 Qg6 é igual: as duas partes fazem dama nova.' }],
  ['c30', 'r', 'r', '(r)', '9... b4 10 Na4 c5 11 dxc5 Nxc5 12 Bb5+ Ncd7 13 Ne5 Qc7 14 Qd4 Rd8 15 Bd2 Qa5 16 Bc6 Be7 17 Rfc1 Bxc6 18 Nxc6 Qxa4 19 Nxd8 Bxd8 20 Qxb4 Qxb4 21 Bxb4 Nd5', { a: '=', r: 'Kramnik–Topalov, match pelo Campeonato Mundial 2006', c: '9...b4 10.Na4 c5 11.dxc5 Nxc5 12.Bb5+ Ncd7 13.Ne5 Qc7 14.Qd4 Rd8! 15.Bd2 Qa5 16.Bc6 Be7 17.Rfc1 Bxc6 18.Nxc6 Qxa4 19.Nxd8 Bxd8 20.Qxb4 Qxb4 21.Bxb4 Nd5 é igual.' }],
  ['c30', 's', 's', '(s)', '12... Bxf6 13 bxc3 c5 14 dxc5 Nxc5 15 Bb5+ Kf8 16 Qxd8+ Rxd8 17 Ba3 Rc8 18 Nd4 Be7 19 Rfd1 a6 20 Bf1 Na4 21 Rab1 Be4 22 Rb3 Bxa3 23 Rxa3 Nc5 24 Nb3', { a: '±', r: 'Kramnik–Topalov, match pelo Campeonato Mundial 2006', c: '12...Bxf6 13.bxc3 c5 14.dxc5 Nxc5 15.Bb5+ Kf8 16.Qxd8+ Rxd8 17.Ba3 Rc8 18.Nd4 Be7 19.Rfd1 a6 20.Bf1 Na4 21.Rab1 Be4 22.Rb3 Bxa3 23.Rxa3 Nc5 24.Nb3 é melhor para as brancas.' }],
  ['c30', 't', 't', '(t)', '15 Bf4 Qxf4 16 Rxb7 Bd6 17 g3 Qf5 18 Qa4 Ne4 19 Rc1 c5 20 Qc2 Qd5', { a: '=', r: 'Chernin–Portisch, Reggio Emilia 1986/87 (empate)', c: '15.Bf4 Qxf4 16.Rxb7 Bd6 17.g3 Qf5 18.Qa4 Ne4 19.Rc1 c5 20.Qc2 Qd5, e os jogadores concordaram empate.' }],
]

const capitulo = {
  id: 'eslava-e',
  arquivo: 'eslava-e',
  nome: 'Semi-Eslava — Meran: 8...Bb7, 8...b4, 8.Bb3 e 8.Be2',
  fonte: 'Modern Chess Openings — Slav and Semi-Slav Defense (pp. 472–473), colunas 25–30',
  base: '1. d4 d5 2. c4 c6',
  corPadrao: 'b',
  ordem: 472,
  grupos: [
    { id: 'bb7', nome: '8.Bd3 Bb7', colunas: [25, 26] },
    { id: 'b4', nome: '8.Bd3 b4', colunas: [27, 28] },
    { id: 'outros', nome: '8.Bb3 e 8.Be2', colunas: [29, 30] },
  ],
}

module.exports = { capitulo, colunas, notas }
