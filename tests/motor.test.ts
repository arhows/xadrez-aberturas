import { describe, expect, it } from 'vitest'
import { carregarCapitulos } from '../src/lib/capitulos'
import { casasDoLance } from '../src/lib/lances'
import { carregarMotor, formatarAvaliacao } from '../src/lib/motor'

describe('análise do Stockfish', () => {
  it.each(carregarCapitulos().map((c) => [c.capitulo.id, c] as const))(
    '%s: cobre as posições da árvore com lances legais',
    async (_id, capitulo) => {
      const dados = await carregarMotor(capitulo.capitulo.id)
      if (!dados) return
      const faltando: string[] = []
      const ilegais: string[] = []
      for (const no of capitulo.arvore.nos.values()) {
        const analise = dados.posicoes[no.chave]
        if (!analise) {
          // Posições finais (mate, afogamento) não têm lance a sugerir.
          if (no.saidas.length) faltando.push(no.chave)
          continue
        }
        if (!casasDoLance(no.fen, analise.lance)) ilegais.push(`${no.chave} ${analise.lance}`)
      }
      // Se falhar, o capítulo mudou: rode scripts/motor.cjs de novo.
      expect(faltando).toEqual([])
      expect(ilegais).toEqual([])
    },
  )

  it('formata a avaliação do ponto de vista das brancas', () => {
    expect(formatarAvaliacao(36)).toBe('+0,4')
    expect(formatarAvaliacao(-120)).toBe('−1,2')
    expect(formatarAvaliacao(3)).toBe('0,0')
    expect(formatarAvaliacao(19990)).toBe('mate para as brancas')
    expect(formatarAvaliacao(-19995)).toBe('mate para as pretas')
  })

  it('capítulo sem análise não quebra', async () => {
    expect(await carregarMotor('nao-existe')).toBeNull()
  })
})
