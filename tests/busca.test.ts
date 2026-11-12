import { describe, expect, it } from 'vitest'
import { buscarAberturas, lerLances, normalizar } from '../src/lib/busca'
import { carregarCapitulos } from '../src/lib/capitulos'

const capitulos = await carregarCapitulos()
const ids = (resultados: { capitulo: { capitulo: { id: string } } }[]) => resultados.map((r) => r.capitulo.capitulo.id)

describe('leitura dos lances digitados', () => {
  it('aceita notação inglesa e portuguesa, com ou sem números e maiúsculas', () => {
    const esperado = ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4']
    expect(lerLances('1. e4 e5 2. Nf3 Nc6 3. Bc4')?.sans).toEqual(esperado)
    expect(lerLances('e4 e5 Cf3 Cc6 Bc4')?.sans).toEqual(esperado)
    expect(lerLances('1.e4 e5 2.cf3 cc6 3.bc4')?.sans).toEqual(esperado)
  })

  it('não confunde peão da coluna c com cavalo', () => {
    expect(lerLances('e4 c5 Cf3 d6 d4 cxd4')?.sans).toEqual(['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4'])
  })

  it('lê roque com zero e com letra', () => {
    expect(lerLances('e4 e5 Nf3 Nc6 Bc4 Bc5 0-0')?.sans.at(-1)).toBe('O-O')
    expect(lerLances('e4 e5 Nf3 Nc6 Bc4 Bc5 o-o')?.sans.at(-1)).toBe('O-O')
  })

  it('texto que não é lance devolve null', () => {
    expect(lerLances('siciliana')).toBeNull()
    expect(lerLances('e4 e5 Ke3 dragao')).toBeNull()
  })

  it('normaliza acentos e maiúsculas', () => {
    expect(normalizar('Dragão Göring')).toBe('dragao goring')
  })
})

describe('busca de aberturas', () => {
  it('por nome, sem acento', () => {
    const busca = buscarAberturas(capitulos, 'goring')
    expect(busca?.tipo).toBe('nome')
    expect(ids(busca!.resultados)).toContain('goring')
  })

  it('por nome de grupo mostra o grupo achado', () => {
    const busca = buscarAberturas(capitulos, 'peao envenenado')
    expect(busca?.tipo).toBe('nome')
    expect(busca!.resultados.length).toBeGreaterThan(0)
  })

  it('por lances acha todos os capítulos com a posição', () => {
    const busca = buscarAberturas(capitulos, 'e4 c6')
    expect(busca?.tipo).toBe('lances')
    expect(ids(busca!.resultados).every((id) => id.startsWith('caro-kann'))).toBe(true)
  })

  it('encontra a posição por transposição e mostra a ordem do livro', () => {
    // Italiana com os cavalos antes: 1.e4 e5 2.Bc4 Nc6 3.Nf3 vira 1.e4 e5 2.Nf3 Nc6 3.Bc4.
    const busca = buscarAberturas(capitulos, 'e4 e5 Bc4 Nc6 Nf3')
    if (busca?.tipo !== 'lances') throw new Error('esperava busca por lances')
    const italiana = busca.resultados.find((r) => r.capitulo.capitulo.id === 'italian')
    expect(italiana).toBeDefined()
    expect(italiana!.linhas.length).toBeGreaterThan(0)
  })

  it('quando sai do livro, diz até onde a sequência vai', () => {
    const busca = buscarAberturas(capitulos, 'e4 e5 Nf3 Nc6 Bc4 Nf6 a3 a6 h3 h6')
    if (busca?.tipo !== 'lances') throw new Error('esperava busca por lances')
    expect(busca.resultados).toEqual([])
    expect(busca.parcial?.lances).toBeGreaterThanOrEqual(6)
  })

  it('texto vazio não busca', () => {
    expect(buscarAberturas(capitulos, '   ')).toBeNull()
  })
})
