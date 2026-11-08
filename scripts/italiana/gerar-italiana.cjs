// Gera data/openings/italiana.json a partir da transcrição das pp. 18–25 do MCO.
// Uso (na raiz do projeto): node scripts/italiana/gerar-italiana.cjs
// Os textos ficam nos arquivos ao lado: evans-dados.cjs (colunas 19–24), ameacas-dados.cjs (ameaças e armadilhas),
// planos-dados.cjs (planos de meio-jogo) e dicas-italiana-*.json (dica do desvio e comentário de cada nota; "obs" é só para revisão).
// Não edite data/openings/italiana.json à mão: ele é reescrito por este script.
const fs = require('fs')
const { createRequire } = require('module')
const raiz = process.argv[2] ?? require('path').resolve(__dirname, '../..')
const { Chess } = createRequire(raiz + '/package.json')('chess.js')

const T = '1 e4 e5 2 Nf3 Nc6 3 Bc4 Bc5'
const A = `${T} 4 c3 Nf6 5 d4 exd4`
const P = `${T} 4 c3 Nf6 5 d3`

const colunas = {
  c01: [`${A} 6 cxd4 Bb4+ 7 Bd2 Bxd2+ 8 Nbxd2 d5 9 exd5 Nxd5 10 Qb3 Na5 11 Qa4+ Nc6 12 Bb5 Qe7+ 13 Ne5 Bd7`, 'moller', '6.cxd4 Bb4+ 7.Bd2 — antiga linha principal', '=',
    'A troca de bispos alivia a posição e as pretas atacam o centro com 8...d5. A antiga linha principal termina em igualdade.'],
  c02: [`${A} 6 cxd4 Bb4+ 7 Kf1?! d5 8 exd5 Nxd5 9 Nc3 Be6 10 Qe2 Bxc3 11 bxc3 Nxc3 12 Qe1 Nd5 13 Ba3 a6`, 'moller', '6.cxd4 Bb4+ 7.Kf1?!', '∓',
    'As brancas abrem mão do roque e não obtêm compensação suficiente. As pretas ganham um peão e ficam melhor.'],
  c03: [`${A} 6 cxd4 Bb4+ 7 Nc3 Nxe4 8 O-O Bxc3 9 d5 Bf6 10 Re1 Ne7 11 Rxe4 d6 12 Bg5 Bxg5 13 Nxg5 h6`, 'moller', 'Ataque Möller: 7.Nc3 Nxe4 8.O-O Bxc3 9.d5 Bf6', '∓',
    'O Ataque Möller oferece um peão por linhas abertas e desenvolvimento. Com defesa precisa, as pretas ficam com o peão e uma leve vantagem.'],
  c04: [`${A} 6 cxd4 Bb4+ 7 Nc3 Nxe4 8 O-O Bxc3 9 d5 Ne5 10 bxc3 Nxc4 11 Qd4 O-O 12 Qxe4 Nd6 13 Qf4 Ne8`, 'moller', 'Ataque Möller: 9.d5 Ne5', 'brancas com compensação quase suficiente',
    'As pretas ficam com um peão a mais. Com 14.Qg3 e a ideia de 15.Bg5, as brancas obtêm compensação quase suficiente.'],
  c05: [`${A} 6 cxd4 Bb4+ 7 Nc3 d5 8 exd5 Nxd5 9 O-O Be6 10 Bg5 Be7 11 Bxd5 Bxd5 12 Nxd5 Qxd5 13 Bxe7 Nxe7`, 'moller', '7.Nc3 d5 — Steinitz–von Bardeleben', '∞',
    'As pretas simplificam, mas o rei fica no centro. É a base da célebre partida Steinitz–von Bardeleben, de 1895.'],
  c06: [`${A} 6 e5 d5 7 Bb5 Ne4 8 cxd4 Bb6 9 Nc3 O-O 10 Be3 Ne7 11 O-O c6 12 Bd3 Nxc3 13 bxc3 Bf5`, 'moller', '6.e5 d5 7.Bb5 Ne4', '=',
    'Com 6.e5 as brancas ganham espaço, mas as pretas respondem no centro e trocam o bispo forte de d3. Posição complexa e igual (Macieja–Aronian, 2003).'],
  c07: [`${P} a6 6 O-O Ba7 7 Bb3 O-O 8 h3 d5 9 Nbd2 dxe4 10 dxe4 Qe7 11 Nh2 Nd8`, 'pianissimo', '5.d3 a6 6.O-O Ba7 7.Bb3 O-O 8.h3', '=',
    'Jogo lento e estratégico: as pretas quebram com ...d5 e igualam. Os dois cavalos recuam para reagrupar no flanco do rei.'],
  c08: [`${P} a6 6 O-O Ba7 7 Re1 d6 8 Bb3 O-O 9 h3 h6 10 Nbd2 Be6 11 Nf1 Re8`, 'pianissimo', '5.d3 a6 6.O-O Ba7 7.Re1', '=',
    'Construção calma com Nbd2-f1. As pretas igualam com a ruptura atrasada ...d5, depois de 12.Be3.'],
  c09: [`${P} a6 6 Nbd2 Ba7 7 Bb3 O-O 8 h3 d5 9 Qe2 Re8 10 Nf1 Be6 11 Ng5 Na5`, 'pianissimo', '5.d3 a6 6.Nbd2 Ba7', '=',
    'As brancas adiam o roque e tentam incomodar o bispo de e6 com Ng5. As pretas respondem contra o bispo de b3 e igualam.'],
  c10: [`${P} O-O 6 b4 Bb6 7 a4 a6 8 O-O d6 9 Bg5 h6 10 Bh4 g5 11 Bg3 Bg4`, 'pianissimo', '5.d3 O-O 6.b4 Bb6 7.a4 a6', '=',
    'As brancas ganham espaço no flanco da dama. As pretas rompem a cravada com ...g5 e, com jogo preciso, chegam a uma posição plenamente igual.'],
  c11: [`${P} d6 6 b4 Bb6 7 a4 a5 8 b5 Ne7 9 O-O O-O 10 Nbd2 Ng6 11 Ba3 Qe7`, 'pianissimo', '5.d3 d6 6.b4 Bb6 7.a4 a5 8.b5 — 10.Nbd2', '=',
    'O avanço a4-b5 trava o flanco da dama. O cavalo preto vai para g6 e mira o flanco do rei, enquanto o bispo de a3 pressiona d6.'],
  c12: [`${P} d6 6 b4 Bb6 7 a4 a5 8 b5 Ne7 9 O-O O-O 10 Bg5 Ng6 11 Nh4 Nxh4`, 'pianissimo', '5.d3 d6 6.b4 Bb6 7.a4 a5 8.b5 — 10.Bg5', '=',
    'Mesma estrutura da coluna anterior, com a cravada 10.Bg5. Depois das trocas em h4 a posição fica igual.'],
  c13: [`${T} 4 c3 Bb6 5 d4 Qe7 6 O-O d6 7 h3 Nf6 8 Re1 O-O 9 a4 a6 10 Na3 Kh8 11 Nc2 Ng8`, 'incomuns', '4.c3 Bb6 5.d4 Qe7', '⩲',
    'As pretas sustentam e5 em vez de ceder o centro, mas ficam passivas. As brancas mantêm uma pequena vantagem.'],
  c14: [`${T} 4 c3 d6 5 d4 exd4 6 cxd4 Bb6 7 Nc3 Nf6 8 Be3 O-O 9 Bb3 Bg4 10 Qd3 Qe7 11 Nd2 Be6`, 'incomuns', '4.c3 d6 5.d4 exd4 6.cxd4 Bb6', '=',
    'As brancas ganham o centro clássico e4+d4, e as pretas pressionam essas casas com as peças. Com jogo preciso, chega-se à igualdade.'],
  c15: [`${T} 4 c3 Nf6 5 b4 Bb6 6 d3 d6 7 O-O Ne7 8 Nbd2 c6 9 Re1 O-O 10 a4 Ng6 11 a5 Bc7`, 'incomuns', '4.c3 Nf6 5.b4 Bb6 6.d3', '⩱',
    'Plano de espaço com b4 e a5. As pretas preparam ...d5 com o bispo em c7 e tendem a ficar um pouco melhor.'],
  c16: [`${T} 4 Nc3 Nf6 5 d3 d6 6 Bg5 h6 7 Bxf6 Qxf6 8 Nd5 Qd8 9 c3 Ne7 10 d4 Nxd5 11 dxc5 Nf4`, 'incomuns', '4.Nc3 Nf6 5.d3 d6 6.Bg5 h6', '=',
    'Desenvolvimento simples, comum entre iniciantes, mas lógico. As brancas cedem o par de bispos para atacar com Nd5 e d4, e a posição fica igual.'],
  c17: [`${T} 4 Nc3 Nf6 5 d3 d6 6 Bg5 Na5 7 Bb3 c6 8 d4 Nxb3 9 axb3 exd4 10 Nxd4 h6 11 Bh4 O-O`, 'incomuns', '4.Nc3 Nf6 5.d3 d6 6.Bg5 Na5', '=',
    'As pretas trocam o bispo ativo de c4 e ganham o par de bispos. As brancas ficam com a coluna a aberta, e o jogo é aproximadamente igual.'],
  c18: [`${T} 4 O-O Nf6 5 d4 Bxd4 6 Nxd4 Nxd4 7 Bg5 d6 8 f4 Qe7 9 fxe5 dxe5 10 c3 Ne6 11 Bxe6 Bxe6`, 'incomuns', '4.O-O Nf6 5.d4 Bxd4', '=',
    'As brancas sacrificam um peão por linhas abertas e desenvolvimento rápido. As chances ficam aproximadamente iguais.'],
}

// [base, sufixo do id, letra, rótulo, lances, {a: avaliação, r: referência, c: comentário, x: conferir}]
const notas = [
  ['c01', 'a', 'a', '(a)', '7... Nxe4 8 Bxb4 Nxb4 9 Bxf7+ Kxf7 10 Qb3+ Kf8 11 Qxb4+ Qe7 12 Qxe7+ Kxe7', { a: '=', r: 'Wedberg–Korman, Suécia 1978', c: 'Alternativa razoável: 7...Nxe4 leva a um final igual.' }],
  ['c01-a', '1', 'a', '(a) 10...d5', '10... d5', { c: 'Em vez de 10...Kf8, 10...d5 também pode ser jogado.' }],
  ['c01', 'b', 'b', '(b)', '8... Nxe4 9 d5 Nxd2 10 Qxd2 Ne7 11 d6 cxd6 12 Qxd6', { r: 'Keres', c: 'Gambito promissor sugerido por Keres.' }],
  ['c01', 'c', 'c', '(c)', '10 O-O O-O 11 Ne5 Nxd4 12 Nb3 Nxb3 13 Bxd5 Qf6 14 Bxf7+ Rxf7 15 Qxb3', { a: '=', r: 'Khasin–Zagorovsky, URSS 1955', c: 'As brancas entregam o peão de d4 por atividade e recuperam o material.' }],
  ['c01-c', '1', 'c', '(c) 13...Nxa1', '13... Nxa1 14 Bxf7+ Kh8 15 Qh5 h6 16 Rd1', { a: '±', c: 'Pegar a torre expõe o rei preto.' }],
  ['c01', 'd', 'd', '(d)', '10... Nce7 11 O-O O-O 12 Rfe1 c6', { a: '=', r: 'van der Wiel–Karpov, Amsterdã 1980', c: 'Reforça o cavalo de d5 e chega à igualdade.' }],
  ['c01', 'e', 'e', '(e)', '14 O-O Nxe5', { a: '=', r: 'Zelcic–Mamedyarov, Campeonato Europeu 2001', c: 'Depois do roque, 14...Nxe5 é o caminho mais simples.' }],
  ['c02', 'f', 'f', '(f)', '7... Nxe4 8 d5 Ne7 9 Qd4 Nf6 10 Bg5', { a: 'brancas com ataque', r: 'Marshall–Burn, Ostende 1905', c: 'Pegar o peão deu às brancas um ataque terrível.' }],
  ['c02', 'g', 'g', '(g)', '10 Qb3 Na5 11 Qa4+ Bd7 12 Bb5 Nxc3', { a: '∓', r: 'Levenfish', c: 'O ataque à dama não funciona aqui.' }],
  ['c02', 'h', 'h', '(h)', '14 Rc1 Qd7', { a: '∓', r: 'Bartmansky–Butik, corr. 1910', c: 'As pretas seguem com o peão a mais.' }],
  ['c02-h', '1', 'h', '(h) 15.Bxd5', '15 Bxd5 Qxd5 16 Rc5 Qxa2', { c: 'Não adianta para as brancas: a dama pega o peão de a2.' }],
  ['c03', 'i', 'i', '(i)', '8... Nxc3 9 bxc3 d5 10 cxb4 dxc4 11 Re1+ Ne7 12 Bg5 f6 13 Qe2 Bg4 14 Bf4 Kf7 15 Qxc4+', { a: '⩲', r: 'Sakharov', c: 'As brancas recuperam o material com iniciativa.' }],
  ['c03-i', '1', 'i', '(i) 9...Bxc3', '9... Bxc3 10 Ba3!', { a: '±', r: 'Keres', c: 'O bispo em a3 impede o roque preto.' }],
  ['c03-i', '2', 'i', '(i) 13...fxg5', '13... fxg5 14 Qxc4', { a: '±', r: 'Keres' }],
  ['c03', 'j', 'j', '(j)', '9 bxc3 d5 10 Ba3 dxc4 11 Re1 Be6 12 Rxe4 Qd5 13 Qe2 O-O-O 14 Ne5 Rhe8', { a: '∓', r: 'Steinitz–Lasker, São Petersburgo 1896', c: 'Retomar em c3 é bom para as pretas.' }],
  ['c03', 'k-A', 'k', '(k) A', '9... Ne7 10 bxc3 O-O 11 Re1 Nd6 12 Bd3 h6 13 c4', { a: '⩲', r: 'Demuth–Loonnides, Szombathely 1991', c: 'Alternativa a 9...Bf6.' }],
  ['c03', 'k-B', 'k', '(k) B', '9... Ba5 10 dxc6 bxc6 11 Ne5 Nd6 12 Qg4', { a: '⩲', r: 'Möller', c: 'Alternativa a 9...Bf6.' }],
  ['c03', 'k-C', 'k', '(k) C', '9... Nd6', { c: 'Não iguala.' }],
  ['c03', 'k-D', 'k', '(k) D', '9... Na5', { c: 'Não iguala.' }],
  ['c03', 'l', 'l', '(l)', '11... O-O 12 d6 cxd6 13 Bg5 Ng6 14 Qd5', { a: '=', c: 'Lance razoável, com chances aproximadamente iguais.' }],
  ['c03-l', '1', 'l', '(l) 13.Qxd6', '13 Qxd6 Nf5 14 Qd5 Ne7 15 Qd6 Nf5', { a: '=', c: 'Repete a posição; se não repetirem, as brancas permitem ...d5.' }],
  ['c03-l', '2', 'l', '(l) 13...Bxg5', '13... Bxg5 14 Nxg5 d5 15 Bxd5 Nxd5 16 Qxd5 h6 17 Nxf7 Rxf7 18 Rae1 Qf6 19 Re7 Qxf2+ 20 Kh1 g5 21 Rxf7 Qxf7 22 Re8+', { a: '=', r: 'Botterill', c: 'Termina empatado.' }],
  ['c03', 'm', 'm', '(m)', '12 g4 O-O 13 g5 Be5 14 Nxe5 Bf5 15 Re3 dxe5 16 Rxe5 Qd7', { a: '∓', r: 'Rufenacht–Smit, corr. 1991', c: 'As pretas ficam melhor.' }],
  ['c03', 'n-1', 'n', '(n) 13...O-O', '13... O-O 14 Nxh7 Kxh7 15 Qh5+ Kg8 16 Rh4 f5 17 Be2!? Ng6', { a: '=', r: 'Abdullah–Gokhale, Cainhill Open 2003', c: 'Rocar em vez de 13...h6 expõe o rei a um sacrifício em h7.' }],
  ['c03-n-1', '1', 'n', '(n) 17...Bd7', '17... Bd7 18 Qh7+ Kf7 19 Rh6!', { a: '+-', r: 'Abdullah–Gokhale, Cainhill Open 2003', c: 'As brancas vencem.', x: 'O livro imprime "(17...Bd 18) Qh7+", com o lance cortado; transcrito como 17...Bd7 18.Qh7+.' }],
  ['c03', 'n-A', 'n', '(n) A', '14 Qe2 hxg5 15 Re1 Be6 16 dxe6 f6 17 Re3 c6 18 Rh3 Rxh3 19 gxh3 g6', { a: '⩱', r: 'Hardarsson–Livshits, Olomouc 2001', c: 'As pretas ficam talvez com uma pequena vantagem.' }],
  ['c03-n-A', '1', 'n', '(n) A 16...f5', '16... f5 17 Re3 g4 18 h3 d5 19 Bd3 c6 20 hxg4 Qd6', { a: '⩱', r: 'L. Vega–de la Paz, Cuba 1996' }],
  ['c03', 'n-B', 'n', '(n) B', '14 Bb5+ Bd7 15 Qe2 Bxb5 16 Qxb5+ Qd7 17 Qe2 Kf8', { a: '∓', r: 'Zafirov–Masse, Quebec 2003' }],
  ['c04', 'o-A', 'o', '(o) A', '11... Ncd6 12 Qxg7 Qf6 13 Qxf6 Nxf6 14 Re1+ Kf8 15 Bh6+ Kg8 16 Re5 Nfe4 17 Re1', { a: '±', r: 'Durao–Ferrara, Sevilha 1994' }],
  ['c04', 'o-B', 'o', '(o) B', '11... f5 12 Qxc4 d6 13 Nd4 O-O 14 f3 Nf6', { a: '=', r: 'Schlechter–Mertner, Viena 1899' }],
  ['c04', 'p', 'p', '(p)', '12... b5 13 a4 c6 14 axb5 cxb5', { a: '=', r: 'Dzindzichashvili–Karpov, Mazatlán 1988', c: 'O peão de b5 sustenta o cavalo de c4.', x: 'O livro imprime "14 axb5 axb5", ilegal porque o peão preto está em a7; transcrito como 14...cxb5.' }],
  ['c04', 'q', 'q', '(q)', '14 Qg3', { a: 'brancas com compensação quase suficiente', r: 'Leygue–Flear, França 2003', c: 'Com a ideia de 15.Bg5, as brancas obtêm compensação quase suficiente pelo peão.' }],
  ['c05', 'r', 'r', '(r)', '7... O-O 8 e5 Ne4 9 O-O Bxc3 10 bxc3 d5', { a: '⩲' }],
  ['c05', 's', 's', '(s)', '9... Nxc3 10 bxc3 Be7 11 Re1 O-O 12 Ne5 Nxe5 13 Rxe5 Bf6 14 Rh5 g6', { a: '=', c: 'Também razoável.' }],
  ['c05', 't-1', 't', '(t) 12.Ne4', '11 Bxe7 Ncxe7 12 Ne4', { a: '⩲', r: 'Keres', c: 'As brancas ficam com uma pequena vantagem.' }],
  ['c05', 't-2', 't', '(t) 12.Qb3', '11 Bxe7 Ncxe7 12 Qb3', { a: '⩲', r: 'Keres', c: 'As brancas ficam com uma pequena vantagem.' }],
  ['c05', 'u', 'u', '(u)', '14 Re1 f6 15 Qe2 Qd7 16 Rac1', { a: '∞', r: 'Steinitz–von Bardeleben, Hastings 1895', c: 'A célebre partida, com o rei preto ainda no centro.' }],
  ['c05-u', '1', 'u', '(u) 17.Ne5+', '16... Kf7 17 Ne5+', { a: '∞', c: 'Agora 16...Kf7 seria pouco claro.' }],
  ['c05-u', '2', 'u', '(u) 17.Ng5+', '16... Kf7 17 Ng5+', { a: '∞', c: 'Agora 16...Kf7 seria pouco claro.' }],
  ['c05-u', '3', 'u', '(u) 16.d5', '16 d5 Kf7 17 Rad1 Rad8 18 Qe6+ Qxe6 19 dxe6+ Kg6', { a: '∞', r: 'Romanovsky', c: 'Sugestão de Romanovsky, com chances para os dois lados.' }],
  ['c06', 'v', 'v', '(v)', '6 O-O Nxe4 7 cxd4 d5 8 dxc5 dxc4 9 Qe2 Qd3 10 Re1 f5', { a: '=', r: 'Biolek–Keitlinghaus, Ostrava 1993' }],
  ['c06-v', '1', 'v', '(v) 9.Qxd8+', '9 Qxd8+ Kxd8 10 Rd1+ Bd7', { a: '⩱' }],
  ['c06', 'w-A', 'w', '(w) A', '8... Be7 9 Nc3 O-O 10 Bd3 f5 11 exf6', { a: '⩲', r: 'Steinitz–Lasker, Nova York 1894' }],
  ['c06', 'w-B', 'w', '(w) B', '8... Bb4+ 9 Nbd2 O-O 10 Bxc6 bxc6 11 Qc2 c5 12 O-O', { a: '⩲', r: 'Rayo–Yanez, Madri 1989' }],
  ['c06', 'x', 'x', '(x)', '10 Bxc6 bxc6 11 Be3 f5 12 exf6 Qxf6 13 Qb3 Qg6', { a: '=', r: 'Rowson–I. Sokolov, Selfoss 2002' }],

  ['c07', 'a', 'a', '(a)', '5... d5 6 exd5 Nxd5 7 Qb3 Nf4 8 Bxf4 exf4 9 Bxf7+ Kf8 10 Bc4 Qe7+ 11 Kf1', { a: '±', r: 'Godena–Crepan, Itália 1986', c: '5...d5 imediato é prematuro.' }],
  ['c07', 'b', 'b', '(b)', '6... O-O 7 d4 Ba7 8 dxe5 Nxe4 9 Bd5 Nc5 10 Bg5', { a: '±', r: 'Petrienko–Miranovic, Novi Sad 1988', c: 'Rocar já permite 7.d4.' }],
  ['c07', 'c-A', 'c', '(c) A', '8 Bg5 h6 9 Bh4 d6 10 Nbd2 g5 11 Bg3 b5 12 Re1 Re8', { a: '=', r: 'Repkova–Stefanova, Croácia 2004' }],
  ['c07', 'c-B', 'c', '(c) B', '8 Be3 d6 9 Nbd2 Ne7', { a: '=', r: 'Matwani–Short, Gibraltar 2004' }],
  ['c07', 'd', 'd', '(d)', '9... Re8 10 Re1 b5 11 Qe2 Bb7', { a: '=', r: 'A. Toth–Vajda, Sozina 2005', c: 'Também iguala.' }],
  ['c07', 'e', 'e', '(e)', '12 Re1 Ne6 13 Ndf1 h6', { a: '=', r: 'V. Nevednichy–Notkin, Iugoslávia 1996', c: 'Mais ou menos igual.' }],
  ['c08', 'f', 'f', '(f)', '7 Be3 O-O 8 Bxa7 Rxa7 9 Re1 d6 10 a4 Ra8 11 Nbd2 Re8', { a: '=', r: 'Areschenko–Sorokin, Aeroflot Open 2006' }],
  ['c08', 'g', 'g', '(g)', '12 Be3 d5 13 Bxa7 Rxa7 14 exd5 Bxd5', { a: '=', r: 'Yudasin–Adams, Belgrado 1999', c: '...d5 atrasado, mas eficaz neste momento.' }],
  ['c09', 'h', 'h', '(h)', '8... h6 9 Nf1 d5 10 Qe2 Be6 11 Ng3 dxe4 12 dxe4 Qd6', { a: '=', r: 'Gunnarsson–Fedorchuk, Czech Open 2003', c: 'Um plano direto.' }],
  ['c09', 'i', 'i', '(i)', '12 Nxe6 Rxe6 13 Bc2 Qd7 14 Ng3 Rd8 15 O-O Nc6 16 Qf3 Ne7 17 Re1 c6', { a: '=', r: 'Bologan–Adams, Internet 2004' }],
  ['c10', 'j', 'j', '(j)', '9 a5 Ba7 10 Bg5 Ne7 11 Bxf6 gxf6 12 Nh4 Ng6', { r: 'Ehlvest–Portisch, Skellefteå 1989', c: 'Em posição análoga, Portisch jogou 10...Ne7 e ficou com boas chances.' }],
  ['c10', 'k', 'k', '(k)', '10... Bg4 11 a5 Ba7 12 h3 Bh5 13 g4', { a: '⩲', r: 'Belov–Landa, Chita 1987' }],
  ['c10', 'l', 'l', '(l)', '12 a5 Ba7 13 h3 Bh5 14 Nbd2 Bg6', { a: '=', r: 'Yudasin–Tseitlin, Moscou 1989', c: 'As pretas ficam com uma posição plenamente igual.' }],
  ['c11', 'm', 'm', '(m)', '7... a6 8 O-O O-O 9 Be3 Bxe3 10 fxe3 d5 11 exd5 Nxd5 12 Qd2 Be6 13 Na3 Qe7 14 e4 Nb6 15 Bxe6 Qxe6', { a: '=', r: 'Yermolinsky–Anand, Madri 1998' }],
  ['c11', 'n-A', 'n', '(n) A', '11 Bb3 c6 12 bxc6 bxc6 13 d4 Bg4 14 Qc2 Nf4 15 dxe5 dxe5 16 Nxe5 Be2 17 Ndf3', { a: '=', r: 'Mestel–Greenfeld, Beersheba 1988', c: 'Jogo agudo, mas igual.' }],
  ['c11-n-A', '1', 'n', '(n) A 11...d5', '11... d5 12 Ba3 Re8 13 exd5 Nxd5 14 Ne4', { a: '⩲', r: 'Ljubojević–Korchnoi, Bruxelas 1987' }],
  ['c11-n-A', '2', 'n', '(n) A 12.d4', '12 d4 Bg4 13 Bb2 d5 14 h3 dxe4 15 Nxe4 Bf5', { a: '∞', r: 'Nunn–Winants, Bruxelas 1988' }],
  ['c11', 'n-B', 'n', '(n) B', '10 h3 Ng6 11 Re1 c6 12 Bb3 Re8 13 bxc6 bxc6 14 Na3 d5 15 exd5 Nxd5', { a: '⩱', r: 'Tolnai–I. Sokolov, Croácia 1993', c: 'Outro plano, provavelmente um pouco melhor para as pretas.' }],
  ['c11', 'o-1', 'o', '(o)', '12 Re1 Bc5 13 Bxc5 dxc5', { a: '=', r: 'Yudasin–Mikhalevski, Beersheba 1993' }],
  ['c11', 'o-2', 'o', '(o) 11...Nh5', '11... Nh5 12 d4 Nhf4 13 dxe5 Nxe5 14 Nxe5 Qg5 15 g3 Nh3+ 16 Kg2 Qxe5 17 Bd5', { a: '±', r: 'Hjartarson–Short, Manila 1992', c: 'Vantagem das brancas.' }],
  ['c12', 'p', 'p', '(p)', '10... c6 11 bxc6 bxc6 12 Ba2 Ng6 13 Nh4 Nf4 14 Bxf4 exf4 15 Nf3 Bg4', { a: '=', r: 'Sermek–Wehmeier, Groningen 1993' }],
  ['c12', 'q', 'q', '(q)', '12 Bxh4 h6 13 Na3 g5 14 Bg3 h5 15 Qd2 Nh7 16 h3 Qf6', { a: '=', r: 'Macieja–Harikrishna, Bermudas 2005' }],

  ['c13', 'a', 'a', '(a)', '6 d5 Nd8 7 a4 a6 8 d6 Qxd6 9 Qxd6 cxd6 10 Bd5 Nc6 11 Na3 Bc7', { a: '∞', r: 'Rakić–Djurić, Vrnjačka Banja 1979', c: 'Chances para os dois lados.' }],
  ['c13', 'b', 'b', '(b)', '8... h6 9 a4 a6 10 Na3 g5 11 Bf1 g4 12 hxg4 Nxg4 13 Nc4 Bxd4 14 cxd4 Nxd4 15 Be2', { a: '±', r: 'Spassov–Kontić, Nikšić 1991', c: 'Favoreceu as brancas.' }],
  ['c13', 'c', 'c', '(c)', '12 b4 f6 13 Ne3', { a: '⩲', r: 'Heidenfeld–Euwe, Joanesburgo 1955' }],
  ['c14', 'd', 'd', '(d)', '6... Bb4+ 7 Nc3 Nf6 8 Bg5 h6 9 Bxf6 Qxf6 10 O-O Bxc3 11 bxc3', { a: '⩲', c: 'Um pouco melhor para as brancas.' }],
  ['c14-d', '1', 'd', '(d) 7...Nge7', '7... Nge7 8 Ng5 d5 9 exd5 Bxc3+ 10 bxc3 Nxd5 11 O-O', { r: 'Stein–H. Hansen, Gausdal 1996', x: 'O livro imprime "11 0-0 6", com um 6 no lugar do símbolo de avaliação; deixado sem avaliação.' }],
  ['c14', 'e', 'e', '(e)', '7 h3 Nf6 8 Nc3 O-O 9 Bg5 h6 10 Bh4 g5 11 Bg3 Nxe4 12 Nxe4 Re8', { a: '⩱', r: 'Kovalenko–Romanov, Kiev 2004' }],
  ['c14-e', '1', 'e', '(e) 9.O-O', '9 O-O Nxe4 10 Nxe4 d5 11 Bg5 Qd7', { a: '=' }],
  ['c14', 'f', 'f', '(f)', '8 O-O Bg4 9 Be3 Qe7', { c: 'Com a ideia de ...O-O-O, está bom para as pretas.' }],
  ['c14', 'g', 'g', '(g)', '9 O-O Nxe4 10 Nxe4 d5 11 Bxd5 Qxd5 12 Nc3 Qh5', { r: 'Rahman–Lodhi, Daca 1993', c: 'Foi bom para as pretas.' }],
  ['c14', 'h', 'h', '(h)', '12 Nc4 Nb4 13 Qd2 Bxc4 14 Bxc4 Nxe4 15 Nxe4 d5 16 Nc5 Nc6 17 O-O dxc4 18 Nxb7 Rab8 19 Nc5 Rfd8 20 Qc3 Bxc5 21 dxc5 Qe4', { a: '=', r: 'Wekh–Barwinski, Varsóvia 1993' }],
  ['c15', 'i', 'i', '(i)', '7 a4 a6 8 O-O O-O 9 Nbd2 Ne7 10 Bb3 Ng6 11 Nc4 Ba7', { a: '=', r: 'S. Hansen–Adams, Internet 2003' }],
  ['c15', 'j', 'j', '(j)', '7... O-O 8 Nbd2 Ne7 9 Bb3 c6 10 Nc4 Bc7 11 Bg5 Ng6 12 Nh4 Nf4', { a: '=', r: 'Macieja–Fontaine, Istambul 2003' }],
  ['c15', 'k', 'k', '(k)', '8 Bg5 Ng6 9 Nh4 Nxh4 10 Bxh4 g5 11 Bxg5 Rg8', { r: 'Moroz–Podgaets, URSS 1986', c: 'Foi perigoso para as brancas.' }],
  ['c15', 'l', 'l', '(l)', '9 Bb3 O-O 10 Nc4 Bc7 11 Bg5 Ng6 12 d4 h6 13 Bxf6 Qxf6 14 Ne3 a5', { a: '⩱', r: 'Gomez Jurado–Martin, Andorra 1991' }],
  ['c15-l', '1', 'l', '(l) 10.d4', '10 d4 Ng6 11 Re1 h6 12 a3 Re8 13 Qc2 Nh5', { a: '⩱', r: 'Zhelnin–Dobrovsky, Odessa 1989' }],
  ['c15', 'm', 'm', '(m)', '12 Bb3 d5 13 exd5 Nxd5 14 Ne4 h6 15 Bc4 Bf5', { a: '⩱', r: 'Yudasin–Karpov, URSS 1988', c: 'Favorece as pretas.' }],
  ['c15-m', '1', 'm', '(m) 13.Nf1', '13 Nf1 Be6 14 g3 h6 15 Qc2 Rc8', { a: '=', r: 'Ljubojević–Hjartarson, Tilburg 1989', c: '13.Nf1 foi jogado várias vezes.' }],
  ['c15-m-1', '1', 'm', '(m) 13...h6', '13... h6 14 Ng3 Be6 15 Be3 Qd7', { a: '⩱', r: 'Short–Salov, Linares 1990' }],
  ['c16', 'n', 'n', '(n)', '8... Qg6!? 9 Qe2 Bg4 10 c3 Bb6 11 a4 f5 12 b4 a5', { a: '=', r: 'Foltys–Keres, Munique 1936', c: 'A partida seguiu até 11...f5; 12.b4 a5 é igual segundo Keres.' }],
  ['c16', 'o', 'o', '(o)', '9... a6 10 d4 Ba7 11 dxe5 Nxe5 12 Nxe5 dxe5 13 Qh5 O-O 14 Qxe5 Re8 15 Qf4 Qd6 16 Qxd6 Rxe4+ 17 Ne3 cxd6 18 Bd5 Re7! 19 O-O-O Bxe3+ 20 fxe3 Bg4', { a: '=', r: 'Short–Aleksandrov, Izmir 2004', c: 'A partida seguiu até 18.Bd5; 18...Re7! é a melhora que iguala.' }],
  ['c16', 'p', 'p', '(p)', '10... exd4 11 cxd4 Bb6 12 Nxb6 axb6 13 O-O', { a: '⩲', r: 'Timman–Nunn, Amsterdã 1986' }],
  ['c16', 'q', 'q', '(q)', '12 g3 Nh3 13 cxd6 cxd6 14 Bb5+ Kf8', { a: '=', r: 'Pollvanov–Shinkevich, Memorial Chigorin 2002' }],
  ['c17', 'r', 'r', '(r)', '7 Nd5 Nxc4 8 dxc4 c6 9 Nxf6+ gxf6 10 Bh4 Rg8 11 O-O Bh3', { a: '=', r: 'Vlassov–Grischuk, Internet 2004' }],
  ['c17-r', '1', 'r', '(r) 10.Be3', '10 Be3 Qb6', { a: '⩱' }],
  ['c17', 's', 's', '(s)', '12 O-O g5 13 Bg3 Re8', { a: '=', r: 'Morozevich–Kir. Georgiev, Tilburg 1994', c: 'Mais ou menos igual.' }],
  ['c18', 't-A', 't', '(t) A', '5... exd4 6 e5', { c: 'Entra no Ataque Max Lange, tratado à parte no livro.' }],
  ['c18', 't-B', 't', '(t) B', '5... Nxd4 6 Nxe5', { a: '±' }],
  ['c18', 'u', 'u', '(u)', '7 f4 d6 8 fxe5 dxe5 9 Bg5 Be6 10 Nd2 Qd7 11 Bxf6 gxf6 12 c3 Bxc4 13 Nxc4 Ne6 14 Qxd7+ Kxd7', { a: '=', r: 'Gufeld' }],
  ['c18-u', '1', 'u', '(u) 10...Qe7', '10... Qe7 11 c3 Bxc4 12 Nxc4 Ne6', { a: '∞', r: 'Minckwitz–Anderssen, Frankfurt 1878' }],
  ['c18', 'v', 'v', '(v)', '8... Be6 9 Na3 Qe7 10 c3 Bxc4 11 Nxc4 Ne6 12 fxe5 dxe5 13 Bxf6 Qc5+ 14 Rf2', { a: '⩲', r: 'Mestel–Smetan, Buenos Aires 1978', x: 'O livro imprime "10 c3 Bxe4", ilegal para o bispo de e6; pelo 11.Nxc4 seguinte, transcrito como 10...Bxc4.' }],
  ['c18', 'w', 'w', '(w)', '12 Kh1 Qd7 13 Qe2 O-O-O', { a: '=', r: 'Zelcic–Georgadze, San Sebastián 1991', c: 'Chances aproximadamente iguais.' }],
]

const dicas = {
  c01: {
    '1. e4': 'Ocupa o centro e abre caminho para a dama e o bispo de f1.',
    '1... e5': 'Resposta simétrica: disputa o centro e libera o bispo de f8.',
    '2. Nf3': 'Desenvolve com ameaça: ataca o peão de e5.',
    '2... Nc6': 'Defende e5 desenvolvendo uma peça.',
    '3. Bc4': 'O bispo mira f7, a casa mais fraca das pretas (defendida só pelo rei).',
    '3... Bc5': 'Giuoco Piano: as pretas espelham as brancas, com o bispo mirando f2. Em vez de contra-atacar com 3...Nf6, buscam manter o equilíbrio no centro.',
    '4. c3': 'Prepara d4 para montar um centro de peões; o avanço também vai atacar o bispo de c5.',
    '4... Nf6': 'Desenvolve atacando e4, que ficou sem defesa porque o peão de c3 tirou a casa do cavalo.',
    '5. d4': 'Abre o centro com um duplo ataque do peão: mira e5 e o bispo de c5.',
    '5... exd4': 'Elimina o peão central antes que ele avance ou capture em e5.',
    '6. cxd4': 'Retoma atacando o bispo e forma o centro clássico e4+d4.',
    '6... Bb4+': 'O bispo atacado sai com xeque, sem perder tempo.',
    '7. Bd2': 'Bloqueia o xeque oferecendo a troca de bispos; é a resposta mais calma.',
    '7... Bxd2+': 'Troca os bispos e alivia a posição.',
    '8. Nbxd2': 'Retoma desenvolvendo o cavalo, que agora defende e4.',
    '8... d5': 'O golpe central típico: ataca e4 e o bispo de c4 e desmancha o centro branco.',
    '9. exd5': 'Captura e abre a coluna e.',
    '9... Nxd5': 'Cavalo centralizado, bloqueando o peão isolado de d4.',
    '10. Qb3': 'Forma uma bateria com o bispo contra d5 e ainda mira b7.',
    '10... Na5': 'Garfo: o cavalo ataca a dama e o bispo de c4 ao mesmo tempo.',
    '11. Qa4+': 'A dama sai com xeque e ataca o cavalo de a5.',
    '11... Nc6': 'Volta bloqueando o xeque; o cavalo fica cravado contra o rei.',
    '12. Bb5': 'Aumenta a pressão sobre o cavalo cravado de c6.',
    '12... Qe7+': 'Aproveita a coluna e aberta para dar xeque antes do roque branco.',
    '13. Ne5': 'Bloqueia o xeque e soma mais um atacante em c6.',
    '13... Bd7': 'Defende c6 e completa o desenvolvimento das peças menores.',
  },
  c02: {
    '7. Kf1': 'Lance duvidoso (?!): evita a troca de bispos, mas perde o direito de rocar.',
    '7... d5': 'Reage no centro, atacando e4 e o bispo de c4.',
    '8. exd5': 'Captura para abrir o jogo enquanto o rei preto está no centro.',
    '8... Nxd5': 'Retoma centralizando o cavalo.',
    '9. Nc3': 'Desenvolve e soma um atacante sobre d5.',
    '9... Be6': 'Defende o cavalo de d5 e continua o desenvolvimento.',
    '10. Qe2': 'Crava o bispo de e6 contra o rei na coluna e.',
    '10... Bxc3': 'Elimina um dos atacantes de d5.',
    '11. bxc3': 'Retoma, mas deixa o peão de c3 fraco.',
    '11... Nxc3': 'Ganha um peão e ataca a dama.',
    '12. Qe1': 'A dama sai atacando o cavalo de c3 e mantém a cravada.',
    '12... Nd5': 'Recua para o centro mantendo o peão a mais.',
    '13. Ba3': 'Domina a diagonal e impede o roque curto das pretas.',
    '13... a6': 'Tira a casa b5 das peças brancas e consolida a vantagem.',
  },
  c03: {
    '7. Nc3': 'Ataque Möller: as brancas oferecem o peão de e4 por linhas abertas e desenvolvimento.',
    '7... Nxe4': 'Aceita o peão; segundo o livro, é a defesa mais confiável.',
    '8. O-O': 'Põe o rei em segurança e prepara a torre para a coluna e, ignorando os ataques.',
    '8... Bxc3': 'Elimina o cavalo que atacava e4.',
    '9. d5': 'A ideia do Möller: em vez de retomar, ataca o cavalo de c6 com ganho de tempo.',
    '9... Bf6': 'Salva o bispo, que controla casas importantes no flanco do rei.',
    '10. Re1': 'A torre entra na coluna e e ataca o cavalo de e4.',
    '10... Ne7': 'Tira o cavalo do ataque do peão e reforça a coluna e.',
    '11. Rxe4': 'Recupera a peça; as brancas têm um peão a menos, mas muita atividade.',
    '11... d6': 'Abre o bispo de c8 e controla e5.',
    '12. Bg5': 'Desafia o bispo de f6, importante defensor do rei preto.',
    '12... Bxg5': 'Troca para reduzir o ataque.',
    '13. Nxg5': 'O cavalo retoma e mira f7 e h7.',
    '13... h6': 'Expulsa o cavalo antes de rocar; 13...O-O permitiria 14.Nxh7.',
  },
  c04: {
    '9... Ne5': 'Contragolpe: o cavalo foge do peão e ataca o bispo de c4.',
    '10. bxc3': 'Recupera a peça, pois o bispo de c3 estava atacado.',
    '10... Nxc4': 'Elimina o bispo perigoso das brancas.',
    '11. Qd4': 'Ataque múltiplo: a dama mira c4, e4 e g7.',
    '11... O-O': 'Protege g7 e tira o rei do centro; um dos cavalos vai cair.',
    '12. Qxe4': 'Recupera a peça, deixando as pretas com um peão a mais.',
    '12... Nd6': 'O outro cavalo se salva com ataque à dama.',
    '13. Qf4': 'A dama fica ativa, apontando para o flanco do rei.',
    '13... Ne8': 'Recua para defender g7 e f6, mantendo o peão a mais.',
  },
  c05: {
    '7... d5': 'Em vez de pegar e4, contra-ataca no centro.',
    '8. exd5': 'Captura para abrir as linhas.',
    '8... Nxd5': 'Retoma com o cavalo, que fica exposto na diagonal do bispo de c4.',
    '9. O-O': 'Tira o rei do centro: quem estiver desenvolvido primeiro aproveita o jogo aberto.',
    '9... Be6': 'Defende o cavalo de d5.',
    '10. Bg5': 'Desenvolve com ganho de tempo, atacando a dama.',
    '10... Be7': 'Bloqueia e prepara o roque.',
    '11. Bxd5': 'Inicia as trocas para explorar o rei preto, que ainda não rocou.',
    '11... Bxd5': 'Retoma com o bispo.',
    '12. Nxd5': 'Continua trocando as peças que defendem o centro.',
    '12... Qxd5': 'A dama retoma, centralizada.',
    '13. Bxe7': 'Troca o último bispo; agora a coluna e será o problema das pretas.',
    '13... Nxe7': 'Retoma, mas o rei segue em e8, com o cavalo cravado depois de Re1.',
  },
  c06: {
    '6. e5': 'Em vez de retomar em d4, avança e ataca o cavalo de f6.',
    '6... d5': 'A resposta típica: ataca o bispo de c4 e abre o jogo em vez de recuar o cavalo.',
    '7. Bb5': 'O bispo sai do ataque e crava o cavalo de c6.',
    '7... Ne4': 'O cavalo salta para uma casa ativa em vez de recuar.',
    '8. cxd4': 'Recupera o peão, formando uma cadeia em d4 e e5.',
    '8... Bb6': 'Recua mantendo a pressão sobre d4.',
    '9. Nc3': 'Desenvolve e desafia o cavalo de e4.',
    '9... O-O': 'Roque: a coluna e está fechada e o rei fica seguro.',
    '10. Be3': 'Reforça o peão de d4.',
    '10... Ne7': 'Evita a troca em c6 e libera o peão de c para atacar o bispo.',
    '11. O-O': 'Completa o desenvolvimento do rei.',
    '11... c6': 'Expulsa o bispo de b5.',
    '12. Bd3': 'O bispo volta para atacar e4, mirando o roque preto.',
    '12... Nxc3': 'Troca antes que o cavalo seja incomodado.',
    '13. bxc3': 'Retoma reforçando d4, com a coluna b semiaberta.',
    '13... Bf5': 'Oferece a troca do bispo forte de d3, com igualdade.',
  },
  c07: {
    '5. d3': 'Giuoco Pianissimo: defende e4 sem pressa, adiando o choque no centro para uma luta de manobras.',
    '5... a6': 'Abre a casa a7 para o bispo, que assim fica a salvo de d4 ou b4.',
    '6. O-O': 'Roque antes de definir o plano.',
    '6... Ba7': 'O bispo se antecipa e continua mirando f2 de uma casa segura.',
    '7. Bb3': 'Recua de forma preventiva, para não perder tempo com ...Na5 ou ...d5.',
    '7... O-O': 'Completa o roque.',
    '8. h3': 'Impede ...Bg4 e ...Ng4, preparando as manobras seguintes.',
    '8... d5': 'A ruptura central que dá igualdade às pretas.',
    '9. Nbd2': 'Desenvolve e reforça e4.',
    '9... dxe4': 'Define a estrutura central.',
    '10. dxe4': 'Retoma, mantendo o peão em e4.',
    '10... Qe7': 'Protege e5 e abre d8 para a torre ou o cavalo.',
    '11. Nh2': 'O cavalo se reposiciona rumo a g4 ou f1, de olho no flanco do rei.',
    '11... Nd8': 'O cavalo também se reagrupa, a caminho de e6.',
  },
  c08: {
    '7. Re1': 'Reforça e4 e prepara uma futura ruptura com d4.',
    '7... d6': 'Sustenta e5 e abre o bispo de c8.',
    '8. Bb3': 'Recuo preventivo, tirando o bispo de ...Na5 e ...d5.',
    '8... O-O': 'Roque.',
    '9. h3': 'Impede ...Bg4 e ...Ng4.',
    '9... h6': 'Faz o mesmo: evita Bg5 e Ng5.',
    '10. Nbd2': 'Início da manobra típica do cavalo rumo a f1 e g3.',
    '10... Be6': 'Oferece a troca do bispo de b3.',
    '11. Nf1': 'Continua a manobra: o cavalo vai para g3, de olho em f5.',
    '11... Re8': 'Prepara a ruptura ...d5.',
  },
  c09: {
    '6. Nbd2': 'Adia o roque e desenvolve primeiro o cavalo.',
    '7. Bb3': 'Recua de forma preventiva antes de ...Na5 ou ...d5.',
    '8... d5': 'Com as brancas sem rocar, a ruptura central é natural.',
    '9. Qe2': 'Sustenta e4 e abre caminho para a manobra Nf1.',
    '9... Re8': 'A torre ajuda a pressionar e4.',
    '10. Nf1': 'Reagrupa o cavalo rumo a g3 ou e3.',
    '10... Be6': 'Protege d5 e completa o desenvolvimento.',
    '11. Ng5': 'Ataca o bispo de e6 para obter o par de bispos.',
    '11... Na5': 'Contra-ataca o bispo de b3.',
  },
  c10: {
    '5... O-O': 'Roque rápido; o jogo calmo permite completar o desenvolvimento.',
    '6. b4': 'Ganha espaço com ataque ao bispo.',
    '6... Bb6': 'O bispo recua mantendo a diagonal.',
    '7. a4': 'Ameaça a5, prendendo o bispo.',
    '7... a6': 'Abre a7 para o bispo escapar.',
    '8. O-O': 'Roque, com o espaço ganho na ala da dama.',
    '8... d6': 'Sustenta e5 e abre o bispo de c8.',
    '9. Bg5': 'Crava o cavalo de f6 contra a dama.',
    '9... h6': 'Questiona o bispo.',
    '10. Bh4': 'Mantém a cravada.',
    '10... g5': 'Rompe a cravada à custa de enfraquecer um pouco o rei.',
    '11. Bg3': 'O bispo recua, mirando e5.',
    '11... Bg4': 'Devolve a cravada, agora no cavalo de f3.',
  },
  c11: {
    '5... d6': 'Sustenta e5 e abre o bispo de c8.',
    '7... a5': 'Em vez de dar espaço, desafia o peão de b4.',
    '8. b5': 'Avança atacando o cavalo e fecha o flanco da dama.',
    '8... Ne7': 'O cavalo se reposiciona, rumo a g6.',
    '9. O-O': 'Roque, com o flanco da dama travado.',
    '9... O-O': 'Roque.',
    '10. Nbd2': 'Desenvolvimento calmo do último cavalo.',
    '10... Ng6': 'Cavalo no flanco do rei, de olho em f4.',
    '11. Ba3': 'O bispo ganha uma diagonal ativa e pressiona d6.',
    '11... Qe7': 'Protege d6 e e5 contra a pressão branca.',
  },
  c12: {
    '10. Bg5': 'Variante mais ativa: crava o cavalo de f6.',
    '10... Ng6': 'O cavalo vem ao flanco do rei para desafiar a cravada.',
    '11. Nh4': 'Oferece a troca do cavalo de g6.',
    '11... Nxh4': 'Aceita a troca; as brancas retomam com o bispo e a cravada continua.',
  },
  c13: {
    '4... Bb6': 'Recua antes de ser atacado, preservando o bispo em uma casa segura.',
    '5. d4': 'Ataca e5 e conquista o centro.',
    '5... Qe7': 'Sustenta e5, mas a dama ocupa uma casa que poderia servir a outras peças.',
    '6. O-O': 'Roque; o avanço d5 fica como ameaça.',
    '6... d6': 'Reforça e5 e abre o bispo de c8.',
    '7. h3': 'Impede ...Bg4 e ...Ng4.',
    '7... Nf6': 'Desenvolve atacando e4.',
    '8. Re1': 'Defende e4.',
    '8... O-O': 'Roque.',
    '9. a4': 'Ganha espaço e ameaça a5, para incomodar o bispo.',
    '9... a6': 'Abre a7 para o bispo.',
    '10. Na3': 'O cavalo vai a c2 ou c4 sem bloquear a dama.',
    '10... Kh8': 'Prepara o recuo do cavalo e a ruptura ...f5.',
    '11. Nc2': 'Reforça d4.',
    '11... Ng8': 'Abre caminho para o peão de f, ainda que a posição fique passiva.',
  },
  c14: {
    '4... d6': 'Protege e5 e abre o bispo de c8; se d4, o bispo fica mais exposto.',
    '5. d4': 'Ataca e5 e o bispo, com o centro à disposição.',
    '5... exd4': 'Cede o centro para abrir o jogo.',
    '6. cxd4': 'Retoma, com o centro clássico e4+d4.',
    '6... Bb6': 'Recua e continua mirando d4.',
    '7. Nc3': 'Desenvolve e reforça e4.',
    '7... Nf6': 'Ataca e4.',
    '8. Be3': 'Sustenta d4 contra a pressão do bispo de b6.',
    '8... O-O': 'Roque, pondo o rei em segurança.',
    '9. Bb3': 'Antecipa ...Na5 e ...d5, deixando o bispo a salvo.',
    '9... Bg4': 'Crava o cavalo de f3, defensor de d4.',
    '10. Qd3': 'Sustenta e4 e d4 e liga as peças.',
    '10... Qe7': 'Pressiona e4 pela coluna e.',
    '11. Nd2': 'Evita ...Bxf3, que estragaria os peões do roque, e reforça e4.',
    '11... Be6': 'Oferece a troca do bispo de b3.',
  },
  c15: {
    '5. b4': 'Ataca o bispo e ganha espaço antes de decidir o centro.',
    '5... Bb6': 'Recua mantendo a diagonal.',
    '6. d3': 'Protege e4 com calma.',
    '6... d6': 'Sustenta e5 e abre o bispo de c8.',
    '7. O-O': 'Roque.',
    '7... Ne7': 'O cavalo vai a g6 e libera o peão de c.',
    '8. Nbd2': 'Desenvolve o último cavalo.',
    '8... c6': 'Prepara ...d5.',
    '9. Re1': 'Reforça e4 e abre f1 para o cavalo.',
    '9... O-O': 'Roque.',
    '10. a4': 'Ameaça a5, prendendo o bispo.',
    '10... Ng6': 'Cavalo no flanco do rei, de olho em f4.',
    '11. a5': 'Expulsa o bispo de b6.',
    '11... Bc7': 'O bispo muda de diagonal e fica a salvo, enquanto as pretas preparam ...d5.',
  },
  c16: {
    '4. Nc3': 'Lance simples e lógico: desenvolve e protege e4.',
    '5. d3': 'Mantém a posição sólida.',
    '5... d6': 'Sustenta e5 e abre o bispo de c8.',
    '6. Bg5': 'Crava o cavalo de f6 contra a dama.',
    '6... h6': 'Questiona o bispo imediatamente.',
    '7. Bxf6': 'Cede o par de bispos para ganhar tempo com Nd5.',
    '7... Qxf6': 'A dama retoma, ativa.',
    '8. Nd5': 'Salta com ataque à dama, mirando c7.',
    '8... Qd8': 'Defende c7 e fica em casa segura.',
    '9. c3': 'Prepara d4.',
    '9... Ne7': 'Desafia o cavalo de d5.',
    '10. d4': 'Abre o centro atacando o bispo e e5.',
    '10... Nxd5': 'Elimina o cavalo central.',
    '11. dxc5': 'Pega o bispo e ataca d6; o cavalo de d5 também está na mira do bispo de c4.',
    '11... Nf4': 'O cavalo salta com ameaça a g2.',
  },
  c17: {
    '6... Na5': 'Ataca o bispo de c4 para obter o par de bispos.',
    '7. Bb3': 'Preserva o bispo, mas permite sua troca.',
    '7... c6': 'Prepara ...d5 e dá a c7 à dama.',
    '8. d4': 'Abre o centro atacando o bispo e e5.',
    '8... Nxb3': 'Troca o bispo enquanto pode.',
    '9. axb3': 'Retoma em direção ao centro, abrindo a coluna a para a torre.',
    '9... exd4': 'Libera o jogo e o bispo de c5.',
    '10. Nxd4': 'Retoma centralizando o cavalo.',
    '10... h6': 'Questiona o bispo de g5.',
    '11. Bh4': 'Mantém a cravada.',
    '11... O-O': 'Roque, com o rei em segurança.',
  },
  c18: {
    '4. O-O': 'Rei em segurança primeiro, com o centro ainda aberto a d4.',
    '5. d4': 'Sacrifício de peão para abrir o jogo enquanto as pretas não rocaram.',
    '5... Bxd4': 'Aceita o peão, o mais direto.',
    '6. Nxd4': 'Retoma atraindo o cavalo preto para o centro.',
    '6... Nxd4': 'As pretas ficam com um peão a mais.',
    '7. Bg5': 'Crava o cavalo de f6 contra a dama.',
    '7... d6': 'Abre o bispo de c8 e sustenta e5.',
    '8. f4': 'Abre a coluna f para a torre.',
    '8... Qe7': 'Reforça e5, atacado pelo peão de f4.',
    '9. fxe5': 'Abre a coluna f.',
    '9... dxe5': 'Mantém o peão a mais.',
    '10. c3': 'Expulsa o cavalo de d4.',
    '10... Ne6': 'Ataca o bispo de g5.',
    '11. Bxe6': 'Elimina o cavalo.',
    '11... Bxe6': 'Retoma; as chances ficam aproximadamente iguais.',
  },
}

const evans = require('./evans-dados.cjs')
const extras = require('./ameacas-dados.cjs')
const planos = require('./planos-dados.cjs').italiana
const dicasNotas = { ...require('./dicas-italiana-1.json'), ...require('./dicas-italiana-2.json') }
Object.assign(colunas, evans.colunas)
notas.push(...evans.notas)
Object.assign(dicas, evans.dicas)
for (const [id, extras] of Object.entries(evans.dicasExtras)) Object.assign(dicas[id], extras)

// Lê a sequência conferindo o número de cada lance.
function ler(texto, plyInicial, id) {
  const lances = []
  let ply = plyInicial
  for (const token of texto.trim().split(/\s+/)) {
    const num = token.match(/^(\d+)(\.\.\.)?$/)
    if (num) {
      const esperado = Math.ceil(ply / 2)
      const n = Number(num[1])
      const pretas = !!num[2]
      if (lances.length === 0) {
        ply = (n - 1) * 2 + (pretas ? 2 : 1)
      } else if (n !== esperado || ply % 2 !== 1) {
        throw new Error(`${id}: número ${token} no ply ${ply}`)
      }
      continue
    }
    lances.push(token)
    ply++
  }
  return lances
}

function primeiroPly(texto) {
  const m = texto.trim().match(/^(\d+)(\.\.\.)?/)
  return (Number(m[1]) - 1) * 2 + (m[2] ? 2 : 1)
}

function pgn(sans) {
  return sans.map((san, i) => (i % 2 === 0 ? `${i / 2 + 1}. ${san}` : san)).join(' ')
}

const limpar = (san) => san.replace(/[!?]+$/, '')

function conferir(id, sans) {
  const chess = new Chess()
  for (let i = 0; i < sans.length; i++) {
    try {
      const lance = chess.move(sans[i])
      if (limpar(sans[i]) !== lance.san) console.log(`SAN difere: ${id} ${sans[i]} → ${lance.san}`)
    } catch {
      throw new Error(`ILEGAL ${id}: ${Math.ceil((i + 1) / 2)}${i % 2 ? '...' : '.'} ${sans[i]} em ${chess.fen()}`)
    }
  }
}

const sequencias = {}
const linhas = Object.entries(colunas).map(([id, [texto, grupo, nome, avaliacao, resumo]]) => {
  const sans = ler(texto, 1, id)
  conferir(id, sans)
  sequencias[id] = sans
  const linha = { id, coluna: Number(id.slice(1)), grupo, nome, lances: pgn(sans), avaliacao, resumo, dicas: dicas[id] }
  if (extras.ameacas[id]) linha.ameacas = extras.ameacas[id]
  linha.plano = planos[id]
  return linha
})

const saidaNotas = notas.map(([base, sufixo, letra, rotulo, texto, o]) => {
  const id = `${base}-${sufixo}`
  const inicio = primeiroPly(texto)
  const prefixo = sequencias[base].slice(0, inicio - 1)
  if (prefixo.length !== inicio - 1) throw new Error(`${id}: começa depois do fim de ${base} (+${inicio - 1 - prefixo.length})`)
  const sans = [...prefixo, ...ler(texto, inicio, id)]
  conferir(id, sans)
  sequencias[id] = sans
  const desvio = sans.findIndex((san, i) => limpar(san) !== limpar(sequencias[base][i] ?? '')) + 1
  if (desvio !== inicio) throw new Error(`${id}: desvio ${desvio} != início ${inicio}`)
  const nota = {
    id,
    nota: letra,
    rotulo,
    coluna: Number(id.slice(1, 3)),
    linhaBase: base,
    desvioNoLance: desvio,
    lances: pgn(sans),
    avaliacao: o.a ?? null,
  }
  if (o.r) nota.referencia = o.r
  // O erro de impressão já foi conferido com o livro: vira aviso no comentário, sem bloquear o Treino.
  const comentario = [o.c ?? evans.comentariosExtras[id], o.x].filter(Boolean).join(' ')
  const extra = dicasNotas[id]
  if (!extra?.dica) throw new Error(`${id}: sem dica do desvio`)
  const textoComentario = comentario || extra.comentario
  if (textoComentario) nota.comentario = textoComentario
  nota.dicas = { [`${Math.ceil(desvio / 2)}${desvio % 2 ? '.' : '...'} ${sans[desvio - 1].replace(/[?!]+$/, '')}`]: extra.dica }
  return nota
})

const armadilhas = extras.armadilhas.map(([id, titulo, nota, erro, texto]) => {
  const sans = sequencias[nota]
  if (!sans) throw new Error(`armadilha ${id}: nota ${nota} não existe`)
  const erroNoLance = sans.findIndex((san, i) => `${Math.ceil((i + 1) / 2)}${i % 2 ? '...' : '.'} ${limpar(san)}` === erro) + 1
  if (erroNoLance === 0) throw new Error(`armadilha ${id}: lance ${erro} não está em ${nota}`)
  return { id, titulo, lances: pgn(sans), erroNoLance, texto }
})

const capitulo = {
  id: 'italian',
  nome: 'Abertura Italiana',
  fonte: 'Modern Chess Openings — Giuoco Piano, colunas 1–18 (pp. 18–25), e Gambito Evans, colunas 1–6 (pp. 26–29, aqui 19–24)',
  base: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5',
  corPadrao: 'w',
  grupos: [
    { id: 'moller', nome: '4.c3 Nf6 5.d4 exd4 — linhas de ação e Ataque Möller', colunas: [1, 2, 3, 4, 5, 6] },
    { id: 'pianissimo', nome: '4.c3 Nf6 5.d3 — Giuoco Pianissimo', colunas: [7, 8, 9, 10, 11, 12] },
    { id: 'incomuns', nome: 'Linhas menos usuais: 4...Bb6, 4...d6, 5.b4, 4.Nc3 e 4.O-O', colunas: [13, 14, 15, 16, 17, 18] },
    { id: 'evans', nome: '4.b4 — Gambito Evans', colunas: [19, 20, 21, 22, 23, 24] },
  ],
  linhas,
  notas: saidaNotas,
  armadilhas,
}

fs.writeFileSync(`${raiz}/data/openings/italiana.json`, JSON.stringify(capitulo, null, 1) + '\n')
console.log(`ok: ${linhas.length} linhas, ${saidaNotas.length} notas, ${saidaNotas.filter((n) => n.conferir).length} a conferir, ${linhas.reduce((t, l) => t + Object.keys(l.dicas).length, 0)} dicas`)
