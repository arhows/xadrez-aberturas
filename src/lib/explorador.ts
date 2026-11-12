/**
 * Estatísticas do explorador de aberturas do lichess (partidas de mestres ou do próprio
 * lichess) para uma posição. Só a posição (FEN) vai na consulta.
 */

export type FonteExplorador = 'masters' | 'lichess'

export interface LanceExplorador {
  san: string
  brancas: number
  empates: number
  pretas: number
  total: number
  mediaRating: number
}

export interface Estatisticas {
  total: number
  lances: LanceExplorador[]
}

interface RespostaLichess {
  white: number
  draws: number
  black: number
  moves: { san: string; white: number; draws: number; black: number; averageRating: number }[]
}

export class ErroExplorador extends Error {
  constructor(
    message: string,
    readonly tipo: 'sem-login' | 'limite' | 'rede',
  ) {
    super(message)
  }
}

/** Faixas de rating do explorador do lichess. */
export const FAIXAS_RATING = [0, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2500] as const

/** A faixa escolhida e as duas vizinhas: amostra boa sem fugir do nível da pessoa. */
export function faixasPerto(rating: number): number[] {
  const i = FAIXAS_RATING.findIndex((faixa) => faixa === rating)
  const centro = i < 0 ? 4 : i
  return FAIXAS_RATING.slice(Math.max(0, centro - 1), centro + 2) as unknown as number[]
}

export function converter(resposta: RespostaLichess): Estatisticas {
  return {
    total: resposta.white + resposta.draws + resposta.black,
    lances: resposta.moves.map((lance) => ({
      san: lance.san,
      brancas: lance.white,
      empates: lance.draws,
      pretas: lance.black,
      total: lance.white + lance.draws + lance.black,
      mediaRating: lance.averageRating,
    })),
  }
}

const cache = new Map<string, Estatisticas>()
/** O lichess pede uma consulta por vez e, depois de um 429, um minuto de espera. */
let liberadoEm = 0

export async function buscarEstatisticas(
  fen: string,
  fonte: FonteExplorador,
  token: string,
  rating: number,
): Promise<Estatisticas> {
  const parametros = new URLSearchParams({ fen, moves: '12', topGames: '0', recentGames: '0' })
  if (fonte === 'lichess') {
    parametros.set('variant', 'standard')
    parametros.set('speeds', 'blitz,rapid,classical')
    parametros.set('ratings', faixasPerto(rating).join(','))
  }
  const url = `https://explorer.lichess.ovh/${fonte}?${parametros}`
  const guardado = cache.get(url)
  if (guardado) return guardado
  if (Date.now() < liberadoEm) throw new ErroExplorador('O lichess pediu uma pausa. Tente de novo em um minuto.', 'limite')

  let resposta: Response
  try {
    resposta = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  } catch {
    throw new ErroExplorador('Sem conexão com o lichess agora.', 'rede')
  }
  if (resposta.status === 401) throw new ErroExplorador('A conexão com o lichess expirou. Conecte de novo.', 'sem-login')
  if (resposta.status === 429) {
    liberadoEm = Date.now() + 60_000
    throw new ErroExplorador('O lichess pediu uma pausa. Tente de novo em um minuto.', 'limite')
  }
  if (!resposta.ok) throw new ErroExplorador(`O lichess respondeu com erro ${resposta.status}.`, 'rede')
  const estatisticas = converter((await resposta.json()) as RespostaLichess)
  cache.set(url, estatisticas)
  return estatisticas
}
