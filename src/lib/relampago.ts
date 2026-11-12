import type { Aresta } from './arvore'
import type { CapituloCarregado } from './capitulos'
import { corDoCapitulo, coresDaEscolha, type EscolhaCor } from './escopo'
import { chaveDaPosicao, type Cor } from './lances'

/**
 * Modo relâmpago: posições sorteadas das colunas do repertório, sempre na vez da cor que a
 * pessoa treina naquela abertura. Vale qualquer lance do livro da posição.
 */

export interface PerguntaRelampago {
  capitulo: CapituloCarregado
  linha: string
  cor: Cor
  fen: string
  /** Lances até a posição (SAN). */
  antes: string[]
  /** O lance da coluna sorteada (mostrado quando a pessoa erra). */
  esperado: Aresta
  /** Todos os lances do livro aceitos na posição. */
  aceitos: Aresta[]
}

export function sortearPergunta(
  capitulos: CapituloCarregado[],
  corPorCapitulo: Record<string, EscolhaCor>,
  aleatorio: () => number = Math.random,
): PerguntaRelampago | null {
  const escolher = <T>(lista: T[]): T => lista[Math.floor(aleatorio() * lista.length)]
  const candidatos = capitulos.flatMap((capitulo) =>
    capitulo.unidades
      .filter((u) => u.tipo === 'linha' && u.lances.length > 0)
      .flatMap((u) => coresDaEscolha(corDoCapitulo(capitulo, corPorCapitulo)).map((cor) => ({ capitulo, unidade: u, cor }))),
  )
  for (let tentativa = 0; tentativa < 20 && candidatos.length; tentativa++) {
    const { capitulo, unidade, cor } = escolher(candidatos)
    // Lances da cor escolhida (1.e4 é ply 1 = brancas).
    const indices = unidade.lances.map((_, i) => i).filter((i) => (i % 2 === 0 ? 'w' : 'b') === cor)
    if (!indices.length) continue
    const i = escolher(indices)
    const lance = unidade.lances[i]
    const no = capitulo.arvore.nos.get(chaveDaPosicao(lance.fenAntes))
    const esperado = no?.saidas.find((aresta) => aresta.san === lance.san)
    if (!no || !esperado) continue
    return {
      capitulo,
      linha: unidade.id,
      cor,
      fen: lance.fenAntes,
      antes: unidade.lances.slice(0, i).map((l) => l.san),
      esperado,
      aceitos: no.saidas,
    }
  }
  return null
}

/** Atualiza o recorde da duração; devolve true se foi recorde novo. */
export function registrarRecorde(recordes: Record<string, number>, minutos: number, acertos: number): boolean {
  const chave = String(minutos)
  if (acertos <= (recordes[chave] ?? 0)) return false
  recordes[chave] = acertos
  return true
}
