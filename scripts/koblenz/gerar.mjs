// Gera data/taticas/koblenz-finais.json com os exercícios de scripts/koblenz/exercicios.mjs,
// conferindo cada linha a partir da posição.
// Uso: node scripts/koblenz/gerar.mjs
import { writeFileSync } from 'node:fs'
import { Chess } from 'chess.js'
import { EXERCICIOS } from './exercicios.mjs'

const problemas = EXERCICIOS.map((e) => {
  const jogo = new Chess(e.fen)
  if (e.previo) jogo.move(e.previo)
  const linha = e.linha.split(' ').map((san) => jogo.move(san).san)
  if (linha.length % 2 === 0) throw new Error(`Exercício ${e.n}: a linha deve terminar num lance de quem resolve.`)
  return { n: e.n, fen: e.fen, ...(e.previo ? { previo: e.previo } : {}), linha, solucoes: [linha[0]], tarefa: e.tarefa, explicacao: e.explicacao }
})

writeFileSync(
  'data/taticas/koblenz-finais.json',
  JSON.stringify({
    id: 'koblenz-finais',
    tipo: 'tatica',
    tema: 'koblenz',
    nome: 'Finais e estudos',
    fonte: 'Alexander Koblenz, "Chess Strategy" (exercícios dos capítulos de finais). Posições conferidas pela solução do livro.',
    livro: 'Estratégia, exercícios de Alexander Koblenz',
    lances: 0,
    problemas,
  }),
)
console.log(`${problemas.length} exercícios gravados`)
