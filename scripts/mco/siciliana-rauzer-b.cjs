// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Clássica, Ataque Richter-Rauzer (pp. 323–324), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs siciliana-rauzer-b
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-rauzer-b-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; a avaliação vem da nota que continua cada coluna.
// Nota (t): o livro escreve "16 Bxc4 bxc4", mas nessa linha as pretas não jogaram ...b5; o peão que captura é o d5 (16...dxc4).

const B = '1 e4 c5 2 Nf3 Nc6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 d6 6 Bg5 e6 7 Qd2 a6 8 O-O-O Bd7'

const colunas = {
  c07: [`${B} 9 f4 Be7 10 Nf3 b5 11 Bxf6 gxf6 12 Kb1 Qb6 13 f5 O-O-O 14 g3 Kb8 15 fxe6 fxe6 16 Bh3 Bc8`, 'f4', '9.f4 Be7 10.Nf3 b5', '±',
    'Com 7...a6 e 8...Bd7 as pretas trocam os lances naturais por outros menos naturais, que parecem dar mais contrajogo. Com 9.f4 Be7 10.Nf3 as brancas mantêm os cavalos; depois de 11.Bxf6 gxf6 e 13.f5 o par de bispos preto não basta, e as brancas ficam melhor.'],
  c08: [`${B} 9 f4 b5 10 Bxf6 gxf6 11 Kb1 Qb6 12 Nce2 Rc8 13 g3 b4 14 Bg2 a5 15 Rhe1 a4 16 Nxc6 Qxc6`, 'f4', '9...b5 10.Bxf6 gxf6 11.Kb1', '=',
    'A continuação 9...b5 10.Bxf6 gxf6 é a crítica, mas as pretas ficam bem. Com 11.Kb1 Qb6 12.Nce2 elas avançam os peões da ala da dama e igualam.'],
  c09: [`${B} 9 f4 b5 10 Bxf6 gxf6 11 f5 Nxd4 12 Qxd4 Bh6+ 13 Kb1 Bf4 14 fxe6 fxe6 15 Ne2 Be5 16 Qd2 Qb6`, 'f4', '11.f5', '±',
    'Com 11.f5 as brancas atacam e6 logo. As pretas trocam em d4, colocam o bispo em f4 e e5, mas as brancas ficam melhor.'],
  c10: [`${B} 9 f4 h6 10 Bh4 g5 11 fxg5 Ng4 12 Be2 Nge5 13 Nf3 Be7 14 Rhg1 b5 15 Rdf1 b4 16 Nd1 hxg5`, 'f4', '9...h6 10.Bh4 g5', '=',
    'Com 9...h6 10.Bh4 g5 as pretas sacrificam um peão para ganhar a casa e5 para o cavalo. Depois de 16...hxg5 elas recuperam o peão e igualam.'],
  c11: [`${B} 9 f3 Be7 10 h4 b5 11 Kb1 O-O 12 g4 Ne5 13 Bxf6 Bxf6 14 g5 Be7 15 f4 Nc4 16 Bxc4 bxc4`, 'outros', '9.f3', '=',
    'Com 9.f3 as brancas preparam o avanço g4 e h4, como no Ataque Inglês. As pretas rocam pequeno, contra-atacam com ...b5 e ...Nc4, e a posição fica equilibrada, com os dois lados atacando.'],
  c12: [`${B} 9 Be2 b5 10 Nxc6 Bxc6 11 Qe3 Be7 12 e5 Nd5 13 Nxd5 Bxg5 14 Nc7+ Qxc7 15 Qxg5 dxe5 16 Qxg7 Rf8`, 'outros', '9.Be2', '=',
    'Com 9.Be2 as brancas jogam com calma. Depois de 10.Nxc6 Bxc6 11.Qe3 Be7! a sequência de trocas leva a uma posição igual.'],
}

const notas = [
  // Coluna 7
  ['c07', 'a', 'a', '(a)', '10 Nb3 b5 11 Bxf6 gxf6 12 Kb1 b4 13 Ne2 h5 14 Ned4 Qb6 15 f5 Nxd4 16 Nxd4 e5 17 Nf3 Rc8', { a: '∞', r: 'Ivanović–Popović, match 1995', c: '10.Nb3 também é lógico, com chances para os dois lados.' }],
  ['c07', 'b', 'b', '(b)', '11 e5 b4 12 exf6 bxc3 13 Qxc3 gxf6 14 f5 d5 15 fxe6 fxe6 16 Bh4 Nb4', { r: 'I. Gurevich–Hennigan, Hastings 1993/94', c: '11.e5 b4! 12.exf6 bxc3 dá às pretas um bom contrajogo.' }],
  ['c07', 'c', 'c', '(c)', '11... Bxf6 12 Qxd6 Be7 13 Qd3 b4 14 Na4 Ra7 15 Qe3 Qa5 16 b3 Rb7 17 Nd2 Na7 18 Nc4 Qc7 19 Rxd7 Qxd7 20 Nc5', { a: '⩲', r: 'Psakhis–Geller, Moscou 1986', c: '11...Bxf6?! 12.Qxd6 deixa as brancas com a iniciativa.' }],
  ['c07', 'd-A', 'd', '(d) A', '12 Bd3 Qa5 13 Kb1 b4 14 Ne2 Qc5 15 f5 a5 16 Nf4 a4', { a: '∞', r: 'Fischer–Spassky, Campeonato Mundial 1972', c: 'Com 12.Bd3 Qa5 13.Kb1 b4 as pretas têm contrajogo.' }],
  ['c07', 'd-B', 'd', '(d) B', '12 f5 Qb6 13 g3 b4 14 fxe6 fxe6 15 Ne2 Qf2 16 Ned4 Qxd2+', { a: '=', r: 'Erenburg–Avrukh, Campeonato Israelense 2004', c: '12.f5 Qb6 13.g3 b4 leva a um jogo igual.' }],
  ['c07', 'e', 'e', '(e)', '13 Bd3 O-O-O 14 Rhf1 Kb8 15 Qe1 Qc5 16 Nd2 Nd4 17 Ne2 Bc6', { a: '=', r: 'Anand–Timman, Amsterdã 1992', c: 'Com 13.Bd3 O-O-O o jogo fica igual.' }],
  ['c07', 'f', 'f', '(f)', '13... b4 14 fxe6 fxe6 15 Ne2 a5 16 Nf4 Qc5 17 g3 a4 18 Bh3 Kf7 19 Rhf1 a3 20 Nxe6 Bxe6 21 Bxe6+ Kxe6 22 Qd5+ Qxd5 23 exd5+ Kd7 24 dxc6+', { a: '±', r: 'van der Wiel–Langeweg, Holanda 1993', c: 'Em van der Wiel–Langeweg as pretas deixaram o rei no centro e sofreram um ataque.' }],
  ['c07', 'g', 'g', '(g)', '17 Qe1 Rhe8 18 Ne2 Ne5 19 Rf1 Nc4 20 Nf4 Bf8 21 Qf2', { a: '±', r: 'Bruzón–Molander, Santo Domingo 2003', c: 'Com 17.Qe1 e 18.Ne2 as brancas ficam melhor.' }],
  // Coluna 8
  ['c08', 'h', 'h', '(h)', '10 Nxc6 Bxc6 11 Bd3 Be7 12 e5 dxe5 13 fxe5 Nd5 14 Bxe7 Qxe7 15 Ne4 O-O 16 Rhf1 f5 17 exf6 Nxf6', { a: '⩲', r: 'J. Polgár–Dreev, Linares 1997', c: 'Com 10.Nxc6 Bxc6 11.Bd3 as brancas ficam com uma vantagem muito pequena.' }],
  ['c08-h', '1', 'h', '(h) 13...Nd7', '13... Nd7', { c: '13...Nd7 é mais agudo.' }],
  ['c08', 'i', 'i', '(i)', '10... Qxf6 11 e5 dxe5 12 Ndxb5 Qd8 13 Nd6+ Bxd6 14 Qxd6 exf4 15 Bxa6 Rxa6 16 Nb5 Ra7 17 Nxa7 Nxa7 18 Qd4 Nc6 19 Qxg7 Rf8 20 Rd2', { a: '±', r: 'Balashov–Shebakov, Chelyabinsk 1990', c: '10...Qxf6?! 11.e5 dxe5 12.Ndxb5 e 15.Bxa6! deixam as brancas melhor.' }],
  ['c08', 'j', 'j', '(j)', '12 Nxc6 Bxc6 13 Bd3 b4 14 Ne2 h5 15 Rhf1 a5 16 c3 Rb8 17 Nd4 Bd7 18 Bc4 Rc8 19 Qd3 bxc3 20 b3 a4', { a: '=', r: 'Waitzkin–Mednis, Reno 1996', c: 'Com 12.Nxc6 Bxc6 13.Bd3 b4 o jogo fica igual.' }],
  ['c08', 'k', 'k', '(k)', '17 Nd4 Qc5 18 Re3 Bg7 19 c3 Rb8', { a: '=', r: 'Marjanović–Atalik, Liga Grega 2003', c: 'Com 17.Nd4 Qc5 o jogo fica igual.' }],
  // Coluna 9
  ['c09', 'l', 'l', '(l)', '11 Nxc6 Bxc6 12 Qe1 b4 13 Nd5 a5 14 Bd3 Bg7 15 f5 Bxd5 16 exd5 e5 17 Bb5+ Ke7 18 Bc6 Rb8', { a: '=', r: 'Short–Damljanović, Interzonal de Manila 1990', c: '11.Nxc6 Bxc6 12.Qe1 b4 13.Nd5 leva a um jogo igual: o rei preto fica seguro em e7.' }],
  ['c09-l', '1', 'l', '(l) 14.Rd4', '14 Rd4 f5 15 exf5 Bg7', { a: '=', c: '14.Rd4 f5! 15.exf5 Bg7 é igual.' }],
  ['c09-l', '2', 'l', '(l) 15.Rc4', '14 Rd4 f5 15 Rc4 Bxd5 16 exd5 Qf6 17 dxe6 fxe6 18 Rc7 Kd8 19 Rc6 Bg7', { a: '∓', r: 'Ulfarsson–Waitzkin, Campeonato de Cadetes 1994', c: '15.Rc4?! Bxd5 16.exd5 Qf6 deixa as pretas um pouco melhor.' }],
  ['c09-l', '3', 'l', '(l) 15.g4', '15 g4 h5', { a: '=', c: '15.g4 h5 também é igual.' }],
  ['c09', 'm', 'm', '(m)', '11... Qb6 12 fxe6 fxe6 13 Nxc6 Bxc6 14 Kb1 O-O-O 15 Bd3 Kb8 16 Rhf1 Be7 17 Qh6', { a: '±', r: 'Akopian–Ivanchuk, Amplico (rápidas) 2003', c: '11...Qb6 12.fxe6 fxe6 13.Nxc6 e 17.Qh6 deixam as brancas melhor.' }],
  ['c09', 'n', 'n', '(n)', '17 Ng1 Bc6 18 Bd3 O-O 19 Nf3', { a: '±', r: 'Okkes–Nijboer, Liga Holandesa 2006', c: 'Com 17.Ng1!? e 19.Nf3 o cavalo ataca o bispo de e5, e as brancas ficam melhor.' }],
  // Coluna 10
  ['c10', 'o', 'o', '(o)', '9... Qc7 10 Bxf6 gxf6 11 Kb1 h5 12 Qe1 O-O-O 13 Nxc6 Bxc6 14 Bd3 h4 15 Rf1 Kb8 16 f5', { a: '±', r: 'Fedorowicz–Shamkovich, Nova York 1994', c: 'Com 9...Qc7 10.Bxf6 gxf6 as brancas ficam melhor.' }],
  ['c10', 'p', 'p', '(p)', '10 Bxf6 Qxf6 11 Nf3 Qd8 12 Bc4 Be7 13 Bb3 Qc7 14 f5 O-O-O 15 Kb1 Kb8', { a: '=', r: 'Yemelin–Aseev, Campeonato Russo 1996', c: 'Com 10.Bxf6 Qxf6 11.Nf3 o jogo fica igual.' }],
  ['c10', 'q', 'q', '(q)', '10... Nxe4 11 Qe1 Nf6 12 Nf5 Qa5 13 Nxd6+ Bxd6 14 Rxd6 O-O-O 15 Rd1 Qc7 16 Qe3 Ne7 17 Bd3 Bc6 18 Kb1', { a: '±', r: 'Lutz–Landenbergue, Biel 1996', c: '10...Nxe4 11.Qe1! Nf6 12.Nf5 deixa as brancas melhor.' }],
  ['c10', 'r', 'r', '(r)', '12 Nxc6 Bxc6 13 Be2 Ne5 14 g3 Ng6 15 Rhf1 Be7 16 gxh6 Nxh4 17 gxh4 Bf8 18 Qd4 Rxh6', { a: '=', r: 'Savićević–Nevedichy, Herceg Novi 2000', c: 'Com 12.Nxc6 Bxc6 13.Be2 Ne5 o jogo fica igual.' }],
  ['c10', 's', 's', '(s)', '17 Bxg5 Bxg5 18 Nxg5 Qa5 19 Kb1 b3 20 Qxa5 bxc2+', { a: '=', r: 'Spoelman–Nijboer, Vlissingen 2006', c: 'Com 17.Bxg5 Bxg5 18.Nxg5 Qa5 19.Kb1 b3! o jogo fica igual.' }],
  // Coluna 11
  ['c11', 't', 't', '(t)', '10... Qc7 11 Kb1 O-O 12 h5 Rfd8 13 g4 d5 14 e5 Nxe5 15 h6 Nc4 16 Bxc4 dxc4 17 hxg7 Bc6 18 Qe1 Kxg7 19 Qh4 Ng8 20 Nxe6+ fxe6 21 Qxh7+', { a: '+−', r: 'Ehlvest–Timoshenko, Nova York 1994', c: '10...Qc7 11.Kb1 O-O?! 12.h5 e 14.e5! deram às brancas um ataque forte; as pretas abandonaram depois de 21.Qxh7+.' }],
  ['c11', 'u', 'u', '(u)', '11 Nxc6 Bxc6 12 Kb1 Rc8 13 Ne2 O-O 14 Nd4 Bb7 15 g4 Qc7 16 Bh3 Rfe8', { a: '=', r: 'Tolnai–A. Grosar, Liubliana 1993', c: 'Com 11.Nxc6 Bxc6 12.Kb1 o jogo fica igual.' }],
  ['c11', 'v', 'v', '(v)', '17 f5 Re8 18 Rhf1 Rb8', { a: '=', r: 'Abreu–Rodríguez, Cuba 1988', c: 'Com 17.f5 Re8 18.Rhf1 Rb8 os dois lados atacam, numa posição equilibrada.' }],
  // Coluna 12
  ['c12', 'w', 'w', '(w)', '9... h6 10 Bh4 b5 11 Nxc6 Bxc6 12 Qe3 Qa5 13 Nd5', { a: '±', r: 'Fedorowicz–Zaltsman, Reykjavík 1986', c: '9...h6 10.Bh4 b5?! 11.Nxc6 Bxc6 12.Qe3 Qa5 13.Nd5! deixa as brancas melhor.' }],
  ['c12-w', '1', 'w', '(w) 10...Rc8', '10... Rc8 11 Bg3 Nxd4 12 Qxd4 e5 13 Qd3 Qa5', { a: '∞', r: 'Chiburdanidze–Arbakov, Moscou 1981', c: 'As pretas melhoram com 10...Rc8, que ameaça 11...Nxe4.' }],
  ['c12', 'x', 'x', '(x)', '17 Qxh7 Bxg2 18 Rhg1 Bd5 19 Rg7 e4', { a: '=', r: 'Vladimirov–Granda Zúñiga, Gausdal 1986', c: 'Com 17.Qxh7 Bxg2 o jogo fica igual.' }],
]

const capitulo = {
  id: 'siciliana-rauzer-b',
  arquivo: 'siciliana-rauzer-b',
  nome: 'Siciliana Clássica — Richter-Rauzer com 7...a6 8.O-O-O Bd7',
  fonte: 'Modern Chess Openings — Sicilian Defense, Richter-Rauzer Attack (pp. 323–324), colunas 7–12',
  base: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 d6 6. Bg5 e6 7. Qd2 a6 8. O-O-O Bd7',
  corPadrao: 'b',
  ordem: 323,
  grupos: [
    { id: 'f4', nome: '9.f4', colunas: [7, 8, 9, 10] },
    { id: 'outros', nome: '9.f3 e 9.Be2', colunas: [11, 12] },
  ],
}

module.exports = { capitulo, colunas, notas }
