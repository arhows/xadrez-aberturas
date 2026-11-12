// Gera data/taticas/grooten-capNN.json (um conjunto por capítulo) com os exercícios de
// scripts/grooten/exercicios.mjs, conferindo cada linha a partir da posição.
// Uso: node scripts/grooten/gerar.mjs
import { writeFileSync } from 'node:fs'
import { Chess } from 'chess.js'
import { CAPITULOS } from './exercicios.mjs'

for (const { cap, nome, exercicios } of CAPITULOS) {
  const problemas = exercicios.map((e, i) => {
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
    return { n: i + 1, rotulo: e.n, fen: e.fen, ...(e.previo ? { previo: e.previo } : {}), linha, solucoes: [linha[0]], tarefa: e.tarefa, explicacao: e.explicacao }
  })
  const id = `grooten-cap${String(cap).padStart(2, '0')}`
  writeFileSync(
    `data/taticas/${id}.json`,
    JSON.stringify({
      id,
      tipo: 'tatica',
      tema: 'grooten',
      nome: `${cap}. ${nome}`,
      fonte: `Herman Grooten, "Chess Strategy for Club Players", exercícios do capítulo ${cap}. Posições transcritas dos diagramas e conferidas pelas soluções do livro.`,
      livro: 'Estratégia, exercícios de Herman Grooten',
      lances: 0,
      problemas,
    }),
  )
  console.log(`${id}: ${problemas.length} exercícios`)
}
