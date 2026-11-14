// Uso: node ver.mjs <json> <n> <rotulo,rotulo,...>  → tabuleiro ANTES de cada lance indicado
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire('D:/projetos/chess/aberturas-portal/package.json')
const { Chess } = require('chess.js')
const p = JSON.parse(readFileSync(process.argv[2], 'utf8')).partidas.find((x) => x.n === Number(process.argv[3]))
const alvo = new Set(process.argv[4].split(','))
const j = new Chess()
for (const [ply, san] of p.lances.split(' ').entries()) {
  const rot = `${Math.floor(ply / 2) + 1}${ply % 2 ? '...' : '.'}${san}`
  if (alvo.has(rot)) { console.log(`--- antes de ${rot}`); console.log(j.ascii()) }
  j.move(san)
}
