// Busca de mate com o chess.js, usada pelos geradores de exercícios.
import { Chess } from 'chess.js'

/** O lado da vez tem mate em 1 (o SAN do chess.js marca o mate com #). */
export const temMateEm1 = (jogo) => jogo.moves().some((san) => san.endsWith('#'))

/** Lances que forçam mate em até `lances` lances (1 ou 2). */
export function solucoes(fen, lances) {
  const jogo = new Chess(fen)
  if (lances === 1) return jogo.moves().filter((san) => san.endsWith('#'))
  return jogo.moves().filter((san) => {
    jogo.move(san)
    let forca = jogo.isCheckmate()
    if (!forca && !jogo.isGameOver()) {
      forca = jogo.moves().every((resposta) => {
        jogo.move(resposta)
        const mate = temMateEm1(jogo)
        jogo.undo()
        return mate
      })
    }
    jogo.undo()
    return forca
  })
}

/** Xeques primeiro, depois capturas: acelera achar o mate quando ele existe. */
export function ordenados(jogo) {
  const peso = (san) => (san.includes('+') || san.includes('#') ? 0 : san.includes('x') ? 1 : 2)
  return jogo.moves().sort((a, b) => peso(a) - peso(b))
}

/** O lado da vez dá mate em até `n` lances. */
export function existeMate(jogo, n) {
  if (n === 1) return temMateEm1(jogo)
  return ordenados(jogo).some((san) => forcaMate(jogo, san, n))
}

/** O lance força mate em até `n` lances contando com ele mesmo. */
export function forcaMate(jogo, san, n) {
  jogo.move(san)
  let forca = jogo.isCheckmate()
  if (!forca && !jogo.isGameOver() && n > 1) {
    forca = jogo.moves().every((resposta) => {
      jogo.move(resposta)
      const ok = existeMate(jogo, n - 1)
      jogo.undo()
      return ok
    })
  }
  jogo.undo()
  return forca
}

/**
 * Defesa mais resistente contra a chave, quando o atacante ainda tem `restantes` lances: a
 * que não permite mate mais curto e deixa menos lances que forçam o mate. A tela usa esta
 * resposta quando o usuário acha a chave.
 */
export function melhorDefesa(jogo, restantes = 2) {
  let melhor = null
  for (const resposta of jogo.moves()) {
    jogo.move(resposta)
    const pontos = existeMate(jogo, restantes - 1)
      ? 1000
      : jogo.moves().filter((san) => forcaMate(jogo, san, restantes)).length
    jogo.undo()
    if (!melhor || pontos < melhor.pontos) melhor = { resposta, pontos }
  }
  return melhor?.resposta
}

