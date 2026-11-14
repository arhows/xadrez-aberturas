// Lance a lance (Chernev): para cada lance do vencedor de uma partida de data/logico/partidas.json,
// mostra a ameaça (o que ele jogaria de novo se pudesse) e a melhor resposta do adversário,
// além da avaliação. Serve de base para escrever as explicações (sempre com texto próprio).
//
// Uso (na raiz do projeto): node scripts/logico/ameacas.mjs <número da partida>
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const { Chess } = require('chess.js')
// O Stockfish do app (WASM) roda no node como .cjs, ao lado do .wasm.
const pasta = join(tmpdir(), 'stockfish-logico')
mkdirSync(pasta, { recursive: true })
copyFileSync('public/stockfish/stockfish-19-lite-single.js', join(pasta, 'stockfish-19-lite-single.cjs'))
copyFileSync('public/stockfish/stockfish-19-lite-single.wasm', join(pasta, 'stockfish-19-lite-single.wasm'))
const sf = spawn('node', [join(pasta, 'stockfish-19-lite-single.cjs')])
let buf = '', score = null, pv = [], cb = null
sf.stdout.on('data', (d) => { buf += d; let i; while ((i = buf.indexOf('\n')) >= 0) { const l = buf.slice(0, i).trim(); buf = buf.slice(i + 1)
  const m = l.match(/ score (cp|mate) (-?\d+)/); if (m && !/bound/.test(l)) { score = m[1] === 'cp' ? m[2] : '#' + m[2]; pv = (l.split(' pv ')[1] ?? '').split(' ') }
  if (l.startsWith('bestmove')) { const c = cb; cb = null; c({ score, pv }) } } })
const ir = (fen, depth) => new Promise((r) => { score = null; pv = []; cb = r; sf.stdin.write(`position fen ${fen}\ngo depth ${depth}\n`) })
sf.stdin.write('uci\nsetoption name Hash value 64\n')
const pvSan = (fen, pv, n = 5) => { const t = new Chess(fen); const s = []; for (const u of pv.slice(0, n)) { try { s.push(t.move({ from: u.slice(0,2), to: u.slice(2,4), promotion: u[4] }).san) } catch { break } } return s.join(' ') }
const n = Number(process.argv[2])
const partida = JSON.parse(readFileSync('data/logico/partidas.json', 'utf8')).partidas.find((p) => p.n === n)
const sans = partida.lances.split(' ')
const lado = partida.resultado === '0-1' ? 'b' : 'w'
const j = new Chess()
for (let k = 0; k < sans.length; k++) {
  const vez = j.turn(); j.move(sans[k])
  if (vez !== lado || j.isGameOver()) continue
  const label = `${Math.floor(k/2)+1}${k%2?'...':'.'}${sans[k]}`
  let ameaca = '-'
  if (!j.inCheck()) {
    const p = j.fen().split(' '); p[1] = lado; p[3] = '-'
    try { const fen = p.join(' '); new Chess(fen); const r = await ir(fen, 12); ameaca = `${pvSan(fen, r.pv, 3)} (${r.score})` } catch { ameaca = '?' }
  }
  const r2 = await ir(j.fen(), 14)
  console.log(`${label.padEnd(12)} ameaça: ${ameaca.padEnd(34)} resposta: ${pvSan(j.fen(), r2.pv, 4)}`)
}
sf.kill()
