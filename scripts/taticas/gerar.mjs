// Gera data/taticas/*.json a partir da base de problemas do lichess (CC0):
//   https://database.lichess.org/lichess_db_puzzle.csv.zst
// Uso: node scripts/taticas/gerar.mjs <caminho do .csv (descompactado)>
//
// Para cada tema, escolhe problemas bem avaliados (populares, muito jogados, rating estável)
// em três faixas de dificuldade. A escolha é aleatória mas com semente fixa: rodar de novo
// com a mesma base dá o mesmo resultado.
import { createReadStream, mkdirSync, writeFileSync } from 'node:fs'
import { createInterface } from 'node:readline'
import { createZstdDecompress } from 'node:zlib'
import { Chess } from 'chess.js'

const ARQUIVO = process.argv[2]
if (!ARQUIVO) throw new Error('Informe o caminho do lichess_db_puzzle.csv.zst')

/** Temas na ordem em que aparecem no app (do mais simples ao mais sutil). */
const TEMAS = [
  { id: 'hangingPiece', arquivo: 'peca-desprotegida', nome: 'Peça desprotegida' },
  { id: 'fork', arquivo: 'garfo', nome: 'Garfo' },
  { id: 'pin', arquivo: 'cravada', nome: 'Cravada' },
  { id: 'skewer', arquivo: 'espeto', nome: 'Espeto' },
  { id: 'discoveredAttack', arquivo: 'ataque-descoberto', nome: 'Ataque descoberto' },
  { id: 'doubleCheck', arquivo: 'xeque-duplo', nome: 'Xeque duplo' },
  { id: 'capturingDefender', arquivo: 'remocao-do-defensor', nome: 'Remoção do defensor' },
  { id: 'deflection', arquivo: 'desvio', nome: 'Desvio' },
  { id: 'attraction', arquivo: 'atracao', nome: 'Atração' },
  { id: 'trappedPiece', arquivo: 'peca-presa', nome: 'Peça presa' },
  { id: 'backRankMate', arquivo: 'mate-do-corredor', nome: 'Mate do corredor' },
  { id: 'smotheredMate', arquivo: 'mate-sufocado', nome: 'Mate sufocado' },
  { id: 'advancedPawn', arquivo: 'peao-avancado', nome: 'Peão avançado' },
  { id: 'intermezzo', arquivo: 'lance-intermediario', nome: 'Lance intermediário' },
  { id: 'interference', arquivo: 'interferencia', nome: 'Interferência' },
  { id: 'clearance', arquivo: 'liberacao', nome: 'Liberação de casa ou linha' },
  { id: 'xRayAttack', arquivo: 'raio-x', nome: 'Raio X' },
  { id: 'quietMove', arquivo: 'lance-silencioso', nome: 'Lance silencioso' },
  { id: 'sacrifice', arquivo: 'sacrificio', nome: 'Sacrifício' },
  { id: 'zugzwang', arquivo: 'zugzwang', nome: 'Zugzwang' },
]
const FAIXAS = [
  { nome: 'facil', min: 400, max: 1300 },
  { nome: 'medio', min: 1300, max: 1800 },
  { nome: 'dificil', min: 1800, max: 2500 },
]
const POR_FAIXA = 80
const RESERVATORIO = 600

// PRNG com semente (mulberry32), para a amostra ser reproduzível.
let semente = 20261112
const aleatorio = () => {
  semente |= 0
  semente = (semente + 0x6d2b79f5) | 0
  let t = Math.imul(semente ^ (semente >>> 15), 1 | semente)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

/** reservatorios[tema][faixa] = { vistos, lista } (amostragem uniforme). */
const reservatorios = Object.fromEntries(TEMAS.map((t) => [t.id, FAIXAS.map(() => ({ vistos: 0, lista: [] }))]))

// Aceita o .csv já descompactado (o .zst do lichess começa com um quadro "skippable", que o
// zlib do Node não lê; descompacte antes, por exemplo com o compression.zstd do Python).
const entrada = ARQUIVO.endsWith('.zst') ? createReadStream(ARQUIVO).pipe(createZstdDecompress()) : createReadStream(ARQUIVO)
const linhas = createInterface({ input: entrada, crlfDelay: Infinity })
let total = 0
let cabecalho = true
for await (const linha of linhas) {
  if (cabecalho) {
    cabecalho = false
    continue
  }
  total++
  const [id, fen, lances, rating, desvio, popularidade, jogadas, temas, url] = linha.split(',')
  const r = Number(rating)
  if (Number(popularidade) < 85 || Number(jogadas) < 300 || Number(desvio) > 90) continue
  const faixa = FAIXAS.findIndex((f) => r >= f.min && r < f.max)
  if (faixa < 0) continue
  const listaTemas = temas.split(' ')
  for (const tema of TEMAS) {
    if (!listaTemas.includes(tema.id)) continue
    const res = reservatorios[tema.id][faixa]
    res.vistos++
    const item = { id, fen, lances, rating: r, url, temas: listaTemas }
    if (res.lista.length < RESERVATORIO) res.lista.push(item)
    else {
      const j = Math.floor(aleatorio() * res.vistos)
      if (j < RESERVATORIO) res.lista[j] = item
    }
  }
  if (total % 500000 === 0) console.log(`${total.toLocaleString('pt-BR')} problemas lidos…`)
}
console.log(`Total: ${total.toLocaleString('pt-BR')} problemas.`)
if (total < 100000) throw new Error('A base parece incompleta; nada foi gravado.')

/** UCI → SAN: o 1º lance é do adversário (previo); os seguintes, a solução. */
function converter(item) {
  const jogo = new Chess(item.fen)
  const sans = []
  for (const uci of item.lances.split(' ')) {
    const lance = jogo.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] })
    sans.push(lance.san)
  }
  return { fen: item.fen, previo: sans[0], linha: sans.slice(1) }
}

mkdirSync('data/taticas', { recursive: true })
const usados = new Set()
for (const tema of TEMAS) {
  const problemas = []
  for (const [i, faixa] of FAIXAS.entries()) {
    const candidatos = reservatorios[tema.id][i].lista.filter((p) => !usados.has(p.id))
    // Embaralha (com a semente) e pega os primeiros.
    for (let k = candidatos.length - 1; k > 0; k--) {
      const j = Math.floor(aleatorio() * (k + 1))
      ;[candidatos[k], candidatos[j]] = [candidatos[j], candidatos[k]]
    }
    const escolhidos = candidatos.slice(0, POR_FAIXA).sort((a, b) => a.rating - b.rating)
    for (const p of escolhidos) {
      usados.add(p.id)
      problemas.push({ ...converter(p), rating: p.rating, faixa: faixa.nome, lichess: p.id })
    }
  }
  const numerados = problemas.map((p, i) => ({ n: i + 1, ...p, solucoes: [p.linha[0]] }))
  const conjunto = {
    id: `tatica-${tema.arquivo}`,
    tipo: 'tatica',
    tema: tema.id,
    nome: tema.nome,
    fonte: 'Base de problemas do lichess (CC0), lichess.org',
    livro: 'Táticas, problemas do lichess por tema',
    lances: 0,
    problemas: numerados,
  }
  writeFileSync(`data/taticas/${tema.arquivo}.json`, JSON.stringify(conjunto))
  console.log(`${tema.arquivo}: ${numerados.length} problemas`)
}
