import { describe, expect, it } from 'vitest'
import { exibirAvaliacao } from '../src/lib/avaliacao'
import { carregarCapitulos } from '../src/lib/capitulos'
import { idsDoEscopo } from '../src/lib/escopo'
import { formatarSan, formatarTexto } from '../src/lib/notacao'
import { importarProgresso, normalizarProgresso, progresso } from '../src/lib/progresso'
import {
  avancar,
  iniciarPartida,
  lanceEsperado,
  lancesAceitos,
  sortear,
  terminou,
  vezDoUsuario,
  type Partida,
} from '../src/lib/treino'

const todosOsCapitulos = await carregarCapitulos()

const dois = todosOsCapitulos.find((c) => c.capitulo.id === 'two-knights')!
const { arvore } = dois

/** Joga a linha alvo até chegar a vez do lance de número `plies`. */
function jogarAte(inicial: Partida, escopo: Set<string>, plies: number): Partida {
  let partida = inicial
  while (partida.jogadas.length < plies) {
    partida = avancar(partida, lanceEsperado(arvore, partida)!, escopo)
  }
  return partida
}

describe('motor de treino', () => {
  it('critério 4: pretas na coluna 5 — o app joga 9.Nh3 e só 9...Bc5 é aceito', () => {
    const escopo = new Set(['c05'])
    const partida = jogarAte(iniciarPartida(arvore, 'c05', 'b'), escopo, 17)

    expect(partida.jogadas.at(-1)!.san).toBe('Nh3')
    expect(vezDoUsuario(arvore, partida)).toBe(true)
    expect(lancesAceitos(arvore, partida, escopo).map((a) => a.san)).toEqual(['Bc5'])
    expect(lanceEsperado(arvore, partida)!.dica).toBeTruthy()
  })

  it('as brancas jogam o primeiro lance e as pretas esperam', () => {
    expect(vezDoUsuario(arvore, iniciarPartida(arvore, 'c01', 'w'))).toBe(true)
    expect(vezDoUsuario(arvore, iniciarPartida(arvore, 'c01', 'b'))).toBe(false)
  })

  it('aceita qualquer lance do livro no escopo e passa a cobrar a linha dele', () => {
    const escopo = new Set(idsDoEscopo(dois, { tipo: 'grupo', id: 'ng5-na5' }, 'colunas', []))
    const partida = jogarAte(iniciarPartida(arvore, 'c01', 'w'), escopo, 16)

    const aceitos = lancesAceitos(arvore, partida, escopo)
    expect(aceitos.map((a) => a.san).sort()).toEqual(['Nf3', 'Nh3'])

    const nh3 = aceitos.find((a) => a.san === 'Nh3')!
    const depois = avancar(partida, nh3, escopo)
    expect(nh3.linhas).not.toContain('c01')
    expect(nh3.linhas).toContain(depois.alvo)
  })

  it('ao trocar de linha, escolhe a de maior peso', () => {
    const escopo = new Set(['c01', 'c05', 'c06'])
    const partida = jogarAte(iniciarPartida(arvore, 'c01', 'w'), escopo, 16)
    const nh3 = lancesAceitos(arvore, partida, escopo).find((a) => a.san === 'Nh3')!
    const candidatas = nh3.linhas.filter((id) => escopo.has(id))
    expect(candidatas.length).toBeGreaterThan(1)

    const ultima = candidatas.at(-1)!
    const depois = avancar(partida, nh3, escopo, (id) => (id === ultima ? 10 : 1))
    expect(depois.alvo).toBe(ultima)
  })

  it('termina exatamente no último lance da linha', () => {
    const escopo = new Set(['c01'])
    const total = dois.unidades.find((u) => u.id === 'c01')!.lances.length
    const penultima = jogarAte(iniciarPartida(arvore, 'c01', 'w'), escopo, total - 1)
    expect(terminou(arvore, penultima)).toBe(false)
    const fim = avancar(penultima, lanceEsperado(arvore, penultima)!, escopo)
    expect(fim.jogadas).toHaveLength(total)
    expect(terminou(arvore, fim)).toBe(true)
  })

  it('uma nota pode ser cobrada até o fim pelo lance do desvio', () => {
    const nota = dois.capitulo.notas!.find((n) => n.id === 'c01-b-A')!
    const escopo = new Set([nota.id])
    const partida = jogarAte(iniciarPartida(arvore, nota.id, 'w'), escopo, nota.desvioNoLance)
    expect(partida.jogadas.at(-1)!.san).toBe('g3')
    expect(partida.jogadas.at(-1)!.selos.map((s) => s.id)).toContain(nota.id)
  })

  it('sorteia respeitando o peso', () => {
    const peso = (item: string) => (item === 'a' ? 1 : 3)
    expect(sortear(['a', 'b'], peso, () => 0)).toBe('a')
    expect(sortear(['a', 'b'], peso, () => 0.24)).toBe('a')
    expect(sortear(['a', 'b'], peso, () => 0.25)).toBe('b')
    expect(sortear(['a', 'b'], peso, () => 0.99)).toBe('b')
  })
})

describe('escopo', () => {
  it('só colunas não inclui notas', () => {
    const ids = idsDoEscopo(dois, { tipo: 'capitulo' }, 'colunas', [])
    expect(ids).toHaveLength(25)
  })

  it('com notas, a linha leva as notas da sua coluna', () => {
    const ids = idsDoEscopo(dois, { tipo: 'linha', id: 'c01' }, 'notas', [])
    expect(ids).toContain('c01')
    expect(ids).toContain('c01-b-A')
    expect(ids.every((id) => id.startsWith('c01'))).toBe(true)
  })

  it('nota a conferir só entra depois de marcada', () => {
    const escopo = { tipo: 'linha', id: 'c05' } as const
    expect(idsDoEscopo(dois, escopo, 'notas', [])).not.toContain('c05-t-A')
    expect(idsDoEscopo(dois, escopo, 'notas', ['c05-t-A'])).toContain('c05-t-A')
  })

  it('linha bônus entra no grupo dela', () => {
    expect(idsDoEscopo(dois, { tipo: 'grupo', id: 'ng5-outras' }, 'colunas', [])).toContain(
      'bonus-fried-liver',
    )
  })
})

describe('notação em português', () => {
  it.each([
    ['Nf3', 'Cf3'],
    ['Qxd5+', 'Dxd5+'],
    ['Rad8', 'Tad8'],
    ['Bb5+', 'Bb5+'],
    ['Kxf7', 'Rxf7'],
    ['exd3', 'exd3'],
    ['O-O', 'O-O'],
    ['e8=Q', 'e8=D'],
  ])('%s → %s', (en, pt) => {
    expect(formatarSan(en, 'pt')).toBe(pt)
    expect(formatarSan(en, 'en')).toBe(en)
  })

  it('traduz lances citados no texto sem tocar nas palavras', () => {
    expect(formatarTexto('Rei em e1, depois 5...Nxd5 e Qf3+.', 'pt')).toBe(
      'Rei em e1, depois 5...Cxd5 e Df3+.',
    )
  })
})

describe('avaliação', () => {
  it('explica os símbolos e mantém o texto livre', () => {
    expect(exibirAvaliacao(null)).toBeNull()
    expect(exibirAvaliacao('unclear')?.rotulo).toBe('∞')
    expect(exibirAvaliacao('±')?.explicacao).toBe('Brancas melhor')
    expect(exibirAvaliacao('comp.')?.explicacao).toMatch(/Compensação/)
    expect(exibirAvaliacao('∓ / caótico')).toEqual({
      rotulo: '∓ / caótico',
      explicacao: 'Pretas melhor',
    })
    expect(exibirAvaliacao('brancas com ataque')?.explicacao).toBeNull()
  })

  it('toda avaliação do capítulo tem exibição', () => {
    for (const u of [...dois.capitulo.linhas, ...dois.capitulo.notas!]) {
      if (u.avaliacao) expect(exibirAvaliacao(u.avaliacao)?.rotulo).toBeTruthy()
    }
  })
})

describe('importação de progresso', () => {
  it('rejeita o que não é progresso e não altera nada', () => {
    const antes = JSON.stringify(progresso)
    expect(importarProgresso('não é json')).toBe(false)
    expect(importarProgresso('{"foo": 1}')).toBe(false)
    expect(importarProgresso('null')).toBe(false)
    expect(JSON.stringify(progresso)).toBe(antes)
  })

  it('completa as configurações ausentes com o padrão', () => {
    const normalizado = normalizarProgresso({ cartoes: {}, config: { notacao: 'pt' } })!
    expect(normalizado.config.notacao).toBe('pt')
    expect(normalizado.config.novasPorDia).toBe(5)
  })
})
