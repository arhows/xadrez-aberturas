/**
 * Guarda grande só neste aparelho (IndexedDB): coleções de partidas de jogadores, que passam
 * do limite do localStorage e da sincronização.
 */

const BANCO = 'aberturas'
const LOJA = 'dados'

function abrir(): Promise<IDBDatabase> {
  return new Promise((resolver, rejeitar) => {
    const pedido = indexedDB.open(BANCO, 1)
    pedido.onupgradeneeded = () => pedido.result.createObjectStore(LOJA)
    pedido.onsuccess = () => resolver(pedido.result)
    pedido.onerror = () => rejeitar(pedido.error)
  })
}

async function transacao<T>(modo: IDBTransactionMode, acao: (loja: IDBObjectStore) => IDBRequest): Promise<T> {
  const banco = await abrir()
  return new Promise<T>((resolver, rejeitar) => {
    const pedido = acao(banco.transaction(LOJA, modo).objectStore(LOJA))
    pedido.onsuccess = () => resolver(pedido.result as T)
    pedido.onerror = () => rejeitar(pedido.error)
  }).finally(() => banco.close())
}

export function lerLocal<T>(chave: string): Promise<T | undefined> {
  return transacao<T | undefined>('readonly', (loja) => loja.get(chave))
}

export function gravarLocal(chave: string, valor: unknown): Promise<void> {
  return transacao<void>('readwrite', (loja) => loja.put(valor, chave))
}
