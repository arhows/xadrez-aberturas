/**
 * Link que abre o Explorar exatamente numa posição. Quem recebe precisa entrar na conta
 * (o app exige login); depois do login a guarda do router devolve a pessoa a este endereço.
 */
export function linkDaPosicao(base: string, capitulo: string, sans: string[]): string {
  const busca = sans.length ? `?c=${sans.map(encodeURIComponent).join('+')}` : ''
  return `${base}#/explorar/${encodeURIComponent(capitulo)}${busca}`
}

/** Usa o "Compartilhar" do aparelho quando existe; senão copia o link. Devolve o que aconteceu. */
export async function compartilharPosicao(titulo: string, link: string): Promise<'compartilhado' | 'copiado' | 'falhou'> {
  if (navigator.share) {
    try {
      await navigator.share({ title: titulo, text: titulo, url: link })
      return 'compartilhado'
    } catch (erro) {
      // Cancelar o "Compartilhar" não é erro; outros casos tentam copiar.
      if (erro instanceof DOMException && erro.name === 'AbortError') return 'compartilhado'
    }
  }
  try {
    await navigator.clipboard.writeText(link)
    return 'copiado'
  } catch {
    return 'falhou'
  }
}
