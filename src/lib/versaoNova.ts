/**
 * Uma aba aberta antes de uma publicação nova ainda aponta para os arquivos da versão anterior,
 * que saem do site. Ao abrir uma tela ainda não carregada, o arquivo dela não existe mais e a
 * navegação falharia em silêncio ("clico e nada acontece"). Nesse caso a página recarrega já no
 * destino, pegando a versão nova. A marca na sessão evita recarregar em laço se o erro for outro.
 */
const MARCA = 'xadrez-recarregou-versao'

export function ehArquivoDeVersaoAntiga(erro: unknown): boolean {
  const texto = erro instanceof Error ? `${erro.name} ${erro.message}` : String(erro)
  return /dynamically imported module|Importing a module script failed|error loading dynamically imported|Failed to fetch|Unable to preload CSS|ChunkLoadError/i.test(texto)
}

export function recarregarNaVersaoNova(destino: string, agora = Date.now()): boolean {
  try {
    const ultima = Number(sessionStorage.getItem(MARCA) ?? 0)
    if (agora - ultima < 10_000) return false
    sessionStorage.setItem(MARCA, String(agora))
  } catch {
    // Sem sessionStorage: recarrega mesmo assim (no máximo uma vez por clique).
  }
  window.location.hash = destino
  window.location.reload()
  return true
}
