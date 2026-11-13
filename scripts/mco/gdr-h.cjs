// Transcrição do MCO 15ª ed. — Gambito da Dama Recusado, Variante Tartakower (pp. 412–414), colunas 43–48.
// Gerar: node scripts/mco/gerar.cjs gdr-h
// Formato: ver gambito-do-rei.cjs. Dicas em gdr-h-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Correções: na nota (t) o livro traz 8...bxc4, impossível; ficou 8...dxc4.
// Na nota (x) A o livro traz 14 cxd4, mas as brancas não têm mais o peão c; ficou 14 exd4.
// Na nota (cc) o livro traz 17 Rc7, impossível (o peão preto de c5 bloqueia a coluna); ficou 17 Rc3, que leva ao 18 Rb3 do livro.

const B = '1 d4 d5 2 c4 e6 3 Nc3 Nf6 4 Bg5 Be7 5 e3 O-O 6 Nf3 h6 7 Bh4 b6'
const E = `${B} 8 Be2 Bb7 9 Bxf6 Bxf6 10 cxd5 exd5 11 b4`

const colunas = {
  c43: [`${E} c6 12 O-O Re8 13 Qb3 a5 14 bxa5 Rxa5`, 'be2', '8.Be2 11...c6', '∞',
    'Na Tartakower as pretas jogam ...b6 e ...Bb7 para pressionar e4 e preparar ...c5. Com 8.Be2 Bb7 9.Bxf6 Bxf6 10.cxd5 exd5 11.b4 as brancas atacam na ala da dama, contra o peão c preto; depois de 11...c6 e ...a5 o jogo fica aberto e interessante (H. Olafsson).'],
  c44: [`${E} c5 12 bxc5 bxc5 13 Rb1 Bc6 14 O-O Nd7`, 'be2', '11...c5', '=',
    'Com 11...c5 as pretas aceitam peões pendentes em c5 e d5. Depois de 12.bxc5 bxc5 13.Rb1 Bc6 14.O-O Nd7 a atividade das peças compensa, e as brancas conseguem pouco (Khalifman–Portisch, Biel 1993).'],
  c45: [`${B} 8 Bd3 Bb7 9 O-O Nbd7 10 Qe2 Ne4 11 Bg3 c5 12 cxd5 exd5 13 Rad1 Nxg3 14 hxg3 Bf6`, 'bd3', '8.Bd3 Bb7 10.Qe2', '=',
    'Com 8.Bd3 o bispo mira h7. Depois de 8...Bb7 9.O-O Nbd7 10.Qe2 Ne4 as pretas trocam peças; com 11...c5 e ...Nxg3 elas ficam com o par de bispos e o jogo é igual.'],
  c46: [`${B} 8 Bd3 dxc4 9 Bxc4 Bb7 10 O-O Nbd7 11 Qe2 Ne4 12 Bg3 Bd6 13 Rfd1 Bxg3 14 hxg3 Qe7`, 'bd3', '8...dxc4', '⩲',
    'Com 8...dxc4 as pretas fazem o bispo gastar um tempo. Depois de 9.Bxc4 Bb7 10.O-O Nbd7 11.Qe2 Ne4 elas trocam peças, mas as brancas ficam um pouco melhor (Gheorghiu–Pfleger, Lucerna 1985).'],
  c47: [`${B} 8 Qb3 Bb7 9 Bxf6 Bxf6 10 cxd5 exd5 11 Rd1 Re8 12 Bd3 c5 13 dxc5 Nd7 14 c6 Bxc6`, 'qb3', '8.Qb3', '⩲',
    'Com 8.Qb3 a dama pressiona d5. Depois de 9.Bxf6 Bxf6 10.cxd5 exd5 11.Rd1 as brancas atacam o peão d; com 12...c5 13.dxc5 Nd7 as pretas devolvem a estrutura, mas as brancas ficam com pequena vantagem (Lautier–Beliavsky, Dortmund 1995).'],
  c48: [`${B} 8 cxd5 Nxd5 9 Bxe7 Qxe7 10 Nxd5 exd5 11 Rc1 Be6 12 Qa4 c5 13 Qa3 Rc8 14 Be2 Kf8`, 'cxd5', '8.cxd5 Nxd5', '=',
    'Com 8.cxd5 Nxd5 as peças se trocam. Depois de 11.Rc1 Be6 12.Qa4 c5 13.Qa3 as brancas pressionam os peões pendentes; com 14...Kf8 as pretas desfazem a cravada e igualam (Winants–Kasparov, Bruxelas 1987).'],
}

const notas = [
  // Coluna 43
  ['c43', 'a', 'a', '(a)', '6... b6 7 cxd5 Nxd5 8 Bxe7 Qxe7 9 Nxd5 exd5 10 Rc1 Be6 11 Qa4 c5 12 Qa3 Rc8 13 Bb5', { a: '⩲', r: 'Petrosian–Trikaliotis, Siegen 1970', c: '6...b6 leva a um jogo parecido, mas sem o útil respiro em h7: 7.cxd5 Nxd5 8.Bxe7 Qxe7 9.Nxd5 exd5 10.Rc1 é um pouco melhor para as brancas.' }],
  ['c43', 'b', 'b', '(b)', '8 Bxf6 Bxf6 9 cxd5 exd5 10 Be2 Be6', { c: 'As brancas também podem jogar 8.Bxf6 Bxf6 9.cxd5 exd5 10.Be2 de imediato; 10...Bb7 transporia para a coluna, mas as pretas podem considerar 10...Be6.' }],
  ['c43', 'c', 'c', '(c)', '11 O-O', { c: '11.O-O é menos ambicioso; as pretas podem escolher entre 11...Qe7, 11...c5, 11...c6, 11...Re8 e 11...Nd7.' }],
  ['c43', 'd-A', 'd', '(d) A', '12... Qd6 13 Qb3 Nd7 14 Rfe1 Be7 15 Rab1 a5 16 bxa5 Rxa5 17 a4 Re8 18 Bf1 Bf8 19 Qc2 g6 20 e4', { a: '⩲', r: 'Karpov–Kir. Georgiev, Tilburg 1994', c: '12...Qd6 13.Qb3 Nd7 14.Rfe1 Be7 15.Rab1 a5 é um pouco melhor para as brancas.' }],
  ['c43', 'd-B', 'd', '(d) B', '12... a5 13 b5 c5 14 Ne5 cxd4 15 exd4 Bxe5 16 dxe5 d4 17 Na4 Qg5', { a: '∞', r: 'Onischuk–Vaganian, Poikovsky 2002', c: 'Mais recentemente as pretas tentaram 12...a5, por exemplo 13.b5 c5 14.Ne5 cxd4 15.exd4 Bxe5 16.dxe5 d4 17.Na4 Qg5, com jogo complexo.' }],
  ['c43', 'e', 'e', '(e)', '14 b5 c5 15 Rad1 c4 16 Qc2', { a: '⩲', r: 'H. Olafsson', c: '14.b5 c5 15.Rad1 c4 16.Qc2 é um pouco melhor para as brancas (H. Olafsson).' }],
  ['c43-e', '1', 'e', '(e) 15.dxc5', '15 dxc5 bxc5 16 Rac1 Bxc3', { a: '∓', r: 'Timman–Short, San Lorenzo 1993', c: 'Não 15.dxc5 bxc5 16.Rac1 Bxc3, um pouco melhor para as pretas.' }],
  ['c43', 'f', 'f', '(f)', '15 Rab1 Nd7 16 Rfe1 Be7 17 a4 Bd6 18 e4 dxe4 19 Bc4 Rf8 20 Nxe4', { a: '∞', r: 'H. Olafsson', c: '15.Rab1 Nd7 16.Rfe1 Be7 17.a4 Bd6 18.e4 dxe4 19.Bc4 Rf8 20.Nxe4 teria sido interessante, segundo Olafsson.' }],
  ['c43-f', '1', 'f', '(f) 16...Qa8', '16... Qa8 17 a4 Ba6', { a: '∞', r: 'H. Olafsson', c: '16...Qa8 17.a4 Ba6 é indefinido.' }],
  ['c43-f', '2', 'f', '(f) 18.Bd3', '18 Bd3', { r: 'H. Olafsson–Lputian, Tilburg 1994', c: '18.Bd3 não levou a nada.' }],
  // Coluna 44
  ['c44', 'g', 'g', '(g)', '13... Qa5 14 Qd2 cxd4 15 Nxd4 Bxd4 16 exd4 Ba6 17 Nb5 Qd8 18 O-O Nc6 19 a4', { a: '⩲', r: 'Azmaiparashvili–Short, Manila 1992', c: '13...Qa5 se mostrou arriscado demais: 14.Qd2 cxd4 15.Nxd4 Bxd4 16.exd4, e 16...Ba6 17.Nb5 não basta para igualar.' }],
  ['c44-g', '1', 'g', '(g) 16...Bc6', '16... Bc6 17 Nb5 Qd8 18 O-O Nd7', { a: '⩲', r: 'Vaganian–Gómez, Haifa 1989', c: 'Nem 16...Bc6 17.Nb5 Qd8 18.O-O Nd7 basta para igualar.' }],
  ['c44', 'h', 'h', '(h)', '15 Bb5 Qc7 16 Qc2 Rfc8', { a: '=', r: 'Khalifman–Portisch, Biel 1993', c: 'Depois de 15.Bb5 Qc7 16.Qc2 Rfc8 as brancas tinham pouco.' }],
  ['c44-h', '1', 'h', '(h) 16.Qd2', '16 Qd2 Rfd8', { a: '=', r: 'Kasparov–Karpov, Moscou 1984', c: '16.Qd2 Rfd8 também é igual.' }],
  // Coluna 45
  ['c45', 'i', 'i', '(i)', '9 cxd5 Nxd5 10 Bxe7 Qxe7 11 Nxd5 Bxd5 12 Rc1 Rc8 13 O-O c5', { a: '=', r: 'Beliavsky–Geller, Yerevan 1975', c: '9.cxd5 Nxd5 10.Bxe7 Qxe7 11.Nxd5 Bxd5 foi igual.' }],
  ['c45', 'j-A', 'j', '(j) A', '10 Bg3 Bd6 11 Rc1 Bxg3 12 hxg3 c5 13 Qe2 a6 14 a4 Ne4 15 Rfd1 Qe7 16 Rb1 Rfd8 17 cxd5', { a: '=', r: 'Mikhalchishin–Díaz, Trnava 1988 (empate)', c: '10.Bg3 é bem respondido com 10...Bd6: 11.Rc1 Bxg3 12.hxg3 c5 terminou empatado.' }],
  ['c45', 'j-B', 'j', '(j) B', '10 cxd5 exd5 11 Bf5 g6 12 Bd3 Ne4', { a: '=', r: 'Morales–Barbero, Montpellier 1987', c: '10.cxd5 exd5 11.Bf5 g6 12.Bd3 Ne4 foi mais ou menos igual.' }],
  ['c45-j-B', '1', 'j', '(j) B 10...Nxd5', '10... Nxd5 11 Bxe7 Qxe7 12 Re1 c5 13 e4 Nf4 14 d5 exd5 15 exd5 Qd6 16 Bc4 Nf6', { a: '∓', r: 'Shirov–Beliavsky, Linares 1993', c: '10...Nxd5 11.Bxe7 Qxe7 12.Re1 c5 também não é ruim. Agora 13.Nxd5 iguala, mas 13.e4 Nf4 14.d5 exd5 15.exd5 Qd6 16.Bc4 Nf6 foi um pouco melhor para as pretas.' }],
  ['c45', 'k', 'k', '(k)', '10... c5 11 Bg3 cxd4 12 exd4 dxc4 13 Bxc4 Nh5 14 d5 Nxg3 15 hxg3 exd5 16 Bxd5 Rb8 17 Rad1 Bf6 18 Qe4', { a: '⩲', r: 'Romanishin–Neverov, Kharkov 2004', c: '10...c5 11.Bg3 cxd4 12.exd4 dxc4 13.Bxc4 Nh5 14.d5 é um pouco melhor para as brancas.' }],
  ['c45', 'l', 'l', '(l)', '13 Rac1 Rc8 14 Ba6 Nxg3 15 hxg3 Qc7 16 Bxb7 Qxb7 17 Rfd1', { a: '⩲', r: 'Timoschenko–Marić, Londres 1996', c: '13.Rac1 é uma alternativa: 13...Rc8 14.Ba6 Nxg3 15.hxg3 Qc7 16.Bxb7 Qxb7 17.Rfd1 é um pouco melhor para as brancas.' }],
  ['c45', 'm', 'm', '(m)', '13... Qc8 14 Rc1 Rd8 15 Rfd1 Ndf6 16 Ne5 Qe6 17 Bh4 Rac8 18 f3 Nxc3', { a: '=', r: 'Bacrot–Ivanchuk, Odessa 2007', c: '13...Qc8 14.Rc1 Rd8 15.Rfd1 Ndf6 16.Ne5 Qe6 foi igual.' }],
  ['c45', 'n', 'n', '(n)', '15 Bb1 Re8 16 Rd2 a6', { a: '=', r: 'Vyzmanavin–Pigusov, Moscou 1988', c: '15.Bb1 Re8 16.Rd2 a6 é igual.' }],
  // Coluna 46
  ['c46', 'o', 'o', '(o)', '8... c5 9 dxc5 bxc5 10 cxd5 Nxd5 11 Bg3 Nd7 12 O-O Nxc3 13 bxc3', { a: '⩲', r: 'Smyslov–Szabó, Mar del Plata 1962', c: '8...c5 9.dxc5 bxc5 10.cxd5 Nxd5 11.Bg3 Nd7 12.O-O Nxc3 13.bxc3 é um pouco melhor para as brancas.' }],
  ['c46-o', '1', 'o', '(o) 10...exd5', '10... exd5 11 Bxf6 Bxf6 12 Nxd5 Bxb2 13 Rb1 Bf6 14 Be4', { a: '+−', c: 'Se 10...exd5?, 11.Bxf6 Bxf6 12.Nxd5 Bxb2 13.Rb1 Bf6 14.Be4 ganha. (O Stockfish é mais cauteloso: dá cerca de +2, grande vantagem branca.)' }],
  ['c46', 'p', 'p', '(p)', '9... Ba6 10 Bxa6 Nxa6 11 Qa4 Nb4 12 Bxf6', { a: '±', r: 'Kholmov–Saigin, URSS 1953', c: 'Não 9...Ba6? 10.Bxa6 Nxa6 11.Qa4 Nb4 12.Bxf6, melhor para as brancas.' }],
  ['c46', 'q', 'q', '(q)', '10... Ne4 11 Nxe4 Bxe4 12 Bg3 Nd7 13 Qe2 Bd6 14 Rfd1 Qe7 15 Bb5 Rad8 16 Rac1 Bxg3 17 hxg3 c5 18 Nd2 Bd5 19 e4 Ba8 20 Bxd7 Qxd7 21 dxc5 bxc5 22 Nb3 Qa4 23 Rxd8', { a: '⩲', r: 'Carlsen–Hráček, Bundesliga 2006', c: '10...Ne4 11.Nxe4 Bxe4 12.Bg3 Nd7 13.Qe2 Bd6 é um pouco melhor para as brancas.' }],
  ['c46', 'r', 'r', '(r)', '11... c5 12 Rfd1 Ne4 13 Nxe4 Bxe4 14 Bg3 Qc8 15 Rac1 a5 16 Bb5', { a: '⩲', r: 'Ivanchuk–Beliavsky, Odessa 2006', c: '11...c5 12.Rfd1 Ne4 13.Nxe4 Bxe4 14.Bg3 é um pouco melhor para as brancas.' }],
  ['c46', 's', 's', '(s)', '15 Nxe4 Bxe4', { a: '⩲', r: 'Gheorghiu–Pfleger, Lucerna 1985', c: 'Depois de 15.Nxe4 Bxe4 as brancas ficam um pouco melhor.' }],
  // Coluna 47
  ['c47', 't', 't', '(t)', '8... dxc4 9 Bxc4 Bb7 10 Ne5 Nfd7 11 Nxf7 Kxf7 12 Bxe6+ Ke8 13 Qc2 Bxh4 14 Qg6+ Ke7 15 Bd5 Rxf2', { a: '∞', r: 'Shirov', c: '8...dxc4 9.Bxc4 Bb7 10.Ne5 Nfd7 11.Nxf7 leva a complicações: 11...Kxf7 12.Bxe6+ Ke8 13.Qc2 Bxh4 14.Qg6+ Ke7 15.Bd5 Rxf2 seria indefinido (Shirov). (O livro traz 8...bxc4, impossível; ficou 8...dxc4.)' }],
  ['c47-t', '1', 't', '(t) 10...Nbd7', '10... Nbd7', { r: 'Shirov', c: '10...Nbd7 é a sugestão de Shirov.' }],
  ['c47-t', '2', 't', '(t) 11...Rxf7', '11... Rxf7 12 Bxe6 Bxh4 13 Bxf7+ Kh8 14 Bd5', { a: '+−', r: 'Shirov–Beliavsky', c: 'Contra Shirov, Beliavsky errou com 11...Rxf7?, e depois de 12.Bxe6 Bxh4 13.Bxf7+ Kh8 14.Bd5 estava perdido. (O Stockfish é mais cauteloso: dá cerca de +1, vantagem clara das brancas.)' }],
  ['c47', 'u', 'u', '(u)', '9 O-O-O Nbd7 10 Rg1 c5 11 g4 Ne4 12 Bxe7 Qxe7', { a: '=', r: 'Spassky–Drimer, Reykjavík 1957', c: '9.O-O-O Nbd7 10.Rg1 c5 11.g4 Ne4 12.Bxe7 Qxe7 é igual.' }],
  ['c47', 'v', 'v', '(v)', '11... c6 12 Bd3 Re8 13 O-O Nd7 14 a3 Nf8 15 Rd2 g6 16 Rc1 Rb8 17 Qd1 Bg7 18 b4', { a: '⩲', r: 'I. Sokolov–Bologan, Edda (rápidas) 2003', c: '11...c6 12.Bd3 Re8 13.O-O Nd7 14.a3 é um pouco melhor para as brancas.' }],
  ['c47', 'w', 'w', '(w)', '15 O-O Nc5 16 Qc2 Bb7 17 Bb5 Re7 18 Nxd5 Bxd5 19 Qf5', { a: '⩲', r: 'Lautier–Beliavsky, Dortmund 1995', c: 'Lautier–Beliavsky seguiu 15.O-O Nc5 16.Qc2 Bb7 17.Bb5 Re7 18.Nxd5 Bxd5 19.Qf5, com pequena vantagem branca.' }],
  // Coluna 48
  ['c48', 'x-A', 'x', '(x) A', '8 Qc2 Bb7 9 Bxf6 Bxf6 10 cxd5 exd5 11 O-O-O c5 12 g4 Nc6 13 h4 cxd4 14 exd4 Qd6 15 Qd2', { a: '∞', r: 'Piket–Unzicker, Zurique 2001', c: '8.Qc2 Bb7 9.Bxf6 Bxf6 10.cxd5 exd5 11.O-O-O c5 12.g4!? leva a um jogo agudo. (O livro traz 14 cxd4, mas as brancas não têm mais o peão c; ficou 14.exd4.)' }],
  ['c48', 'x-B', 'x', '(x) B', '8 Rc1 Bb7 9 Be2 dxc4 10 Bxc4 Nbd7 11 O-O c5 12 Qe2 a6 13 a4 cxd4', { a: '=', r: 'Yusupov–Karpov, Bugojno 1986', c: '8.Rc1 Bb7 9.Be2 dxc4 10.Bxc4 Nbd7 11.O-O c5 é igual.' }],
  ['c48', 'y', 'y', '(y)', '11 Be2 Be6 12 O-O c5 13 b3 Rc8 14 Rc1 a5', { a: '=', r: 'Najdorf–Gheorghiu, Lugano 1968', c: '11.Be2 Be6 12.O-O c5 13.b3 Rc8 14.Rc1 a5 é igual.' }],
  ['c48', 'z', 'z', '(z)', '12 Be2 c5 13 b3 Nd7 14 O-O a5 15 Bb5 Nf6 16 Ne5 Rfc8 17 Qe2 cxd4 18 exd4 Qa3', { a: '=', r: 'Ulmann–Atalik, Dresden 2005', c: '12.Be2 c5 13.b3 Nd7 14.O-O a5 é igual.' }],
  ['c48', 'aa', 'aa', '(aa)', '13 dxc5 bxc5 14 Qa3 Rc8 15 Bb5 Qb7 16 Rxc5 Rxc5 17 Qxc5 Na6 18 Bxa6 Qxa6 19 Qa3 Qxa3', { a: '=', r: 'Aagaard–Pedersen, Aalborg 2006', c: '13.dxc5 bxc5 14.Qa3 Rc8 15.Bb5 Qb7 16.Rxc5 Rxc5 17.Qxc5 Na6 leva a um final igual.' }],
  ['c48', 'bb', 'bb', '(bb)', '14 Bb5 Qb7 15 dxc5 bxc5 16 Rxc5 Rxc5 17 Qxc5 Na6', { a: '∞', r: 'Timman–Geller, Hilversum 1973', c: '14.Bb5 Qb7 15.dxc5 bxc5 16.Rxc5 Rxc5 17.Qxc5 Na6 dá às pretas jogo amplo pelo peão.' }],
  ['c48', 'cc', 'cc', '(cc)', '15 dxc5 bxc5 16 O-O a5 17 Rc3 Nd7 18 Rb3 a4', { a: '=', r: 'Winants–Kasparov, Bruxelas 1987; Kasparov', c: 'Winants–Kasparov seguiu 15.dxc5 bxc5 16.O-O a5 17.Rc3 Nd7 18.Rb3, e agora 18...a4 é igual (Kasparov). (O livro traz 17.Rc7, impossível com o peão preto em c5; a torre vai a c3 e depois a b3.)' }],
]

const capitulo = {
  id: 'gdr-h',
  arquivo: 'gdr-h',
  nome: 'Gambito da Dama Recusado — Variante Tartakower (7...b6)',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Declined (pp. 412–414), colunas 43–48',
  base: '1. d4 d5 2. c4 e6',
  corPadrao: 'b',
  ordem: 412,
  grupos: [
    { id: 'be2', nome: '8.Be2', colunas: [43, 44] },
    { id: 'bd3', nome: '8.Bd3', colunas: [45, 46] },
    { id: 'qb3', nome: '8.Qb3', colunas: [47] },
    { id: 'cxd5', nome: '8.cxd5', colunas: [48] },
  ],
}

module.exports = { capitulo, colunas, notas }
