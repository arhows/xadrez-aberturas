// Transcrição do MCO 15ª ed. — Defesa Francesa, Winawer sem 6...Ne7: 6...Qc7, 5...Ba5, quinto lance
// alternativo, 4...b6/4...Qd7 e alternativas no quarto lance (pp. 223–229), colunas 43–60.
// Gerar: node scripts/mco/gerar.cjs francesa-f
// Formato: ver gambito-do-rei.cjs. Dicas em francesa-f-dicas.cjs.

const B = '1 e4 e6 2 d4 d5 3 Nc3 Bb4'
const E4 = `${B} 4 e5`
const A3 = `${E4} c5 5 a3`
const QC = `${A3} Bxc3+ 6 bxc3 Qc7`
const BA = `${A3} Ba5 6 b4 cxd4`
const B6 = `${E4} b6`
const A4 = `${B} 4 a3 Bxc3+ 5 bxc3 dxe4 6 Qg4 Nf6 7 Qxg7 Rg8 8 Qh6`

const colunas = {
  c43: [`${QC} 7 Qg4 f5 8 Qg3 Ne7 9 Qxg7 Rg8 10 Qxh7 cxd4 11 Kd1 Bd7 12 Qh5+ Kd8 13 Nf3 Qxc3 14 Ra2 Nbc6`, 'qc7', '6...Qc7 7.Qg4 f5 8.Qg3', '⩲',
    'Esta é a Winawer clássica, com 6...Qc7, menos usada hoje. Com 7.Qg4 f5 8.Qg3 as brancas pegam os peões do flanco do rei; o rei branco vai para d1 e as brancas ficam um pouco melhor.'],
  c44: [`${QC} 7 Qg4 f5 8 Qh5+ Qf7 9 Qd1 b6 10 Nh3 cxd4 11 cxd4 Ba6 12 Bxa6 Nxa6 13 Qd3 Nc7 14 a4 Ne7`, 'qc7', '6...Qc7 7.Qg4 f5 8.Qh5+', '=',
    'Com 8.Qh5+ Qf7 as damas ficam; as pretas trocam o bispo ruim por ...Ba6 e igualam.'],
  c45: [`${QC} 7 Nf3 Bd7 8 a4 Nc6 9 Ba3 b6 10 Bd3 Na5 11 O-O Ne7 12 Re1 f5 13 exf6 gxf6 14 Qc1 c4`, 'qc7', '6...Qc7 7.Nf3', '±',
    'Com 7.Nf3 as brancas desenvolvem e usam o bispo de a3. Depois de 12...f5 13.exf6 gxf6 o rei preto fica exposto e as brancas têm grande vantagem.'],
  c46: [`${BA} 7 Qg4 Ne7 8 bxa5 dxc3 9 Qxg7 Rg8 10 Qxh7 Nbc6 11 Nf3 Qc7 12 Bf4 Bd7 13 a6 O-O-O 14 axb7+ Kb8`, 'ba5', '5...Ba5 6.b4 cxd4 7.Qg4', '±',
    'Com 5...Ba5 as pretas mantêm o bispo; 6.b4 cxd4 7.Qg4 leva a posições do Peão Envenenado em que as brancas ganham o bispo de a5 e ficam melhor.'],
  c47: [`${BA} 7 Nb5 Bc7 8 f4 Bd7 9 Nf3 Ne7 10 Nxc7+ Qxc7 11 Bd3 a6 12 Bb2 Nf5 13 Bxf5 exf5 14 Bxd4 O-O`, 'ba5', '5...Ba5 6.b4 cxd4 7.Nb5', '=',
    'Com 7.Nb5 o cavalo ataca o bispo e d4; as pretas trocam o bispo pelo cavalo e igualam.'],
  c48: [`${A3} Ba5 6 Bd2 Nc6 7 Nb5 Nxd4 8 Nxd4 cxd4 9 Bb5+ Bd7 10 Bxd7+ Kxd7 11 Nf3 Bb6 12 O-O Ne7 13 a4 a6 14 Ng5 Qe8`, 'ba5', '5...Ba5 6.Bd2', '=',
    'Com 6.Bd2 Nc6! as pretas trocam peças e igualam. 14.Ng5?! não é bom: depois de 14...Qe8 as pretas ficam com a vantagem no final.'],
  c49: [`${E4} c5 5 Bd2 Ne7 6 a3 Bxc3 7 Bxc3 Nbc6 8 Nf3 cxd4 9 Nxd4 Nxe5 10 Nxe6 Bxe6 11 Bxe5 Nc6 12 Bg3 Qf6`, 'quinto', '4...c5 5.Bd2', '=',
    'Com 5.Bd2 as brancas evitam os peões dobrados: depois de 5...Ne7 6.a3 Bxc3 retomam com o bispo. A coluna é Hector–Berg, Campeonato Sueco 2006: igual.'],
  c50: [`${E4} c5 5 Qg4 Ne7 6 Nf3 Nbc6 7 Bb5 Bxc3+ 8 bxc3 Qa5 9 Bxc6+ bxc6 10 Bd2 Qa4 11 O-O Nf5 12 Rfc1 O-O`, 'quinto', '4...c5 5.Qg4', '=',
    'Com 5.Qg4 a dama ataca g7 de imediato; as pretas defendem com ...Ne7 e ...Nf5 e igualam. A coluna é Hebden–Vaganian, Hastings 1982/83.'],
  c51: [`${B6} 5 a3 Bxc3+ 6 bxc3 Qd7 7 a4 Ba6 8 Bxa6 Nxa6 9 Qg4 f5 10 Qh5+ g6 11 Qe2 Nb8 12 h4 h6`, 'b6', '4...b6 5.a3 Bxc3+', '⩲',
    'Com 4...b6 as pretas querem trocar o bispo ruim de casas claras por ...Ba6. Depois de 5.a3 Bxc3+ as brancas ficam com o par de bispos e um pouco melhor.'],
  c52: [`${B6} 5 a3 Bf8 6 Bb5+ c6 7 Ba4 Ba6 8 Nce2 Bb5 9 Bb3 c5 10 c3 Nc6 11 Nf3 Nge7 12 O-O Nf5`, 'b6', '4...b6 5.a3 Bf8', '⩲',
    'Com 5...Bf8 as pretas recuam o bispo; 6.Bb5+ procura evitar a troca dos bispos de casas claras, e as brancas ficam um pouco melhor.'],
  c53: [`${B6} 5 Qg4 Bf8 6 Nh3 Ne7 7 Bg5 Nbc6 8 Bb5 Bd7 9 O-O-O h6 10 Be3 a6 11 Be2 Qc8 12 Nf4 Qb7`, 'b6', '4...b6 5.Qg4', '⩲',
    'Com 5.Qg4 Bf8 as brancas desenvolvem rápido e rocam grande, com pressão: um pouco melhor para as brancas.'],
  c54: [`${E4} Qd7 5 Bd2 b6 6 Bb5 c6 7 Ba4 a5 8 a3 Bxc3 9 Bxc3 Ba6 10 Bd2 Bb5 11 Bxb5 cxb5 12 Qg4 f5`, 'b6', '4...Qd7', '⩲',
    'Com 4...Qd7 as pretas preparam ...b6 e ...Ba6. Os bispos de casas claras são trocados, mas as brancas ficam um pouco melhor.'],
  c55: [`${B} 4 Ne2 dxe4 5 a3 Be7 6 Nxe4 Nc6 7 Bf4 Nf6 8 Qd3 O-O 9 O-O-O Nd5 10 h4 f5 11 Ng5 Rb8 12 Bd2 b5`, 'quarto', '4.Ne2 dxe4 5.a3 Be7', '=',
    'Com 4.Ne2 (o livro escreve 4.Nge2, mas o cavalo de c3 está cravado) as brancas evitam a cravada no cavalo; depois de 4...dxe4 5.a3 Be7 elas rocam grande e atacam, mas as pretas igualam com ...b5.'],
  c56: [`${B} 4 Ne2 dxe4 5 a3 Bxc3+ 6 Nxc3 Nc6 7 Bb5 Ne7 8 Bg5 f6 9 Be3 O-O 10 Qd2 f5 11 O-O-O a6 12 Bxc6 Nxc6`, 'quarto', '4.Ne2 dxe4 5.a3 Bxc3+', '=',
    'Com 5...Bxc3+ 6.Nxc3 as pretas ficam com um peão a mais, e as brancas têm compensação pelo desenvolvimento: igual.'],
  c57: [`${A4} Nbd7 9 Ne2 b6 10 Ng3 Bb7 11 Be2 Qe7 12 O-O O-O-O`, 'quarto', '4.a3 … 8...Nbd7', '=',
    'Com 4.a3 Bxc3+ 5.bxc3 dxe4 6.Qg4 as brancas sacrificam um peão para ficar com o par de bispos e atacar o flanco do rei: igual.'],
  c58: [`${A4} Rg6 9 Qd2 b6 10 Bb2 Bb7 11 O-O-O Qe7 12 c4 Nbd7`, 'quarto', '4.a3 … 8...Rg6', '=',
    'Com 8...Rg6 a torre expulsa a dama; as pretas fianquetam o bispo da dama e igualam.'],
  c59: [`${B} 4 Bd2 dxe4 5 Qg4 Nf6 6 Qxg7 Rg8 7 Qh6 Qxd4 8 O-O-O Bf8 9 Qh4 Rg4 10 Qh3 Qxf2 11 Be2 Rh4 12 Qxh4 Qxh4`, 'quarto', '4.Bd2', '=',
    'Com 4.Bd2 as brancas desfazem a cravada e sacrificam peões pelo ataque; as pretas devolvem a qualidade e igualam.'],
  c60: [`${B} 4 Qg4 Nf6 5 Qxg7 Rg8 6 Qh6 Rg6 7 Qe3 c5 8 Bd2 Ng4 9 Qd3 Nc6 10 Nge2 cxd4 11 Nxd4 Nxf2 12 Kxf2 Bc5`, 'quarto', '4.Qg4?!', '=',
    '4.Qg4?! ataca g7 cedo demais; as pretas ganham tempo atacando a dama e ficam com pelo menos a igualdade.'],
}

const notas = [
  // Coluna 43
  ['c43', 'a-A', 'a', '(a) A', '6... Nc6 7 Qg4 g6 8 a4 f5 9 Qd1 Qa5 10 Bd2 Nge7 11 Nf3', { a: '⩲', r: 'Gligorić–Maksimović, Campeonato Iugoslavo 1991', c: '6...Qc7 é a Winawer clássica, menos usada hoje. Alternativas raras no sexto lance: 6...Nc6, com vantagem leve das brancas.' }],
  ['c43', 'a-B', 'a', '(a) B', '6... Qa5 7 Bd2 cxd4 8 cxd4 Qa4 9 Rb1 Nc6 10 Nf3 Qxa3 11 Bb5 Bd7 12 O-O Qf8 13 Bxc6 Bxc6 14 Bb4', { a: '±', r: 'Sznapik–Matlak, Campeonato Polonês 1991', c: 'Com 6...Qa5 as brancas ficam melhor.' }],
  ['c43', 'b-A', 'b', '(b) A', '7... f6 8 Bb5+ Kf8 9 Nf3 c4 10 a4 a6 11 Ba3+ Ne7 12 Be8 Qd8 13 Bh5', { a: '±', r: 'Sutovsky–Dyachkov, Aeroflot Open 2007', c: '7...f6?! deixa as brancas melhor depois de 9.Nf3! e 12.Be8!.' }],
  ['c43-b-A', '1', 'b', '(b) 8...Nc6', '8... Nc6 9 Nf3', { a: '±', c: 'Ou 8...Nc6 9.Nf3, também melhor para as brancas.' }],
  ['c43', 'b-B', 'b', '(b) B', '7... cxd4 8 Qxg7 Qxc3+ 9 Kd1 Qxa1 10 Qxh8 Kf8 11 Bd3 Nc6 12 Bxh7 Ne7 13 h4', { a: '±', c: '7...cxd4? perde a torre de h8; as brancas ficam melhor.' }],
  ['c43', 'c', 'c', '(c)', '8... cxd4 9 cxd4 Ne7 10 Bd2 O-O 11 Bd3 b6 12 Ne2 Ba6 13 Nf4 Qd7 14 O-O Bxd3 15 Qxd3 Rc8 16 Rab1 Rc4 17 Rb4', { a: '⩲', r: 'Milligan–Tidman, 4NCL 2006', c: 'Com 8...cxd4 as brancas ficam um pouco melhor.' }],
  ['c43-c', '1', 'c', '(c) 9...Qxc2?!', '9... Qxc2 10 Bd2', { a: '±', c: '9...Qxc2?! 10.Bd2 e 11.Rc1 deixa as brancas melhor.' }],
  ['c43', 'd', 'd', '(d)', '12 Nf3 Ba4 13 Rb1 Qxc3 14 Ne1 b6 15 Bd2 Qc7 16 Bb4 Nbc6 17 Bd6 Qb7 18 Nd3 Qd7 19 Nb2 b5 20 Nxa4 bxa4 21 Bb5 Rf8 22 Qxe7+ Nxe7 23 Bxd7+ Kxd7 24 Rb7+', { a: '+-', r: 'Hjartarson–Berg, Gausdal 1996', c: 'As brancas também ficaram melhor com 12.Nf3, 14.Ne1! e 14...b6?!; a partida acabou rápido com 22.Qxe7+!, e as pretas abandonaram.' }],
  ['c43', 'e', 'e', '(e)', '12... Ng6 13 Ne2 d3 14 cxd3 Ba4+ 15 Ke1 Qxe5 16 Bg5 Nc6 17 d4 Qc7 18 h4', { a: '±', r: 'Tal–Botvinnik, Campeonato Mundial 1960 (1ª partida)', c: 'Com 12...Ng6 as brancas ficam melhor depois de 16.Bg5! e 18.h4!. Foi a primeira partida do histórico match Tal–Botvinnik.' }],
  ['c43-e', '1', 'e', '(e) 14...Nc6', '14... Nc6', { c: 'Tal recomendava 14...Nc6!.' }],
  ['c43', 'f', 'f', '(f)', '15 Rb2 Kc7 16 Rb5 a6 17 Bb2 axb5 18 Bxc3', { a: '⩲', r: 'Nakamura–Berg, Bermuda 2003', c: 'Depois de 15.Rb2 e 16.Rb5! as brancas ficam um pouco melhor.' }],
  // Coluna 44
  ['c44', 'g', 'g', '(g)', '8... g6 9 Qd1 Nc6 10 Nf3 Bd7 11 dxc5 h6 12 Rb1 Nge7', { a: '=', r: 'Spassky–Portisch, match 1980', c: 'Com 8...g6 também fica igual.' }],
  ['c44', 'h', 'h', '(h)', '9 Qxf7+ Kxf7 10 Nf3 cxd4 11 Nxd4 Bd7 12 f4 Ne7 13 Rb1 b6 14 c4 Rc8', { a: '=', r: 'Kindermann–Yusupov, Munique 1990', c: 'Com a troca das damas fica igual.' }],
  ['c44', 'i', 'i', '(i)', '10 a4 Ba6 11 Bb5+ Bxb5 12 axb5 Ne7 13 h4 O-O', { a: '=', r: 'Horvath–Uhlmann, Debrecen 1988', c: 'Com 10.a4 também fica igual.' }],
  ['c44', 'j', 'j', '(j)', '15 Ba3 Nc6 16 Nf4 Na5 17 h4 Nc4', { a: '=', r: 'David–Komarov, Liga Francesa 1997', c: 'Depois de 15.Ba3 fica igual.' }],
  // Coluna 45
  ['c45', 'k', 'k', '(k)', '7... b6 8 a4 Ba6 9 Bxa6 Nxa6 10 Qe2 Nb8 11 a5 bxa5 12 Ba3 Nd7 13 dxc5 Ne7 14 c6 Qxc6 15 O-O', { a: '⩲', r: 'Tal–Donner, Wijk aan Zee 1968', c: 'As pretas podem jogar ...Ne7 agora ou no lance seguinte, transpondo para a linha principal (6...Ne7). Arriscado é 7...b6.' }],
  ['c45', 'l', 'l', '(l)', '9... cxd4 10 cxd4 Qa5+ 11 Qd2 Qxd2+ 12 Kxd2', { a: '⩲', c: 'Com 9...cxd4 as brancas ficam com o melhor final.' }],
  ['c45', 'm', 'm', '(m)', '15 Qh6 Nac6 16 Bf5 Kf7 17 Bxe6+ Bxe6 18 Ng5+ fxg5 19 Qxe6+ Kg7 20 Bxe7 Nxe7 21 Qxe7+ Qxe7 22 Rxe7+ Kg6 23 Rae1 h6 24 R1e6+ Kh5 25 f3', { a: '+-', r: 'Taimanov–Shamkovich, Leningrado 1951', c: 'As brancas têm grande vantagem. A partida seguiu 15.Qh6! e 16.Bf5!, e as pretas abandonaram.' }],
  ['c45-m', '1', 'm', '(m) 15...cxd3', '15... cxd3 16 Qxf6 Ng6 17 Ne5', { a: '+-', c: 'Se 15...cxd3, 16.Qxf6 Ng6 17.Ne5 ganha.' }],
  ['c45-m', '2', 'm', '(m) 16...exf5', '16... exf5 17 Qxf6', { a: '+-', c: '16...exf5 perde para 17.Qxf6.' }],
  ['c45-m', '3', 'm', '(m) 16...Nxf5', '16... Nxf5 17 Qxf6', { a: '+-', c: '16...Nxf5 também perde para 17.Qxf6.' }],
  // Coluna 46
  ['c46', 'n', 'n', '(n)', '5... cxd4 6 axb4 dxc3 7 Nf3 cxb2 8 Bxb2 Ne7 9 Bd3 b6 10 O-O Bb7 11 Nd4 a6 12 Qh5', { a: '±', r: 'J. Kristiansen–C. Hansen, Reykjavik 1981', c: 'Com 5...cxd4 6.axb4 dxc3 7.Nf3! as brancas ficam melhor.' }],
  ['c46', 'o', 'o', '(o)', '6... cxb4 7 Nb5 Nc6 8 axb4 Bxb4+ 9 c3 Be7 10 Bd3 a6 11 Qg4 Kf8 12 Ba3', { a: '±', r: 'Liberzon–Khasin, URSS 1960', c: '6...cxb4? deixa as pretas numa posição feia.' }],
  ['c46', 'p', 'p', '(p)', '8 Nb5 Bc7 9 Qxg7 Rg8 10 Qxh7 a6 11 Nxc7+ Qxc7 12 Ne2 Qxe5 13 Bb2 Qf6 14 f4 Nbc6 15 Qd3 Nf5 16 O-O-O Qh6 17 Kb1 Bd7', { a: '=', r: 'Müller–Vaganian, Alemanha 1993', c: 'Com 8.Nb5 e 10...a6! fica igual.' }],
  ['c46', 'q', 'q', '(q)', '11 f4 Qxa5 12 Nf3 Bd7 13 Ng5 O-O-O 14 Nxf7 Nf5 15 Nxd8 Qxd8 16 Qh3 Ncd4 17 Qxc3+ Kb8', { a: '∞', r: 'van der Welde–Werle, Groningen 2001', c: 'Arriscado é 11.f4: depois de 13...O-O-O!? as pretas entregam a qualidade e ficam com uma iniciativa perigosa.' }],
  ['c46-q', '1', 'q', '(q) 12.Rb1', '12 Rb1 Bd7 13 Nf3 O-O-O 14 Qd3 d4 15 g3 Nf5', { a: '=', r: 'Shirov–Romero Holmes, Espanha 1998', c: 'Com 12.Rb1 fica igual.' }],
  ['c46-q', '2', 'q', '(q) 13...Rf8', '13... Rf8', { c: 'Também se joga 13...Rf8.' }],
  ['c46', 'r', 'r', '(r)', '11... Qxa5 12 Rb1 a6 13 Be2 d4 14 Ng5', { a: '±', r: 'Nisipeanu–Almeida, Sants Open 2005', c: 'Com 11...Qxa5 as brancas ficam melhor.' }],
  ['c46', 's', 's', '(s)', '15 Qd3 Rg4 16 g3 Ng6 17 Qxc3 Nxf4 18 h3 Nxh3 19 Rxh3', { a: '±', r: 'Volokitin–Lputian, Olimpíada de Calvià 2004', c: 'Depois de 15.Qd3 e 18.h3! as brancas ficam melhor.' }],
  // Coluna 47
  ['c47', 't', 't', '(t)', '8... Nh6 9 Nf3 Bd7 10 Nfxd4 a6 11 Nxc7+ Qxc7 12 Bd2 Nc6 13 Nf3 Ne7 14 a4 Nef5 15 Bd3 Qb6 16 Qe2 O-O 17 Qf2', { a: '±', r: 'Hellers–Knaak, Olimpíada de Novi Sad 1990', c: 'Com 8...Nh6 vem 10.Nfxd4!, e as brancas ficam melhor.' }],
  ['c47', 'u', 'u', '(u)', '9... Bxb5 10 Bxb5+ Nc6 11 Bd3 Nge7 12 Qe2 Bb6 13 O-O Nf5 14 Kh1 Qc7 15 a4 Nxb4 16 Bxf5 exf5 17 Qb5+ Nc6 18 Ba3', { a: '±', r: 'Stefansson–Müller, Altensteig 1992', c: 'Com 9...Bxb5 vem 15.a4!, e as brancas ficam com o ataque.' }],
  ['c47', 'v', 'v', '(v)', '10 Nbxd4 Nbc6 11 c3 Nxd4 12 cxd4 Nc8 13 Bd3 Nb6', { a: '=', r: 'Sawatzki–Panzer, Liga Alemã 2001', c: 'Com 10.Nbxd4 fica igual depois de 12...Nc8!.' }],
  ['c47', 'w', 'w', '(w)', '15 O-O Rc8 16 c3 Nc6 17 Rc1 a5', { a: '=', r: 'Khalifman–S. Ivanov, Rússia 2004', c: 'Depois de 15.O-O fica igual.' }],
  // Coluna 48
  ['c48', 'x', 'x', '(x)', '6 Qg4 Ne7 7 dxc5 Bxc3+ 8 bxc3 Nd7 9 Nf3 Qc7 10 Qxg7 Rg8 11 Qxh7 Nxe5 12 Qh5 Nxf3+ 13 Qxf3 Bd7 14 Bf4 Qxc5', { a: '=', r: 'Shamkovich–Gipslis, URSS 1961 (até 14.Bf4)', c: 'Agudo é 6.Qg4!?, mas o velho remédio 8...Nd7! é bom: igual.' }],
  ['c48-x', '1', 'x', '(x) 9.Qxg7?!', '9 Qxg7 Rg8 10 Qxh7 Nxe5 11 Be2 Qa5', { a: '∓', c: '9.Qxg7?! Rg8 10.Qxh7 Nxe5 deixa as pretas melhor.' }],
  ['c48', 'y', 'y', '(y)', '15 Qf3 Bc7 16 Qxf7 Qxf7 17 Nxf7 Rhf8 18 Ng5 h6 19 Nf3 Nc6 20 Rfe1 Rxf3 21 gxf3 Nxe5', { a: '∓', r: 'Madl–Luther, Hastings 1994', c: 'Depois de 14.Ng5?! Qe8 15.Qf3 as pretas entregam a qualidade com 20...Rxf3! e ficam com a vantagem no final.' }],
  // Coluna 49
  ['c49', 'a', 'a', '(a)', '5... Nc6 6 Nb5 Bxd2+ 7 Qxd2 Nxd4 8 Nxd4 cxd4 9 f4 Qb6 10 O-O-O Ne7 11 Nf3 Nc6 12 Nxd4', { a: '⩲', r: 'Gluckman–Sharavdorj, Olimpíada de Bled 2002', c: 'Com 5...Nc6 as brancas ficam um pouco melhor.' }],
  ['c49', 'b', 'b', '(b)', '6 Nb5 Bxd2+ 7 Qxd2 O-O 8 c3 Nbc6 9 f4 a6 10 Nd6 cxd4 11 cxd4 f6 12 Nf3 Ng6', { a: '=', r: 'Timman–Agdestein, Taxco 1985', c: 'Com 6.Nb5 fica igual.' }],
  ['c49', 'c', 'c', '(c)', '7... cxd4 8 Qxd4 Nbc6 9 Qg4 Nf5 10 Nf3 O-O 11 Bd3', { a: '±', r: 'Keres–Spassky, Moscou 1967', c: 'As pretas podem se complicar com 7...cxd4. O livro escreve 7...Nc6; como os dois cavalos podem ir a c6, a notação correta é 7...Nbc6.' }],
  // Coluna 50
  ['c50', 'd', 'd', '(d)', '5 Nf3 Nc6 6 dxc5 Nge7 7 Bd3 d4 8 a3 Ba5 9 b4 Nxb4 10 axb4 Bxb4 11 Bb5+ Bd7 12 Qxd4 Bxc3+ 13 Qxc3 Bxb5', { a: '∓', c: 'Uma linha traiçoeira é 5.Nf3; depois de 11...Bd7! as pretas ficam um pouco melhor.' }],
  ['c50-d', '1', 'd', '(d) 7...Ng6', '7... Ng6 8 Bxg6', { a: '±', c: '7...Ng6 8.Bxg6 e 9.Be3 deixa as brancas melhor.' }],
  ['c50-d', '2', 'd', '(d) 11...Nc6?!', '11... Nc6 12 Bxc6+ bxc6 13 Ra4 Bxc3+ 14 Bd2', { a: '±', r: 'Fine–Botvinnik, AVRO 1938', c: 'Na partida, 11...Nc6?! 12.Bxc6+ bxc6 13.Ra4! deu vantagem às brancas, e Fine venceu rápido.' }],
  ['c50', 'e-A', 'e', '(e) A', '6 dxc5 Nbc6 7 Bd2 Nf5 8 Nf3 Bxc5 9 Bd3 h5 10 Qf4 Nce7', { a: '=', r: 'Leko–Hertneck, Olimpíada de Moscou 1994', c: 'Com 6.dxc5 fica igual.' }],
  ['c50', 'e-B', 'e', '(e) B', '6 a3 Qa5', { c: '6.a3?! é respondido por 6...Qa5!.' }],
  // Coluna 51
  ['c51', 'f', 'f', '(f)', '6... Ne7 7 Qg4 Kf8 8 Nf3 Ba6 9 Bd3 c5 10 dxc5 Bxd3 11 cxd3 bxc5 12 O-O Nd7 13 a4', { a: '⩲', r: 'J. Polgár–L.B. Hansen, Vejstrup 1989', c: 'Contra 6...Ba6 ou 6...Ne7 as brancas jogam no flanco do rei com 7.Qg4, porque não há jeito confortável de defender g7.' }],
  ['c51', 'g', 'g', '(g)', '7 Qg4 f5 8 Qg3 Ba6 9 Bxa6 Nxa6 10 Ne2 O-O-O 11 a4 Kb7 12 O-O Qf7 13 c4 Ne7 14 Bg5 dxc4 15 Qc3', { a: '⩲', r: 'Fischer–Bisguier, Campeonato dos EUA 1957', c: 'Igualmente bom é 7.Qg4.' }],
  ['c51-g', '1', 'g', '(g) 10...Nb8', '10... Nb8 11 Nf4', { c: 'Se 10...Nb8, 11.Nf4 ameaça 12.Nxe6! Qxe6 13.Qxg7.' }],
  ['c51-g', '2', 'g', '(g) 12...Nb8', '12... Nb8 13 a5', { a: '⩲', c: 'Se 12...Nb8, 13.a5.' }],
  ['c51', 'h', 'h', '(h)', '13 a5 b5 14 Nh3 a6 15 Nf4 Ne7 16 g4', { a: '⩲', r: 'G. Garcia–Formanek, World Open 2002', c: 'Depois de 13.a5 as brancas ficam um pouco melhor.' }],
  // Coluna 52
  ['c52', 'i', 'i', '(i)', '6 Nf3 Ne7 7 Bd3 Ba6', { a: '=', c: '6.Bb5+ procura evitar a troca dos bispos de casas claras. Com 6.Nf3 Ne7 7.Bd3 Ba6 as pretas têm boas chances de igualar.' }],
  ['c52', 'j', 'j', '(j)', '7... a5 8 Nce2 Ba6 9 Nf3 Ne7 10 O-O Nf5 11 Re1 b5 12 Bb3 c5 13 c3', { a: '±', r: 'Fedorowicz–Zerm, Filadélfia 1997', c: 'Com 7...a5 as brancas ficam melhor.' }],
  ['c52', 'k', 'k', '(k)', '9... Ne7 10 Nf3 Bc4 11 Bxc4 dxc4 12 Ng3 h6 13 O-O Ng6 14 Nh5 Qd5 15 Qe2 Nd7 16 b3', { a: '±', r: 'Kruppa–Moroz, Kherson 1989', c: 'Com 9...Ne7 as brancas ficam melhor.' }],
  ['c52', 'l', 'l', '(l)', '13 Re1 Be7 14 Bc2 g6 15 Nf4', { a: '⩲', r: 'Cabrilo–Arancibia, Interzonal de Manila 1990', c: 'Depois de 13.Re1 as brancas ficam um pouco melhor.' }],
  // Coluna 53
  ['c53', 'm', 'm', '(m)', '5 Bd2 Bf8 6 Nf3 Ne7 7 h4 h5 8 Bg5 Qd7 9 Bb5 c6 10 Bd3 Ba6', { a: '=', r: 'van der Wiel–Portisch, Tilburg 1988', c: 'Com 5.Bd2 Bf8! fica igual.' }],
  ['c53-m', '1', 'm', '(m) 5...Ne7', '5... Ne7', { c: '5...Ne7 também é razoável.' }],
  ['c53', 'n-A', 'n', '(n) A', '6 Nf3 Qd7 7 Be2 Ba6 8 O-O Ne7 9 Rd1 Nf5 10 Bxa6 Nxa6 11 Ne2 Nb4', { a: '=', r: 'Spraggett–Gonzalez Rodriguez, Espanha 2006 (até 11.Ne2)', c: 'Outras escolhas: 6.Nf3, igual.' }],
  ['c53', 'n-B', 'n', '(n) B', '6 Bg5 Qd7 7 f4 h6 8 Bh4 h5 9 Qh3 Ba6 10 Nf3 Nh6', { a: '=', r: 'Topalov–Vaganian, Groningen 1993', c: 'Ou 6.Bg5, também igual.' }],
  ['c53', 'o-A', 'o', '(o) A', '6... Ba6 7 Nb5 Qd7 8 a4 Ne7 9 Nf4 Ng6 10 Nh5 Rg8 11 Bh6', { a: '±', r: 'Tal–Karner, URSS 1979', c: 'Com 6...Ba6 vem 11.Bh6!, e as brancas ficam melhor.' }],
  ['c53', 'o-B', 'o', '(o) B', '6... Qd7 7 Nf4 g6 8 h4 h5 9 Qf3 Ne7 10 g4', { a: '⩲', r: 'Chibukhchian–Minasian, Yerevan 2005', c: 'Com 6...Qd7 as brancas ficam um pouco melhor.' }],
  ['c53', 'p', 'p', '(p)', '13 Qf3 O-O-O 14 Nh5 Be8 15 g4 Kb8 16 Qg2 Rc8 17 Qf1 Ka7 18 f4', { a: '⩲', r: 'Perényi–Portisch, Hungria 1987', c: 'Depois de 13.Qf3 as brancas ficam com pressão.' }],
  // Coluna 54
  ['c54', 'q', 'q', '(q)', '4... Ne7 5 a3 Bxc3+ 6 bxc3 c5', { c: '4...Ne7 às vezes é jogado para confundir as brancas. Depois de 5.a3 Bxc3+ 6.bxc3 c5 ou 6...b6 a partida transpõe para a linha principal da Winawer ou para a coluna 51. 4...Ne7 5.Bd2?! c5 é a coluna 49.' }],
  ['c54', 'r-A', 'r', '(r) A', '5 a3 Bxc3+ 6 bxc3 b6', { c: '5.a3 Bxc3+ 6.bxc3 b6 transpõe para a coluna 51.' }],
  ['c54-r-A', '1', 'r', '(r) 5...Bf8', '5... Bf8 6 Bb5 c6 7 Ba4', { c: '5...Bf8 6.Bb5 c6 7.Ba4 é parecido com a coluna 52.' }],
  ['c54', 'r-B', 'r', '(r) B', '5 Qg4 f5 6 Qg3 b6 7 Nh3 Ba6 8 Bxa6 Nxa6 9 Nf4', { a: '⩲', c: 'Com 5.Qg4 f5 as brancas ficam um pouco melhor.' }],
  ['c54', 's', 's', '(s)', '5... Ne7 6 Qg4 Nf5 7 Bd3 h5 8 Qf4 Nc6 9 Bxf5 exf5 10 Nf3', { a: '±', r: 'Nunn–Hort, Amsterdã 1988', c: 'Com 5...Ne7 as brancas ficam melhor.' }],
  ['c54', 't', 't', '(t)', '13 Qh5+ g6 14 Qe2 h6 15 h4 Nc6 16 Qd3 Nge7 17 Ne2', { a: '⩲', r: 'Khalifman–Panzer, Alemanha 1993', c: 'Depois de 13.Qh5+ as brancas ficam um pouco melhor.' }],
  // Coluna 55
  ['c55', 'a-A', 'a', '(a) A', '6... Nf6 7 Qd3 O-O 8 Bf4 Nbd7 9 O-O-O Nxe4 10 Qxe4 c5', { a: '=', r: 'Gipslis–Krogius, Moscou 1991', c: 'Também é bom 6...Nf6: com 7.Qd3 fica igual.' }],
  ['c55', 'a-B', 'a', '(a) B', '6... Nf6 7 N2c3 O-O 8 Be3 Nxe4 9 Nxe4 f5 10 Nc3 f4 11 Bc1 Nc6', { a: '∓', r: 'Keres–Mikenas, Moscou 1940', c: 'Com 7.N2c3 O-O 8.Be3?! as pretas ficam um pouco melhor.' }],
  ['c55-a-B', '1', 'a', '(a) 8.Bc4', '8 Bc4', { a: '=', c: 'Melhor é 8.Bc4, igual.' }],
  ['c55', 'b', 'b', '(b)', '7 Be3 Nf6 8 N2c3 O-O 9 Ng3 b6 10 Be2 Bb7 11 O-O Qd7 12 Qd2 Rfd8', { a: '=', r: 'Alekhine–Euwe, Campeonato Mundial 1935', c: 'Com 7.Be3 fica igual.' }],
  ['c55', 'c', 'c', '(c)', '13 Nf4 Qd6', { a: '=', r: 'Westerinen–Casadei, Cattolica 1993 (até 13.Nf4)', c: 'Depois de 13.Nf4 as pretas devem jogar 13...Qd6, igual.' }],
  ['c55-c', '1', 'c', '(c) 13...Nxf4', '13... Nxf4 14 Bxf4 b4 15 Qc4', { a: '⩲', c: 'Na partida, 13...Nxf4 14.Bxf4 b4 15.Qc4 deixou as brancas um pouco melhor.' }],
  // Coluna 56
  ['c56', 'd-A', 'd', '(d) A', '6... Nf6 7 Bg5', { a: '±', c: '6...Nf6?! não ajuda: 7.Bg5 deixa as brancas melhor.' }],
  ['c56', 'd-B', 'd', '(d) B', '6... f5 7 f3 exf3 8 Qxf3 Qxd4 9 Qg3 Nf6 10 Qxg7 Qe5+ 11 Be2 Rg8 12 Qh6 Rg6 13 Qh4 Bd7 14 Bg5 Bc6 15 O-O-O Bxg2 16 Rhe1 Be4 17 Bh5 Nxh5 18 Rd8+ Kf7 19 Qxh5', { a: '+-', r: 'Alekhine–Nimzowitsch, Bled 1931', c: 'Com 6...f5 vem 7.f3!, e as pretas abandonaram depois de 19.Qxh5.' }],
  ['c56', 'e', 'e', '(e)', '7 d5 exd5 8 Qxd5 Nge7 9 Qxd8+ Nxd8 10 Nxe4 Bf5', { a: '=', r: 'Westerinen–Rozentalis, Gausdal 2003', c: 'Com 7.d5 as damas saem e fica igual.' }],
  ['c56', 'f', 'f', '(f)', '13 Bg5 Qd7 14 d5 Ne5 15 f3 b5', { a: '=', r: 'Hector–Petersen, Copenhague 2005', c: 'Depois de 13.Bg5 fica igual: as brancas têm compensação pelo peão.' }],
  // Coluna 57
  ['c57', 'g', 'g', '(g)', '6 f3 exf3 7 Nxf3 Nf6 8 Bd3', { c: 'O gambito 6.f3 exf3 dá às brancas ótimas chances de ataque.' }],
  ['c57-g', '1', 'g', '(g) 6...e5', '6... e5 7 Be3 Nf6 8 dxe5 Nd5', { a: '∓', c: 'As pretas fazem bem em recusar o gambito com 6...e5.' }],
  ['c57', 'h', 'h', '(h)', '9... c5 10 Ng3 Qc7 11 Bb5 Rg6 12 Qd2 a6 13 Be2 b6 14 O-O Bb7 15 f3', { a: '⩲', c: 'Com 9...c5 vem 11.Bb5!, e as brancas ficam um pouco melhor.' }],
  ['c57-h', '1', 'h', '(h) 11.Qe3', '11 Qe3 Qc6', { a: '=', c: 'Com 11.Qe3 Qc6 fica igual.' }],
  ['c57', 'i', 'i', '(i)', '13 a4', { a: '=', r: 'Ker–Berkes, Olimpíada de Calvià 2004', c: 'Em vez de 13.f3?!, jogado na partida, as brancas deveriam jogar 13.a4 ou 13.Qh4, com chances iguais.' }],
  // Coluna 58
  ['c58', 'j', 'j', '(j)', '8... c5 9 Ne2 Nc6 10 dxc5 Rg6 11 Qd2 Bd7 12 Rb1 Qc7 13 Qd6', { a: '⩲', r: 'Smyslov–Botvinnik, Campeonato Mundial 1954', c: 'Com 8...c5 as brancas ficam um pouco melhor.' }],
  ['c58', 'k', 'k', '(k)', '9 Qe3 Nc6 10 Bb2 Ne7', { c: '9.Qe3 parece mais natural, mas depois de 9...Nc6 10.Bb2 Ne7! as pretas ganham tempo atacando a dama.' }],
  ['c58', 'l', 'l', '(l)', '13 Ne2 O-O-O 14 Nc3 c5 15 d5 exd5 16 Nxd5 Nxd5 17 cxd5 Rd6 18 c4 b5', { a: '=', r: 'R. Byrne–Sherzer, Nova York 1988', c: 'Depois de 13.Ne2 fica igual.' }],
  // Coluna 59
  ['c59', 'm', 'm', '(m)', '5... Qxd4 6 O-O-O f5 7 Qg3 Bd6 8 Bf4 Bxf4+ 9 Qxf4 Qc5 10 f3 Nf6', { a: '∓', r: 'Ucha–Luther, Peregrina Open 2002', c: 'Ousado, mas provavelmente bom, é 5...Qxd4.' }],
  ['c59', 'n', 'n', '(n)', '7... Nc6 8 O-O-O Rg6 9 Qh4 Bxc3 10 Bxc3 Qd5 11 b3 Ne7 12 f3', { a: '⩲', r: 'Keres–Botvinnik, Campeonato Mundial 1948', c: 'Com 7...Nc6 as brancas ficam um pouco melhor.' }],
  ['c59', 'o', 'o', '(o)', '13 g3 Qh6 14 Bxh6 Bxh6+ 15 Kb1 Bd7 16 h4 Bc6', { a: '=', r: 'Ribshtein–S. Ivanov, Grécia 2003', c: 'Depois de 13.g3 as damas saem e fica igual.' }],
  // Coluna 60
  ['c60', 'p', 'p', '(p)', '4 exd5 exd5', { c: '4.exd5 exd5 transpõe para a Variante das Trocas.' }],
  ['c60', 'q', 'q', '(q)', '8... Nc6 9 Bb5 Bd7 10 Bxc6 Bxc6 11 Nge2 dxe4 12 dxc5 Ng4 13 Qd4 Qxd4 14 Nxd4', { a: '⩲', r: 'Planinc–R. Byrne, Moscou 1975', c: 'O natural 8...Nc6?! permite 9.Bb5!, e as brancas ficam um pouco melhor.' }],
  ['c60', 'r', 'r', '(r)', '13 Be3 Qf6+ 14 Ke1 Bxd4 15 Bxd4 Qxd4', { a: '=', c: 'Depois de 13.Be3 Qf6+ as pretas têm pelo menos a igualdade.' }],
]

const capitulo = {
  id: 'francesa-f',
  arquivo: 'francesa-f',
  nome: 'Francesa — Winawer, outras linhas',
  fonte: 'Modern Chess Openings — French Defense (pp. 223–229), colunas 43–60',
  base: '1. e4 e6 2. d4 d5 3. Nc3 Bb4',
  corPadrao: 'b',
  ordem: 223,
  grupos: [
    { id: 'qc7', nome: '4.e5 c5 5.a3 Bxc3+ 6.bxc3 Qc7', colunas: [43, 44, 45] },
    { id: 'ba5', nome: '4.e5 c5 5.a3 Ba5', colunas: [46, 47, 48] },
    { id: 'quinto', nome: '4.e5 c5: 5.Bd2 e 5.Qg4', colunas: [49, 50] },
    { id: 'b6', nome: '4.e5 b6 e 4...Qd7', colunas: [51, 52, 53, 54] },
    { id: 'quarto', nome: 'Alternativas no 4º lance', colunas: [55, 56, 57, 58, 59, 60] },
  ],
}

module.exports = { capitulo, colunas, notas }
