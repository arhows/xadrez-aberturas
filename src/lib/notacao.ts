export type Notacao = 'en' | 'pt'

const PECAS_PT: Record<string, string> = { K: 'R', Q: 'D', R: 'T', B: 'B', N: 'C' }

/** Só traduz a peça do lance: "Nf3" → "Cf3", "Qxd5+" → "Dxd5+". Roque e peões não mudam. */
export function formatarSan(san: string, notacao: Notacao): string {
  if (notacao === 'en') return san
  return san
    .replace(/^[KQRBN]/, (peca) => PECAS_PT[peca])
    .replace(/=([QRBN])/, (_, peca: string) => `=${PECAS_PT[peca]}`)
}

/** Traduz lances citados dentro de um texto, como "5...Nxd5". */
export function formatarTexto(texto: string, notacao: Notacao): string {
  if (notacao === 'en') return texto
  return texto.replace(/\b[KQRN][a-h]?[1-8]?x?[a-h][1-8]/g, (san) => formatarSan(san, notacao))
}
