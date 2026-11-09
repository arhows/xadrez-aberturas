import { Chess } from 'chess.js'
import type { Aresta } from './arvore'
import type { CapituloCarregado } from './capitulos'
import { separarLances, type Cor } from './lances'

/** Partida baixada do lichess ou do chess.com (ou colada como PGN), já com os lances em SAN. */
export interface PartidaBaixada {
  id: string
  site: 'lichess' | 'chesscom' | 'pgn'
  /** Vazio quando a partida não existe on-line (ex.: partida offline do app do lichess). */
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

/** Cor do usuário numa partida baixada pelo nome de usuário. */
export function corDoUsuario(partida: PartidaBaixada, usuario: string): Cor {
  return partida.brancas.toLowerCase() === usuario.toLowerCase() ? 'w' : 'b'
}

/**
 * Acha o capítulo que a partida seguiu por mais lances e onde ela saiu dele. Partidas que
 * não passam da sequência-base de nenhum capítulo ficam fora do repertório.
 */
export function analisarPartida(partida: PartidaBaixada, cor: Cor, capitulos: CapituloCarregado[]): PartidaAnalisada {
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

// ---------- PGN colado ----------

/** Nomes que os apps dão ao computador (o usuário é o outro lado). */
const MOTORES = /^(maia|stockfish|computer|computador|lichess ai|ai|komodo|leela|lc0|fairy-stockfish|bot|engine)(\b|\d)/i
/** Nomes que os apps dão a quem jogou sem conta (é o próprio usuário). */
const ANONIMOS = /^(anonymous|anônimo|anonimo|you|você|voce|player|jogador|\?)$/i

/**
 * Descobre a cor do usuário pelos nomes: o nome dele no lichess/chess.com, o lado do
 * computador ou o lado "Anonymous". null quando não dá para saber.
 */
export function detectarCor(brancas: string, pretas: string, nomesDoUsuario: string[]): Cor | null {
  const nomes = nomesDoUsuario.map((n) => n.trim().toLowerCase()).filter(Boolean)
  const b = brancas.trim()
  const p = pretas.trim()
  if (nomes.includes(b.toLowerCase())) return 'w'
  if (nomes.includes(p.toLowerCase())) return 'b'
  const motorB = MOTORES.test(b)
  const motorP = MOTORES.test(p)
  if (motorB !== motorP) return motorB ? 'b' : 'w'
  const anonimoB = ANONIMOS.test(b)
  const anonimoP = ANONIMOS.test(p)
  if (anonimoB !== anonimoP) return anonimoB ? 'w' : 'b'
  return null
}

export interface PartidaDoPgn {
  partida: PartidaBaixada
  /** Cor detectada pelos nomes; null se for preciso perguntar. */
  cor: Cor | null
}

/** Separa um texto com uma ou mais partidas em PGN (cada uma começa nos cabeçalhos). */
export function separarPgns(texto: string): string[] {
  const jogos: string[][] = []
  let atual: string[] = []
  let viuLances = false
  for (const linha of texto.replace(/\r\n?/g, '\n').split('\n')) {
    const ehCabecalho = /^\s*\[\w+\s+".*"\]\s*$/.test(linha)
    // Um cabeçalho depois de lances abre a próxima partida.
    if (ehCabecalho && viuLances) {
      jogos.push(atual)
      atual = []
      viuLances = false
    }
    if (!ehCabecalho && linha.trim()) viuLances = true
    atual.push(linha)
  }
  jogos.push(atual)
  return jogos.map((linhas) => linhas.join('\n').trim()).filter(Boolean)
}

/** Identificador estável de uma partida sem endereço on-line. */
function resumo(texto: string): string {
  let h = 5381
  for (let i = 0; i < texto.length; i++) h = ((h << 5) + h + texto.charCodeAt(i)) >>> 0
  return h.toString(36)
}

function dataDoPgn(data: string | undefined): string {
  const m = data?.match(/^(\d{4})[.-](\d{2})[.-](\d{2})$/)
  return m ? `${m[1]}-${m[2]}-${m[3]}` : new Date().toISOString().slice(0, 10)
}

/**
 * Lê as partidas de um texto PGN. As que não puderem ser lidas (variantes, posição
 * inicial diferente, lances inválidos) vão para `erros` com o número da partida.
 */
export function lerPgns(texto: string, nomesDoUsuario: string[]): { partidas: PartidaDoPgn[]; erros: string[] } {
  const partidas: PartidaDoPgn[] = []
  const erros: string[] = []
  for (const [i, pgn] of separarPgns(texto).entries()) {
    const jogo = new Chess()
    try {
      jogo.loadPgn(pgn)
    } catch {
      erros.push(`Partida ${i + 1}: não foi possível ler os lances.`)
      continue
    }
    const c = jogo.getHeaders()
    if (c.SetUp === '1' || (c.Variant && !/^(standard|padrão|padrao)$/i.test(c.Variant))) {
      erros.push(`Partida ${i + 1}: variante ou posição inicial diferente; só partidas normais são analisadas.`)
      continue
    }
    const sans = jogo.history()
    if (!sans.length) {
      erros.push(`Partida ${i + 1}: sem lances.`)
      continue
    }
    const brancas = c.White?.trim() || '?'
    const pretas = c.Black?.trim() || '?'
    const site = c.Site?.trim() ?? ''
    const ehEndereco = /^https?:\/\//.test(site)
    // Partidas offline do app do lichess ("ocg_...") não existem no site.
    const online = ehEndereco && !/\/ocg_/.test(site)
    const codigo = ehEndereco ? site.replace(/\/+$/, '').split('/').pop()! : ''
    const data = dataDoPgn(c.Date)
    partidas.push({
      partida: {
        id: `pgn:${codigo || resumo([brancas, pretas, data, sans.join(' ')].join('|'))}`,
        site: 'pgn',
        url: online ? site : '',
        data,
        brancas,
        pretas,
        resultado: c.Result === '1/2-1/2' ? '½-½' : c.Result === '1-0' || c.Result === '0-1' ? c.Result : '*',
        sans,
      },
      cor: detectarCor(brancas, pretas, nomesDoUsuario),
    })
  }
  return { partidas, erros }
}
