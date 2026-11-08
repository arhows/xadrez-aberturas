import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { textoServiceWorker } from '../scripts/pwa/serviceWorker'

describe('service worker', () => {
  const texto = textoServiceWorker(['index.html', 'assets/index-abc.js', 'stockfish/stockfish-19-lite-single.wasm'], 'v123')

  it('guarda a página, os assets e o Stockfish com caminhos relativos', () => {
    const lista = JSON.parse(texto.match(/const ARQUIVOS = (.*)/)![1])
    expect(lista).toEqual(['./', './index.html', './assets/index-abc.js', './stockfish/stockfish-19-lite-single.wasm'])
  })

  it('usa a versão no nome do cache e é JavaScript válido', () => {
    expect(texto).toContain("const CACHE = 'xadrez-v123'")
    expect(() => new Function(texto)).not.toThrow()
  })
})

describe('manifest', () => {
  const manifest = JSON.parse(readFileSync('public/manifest.webmanifest', 'utf-8'))

  it('é instalável: nome, start_url relativo, standalone e ícones 192/512', () => {
    expect(manifest.short_name).toBe('Xadrez')
    expect(manifest.start_url).toBe('./')
    expect(manifest.display).toBe('standalone')
    const tamanhos = manifest.icons.map((i: { sizes: string }) => i.sizes)
    expect(tamanhos).toContain('192x192')
    expect(tamanhos).toContain('512x512')
    for (const icone of manifest.icons) expect(() => readFileSync(`public/${icone.src}`)).not.toThrow()
  })
})
