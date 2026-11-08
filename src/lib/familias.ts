import { separarLances } from './lances'

/** As cinco partes do MCO, na ordem do livro (lances em notação inglesa; a tela usa fmtTexto). */
export interface Familia {
  id: 'abertos' | 'semiabertos' | 'fechados' | 'indianos' | 'flanco'
  nome: string
  lances: string
}

export const FAMILIAS: Familia[] = [
  { id: 'abertos', nome: 'Jogos abertos', lances: '1.e4 e5' },
  { id: 'semiabertos', nome: 'Aberturas semiabertas', lances: '1.e4, outras respostas' },
  { id: 'fechados', nome: 'Aberturas fechadas', lances: '1.d4 d5' },
  { id: 'indianos', nome: 'Defesas indianas', lances: '1.d4 Nf6' },
  { id: 'flanco', nome: 'Aberturas de flanco', lances: '1.c4, 1.Nf3 e outras' },
]

/** Família de uma abertura pelos dois primeiros lances da sequência-base do capítulo. */
export function familiaDaAbertura(base: string): Familia {
  const [branco, preto] = separarLances(base)
  const id: Familia['id'] =
    branco === 'e4'
      ? preto === 'e5'
        ? 'abertos'
        : 'semiabertos'
      : branco === 'd4'
        ? preto === 'd5'
          ? 'fechados'
          : preto === 'Nf6'
            ? 'indianos'
            : 'fechados'
        : 'flanco'
  return FAMILIAS.find((familia) => familia.id === id)!
}
