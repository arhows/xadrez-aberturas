/**
 * Leitor mínimo de .zip (as coleções de partidas costumam vir zipadas). Usa o diretório
 * central e o DecompressionStream do navegador; aceita arquivos guardados ou com deflate.
 */

export interface ArquivoDoZip {
  nome: string
  dados: Uint8Array
}

async function inflar(dados: Uint8Array): Promise<Uint8Array> {
  const fluxo = new Blob([dados as BlobPart]).stream().pipeThrough(new DecompressionStream('deflate-raw'))
  return new Uint8Array(await new Response(fluxo).arrayBuffer())
}

export function ehZip(dados: Uint8Array): boolean {
  return dados.length > 4 && dados[0] === 0x50 && dados[1] === 0x4b && dados[2] === 0x03 && dados[3] === 0x04
}

export async function lerZip(dados: Uint8Array): Promise<ArquivoDoZip[]> {
  const visao = new DataView(dados.buffer, dados.byteOffset, dados.byteLength)
  // Fim do diretório central: assinatura 0x06054b50 nos últimos 64 KB.
  let fim = -1
  for (let i = dados.length - 22; i >= Math.max(0, dados.length - 65558); i--) {
    if (visao.getUint32(i, true) === 0x06054b50) {
      fim = i
      break
    }
  }
  if (fim < 0) throw new Error('Arquivo .zip inválido.')
  const quantos = visao.getUint16(fim + 10, true)
  let pos = visao.getUint32(fim + 16, true)
  const arquivos: ArquivoDoZip[] = []
  const texto = new TextDecoder()
  for (let n = 0; n < quantos; n++) {
    if (visao.getUint32(pos, true) !== 0x02014b50) throw new Error('Arquivo .zip inválido.')
    const metodo = visao.getUint16(pos + 10, true)
    const tamanho = visao.getUint32(pos + 20, true)
    const tamNome = visao.getUint16(pos + 28, true)
    const tamExtra = visao.getUint16(pos + 30, true)
    const tamComentario = visao.getUint16(pos + 32, true)
    const local = visao.getUint32(pos + 42, true)
    const nome = texto.decode(dados.subarray(pos + 46, pos + 46 + tamNome))
    pos += 46 + tamNome + tamExtra + tamComentario
    if (nome.endsWith('/')) continue
    const inicio = local + 30 + visao.getUint16(local + 26, true) + visao.getUint16(local + 28, true)
    const bruto = dados.subarray(inicio, inicio + tamanho)
    if (metodo === 0) arquivos.push({ nome, dados: bruto })
    else if (metodo === 8) arquivos.push({ nome, dados: await inflar(bruto) })
  }
  return arquivos
}

/** Texto de um arquivo: UTF-8, ou Latin-1 se não for UTF-8 válido (PGNs antigos). */
export function textoDoArquivo(dados: Uint8Array): string {
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(dados)
  } catch {
    return new TextDecoder('latin1').decode(dados)
  }
}
