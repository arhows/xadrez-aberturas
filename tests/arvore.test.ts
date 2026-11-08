import { describe, expect, it } from 'vitest'
import { caminhoDaArmadilha, construirArvore, percorrer } from '../src/lib/arvore'
import { carregarCapitulos } from '../src/lib/capitulos'
import { separarLances } from '../src/lib/lances'
import type { Capitulo } from '../src/lib/tipos'
import { validarCapitulo } from '../src/lib/validacao'

function linha(id: string, lances: string, dicas: Record<string, string> = {}) {
  return { id, coluna: 1, grupo: 'g', nome: id, lances, avaliacao: null, resumo: '', dicas }
}

function arvoreDe(parcial: Partial<Capitulo>) {
  return construirArvore(
    validarCapitulo({ id: 't', nome: 't', base: '', grupos: [], linhas: [], ...parcial }),
  )
}

describe('mesclagem', () => {
  it('linhas com o mesmo prefixo compartilham nós e arestas', () => {
    const arvore = arvoreDe({
      linhas: [linha('a', '1. e4 e5 2. Nf3'), linha('b', '1. e4 e5 2. Bc4')],
    })
    const [e4, e5] = percorrer(arvore, ['e4', 'e5'])!
    expect(e4.linhas).toEqual(['a', 'b'])
    expect(e5.linhas).toEqual(['a', 'b'])
    expect(arvore.nos.get(e5.para)!.saidas.map((s) => s.san)).toEqual(['Nf3', 'Bc4'])
  })

  it('usa a primeira dica não vazia da aresta', () => {
    const arvore = arvoreDe({
      linhas: [
        linha('a', '1. e4 e5', { '1. e4': '' }),
        linha('b', '1. e4 c5', { '1. e4': 'primeira' }),
        linha('c', '1. e4 c6', { '1. e4': 'segunda' }),
      ],
    })
    expect(percorrer(arvore, ['e4'])![0].dica).toBe('primeira')
  })

  it('transposições convergem para o mesmo nó', () => {
    const arvore = arvoreDe({
      linhas: [linha('a', '1. Nf3 Nf6 2. Nc3'), linha('b', '1. Nc3 Nf6 2. Nf3')],
    })
    const a = percorrer(arvore, ['Nf3', 'Nf6', 'Nc3'])!
    const b = percorrer(arvore, ['Nc3', 'Nf6', 'Nf3'])!
    expect(a[2].para).toBe(b[2].para)
    expect(arvore.nos.get(a[2].para)!.entradas).toHaveLength(2)
  })

  it('guarda a ameaça na aresta do lance que a cria, com as casas da seta', () => {
    const arvore = arvoreDe({
      linhas: [{ ...linha('a', '1. e4 e5 2. Nf3'), ameacas: { '2. Nf3': { lance: 'Nxe5', texto: 'pega e5' } } }],
    })
    const [e4, , nf3] = percorrer(arvore, ['e4', 'e5', 'Nf3'])!
    expect(e4.ameaca).toBeNull()
    expect(nf3.ameaca).toEqual({ san: 'Nxe5', from: 'f3', to: 'e5', texto: 'pega e5' })
  })

  it('marca a armadilha no lance do erro', () => {
    const armadilha = { id: 'x', titulo: 't', lances: '1. e4 e5 2. Nf3', erroNoLance: 2, texto: 't' }
    const arvore = arvoreDe({ linhas: [linha('a', '1. e4 e5 2. Nf3')], armadilhas: [armadilha] })
    const [e4, e5, nf3] = percorrer(arvore, ['e4', 'e5', 'Nf3'])!
    expect(e4.armadilhas).toEqual([])
    expect(e5.armadilhas).toEqual([armadilha])
    expect(nf3.armadilhas).toEqual([])
    expect(caminhoDaArmadilha(armadilha)).toEqual(['e4', 'e5'])
  })

  it('coloca o selo da nota só na aresta do desvio', () => {
    const arvore = arvoreDe({
      linhas: [linha('l', '1. e4 e5')],
      notas: [
        {
          id: 'n',
          nota: 'a',
          rotulo: '(a)',
          coluna: 1,
          linhaBase: 'l',
          desvioNoLance: 2,
          lances: '1. e4 c5 2. Nf3',
          comentario: 'Siciliana',
        },
      ],
    })
    const [e4, c5, nf3] = percorrer(arvore, ['e4', 'c5', 'Nf3'])!
    expect(e4.selos).toEqual([])
    expect(c5.selos.map((s) => [s.rotulo, s.comentario])).toEqual([['(a)', 'Siciliana']])
    expect(nf3.selos).toEqual([])
    expect(e4.linhas).toEqual(['l', 'n'])
  })
})

describe('critérios de aceite (SPEC 8)', () => {
  const dois = carregarCapitulos().find((c) => c.capitulo.id === 'two-knights')!
  const { arvore } = dois
  const colunas = (de: number, ate: number) =>
    dois.capitulo.linhas
      .filter((l) => l.coluna !== null && l.coluna >= de && l.coluna <= ate)
      .map((l) => l.id)
  const lancesDe = (id: string) =>
    separarLances(dois.capitulo.linhas.find((l) => l.id === id)!.lances)

  it('0. as 25 linhas e as 156 notas entram na árvore', () => {
    expect(dois.estatisticas).toMatchObject({ linhas: 25, notas: 156 })
    expect(dois.desativadas).toEqual([])
    const ids = new Set(
      [...arvore.nos.values()].flatMap((no) => no.saidas.flatMap((aresta) => aresta.linhas)),
    )
    expect(ids.size).toBe(25 + 156)
  })

  it('0. a nota (b) A da coluna 1 é um ramo em 13.g3', () => {
    const nota = dois.capitulo.notas!.find((n) => n.id === 'c01-b-A')!
    const caminho = percorrer(arvore, separarLances(nota.lances).slice(0, 25))!
    const aresta = caminho[24]
    expect(aresta.san).toBe('g3')
    expect(aresta.selos.map((s) => s.rotulo)).toContain('(b) A')
    const irmaos = arvore.nos.get(aresta.de)!.saidas.map((s) => s.san)
    expect(irmaos).toEqual(expect.arrayContaining(['b3', 'g3']))
  })

  it('2. as colunas 1–6 compartilham o tronco até 8...h6 e se dividem em 9.Nf3 / 9.Nh3', () => {
    const ids = colunas(1, 6)
    expect(ids).toHaveLength(6)
    const tronco = percorrer(arvore, lancesDe('c01').slice(0, 16))!
    expect(tronco.at(-1)!.san).toBe('h6')
    for (const aresta of tronco) expect(aresta.linhas).toEqual(expect.arrayContaining(ids))

    const saidas = arvore.nos
      .get(tronco.at(-1)!.para)!
      .saidas.filter((aresta) => aresta.linhas.some((id) => ids.includes(id)))
      .map((aresta) => aresta.san)
    expect(saidas.sort()).toEqual(['Nf3', 'Nh3'])
  })

  it('3. a dica de 11...exd3 fala do en passant', () => {
    const aresta = percorrer(arvore, lancesDe('c01').slice(0, 22))!.at(-1)!
    expect(aresta.san).toBe('exd3')
    expect(aresta.dica).toMatch(/en passant/i)
  })

  it('3. a dica de 4.Ng5 vale para as colunas 1–12', () => {
    const aresta = percorrer(arvore, ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6', 'Ng5'])!.at(-1)!
    expect(aresta.dica).toBeTruthy()
    expect(colunas(1, 12)).toHaveLength(12)
    expect(aresta.linhas).toEqual(expect.arrayContaining(colunas(1, 12)))
  })

  it('4. na coluna 5, depois de 9.Nh3, o único lance das pretas é 9...Bc5', () => {
    const [id] = colunas(5, 5)
    const lances = lancesDe(id)
    expect(lances[16]).toBe('Nh3')
    const aresta = percorrer(arvore, lances.slice(0, 17))!.at(-1)!
    const respostas = arvore.nos
      .get(aresta.para)!
      .saidas.filter((saida) => saida.linhas.includes(id))
      .map((saida) => saida.san)
    expect(respostas).toEqual(['Bc5'])
  })
})

describe('dicas das notas', () => {
  it('a aresta do desvio de uma nota mostra a dica dela', () => {
    for (const cap of carregarCapitulos()) {
      const arestas = [...cap.arvore.nos.values()].flatMap((no) => no.saidas)
      const nota = cap.capitulo.notas![0]
      const desvio = arestas.find((a) => a.selos.some((s) => s.id === nota.id))
      expect(desvio?.dica, nota.id).toBe(Object.values(nota.dicas!)[0])
    }
  })
})
