import { Chess } from 'chess.js'
import type { Cor } from './lances'
import { chanceDasBrancas } from './probabilidade'

/**
 * Lance a lance: partidas comentadas de dois livros do Chernev. Os lances são os da partida; as
 * explicações são nossas, em português (nada do texto dos livros). Você joga com o lado vencedor
 * e tenta achar os lances; depois lê o porquê.
 *
 * - "Logical Chess: Move by Move" (33 partidas): pergunta em todos os lances do vencedor.
 * - "The Most Instructive Games of Chess Ever Played" (62 partidas): pergunta só nos
 *   momentos-chave (notas com `pergunta: true`); os outros lances andam sozinhos.
 */

export type IdDoLivro = 'logico' | 'instrutivas'

export interface Livro {
  id: IdDoLivro
  titulo: string
  /** Texto curto na lista. */
  descricao: string
  /** Em quais lances do vencedor o app pergunta. */
  perguntas: 'todos' | 'chave'
  partes: { titulo: string; de: number; ate: number }[]
}

export const LIVROS: Record<IdDoLivro, Livro> = {
  logico: {
    id: 'logico',
    titulo: 'Logical Chess: Move by Move',
    descricao:
      'As 33 partidas comentadas lance por lance. Você joga com o lado vencedor e tenta achar todos os lances; depois de cada um, lê por que ele foi jogado.',
    perguntas: 'todos',
    partes: [
      { titulo: 'O ataque na ala do rei', de: 1, ate: 16 },
      { titulo: 'A abertura do peão da dama', de: 17, ate: 23 },
      { titulo: 'O mestre explica as suas ideias', de: 24, ate: 33 },
    ],
  },
  instrutivas: {
    id: 'instrutivas',
    titulo: 'The Most Instructive Games of Chess Ever Played',
    descricao:
      '62 partidas, cada uma com uma lição de estratégia. Os lances andam sozinhos e o app para nos momentos-chave para você achar o lance e entender a ideia.',
    perguntas: 'chave',
    partes: [{ titulo: '62 partidas instrutivas', de: 1, ate: 62 }],
  },
}

export const ehLivro = (id: unknown): id is IdDoLivro => id === 'logico' || id === 'instrutivas'

export type Principio =
  | 'centro'
  | 'desenvolvimento'
  | 'defesa'
  | 'profilaxia'
  | 'tempo'
  | 'ataque'
  | 'tatica'
  | 'roque'
  | 'peoes'
  | 'colunas'
  | 'troca'
  | 'material'

export const NOME_PRINCIPIO: Record<Principio, string> = {
  centro: 'Centro',
  desenvolvimento: 'Desenvolvimento',
  defesa: 'Defesa',
  profilaxia: 'Profilaxia',
  tempo: 'Ganho de tempo',
  ataque: 'Ataque ao rei',
  tatica: 'Tática',
  roque: 'Segurança do rei',
  peoes: 'Estrutura de peões',
  colunas: 'Colunas e diagonais',
  troca: 'Trocas',
  material: 'Material',
}

export interface NotaDoLance {
  texto: string
  /** Nos livros de momentos-chave: o app para e pergunta este lance. */
  pergunta?: boolean
  /** "E se…?": o que acontece com a alternativa natural (ou o que o Stockfish prefere). */
  alternativa?: string
  principios?: Principio[]
}

export interface PartidaLogica {
  n: number
  brancas: string
  pretas: string
  local: string
  ano: number
  abertura: string
  resultado: string
  /** Lances em SAN, separados por espaço. */
  lances: string
  tema?: string
  introducao?: string
  conclusao?: string
  /** Por rótulo do lance ("1...e5", "4.c3"). Sem notas, a partida ainda não está pronta. */
  notas?: Record<string, NotaDoLance>
}

const carregando = new Map<IdDoLivro, Promise<PartidaLogica[]>>()
const carregados = new Map<IdDoLivro, PartidaLogica[]>()

const ARQUIVOS: Record<IdDoLivro, () => Promise<{ default: { partidas: unknown } }>> = {
  logico: () => import('../../data/logico/partidas.json'),
  instrutivas: () => import('../../data/logico/instrutivas.json'),
}

/** O arquivo de cada livro só é baixado quando a tela abre. */
export function carregarLogico(livro: IdDoLivro = 'logico'): Promise<PartidaLogica[]> {
  let promessa = carregando.get(livro)
  if (!promessa) {
    promessa = ARQUIVOS[livro]().then((m) => {
      const partidas = m.default.partidas as PartidaLogica[]
      carregados.set(livro, partidas)
      return partidas
    })
    carregando.set(livro, promessa)
  }
  return promessa
}

export const obterLogico = (livro: IdDoLivro = 'logico'): PartidaLogica[] => carregados.get(livro) ?? []
export const buscarPartidaLogica = (n: number, livro: IdDoLivro = 'logico') => carregados.get(livro)?.find((p) => p.n === n)
export const partidaPronta = (p: PartidaLogica) => !!p.notas && Object.keys(p.notas).length > 0
export const corDoVencedorLogico = (p: PartidaLogica): Cor => (p.resultado === '0-1' ? 'b' : 'w')
/** Chave do resultado no progresso (as do primeiro livro continuam "logico/N"). */
export const chaveDoLogico = (n: number, livro: IdDoLivro = 'logico') => `${livro}/${n}`

/** O app pergunta este meio-lance? Só os do vencedor, e no livro de momentos-chave só os marcados. */
export function ehPergunta(p: PartidaLogica, livro: IdDoLivro, ply: number): boolean {
  if ((ply % 2 === 0 ? 'w' : 'b') !== corDoVencedorLogico(p)) return false
  if (LIVROS[livro].perguntas === 'todos') return true
  const san = p.lances.split(' ')[ply]
  return !!san && !!p.notas?.[rotuloDoPly(ply, san)]?.pergunta
}
export const rotuloDoPly = (ply: number, san: string) => `${Math.floor(ply / 2) + 1}${ply % 2 ? '...' : '.'}${san}`

export interface PosicaoLogica {
  fen: string
  ultimo: [string, string] | null
}

/** Posições depois de cada meio-lance (0 = inicial). */
export function posicoesDaPartida(p: PartidaLogica): PosicaoLogica[] {
  const jogo = new Chess()
  const lista: PosicaoLogica[] = [{ fen: jogo.fen(), ultimo: null }]
  for (const san of p.lances.split(' ')) {
    const m = jogo.move(san)
    lista.push({ fen: jogo.fen(), ultimo: [m.from, m.to] })
  }
  return lista
}

/** A nota de cada meio-lance (undefined quando não há). */
export function notasPorPly(p: PartidaLogica): (NotaDoLance | undefined)[] {
  return p.lances.split(' ').map((san, ply) => p.notas?.[rotuloDoPly(ply, san)])
}

/** Os princípios que apareceram nos lances do vencedor, do mais frequente ao menos. */
export function principiosDaPartida(p: PartidaLogica): { principio: Principio; vezes: number }[] {
  const contagem = new Map<Principio, number>()
  const vencedor = corDoVencedorLogico(p)
  notasPorPly(p).forEach((nota, ply) => {
    if ((ply % 2 === 0 ? 'w' : 'b') !== vencedor) return
    for (const principio of nota?.principios ?? []) contagem.set(principio, (contagem.get(principio) ?? 0) + 1)
  })
  return [...contagem].map(([principio, vezes]) => ({ principio, vezes })).sort((a, b) => b.vezes - a.vezes)
}

export type VeredictoDoPalpite = 'melhor' | 'bom' | 'quase' | 'pior' | 'erro'

/**
 * Compara o seu palpite com o lance da partida pela avaliação do Stockfish depois de cada um
 * (centipeões do ponto de vista das brancas), em chance de vitória de quem jogou.
 */
export function veredictoDoPalpite(cpPalpite: number, cpPartida: number, quemJogou: Cor): VeredictoDoPalpite {
  const sinal = quemJogou === 'w' ? 1 : -1
  const pior = sinal * (chanceDasBrancas(cpPartida) - chanceDasBrancas(cpPalpite))
  if (pior <= -4) return 'melhor'
  if (pior < 4) return 'bom'
  if (pior < 10) return 'quase'
  if (pior < 25) return 'pior'
  return 'erro'
}

export const TEXTO_DO_VEREDICTO: Record<VeredictoDoPalpite, string> = {
  melhor: 'O Stockfish acha o seu lance ainda melhor que o da partida!',
  bom: 'Também é bom: para o Stockfish, vale o mesmo que o lance da partida.',
  quase: 'Um pouco pior que o lance da partida, mas jogável.',
  pior: 'Bem pior que o lance da partida.',
  erro: 'Um erro: o Stockfish mostra que esse lance perde muito.',
}
