// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Najdorf: Peão Envenenado, 6.Bg5 e6 7.f4 Qb6 (pp. 252–254), colunas 13–18.
// Gerar: node scripts/mco/gerar.cjs siciliana-najdorf-b
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-najdorf-b-dicas.cjs.

const B = '1 e4 c5 2 Nf3 d6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 a6'
const P = `${B} 6 Bg5 e6 7 f4 Qb6`
const Q = `${P} 8 Qd2 Qxb2 9 Rb1 Qa3`

const colunas = {
  c13: [`${Q} 10 f5 Nc6 11 fxe6 fxe6 12 Nxc6 bxc6 13 e5 dxe5 14 Bxf6 gxf6 15 Ne4 Be7 16 Be2 h5`, 'envenenado', '8.Qd2 Qxb2 9.Rb1 Qa3 10.f5', '∞',
    'O Peão Envenenado: com 7...Qb6 as pretas atacam b2 e, depois de 8.Qd2 Qxb2, a dama preta fica longe do rei. As brancas têm grande vantagem de desenvolvimento, mas a posição das pretas é difícil de quebrar. Com 10.f5 e 13.e5 o jogo fica muito agudo.'],
  c14: [`${Q} 10 Bxf6 gxf6 11 Be2 Nc6 12 Nxc6 bxc6 13 O-O Qa5 14 Kh1 Be7 15 f5 h5 16 Bf3 Kf8`, 'envenenado', '10.Bxf6 gxf6 11.Be2', '⩱',
    'Com 10.Bxf6 e 11.Be2 as brancas jogam pelo ataque com o peão a menos. Com 13...Qa5! a dama volta ao jogo e as brancas não têm compensação suficiente.'],
  c15: [`${Q} 10 e5 dxe5 11 fxe5 Nfd7 12 Ne4 h6 13 Bh4 Qxa2 14 Rd1 Qd5 15 Qe3 Qxe5 16 Be2 Bc5`, 'envenenado', '10.e5', '∞',
    'Com 10.e5 as brancas abrem o centro na hora. As pretas pegam mais um peão e a posição fica aguda, com chances para os dois lados.'],
  c16: [`${P} 8 Qd2 Qxb2 9 Nb3 Qa3 10 Bxf6 gxf6 11 Be2 Nc6 12 O-O Bd7 13 Kh1 Rc8 14 Bh5 Bg7 15 Rf3 O-O 16 Rd1 f5`, 'envenenado', '9.Nb3', '=',
    'Com 9.Nb3 em vez de 9.Rb1 a dama preta volta a a3 e as brancas buscam ataque na ala do rei. A posição fica complicada e mais ou menos equilibrada.'],
  c17: [`${P} 8 Nb3 Be7 9 Qf3 Nbd7 10 O-O-O Qc7 11 Bd3 b5 12 a3 Bb7 13 Rhe1 Nc5 14 Qh3 O-O-O 15 Nxc5 dxc5 16 e5 Nd5`, 'nb3', '8.Nb3 Be7', '=',
    'O recuo 8.Nb3 é uma concessão às pretas, embora alguns jogadores gostem das posições agudas e iguais que surgem. A coluna é Spassky–Portisch, Tilburg 1979.'],
  c18: [`${P} 8 Nb3 Nbd7 9 Be2 Be7 10 Qd3 Qc7 11 Bf3 h6 12 Bxf6 Nxf6 13 O-O-O e5 14 f5 Bd7 15 Kb1 b5 16 Nd2 Rc8`, 'nb3', '8.Nb3 Nbd7', '=',
    'Com 8...Nbd7 as pretas desenvolvem e depois jogam ...e5. Fica igual. A coluna é Ljubojević–Kir. Georgiev, Olimpíada de Novi Sad 1990.'],
}

const notas = [
  // Coluna 13
  ['c13', 'a', 'a', '(a)', '7... h6 8 Bh4 Qb6 9 a3', { a: '⩲', c: 'Intercalar 7...h6 8.Bh4 Qb6 permite 9.a3; a opção de Bf2 dá a iniciativa às brancas.' }],
  ['c13-a', '1', 'a', '(a) 9...Qxb2?', '9... Qxb2 10 Na4', { c: '9...Qxb2? 10.Na4 ganha a dama.' }],
  ['c13', 'b', 'b', '(b)', '10... b5 11 fxe6 fxe6 12 Rb3 Qa5 13 Bxf6 gxf6 14 Be2 h5 15 O-O Be7 16 Kh1 Bd7 17 Qd1 b4 18 Qb1', { a: '⩲', r: 'Bogdanov–Glushenko, por correspondência 1970', c: 'Com 10...b5 as brancas ficam um pouco melhor.' }],
  ['c13-b', '1', 'b', '(b) 12...Qc5?', '12... Qc5 13 Ncxb5', { c: '12...Qc5? é respondido por 13.Ncxb5!.' }],
  ['c13-b', '2', 'b', '(b) 14...b4', '14... b4 15 O-O Bg7 16 Nd1 O-O 17 Bc4', { a: '±', r: 'segundo Hartston', c: 'Com 14...b4 15.O-O! as brancas ficam claramente melhor.' }],
  ['c13', 'c', 'c', '(c)', '11... Bxe6 12 Nxe6 fxe6 13 Bc4', { a: '±', c: 'Não 11...Bxe6? 12.Nxe6 fxe6 13.Bc4: as brancas ficam claramente melhor.' }],
  ['c13', 'd', 'd', '(d)', '13 Be2 Be7 14 O-O O-O 15 Rb3 Qc5+ 16 Be3 Qe5 17 Bf4 Qc5+ 18 Kh1 Ng4 19 h3 e5 20 Na4 Qa7 21 Bc4+ Kh8 22 hxg4 exf4 23 Nb6 d5 24 exd5 cxd5 25 Bxd5 Rb8 26 Nxc8 Rbxc8 27 Rh3 Qb6', { a: '=', r: 'Ivanchuk–Kasparov, Linares 1990', c: 'Uma alternativa importante é o calmo 13.Be2. Com 18.Kh1 as brancas evitam a repetição e a partida acaba igual.' }],
  ['c13-d', '1', 'd', '(d) 14...Rf8', '14... Rf8', { c: '14...Rf8 evita os empates forçados.' }],
  ['c13-d', '2', 'd', '(d) 15...Qa5', '15... Qa5 16 Nd5 Qxd2 17 Nxe7+ Kf7 18 Bxd2 Kxe7 19 e5', { a: '±', c: 'Com 15...Qa5 as damas saem e, depois de 19.e5!, as brancas ficam claramente melhor.' }],
  ['c13-d', '3', 'd', '(d) 18.Be3', '18 Be3', { a: '=', c: '18.Be3 repete a posição.' }],
  ['c13', 'e', 'e', '(e)', '13... Nd5 14 Nxd5 cxd5 15 Be2 dxe5 16 O-O Bc5+ 17 Kh1 Rf8 18 c4 Rxf1+ 19 Rxf1 Bb7 20 Qc2', { r: 'segundo Fischer', c: 'Depois de 13...Nd5 as brancas têm boas chances de ataque.' }],
  ['c13', 'f', 'f', '(f)', '15 Be2 Qd6', { a: '⩱', c: 'O natural 15.Be2?! Qd6! deixa a dama preta voltar ao jogo.' }],
  ['c13', 'g', 'g', '(g)', '15... Qxa2 16 Rd1 Be7 17 Be2 O-O 18 O-O Ra7 19 Rf3 Kh8 20 Rg3 Rd7 21 Qh6 Rf7 22 Qh5 Rxd1+ 23 Bxd1 Qa5 24 Kf1 Qd8 25 Qxf7 Qxd1+ 26 Kf2 Qxc2+ 27 Ke3 Bc5+', { a: '=', r: 'Azarov–Kasparov, Izmir 2004', c: 'O guloso 15...Qxa2 também é jogável e logo levou ao empate. É provavelmente a escolha mais segura das pretas.' }],
  ['c13-g', '1', 'g', '(g) 16.Nxf6+', '16 Nxf6+ Kf7 17 Rd1 Qb2 18 Ne4 Bb4', { a: '⩱', c: 'Com 16.Nxf6+ as pretas ficam um pouco melhor.' }],
  ['c13', 'h-A', 'h', '(h) A', '17 Rf1 Qxa2 18 Rd1 Qd5 19 Qe3 Qa5+ 20 c3 f5 21 Qg3', { a: '±', r: 'Radjabov–Ye Jiangchuan, Olimpíada de Calvià 2004', c: 'Aqui as brancas têm duas escolhas. Com 17.Rf1! e 21.Qg3! elas ficam com um ataque forte.' }],
  ['c13-h-A', '1', 'h', '(h) A 17...f5', '17... f5 18 Rf3 Qxa2 19 Rfb3 fxe4 20 Qc3 Bd8 21 Qxc6+ Bd7', { a: '=', c: 'Com 17...f5 a posição parece boa para as pretas.' }],
  ['c13', 'h-B', 'h', '(h) B', '17 Rb3 Qa4 18 c4 f5 19 O-O fxe4', { a: '=', c: 'Com o antigo 17.Rb3 a posição fica mais ou menos igual.' }],
  // Coluna 14
  ['c14', 'i', 'i', '(i)', '11... Bg7 12 O-O f5 13 Rfd1 Nc6 14 Nxc6 bxc6 15 Rb3 Qc5+ 16 Kh1 O-O 17 Qxd6 Qxd6', { a: '=', r: 'Matanović–Bronstein, Wijk aan Zee 1963', c: 'Com 11...Bg7 as damas saem e fica igual.' }],
  ['c14', 'j', 'j', '(j)', '15... exf5 16 exf5 Bxf5 17 Bxa6 Qxa6 18 Rxf5 d5 19 Re1 Qb7 20 Qh6', { r: 'segundo Nunn', c: 'As brancas têm chances de ataque se as pretas jogarem a velha linha 15...exf5?!.' }],
  ['c14', 'k', 'k', '(k)', '17 Rb3 Ra7 18 Qf2 Rb7', { a: '⩱', r: 'Ziegler–Magnusson, Estocolmo 1988', c: 'As brancas não têm compensação suficiente pelo peão nesta linha.' }],
  // Coluna 15
  ['c15', 'l', 'l', '(l)', '10 Be2 Nbd7 11 O-O Be7 12 e5 dxe5 13 fxe5 Nxe5 14 Bxf6 gxf6 15 Ne4 f5 16 Rb3 Qa4 17 Nxf5 exf5 18 Nd6+ Bxd6 19 Qxd6 Qe4 20 Re1 Nc6 21 Kf1 Be6 22 Bh5 Qc4+ 23 Rd3 Nd8 24 Qd7+ Kf8 25 Qd6+ Ke8 26 Qd7+', { a: '=', r: 'Pogrebniak–Guk, URSS 1986 (empate)', c: 'Uma alternativa importante, resolvida com igualdade nos anos 80, é 10.Be2. A partida terminou em xeque perpétuo.' }],
  ['c15-l', '1', 'l', '(l) 10...Be7', '10... Be7 11 O-O Qa5 12 f5 Nc6', { a: '=', c: '10...Be7 11.O-O Qa5 12.f5 Nc6 também é bom.' }],
  ['c15-l', '2', 'l', '(l) 12.f5', '12 f5 Ne5', { a: '⩱', c: 'Com 12.f5 Ne5 as pretas ficam um pouco melhor.' }],
  ['c15-l', '3', 'l', '(l) 14...Bxf6', '14... Bxf6 15 Rxf6 gxf6 16 Ne4', { c: '14...Bxf6 15.Rxf6! gxf6 16.Ne4 é perigoso para as pretas.' }],
  ['c15-l', '4', 'l', '(l) 17.Qc3', '17 Qc3 Rg8', { a: '⩱', c: 'Com 17.Qc3 Rg8 as pretas ficam um pouco melhor.' }],
  ['c15', 'm', 'm', '(m)', '12 Bc4 Qa5 13 O-O Nxe5 14 Rbe1 Nxc4 15 Qf4 Nd6 16 Ne4 Qc7 17 c4 Nb5 18 cxb5 Qxf4', { a: '⩱', r: 'Hellers–Ott, Groningen 1984', c: 'Com 12.Bc4 as pretas devolvem material com 17...Nb5! e ficam um pouco melhor.' }],
  ['c15', 'n', 'n', '(n)', '13 Bb5 hxg5 14 Rb3 Qxa2 15 Qc3 axb5 16 Qxc8+ Ke7 17 O-O Qa7 18 Rd3 Nxe5 19 Nc5 Nbd7 20 Nf5+ exf5 21 Rxd7+ Kf6 22 Rxf7+ Kg6 23 Qxf5+ Kh6', { a: '=', r: 'Shabalov–Areshchenko, Ilha de Man 2006', c: 'Com 13.Bb5 as brancas sacrificam tudo e a partida acaba em xeque perpétuo.' }],
  ['c15', 'o', 'o', '(o)', '13... Qa4 14 Be2 Nc6 15 Nxe6 g5 16 Nf6+', { r: 'Radjabov–Anand, partida relâmpago 2006', c: '13...Qa4?! 14.Be2 Nc6? 15.Nxe6! g5 16.Nf6+ e as brancas dão mate em dois lances.' }],
  ['c15', 'p', 'p', '(p)', '17 Bg3 Bxd4 18 Rxd4 Qa5+ 19 Rd2 O-O 20 Bd6 Re8', { a: '∞', r: 'Shirov–Ftáčnik, Bundesliga 2007', c: 'Posição aguda, com chances para os dois lados.' }],
  // Coluna 16
  ['c16', 'q', 'q', '(q)', '9... Nc6 10 Bxf6 gxf6 11 Na4 Qa3 12 Nb6 Rb8 13 Nc4 Qa4 14 a3 b5 15 Nxd6+ Bxd6 16 Qxd6 Qxe4+ 17 Be2 Qd5 18 Qxd5 exd5 19 O-O-O Be6 20 Bf3 Ne7 21 Nc5', { a: '⩲', c: '9...Nc6 deixa as brancas chegarem quase à força a um final um pouco favorável. Alguns grandes mestres defendem a posição das pretas para empatar, mas não é recomendável para a maioria.' }],
  ['c16-q', '1', 'q', '(q) 17...Bb7?', '17... Bb7 18 O-O-O Qe3+ 19 Kb2 Rd8 20 Qc7 Qxe2 21 Rhe1 Qh5 22 g4 Qxg4 23 Qxb7 Rxd1 24 Qxc6+ Ke7 25 Qc5+ Ke8 26 h3 Qf3 27 Nd4 Rxd4 28 Qxd4 Rg8 29 Re3', { a: '±', c: 'As pretas precisam trocar as damas: 17...Bb7? 18.O-O-O! dá vantagem clara às brancas.' }],
  ['c16', 'r', 'r', '(r)', '10 Bd3 Be7 11 O-O h6 12 Bxf6 Bxf6 13 e5 dxe5 14 Ne4 Nd7 15 f5 Qe7', { a: '⩱', r: 'Mukhin–Sorokin, URSS 1973', c: 'Com 10.Bd3 as pretas ficam um pouco melhor.' }],
  ['c16-r', '1', 'r', '(r) 12.Bh4', '12 Bh4 Nxe4 13 Nxe4 Bxh4', { a: '∓', r: 'Spassky–Fischer, Campeonato Mundial 1972', c: 'Com 12.Bh4 Nxe4! as pretas ficam melhor.' }],
  ['c16', 's', 's', '(s)', '11... h5 12 O-O Nd7 13 Kh1 h4 14 h3 Be7 15 Rad1 b6 16 Qe3 Bb7 17 f5 Rc8 18 fxe6 fxe6 19 Bg4 Nc5', { a: '⩱', r: 'Short–Kasparov, Riga 1995', c: 'Com 11...h5 as pretas ficam um pouco melhor.' }],
  ['c16-s', '1', 's', '(s) 13.f5', '13 f5 Nc5 14 Qd4 Nxb3 15 axb3 Qc5 16 Qxc5 dxc5 17 fxe6 fxe6 18 Rxf6 Bg7', { a: '=', r: 'segundo Nunn', c: 'Com 13.f5 as damas saem e fica igual.' }],
  ['c16', 't', 't', '(t)', '16 Raf1 Na5 17 f5 Nc4 18 Qf4 Ne5 19 Rg3 Kh8', { a: '⩱', r: 'Kasimdzhanov–Sadvakasov, Samba Cup 2003', c: 'Com 16.Raf1 as pretas ficam um pouco melhor.' }],
  ['c16', 'u', 'u', '(u)', '17 exf5 exf5 18 Nd5 Qxa2 19 Rg3 Qb2', { a: '=', r: 'A. Rodríguez–Vera, Havana 1978 (até 18.Nd5)', c: 'Depois de 18...Qxa2 19.Rg3 Qb2 a posição é complicada e mais ou menos equilibrada.' }],
  // Coluna 17
  ['c17', 'v-A', 'v', '(v) A', '8 a3 Nbd7 9 Be2 Be7 10 Nb3 h6', { a: '=', r: 'V. Georgiev–Ermenkov, Campeonato Búlgaro 1995', c: 'Alternativas menores: 8.a3 Nbd7! fica igual.' }],
  ['c17-v-A', '1', 'v', '(v) A 9.Qd2?', '9 Qd2 Qxb2 10 Nb3 Nc5', { c: '9.Qd2? Qxb2 10.Nb3 Nc5! é bom para as pretas.' }],
  ['c17', 'v-B', 'v', '(v) B', '8 Qd3 Qxb2 9 Rb1 Qa3 10 f5 Be7 11 Be2 Nc6', { a: '=', r: 'Nunn–Kasparov, Bruxelas 1986', c: 'Com 8.Qd3 fica igual.' }],
  ['c17', 'v-C', 'v', '(v) C', '8 Bxf6 gxf6 9 Be2 Rg8 10 Bf3 Qxb2 11 Na4 Qa3 12 c3 Nd7', { a: '⩱', r: 'Harman–Magerramov, por correspondência 1992', c: 'Com 8.Bxf6 gxf6 9.Be2?! Rg8! as pretas ficam um pouco melhor.' }],
  ['c17', 'w', 'w', '(w)', '9 Qe2 h6 10 Bxf6 Bxf6 11 O-O-O Nd7 12 h4 Bxc3 13 bxc3 Nf6 14 Rh3 e5 15 f5 Bd7 16 c4 Qc6 17 Re3 a5 18 g4 a4 19 Nd2 O-O-O', { a: '⩱', r: 'Deppe–Novikov, Moscou 1990', c: 'Com 9.Qe2 as pretas ficam um pouco melhor.' }],
  ['c17-w', '1', 'w', '(w) 10.Bh4?', '10 Bh4 Nxe4', { c: '10.Bh4? Nxe4! ganha um peão.' }],
  ['c17', 'x-A', 'x', '(x) A', '11 Qg3 b5 12 Bxf6 Nxf6 13 e5 dxe5 14 fxe5 Nd7 15 Bxb5 axb5 16 Nxb5 Qb6 17 Qxg7 Rf8 18 Nd6+ Bxd6 19 exd6 Rxa2 20 Kb1 Ra7', { a: '=', r: 'Shabalov–de Firmian, Campeonato dos EUA 1996', c: 'As brancas têm várias alternativas. Com 11.Qg3 e o sacrifício em b5 fica igual.' }],
  ['c17-x-A', '1', 'x', '(x) A 16...Qc4', '16... Qc4', { c: 'Também é bom 16...Qc4!.' }],
  ['c17', 'x-B', 'x', '(x) B', '11 g4 b5 12 Bxf6 Nxf6 13 g5 Nd7 14 a3 Rb8 15 h4 b4 16 axb4 Rxb4', { a: '=', r: 'Akopian–Collinson, Oakham 1992', c: 'Com 11.g4 fica igual.' }],
  ['c17', 'x-C', 'x', '(x) C', '11 a4 h6 12 Bh4 g5 13 fxg5 Ne5 14 Qf2 Nfg4 15 Qg1 Bd7 16 h3 Ng6', { a: '=', r: 'Chiburdanidze–Nunn, Londres 1985', c: 'Com 11.a4 também fica igual.' }],
  ['c17', 'y', 'y', '(y)', '12... Rb8 13 Rhe1 b4 14 axb4 Rxb4', { a: '=', r: 'Leko–Kasparov, Linares 2001', c: 'Também é bom 12...Rb8.' }],
  // Coluna 18
  ['c18', 'z', 'z', '(z)', '8... Qe3+ 9 Qe2 Qxe2+ 10 Bxe2', { a: '⩲', c: 'É bem conhecido que 8...Qe3+ leva a um final um pouco melhor para as brancas.' }],
  ['c18', 'aa-A', 'aa', '(aa) A', '9 Qf3 Be7', { c: '9.Qf3 Be7 transpõe para a coluna anterior.' }],
  ['c18', 'aa-B', 'aa', '(aa) B', '9 Qe2 Qc7 10 O-O-O b5 11 a3 Bb7 12 g3 Be7 13 Bg2 h6 14 Bxf6 Nxf6 15 e5 dxe5 16 Nxb5 Qb6 17 Nd6+ Bxd6 18 Rxd6 Qxd6 19 Bxb7 Ra7', { a: '=', r: 'Ljubojević–Browne, Buenos Aires 1980', c: 'Com 9.Qe2 fica igual.' }],
  ['c18', 'bb', 'bb', '(bb)', '11... Rb8 12 O-O-O b5 13 Kb1 b4 14 Ne2 a5 15 g4 a4 16 Nbd4 Qc5 17 e5 dxe5 18 Nc6 e4 19 Bxe4 Rb6 20 Bxf6 gxf6 21 Ned4', { a: '±', r: 'Krakops–Novikov, Cappelle-la-Grande 1997', c: 'Com 11...Rb8 as brancas ficam um pouco melhor depois de 15.g4; com 15...a4?! 16.Nbd4 e 17.e5! ficam claramente melhor.' }],
]

const capitulo = {
  id: 'siciliana-najdorf-b',
  arquivo: 'siciliana-najdorf-b',
  nome: 'Siciliana Najdorf — Peão Envenenado',
  fonte: 'Modern Chess Openings — Sicilian Defense, Najdorf, Poisoned Pawn Variation (pp. 252–254), colunas 13–18',
  base: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 Qb6',
  corPadrao: 'b',
  ordem: 252,
  grupos: [
    { id: 'envenenado', nome: '8.Qd2 Qxb2', colunas: [13, 14, 15, 16] },
    { id: 'nb3', nome: '8.Nb3', colunas: [17, 18] },
  ],
}

module.exports = { capitulo, colunas, notas }
