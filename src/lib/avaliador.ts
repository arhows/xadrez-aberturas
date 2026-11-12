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
export interface Avaliacao {
  /** Centipeões do ponto de vista das brancas (mate = ±20000); null sem resposta. */
  cp: number | null
  /** Melhor lance em UCI ("e2e4"); null em fim de jogo. */
  melhor: string | null
}

let atual: { vezDasBrancas: boolean; ultima: number | null; resolver: (a: Avaliacao) => void } | null = null
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
        const uci = linha.split(' ')[1]
        terminado.resolver({ cp: terminado.ultima, melhor: uci && uci !== '(none)' ? uci : null })
      }
    }
    worker.postMessage('uci')
    worker.postMessage('setoption name MultiPV value 1')
    worker.postMessage('isready')
  })
  return pronto
}

/** Fila: uma avaliação por vez no mesmo worker (o Jogar pode pedir enquanto outra termina). */
let fila: Promise<unknown> = Promise.resolve()

/** Avalia uma posição (usado pelo modo treino do Jogar: dica e qualidade do lance). */
export function avaliarPosicao(fen: string, profundidade: number): Promise<Avaliacao> {
  const resultado = fila.then(async () => {
    await iniciar()
    return avaliar(fen, profundidade)
  })
  fila = resultado.catch(() => undefined)
  return resultado
}

function avaliar(fen: string, profundidade: number): Promise<Avaliacao> {
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
  aoProgredir: (feitas: number, avaliacoes: Avaliacao[]) => void,
): Promise<Avaliacao[]> {
  await iniciar()
  cancelado = false
  const avaliacoes: Avaliacao[] = []
  for (const posicao of posicoes) {
    if (cancelado) break
    avaliacoes.push(posicao.valorFixo !== undefined ? { cp: posicao.valorFixo, melhor: null } : await avaliar(posicao.fen, profundidade))
    aoProgredir(avaliacoes.length, avaliacoes)
  }
  return avaliacoes
}

export function pararAvaliacao(): void {
  cancelado = true
  if (atual) worker?.postMessage('stop')
}
