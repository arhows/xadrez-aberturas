import { describe, expect, it } from 'vitest'
import { carregarCapitulos } from '../src/lib/capitulos'

const capitulos = carregarCapitulos()

describe('arquivos de abertura', () => {
  it('encontra o capítulo dos Dois Cavalos', () => {
    expect(capitulos.map((c) => c.capitulo.id)).toContain('two-knights')
  })

  describe.each(capitulos.map((c) => [c.capitulo.id, c] as const))('%s', (_id, capitulo) => {
    const doTipo = (tipo: string) =>
      capitulo.problemas
        .filter((problema) => problema.tipo === tipo)
        .map((problema) => `${problema.linha}: ${problema.mensagem}`)

    it('não tem lance ilegal', () => {
      expect(doTipo('lance-ilegal')).toEqual([])
    })

    it('toda chave de dicas corresponde a um lance da linha', () => {
      expect(doTipo('dica-sem-lance')).toEqual([])
    })

    it('toda nota aponta para uma linha base existente', () => {
      expect(doTipo('linha-base-inexistente')).toEqual([])
    })

    it('toda nota sai da linha base no lance declarado', () => {
      expect(doTipo('desvio-inconsistente')).toEqual([])
    })
  })
})
