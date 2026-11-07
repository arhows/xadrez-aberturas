// Gera data/engine/<capítulo>.json com o melhor lance e a avaliação do Stockfish
// para cada posição dos capítulos. Rode de novo sempre que um capítulo mudar.
//
// Uso: node scripts/motor.cjs <caminho do stockfish> [nós por posição]
// Entradas marcadas com "profundo" (análises longas feitas à parte) são mantidas
// enquanto a posição continuar existindo no capítulo.
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const { Chess } = require('chess.js')

const [binario, nosArg] = process.argv.slice(2)
if (!binario) {
  console.error('Uso: node scripts/motor.cjs <caminho do stockfish> [nós por posição]')
  process.exit(1)
}
const NOS = Number(nosArg ?? 500000)
const raiz = path.join(__dirname, '..')

const motor = spawn(binario, [], { stdio: ['pipe', 'pipe', 'ignore'] })
let buffer = ''
let score = null
let aoTerminar = null
motor.stdout.on('data', (d) => {
  buffer += d
  let i
  while ((i = buffer.indexOf('\n')) >= 0) {
    const linha = buffer.slice(0, i).trim()
    buffer = buffer.slice(i + 1)
    const m = linha.match(/ score (cp|mate) (-?\d+)/)
    if (m && !/bound/.test(linha)) {
      score = m[1] === 'cp' ? Number(m[2]) : Math.sign(Number(m[2])) * (20000 - Math.abs(Number(m[2])))
    }
    if (linha.startsWith('bestmove')) {
      const cb = aoTerminar
      aoTerminar = null
      cb({ score, best: linha.split(' ')[1] })
    }
  }
})
const enviar = (t) => motor.stdin.write(t + '\n')
const avaliar = (fen) =>
  new Promise((res) => {
    score = null
    aoTerminar = res
    enviar(`position fen ${fen}`)
    enviar(`go nodes ${NOS}`)
  })

const chave = (fen) => fen.split(' ').slice(0, 4).join(' ')
const tokens = (t) => t.split(/\s+/).filter((x) => !/^\d+\.+$/.test(x))

async function principal() {
  enviar('uci')
  enviar('setoption name Threads value 3')
  enviar('setoption name Hash value 512')
  const dirDados = path.join(raiz, 'data/openings')
  const dirMotor = path.join(raiz, 'data/engine')
  fs.mkdirSync(dirMotor, { recursive: true })

  for (const arquivo of fs.readdirSync(dirDados).filter((f) => f.endsWith('.json'))) {
    const d = JSON.parse(fs.readFileSync(path.join(dirDados, arquivo), 'utf8'))
    const destino = path.join(dirMotor, `${d.id}.json`)
    const anterior = fs.existsSync(destino) ? JSON.parse(fs.readFileSync(destino, 'utf8')).posicoes : {}

    const posicoes = new Map()
    for (const u of [...d.linhas, ...(d.notas ?? [])]) {
      const c = new Chess()
      posicoes.set(chave(c.fen()), c.fen())
      for (const t of tokens(u.lances)) {
        c.move(t)
        posicoes.set(chave(c.fen()), c.fen())
      }
    }

    const saida = {}
    let n = 0
    for (const [k, fen] of posicoes) {
      if (anterior[k]?.profundo) {
        saida[k] = anterior[k]
        continue
      }
      const c = new Chess(fen)
      if (c.isGameOver()) continue
      const r = await avaliar(fen)
      const pretas = fen.split(' ')[1] === 'b'
      const lance = c.move({ from: r.best.slice(0, 2), to: r.best.slice(2, 4), promotion: r.best[4] }).san
      saida[k] = { lance, cp: pretas ? -r.score : r.score }
      if (++n % 200 === 0) console.log(`${d.id}: ${n}/${posicoes.size}`)
    }
    fs.writeFileSync(destino, JSON.stringify({ motor: 'Stockfish 19', nos: NOS, posicoes: saida }) + '\n')
    console.log(`${d.id}: ${Object.keys(saida).length} posições`)
  }
  enviar('quit')
}

principal().catch((e) => {
  console.error(e)
  process.exit(1)
})
