import { describe, expect, it } from 'vitest'
import { carregarCapitulos } from '../src/lib/capitulos'
import { chaveDoLance } from '../src/lib/lances'

const capitulos = carregarCapitulos()

describe('arquivos de abertura', () => {
  it('encontra o capítulo dos Dois Cavalos', () => {
    expect(capitulos.map((c) => c.capitulo.id)).toContain('two-knights')
  })

  it('cada capítulo tem um id único', () => {
    const ids = capitulos.map((c) => c.capitulo.id)
    expect(new Set(ids).size).toBe(ids.length)
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

    it('toda linha pertence a um grupo existente', () => {
      expect(doTipo('grupo-inexistente')).toEqual([])
    })

    it('não repete ids de linhas e notas', () => {
      expect(doTipo('id-duplicado')).toEqual([])
    })

    it('toda ameaça é um lance possível depois do lance indicado', () => {
      expect(doTipo('ameaca-invalida')).toEqual([])
    })

    it('toda armadilha segue uma linha ou nota do capítulo', () => {
      expect(doTipo('armadilha-invalida')).toEqual([])
    })

    it('toda nota explica o lance do desvio e tem comentário', () => {
      for (const nota of capitulo.capitulo.notas ?? []) {
        const san = nota.lances.replace(/\d+\.(\.\.)?/g, ' ').trim().split(/\s+/)[nota.desvioNoLance - 1].replace(/[?!]+$/, '')
        expect(nota.dicas?.[chaveDoLance(nota.desvioNoLance, san)], nota.id).toBeTruthy()
        expect(nota.comentario, nota.id).toBeTruthy()
      }
    })

    it('todo plano de meio-jogo tem texto para os dois lados', () => {
      for (const linha of capitulo.capitulo.linhas) {
        if (linha.plano) {
          expect(linha.plano.brancas.length, linha.id).toBeGreaterThan(20)
          expect(linha.plano.pretas.length, linha.id).toBeGreaterThan(20)
        }
      }
    })

    it('a cor padrão, quando existe, é válida', () => {
      const cor = capitulo.capitulo.corPadrao
      if (cor !== undefined) expect(['w', 'b', 'ambas']).toContain(cor)
    })

    it('toda nota aponta para uma linha base existente', () => {
      expect(doTipo('linha-base-inexistente')).toEqual([])
    })

    it('toda nota sai da linha base no lance declarado', () => {
      expect(doTipo('desvio-inconsistente')).toEqual([])
    })
  })
})
