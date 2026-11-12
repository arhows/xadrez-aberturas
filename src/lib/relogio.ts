import { Chess } from 'chess.js'
import type { Cor } from './lances'

/** Relógio da tela Jogar: tempo por jogador + acréscimo por lance (Fischer), como nos apps. */

export interface Tempo {
  id: string
  /** Minutos de cada jogador; 0 = sem relógio. */
  minutos: number
  /** Segundos ganhos a cada lance feito. */
  acrescimo: number
  ritmo: string
}

export const TEMPOS: Tempo[] = [
  { id: 'livre', minutos: 0, acrescimo: 0, ritmo: 'Sem relógio' },
  { id: '3+2', minutos: 3, acrescimo: 2, ritmo: 'Blitz' },
  { id: '5+3', minutos: 5, acrescimo: 3, ritmo: 'Blitz' },
  { id: '10+5', minutos: 10, acrescimo: 5, ritmo: 'Rápida' },
  { id: '15+10', minutos: 15, acrescimo: 10, ritmo: 'Rápida' },
  { id: '30+20', minutos: 30, acrescimo: 20, ritmo: 'Clássica' },
]

export const tempoPorId = (id: string | undefined): Tempo => TEMPOS.find((t) => t.id === id) ?? TEMPOS[0]

export type Restante = Record<Cor, number>

export function relogioInicial(tempo: Tempo): Restante {
  const ms = tempo.minutos * 60_000
  return { w: ms, b: ms }
}

/** Desconta o tempo gasto no lance e soma o acréscimo de quem jogou. */
export function aposLance(restante: Restante, quemJogou: Cor, gastoMs: number, tempo: Tempo): Restante {
  return { ...restante, [quemJogou]: Math.max(0, restante[quemJogou] - gastoMs) + tempo.acrescimo * 1000 }
}

/** "2:05"; nos últimos 10 segundos, com décimos: "9.4". */
export function formatarRelogio(ms: number): string {
  const t = Math.max(0, ms)
  if (t < 10_000) return (Math.floor(t / 100) / 10).toFixed(1)
  const s = Math.ceil(t / 1000)
  const minutos = Math.floor(s / 60)
  return `${minutos}:${String(s % 60).padStart(2, '0')}`
}

/**
 * Quem tem só o rei, ou rei e um bispo ou cavalo, não consegue dar mate. Se o tempo de um
 * lado acaba e o outro está nessa situação, a partida empata (regra usada pelos apps).
 */
export function semMaterialParaMate(fen: string, cor: Cor): boolean {
  const pecas = new Chess(fen)
    .board()
    .flat()
    .filter((casa) => casa && casa.color === cor && casa.type !== 'k')
  return pecas.length === 0 || (pecas.length === 1 && (pecas[0]!.type === 'b' || pecas[0]!.type === 'n'))
}
