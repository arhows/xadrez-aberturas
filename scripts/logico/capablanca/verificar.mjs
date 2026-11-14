// Confere no tabuleiro as afirmações concretas das notas: "ataca o bispo de e5", "com xeque",
// "come o peão d4", "crava o cavalo de d4", "a torre de h8"... Uso:
//   node scripts/logico/capablanca/verificar.mjs data/logico/capablanca.json [lote.json]
// Com um lote, confere as notas do lote contra os lances do arquivo de dados.
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const { Chess } = require('chess.js')
const dados = JSON.parse(readFileSync(process.argv[2], 'utf8')).partidas
const lote = process.argv[3] ? JSON.parse(readFileSync(process.argv[3], 'utf8')) : null
const PECA = { peão: 'p', cavalo: 'n', bispo: 'b', torre: 'r', dama: 'q', rei: 'k' }
let problemas = 0
for (const p of dados) {
  const notas = lote ? lote[p.n]?.notas : p.notas
  if (!notas) continue
  const j = new Chess()
  p.lances.split(' ').forEach((san, ply) => {
    const rot = `${Math.floor(ply / 2) + 1}${ply % 2 ? '...' : '.'}${san}`
    const antes = new Chess(j.fen())
    const m = j.move(san)
    const nota = notas[rot]
    if (!nota) return
    const texto = (nota.texto + ' ' + (nota.alternativa ?? '')).toLowerCase()
    const so = nota.texto.toLowerCase()
    const erro = (msg) => { problemas++; console.log(`partida ${p.n} ${rot}: ${msg}`) }
    const lado = m.color, outro = lado === 'w' ? 'b' : 'w'
    // xeque
    if (/(com xeque|^xeque|dá xeque|mais um xeque)/.test(so) && !j.inCheck()) erro('diz xeque, mas o lance não dá xeque')
    // ataca/atacando <peça> de|em <casa>  (só no texto da nota, que fala do lance jogado)
    for (const r of so.matchAll(/(?:ataca|atacando|ameaça)\s+(?:o|a|os|as)\s+(peão|cavalo|bispo|torre|dama|rei)\s+(?:de|em)\s+([a-h][1-8])/g)) {
      const [, nome, casa] = r
      const x = j.get(casa)
      if (!x || x.color !== outro || x.type !== PECA[nome]) erro(`diz que ataca ${nome} em ${casa}, mas lá tem ${x ? x.color + x.type : 'nada'}`)
      else if (!j.isAttacked(casa, lado)) erro(`diz que ataca ${nome} em ${casa}, mas a casa não está atacada`)
    }
    // come o (peão) <casa>
    for (const r of so.matchAll(/come (?:o|a) (?:peão |cavalo |bispo |torre |dama )?([a-h][1-8])/g)) {
      if (m.to !== r[1] || !m.captured) erro(`diz que come em ${r[1]}, mas o lance é ${m.san}`)
    }
    // <peça> de <casa> (menções a peças em casas): conferir antes ou depois do lance
    for (const r of texto.matchAll(/(?:o|a)\s+(peão|cavalo|bispo|torre|dama|rei)\s+(?:de|em)\s+([a-h][1-8])/g)) {
      const [, nome, casa] = r
      const tem = (pos) => { const x = pos.get(casa); return x && x.type === PECA[nome] }
      if (!tem(antes) && !tem(j)) erro(`menciona ${nome} em ${casa}, mas não há ${nome} lá (antes nem depois)`)
    }
    // peão <casa> (ex.: "o peão g3")
    for (const r of texto.matchAll(/peão ([a-h][1-8])/g)) {
      const casa = r[1]; const t = (pos) => pos.get(casa)?.type === 'p'
      if (!t(antes) && !t(j)) erro(`menciona o peão ${casa}, mas não há peão lá`)
    }
  })
}
console.log(problemas ? `${problemas} afirmação(ões) a revisar` : 'nenhum problema encontrado')
