// Transcrição do MCO 15ª ed. — Semi-Eslava, 6.Bd3 sem a Meran e 6.Qc2 (pp. 474–475), colunas 31–36.
// Gerar: node scripts/mco/gerar.cjs eslava-f
// Formato: ver gambito-do-rei.cjs. Dicas em eslava-f-dicas.cjs.
//
// A tabela desta página só traz avaliação no fim da coluna 34 (=); nas outras usamos a avaliação da nota que continua a coluna.
// A nota (o) não tem lances (Krasenkow–Knaak, Bundesliga 2007, jogo agudo para os dois lados); o comentário foi para o resumo da coluna 34.
// Correções: na nota (j) B o livro numera "12 Rfe1 Nf8" depois de 12.Nd2 Qe7; é 13.Rfe1.

const B = '1 d4 d5 2 c4 c6 3 Nf3 Nf6 4 Nc3 e6 5 e3 Nbd7'
const Q = `${B} 6 Qc2 Bd6`

const colunas = {
  c31: [`${B} 6 Bd3 Bb4 7 a3 Ba5 8 O-O O-O 9 Qc2 dxc4 10 Bxc4 Bc7 11 Ba2 e5 12 h3 h6`, 'bd3', '6.Bd3 Bb4', '±',
    'Com 6.Bd3 Bb4 as pretas fogem da Meran e cravam o cavalo. Depois de 7.a3 Ba5 8.O-O O-O 9.Qc2 dxc4 10.Bxc4 Bc7 11.Ba2! e5 12.h3 h6 as brancas ficam melhor (Kasparov–van der Wiel, Bruxelas 1987).'],
  c32: [`${B} 6 Bd3 Bd6 7 e4 dxe4 8 Nxe4 Nxe4 9 Bxe4 O-O 10 O-O h6 11 Bc2 e5 12 Qd3 f5`, 'bd3', '6...Bd6', '±',
    'Com 6...Bd6 7.e4 as brancas abrem o centro de imediato. Depois de 7...dxe4 8.Nxe4 Nxe4 9.Bxe4 O-O 10.O-O h6 11.Bc2 e5 12.Qd3 f5 as brancas ficam melhor (Kazhgaleyev–Askarov, Moscou 2007).'],
  c33: [`${Q} 7 g4 Bb4 8 Bd2 Qe7 9 g5 Bxc3 10 Bxc3 Ne4 11 Bd3 Nxc3 12 Qxc3 dxc4`, 'qc2', '6.Qc2 Bd6 7.g4 Bb4', '=',
    'Com 6.Qc2 Bd6 7.g4!? as brancas atacam na ala do rei, a ideia de Shabalov. Depois de 7...Bb4 8.Bd2 Qe7 9.g5 Bxc3 10.Bxc3 Ne4 11.Bd3 Nxc3 12.Qxc3 dxc4 o jogo é igual (Krasenkow–Henrichs, Vlissingen 2006).'],
  c34: [`${Q} 7 g4 dxc4 8 Bxc4 e5 9 g5 Nd5 10 Bd2 O-O 11 Ne4 Bc7 12 h4 exd4`, 'qc2', '7...dxc4', '=',
    'Com 7...dxc4 8.Bxc4 e5 9.g5 Nd5 10.Bd2 O-O 11.Ne4 Bc7 12.h4 exd4 a posição fica aguda, com jogo para os dois lados (Krasenkow–Knaak, Bundesliga 2007).'],
  c35: [`${Q} 7 e4 dxe4 8 Nxe4 Nxe4 9 Qxe4 e5 10 dxe5 O-O 11 exd6 Re8 12 Qxe8+ Qxe8+`, 'qc2', '7.e4', '±',
    'Com 7.e4 dxe4 8.Nxe4 Nxe4 9.Qxe4 e5 10.dxe5 O-O 11.exd6 Re8 12.Qxe8+ Qxe8+ as brancas ficam com torre e peões pela dama, e a posição é melhor para elas (Abdulla–Neelotpal, 1999).'],
  c36: [`${Q} 7 Bd2 O-O 8 O-O-O b5 9 cxb5 c5 10 e4 Bb7 11 exd5 Nxd5 12 Ng5 g6`, 'qc2', '7.Bd2', '=',
    'Com 7.Bd2 O-O 8.O-O-O as brancas rocam grande, e as pretas sacrificam um peão com 8...b5 9.cxb5 c5. Depois de 10.e4 Bb7 11.exd5 Nxd5 12.Ng5 g6 as peças ativas e a coluna c compensam o peão; o jogo é igual.'],
}

const notas = [
  // Coluna 31
  ['c31', 'a-A', 'a', '(a) A', '7... Bxc3+ 8 bxc3 O-O 9 O-O b6 10 Bb2 Qc7 11 Qe2', { a: '⩲', r: 'Zhang Huining–Yu Ruiyan, China 2001', c: '7...Bxc3+ 8.bxc3 O-O 9.O-O b6 10.Bb2 Qc7 11.Qe2 é um pouco melhor para as brancas.' }],
  ['c31', 'a-B', 'a', '(a) B', '7... Bd6 8 e4 dxe4 9 Nxe4 Nxe4 10 Bxe4 e5 11 O-O O-O 12 Bc2 Re8 13 Re1 exd4 14 Rxe8+ Qxe8 15 Qxd4 Be7 16 Bg5', { a: '±', r: 'Kasparov–Hübner, Bruxelas 1986', c: '7...Bd6 8.e4 dxe4 9.Nxe4 Nxe4 10.Bxe4 e5 11.O-O O-O 12.Bc2 Re8 13.Re1 exd4 14.Rxe8+ Qxe8 15.Qxd4 Be7 16.Bg5! é melhor para as brancas.' }],
  ['c31-a-B', '1', 'a', '(a) 12.dxe5', '12 dxe5 Nxe5 13 Nxe5 Bxe5 14 Bxh7+ Kxh7 15 Qh5+ Kg8 16 Qxe5 Qd3 17 c5 Be6', { a: '=', c: 'As brancas podem ganhar um peão com 12.dxe5, mas depois de 16...Qd3! 17.c5 Be6 e ...Bd5 o final tende ao empate. Com o peão ainda em a2 (coluna 32) o mesmo sacrifício não funciona.' }],
  ['c31', 'b', 'b', '(b)', '9... Qe7 10 Bd2 dxc4 11 Bxc4 e5 12 Ba2 Bxc3 13 Bxc3 exd4 14 Nxd4', { a: '±', r: 'Rogoff–Lombardy, Campeonato dos EUA 1978', c: '9...Qe7 10.Bd2 dxc4 11.Bxc4 e5 12.Ba2! Bxc3 13.Bxc3 exd4 14.Nxd4 é melhor para as brancas.' }],
  ['c31', 'c', 'c', '(c)', '13 e4 Re8 14 Be3', { a: '±', r: 'Kasparov–van der Wiel, Bruxelas 1987', c: '13.e4 Re8 14.Be3 é melhor para as brancas.' }],
  // Coluna 32
  ['c32', 'd', 'd', '(d)', '6... Be7 7 b3 O-O 8 O-O b6 9 Bb2 Bb7 10 Qe2 Rc8 11 e4 dxe4 12 Nxe4 c5 13 Rad1 Qc7 14 dxc5 bxc5 15 Rfe1 Rfd8 16 Neg5', { a: '±', r: 'Chernin–Utasi, Starý Smokovec 1984', c: '6...Be7 7.b3 O-O 8.O-O b6 9.Bb2 Bb7 10.Qe2 Rc8 11.e4 dxe4 12.Nxe4 c5 13.Rad1 Qc7 14.dxc5 bxc5 15.Rfe1! Rfd8 16.Neg5 é melhor para as brancas.' }],
  ['c32', 'e', 'e', '(e)', '7 O-O O-O 8 e4 dxc4 9 Bxc4 e5 10 Bg5 h6 11 Bh4 Qe7', { a: '=', c: 'Adiar e4 um lance facilita a vida das pretas: 7.O-O O-O 8.e4 dxc4! 9.Bxc4 e5 10.Bg5 h6 11.Bh4 Qe7, igual.' }],
  ['c32', 'f', 'f', '(f)', '7... dxc4 8 Bxc4 e5 9 dxe5 Nxe5 10 Nxe5 Bxe5 11 Qxd8+ Kxd8 12 Bxf7', { a: '±', c: 'A troca em e4 é obrigatória: 7...dxc4 8.Bxc4 e5 9.dxe5 Nxe5 10.Nxe5 Bxe5 11.Qxd8+ Kxd8 12.Bxf7 é bom para as brancas.' }],
  ['c32', 'g-A', 'g', '(g) A', '10... e5 11 dxe5 Nxe5 12 Nxe5 Bxe5 13 Bxh7+ Kxh7 14 Qh5+ Kg8 15 Qxe5', { a: '±', c: '10...h6 prepara ...e5; jogado já, 10...e5 perde um peão: 11.dxe5 Nxe5 12.Nxe5 Bxe5 13.Bxh7+ Kxh7 14.Qh5+ Kg8 15.Qxe5.' }],
  ['c32', 'g-B', 'g', '(g) B', '10... c5 11 Bc2 b6 12 Qd3 g6 13 Bh6 Re8 14 Rad1 Bf8 15 dxc5 Bxh6 16 c6', { a: '⩲', r: 'Rubinstein–Bogoljubow, Triberg 1921', c: '10...c5 11.Bc2 b6 12.Qd3 g6 13.Bh6 Re8 14.Rad1 Bf8 15.dxc5 Bxh6 16.c6 deixa as brancas com uma pequena vantagem.' }],
  ['c32', 'h-A', 'h', '(h) A', '12 b3 Re8 13 Re1 exd4 14 Rxe8+ Qxe8 15 Qxd4 Bc5 16 Qd3 Nf6 17 Bb2 Qd7 18 Qc3 Qe7', { a: '=', r: 'Stohl–Krasenkow, Brno 1994', c: '12.b3 Re8 13.Re1 exd4 14.Rxe8+ Qxe8 15.Qxd4 Bc5 16.Qd3 Nf6 17.Bb2 Qd7! 18.Qc3 Qe7 é igual.' }],
  ['c32', 'h-B', 'h', '(h) B', '12 Re1 Bb4 13 Bd2 Bxd2 14 Qxd2 exd4 15 Nxd4 Nf6 16 Rad1 Qc7', { a: '=', r: 'Bagirov–Chernikov, URSS 1975', c: '12.Re1 Bb4 13.Bd2 Bxd2 14.Qxd2 exd4 15.Nxd4 Nf6 16.Rad1 Qc7 é igual.' }],
  ['c32', 'i', 'i', '(i)', '13 c5 Bc7 14 Qc4+ Kh8 15 dxe5 Nxe5 16 Nxe5 Bxe5 17 Bf4 Qd4 18 Qxd4 Bxd4 19 Bd6 Re8 20 Rfe1', { a: '±', r: 'Kazhgaleyev–Askarov, Moscou 2007', c: '13.c5 Bc7 14.Qc4+ Kh8 15.dxe5 Nxe5 16.Nxe5 Bxe5 17.Bf4 Qd4 18.Qxd4 Bxd4 19.Bd6 Re8 20.Rfe1 é melhor para as brancas.' }],
  // Coluna 33
  ['c33', 'j-A', 'j', '(j) A', '7 Bd3 O-O 8 O-O dxc4 9 Bxc4 b5 10 Bd3 Bb7 11 e4 e5 12 dxe5 Nxe5 13 Nxe5 Bxe5 14 h3 Re8 15 Be3 Qe7 16 Rae1 a6', { a: '=', r: 'Portisch–Tukmakov, Reggio Emilia 1987/88', c: '7.Bd3 O-O 8.O-O dxc4 9.Bxc4 b5 10.Bd3 Bb7 11.e4 e5 12.dxe5 Nxe5 13.Nxe5 Bxe5 14.h3 Re8 15.Be3 Qe7 16.Rae1 a6 é igual.' }],
  ['c33', 'j-B', 'j', '(j) B', '7 b3 O-O 8 Be2 Re8 9 O-O dxc4 10 bxc4 e5 11 Bb2 e4 12 Nd2 Qe7 13 Rfe1 Nf8', { a: '=', r: 'Taimanov–Barbera, Montpellier 1986', c: '7.b3 O-O 8.Be2 Re8 9.O-O dxc4 10.bxc4 e5 11.Bb2 e4 12.Nd2 Qe7 13.Rfe1 Nf8 dá às pretas chances pelo menos iguais.' }],
  ['c33', 'k-A', 'k', '(k) A', '7... h6 8 Rg1 Qe7 9 h4 dxc4 10 e4 e5 11 g5 Nh5 12 Bxc4 exd4 13 Nxd4 Nb6 14 Be2 Nf4 15 Be3 h5 16 O-O-O g6 17 Kb1 Bd7', { a: '=', r: 'Nakamura–Shabalov, Foxwoods 2007', c: 'As alternativas podem ser tão boas: 7...h6 8.Rg1 Qe7 9.h4 dxc4 10.e4 e5 11.g5 Nh5 12.Bxc4 exd4 13.Nxd4 Nb6 14.Be2 Nf4 15.Be3 h5 16.O-O-O g6 17.Kb1 Bd7, igual.' }],
  ['c33', 'k-B', 'k', '(k) B', '7... Nxg4 8 Rg1 Qf6 9 Rxg4 Qxf3 10 Rxg7 Nf6 11 Rg5 Ne4 12 Nxe4 Qxe4 13 Qxe4 dxe4 14 Rh5 f6 15 Bg2 f5 16 f3', { a: '±', r: 'Krasenkow–Dreev, GM Classic 2007', c: '7...Nxg4 8.Rg1 Qf6 9.Rxg4 Qxf3 10.Rxg7 Nf6 11.Rg5 Ne4 12.Nxe4 Qxe4 13.Qxe4 dxe4 14.Rh5 f6 15.Bg2 f5 16.f3 é melhor para as brancas.' }],
  ['c33-k-B', '1', 'k', '(k) 8...f5', '8... f5', { c: 'O lance de Bruzón, 8...f5, talvez seja melhor.' }],
  ['c33', 'l', 'l', '(l)', '13 Bxc4 b6 14 O-O-O Bb7 15 e4 O-O 16 Rhe1 Rfd8 17 Qe3 Rac8', { a: '=', r: 'Krasenkow–Henrichs, Vlissingen 2006', c: '13.Bxc4 b6 14.O-O-O Bb7 15.e4 O-O 16.Rhe1 Rfd8 17.Qe3 Rac8 é igual.' }],
  // Coluna 34
  ['c34', 'm', 'm', '(m)', '8... Nd5 9 Ne4 Be7 10 Bd2 b6 11 Ng3 O-O 12 e4 Nb4 13 Qb3 c5 14 Bxb4 cxb4 15 O-O a6 16 Qe3 b5 17 Bd3 Bb7', { a: '∞', r: 'Aronian–Kramnik, match rápido em Yerevan 2007', c: '8...Nd5 9.Ne4 Be7 10.Bd2 b6 11.Ng3 O-O 12.e4 Nb4 13.Qb3 c5 14.Bxb4 cxb4 15.O-O a6 16.Qe3 b5 17.Bd3 Bb7 dá chances aos dois lados.' }],
  ['c34', 'n', 'n', '(n)', '10 Ne4 Bb4+ 11 Bd2 Bxd2+ 12 Qxd2 Qe7 13 Bb3 O-O 14 O-O-O exd4 15 Qxd4 Re8 16 Ng3 Qc5+ 17 Kb1 Qxd4 18 Nxd4 N7b6', { a: '=', r: 'Sasikiran–Dreev, Espanha 2005', c: '10.Ne4 Bb4+ 11.Bd2 Bxd2+ 12.Qxd2 Qe7 13.Bb3 O-O 14.O-O-O exd4 15.Qxd4 Re8 16.Ng3 Qc5+ 17.Kb1 Qxd4 18.Nxd4 N7b6 é igual.' }],
  // Coluna 35
  ['c35', 'p-A', 'p', '(p) A', '9... c5 10 Bd2 Nf6 11 Qc2 cxd4 12 Nxd4 Bc5 13 Nb3 Be7 14 Be2 Qc7 15 O-O Bd7 16 Rac1 Rc8 17 Nd4 O-O', { a: '=', r: 'Smyslov–Chernin, Subotica 1987', c: '9...c5 10.Bd2 Nf6 11.Qc2 cxd4 12.Nxd4 Bc5 13.Nb3 Be7 14.Be2 Qc7 15.O-O Bd7 16.Rac1 Rc8 17.Nd4 O-O é igual.' }],
  ['c35', 'p-B', 'p', '(p) B', '9... Bb4+ 10 Bd2 Bxd2+ 11 Nxd2 c5 12 dxc5 Qa5 13 a3 Qxc5 14 b4 Qc7 15 Bd3 Nf6 16 Qe2 O-O 17 O-O', { a: '±', r: 'Svetushkin–Galkin, Aeroflot Open 2006', c: '9...Bb4+ 10.Bd2 Bxd2+ 11.Nxd2 c5 12.dxc5 Qa5 13.a3 Qxc5 14.b4 Qc7 15.Bd3 Nf6 16.Qe2 O-O 17.O-O é melhor para as brancas.' }],
  ['c35', 'q-A', 'q', '(q) A', '11 Ng5 Nf6', { a: '∓', c: '11.exd6 é praticamente obrigatório; as outras opções favorecem as pretas, por exemplo 11.Ng5?! Nf6!.' }],
  ['c35', 'q-B', 'q', '(q) B', '11 Bd3 f5', { a: '∓', c: '11.Bd3?! f5! também favorece as pretas.' }],
  ['c35', 'q-C', 'q', '(q) C', '11 Be2 Nxe5 12 Nxe5 Qa5+', { a: '∓', c: '11.Be2 Nxe5 12.Nxe5 Qa5+ é melhor para as pretas.' }],
  ['c35', 'q-D', 'q', '(q) D', '11 Bf4 Bb4+ 12 Ke2 Nc5 13 Qe3 Ne6', { a: '∓', c: '11.Bf4 Bb4+ 12.Ke2 Nc5 13.Qe3 Ne6 e ...f6 é melhor para as pretas.' }],
  ['c35', 'r', 'r', '(r)', '13 Be3 Nf6 14 O-O-O Bf5 15 Bd3 Bxd3 16 Rxd3 c5 17 Rhd1 Nd7 18 b3 h6 19 Bf4 Qe6 20 Re3 Qf6 21 Be5 Nxe5 22 Rxe5', { a: '±', r: 'Abdulla–Neelotpal, United Insurance 1999', c: '13.Be3 Nf6 14.O-O-O Bf5 15.Bd3 Bxd3 16.Rxd3 c5 17.Rhd1 Nd7 18.b3 h6 19.Bf4 Qe6 20.Re3 Qf6 21.Be5 Nxe5 22.Rxe5 é melhor para as brancas.' }],
  ['c35-r', '1', 'r', '(r) 14...Be6', '14... Be6 15 Bd3 b5 16 c5 Bxa2 17 Rhe1 Bb3 18 Bg5 Qd8 19 Nd4', { a: '±', c: '14...Be6 15.Bd3 b5 16.c5 Bxa2 17.Rhe1 Bb3 18.Bg5 Qd8 19.Nd4! é melhor para as brancas.' }],
  // Coluna 36
  ['c36', 's', 's', '(s)', '8... c5 9 Kb1 a6 10 e4 cxd4 11 Nxd4 Nxe4 12 Nxe4 dxe4 13 Qxe4 Nc5 14 Qf3 e5 15 Nb3 e4 16 Qe3 Nxb3 17 axb3 Bg4 18 Be2 Bf4 19 Qxe4 Re8 20 Qxf4 Bxe2 21 Rde1 Qd3+ 22 Ka2 a5', { a: '∞', r: 'Istrătescu–Hamdouchi, Trophée Universitaire 2007', c: 'Uma tentativa interessante é 8...c5!? 9.Kb1 a6 10.e4 cxd4 11.Nxd4 Nxe4 12.Nxe4 dxe4 13.Qxe4 Nc5 14.Qf3 e5 15.Nb3 e4 16.Qe3 Nxb3 17.axb3 Bg4 18.Be2 Bf4 19.Qxe4 Re8 20.Qxf4 Bxe2 21.Rde1 Qd3+ 22.Ka2 a5, com boa compensação pelo peão.' }],
  ['c36', 't', 't', '(t)', '12 Ne4 Be7 13 dxc5 Nxc5 14 Nxc5 Bxc5 15 Ng5 g6 16 Ne4 Bd4', { a: '∓', r: 'Morović–Kupreichik, Medina del Campo 1980', c: '12.Ne4 Be7 13.dxc5 Nxc5 14.Nxc5 Bxc5 15.Ng5 g6 16.Ne4 Bd4! favorece as pretas.' }],
  ['c36-t', '1', 't', '(t) 12.Nxd5', '12 Nxd5 Bxd5 13 Bc4 Bxf3 14 gxf3 cxd4', { a: '∓', r: 'Kupreichik', c: '12.Nxd5 Bxd5 13.Bc4 Bxf3 14.gxf3 cxd4 é melhor para as pretas (Kupreichik).' }],
  ['c36', 'u', 'u', '(u)', '13 Nge4 Be7 14 dxc5 Nxc5 15 Nxc5 Bxc5 16 Bh6 Re8', { a: '=', c: '13.Nge4 Be7 14.dxc5 Nxc5 15.Nxc5 Bxc5 16.Bh6 Re8 é igual: as peças ativas e a pressão na coluna c compensam o peão.' }],
]

const capitulo = {
  id: 'eslava-f',
  arquivo: 'eslava-f',
  nome: 'Semi-Eslava — 6.Bd3 sem a Meran e 6.Qc2',
  fonte: 'Modern Chess Openings — Slav and Semi-Slav Defense (pp. 474–475), colunas 31–36',
  base: '1. d4 d5 2. c4 c6',
  corPadrao: 'b',
  ordem: 474,
  grupos: [
    { id: 'bd3', nome: '6.Bd3: 6...Bb4 e 6...Bd6', colunas: [31, 32] },
    { id: 'qc2', nome: '6.Qc2 Bd6', colunas: [33, 34, 35, 36] },
  ],
}

module.exports = { capitulo, colunas, notas }
