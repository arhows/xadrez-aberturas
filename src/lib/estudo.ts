/** Estudo de uma linha: decide se o outro lado responde sozinho na posição atual. */
export function deveResponder(fen: string, meuLado: 'w' | 'b', ligado: boolean, restamLances: number): boolean {
  return ligado && restamLances > 0 && fen.split(' ')[1] !== meuLado
}

/**
 * Explorar: o lance do livro que o outro lado joga sozinho. Sorteado com peso pelo número de linhas
 * que passam por ele, para a resposta variar entre as continuações sem fugir das mais estudadas.
 */
export function escolherResposta<T extends { linhas: readonly unknown[] }>(opcoes: readonly T[], aleatorio = Math.random): T | null {
  const total = opcoes.reduce((soma, o) => soma + Math.max(1, o.linhas.length), 0)
  let sorteio = aleatorio() * total
  for (const opcao of opcoes) {
    sorteio -= Math.max(1, opcao.linhas.length)
    if (sorteio < 0) return opcao
  }
  return opcoes.at(-1) ?? null
}
