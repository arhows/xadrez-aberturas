// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Najdorf: 6.Bg5, outras linhas (pp. 258–260), colunas 25–30.
// Gerar: node scripts/mco/gerar.cjs siciliana-najdorf-d
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-najdorf-d-dicas.cjs.
//
// Erros do livro corrigidos:
// - Nota (b), 11.Qh5 "Nxe5" → 11...Ne5 (não há peça em e5 para capturar).
//
// A tabela não traz avaliação ao fim das colunas; a avaliação de cada coluna vem da última nota.

const B = '1 e4 c5 2 Nf3 d6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 a6 6 Bg5'
const E = `${B} e6 7 f4`
const P = `${E} b5 8 e5 dxe5 9 fxe5 Qc7`

const colunas = {
  c25: [`${E} Be7 8 Qf3 h6 9 Bh4 Qc7 10 O-O-O Nbd7 11 Be2 g5 12 fxg5 Ne5 13 Qe3 Nfg4 14 Bxg4 Nxg4`, 'be7', '7...Be7 8.Qf3 h6', '±',
    'Com 7...Be7 8.Qf3 h6?! 9.Bh4 as pretas expulsam o bispo antes de jogar ...Qc7. Depois de 11.Be2! as pretas têm uma escolha difícil e as brancas ficam claramente melhor.'],
  c26: [`${P} 10 exf6 Qe5+ 11 Be2 Qxg5 12 O-O Qe5 13 Nf3 Bc5+ 14 Kh1 Qxf6`, 'polugaevsky', '10.exf6', '⩲',
    'A Variante Polugaevsky: 7...b5 já ataca o cavalo de c3 e responde 8.e5 com 8...dxe5. Com 10.exf6 Qe5+ a posição fica muito aguda; as partidas dos anos 1980 ainda são a referência, e as brancas ficam só um pouco melhor.'],
  c27: [`${P} 10 Qe2 Nfd7 11 O-O-O Bb7 12 Qg4 Qxe5 13 Bd3 h6 14 Bh4 g5`, 'polugaevsky', '10.Qe2', '±',
    'Com 10.Qe2 o cavalo de f6 recua para d7 e as brancas rocam grande. Depois de 14...g5 vem o sacrifício 15.Nxe6!, e as brancas ficam claramente melhor.'],
  c28: [`${E} Nbd7 8 Qf3 Qc7 9 O-O-O b5 10 Bxb5 axb5 11 Ndxb5 Qb6 12 e5 Bb7 13 Qe2 h6 14 Bxf6 gxf6`, 'outras7', '7...Nbd7', '=',
    'Com 7...Nbd7 e 9...b5 as pretas convidam o sacrifício 10.Bxb5. A posição fica muito complicada, mas com 15.exd6! o jogo fica equilibrado.'],
  c29: [`${E} Qc7 8 Qf3 b5 9 f5 b4 10 Ncb5 axb5 11 Bxb5+ Bd7 12 fxe6 Bxb5 13 Nxb5 Qc5 14 Bxf6 Qxb5`, 'outras7', '7...Qc7', '⩲',
    'Com 7...Qc7 e 8...b5!? as pretas aceleram o contra-ataque. As brancas respondem com 9.f5 e o sacrifício 10.Ncb5!, ficando um pouco melhor.'],
  c30: [`${B} Nbd7 7 Bc4 Qa5 8 Qd2 e6 9 O-O-O b5 10 Bb3 Bb7 11 Rhe1 O-O-O 12 a3 Be7 13 Kb1 Qb6 14 f3 Kb8`, 'nbd7', '6...Nbd7', '⩲',
    'Com 6...Nbd7 as pretas fogem das linhas mais teóricas. As brancas jogam 7.Bc4 e o roque grande, e ficam um pouco melhor.'],
}

const notas = [
  // Coluna 25
  ['c25', 'a-A', 'a', '(a) A', '7 Qf3 h6 8 Bxf6 Qxf6 9 Qxf6 gxf6 10 Be2 h5 11 O-O-O Bd7 12 Kb1 Kd8 13 f4 Nc6 14 Rhf1 Kc7', { a: '=', r: 'Bokucheva–Platonov, Gorky 1971', c: 'As alternativas a 7.f4 deixam as pretas igualarem rápido. Com 7.Qf3 h6! as damas saem e fica igual.' }],
  ['c25-a-A', '1', 'a', '(a) A 8.Bh4', '8 Bh4 Nbd7 9 O-O-O Qc7', { a: '=', c: 'Com 8.Bh4 também fica igual.' }],
  ['c25', 'a-B', 'a', '(a) B', '7 Qd3 b5 8 O-O-O b4 9 Nce2 Bb7', { a: '=', r: 'Tisdall–H. Olafsson, Tórshavn 1997', c: 'Com 7.Qd3 fica igual.' }],
  ['c25', 'a-C', 'a', '(a) C', '7 Qe2 h6 8 Be3 b5 9 a3 Bb7 10 f3 Nbd7 11 O-O-O Rc8', { a: '=', r: 'Ziatdinov–Browne, San Francisco 1999', c: 'Com 7.Qe2 também fica igual.' }],
  ['c25', 'b', 'b', '(b)', '9... g5 10 fxg5 Nfd7 11 Nxe6 fxe6 12 Qh5+ Kf8 13 Bb5 Rh7 14 O-O+ Kg8 15 g6 Rg7 16 Rf7 Bxh4 17 Qxh6 Qf6 18 Rxf6 Bxf6 19 e5 Bxe5 20 Bd3', { a: '⩲', r: 'Shabalov–Sadvakasov, Campeonato Continental 2000', c: '9...g5 é a (in)famosa Variante de Gotemburgo. Depois do sacrifício 11.Nxe6 as brancas ficam um pouco melhor.' }],
  ['c25-b', '1', 'b', '(b) 11.Qh5', '11 Qh5 Ne5 12 Bg3 Bxg5 13 Bxe5 dxe5 14 Nf3', { a: '±', c: '11.Qh5 é mais seguro e dá vantagem clara às brancas.' }],
  ['c25', 'c-A', 'c', '(c) A', '11... b5 12 Bxf6 Nxf6 13 e5 Bb7 14 Qg3 dxe5 15 fxe5 Nd7 16 Nxe6 fxe6 17 Qg6+ Kd8 18 Qxe6', { a: '±', r: 'M. Hansen–Sephan, por correspondência 1984', c: 'Com 11...b5?! o sacrifício 16.Nxe6! é muito forte.' }],
  ['c25', 'c-B', 'c', '(c) B', '11... Rb8 12 Qg3 Rg8 13 Rhf1 g5 14 fxg5 Ne5 15 Nf3 hxg5 16 Nxg5 Rg6 17 Qf4 b5 18 Nxf7 Nxf7 19 Bh5', { a: '+−', r: 'segundo Nunn', c: 'Com 11...Rb8 as brancas ganham.' }],
  ['c25-c-B', '1', 'c', '(c) B 13...b5', '13... b5 14 e5 dxe5 15 Nxe6', { c: 'Se 13...b5, então 14.e5 dxe5 15.Nxe6!.' }],
  ['c25', 'd', 'd', '(d)', '13... Nh7 14 Rhf1 hxg5 15 Bg3 Nf8 16 Nf3 f6 17 Nxg5 fxg5 18 Bxe5 dxe5 19 Qf2', { a: '±', r: 'Feldman–Lubin, Leningrado 1970', c: 'Com 13...Nh7 as brancas ficam claramente melhor.' }],
  ['c25-d', '1', 'd', '(d) 15...Bd7', '15... Bd7 16 Nf3', { a: '±', c: 'Com 15...Bd7 também.' }],
  ['c25', 'e', 'e', '(e)', '15 Qd2 hxg5 16 Bxg5 Nf2 17 Bxe7 Nxd1 18 Nd5 exd5 19 Bf6', { a: '±', r: 'Planinc–Pokojowczyk, Polanica Zdrój 1979', c: 'Depois de 15.Qd2 as brancas entregam a torre e ficam com ataque forte.' }],
  // Coluna 26
  ['c26', 'f-A', 'f', '(f) A', '8 a3 Bb7', { a: '=', c: 'As alternativas a 8.e5 deixam as pretas se desenvolverem com agressividade. Com 8.a3 fica igual.' }],
  ['c26', 'f-B', 'f', '(f) B', '8 Qf3 Bb7 9 O-O-O Nbd7 10 Bd3 Be7 11 Rhe1 Qb6', { a: '=', r: 'Kupper–Tal, Zurique 1959', c: 'Com 8.Qf3 também fica igual.' }],
  ['c26', 'g', 'g', '(g)', '12 Qd3 Qxf6 13 Rf1 Qe5 14 Rd1 Ra7 15 Nf3 Qc7 16 Ng5 f5 17 Qd4 Qe7 18 Bh5+ g6 19 Qxh8 Qxg5 20 Bf3 Nd7 21 Qxh7', { a: '⩲', r: 'Hellers–Polugaevsky, Biel 1989 (até 20...Nd7)', c: 'Com 12.Qd3 vêm complicações malucas; com 21.Qxh7 as brancas ficam um pouco melhor.' }],
  ['c26-g', '1', 'g', '(g) 15.Ndxb5', '15 Ndxb5 Rd7 16 Qc4 Bc5', { a: '∞', c: 'Com 15.Ndxb5 a posição fica incerta.' }],
  ['c26', 'h', 'h', '(h)', '12... Ra7 13 Qd3 Rd7 14 Ne4 Qe5 15 Nf3 Qxb2 16 Qe3 Bb7 17 Rab1 Qxc2 18 Nfg5 Qc7 19 fxg7 Bxg7 20 Nf6+ Bxf6 21 Rxf6', { a: '±', c: 'Com 12...Ra7 as pretas pegam peões, mas as brancas ficam com ataque perigoso.' }],
  ['c26', 'i', 'i', '(i)', '15 Ne4 Qe7 16 Ne5 f5 17 Bh5+ g6 18 Nxg6 hxg6 19 Bxg6+ Kf8 20 Nxc5 Rh6 21 Nxe6+ Bxe6 22 Bxf5 Bf7', { a: '⩲', r: 'Díaz–Vera, Havana 1986', c: 'Depois de 15.Ne4 e muitos sacrifícios as brancas ficam só um pouco melhor.' }],
  ['c26-i', '1', 'i', '(i) 16...O-O', '16... O-O 17 Nxf7', { a: '±', c: 'Com 16...O-O as brancas ficam claramente melhor.' }],
  // Coluna 27
  ['c27', 'j', 'j', '(j)', '11... Nc6 12 Nxc6 Qxc6 13 Qd3 b4 14 Ne4 Bb7', { a: '∞', c: '11...Nc6 é uma boa alternativa.' }],
  ['c27', 'k', 'k', '(k)', '12 Nxe6 fxe6 13 Qg4 Qxe5 14 Bd3 Be7 15 Bxe7 Kxe7 16 Rhe1 h5 17 Qb4+ Qc5 18 Qh4+ Nf6 19 Qg3 Kf8', { a: '∓', r: 'Sauermann–Lassen, por correspondência 1983', c: 'As brancas podem sacrificar já com 12.Nxe6?!, mas as pretas ficam um pouco melhor.' }],
  ['c27', 'l', 'l', '(l)', '12... Qb6 13 Be2 Nxe5 14 Qh3 Nbd7 15 Rhe1 h6 16 Bh4 g6 17 Bg4 h5 18 Bxe6 Bh6+ 19 Kb1 fxe6 20 Nxe6 Kf7 21 Rxd7+ Nxd7 22 Nf4 Bxf4 23 Qxd7+ Kg8 24 Re6 Qg1+ 25 Nd1 Rh7', { a: '=', r: 'Venn–Castalso, por correspondência 1986 (até 25.Nd1)', c: 'As pretas devem tentar o menos usual 12...Qb6; fica igual.' }],
  ['c27-l', '1', 'l', '(l) 16...g5?', '16... g5 17 Nxe6 fxe6 18 Bf2 Qxf2 19 Qxe6+ Kd8 20 Bxb5', { a: '±', r: 'Goth–Smrcka, por correspondência 1984', c: 'Não 16...g5? 17.Nxe6!.' }],
  ['c27', 'm-A', 'm', '(m) A', '13 Bxb5 axb5 14 Rhe1 h5 15 Qh4 Qc5 16 Ncxb5 Rxa2 17 Kb1 Bd5', { a: '∓', r: 'segundo Polugaevsky', c: 'Com 13.Bxb5 as brancas ficam pior.' }],
  ['c27', 'm-B', 'm', '(m) B', '13 Be2 Bc5 14 Rhf1 Bxd4 15 Rxd4 f6 16 Bd2 f5 17 Qh4 O-O 18 Rd3 Qf6 19 Bg5 Qf7', { a: '∞', r: 'Ponisch–Pfeiffer, por correspondência 1989', c: 'Com 13.Be2 a posição fica incerta.' }],
  ['c27', 'n', 'n', '(n)', '15 Nxe6 h5 16 Qh3 Bh6 17 Kb1 g4 18 Nc7+ Qxc7 19 Rhe1+ Kf8 20 Be7+ Kg8 21 Qxh5 Bg7 22 Qg5 Nc6 23 Bf5 Nce5 24 Bd6', { a: '±', r: 'Mendes–Ribeiro, Portugal 1989', c: 'O sacrifício 15.Nxe6! dá vantagem clara às brancas.' }],
  // Coluna 28
  ['c28', 'o', 'o', '(o)', '8 Qe2 Be7 9 O-O-O Qc7 10 Nf3 Nb6 11 Qe1 Bd7', { a: '=', r: 'Guseinov–Ftáčnik, Istambul 2003', c: 'Com 8.Qe2 fica igual.' }],
  ['c28', 'p-A', 'p', '(p) A', '10 e5 Bb7 11 Qh3 dxe5 12 Nxe6 fxe6 13 Qxe6+ Be7 14 Bxf6 gxf6 15 Be2 h5 16 Nd5 Bxd5 17 Rxd5 Nb6 18 Bxh5+ Rxh5 19 Qg8+ Bf8 20 Qe6+', { a: '=', r: 'Capelan–Polugaevsky, Solingen 1974 (empate)', c: 'As brancas podem forçar o empate com 10.e5.' }],
  ['c28-p-A', '1', 'p', '(p) A 14.Nxb5', '14 Nxb5 axb5 15 Bxb5 Be4', { a: '∓', c: 'Com 14.Nxb5 as pretas ficam um pouco melhor.' }],
  ['c28-p-A', '2', 'p', '(p) A 14.Bxb5', '14 Bxb5 axb5 15 Nxb5 Qc6 16 Nd6+ Kd8 17 fxe5 Kc7 18 Qxe7 Rxa2', { a: '=', c: 'Com 14.Bxb5 fica igual.' }],
  ['c28', 'p-B', 'p', '(p) B', '10 Bd3 Bb7 11 Rhe1 Qb6 12 Nd5 Qxd4 13 Bxb5 Qc5 14 b4 Qxb5 15 Nc7+ Ke7 16 Nxb5 axb5', { a: '=', r: 'Shabalov–Gelfand, Bermuda 2004', c: 'Com 10.Bd3 também fica igual.' }],
  ['c28', 'q', 'q', '(q)', '11... Qb8 12 e5 Bb7 13 Qe2 dxe5 14 Qc4 Be7 15 Nc7+ Kf8', { a: '∓', r: 'Naiditsch–Gelfand, Dortmund 2006', c: 'Com 11...Qb8 as pretas ficam um pouco melhor, mas é muito complicado.' }],
  ['c28', 'r', 'r', '(r)', '14 Bh4 dxe5 15 fxe5 Nd5 16 Nxd5 Bxd5 17 Rxd5 exd5 18 Nd6+ Bxd6 19 exd6+ Kf8 20 Qe7+ Kg8 21 Qxd7 Rxa2 22 Qc8+ Kh7 23 Qf5+', { a: '=', r: 'Lintehevski–Negi, 2005', c: 'Com 14.Bh4 as brancas dão xeque perpétuo.' }],
  ['c28', 's', 's', '(s)', '15 Nxd6+ Bxd6 16 Rxd6 Qb4 17 Qd2 Nb6', { a: '∓', r: 'Hellers–V. Ivanov, Filadélfia 1992', c: 'Com 15.Nxd6+ as pretas ficam um pouco melhor.' }],
  ['c28-s', '1', 's', '(s) 15.exd6', '15 exd6', { a: '=', c: '15.exd6! deve deixar o jogo equilibrado.' }],
  // Coluna 29
  ['c29', 't', 't', '(t)', '7... Nc6 8 e5 h6 9 Bh4 g5 10 Bg3 Nxd4 11 Qxd4 dxe5 12 Qxd8+ Kxd8 13 fxe5 Nd7 14 O-O-O Bg7 15 Be2 Ke7 16 Bh5 Rf8 17 Ne4 Nxe5 18 Rhe1', { a: '±', r: 'Luther–Senff, Capelle-la-Grande 2001', c: 'Com 7...Nc6 as damas saem e as brancas ficam claramente melhor.' }],
  ['c29-t', '1', 't', '(t) 10...gxf4', '10... gxf4 11 Nxc6 bxc6 12 Bh4', { a: '+−', c: 'Com 10...gxf4 as brancas ganham o cavalo.' }],
  ['c29-t', '2', 't', '(t) 16...Nxe5', '16... Nxe5 17 Rhe1', { a: '±', c: '16...Nxe5 é respondido por 17.Rhe1, forte.' }],
  ['c29', 'u-A', 'u', '(u) A', '8 Qe2 Nc6 9 O-O-O Nxd4 10 Rxd4 Be7', { a: '=', r: 'como jogava Kasparov', c: 'Com 8.Qe2 as pretas igualam.' }],
  ['c29', 'u-B', 'u', '(u) B', '8 Bxf6 gxf6 9 Be2 Nc6 10 Nb3 b5 11 a3 Bb7 12 Bd3 h5 13 O-O Ne7', { a: '=', r: 'Wittmann–Gavrikov, Viena 1990', c: 'Com 8.Bxf6 também fica igual.' }],
  ['c29', 'v', 'v', '(v)', '9 O-O-O b4 10 e5 Bb7 11 Ncb5 axb5 12 Bxb5+ Nbd7 13 Qh3 b3 14 exf6 bxa2 15 Kd2 Qa5+ 16 c3 O-O-O', { a: '∓', r: 'Heinrich–Hefka, por correspondência 1992', c: 'Com 9.O-O-O b4 10.e5?! as pretas ficam um pouco melhor.' }],
  ['c29-v', '1', 'v', '(v) 12...Nfd7?', '12... Nfd7 13 Nxe6 fxe6 14 Qh3 Kf7 15 f5 Be4 16 fxe6+ Kg8 17 Qb3', { a: '±', r: 'Kr. Georgiev–Kasparov, Olimpíada de Malta 1980', c: 'Não 12...Nfd7? 13.Nxe6!.' }],
  ['c29-v', '2', 'v', '(v) 14.Qxb3', '14 Qxb3 Bd5 15 c4 Ne4', { a: '∓', r: 'van der Wiel–Brunner, Baden-Baden 1992', c: 'Com 14.Qxb3 as pretas também ficam um pouco melhor.' }],
  ['c29', 'w', 'w', '(w)', '15 Bxg7 Bxg7 16 Qxf7+ Kd8 17 Qxg7 Re8 18 Rf1 b3 19 cxb3 Qa5+ 20 Kd1', { a: '⩲', r: 'Hector–Rashkovsky, Espergaerde 1992', c: 'Depois de 15.Bxg7 as brancas ficam um pouco melhor.' }],
  ['c29-w', '1', 'w', '(w) 14...fxe6', '14... fxe6 15 Nd4 gxf6 16 Nxe6', { a: '±', r: 'Timmermans–Morena 2003', c: 'Se 14...fxe6, então 15.Nd4! dá vantagem clara às brancas.' }],
  // Coluna 30
  ['c30', 'x', 'x', '(x)', '8... h6 9 Bxf6 Nxf6 10 O-O-O e6 11 Rhe1 Be7 12 f4 O-O 13 Bb3 Re8 14 Kb1 Bf8 15 g4 Nxg4 16 Qg2', { a: '±', r: 'Spassky–Petrosian, Campeonato Mundial 1969', c: 'Com 8...h6 o avanço 15.g4! deu às brancas um ataque forte.' }],
  ['c30', 'y', 'y', '(y)', '15 Be3 Nc5 16 Ba2 b4 17 axb4 Qxb4 18 Nb3', { a: '⩲', r: 'Gulko–Petrosian, Moscou 1976', c: 'Depois de 15.Be3 as brancas ficam um pouco melhor.' }],
]

const capitulo = {
  id: 'siciliana-najdorf-d',
  arquivo: 'siciliana-najdorf-d',
  nome: 'Siciliana Najdorf — 6.Bg5, outras linhas',
  fonte: 'Modern Chess Openings — Sicilian Defense, Najdorf Variation, 6 Bg5 (pp. 258–260), colunas 25–30',
  base: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5',
  corPadrao: 'b',
  ordem: 258,
  grupos: [
    { id: 'be7', nome: '6...e6 7.f4 Be7 8.Qf3 h6', colunas: [25] },
    { id: 'polugaevsky', nome: 'Variante Polugaevsky: 7...b5', colunas: [26, 27] },
    { id: 'outras7', nome: '7...Nbd7 e 7...Qc7', colunas: [28, 29] },
    { id: 'nbd7', nome: '6...Nbd7', colunas: [30] },
  ],
}

module.exports = { capitulo, colunas, notas }
