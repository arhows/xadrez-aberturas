import { reactive, watch } from 'vue'
import { gravar, ler } from './armazenamento'
import {
  abrirProgressoDaConta,
  apagarProgressoSemConta,
  fecharProgresso,
  normalizarProgresso,
  progresso,
  progressoSemConta,
} from './progresso'
import { juntarProgresso, paraNuvem, type ProgressoSincronizado } from './sincronizacao'

type Firebase = typeof import('./firebase')

/** Contas que disseram "não é meu" para o progresso de antes do login neste aparelho. */
const CHAVE_RECUSARAM = 'aberturas.semConta.recusado'
/** O Firestore aceita documentos de até 1 MiB; deixamos folga. */
const LIMITE_BYTES = 900_000
const ESPERA_ENVIO_MS = 3000

/** Sessão da conta e estado da sincronização. */
export const nuvem = reactive({
  /** "verificando" só na abertura, enquanto o Firebase descobre se já há alguém conectado. */
  estado: 'verificando' as 'verificando' | 'desligada' | 'conectada' | 'sincronizando' | 'erro',
  uid: null as string | null,
  nome: '',
  email: '',
  /** Hora (HH:MM) da última sincronização bem-sucedida. */
  ultima: '',
  erro: '',
  /** Há progresso de antes do login neste aparelho e falta perguntar se é desta conta. */
  perguntarSemConta: false,
})

let firebase: Firebase | null = null
/** JSON do último estado igual nos dois lados; evita gravar o que não mudou. */
let ultimoSincronizado = ''
let fila: Promise<void> = Promise.resolve()
let temporizador: ReturnType<typeof setTimeout> | undefined
let avisarSessaoPronta: () => void = () => {}
const sessaoPronta = new Promise<void>((resolver) => (avisarSessaoPronta = resolver))

/** Resolve quando já se sabe se há alguém conectado (para o roteador decidir a tela). */
export function esperarSessao(): Promise<void> {
  return sessaoPronta
}

function aoMudarUsuario(usuario: { uid: string; displayName: string | null; email: string | null } | null) {
  clearTimeout(temporizador)
  temporizador = undefined
  ultimoSincronizado = ''
  if (usuario) {
    if (usuario.uid !== nuvem.uid) abrirProgressoDaConta(usuario.uid)
    nuvem.uid = usuario.uid
    nuvem.nome = usuario.displayName ?? nuvem.nome
    nuvem.email = usuario.email ?? ''
    nuvem.estado = 'conectada'
    nuvem.erro = ''
    nuvem.perguntarSemConta =
      progressoSemConta() !== null && !ler<string[]>(CHAVE_RECUSARAM, []).includes(usuario.uid)
    void sincronizar()
  } else {
    fecharProgresso()
    nuvem.uid = null
    nuvem.nome = ''
    nuvem.email = ''
    nuvem.ultima = ''
    nuvem.perguntarSemConta = false
    nuvem.estado = 'desligada'
  }
  avisarSessaoPronta()
}

async function carregar(): Promise<Firebase> {
  if (firebase) return firebase
  const modulo = await import('./firebase')
  firebase = modulo
  modulo.observarUsuario(aoMudarUsuario)
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
    const uid = nuvem.uid
    if (!firebase || !uid) return
    nuvem.estado = 'sincronizando'
    try {
      const daNuvem = substituir ? null : lerNuvem(await firebase.lerDaNuvem(uid))
      // Trocou de conta durante a leitura: não mistura.
      if (uid !== nuvem.uid) return
      const local = paraNuvem(progresso)
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
      if (uid !== nuvem.uid) return
      nuvem.estado = 'erro'
      nuvem.erro = navigator.onLine
        ? `Não foi possível sincronizar (${(erro as Error).message}).`
        : 'Sem internet: o progresso fica neste aparelho e sincroniza quando a conexão voltar.'
    }
  })
  return fila
}

/** Mensagens do Firebase Auth em português; null quando a pessoa só fechou a janela. */
export function mensagemDeErro(erro: unknown): string | null {
  const codigo = (erro as { code?: string }).code ?? ''
  const mensagens: Record<string, string | null> = {
    'auth/popup-closed-by-user': null,
    'auth/cancelled-popup-request': null,
    'auth/popup-blocked': 'O navegador bloqueou a janela de login. Permita pop-ups para este site e tente de novo.',
    'auth/invalid-email': 'E-mail inválido.',
    'auth/missing-email': 'Digite o e-mail.',
    'auth/missing-password': 'Digite a senha.',
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/wrong-password': 'E-mail ou senha incorretos.',
    'auth/user-not-found': 'Não há conta com este e-mail. Crie uma conta.',
    'auth/email-already-in-use': 'Já existe uma conta com este e-mail. Use "Entrar" (ou "Esqueci a senha").',
    'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
    'auth/too-many-requests': 'Muitas tentativas. Espere alguns minutos e tente de novo.',
    'auth/network-request-failed': 'Sem conexão com a internet.',
    'auth/operation-not-allowed': 'Este tipo de login ainda não foi ativado no Firebase.',
    'auth/user-disabled': 'Esta conta foi desativada.',
  }
  if (codigo in mensagens) return mensagens[codigo]
  return `Não foi possível entrar (${codigo || (erro as Error).message}).`
}

/** Executa uma ação de login; devolve a mensagem de erro (ou null se deu certo). */
async function tentar(acao: (fb: Firebase) => Promise<unknown>): Promise<string | null> {
  try {
    await acao(await carregar())
    return null
  } catch (erro) {
    return mensagemDeErro(erro) ?? ''
  }
}

export const entrarComGoogle = () => tentar((fb) => fb.entrarComGoogle())
export const entrarComEmail = (email: string, senha: string) => tentar((fb) => fb.entrarComEmail(email.trim(), senha))
export const cadastrar = (nome: string, email: string, senha: string) =>
  tentar(async (fb) => {
    await fb.cadastrarComEmail(nome.trim(), email.trim(), senha)
    nuvem.nome = nome.trim()
  })
export const esqueciASenha = (email: string) => tentar((fb) => fb.enviarRedefinicaoDeSenha(email.trim()))

export async function sair(): Promise<void> {
  // Envia o que ainda não subiu antes de fechar a conta.
  if (nuvem.uid && JSON.stringify(paraNuvem(progresso)) !== ultimoSincronizado) await sincronizar()
  await firebase?.sairDaConta()
}

/** Junta o progresso de antes do login à conta aberta. */
export function juntarProgressoSemConta(): void {
  const antigo = progressoSemConta()
  if (antigo) Object.assign(progresso, JSON.parse(JSON.stringify(juntarProgresso(paraNuvem(progresso), paraNuvem(antigo)))))
  apagarProgressoSemConta()
  nuvem.perguntarSemConta = false
}

/** "Não é meu": não pergunta de novo a esta conta e deixa o progresso para quem for o dono. */
export function recusarProgressoSemConta(): void {
  if (nuvem.uid) gravar(CHAVE_RECUSARAM, [...ler<string[]>(CHAVE_RECUSARAM, []), nuvem.uid])
  nuvem.perguntarSemConta = false
}

/** Chamado na abertura do app: descobre a conta conectada e acompanha as mudanças. */
export function iniciarNuvem(): void {
  carregar().catch(() => {
    nuvem.estado = 'erro'
    nuvem.erro = 'Não foi possível carregar o login. Confira a internet e recarregue a página.'
    avisarSessaoPronta()
  })

  watch(
    () => JSON.stringify(paraNuvem(progresso)),
    (texto) => {
      if (!nuvem.uid || texto === ultimoSincronizado) return
      clearTimeout(temporizador)
      temporizador = setTimeout(() => void sincronizar(), ESPERA_ENVIO_MS)
    },
  )

  // Ao voltar para o app (trocou do celular para o computador), traz o que mudou;
  // ao sair dele, envia na hora o que estava esperando.
  document.addEventListener('visibilitychange', () => {
    if (!nuvem.uid) return
    if (document.visibilityState === 'visible') void sincronizar()
    else if (temporizador) {
      clearTimeout(temporizador)
      temporizador = undefined
      void sincronizar()
    }
  })
  window.addEventListener('online', () => {
    if (nuvem.uid) void sincronizar()
  })
}
