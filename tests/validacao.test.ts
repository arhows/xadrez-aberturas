import { describe, expect, it } from 'vitest'
import {
  chaveDaPosicao,
  chaveDoLance,
  jogarLances,
  lanceDaAmeaca,
  separarLances,
} from '../src/lib/lances'
import type { Capitulo } from '../src/lib/tipos'
import { validarCapitulo } from '../src/lib/validacao'

function capitulo(parcial: Partial<Capitulo>): Capitulo {
  return {
    id: 't',
    nome: 't',
    base: '',
    grupos: [{ id: 'g', nome: 'g', colunas: [] }],
    linhas: [],
    ...parcial,
  }
}

function linha(id: string, lances: string, dicas: Record<string, string> = {}) {
  return { id, coluna: 1, grupo: 'g', nome: id, lances, avaliacao: null, resumo: '', dicas }
}

describe('lances', () => {
  it('separa o PGN ignorando números e resultado', () => {
    expect(separarLances('1. e4 e5 2.Nf3 2... Nc6 *')).toEqual(['e4', 'e5', 'Nf3', 'Nc6'])
  })

  it('monta a chave das dicas com número e cor', () => {
    expect(chaveDoLance(7, 'Ng5')).toBe('4. Ng5')
    expect(chaveDoLance(22, 'exd3')).toBe('11... exd3')
  })

  it('remove só os contadores da chave da posição', () => {
    expect(chaveDaPosicao('8/8/8/8/8/8/8/K1k5 w - - 12 40')).toBe('8/8/8/8/8/8/8/K1k5 w - -')
  })

  it('confere a ameaça como se o mesmo lado jogasse de novo', () => {
    const fen = jogarLances('1. e4 e5 2. Nf3').lances[2].fenDepois
    expect(lanceDaAmeaca(fen, 'Nxe5')).toEqual({ san: 'Nxe5', from: 'f3', to: 'e5' })
    expect(lanceDaAmeaca(fen, 'Nxd5')).toBeNull()
  })

  it('não há ameaça quando o outro lado está em xeque', () => {
    const fen = jogarLances('1. e4 f5 2. Qh5+').lances[2].fenDepois
    expect(lanceDaAmeaca(fen, 'Qxf5')).toBeNull()
  })

  it('para no primeiro lance ilegal informando lance e FEN', () => {
    const { lances, erro } = jogarLances('1. e4 e5 2. Ke3')
    expect(lances).toHaveLength(2)
    expect(erro?.lance).toBe('2. Ke3')
    expect(erro?.ply).toBe(3)
    expect(erro?.fen).toBe(lances[1].fenDepois)
  })
})

describe('validarCapitulo', () => {
  it('desativa só a linha com lance ilegal', () => {
    const resultado = validarCapitulo(
      capitulo({ linhas: [linha('boa', '1. e4 e5'), linha('ruim', '1. e4 e5 2. Ke3')] }),
    )
    expect(resultado.desativadas).toEqual(['ruim'])
    expect(resultado.unidades.map((u) => u.id)).toEqual(['boa'])
    expect(resultado.problemas[0]).toMatchObject({
      tipo: 'lance-ilegal',
      linha: 'ruim',
      lance: '2. Ke3',
    })
  })

  it.each([
    ['número errado', '2. e4'],
    ['cor errada', '1... e4'],
    ['SAN errado', '1. d4'],
  ])('rejeita dica com %s', (_caso, chave) => {
    const { problemas } = validarCapitulo(
      capitulo({ linhas: [linha('l', '1. e4 e5', { [chave]: 'dica' })] }),
    )
    expect(problemas.map((p) => [p.tipo, p.lance])).toEqual([['dica-sem-lance', chave]])
  })

  it('acusa linha com grupo inexistente, sem desativá-la', () => {
    const resultado = validarCapitulo(
      capitulo({ linhas: [{ ...linha('l', '1. e4 e5'), grupo: 'outro' }] }),
    )
    expect(resultado.problemas.map((p) => [p.tipo, p.linha])).toEqual([['grupo-inexistente', 'l']])
    expect(resultado.unidades.map((u) => u.id)).toEqual(['l'])
  })

  it('acusa id repetido e mantém só a primeira ocorrência', () => {
    const resultado = validarCapitulo(
      capitulo({ linhas: [linha('l', '1. e4 e5'), linha('l', '1. d4 d5')] }),
    )
    expect(resultado.problemas.map((p) => [p.tipo, p.linha])).toEqual([['id-duplicado', 'l']])
    expect(resultado.unidades).toHaveLength(1)
    expect(resultado.unidades[0].lances[0].san).toBe('e4')
    expect(resultado.desativadas).toEqual([])
  })

  it('aceita ameaça possível e recusa as demais', () => {
    const comAmeaca = (ameacas: Record<string, { lance: string; texto: string }>) =>
      validarCapitulo(capitulo({ linhas: [{ ...linha('l', '1. e4 e5 2. Nf3'), ameacas }] })).problemas
    expect(comAmeaca({ '2. Nf3': { lance: 'Nxe5', texto: 't' } })).toEqual([])
    expect(comAmeaca({ '2. Nf3': { lance: 'Nxd5', texto: 't' } })[0].tipo).toBe('ameaca-invalida')
    expect(comAmeaca({ '3. Nf3': { lance: 'Nxe5', texto: 't' } })[0].tipo).toBe('ameaca-invalida')
  })

  it('acusa armadilha fora do livro ou com o erro fora da sequência', () => {
    const comArmadilha = (lances: string, erroNoLance: number) =>
      validarCapitulo(
        capitulo({
          linhas: [linha('l', '1. e4 e5 2. Nf3')],
          armadilhas: [{ id: 'a', titulo: 't', lances, erroNoLance, texto: 't' }],
        }),
      ).problemas.map((p) => p.tipo)
    expect(comArmadilha('1. e4 e5', 2)).toEqual([])
    expect(comArmadilha('1. d4', 1)).toEqual(['armadilha-invalida'])
    expect(comArmadilha('1. e4 e5', 3)).toEqual(['armadilha-invalida'])
    expect(comArmadilha('1. e4 Ke3', 1)).toEqual(['armadilha-invalida'])
  })

  it('acusa nota cujo desvio não bate com a linha base', () => {
    const nota = (id: string, desvioNoLance: number, linhaBase = 'l') => ({
      id,
      nota: 'a',
      rotulo: '(a)',
      coluna: 1,
      linhaBase,
      desvioNoLance,
      lances: '1. e4 c5',
    })
    const { problemas } = validarCapitulo(
      capitulo({
        linhas: [linha('l', '1. e4 e5')],
        notas: [nota('certa', 2), nota('cedo', 1), nota('tarde', 3), nota('orfa', 2, 'x')],
      }),
    )
    expect(problemas.map((p) => [p.linha, p.tipo])).toEqual([
      ['cedo', 'desvio-inconsistente'],
      ['tarde', 'desvio-inconsistente'],
      ['orfa', 'linha-base-inexistente'],
    ])
  })
})
