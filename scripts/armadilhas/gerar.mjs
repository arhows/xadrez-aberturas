// Gera data/armadilhas/armadilhas.json com as armadilhas de scripts/armadilhas/armadilhas.mjs
// e as dos capítulos (data/openings/*.json, campo `armadilhas`).
// Para cada uma: confere os lances, calcula com o Stockfish quais lances são uma defesa aceitável
// na posição antes do erro, confere que o erro perde de verdade e que a punição funciona,
// e anota em quais capítulos do livro a posição aparece.
// Uso: node scripts/armadilhas/gerar.mjs [profundidade]   (padrão 14; leva alguns minutos)
import { spawn } from 'node:child_process'
import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Chess } from 'chess.js'
import { ARMADILHAS } from './armadilhas.mjs'

const PROFUNDIDADE = Number(process.argv[2] ?? 14)
/** Uma defesa é aceita se ficar a até MARGEM centipeões do melhor lance. */
const MARGEM = 60
/** O erro precisa perder ao menos isto em relação ao melhor lance, e a punição ganhar ao menos isto. */
const PERDA_MINIMA = 120
const GANHO_MINIMO = 150

// ---------- Stockfish (o mesmo do app, copiado como CommonJS para rodar no Node) ----------
const pasta = join(tmpdir(), 'stockfish-armadilhas')
mkdirSync(pasta, { recursive: true })
copyFileSync('public/stockfish/stockfish-19-lite-single.js', join(pasta, 'stockfish-19-lite-single.cjs'))
copyFileSync('public/stockfish/stockfish-19-lite-single.wasm', join(pasta, 'stockfish-19-lite-single.wasm'))
const sf = spawn('node', [join(pasta, 'stockfish-19-lite-single.cjs')])
let buffer = ''
let espera = null
sf.stdout.on('data', (d) => {
  buffer += d
  let k
  while ((k = buffer.indexOf('\n')) >= 0) {
    const l = buffer.slice(0, k)
    buffer = buffer.slice(k + 1)
    if (espera && l.startsWith('info depth') && l.includes(' score ')) {
      const m = l.match(/score (cp|mate) (-?\d+)/)
      espera.nota = m[1] === 'cp' ? +m[2] : +m[2] > 0 ? 10000 - +m[2] : -10000 - +m[2]
    }
    if (espera && l.startsWith('bestmove')) {
      const e = espera
      espera = null
      e.fim({ nota: e.nota ?? 0, melhor: l.split(' ')[1] })
    }
  }
})
/** Nota do ponto de vista de quem joga na posição. */
const analisar = (fen, lanceUci) =>
  new Promise((fim) => {
    espera = { fim }
    sf.stdin.write(`position fen ${fen}\ngo depth ${PROFUNDIDADE}${lanceUci ? ` searchmoves ${lanceUci}` : ''}\n`)
  })
sf.stdin.write('uci\nsetoption name Hash value 64\n')
await new Promise((r) => setTimeout(r, 1500))

// ---------- Capítulos ----------
const sansDoPgn = (pgn) => pgn.replace(/\d+\.(\.\.)?/g, ' ').split(/\s+/).filter(Boolean)
const capitulos = readdirSync('data/openings')
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(`data/openings/${f}`, 'utf-8')))
const linhasDosCapitulos = capitulos.map((c) => ({
  id: c.id,
  linhas: [...(c.linhas ?? []), ...(c.notas ?? [])].map((l) => sansDoPgn(l.lances).join(' ')),
}))
const capitulosCom = (sans) => {
  const prefixo = sans.join(' ') + ' '
  return linhasDosCapitulos.filter((c) => c.linhas.some((l) => (l + ' ').startsWith(prefixo))).map((c) => c.id)
}

// ---------- Armadilhas ----------
const dosCapitulos = capitulos.flatMap((c) =>
  (c.armadilhas ?? []).map((a) => ({
    id: `${c.id}-${a.id}`,
    nome: a.titulo,
    abertura: c.nome,
    lances: a.lances,
    erro: a.erroNoLance,
    texto: a.texto,
    ideia: '',
    doCapitulo: true,
  })),
)

const avisos = []
const saida = []
for (const a of [...ARMADILHAS, ...dosCapitulos]) {
  const jogo = new Chess()
  const sans = []
  for (const san of sansDoPgn(a.lances)) {
    try {
      sans.push(jogo.move(san).san)
    } catch {
      throw new Error(`${a.id}: lance ilegal ${san} em ${jogo.fen()}`)
    }
  }
  if (!(a.erro >= 1 && a.erro <= sans.length - 1)) throw new Error(`${a.id}: erro fora da sequência`)
  const lado = a.erro % 2 === 1 ? 'b' : 'w' // quem arma é o adversário de quem erra
  const armar = sans.slice(a.erro)
  if (armar.length % 2 === 0) armar.pop()

  const posicoes = [new Chess().fen()]
  const j = new Chess()
  for (const san of sans) {
    j.move(san)
    posicoes.push(j.fen())
  }
  const antes = posicoes[a.erro - 1]
  const depois = posicoes[a.erro]

  // Defesas: todos os lances legais avaliados na posição antes do erro.
  const notas = []
  for (const m of new Chess(antes).moves({ verbose: true })) {
    const { nota } = await analisar(antes, m.from + m.to + (m.promotion ?? ''))
    notas.push({ san: m.san, nota })
  }
  notas.sort((x, y) => y.nota - x.nota)
  const melhor = notas[0].nota
  const doErro = notas.find((n) => n.san === sans[a.erro - 1]).nota
  const defesas = notas.filter((n) => n.nota >= melhor - MARGEM && n.san !== sans[a.erro - 1]).map((n) => n.san)
  const problemas = []
  if (!defesas.length) problemas.push(`nenhuma defesa boa (melhor ${notas[0].san} ${melhor})`)
  if (doErro > melhor - PERDA_MINIMA) problemas.push(`o erro ${sans[a.erro - 1]} (${doErro}) não perde o bastante em relação a ${notas[0].san} (${melhor})`)

  // Punição: o primeiro lance de quem arma deve ganhar.
  const punicao = await analisar(depois)
  const doLivro = await analisar(depois, (() => {
    const m = new Chess(depois).move(armar[0])
    return m.from + m.to + (m.promotion ?? '')
  })())
  if (doLivro.nota < GANHO_MINIMO) problemas.push(`a punição ${armar[0]} só dá ${doLivro.nota} (melhor ${punicao.melhor} ${punicao.nota})`)
  if (problemas.length) {
    // As escritas à mão precisam passar; as dos capítulos que o motor não confirma ficam de fora.
    avisos.push(`${a.id}${a.doCapitulo ? ' (capítulo, descartada)' : ''}: ${problemas.join('; ')}`)
    if (a.doCapitulo) continue
  }

  saida.push({
    id: a.id,
    nome: a.nome,
    abertura: a.abertura,
    lado,
    lances: sans.join(' '),
    erro: a.erro,
    texto: a.texto,
    ...(a.ideia ? { ideia: a.ideia } : {}),
    defesas,
    capitulos: capitulosCom(sans.slice(0, a.erro - 1)),
  })
  console.log(`${a.id}: lado ${lado}, ${defesas.length} defesas (${defesas.slice(0, 5).join(' ')}), erro ${doErro} x melhor ${melhor}, punição ${doLivro.nota}, capítulos ${saida.at(-1).capitulos.join(',') || '-'}`)
}
sf.kill()

mkdirSync('data/armadilhas', { recursive: true })
writeFileSync(
  'data/armadilhas/armadilhas.json',
  JSON.stringify({
    fonte: 'Armadilhas clássicas de abertura e as dos capítulos do MCO; defesas aceitas calculadas com o Stockfish.',
    armadilhas: saida,
  }),
)
console.log(`\n${saida.length} armadilhas gravadas`)
if (avisos.length) console.log('\nAVISOS:\n' + avisos.join('\n'))
