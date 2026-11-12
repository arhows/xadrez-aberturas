// Gera data/estrategia/quizzes.json com os quizzes de scripts/grooten/quizzes.mjs,
// refazendo cada partida e conferindo perguntas, respostas e alternativas.
// Uso: node scripts/grooten/gerarQuizzes.mjs
import { writeFileSync } from 'node:fs'
import { Chess } from 'chess.js'
import { QUIZZES } from './quizzes.mjs'

const quizzes = QUIZZES.map((quiz) => ({
  id: `grooten-${String(quiz.cap).padStart(2, '0')}`,
  cap: quiz.cap,
  nome: quiz.nome,
  partidas: quiz.partidas.map((p, ip) => {
    const onde = `Quiz ${quiz.cap}, partida ${ip + 1}`
    const jogo = p.fen ? new Chess(p.fen) : new Chess()
    const fens = [jogo.fen()]
    const sans = p.lances
      .replace(/\d+\.(\.\.)?/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
      .map((san, i) => {
        try {
          const m = jogo.move(san)
          fens.push(jogo.fen())
          return m.san
        } catch {
          throw new Error(`${onde}: lance ilegal ${san} (meio-lance ${i + 1})`)
        }
      })
    let anterior = -1
    const perguntas = p.perguntas.map((q, iq) => {
      const aqui = `${onde}, pergunta ${iq + 1}`
      if (!(q.depois >= 0 && q.depois <= sans.length) || q.depois <= anterior) throw new Error(`${aqui}: 'depois' inválido`)
      anterior = q.depois
      if (!q.pergunta || !q.explicacao) throw new Error(`${aqui}: falta pergunta ou explicação`)
      const base = { depois: q.depois, pergunta: q.pergunta, explicacao: q.explicacao }
      if (q.tipo === 'lance') {
        const normal = (san) => {
          try {
            return new Chess(fens[q.depois]).move(san).san
          } catch {
            throw new Error(`${aqui}: resposta ilegal ${san}`)
          }
        }
        return { tipo: 'lance', ...base, resposta: normal(q.resposta), ...(q.aceitas?.length ? { aceitas: q.aceitas.map(normal) } : {}) }
      }
      if (q.tipo === 'escolha') {
        if (!Array.isArray(q.opcoes) || q.opcoes.length < 2 || !(q.certa >= 0 && q.certa < q.opcoes.length)) throw new Error(`${aqui}: alternativas`)
        return { tipo: 'escolha', ...base, opcoes: q.opcoes, certa: q.certa }
      }
      throw new Error(`${aqui}: tipo desconhecido`)
    })
    return { brancas: p.brancas, pretas: p.pretas, evento: p.evento, ...(p.fen ? { fen: p.fen } : {}), lances: sans.join(' '), perguntas }
  }),
}))

writeFileSync(
  'data/estrategia/quizzes.json',
  JSON.stringify({
    fonte: 'Herman Grooten, "Chess Strategy for Club Players" (capítulos de quiz). Partidas e perguntas do livro, com explicações próprias em português.',
    quizzes,
  }),
)
for (const q of quizzes) console.log(`${q.id}: ${q.partidas.length} partida(s), ${q.partidas.reduce((s, p) => s + p.perguntas.length, 0)} perguntas`)
