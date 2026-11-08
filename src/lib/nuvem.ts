import { reactive, watch } from 'vue'
import { gravar, ler } from './armazenamento'
import { normalizarProgresso, progresso } from './progresso'
import { juntarProgresso, paraNuvem, type ProgressoSincronizado } from './sincronizacao'

type Firebase = typeof import('./firebase')

/** Lembra que a pessoa entrou, para carregar o Firebase ao abrir o app. */
const CHAVE_ATIVA = 'aberturas.nuvem.ativa'
/** O Firestore aceita documentos de até 1 MiB; deixamos folga. */
const LIMITE_BYTES = 900_000
const ESPERA_ENVIO_MS = 3000

export const nuvem = reactive({
  estado: 'desligada' as 'desligada' | 'carregando' | 'conectada' | 'sincronizando' | 'erro',
  nome: '' as string,
  email: '' as string,
  /** Hora (HH:MM) da última sincronização bem-sucedida. */
  ultima: '' as string,
  erro: '' as string,
})

let firebase: Firebase | null = null
let uid: string | null = null
/** JSON do último estado igual nos dois lados; evita gravar o que não mudou. */
let ultimoSincronizado = ''
let fila: Promise<void> = Promise.resolve()
let temporizador: ReturnType<typeof setTimeout> | undefined

async function carregar(): Promise<Firebase> {
  if (firebase) return firebase
  const modulo = await import('./firebase')
  firebase = modulo
  modulo.observarUsuario((usuario) => {
    if (usuario) {
      uid = usuario.uid
      nuvem.nome = usuario.displayName ?? ''
      nuvem.email = usuario.email ?? ''
      nuvem.estado = 'conectada'
      gravar(CHAVE_ATIVA, true)
      void sincronizar()
    } else {
      uid = null
      ultimoSincronizado = ''
      nuvem.estado = 'desligada'
      nuvem.nome = ''
      nuvem.email = ''
    }
  })
  return modulo
}

function hora(): string {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

function lerNuvem(texto: string | null): ProgressoSincronizado | null {
  if (!texto) return null
  try {
    const dados = normalizarProgresso(JSON.parse(texto))
    return dados ? paraNuvem(dados) : null
  } catch {
    return null
  }
}

/** Se passar do limite do Firestore, as análises de partidas ficam só no aparelho (dá para reimportar). */
function textoParaGravar(dados: ProgressoSincronizado): string {
  const texto = JSON.stringify(dados)
  if (new Blob([texto]).size <= LIMITE_BYTES) return texto
  return JSON.stringify({ ...dados, partidas: { ...dados.partidas, analisadas: {} } })
}

/**
 * Busca a nuvem, junta com este aparelho e grava o resultado nos dois lados.
 * Com `substituir`, a nuvem passa a ser igual a este aparelho (depois de resetar ou importar).
 */
export function sincronizar(substituir = false): Promise<void> {
  fila = fila.then(async () => {
    if (!firebase || !uid) return
    nuvem.estado = 'sincronizando'
    try {
      const local = paraNuvem(progresso)
      const daNuvem = substituir ? null : lerNuvem(await firebase.lerDaNuvem(uid))
      const junto = daNuvem ? juntarProgresso(local, daNuvem) : local
      const textoJunto = JSON.stringify(junto)
      // Antes de mexer no progresso, para o watch não agendar outra sincronização à toa.
      ultimoSincronizado = textoJunto
      if (textoJunto !== JSON.stringify(local)) Object.assign(progresso, JSON.parse(textoJunto))
      if (substituir || !daNuvem || textoJunto !== JSON.stringify(daNuvem)) {
        await firebase.gravarNaNuvem(uid, textoParaGravar(junto))
      }
      nuvem.ultima = hora()
      nuvem.erro = ''
      nuvem.estado = 'conectada'
    } catch (erro) {
      nuvem.estado = 'erro'
      nuvem.erro = navigator.onLine
        ? `Não foi possível sincronizar (${(erro as Error).message}).`
        : 'Sem internet: o progresso fica neste aparelho e sincroniza quando a conexão voltar.'
    }
  })
  return fila
}

export async function entrar(): Promise<void> {
  nuvem.erro = ''
  nuvem.estado = 'carregando'
  try {
    const fb = await carregar()
    await fb.entrarComGoogle()
  } catch (erro) {
    const codigo = (erro as { code?: string }).code ?? ''
    nuvem.estado = uid ? 'conectada' : 'desligada'
    if (codigo === 'auth/popup-closed-by-user' || codigo === 'auth/cancelled-popup-request') return
    nuvem.erro =
      codigo === 'auth/popup-blocked'
        ? 'O navegador bloqueou a janela de login. Permita pop-ups para este site e tente de novo.'
        : `Não foi possível entrar (${codigo || (erro as Error).message}).`
  }
}

export async function sair(): Promise<void> {
  gravar(CHAVE_ATIVA, false)
  await firebase?.sairDaConta()
}

/** Chamado na abertura do app: reconecta quem já tinha entrado e acompanha as mudanças. */
export function iniciarNuvem(): void {
  if (ler(CHAVE_ATIVA, false)) {
    nuvem.estado = 'carregando'
    carregar().catch(() => {
      nuvem.estado = 'erro'
      nuvem.erro = 'Não foi possível carregar a sincronização. Confira a internet.'
    })
  }

  watch(
    () => JSON.stringify(paraNuvem(progresso)),
    (texto) => {
      if (!uid || texto === ultimoSincronizado) return
      clearTimeout(temporizador)
      temporizador = setTimeout(() => void sincronizar(), ESPERA_ENVIO_MS)
    },
  )

  // Ao voltar para o app (trocou do celular para o computador), traz o que mudou.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && uid) void sincronizar()
    if (document.visibilityState === 'hidden' && uid && temporizador) {
      clearTimeout(temporizador)
      temporizador = undefined
      void sincronizar()
    }
  })
  window.addEventListener('online', () => {
    if (uid) void sincronizar()
  })
}
