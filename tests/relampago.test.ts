import { describe, expect, it } from 'vitest'
import { Chess } from 'chess.js'
import { carregarCapitulos } from '../src/lib/capitulos'
import { registrarRecorde, sortearPergunta } from '../src/lib/relampago'
import { registrarErroNoLance } from '../src/lib/treinoErros'

const capitulos = await carregarCapitulos()
const petrov = capitulos.filter((c) => c.capitulo.id === 'petrov')

/** Gerador fixo para os testes serem reproduzíveis. */
function semente(valor: number) {
  return () => {
    valor = (valor * 16807) % 2147483647
    return (valor - 1) / 2147483646
  }
}

describe('modo relâmpago', () => {
  it('sorteia sempre na vez da cor treinada, com o lance esperado entre os aceitos', () => {
    const aleatorio = semente(42)
    for (let i = 0; i < 50; i++) {
      const p = sortearPergunta(petrov, { petrov: 'b' }, aleatorio)!
      expect(p.cor).toBe('b')
      expect(new Chess(p.fen).turn()).toBe('b')
      expect(p.aceitos).toContain(p.esperado)
      expect(p.antes.length % 2).toBe(1)
    }
  })

  it('com "ambas", sai pergunta das duas cores', () => {
    const aleatorio = semente(7)
    const cores = new Set(Array.from({ length: 40 }, () => sortearPergunta(petrov, { petrov: 'ambas' }, aleatorio)!.cor))
    expect(cores).toEqual(new Set(['w', 'b']))
  })

  it('sem capítulos não há pergunta', () => {
    expect(sortearPergunta([], {})).toBeNull()
  })

  it('recorde por duração', () => {
    const recordes: Record<string, number> = {}
    expect(registrarRecorde(recordes, 3, 12)).toBe(true)
    expect(registrarRecorde(recordes, 3, 10)).toBe(false)
    expect(registrarRecorde(recordes, 1, 5)).toBe(true)
    expect(recordes).toEqual({ '3': 12, '1': 5 })
  })

  it('o erro vai para a lista de "Treinar meus erros"', () => {
    const p = sortearPergunta(petrov, { petrov: 'w' }, semente(3))!
    const erros = {}
    registrarErroNoLance(erros, 'petrov', p.antes, p.esperado)
    registrarErroNoLance(erros, 'petrov', p.antes, p.esperado)
    const [erro] = Object.values(erros) as { erros: number; caminho: string[] }[]
    expect(erro.erros).toBe(2)
    expect(erro.caminho).toEqual([...p.antes, p.esperado.san])
  })
})

describe('relâmpago só com linhas já treinadas', () => {
  it('sorteia apenas as colunas que passam no filtro', () => {
    const permitida = petrov[0].capitulo.linhas[2].id
    const filtro = (_c: string, linha: string, cor: string) => linha === permitida && cor === 'b'
    const aleatorio = semente(11)
    for (let i = 0; i < 20; i++) {
      const p = sortearPergunta(petrov, { petrov: 'ambas' }, aleatorio, filtro)!
      expect(p.linha).toBe(permitida)
      expect(p.cor).toBe('b')
    }
    expect(sortearPergunta(petrov, { petrov: 'w' }, aleatorio, filtro)).toBeNull()
  })
})
