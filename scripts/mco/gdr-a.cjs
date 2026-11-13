// Transcrição do MCO 15ª ed. — Gambito da Dama Recusado, Variante Ortodoxa (pp. 393–395), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs gdr-a
// Formato: ver gambito-do-rei.cjs. Dicas em gdr-a-dicas.cjs.
//
// As colunas 1–6 seguem a manobra libertadora de Capablanca (9...Nd5, 10...Qxe7, 11...Nxc3 e 12...e5).
// As notas (c) e (w) não trazem lances; o comentário delas entrou no resumo das colunas 1 e 5.
// Correções: na nota (o) o livro pula do 19º para o 21º lance (21.Qc1); ficou 20.Qc1.
// Na nota (x) o livro traz 14...Qf6, mas as linhas seguintes (15...Bg4, 15...Nd5, 18...Qxe6) só funcionam com 14...Nf6.
// Na nota (a) o livro traz 18.Qe3, impossível (a torre de c3 está no caminho); ficou 18.Re3, que crava o bispo.

const B = '1 d4 d5 2 c4 e6 3 Nc3 Nf6 4 Bg5 Be7 5 e3 O-O 6 Nf3 Nbd7 7 Rc1 c6 8 Bd3 dxc4 9 Bxc4 Nd5 10 Bxe7 Qxe7 11 O-O Nxc3 12 Rxc3 e5'

const colunas = {
  c01: [`${B} 13 dxe5 Nxe5 14 Nxe5 Qxe5 15 f4 Qe4 16 Qe2 Bf5 17 Bd3 Qe6 18 e4 Rfe8 19 Re1 Qd6`, 'dxe5', '13.dxe5 Nxe5 15.f4 Qe4 16.Qe2', '⩲',
    'Na manobra libertadora de Capablanca as pretas trocam duas peças menores e golpeiam o centro com 12...e5. Com 13.dxe5 e 15.f4 as brancas expulsam a dama do centro; depois de 18.e4 a maioria móvel de peões na ala do rei dá a elas pequena vantagem (Garcia Gonzales–Toth, Salônica 1984).'],
  c02: [`${B} 13 dxe5 Nxe5 14 Nxe5 Qxe5 15 f4 Qe4 16 Qe1 Bf5 17 Bd3 Qd5 18 e4 Qd4+ 19 Qf2 Qxf2+`, 'dxe5', '16.Qe1', '⩲',
    'Com 16.Qe1 as brancas oferecem a troca das damas em f2. As pretas aceitam, e no final o rei branco bem centralizado e o melhor desenvolvimento dão vantagem às brancas.'],
  c03: [`${B} 13 dxe5 Nxe5 14 Nxe5 Qxe5 15 f4 Qf6 16 f5 b5 17 Bb3 b4 18 Rc5 Ba6 19 Rf4 Rad8`, 'dxe5', '15...Qf6 16.f5', '±',
    'Com 15...Qf6 a dama preta vigia a ala do rei. As brancas avançam 16.f5 e as pretas contra-atacam com 16...b5; depois de 18.Rc5 Ba6 as pretas ficam com a coluna d, mas isso não compensa o peão perdido e as fraquezas.'],
  c04: [`${B} 13 Bb3 exd4 14 exd4 Nf6 15 Re1 Qd6 16 Rce3 Bg4 17 h3 Bxf3 18 Rxf3`, 'bb3', '13.Bb3 exd4', '=',
    'Com 13.Bb3 as brancas mantêm o bispo na diagonal a2–g8 e aceitam o peão isolado em d4 depois de 13...exd4 14.exd4. As torres vão para a coluna e, mas a troca do bispo em f3 deixa o jogo igual.'],
  c05: [`${B} 13 Qc2 exd4 14 exd4 Nb6 15 Re1 Qd8 16 Bb3 Nd5 17 Bxd5 Qxd5 18 Re5 Qd6 19 Qe4 f6`, 'qc2', '13.Qc2 exd4', '=',
    'Com 13.Qc2 a dama mira h7. Depois de 13...exd4 14.exd4 Nb6 o cavalo preto vai a d5, bloqueando o peão isolado; com 19...f6 as pretas igualam (Eliskases–Trifunović, Helsinque 1952).'],
  c06: [`${B} 13 Qb1 exd4 14 exd4 Nb6 15 Bb3 Qf6 16 Re1 Be6 17 Bxe6 fxe6 18 Rce3 Rae8`, 'qb1', '13.Qb1 exd4', '=',
    'Com 13.Qb1 a dama sai da coluna c e prepara b4. Depois de 13...exd4 14.exd4 Nb6 as pretas trocam os bispos de casas brancas em e6; o peão dobrado não as prejudica e o jogo fica igual.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '15 Qb3 Qe7 16 Rd1 Bf5 17 e4 Bg6 18 f3 Rfd8', { a: '=', r: 'Grünfeld–Bogoljubow, Carlsbad 1929', c: '15.Qb3 Qe7 16.Rd1 Bf5 17.e4 Bg6 leva à igualdade.' }],
  ['c01-a', '1', 'a', '(a) 17...Bxe4', '17... Bxe4 18 Re3', { a: '±', c: 'Se 17...Bxe4, 18.Re3 é bom para as brancas: a torre crava o bispo. (O livro traz 18.Qe3, mas a torre de c3 está no caminho. O Stockfish mostra que 18.Re3 ganha o bispo cravado.)' }],
  ['c01', 'b', 'b', '(b)', '16 Bd3 Qxe3+ 17 Kh1 Qe7 18 f5 Qf6', { a: '∓', r: 'Chekover–Huber, por correspondência 1932', c: 'Com o imediato 16.Bd3 as pretas jogam 16...Qxe3+, e as brancas não têm compensação suficiente pelo peão.' }],
  // Coluna 2
  ['c02', 'd', 'd', '(d)', '16 Bb3 Be6 17 Bc2 Qb4 18 f5 Qxb2 19 Qe1 Bd7 20 f6', { a: '±', r: 'Pafnutieff–R. Gross, Califórnia 1953', c: '16.Bb3 Be6? 17.Bc2 Qb4 18.f5 favorece as brancas. Melhor é 16...Bf5. (O Stockfish vai além: depois de 20.f6 as brancas estão ganhando.)' }],
  ['c02-d', '1', 'd', '(d) 17...Qd5', '17... Qd5 18 f5 Qxd1 19 Rxd1 Bc8 20 e4', { a: '±', c: 'Se 17...Qd5 18.f5 Qxd1 19.Rxd1, as brancas ficam muito melhor no final.' }],
  ['c02', 'e', 'e', '(e)', '17... Qe6 18 e4 Rfe8 19 Qf2 Bxe4 20 Re1 Rad8 21 f5 Qd5 22 Qe3', { a: '±', r: 'Fyllingen–Johannessen, Langesund 2001', c: '17...Qe6 18.e4 Rfe8 19.Qf2 favorece as brancas.' }],
  ['c02', 'f', 'f', '(f)', '20 Kxf2', { a: '⩲', r: 'Hertneck–Sonntag, Alemanha Ocidental 1985', c: 'Depois de 20.Kxf2 as brancas ficam melhor no final, com o rei bem centralizado e melhor desenvolvimento.' }],
  // Coluna 3
  ['c03', 'g-A', 'g', '(g) A', '15... Qe7 16 f5 b5 17 Bb3 b4 18 f6 gxf6 19 Rxc6 Qxe3+ 20 Kh1', { a: '±', r: 'Euwe–Thomas, Hastings 1934', c: '15...Qe7 16.f5 b5 17.Bb3 b4 18.f6! dá às brancas fortes chances de ataque.' }],
  ['c03', 'g-B', 'g', '(g) B', '15... Qa5 16 f5 Bxf5 17 Qh5 g6 18 Qg5 Kg7 19 e4 f6 20 Qf4 Bd7 21 Qd6', { a: '±', r: 'Taimanov', c: '15...Qa5 16.f5 Bxf5 17.Qh5 dá às brancas forte iniciativa.' }],
  ['c03', 'h', 'h', '(h)', '16 e4 Be6 17 e5 Qe7 18 Bd3 f5 19 Qa4 a6', { a: '=', r: 'Capablanca–Lasker, Moscou 1935', c: '16.e4 Be6 17.e5 leva à igualdade: o peão passado protegido das brancas é compensado pela maioria móvel das pretas na ala da dama.' }],
  ['c03', 'i', 'i', '(i)', '16... a5 17 a4 Rb8 18 Qc2 Bd7 19 Rd3 Rbd8 20 Qd2 b5 21 Bxb5', { a: '±', c: '16...a5 17.a4 Rb8 18.Qc2 Bd7 19.Rd3 Rbd8 20.Qd2 b5 21.Bxb5 seria melhor para as brancas.' }],
  ['c03-i', '1', 'i', '(i) 21.axb5', '21 axb5', { a: '=', r: 'Ståhlberg–Trifunović, Amsterdã 1950', c: '21.axb5 não levou a nada.' }],
  ['c03', 'j', 'j', '(j)', '17 Bd3 b4 18 Rc5 Re8', { a: '∞', r: 'Ståhlberg–Eliskases, Estocolmo 1952', c: '17.Bd3 b4 18.Rc5 Re8 leva a um jogo indefinido.' }],
  ['c03', 'k', 'k', '(k)', '19... Rab8 20 Qd4 Qxd4 21 Rxd4 Rb6 22 Rd7 Rb7 23 Rxb7 Bxb7 24 Re5', { a: '±', r: 'Wiedenkeller–Hammes, Alemanha 2001', c: '19...Rab8 20.Qd4 Qxd4 21.Rxd4 leva a um final melhor para as brancas. Depois de 19...Rad8 (Bronstein–Gereben, Moscou 1949) a coluna d não compensou o peão perdido.' }],
  // Coluna 4
  ['c04', 'l', 'l', '(l)', '13 h3 e4 14 Nd2 Nf6 15 Qc2 Bf5', { a: '⩲', r: 'Vaganian–Radulov, Dubai 1986', c: '13.h3 é um lance relativamente novo; 13...e4 14.Nd2 Nf6 15.Qc2 Bf5 foi a melhor tentativa de igualar.' }],
  ['c04-l', '1', 'l', '(l) 13...exd4', '13... exd4 14 exd4', { a: '⩲', r: 'Vaganian', c: '13...exd4 14.exd4 dá pequena vantagem às brancas, segundo Vaganian.' }],
  ['c04', 'm', 'm', '(m)', '14... Nb6 15 Re1 Qf6 16 Qe2 Bf5 17 Qe7', { a: '⩲', r: 'Ståhlberg–Sundberg, Örebro 1937', c: '14...Nb6 15.Re1 Qf6 16.Qe2 Bf5 17.Qe7 dá pequena vantagem às brancas.' }],
  ['c04', 'n', 'n', '(n)', '16 Ne5 Be6 17 Bxe6 fxe6 18 Qb3 Nd5 19 Rg3 Qe7 20 Nd3 Rae8 21 Rg4', { a: '±', r: 'Kacheishvili–A. Petrosian, Batumi 2003', c: '16.Ne5!? Be6 17.Bxe6 fxe6 18.Qb3 Nd5 19.Rg3 favorece as brancas.' }],
  ['c04-n', '1', 'n', '(n) 19...b6', '19... b6 20 Re4 Rac8 21 Rxg7+', { a: '+−', c: '19...b6? 20.Re4 Rac8 21.Rxg7+! ganha.' }],
  ['c04', 'o', 'o', '(o)', '17... Bh5 18 g4 Bg6 19 Re5 Rad8 20 Qc1', { a: '⩲', c: '17...Bh5 18.g4 Bg6 19.Re5 Rad8 20.Qc1 é um pouco melhor para as brancas. (O livro traz 21.Qc1.)' }],
  // Coluna 5
  ['c05', 'p', 'p', '(p)', '13... e4 14 Nd2 Nf6 15 f3 exf3 16 Rxf3 Bg4 17 Rg3 Bh5 18 Bd3 Bg6', { a: '=', r: 'Abramović–Zheliandinov, Pula 2000', c: '13...e4 14.Nd2 Nf6 15.f3 exf3 16.Rxf3 leva a uma posição mais ou menos igual.' }],
  ['c05', 'q', 'q', '(q)', '14... Nf6 15 Re1 Qd8 16 h3 Nd5 17 Bxd5 Qxd5 18 Re5 Qd6 19 Ng5 g6 20 Rf3 f6 21 Qb3+ Kg7 22 Re8 a5 23 Rxc8', { a: '+−', r: 'Lputian–Balashov, Erevan 1986', c: '14...Nf6 é arriscado demais: depois de 15.Re1 Qd8 16.h3 Nd5 17.Bxd5 as brancas atacam, e as pretas abandonaram depois de 23.Rxc8.' }],
  ['c05', 'r', 'r', '(r)', '15 Bb3 Be6 16 Qe4 Nd5 17 Bxd5', { a: '⩲', r: 'Gagunashvili–Malyshev, Abu Dhabi 2003', c: 'As brancas podem tentar 15.Bb3 Be6 16.Qe4 Nd5 17.Bxd5, com pequena vantagem.' }],
  ['c05', 's-A', 's', '(s) A', '15... Qd6 16 Ng5', { c: '15...Qd6 16.Ng5 é arriscado para as pretas.' }],
  ['c05', 's-B', 's', '(s) B', '15... Qf6 16 Bb3 Bf5 17 Qd2 Rad8 18 Ne5 Be6 19 Rf3', { a: '⩲', r: 'Zakharevich–Zamruk, Rússia 2001', c: '15...Qf6 16.Bb3 Bf5 17.Qd2 dá pequena vantagem às brancas.' }],
  ['c05', 't', 't', '(t)', '17 Rc5 Be6', { a: '∓', r: 'S. Vuković–Trifunović, Iugoslávia 1948', c: '17.Rc5 Be6 deixa as pretas um pouco melhor.' }],
  ['c05', 'u', 'u', '(u)', '18 Rc5 Qd6 19 Rce5 h6 20 d5 Bd7 21 Qb3 b6 22 h3 Rae8', { a: '=', r: 'Ståhlberg–Gligorić, Suécia–Iugoslávia 1948', c: '18.Rc5 Qd6 19.Rce5 h6 20.d5 leva à igualdade.' }],
  ['c05-u', '1', 'u', '(u) 18...Qd8', '18... Qd8 19 Ng5 g6 20 Qe4 h6', { a: '=', r: 'Garcia Gonzalez–Ree, Wijk aan Zee 1979', c: '18...Qd8 19.Ng5 g6 20.Qe4 h6 também é mais ou menos igual.' }],
  ['c05-u', '2', 'u', '(u) 20...cxd5', '20... cxd5 21 Qb3 d4 22 Rd5 Qb6', { a: '=', r: 'Neishtadt', c: 'Também é possível 20...cxd5 21.Qb3 d4 22.Rd5 Qb6, com igualdade.' }],
  ['c05', 'v', 'v', '(v)', '19 Rce3 h6 20 Qc3 Be6 21 h3 Rad8', { a: '=', r: 'Pirc–Gligorić, Iugoslávia 1951', c: '19.Rce3 h6 20.Qc3 Be6 leva à igualdade.' }],
  ['c05-v', '1', 'v', '(v) 20.Re7', '20 Re7 Rb8 21 Re8 Be6', { a: '=', r: 'Cobo–Hooper, Helsinque 1952', c: '20.Re7 Rb8 21.Re8 Be6 também é igual.' }],
  // Coluna 6
  ['c06', 'x', 'x', '(x)', '13... e4 14 Nd2 Nf6 15 b4 Bg4 16 Rfc1', { a: '⩲', r: 'Najdorf–Pilnik, Buenos Aires 1947', c: '13...e4 14.Nd2 Nf6 15.b4 Bg4 16.Rfc1 dá pequena vantagem às brancas. (O livro traz 14...Qf6, mas as linhas da nota só funcionam com 14...Nf6.)' }],
  ['c06-x', '1', 'x', '(x) 15.Bb3', '15 Bb3 Bg4 16 Re1 Kh8 17 h3 Be6 18 Bxe6 Qxe6 19 Rec1 Rae8 20 Ra3 a6', { a: '=', r: 'Capablanca–Ståhlberg, Buenos Aires 1939', c: '15.Bb3 Bg4 16.Re1 Kh8 levou à igualdade.' }],
  ['c06-x', '2', 'x', '(x) 15...Nd5', '15... Nd5 16 Bxd5 cxd5 17 Qb3 Be6 18 Rfc1', { a: '±', r: 'Najdorf–Guimard, Mar del Plata 1946', c: '15...Nd5 16.Bxd5 cxd5 17.Qb3 Be6 18.Rfc1 foi bem melhor para as brancas.' }],
  ['c06', 'y', 'y', '(y)', '14... Nf6 15 Re1 Qd6 16 h3 Bd7 17 Rce3 Rae8 18 Re5', { a: '⩲', r: 'Pérez–Kristiansen, Havana 1966', c: '14...Nf6 15.Re1 Qd6 16.h3 Bd7 17.Rce3 dá pequena vantagem às brancas.' }],
  ['c06-y', '1', 'y', '(y) 16.Rce3', '16 Rce3 Bg4 17 Ne5 Qxd4 18 Qc1', { a: '∞', c: '16.Rce3 Bg4 17.Ne5 Qxd4 18.Qc1 deixa o jogo indefinido.' }],
  ['c06', 'z', 'z', '(z)', '15 Re3 Qd8 16 Bb3 Nd5 17 Re5 f6 18 Bxd5+', { a: '⩲', r: 'Ricardi–Acebal, Barcelona 2000', c: '15.Re3 Qd8 16.Bb3 Nd5 17.Re5 f6 18.Bxd5+ dá pequena vantagem às brancas.' }],
  ['c06', 'aa', 'aa', '(aa)', '15... Bd7 16 Re1 Qd6 17 Ng5 g6 18 Rf3 Bf5 19 Nxf7 Qxd4 20 Nh6+ Kh8 21 Nxf5', { a: '±', r: 'Najdorf–Bolbochan, Mar del Plata 1947', c: '15...Bd7 16.Re1 Qd6 17.Ng5 g6 18.Rf3 deixa as brancas com grande vantagem. (O Stockfish mostra que, depois de 21.Nxf5, as brancas estão ganhando.)' }],
  ['c06-aa', '1', 'aa', '(aa) 19...Rxf7', '19... Rxf7 20 Bxf7+ Kxf7 21 g4', { a: '±', c: '19...Rxf7 20.Bxf7+ Kxf7 21.g4 também favorece as brancas. (Segundo o Stockfish, as brancas estão ganhando.)' }],
  ['c06', 'bb', 'bb', '(bb)', '16 Re3 Bg4 17 Qe4 Bxf3 18 Rxf3 Rae8 19 Qd3 Qd6', { a: '=', r: 'Ståhlberg–Gligorić, Belgrado 1949', c: '16.Re3 Bg4 17.Qe4 Bxf3 18.Rxf3 Rae8 foi completamente igual.' }],
  ['c06', 'cc-A', 'cc', '(cc) A', '16... Bg4 17 Qe4', { a: '±', c: '16...Bg4 17.Qe4 é ruim para as pretas.' }],
  ['c06', 'cc-B', 'cc', '(cc) B', '16... Bf5 17 Qc1 Rad8 18 Re5 Nd7 19 Ree3 Rfe8 20 Qe1', { a: '⩲', r: 'Ekström–Karlsson, Estocolmo 1987', c: '16...Bf5 17.Qc1 Rad8 18.Re5 Nd7 deixa as brancas com uma pequena iniciativa.' }],
]

const capitulo = {
  id: 'gdr-a',
  arquivo: 'gdr-a',
  nome: 'Gambito da Dama Recusado — Ortodoxa (manobra de Capablanca)',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Declined (pp. 393–395), colunas 1–6',
  base: '1. d4 d5 2. c4 e6',
  corPadrao: 'b',
  ordem: 393,
  grupos: [
    { id: 'dxe5', nome: '13.dxe5', colunas: [1, 2, 3] },
    { id: 'bb3', nome: '13.Bb3', colunas: [4] },
    { id: 'qc2', nome: '13.Qc2', colunas: [5] },
    { id: 'qb1', nome: '13.Qb1', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
