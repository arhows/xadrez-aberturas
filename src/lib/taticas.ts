import { Chess } from 'chess.js'
import type { Cor } from './lances'

/**
 * Motivos táticos já presentes no tabuleiro, detectados só pela geometria da posição.
 * Não calcula variantes: avisa o que está armado, e quem ensina se funciona é o estudo.
 */

type TipoPeca = 'p' | 'n' | 'b' | 'r' | 'q' | 'k'
interface Peca {
  tipo: TipoPeca
  cor: Cor
}

export type TipoTatica = 'cravada-absoluta' | 'ataque-duplo' | 'espeto' | 'cravada' | 'sem-defesa' | 'atacada'

export interface Tatica {
  tipo: TipoTatica
  /** Lado que se beneficia do motivo. */
  favorece: Cor
  texto: string
  /** Peça que executa o motivo e as casas que ela atinge, para as setas. */
  de: string
  alvos: string[]
}

const VALOR: Record<TipoPeca, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 100 }
const NOME: Record<TipoPeca, [string, string, 'm' | 'f']> = {
  p: ['o', 'peão', 'm'],
  n: ['o', 'cavalo', 'm'],
  b: ['o', 'bispo', 'm'],
  r: ['a', 'torre', 'f'],
  q: ['a', 'dama', 'f'],
  k: ['o', 'rei', 'm'],
}
const PRIORIDADE: Record<TipoTatica, number> = {
  'cravada-absoluta': 1,
  'ataque-duplo': 2,
  espeto: 3,
  cravada: 4,
  'sem-defesa': 5,
  atacada: 6,
}
const MAXIMO = 5

const ORTOGONAIS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
]
const DIAGONAIS = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
]
const SALTOS = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
]

const casa = (f: number, r: number) => 'abcdefgh'[f] + (r + 1)
const dentro = (f: number, r: number) => f >= 0 && f < 8 && r >= 0 && r < 8
const coordenadas = (c: string): [number, number] => [c.charCodeAt(0) - 97, Number(c[1]) - 1]

function lerTabuleiro(fen: string): Map<string, Peca> {
  const pecas = new Map<string, Peca>()
  fen
    .split(' ')[0]
    .split('/')
    .forEach((fileira, i) => {
      let f = 0
      for (const ch of fileira) {
        if (/\d/.test(ch)) f += Number(ch)
        else {
          const tipo = ch.toLowerCase() as TipoPeca
          pecas.set(casa(f, 7 - i), { tipo, cor: ch === ch.toUpperCase() ? 'w' : 'b' })
          f++
        }
      }
    })
  return pecas
}

function direcoes(tipo: TipoPeca): number[][] {
  if (tipo === 'b') return DIAGONAIS
  if (tipo === 'r') return ORTOGONAIS
  if (tipo === 'q') return [...ORTOGONAIS, ...DIAGONAIS]
  return []
}

/** Casas que a peça ataca (ignora cravadas e xeques, como os livros fazem ao contar defensores). */
function ataques(tab: Map<string, Peca>, origem: string): string[] {
  const peca = tab.get(origem)!
  const [f, r] = coordenadas(origem)
  const alvos: string[] = []
  const passo = (df: number, dr: number) => dentro(f + df, r + dr) && alvos.push(casa(f + df, r + dr))
  if (peca.tipo === 'p') {
    const frente = peca.cor === 'w' ? 1 : -1
    passo(-1, frente)
    passo(1, frente)
  } else if (peca.tipo === 'n') {
    for (const [df, dr] of SALTOS) passo(df, dr)
  } else if (peca.tipo === 'k') {
    for (const [df, dr] of [...ORTOGONAIS, ...DIAGONAIS]) passo(df, dr)
  } else {
    for (const [df, dr] of direcoes(peca.tipo)) {
      let [x, y] = [f + df, r + dr]
      while (dentro(x, y)) {
        alvos.push(casa(x, y))
        if (tab.has(casa(x, y))) break
        x += df
        y += dr
      }
    }
  }
  return alvos
}

function atacantes(tab: Map<string, Peca>, alvo: string, cor: Cor): string[] {
  return [...tab.entries()]
    .filter(([origem, peca]) => peca.cor === cor && ataques(tab, origem).includes(alvo))
    .map(([origem]) => origem)
}

const outra = (cor: Cor): Cor => (cor === 'w' ? 'b' : 'w')

function nome(peca: Peca, onde: string, comCor = true): string {
  const [artigo, substantivo, genero] = NOME[peca.tipo]
  const cor = peca.cor === 'w' ? (genero === 'f' ? 'branca' : 'branco') : genero === 'f' ? 'preta' : 'preto'
  return `${artigo} ${substantivo}${comCor ? ` ${cor}` : ''} de ${onde}`
}

/** "de" + artigo: "do peão", "da torre". */
const contrair = (texto: string) => texto.replace(/^o /, 'do ').replace(/^a /, 'da ')

const pronome = (peca: Peca) => (NOME[peca.tipo][2] === 'f' ? 'ela' : 'ele')
const exposto = (peca: Peca) => (NOME[peca.tipo][2] === 'f' ? 'exposta' : 'exposto')

/** Só o nome, para o alvo de uma cravada: "o rei", "a dama". */
const nomeCurto = (peca: Peca) => `${NOME[peca.tipo][0]} ${NOME[peca.tipo][1]}`

export function taticasDaPosicao(fen: string): Tatica[] {
  return todasAsTaticas(fen)
    .sort((a, b) => PRIORIDADE[a.tipo] - PRIORIDADE[b.tipo])
    .slice(0, MAXIMO)
}

function todasAsTaticas(fen: string): Tatica[] {
  const tab = lerTabuleiro(fen)
  const defendida = (onde: string) => atacantes(tab, onde, tab.get(onde)!.cor).length > 0
  const taticas: Tatica[] = []

  for (const [origem, peca] of tab) {
    // Cravadas e espetos: duas peças adversárias alinhadas na mira de bispo, torre ou dama.
    for (const [df, dr] of direcoes(peca.tipo)) {
      const [f, r] = coordenadas(origem)
      const linha: string[] = []
      let [x, y] = [f + df, r + dr]
      while (dentro(x, y) && linha.length < 2) {
        if (tab.has(casa(x, y))) linha.push(casa(x, y))
        x += df
        y += dr
      }
      if (linha.length < 2) continue
      const [p, q] = linha.map((c) => tab.get(c)!)
      if (p.cor === peca.cor || q.cor === peca.cor) continue
      const vs = `${nome(peca, origem)}`
      if (q.tipo === 'k' && p.tipo !== 'k') {
        taticas.push({ tipo: 'cravada-absoluta', favorece: peca.cor, de: origem, alvos: [linha[0], linha[1]],
          texto: `Cravada absoluta: ${vs} crava ${nome(p, linha[0], false)} contra o rei; ${pronome(p)} não pode sair.` })
      } else if (p.tipo !== 'k' && p.tipo !== 'p' && VALOR[q.tipo] > VALOR[p.tipo] && (VALOR[q.tipo] > VALOR[peca.tipo] || !defendida(linha[1]))) {
        taticas.push({ tipo: 'cravada', favorece: peca.cor, de: origem, alvos: [linha[0], linha[1]],
          texto: `Cravada: ${vs} crava ${nome(p, linha[0], false)} contra ${nomeCurto(q)}; se ${pronome(p)} sair, ${nomeCurto(q)} fica ${exposto(q)}.` })
      } else if (
        (p.tipo === 'k' || VALOR[p.tipo] > VALOR[q.tipo]) &&
        (p.tipo === 'k' || VALOR[p.tipo] > VALOR[peca.tipo] || !defendida(linha[0])) &&
        q.tipo !== 'p' &&
        (VALOR[q.tipo] > VALOR[peca.tipo] || !defendida(linha[1]))
      ) {
        taticas.push({ tipo: 'espeto', favorece: peca.cor, de: origem, alvos: [linha[0], linha[1]],
          texto: `Espeto: ${vs} ataca ${nome(p, linha[0], false)}; se ${pronome(p)} sair, ${nome(q, linha[1], false)} fica na mira.` })
      }
    }

    // Ataque duplo: dois alvos vulneráveis ao mesmo tempo.
    const vulneraveis = ataques(tab, origem).filter((alvo) => {
      const t = tab.get(alvo)
      return t && t.cor !== peca.cor && (t.tipo === 'k' || VALOR[t.tipo] > VALOR[peca.tipo] || !defendida(alvo))
    })
    if (vulneraveis.length >= 2) {
      const lista = vulneraveis.map((alvo) => nome(tab.get(alvo)!, alvo, false))
      taticas.push({ tipo: 'ataque-duplo', favorece: peca.cor, de: origem, alvos: vulneraveis,
        texto: `Ataque duplo: ${nome(peca, origem)} ataca ${lista.slice(0, -1).join(', ')} e ${lista.at(-1)}.` })
    }

    // Peça atacada sem defesa, ou por uma peça de menor valor.
    if (peca.tipo !== 'k') {
      const inimigos = atacantes(tab, origem, outra(peca.cor))
      if (inimigos.length) {
        const menor = inimigos.find((a) => VALOR[tab.get(a)!.tipo] < VALOR[peca.tipo])
        if (!defendida(origem)) {
          taticas.push({ tipo: 'sem-defesa', favorece: outra(peca.cor), de: inimigos[0], alvos: [origem],
            texto: `Sem defesa: ${nome(peca, origem)} está atacad${NOME[peca.tipo][2] === 'f' ? 'a' : 'o'} e não tem defensor.` })
        } else if (menor) {
          taticas.push({ tipo: 'atacada', favorece: outra(peca.cor), de: menor, alvos: [origem],
            texto: `Atacad${NOME[peca.tipo][2] === 'f' ? 'a' : 'o'} por peça menor: ${nome(peca, origem)} está na mira ${contrair(nome(tab.get(menor)!, menor, false))}.` })
        }
      }
    }
  }

  return taticas
}

export type TipoOportunidade = 'garfo' | 'cravada' | 'espeto' | 'descoberto'

/** Tática que um lance cria; só faz sentido quando o motor confirma que o lance ganha. */
export interface Oportunidade {
  tipo: TipoOportunidade
  lance: string
  /** Lado que joga o lance. */
  cor: Cor
  texto: string
  /** Casas do lance, e a peça que executa a tática com os alvos dela. */
  de: string
  para: string
  executor: string
  alvos: string[]
}

/** Vantagem mínima, em centipeões, para dizer que a tática funciona. */
export const GANHO_MINIMO = 150

/** Casas estritamente entre duas casas alinhadas. */
function entre(a: string, b: string): string[] {
  const [fa, ra] = coordenadas(a)
  const [fb, rb] = coordenadas(b)
  const df = Math.sign(fb - fa)
  const dr = Math.sign(rb - ra)
  const casas: string[] = []
  let [x, y] = [fa + df, ra + dr]
  while (x !== fb || y !== rb) {
    casas.push(casa(x, y))
    x += df
    y += dr
  }
  return casas
}

/** Procura garfo, cravada, espeto ou ataque descoberto criados por um lance; null se não houver. */
export function taticaDoLance(fen: string, san: string): Oportunidade | null {
  const chess = new Chess(fen)
  let lance
  try {
    lance = chess.move(san)
  } catch {
    return null
  }
  const cor = lance.color as Cor
  const antes = lerTabuleiro(fen)
  const tab = lerTabuleiro(chess.fen())
  const movida = tab.get(lance.to)!
  const base = { lance: lance.san, cor, de: lance.from, para: lance.to }
  const criadas = todasAsTaticas(chess.fen()).filter((t) => t.de === lance.to && t.favorece === cor)

  // Garfo: pelo menos dois alvos de valor (peças ou o rei); peões não contam.
  const garfo = criadas.find(
    (t) => t.tipo === 'ataque-duplo' && t.alvos.filter((alvo) => tab.get(alvo)!.tipo !== 'p').length >= 2,
  )
  if (garfo) {
    const lista = garfo.alvos.map((alvo) => nome(tab.get(alvo)!, alvo, false))
    return {
      ...base,
      tipo: 'garfo',
      executor: lance.to,
      alvos: garfo.alvos,
      texto: `Garfo com ${lance.san}: ${nomeCurto(movida)} ataca ${lista.slice(0, -1).join(', ')} e ${lista.at(-1)} ao mesmo tempo.`,
    }
  }

  // A peça cravada precisa ser uma peça; um peão cravado quase nunca é o motivo do lance.
  const cravada = criadas.find(
    (t) => (t.tipo === 'cravada-absoluta' || t.tipo === 'cravada') && tab.get(t.alvos[0])!.tipo !== 'p',
  )
  if (cravada) {
    const [p, q] = cravada.alvos.map((alvo) => tab.get(alvo)!)
    return {
      ...base,
      tipo: 'cravada',
      executor: lance.to,
      alvos: cravada.alvos,
      texto: `Cravada com ${lance.san}: ${nomeCurto(movida)} crava ${nome(p, cravada.alvos[0], false)} contra ${nomeCurto(q)}.`,
    }
  }

  const espeto = criadas.find((t) => t.tipo === 'espeto')
  if (espeto) {
    const [p, q] = espeto.alvos.map((alvo) => tab.get(alvo)!)
    return {
      ...base,
      tipo: 'espeto',
      executor: lance.to,
      alvos: espeto.alvos,
      texto: `Espeto com ${lance.san}: ${nomeCurto(movida)} ataca ${nome(p, espeto.alvos[0], false)}, e atrás está ${nome(q, espeto.alvos[1], false)}.`,
    }
  }

  // Ataque descoberto: uma peça de longo alcance passa a atingir um alvo pela casa que o lance liberou.
  const defendida = (onde: string) => atacantes(tab, onde, tab.get(onde)!.cor).length > 0
  for (const [origem, peca] of tab) {
    if (peca.cor !== cor || origem === lance.to || !direcoes(peca.tipo).length) continue
    const novos = ataques(tab, origem).filter((alvo) => {
      const t = tab.get(alvo)
      if (!t || t.cor === cor || t.tipo === 'p' || ataques(antes, origem).includes(alvo)) return false
      if (!(t.tipo === 'k' || VALOR[t.tipo] > VALOR[peca.tipo] || !defendida(alvo))) return false
      return entre(origem, alvo).includes(lance.from)
    })
    if (novos.length) {
      const alvo = novos[0]
      return {
        ...base,
        tipo: 'descoberto',
        executor: origem,
        alvos: [alvo],
        texto: `Ataque descoberto com ${lance.san}: ao sair de ${lance.from}, ${nomeCurto(movida)} abre a linha ${contrair(nome(peca, origem, false))} contra ${nome(tab.get(alvo)!, alvo, false)}.`,
      }
    }
  }
  return null
}

/**
 * A tática disponível numa posição, a partir da análise do motor: o melhor lance
 * precisa criar o padrão e a vantagem de quem joga precisa ser de pelo menos GANHO_MINIMO.
 */
export function oportunidadeDaPosicao(
  fen: string,
  analise: { lance: string; cp: number } | null | undefined,
): (Oportunidade & { cp: number }) | null {
  if (!analise) return null
  const vez: Cor = fen.split(' ')[1] === 'b' ? 'b' : 'w'
  const vantagem = vez === 'w' ? analise.cp : -analise.cp
  if (vantagem < GANHO_MINIMO) return null
  const tatica = taticaDoLance(fen, analise.lance)
  return tatica && { ...tatica, cp: analise.cp }
}
