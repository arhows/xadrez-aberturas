import { Chess } from 'chess.js'
import type { Cor } from './lances'

/**
 * Armadilhas de abertura (gerado por scripts/armadilhas/gerar.mjs): a sequência desde o 1º lance,
 * o meio-lance do erro natural, a punição e as defesas aceitas (calculadas com o Stockfish).
 * Três modos: ver a armadilha, armá-la (punir o erro) e se defender (achar um lance seguro).
 */

export interface Armadilha {
  id: string
  nome: string
  abertura: string
  /** Quem arma a armadilha (o adversário de quem erra). */
  lado: Cor
  /** SAN separados por espaço, desde o 1º lance até o fim da punição. */
  lances: string
  /** Meio-lance do erro (1 = 1º lance das brancas). */
  erro: number
  texto: string
  ideia?: string
  /** Lances aceitos como defesa na posição antes do erro. */
  defesas: string[]
  /** Capítulos do livro em que a posição antes do erro aparece. */
  capitulos: string[]
}

export type ModoArmadilha = 'ver' | 'armar' | 'defender'

let carregando: Promise<Armadilha[]> | undefined
let carregadas: Armadilha[] = []

/** O arquivo só é baixado quando uma tela de armadilhas abre. */
export function carregarArmadilhas(): Promise<Armadilha[]> {
  carregando ??= import('../../data/armadilhas/armadilhas.json').then((m) => (carregadas = (m.default as { armadilhas: Armadilha[] }).armadilhas))
  return carregando
}

export function obterArmadilhas(): Armadilha[] {
  return carregadas
}

export function buscarArmadilha(id: string): Armadilha | undefined {
  return carregadas.find((a) => a.id === id)
}

export interface PosicaoDaArmadilha {
  fen: string
  ultimo: [string, string] | null
}

export function posicoesDaArmadilha(a: Armadilha): PosicaoDaArmadilha[] {
  const jogo = new Chess()
  const lista: PosicaoDaArmadilha[] = [{ fen: jogo.fen(), ultimo: null }]
  for (const san of a.lances.split(' ')) {
    const m = jogo.move(san)
    lista.push({ fen: jogo.fen(), ultimo: [m.from, m.to] })
  }
  return lista
}

/** Lances da punição a partir da posição depois do erro (começa e termina com quem arma). */
export function linhaDaPunicao(a: Armadilha): string[] {
  const linha = a.lances.split(' ').slice(a.erro)
  return linha.length % 2 === 0 ? linha.slice(0, -1) : linha
}

export const lanceDoErro = (a: Armadilha) => a.lances.split(' ')[a.erro - 1]

const semSinais = (san: string) => san.replace(/[+#!?]/g, '')

export type RespostaDefesa = 'defendeu' | 'caiu' | 'fraco'

export function conferirDefesa(a: Armadilha, san: string): RespostaDefesa {
  if (semSinais(san) === semSinais(lanceDoErro(a))) return 'caiu'
  return a.defesas.some((d) => semSinais(d) === semSinais(san)) ? 'defendeu' : 'fraco'
}

/** Grupo da lista, pelo começo da partida. */
export function grupoDaArmadilha(a: Armadilha): string {
  const [l1, l2] = a.lances.split(' ')
  if (l1 === 'e4' && l2 === 'e5') return '1.e4 e5'
  if (l1 === 'e4') return 'Defesas contra 1.e4'
  if (l1 === 'd4') return '1.d4'
  return 'Outras aberturas'
}

export const ORDEM_DOS_GRUPOS = ['1.e4 e5', 'Defesas contra 1.e4', '1.d4', 'Outras aberturas']

/** Chave do progresso: "id/armar" ou "id/defender" → data da primeira vez que resolveu. */
export const chaveDaArmadilha = (id: string, modo: Exclude<ModoArmadilha, 'ver'>) => `${id}/${modo}`

/** A armadilha cai numa abertura do repertório (repertório vazio = todas). */
export function noRepertorio(a: Armadilha, capitulos: string[]): boolean {
  return !capitulos.length || a.capitulos.some((c) => capitulos.includes(c))
}

/** Junta o progresso de dois aparelhos: fica a data mais antiga de cada modo resolvido. */
export function juntarArmadilhas(a: Record<string, string>, b: Record<string, string>): Record<string, string> {
  const junto = { ...a }
  for (const [chave, data] of Object.entries(b)) if (!junto[chave] || data < junto[chave]) junto[chave] = data
  return junto
}
