// Gera data/exercicios/polgar-mate-1.json a partir do Markdown do livro de László Polgár
// (5334 Problems, Combinations & Games), que fica em fotos/exercicios/ (fora do git).
//
// Uso: node scripts/exercicios/gerar-polgar.mjs [caminho-do-md]
//
// Os diagramas vêm numa fonte de xadrez: cada casa é uma letra. Casa vazia = "0" ou "Z";
// peça em casa clara = p n b r q k, em casa escura = o m a s l j (minúscula = pretas,
// maiúscula = brancas). Cada página tem 6 diagramas em duas colunas (1-3 à esquerda,
// 4-6 à direita); o Markdown os junta em pares lado a lado, e o número de cada par
// aparece logo antes dele (o do primeiro par se perde no cabeçalho da página).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Chess } from 'chess.js'

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const arquivo =
  process.argv[2] ??
  path.join(raiz, 'fotos/exercicios/pdfcoffee.com_5334-problems-combinations-and-games-laszlo-polgar-pdf-free.md')

const PECAS = { p: 'p', o: 'p', n: 'n', m: 'n', b: 'b', a: 'b', r: 'r', s: 'r', q: 'q', l: 'q', k: 'k', j: 'k' }
const TOTAL = 306

const linhas = fs.readFileSync(arquivo, 'utf8').split(/\r?\n/)
const inicio = linhas.findIndex((l) => /^Chapter 1\s*$/.test(l))
const fim = linhas.findIndex((l, i) => i > inicio && /^# Chapter 2/.test(l))
if (inicio < 0 || fim < 0) throw new Error('Capítulo 1 não encontrado no Markdown')

/** Diagramas na ordem do Markdown, com o rótulo numérico que vier antes do par. */
const pares = []
let atual = null
let rotulos = null
for (const linha of linhas.slice(inicio, fim)) {
  const rotulo = linha.match(/^\|\s*\|\s*(\d+)\s*\|\s*\|\s*(\d+)\s*\|/)
  if (rotulo) {
    rotulos = [+rotulo[1], +rotulo[2]]
    continue
  }
  const m = linha.match(/^\|\s*([1-8])\s*\|\s*([0-9A-Za-z]{8})[^|]*\|\s*([1-8])\s*\|\s*([0-9A-Za-z]{8})/)
  if (!m) continue
  if (m[1] === '8') atual = { esquerda: [], direita: [], rotulos, }
  rotulos = m[1] === '8' ? null : rotulos
  atual.esquerda.push(m[2])
  atual.direita.push(m[4])
  if (m[1] === '1') pares.push(atual)
}
if (pares.length * 2 !== TOTAL) throw new Error(`Esperava ${TOTAL / 2} pares, achei ${pares.length}`)

function posicao(fileiras) {
  return fileiras
    .map((fileira) => {
      let saida = ''
      let vazias = 0
      for (const c of fileira) {
        const peca = PECAS[c.toLowerCase()]
        if (!peca) {
          if (c !== '0' && c !== 'Z') throw new Error(`Caractere inesperado "${c}" em ${fileira}`)
          vazias++
          continue
        }
        if (vazias) saida += vazias
        vazias = 0
        saida += c === c.toLowerCase() ? peca : peca.toUpperCase()
      }
      return saida + (vazias || '')
    })
    .join('/')
}

/** Roques possíveis pela posição das peças (rei e torre nas casas iniciais). */
function roques(tabuleiro) {
  const casas = new Chess(`${tabuleiro} w - - 0 1`)
  const em = (casa, peca) => {
    const p = casas.get(casa)
    return p && (p.color === 'w' ? p.type.toUpperCase() : p.type) === peca
  }
  let s = ''
  if (em('e1', 'K') && em('h1', 'R')) s += 'K'
  if (em('e1', 'K') && em('a1', 'R')) s += 'Q'
  if (em('e8', 'k') && em('h8', 'r')) s += 'k'
  if (em('e8', 'k') && em('a8', 'r')) s += 'q'
  return s || '-'
}

/** Casas de en passant possíveis: peão adversário que pode ter acabado de avançar duas casas. */
function casasEnPassant(tabuleiro, vez) {
  const jogo = new Chess(`${tabuleiro} w - - 0 1`)
  const [fileira, origem, passagem, meu] = vez === 'w' ? ['5', '7', '6', 'w'] : ['4', '2', '3', 'b']
  const casas = []
  for (const coluna of 'abcdefgh') {
    const peao = jogo.get(coluna + fileira)
    if (!peao || peao.type !== 'p' || peao.color === meu) continue
    if (jogo.get(coluna + origem) || jogo.get(coluna + passagem)) continue
    const vizinhos = [-1, 1].map((d) => String.fromCharCode(coluna.charCodeAt(0) + d) + fileira)
    if (vizinhos.some((c) => jogo.get(c)?.type === 'p' && jogo.get(c)?.color === meu)) {
      casas.push(coluna + passagem)
    }
  }
  return casas
}

/** FENs candidatas: primeiro sem roque nem en passant; depois com os que a posição permitir. */
function candidatas(tabuleiro, vez) {
  const r = roques(tabuleiro)
  const lista = [`${tabuleiro} ${vez} - - 0 1`]
  if (r !== '-') lista.push(`${tabuleiro} ${vez} ${r} - 0 1`)
  for (const ep of casasEnPassant(tabuleiro, vez)) lista.push(`${tabuleiro} ${vez} - ${ep} 0 1`)
  return lista
}

/** Lances que dão mate imediato na posição. */
function mates(fen) {
  let jogo
  try {
    jogo = new Chess(fen)
  } catch {
    return []
  }
  return jogo.moves().filter((lance) => {
    jogo.move(lance)
    const mate = jogo.isCheckmate()
    jogo.undo()
    return mate
  })
}

const problemas = []
const descartados = []
pares.forEach((par, i) => {
  const pagina = Math.floor(i / 3)
  const linha = i % 3
  const numeros = [pagina * 6 + 1 + linha, pagina * 6 + 4 + linha]
  if (par.rotulos && par.rotulos.join() !== numeros.join()) {
    throw new Error(`Numeração fora de ordem: par ${i} deveria ser ${numeros}, livro diz ${par.rotulos}`)
  }
  ;[par.esquerda, par.direita].forEach((fileiras, lado) => {
    const n = numeros[lado]
    const tabuleiro = posicao(fileiras)
    // O livro não diz de quem é a vez; vale o lado que tem mate (brancas, se ambos têm).
    for (const vez of ['w', 'b']) {
      for (const fen of candidatas(tabuleiro, vez)) {
        const solucoes = mates(fen)
        if (solucoes.length) {
          problemas.push({ n, fen, solucoes })
          return
        }
      }
    }
    descartados.push({ n, fen: tabuleiro })
  })
})
problemas.sort((a, b) => a.n - b.n)

const saida = {
  id: 'polgar-mate-1',
  nome: 'Mate em 1',
  fonte: 'László Polgár, 5334 Problems, Combinations & Games, cap. 1',
  lances: 1,
  problemas,
}
const destino = path.join(raiz, 'data/exercicios/polgar-mate-1.json')
fs.writeFileSync(destino, JSON.stringify(saida, null, 1) + '\n')

const pretas = problemas.filter((p) => p.fen.includes(' b ')).length
const varias = problemas.filter((p) => p.solucoes.length > 1).length
console.log(`${problemas.length} problemas gravados em ${path.relative(raiz, destino)}`)
console.log(`  pretas jogam: ${pretas}; com mais de uma solução: ${varias}`)
for (const d of descartados) console.log(`  descartado n.º ${d.n} (sem mate em 1 ou posição ilegal): ${d.fen}`)
