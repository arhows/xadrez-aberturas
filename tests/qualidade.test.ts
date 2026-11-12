import { describe, expect, it } from 'vitest'
import { percorrer } from '../src/lib/arvore'
import { buscarCapitulo, carregarCapitulos } from '../src/lib/capitulos'
import { marcasDoLivro, qualidadeDoMotor } from '../src/lib/qualidade'

const capitulos = await carregarCapitulos()

describe('marcas do MCO nos lances do livro', () => {
  it('acha as marcas citadas nos comentários e as escritas nos lances', () => {
    const total = capitulos.reduce((soma, c) => soma + marcasDoLivro(c).size, 0)
    // Há cerca de 1.100 citações; boa parte precisa virar marca num lance do livro.
    expect(total).toBeGreaterThan(600)
  })

  it('Caro-Kann: 7...Nf6!? na linha 6.h4 h6 7.Nf3', () => {
    const cap = buscarCapitulo('caro-kann-a')!
    const linha = cap.capitulo.linhas.find((l) => l.id === 'c08')!
    const lances = cap.unidades.find((u) => u.id === linha.id)!.lances
    const indice = lances.findIndex((l) => l.ply === 14 && l.san === 'Nf6')
    expect(indice).toBeGreaterThan(-1)
    const caminho = percorrer(cap.arvore, lances.slice(0, indice + 1).map((l) => l.san))!
    expect(marcasDoLivro(cap).get(caminho.at(-1)!.id)).toBe('!?')
  })
})

describe('qualidade pelo Stockfish', () => {
  const posicoes = {
    'A w': { lance: 'e4', cp: 30 },
    'B b': { lance: 'e5', cp: 30 },
    'C b': { lance: 'e5', cp: -300 },
    'D b': { lance: 'e5', cp: 10 },
  }
  it('melhor lance, imprecisão/erro pela chance perdida por quem jogou', () => {
    expect(qualidadeDoMotor({ de: 'A w', para: 'B b', san: 'e4' }, posicoes)).toMatchObject({ classe: 'melhor', perda: 0 })
    expect(qualidadeDoMotor({ de: 'A w', para: 'C b', san: 'f3' }, posicoes)!.classe).toBe('erro')
    expect(qualidadeDoMotor({ de: 'A w', para: 'D b', san: 'd4' }, posicoes)!.classe).toBe('bom')
    expect(qualidadeDoMotor({ de: 'A w', para: 'X b', san: 'd4' }, posicoes)).toBeNull()
  })
})
