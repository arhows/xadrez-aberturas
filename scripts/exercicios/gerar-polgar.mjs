// Gera os exercícios de mate de data/exercicios/ a partir do PDF do livro de László Polgár
// (5334 Problems, Combinations & Games), que fica em fotos/exercicios/ (fora do git).
//
// Uso: node scripts/exercicios/gerar-polgar.mjs [caminho-do-pdf] [--so=1,2,3]
//   --so escolhe os capítulos (padrão: todos). O Mate em 2 leva uns 4 minutos.
// Precisa do pdftotext (vem com o Git para Windows, em /mingw64/bin).
//
// O texto do PDF traz os diagramas numa fonte de xadrez: cada casa é uma letra. Casa vazia =
// "0" ou "Z"; peça em casa clara = p n b r q k, em casa escura = o m a s l j (minúscula =
// pretas, maiúscula = brancas). Com `pdftotext -layout`, cada página tem até 3 linhas de
// diagramas em duas colunas, cada um com o número do problema logo acima.
//
// Cada posição é conferida com o motor de regras (precisa ter mate no número de lances do
// capítulo) e com a solução do capítulo 8 do livro, que também diz de quem é a vez.
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Chess } from 'chess.js'

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const arquivo =
  process.argv.slice(2).find((a) => !a.startsWith('--')) ??
  path.join(raiz, 'fotos/exercicios/pdfcoffee.com_5334-problems-combinations-and-games-laszlo-polgar-pdf-free.pdf')

const FONTE = 'László Polgár, 5334 Problems, Combinations & Games'
const CAPITULOS = [
  { id: 'polgar-mate-1', nome: 'Mate em 1', capitulo: 1, lances: 1, primeiro: 1, ultimo: 306 },
  { id: 'polgar-mate-2', nome: 'Mate em 2', capitulo: 2, lances: 2, primeiro: 307, ultimo: 3718 },
  { id: 'polgar-mate-3', nome: 'Mate em 3', capitulo: 3, lances: 3, primeiro: 3719, ultimo: 4462 },
]
const argumentos = process.argv.slice(2)
const so = argumentos.find((a) => a.startsWith('--so='))?.slice(5).split(',').map(Number)

const PECAS = { p: 'p', o: 'p', n: 'n', m: 'n', b: 'b', a: 'b', r: 'r', s: 'r', q: 'q', l: 'q', k: 'k', j: 'k' }

const paginas = execFileSync('pdftotext', ['-layout', '-enc', 'UTF-8', arquivo, '-'], {
  encoding: 'utf8',
  maxBuffer: 1 << 28,
}).split('\f')

// ---------- Soluções do livro (capítulo 8) ----------

/** n.º -> primeiro lance como o livro escreve, já em SAN aproximado ("Qxg7#", "Rd1+"). */
function solucoesDoLivro() {
  const mapa = new Map()
  const inicio = paginas.findIndex((p) => /^\s*Solutions\s*$/m.test(p) && /Chapter 8/.test(p))
  const fim = paginas.findIndex((p, i) => i > inicio && /Biography/.test(p) && /Chapter 9/.test(p))
  if (inicio < 0 || fim < 0) throw new Error('Capítulo de soluções não encontrado no PDF')
  const padrao = /(?:^|\s)(\d{1,4}) 1\.(\.\.)?([A-Za-z][^\s(]*)/g
  for (const pagina of paginas.slice(inicio, fim)) {
    for (const [, numero, pretas, lance] of pagina.matchAll(padrao)) {
      const n = Number(numero)
      if (mapa.has(n)) continue
      mapa.set(n, { pretas: !!pretas, lance: lance.replace(/X/g, 'x').replace(/m$/, '#') })
    }
  }
  return mapa
}

const semSinais = (san) => san.replace(/[+#x=!?]/g, '')

// ---------- Diagramas ----------

/** n.º -> as 8 fileiras do diagrama (da 8 para a 1). */
function diagramas() {
  const mapa = new Map()
  for (const pagina of paginas) {
    let rotulos = []
    let fileiras = new Map()
    for (const linha of pagina.split(/\r?\n/)) {
      if (/^\s*\d{1,4}(\s+\d{1,4})?\s*$/.test(linha)) {
        rotulos = [...linha.matchAll(/\d+/g)].map((m) => ({ n: Number(m[0]), coluna: m.index }))
        fileiras = new Map(rotulos.map((r) => [r.n, []]))
        continue
      }
      for (const m of linha.matchAll(/([1-8]) ([0-9A-Za-z]{8})(?![0-9A-Za-z])/g)) {
        if (!rotulos.length) continue
        // O diagrama é o do rótulo mais próximo na horizontal.
        const dono = rotulos.reduce((a, b) => (Math.abs(b.coluna - m.index) < Math.abs(a.coluna - m.index) ? b : a))
        const lista = fileiras.get(dono.n)
        if (lista.length === 8 - Number(m[1])) lista.push(m[2])
        if (lista.length === 8 && !mapa.has(dono.n)) mapa.set(dono.n, lista)
      }
    }
  }
  return mapa
}

function posicao(fileiras) {
  return fileiras
    .map((fileira) => {
      let saida = ''
      let vazias = 0
      for (const c of fileira) {
        const peca = PECAS[c.toLowerCase()]
        if (!peca) {
          if (c !== '0' && c !== 'Z') return null
          vazias++
          continue
        }
        if (vazias) saida += vazias
        vazias = 0
        saida += c === c.toLowerCase() ? peca : peca.toUpperCase()
      }
      return saida + (vazias || '')
    })
    .reduce((fen, f) => (fen === null || f === null ? null : fen ? `${fen}/${f}` : f), '')
}

// ---------- Busca de mate ----------

/** Roques possíveis pela posição das peças (rei e torre nas casas iniciais). */
function roques(jogo) {
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

/** Casas de en passant possíveis: peão adversário que pode ter acabado de avançar duas casas. */
function casasEnPassant(jogo, vez) {
  const [fileira, origem, passagem] = vez === 'w' ? ['5', '7', '6'] : ['4', '2', '3']
  const casas = []
  for (const coluna of 'abcdefgh') {
    const peao = jogo.get(coluna + fileira)
    if (!peao || peao.type !== 'p' || peao.color === vez) continue
    if (jogo.get(coluna + origem) || jogo.get(coluna + passagem)) continue
    const vizinhos = [-1, 1].map((d) => String.fromCharCode(coluna.charCodeAt(0) + d) + fileira)
    if (vizinhos.some((c) => jogo.get(c)?.type === 'p' && jogo.get(c)?.color === vez)) casas.push(coluna + passagem)
  }
  return casas
}

/** FENs válidas para o lado: sem roque nem en passant, e depois com os que a posição permitir. */
function candidatas(tabuleiro, vez) {
  let base
  try {
    base = new Chess(`${tabuleiro} w - - 0 1`, { skipValidation: true })
  } catch {
    return []
  }
  const r = roques(base)
  const lista = [`${tabuleiro} ${vez} - - 0 1`]
  if (r !== '-') lista.push(`${tabuleiro} ${vez} ${r} - 0 1`)
  for (const ep of casasEnPassant(base, vez)) lista.push(`${tabuleiro} ${vez} - ${ep} 0 1`)
  return lista.filter((fen) => {
    try {
      new Chess(fen)
      return true
    } catch {
      return false
    }
  })
}

/** O lado da vez tem mate em 1 (o SAN do chess.js marca o mate com #). */
const temMateEm1 = (jogo) => jogo.moves().some((san) => san.endsWith('#'))

/** Lances que forçam mate em até `lances` lances (1 ou 2). */
function solucoes(fen, lances) {
  const jogo = new Chess(fen)
  if (lances === 1) return jogo.moves().filter((san) => san.endsWith('#'))
  return jogo.moves().filter((san) => {
    jogo.move(san)
    let forca = jogo.isCheckmate()
    if (!forca && !jogo.isGameOver()) {
      forca = jogo.moves().every((resposta) => {
        jogo.move(resposta)
        const mate = temMateEm1(jogo)
        jogo.undo()
        return mate
      })
    }
    jogo.undo()
    return forca
  })
}

// ---------- Mate em 3 ----------
//
// Achar todas as chaves de um mate em 3 com o chess.js levaria horas; por isso só a chave do
// livro é conferida (forçar mate em 3 contra qualquer defesa, sem mate mais curto). A tela
// analisa na hora qualquer outro primeiro lance.

/** Xeques primeiro, depois capturas: acelera achar o mate quando ele existe. */
function ordenados(jogo) {
  const peso = (san) => (san.includes('+') || san.includes('#') ? 0 : san.includes('x') ? 1 : 2)
  return jogo.moves().sort((a, b) => peso(a) - peso(b))
}

/** O lado da vez dá mate em até `n` lances (n = 1 ou 2). */
function existeMate(jogo, n) {
  if (n === 1) return temMateEm1(jogo)
  return ordenados(jogo).some((san) => forcaMate(jogo, san, n))
}

/** O lance força mate em até `n` lances contando com ele mesmo. */
function forcaMate(jogo, san, n) {
  jogo.move(san)
  let forca = jogo.isCheckmate()
  if (!forca && !jogo.isGameOver() && n > 1) {
    forca = jogo.moves().every((resposta) => {
      jogo.move(resposta)
      const ok = existeMate(jogo, n - 1)
      jogo.undo()
      return ok
    })
  }
  jogo.undo()
  return forca
}

/**
 * Defesa mais resistente contra a chave: a que não permite mate imediato e deixa menos
 * lances que forçam o mate em 2. A tela usa esta resposta quando o usuário acha a chave.
 */
function melhorDefesa(jogo) {
  let melhor = null
  for (const resposta of jogo.moves()) {
    jogo.move(resposta)
    const pontos = temMateEm1(jogo) ? 1000 : jogo.moves().filter((san) => forcaMate(jogo, san, 2)).length
    jogo.undo()
    if (!melhor || pontos < melhor.pontos) melhor = { resposta, pontos }
  }
  return melhor?.resposta
}

function gerarMate3(cap) {
  const problemas = []
  const motivos = { semDiagrama: 0, semLivro: 0, chaveIlegal: 0, naoForca: 0, mateCurto: 0 }
  const divergencias = []
  for (let n = cap.primeiro; n <= cap.ultimo; n++) {
    const fileiras = todos.get(n)
    const tabuleiro = fileiras && posicao(fileiras)
    if (!tabuleiro) {
      motivos.semDiagrama++
      continue
    }
    const doLivro = livro.get(n)
    if (!doLivro) {
      motivos.semLivro++
      continue
    }
    let achado = null
    for (const fen of candidatas(tabuleiro, doLivro.pretas ? 'b' : 'w')) {
      const jogo = new Chess(fen)
      const chave = jogo.moves().find((san) => semSinais(san) === semSinais(doLivro.lance))
      if (chave) {
        achado = { jogo, fen, chave }
        break
      }
    }
    if (!achado) {
      motivos.chaveIlegal++
      divergencias.push(`n.º ${n}: livro ${doLivro.lance} não é lance legal`)
      continue
    }
    const { jogo, fen, chave } = achado
    if (existeMate(jogo, 2)) {
      motivos.mateCurto++
      continue
    }
    if (!forcaMate(jogo, chave, 3)) {
      motivos.naoForca++
      divergencias.push(`n.º ${n}: ${chave} não força mate em 3`)
      continue
    }
    jogo.move(chave)
    const defesa = melhorDefesa(jogo)
    problemas.push({ n, fen, solucoes: [chave], defesa })
  }
  gravar(cap, problemas, motivos, divergencias)
}

function gravar(cap, problemas, motivos, divergencias) {
  const saida = { id: cap.id, nome: cap.nome, fonte: `${FONTE}, cap. ${cap.capitulo}`, lances: cap.lances, problemas }
  const destino = path.join(raiz, `data/exercicios/${cap.id}.json`)
  fs.writeFileSync(destino, JSON.stringify(saida, null, 1) + '\n')
  const total = cap.ultimo - cap.primeiro + 1
  const pretas = problemas.filter((p) => p.fen.includes(' b ')).length
  console.log(`${cap.nome}: ${problemas.length} de ${total} gravados em ${path.relative(raiz, destino)}`)
  console.log(`  pretas jogam: ${pretas}; ${JSON.stringify(motivos)}`)
  for (const d of divergencias.slice(0, 30)) console.log(`  ${d}`)
}

// ---------- Geração ----------

const livro = solucoesDoLivro()
const todos = diagramas()

for (const cap of CAPITULOS) {
  if (so && !so.includes(cap.capitulo)) continue
  if (cap.lances === 3) {
    gerarMate3(cap)
    continue
  }
  const problemas = []
  const motivos = { semDiagrama: 0, semMate: 0, ambiguo: 0, mateEm1: 0, semLivro: 0, livroDiverge: 0 }
  const divergencias = []

  for (let n = cap.primeiro; n <= cap.ultimo; n++) {
    const fileiras = todos.get(n)
    const tabuleiro = fileiras && posicao(fileiras)
    if (!tabuleiro) {
      motivos.semDiagrama++
      continue
    }
    const doLivro = livro.get(n)
    const lados = doLivro ? [doLivro.pretas ? 'b' : 'w'] : ['w', 'b']
    const confere = (lista) => !doLivro || lista.some((san) => semSinais(san) === semSinais(doLivro.lance))
    const achados = []
    for (const vez of lados) {
      // Entre as variantes (roque, en passant), vale a primeira que tem mate e bate com o livro.
      const variantes = candidatas(tabuleiro, vez)
        .map((fen) => ({ fen, lista: solucoes(fen, cap.lances) }))
        .filter((v) => v.lista.length)
      const escolhida = variantes.find((v) => confere(v.lista)) ?? variantes[0]
      if (escolhida) achados.push(escolhida)
    }
    if (!achados.length) {
      motivos.semMate++
      divergencias.push(`n.º ${n}: sem mate em ${cap.lances} (livro ${doLivro?.lance ?? '?'})`)
      continue
    }
    if (achados.length > 1) {
      motivos.ambiguo++
      continue
    }
    const { fen, lista } = achados[0]
    // No Mate em 2, uma posição que já tem mate em 1 não treina o que o capítulo pede.
    if (cap.lances === 2 && solucoes(fen, 1).length) {
      motivos.mateEm1++
      continue
    }
    if (!confere(lista)) {
      motivos.livroDiverge++
      divergencias.push(`n.º ${n}: livro ${doLivro.lance}, motor ${lista.join(' ')}`)
      continue
    }
    if (!doLivro) motivos.semLivro++
    problemas.push({ n, fen, solucoes: lista })
  }

  gravar(cap, problemas, motivos, divergencias)
}
