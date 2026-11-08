import { Chess } from 'chess.js'
import type { Aresta } from './arvore'
import type { CapituloCarregado } from './capitulos'
import { separarLances, type Cor } from './lances'

/** Partida baixada do lichess ou do chess.com, já com os lances em SAN. */
export interface PartidaBaixada {
  id: string
  site: 'lichess' | 'chesscom'
  url: string
  /** AAAA-MM-DD */
  data: string
  brancas: string
  pretas: string
  resultado: string
  sans: string[]
}

export interface Desvio {
  quem: 'voce' | 'adversario'
  /** Lance jogado fora do livro. */
  jogado: string
  /** Lances do livro naquela posição (o primeiro é o mais estudado). */
  livro: string[]
  /** Lances até a posição do desvio (exclusive), para abrir no Explorar. */
  caminho: string[]
  /** Aresta do livro que o usuário deveria ter jogado (só quando ele saiu do livro). */
  aresta?: Pick<Aresta, 'id' | 'san' | 'linhas'>
}

export interface PartidaAnalisada {
  id: string
  site: PartidaBaixada['site']
  url: string
  data: string
  adversario: string
  cor: Cor
  resultado: string
  /** Capítulo seguido por mais lances; null se a partida não entrou no repertório. */
  capitulo: string | null
  /** Quantos meios-lances a partida seguiu o livro. */
  noLivro: number
  /** null = a partida seguiu o livro até a linha acabar. */
  desvio: Desvio | null
  /**
   * Fora do repertório: até onde a partida coincidiu com alguma abertura estudada e o lance
   * que a tirou de todas elas, para mostrar as posições que mais aparecem sem preparo.
   */
  fora?: { caminho: string[]; jogado: string }
}

/** Segue a partida pela árvore do capítulo enquanto os lances forem do livro. */
function seguir(capitulo: CapituloCarregado, sans: string[]) {
  const { arvore } = capitulo
  let no = arvore.nos.get(arvore.raiz)!
  let ply = 0
  for (const san of sans) {
    const aresta = no.saidas.find((saida) => saida.san === san)
    if (!aresta) break
    no = arvore.nos.get(aresta.para)!
    ply++
  }
  return { ply, no }
}

/**
 * Acha o capítulo que a partida seguiu por mais lances e onde ela saiu dele. Partidas que
 * não passam da sequência-base de nenhum capítulo ficam fora do repertório.
 */
export function analisarPartida(
  partida: PartidaBaixada,
  usuario: string,
  capitulos: CapituloCarregado[],
): PartidaAnalisada {
  const cor: Cor = partida.brancas.toLowerCase() === usuario.toLowerCase() ? 'w' : 'b'
  const base = {
    id: partida.id,
    site: partida.site,
    url: partida.url,
    data: partida.data,
    adversario: cor === 'w' ? partida.pretas : partida.brancas,
    cor,
    resultado: partida.resultado,
  }

  let melhor: { capitulo: CapituloCarregado; ply: number; no: ReturnType<typeof seguir>['no'] } | null = null
  let maisPerto = 0
  for (const capitulo of capitulos) {
    const { ply, no } = seguir(capitulo, partida.sans)
    maisPerto = Math.max(maisPerto, ply)
    const tamanhoDaBase = separarLances(capitulo.capitulo.base).length
    if (ply < tamanhoDaBase) continue
    if (!melhor || ply > melhor.ply) melhor = { capitulo, ply, no }
  }
  if (!melhor) {
    const jogado = partida.sans[maisPerto]
    const fora = jogado ? { caminho: partida.sans.slice(0, maisPerto), jogado } : undefined
    return { ...base, capitulo: null, noLivro: 0, desvio: null, fora }
  }

  const { capitulo, ply, no } = melhor
  const jogado = partida.sans[ply]
  // A linha do livro acabou, ou a partida acabou ainda dentro do livro.
  if (!no.saidas.length || jogado === undefined) {
    return { ...base, capitulo: capitulo.capitulo.id, noLivro: ply, desvio: null }
  }
  const vez: Cor = ply % 2 === 0 ? 'w' : 'b'
  // O lance mais estudado vem primeiro: o que aparece em mais linhas e notas.
  const livro = [...no.saidas].sort((a, b) => b.linhas.length - a.linhas.length)
  const quem = vez === cor ? 'voce' : 'adversario'
  const desvio: Desvio = {
    quem,
    jogado,
    livro: livro.map((aresta) => aresta.san),
    caminho: partida.sans.slice(0, ply),
  }
  if (quem === 'voce') desvio.aresta = { id: livro[0].id, san: livro[0].san, linhas: livro[0].linhas }
  return { ...base, capitulo: capitulo.capitulo.id, noLivro: ply, desvio }
}

// ---------- Download ----------

const dataDe = (segundos: number) => new Date(segundos * 1000).toISOString().slice(0, 10)

/** Lances de um PGN; null se o PGN não puder ser lido (variante, posição inicial diferente). */
export function lancesDoPgn(pgn: string): string[] | null {
  const jogo = new Chess()
  try {
    jogo.loadPgn(pgn)
  } catch {
    return null
  }
  if (jogo.getHeaders().SetUp === '1') return null
  return jogo.history()
}

interface PartidaChessCom {
  url: string
  pgn?: string
  end_time: number
  rules: string
  white: { username: string; result: string }
  black: { username: string; result: string }
}

/** Todas as partidas do chess.com (API pública, um arquivo por mês). */
export async function baixarChessCom(
  usuario: string,
  aoProgredir?: (feitos: number, total: number) => void,
): Promise<PartidaBaixada[]> {
  const nome = encodeURIComponent(usuario.toLowerCase())
  const resposta = await fetch(`https://api.chess.com/pub/player/${nome}/games/archives`)
  if (resposta.status === 404) throw new Error(`Usuário "${usuario}" não encontrado no chess.com.`)
  if (!resposta.ok) throw new Error(`O chess.com respondeu com erro ${resposta.status}.`)
  const { archives } = (await resposta.json()) as { archives: string[] }
  const partidas: PartidaBaixada[] = []
  for (const [i, arquivo] of archives.entries()) {
    aoProgredir?.(i, archives.length)
    const mes = await fetch(arquivo)
    if (!mes.ok) continue
    const { games } = (await mes.json()) as { games: PartidaChessCom[] }
    for (const g of games) {
      if (g.rules !== 'chess' || !g.pgn) continue
      const sans = lancesDoPgn(g.pgn)
      if (!sans) continue
      const resultado = g.white.result === 'win' ? '1-0' : g.black.result === 'win' ? '0-1' : '½-½'
      partidas.push({
        id: `chesscom:${g.url.split('/').pop()}`,
        site: 'chesscom',
        url: g.url,
        data: dataDe(g.end_time),
        brancas: g.white.username,
        pretas: g.black.username,
        resultado,
        sans,
      })
    }
  }
  aoProgredir?.(archives.length, archives.length)
  return partidas
}

interface PartidaLichess {
  id: string
  variant: string
  createdAt: number
  moves?: string
  winner?: 'white' | 'black'
  initialFen?: string
  players: { white: { user?: { name: string } }; black: { user?: { name: string } } }
}

/** Até 500 partidas mais recentes do lichess (API pública em NDJSON). */
export async function baixarLichess(usuario: string): Promise<PartidaBaixada[]> {
  const nome = encodeURIComponent(usuario)
  const resposta = await fetch(`https://lichess.org/api/games/user/${nome}?max=500&moves=true`, {
    headers: { Accept: 'application/x-ndjson' },
  })
  if (resposta.status === 404) {
    throw new Error(`O lichess não liberou as partidas de "${usuario}" (usuário inexistente ou partidas não públicas).`)
  }
  if (!resposta.ok) throw new Error(`O lichess respondeu com erro ${resposta.status}.`)
  const texto = await resposta.text()
  const partidas: PartidaBaixada[] = []
  for (const linha of texto.split('\n')) {
    if (!linha.trim()) continue
    const g = JSON.parse(linha) as PartidaLichess
    if (g.variant !== 'standard' || g.initialFen || !g.moves) continue
    partidas.push({
      id: `lichess:${g.id}`,
      site: 'lichess',
      url: `https://lichess.org/${g.id}`,
      data: new Date(g.createdAt).toISOString().slice(0, 10),
      brancas: g.players.white.user?.name ?? '?',
      pretas: g.players.black.user?.name ?? '?',
      resultado: g.winner === 'white' ? '1-0' : g.winner === 'black' ? '0-1' : '½-½',
      sans: g.moves.split(' '),
    })
  }
  return partidas
}
