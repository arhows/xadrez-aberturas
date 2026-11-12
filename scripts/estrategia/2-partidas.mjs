// Monta as partidas do Chess Structures a partir dos trechos (negrito = linha principal).
// Uso: node partidas.mjs <flores-seg.json> <saida.json>
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire('D:/projetos/chess/aberturas-portal/package.json')
const { Chess } = require('chess.js')

const [entrada, saida] = process.argv.slice(2)
const seg = JSON.parse(readFileSync(entrada, 'utf-8'))

const CABECALHO = /^\s*([A-Z][\p{L}.'\- ]+?)\s+–\s+([A-Z][\p{L}.'\- ]+?)\s*$/u
const partidas = []
let atual = null
for (let i = 0; i < seg.length; i++) {
  const s = seg[i]
  const texto = s.t.replace(/\s+/g, ' ')
  const cab = s.b && texto.match(CABECALHO)
  const seguinte = seg.slice(i + 1, i + 4).map((x) => x.t).join(' ')
  if (cab && /Learning objective/i.test(seguinte)) {
    atual = { brancas: cab[1].trim(), pretas: cab[2].trim(), pagina: s.p, principal: '', comentarios: [], evento: '' }
    partidas.push(atual)
    continue
  }
  if (!atual) continue
  if (!atual.evento && !s.b && texto.trim()) atual.evento = texto.trim().split(/Learning objective/i)[0].trim().slice(0, 80)
  if (s.b) {
    if (/Learning objective|Final Remarks/i.test(texto) && !/\d\./.test(texto)) continue
    atual.principal += ' ' + texto.replace(/Final Remarks.*$/i, '')
  } else atual.comentarios.push({ depois: atual.principal.length, t: texto })
}

const RESULTADO = /(1–0|0–1|½–½|1-0|0-1)/
function lerLances(texto) {
  // Separa número, lance e marcas: "12...Na5!" "13.Bc2" "Nc4"
  const limpo = texto
    .replace(/[†‡]/g, '+')
    .replace(/0-0-0|O-O-O/g, 'O-O-O')
    .replace(/0-0|O-O/g, 'O-O')
  const tokens = limpo.match(/(\d+)\.(\.\.)?|[KQRBN]?[a-h]?[1-8]?x?[a-h][1-8](=[QRBN])?\+?#?(!!|!\?|\?!|\?\?|!|\?)?|O-O(-O)?\+?(!!|!\?|\?!|\?\?|!|\?)?|1–0|0–1|½–½/g) ?? []
  return tokens
}

function tentar(jogo, san) {
  try {
    return jogo.move(san)
  } catch {
    return null
  }
}
let reparos = 0
function buscarReparo(jogo, texto, falhou) {
  const ply = jogo.history().length
  const numero = Math.floor(ply / 2) + 1
  const rotulo = ply % 2 === 0 ? `${numero}\.` : `${numero}\.\.\.`
  const re = new RegExp(`(?:^|[^0-9.])${rotulo}\s*([KQRBN]?[a-h]?[1-8]?x?[a-h][1-8](=[QRBN])?|O-O(-O)?|0-0(-0)?)`, 'g')
  for (const m of texto.matchAll(re)) {
    const candidato = m[1].replace(/0/g, 'O')
    const copia = new Chess(jogo.fen())
    if (!tentar(copia, candidato)) continue
    if (tentar(copia, falhou)) {
      jogo.move(candidato)
      return jogo.history().at(-1)
    }
  }
  return null
}
const resultado = []
for (const p of partidas) {
  const tokens = lerLances(p.principal)
  const primeiroNumero = tokens.find((t) => /^\d+\./.test(t))
  const jogo = new Chess()
  const sans = []
  const marcas = []
  let fim = '*'
  let erro = null
  if (primeiroNumero !== '1.') {
    resultado.push({ ...p, tipo: 'fragmento', inicio: primeiroNumero, sans: [], comentarios: undefined })
    continue
  }
  for (const t of tokens) {
    if (/^\d+\./.test(t)) continue
    if (RESULTADO.test(t)) {
      fim = t.replace('-', '–')
      break
    }
    const marca = t.match(/(!!|!\?|\?!|\?\?|!|\?)$/)?.[1] ?? ''
    const san = t.replace(/(!!|!\?|\?!|\?\?|!|\?)$/, '')
    let m = tentar(jogo, san)
    if (!m) {
      // Reparo: falta um lance da linha principal (saiu em fonte normal). Procura nos
      // comentários da partida o lance com o número esperado que torna este legal.
      const reparo = buscarReparo(jogo, p.comentarios.map((c) => c.t).join(' '), san)
      if (reparo) {
        sans.push(reparo)
        marcas.push('')
        reparos++
        m = tentar(jogo, san)
      }
    }
    if (!m) {
      erro = `lance ${Math.floor(sans.length / 2) + 1}${sans.length % 2 ? '...' : '.'}${san} ilegal`
      break
    }
    sans.push(m.san)
    marcas.push(marca)
  }
  resultado.push({ brancas: p.brancas, pretas: p.pretas, evento: p.evento, pagina: p.pagina, tipo: 'partida', sans, marcas, resultado: fim, erro })
}
writeFileSync(saida, JSON.stringify(resultado, null, 1))
const completas = resultado.filter((r) => r.tipo === 'partida')
console.log(`reparos: ${reparos}`)
console.log(`${partidas.length} partidas/fragmentos; ${completas.length} completas desde o 1º lance; ${completas.filter((r) => r.erro).length} com erro`)
for (const r of resultado) console.log(r.pagina, r.tipo === 'partida' ? `${r.sans.length} meios-lances ${r.resultado}${r.erro ? ' ERRO ' + r.erro : ''}` : `fragmento desde ${r.inicio}`, '|', r.brancas, '–', r.pretas, '|', r.evento)
