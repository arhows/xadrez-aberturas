import { percorrer } from './arvore'
import { exibirAvaliacao } from './avaliacao'
import type { CapituloCarregado } from './capitulos'
import { corDoPly, numeroDoPly, separarLances } from './lances'
import type { Linha, Nota } from './tipos'

/** Nó da árvore de um jogo: a linha é o ramo principal e as notas viram variantes. */
interface NoPgn {
  san: string
  /** O lance como o livro escreveu, com sinais como "?!". */
  texto: string
  ply: number
  comentarios: string[]
  filhos: NoPgn[]
}

function inserir(capitulo: CapituloCarregado, raiz: NoPgn, id: string, texto: string): NoPgn {
  const lances = capitulo.unidades.find((unidade) => unidade.id === id)!.lances
  const sans = lances.map((lance) => lance.san)
  const arestas = percorrer(capitulo.arvore, sans)!
  const tokens = separarLances(texto)

  let atual = raiz
  lances.forEach((lance, i) => {
    let filho = atual.filhos.find((no) => no.san === lance.san)
    if (!filho) {
      filho = {
        san: lance.san,
        texto: tokens[i],
        ply: lance.ply,
        comentarios: arestas[i].dica ? [arestas[i].dica!] : [],
        filhos: [],
      }
      atual.filhos.push(filho)
    }
    atual = filho
  })
  return atual
}

function comentarioDaNota(nota: Nota): string {
  const texto = [
    `Nota ${nota.rotulo}`,
    exibirAvaliacao(nota.avaliacao)?.rotulo,
    nota.referencia,
    nota.comentario,
  ]
    .filter(Boolean)
    .join(' — ')
  return nota.conferir ? `${texto} [conferir: ${nota.conferir}]` : texto
}

function comentarioDaLinha(linha: Linha): string {
  const titulo = linha.coluna === null ? 'Fim da linha bônus' : `Fim da coluna ${linha.coluna}`
  const avaliacao = exibirAvaliacao(linha.avaliacao)?.rotulo
  return `${titulo}${avaliacao ? ` — ${avaliacao}` : ''} ${linha.resumo}`.trim()
}

/** O PGN encerra o comentário na primeira chave, então o texto não pode conter uma. */
function escreverComentario(texto: string): string {
  return `{ ${texto.replace(/[{}]/g, '').replace(/\s+/g, ' ').trim()} }`
}

function escreverLances(filhos: NoPgn[], numerarPretas: boolean, saida: string[]): void {
  let atuais = filhos
  let numerar = numerarPretas
  while (atuais.length) {
    const [principal, ...alternativas] = atuais
    const numero = numeroDoPly(principal.ply)
    if (corDoPly(principal.ply) === 'w') saida.push(`${numero}. ${principal.texto}`)
    else saida.push(numerar ? `${numero}... ${principal.texto}` : principal.texto)

    for (const comentario of principal.comentarios) saida.push(escreverComentario(comentario))

    for (const alternativa of alternativas) {
      const variante: string[] = []
      escreverLances([alternativa], true, variante)
      saida.push(`(${variante.join(' ')})`)
    }

    // Depois de um comentário ou variante, o lance das pretas precisa do número de novo.
    numerar = principal.comentarios.length > 0 || alternativas.length > 0
    atuais = principal.filhos
  }
}

function jogoDaLinha(capitulo: CapituloCarregado, linha: Linha): string {
  const raiz: NoPgn = { san: '', texto: '', ply: 0, comentarios: [], filhos: [] }
  const ativas = new Set(capitulo.unidades.map((unidade) => unidade.id))

  inserir(capitulo, raiz, linha.id, linha.lances).comentarios.push(comentarioDaLinha(linha))
  for (const nota of capitulo.capitulo.notas ?? []) {
    if (nota.coluna === linha.coluna && ativas.has(nota.id)) {
      inserir(capitulo, raiz, nota.id, nota.lances).comentarios.push(comentarioDaNota(nota))
    }
  }

  const numero = linha.coluna === null ? 'Bônus' : `Coluna ${String(linha.coluna).padStart(2, '0')}`
  const titulo = capitulo.capitulo.nome.replace(/^Defesa d[oa]s? /, '')
  const cabecalho = [
    `[Event "${titulo} — ${numero}"]`,
    `[White "${linha.nome.replace(/"/g, "'")}"]`,
    '[Black "MCO"]',
    '[Result "*"]',
    '[Annotator "Notas MCO + dicas"]',
  ]

  const lances: string[] = []
  escreverLances(raiz.filhos, false, lances)
  return `${cabecalho.join('\n')}\n\n${lances.join(' ')} *\n`
}

/**
 * Um jogo por linha, com as notas da coluna como variantes e dicas como comentários.
 * Cada jogo vira um capítulo ao importar num Estudo do Lichess.
 */
export function exportarPgn(capitulo: CapituloCarregado): string {
  return capitulo.capitulo.linhas
    .filter((linha) => !capitulo.desativadas.includes(linha.id))
    .map((linha) => jogoDaLinha(capitulo, linha))
    .join('\n')
}
