import { Chess } from 'chess.js'

/**
 * Stockfish 19 "lite single-threaded" rodando no navegador (public/stockfish, GPLv3).
 * Um único worker atende o app inteiro; ele só é baixado (≈1,9 MB) na primeira análise.
 */

export interface LinhaAoVivo {
  /** Centipeões do ponto de vista das brancas (ausente quando há mate). */
  cp?: number
  /** Mate em N do ponto de vista das brancas: positivo = brancas dão mate. */
  mate?: number
  /** Continuação em SAN a partir da posição analisada. */
  sans: string[]
}

export interface AnaliseAoVivo {
  fen: string
  profundidade: number
  linhas: LinhaAoVivo[]
  terminou: boolean
}

const PROFUNDIDADE = 20
const LINHAS = 3
const LANCES_POR_LINHA = 8

let worker: Worker | null = null
let pronto: Promise<void> | null = null
let buscando = false
/** Uma busca antiga foi interrompida e o "bestmove" dela ainda vai chegar. */
let descartarAteBestmove = false
let pendente: { fen: string; aoAtualizar: (a: AnaliseAoVivo) => void } | null = null
let atual: { fen: string; aoAtualizar: (a: AnaliseAoVivo) => void; analise: AnaliseAoVivo } | null = null

const URL_MOTOR = () => new URL('stockfish/stockfish-19-lite-single.js', document.baseURI).href

function iniciar(): Promise<void> {
  if (pronto) return pronto
  pronto = new Promise((resolver, rejeitar) => {
    try {
      worker = new Worker(URL_MOTOR())
    } catch (erro) {
      rejeitar(erro)
      return
    }
    worker.onerror = () => rejeitar(new Error('Não foi possível carregar o Stockfish.'))
    worker.onmessage = (evento: MessageEvent<string>) => {
      const linha = String(evento.data)
      if (linha === 'readyok') resolver()
      else tratar(linha)
    }
    worker.postMessage('uci')
    worker.postMessage(`setoption name MultiPV value ${LINHAS}`)
    worker.postMessage('isready')
  })
  return pronto
}

function comecar(fen: string, aoAtualizar: (a: AnaliseAoVivo) => void) {
  atual = { fen, aoAtualizar, analise: { fen, profundidade: 0, linhas: [], terminou: false } }
  buscando = true
  worker!.postMessage(`position fen ${fen}`)
  worker!.postMessage(`go depth ${PROFUNDIDADE}`)
}

function tratar(linha: string) {
  if (linha.startsWith('bestmove')) {
    if (descartarAteBestmove) {
      descartarAteBestmove = false
      buscando = false
      if (pendente) {
        const { fen, aoAtualizar } = pendente
        pendente = null
        comecar(fen, aoAtualizar)
      }
      return
    }
    buscando = false
    if (atual) {
      atual.analise = { ...atual.analise, terminou: true }
      atual.aoAtualizar(atual.analise)
    }
    return
  }
  if (descartarAteBestmove || !atual || !linha.startsWith('info') || !linha.includes(' pv ')) return
  const info = lerInfo(linha, atual.fen)
  if (!info) return
  const linhas = [...atual.analise.linhas]
  linhas[info.multipv - 1] = info.linha
  atual.analise = { ...atual.analise, profundidade: info.profundidade, linhas: linhas.filter(Boolean) }
  atual.aoAtualizar(atual.analise)
}

/** Lê uma linha "info depth ... multipv ... score ... pv ..." e converte o pv para SAN. */
export function lerInfo(
  linha: string,
  fen: string,
): { profundidade: number; multipv: number; linha: LinhaAoVivo } | null {
  const partes = linha.split(' ')
  const valor = (nome: string) => partes[partes.indexOf(nome) + 1]
  if (!partes.includes('depth') || !partes.includes('score')) return null
  const profundidade = Number(valor('depth'))
  const multipv = partes.includes('multipv') ? Number(valor('multipv')) : 1
  const tipo = valor('score')
  const numero = Number(partes[partes.indexOf('score') + 2])
  // O UCI dá a nota do ponto de vista de quem joga; o app mostra sempre do lado das brancas.
  const sinal = fen.split(' ')[1] === 'b' ? -1 : 1
  const pv = partes.slice(partes.indexOf('pv') + 1)
  const jogo = new Chess(fen)
  const sans: string[] = []
  for (const uci of pv.slice(0, LANCES_POR_LINHA)) {
    try {
      sans.push(jogo.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] }).san)
    } catch {
      break
    }
  }
  if (!sans.length) return null
  const resultado: LinhaAoVivo = { sans }
  if (tipo === 'mate') resultado.mate = sinal * numero
  else resultado.cp = sinal * numero
  return { profundidade, multipv, linha: resultado }
}

/** Analisa a posição; a cada nova profundidade chama `aoAtualizar`. Troca a busca anterior. */
export async function analisarAoVivo(fen: string, aoAtualizar: (a: AnaliseAoVivo) => void): Promise<void> {
  await iniciar()
  if (buscando) {
    pendente = { fen, aoAtualizar }
    if (!descartarAteBestmove) {
      descartarAteBestmove = true
      worker!.postMessage('stop')
    }
    return
  }
  comecar(fen, aoAtualizar)
}

/** Para a busca (ao sair da tela ou desligar a análise); o worker fica pronto para a próxima. */
export function pararAnalise(): void {
  pendente = null
  atual = null
  if (worker && buscando && !descartarAteBestmove) {
    descartarAteBestmove = true
    worker.postMessage('stop')
  }
}
