/**
 * PGN recebido pelo "Compartilhar" do Android. O service worker recebe o envio
 * (ver scripts/pwa/serviceWorker.ts), guarda neste cache e abre /partidas?compartilhado=1.
 */
export const CACHE_COMPARTILHADO = 'compartilhado-pgn'
export const ARQUIVO_COMPARTILHADO = './compartilhado.json'

export interface Compartilhado {
  titulo: string
  texto: string
  endereco: string
  arquivos: string[]
}

/** Lê e apaga o que foi compartilhado (null se não houver nada). */
export async function retirarCompartilhado(): Promise<Compartilhado | null> {
  if (!('caches' in window)) return null
  try {
    const cache = await caches.open(CACHE_COMPARTILHADO)
    const resposta = await cache.match(ARQUIVO_COMPARTILHADO)
    if (!resposta) return null
    await cache.delete(ARQUIVO_COMPARTILHADO)
    return (await resposta.json()) as Compartilhado
  } catch {
    return null
  }
}

/** Código da partida on-line do lichess num texto ("lichess.org/AbCdEfGh"); offline (ocg_) não conta. */
export function partidaOnlineDoLichess(texto: string): string | null {
  const m = texto.match(/lichess\.org\/(?:game\/)?([a-zA-Z0-9]{8})(?:[a-zA-Z0-9]{4})?\b/)
  return m ? m[1] : null
}

/** Tem lances de xadrez (e não só um link ou um título)? */
export function temLances(texto: string): boolean {
  return /\b1\.\s*([a-h][1-8]|[NBRQK][a-h]?[1-8]?x?[a-h][1-8]|O-O)/.test(texto)
}

/** Monta o PGN a partir do que chegou; baixa do lichess quando veio só o link de uma partida on-line. */
export async function pgnDoCompartilhado(dados: Compartilhado): Promise<string> {
  const partes = [...dados.arquivos, dados.texto, dados.titulo].filter((t) => temLances(t))
  if (partes.length) return partes.join('\n\n')
  const codigo = partidaOnlineDoLichess([dados.endereco, dados.texto, dados.titulo].join(' '))
  if (!codigo) return ''
  const resposta = await fetch(`https://lichess.org/game/export/${codigo}?clocks=false&evals=false`, {
    headers: { Accept: 'application/x-chess-pgn' },
  })
  if (!resposta.ok) throw new Error(`O lichess respondeu com erro ${resposta.status} ao buscar a partida.`)
  return resposta.text()
}
