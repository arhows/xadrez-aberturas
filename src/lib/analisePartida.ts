import { Chess } from 'chess.js'
import { chanceDasBrancas } from './probabilidade'

/**
 * Análise de partida: chance de vitória das brancas depois de cada lance e classificação
 * dos lances pela chance que o lado que jogou perdeu (os mesmos cortes do lichess:
 * 10 pontos = imprecisão, 20 = erro, 30 = erro grave).
 */

export type Classe = 'imprecisao' | 'erro' | 'grave'

export interface LanceAnalisado {
  /** 1 = 1.e4 */
  ply: number
  san: string
  cor: 'w' | 'b'
  /** Pontos de chance que o lado que jogou perdeu com o lance (0 se ganhou). */
  perda: number
  classe: Classe | null
  /** Lance elogiado pelo motor: o melhor da posição ou um bom (perde menos de 5 pontos). */
  boa: 'melhor' | 'bom' | null
}

export const ROTULO_CLASSE: Record<Classe, string> = {
  imprecisao: 'Imprecisão',
  erro: 'Erro',
  grave: 'Erro grave',
}

export const SIMBOLO_CLASSE: Record<Classe, string> = { imprecisao: '?!', erro: '?', grave: '??' }

/** Posição antes do 1º lance e depois de cada lance; fim de jogo já tem o valor certo. */
export function posicoesDaPartida(sans: string[], fenInicial?: string): { fen: string; valorFixo?: number }[] {
  const jogo = fenInicial ? new Chess(fenInicial) : new Chess()
  const posicao = () => {
    const fen = jogo.fen()
    if (jogo.isCheckmate()) return { fen, valorFixo: jogo.turn() === 'w' ? -20000 : 20000 }
    if (jogo.isDraw()) return { fen, valorFixo: 0 }
    return { fen }
  }
  const lista = [posicao()]
  for (const san of sans) {
    jogo.move(san)
    lista.push(posicao())
  }
  return lista
}

export function classificar(perda: number): Classe | null {
  if (perda >= 30) return 'grave'
  if (perda >= 20) return 'erro'
  if (perda >= 10) return 'imprecisao'
  return null
}

/** "e2e4" → "e4" na posição dada; null se não der. */
export function sanDoUci(fen: string, uci: string | null | undefined): string | null {
  if (!uci) return null
  try {
    return new Chess(fen).move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] }).san
  } catch {
    return null
  }
}

/**
 * `valores[i]` = avaliação (cp, brancas) da posição depois de i lances; `melhores[i]` = melhor
 * lance (UCI) nessa posição, para reconhecer o ★ melhor lance.
 */
export function analisarLances(
  sans: string[],
  valores: (number | null)[],
  melhores: (string | null)[] = [],
  fenInicial?: string,
): { chances: (number | null)[]; lances: LanceAnalisado[] } {
  const chances = valores.map((v) => (v === null || v === undefined ? null : chanceDasBrancas(v)))
  const posicoes = melhores.length ? posicoesDaPartida(sans, fenInicial) : []
  const primeira = fenInicial?.split(' ')[1] === 'b' ? 'b' : 'w'
  const lances = sans.map((san, i): LanceAnalisado => {
    const cor = (i % 2 === 0) === (primeira === 'w') ? 'w' : 'b'
    const antes = chances[i]
    const depois = chances[i + 1]
    const perda = antes == null || depois == null ? 0 : Math.max(0, cor === 'w' ? antes - depois : depois - antes)
    const classe = classificar(perda)
    const melhor = posicoes.length ? sanDoUci(posicoes[i].fen, melhores[i]) : null
    const semXeque = (x: string) => x.replace(/[+#]/g, '')
    const boa = classe || depois == null ? null : melhor && semXeque(melhor) === semXeque(san) ? 'melhor' : perda < 5 ? 'bom' : null
    return { ply: i + 1, san, cor, perda, classe, boa }
  })
  return { chances, lances }
}

export function contarClasses(lances: LanceAnalisado[], cor: 'w' | 'b'): Record<Classe, number> {
  const conta: Record<Classe, number> = { imprecisao: 0, erro: 0, grave: 0 }
  for (const lance of lances) if (lance.cor === cor && lance.classe) conta[lance.classe]++
  return conta
}
