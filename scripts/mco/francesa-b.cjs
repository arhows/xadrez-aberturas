// Transcrição do MCO 15ª ed. — Defesa Francesa, 3.Nc3 Nf6 4.Bg5: Clássica, Alekhine-Chatard,
// MacCutcheon e Burn (pp. 206–211), colunas 7–18.
// Gerar: node scripts/mco/gerar.cjs francesa-b
// Formato: ver gambito-do-rei.cjs. Dicas em francesa-b-dicas.cjs.

const B4 = '1 e4 e6 2 d4 d5 3 Nc3 Nf6 4 Bg5'
const BC = `${B4} Be7 5 e5 Nfd7`
const F7 = `${BC} 6 Bxe7 Qxe7 7 f4 O-O 8 Nf3 c5`
const MC = `${B4} Bb4 5 e5 h6 6 Bd2 Bxc3`

const colunas = {
  c07: [`${F7} 9 Qd2 Nc6 10 O-O-O Nb6 11 Qe3 cxd4 12 Nxd4 Nxd4 13 Rxd4 Bd7 14 h4`, 'classica', 'Clássica: 9.Qd2 … 11.Qe3', '⩲',
    'Variante Clássica: com 4.Bg5 Be7 5.e5 Nfd7 6.Bxe7 Qxe7 as brancas trocam o bispo de casas escuras das pretas. O plano com f4, Qd2 e roque grande deixa as brancas com centro sólido e alguma iniciativa; as pretas jogam no flanco da dama.'],
  c08: [`${F7} 9 Qd2 Nc6 10 O-O-O Nb6 11 dxc5 Qxc5 12 Bd3 Bd7 13 Kb1 Rac8 14 Bxh7+ Kxh7`, 'classica', 'Clássica: 11.dxc5 … 14.Bxh7+', '∞',
    'Com 11.dxc5 e o sacrifício clássico em h7 o jogo fica selvagem; as chances se equilibram.'],
  c09: [`${F7} 9 dxc5 Nc6 10 Bd3 f6 11 exf6 Qxf6 12 g3 Nxc5 13 O-O Bd7 14 Qd2 Nxd3`, 'classica', 'Clássica: 9.dxc5', '⩲',
    'Com 9.dxc5 as brancas abrem o jogo; as pretas atacam o centro com ...f6, mas as brancas ficam um pouco melhor.'],
  c10: [`${BC} 6 Bxe7 Qxe7 7 Bd3 O-O 8 Nce2 c5 9 c3 f6 10 f4 fxe5 11 fxe5 cxd4 12 Nxd4 Nxe5 13 Bxh7+ Kxh7 14 Qh5+ Kg8`, 'classica', 'Clássica: 7.Bd3', '∓',
    'Com 7.Bd3 e 8.Nce2 as brancas tentam manter a cunha de peões no centro, mas as pretas a desfazem e ficam melhor.'],
  c11: [`${BC} 6 h4 Bxg5 7 hxg5 Qxg5 8 Qd3 g6 9 Nf3 Qe7 10 O-O-O Nc6 11 Qe3 Nb6 12 g4 Bd7 13 Rh6 O-O-O 14 g5 Na5`, 'chatard', 'Alekhine-Chatard: 6...Bxg5', '⩲',
    'Ataque Alekhine-Chatard: com 6.h4 as brancas oferecem um peão. As pretas fazem bem em aceitar; o peão a mais compensa a iniciativa das brancas, que ainda ficam um pouco melhor.'],
  c12: [`${BC} 6 h4 c5 7 Bxe7 Kxe7 8 f4 Qb6 9 Na4 Qc6 10 Nxc5 Nxc5 11 dxc5 Qxc5 12 Qd2 Nc6 13 O-O-O Bd7 14 Kb1`, 'chatard', 'Alekhine-Chatard: 6...c5', '⩲',
    'Com 6...c5 as pretas recusam o peão e atacam o centro; o rei preto fica no centro e as brancas ficam um pouco melhor. A coluna é análise da Enciclopédia Russa de Aberturas.'],
  c13: [`${MC} 7 bxc3 Ne4 8 Qg4 g6 9 Bd3 Nxd2 10 Kxd2 c5 11 Nf3 Nc6 12 Qf4 Qa5 13 dxc5 Qxc5`, 'maccutcheon', 'MacCutcheon: 8.Qg4 g6', '⩲',
    'Variante MacCutcheon: com 4...Bb4 as pretas contra-atacam em vez de recuar o bispo. O jogo é mais original que na Clássica, porque nenhum rei encontra abrigo seguro.'],
  c14: [`${MC} 7 bxc3 Ne4 8 Qg4 Kf8 9 Bd3 Nxd2 10 Kxd2 c5 11 Nf3 Nc6 12 dxc5 Qa5 13 Qf4 Qxc5`, 'maccutcheon', 'MacCutcheon: 8.Qg4 Kf8', '⩲',
    'Com 8...Kf8 as pretas defendem g7 com o rei; as brancas ficam um pouco melhor.'],
  c15: [`${MC} 7 Bxc3 Ne4 8 Bb4 c5 9 Bxc5 Nxc5 10 dxc5 Nd7 11 Qd4 Qc7 12 Nf3 Nxc5 13 Bd3 Bd7`, 'maccutcheon', 'MacCutcheon: 7.Bxc3', '=',
    'Com 7.Bxc3 as brancas mantêm a estrutura de peões; as pretas recuperam o peão e igualam. A coluna é Spielmann–Nimzowitsch, Gotemburgo 1920.'],
  c16: [`${B4} dxe4 5 Nxe4 Be7 6 Bxf6 Bxf6 7 Nf3 O-O 8 Qd2 b6 9 Nxf6+ Qxf6 10 Bd3 Bb7 11 Ng5 h6 12 Nh7 Qxd4 13 Nxf8 Kxf8`, 'burn', 'Burn: 6...Bxf6', '±',
    'Variante Burn: com 4...dxe4 as pretas evitam o avanço e5. As brancas ficam com uma pequena vantagem de espaço; a posição lembra a Variante Rubinstein.'],
  c17: [`${B4} dxe4 5 Nxe4 Be7 6 Bxf6 gxf6 7 Nf3 b6 8 Bc4 Bb7 9 Qe2 c6 10 O-O-O Qc7 11 Rhe1 Nd7 12 Kb1 O-O-O 13 Ba6 Bxa6`, 'burn', 'Burn: 6...gxf6', '⩲',
    'Com 6...gxf6 as pretas ficam com o par de bispos e a coluna g aberta, numa posição sólida mas apertada.'],
  c18: [`${B4} dxe4 5 Nxe4 Nbd7 6 Nf3 Be7 7 Nxf6+ Bxf6 8 h4 h6 9 Bxf6 Qxf6 10 Bc4 O-O 11 Qe2 c5 12 O-O-O cxd4 13 Rxd4 e5`, 'burn', 'Burn: 5...Nbd7', '⩲',
    'Com 5...Nbd7 a posição se parece muito com a Variante Rubinstein; as brancas mantêm a pressão.'],
}

const notas = [
  // Coluna 7
  ['c07', 'a', 'a', '(a)', '5 Bxf6 Bxf6 6 Nf3 c5 7 exd5 exd5 8 Bb5+ Nc6 9 O-O O-O 10 dxc5 Qa5', { a: '=', c: 'Com 5.Bxf6 as pretas igualam.' }],
  ['c07-a', '1', 'a', '(a) 6...O-O?!', '6... O-O 7 Bd3 c5 8 e5 Be7 9 h4', { a: '⩲', c: '6...O-O?! permite 8.e5 e 9.h4!.' }],
  ['c07', 'b', 'b', '(b)', '5... Ne4 6 Bxe7 Qxe7 7 Nxe4 dxe4 8 c3 c5 9 Qg4 cxd4 10 Qxg7 Rf8 11 Ne2 Nc6 12 Rd1', { a: '±', r: 'Zhelnin–Glek, Kharkov 1986', c: 'Com 5...Ne4 as brancas ficam melhor.' }],
  ['c07', 'c', 'c', '(c)', '7... a6 8 Nf3 c5 9 dxc5 Nc6 10 Bd3 Qxc5 11 Qd2 b5 12 O-O-O b4 13 Na4 Qa5 14 b3 Nc5 15 Nxc5 Qxc5 16 g4 a5 17 f5 a4 18 Kb1', { a: '⩲', r: 'Sutovsky–Thorhallsson, Reykjavík 2004', c: 'Com 7...a6 as brancas ficam um pouco melhor.' }],
  ['c07-c', '1', 'c', '(c) 9.Qd2', '9 Qd2 Nc6 10 O-O-O c4', { a: '∞', c: '9.Qd2 Nc6 10.O-O-O c4!? é uma faca de dois gumes.' }],
  ['c07-c', '2', 'c', '(c) 10...Nxc5', '10... Nxc5 11 O-O f5 12 exf6 Qxf6 13 Qe2 O-O 14 Ne5', { a: '±', r: 'Liberzon–Benzion, Israel 1974', c: 'Ou 10...Nxc5, e as brancas ficam melhor.' }],
  ['c07-c', '3', 'c', '(c) 11...Nb6', '11... Nb6 12 a3 Nc4 13 Bxc4 Qxc4 14 O-O-O', { a: '⩲', c: 'Ou 11...Nb6, também um pouco melhor para as brancas.' }],
  ['c07', 'd-A', 'd', '(d) A', '10... f6 11 exf6 Qxf6 12 g3 cxd4 13 Nxd4 Nc5 14 Bg2 Bd7 15 Rhe1', { a: '⩲', r: 'Ståhlberg–Keres, Kemeri 1937', c: 'As outras escolhas facilitam a tarefa das brancas.' }],
  ['c07', 'd-B', 'd', '(d) B', '10... a6 11 dxc5 Nxc5 12 Qe3 b5 13 Bd3 Nxd3+ 14 cxd3 f6 15 Rhf1 Bd7 16 Ne2 fxe5 17 Nxe5', { a: '±', r: 'Arnason–Dolmatov, Sochi 1988', c: 'Com 10...a6 11.dxc5! as brancas ficam melhor.' }],
  ['c07-d-B', '1', 'd', '(d) 11...Qxc5', '11... Qxc5 12 Bd3 b5 13 Bxh7+ Kxh7 14 Ng5+ Kg8 15 Qd3 Re8 16 Qh7+ Kf8 17 Qh5 Nd8 18 Nh7+ Kg8', { a: '+-', r: 'Chandler–Agnos, Londres 1989', c: 'Se 11...Qxc5, 12.Bd3 b5?! 13.Bxh7+! e o ataque é decisivo.' }],
  ['c07', 'd-C', 'd', '(d) C', '10... c4 11 Nb5 Nb6 12 h4 Bd7 13 Nd6 Rab8 14 h5', { a: '⩲', r: 'Bologan–Gleizerov, Calcutá 1999', c: 'Com 10...c4!?, 14.h5 (em vez de 14.f5?! f6! =) deixaria as brancas com chances um pouco melhores.' }],
  ['c07', 'e', 'e', '(e)', '12... Bd7 13 Kb1 Qc5 14 h4 Rac8 15 Rh3 Na5 16 Nb3 Qxe3 17 Rxe3 Nac4 18 Rf3', { a: '±', r: 'Larsen–Bareev, Hastings 1990', c: 'Com 12...Bd7 as brancas ficam com um final superior. É um tema comum na Clássica: as brancas ganham jogo nas casas escuras.' }],
  // Coluna 8
  ['c08', 'f-A', 'f', '(f) A', '12 h4 Bd7 13 h5 Rfc8 14 h6 g6 15 Nh2', { a: '⩲', r: 'Björnsson–Halldórsson, Reykjavík 2002', c: 'Com 12.h4, 15.Nh2! e 16.Ng4 dão a vantagem às brancas. (13...h6! era melhor para as pretas.)' }],
  ['c08', 'f-B', 'f', '(f) B', '12 Kb1 Bd7 13 Nb5 Na4 14 Nd6 f6', { a: '∓', r: 'Hjartarson–Brynell, Estocolmo 1996', c: 'Com 12.Kb1 e 14.Nd6?! as pretas ficam melhor com 14...f6!.' }],
  ['c08-f-B', '1', 'f', '(f) 13...Nxe5?', '13... Nxe5 14 Nxe5 Bxb5 15 b4', { a: '+-', c: '13...Nxe5? perde depois de 15.b4.' }],
  ['c08', 'g', 'g', '(g)', '13 Bxh7+ Kxh7 14 Ng5+ Kg8 15 Qd3 Rfe8 16 Qh7+ Kf8 17 Rhe1 Qb4 18 Qh8+ Ke7 19 Qh4 Kd8', { a: '∞', r: 'van der Wiel–Korchnoi, Amsterdã 1991', c: 'As brancas também podem sacrificar de imediato, numa posição complexa e provavelmente equilibrada.' }],
  ['c08', 'h-A', 'h', '(h) A', '15 Ng5+ Kg8 16 Qd3 Rfe8 17 Qh7+ Kf8 18 Qh5 Ke7 19 Nxf7 Na5 20 Nd6', { a: '∞', r: 'Sax–Timman, Roterdã 1989', c: 'Aqui os jogadores concordaram empate. As chances são equilibradas, mas o jogo seria selvagem e difícil.' }],
  ['c08', 'h-B', 'h', '(h) B', '13... Na5 14 Bxh7+ Kxh7 15 Ng5+ Kg8 16 Qd3 Rfe8 17 Qh7+ Kf8 18 Nce4 dxe4 19 Nxe4 Qc6 20 Rd6 Qb5 21 Qh8+ Ke7 22 Qh4+ Kf8', { a: '=', r: 'Glek–Morozevich, Campeonato Russo 1998', c: 'Com 13...Na5 (em vez de 13...Rac8) a partida seguiu igual até o lance 18 e terminou empatada.' }],
  // Coluna 9
  ['c09', 'i-A', 'i', '(i) A', '9 Bd3 cxd4 10 Bxh7+ Kxh7 11 Ng5+ Qxg5 12 fxg5 dxc3 13 Qh5+ Kg8 14 O-O Nxe5 15 Rae1 Ng6 16 Re3 e5 17 g4 Rd8 18 Rh3 Rd6 19 Qh7+ Kf8 20 Rh6 Rf6 21 Rxf6', { a: '+-', r: 'Szilagyi–Harding, por correspondência 1989', c: '9.Bd3 é traiçoeiro, esperando 9...cxd4? 10.Bxh7+!.' }],
  ['c09', 'i-B', 'i', '(i) B', '9 Bd3 f6 10 exf6 Qxf6 11 Ng5 Qxf4 12 Bxh7+ Kh8 13 Qh5 Nf6 14 Nf7+ Rxf7 15 Qxf7 Kxh7 16 Rf1 Qxd4 17 Rf3 Qg1+', { a: '∓', c: 'Depois de 9.Bd3 as pretas devem jogar 9...f6, com ótimas chances de vitória.' }],
  ['c09', 'j-A', 'j', '(j) A', '9... Qxc5 10 Qd2 Nc6 11 O-O-O Nb6', { c: '9...Qxc5 10.Qd2 Nc6 11.O-O-O Nb6 transpõe para a coluna anterior.' }],
  ['c09', 'j-B', 'j', '(j) B', '9... Nxc5 10 Qd2 Nc6 11 O-O-O a6 12 Qe3 b5 13 Bd3', { a: '⩲', c: '9...Nxc5 10.Bd3 costuma voltar à coluna, mas as brancas também podem jogar 10.Qd2, com pequena vantagem.' }],
  ['c09', 'k', 'k', '(k)', '14 Qe2 Nd4 15 Nxd4 Qxd4+ 16 Qf2 Qb4 17 a3 Qb6', { a: '=', c: 'Com 14.Qe2 fica igual.' }],
  ['c09', 'l', 'l', '(l)', '15 cxd3 e5 16 Rae1 exf4 17 Nxd5 Qd6 18 Nxf4 Bg4 19 Qe3 Rad8 20 h3 h6 21 h4', { a: '⩲', r: 'Ganguly–Ulibin, Abu Dhabi 2005', c: 'Depois de 15.cxd3 as brancas ficam um pouco melhor.' }],
  // Coluna 10
  ['c10', 'm-A', 'm', '(m) A', '7 Qd2 O-O 8 f4 c5 9 Nf3', { c: '7.Qd2 O-O 8.f4 c5 9.Nf3 transpõe para a coluna 7.' }],
  ['c10', 'm-B', 'm', '(m) B', '7 Qg4 O-O 8 Nf3 c5 9 Bd3 cxd4 10 Bxh7+ Kxh7 11 Qh5+ Kg8 12 Ng5 Qxg5 13 Qxg5 dxc3', { a: '∓', r: 'Alekhine', c: '7.Qg4?! dá vantagem às pretas (também 9...f5).' }],
  ['c10', 'n', 'n', '(n)', '8 Nf3 c5 9 dxc5 Nc6 10 Qe2 f6 11 exf6 Qxf6 12 O-O Nxc5', { a: '=', r: 'Savon–Rozentalis, Odessa 1989', c: '8.Nce2 tenta manter a cunha de peões central. Mais prudente é 8.Nf3, igual.' }],
  ['c10', 'o', 'o', '(o)', '15 Qxe5 Nc6 16 Nxc6 bxc6', { a: '∓', r: 'Keres', c: 'Depois de 15.Qxe5 as pretas ficam melhor.' }],
  // Coluna 11
  ['c11', 'p-A', 'p', '(p) A', '8 Nh3 Qe7 9 Nf4 g6 10 Qg4 Nc6 11 O-O-O h5 12 Qf3 Nb6 13 g4 h4', { a: '=', c: 'A linha mais antiga é 8.Nh3, igual.' }],
  ['c11', 'p-B', 'p', '(p) B', '8 Nb5 Qd8 9 Qg4 g6 10 c4 a6 11 Nc3', { a: '∞', r: 'Nataf–Thorhallsson, Reykjavík 2004', c: '8.Nb5!? dá jogo ativo pelo peão.' }],
  ['c11', 'q', 'q', '(q)', '8... Nc6 9 Nf3 Qg6 10 Qxg6 fxg6 11 Nb5 Ke7 12 Nxc7', { a: '±', r: 'Kasparov–Korchnoi, Zurique 2001', c: 'Com 8...Nc6 as brancas ficam melhor.' }],
  ['c11', 'r', 'r', '(r)', '10... a6 11 Qe3 c5 12 dxc5 Qxc5 13 Qf4 Nc6 14 Bd3 Qb4 15 Be4 dxe4 16 Nxe4', { a: '±', r: 'Grischuk–Brynell, Bundesliga 2002', c: 'Com 10...a6 as brancas ganham um ataque forte.' }],
  ['c11', 's', 's', '(s)', '15 Qf4 Nac4 16 Bxc4 dxc4 17 Nh2', { a: '⩲', r: 'Aabling–Grassle, Politiken Cup 2006', c: 'Depois de 15.Qf4 as brancas ficam um pouco melhor.' }],
  // Coluna 12
  ['c12', 't-A', 't', '(t) A', '6... a6 7 Qg4 Bxg5 8 hxg5 c5 9 dxc5 Nxe5 10 Qg3 Nbc6 11 O-O-O', { a: '±', r: 'Thiel–Jenssen, Hungria 1994', c: 'Os outros lances dão a vantagem às brancas.' }],
  ['c12', 't-B', 't', '(t) B', '6... f6 7 Qh5+ Kf8 8 exf6 Nxf6 9 Qe2 c5 10 dxc5 Na6 11 Nf3 Nxc5 12 O-O-O', { a: '⩲', r: 'Spassky–Guimard, Gotemburgo 1955', c: 'Com 6...f6 as brancas ficam um pouco melhor.' }],
  ['c12-t-B', '1', 't', '(t) 7...g6', '7... g6 8 exf6', { a: '±', c: 'Se 7...g6, 8.exf6!.' }],
  ['c12', 't-C', 't', '(t) C', '6... h6 7 Be3 c5 8 Qg4 Kf8 9 Nf3 Nc6 10 O-O-O', { a: '±', r: 'Dubinin–Rabinovich, Campeonato da URSS 1934', c: 'Com 6...h6 as brancas ficam melhor.' }],
  ['c12', 'u', 'u', '(u)', '7 Nb5 f6 8 Bd3 a6 9 Qh5+ Kf8 10 Rh3 axb5 11 Bh6 Qa5+ 12 Bd2 Qc7 13 Rg3 cxd4 14 Nf3 Nxe5 15 Rxg7 h6 16 Bh7 Kxg7 17 Qxh6+', { a: '=', r: 'Rossetto–Ståhlberg, Viña del Mar 1947', c: 'Com 7.Nb5 a partida terminou empatada (17...Kf7 18.Qh5+, xeque perpétuo).' }],
  ['c12', 'v', 'v', '(v)', '7... Qxe7 8 Nb5 O-O 9 Nc7 cxd4 10 Nxa8 f6 11 Qxd4 fxe5 12 Qc3 Nc6 13 Nf3 Nf6 14 O-O-O Ng4 15 Bb5', { a: '±', r: 'Fressinet–Larino Neto, Liga Espanhola 2004', c: 'Com 7...Qxe7 as brancas ficam melhor.' }],
  ['c12', 'w', 'w', '(w)', '9 Nf3 Qxb2 10 Nb5 a6 11 Rb1 Qxa2 12 Nd6 Qa5+ 13 Kf2', { a: '∞', r: 'Matulović–Zaradić, Zagreb 1955', c: 'As brancas também têm um perigoso sacrifício duplo de peões com 9.Nf3.' }],
  // Coluna 13
  ['c13', 'a-A', 'a', '(a) A', '3... Nc6 4 Nf3 Nf6 5 Bg5 Be7 6 e5 Ne4 7 Bxe7 Qxe7 8 Bd3 Qb4 9 Bxe4 dxe4 10 a3 Qxb2 11 Nxe4', { a: '±', r: 'Enciclopédia Russa', c: 'Duas tentativas raras das pretas no 3º lance; com 3...Nc6 as brancas ficam melhor.' }],
  ['c13', 'a-B', 'a', '(a) B', '3... Be7 4 Nf3 Nf6 5 Bd3 c5 6 exd5 cxd4 7 Bb5+ Bd7 8 Bxd7+ Qxd7 9 dxe6 Qxe6+ 10 Ne2', { a: '±', c: 'Com 3...Be7 também.' }],
  ['c13', 'b-A', 'b', '(b) A', '5 exd5 Qxd5 6 Bxf6 Bxc3+ 7 bxc3 gxf6 8 Qd2 Qa5 9 Bd3 Bd7 10 Ne2 Bc6 11 f3 Nd7 12 O-O O-O-O', { a: '=', r: 'Magem Badals–Glek 1996', c: 'Com 5.exd5 Qxd5! as pretas igualam.' }],
  ['c13-b-A', '1', 'b', '(b) 5...exd5?!', '5... exd5 6 Qf3 c6 7 Bxf6', { a: '⩲', c: '5...exd5?! 6.Qf3 deixa as brancas um pouco melhor.' }],
  ['c13', 'b-B', 'b', '(b) B', '5 Ne2 dxe4 6 a3 Be7 7 Bxf6 gxf6 8 Nxe4 f5 9 N4c3 b6', { a: '=', r: 'Kuijf–Ree, Amsterdã 1983', c: 'Com 5.Nge2 também fica igual.' }],
  ['c13', 'c-A', 'c', '(c) A', '6 Bh4 g5 7 Bg3 Ne4', { a: '=', c: 'd2 é a melhor casa para o bispo. Com 6.Bh4 as pretas igualam.' }],
  ['c13', 'c-B', 'c', '(c) B', '6 Bc1 Ne4 7 Qg4 Kf8 8 a3 Bxc3+ 9 bxc3 c5 10 Bd3 Nxc3 11 dxc5 Nc6 12 Bd2 f5 13 exf6 Qxf6 14 Qf3 Ne4', { a: '=', r: 'Malich–Fuchs, Alemanha Oriental 1963', c: 'Com 6.Bc1 também fica igual.' }],
  ['c13', 'c-C', 'c', '(c) C', '6 exf6 hxg5 7 fxg7 Rg8', { a: '=', c: 'Com 6.exf6 também fica igual.' }],
  ['c13', 'c-D', 'c', '(c) D', '6 Be3 Ne4 7 Qg4 Kf8 8 a3 Bxc3+ 9 bxc3 c5 10 Bd3 Nxc3 11 dxc5 Nc6 12 Nf3 f5 13 exf6 Qxf6', { a: '=', r: 'Klovans–Shereshevsky, URSS 1977', c: 'Com 6.Be3!? também fica igual.' }],
  ['c13', 'd', 'd', '(d)', '8 Bd3 Nxd2 9 Qxd2 c5 10 dxc5 Qc7 11 Qe3 O-O 12 Nf3 Nd7 13 O-O Nxc5 14 Nd4 Bd7', { a: '=', r: 'Fink–Stoppel, Viena 1966', c: 'Com 8.Bd3 as pretas igualam.' }],
  ['c13', 'e', 'e', '(e)', '9 Bc1 c5 10 Bd3 Nxc3 11 dxc5 Qa5 12 Bd2 Qa4 13 h3 Ne4 14 Ne2 Nxc5 15 Qf3 Qh4 16 O-O Nc6 17 g3 Qe7 18 Qe3', { a: '∞', r: 'Tal–Vooremaa, Tallinn 1981', c: 'Com 9.Bc1 as brancas ganham jogo ativo pelo peão.' }],
  ['c13', 'f', 'f', '(f)', '11 h4 Qa5 12 h5 g5 13 f4 cxd4 14 Nf3 dxc3+ 15 Ke2 Qa4', { a: '∓', r: 'Seirawan–Makarychev, Reykjavík 1990', c: '11.h4 é ambicioso demais: 15...Qa4! crava o peão de f.' }],
  ['c13', 'g-A', 'g', '(g) A', '11... c4 12 Be2 Nd7 13 h4 Qe7 14 a3 b6 15 Kc1 Bb7 16 Nd2 O-O-O 17 f4', { a: '⩲', r: 'de Firmian–Nakamura, Campeonato dos EUA 2006', c: 'Com 11...c4 as brancas ficam um pouco melhor.' }],
  ['c13', 'g-B', 'g', '(g) B', '11... Bd7 12 h4 Qe7 13 Qf4 Bc6 14 Nh2 Nd7 15 Ng4', { a: '⩲', r: 'Milos–Cubas, São Paulo 2005', c: 'Com 11...Bd7 e 14.Nh2! também.' }],
  ['c13', 'h', 'h', '(h)', '14 Nd4 Nxd4 15 Qxd4 Qxd4 16 cxd4 Bd7 17 a4 Bc6 18 a5', { a: '±', r: 'Tischbierek–Stock, Munique 1992', c: 'As brancas ficam com um final claramente melhor.' }],
  ['c13-h', '1', 'h', '(h) 15.cxd4', '15 cxd4', { a: '⩲', c: 'Também 15.cxd4 é bom.' }],
  // Coluna 14
  // O livro segue 16 Nf3 Qxc3+ 17 Kd2 Qxa1 18 Qf6 Rg8 19 h5, mas o rei branco já está em d2 desde 13.Kxd2.
  ['c14', 'i', 'i', '(i)', '9 h4 c5 10 Rh3 Qa5 11 Bd3 Nxd2 12 Rg3 g6 13 Kxd2 cxd4 14 Qxd4 Nc6 15 Qf4 d4 16 Nf3 Qxc3+', { a: '∞', c: 'Especulativo é o agudo 9.h4 de Maróczy. (O livro segue com 17.Kd2, impossível porque o rei já está em d2; a linha para em 16...Qxc3+.)' }],
  ['c14', 'j', 'j', '(j)', '11 h4 c4 12 Be2 Nc6 13 Rh3 Rg8 14 Rf3 Ke7', { a: '=', r: 'Jenni–Korchnoi, Zurique 2001', c: 'Com 11.h4 fica igual.' }],
  ['c14', 'k', 'k', '(k)', '11... c4 12 Be2 Nc6 13 Rhb1 Rb8 14 a4 b6', { a: '=', r: 'Lutz–Ivanchuk, Gotemburgo 2005', c: 'Com 11...c4 também fica igual; as brancas deviam tentar o plano de Short, 13.Qf4 e g4.' }],
  ['c14', 'l', 'l', '(l)', '14 Nd4 Bd7 15 Rhb1 b6 16 a4 Na5 17 Ba6', { a: '⩲', r: 'Kramer–von Heman, Bundesliga 2006', c: 'Depois de 14.Nd4 as brancas ficam um pouco melhor.' }],
  // Coluna 15
  ['c15', 'm-A', 'm', '(m) A', '8 Bd2 Nxd2 9 Qxd2 c5 10 dxc5 Nd7 11 Bb5 O-O 12 Bxd7 Bxd7', { a: '=', r: 'Psakhis', c: 'Com 8.Bd2 fica igual.' }],
  ['c15', 'm-B', 'm', '(m) B', '8 Ba5 O-O 9 Bd3 Nc6 10 Bc3 Nxc3 11 bxc3 f6', { a: '∓', r: 'Fischer–Petrosian, Candidatos de Curaçao 1962', c: '8.Ba5?! deixa as pretas melhor.' }],
  ['c15', 'n', 'n', '(n)', '9 dxc5 Nxf2 10 Kxf2 Qh4+', { a: '∓', c: '9.dxc5? é um erro: 9...Nxf2 10.Kxf2 Qh4+ e 11...Qxb4.' }],
  // Coluna 16
  ['c16', 'o', 'o', '(o)', '7... Bd7 8 Qd2 Bc6 9 Nxf6+ Qxf6 10 Ne5 O-O 11 O-O-O Nd7 12 Nxc6 bxc6 13 h4 Rab8 14 Rh3 c5 15 Qg5', { a: '±', r: 'Spassky–Petrosian, Campeonato Mundial 1966', c: 'Com 7...Bd7 e 13.h4! as brancas ficam melhor.' }],
  ['c16', 'p', 'p', '(p)', '8 c3 Nd7 9 Qc2 e5 10 O-O-O exd4 11 Nxd4 Qe7 12 h4 Nc5 13 Nxc5 Qxc5 14 Bd3 h6', { a: '=', r: 'Glek–Lputian, Antuérpia 1993', c: 'Com 8.c3 as pretas igualam com ...e5.' }],
  ['c16', 'q', 'q', '(q)', '8... Nd7 9 O-O-O b6 10 Bc4 Bb7 11 d5 b5 12 Bb3 c5 13 Nd6 Bxd5 14 Bxd5 exd5 15 Qxd5 Nb6 16 Qf5 g6 17 Qf4', { a: '±', r: 'Z. Almasi–Tukmakov, Pula 2001', c: 'Com 8...Nd7 e 11.d5! as brancas ficam melhor.' }],
  ['c16-q', '1', 'q', '(q) 10...c6', '10... c6 11 Qe3', { a: '⩲', c: 'Se 10...c6, 11.Qe3.' }],
  ['c16', 'r', 'r', '(r)', '11... g6 12 O-O-O Nc6 13 h4 Nxd4 14 h5 Bxg2 15 Nxh7 Kxh7 16 hxg6+ Kg8 17 Rh6 Nf3 18 gxf7+ Rxf7 19 Rxf6 Nxd2 20 Rg6+ Rg7 21 Rxg7+ Kxg7 22 Rg1 Nf3 23 Rxg2+ Kh8 24 Rg6', { a: '±', r: 'Sax–M. Gurevich, Interzonal de Manila 1990', c: '11...g6 leva a complicações perigosas.' }],
  ['c16-r', '1', 'r', '(r) 20...Kf8', '20... Kf8 21 Rxg2 Nf3 22 Bg6 Rf6 23 Bh7', { a: '±', c: 'Se 20...Kf8, 21.Rxg2.' }],
  ['c16', 's-A', 's', '(s) A', '14 c3 Qh4 15 g3 Qf6 16 Rf1 Nd7 17 f4 Nc5 18 O-O-O', { a: '±', r: 'Kindermann–Bareev, Pardubice 1994', c: 'Com 14.c3! as pretas ficam sem compensação suficiente pela qualidade.' }],
  ['c16-s-A', '1', 's', '(s) 14...Qe5+', '14... Qe5+ 15 Be2', { c: 'Se 14...Qe5+, 15.Be2 ameaça 16.Qd8 mate.' }],
  ['c16-s-A', '2', 's', '(s) 16.O-O!?', '16 O-O Qf3 17 Be4', { c: 'Ou 16.O-O!? Qf3?? 17.Be4.' }],
  ['c16', 's-B', 's', '(s) B', '13... Qxb2 14 Bh7+ Kh8 15 O-O Na6 16 Nxe6 Kxh7 17 Nd8 Be4 18 Nxf7', { a: '⩲', c: 'As pretas poderiam tentar o estranho 13...Qxb2!?, mas as brancas seguem melhor.' }],
  // Coluna 17
  ['c17', 't', 't', '(t)', '7... f5 8 Nc3 Bf6 9 Qd2 c5 10 d5 O-O 11 O-O-O e5 12 h4 Nd7 13 d6 Nb6 14 Qe3 e4 15 Ng5 Bd7 16 g4 Bd4 17 Rxd4 cxd4 18 Qxd4 f6 19 Bc4+ Nxc4 20 Qxc4+ Kg7 21 Ne6+', { a: '±', r: 'Lau–Sakaev, Dortmund 1991', c: '7...f5 é ativo, mas enfraquece casas; as brancas ficaram claramente melhor.' }],
  ['c17-t', '1', 't', '(t) 10...exd5', '10... exd5 11 Qe3+ Be6 12 Qxc5', { c: 'Se 10...exd5, 11.Qe3+ e 12.Qxc5.' }],
  // O livro escreve 9...Bf6, mas f6 está ocupada pelo peão; o lance é 9...Bf8.
  ['c17', 'u', 'u', '(u)', '8 Qd2 Nd7 9 Qh6 Bf8 10 Qf4 Bb7 11 O-O-O', { a: '⩲', r: 'Botvinnik–Guimard, Groningen 1946', c: 'As brancas deviam considerar 8.Qd2 (melhor para as pretas é 8...Bb7). (O livro escreve 9...Bf6, impossível com o peão em f6; o bispo vai para f8 atacando a dama.)' }],
  ['c17', 'v', 'v', '(v)', '14 Qxa6+ Kb8 15 Qe2 Rhe8 16 c3 Nf8 17 g3', { a: '⩲', r: 'Leko–U. Andersson, Úbeda 1997', c: 'Esta variante dá às pretas uma posição sólida, mas apertada.' }],
  // Coluna 18
  ['c18', 'w', 'w', '(w)', '6 Nxf6+ Nxf6 7 Nf3', { c: '6.Nxf6+ Nxf6 7.Nf3 transpõe para a Variante Rubinstein (coluna 19).' }],
  ['c18', 'x', 'x', '(x)', '7... Nxf6 8 Bd3 c5 9 dxc5 Qa5+ 10 c3 Qxc5 11 Qe2 Bd7 12 Ne5 Bc6 13 h4 Rd8 14 O-O-O', { a: '⩲', r: 'Spassky–Petrosian, Campeonato Mundial 1966', c: '7...Nxf6 é passivo.' }],
  ['c18', 'y', 'y', '(y)', '8... c5 9 dxc5 Nxc5 10 Qxd8+ Bxd8 11 O-O-O f6 12 Bb5+ Bd7 13 Bxd7+ Nxd7 14 Be3', { a: '⩲', r: 'Nataf–Rustemov, Bundesliga 2005', c: 'Com 8...c5 as damas saem, mas as brancas ficam um pouco melhor.' }],
  ['c18', 'z', 'z', '(z)', '14 Rd2 a6 15 Re1 Re8 16 Qe4 Nc5 17 Qe3', { a: '⩲', r: 'Shabalov–Schwartzman, Campeonato dos EUA 1997', c: 'Depois de 14.Rd2 as pretas ficam sob pressão.' }],
]

const capitulo = {
  id: 'francesa-b',
  arquivo: 'francesa-b',
  nome: 'Francesa — 3.Nc3 Nf6 4.Bg5',
  fonte: 'Modern Chess Openings — French Defense (pp. 206–211), colunas 7–18',
  base: '1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5',
  corPadrao: 'b',
  ordem: 206,
  grupos: [
    { id: 'classica', nome: 'Clássica (4...Be7 5.e5 Nfd7)', colunas: [7, 8, 9, 10] },
    { id: 'chatard', nome: 'Ataque Alekhine-Chatard (6.h4)', colunas: [11, 12] },
    { id: 'maccutcheon', nome: 'MacCutcheon (4...Bb4)', colunas: [13, 14, 15] },
    { id: 'burn', nome: 'Burn (4...dxe4)', colunas: [16, 17, 18] },
  ],
}

module.exports = { capitulo, colunas, notas }
