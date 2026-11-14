// material (brancas - pretas em peões) e tabuleiro compacto antes de cada rótulo
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire('D:/projetos/chess/aberturas-portal/package.json')
const { Chess } = require('chess.js')
const p = JSON.parse(readFileSync(process.argv[2], 'utf8')).partidas.find((x) => x.n === Number(process.argv[3]))
const alvo = new Set(process.argv[4].split(','))
const V = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 }
const j = new Chess()
for (const [ply, san] of p.lances.split(' ').entries()) {
  const rot = `${Math.floor(ply / 2) + 1}${ply % 2 ? '...' : '.'}${san}`
  if (alvo.has(rot)) {
    let m = 0; const pecas = { w: [], b: [] }
    for (const lin of j.board()) for (const c of lin) if (c) { m += (c.color === 'w' ? 1 : -1) * V[c.type]; pecas[c.color].push((c.type === 'p' ? '' : c.type.toUpperCase()) + c.square) }
    console.log(`${rot}  mat ${m > 0 ? '+' : ''}${m} | B: ${pecas.w.join(' ')} | P: ${pecas.b.join(' ')}`)
  }
  j.move(san)
}
