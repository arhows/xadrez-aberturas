import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import type { Plugin } from 'vite'

/** Arquivos do dist que não entram no cache offline. */
const IGNORAR = new Set(['sw.js'])

/**
 * Monta o texto do service worker: guarda todos os arquivos do site na instalação,
 * responde do cache (o site inteiro funciona offline, inclusive o Stockfish) e
 * deixa passar direto as chamadas a outros sites (chess.com, lichess).
 */
export function textoServiceWorker(arquivos: string[], versao: string): string {
  const lista = ['./', ...arquivos.map((a) => `./${a}`)]
  return `// Gerado no build por scripts/pwa/serviceWorker.ts. Não editar.
const CACHE = 'xadrez-${versao}'
const ARQUIVOS = ${JSON.stringify(lista)}

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE).then((cache) =>
      cache.addAll(ARQUIVOS.map((url) => new Request(url, { cache: 'reload' }))),
    ),
  )
})

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches
      .keys()
      .then((nomes) => Promise.all(nomes.filter((n) => n.startsWith('xadrez-') && n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('message', (evento) => {
  if (evento.data === 'atualizar') self.skipWaiting()
})

self.addEventListener('fetch', (evento) => {
  const pedido = evento.request
  if (pedido.method !== 'GET') return
  const url = new URL(pedido.url)
  if (url.origin !== self.location.origin) return
  if (pedido.mode === 'navigate') {
    // O app usa rotas com #, então toda navegação é a mesma página.
    evento.respondWith(
      caches.match('./index.html', { cacheName: CACHE }).then((r) => r || fetch(pedido)),
    )
    return
  }
  evento.respondWith(
    caches.match(pedido, { cacheName: CACHE, ignoreSearch: true }).then((r) => r || fetch(pedido)),
  )
})
`
}

function listar(pasta: string, raiz = pasta): string[] {
  return readdirSync(pasta, { withFileTypes: true }).flatMap((item) => {
    const caminho = join(pasta, item.name)
    if (item.isDirectory()) return listar(caminho, raiz)
    return [relative(raiz, caminho).split(sep).join('/')]
  })
}

/** Plugin do Vite: depois do build, escreve dist/sw.js com a lista e a versão (hash) dos arquivos. */
export function pluginServiceWorker(): Plugin {
  let saida = 'dist'
  return {
    name: 'service-worker-offline',
    apply: 'build',
    configResolved(config) {
      saida = config.build.outDir
    },
    closeBundle() {
      const arquivos = listar(saida)
        .filter((a) => !IGNORAR.has(a))
        .sort()
      const hash = createHash('sha256')
      for (const arquivo of arquivos) hash.update(arquivo).update(readFileSync(join(saida, arquivo)))
      const versao = hash.digest('hex').slice(0, 12)
      writeFileSync(join(saida, 'sw.js'), textoServiceWorker(arquivos, versao))
    },
  }
}
