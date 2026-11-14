import type { Cor } from './lances'

/**
 * Partidas jogadas no app (tela Jogar, modo Partida), guardadas no progresso para analisar
 * depois. Ficam as 100 mais recentes; apagar deixa só a marca `apagada`, para a
 * sincronização não trazer a partida de volta de outro aparelho.
 */

export const LIMITE_DE_JOGOS = 100

export interface JogoSalvo {
  id: string
  /** Data e hora do fim (ISO). */
  data: string
  /** Todos os lances desde a posição inicial (SAN separados por espaço). */
  lances: string
  /** Quantos meios-lances eram a posição de partida (vinda do Treino ou do Explorar). */
  inicio: number
  /** Posição de partida montada no editor; sem ela, a posição inicial. */
  fen?: string
  /** Computador (tela Jogar) ou amigo on-line. */
  adversario: 'motor' | 'online'
  /** Nome do amigo, nas partidas on-line. */
  oponente?: string
  /** Conta do amigo, para mostrar a foto dele. */
  oponenteUid?: string
  nivel?: number
  /** Rating da Maia, quando o computador foi a Maia (sem ele, o nível é do Stockfish). */
  maia?: number
  /** Cor da pessoa contra o computador. */
  cor?: Cor
  /** Id do tempo ("5+3", "livre"). */
  tempo: string
  /** "1-0", "0-1" ou "1/2-1/2". */
  resultado: string
  /** Como terminou, em texto ("Xeque-mate: as pretas venceram."). */
  motivo: string
  capitulo?: string
  apagada?: boolean
}

export function novoIdDeJogo(agora = new Date(), aleatorio = Math.random): string {
  return `${agora.getTime().toString(36)}-${Math.floor(aleatorio() * 1e6).toString(36)}`
}

/** Mantém as `limite` partidas mais recentes (as apagadas continuam como marca). */
export function podarJogos(jogos: Record<string, JogoSalvo>, limite = LIMITE_DE_JOGOS): Record<string, JogoSalvo> {
  const ativos = Object.values(jogos)
    .filter((j) => !j.apagada)
    .sort((a, b) => b.data.localeCompare(a.data))
  const sobram = new Set(ativos.slice(0, limite).map((j) => j.id))
  return Object.fromEntries(Object.entries(jogos).filter(([id, j]) => j.apagada || sobram.has(id)))
}

export function salvarJogo(jogos: Record<string, JogoSalvo>, jogo: JogoSalvo): Record<string, JogoSalvo> {
  return podarJogos({ ...jogos, [jogo.id]: jogo })
}

/** Apagada vence: uma vez apagada em um aparelho, some em todos. */
export function juntarJogos(a: Record<string, JogoSalvo>, b: Record<string, JogoSalvo>): Record<string, JogoSalvo> {
  const junto: Record<string, JogoSalvo> = { ...a }
  for (const [id, jogo] of Object.entries(b)) {
    junto[id] = junto[id]?.apagada || jogo.apagada ? { ...(junto[id] ?? jogo), apagada: true } : jogo
  }
  return podarJogos(junto)
}

export function jogosVisiveis(jogos: Record<string, JogoSalvo>): JogoSalvo[] {
  return Object.values(jogos)
    .filter((j) => !j.apagada)
    .sort((a, b) => b.data.localeCompare(a.data))
}

/** Resultado do ponto de vista da pessoa (ou só o placar, se a cor não ficou registrada). */
export function textoDoResultado(jogo: JogoSalvo): string {
  if (!jogo.cor) return jogo.resultado.replace('1/2-1/2', '½-½')
  if (jogo.resultado === '1/2-1/2') return 'Empate'
  return (jogo.resultado === '1-0') === (jogo.cor === 'w') ? 'Vitória' : 'Derrota'
}
