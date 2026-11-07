import { corDoPly, numeroDoPly } from './lances'
import { formatarSan, formatarTexto } from './notacao'
import { progresso } from './progresso'

/** Atalhos que respeitam a notação escolhida nas configurações. */
export const fmtSan = (san: string) => formatarSan(san, progresso.config.notacao)

export const fmtTexto = (texto: string) => formatarTexto(texto, progresso.config.notacao)

/** Forma compacta usada na tela: "4.Ng5", "11...exd3". */
export function fmtLance(ply: number, san: string): string {
  return `${numeroDoPly(ply)}${corDoPly(ply) === 'w' ? '.' : '...'}${fmtSan(san)}`
}
