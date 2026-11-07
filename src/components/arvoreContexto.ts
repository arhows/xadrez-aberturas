import type { InjectionKey } from 'vue'
import type { Aresta, Arvore } from '../lib/arvore'

/** O que a lista recursiva de lances compartilha com a tela Explorar. */
export interface ContextoArvore {
  arvore: Arvore
  saidas: (no: string) => Aresta[]
  ehAtual: (caminho: Aresta[]) => boolean
  estaAberto: (caminho: Aresta[]) => boolean
  alternar: (caminho: Aresta[]) => void
  selecionar: (caminho: Aresta[]) => void
}

export const CONTEXTO_ARVORE: InjectionKey<ContextoArvore> = Symbol('arvore')
