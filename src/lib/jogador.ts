/**
 * Estudar um jogador: partidas dele importadas de um PGN (ex.: as coleções por jogador do
 * PGN Mentor) e a árvore dos lances que ele escolheu. A árvore segue a ordem dos lances
 * (sem transposições): assim ela é montada na hora, sem refazer as partidas no chess.js.
 */

export interface PartidaJogador {
  brancas: string
  pretas: string
  /** "1-0", "0-1", "1/2-1/2" ou "*". */
  resultado: string
  /** Ano ou data como vem no PGN ("1985.10.15", "1985.??.??"). */
  data: string
  evento: string
  /** Lances em SAN separados por espaço. */
  lances: string
}

export interface Colecao {
  id: string
  /** Nome do arquivo importado. */
  nome: string
  /** Jogador estudado (o mais frequente no arquivo, ou o escolhido). */
  jogador: string
  importada: string
  partidas: PartidaJogador[]
}

const SAN = /^(O-O(-O)?|[KQRBN][a-h]?[1-8]?x?[a-h][1-8]|[a-h](x[a-h])?[1-8](=?[QRBN])?)[+#]?$/

/** Lances do texto de uma partida: sem comentários, variantes, NAGs, números nem resultado. */
export function lancesDoTexto(texto: string): string[] {
  let limpo = texto.replace(/\{[^}]*\}/g, ' ').replace(/;[^\n]*/g, ' ')
  // Variantes podem ser aninhadas: tira de dentro para fora.
  let antes
  do {
    antes = limpo
    limpo = limpo.replace(/\([^()]*\)/g, ' ')
  } while (limpo !== antes)
  return limpo
    .replace(/\$\d+/g, ' ')
    .replace(/\d+\.(\.\.)?/g, ' ')
    .split(/\s+/)
    .map((t) => t.replace(/[!?]+$/, '').replace(/^0-0-0/, 'O-O-O').replace(/^0-0/, 'O-O'))
    .filter((t) => SAN.test(t))
}

/** Lê todas as partidas de um PGN (as sem lances são ignoradas). */
export function lerPartidasPgn(texto: string): PartidaJogador[] {
  const partidas: PartidaJogador[] = []
  const blocos = texto.replace(/\r/g, '').split(/\n(?=\[Event\s)/)
  for (const bloco of blocos) {
    const cabecalhos: Record<string, string> = {}
    for (const m of bloco.matchAll(/^\[(\w+)\s+"((?:[^"\\]|\\.)*)"\]\s*$/gm)) cabecalhos[m[1]] = m[2]
    // Partidas que não começam da posição inicial ficam de fora (a árvore parte do 1º lance).
    if (cabecalhos.SetUp === '1' || cabecalhos.FEN) continue
    const corpo = bloco.replace(/^\[.*\]\s*$/gm, '')
    const lances = lancesDoTexto(corpo)
    if (!lances.length) continue
    partidas.push({
      brancas: cabecalhos.White ?? '?',
      pretas: cabecalhos.Black ?? '?',
      resultado: cabecalhos.Result ?? '*',
      data: cabecalhos.Date ?? '',
      evento: [cabecalhos.Event, cabecalhos.Site].filter((x) => x && x !== '?').join(', '),
      lances: lances.join(' '),
    })
  }
  return partidas
}

/** "Kasparov, Garry" → "kasparov": compara pelo sobrenome, sem acentos nem maiúsculas. */
export function chaveDoNome(nome: string): string {
  const sobrenome = nome.includes(',') ? nome.split(',')[0] : (nome.trim().split(/\s+/).at(-1) ?? nome)
  return sobrenome
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')
}

/** Jogador que aparece em mais partidas (numa coleção de um jogador, é ele). */
export function jogadorMaisFrequente(partidas: PartidaJogador[]): string {
  const contagem = new Map<string, { nome: string; n: number }>()
  for (const p of partidas) {
    for (const nome of [p.brancas, p.pretas]) {
      const chave = chaveDoNome(nome)
      if (!chave) continue
      const atual = contagem.get(chave) ?? { nome, n: 0 }
      atual.n++
      contagem.set(chave, atual)
    }
  }
  return [...contagem.values()].sort((a, b) => b.n - a.n)[0]?.nome ?? ''
}

export function corDoJogador(partida: PartidaJogador, jogador: string): 'w' | 'b' | null {
  const chave = chaveDoNome(jogador)
  if (chaveDoNome(partida.brancas) === chave) return 'w'
  if (chaveDoNome(partida.pretas) === chave) return 'b'
  return null
}

export interface PartidaIndexada {
  indice: number
  partida: PartidaJogador
  lances: string[]
  /** Pontos do jogador nesta partida: 1, ½ ou 0 (null se sem resultado). */
  pontos: number | null
}

/** Partidas em que o jogador teve a cor pedida, com os lances já separados. */
export function partidasDoJogador(colecao: Colecao, cor: 'w' | 'b'): PartidaIndexada[] {
  return colecao.partidas.flatMap((partida, indice) => {
    if (corDoJogador(partida, colecao.jogador) !== cor) return []
    const venceu = cor === 'w' ? '1-0' : '0-1'
    const perdeu = cor === 'w' ? '0-1' : '1-0'
    const pontos = partida.resultado === venceu ? 1 : partida.resultado === perdeu ? 0 : partida.resultado === '1/2-1/2' ? 0.5 : null
    return [{ indice, partida, lances: partida.lances.split(' '), pontos }]
  })
}

/** Partidas que passam pela sequência `caminho` (na mesma ordem). */
export function partidasNoCaminho(partidas: PartidaIndexada[], caminho: string[]): PartidaIndexada[] {
  return partidas.filter((p) => caminho.every((san, i) => p.lances[i] === san))
}

export interface LanceDoJogador {
  san: string
  partidas: number
  /** Fração (0–1) das partidas na posição. */
  parte: number
  /** % de pontos do jogador depois deste lance (null se nenhuma partida tem resultado). */
  pontos: number | null
}

/** Lances jogados a partir do caminho (pelo jogador ou pelos adversários), do mais jogado ao menos. */
export function lancesSeguintes(noCaminho: PartidaIndexada[], ply: number): LanceDoJogador[] {
  const grupos = new Map<string, PartidaIndexada[]>()
  for (const p of noCaminho) {
    const san = p.lances[ply]
    if (!san) continue
    grupos.set(san, [...(grupos.get(san) ?? []), p])
  }
  const total = [...grupos.values()].reduce((s, g) => s + g.length, 0)
  return [...grupos.entries()]
    .map(([san, grupo]) => {
      const comResultado = grupo.filter((p) => p.pontos !== null)
      const pontos = comResultado.length ? (comResultado.reduce((s, p) => s + p.pontos!, 0) / comResultado.length) * 100 : null
      return { san, partidas: grupo.length, parte: total ? grupo.length / total : 0, pontos }
    })
    .sort((a, b) => b.partidas - a.partidas)
}

export function novoIdDeColecao(agora = Date.now()): string {
  return `col-${agora.toString(36)}`
}
