/**
 * Partidas on-line e ranking no Firestore (versão completa, com atualização em tempo real).
 * Só é carregado pelas telas on-line, para não pesar no resto do app.
 *
 * Coleções: partidas/{id} (o documento da partida) e jogadores/{uid} (rating e placar).
 * Toda jogada é uma transação: lê a partida, confere com as regras de partidaOnline.ts e grava.
 */
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  setDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore'
import { app } from './firebase'
import {
  abandonar,
  adversarioDe,
  aplicarResultado,
  corDe,
  entrar,
  jogadorNovo,
  jogar,
  novaPartida,
  oferecerEmpate,
  pontosDasBrancas,
  responderEmpate,
  verificarTempo,
  type Jogador,
  type Mudancas,
  type PartidaOnline,
} from './partidaOnline'
import type { Cor } from './lances'

const banco = getFirestore(app)
const partidas = collection(banco, 'partidas')
const jogadores = collection(banco, 'jogadores')

export type PartidaComId = PartidaOnline & { id: string }
export type JogadorComId = Jogador & { uid: string }

/** Cria o registro do jogador no ranking, se ainda não existe (e atualiza o nome). */
export async function garantirJogador(uid: string, nome: string): Promise<void> {
  await runTransaction(banco, async (t) => {
    const ref = doc(jogadores, uid)
    const atual = await t.get(ref)
    if (!atual.exists()) t.set(ref, jogadorNovo(nome))
    else if (atual.data().nome !== nome) t.update(ref, { nome })
  })
}

export async function criarPartida(
  uid: string,
  nome: string,
  cor: Cor | 'sorteio',
  tempo: string,
  valendo: boolean,
  convidado: { uid: string; nome: string } | null,
): Promise<string> {
  const ref = doc(partidas)
  await setDoc(ref, novaPartida(uid, nome, cor, tempo, valendo, convidado, Date.now()))
  return ref.id
}

export function observarPartida(id: string, aoMudar: (p: PartidaComId | null) => void, aoErrar: (e: Error) => void): Unsubscribe {
  return onSnapshot(
    doc(partidas, id),
    (s) => aoMudar(s.exists() ? ({ ...(s.data() as PartidaOnline), id: s.id }) : null),
    aoErrar,
  )
}

/** Partidas em que a pessoa está, mais os desafios diretos para ela. */
export function observarMinhasPartidas(uid: string, aoMudar: (lista: PartidaComId[]) => void, aoErrar: (e: Error) => void): Unsubscribe {
  let minhas: PartidaComId[] = []
  let desafios: PartidaComId[] = []
  const publicar = () => {
    const vistos = new Map([...minhas, ...desafios].map((p) => [p.id, p]))
    aoMudar([...vistos.values()].sort((a, b) => b.criada - a.criada))
  }
  const ler = (s: { docs: { id: string; data: () => unknown }[] }) => s.docs.map((d) => ({ ...(d.data() as PartidaOnline), id: d.id }))
  const a = onSnapshot(query(partidas, where('jogadores', 'array-contains', uid)), (s) => ((minhas = ler(s)), publicar()), aoErrar)
  const b = onSnapshot(query(partidas, where('convidado', '==', uid)), (s) => ((desafios = ler(s)), publicar()), aoErrar)
  return () => {
    a()
    b()
  }
}

/** Lê a partida, aplica a regra e grava, tudo numa transação (dois aparelhos não se atropelam). */
async function alterar(id: string, regra: (p: PartidaOnline) => Mudancas | null): Promise<void> {
  await runTransaction(banco, async (t) => {
    const ref = doc(partidas, id)
    const atual = await t.get(ref)
    if (!atual.exists()) throw new Error('A partida não existe mais.')
    const mudancas = regra(atual.data() as PartidaOnline)
    if (mudancas && Object.keys(mudancas).length) t.update(ref, mudancas)
  })
}

export const entrarNaPartida = (id: string, uid: string, nome: string) => alterar(id, (p) => entrar(p, uid, nome, Date.now()))
export const jogarLance = (id: string, uid: string, lance: { from: string; to: string; promotion?: string }) =>
  alterar(id, (p) => jogar(p, uid, lance, Date.now()))
export const abandonarPartida = (id: string, uid: string) => alterar(id, (p) => abandonar(p, uid))
export const proporEmpate = (id: string, uid: string) => alterar(id, (p) => oferecerEmpate(p, uid))
export const responderOferta = (id: string, uid: string, aceito: boolean) => alterar(id, (p) => responderEmpate(p, uid, aceito))
export const reclamarTempo = (id: string) => alterar(id, (p) => verificarTempo(p, Date.now()))
export const cancelarPartida = (id: string) =>
  alterar(id, (p) => (p.estado === 'aguardando' ? { estado: 'cancelada', motivo: 'Convite cancelado.' } : null))
export const recusarDesafio = (id: string, uid: string) =>
  alterar(id, (p) => (p.estado === 'aguardando' && p.convidado === uid ? { estado: 'cancelada', motivo: 'Desafio recusado.' } : null))

/**
 * Atualiza o ranking dos dois jogadores no fim de uma partida valendo. Pode ser chamada pelos
 * dois aparelhos: a transação garante que só a primeira aplica.
 */
export async function aplicarRanking(id: string): Promise<void> {
  await runTransaction(banco, async (t) => {
    const refPartida = doc(partidas, id)
    const s = await t.get(refPartida)
    if (!s.exists()) return
    const p = s.data() as PartidaOnline
    if (p.estado !== 'fim' || !p.valendo || p.ratingAplicado || !p.brancas || !p.pretas || p.lances.length < 2) return
    const refB = doc(jogadores, p.brancas)
    const refP = doc(jogadores, p.pretas)
    const [sb, sp] = [await t.get(refB), await t.get(refP)]
    const brancas = sb.exists() ? (sb.data() as Jogador) : jogadorNovo(p.nomes[p.brancas] ?? 'Jogador')
    const pretas = sp.exists() ? (sp.data() as Jogador) : jogadorNovo(p.nomes[p.pretas] ?? 'Jogador')
    const pontos = pontosDasBrancas(p.resultado)
    const novoB = aplicarResultado(brancas, pretas, pontos)
    const novoP = aplicarResultado(pretas, brancas, 1 - pontos)
    t.set(refB, novoB)
    t.set(refP, novoP)
    t.update(refPartida, {
      ratingAplicado: true,
      ratings: {
        [p.brancas]: { antes: brancas.rating, depois: novoB.rating },
        [p.pretas]: { antes: pretas.rating, depois: novoP.rating },
      },
    })
  })
}

export async function lerRanking(): Promise<JogadorComId[]> {
  const s = await getDocs(query(jogadores, orderBy('rating', 'desc'), limit(100)))
  return s.docs.map((d) => ({ ...(d.data() as Jogador), uid: d.id }))
}

export { adversarioDe, corDe }
