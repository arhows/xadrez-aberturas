import type { CapituloCarregado } from './capitulos'
import { corDoCapitulo } from './escopo'
import { jogarLances } from './lances'
import { progresso } from './progresso'

const FEN_INICIAL = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
const cache = new Map<string, string>()

/** Posição que dá nome à abertura: a da linha base do capítulo ("1.e4 c5" na Siciliana). */
export function fenDaAbertura(capitulo: CapituloCarregado): string {
  const base = capitulo.capitulo.base
  let fen = cache.get(base)
  if (fen === undefined) {
    const { lances } = jogarLances(base)
    fen = lances.at(-1)?.fenDepois ?? FEN_INICIAL
    cache.set(base, fen)
  }
  return fen
}

/** O tabuleiro fica do lado de quem a pessoa joga na abertura (brancas quando joga as duas). */
export function orientacaoDaAbertura(capitulo: CapituloCarregado): 'white' | 'black' {
  return corDoCapitulo(capitulo, progresso.corPorCapitulo) === 'b' ? 'black' : 'white'
}
