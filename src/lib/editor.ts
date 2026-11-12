import { Chess, validateFen } from 'chess.js'

/**
 * Editor de posição (como o do lichess): monta a posição peça por peça, escolhe a vez e os
 * roques, e confere se ela é válida para analisar ou jogar.
 */

export type Vez = 'w' | 'b'
export interface Roques {
  K: boolean
  Q: boolean
  k: boolean
  q: boolean
}
export interface PosicaoEditor {
  /** Casa → peça em notação FEN (K, q, p...). */
  pecas: Map<string, string>
  vez: Vez
  roques: Roques
}

export const COLUNAS = 'abcdefgh'
export const FEN_INICIAL = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
export const FEN_VAZIO = '8/8/8/8/8/8/8/8 w - - 0 1'

export function lerPosicao(fen: string): PosicaoEditor {
  const [disposicao = '', vez = 'w', roques = '-'] = fen.trim().split(/\s+/)
  const pecas = new Map<string, string>()
  disposicao.split('/').forEach((linha, i) => {
    let coluna = 0
    for (const c of linha) {
      if (/\d/.test(c)) coluna += Number(c)
      else {
        if (coluna < 8 && i < 8) pecas.set(`${COLUNAS[coluna]}${8 - i}`, c)
        coluna++
      }
    }
  })
  return {
    pecas,
    vez: vez === 'b' ? 'b' : 'w',
    roques: { K: roques.includes('K'), Q: roques.includes('Q'), k: roques.includes('k'), q: roques.includes('q') },
  }
}

export function disposicaoDas(pecas: Map<string, string>): string {
  const linhas: string[] = []
  for (let f = 8; f >= 1; f--) {
    let linha = ''
    let vazias = 0
    for (const c of COLUNAS) {
      const p = pecas.get(`${c}${f}`)
      if (!p) vazias++
      else {
        linha += (vazias || '') + p
        vazias = 0
      }
    }
    linhas.push(linha + (vazias || ''))
  }
  return linhas.join('/')
}

/** Roques que a posição permite: rei e torre nas casas de origem. */
export function roquesPossiveis(pecas: Map<string, string>): Roques {
  return {
    K: pecas.get('e1') === 'K' && pecas.get('h1') === 'R',
    Q: pecas.get('e1') === 'K' && pecas.get('a1') === 'R',
    k: pecas.get('e8') === 'k' && pecas.get('h8') === 'r',
    q: pecas.get('e8') === 'k' && pecas.get('a8') === 'r',
  }
}

export function fenDaPosicao(posicao: PosicaoEditor): string {
  const possiveis = roquesPossiveis(posicao.pecas)
  const roques = (['K', 'Q', 'k', 'q'] as const).filter((r) => posicao.roques[r] && possiveis[r]).join('') || '-'
  return `${disposicaoDas(posicao.pecas)} ${posicao.vez} ${roques} - 0 1`
}

/** Toque numa casa com uma peça escolhida: coloca; a mesma peça de novo tira. */
export function colocarPeca(pecas: Map<string, string>, casa: string, peca: string | null): Map<string, string> {
  const nova = new Map(pecas)
  if (peca === null || nova.get(casa) === peca) nova.delete(casa)
  else nova.set(casa, peca)
  return nova
}

/** Motivo para a posição não poder ser analisada nem jogada, ou null se está tudo certo. */
export function problemaDaPosicao(fen: string): string | null {
  const { pecas, vez } = lerPosicao(fen)
  const lista = [...pecas.values()]
  const reis = (r: string) => lista.filter((p) => p === r).length
  if (reis('K') !== 1) return reis('K') ? 'Há mais de um rei branco.' : 'Falta o rei branco.'
  if (reis('k') !== 1) return reis('k') ? 'Há mais de um rei preto.' : 'Falta o rei preto.'
  for (const [casa, p] of pecas) {
    if ((p === 'P' || p === 'p') && (casa[1] === '1' || casa[1] === '8')) return `Peão em ${casa}: peões não ficam na 1ª nem na 8ª fileira.`
  }
  if (lista.filter((p) => p === 'P').length > 8 || lista.filter((p) => p === 'p').length > 8) return 'Mais de 8 peões de uma cor.'
  const outro = fen.replace(/ [wb] /, vez === 'w' ? ' b ' : ' w ')
  try {
    if (new Chess(outro).inCheck()) {
      return `O rei ${vez === 'w' ? 'preto' : 'branco'} está em xeque, mas a vez é das ${vez === 'w' ? 'brancas' : 'pretas'}.`
    }
  } catch {
    // validado abaixo
  }
  const validacao = validateFen(fen)
  if (!validacao.ok) return 'Posição inválida.'
  return null
}

/** Lê um FEN colado; devolve null se não der nem para desenhar. */
export function fenColado(texto: string): string | null {
  const partes = texto.trim().split(/\s+/)
  if (!partes[0] || partes[0].split('/').length !== 8) return null
  if (!/^[pnbrqkPNBRQK1-8/]+$/.test(partes[0])) return null
  const vez = partes[1] === 'b' ? 'b' : 'w'
  const roques = partes[2] && /^(-|[KQkq]+)$/.test(partes[2]) ? partes[2] : '-'
  const enPassant = partes[3] && /^(-|[a-h][36])$/.test(partes[3]) ? partes[3] : '-'
  const meio = /^\d+$/.test(partes[4] ?? '') ? partes[4] : '0'
  const numero = /^\d+$/.test(partes[5] ?? '') && Number(partes[5]) > 0 ? partes[5] : '1'
  return `${partes[0]} ${vez} ${roques} ${enPassant} ${meio} ${numero}`
}
