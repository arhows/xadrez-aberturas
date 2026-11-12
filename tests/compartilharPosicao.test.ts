import { describe, expect, it } from 'vitest'
import { linkDaPosicao } from '../src/lib/compartilharPosicao'

describe('link da posição', () => {
  it('monta o endereço do Explorar com os lances', () => {
    expect(linkDaPosicao('https://x.github.io/app/', 'petrov', ['e4', 'e5', 'Nf3'])).toBe(
      'https://x.github.io/app/#/explorar/petrov?c=e4+e5+Nf3',
    )
    expect(linkDaPosicao('https://x/', 'italian', [])).toBe('https://x/#/explorar/italian')
    expect(linkDaPosicao('https://x/', 'c', ['O-O', 'Nxe5+'])).toBe('https://x/#/explorar/c?c=O-O+Nxe5%2B')
  })
})
