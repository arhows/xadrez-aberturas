/** localStorage com try/catch: o app precisa funcionar mesmo sem acesso a ele. */

export function ler<T>(chave: string, padrao: T): T {
  try {
    const valor = localStorage.getItem(chave)
    return valor === null ? padrao : (JSON.parse(valor) as T)
  } catch {
    return padrao
  }
}

export function gravar(chave: string, valor: unknown): void {
  try {
    localStorage.setItem(chave, JSON.stringify(valor))
  } catch {
    // Sem armazenamento, o estado dura só até recarregar a página.
  }
}

export function remover(chave: string): void {
  try {
    localStorage.removeItem(chave)
  } catch {
    // Sem armazenamento não há o que remover.
  }
}
