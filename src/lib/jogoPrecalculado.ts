import { Chess } from 'chess.js'

/**
 * Lances das aberturas conferidos na hora do build, para o app não conferir no chess.js a cada
 * abertura (era o que mais demorava ao abrir). O build anexa a cada linha, nota e armadilha um
 * `_jogo` com os lances em UCI; no aparelho basta aplicá-los ao tabuleiro, sem gerar lances
 * legais. Sem `_jogo` (nos testes, que leem os JSON direto), tudo é conferido como antes.
 */
export interface JogoPrecalculado {
  /** Lances em UCI separados por espaço ("e2e4 e7e5 g1f3"), até o primeiro ilegal. */
  u: string
  /** SAN como o chess.js escreve, só quando difere do texto do arquivo (ex.: falta o "+"). */
  s?: string
  /** Ply do primeiro lance ilegal, quando há. */
  e?: number
}

/** Confere os lances no chess.js e devolve o que o app precisa para reproduzi-los depressa. */
export function precalcularJogo(tokens: string[]): JogoPrecalculado {
  const chess = new Chess()
  const uci: string[] = []
  const sans: string[] = []
  for (const [i, token] of tokens.entries()) {
    try {
      const lance = chess.move(token)
      uci.push(lance.from + lance.to + (lance.promotion ?? ''))
      sans.push(lance.san)
    } catch {
      return { u: uci.join(' '), ...(sans.some((s, j) => s !== tokens[j]) ? { s: sans.join(' ') } : {}), e: i + 1 }
    }
  }
  return { u: uci.join(' '), ...(sans.some((s, j) => s !== tokens[j]) ? { s: sans.join(' ') } : {}) }
}

const ARQUIVOS = 'abcdefgh'
const casa = (nome: string) => (8 - Number(nome[1])) * 8 + ARQUIVOS.indexOf(nome[0])
const nomeDaCasa = (i: number) => `${ARQUIVOS[i % 8]}${8 - Math.floor(i / 8)}`

/** Direitos de roque perdidos quando algo sai de (ou é capturado em) cada casa. */
const ROQUE_DA_CASA: Record<string, string> = { e1: 'KQ', h1: 'K', a1: 'Q', e8: 'kq', h8: 'k', a8: 'q' }

/**
 * Aplica um lance UCI já conferido e devolve o FEN seguinte, igual ao do chess.js (inclusive na
 * casa de en passant, que o chess.js só escreve quando a captura é possível).
 */
export function aplicarUci(fen: string, uci: string): string {
  const [posicao, vez, roque, , meios, numero] = fen.split(' ')
  const tabuleiro: string[] = []
  for (const letra of posicao) {
    if (letra === '/') continue
    if (letra >= '1' && letra <= '8') for (let k = 0; k < Number(letra); k++) tabuleiro.push('')
    else tabuleiro.push(letra)
  }
  const de = casa(uci.slice(0, 2))
  const para = casa(uci.slice(2, 4))
  const peca = tabuleiro[de]
  const ehPeao = peca === 'P' || peca === 'p'
  let capturou = tabuleiro[para] !== ''

  // En passant: o peão vai na diagonal para uma casa vazia; o capturado está atrás dela.
  if (ehPeao && de % 8 !== para % 8 && !capturou) {
    tabuleiro[para + (peca === 'P' ? 8 : -8)] = ''
    capturou = true
  }
  tabuleiro[para] = uci.length > 4 ? (peca === 'P' ? uci[4].toUpperCase() : uci[4]) : peca
  tabuleiro[de] = ''
  // Roque: o rei anda duas colunas e a torre passa por cima dele.
  if ((peca === 'K' || peca === 'k') && Math.abs((para % 8) - (de % 8)) === 2) {
    const curto = para % 8 === 6
    const torreDe = curto ? para + 1 : para - 2
    const torrePara = curto ? para - 1 : para + 1
    tabuleiro[torrePara] = tabuleiro[torreDe]
    tabuleiro[torreDe] = ''
  }

  let novosDireitos = roque === '-' ? '' : roque
  for (const nome of [nomeDaCasa(de), nomeDaCasa(para)]) {
    for (const letra of ROQUE_DA_CASA[nome] ?? '') novosDireitos = novosDireitos.replace(letra, '')
  }

  const linhas: string[] = []
  for (let l = 0; l < 8; l++) {
    let texto = ''
    let vazias = 0
    for (let c = 0; c < 8; c++) {
      const p = tabuleiro[l * 8 + c]
      if (!p) vazias++
      else {
        if (vazias) texto += vazias
        vazias = 0
        texto += p
      }
    }
    linhas.push(texto + (vazias || ''))
  }

  const outraVez = vez === 'w' ? 'b' : 'w'
  const meiosLances = ehPeao || capturou ? 0 : Number(meios) + 1
  const numeroDoLance = vez === 'b' ? Number(numero) + 1 : Number(numero)
  let enPassant = '-'
  if (ehPeao && Math.abs(para - de) === 16) {
    const inimigo = peca === 'P' ? 'p' : 'P'
    const ao = [para % 8 > 0 ? tabuleiro[para - 1] : '', para % 8 < 7 ? tabuleiro[para + 1] : '']
    if (ao.includes(inimigo)) enPassant = nomeDaCasa((de + para) / 2)
  }
  const saida = [linhas.join('/'), outraVez, novosDireitos || '-', enPassant, meiosLances, numeroDoLance].join(' ')
  // Caso raro (peão inimigo ao lado): o chess.js confere se a captura deixaria o rei em xeque.
  return enPassant === '-' ? saida : new Chess(saida).fen()
}
