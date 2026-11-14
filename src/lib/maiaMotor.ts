/**
 * Executa a Maia no aparelho com o onnxruntime-web (WebAssembly). O motor e o modelo de cada nível
 * só são baixados quando alguém joga contra a Maia; o service worker guarda os dois para as próximas
 * partidas e para jogar sem internet.
 */
import type { InferenceSession } from 'onnxruntime-web/wasm'
import type { LanceUci } from './adversario'
import { CAMADAS, candidatosDaMaia, codificarPosicoes, escolherLanceDaMaia, type NivelMaia } from './maia'

type Ort = typeof import('onnxruntime-web/wasm')

let ort: Promise<Ort> | null = null
const sessoes = new Map<NivelMaia, Promise<InferenceSession>>()

function carregarOrt(): Promise<Ort> {
  ort ??= import('onnxruntime-web/wasm').then((modulo) => {
    // Sem os cabeçalhos de isolamento (o GitHub Pages não os envia) não há threads: uma só basta,
    // a Maia faz uma única conta por lance.
    modulo.env.wasm.numThreads = 1
    return modulo
  })
  return ort
}

function sessaoDoNivel(nivel: NivelMaia): Promise<InferenceSession> {
  let sessao = sessoes.get(nivel)
  if (!sessao) {
    sessao = (async () => {
      const modulo = await carregarOrt()
      const url = new URL(`maia/maia-${nivel}.onnx`, document.baseURI).href
      const resposta = await fetch(url)
      if (!resposta.ok) throw new Error('Não foi possível baixar a Maia.')
      return modulo.InferenceSession.create(new Uint8Array(await resposta.arrayBuffer()))
    })()
    // Se falhar (sem internet), a próxima tentativa baixa de novo.
    sessao.catch(() => sessoes.delete(nivel))
    sessoes.set(nivel, sessao)
  }
  return sessao
}

/** Baixa e prepara o nível antes da partida começar, para o primeiro lance não demorar. */
export function prepararMaia(nivel: NivelMaia): Promise<void> {
  return sessaoDoNivel(nivel).then(() => undefined)
}

/**
 * O lance da Maia na posição atual (a última de `fens`, que traz a partida desde o começo para a
 * rede enxergar os lances anteriores).
 */
export async function lanceDaMaia(fens: string[], nivel: NivelMaia): Promise<LanceUci | null> {
  const [modulo, sessao] = await Promise.all([carregarOrt(), sessaoDoNivel(nivel)])
  const entrada = new modulo.Tensor('float32', codificarPosicoes(fens), [1, CAMADAS, 8, 8])
  const saida = await sessao.run({ [sessao.inputNames[0]]: entrada })
  const politica = Object.values(saida).find((t) => t.dims.at(-1) === 1858)
  if (!politica) throw new Error('A Maia respondeu num formato inesperado.')
  const candidatos = candidatosDaMaia(fens.at(-1)!, politica.data as Float32Array)
  return escolherLanceDaMaia(candidatos, fens.length - 1)?.lance ?? null
}
