// Transcrição do MCO 15ª ed. — Defesa Siciliana, Ataque Velimirović (pp. 330–332), colunas 25–30.
// Gerar: node scripts/mco/gerar.cjs siciliana-velimirovic
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-velimirovic-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; a avaliação vem da nota que continua cada coluna.
// Nota (g) A: o livro escreve "16 Nd5 Qd8 17 exf5 Rd8", mas a dama já está em d8; como na nota (h), a torre vai a e8 (17...Re8).
// Nota (e): o livro continua "27 Bxd6 Qxd6 28 Nh5+ Kf7 29 Rxd6 =", mas o único bispo branco está em e3 (casas escuras) e o peão d5
// bloqueia a coluna d; a nota foi cortada em 26...Kg7, com a avaliação do livro.

const B = '1 e4 c5 2 Nf3 Nc6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 d6 6 Bc4 e6 7 Be3'

const colunas = {
  c25: [`${B} Be7 8 Qe2 O-O 9 O-O-O a6 10 Bb3 Qc7 11 Rhg1 Nd7 12 g4 Nc5 13 Nf5 b5 14 Bd5 Bb7 15 g5 Rfc8`, 'be7', '11.Rhg1 Nd7 13.Nf5', '=',
    'No Ataque Velimirović as brancas põem a dama em e2, rocam grande e avançam os peões da ala do rei. Com 13.Nf5 elas sacrificam o cavalo; as pretas recusam com 13...b5 e, depois de uma luta muito aguda, o jogo fica igual.'],
  c26: [`${B} Be7 8 Qe2 O-O 9 O-O-O a6 10 Bb3 Qc7 11 Rhg1 Na5 12 g4 b5 13 g5 Nxb3+ 14 axb3 Nd7 15 f4 b4`, 'be7', '11...Na5', '±',
    'Com 11...Na5 as pretas trocam o bispo de b3, que mira e6. Depois de 15.f4 b4 as brancas sacrificam o cavalo em f5 e ficam melhor.'],
  c27: [`${B} Be7 8 Qe2 O-O 9 O-O-O a6 10 Bb3 Qc7 11 g4 Nxd4 12 Rxd4 Nd7 13 g5 Nc5 14 f4 f5 15 Rg1 b5`, 'be7', '11.g4', '=',
    'Com 11.g4 as brancas avançam logo. As pretas trocam em d4, levam o cavalo para c5 e respondem a 14.f4 com 14...f5!, freando o ataque; o jogo fica igual.'],
  c28: [`${B} Be7 8 Qe2 O-O 9 O-O-O Qa5 10 Bb3 Nxd4 11 Bxd4 Bd7 12 Rhg1 Rfc8 13 g4 e5 14 Be3 Rxc3 15 Bd2 Bb5`, 'be7', '9...Qa5', '±',
    'Com 9...Qa5 as pretas atacam pela coluna c e sacrificam a qualidade em c3. A compensação é só parcial, e as brancas ficam melhor.'],
  c29: [`${B} Be7 8 Qe2 a6 9 O-O-O Qc7 10 Bb3 Na5 11 g4 b5 12 g5 Nxb3+ 13 axb3 Nd7 14 h4 b4 15 Na4 Nc5`, 'a6', '8...a6!', '=',
    'Com 8...a6! as pretas adiam o roque, para não dar alvo aos peões brancos. Trocam o bispo de b3 e avançam ...b4; depois de 15.Na4 Nc5 o jogo fica igual.'],
  c30: [`${B} a6 8 Qe2 Qc7 9 O-O-O Na5 10 Bd3 b5 11 a3 Bb7 12 g4 Rc8 13 g5 Nd7 14 f4 Nc5 15 Kb1 Nxd3`, 'a6', '7...a6', '⩲',
    'Com 7...a6 e 9...Na5 as pretas atacam logo o bispo de c4. Ele vai para d3, e as pretas o trocam em d3; as brancas ficam com uma pequena vantagem.'],
}

const notas = [
  // Coluna 25
  ['c25', 'a', 'a', '(a)', '10... Qe8 11 Rhg1 Nd7 12 g4 Nc5 13 g5 b5 14 Nxc6 Nxb3+ 15 axb3 Qxc6 16 Bd4 b4 17 Qh5 Bb7 18 Nd5 exd5 19 Rd3 Rfc8 20 c3 dxe4 21 Rh3 Kf8 22 g6 fxg6 23 Qxh7 Ke8 24 Rxg6 Kd7 25 Rxg7 Re8 26 Bf6', { a: '+−', r: 'Howell–Ragozin, Cannes 1993', c: '10...Qe8?! permite um ataque forte: depois de 18.Nd5! as brancas venceram em poucos lances.' }],
  ['c25-a', '1', 'a', '(a) 14...Qxc6', '14... Qxc6 15 Bxc5 dxc5 16 Nd5', { c: '14...Qxc6 15.Bxc5 dxc5 16.Nd5! é bom para as brancas.' }],
  ['c25-a', '2', 'a', '(a) 17...bxc3', '17... bxc3 18 Bf6 Qc7 19 Qh6', { c: '17...bxc3 18.Bf6 Qc7 19.Qh6! leva ao mate.' }],
  ['c25-a', '3', 'a', '(a) 17...Bd7', '17... Bd7 18 Rg4 bxc3 19 Rh4 Bxg5+ 20 Qxg5 f6 21 Qh5', { a: '±', r: 'Plaskett–Wahls, Hastings 1990', c: '17...Bd7 é um pouco melhor, mas 18.Rg4! ainda deixa as brancas melhor.' }],
  ['c25', 'b', 'b', '(b)', '13 g5 Bd7 14 Rg3 Rfc8 15 Qh5 g6 16 Qh6 Bf8 17 Qh4 Be7 18 f4 b5 19 Nf5 Nxb3+ 20 axb3 exf5 21 Nd5 Qa5 22 Kb1 Nb4', { a: '−+', c: '13.g5 também leva a complicações fascinantes; com 18.f4?! b5 19.Nf5?! as brancas exageram e perdem.' }],
  ['c25-b', '1', 'b', '(b) 13...b5', '13... b5 14 Nxc6 Nxb3+ 15 axb3 Qxc6', { c: '13...b5 14.Nxc6 Nxb3+ 15.axb3 Qxc6 transpõe para a nota (a).' }],
  ['c25-b', '2', 'b', '(b) 17...Nxd4', '17... Nxd4 18 Bxd4 Nxb3+ 19 axb3 e5 20 Be3 b5 21 Rd2 Be6 22 Rh3 h5 23 gxh6 Bxh3 24 Qxh3', { c: '17...Nxd4 18.Bxd4 Nxb3+ 19.axb3 e5 leva a um bom sacrifício de qualidade das brancas com 22.Rh3!.' }],
  ['c25-b', '3', 'b', '(b) 18.Qh6', '18 Qh6 Bf8 19 Qh4 Be7', { a: '=', c: '18.Qh6 Bf8 19.Qh4 Be7 repete a posição: empate.' }],
  ['c25', 'c', 'c', '(c)', '13... Nxb3+ 14 axb3 exf5 15 gxf5 Kh8 16 Nd5 Qd8 17 Qh5 f6 18 Rxg7 Kxg7 19 Rg1+ Kh8 20 Nf4', { a: '+−', r: 'Shadrina–Kochetkova, São Petersburgo 2005', c: 'Aceitar o sacrifício dá às brancas um ataque forte pela coluna g.' }],
  ['c25-c', '1', 'c', '(c) 14...b5', '14... b5 15 Nxe7+', { a: '±', c: '14...b5 15.Nxe7+ e 16.Qd3 deixa as brancas melhor.' }],
  ['c25', 'd', 'd', '(d)', '14 Nxe7+ Qxe7 15 f3 Bb7 16 g5 Rfc8', { a: '=', c: '14.Nxe7+ Qxe7 15.f3 é mais ou menos igual.' }],
  ['c25', 'e', 'e', '(e)', '16 Rg3 Bf8 17 Qh5 g6 18 Nh6+ Kh8 19 Qh4 b4 20 Rh3 bxc3 21 Ng4 f5 22 Nf6 h6 23 exf5 cxb2+ 24 Kb1 exd5 25 Qxh6+ Bxh6 26 Rxh6+ Kg7', { a: '=', r: 'Meister–J. Geller, Lichtenbergan 2006', c: 'Uma linha realmente selvagem: 16.Rg3 Bf8 17.Qh5 g6 18.Nh6+ termina em igualdade.' }],
  ['c25-e', '1', 'e', '(e) 16...Ne5', '16... Ne5 17 Rh3 Ng6 18 Qh5 Nf8 19 Nxg7 Bxd5 20 Qh6', { a: '±', r: 'Fedorov–Lanka, Pula 1997', c: '16...Ne5 17.Rh3 Ng6 18.Qh5 é bom para as brancas, com 21.Nh5 em seguida.' }],
  ['c25-e', '2', 'e', '(e) 22.exf5', '22 exf5', { c: '22.exf5!? também merece atenção.' }],
  // Coluna 26
  ['c26', 'f-A', 'f', '(f) A', '11... Nxd4 12 Bxd4 b5 13 g4 b4 14 g5 Nd7 15 Qh5 bxc3 16 g6 cxb2+ 17 Kb1 fxg6 18 Bxe6+ Kh8 19 Rxg6 Ne5 20 Rxg7 Kxg7 21 Rg1+ Kh8 22 Qh6', { a: '+−', r: 'Pieri–Bernard, Paris 1994', c: '11...Nxd4?! é arriscado: depois de 14.g5! o ataque branco chega primeiro, e as pretas abandonaram.' }],
  ['c26-f-A', '1', 'f', '(f) A 17...hxg6', '17... hxg6 18 Rxg6 fxg6 19 Bxe6+ Rf7 20 Qxg6 Ne5 21 Bxf7+', { a: '±', c: '17...hxg6 18.Rxg6 também deixa as brancas melhor.' }],
  ['c26', 'f-B', 'f', '(f) B', '11... b5 12 g4 b4 13 Nxc6 Qxc6 14 Nd5 exd5 15 g5 Nxe4 16 Bxd5 Qa4 17 Bxe4 Be6 18 Bd4', { a: '±', r: 'Veicheva–Jovanović, Pula 1998', c: '11...b5 12.g4 b4 13.Nxc6 Qxc6 14.Nd5! deixa as brancas melhor.' }],
  ['c26-f-B', '1', 'f', '(f) B 17.Bxa8', '17 Bxa8 Nc3', { c: '17.Bxa8? Nc3! é bom para as pretas.' }],
  ['c26', 'g-A', 'g', '(g) A', '15 Nf5 exf5 16 Nd5 Qd8 17 exf5 Re8', { a: '∞', c: '15.Nf5 exf5 16.Nd5 leva a um jogo com chances para os dois lados.' }],
  ['c26', 'g-B', 'g', '(g) B', '15 h4 b4 16 Na4 Nc5 17 h5 Bd7 18 Kb1 Rac8 19 g6 Bf6 20 gxh7+ Kh8 21 Bg5', { a: '±', r: 'Ehlvest–Yudasin, URSS 1986', c: '15.h4 b4 16.Na4 deixa as brancas melhor.' }],
  ['c26', 'h', 'h', '(h)', '16 Nf5 Nc5 17 Nxe7+ Qxe7 18 e5 d5 19 Qf2 Nd7 20 Na4', { a: '±', r: 'Nunn–Arakhamia, Inglaterra 1997', c: 'Com 16.Nf5! as brancas eliminam o bispo de e7 e ficam melhor.' }],
  ['c26-h', '1', 'h', '(h) 16...exf5', '16... exf5 17 Nd5 Qd8 18 exf5 Re8 19 Bd4 Bb7 20 g6 fxg6 21 Qe6+ Kh8 22 Bxg7+ Kxg7 23 fxg6', { a: '+−', c: '16...exf5?! 17.Nd5 Qd8 18.exf5 dá às brancas um ataque vencedor.' }],
  ['c26-h-1', '1', 'h', '(h) 19...Bf6', '19... Bf6 20 Qxe8+ Qxe8 21 gxf6', { a: '±', r: 'Nijboer–Winants, Wijk aan Zee 1988', c: '19...Bf6 20.Qxe8+! Qxe8 21.gxf6 deixa as brancas melhor.' }],
  // Coluna 27
  ['c27', 'i', 'i', '(i)', '11... Nd7 12 Nf5 Nc5 13 Nxe7+ Nxe7 14 Qd2 Rd8 15 Bf4', { a: '±', r: 'Anand–Salov, Dos Hermanas 1997', c: '11...Nd7 dá às brancas mais opções, como 12.Nf5!?.' }],
  ['c27-i', '1', 'i', '(i) 12...exf5', '12... exf5 13 Nd5 Qd8 14 gxf5 Nf6 15 Rhg1', { a: '±', c: '12...exf5 13.Nd5 Qd8 14.gxf5 dá às brancas um ataque forte.' }],
  ['c27-i', '2', 'i', '(i) 13...Qxe7', '13... Qxe7 14 f4', { a: '⩲', c: '13...Qxe7 14.f4 dá uma pequena vantagem às brancas (Anand).' }],
  ['c27', 'j-A', 'j', '(j) A', '12... b5 13 g5 Nd7 14 f4 Nc5 15 Rg1 Rb8 16 Kb1 a5', { a: '=', r: 'de Firmian–Lein, Nova York 1990', c: '12...b5 13.g5 Nd7 também leva à igualdade.' }],
  ['c27', 'j-B', 'j', '(j) B', '12... e5 13 Rc4 Qd8 14 g5 Ne8 15 Rxc8 Rxc8 16 h4', { a: '±', r: 'Segueiro–de la Torre, correspondência 1994', c: '12...e5?! deve ser evitado: com 15.Rxc8! as brancas controlam as casas centrais.' }],
  ['c27', 'k', 'k', '(k)', '16 Kb1 Bd7 17 h4 Rae8 18 h5 Bc6 19 exf5 Rxf5', { a: '=', r: 'Nunn–Shirov, Mônaco (rápidas) 1995', c: 'Com 16.Kb1 Bd7 17.h4 o jogo fica igual.' }],
  // Coluna 28
  ['c28', 'l-A', 'l', '(l) A', '9... d5 10 Bb3 Na5 11 e5 Nd7 12 f4 Bb4 13 Bd2 Nc5 14 Rhf1 Naxb3+ 15 axb3 a5 16 Kb1 Bxc3 17 Bxc3 Ne4 18 Rf3', { a: '±', r: 'de Firmian–Sosonko, Lucerna 1989', c: '9...d5 10.Bb3 Na5 11.e5 deixa as brancas melhor.' }],
  ['c28', 'l-B', 'l', '(l) B', '9... Bd7 10 f4 Rc8 11 e5 Ne8 12 Nxc6 Bxc6 13 f5 exf5 14 e6', { a: '⩲', r: 'Topalov–Leko, Dortmund 1996', c: '9...Bd7 10.f4! Rc8 11.e5 Ne8 12.Nxc6 Bxc6 13.f5! dá uma pequena vantagem às brancas.' }],
  ['c28', 'm-A', 'm', '(m) A', '12... b5 13 e5 dxe5 14 Qxe5 Rfc8 15 g4 Qc7 16 g5 Ne8 17 Nd5', { a: '±', r: 'Yudasin–Fedorowicz, Olimpíada de Novi Sad 1990', c: '12...b5?! 13.e5! deixa as brancas melhor.' }],
  ['c28', 'm-B', 'm', '(m) B', '12... Qa6 13 Qxa6 bxa6 14 f3 Rfc8 15 Be3', { a: '⩲', r: 'Grigoriev–Zakharov, Memorial Chigorin 2000', c: '12...Qa6 troca as damas, mas as brancas ficam com uma pequena vantagem.' }],
  ['c28', 'n', 'n', '(n)', '16 Qe1 Rxc2+ 17 Kxc2 Qc7+ 18 Bc3', { a: '±', r: 'MacArthur–Epstein, EUA 1991', c: '16.Qe1 Rxc2+ 17.Kxc2 Qc7+ 18.Bc3 deixa as pretas com compensação apenas parcial pela qualidade.' }],
  // Coluna 29
  ['c29', 'o', 'o', '(o)', '12... Nd7 13 Bxe6 fxe6 14 Nxe6 Qc4 15 Nxg7+ Kf7 16 Qh5+ Kxg7 17 Bd4+ Ne5 18 Nd5 Nc6 19 Bxe5+ Nxe5 20 Nxe7 Nf7 21 g6', { a: '±', r: 'Benedetti–Cassaro, correspondência 1989', c: '12...Nd7?! permite 13.Bxe6!, e as brancas ganham um ataque duradouro.' }],
  ['c29', 'p', 'p', '(p)', '14 Nf5 exf5 15 Nd5 Qd8 16 exf5 Bb7 17 f6 gxf6 18 Rhe1 Bxd5 19 Rxd5 Rg8 20 gxf6 Nxf6 21 Rf5 Ng4 22 Bg5 Ne5 23 Bxe7 Qxe7 24 f4 Qe6 25 Qe4 Nd3+ 26 Kd2 Nxe1 27 Qxa8+ Ke7 28 Qb7+ Kf8 29 Qb8+', { a: '=', r: 'Waitzkin–de Firmian, Bermudas 1995', c: '14.Nf5 é um sacrifício muito analisado, que com o melhor jogo termina em empate por xeque perpétuo.' }],
  ['c29', 'q-A', 'q', '(q) A', '16 h5 Bd7 17 Kb1 Bxa4 18 bxa4 Nxa4 19 g6 Bf6', { a: '=', r: 'Efimenko–Areshenko, Campeonato Ucraniano 2005', c: 'As brancas têm dois planos razoáveis. 16.h5 Bd7 17.Kb1 leva à igualdade.' }],
  ['c29', 'q-B', 'q', '(q) B', '16 Qc4 Bb7 17 Qxb4 Nxa4 18 bxa4 Rb8 19 Qc3 Qxc3', { a: '=', r: 'Zapata–Demaria, Campeonato Continental Americano 2005', c: '16.Qc4 Bb7 17.Qxb4 também leva à igualdade.' }],
  ['c29', 'q-C', 'q', '(q) 16.f3', '16 f3 Bd7', { c: '16.f3?! Bd7 é lento demais.' }],
  // Coluna 30
  ['c30', 'r', 'r', '(r)', '10 Bb3 b5 11 f3 Be7 12 g4 Nxb3+ 13 axb3 b4 14 Na4 Nd7', { a: '=', c: '10.Bb3 b5 obriga a concessão 11.f3 para defender e4, e depois de 11...Be7 as pretas ficam bem.' }],
  ['c30', 's-A', 's', '(s) A', '11 g4 b4 12 Nb1 e5 13 Nf5 Be6 14 b3 g6 15 g5 Nd7 16 Nh6 Bg7', { a: '=', r: 'Nunn–Salov, Wijk aan Zee 1992', c: 'Salov lidou bem com as alternativas: 11.g4 b4 12.Nb1 e5 leva à igualdade.' }],
  ['c30', 's-B', 's', '(s) B', '11 Bg5 Be7 12 a3 Bd7 13 f4 Nc4 14 Rhf1 Rc8 15 Bxc4 Qxc4', { a: '=', r: 'Rublevsky–Salov, Oviedo 1992', c: '11.Bg5 Be7 12.a3 Bd7 dá às pretas um jogo ativo.' }],
  ['c30', 't', 't', '(t)', '12... d5 13 exd5 Nxd5 14 Ndxb5 axb5 15 Bxb5+ Kd8 16 Nxd5 exd5 17 Rd3', { a: '±', r: 'Nunn–Sosonko, Olimpíada de Salônica 1984', c: '12...d5 13.exd5 Nxd5 14.Ndxb5! dá às brancas um ataque forte.' }],
  ['c30-t', '1', 't', '(t) 14...Qb8', '14... Qb8 15 Nxd5 Bxd5 16 Nc3 Bxh1 17 Rxh1', { a: '±', c: '14...Qb8 15.Nxd5 Bxd5 16.Nc3 também deixa as brancas melhor.' }],
  ['c30', 'u', 'u', '(u)', '14... Nc4 15 Ndxb5 axb5 16 Nxb5 Qb8 17 Bxc4 Bxe4 18 Rhe1 d5 19 Bd3 Bxd3 20 Qxd3 Be7 21 Nd4', { a: '±', r: 'Wolff–Inkiov, St. John 1988', c: '14...Nc4? 15.Ndxb5! deixa as brancas com um peão a mais.' }],
  ['c30', 'v', 'v', '(v)', '16 cxd3 Be7 17 Rc1 Qd7 18 h4', { a: '⩲', r: 'Cselotei–Kovács, Budapeste 1995', c: 'Com 16.cxd3 Be7 17.Rc1 as brancas ficam com uma pequena vantagem.' }],
]

const capitulo = {
  id: 'siciliana-velimirovic',
  arquivo: 'siciliana-velimirovic',
  nome: 'Siciliana — Ataque Velimirović',
  fonte: 'Modern Chess Openings — Sicilian Defense, Velimirović Attack (pp. 330–332), colunas 25–30',
  base: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 d6 6. Bc4 e6 7. Be3',
  corPadrao: 'b',
  ordem: 330,
  grupos: [
    { id: 'be7', nome: '7...Be7 8.Qe2 O-O', colunas: [25, 26, 27, 28] },
    { id: 'a6', nome: '8...a6 e 7...a6', colunas: [29, 30] },
  ],
}

module.exports = { capitulo, colunas, notas }
