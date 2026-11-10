// Transcrição do MCO 15ª ed. — Gambito Dinamarquês (pp. 141–143).
// Gerar: node scripts/mco/gerar.cjs dinamarques
// Formato: ver gambito-do-rei.cjs. Dicas em dinamarques-dicas.cjs.

const DG = '1 e4 e5 2 d4 exd4 3 c3'
const AC = `${DG} dxc3 4 Bc4 cxb2 5 Bxb2`

const colunas = {
  c01: [`${AC} d5 6 Bxd5 Nf6 7 Bxf7+ Kxf7 8 Qxd8 Bb4+ 9 Qd2 Bxd2+ 10 Nxd2 c5 11 Ngf3 Nc6`, 'aceito', '5...d5 6.Bxd5 Nf6 (Defesa Schlechter)', '=',
    'Gambito Dinamarquês: as brancas entregam dois peões e ganham dois bispos apontados para o roque preto. Na Defesa Schlechter, 5...d5, as pretas devolvem um peão e a partida vai para um final igual, mas desequilibrado.'],
  c02: [`${AC} d5 6 Bxd5 Bb4+ 7 Nc3 Bxc3+ 8 Bxc3 Nf6 9 Qf3 Nxd5 10 exd5 O-O 11 Ne2 Re8`, 'aceito', '5...d5 6.Bxd5 Bb4+', '⩱',
    'Com 6...Bb4+ as pretas tentam refutar o gambito. Há jogo, mas objetivamente as brancas não têm compensação suficiente pelo peão (Grob–Weishaupt, correspondência 1960).'],
  c03: [`${AC} Bb4+ 6 Kf1 Nf6 7 e5 d5 8 Bb5+ c6 9 exf6 cxb5 10 fxg7 Rg8 11 Qc2 Be6`, 'aceito', '5...Bb4+', '⩲',
    'Com 5...Bb4+ as pretas seguram os peões por enquanto e tentam se defender. O jogo fica confuso.'],
  c04: [`${AC} d6 6 Qb3 Qd7 7 Nf3 Nc6 8 Bc3 Nh6 9 O-O f6 10 Nbd2 Nf7 11 Rad1 Ncd8`, 'aceito', '5...d6', '∞',
    'Com 5...d6 as pretas fecham a diagonal do bispo de b2 e se defendem com cuidado. As brancas têm jogo pelo material.'],
  c05: [`${DG} Qe7 4 cxd4 Qxe4+ 5 Be3 Nf6 6 Nc3 Bb4 7 Nf3 Nd5 8 Qd2 Nxe3 9 fxe3 Qe7 10 Bd3 d5 11 O-O f5`, 'recusado', '3...Qe7', '⩱',
    'Uma linha antiga, de Spielmann e Nezmetdinov, que nunca foi refutada: 3...Qe7 e a dama pega o peão de e4 com xeque.'],
  c06: [`${DG} d5 4 exd5 Nf6 5 Bb5+ c6 6 dxc6 bxc6 7 Bc4 Bc5 8 Qe2+ Qe7 9 Qxe7+ Kxe7 10 cxd4 Bxd4 11 Nf3 Rd8`, 'recusado', '3...d5', '⩲',
    'Recusar com 3...d5 deve bastar para igualar. Depois de 4...Nf6 5.Bb5+ as brancas ficam com uma vantagem mínima.'],
}

const notas = [
  ['c01', 'a', 'a', '(a)', '3 Nf3 Bc5 4 Nxd4 Nf6 5 Nc3 d5 6 exd5 O-O', { a: '=', r: 'Blumenfeld e Klyatskin–Alekhine, Moscou 1920', c: 'Com 3.Nf3 o jogo fica igual.' }],
  ['c01', 'b', 'b', '(b)', '6 exd5 Nf6 7 Nf3 Bb4+ 8 Nbd2 Qe7+', { a: '∓', c: 'Com 6.exd5 as pretas ficam melhor.' }],
  ['c01', 'c', 'c', '(c)', '7 Nc3 Be7 8 Qe2 Nxd5 9 Nxd5 c6 10 Nxe7 Qxe7 11 Bxg7 Rg8', { a: '∓', r: 'Hector–Schussler, Malmö 1985', c: 'Com 7.Nc3 as pretas ficam melhor. (O livro segue 12.Bg2, impossível com o bispo em g7; a linha foi cortada em 11...Rg8.)' }],
  ['c01-c', '1', 'c', '(c) 8.Qb3', '8 Qb3', { r: 'Christiansen', c: 'As brancas poderiam tentar 8.Qb3.' }],
  ['c01-c', '2', 'c', '(c) 8.Qa4+', '8 Qa4+', { r: 'Christiansen', c: 'Ou 8.Qa4+.' }],
  ['c01', 'd', 'd', '(d)', '10... Re8 11 f3 b6 12 Ne2 Ba6', { a: '=', r: 'Copeland–Matthew, U.S. Amateur Team East 2005', c: '10...Re8 é mais seguro; o jogo fica igual.' }],
  ['c01', 'e', 'e', '(e)', '12 e5 Nd5 13 Ne4 b6 14 O-O-O Nf4 15 Nd6+ Ke7 16 Nxc8+ Raxc8 17 e6', { a: '⩲', r: 'Preo–Sarink, correspondência 1989', c: 'As brancas têm chances de ataque.' }],
  ['c02', 'f-A', 'f', '(f) A', '7 Nd2 Bxd2+ 8 Qxd2 Nf6 9 Qg5 O-O 10 Rd1 Nbd7', { a: '∓', r: 'Preo–Franzen, correspondência 1980', c: 'Com 7.Nd2 as pretas ficam melhor.' }],
  ['c02-f-A', '1', 'f', '(f) 9...Rg8', '9... Rg8 10 O-O-O Nxd5 11 Qh5', { a: '∞', r: 'Christiansen', c: 'Com 9...Rg8 as brancas têm ataque.' }],
  ['c02', 'f-B', 'f', '(f) B', '7 Ke2 Nf6 8 Qa4+ c6 9 Bxf7+ Kxf7 10 Qxb4 Re8', { a: '=', r: 'Thomas–Teo, Southampton 1986', c: 'Com 7.Ke2 o jogo fica mais ou menos igual. (O livro escreve 10...Rc8, mas c8 está ocupada pelo bispo; a torre de h8 vai para e8.)' }],
  ['c02', 'f-C', 'f', '(f) C', '7 Kf1 Nf6 8 Qa4+ Nc6 9 Bxc6+ bxc6 10 Qxb4 Qd1+', { a: '-+', c: 'Com 7.Kf1 as pretas ganham. (O livro escreve 9...dxc6, mas o peão d preto já saiu; retoma o de b7.)' }],
  ['c02', 'g', 'g', '(g)', '9 Nf3 Nxd5 10 exd5 Qe7+ 11 Kf1 O-O', { a: '∓', r: 'Radevich–Asaturyan, URSS 1968', c: '9.Nf3?! é impreciso; as pretas ficam melhor.' }],
  ['c02', 'h', 'h', '(h)', '10 Rd1 O-O 11 Rxd5 Qe7', { a: '∓', c: 'Com 10.Rd1 as pretas devem ficar melhor.' }],
  ['c03', 'j-A', 'j', '(j) A', '5... Nf6 6 e5 d5 7 exf6 dxc4 8 Qxd8+ Kxd8 9 fxg7 Bb4+ 10 Nc3', { r: 'Marshall–Duras, Nova York 1913', c: 'Com 5...Nf6 as brancas recuperam material.' }],
  ['c03-j-A', '1', 'j', '(j) 10...Rg8', '10... Rg8', { a: '=', c: 'Agora 10...Rg8 deixa tudo bem para as pretas.' }],
  ['c03-j-A', '2', 'j', '(j) 6.Nc3', '6 Nc3 d5 7 Nxd5 Nxd5 8 exd5 Bb4+ 9 Kf1 O-O 10 Qd4 f6 11 Ne2', { a: '∞', c: 'Com 6.Nc3 as brancas têm algumas chances de ataque pelo peão.' }],
  ['c03', 'j-B', 'j', '(j) B', '5... Nh6 6 Nf3 b6 7 Qe2 Bb4+ 8 Nc3 O-O 9 O-O-O', { a: '∞', r: 'análise de Collijn', c: 'A Defesa Nórdica, 5...Nh6: as brancas querem g4 e h4, e o jogo fica confuso.' }],
  ['c03', 'k-A', 'k', '(k) A', '6 Nd2 Nf6 7 Bxf7+ Kxf7 8 Qb3+ d5 9 Qxb4 Nc6 10 Qb3 Re8', { a: '∞', c: 'Com 6.Nd2 há jogo para os dois lados.' }],
  ['c03', 'k-B', 'k', '(k) B', '6 Nc3 d6 7 Nf3 Nf6 8 O-O Bxc3 9 Bxc3 O-O 10 e5 Ne4 11 Bb2', { a: '∞', r: 'Hartlaub–Testa, Bremen 1913', c: 'Com 6.Nc3 as brancas têm compensação pelo material.' }],
  ['c03', 'l', 'l', '(l)', '6... Bf8 7 Nc3 Nh6 8 Nf3 Nc6 9 Nd5', { a: '±', r: 'Mieses–Albin, Monte Carlo 1903', c: 'O recuo 6...Bf8 deu errado.' }],
  ['c03', 'm', 'm', '(m)', '8 exf6 dxc4 9 Qe2+ Be6 10 fxg7 Rg8 11 Nc3 Qd3', { a: '∓', r: 'Walentukiewicz–Sowinski, Polônia 2001', c: 'Com 8.exf6 as pretas ficam melhor.' }],
  ['c03', 'n', 'n', '(n)', '12 Qxh7 Kd7 13 Nf3', { a: '⩲', r: 'Klovans–Petkevich, URSS 1962', c: 'As brancas ficam um pouco melhor.' }],
  ['c04', 'o', 'o', '(o)', '6 f4 Be6 7 Bxe6 fxe6 8 Qb3 Nd7 9 Qxe6+ Qe7', { a: '∓', c: 'Com 6.f4 as pretas ficam melhor.' }],
  ['c04', 'p', 'p', '(p)', '7 Nc3 Nc6 8 Nd5 Na5 9 Qg3 f6 10 Be2 c6 11 Nf4 Nh6', { r: 'Mieses–Marshall, Hannover 1902', c: 'Com 7.Nc3 as pretas se defendem.' }],
  ['c04-p', '1', 'p', '(p) 12.Nh5', '12 Nh5', { a: '=', c: 'Agora 12.Nh5 daria chances iguais.' }],
  ['c04', 'q', 'q', '(q)', '12 Nd4 Be7 13 f4 O-O 14 e5', { a: '∞', r: 'Bryson–Fernandes, Salônica 1984 (até 13...O-O)', c: 'As brancas têm jogo pelo material.' }],
  ['c05', 'r-A', 'r', '(r) A', '4 Qxd4 Nf6 5 Bd3 Nc6 6 Qa4 d5 7 Bg5 Bd7 8 Nd2 Ne5 9 Bb5 Nd3+', { a: '∓', r: 'Preo–Sapundzhiev, correspondência 1977', c: 'Com 4.Qxd4 as pretas ficam melhor.' }],
  ['c05', 'r-B', 'r', '(r) B', '4 Bd3 d5 5 e5 Nc6', { a: '∓', c: 'Com 4.Bd3 também.' }],
  ['c05', 's', 's', '(s)', '5 Be2 Qxg2 6 Bf3 Qg6 7 Nc3 Bb4 8 Ne2 Ne7 9 Nf4 Qf5 10 Be3 d5 11 Rg1', { a: '∞', c: 'Com 5.Be2 as brancas têm boas chances de ataque.' }],
  ['c05-s', '1', 's', '(s) 5...Nf6', '5... Nf6 6 Nf3 Bb4+ 7 Nc3 O-O 8 O-O Bxc3 9 bxc3 d6', { a: '∓', r: 'Karesik–Mikhalevski, Israel 2004', c: 'Mas com 5...Nf6 as brancas ficam com pouco pelo peão. (O livro escreve 5...d5, o que não combina com 7...O-O e 9...d6 depois; o lance coerente é 5...Nf6.)' }],
  ['c05', 't', 't', '(t)', '5... d5 6 Nc3 Qe6 7 Nf3 c6 8 Bd3 Be7 9 O-O Nf6', { a: '⩱', c: '5...d5 é bem jogável; as brancas provavelmente não têm o bastante pelo peão.' }],
  ['c05', 'u', 'u', '(u)', '10... d6 11 O-O Bxc3 12 bxc3 Nc6 13 e4 O-O 14 Rae1', { r: 'Romashkevich–Saburov, Rússia 1889', c: 'Com 10...d6 as brancas ganham jogo.' }],
  ['c05-u', '1', 'u', '(u) 14...f6', '14... f6', { a: '=', c: 'Agora 14...f6 deixa o jogo mais ou menos igual.' }],
  ['c05', 'v', 'v', '(v)', '12 a3 Bxc3 13 bxc3 O-O', { a: '⩱', c: 'As brancas não têm compensação suficiente pelo peão.' }],
  ['c06', 'w', 'w', '(w)', '4... Qxd5 5 cxd4 Nf6 6 Nf3 Bb4+ 7 Nc3 O-O 8 Be2 Ne4 9 Bd2 Bxc3 10 bxc3 Nxd2 11 Qxd2 Bg4', { a: '=', r: 'Ghitescu–Puribzab, Varna 1958', c: 'Com 4...Qxd5 o jogo costuma transpor para o Gambito Göring; fica igual.' }],
  ['c06-w', '1', 'w', '(w) 7...Nc6', '7... Nc6', { c: '7...Nc6 transpõe para o Gambito Göring.' }],
  ['c06', 'x-A', 'x', '(x) A', '5 cxd4 Bb4+ 6 Nc3 Nxd5 7 Bd2 O-O 8 Bd3', { a: '=', r: 'Andoy–T. R. Hansen, Copenhague 2004', c: 'Com 5.cxd4 o jogo fica igual.' }],
  ['c06', 'x-B', 'x', '(x) B', '5 Bc4 Nxd5 6 Qb3 Qe7+', { a: '∓', c: 'Com 5.Bc4 as pretas ficam melhor.' }],
  ['c06', 'x-C', 'x', '(x) C', '5 Nf3 Nxd5 6 Qxd4 Nc6 7 Bb5 Be7', { a: '=', r: 'Alekhine–Molina, Buenos Aires 1926', c: 'Com 5.Nf3 o jogo fica igual.' }],
  ['c06', 'y', 'y', '(y)', '5... Bd7 6 Bc4 dxc3 7 Nxc3', { a: '⩲', r: 'Klovans–Zhuravlev, Riga 1962', c: 'Com 5...Bd7 as brancas ganham espaço.' }],
  ['c06-y', '1', 'y', '(y) 7...Bd6', '7... Bd6 8 Qb3 Na6 9 Be3 O-O 10 Qxb7 Nc5 11 Bxc5 Bxc5 12 Qb3', { a: '=', c: 'A partida terminou empatada depois de 7...Bd6.' }],
  ['c06', 'z-A', 'z', '(z) A', '11... c5 12 Nxd4 cxd4 13 b3', { a: '±', r: 'Gusev–Khachaturov, Moscou 1959', c: '11...c5? é um erro: as brancas ficam com grande vantagem.' }],
  ['c06', 'z-B', 'z', '(z) B', '12 O-O Ba6 13 Bxa6 Nxa6 14 Nxd4 Rxd4 15 Be3', { a: '⩲', c: 'Depois de 11...Rd8 as brancas ficam com uma pequena vantagem.' }],
]

const capitulo = {
  id: 'dinamarques',
  arquivo: 'dinamarques',
  nome: 'Gambito Dinamarquês',
  fonte: 'Modern Chess Openings — Danish Gambit (pp. 141–143), colunas 1–6',
  base: '1. e4 e5 2. d4 exd4 3. c3',
  corPadrao: 'w',
  ordem: 141,
  grupos: [
    { id: 'aceito', nome: '3...dxc3 (aceito)', colunas: [1, 2, 3, 4] },
    { id: 'recusado', nome: 'Recusado', colunas: [5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
