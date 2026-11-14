import { reactive, watch } from 'vue'
import { gravar, ler } from './armazenamento'
import { nuvem, obterFirebase } from './nuvem'

/**
 * Foto ou avatar de cada conta. Fica em perfis/{uid} no Firestore: qualquer conta lê (para
 * mostrar nas partidas on-line e no ranking) e só o dono grava. A foto enviada é reduzida no
 * aparelho para 128×128 (uns 10 KB), então cabe no próprio documento, sem Firebase Storage.
 */
export interface Perfil {
  /** Data URL da foto enviada, ou a foto da conta Google (https). */
  foto: string | null
  /** Id de um dos AVATARES. */
  avatar: string | null
}

export type PecaDoAvatar = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
export type TomDoAvatar = 'aprender' | 'praticar' | 'jogar' | 'eu' | 'aviso' | 'erro'

/** Avatares prontos: uma peça num fundo colorido. */
export const AVATARES: { id: string; peca: PecaDoAvatar; tom: TomDoAvatar; nome: string }[] = [
  { id: 'cavalo-verde', peca: 'knight', tom: 'praticar', nome: 'Cavalo verde' },
  { id: 'rei-azul', peca: 'king', tom: 'aprender', nome: 'Rei azul' },
  { id: 'dama-roxa', peca: 'queen', tom: 'eu', nome: 'Dama roxa' },
  { id: 'torre-laranja', peca: 'rook', tom: 'jogar', nome: 'Torre laranja' },
  { id: 'bispo-amarelo', peca: 'bishop', tom: 'aviso', nome: 'Bispo amarelo' },
  { id: 'peao-vermelho', peca: 'pawn', tom: 'erro', nome: 'Peão vermelho' },
  { id: 'cavalo-laranja', peca: 'knight', tom: 'jogar', nome: 'Cavalo laranja' },
  { id: 'rei-verde', peca: 'king', tom: 'praticar', nome: 'Rei verde' },
  { id: 'dama-azul', peca: 'queen', tom: 'aprender', nome: 'Dama azul' },
  { id: 'torre-roxa', peca: 'rook', tom: 'eu', nome: 'Torre roxa' },
  { id: 'bispo-vermelho', peca: 'bishop', tom: 'erro', nome: 'Bispo vermelho' },
  { id: 'peao-amarelo', peca: 'pawn', tom: 'aviso', nome: 'Peão amarelo' },
]

export const buscarAvatar = (id: string | null | undefined) => AVATARES.find((a) => a.id === id)

/** Tamanho máximo da foto gravada (a regra do Firestore recusa acima disso). */
export const LIMITE_FOTO = 60_000
const LADO_DA_FOTO = 128

/** null = a conta não tem perfil; undefined = ainda não foi buscado. */
const perfis = reactive(new Map<string, Perfil | null>())
const buscando = new Set<string>()
const chaveLocal = (uid: string) => `aberturas.perfil.${uid}`
const contaDeTeste = (uid: string) => uid === 'teste-visual'

/** Perfil de uma conta (reativo); busca na primeira vez. */
export function perfilDe(uid: string | null | undefined): Perfil | null {
  if (!uid) return null
  if (!perfis.has(uid) && !buscando.has(uid) && !contaDeTeste(uid)) {
    buscando.add(uid)
    obterFirebase()
      .then((fb) => fb.lerPerfil(uid))
      .then((p) => perfis.set(uid, p))
      .catch(() => perfis.set(uid, null))
      .finally(() => buscando.delete(uid))
  }
  return perfis.get(uid) ?? null
}

/** Grava a foto ou o avatar da conta conectada. Devolve a mensagem de erro, ou null. */
export async function salvarMeuPerfil(perfil: Perfil): Promise<string | null> {
  const uid = nuvem.uid
  if (!uid) return 'Entre na sua conta para trocar a foto.'
  if (perfil.foto && perfil.foto.length > LIMITE_FOTO) return 'A foto ficou grande demais. Tente outra.'
  const anterior = perfis.get(uid)
  perfis.set(uid, perfil)
  gravar(chaveLocal(uid), perfil)
  if (contaDeTeste(uid)) return null
  try {
    await (await obterFirebase()).gravarPerfil(uid, perfil)
    return null
  } catch {
    perfis.set(uid, anterior ?? null)
    gravar(chaveLocal(uid), anterior ?? null)
    return 'Não deu para salvar a foto agora. Confira a internet e tente de novo.'
  }
}

// Ao entrar: mostra logo o perfil guardado no aparelho e confere o da nuvem. Na primeira vez
// de uma conta Google, a foto da conta vira a foto do perfil (dá para trocar depois).
watch(
  () => nuvem.uid,
  async (uid) => {
    if (!uid) return
    const local = ler<Perfil | null>(chaveLocal(uid), null)
    if (local) perfis.set(uid, local)
    if (contaDeTeste(uid)) return
    try {
      const fb = await obterFirebase()
      const remoto = await fb.lerPerfil(uid)
      if (uid !== nuvem.uid) return
      if (remoto) {
        perfis.set(uid, remoto)
        gravar(chaveLocal(uid), remoto)
      } else if (nuvem.fotoGoogle) {
        await salvarMeuPerfil({ foto: nuvem.fotoGoogle, avatar: null })
      } else perfis.set(uid, local)
    } catch {
      // Sem internet: fica o perfil guardado no aparelho.
    }
  },
  { immediate: true },
)

/**
 * Reduz a foto escolhida a um quadrado de 128×128 (recorte do centro) em JPEG, pequeno o
 * bastante para caber no documento do perfil.
 */
export async function reduzirFoto(arquivo: Blob): Promise<string> {
  const imagem = await createImageBitmap(arquivo)
  const lado = Math.min(imagem.width, imagem.height)
  const tela = document.createElement('canvas')
  tela.width = tela.height = LADO_DA_FOTO
  const ctx = tela.getContext('2d')!
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(imagem, (imagem.width - lado) / 2, (imagem.height - lado) / 2, lado, lado, 0, 0, LADO_DA_FOTO, LADO_DA_FOTO)
  imagem.close()
  for (const qualidade of [0.85, 0.7, 0.55, 0.4]) {
    const url = tela.toDataURL('image/jpeg', qualidade)
    if (url.length <= LIMITE_FOTO) return url
  }
  throw new Error('foto grande demais')
}

/** Cor de fundo da inicial, sempre a mesma para a mesma conta. */
export function tomDaInicial(chave: string): TomDoAvatar {
  const tons: TomDoAvatar[] = ['aprender', 'praticar', 'jogar', 'eu']
  let soma = 0
  for (const ch of chave) soma = (soma * 31 + ch.charCodeAt(0)) >>> 0
  return tons[soma % tons.length]
}
