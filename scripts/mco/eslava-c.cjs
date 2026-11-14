// Transcrição do MCO 15ª ed. — Semi-Eslava, Meran com 10.d5 (Variante Reynolds) (pp. 467–469), colunas 13–18.
// Gerar: node scripts/mco/gerar.cjs eslava-c
// Formato: ver gambito-do-rei.cjs. Dicas em eslava-c-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Na nota (m) B o livro traz 18...Re8, ambíguo (as duas torres chegam a e8); usamos Rfe8.
// Stockfish: na nota (p) A, 15.Nxd3 O-O-O dá cerca de +1 para as brancas (o livro diz ∓); anotado.
// A nota (f) não tem lances (o bispo sai de c4 antes de a4); o comentário foi para o resumo da coluna 14.

const B = '1 d4 d5 2 c4 c6 3 Nf3 Nf6 4 Nc3 e6 5 e3 Nbd7 6 Bd3 dxc4 7 Bxc4 b5 8 Bd3 a6 9 e4 c5 10 d5'
const E = `${B} e5 11 b3`
const C = `${B} c4 11 dxe6 cxd3 12 exd7+ Qxd7`
const R = `${C} 13 O-O Bb7`

const colunas = {
  c13: [`${E} Bd6 12 O-O O-O 13 a4 c4 14 bxc4 b4 15 Ne2 Nc5 16 Ng3 Qc7 17 Be3 a5`, 'e5', '10...e5 11.b3 Bd6 13.a4', '=',
    'Com 10...e5 as pretas fecham o centro: as brancas ficam com um peão passado e protegido em d5, e as pretas com a maioria na ala da dama. Depois de 11.b3 Bd6 12.O-O O-O 13.a4 c4! as pretas sacrificam um peão para ganhar a casa c5 e impedir c4; a atividade delas compensa o material.'],
  c14: [`${E} Bd6 12 O-O O-O 13 Re1 Rb8 14 Bf1 Re8 15 a4 b4 16 Nb1 Nb6 17 Nbd2 Re7`, 'e5', '13.Re1', '±',
    'Com 13.Re1 Rb8 14.Bf1! o bispo sai do caminho de ...c4 antes de a4. Depois de 15.a4 b4 16.Nb1 Nb6 17.Nbd2 as brancas mantêm uma vantagem clara.'],
  c15: [`${E} c4 12 bxc4 Bb4 13 Bd2 bxc4 14 Bc2 O-O 15 O-O Qc7 16 Nh4 Nb6 17 Qf3 Bc5`, 'e5', '11...c4', '±',
    'Com 11...c4 12.bxc4 Bb4 13.Bd2 bxc4 14.Bc2 as pretas recuperam o peão, mas depois de 15.O-O Qc7 16.Nh4 Nb6 17.Qf3 as brancas ficam melhor.'],
  c16: [`${C} 13 Ne5 Qe7 14 Bf4 Nxe4 15 O-O Nxc3 16 bxc3 Qb7 17 Re1 Be7`, 'c4', '10...c4 13.Ne5', '=',
    'Com 10...c4 11.dxe6 cxd3 12.exd7+ Qxd7 as pretas trocam o bispo de d3 e ficam com um peão em d3. Depois de 13.Ne5 Qe7 14.Bf4 Nxe4! 15.O-O Nxc3 16.bxc3 Qb7 17.Re1 Be7 o jogo é igual (Chekhov–Alexandria, Halle 1981, empate).'],
  c17: [`${R} 14 Bg5 Be7 15 e5 Ne4 16 Bxe7 Kxe7 17 Nxe4 Bxe4`, 'c4', '13.O-O 14.Bg5', '±',
    'Com 13.O-O Bb7 14.Bg5 Be7 15.e5 Ne4 16.Bxe7 Kxe7 17.Nxe4 Bxe4 o rei preto fica no centro, mas protegido; as brancas ficam um pouco melhor (Anton–Byson, correspondência 1992).'],
  c18: [`${R} 14 Re1 Be7 15 e5 Nd5 16 Ne4 O-O 17 Qxd3 Qg4`, 'c4', '14.Re1', '=',
    'Com 14.Re1 Be7 15.e5 Nd5 16.Ne4 O-O 17.Qxd3 Qg4 as brancas recuperam o peão de d3, e as pretas ganham atividade; o jogo é igual (Rait–Boidman, Alemanha 2002).'],
}

const notas = [
  // Coluna 13
  ['c13', 'a-A', 'a', '(a) A', '10... Bb7 11 O-O Qc7 12 Bc2 c4 13 Nd4 e5 14 Nf5 g6 15 Ne3 Bc5 16 Qf3 O-O', { a: '=', r: 'Anand–van Wely, Melody Amber 2005', c: '10...Bb7 11.O-O Qc7!? 12.Bc2 c4 13.Nd4 e5 14.Nf5 g6 15.Ne3 Bc5 16.Qf3 O-O é mais ou menos igual.' }],
  ['c13', 'a-B', 'a', '(a) B', '10... exd5 11 e5 Ng4 12 Bg5 f6 13 exf6 Ndxf6 14 h3 Nh6 15 O-O Bb7 16 Re1+ Be7 17 Bxf6 gxf6 18 Qd2', { a: '±', c: '10...exd5 11.e5 Ng4 12.Bg5 f6 13.exf6 Ndxf6 14.h3 Nh6 15.O-O Bb7 16.Re1+ Be7 17.Bxf6 gxf6 18.Qd2 é melhor para as brancas.' }],
  ['c13', 'a-C', 'a', '(a) C', '10... c4 11 dxe6 fxe6 12 Bc2 Qc7 13 O-O Bb7 14 e5 Nd5 15 Ng5', { a: '+−', r: 'Novković–Duer, Campeonato da Áustria por equipes 2007', c: '10...c4 11.dxe6 fxe6 12.Bc2 Qc7 13.O-O Bb7 14.e5 Nd5 15.Ng5! dá às brancas uma vantagem enorme. (O Stockfish é mais contido: cerca de +2, vantagem clara.)' }],
  ['c13', 'b', 'b', '(b)', '13... b4 14 Ne2 Nh5 15 Nd2 Nf4 16 Nc4 Nb6 17 Nxf4 Nxc4 18 Ne6 fxe6 19 Bxc4 Qe7 20 dxe6 Bxe6 21 Bg5 Qd7 22 Qd3 Bxc4 23 Qxc4+ Qf7 24 Rac1 Qxc4 25 Rxc4', { a: '±', r: 'Agzamov–Rajković, Vršac 1983', c: 'O sacrifício 13...c4 é melhor que o passivo 13...b4 14.Ne2 Nh5?! 15.Nd2 Nf4 16.Nc4 Nb6 17.Nxf4 Nxc4 18.Ne6! fxe6 19.Bxc4 Qe7 20.dxe6 Bxe6 21.Bg5 Qd7 22.Qd3 Bxc4 23.Qxc4+ Qf7 24.Rac1 Qxc4 25.Rxc4, melhor para as brancas.' }],
  ['c13-b', '1', 'b', '(b) 14...c4', '14... c4 15 bxc4 Nc5', { c: '14...c4 15.bxc4 Nc5 volta à coluna.' }],
  ['c13', 'c-A', 'c', '(c) A', '16... a5 17 h3 Qc7 18 Nh4 g6 19 Bh6 Ne8 20 Re1 Ng7 21 Re3', { a: '±', r: 'Boleslavsky–Botvinnik, URSS 1952', c: '16...a5 17.h3 Qc7 18.Nh4 g6 19.Bh6 Ne8 20.Re1 Ng7 21.Re3 é melhor para as brancas.' }],
  ['c13-c-A', '1', 'c', '(c) 20.Bxf8', '20 Bxf8 Bxf8', { a: '∞', c: '20.Bxf8?! Bxf8 e ...Nd6 dá às pretas bom contrajogo nas casas escuras.' }],
  ['c13', 'c-B', 'c', '(c) B', '16... a5 17 Be3 Nxd3 18 Qxd3 Bg4 19 c5 Bc7 20 d6 Re8 21 Bg5 Bb8 22 h3', { a: '+−', r: 'Ikarus–Etareta, Turim 2006', c: '16...a5 17.Be3 Nxd3? 18.Qxd3 Bg4 19.c5 Bc7 20.d6 Re8 21.Bg5 Bb8 22.h3 é péssimo para as pretas.' }],
  ['c13', 'd', 'd', '(d)', '18 Bxc5 Bxc5 19 Nd2 g6 20 Nb3 Nd7 21 Qd2 Bd6 22 Ne2 Nc5 23 Nxc5 Bxc5 24 Nc1 f5 25 exf5 Bxf5 26 Bxf5 Rxf5 27 Nb3 Raf8', { a: '=', r: 'van der Sterren–Bagirov, Baku 1986', c: '18.Bxc5 Bxc5 19.Nd2 g6 20.Nb3 Nd7 21.Qd2 Bd6 22.Ne2 Nc5 23.Nxc5 Bxc5 24.Nc1 f5 25.exf5 Bxf5 26.Bxf5 Rxf5 27.Nb3 Raf8: a atividade das pretas compensa o peão a menos.' }],
  // Coluna 14
  ['c14', 'e-A', 'e', '(e) A', '13... c4 14 bxc4 b4 15 Na4', { a: '±', c: 'Aqui 13...c4 não funciona por causa de 14.bxc4 b4 15.Na4!.' }],
  ['c14', 'e-B', 'e', '(e) B', '13... Nb6 14 Bf1 Qc7 15 Bg5 Ne8 16 a4 b4 17 Nb1 a5 18 Nbd2 Bb7 19 Rc1', { a: '±', r: 'Portisch–E. Kristiansen, Skopje 1972', c: '13...Nb6 14.Bf1 Qc7 15.Bg5 Ne8 16.a4! b4 17.Nb1 a5 18.Nbd2 Bb7 19.Rc1 dá vantagem clara às brancas.' }],
  ['c14', 'g', 'g', '(g)', '14... Ne8 15 a4 Nc7 16 axb5 axb5 17 Bg5 f6 18 Be3', { a: '±', c: '14...Ne8 15.a4 Nc7 16.axb5 axb5 17.Bg5 f6 18.Be3, com a ideia Nh4, g3 e f4, dá vantagem clara às brancas.' }],
  ['c14', 'h', 'h', '(h)', '18 Bb2 Ne8 19 Rc1 f6 20 a5 Na8 21 Nc4 Rc7 22 Nfd2 Bd7 23 f4', { a: '±', r: 'Polugaevsky–Biyiasas, Petrópolis 1973', c: '18.Bb2 Ne8 19.Rc1 f6 20.a5 Na8 21.Nc4 Rc7 22.Nfd2 Bd7 23.f4! é melhor para as brancas. (O Stockfish vai além: cerca de +6.)' }],
  // Coluna 15
  ['c15', 'i', 'i', '(i)', '12... bxc4 13 Bc2 Bb4 14 Bd2', { c: '12...bxc4 13.Bc2 Bb4 14.Bd2 volta à coluna.' }],
  ['c15', 'j', 'j', '(j)', '14... Qa5 15 Ne2 c3 16 Be3 Ba3 17 O-O O-O 18 Rb1 Bc5 19 Qd3 Bxe3 20 Qxe3 Ng4 21 Qxc3 Qxc3 22 Nxc3', { a: '±', r: 'Klimov–Rumiantsev, 2003', c: '14...Qa5 leva a jogo agudo e vantagem clara das brancas: 15.Ne2 c3 16.Be3 Ba3 17.O-O O-O 18.Rb1 Bc5 19.Qd3 Bxe3 20.Qxe3 Ng4 21.Qxc3 Qxc3 22.Nxc3, com um peão a mais.' }],
  ['c15-j', '1', 'j', '(j) 15...Nxe4', '15... Nxe4 16 Bxe4 c3 17 Nxc3 Bxc3 18 O-O Bxd2 19 Nxd2 O-O 20 Nc4 Qb4 21 d6 Ra7 22 Bd5 Rd8 23 Re1', { a: '±', r: 'Honfi–Kempe, correspondência 1978–79', c: '15...Nxe4 16.Bxe4 c3 17.Nxc3 Bxc3 18.O-O Bxd2 19.Nxd2 O-O 20.Nc4 Qb4 21.d6! Ra7 22.Bd5 Rd8 23.Re1 é melhor para as brancas.' }],
  ['c15', 'k', 'k', '(k)', '18 Kh1 Rb8 19 h3 Ne8 20 Qg3 f6 21 f4 Bd6 22 fxe5 Bxe5 23 Qe3 Nd6 24 Nf3', { a: '±', r: 'Krasenkow–Moroz, Campeonato da Polônia 1994', c: '18.Kh1 Rb8 19.h3 Ne8 20.Qg3 f6 21.f4 Bd6 22.fxe5 Bxe5 23.Qe3 Nd6 24.Nf3 é melhor para as brancas.' }],
  // Coluna 16
  ['c16', 'l-A', 'l', '(l) A', '11 Bc2 Qc7 12 O-O Bc5 13 Qe2 e5 14 Nh4 O-O 15 Kh1 Bd4', { a: '∓', r: 'Kharitonov–Ivanchuk, Campeonato da URSS 1988', c: '11.Bc2 Qc7 12.O-O Bc5 13.dxe6 transporia para a coluna 21; em vez disso, 13.Qe2?! e5! 14.Nh4 O-O 15.Kh1 Bd4 é melhor para as pretas.' }],
  ['c16', 'l-B', 'l', '(l) B', '11 Bc2 Nc5 12 Bg5 b4 13 Na4 exd5 14 e5 h6 15 exf6 hxg5 16 fxg7 Bxg7 17 Nxc5 g4 18 Ba4+ Kf8 19 O-O gxf3 20 Re1 Bg4 21 Re8+ Qxe8 22 Bxe8', { a: '±', r: 'Levin–Wells, Bad Wörishofen 1995', c: 'Depois de 11.Bc2 as pretas devem evitar 11...Nc5?!: 12.Bg5 b4 13.Na4! exd5 14.e5 h6 15.exf6 hxg5 16.fxg7 Bxg7 17.Nxc5 g4 18.Ba4+ Kf8 19.O-O! gxf3 20.Re1 Bg4 21.Re8+ Qxe8 22.Bxe8, melhor para as brancas.' }],
  ['c16', 'm-A', 'm', '(m) A', '13 e5 Nd5 14 Qxd3 Nxc3 15 Qxc3 Bb7 16 O-O Rc8 17 Qb3 Be7 18 Bf4 Qf5 19 Bg3 h5 20 e6 fxe6 21 Rfe1 Bd5 22 Qe3 h4 23 Be5 O-O', { a: '∓', r: 'Scheeren–R. Kuif, Hilversum 1986', c: '13.e5 Nd5 14.Qxd3 Nxc3 15.Qxc3 Bb7 16.O-O Rc8 17.Qb3 Be7 18.Bf4 Qf5! 19.Bg3 h5! 20.e6 fxe6 21.Rfe1 Bd5 22.Qe3 h4 23.Be5 O-O é melhor para as pretas.' }],
  ['c16-m-A', '1', 'm', '(m) 15.Qxd7+', '15 Qxd7+ Bxd7 16 bxc3 Rc8 17 Bd2 Ba3', { a: '=', c: '15.Qxd7+ Bxd7 16.bxc3 Rc8 17.Bd2 Ba3 é igual.' }],
  ['c16', 'm-B', 'm', '(m) B', '13 Bg5 Be7 14 Bxf6 Bxf6 15 Nd5 Bb7 16 Nxf6+ gxf6 17 O-O O-O 18 Re1 Rfe8 19 Nd2 f5', { a: '=', r: 'Vaganian–D. Ćirić, Sant Feliu de Guíxols 1975', c: '13.Bg5 Be7 14.Bxf6 Bxf6 15.Nd5 Bb7! 16.Nxf6+ gxf6 17.O-O O-O 18.Re1 Rfe8 19.Nd2 f5 é igual. (O livro traz só 18...Re8; as duas torres podem ir a e8, e escolhemos a de f8.)' }],
  ['c16', 'n', 'n', '(n)', '14 Nxd3 b4 15 Ne2 Qxe4 16 O-O Be7 17 Ng3 Qb7 18 Bg5 O-O 19 Nh5 Nxh5 20 Bxe7 Qxe7 21 Qxh5 Qe4', { a: '=', r: 'Gligorić–Torre, Bugojno 1984', c: 'Contra 14.Nxd3 as pretas jogam com facilidade: 14...b4 15.Ne2 Qxe4 16.O-O Be7 17.Ng3 Qb7 18.Bg5 O-O 19.Nh5 Nxh5 20.Bxe7 Qxe7 21.Qxh5 Qe4, igual.' }],
  ['c16', 'o', 'o', '(o)', '18 Qxd3 O-O 19 Nd7 Qxd7 20 Qxd7 Bxd7 21 Rxe7 Be6', { a: '=', r: 'Chekhov–Alexandria, Halle 1981 (empate)', c: '18.Qxd3 O-O 19.Nd7 Qxd7 20.Qxd7 Bxd7 21.Rxe7 Be6, e os jogadores concordaram empate.' }],
  // Coluna 17
  ['c17', 'p-A', 'p', '(p) A', '14 Ne5 Qd4 15 Nf3 Qd7 16 Ne5 Qd4 17 Nf3', { a: '=', c: '14.Ne5 Qd4 15.Nf3 Qd7 16.Ne5 Qd4 17.Nf3 é empate por repetição.' }],
  ['c17-p-A', '1', 'p', '(p) 15.Nxd3', '15 Nxd3 O-O-O', { a: '∓', c: '15.Nxd3 O-O-O! é bom para as pretas. (O Stockfish discorda: cerca de +1, melhor para as brancas.)' }],
  ['c17', 'p-B', 'p', '(p) B', '14 e5 Nd5 15 Qxd3 Nxc3 16 Qxc3', { c: '14.e5 Nd5 15.Qxd3 Nxc3 16.Qxc3 transpõe para a nota (m).' }],
  ['c17-p-B', '1', 'p', '(p) 15.Ne4', '15 Ne4 Qg4 16 Qxd3 Nb4', { a: '−+', c: '15.Ne4? Qg4! 16.Qxd3? Nb4 ganha para as pretas.' }],
  ['c17', 'q-A', 'q', '(q) A', '15 Ne5 Qd4 16 Nxd3 Rd8 17 Bxf6 Bxf6 18 Nf4 O-O', { a: '∞', c: '15.Ne5 Qd4 16.Nxd3 Rd8 17.Bxf6 Bxf6 18.Nf4 O-O: o par de bispos dá às pretas boa compensação pelo peão.' }],
  ['c17', 'q-B', 'q', '(q) B', '15 Re1 O-O 16 e5 Ng4 17 Bxe7 Qxe7 18 Qxd3 Bxf3 19 Qxf3 Nxe5 20 Qg3 Rae8 21 Rad1 f6', { a: '=', r: 'Korchnoi–Flear, Wijk aan Zee 1987', c: '15.Re1 O-O 16.e5 Ng4 17.Bxe7 Qxe7 18.Qxd3 Bxf3 19.Qxf3 Nxe5 20.Qg3 Rae8 21.Rad1 f6 é igual.' }],
  ['c17', 'r-A', 'r', '(r) A', '17 Re1 Nxc3 18 bxc3 Qg4 19 h3 Bxf3 20 hxg4 Bxd1 21 Raxd1 Rhd8 22 Re3 d2', { a: '∓', r: 'Gavrikov–Chernin, Campeonato da URSS 1987', c: '17.Re1 Nxc3 18.bxc3 Qg4! 19.h3 Bxf3 20.hxg4 Bxd1 21.Raxd1 Rhd8 22.Re3 d2 é melhor para as pretas.' }],
  ['c17', 'r-B', 'r', '(r) B', '17 Qb3 Nxc3 18 Qxc3 Rhc8 19 e6 Rxc3 20 exd7 Bxf3 21 bxc3 Be2', { a: '∓', r: 'Faragó–Tukmakov, Dortmund 1987', c: '17.Qb3 Nxc3 18.Qxc3 Rhc8! 19.e6?! Rxc3 20.exd7 Bxf3 21.bxc3 Be2 é melhor para as pretas.' }],
  ['c17', 's', 's', '(s)', '18 Re1 Qd5 19 Nd2 Bg6 20 Qg4 Rhc8 21 h4 h5 22 Qb4+ Qc5 23 Qf4', { a: '±', r: 'Anton–Byson, correspondência 1992', c: '18.Re1 Qd5 19.Nd2 Bg6 20.Qg4 Rhc8 21.h4 h5 22.Qb4+ Qc5 23.Qf4 é melhor para as brancas.' }],
  // Coluna 18
  ['c18', 't', 't', '(t)', '14... Bb4 15 Ne5 Qe6 16 Nxd3 Bxc3 17 Nf4 Qd7 18 bxc3 Nxe4 19 Qxd7+ Kxd7 20 Ba3', { a: '+−', r: 'Karpov–Tal, Bugojno 1980', c: '14...Bb4 15.Ne5 Qe6 16.Nxd3 Bxc3 17.Nf4 Qd7 18.bxc3 Nxe4 19.Qxd7+ Kxd7 20.Ba3 dá às brancas uma grande vantagem. (O Stockfish é bem mais contido: cerca de +0,6, só uma pequena vantagem.)' }],
  ['c18', 'u', 'u', '(u)', '15 Bg5 O-O 16 e5', { c: '15.Bg5 O-O 16.e5 transpõe para a nota (q).' }],
  ['c18', 'v', 'v', '(v)', '16 Qxd3 Nxc3 17 Qxc3 O-O 18 Bg5 Rac8 19 Qe3 Bxg5 20 Nxg5 Rc2 21 b3 Qg4 22 Qg3 Qxg3 23 hxg3 h6 24 Ne4 Bxe4 25 Rxe4 Rd8 26 a4 Rdd2', { a: '=', r: 'Karpov–Lutz, Alemanha 1994', c: '16.Qxd3 Nxc3 17.Qxc3 O-O 18.Bg5 Rac8 19.Qe3 Bxg5 20.Nxg5 Rc2 21.b3 Qg4 22.Qg3 Qxg3 23.hxg3 h6 24.Ne4 Bxe4 25.Rxe4 Rd8 26.a4 Rdd2 é igual.' }],
  ['c18', 'w', 'w', '(w)', '18 Nfg5 Rad8 19 a3 Bxg5 20 Bxg5 Nf4 21 Qg3 Ne2+', { a: '=', r: 'Rait–Boidman, Alemanha 2002', c: '18.Nfg5! Rad8 19.a3 Bxg5 20.Bxg5 Nf4 21.Qg3 Ne2+ é igual.' }],
]

const capitulo = {
  id: 'eslava-c',
  arquivo: 'eslava-c',
  nome: 'Semi-Eslava — Meran com 10.d5 (Variante Reynolds)',
  fonte: 'Modern Chess Openings — Slav and Semi-Slav Defense (pp. 467–469), colunas 13–18',
  base: '1. d4 d5 2. c4 c6',
  corPadrao: 'b',
  ordem: 467,
  grupos: [
    { id: 'e5', nome: '10...e5', colunas: [13, 14, 15] },
    { id: 'c4', nome: '10...c4', colunas: [16, 17, 18] },
  ],
}

module.exports = { capitulo, colunas, notas }
