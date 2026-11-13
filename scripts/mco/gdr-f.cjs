// Transcrição do MCO 15ª ed. — Gambito da Dama Recusado, Variante Lasker (pp. 406–408), colunas 31–36.
// Gerar: node scripts/mco/gerar.cjs gdr-f
// Formato: ver gambito-do-rei.cjs. Dicas em gdr-f-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Correções: na nota (a) o livro numera "11 0-0" depois de 13 Be2 Rd6 (é 14 O-O).
// Na nota (d) o livro traz 16 Qxf3, impossível (o peão de e3 bloqueia a dama de c3); a linha ficou até 15...Bxf3.
// Na nota (f) o livro traz 16...Rfc8, mas a torre de f8 já foi a d8; ficou 16...Rac8.
// Na nota (w) o livro traz 12...cxd5 (o peão preto está em e6); ficou 12...exd5.
// Na nota (dd) o livro traz 16...cxd4 17 ex4; ficou 16...exd4 17 exd4.
// Na nota (ee) o livro traz 18...Nd3+, mas há um bispo branco em d3; ficou 18...Nxd3+.

const B = '1 d4 d5 2 c4 e6 3 Nc3 Nf6 4 Bg5 Be7 5 e3 O-O 6 Nf3 h6 7 Bh4 Ne4 8 Bxe7 Qxe7'

const colunas = {
  c31: [`${B} 9 cxd5 Nxc3 10 bxc3 exd5 11 Qb3 Rd8 12 c4 dxc4 13 Bxc4 Nc6 14 Be2 b6 15 O-O Bb7`, 'cxd5', '11.Qb3 Rd8', '=',
    'Na Variante Lasker as pretas trocam peças com ...Ne4 para aliviar a posição. Depois de 9.cxd5 Nxc3 10.bxc3 exd5 11.Qb3 Rd8 12.c4 dxc4 as brancas ficam com o peão d isolado, mas as pretas se desenvolvem e igualam (Deep Fritz–Kramnik, 2002).'],
  c32: [`${B} 9 cxd5 Nxc3 10 bxc3 exd5 11 Qb3 Qd6 12 c4 dxc4 13 Bxc4 Nd7 14 O-O Nb6 15 Rfc1 Nxc4`, 'cxd5', '11...Qd6', '⩲',
    'Com 11...Qd6 a dama defende b6 e c6. Depois de 12.c4 dxc4 13.Bxc4 Nd7 14.O-O Nb6 as pretas trocam o bispo branco, mas as brancas ficam com uma pequena vantagem no final (Flohr–Denker, Groningen 1946).'],
  c33: [`${B} 9 Rc1 c6 10 Bd3 Nxc3 11 Rxc3 Nd7 12 O-O dxc4 13 Bxc4 b6 14 Qe2 a5 15 Rfc1 Bb7`, 'rc1', '9.Rc1 c6 11...Nd7', '⩲',
    'Com 9.Rc1 as brancas mantêm a tensão. Depois de 9...c6 10.Bd3 Nxc3 11.Rxc3 Nd7 as pretas trocam em c4 e desenvolvem o bispo em b7, mas as brancas ficam com uma pequena vantagem (Epishin–Vaganian, Reggio Emilia 1995).'],
  c34: [`${B} 9 Rc1 c6 10 Bd3 Nxc3 11 Rxc3 dxc4 12 Bxc4 Nd7 13 O-O e5 14 Bb3 exd4 15 exd4 Nf6`, 'rc1', '11...dxc4 13...e5', '=',
    'Com 11...dxc4 e 13...e5 as pretas liberam o bispo de c8. Depois de 14.Bb3 exd4 15.exd4 Nf6 as brancas ficam com o peão isolado; com jogo exato, as pretas mantêm o equilíbrio (Karpov–Yusupov, Londres 1989).'],
  c35: [`${B} 9 Qc2 Nxc3 10 Qxc3 dxc4 11 Bxc4 b6 12 O-O Bb7 13 Be2 Rc8 14 b4 Nd7 15 Rfc1 c5`, 'qc2', '9.Qc2 Nxc3', '⩲',
    'Com 9.Qc2 as brancas recapturam em c3 com a dama. Depois de 10...dxc4 11.Bxc4 b6 as pretas desenvolvem o bispo em b7 e preparam ...c5; as brancas ficam com uma pequena vantagem (Psakhis–Yusupov, Baden-Baden 1992).'],
  c36: [`${B} 9 Qc2 c6 10 Nxe4 dxe4 11 Qxe4 Qb4+ 12 Nd2 Qxb2 13 Rb1 Qxa2 14 Bd3 f5 15 Qe5 Qa3`, 'qc2', '9...c6 10.Nxe4', '∞',
    'Com 9...c6 as pretas deixam as brancas ganharem um peão: 10.Nxe4 dxe4 11.Qxe4 Qb4+ e a dama preta recupera material na ala da dama. As brancas ficam com compensação indefinida pelo peão.'],
}

const notas = [
  // Coluna 31
  ['c31', 'a', 'a', '(a)', '6... Ne4 7 Bxe7 Qxe7 8 cxd5 Nxc3 9 bxc3 exd5 10 Qb3 Rd8 11 c4 dxc4 12 Bxc4 Nc6 13 Be2 Rd6 14 O-O', { a: '⩲', r: 'Beliavsky', c: 'Intercalar 6...h6 é a forma moderna: as pretas abrem um respiro para o rei e tiram o peão h do alcance. Com 6...Ne4 de imediato, 7.Bxe7 Qxe7 8.cxd5 Nxc3 9.bxc3 exd5 10.Qb3 dá pequena vantagem às brancas (Beliavsky). (O livro numera o último lance "11 0-0"; é 14.O-O.)' }],
  ['c31', 'b', 'b', '(b)', '11 Bd3 c5 12 O-O Nc6 13 h3 Be6 14 Re1 Rfd8', { a: '=', r: 'Uhlmann–Averbakh, Polanica Zdrój 1975', c: '11.Bd3 também é possível: 11...c5 12.O-O Nc6 13.h3 Be6 14.Re1 Rfd8 foi igual.' }],
  ['c31-b', '1', 'b', '(b) 12...Bg4', '12... Bg4', { c: '12...Bg4 também é possível.' }],
  ['c31', 'c', 'c', '(c)', '12... Be6 13 cxd5 Bxd5 14 Bc4 Bxf3 15 gxf3', { a: '=', r: 'Sasikiran–Korneev, Córsega 2003 (empate)', c: '12...Be6 13.cxd5 Bxd5 14.Bc4 Bxf3 15.gxf3, e os jogadores concordaram empate.' }],
  ['c31-c', '1', 'c', '(c) 13.Qxb7', '13 Qxb7 Qa3 14 Nd2 dxc4', { a: '=', c: '13.Qxb7 Qa3 14.Nd2 dxc4 também é igual.' }],
  ['c31', 'd', 'd', '(d)', '14 Qc3 Bg4 15 O-O Bxf3', { a: '=', r: 'Atalik–Lamoureux, Antália 2006', c: '14.Qc3 Bg4 15.O-O Bxf3 levou à igualdade. (O livro segue com 16.Qxf3, impossível, porque o peão de e3 bloqueia a dama; a linha ficou até aqui.)' }],
  ['c31', 'e', 'e', '(e)', '14... Rd6 15 O-O Be6 16 Qb2 Bd5', { a: '⩲', r: 'Ivkov–Wexler, Buenos Aires 1960', c: '14...b6 é uma ideia recente. O plano antigo era 14...Rd6 15.O-O Be6 16.Qb2 Bd5, um pouco melhor para as brancas; 14...Na5, 14...Qb4, 14...Nb4 e 14...Bg4 não igualam.' }],
  ['c31', 'f', 'f', '(f)', '16 Rfc1 Rac8 17 Qa4 Na5 18 Rc3 c5 19 Rac1 cxd4', { a: '=', r: 'Deep Fritz–Kramnik, match 2002', c: '16.Rfc1 Rac8 17.Qa4 Na5 18.Rc3 c5 19.Rac1 cxd4 foi igual. (O livro traz 16...Rfc8, mas a torre de f8 já está em d8.)' }],
  // Coluna 32
  ['c32', 'g', 'g', '(g)', '11... c6 12 Be2 Nd7 13 O-O Nf6 14 c4 dxc4 15 Bxc4', { a: '⩲', r: 'Neishtadt', c: '11...c6 também é jogável: 12.Be2 (12.Bd3 e 12.c4 também são possíveis) 12...Nd7 13.O-O Nf6 14.c4 dxc4 15.Bxc4 dá pequena vantagem às brancas.' }],
  ['c32', 'h', 'h', '(h)', '12 Bd3 Nd7 13 O-O c5 14 Qa3 Qc7 15 Rfb1 b6', { a: '=', r: 'Bilek–Donner, Budapeste 1961', c: '12.Bd3 é manso demais: 12...Nd7 13.O-O c5 14.Qa3 Qc7 15.Rfb1 b6 foi completamente igual.' }],
  ['c32', 'i', 'i', '(i)', '13... Nc6 14 Qc3 b6 15 O-O Bb7 16 Rac1 Na5', { a: '⩲', r: 'Gligorić–O. Bernstein, Iugoslávia–França 1956', c: '13...Nc6 14.Qc3 b6 15.O-O Bb7 16.Rac1 Na5 deu pequena vantagem às brancas.' }],
  ['c32-i', '1', 'i', '(i) 14...Bg4', '14... Bg4 15 Be2 Ne7 16 O-O', { a: '⩲', r: 'Gilg–Keller, Alemanha 1940', c: '14...Bg4 15.Be2 Ne7 16.O-O também é um pouco melhor para as brancas.' }],
  ['c32', 'j', 'j', '(j)', '14... c5 15 Qa3 b6 16 e4 Bb7 17 e5 Qe7 18 Rfe1 b5 19 Bxb5 Bxf3 20 gxf3', { a: '⩲', r: 'Pachman', c: '14...c5 15.Qa3 b6 16.e4 Bb7 17.e5 Qe7 18.Rfe1 b5 19.Bxb5 dá pequena vantagem às brancas (Pachman).' }],
  ['c32', 'k', 'k', '(k)', '16 Qxc4 c6 17 a4 Be6 18 Qc5 Qxc5 19 dxc5', { a: '⩲', r: 'Flohr–Denker, Groningen 1946', c: 'Depois de 16.Qxc4 c6 17.a4 Be6 18.Qc5 Qxc5 19.dxc5 as brancas ficaram com pequena vantagem no final.' }],
  // Coluna 33
  ['c33', 'l-A', 'l', '(l) A', '9... Nf6 10 Qc2 Rd8 11 a3 dxc4 12 Bxc4 c5', { a: '=', r: 'Farago–Andersson, Wijk aan Zee 1988', c: '9...Nf6 10.Qc2 Rd8 11.a3 dxc4 12.Bxc4 c5 foi mais ou menos igual.' }],
  ['c33', 'l-B', 'l', '(l) B', '9... Rd8 10 Qc2 Nc6 11 a3 Nxc3 12 Qxc3', { a: '⩲', r: 'Osnos–Shabanov, URSS 1973', c: '9...Rd8 10.Qc2 Nc6 11.a3 Nxc3 12.Qxc3 é um pouco melhor para as brancas.' }],
  ['c33', 'm', 'm', '(m)', '10 Qc2 Nxc3 11 Qxc3 Nd7 12 a3 dxc4 13 Bxc4 b6', { a: '=', r: 'Petrosian–Spassky, Moscou 1969', c: '10.Qc2 Nxc3 11.Qxc3 Nd7 12.a3 dxc4 13.Bxc4 b6 é igual.' }],
  ['c33', 'n', 'n', '(n)', '12 cxd5 exd5 13 O-O Re8 14 Qb1', { a: '⩲', r: 'Ivanišević–Korneev, Nova Gorica 2007', c: '12.cxd5 exd5 13.O-O Re8 14.Qb1 dá só uma vantagem mínima às brancas.' }],
  ['c33', 'o', 'o', '(o)', '14 Bd3 c5 15 Be4 Rb8 16 Qa4 Bb7 17 Bxb7 Rxb7', { a: '=', r: 'Lysyj–Lputian, Sóchi 2007', c: '14.Bd3 c5 15.Be4 Rb8 16.Qa4 Bb7 17.Bxb7 Rxb7 é igual.' }],
  ['c33', 'p', 'p', '(p)', '16 h3 c5 17 Bb5 e5 18 dxe5', { a: '⩲', r: 'Epishin–Vaganian, Reggio Emilia 1995', c: 'Epishin–Vaganian seguiu 16.h3 (novidade segundo Epishin; antes se jogava 16.Bd3) 16...c5 17.Bb5 e5 18.dxe5, com pequena vantagem branca.' }],
  // Coluna 34
  ['c34', 'q', 'q', '(q)', '12 Rxc4 Nd7 13 Bb1 e5 14 Qc2 f5 15 dxe5 Nxe5', { a: '⩲', r: 'Polugaevsky–Augustin, Lugano 1968', c: '12.Rxc4, com a ideia de montar uma bateria contra h7, é uma alternativa plausível: 12...Nd7 13.Bb1 e5 14.Qc2 f5 15.dxe5 Nxe5 é um pouco melhor para as brancas.' }],
  ['c34', 'r', 'r', '(r)', '13... b6 14 Bd3 c5 15 Bb5 Rd8 16 Bc6 Rb8', { a: '=', r: 'Smyslov–Kasparov, Vilnius 1984', c: '13...b6 é bem possível aqui: 14.Bd3 c5 15.Bb5 Rd8 16.Bc6 Rb8 é igual.' }],
  ['c34', 's-A', 's', '(s) A', '14... Re8 15 d5 cxd5 16 Qxd5 Nf6', { r: 'P. Nikolić–Yusupov', c: 'Talvez 14...Re8 15.d5 cxd5 16.Qxd5 Nf6 seja uma alternativa mais segura.' }],
  ['c34', 's-B', 's', '(s) B', '14... e4 15 Nd2 Nf6 16 Qc2 Re8', { r: 'Polugaevsky–Mikhalchishin, URSS 1978', c: 'Ou 14...e4 15.Nd2 Nf6 16.Qc2 Re8, também mais seguro.' }],
  ['c34', 't', 't', '(t)', '16 Re1 Qd6 17 Ne5 Be6 18 Bxe6 fxe6 19 Qb3 Qxd4', { a: '=', r: 'Karpov–Yusupov, Londres 1989', c: 'Karpov–Yusupov seguiu 16.Re1 Qd6 17.Ne5, e Yusupov poderia ter mantido o equilíbrio com 17...Be6 18.Bxe6 fxe6 19.Qb3 Qxd4 (Beliavsky).' }],
  ['c34-t', '1', 't', '(t) 19.Rg3', '19 Rg3', { r: 'Makarichev', c: 'Makarichev sugere 19.Rg3.' }],
  // Coluna 35
  ['c35', 'u', 'u', '(u)', '10... c6 11 cxd5 exd5 12 Bd3 Nd7 13 O-O Nf6', { a: '⩲', r: 'Teschner–Vidmar, Cottbus 1942', c: '10...c6 11.cxd5 exd5 12.Bd3 Nd7 13.O-O Nf6 é um pouco melhor para as brancas.' }],
  ['c35', 'v', 'v', '(v)', '11... c5 12 O-O Nc6 13 dxc5 Qxc5 14 Rac1 Rd8 15 a3 Bd7 16 b4', { a: '⩲', r: 'Onischuk–Vaganian, Moscou 2002', c: 'O imediato 11...c5 foi tentado: depois de 12.O-O Nc6 13.dxc5 Qxc5 14.Rac1 Rd8 15.a3 Bd7 16.b4 as brancas ficaram com pequena vantagem.' }],
  ['c35', 'w', 'w', '(w)', '12 d5 exd5 13 Bxd5 c6 14 Bc4 Bb7 15 Ne5 b5 16 Bb3 Qc7 17 a4 Nd7 18 Ng6 Rfe8 19 axb5 Rac8 20 O-O c5 21 Nf4 c4 22 Bc2', { a: '⩲', r: 'Lobron–Yusupov, Munique 1993', c: '12.d5 foi jogado em Lobron–Yusupov; depois de 12...exd5 13.Bxd5 c6 14.Bc4 Bb7 15.Ne5 b5 as brancas mantiveram pequena vantagem. (O livro traz 12...cxd5, mas o peão preto está em e6.)' }],
  ['c35', 'x', 'x', '(x)', '13... c5 14 dxc5 Rc8 15 b4 bxc5 16 b5 a6 17 Nd2 axb5 18 Bxb5 Bxg2 19 Kxg2 Qb7+ 20 Kh3 Qxb5', { a: '∞', r: 'Hübner–Yusupov, Munique 1993', c: 'O imediato 13...c5 foi jogado em Hübner–Yusupov: 14.dxc5 Rc8 15.b4 bxc5 16.b5 a6 17.Nd2 axb5 18.Bxb5 Bxg2 19.Kxg2 Qb7+ 20.Kh3 Qxb5 é indefinido.' }],
  ['c35-x', '1', 'x', '(x) 17.a4', '17 a4 axb5 18 axb5 Nd7 19 Nd2', { a: '⩲', r: 'Hübner', c: 'Hübner diz que 17.a4 axb5 18.axb5 Nd7 19.Nd2 é um pouco melhor para as brancas.' }],
  ['c35', 'y', 'y', '(y)', '14... c5 15 dxc5 bxc5 16 b5 Nd7 17 a4 a6 18 Rfc1 axb5 19 Bxb5 Bc6 20 Bxc6 Rxc6', { a: '⩲', r: 'Zsu. Polgar–Chiburdanidze, São Petersburgo 1995', c: '14...c5 15.dxc5 bxc5 16.b5 Nd7 17.a4 a6 18.Rfc1 axb5 19.Bxb5 Bc6 20.Bxc6 Rxc6 é um pouco melhor para as brancas.' }],
  ['c35-y', '1', 'y', '(y) 19...c4', '19... c4', { r: 'Zsu. Polgar', c: 'Zsuzsa Polgar sugere 19...c4.' }],
  ['c35', 'z', 'z', '(z)', '16 dxc5 bxc5 17 b5 a6 18 a4 c4', { a: '⩲', r: 'Psakhis–Yusupov, Baden-Baden 1992', c: 'Depois de 16.dxc5 bxc5 17.b5 a6 18.a4 c4 as brancas ficaram com vantagem.' }],
  ['c35-z', '1', 'z', '(z) 18...axb5', '18... axb5 19 Bxb5 Bxf3 20 gxf3', { a: '⩲', r: 'Psakhis', c: 'Psakhis sugere 18...axb5 19.Bxb5 Bxf3 20.gxf3, ainda um pouco melhor para as brancas.' }],
  // Coluna 36
  ['c36', 'aa-A', 'aa', '(aa) A', '9... Nf6 10 cxd5 exd5 11 Bd3 c6 12 O-O Be6 13 Rab1 a5', { a: '⩲', r: 'Lengyel–Kotov, Amsterdã 1968', c: '9...Nf6 10.cxd5 exd5 11.Bd3 c6 12.O-O Be6 13.Rab1 a5 foi um pouco favorável às brancas.' }],
  ['c36', 'aa-B', 'aa', '(aa) B', '9... Rd8 10 Bd3 Nxc3 11 Qxc3 c6 12 O-O Nd7 13 Rfd1', { a: '⩲', r: 'Geller–Moiseev, URSS 1952', c: '9...Rd8 10.Bd3 Nxc3 11.Qxc3 c6 12.O-O Nd7 13.Rfd1 é um pouco melhor para as brancas.' }],
  ['c36', 'bb-A', 'bb', '(bb) A', '10 Be2 Nd7 11 O-O', { a: '=', r: 'Kotov–Pilnik, Estocolmo 1952', c: '10.Be2 Nd7 11.O-O é igual.' }],
  ['c36', 'bb-B', 'bb', '(bb) B', '10 Bd3 Nxc3 11 Qxc3 dxc4 12 Bxc4 Nd7 13 O-O b6 14 e4 Bb7 15 Rfe1 c5', { a: '=', c: '10.Bd3 Nxc3 11.Qxc3 dxc4 12.Bxc4 Nd7 13.O-O b6 14.e4 Bb7 15.Rfe1 c5! é igual.' }],
  ['c36-bb-B', '1', 'bb', '(bb) B 15...Rfe8', '15... Rfe8 16 Rad1 c5 17 Bb5 Red8 18 d5', { a: '⩲', r: 'M. Gurevich–Chigladze, Cap d\'Agde 2003', c: 'Não 15...Rfe8 16.Rad1 c5 17.Bb5 Red8 18.d5, um pouco melhor para as brancas.' }],
  ['c36', 'cc', 'cc', '(cc)', '13 Qb1 Qc3 14 Qc1 Qxc1+ 15 Rxc1 Nd7 16 Be2 c5', { a: '=', r: 'Trifunović–Najdorf, Iugoslávia 1949', c: '13.Qb1 Qc3 14.Qc1 Qxc1+ 15.Rxc1 Nd7 16.Be2 c5 é igual. As brancas precisam sacrificar o peão a se quiserem buscar vantagem.' }],
  ['c36', 'dd', 'dd', '(dd)', '13... Qc3 14 Qd3 Qa5 15 Be2 e5 16 O-O exd4 17 exd4 Bf5 18 Ne4 Re8 19 Bf3', { a: '⩲', r: 'Taimanov–Cvetkov, Moscou 1956', c: '13...Qc3 14.Qd3 Qa5 15.Be2 e5 16.O-O exd4 17.exd4 Bf5 18.Ne4 Re8 19.Bf3 deu pequena vantagem às brancas. (O livro traz 16...cxd4 17.ex4, que não fazem sentido; ficou 16...exd4 17.exd4.)' }],
  ['c36', 'ee', 'ee', '(ee)', '15 Qh4 c5 16 dxc5 Qa3 17 Ke2 Nd7', { a: '∓', c: '15.Qh4 c5 é ruim para as brancas: 16.dxc5 Qa3 17.Ke2 Nd7.' }],
  ['c36-ee', '1', 'ee', '(ee) 16.Ke2', '16 Ke2 cxd4 17 Ra1 Qb2 18 Rhb1 Qc3', { a: '∓', c: '16.Ke2 cxd4 17.Ra1 Qb2 18.Rhb1 Qc3 também é ruim para as brancas.' }],
  ['c36-ee', '2', 'ee', '(ee) 16.d5', '16 d5 Nd7 17 dxe6 Ne5 18 e7 Nxd3+', { a: '∓', c: '16.d5 Nd7 17.dxe6 Ne5 18.e7 Nxd3+ também é ruim para as brancas. (O livro traz 18...Nd3+, mas há um bispo branco em d3.)' }],
  ['c36', 'ff', 'ff', '(ff)', '16 Ke2 Qe7 17 c5 Nd7 18 Qc7 e5 19 Nf3 exd4 20 Nxd4 Qe5 21 Qxe5 Nxe5 22 f4 Nxd3 23 Kxd3', { a: '∞', c: '16.Ke2 Qe7 17.c5 Nd7 18.Qc7 e5 19.Nf3 exd4 20.Nxd4 Qe5 21.Qxe5 Nxe5 22.f4 Nxd3 23.Kxd3: as brancas têm compensação indefinida pelo peão.' }],
]

const capitulo = {
  id: 'gdr-f',
  arquivo: 'gdr-f',
  nome: 'Gambito da Dama Recusado — Variante Lasker (7...Ne4)',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Declined (pp. 406–408), colunas 31–36',
  base: '1. d4 d5 2. c4 e6',
  corPadrao: 'b',
  ordem: 406,
  grupos: [
    { id: 'cxd5', nome: '9.cxd5', colunas: [31, 32] },
    { id: 'rc1', nome: '9.Rc1', colunas: [33, 34] },
    { id: 'qc2', nome: '9.Qc2', colunas: [35, 36] },
  ],
}

module.exports = { capitulo, colunas, notas }
