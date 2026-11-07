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
