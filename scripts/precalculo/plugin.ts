import { readFileSync } from 'node:fs'
import type { Plugin } from 'vite'
import { precalcularJogo } from '../../src/lib/jogoPrecalculado'
import { separarLances } from '../../src/lib/lances'

/**
 * Ao empacotar data/openings/*.json, anexa a cada linha, nota e armadilha os lances já conferidos
 * (`_jogo`, ver src/lib/jogoPrecalculado.ts). O trabalho pesado do chess.js fica no build, e o app
 * abre sem conferir dezenas de milhares de lances.
 */
export function pluginLancesPrecalculados(): Plugin {
  const memoria = new Map<string, ReturnType<typeof precalcularJogo>>()
  const precalcular = (texto: string) => {
    let jogo = memoria.get(texto)
    if (!jogo) memoria.set(texto, (jogo = precalcularJogo(separarLances(texto))))
    return jogo
  }
  return {
    name: 'lances-precalculados',
    enforce: 'pre',
    load(id) {
      const caminho = id.split('?')[0].replaceAll('\\', '/')
      if (!/\/data\/openings\/[^/]+\.json$/.test(caminho)) return null
      const capitulo = JSON.parse(readFileSync(caminho, 'utf-8'))
      for (const lista of [capitulo.linhas, capitulo.notas, capitulo.armadilhas]) {
        for (const item of lista ?? []) if (typeof item.lances === 'string') item._jogo = precalcular(item.lances)
      }
      return JSON.stringify(capitulo)
    },
  }
}
