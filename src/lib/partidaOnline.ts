import { Chess } from 'chess.js'
import { situacaoDoJogo } from './jogo'
import type { Cor } from './lances'
import { aposLance, semMaterialParaMate, tempoPorId } from './relogio'

/**
 * Regras da partida on-line entre amigos (documento partidas/{id} no Firestore). Tudo puro:
 * cada função recebe o documento e devolve só os campos que mudam, para a transação gravar.
 */

export type EstadoOnline = 'aguardando' | 'jogando' | 'fim' | 'cancelada'

export interface PartidaOnline {
  criador: string
  brancas: string | null
  pretas: string | null
  /** Quem está na partida (para a consulta "minhas partidas"). */
  jogadores: string[]
  nomes: Record<string, string>
  /** Desafio direto (do ranking): só essa conta pode aceitar. null = quem tiver o link. */
  convidado: string | null
  tempo: string
  /** Conta para o ranking. */
  valendo: boolean
  estado: EstadoOnline
  lances: string[]
  /** Tempo restante (ms) de cada lado no momento do último lance. */
  restante: Record<Cor, number>
  /** Hora (ms) do último lance ou do começo. */
  ultimoLanceEm: number
  resultado: string
  motivo: string
  /** Quem ofereceu empate (uid), se há oferta aberta. */
  empate: string | null
  ratingAplicado: boolean
  /** Ratings antes e depois, gravados quando o ranking é atualizado. */
  ratings?: Record<string, { antes: number; depois: number }>
  criada: number
}

export type Mudancas = Partial<PartidaOnline>

export function novaPartida(
  criador: string,
  nome: string,
  cor: Cor | 'sorteio',
  tempo: string,
  valendo: boolean,
  convidado: { uid: string; nome: string } | null,
  agora: number,
  aleatorio = Math.random,
): PartidaOnline {
  const minha: Cor = cor === 'sorteio' ? (aleatorio() < 0.5 ? 'w' : 'b') : cor
  const ms = tempoPorId(tempo).minutos * 60_000
  return {
    criador,
    brancas: minha === 'w' ? criador : null,
    pretas: minha === 'b' ? criador : null,
    jogadores: [criador],
    nomes: { [criador]: nome, ...(convidado ? { [convidado.uid]: convidado.nome } : {}) },
    convidado: convidado?.uid ?? null,
    tempo,
    valendo,
    estado: 'aguardando',
    lances: [],
    restante: { w: ms, b: ms },
    ultimoLanceEm: agora,
    resultado: '*',
    motivo: '',
    empate: null,
    ratingAplicado: false,
    criada: agora,
  }
}

export function corDe(p: PartidaOnline, uid: string): Cor | null {
  return p.brancas === uid ? 'w' : p.pretas === uid ? 'b' : null
}

export function adversarioDe(p: PartidaOnline, uid: string): string | null {
  return corDe(p, uid) === 'w' ? p.pretas : corDe(p, uid) === 'b' ? p.brancas : null
}

export const vezDe = (p: PartidaOnline): Cor => (p.lances.length % 2 === 0 ? 'w' : 'b')

/** Motivo para não poder entrar, ou null. */
export function problemaParaEntrar(p: PartidaOnline, uid: string): string | null {
  if (corDe(p, uid)) return null
  if (p.estado !== 'aguardando') return 'Esta partida já começou ou terminou.'
  if (p.convidado && p.convidado !== uid) return 'Este desafio é para outra pessoa.'
  return null
}

export function entrar(p: PartidaOnline, uid: string, nome: string, agora: number): Mudancas {
  const problema = problemaParaEntrar(p, uid)
  if (problema) throw new Error(problema)
  if (corDe(p, uid)) return {}
  return {
    brancas: p.brancas ?? uid,
    pretas: p.pretas ?? uid,
    jogadores: [...p.jogadores, uid],
    nomes: { ...p.nomes, [uid]: nome },
    estado: 'jogando',
    ultimoLanceEm: agora,
  }
}

/** O relógio corre só depois do primeiro lance das brancas, como nos apps. */
export const relogioCorre = (p: PartidaOnline) => p.estado === 'jogando' && tempoPorId(p.tempo).minutos > 0 && p.lances.length > 0

/** Tempo na tela de cada lado agora. */
export function tempoAgora(p: PartidaOnline, cor: Cor, agora: number): number {
  if (!relogioCorre(p) || vezDe(p) !== cor) return p.restante[cor]
  return p.restante[cor] - (agora - p.ultimoLanceEm)
}

function fimPorTempo(p: PartidaOnline, quemPerdeu: Cor): Mudancas {
  const outro: Cor = quemPerdeu === 'w' ? 'b' : 'w'
  const fen = jogoDe(p).fen()
  const nomeCor = (c: Cor) => (c === 'w' ? 'brancas' : 'pretas')
  if (semMaterialParaMate(fen, outro)) {
    return { estado: 'fim', resultado: '1/2-1/2', motivo: `O tempo das ${nomeCor(quemPerdeu)} acabou, mas as ${nomeCor(outro)} não têm material para dar mate. Empate.`, empate: null }
  }
  return {
    estado: 'fim',
    resultado: quemPerdeu === 'w' ? '0-1' : '1-0',
    motivo: `O tempo das ${nomeCor(quemPerdeu)} acabou: as ${nomeCor(outro)} venceram.`,
    empate: null,
    restante: { ...p.restante, [quemPerdeu]: 0 },
  }
}

/** Se o tempo de quem está na vez acabou, as mudanças para encerrar; senão null. */
export function verificarTempo(p: PartidaOnline, agora: number): Mudancas | null {
  if (!relogioCorre(p)) return null
  const vez = vezDe(p)
  return tempoAgora(p, vez, agora) <= 0 ? fimPorTempo(p, vez) : null
}

export function jogoDe(p: PartidaOnline): Chess {
  const jogo = new Chess()
  for (const san of p.lances) jogo.move(san)
  return jogo
}

export function jogar(
  p: PartidaOnline,
  uid: string,
  lance: { from: string; to: string; promotion?: string },
  agora: number,
): Mudancas {
  if (p.estado !== 'jogando') throw new Error('A partida não está em andamento.')
  const cor = corDe(p, uid)
  if (!cor) throw new Error('Você não está nesta partida.')
  if (vezDe(p) !== cor) throw new Error('Não é a sua vez.')
  const esgotado = verificarTempo(p, agora)
  if (esgotado) return esgotado
  const jogo = jogoDe(p)
  const feito = jogo.move(lance)
  const tempo = tempoPorId(p.tempo)
  const restante = relogioCorre(p) ? aposLance(p.restante, cor, agora - p.ultimoLanceEm, tempo) : p.restante
  const mudancas: Mudancas = { lances: [...p.lances, feito.san], restante, ultimoLanceEm: agora, empate: null }
  const situacao = situacaoDoJogo(jogo)
  if (situacao.fim) Object.assign(mudancas, { estado: 'fim', resultado: situacao.resultado, motivo: situacao.texto })
  return mudancas
}

export function abandonar(p: PartidaOnline, uid: string): Mudancas {
  const cor = corDe(p, uid)
  if (!cor || p.estado !== 'jogando') throw new Error('Não dá para abandonar agora.')
  return {
    estado: 'fim',
    resultado: cor === 'w' ? '0-1' : '1-0',
    motivo: `${p.nomes[uid] ?? (cor === 'w' ? 'As brancas' : 'As pretas')} abandonou.`,
    empate: null,
  }
}

export function oferecerEmpate(p: PartidaOnline, uid: string): Mudancas {
  if (!corDe(p, uid) || p.estado !== 'jogando') throw new Error('Não dá para oferecer empate agora.')
  return { empate: uid }
}

export function responderEmpate(p: PartidaOnline, uid: string, aceito: boolean): Mudancas {
  if (!corDe(p, uid) || p.estado !== 'jogando' || !p.empate || p.empate === uid) throw new Error('Não há oferta de empate para responder.')
  return aceito ? { estado: 'fim', resultado: '1/2-1/2', motivo: 'Empate combinado.', empate: null } : { empate: null }
}

// ---------- Ranking (Elo) ----------

export const RATING_INICIAL = 1200

export interface Jogador {
  nome: string
  rating: number
  partidas: number
  vitorias: number
  empates: number
  derrotas: number
}

export function jogadorNovo(nome: string): Jogador {
  return { nome, rating: RATING_INICIAL, partidas: 0, vitorias: 0, empates: 0, derrotas: 0 }
}

/** Elo: K = 40 nas primeiras 20 partidas (o rating anda rápido até achar o nível), depois 20. */
export function novoRating(meu: number, dele: number, pontos: number, partidasJogadas: number): number {
  const esperado = 1 / (1 + 10 ** ((dele - meu) / 400))
  const k = partidasJogadas < 20 ? 40 : 20
  return Math.round(meu + k * (pontos - esperado))
}

/** Pontos das brancas pelo resultado. */
export const pontosDasBrancas = (resultado: string) => (resultado === '1-0' ? 1 : resultado === '0-1' ? 0 : 0.5)

export function aplicarResultado(jogador: Jogador, adversario: Jogador, pontos: number): Jogador {
  return {
    ...jogador,
    rating: novoRating(jogador.rating, adversario.rating, pontos, jogador.partidas),
    partidas: jogador.partidas + 1,
    vitorias: jogador.vitorias + (pontos === 1 ? 1 : 0),
    empates: jogador.empates + (pontos === 0.5 ? 1 : 0),
    derrotas: jogador.derrotas + (pontos === 0 ? 1 : 0),
  }
}
