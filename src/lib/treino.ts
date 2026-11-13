import type { Aresta, Arvore, No } from './arvore'
import type { Cor } from './lances'
import { corDaPosicao } from './lances'

/**
 * Estado de uma partida de treino. `alvo` é a linha sendo cobrada: o adversário
 * a segue, e o usuário pode trocá-la ao jogar outro lance do livro dentro do escopo.
 */
export interface Partida {
  cor: Cor
  alvo: string
  no: string
  jogadas: Aresta[]
}

export function iniciarPartida(arvore: Arvore, alvo: string, cor: Cor): Partida {
  return { cor, alvo, no: arvore.raiz, jogadas: [] }
}

export function noAtual(arvore: Arvore, partida: Partida): No {
  return arvore.nos.get(partida.no)!
}

export function vezDoUsuario(arvore: Arvore, partida: Partida): boolean {
  return corDaPosicao(noAtual(arvore, partida).fen) === partida.cor
}

/** O lance que a linha alvo pede nesta posição; null quando a linha acabou. */
export function lanceEsperado(arvore: Arvore, partida: Partida): Aresta | null {
  return noAtual(arvore, partida).saidas.find((s) => s.linhas.includes(partida.alvo)) ?? null
}

export function terminou(arvore: Arvore, partida: Partida): boolean {
  return lanceEsperado(arvore, partida) === null
}

/** Todos os lances do livro aceitos nesta posição dentro do escopo. */
export function lancesAceitos(arvore: Arvore, partida: Partida, escopo: Set<string>): Aresta[] {
  return noAtual(arvore, partida).saidas.filter((s) => s.linhas.some((id) => escopo.has(id)))
}

/** Avança pela aresta; se ela sair da linha alvo, a cobrança passa para a linha mais prioritária. */
export function avancar(
  partida: Partida,
  aresta: Aresta,
  escopo: Set<string>,
  peso: (id: string) => number = () => 1,
): Partida {
  let alvo = partida.alvo
  if (!aresta.linhas.includes(alvo)) {
    const candidatas = aresta.linhas.filter((id) => escopo.has(id))
    alvo = candidatas.reduce((melhor, id) => (peso(id) > peso(melhor) ? id : melhor), candidatas[0])
  }
  return { ...partida, alvo, no: aresta.para, jogadas: [...partida.jogadas, aresta] }
}

/**
 * Adianta a partida pelos lances da linha alvo que já foram jogados nesta sessão (`jaJogados`:
 * caminhos de nós de partidas anteriores), parando no primeiro lance diferente. Assim uma nota,
 * que repete o começo da coluna, recomeça onde sai dela. Nunca chega ao fim da linha.
 */
export function adiantarPeloJaJogado(arvore: Arvore, partida: Partida, jaJogados: string[][]): Partida {
  let atual = partida
  let candidatos = jaJogados
  for (;;) {
    const esperado = lanceEsperado(arvore, atual)
    if (!esperado) break
    const i = atual.jogadas.length
    const seguem = candidatos.filter((caminho) => caminho[i] === esperado.para)
    if (!seguem.length) break
    const proxima = { ...atual, no: esperado.para, jogadas: [...atual.jogadas, esperado] }
    if (terminou(arvore, proxima)) break
    atual = proxima
    candidatos = seguem
  }
  return atual
}

/** Sorteio ponderado: mais peso, mais chance de sair. */
export function sortear<T>(itens: T[], peso: (item: T) => number, aleatorio = Math.random): T {
  const total = itens.reduce((soma, item) => soma + peso(item), 0)
  let sorte = aleatorio() * total
  for (const item of itens) {
    sorte -= peso(item)
    if (sorte < 0) return item
  }
  return itens[itens.length - 1]
}
