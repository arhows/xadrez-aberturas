import type { Aresta } from './arvore'
import type { MarcaLivro } from './qualidade'

/**
 * Modo Adivinhar no Explorar: separa os lances do livro recomendados dos inferiores para o seu lado.
 * Um lance é inferior quando o MCO o marca com ?!, ? ou ??, ou quando só aparece em notas cuja
 * avaliação é pior que a da melhor continuação e favorece o adversário (ex.: 9...Ne7 ⩲ contra 9...Bf6 ∓
 * no Ataque Möller). Os lances das colunas valem sempre, a não ser que tenham marca ruim.
 */

/** Avaliação do MCO em pontos para as brancas (+3 = vencendo); null quando não dá para medir. */
export function pontosDaAvaliacao(avaliacao: string | null | undefined): number | null {
  const texto = avaliacao?.trim()
  if (!texto) return null
  const simbolo = texto.split(/[\s(/]/)[0]
  const tabela: Record<string, number> = {
    '+−': 3, '+-': 3, '±': 2, '⩲': 1, '=': 0, '∞': 0, '≈': 0, '⩱': -1, '∓': -2, '−+': -3, '-+': -3,
  }
  return simbolo in tabela ? tabela[simbolo] : null
}

const MARCAS_RUINS: ReadonlySet<MarcaLivro> = new Set(['?!', '?', '??'])

export interface LanceInferior {
  /** Avaliação do MCO que tornou o lance inferior (ou a marca, como "?!"). */
  motivo: string
  /** Os lances recomendados nesta posição. */
  melhores: Aresta[]
}

interface Contexto {
  /** Ids das linhas que são colunas (as outras são notas). */
  colunas: ReadonlySet<string>
  /** Avaliação de cada linha e nota, pelo id. */
  avaliacoes: ReadonlyMap<string, string | null | undefined>
  marca: (aresta: Aresta) => MarcaLivro | null
}

/** null quando o lance é recomendado (ou quando não há como saber). */
export function lanceInferior(escolhido: Aresta, opcoes: readonly Aresta[], contexto: Contexto): LanceInferior | null {
  const brancas = escolhido.de.split(' ')[1] === 'w'
  const pontos = (aresta: Aresta): number | null => {
    const valores = aresta.linhas
      .map((id) => pontosDaAvaliacao(contexto.avaliacoes.get(id)))
      .filter((v): v is number => v !== null)
      .map((v) => (brancas ? v : -v))
    return valores.length ? Math.max(...valores) : null
  }
  const ehColuna = (aresta: Aresta) => aresta.linhas.some((id) => contexto.colunas.has(id))
  const marcaRuim = (aresta: Aresta) => {
    const marca = contexto.marca(aresta)
    return marca && MARCAS_RUINS.has(marca) ? marca : null
  }
  const conhecidos = opcoes.map(pontos).filter((v): v is number => v !== null)
  const melhorPonto = conhecidos.length ? Math.max(...conhecidos) : null

  const motivo = (aresta: Aresta): string | null => {
    const marca = marcaRuim(aresta)
    if (marca) return marca
    if (ehColuna(aresta)) return null
    const p = pontos(aresta)
    if (p === null || melhorPonto === null || p >= melhorPonto || p >= 0) return null
    const avaliacoes = aresta.linhas.map((id) => contexto.avaliacoes.get(id)).filter((a): a is string => Boolean(a))
    return avaliacoes.find((a) => pontosDaAvaliacao(a) === (brancas ? p : -p)) ?? avaliacoes[0] ?? ''
  }

  const deste = motivo(escolhido)
  if (deste === null) return null
  const melhores = opcoes
    .filter((aresta) => motivo(aresta) === null)
    .sort((x, y) => (pontos(y) ?? -9) - (pontos(x) ?? -9) || y.linhas.length - x.linhas.length)
  // Sem alternativa recomendada, não há o que corrigir.
  return melhores.length ? { motivo: deste, melhores } : null
}
