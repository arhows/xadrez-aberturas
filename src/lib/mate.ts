import { Chess } from 'chess.js'

/** Lógica de mate dos exercícios, sem dados: também roda no worker de análise. */

export interface LanceVerificado {
  san: string
  from: string
  to: string
  fenDepois: string
  mate: boolean
}

export type Resposta =
  /** Todas as respostas permitem o mate: esta é a defesa mais resistente. */
  | { tipo: 'defesa'; lance: LanceVerificado }
  /** A resposta escapa do mate no prazo; sem `lance`, o lance afogou o rei. */
  | { tipo: 'refutacao'; lance?: LanceVerificado }

/** O lado da vez tem mate em 1 (o SAN do chess.js marca o mate com #). */
const temMateEm1 = (jogo: Chess) => jogo.moves().some((san) => san.endsWith('#'))

/** Xeques primeiro, depois capturas: acelera achar o mate (ou a refutação) quando existe. */
function ordenados(jogo: Chess): string[] {
  const peso = (san: string) => (san.includes('+') || san.includes('#') ? 0 : san.includes('x') ? 1 : 2)
  return jogo.moves().sort((a, b) => peso(a) - peso(b))
}

/** O lado da vez dá mate em até `n` lances (n = 1 ou 2). */
function existeMate(jogo: Chess, n: number): boolean {
  if (n <= 1) return temMateEm1(jogo)
  return ordenados(jogo).some((san) => forcaMate(jogo, san, n))
}

/** O lance força mate em até `n` lances, contando com ele mesmo. */
function forcaMate(jogo: Chess, san: string, n: number): boolean {
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

/** Joga um lance em SAN e devolve o resultado no formato da tela. */
export function jogarSan(fen: string, san: string): LanceVerificado {
  const jogo = new Chess(fen)
  const lance = jogo.move(san)
  return { san: lance.san, from: lance.from, to: lance.to, fenDepois: jogo.fen(), mate: jogo.isCheckmate() }
}

/** Lances que dão mate imediato. */
export function matesEm1(fen: string): string[] {
  return new Chess(fen).moves().filter((san) => san.endsWith('#'))
}

/** Um lance que força mate em até `n` lances (para a pista), ou undefined. */
export function chaveDoMate(fen: string, n: number): string | undefined {
  const jogo = new Chess(fen)
  return ordenados(jogo).find((san) => forcaMate(jogo, san, n))
}

/**
 * Responde pelo defensor depois de um lance do atacante, que ainda terá `restantes` lances
 * para dar o mate. Devolve a primeira resposta que escapa (refutação) ou, se todas perdem, a
 * mais resistente: a que não permite mate imediato e deixa menos lances que forçam o mate.
 */
export function responder(fenDepois: string, restantes = 1): Resposta {
  const jogo = new Chess(fenDepois)
  let melhor: { lance: LanceVerificado; pontos: number } | null = null
  for (const resposta of ordenados(jogo)) {
    const feito = jogo.move(resposta)
    const lance = { san: feito.san, from: feito.from, to: feito.to, fenDepois: jogo.fen(), mate: false }
    let pontos: number
    if (!existeMate(jogo, restantes)) {
      jogo.undo()
      return { tipo: 'refutacao', lance }
    }
    if (restantes === 1) pontos = matesEm1(jogo.fen()).length
    else pontos = temMateEm1(jogo) ? 1000 : jogo.moves().filter((san) => forcaMate(jogo, san, restantes)).length
    jogo.undo()
    if (!melhor || pontos < melhor.pontos) melhor = { lance, pontos }
  }
  return melhor ? { tipo: 'defesa', lance: melhor.lance } : { tipo: 'refutacao' }
}
