import { construirArvore, type Arvore } from './arvore'
import type { Capitulo } from './tipos'
import { validarCapitulo, type CapituloValidado } from './validacao'

export interface CapituloCarregado extends CapituloValidado {
  arvore: Arvore
}

const arquivos = import.meta.glob<Capitulo>('../../data/openings/*.json', {
  eager: true,
  import: 'default',
})

let cache: CapituloCarregado[] | undefined

/** Capítulos do app, carregados uma única vez. */
export function obterCapitulos(): CapituloCarregado[] {
  return (cache ??= carregarCapitulos())
}

export function buscarCapitulo(id: string): CapituloCarregado | undefined {
  return obterCapitulos().find((capitulo) => capitulo.capitulo.id === id)
}

/** Todos os capítulos de data/openings, na ordem do livro, já validados e com a árvore montada. */
export function carregarCapitulos(): CapituloCarregado[] {
  const ordenados = Object.values(arquivos).sort((a, b) => (a.ordem ?? 999) - (b.ordem ?? 999))
  return ordenados.map((capitulo) => {
    const validado = validarCapitulo(capitulo)
    for (const problema of validado.problemas) {
      if (problema.tipo === 'lance-ilegal') {
        console.error(`[${capitulo.id}] ${problema.linha}: ${problema.lance} (${problema.fen})`)
      }
    }
    return { ...validado, arvore: construirArvore(validado) }
  })
}
