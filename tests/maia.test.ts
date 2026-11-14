import { readFileSync } from 'node:fs'
import * as ort from 'onnxruntime-web'
import { beforeAll, describe, expect, it } from 'vitest'
import {
  CAMADAS,
  NIVEIS_MAIA,
  candidatosDaMaia,
  codificarPosicoes,
  escolherLanceDaMaia,
  fensDaPartida,
  nomesNoVocabulario,
} from '../src/lib/maia'
import { ehArquivoDaMaia } from '../scripts/pwa/serviceWorker'

const camada = (entrada: Float32Array, n: number) => Array.from(entrada.slice(n * 64, (n + 1) * 64))
/** Valor na casa (linha 0–7 vista por quem joga, coluna 0–7) de uma camada. */
const casa = (entrada: Float32Array, n: number, linha: number, coluna: number) => entrada[n * 64 + linha * 8 + coluna]

describe('codificação da posição (entrada da lc0)', () => {
  it('posição inicial: 112 camadas, peões nas linhas certas, roques, vez e camada de 1', () => {
    const e = codificarPosicoes(fensDaPartida(undefined, []))
    expect(e.length).toBe(CAMADAS * 64)
    // Nossos peões (brancas) na 2ª fileira; os deles na 7ª.
    expect(camada(e, 0).slice(8, 16)).toEqual(Array(8).fill(1))
    expect(camada(e, 6).slice(48, 56)).toEqual(Array(8).fill(1))
    // Nosso rei em e1, o deles em e8.
    expect(casa(e, 5, 0, 4)).toBe(1)
    expect(casa(e, 11, 7, 4)).toBe(1)
    // Sem histórico: a 2ª posição fica zerada.
    expect(camada(e, 13).every((v) => v === 0)).toBe(true)
    for (const n of [104, 105, 106, 107, 111]) expect(camada(e, n).every((v) => v === 1)).toBe(true)
    expect(camada(e, 108).every((v) => v === 0)).toBe(true)
  })

  it('vez das pretas: tabuleiro espelhado, "nossas" peças são as pretas', () => {
    const e = codificarPosicoes(fensDaPartida(undefined, ['e4']))
    // Rei preto (nosso) aparece na linha 0, e4 branco (deles) aparece na linha 4 (e5 espelhada).
    expect(casa(e, 5, 0, 4)).toBe(1)
    expect(casa(e, 6, 4, 4)).toBe(1)
    expect(camada(e, 108).every((v) => v === 1)).toBe(true)
    // Histórico: a posição anterior (inicial) também vista pelas pretas.
    expect(casa(e, 13 + 6, 6, 4)).toBe(1)
  })

  it('repetição e regra dos 50 lances', () => {
    const e = codificarPosicoes(fensDaPartida(undefined, ['Nf3', 'Nf6', 'Ng1', 'Ng8']))
    expect(camada(e, 12).every((v) => v === 1)).toBe(true)
    expect(camada(e, 109).every((v) => v === 4)).toBe(true)
  })
})

describe('vocabulário de lances', () => {
  it('roque, promoções e espelho das pretas', () => {
    expect(nomesNoVocabulario({ from: 'e1', to: 'g1' }, false, 'curto')).toEqual(['e1h1', 'e1g1'])
    expect(nomesNoVocabulario({ from: 'e8', to: 'c8' }, true, 'longo')).toEqual(['e1a1', 'e1c1'])
    expect(nomesNoVocabulario({ from: 'a7', to: 'a8', promotion: 'q' }, false, null)).toEqual(['a7a8q'])
    expect(nomesNoVocabulario({ from: 'a7', to: 'a8', promotion: 'n' }, false, null)).toEqual(['a7a8'])
    expect(nomesNoVocabulario({ from: 'e7', to: 'e5' }, true, null)).toEqual(['e2e4'])
  })

  it('escolha: varia na abertura entre os quase tão prováveis, depois joga o mais provável', () => {
    const c = [
      { lance: { from: 'e2', to: 'e4' }, san: 'e4', probabilidade: 0.5 },
      { lance: { from: 'd2', to: 'd4' }, san: 'd4', probabilidade: 0.3 },
      { lance: { from: 'a2', to: 'a3' }, san: 'a3', probabilidade: 0.1 },
    ]
    expect(escolherLanceDaMaia(c, 0, () => 0.99)!.san).toBe('d4')
    expect(escolherLanceDaMaia(c, 0, () => 0)!.san).toBe('e4')
    expect(escolherLanceDaMaia(c, 20, () => 0.99)!.san).toBe('e4')
    expect(escolherLanceDaMaia([], 0)).toBeNull()
  })

  it('só os arquivos da Maia ficam fora do cache da instalação', () => {
    expect(ehArquivoDaMaia('maia/maia-1500.onnx')).toBe(true)
    expect(ehArquivoDaMaia('assets/ort-wasm-simd-threaded-qh98TCA_.wasm')).toBe(true)
    expect(ehArquivoDaMaia('assets/maiaMotor-CvaBxSb8.js')).toBe(false)
    expect(ehArquivoDaMaia('stockfish/stockfish-19-lite-single.wasm')).toBe(false)
  })
})

describe('Maia com o modelo de verdade', () => {
  ort.env.wasm.numThreads = 1
  const sessoes = new Map<number, ort.InferenceSession>()
  beforeAll(async () => {
    for (const nivel of [1100, 1500, 1900]) {
      sessoes.set(nivel, await ort.InferenceSession.create(readFileSync(`public/maia/maia-${nivel}.onnx`)))
    }
  })
  async function candidatos(nivel: number, sans: string[]) {
    const fens = fensDaPartida(undefined, sans)
    const sessao = sessoes.get(nivel)!
    const saida = await sessao.run({ [sessao.inputNames[0]]: new ort.Tensor('float32', codificarPosicoes(fens), [1, CAMADAS, 8, 8]) })
    const politica = Object.values(saida).find((t) => t.dims.at(-1) === 1858)!
    return candidatosDaMaia(fens.at(-1)!, politica.data as Float32Array)
  }

  it('os nove níveis estão no app', () => {
    for (const n of NIVEIS_MAIA) expect(readFileSync(`public/maia/maia-${n}.onnx`).length).toBeGreaterThan(3_000_000)
  })

  it('posição inicial: e4 primeiro, d4 segundo', async () => {
    const c = await candidatos(1500, [])
    expect(c.slice(0, 2).map((x) => x.san)).toEqual(['e4', 'd4'])
    expect(c.reduce((a, x) => a + x.probabilidade, 0)).toBeCloseTo(1, 5)
  })

  it('pretas: Najdorf na Siciliana Aberta', async () => {
    const c = await candidatos(1900, ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3'])
    expect(c[0].san).toBe('a6')
  })

  it('o roque é reconhecido', async () => {
    const c = await candidatos(1500, ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6', 'd3', 'Bc5'])
    expect(c.slice(0, 3).map((x) => x.san)).toContain('O-O')
  })

  it('retoma a peça quando a captura é óbvia', async () => {
    const c = await candidatos(1100, ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Bxc6'])
    expect(['dxc6', 'bxc6']).toContain(c[0].san)
  })
})
