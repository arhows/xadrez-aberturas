// Transcrição do MCO 15ª ed. — Abertura do Bispo (pp. 147–150).
// Gerar: node scripts/mco/gerar.cjs bispo
// Formato: ver gambito-do-rei.cjs. Dicas em bispo-dicas.cjs.

const BO = '1 e4 e5 2 Bc4'
const D3 = `${BO} Nf6 3 d3`
const D4 = `${BO} Nf6 3 d4 exd4 4 Nf3 Nxe4 5 Qxd4 Nf6 6 Bg5 Be7 7 Nc3`

const colunas = {
  c01: [`${D3} c6 4 Nf3 d5 5 Bb3 Bd6 6 Nc3 dxe4 7 Ng5 O-O 8 Ncxe4 Nxe4 9 Nxe4 Bf5 10 O-O Na6`, 'd3', '2...Nf6 3.d3 c6 4.Nf3 d5', '=',
    'Abertura do Bispo: as brancas adiam o cavalo do rei para manter a opção de avançar o peão f, e as pretas não podem jogar a Petrov. A resposta mais natural é 2...Nf6. Com 3.d3 c6 4.Nf3 as pretas podem romper com 4...d5 e igualam.'],
  c02: [`${D3} c6 4 Nf3 Be7 5 O-O d6 6 c3 O-O 7 Bb3 Nbd7 8 Re1 Re8 9 Nbd2 Bf8 10 d4 g6`, 'd3', '3.d3 c6 4.Nf3 Be7', '=',
    'O tranquilo 4...Be7 com ...d6 também basta para igualar.'],
  c03: [`${D3} d5 4 exd5 Nxd5 5 Nf3 Nc6 6 O-O Bg4 7 Re1 Be7 8 h3 Bh5 9 g4 Bg6 10 Nxe5 Nxe5`, 'd3', '3.d3 d5', '⩲',
    'Com 3...d5 as pretas jogam de forma agressiva, em geral entregando o peão de e5 por jogo ativo. Talvez seja dinâmico demais.'],
  c04: [`${D4} Nc6 8 Qh4 d6 9 O-O-O Be6 10 Bd3 Nd7`, 'd4', '3.d4 exd4 … 7...Nc6', '=',
    'Com o velho 3.d4 as brancas entregam um peão para se desenvolver depressa. As pretas podem se defender com 7...Nc6.'],
  c05: [`${D4} c6 8 O-O-O d5 9 Rhe1 Be6 10 Bd3 Nbd7`, 'd4', '3.d4 exd4 … 7...c6', '∞',
    'Ou com 7...c6, ficando com o peão a mais enquanto as brancas buscam ataque.'],
  c06: [`${BO} Bc5 3 c3 Nf6 4 d4 exd4 5 e5 d5 6 exf6 dxc4 7 Qh5 O-O 8 Qxc5 Re8+ 9 Ne2 d3 10 Be3 dxe2`, 'bc5', '2...Bc5', '=',
    'Com 2...Bc5 as pretas imitam as brancas. A tentativa branca de romper o centro leva a uma igualdade aproximada.'],
}

const notas = [
  ['c01', 'a-A', 'a', '(a) A', '3 f4 Nxe4 4 d3 Nd6 5 Bb3 e4', { a: '=', r: 'van Popiel–Pillsbury, Budapeste 1896', c: 'Com 3.f4 o jogo fica igual.' }],
  ['c01-a-A', '1', 'a', '(a) 3...d5', '3... d5 4 exd5 e4', { c: 'Ou 3...d5 4.exd5 e4.' }],
  ['c01', 'a-B', 'a', '(a) B', '3 Qe2 Bc5 4 Nf3 Nc6 5 c3 d6 6 d3 a6', { a: '=', r: 'Kim–Morgado, correspondência 1984', c: 'Com 3.Qe2 o jogo fica igual.' }],
  ['c01', 'b', 'b', '(b)', '5 exd5 cxd5 6 Bb3 Bb4+ 7 c3 Bd6', { a: '=', r: 'Adams–H. Steiner, St. Louis 1941', c: 'Com 5.exd5 o jogo fica igual.' }],
  ['c01-b', '1', 'b', '(b) 6.Bb5+', '6 Bb5+ Bd7 7 Bxd7+ Nbxd7', { a: '=', r: 'Galego–Solomon, Manila 1992', c: 'Com 6.Bb5+ também.' }],
  ['c01', 'c-A', 'c', '(c) A', '5... dxe4 6 Ng5 Be6 7 Bxe6 fxe6 8 Nxe4', { a: '⩲', r: 'Honfi–Lukacs, Hungria 1975', c: 'Com 5...dxe4 as brancas ficam um pouco melhor.' }],
  ['c01', 'c-B', 'c', '(c) B', '5... a5 6 Nc3 Bb4 7 a3 Bxc3+ 8 bxc3', { a: '⩲', r: 'Kasparov–Bareev, Linares 1993', c: 'Com 5...a5 também.' }],
  ['c01', 'c-C', 'c', '(c) C', '5... Bb4+ 6 c3 Bd6 7 Bg5 dxe4 8 dxe4 h6 9 Bh4 O-O 10 Nbd2 Bc7 11 O-O Na6', { a: '=', r: 'Mestel–Talbot, Hastings 1981', c: 'Com 5...Bb4+ o jogo fica igual.' }],
  ['c01-c-C', '1', 'c', '(c) 7...Be6', '7... Be6 8 Nbd2 Nbd7 9 d4', { a: '⩲', r: 'Yudasin–Alterman, Israel 1994', c: 'Com 7...Be6 as brancas ficam um pouco melhor.' }],
  ['c01-c-C', '2', 'c', '(c) 6.Bd2', '6 Bd2 Bxd2+ 7 Nbxd2 dxe4 8 Nxe5 O-O 9 dxe4 Nxe4 10 Ndf3 Nd7 11 O-O Nxe5 12 Nxe5', { r: 'Larsen–Nunn, Londres 1986', c: 'Nessa linha, se 6.Bd2.' }],
  ['c01-c-C-2', '1', 'c', '(c) 12...Bf5', '12... Bf5', { a: '=', c: 'E agora 12...Bf5 iguala.' }],
  ['c01', 'd', 'd', '(d)', '9... Bb4+ 10 c3 Be7 11 f4 exf4 12 Bxf4 Nd7 13 Qf3', { a: '⩲', r: 'Stefansson–Krush, Reykjavik 2004', c: '9...Bb4+?! é impreciso; depois de 11.f4! as brancas ficam um pouco melhor.' }],
  ['c01', 'e', 'e', '(e)', '10 Qf3 Bxe4 11 dxe4 Nd7 12 c3 Nc5 13 Bc2 a5 14 O-O b5', { a: '=', r: 'Godena–Motylev, Istambul 2003', c: 'Com 10.Qf3 o jogo também fica igual.' }],
  ['c02', 'f', 'f', '(f)', '6 Re1 O-O 7 a4 Nbd7 8 Nc3 b6 9 Ne2 d5 10 exd5 cxd5 11 Ba2', { a: '⩲', r: 'Efimenko–Brodsky, Campeonato Ucraniano 2005', c: 'Com 6.Re1 o jogo fica quase igual, mas mais fácil de jogar para as brancas.' }],
  ['c02', 'g', 'g', '(g)', '7... Bg4 8 Nbd2 Nbd7 9 h3 Bh5 10 Re1 h6 11 Nf1 Nh7 12 Ng3', { a: '⩲', r: 'Prodanov–Dolmadzhan, Bulgária 1981', c: 'Com 7...Bg4 as brancas ficam um pouco melhor.' }],
  ['c02', 'h', 'h', '(h)', '11 Ng5 d5 12 Ndf3 h6 13 exd5 Nxd5', { a: '=', r: 'Nunn–Scheeren, Wijk aan Zee 1983', c: 'O jogo fica igual.' }],
  ['c03', 'i', 'i', '(i)', '5 Nc3 Nxc3 6 bxc3 Nd7', { a: '=', c: 'Com 5.Nc3 o jogo fica igual.' }],
  ['c03', 'j', 'j', '(j)', '6... Be7 7 Re1 f6 8 d4 Nb6 9 Bb3 Bg4 10 c3 Qd7 11 h3 Bh5 12 g4', { a: '⩲', r: 'Freiman–Konstantinopolsky, Kiev 1938', c: 'Com 6...Be7 as brancas ficam um pouco melhor.' }],
  ['c03', 'k-A', 'k', '(k) A', '7... Qd6 8 d4', { a: '±', c: 'Com 7...Qd6 as brancas ficam melhor.' }],
  ['c03', 'k-B', 'k', '(k) B', '7... f6 8 Nxe5', { a: '±', c: 'Com 7...f6 também.' }],
  ['c03', 'k-C', 'k', '(k) C', '7... Bc5 8 h3 Bh5 9 d4', { a: '±', c: 'Com 7...Bc5 também.' }],
  ['c03', 'l', 'l', '(l)', '8... Bxf3 9 Qxf3 Nd4 10 Qg4 O-O 11 Rxe5', { a: '±', r: 'Larsen–Berger, Amsterdã 1964', c: 'Com 8...Bxf3 as brancas ficam melhor.' }],
  ['c03', 'm', 'm', '(m)', '11 Rxe5 Nb6 12 Bb3 O-O 13 Nc3', { a: '⩲', r: 'Dolmatov–Chekov, URSS 1980', c: 'As brancas ficam um pouco melhor.' }],
  ['c04', 'n', 'n', '(n)', '4... d5 5 exd5 Bb4+ 6 c3 Qe7+ 7 Be2 dxc3 8 Nxc3 O-O 9 O-O Nbd7', { a: '=', r: 'Laes–Flores, correspondência 1970', c: '4...d5 é um modo de as pretas evitarem complicações.' }],
  ['c04', 'o-A', 'o', '(o) A', '5... Nc5 6 Bg5 f6 7 Be3 c6 8 Nc3 d5 9 O-O-O', { a: '⩲', r: 'Estrin–Taimanov, Leningrado 1949', c: 'Com 5...Nc5 as brancas ficam um pouco melhor.' }],
  ['c04', 'o-B', 'o', '(o) B', '5... Nd6 6 O-O Qf6 7 Re1+ Be7 8 Qxf6', { a: '⩲', c: 'Com 5...Nd6 também.' }],
  ['c04', 'o-C', 'o', '(o) C', '5... d5 6 Bxd5 Nf6 7 Bxf7+ Kxf7 8 Qxd8 Bb4+ 9 Qd2 Re8+ 10 Kf1 Bxd2 11 Bxd2', { a: '⩲', c: 'Com 5...d5 também.' }],
  ['c04', 'p', 'p', '(p)', '6 Nc3 Nc6 7 Qh4 Bb4 8 O-O Bxc3 9 bxc3 O-O 10 Bg5', { a: '∞', r: 'Keres', c: 'Com 6.Nc3 as brancas têm compensação pelo peão.' }],
  ['c04', 'q-A', 'q', '(q) A', '10... Qd7 11 Bb5 O-O 12 Nd4 h6 13 Bxh6 gxh6 14 Qxh6 Ng4 15 Qh5', { a: '±', c: '10...Qd7 é perigoso para as pretas.' }],
  ['c04-q-A', '1', 'q', '(q) 12...a6', '12... a6 13 Bd3', { c: 'Ou 12...a6 13.Bd3.' }],
  ['c04-q-A', '2', 'q', '(q) 12.Ne5', '12 Ne5 Qe8 13 Nxc6 bxc6 14 Bd3 h6 15 f4', { a: '±', r: 'Estrin', c: '12.Ne5 também dá ataque.' }],
  ['c04', 'q-B', 'q', '(q) B', '11 Qg3 Nde5 12 Bxe7 Qxe7 13 Nxe5 Nxe5 14 Qxg7 O-O-O', { a: '=', c: 'O lance do texto, 10...Nd7, evita essas complicações, e a posição fica igual.' }],
  ['c05', 'r', 'r', '(r)', '9... O-O 10 Qh4 Nbd7 11 Bd3 g6 12 Re2 Re8 13 Rde1 Ne4 14 Bxe7 Qxe7 15 Qxe7 Rxe7 16 Nd4 Nb6 17 f3 c5', { a: '=', c: 'Com 9...O-O o jogo fica igual.' }],
  ['c05', 's', 's', '(s)', '10 Qh4 Nbd7 11 Nd4 Nf8 12 Nf5 Bxf5 13 Bxf6 Be6 14 Bxe7 Qxe7 15 Qd4 Qf6 16 Qe3', { a: '∞', r: 'Schlechter–Teichmann, Viena 1904', c: 'Com 10.Qh4 as chances de ataque das brancas compensam o peão.' }],
  ['c05', 't', 't', '(t)', '11 Qh4 Nc5 12 Nd4 Ng8 13 Bxe7 Qxe7 14 Qg3 g6', { a: '∞', c: 'Agora 15.Nce2, 15.f4 e 15.b4 dão jogo às brancas numa posição obscura.' }],
  ['c05-t', '1', 't', '(t) 11...c5', '11... c5 12 Ne5 Nxe5 13 Rxe5 d4 14 f4 Nd7 15 Bb5 Bxg5 16 fxg5 Qc7', { a: '∞', r: 'Timoshenko–Karpov, URSS 1967', c: 'Com 11...c5 as brancas têm compensação.' }],
  ['c06', 'u-A', 'u', '(u) A', '2... Nc6 3 Qh5 g6 4 Qf3 f5 5 exf5 Nd4 6 Qd5 Qe7', { a: '∓', r: 'Nakamura–Harikrishna, Copenhague 2004 (até 4.Qf3)', c: '2...Nc6 3.Qh5 g6 4.Qf3 parece jogo de iniciante, mas aconteceu entre grandes mestres. Agora 4...f5! 5.exf5?! faria as brancas se arrependerem da saída precoce da dama.' }],
  ['c06', 'u-B', 'u', '(u) B', '2... f5 3 d3 Nf6 4 f4 d6 5 Nf3 fxe4 6 dxe4 Bg4 7 fxe5', { a: '⩲', r: 'Pereira–Roose, correspondência 1982', c: 'Com 2...f5 as brancas ficam um pouco melhor.' }],
  ['c06-u-B', '1', 'u', '(u) 5...Nc6', '5... Nc6', { r: 'Keres', c: 'Ou 5...Nc6.' }],
  ['c06', 'v-A', 'v', '(v) A', '3 f4 Bxg1 4 Qh5 Qe7 5 Rxg1 Nc6', { a: '∓', c: 'Com 3.f4 as pretas ficam melhor.' }],
  ['c06', 'v-B', 'v', '(v) B', '3 b4 Bxb4 4 f4 d5 5 exd5 e4', { a: '∓', c: 'Com 3.b4 também.' }],
  ['c06', 'v-C', 'v', '(v) C', '3 Qg4 Qf6 4 Nc3 Ne7 5 Qg3 Nbc6', { a: '=', r: 'Chekov–Perez, Caracas 1976', c: 'Com 3.Qg4 o jogo fica igual.' }],
  ['c06-v-C', '1', 'v', '(v) 4...Qxf2+', '4... Qxf2+', { c: '4...Qxf2+ é arriscado.' }],
  ['c06', 'v-D', 'v', '(v) D', '3 Nf3', { c: '3.Nf3 costuma transpor para outras aberturas, como o Giuoco Piano.' }],
  ['c06', 'v-E', 'v', '(v) E', '3 Qh5 Qe7', { a: '=', c: 'Com 3.Qh5 Qe7 o jogo fica igual.' }],
  ['c06-v-E', '1', 'v', '(v) 3...Nc6??', '3... Nc6 4 Qxf7#', { c: '3...Nc6?? permite 4.Qxf7, mate.' }],
  ['c06', 'w-A', 'w', '(w) A', '3... Qf6', { c: 'Uma alternativa.' }],
  ['c06', 'w-B', 'w', '(w) B', '3... Qe7', { c: 'Outra alternativa.' }],
  ['c06', 'w-C', 'w', '(w) C', '3... Nc6', { c: 'Outra alternativa.' }],
  ['c06', 'w-D', 'w', '(w) D', '3... d5', { c: 'Outra alternativa.' }],
  ['c06', 'x', 'x', '(x)', '6 Bb5+ Bd7 7 Bxd7+ Nfxd7 8 cxd4 Bb4+', { a: '=', r: 'Larsen', c: 'Com 6.Bb5+ o jogo fica igual.' }],
  ['c06', 'y', 'y', '(y)', '9 Kf1 dxc3 10 Nxc3 Qd3+ 11 Nge2 Rxe2 12 Qd5 Rc2+', { a: '∓', c: '9.Kf1? é um erro: as pretas ficam melhor.' }],
  ['c06', 'z', 'z', '(z)', '11 Nd2 Na6 12 Qxc4 Qxf6 13 Qxe2', { a: '=', c: 'A posição fica equilibrada, com tendência ao empate.' }],
]

const capitulo = {
  id: 'bispo',
  arquivo: 'bispo',
  nome: 'Abertura do Bispo',
  fonte: 'Modern Chess Openings — Bishop’s Opening (pp. 147–150), colunas 1–6',
  base: '1. e4 e5 2. Bc4',
  corPadrao: 'w',
  ordem: 147,
  grupos: [
    { id: 'd3', nome: '2...Nf6 3.d3', colunas: [1, 2, 3] },
    { id: 'd4', nome: '2...Nf6 3.d4', colunas: [4, 5] },
    { id: 'bc5', nome: '2...Bc5', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
