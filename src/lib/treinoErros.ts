import { percorrer, type Aresta } from './arvore'
import type { CapituloCarregado } from './capitulos'
import type { ErroAresta } from './progresso'

/**
 * "Treinar meus erros": cada lance errado no Treino ou nas partidas importadas vira uma
 * pergunta solta, na posição exata do erro. Dois acertos seguidos tiram o lance da lista.
 */

export const ACERTOS_PARA_SAIR = 2
export const ERROS_POR_SESSAO = 10

export interface PerguntaDeErro {
  chave: string
  capitulo: CapituloCarregado
  /** Arestas do livro até a posição da pergunta (exclusive). */
  antes: Aresta[]
  /** O lance que a linha pede ali. */
  certo: Aresta
  erros: number
}

/** Os erros ainda abertos, do mais repetido ao menos, que ainda existem no livro. */
export function perguntasDeErro(
  erros: Record<string, ErroAresta>,
  buscar: (id: string) => CapituloCarregado | undefined,
  limite = ERROS_POR_SESSAO,
): PerguntaDeErro[] {
  const perguntas: PerguntaDeErro[] = []
  const ordenados = Object.entries(erros)
    .filter(([, erro]) => erro.erros > 0)
    .sort(([, a], [, b]) => b.erros - a.erros)
  for (const [chave, erro] of ordenados) {
    const capitulo = buscar(erro.capitulo)
    const caminho = capitulo && percorrer(capitulo.arvore, erro.caminho)
    if (!capitulo || !caminho?.length) continue
    perguntas.push({ chave, capitulo, antes: caminho.slice(0, -1), certo: caminho.at(-1)!, erros: erro.erros })
    if (perguntas.length >= limite) break
  }
  return perguntas
}

/** Acertou de primeira: soma um acerto seguido; com dois, o erro sai da lista. Devolve se saiu. */
export function registrarAcerto(erro: ErroAresta, agora = new Date()): boolean {
  erro.seguidos = (erro.seguidos ?? 0) + 1
  erro.atualizado = agora.toISOString()
  if (erro.seguidos >= ACERTOS_PARA_SAIR) {
    // Fica com zero (e não é apagado) para a sincronização saber que foi resolvido.
    erro.erros = 0
    return true
  }
  return false
}

/** Errou de novo: zera a sequência e conta mais um erro. */
export function registrarFalha(erro: ErroAresta, agora = new Date()): void {
  erro.seguidos = 0
  erro.erros++
  erro.atualizado = agora.toISOString()
}
