import { ref } from 'vue'
import { gravar, ler, remover } from './armazenamento'

/**
 * Conexão com o lichess para o explorador de aberturas, que exige login. Usa OAuth com PKCE
 * (o lichess aceita apps sem cadastro) e não pede nenhuma permissão: o token só identifica
 * a pessoa. Fica guardado neste aparelho e não vai para a nuvem.
 */

const CHAVE = 'aberturas.lichess'
const CHAVE_PEDIDO = 'aberturas.lichess.pedido'
const ID_DO_APP = 'xadrez-aberturas'
const LICHESS = 'https://lichess.org'

interface Conexao {
  token: string
  /** ms desde 1970; o lichess dá cerca de um ano. */
  expira: number
}

function carregar(): Conexao | null {
  const salvo = ler<Conexao | null>(CHAVE, null)
  return salvo && salvo.expira > Date.now() ? salvo : null
}

export const conexaoLichess = ref<Conexao | null>(carregar())
/** Erro da última tentativa de conexão, para a tela do explorador mostrar. */
export const erroConexaoLichess = ref<string | null>(null)

const enderecoDeVolta = () => `${location.origin}${location.pathname}`

function aleatorio(bytes: number): string {
  return base64Url(crypto.getRandomValues(new Uint8Array(bytes)))
}

function base64Url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function desafio(verificador: string): Promise<string> {
  const resumo = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verificador))
  return base64Url(new Uint8Array(resumo))
}

/** Tela (rota do hash) de onde a pessoa saiu para conectar; o main.ts a reabre depois de montar o app. */
export let voltaDoLichess: string | null = null

/** Vai para o lichess pedir autorização; a volta cai em `concluirConexaoLichess`. */
export async function conectarLichess(): Promise<void> {
  const verificador = aleatorio(48)
  const estado = aleatorio(16)
  try {
    sessionStorage.setItem(CHAVE_PEDIDO, JSON.stringify({ verificador, estado, volta: location.hash }))
  } catch {
    // Sem sessionStorage não dá para concluir a volta; o lichess só mostraria um erro depois.
    throw new Error('O navegador bloqueou o armazenamento da sessão; não dá para conectar.')
  }
  const parametros = new URLSearchParams({
    response_type: 'code',
    client_id: ID_DO_APP,
    redirect_uri: enderecoDeVolta(),
    code_challenge_method: 'S256',
    code_challenge: await desafio(verificador),
    state: estado,
  })
  location.assign(`${LICHESS}/oauth?${parametros}`)
}

/**
 * Na abertura do app: se a página voltou do lichess com ?code=…, troca o código pelo token,
 * limpa o endereço e devolve a tela de onde a pessoa saiu. Devolve uma mensagem de erro, se houver.
 */
export async function concluirConexaoLichess(): Promise<string | null> {
  const busca = new URLSearchParams(location.search)
  const codigo = busca.get('code')
  const erro = busca.get('error')
  if (!codigo && !erro) return null

  let pedido: { verificador: string; estado: string; volta: string } | null = null
  try {
    pedido = JSON.parse(sessionStorage.getItem(CHAVE_PEDIDO) ?? 'null')
    sessionStorage.removeItem(CHAVE_PEDIDO)
  } catch {
    pedido = null
  }
  history.replaceState(null, '', `${location.pathname}${pedido?.volta ?? location.hash}`)
  voltaDoLichess = pedido?.volta.replace(/^#/, '') || null

  if (erro) return 'A conexão com o lichess foi cancelada.'
  if (!pedido || busca.get('state') !== pedido.estado) return 'Não foi possível confirmar a conexão com o lichess. Tente de novo.'

  try {
    const resposta = await fetch(`${LICHESS}/api/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: codigo!,
        code_verifier: pedido.verificador,
        redirect_uri: enderecoDeVolta(),
        client_id: ID_DO_APP,
      }),
    })
    if (!resposta.ok) return `O lichess recusou a conexão (erro ${resposta.status}).`
    const dados = (await resposta.json()) as { access_token: string; expires_in: number }
    const conexao = { token: dados.access_token, expira: Date.now() + dados.expires_in * 1000 }
    gravar(CHAVE, conexao)
    conexaoLichess.value = conexao
    return null
  } catch {
    return 'Sem conexão com o lichess agora. Tente de novo mais tarde.'
  }
}

/** Esquece o token neste aparelho e pede ao lichess para invalidá-lo. */
export async function desconectarLichess(): Promise<void> {
  const token = conexaoLichess.value?.token
  conexaoLichess.value = null
  remover(CHAVE)
  if (token) {
    await fetch(`${LICHESS}/api/token`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }).catch(() => {})
  }
}

/** O token expirou ou foi revogado no site: some a conexão para a tela pedir de novo. */
export function conexaoInvalida(): void {
  conexaoLichess.value = null
  remover(CHAVE)
}
