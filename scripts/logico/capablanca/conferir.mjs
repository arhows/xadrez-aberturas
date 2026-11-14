// Uso: node conferir.mjs livro.txt Capablanca.pgn "1:Corzo:1901,3:Bernstein:1911" saida.json
// Para cada partida do livro, acha no PGN Mentor a partida de Capablanca contra o adversário no ano,
// e confere se cada lance (com o número) aparece no texto da seção, na ordem.
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire('D:/projetos/chess/aberturas-portal/package.json')
const { Chess } = require('chess.js')
const L = readFileSync(process.argv[2], 'latin1').split('\n')
const pgn = readFileSync(process.argv[3], 'latin1')
const pedidos = process.argv[4].split(',').map((x) => { const [n, adv, ano] = x.split(':'); return { n: Number(n), adv, ano } })
const inicio = {}
L.forEach((l, i) => { const m = l.trim().match(/^Game\s+(\d+)$/); if (m && !(m[1] in inicio)) inicio[m[1]] = i })
const nums = Object.keys(inicio).map(Number).sort((a, b) => a - b)
const blocos = pgn.split(/\r?\n\r?\n(?=\[Event )/)
const tag = (b, t) => { const i = b.indexOf('[' + t + ' "'); if (i < 0) return ''; const j = i + t.length + 3; return b.slice(j, b.indexOf('"', j)) }
const saida = {}
for (const { n, adv, ano } of pedidos) {
  const ini = inicio[n], fim = inicio[nums[nums.indexOf(n) + 1]] ?? L.length
  const texto = L.slice(ini, fim).join(' ').replace(/[!?]+/g, '').replace(/\s+/g, ' ')
  const candidatos = blocos.filter((b) => (tag(b, 'White') + tag(b, 'Black')).includes(adv) && tag(b, 'Date').startsWith(ano))
  const resultados = []
  for (const b of candidatos) {
    const c = new Chess(); try { c.loadPgn(b) } catch { continue }
    const sans = c.history()
    let pos = 0, achados = 0, primeiraFalta = null
    sans.forEach((sanOrig, ply) => {
      const san = sanOrig.replace(/O/g, '0')
      const num = Math.floor(ply / 2) + 1
      const alvo = ply % 2 === 0 ? `${num} ${san}` : `${num} ... ${san}`
      const alvo2 = ply % 2 === 0 ? null : ` ${san}` // lance preto logo depois do branco, na mesma linha
      let i = texto.indexOf(alvo, pos)
      if (i < 0 && alvo2) { const w = `${num} ${sans[ply - 1].replace(/O/g, '0')} ${san}`; i = texto.indexOf(w, Math.max(0, pos - 40)) }
      if (i >= 0) { achados++; pos = i } else if (primeiraFalta === null) primeiraFalta = `${num}${ply % 2 ? '...' : '.'}${san}`
    })
    resultados.push({ w: tag(b, 'White'), b: tag(b, 'Black'), r: tag(b, 'Result'), total: sans.length, achados, primeiraFalta, sans })
  }
  resultados.sort((a, b) => b.achados / b.total - a.achados / a.total)
  const m = resultados[0]
  console.log(`Partida ${n}: ${L[ini + 1].trim()} | ${L[ini + 2].trim()}`)
  if (!m) { console.log('  sem candidata no PGN Mentor'); continue }
  console.log(`  PGN Mentor: ${m.w} - ${m.b} ${m.r}; ${m.achados}/${m.total} lances achados no livro${m.primeiraFalta ? `; primeiro não achado: ${m.primeiraFalta}` : ''}`)
  saida[n] = m
}
writeFileSync(process.argv[5], JSON.stringify(saida))
