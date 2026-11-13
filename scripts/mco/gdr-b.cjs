// Transcrição do MCO 15ª ed. — Gambito da Dama Recusado, Variante Ortodoxa (pp. 396–397), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs gdr-b
// Formato: ver gambito-do-rei.cjs. Dicas em gdr-b-dicas.cjs.
//
// As notas (c) e (o) não trazem lances; o comentário delas entrou no resumo das colunas 7 e 11.
// Correções: na nota (m) o livro numera 10...Nh5 11.Be5 Nxe5 12.dxe5; os lances são do 9º ao 11º.
// Na nota (h) A o livro diz que 27.Rh3 é mate; falta 27...Nh6 28.Rxh6#. Na nota (q) B o livro traz 12.Qb1 (a torre de c1 está no caminho); ficou 12.Bb1.
// Na nota (r) o livro traz 18.Rxc6, mas não há peça em c6; ficou 18.Rc6.
// Na nota (u) a partida Kamsky–Salov ficou só até 18...Bb7: depois o livro traz 20.Bxc6 (nenhum bispo branco chega a c6) e pula o 21º lance.

const B = '1 d4 d5 2 c4 e6 3 Nc3 Nf6 4 Bg5 Be7 5 e3 O-O 6 Nf3 Nbd7 7 Rc1 c6 8 Bd3'
const D = `${B} dxc4 9 Bxc4 Nd5 10 Bxe7 Qxe7 11 Ne4`

const colunas = {
  c07: [`${D} Qb4+ 12 Qd2 Qxd2+ 13 Kxd2 Rd8 14 Rhd1 N5f6 15 Nxf6+ Nxf6`, 'capablanca', '11.Ne4 Qb4+', '⩲',
    'Na manobra de Capablanca, 11.Ne4 evita a troca dos cavalos. Com 11...Qb4+ as pretas trocam as damas; o final é difícil para elas, mas o próprio Capablanca o considerava defensável e o segurou mais de uma vez (por exemplo, Alekhine–Capablanca, Buenos Aires 1927).'],
  c08: [`${D} e5 12 O-O exd4 13 Qxd4 N7b6 14 Bb3 Bg4 15 Ng3 Bxf3`, 'capablanca', '11...e5 12.O-O', '⩲',
    'Com 11...e5 as pretas golpeiam o centro de imediato. Depois de 12.O-O exd4 13.Qxd4 o bispo preto sai para g4 e troca em f3; as brancas ficam com os peões dobrados, mas com uma pequena vantagem duradoura no final (Najdorf–Ståhlberg, Zurique 1953).'],
  c09: [`${D} N5f6 12 Nxf6+ Qxf6 13 Bb3 e5 14 O-O exd4 15 Qxd4 Qxd4`, 'capablanca', '11...N5f6 12.Nxf6+', '⩲',
    'Com 11...N5f6 as pretas expulsam o cavalo. Depois de 12.Nxf6+ Qxf6 elas preparam ...e5; as damas saem do tabuleiro e as brancas ficam um pouco melhor no final.'],
  c10: [`${D} N5f6 12 Ng3 b6 13 O-O c5 14 e4 Rd8 15 e5 Ng4`, 'capablanca', '12.Ng3 b6', '⩲',
    'Com 12.Ng3 as brancas evitam a troca e preparam e4. As pretas respondem com ...b6 e ...c5 contra o centro; depois de 15.e5 Ng4 as brancas ficam com pequena vantagem.'],
  c11: [`${B} h6 9 Bf4 dxc4 10 Bxc4 a6 11 Bd3 c5 12 a4 cxd4 13 exd4 Nb6 14 O-O Nbd5 15 Be5`, 'h6', '8...h6 9.Bf4', '±',
    'Com 8...h6 as pretas perguntam ao bispo onde ele vai ficar. Com 9.Bf4 e depois de ...c5 as brancas ficam com o peão isolado em d4; nessa posição típica, a maior mobilidade e o desenvolvimento das brancas compensam a fraqueza estrutural (Tolush–Konstantinopolsky, URSS 1952).'],
  c12: [`${B} h6 9 Bh4 dxc4 10 Bxc4 b5 11 Bd3 a6 12 a4 bxa4 13 Nxa4 Qa5+ 14 Nd2 Bb4 15 Nc3 c5`, 'h6', '9.Bh4 dxc4 10.Bxc4 b5', '=',
    'Com 9.Bh4 e 10...b5 as pretas ganham espaço na ala da dama e preparam ...c5. Depois de 12.a4 bxa4 e do xeque em a5 o jogo fica agudo, mas as pretas conseguem ...c5 e igualam.'],
}

const notas = [
  // Coluna 7
  ['c07', 'a-A', 'a', '(a) A', '10 Ne4 f6 11 Bf4 Nxf4 12 exf4 Nb6 13 Bb3 Bb4+', { a: '=', c: '10.Ne4 f6 11.Bf4 Nxf4 12.exf4 Nb6 13.Bb3 Bb4+ é pelo menos igual para as pretas.' }],
  ['c07-a-A', '1', 'a', '(a) A 11.Bh4', '11 Bh4 g5 12 Bg3 f5', { a: '∓', c: 'Não 11.Bh4 g5 12.Bg3 f5, seguido de ...f4.' }],
  ['c07', 'a-B', 'a', '(a) B', '10 h4 f6 11 Bf4 Nxf4 12 exf4 Nb6', { a: '∞', r: 'Eingorn–Morović, Bor 1985', c: '10.h4 f6 11.Bf4 Nxf4 12.exf4 Nb6 levou a um jogo confuso.' }],
  ['c07', 'b', 'b', '(b)', '11 Qc2 Nxc3 12 Qxc3 b6 13 O-O Bb7', { a: '=', r: 'Capablanca–Vidmar, Hastings 1929', c: '11.Qc2 Nxc3 12.Qxc3 b6 13.O-O Bb7 foi insosso.' }],
  // Coluna 8
  ['c08', 'd', 'd', '(d)', '12 dxe5 Nxe5 13 Nxe5 Qxe5 14 Bxd5 cxd5 15 Nc3 Rd8 16 Qd4 Qxd4 17 exd4', { a: '⩲', r: 'Kuloats–Kovaljov, Estônia 2001', c: '12.dxe5 Nxe5 13.Nxe5 Qxe5 14.Bxd5 cxd5 15.Nc3 leva a um final um tanto difícil para as pretas.' }],
  ['c08-d', '1', 'd', '(d) 13.Bxd5', '13 Bxd5 cxd5 14 Nc3 Bg4 15 Nxd5 Qd6', { a: '∓', r: 'Mitchell–Thomas, Edimburgo 1926', c: '13.Bxd5 cxd5 14.Nc3 Bg4 15.Nxd5 Qd6 é melhor para as pretas.' }],
  ['c08', 'e', 'e', '(e)', '16 gxf3 Qf6 17 Qxf6 Nxf6 18 Nf5 Rad8 19 Rfd1 Nc8', { a: '⩲', r: 'Najdorf–Ståhlberg, Zurique 1953', c: 'Depois de 16.gxf3 Qf6 17.Qxf6 Nxf6 18.Nf5 as brancas tiveram uma pequena vantagem duradoura no final.' }],
  ['c08-e', '1', 'e', '(e) 19...Nfd5', '19... Nfd5', { a: '⩲', c: '19...Nfd5 talvez fosse melhor.' }],
  // Coluna 9
  ['c09', 'f', 'f', '(f)', '13 O-O e5 14 e4 exd4 15 Qxd4 Qxd4 16 Nxd4 Ne5 17 Bb3', { a: '⩲', r: 'Atalik–Zheliandinov, Podlehnik 2001', c: '13.O-O e5 14.e4 exd4 15.Qxd4 Qxd4 16.Nxd4 dá pequena vantagem às brancas.' }],
  ['c09', 'g', 'g', '(g)', '16 Nxd4 Rd8 17 Rcd1 Ne5 18 f4 Ng6 19 h3 Bd7 20 Rd2', { a: '⩲', r: 'Korchnoi–Hübner, Biel 1986', c: '16.Nxd4 Rd8 17.Rcd1 Ne5 18.f4 Ng6 19.h3 Bd7 é um pouco melhor para as brancas depois do lance sugerido 20.Rd2.' }],
  // Coluna 10
  ['c10', 'h-A', 'h', '(h) A', '12... e5 13 O-O exd4 14 Nf5 Qd8 15 N3xd4 Ne5 16 Bb3 Bxf5 17 Nxf5 Qb6 18 Qd6 Ned7 19 Rfd1 Rac8 20 Qg3 g6 21 Qg5 Kh8 22 Nd6 Kg7 23 e4 Ng8 24 Rd3 f6 25 Nf5+ Kh8 26 Qxg6', { a: '+−', r: 'Alekhine–Em. Lasker, Zurique 1934', c: 'Emanuel Lasker jogou 12...e5 contra Alekhine; depois de 13.O-O exd4 14.Nf5 as brancas atacaram e as pretas abandonaram depois de 26.Qxg6. Foi a primeira vitória de Alekhine sobre Lasker.' }],
  ['c10-h-A', '1', 'h', '(h) A 17...g6', '17... g6', { c: '17...g6 era necessário e teria evitado o desastre.' }],
  ['c10-h-A', '2', 'h', '(h) A 26...hxg6', '26... hxg6 27 Rh3+ Nh6 28 Rxh6#', { a: '+−', c: 'Se 26...hxg6, 27.Rh3+ Nh6 28.Rxh6 é mate. (O livro diz que 27.Rh3 já é mate, mas as pretas ainda podem pôr o cavalo em h6.)' }],
  ['c10', 'h-B', 'h', '(h) B', '12... Qb4+ 13 Qd2 Qxd2+ 14 Kxd2', { a: '=', r: 'Dorfman–Bacrot, Val d\'Isère 2002', c: '12...Qb4+ 13.Qd2 Qxd2+ 14.Kxd2 é outro final em que as pretas provavelmente seguram.' }],
  ['c10', 'i-A', 'i', '(i) A', '14... cxd4', { c: '14...Rd8 é uma ideia recente; antes se conheciam 14...cxd4 e 14...Bb7.' }],
  ['c10', 'i-B', 'i', '(i) B', '14... Bb7', { c: '14...Bb7 era a outra continuação conhecida.' }],
  ['c10', 'j', 'j', '(j)', '16 h3 Nh6 17 d5 exd5 18 Qxd5 Rb8 19 e6 Bb7 20 Nf5 Qxe6 21 Qxe6', { a: '⩲', r: 'Yermolinsky–Orlov, EUA 1995', c: 'Depois de 16.h3 Nh6 17.d5 exd5 18.Qxd5 as brancas tiveram pequena vantagem no final.' }],
  ['c10-j', '1', 'j', '(j) 16...Nde5', '16... Ndxe5 17 Be2 Nxf2 18 Rxf2', { a: '+−', r: 'Yermolinsky', c: '16...Ndxe5 17.Be2 Nxf2 18.Rxf2 e as brancas estão ganhando.' }],
  // Coluna 11
  ['c11', 'k', 'k', '(k)', '8... dxc4 9 Bxc4 b5 10 Bd3 a6 11 a4 bxa4 12 Nxa4 Qa5+ 13 Nc3 c5 14 Ra1 Qb4 15 O-O Bb7', { a: '⩲', r: 'Vidmar–Em. Lasker, Nottingham 1936', c: 'O imediato 9...b5 10.Bd3 a6 11.a4 bxa4 12.Nxa4 Qa5+ dá pequena vantagem às brancas.' }],
  ['c11', 'l', 'l', '(l)', '9 Bxf6 Bxf6 10 O-O dxc4 11 Bxc4 e5 12 Bb3 exd4 13 exd4 Re8', { a: '=', r: 'Zysk–Georgadze, Dortmund 1984', c: '9.Bxf6 Bxf6 10.O-O dxc4 11.Bxc4 e5 leva à igualdade.' }],
  ['c11', 'm', 'm', '(m)', '9... Nh5 10 Be5 Nxe5 11 dxe5 g6', { a: '⩲', c: '9...Nh5 10.Be5 Nxe5 11.dxe5 g6 não é tão ruim para as pretas. (O livro numera os lances a partir de 10...Nh5.)' }],
  ['c11-m', '1', 'm', '(m) 11...dxc4', '11... dxc4 12 Bxc4', { a: '±', r: 'Fine–Maróczy, Zandvoort 1936', c: 'Mas não 11...dxc4 12.Bxc4, que favorece as brancas.' }],
  ['c11', 'n', 'n', '(n)', '10... Nd5 11 Bg3', { a: '⩲', c: '10...Nd5 11.Bg3 dá pequena vantagem às brancas.' }],
  // Coluna 12
  ['c12', 'p', 'p', '(p)', '10... Nd5 11 Bg3 Nxc3 12 bxc3 b6 13 O-O Bb7 14 Qe2 a6 15 Rfd1 Ba3 16 Rb1', { a: '⩲', r: 'Kalka–Levin, Holanda 2005', c: '10...Nd5 11.Bg3 Nxc3 12.bxc3 b6 dá pequena vantagem às brancas.' }],
  ['c12', 'q-A', 'q', '(q) A', '12 O-O c5 13 Qe2 Bb7 14 Rfd1 b4 15 Na4 cxd4 16 Nxd4 Qa5 17 b3 Rac8', { a: '=', r: 'Krush–Galliamova, Krasnoturinsk 2004', c: 'Há várias alternativas; 12.O-O c5 13.Qe2 Bb7 leva à igualdade.' }],
  ['c12', 'q-B', 'q', '(q) B', '12 Bb1 Bb7 13 Qc2 c5 14 dxc5 b4 15 Rd1 g5 16 Nxg5 hxg5', { a: '∞', c: '12.Bb1 Bb7 13.Qc2 c5 14.dxc5 b4 15.Rd1 g5 16.Nxg5 hxg5 é outra tentativa especulativa, difícil de avaliar. (O livro traz 12.Qb1, mas a torre de c1 está no caminho.)' }],
  ['c12', 'r', 'r', '(r)', '12... b4 13 Bxf6 gxf6 14 Ne4 f5 15 Ng3 c5 16 e4 cxd4 17 exf5 e5 18 Rc6 Nf6 19 Qc1', { a: '±', r: 'Ribli–Hennings, Leipzig 1973', c: '12...b4 13.Bxf6 gxf6 14.Ne4 f5 15.Ng3 favorece as brancas. (O livro traz 18.Rxc6, mas não há peça em c6.)' }],
  ['c12-r', '1', 'r', '(r) 13...Nxf6', '13... Nxf6 14 Ne4', { a: '⩲', c: '13...Nxf6 14.Ne4 dá pequena vantagem às brancas.' }],
  ['c12', 's', 's', '(s)', '14... c5 15 Bxf6 Bxf6 16 Nxc5 e5 17 O-O exd4 18 Nde4 Qb6 19 Qf3 Nxc5 20 Nxc5 Ra7 21 exd4 Qxb2', { a: '=', r: 'Shakhaev–Gereev, Olimpíada de Calvià 2004', c: '14...c5 15.Bxf6 Bxf6 16.Nxc5 e5 leva à igualdade.' }],
  ['c12', 't', 't', '(t)', '15 Bxf6 Nxf6 16 Nc5 e5 17 Nb3 Qb6', { a: '∓', r: 'Pachman–Rossetto, Mar del Plata 1960', c: '15.Bxf6 Nxf6 16.Nc5 e5 17.Nb3 Qb6 foi desvantajoso para as brancas.' }],
  ['c12', 'u-A', 'u', '(u) A', '16 Nc4 Qd8 17 Ne5 cxd4 18 exd4 Qb6 19 Nxd7 Nxd7 20 O-O Bb7 21 Rb1 Rfc8', { a: '=', r: 'Kaufman–Lengyel, Budapeste 2006 (empate)', c: '16.Nc4 Qd8 17.Ne5 cxd4 18.exd4 levou ao empate.' }],
  ['c12', 'u-B', 'u', '(u) B', '16 Nb3 Qd8 17 O-O cxd4 18 Nxd4 Bb7', { a: '⩲', r: 'Kamsky–Salov, Sanghi Nagar 1995', c: 'Talvez seja melhor a partida mais antiga Kamsky–Salov: 16.Nb3 Qd8 17.O-O cxd4 18.Nxd4 Bb7, e as brancas ganharam em 35 lances.' }],
]

const capitulo = {
  id: 'gdr-b',
  arquivo: 'gdr-b',
  nome: 'Gambito da Dama Recusado — Ortodoxa (11.Ne4 e 8...h6)',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Declined (pp. 396–397), colunas 7–12',
  base: '1. d4 d5 2. c4 e6',
  corPadrao: 'b',
  ordem: 396,
  grupos: [
    { id: 'capablanca', nome: 'Manobra de Capablanca com 11.Ne4', colunas: [7, 8, 9, 10] },
    { id: 'h6', nome: '8...h6', colunas: [11, 12] },
  ],
}

module.exports = { capitulo, colunas, notas }
