// Gera data/openings/<arquivo>.json a partir da transcrição de um capítulo do MCO.
// Uso (na raiz do projeto): node scripts/mco/gerar.cjs <capitulo> [--sem-dicas]
//   <capitulo>.cjs      — capítulo, colunas e notas (lances do livro);
//   <capitulo>-dicas.cjs — dicas de cada lance (texto do app): { linhas: { c01: { '1. e4': '...' } }, notas: { 'c01-a': '...' } }.
// Nas linhas, cada lance precisa de dica na própria linha ou numa linha anterior com o mesmo começo
// (a árvore do app usa a primeira dica que encontrar). Cada nota precisa da dica do lance do desvio.
// --sem-dicas só confere os lances (para revisar a transcrição antes de escrever as dicas).
// Não edite o JSON gerado à mão: ele é reescrito por este script.
const fs = require('fs')
const path = require('path')
const { createRequire } = require('module')

const raiz = path.resolve(__dirname, '../..')
const { Chess } = createRequire(raiz + '/package.json')('chess.js')

const nome = process.argv[2]
const semDicas = process.argv.includes('--sem-dicas')
if (!nome) throw new Error('uso: node scripts/mco/gerar.cjs <capitulo> [--sem-dicas]')
const { capitulo: meta, colunas, notas } = require(`./${nome}.cjs`)
const dicas = semDicas ? { linhas: {}, notas: {} } : require(`./${nome}-dicas.cjs`)

const erros = []
const limpar = (san) => san.replace(/[!?]+$/, '')
const chave = (ply, san) => `${Math.ceil(ply / 2)}${ply % 2 ? '.' : '...'} ${limpar(san)}`
const pgn = (sans) => sans.map((san, i) => (i % 2 === 0 ? `${i / 2 + 1}. ${san}` : san)).join(' ')

// Lê "5... h6 6 Nxf7 Kxf7" conferindo a numeração; devolve os lances e o ply do primeiro.
function ler(texto, id) {
  const lances = []
  let ply = null
  for (const token of texto.trim().split(/\s+/)) {
    const num = token.match(/^(\d+)(\.\.\.)?$/)
    if (num) {
      const n = Number(num[1])
      const pretas = !!num[2]
      if (ply === null) ply = (n - 1) * 2 + (pretas ? 2 : 1)
      else if (n !== Math.ceil((ply + lances.length) / 2) || (ply + lances.length) % 2 !== 1) {
        erros.push(`${id}: número ${token} fora de ordem`)
      }
      continue
    }
    lances.push(token)
  }
  return { lances, inicio: ply ?? 1 }
}

// Confere a legalidade e devolve os SAN normalizados (sem !? do livro).
function conferir(id, sans) {
  const chess = new Chess()
  const saida = []
  for (let i = 0; i < sans.length; i++) {
    try {
      const lance = chess.move(limpar(sans[i]))
      if (limpar(sans[i]) !== lance.san) erros.push(`${id}: ${sans[i]} é escrito ${lance.san}`)
      saida.push(lance.san)
    } catch {
      erros.push(`${id}: ilegal ${chave(i + 1, sans[i])} em ${chess.fen()}`)
      return null
    }
  }
  return saida
}

const sequencias = {}
const ordemColunas = Object.keys(colunas)
const linhas = ordemColunas.map((id) => {
  const [texto, grupo, nomeLinha, avaliacao, resumo] = colunas[id]
  const { lances } = ler(texto, id)
  const sans = conferir(id, lances) ?? lances.map(limpar)
  sequencias[id] = sans
  if (!meta.grupos.some((g) => g.id === grupo)) erros.push(`${id}: grupo ${grupo} não existe`)
  return { id, coluna: Number(id.slice(1)), grupo, nome: nomeLinha, lances: pgn(sans), avaliacao, resumo, dicas: {} }
})

// Dicas das linhas: as da própria linha, conferindo que cada chave é um lance dela.
for (const linha of linhas) {
  const sans = sequencias[linha.id]
  const proprias = dicas.linhas[linha.id] ?? {}
  const chaves = new Set(sans.map((san, i) => chave(i + 1, san)))
  for (const k of Object.keys(proprias)) if (!chaves.has(k)) erros.push(`${linha.id}: dica para ${k}, que não é lance da linha`)
  linha.dicas = proprias
  if (semDicas) continue
  // Cobertura: cada ply precisa de dica aqui ou numa linha anterior com o mesmo começo.
  sans.forEach((san, i) => {
    const k = chave(i + 1, san)
    if (proprias[k]) return
    const coberta = linhas
      .slice(0, linhas.indexOf(linha))
      .some((outra) => outra.dicas[k] && sequencias[outra.id].slice(0, i + 1).join(' ') === sans.slice(0, i + 1).join(' '))
    if (!coberta) erros.push(`${linha.id}: falta dica para ${k}`)
  })
}

const saidaNotas = []
for (const [base, sufixo, letra, rotulo, texto, o] of notas) {
  const id = `${base}-${sufixo}`
  if (!sequencias[base]) {
    erros.push(`${id}: base ${base} não existe (ou veio depois)`)
    continue
  }
  const { lances, inicio } = ler(texto, id)
  const prefixo = sequencias[base].slice(0, inicio - 1)
  if (prefixo.length !== inicio - 1) {
    erros.push(`${id}: começa no ply ${inicio}, depois do fim de ${base} (${sequencias[base].length} plies)`)
    continue
  }
  const sans = conferir(id, [...prefixo, ...lances])
  if (!sans) continue
  sequencias[id] = sans
  const desvio = sans.findIndex((san, i) => san !== sequencias[base][i]) + 1
  if (desvio !== inicio) erros.push(`${id}: desvia no ply ${desvio}, mas o texto começa no ${inicio}`)
  // A linha base de uma subnota é a coluna; o desvio é contado do começo da partida.
  const coluna = base.match(/^c\d+/)[0]
  const nota = {
    id,
    nota: letra,
    rotulo,
    coluna: Number(coluna.slice(1)),
    linhaBase: base,
    desvioNoLance: desvio,
    lances: pgn(sans),
    avaliacao: o.a ?? null,
  }
  if (o.r) nota.referencia = o.r
  if (o.c) nota.comentario = o.c
  else erros.push(`${id}: sem comentário`)
  const dica = dicas.notas[id]
  if (dica) nota.dicas = { [chave(desvio, sans[desvio - 1])]: dica }
  else if (!semDicas) erros.push(`${id}: falta a dica do desvio`)
  saidaNotas.push(nota)
}
for (const id of Object.keys(dicas.notas)) if (!sequencias[id] || !id.includes('-')) erros.push(`dica para a nota ${id}, que não existe`)

if (erros.length) {
  console.error(erros.join('\n'))
  console.error(`\n${erros.length} problema(s); nada foi gravado.`)
  process.exit(1)
}

const { arquivo, ordem, ...cabecalho } = meta
const saida = { ...cabecalho, ordem, linhas, notas: saidaNotas }
if (semDicas) {
  console.log(`lances ok: ${linhas.length} linhas, ${saidaNotas.length} notas (sem dicas; nada gravado)`)
} else {
  fs.writeFileSync(path.join(raiz, 'data/openings', `${arquivo}.json`), JSON.stringify(saida, null, 1) + '\n')
  const total = linhas.reduce((t, l) => t + Object.keys(l.dicas).length, 0)
  console.log(`ok: ${linhas.length} linhas, ${saidaNotas.length} notas, ${total} dicas nas linhas → data/openings/${arquivo}.json`)
}
