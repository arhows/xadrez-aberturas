// Ameaças e armadilhas da Italiana, selecionadas a partir da análise do Stockfish 19.
// Cada ameaça foi um lance que o motor confirmou como forte se o mesmo lado jogasse de novo.
const A = (lance, texto) => ({ lance, texto })
const PEGA_DAMA = 'ameaça pegar a dama.'

const ameacas = {
  c01: {
    '2. Nf3': A('Nxe5', 'As brancas ameaçam pegar o peão de e5.'),
    '4. c3': A('d4', 'Ameaça d4, atacando ao mesmo tempo o bispo de c5 e o peão de e5.'),
    '4... Nf6': A('Nxe4', 'As pretas ameaçam pegar o peão de e4, que está sem defesa.'),
    '5. d4': A('dxc5', 'Se as pretas não reagirem, o peão captura o bispo de c5.'),
    '7. Bd2': A('d5', 'Ameaça d5: o peão expulsa o cavalo de c6, que é quem defende o bispo de b4.'),
    '10. Qb3': A('Bxd5', 'Dama e bispo atacam o cavalo de d5, que só a dama preta defende.'),
    '10... Na5': A('Nxb3', `O cavalo ${PEGA_DAMA}`),
    '12. Bb5': A('Bxc6+', 'O cavalo de c6 está cravado: as brancas ameaçam pegá-lo com xeque.'),
  },
  c02: {
    '9. Nc3': A('Nxd5', 'Bispo e cavalo atacam o cavalo de d5, que só a dama preta defende.'),
    '10. Qe2': A('Bxd5', 'O bispo de e6 está cravado e não pode retomar: as brancas ameaçam ganhar o cavalo de d5.'),
    '11... Nxc3': A('Nxe2', `O cavalo ${PEGA_DAMA}`),
  },
  c03: {
    '7. Nc3': A('e5', 'Ameaça e5, atacando o cavalo de f6.'),
    '8. O-O': A('Re1', 'Ameaça Re1, atacando o cavalo de e4 pela coluna aberta.'),
    '9. d5': A('dxc6', 'O peão ameaça pegar o cavalo de c6.'),
    '13. Nxg5': A('Qh5', 'Ameaça Qh5, com dama e cavalo contra h7 e f7; as pretas precisam cuidar do flanco do rei.'),
  },
  c04: {
    '11. Qd4': A('Qxe4+', 'A dama ataca c4, e4 e g7 ao mesmo tempo: as pretas não conseguem salvar tudo.'),
    '12... Nd6': A('Nxe4', `O cavalo ${PEGA_DAMA}`),
  },
  c05: {
    '10. Bg5': A('Bxd8', `O bispo ${PEGA_DAMA}`),
  },
  c06: {
    '6. e5': A('exf6', 'O peão ameaça pegar o cavalo de f6.'),
    '6... d5': A('dxc4', 'O peão ameaça pegar o bispo de c4.'),
    '11... c6': A('cxb5', 'O peão ameaça pegar o bispo de b5.'),
  },
  c07: {
    '6. O-O': A('d4', 'Ameaça d4, atacando ao mesmo tempo o bispo de c5 e o peão de e5.'),
  },
  c10: {
    '7. a4': A('a5', 'Ameaça a5: o bispo de b6 ficaria sem uma casa segura.'),
    '10... g5': A('gxh4', 'O peão ameaça pegar o bispo de h4.'),
  },
  c11: {
    '8. b5': A('bxc6', 'O peão ameaça pegar o cavalo de c6.'),
  },
  c15: {
    '11. a5': A('axb6', 'O peão ameaça pegar o bispo de b6.'),
  },
  c16: {
    '8. Nd5': A('Nxf6+', `O cavalo ${PEGA_DAMA.replace('.', ' com xeque.')}`),
    '11... Nf4': A('Nxg2+', 'O cavalo ameaça pegar o peão de g2 com xeque.'),
  },
  c17: {
    '8. d4': A('dxc5', 'Ameaça pegar o bispo de c5; por isso as pretas trocam antes em b3.'),
  },
  c18: {
    '10... Ne6': A('Nxg5', 'O cavalo ameaça pegar o bispo de g5.'),
    '11... Bxe6': A('Qc5+', 'Ameaça Qc5+, com xeque na diagonal aberta pela troca em f4; por isso as brancas costumam jogar Kh1.'),
  },
  c19: {
    '4. b4': A('bxc5', 'O peão ameaça pegar o bispo de c5.'),
    '9. Qb3': A('Bxf7+', 'A bateria de dama e bispo ameaça Bxf7+, ganhando um peão com xeque.'),
    '10. Bg5': A('Bxf6', `O bispo ${PEGA_DAMA}`),
  },
  c20: {
    '11. Bb5': A('Bxc6+', 'O cavalo de c6 está cravado: as brancas ameaçam pegá-lo com xeque.'),
  },
  c21: {
    '8. Qb3': A('Bxf7+', 'A bateria de dama e bispo ameaça Bxf7+, ganhando um peão com xeque.'),
    '9. e5': A('exf6', `O peão ${PEGA_DAMA}`),
  },
  c22: {
    '7. Qb3': A('Bxf7+', 'A bateria de dama e bispo ameaça Bxf7+, ganhando um peão com xeque.'),
    '10. a5': A('axb6', 'O peão ameaça pegar o bispo de b6.'),
    '10... Nxa5': A('Nxb3', 'O cavalo ameaça pegar a dama, e ainda ataca o bispo de c4.'),
  },
  c23: {
    '6... Na5': A('Nxc4', 'O cavalo ameaça pegar o bispo de c4.'),
    '9... Nc6': A('Nxd4', `O cavalo ${PEGA_DAMA}`),
    '11. Qg3': A('Qxg7', 'A dama ameaça pegar g7 e atacar a torre de h8; por isso as pretas jogam ...g6.'),
  },
  c24: {
    '5. a4': A('a5', 'Ameaça a5: o bispo de b6 ficaria sem uma casa segura.'),
    '9. a5': A('axb6', 'O peão ameaça pegar o bispo de b6.'),
  },
}

// [id, título, nota de origem, lance do erro, texto]. Todas conferidas no motor:
// o erro perde pelo menos 0,9 peão e a punição do livro é o melhor lance.
const armadilhas = [
  ['ev-13nxg5', 'Evans, Defesa Lasker: 13.Nxg5? Kf8!', 'c19-f', '13. Nxg5',
    'Retomar o peão com o cavalo parece natural, mas 13...Kf8! ataca o bispo preso em g8. Depois de 14.Ne6+ Kxg8 15.Nxc7+ Kf8 16.Nxa8 Bh3 17.g3 Qxe4, as pretas vencem.'],
  ['ev-7d3', 'Evans, 5...Bc5: 7...d3?! e o golpe em f7', 'c19-a', '7... d3',
    'Avançar o peão deixa f7 e o bispo de c5 vulneráveis: 8.Ng5 Ne5 9.Nxf7! Nxf7 10.Bxf7+ Kxf7 11.Qh5+, com garfo no rei e no bispo de c5.'],
  ['ev-8qe7', 'Evans, Defesa Comprometida: 8...Qe7?', 'c21-k', '8... Qe7',
    'Defender f7 com a dama em e7, em vez de 8...Qf6, permite 10.Bxf7+! Kd8 e, depois das trocas, as brancas ficam melhor.'],
  ['it-5d5', 'Giuoco Pianissimo: 5...d5 cedo demais', 'c07-a', '5... d5',
    'Romper o centro antes de preparar abre a diagonal do bispo de c4: 6.exd5 Nxd5 7.Qb3 forma a bateria contra d5 e f7, e as brancas ficam melhor.'],
  ['it-13nxa1', 'Coluna 1: 13...Nxa1? pegando a torre', 'c01-c-1', '13... Nxa1',
    'Pegar a torre tira o cavalo do jogo: 14.Bxf7+ Kh8 15.Qh5 e as brancas atacam o rei.'],
  ['it-17bd7', 'Ataque Möller: 17...Bd7?? depois do sacrifício em h7', 'c03-n-1-1', '17... Bd7',
    'Depois de 14.Nxh7! Kxh7 15.Qh5+ Kg8 16.Rh4 f5 17.Be2, desenvolver o bispo perde: 18.Qh7+ Kf7 19.Rh6! e as brancas vencem. O correto é 17...Ng6.'],
  ['it-13bxd4', '4.c3 Bb6: 13...Bxd4? por peões', 'c13-b', '13... Bxd4',
    'Trocar o bispo em d4 dá uma peça por dois peões: depois de 14.cxd4 Nxd4 15.Be2, as brancas ficam com vantagem clara.'],
]

module.exports = { ameacas, armadilhas }
