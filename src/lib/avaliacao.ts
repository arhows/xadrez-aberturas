export const LEGENDA: { simbolo: string; texto: string }[] = [
  { simbolo: '+-', texto: 'Brancas com vantagem decisiva' },
  { simbolo: '±', texto: 'Brancas melhor' },
  { simbolo: '⩲', texto: 'Brancas um pouco melhor' },
  { simbolo: '=', texto: 'Igualdade' },
  { simbolo: '⩱', texto: 'Pretas um pouco melhor' },
  { simbolo: '∓', texto: 'Pretas melhor' },
  { simbolo: '-+', texto: 'Pretas com vantagem decisiva' },
  { simbolo: '∞', texto: 'Posição pouco clara' },
  { simbolo: 'comp.', texto: 'Compensação pelo material' },
]

export interface AvaliacaoExibida {
  /** O valor como vai na tela; textos livres do livro ficam como estão. */
  rotulo: string
  /** Explicação do símbolo, quando o valor começa com um símbolo conhecido. */
  explicacao: string | null
}

export function exibirAvaliacao(valor: string | null | undefined): AvaliacaoExibida | null {
  if (!valor) return null
  const rotulo = valor === 'unclear' ? '∞' : valor
  const item = LEGENDA.find((l) => rotulo.startsWith(l.simbolo))
  return { rotulo, explicacao: item?.texto ?? null }
}
