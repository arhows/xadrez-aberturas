// Transcrição do MCO 15ª ed. — Gambito da Dama Recusado, Variantes Modernas (pp. 403–405), colunas 25–30.
// Gerar: node scripts/mco/gerar.cjs gdr-e
// Formato: ver gambito-do-rei.cjs. Dicas em gdr-e-dicas.cjs.
//
// Correções: o cabeçalho do livro traz 4 Bg5 Be7, mas as colunas começam com 5 Bg5 e 5 Qc2; a sequência é 4 Nf3 Be7.
// Na nota (j) A o livro segue 9...Qa5 com 10 Bxc4, impossível (não houve ...dxc4) e 11...Nc6 (o cavalo está em a6); a linha ficou só até 9...Qa5.
// Na nota (f) o livro traz 16...f6, que entrega a dama (16.exd5 abre a coluna e); ficou 16...Qf6.
// As notas (e) e (cc) não trazem avaliação; o comentário de (e) entrou no resumo da coluna 25.

const B = '1 d4 d5 2 c4 e6 3 Nc3 Nf6 4 Nf3 Be7'
const H = `${B} 5 Bg5 h6 6 Bh4 O-O`

const colunas = {
  c25: [`${H} 7 Rc1 dxc4 8 e3 c5 9 Bxc4 cxd4 10 Nxd4 Bd7 11 Bg3 a6 12 e4 Nc6`, 'bh4', '6.Bh4 O-O 7.Rc1 dxc4', '⩲',
    'Nas variantes modernas as pretas jogam ...Be7 antes de ...Nbd7 e muitas vezes ...h6 cedo. Com 7.Rc1 dxc4 8.e3 c5 elas atacam o centro de imediato; depois de 12.e4 as brancas ficam com uma pequena vantagem (Karpov–Beliavsky, Dortmund 1995).'],
  c26: [`${H} 7 cxd5 Nxd5 8 Bxe7 Qxe7 9 Qb3 Nxc3 10 Qxc3 b6 11 Rc1 c6 12 e3 Bb7`, 'bh4', '7.cxd5 Nxd5', '=',
    'Com 7.cxd5 Nxd5 as pretas trocam peças, como na Variante Lasker. Depois de 9.Qb3 Nxc3 10.Qxc3 b6 elas desenvolvem o bispo em b7 e igualam.'],
  c27: [`${H} 7 Qc2 b6 8 Bxf6 Bxf6 9 e4 Nc6 10 O-O-O dxe4 11 Qxe4 Bb7 12 Bd3 g6`, 'bh4', '7.Qc2 b6', '∞',
    'Com 7.Qc2 as brancas preparam e4 e o roque grande. Depois de 8.Bxf6 Bxf6 9.e4 Nc6 as pretas pressionam d4; com os roques em lados opostos, as duas partes têm chances.'],
  c28: [`${B} 5 Bg5 h6 6 Bxf6 Bxf6 7 e4 dxe4 8 Nxe4 Nc6 9 Nxf6+ Qxf6 10 Qd2 Bd7 11 Qe3 O-O-O 12 Be2 Rhe8`, 'bxf6', '6.Bxf6 Bxf6 7.e4', '=',
    'Com 6.Bxf6 Bxf6 7.e4 as brancas ocupam o centro antes que as pretas rocem. Depois de 8...Nc6 e da troca em f6 as pretas rocam grande, pressionam d4 e igualam.'],
  c29: [`${B} 5 Qc2 O-O 6 Bg5 h6 7 Bxf6 Bxf6 8 Rd1 g6 9 e3 c6 10 Bd3 dxc4 11 Bxc4 Nd7 12 h4 Bg7`, 'qc2', '5.Qc2 O-O 6.Bg5 h6', '∞',
    'Com 5.Qc2 as brancas preparam Bg5 e Rd1 sem deixar as pretas simplificarem. Depois de 7.Bxf6 Bxf6 as pretas recolocam o bispo em g7; com 12.h4 as brancas atacam, mas as pretas podem contra-atacar no centro.'],
  c30: [`${B} 5 Qc2 O-O 6 Bg5 Nbd7 7 Rd1 dxc4 8 e4 Nb6 9 h4 Nfd7 10 Be2 Re8 11 Be3 c6 12 e5 Nf8`, 'qc2', '6...Nbd7 7.Rd1 dxc4', null,
    'Com 6...Nbd7 7.Rd1 dxc4 8.e4 as pretas ganham um peão, mas as brancas ficam com o centro forte. Com 9.h4 elas preparam o ataque, e as pretas se defendem com ...Re8 e ...Nf8 (Kramnik–Beliavsky, Dortmund 1995).'],
}

const notas = [
  // Coluna 25
  ['c25', 'a', 'a', '(a)', '8 e4 Nc6 9 e5 Nd5 10 Bxe7 Ncxe7 11 Bxc4 b6 12 Ne4 Bb7 13 O-O Nf5 14 a3 Nde3 15 fxe3 Bxe4 16 Qe2 c5 17 Nd2 Bb7 18 dxc5 Qg5 19 c6 Bxc6 20 Bxe6 Ne7', { a: '=', r: 'Kacheishvili–Dautov, Ohrid 2001', c: '8.e4 Nc6 9.e5 Nd5 10.Bxe7 Ncxe7 levou a um jogo animado, com chances mais ou menos iguais.' }],
  ['c25', 'b', 'b', '(b)', '10 exd4 Nc6 11 O-O Nh5 12 Bxe7 Nxe7', { a: '=', r: 'Korchnoi–Karpov, Merano 1981', c: '10.exd4 Nc6 11.O-O Nh5 12.Bxe7 Nxe7 foi igual.' }],
  ['c25', 'c-A', 'c', '(c) A', '11 O-O', { r: 'Karpov–Kasparov, Moscou 1984', c: '11.O-O foi jogado antes, em Karpov–Kasparov.' }],
  ['c25', 'c-B', 'c', '(c) B', '11 Be2 Nc6 12 Nb3 Nd5', { a: '=', r: 'Korchnoi–Karpov, Merano 1981', c: '11.Be2 Nc6 12.Nb3 Nd5 também foi jogado antes, com igualdade.' }],
  ['c25', 'd', 'd', '(d)', '11... Nc6 12 Ndb5 a6 13 Nd6 b5', { a: '∞', r: 'Karpov', c: 'Karpov recomenda 11...Nc6 12.Ndb5 a6 13.Nd6 b5, com contrajogo para as pretas.' }],
  // Coluna 26
  ['c26', 'f', 'f', '(f)', '9 e4 Nxc3 10 bxc3 c5 11 Bd3 cxd4 12 cxd4 Nc6 13 O-O Rd8 14 d5 Nb4 15 Re1 exd5 16 exd5 Qf6', { a: '∓', r: 'Pokorný–Neckář, Campeonato Tcheco 2001', c: 'Há outros lances aqui (9.Rc1, 9.g3, 9.e3, 9.Nxd5), mas não 9.e4?!: depois de 9...Nxc3 10.bxc3 c5 as pretas ganharam o peão d. (O livro traz 16...f6, que deixaria a dama de e7 sem defesa diante da torre de e1; ficou 16...Qf6.)' }],
  ['c26', 'g', 'g', '(g)', '9... Rd8', { a: '⩲', c: '9...Rd8 é um lance mais antigo, um pouco melhor para as brancas.' }],
  ['c26', 'h', 'h', '(h)', '13 Be2 Nd7 14 O-O c5 15 dxc5 Nxc5 16 b4 Na6 17 a3 Rac8 18 Qb3 Nb8 19 Qa4 a6 20 Nd4 Rc7', { a: '=', r: 'M. Gurevich', c: 'Depois de 13.Be2 Nd7 14.O-O c5 15.dxc5 Nxc5 16.b4 as pretas deveriam jogar 16...Na6 17.a3 Rac8, com igualdade.' }],
  ['c26-h', '1', 'h', '(h) 16...Ne4', '16... Ne4', { r: 'M. Gurevich–Hjartarson, Groningen 1993', c: 'Não 16...Ne4, como em M. Gurevich–Hjartarson.' }],
  // Coluna 27
  ['c27', 'i', 'i', '(i)', '7 Qb3 c5 8 dxc5 Nbd7 9 e3 Nxc5 10 Qc2 b6', { a: '=', r: 'Kurajica–Kir. Georgiev, Sarajevo 1985', c: '7.Qb3 c5 8.dxc5 Nbd7 9.e3 Nxc5 não levou a nada.' }],
  ['c27', 'j-A', 'j', '(j) A', '7... Na6 8 e3 c5 9 dxc5 Qa5', { r: 'M. Gurevich–Vaganian, Moscou 2001', c: '7...Na6 8.e3 c5 9.dxc5 Qa5 levou à igualdade em M. Gurevich–Vaganian. (O livro continua com 10.Bxc4, que é impossível; a linha ficou só até aqui.)' }],
  ['c27-j-A', '1', 'j', '(j) A 8.Rd1', '8 Rd1 b6 9 Bxf6 Bxf6 10 e4 c6', { a: '=', r: 'Torre–Karpov, Bruxelas 1986', c: '8.Rd1 b6 9.Bxf6 Bxf6 10.e4 c6 foi sólido para as pretas.' }],
  ['c27', 'k', 'k', '(k)', '8 Rd1 Bb7 9 Bxf6 Bxf6 10 cxd5 exd5 11 g3 Qe7', { a: '=', r: 'T. Petrosian–Klovans, Jūrmala 1983', c: '8.Rd1 Bb7 9.Bxf6 Bxf6 10.cxd5 exd5 foi igual.' }],
  ['c27', 'l', 'l', '(l)', '9... c5 10 e5 Be7 11 cxd5 exd5 12 dxc5 bxc5 13 O-O-O', { a: '±', r: 'Zaitsev–Krogius, Sóchi 1976', c: '9...c5 10.e5 Be7 11.cxd5 exd5 12.dxc5 bxc5 13.O-O-O foi muito melhor para as brancas.' }],
  ['c27', 'm', 'm', '(m)', '10... dxc4 11 e5 Be7 12 Bxc4 Bb7 13 a3', { a: '⩲', r: 'Hjartarson', c: '10...dxc4 é respondido por 11.e5 Be7 12.Bxc4 Bb7 13.a3, com a ideia d5.' }],
  ['c27', 'n', 'n', '(n)', '13 h4 Rb8 14 Qg4 Bg7 15 Be2 Ne7', { a: '∞', r: 'Ree–Hjartarson, Reykjavík 1984', c: 'Em Ree–Hjartarson seguiu 13.h4 Rb8 14.Qg4 Bg7 15.Be2 Ne7, com chances para os dois lados.' }],
  // Coluna 28
  ['c28', 'o', 'o', '(o)', '7 cxd5 exd5 8 g3 O-O 9 Bg2 c6 10 O-O Be7 11 Qc2 Be6', { a: '=', r: 'Timman–Kavalek, Bugojno 1982', c: '7.cxd5 exd5 8.g3 O-O 9.Bg2 c6 leva à igualdade.' }],
  ['c28', 'p', 'p', '(p)', '9 d5 Ne5 10 Nxf6+ Qxf6 11 Nxe5 Qxe5+ 12 Qe2 Qf6 13 g3 O-O', { a: '=', r: 'P. Nikolić–Tal, Wijk aan Zee 1982', c: '9.d5 Ne5 10.Nxf6+ Qxf6 11.Nxe5 Qxe5+ leva a uma igualdade simples.' }],
  ['c28-p', '1', 'p', '(p) 10.Be2', '10 Be2 O-O 11 Qb3 exd5 12 cxd5 c6', { a: '∓', r: 'Romanishin–Geller, URSS 1978', c: '10.Be2 O-O 11.Qb3 exd5 12.cxd5 c6 foi bom para as pretas.' }],
  ['c28', 'q', 'q', '(q)', '10 Qd3 O-O 11 Qe4 Bd7 12 Bd3 g6 13 O-O', { a: '=', r: 'Beliavsky–Georgadze, URSS 1978', c: 'A alternativa 10.Qd3 O-O 11.Qe4 Bd7 12.Bd3 g6 é mais ou menos igual.' }],
  ['c28-q', '1', 'q', '(q) 10...b6', '10... b6 11 Qe4 Bb7 12 Ne5 O-O-O 13 Nxc6 Rd6', { a: '=', r: 'Tatai–Geller, Las Palmas 1979', c: 'Também 10...b6 11.Qe4 Bb7 12.Ne5 O-O-O leva à igualdade.' }],
  ['c28', 'r', 'r', '(r)', '10... O-O 11 O-O-O e5 12 dxe5 Nxe5 13 Qd4', { a: '=', r: 'Tatai–Korchnoi, Roma 1981', c: '10...O-O também é bem jogável: 11.O-O-O e5 12.dxe5 Nxe5 13.Qd4 foi igual.' }],
  ['c28-r', '1', 'r', '(r) 12.d5', '12 d5 e4 13 dxc6 exf3 14 gxf3 Qxc6', { a: '∓', r: 'Ward–Summerscale, Campeonato Britânico 2000', c: '12.d5?! e4 13.dxc6 exf3 14.gxf3 Qxc6 é um pouco melhor para as pretas.' }],
  ['c28', 's', 's', '(s)', '13 O-O Kb8 14 Ne5 Nxe5 15 dxe5 Qg5', { a: '=', r: 'Vladimirov–Kholmov, Leningrado 1967 (empate)', c: 'A partida terminou 13.O-O Kb8 14.Ne5 Nxe5 15.dxe5 Qg5, empate.' }],
  // Coluna 29
  ['c29', 't', 't', '(t)', '5... c5 6 cxd5 cxd4 7 Nxd4 O-O 8 Bg5 Nxd5 9 Bxe7 Nxe7 10 Rd1 Qb6 11 Qb3', { a: '=', r: 'Radjabov–Ponomariov, Linares 2003 (empate)', c: '5...c5 6.cxd5 cxd4 7.Nxd4 O-O 8.Bg5 Nxd5 levou ao empate.' }],
  ['c29-t', '1', 't', '(t) 6.dxc5', '6 dxc5 d4 7 Nb5 e5 8 Nxe5 a6', { a: '∞', r: 'Khalifman–Topalov, Dubai 2002', c: '6.dxc5 d4 7.Nb5 e5 8.Nxe5 a6 levou a um jogo selvagem.' }],
  ['c29', 'u-A', 'u', '(u) A', '8 e4 dxe4 9 Qxe4 c5 10 O-O-O Qa5 11 Bd3 g6', { a: '⩲', c: '8.e4 dxe4 9.Qxe4 c5 10.O-O-O Qa5 11.Bd3 g6 provavelmente favorece as brancas.' }],
  ['c29-u-A', '1', 'u', '(u) A 10.Bd3', '10 Bd3 g6 11 dxc5 Nd7 12 Qe3 Qa5', { a: '∓', r: 'Barbero–Pétursson, Salônica 1984', c: '10.O-O-O é melhor que 10.Bd3 g6 11.dxc5 Nd7 12.Qe3 Qa5, que favorece um pouco as pretas.' }],
  ['c29-u-A', '2', 'u', '(u) A 11...Rd8', '11... Rd8 12 Qh7+ Kf8 13 Ne4', { a: '±', r: 'Trifunović–Rossetto, Mar del Plata 1950', c: 'Não 11...Rd8 12.Qh7+ Kf8 13.Ne4, que favorece as brancas.' }],
  ['c29', 'u-B', 'u', '(u) B', '8 O-O-O c5 9 dxc5 d4 10 Ne4 e5 11 e3 Nc6 12 exd4 exd4 13 a3 Bg4 14 Be2 b6 15 cxb6 axb6', { a: '∞', r: 'Chekhov–Bönsch, Leipzig 1986', c: '8.O-O-O c5 9.dxc5 d4 10.Ne4 e5: as pretas tiveram boa compensação.' }],
  ['c29-u-B', '1', 'u', '(u) B 10.e3', '10 e3 dxc3 11 Rxd8 cxb2+ 12 Kb1 Rxd8', { a: '∞', r: 'Ree–Boersma, Holanda 1985', c: '10.e3 leva ao sacrifício de dama 10...dxc3 11.Rxd8 cxb2+ 12.Kb1 Rxd8, indefinido.' }],
  ['c29', 'v-A', 'v', '(v) A', '8... c6 9 e4 b6 10 Bd3 dxe4 11 Bxe4 Bb7 12 O-O Nd7 13 b4', { a: '⩲', r: 'Romanishin–Tarjan, Hastings 1976', c: '8...c6 9.e4 b6 10.Bd3 dxe4 11.Bxe4 dá pequena vantagem às brancas.' }],
  ['c29', 'v-B', 'v', '(v) B', '8... c5 9 dxc5 Qa5 10 cxd5 exd5 11 Qd2 Bxc3 12 Qxc3 Qxc3+ 13 bxc3 Be6 14 Nd4 Rc8 15 e4', { a: '±', r: 'Romanishin–Beliavsky, Leningrado 1977', c: '8...c5 9.dxc5 Qa5 10.cxd5 exd5 11.Qd2 favoreceu as brancas.' }],
  ['c29', 'w', 'w', '(w)', '9 e4 dxe4 10 Nxe4 Bg7 11 Be2 Nc6', { a: '∞', r: 'Kramnik', c: '9.e4 dxe4 10.Nxe4 Bg7 11.Be2 Nc6 seria indefinido, segundo Kramnik.' }],
  ['c29', 'x', 'x', '(x)', '12 O-O Bg7 13 e4 Qe7 14 e5 c5', { r: 'Kramnik', c: '12.O-O Bg7 13.e4 Qe7 14.e5 c5 era outra possibilidade (Kramnik).' }],
  ['c29-x', '1', 'x', '(x) 13.b4', '13 b4', { r: 'Kramnik', c: 'Ou talvez 13.b4.' }],
  ['c29', 'y', 'y', '(y)', '13 a3 Qe7 14 Ba2 b6 15 Bb1 h5 16 O-O Bb7 17 Ng5 Rfd8 18 Ba2 Nf6 19 e4 Ng4 20 e5 Rd7 21 Ne2 Rad8 22 Bxe6 fxe6 23 Qxg6 Nxe5 24 Qh7+ Kf8 25 Nf4', { a: '+−', r: 'Kramnik–Short, Dortmund 1995', c: 'A posição é indefinida: o ataque branco pode ser respondido com golpes no centro. Kramnik–Short seguiu 13.a3 Qe7 14.Ba2 b6 e terminou com um final brilhante: as pretas abandonaram depois de 25.Nf4.' }],
  ['c29-y', '1', 'y', '(y) 20...c5', '20... c5', { c: '20...c5 era a alternativa.' }],
  // Coluna 30
  ['c30', 'z', 'z', '(z)', '9 Be2 Nfd5 10 Bxe7 Nxe7 11 Ne5 Ng6 12 Nxc4 Nxc4 13 Bxc4 e5 14 dxe5 Qg5 15 O-O Nxe5 16 f4 Qe7 17 Bb3 Qc5+ 18 Qf2 Qxf2+ 19 Rxf2 Ng4 20 Rf3', { a: '⩲', r: 'Eingorn–Kveinys, Bad Wörishofen 2005', c: '9.Be2 Nfd5 10.Bxe7 Nxe7 11.Ne5 leva a um final um pouco melhor para as brancas.' }],
  ['c30', 'aa', 'aa', '(aa)', '9... h6 10 Bxf6 Bxf6 11 g4', { a: '±', c: 'Não 9...h6?! 10.Bxf6 Bxf6 11.g4, com ataque.' }],
  ['c30', 'bb', 'bb', '(bb)', '11... Nf8 12 h5 h6 13 Ne5', { a: '±', r: 'Kramnik', c: '11...Nf8 12.h5 h6 13.Ne5 favorece as brancas (Kramnik).' }],
  ['c30', 'cc', 'cc', '(cc)', '13 Ne4 Bd7 14 O-O', { r: 'Kramnik–Beliavsky, Dortmund 1995', c: 'Kramnik–Beliavsky seguiu 13.Ne4 Bd7 14.O-O.' }],
]

const capitulo = {
  id: 'gdr-e',
  arquivo: 'gdr-e',
  nome: 'Gambito da Dama Recusado — Variantes modernas (4.Nf3 Be7)',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Declined (pp. 403–405), colunas 25–30',
  base: '1. d4 d5 2. c4 e6',
  corPadrao: 'b',
  ordem: 403,
  grupos: [
    { id: 'bh4', nome: '5.Bg5 h6 6.Bh4', colunas: [25, 26, 27] },
    { id: 'bxf6', nome: '6.Bxf6', colunas: [28] },
    { id: 'qc2', nome: '5.Qc2', colunas: [29, 30] },
  ],
}

module.exports = { capitulo, colunas, notas }
