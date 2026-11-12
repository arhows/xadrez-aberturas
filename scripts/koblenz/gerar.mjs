// Gera data/taticas/koblenz-finais.json e data/taticas/koblenz-meio-jogo.json com os exercícios
// de scripts/koblenz/exercicios.mjs e scripts/koblenz/meioJogo.mjs, conferindo cada linha a partir da posição.
// Uso: node scripts/koblenz/gerar.mjs
import { writeFileSync } from 'node:fs'
import { Chess } from 'chess.js'
import { EXERCICIOS } from './exercicios.mjs'
import { MEIO_JOGO } from './meioJogo.mjs'

const conferir = (lista) =>
  lista.map((e) => {
    const jogo = new Chess(e.fen)
    if (e.previo) jogo.move(e.previo)
    const linha = e.linha.split(' ').map((san) => {
      try {
        return jogo.move(san).san
      } catch {
        throw new Error(`Exercício ${e.n}: lance ilegal ${san} em ${jogo.fen()}`)
      }
    })
    if (linha.length % 2 === 0) throw new Error(`Exercício ${e.n}: a linha deve terminar num lance de quem resolve.`)
    return { n: e.n, fen: e.fen, ...(e.previo ? { previo: e.previo } : {}), linha, solucoes: [linha[0]], tarefa: e.tarefa, explicacao: e.explicacao }
  })

const gravar = (id, nome, fonte, lista) => {
  const problemas = conferir(lista)
  writeFileSync(
    `data/taticas/${id}.json`,
    JSON.stringify({ id, tipo: 'tatica', tema: 'koblenz', nome, fonte, livro: 'Estratégia, exercícios de Alexander Koblenz', lances: 0, problemas }),
  )
  console.log(`${id}: ${problemas.length} exercícios gravados`)
}

gravar(
  'koblenz-finais',
  'Finais e estudos',
  'Alexander Koblenz, "Chess Strategy" (exercícios dos capítulos de finais). Posições conferidas pela solução do livro.',
  EXERCICIOS,
)
gravar(
  'koblenz-meio-jogo',
  'Meio-jogo e planos',
  'Alexander Koblenz, "Chess Strategy" (exercícios 32 a 92: partidas de mestres e estudos). Posições refeitas pelas partidas ou transcritas dos diagramas.',
  MEIO_JOGO,
)
