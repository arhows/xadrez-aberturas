// Uso: node conferir.mjs livro.txt Anand.pgn saida.json
// Para cada partida do livro (cabeçalho "Brancas / Pretas / abertura / N: evento, ano"),
// acha no PGN Mentor a partida entre os mesmos jogadores no mesmo ano e confere se cada
// lance aparece no texto da seção, na ordem. O texto do PDF tem erros de leitura (cS = c5).
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire('D:/projetos/chess/aberturas-portal/package.json')
const { Chess } = require('chess.js')
const L = readFileSync(process.argv[2], 'utf8').split('\n')
const pgn = readFileSync(process.argv[3], 'latin1')
const nome = (s) => s.replace(/^[DO•\s]+/, '').replace(/^l/, 'I').trim()
const cab = []
L.forEach((l, i) => {
  if (i < 700) return
  const t = l.trim()
  if (/^(D|O)\s*[A-Za-z][A-Za-z\. ]+,[A-Z]\.?$/.test(t) || /^(D|O)\s*Anand,V$/.test(t)) {
    const linhas = L.slice(i, i + 8).map((x) => x.trim()).filter(Boolean)
    const m = linhas[3]?.match(/^(\d+)\s*:\s*(.*?)(\d{4})/)
    if (m) cab.push({ i, n: Number(m[1]), w: nome(linhas[0]), b: nome(linhas[1]), ab: linhas[2], ev: m[2].replace(/[,\s]+$/, ''), ano: m[3] })
  }
})
// No livro a numeração do cabeçalho começa em 1 e pula a 3 (Ivanchuk); usa a ordem do sumário
cab.forEach((c, k) => { c.jogo = k + 1 })
// Remove variantes entre colchetes e parênteses: fica só a linha principal
const semVariantes = (s) => { let out = '', prof = 0; for (const ch of s) { if (ch === '[' || ch === '(') prof++; else if (ch === ']' || ch === ')') prof = Math.max(0, prof - 1); else if (prof === 0) out += ch } return out }
const norm = (s) => s
  .replace(/(^|\s)S\s*\./g, '$1' + '5.').replace(/(^|\s)G\s*\./g, '$1' + '6.')
  .replace(/([a-h])S/g, '$1' + '5').replace(/([a-h])G/g, '$1' + '6').replace(/([a-h])s(?=[\s+#.,;)!?]|$)/g, '$1' + '5')
  .replace(/([a-h])l(?=[\s+#.,;)!?=]|$)/g, '$1' + '1').replace(/(^|\s)l(\d)/g, '$1' + '1$2').replace(/(\d)l/g, '$1' + '1')
  .replace(/(\d)\s*\.\s*\.\s*\.\s*/g, '$1...').replace(/(\d)\s*\.\s*(?!\.)/g, '$1.').replace(/0-0-0/g, 'O-O-O').replace(/0-0/g, 'O-O')
  .replace(/[!?]+/g, '').replace(/\s+/g, ' ')
const blocos = pgn.split(/\r?\n\r?\n(?=\[Event )/)
const tag = (b, t) => { const i = b.indexOf('[' + t + ' "'); if (i < 0) return ''; const j = i + t.length + 3; return b.slice(j, b.indexOf('"', j)) }
const sobren = (s) => s.split(',')[0].split(' ')[0]
const saida = {}
cab.forEach((c, k) => {
  const fim = cab[k + 1]?.i ?? L.length
  const texto = ' ' + norm(L.slice(c.i, fim).join(' '))
  const sw = sobren(c.w), sb = sobren(c.b)
  const cand = blocos.filter((b) => tag(b, 'White').includes(sw) && tag(b, 'Black').includes(sb) && Math.abs(Number(tag(b, 'Date').slice(0, 4)) - Number(c.ano)) <= 1)
  const res = []
  for (const b of cand) {
    const ch = new Chess(); try { ch.loadPgn(b) } catch { continue }
    const sans = ch.history()
    let pos = 0, achados = 0, falta = null; const faltas = []
    sans.forEach((san, ply) => {
      const num = Math.floor(ply / 2) + 1
      const alvos = ply % 2 === 0 ? [` ${num}.${san}`] : [` ${num}...${san}`, ` ${num}.${sans[ply - 1]} ${san}`]
      let i = -1
      for (const a of alvos) { const j = texto.indexOf(a, Math.max(0, pos - 60)); if (j >= 0 && (i < 0 || j < i)) i = j }
      if (i >= 0) { achados++; pos = i } else { faltas.push(`${num}${ply % 2 ? '...' : '.'}${san}`); if (falta === null) falta = faltas[0] }
    })
    res.push({ w: tag(b, 'White'), b: tag(b, 'Black'), ev: tag(b, 'Event'), d: tag(b, 'Date'), r: tag(b, 'Result'), total: sans.length, achados, falta, faltas, lances: sans.join(' ') })
  }
  res.sort((a, b) => b.achados / b.total - a.achados / a.total)
  const m = res[0]
  console.log(`${c.jogo}. ${c.w} - ${c.b}, ${c.ev} ${c.ano} (${c.ab})`)
  if (!m) { console.log('   sem candidata no PGN Mentor'); return }
  console.log(`   PGN Mentor: ${m.w} - ${m.b} ${m.r} ${m.d}; ${m.achados}/${m.total}${m.falta ? '; primeiro não achado: ' + m.falta : ''}`)
  if (m.faltas.length && m.faltas.length < 25) console.log('   faltam: ' + m.faltas.join(' '))
  saida[c.jogo] = { ...c, ...m }
})
writeFileSync(process.argv[4], JSON.stringify(saida, null, 1))
