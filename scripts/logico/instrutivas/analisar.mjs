// Uso: node analisar.mjs <instrutivas.json> <n,n,...> [profundidade]
// Para cada meio-lance: avaliação antes (brancas), melhor lance e linha, avaliação depois do lance jogado.
import { readFileSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { createRequire } from 'node:module'
const require = createRequire('D:/projetos/chess/aberturas-portal/package.json')
const { Chess } = require('chess.js')
const sf = spawn('node', [join(tmpdir(), 'stockfish-armadilhas', 'stockfish-19-lite-single.cjs')])
let buf = '', score = null, pv = [], cb = null
sf.stdout.on('data', (d) => { buf += d; let i; while ((i = buf.indexOf('\n')) >= 0) { const l = buf.slice(0, i).trim(); buf = buf.slice(i + 1)
  const m = l.match(/ score (cp|mate) (-?\d+)/); if (m && !l.includes('bound')) { score = m[1] === 'cp' ? Number(m[2]) : (Number(m[2]) > 0 ? 1 : -1) * (10000 - Math.abs(Number(m[2]))); pv = (l.split(' pv ')[1] ?? '').split(' ') }
  if (l.startsWith('bestmove')) { const c = cb; cb = null; c({ score, pv }) } } })
const ir = (fen, depth) => new Promise((r) => { score = null; pv = []; cb = r; sf.stdin.write(`position fen ${fen}\ngo depth ${depth}\n`) })
sf.stdin.write('uci\nsetoption name Hash value 64\n')
const pvSan = (fen, pv, n = 5) => { const t = new Chess(fen); const s = []; for (const u of pv.slice(0, n)) { try { s.push(t.move({ from: u.slice(0, 2), to: u.slice(2, 4), promotion: u[4] }).san) } catch { break } } return s.join(' ') }
const dados = JSON.parse(readFileSync(process.argv[2], 'utf8')).partidas
const quais = process.argv[3].split(',').map(Number)
const prof = Number(process.argv[4] ?? 14)
for (const p of dados.filter((x) => quais.includes(x.n))) {
  console.log(`\n### ${p.n}. ${p.brancas} – ${p.pretas} ${p.ano} ${p.resultado} (${p.abertura})`)
  const j = new Chess(); const sans = p.lances.split(' ')
  let antes = await ir(j.fen(), prof)
  for (const [ply, san] of sans.entries()) {
    const fen = j.fen(); const branca = j.turn() === 'w'
    const ev = (s) => (branca ? s : -s)
    const melhor = pvSan(fen, antes.pv, 5)
    j.move(san)
    const depois = j.isGameOver() ? { score: j.isCheckmate() ? (branca ? 10000 : -10000) : 0, pv: [] } : await ir(j.fen(), prof)
    const evAntes = ev(antes.score), evDepois = -ev(depois.score) // ambos do ponto de vista das brancas
    const perda = branca ? evAntes - evDepois : evDepois - evAntes
    const rot = `${Math.floor(ply / 2) + 1}${ply % 2 ? '...' : '.'}${san}`
    const marca = perda >= 150 ? ' ??' : perda >= 70 ? ' ?' : ''
    console.log(`${rot.padEnd(12)} ${String(evAntes).padStart(6)} → ${String(evDepois).padStart(6)}${marca}  melhor: ${melhor}`)
    antes = depois
  }
}
sf.stdin.write('quit\n')
