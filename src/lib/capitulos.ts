import { construirArvore, type Arvore } from './arvore'
import type { Capitulo } from './tipos'
import { validarCapitulo, type CapituloValidado } from './validacao'

export interface CapituloCarregado extends CapituloValidado {
  arvore: Arvore
}

// Cada capítulo vira um arquivo separado, baixado depois do login, fora do pacote principal do app.
const arquivos = import.meta.glob<Capitulo>('../../data/openings/*.json', { import: 'default' })

let cache: CapituloCarregado[] | undefined
let carregando: Promise<CapituloCarregado[]> | undefined

/**
 * Capítulos já carregados. As telas só abrem depois de `carregarCapitulos` (guarda do router),
 * então aqui eles sempre estão prontos; antes disso a lista vem vazia.
 */
export function obterCapitulos(): CapituloCarregado[] {
  return cache ?? []
}

export function buscarCapitulo(id: string): CapituloCarregado | undefined {
  return obterCapitulos().find((capitulo) => capitulo.capitulo.id === id)
}

/** Baixa todos os capítulos de data/openings (uma única vez), na ordem do livro, validados e com a árvore montada. */
export function carregarCapitulos(): Promise<CapituloCarregado[]> {
  carregando ??= Promise.all(Object.values(arquivos).map((carregar) => carregar())).then((lista) => {
    cache = lista.sort((a, b) => (a.ordem ?? 999) - (b.ordem ?? 999)).map(montar)
    return cache
  })
  return carregando
}

function montar(capitulo: Capitulo): CapituloCarregado {
  const validado = validarCapitulo(capitulo)
  for (const problema of validado.problemas) {
    if (problema.tipo === 'lance-ilegal') {
      console.error(`[${capitulo.id}] ${problema.linha}: ${problema.lance} (${problema.fen})`)
    }
  }
  return { ...validado, arvore: construirArvore(validado) }
}
