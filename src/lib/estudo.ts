/** Estudo de uma linha: decide se o outro lado responde sozinho na posição atual. */
export function deveResponder(fen: string, meuLado: 'w' | 'b', ligado: boolean, restamLances: number): boolean {
  return ligado && restamLances > 0 && fen.split(' ')[1] !== meuLado
}
