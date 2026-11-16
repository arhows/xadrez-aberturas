import { Chess } from 'chess.js'

/** Que som a mudança de posição pede, como no lichess. */
export type SomDoLance = 'lance' | 'captura' | 'xeque' | 'mate' | 'empate'

/** Expande a disposição do FEN em 64 casas ('' = vazia), da a8 à h1. */
function casas(fen: string): string[] {
  const disposicao = fen.split(' ')[0] ?? ''
  const resultado: string[] = []
  for (const c of disposicao) {
    if (c === '/') continue
    if (c >= '1' && c <= '8') for (let i = 0; i < Number(c); i++) resultado.push('')
    else resultado.push(c)
  }
  return resultado
}

/**
 * Classifica a passagem de uma posição para outra. Se for um lance legal, conta captura, xeque,
 * mate e empate; se não der para conferir (posições sem rei, lance desfeito), olha só quantas
 * casas mudaram. Saltos maiores (abrir outra linha, outro exercício) ficam em silêncio.
 */
export function somDoLance(antes: string, depois: string): SomDoLance | null {
  const de = casas(antes)
  const para = casas(depois)
  if (de.length !== 64 || para.length !== 64) return null
  if (de.every((peca, i) => peca === para[i])) return null

  try {
    const jogo = new Chess(antes)
    const disposicaoDepois = depois.split(' ')[0]
    const lance = jogo.moves({ verbose: true }).find((m) => m.after.split(' ')[0] === disposicaoDepois)
    if (lance) {
      const fim = new Chess(lance.after)
      if (fim.isCheckmate()) return 'mate'
      if (fim.isStalemate() || fim.isInsufficientMaterial()) return 'empate'
      if (fim.inCheck()) return 'xeque'
      return lance.captured ? 'captura' : 'lance'
    }
  } catch {
    // Posição que o chess.js não aceita (lições sem reis): cai na contagem abaixo.
  }

  // Lance comum muda 2 casas; roque e en passant, até 4.
  const mudadas = de.filter((peca, i) => peca !== para[i]).length
  if (mudadas < 2 || mudadas > 4) return null
  const pecas = (lista: string[]) => lista.filter(Boolean).length
  return pecas(para) < pecas(de) ? 'captura' : 'lance'
}
