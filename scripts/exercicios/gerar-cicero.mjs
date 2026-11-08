// Gera data/exercicios/cicero-mate-{1,2,3}.json a partir das posições reconhecidas do livro
// 1001 Checkmate Exercises (Sam Cicero, 2018).
//
// Uso: python -I scripts/exercicios/reconhecer-cicero.py   (lê o PDF, ~2 min)
//      node scripts/exercicios/gerar-cicero.mjs [cicero-posicoes.json]
//
// Capítulos do livro: 1-200 mate em 1; 201-300 mate em 1 depois do lance do adversário
// ("Black now played ...Kg8"); 301-600 e 601-800 o mesmo para o mate em 2; 801-900 e
// 901-950 para o mate em 3; 951-1001 mate em 4 (fora daqui: busca funda demais para o app).
//
// Cada posição reconhecida é conferida com o motor: o lance anterior (quando há) precisa ser
// legal e a chave do livro precisa forçar o mate no número de lances do capítulo, sem mate
// mais curto. Um erro de reconhecimento quase nunca passa nessa conferência.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Chess } from 'chess.js'
import { existeMate, forcaMate, melhorDefesa, solucoes } from './motor-mate.mjs'

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const arquivo = process.argv[2] ?? path.join(raiz, 'fotos/exercicios/cicero-posicoes.json')
const posicoes = JSON.parse(fs.readFileSync(arquivo, 'utf8'))

const LIVRO = 'Sam Cicero, 1001 Checkmate Exercises'
const CONJUNTOS = [
  { id: 'cicero-mate-1', nome: 'Mate em 1', lances: 1, primeiro: 1, ultimo: 300 },
  { id: 'cicero-mate-2', nome: 'Mate em 2', lances: 2, primeiro: 301, ultimo: 800 },
  { id: 'cicero-mate-3', nome: 'Mate em 3', lances: 3, primeiro: 801, ultimo: 950 },
]

/** Lance como o livro escreve ("R×e8#", "…Kg8??") em SAN comparável do chess.js. */
const normalizar = (san) => san.replace(/^…/, '').replace(/×/g, 'x').replace(/0-0/g, 'O-O').replace(/[!?]+$/, '')
const semSinais = (san) => san.replace(/[+#x=!?]/g, '')

/** Primeiro lance da solução do livro (o texto pode começar com "White missed 1.Qc7+ ..."). */
function chaveDoLivro(texto) {
  const m = texto.match(/(?:^|[\s(])1(?:\.|…)\s*([^\s,]+)/)
  return m ? normalizar(m[1]) : null
}

/** Roques possíveis pela posição das peças, para chaves como O-O#. */
function roques(tabuleiro) {
  const jogo = new Chess(`${tabuleiro} w - - 0 1`, { skipValidation: true })
  const em = (casa, tipo, cor) => {
    const p = jogo.get(casa)
    return p && p.type === tipo && p.color === cor
  }
  let s = ''
  if (em('e1', 'k', 'w') && em('h1', 'r', 'w')) s += 'K'
  if (em('e1', 'k', 'w') && em('a1', 'r', 'w')) s += 'Q'
  if (em('e8', 'k', 'b') && em('h8', 'r', 'b')) s += 'k'
  if (em('e8', 'k', 'b') && em('a8', 'r', 'b')) s += 'q'
  return s || '-'
}

for (const conjunto of CONJUNTOS) {
  const problemas = []
  const motivos = { fenInvalida: 0, previoIlegal: 0, semChave: 0, chaveIlegal: 0, naoForca: 0, mateCurto: 0 }
  const falhas = []
  for (let n = conjunto.primeiro; n <= conjunto.ultimo; n++) {
    const e = posicoes[n]
    const chaveLivro = chaveDoLivro(e.solucao)
    if (!chaveLivro) {
      motivos.semChave++
      continue
    }
    // Sem lance anterior, o diagrama já é a vez de quem dá o mate.
    const vezDoDiagrama = e.previo ? (e.vez === 'w' ? 'b' : 'w') : e.vez
    let achado = null
    let erro = 'fenInvalida'
    for (const direitos of ['-', roques(e.tabuleiro)]) {
      const fen = `${e.tabuleiro} ${vezDoDiagrama} ${direitos} - 0 1`
      let jogo
      try {
        jogo = new Chess(fen)
      } catch {
        continue
      }
      let previo
      if (e.previo) {
        try {
          previo = jogo.move(normalizar(e.previo)).san
        } catch {
          erro = 'previoIlegal'
          continue
        }
      }
      const chave = jogo.moves().find((san) => semSinais(san) === semSinais(chaveLivro))
      if (!chave) {
        erro = 'chaveIlegal'
        continue
      }
      achado = { fen, previo, jogo, chave }
      break
    }
    if (!achado) {
      motivos[erro]++
      falhas.push(`n.º ${n}: ${erro} (${e.tabuleiro}, livro ${chaveLivro})`)
      continue
    }
    const { fen, previo, jogo, chave } = achado
    if (conjunto.lances > 1 && existeMate(jogo, conjunto.lances - 1)) {
      motivos.mateCurto++
      continue
    }
    let lista
    if (conjunto.lances < 3) {
      lista = solucoes(jogo.fen(), conjunto.lances)
      if (!lista.includes(chave)) lista = []
    } else {
      lista = forcaMate(jogo, chave, 3) ? [chave] : []
    }
    if (!lista.length) {
      motivos.naoForca++
      falhas.push(`n.º ${n}: ${chave} não força mate em ${conjunto.lances}`)
      continue
    }
    const problema = { n, fen, solucoes: lista }
    if (previo) problema.previo = previo
    if (conjunto.lances === 3) {
      jogo.move(chave)
      problema.defesa = melhorDefesa(jogo)
    }
    problema.partida = e.partida
    problemas.push(problema)
  }

  const saida = {
    id: conjunto.id,
    nome: conjunto.nome,
    livro: LIVRO,
    fonte: `${LIVRO} (2018), exercícios ${conjunto.primeiro}–${conjunto.ultimo}`,
    lances: conjunto.lances,
    problemas,
  }
  const destino = path.join(raiz, `data/exercicios/${conjunto.id}.json`)
  fs.writeFileSync(destino, JSON.stringify(saida, null, 1) + '\n')
  const total = conjunto.ultimo - conjunto.primeiro + 1
  const comPrevio = problemas.filter((p) => p.previo).length
  console.log(`${conjunto.nome}: ${problemas.length} de ${total} gravados em ${path.relative(raiz, destino)}`)
  console.log(`  com lance anterior do adversário: ${comPrevio}; ${JSON.stringify(motivos)}`)
  for (const f of falhas) console.log(`  ${f}`)
}
