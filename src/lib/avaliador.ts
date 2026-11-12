/**
 * Avaliação de posições em sequência para a análise de partidas. Worker próprio do mesmo
 * Stockfish do app, para não disputar com a análise do Explorar nem com o adversário do Jogar.
 */

const URL_MOTOR = () => new URL('stockfish/stockfish-19-lite-single.js', document.baseURI).href
const MATE = 20000

/** Converte "info ... score cp 35" / "score mate -3" para centipeões do ponto de vista das brancas. */
export function lerPontuacao(linha: string, vezDasBrancas: boolean): number | null {
  const m = linha.match(/ score (cp|mate) (-?\d+)/)
  if (!m) return null
  const valor = Number(m[2])
  const doLado = m[1] === 'cp' ? valor : Math.sign(valor || 1) * (MATE - Math.abs(valor))
  return vezDasBrancas ? doLado : -doLado
}

let worker: Worker | null = null
let pronto: Promise<void> | null = null
let atual: { vezDasBrancas: boolean; ultima: number | null; resolver: (cp: number | null) => void } | null = null
let cancelado = false

function iniciar(): Promise<void> {
  if (pronto) return pronto
  pronto = new Promise((resolver, rejeitar) => {
    try {
      worker = new Worker(URL_MOTOR())
    } catch (erro) {
      pronto = null
      rejeitar(erro)
      return
    }
    worker.onerror = () => {
      pronto = null
      rejeitar(new Error('Não foi possível carregar o Stockfish.'))
    }
    worker.onmessage = (evento: MessageEvent<string>) => {
      const linha = String(evento.data)
      if (linha === 'readyok') return resolver()
      if (!atual) return
      if (linha.startsWith('info') && linha.includes(' score ')) {
        const cp = lerPontuacao(linha, atual.vezDasBrancas)
        if (cp !== null) atual.ultima = cp
      } else if (linha.startsWith('bestmove')) {
        const terminado = atual
        atual = null
        terminado.resolver(terminado.ultima)
      }
    }
    worker.postMessage('uci')
    worker.postMessage('setoption name MultiPV value 1')
    worker.postMessage('isready')
  })
  return pronto
}

function avaliar(fen: string, profundidade: number): Promise<number | null> {
  return new Promise((resolver) => {
    atual = { vezDasBrancas: fen.split(' ')[1] === 'w', ultima: null, resolver }
    worker!.postMessage(`position fen ${fen}`)
    worker!.postMessage(`go depth ${profundidade}`)
  })
}

/**
 * Avalia as posições uma a uma (a lista já vem com fim de jogo resolvido: mate/afogamento
 * passam `valorFixo`). Para no meio se `pararAvaliacao` for chamado.
 */
export async function avaliarPosicoes(
  posicoes: { fen: string; valorFixo?: number }[],
  profundidade: number,
  aoProgredir: (feitas: number, valores: (number | null)[]) => void,
): Promise<(number | null)[]> {
  await iniciar()
  cancelado = false
  const valores: (number | null)[] = []
  for (const posicao of posicoes) {
    if (cancelado) break
    valores.push(posicao.valorFixo ?? (await avaliar(posicao.fen, profundidade)))
    aoProgredir(valores.length, valores)
  }
  return valores
}

export function pararAvaliacao(): void {
  cancelado = true
  if (atual) worker?.postMessage('stop')
}
