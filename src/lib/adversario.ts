/**
 * Stockfish como adversário na tela Jogar. Usa um worker próprio (o mesmo arquivo do motor
 * ao vivo), para que uma partida não atrapalhe a análise do Explorar e vice-versa.
 * A força vem do "Skill Level" do Stockfish (que erra de propósito nos níveis baixos)
 * somado a um limite de profundidade e de tempo.
 */

export interface Nivel {
  nivel: number
  nome: string
  skill: number
  profundidade: number
  /** ms máximos de busca por lance. */
  tempo: number
}

export const NIVEIS: Nivel[] = [
  { nivel: 1, nome: 'Iniciante', skill: 0, profundidade: 1, tempo: 100 },
  { nivel: 2, nome: 'Básico', skill: 3, profundidade: 2, tempo: 150 },
  { nivel: 3, nome: 'Casual', skill: 6, profundidade: 4, tempo: 250 },
  { nivel: 4, nome: 'Clube', skill: 9, profundidade: 6, tempo: 400 },
  { nivel: 5, nome: 'Forte', skill: 12, profundidade: 8, tempo: 600 },
  { nivel: 6, nome: 'Avançado', skill: 15, profundidade: 11, tempo: 800 },
  { nivel: 7, nome: 'Especialista', skill: 18, profundidade: 14, tempo: 1200 },
  { nivel: 8, nome: 'Máximo', skill: 20, profundidade: 18, tempo: 2000 },
]

export const nivelPorNumero = (n: number): Nivel => NIVEIS.find((x) => x.nivel === n) ?? NIVEIS[2]

export interface LanceUci {
  from: string
  to: string
  promotion?: string
}

/** "e7e8q" → { from: 'e7', to: 'e8', promotion: 'q' }; null para "(none)". */
export function lerUci(uci: string): LanceUci | null {
  const m = uci.match(/^([a-h][1-8])([a-h][1-8])([qrbn])?$/)
  return m ? { from: m[1], to: m[2], promotion: m[3] } : null
}

/** Comandos UCI que pedem um lance no nível escolhido. */
export function comandosDoLance(fen: string, nivel: Nivel): string[] {
  return [
    `setoption name Skill Level value ${nivel.skill}`,
    `position fen ${fen}`,
    `go depth ${nivel.profundidade} movetime ${nivel.tempo}`,
  ]
}

let worker: Worker | null = null
let pronto: Promise<void> | null = null
let aguardando: ((uci: string) => void) | null = null
/** Buscas interrompidas cujo "bestmove" ainda vai chegar e deve ser ignorado. */
let descartar = 0

const URL_MOTOR = () => new URL('stockfish/stockfish-19-lite-single.js', document.baseURI).href

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
      if (linha === 'readyok') resolver()
      else if (linha.startsWith('bestmove')) {
        if (descartar > 0) {
          descartar--
          return
        }
        if (!aguardando) return
        const devolver = aguardando
        aguardando = null
        devolver(linha.split(' ')[1] ?? '')
      }
    }
    worker.postMessage('uci')
    worker.postMessage('setoption name MultiPV value 1')
    worker.postMessage('isready')
  })
  return pronto
}

/** Pede o lance do computador. Um pedido novo cancela o anterior (ex.: a pessoa desfez o lance). */
export async function lanceDoComputador(fen: string, nivel: Nivel): Promise<LanceUci | null> {
  await iniciar()
  pararComputador()
  return new Promise((resolver) => {
    aguardando = (uci) => resolver(lerUci(uci))
    for (const comando of comandosDoLance(fen, nivel)) worker!.postMessage(comando)
  })
}

/** Interrompe a busca (ao sair da tela). */
export function pararComputador(): void {
  if (aguardando) {
    // O "bestmove" da busca interrompida ainda vai chegar: ele é descartado.
    const anterior = aguardando
    aguardando = null
    descartar++
    worker?.postMessage('stop')
    anterior('')
  }
}
