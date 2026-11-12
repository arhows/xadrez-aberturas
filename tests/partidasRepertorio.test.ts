import { describe, expect, it } from 'vitest'
import { carregarCapitulos } from '../src/lib/capitulos'
import { analisarPartida, LANCES_GUARDADOS, type PartidaAnalisada, type PartidaBaixada } from '../src/lib/partidas'
import {
  aproveitamento,
  assinaturaDoRepertorio,
  atualizarAnalises,
  indiceDePosicoes,
  resultadoParaVoce,
  resumoPorAbertura,
} from '../src/lib/partidasRepertorio'

const capitulos = await carregarCapitulos()
const semPetrov = capitulos.filter((c) => c.capitulo.id === 'italian')

const baixada = (id: string, sans: string[], resultado = '1-0'): PartidaBaixada => ({
  id,
  site: 'lichess',
  url: `https://lichess.org/${id}`,
  data: '2026-11-10',
  brancas: 'eu',
  pretas: 'rival',
  resultado,
  sans,
})
const PETROV = ['e4', 'e5', 'Nf3', 'Nf6', 'Nxe5', 'd6', 'Nf3', 'Nxe4', 'd4', 'd5']

describe('reanálise quando o repertório cresce', () => {
  it('guarda os primeiros lances da partida', () => {
    const longa = Array.from({ length: 80 }, (_, i) => (i % 2 ? 'Nf6' : 'Nf3'))
    const analise = analisarPartida(baixada('a', longa), 'w', capitulos)
    expect(analise.lances!.split(' ')).toHaveLength(LANCES_GUARDADOS)
  })

  it('a assinatura muda quando entra uma abertura', () => {
    expect(assinaturaDoRepertorio(capitulos)).not.toBe(assinaturaDoRepertorio(semPetrov))
    expect(assinaturaDoRepertorio(capitulos)).toBe(assinaturaDoRepertorio([...capitulos].reverse()))
  })

  it('uma partida de fora entra na abertura nova, sem mexer na que não tem lances', () => {
    const petrov = analisarPartida(baixada('p', PETROV), 'w', semPetrov)
    expect(petrov.capitulo).toBeNull()
    const antiga: PartidaAnalisada = { ...petrov, id: 'antiga', lances: undefined }
    const partidas = { analisadas: { p: petrov, antiga }, assinatura: assinaturaDoRepertorio(semPetrov) }

    expect(atualizarAnalises(partidas, capitulos)).toBe(1)
    expect(partidas.analisadas.p.capitulo).toBe('petrov')
    expect(partidas.analisadas.p.adversario).toBe('rival')
    expect(partidas.analisadas.antiga.capitulo).toBeNull()
    expect(partidas.assinatura).toBe(assinaturaDoRepertorio(capitulos))
    // Com a mesma assinatura, não faz nada.
    expect(atualizarAnalises(partidas, capitulos)).toBe(0)
  })
})

describe('resumo e índice das partidas', () => {
  const vitoria = analisarPartida(baixada('v', PETROV, '1-0'), 'w', capitulos)
  const derrota = analisarPartida(baixada('d', [...PETROV.slice(0, 6), 'Nc3'], '0-1'), 'w', capitulos)
  const empate = analisarPartida(baixada('e', PETROV, '½-½'), 'b', capitulos)

  it('resultado do ponto de vista do usuário', () => {
    expect(resultadoParaVoce(vitoria)).toBe('vitorias')
    expect(resultadoParaVoce(derrota)).toBe('derrotas')
    expect(resultadoParaVoce(empate)).toBe('empates')
    expect(aproveitamento({ vitorias: 1, empates: 1, derrotas: 2 })).toBe(38)
  })

  it('agrupa por abertura com placar e desvios', () => {
    const [petrov] = resumoPorAbertura([vitoria, derrota, empate])
    expect(petrov.capitulo).toBe('petrov')
    expect(petrov.partidas).toHaveLength(3)
    expect(petrov.placar).toEqual({ vitorias: 1, empates: 1, derrotas: 1 })
    expect(petrov.desviosSeus).toBe(1)
  })

  it('conta os lances jogados a partir de cada posição', () => {
    const indice = indiceDePosicoes([vitoria, derrota, empate])
    expect(indice.get('')).toEqual([{ san: 'e4', total: 3, placar: { vitorias: 1, empates: 1, derrotas: 1 } }])
    const depoisDe6 = indice.get(PETROV.slice(0, 6).join(' '))!
    expect(depoisDe6.map((l) => [l.san, l.total])).toEqual([
      ['Nf3', 2],
      ['Nc3', 1],
    ])
  })
})
