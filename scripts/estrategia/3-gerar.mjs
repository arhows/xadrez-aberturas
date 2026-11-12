// Junta as partidas lidas do livro (2-partidas.mjs) com os textos em português e grava
// data/estrategia/estruturas.json.
// Uso: node scripts/estrategia/3-gerar.mjs <flores-partidas.json>
//
// Passo a passo completo (o PDF não fica no repositório):
//   1. npm i pdfjs-dist@4.10.38 numa pasta à parte e ajuste o caminho no 1-extrair-pdf.mjs
//   2. node 1-extrair-pdf.mjs <livro.pdf> flores.json  → junte os trechos em flores-seg.json
//   3. node 2-partidas.mjs flores-seg.json flores-partidas.json
//   4. node 3-gerar.mjs flores-partidas.json
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { ESTRUTURAS, FAMILIAS, OBJETIVOS } from './textos.mjs'

const partidas = JSON.parse(readFileSync(process.argv[2], 'utf-8'))
const MINIMO_DE_LANCES = 20

const estruturas = ESTRUTURAS.map((e) => {
  const daqui = partidas
    .filter((p) => p.tipo === 'partida' && p.pagina >= e.paginas[0] && p.pagina < e.paginas[1] && p.sans.length >= MINIMO_DE_LANCES)
    .map((p, i) => ({
      n: i + 1,
      brancas: p.brancas,
      pretas: p.pretas,
      evento: p.evento.replace(/\s+/g, ' ').trim(),
      lances: p.sans.join(' '),
      marcas: p.marcas.map((m, k) => (m ? `${k}:${m}` : '')).filter(Boolean).join(' '),
      resultado: p.resultado,
      completa: !p.erro,
      objetivo: OBJETIVOS[p.pagina] ?? '',
    }))
  const { paginas, ...resto } = e
  return { ...resto, partidas: daqui }
})

mkdirSync('data/estrategia', { recursive: true })
writeFileSync(
  'data/estrategia/estruturas.json',
  JSON.stringify({
    fonte: 'Partidas-modelo de "Chess Structures – A Grandmaster Guide", de Mauricio Flores Rios (Quality Chess, 2015). Resumos próprios em português.',
    familias: FAMILIAS,
    estruturas,
  }),
)
const total = estruturas.reduce((s, e) => s + e.partidas.length, 0)
console.log(`${estruturas.length} estruturas, ${total} partidas`)
for (const e of estruturas) console.log(`${e.id}: ${e.partidas.length}`)
const semObjetivo = estruturas.flatMap((e) => e.partidas.filter((p) => !p.objetivo).map((p) => `${e.id} ${p.brancas}`))
if (semObjetivo.length) console.log('sem objetivo:', semObjetivo)
