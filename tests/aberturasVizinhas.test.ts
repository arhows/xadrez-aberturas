import { describe, expect, it } from 'vitest'
import { aberturasVizinhas } from '../src/lib/aberturasVizinhas'
import type { CapituloCarregado } from '../src/lib/capitulos'

const cap = (id: string, base: string) => ({ capitulo: { id, base } }) as unknown as CapituloCarregado
// Ordem do livro misturando famílias: a tela agrupa por família.
const capitulos = [cap('siciliana', 'e4 c5'), cap('italiana', 'e4 e5 Nf3 Nc6 Bc4'), cap('francesa', 'e4 e6'), cap('espanhola', 'e4 e5 Nf3 Nc6 Bb5')]
const ids = (v: ReturnType<typeof aberturasVizinhas>) => [v.anterior?.capitulo.id, v.proxima?.capitulo.id]

describe('aberturasVizinhas', () => {
  it('segue a ordem por família', () => {
    expect(ids(aberturasVizinhas(capitulos, 'espanhola', []))).toEqual(['italiana', 'siciliana'])
    expect(ids(aberturasVizinhas(capitulos, 'italiana', []))).toEqual([undefined, 'espanhola'])
    expect(ids(aberturasVizinhas(capitulos, 'francesa', []))).toEqual(['siciliana', undefined])
  })
  it('no repertório, anda só entre as escolhidas', () => {
    expect(ids(aberturasVizinhas(capitulos, 'italiana', ['italiana', 'francesa']))).toEqual([undefined, 'francesa'])
  })
  it('fora do repertório, anda entre todas', () => {
    expect(ids(aberturasVizinhas(capitulos, 'espanhola', ['italiana', 'francesa']))).toEqual(['italiana', 'siciliana'])
  })
})
