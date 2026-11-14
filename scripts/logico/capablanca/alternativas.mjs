// Uso: node alternativas.mjs <livro.json> <n> <rótulos separados por vírgula, ex: 14.b4,22...Rd8> [profundidade]
// Para cada lance pedido: as 3 melhores opções do Stockfish (MultiPV) com a linha de cada uma,
// e a avaliação do lance jogado. Serve para escrever o "E se…?" das decisões difíceis.
import { readFileSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { createRequire } from 'node:module'
const require = createRequire('D:/projetos/chess/aberturas-portal/package.json')
const { Chess } = require('chess.js')
const sf = spawn('node', [join(tmpdir(), 'stockfish-armadilhas', 'stockfish-19-lite-single.cjs')])
let buf = '', linhas = {}, cb = null
sf.stdout.on('data', (d) => { buf += d; let i; while ((i = buf.indexOf('\n')) >= 0) { const l = buf.slice(0, i).trim(); buf = buf.slice(i + 1)
  const m = l.match(/ multipv (\d+).*? score (cp|mate) (-?\d+)/)
  if (m && !l.includes('bound')) { const s = m[2] === 'cp' ? Number(m[3]) : (Number(m[3]) > 0 ? 1 : -1) * (10000 - Math.abs(Number(m[3]))); linhas[m[1]] = { s, pv: (l.split(' pv ')[1] ?? '').split(' ') } }
  if (process.env.DEPURAR) console.error(l.slice(0, 120))
  if (l.startsWith("bestmove") && cb) { const c = cb; cb = null; c(linhas) } } })
const ir = (fen, depth, multi, busca) => new Promise((r) => { linhas = {}; cb = r
  sf.stdin.write(`setoption name MultiPV value ${multi}\nposition fen ${fen}\ngo depth ${depth}${busca ? ' searchmoves ' + busca : ''}\n`) })
sf.stdin.write('uci\nsetoption name Hash value 128\n')
const pvSan = (fen, pv, n = 8) => { const t = new Chess(fen); const s = []; for (const u of pv.slice(0, n)) { try { s.push(t.move({ from: u.slice(0, 2), to: u.slice(2, 4), promotion: u[4] }).san) } catch { break } } return s.join(' ') }
const p = JSON.parse(readFileSync(process.argv[2], 'utf8')).partidas.find((x) => x.n === Number(process.argv[3]))
const pedidos = process.argv[4].split(',')
const prof = Number(process.argv[5] ?? 18)
const j = new Chess(); const sans = p.lances.split(' ')
for (const [ply, san] of sans.entries()) {
  const rot = `${Math.floor(ply / 2) + 1}${ply % 2 ? '...' : '.'}${san}`
  if (pedidos.includes(rot)) {
    const fen = j.fen(); const sinal = j.turn() === 'w' ? 1 : -1
    const ls = await ir(fen, prof, 3)
    const uci = (() => { const t = new Chess(fen); const m = t.move(san); return m.from + m.to + (m.promotion ?? '') })()
    const jog = await ir(fen, prof, 1, uci)
    console.log(`\n== ${rot}  (avaliação do ponto de vista das brancas, em centipeões)`)
    for (const k of Object.keys(ls).sort()) console.log(`  ${k}. ${String(ls[k].s * sinal).padStart(6)}  ${pvSan(fen, ls[k].pv)}`)
    console.log(`  jogado ${String(jog[1].s * sinal).padStart(6)}  ${pvSan(fen, jog[1].pv)}`)
  }
  j.move(san)
}
sf.stdin.write('quit\n')
