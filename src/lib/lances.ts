import { Chess } from 'chess.js'

export type Cor = 'w' | 'b'

export interface LanceJogado {
  /** 1 = 1.e4 */
  ply: number
  numero: number
  cor: Cor
  san: string
  from: string
  to: string
  promotion?: string
  fenAntes: string
  fenDepois: string
}

export interface LanceIlegal {
  ply: number
  /** O lance como está escrito no arquivo, ex.: "11... exd3". */
  lance: string
  fen: string
}

export interface ResultadoJogada {
  lances: LanceJogado[]
  erro: LanceIlegal | null
}

/** Separa um PGN simples em lances, descartando números de lance e resultado. */
export function separarLances(texto: string): string[] {
  return texto
    .split(/\s+/)
    .map((token) => token.replace(/^\d+\.+/, ''))
    .filter((token) => token !== '' && !/^(\*|1-0|0-1|1\/2-1\/2)$/.test(token))
}

export function numeroDoPly(ply: number): number {
  return Math.ceil(ply / 2)
}

export function corDoPly(ply: number): Cor {
  return ply % 2 === 1 ? 'w' : 'b'
}

/** Rótulo no formato das chaves de `dicas`: "4. Ng5" ou "11... exd3". */
export function chaveDoLance(ply: number, san: string): string {
  return `${numeroDoPly(ply)}${corDoPly(ply) === 'w' ? '.' : '...'} ${san}`
}

/** Identidade da posição: FEN sem os contadores de lance (SPEC 3.3). */
export function chaveDaPosicao(fen: string): string {
  return fen.split(' ').slice(0, 4).join(' ')
}

export function corDaPosicao(fen: string): Cor {
  return fen.split(' ')[1] === 'b' ? 'b' : 'w'
}

/** Lances legais por casa de origem, no formato que o tabuleiro espera. */
export function destinosLegais(fen: string): Map<string, string[]> {
  const destinos = new Map<string, string[]>()
  for (const lance of new Chess(fen).moves({ verbose: true })) {
    destinos.set(lance.from, [...(destinos.get(lance.from) ?? []), lance.to])
  }
  return destinos
}

export function estaEmXeque(fen: string): boolean {
  return new Chess(fen).inCheck()
}

/** Casas de origem e destino de um lance em SAN, ou null se ele for ilegal. */
export function casasDoLance(fen: string, san: string): { from: string; to: string } | null {
  try {
    const lance = new Chess(fen).move(san)
    return { from: lance.from, to: lance.to }
  } catch {
    return null
  }
}

/**
 * Confere um lance como se o lado que acabou de jogar pudesse jogar de novo.
 * Devolve null se o lance for ilegal ou se o outro lado estiver em xeque, caso em
 * que passar a vez não é uma posição válida.
 */
export function lanceDaAmeaca(
  fenDepois: string,
  san: string,
): { san: string; from: string; to: string } | null {
  try {
    if (new Chess(fenDepois).inCheck()) return null
    const partes = fenDepois.split(' ')
    partes[1] = partes[1] === 'w' ? 'b' : 'w'
    partes[3] = '-'
    const lance = new Chess(partes.join(' '), { skipValidation: true }).move(san)
    return { san: lance.san, from: lance.from, to: lance.to }
  } catch {
    return null
  }
}

/** Joga os lances a partir da posição inicial e para no primeiro lance ilegal. */
export function jogarLances(texto: string): ResultadoJogada {
  const chess = new Chess()
  const lances: LanceJogado[] = []

  for (const [indice, token] of separarLances(texto).entries()) {
    const ply = indice + 1
    const fenAntes = chess.fen()
    try {
      const lance = chess.move(token)
      lances.push({
        ply,
        numero: numeroDoPly(ply),
        cor: corDoPly(ply),
        san: lance.san,
        from: lance.from,
        to: lance.to,
        promotion: lance.promotion,
        fenAntes,
        fenDepois: chess.fen(),
      })
    } catch {
      return { lances, erro: { ply, lance: chaveDoLance(ply, token), fen: fenAntes } }
    }
  }

  return { lances, erro: null }
}
