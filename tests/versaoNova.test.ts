import { describe, expect, it } from 'vitest'
import { ehArquivoDeVersaoAntiga } from '../src/lib/versaoNova'

describe('arquivo de versão antiga', () => {
  it('reconhece as mensagens de módulo que não carregou nos navegadores', () => {
    expect(ehArquivoDeVersaoAntiga(new TypeError('Failed to fetch dynamically imported module: https://x/assets/PraticarView-abc.js'))).toBe(true)
    expect(ehArquivoDeVersaoAntiga(new TypeError('Importing a module script failed.'))).toBe(true)
    expect(ehArquivoDeVersaoAntiga(new TypeError('error loading dynamically imported module'))).toBe(true)
    expect(ehArquivoDeVersaoAntiga(new Error('Unable to preload CSS for /assets/x.css'))).toBe(true)
  })

  it('não confunde com outros erros', () => {
    expect(ehArquivoDeVersaoAntiga(new Error('Cannot read properties of undefined'))).toBe(false)
  })
})
