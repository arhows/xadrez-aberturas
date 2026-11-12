import { Chess } from 'chess.js'
import type { Aresta, Arvore } from './arvore'
import type { CapituloCarregado } from './capitulos'
import { chaveDaPosicao, separarLances } from './lances'
import type { Grupo, Linha } from './tipos'

/** Busca de aberturas: por nome (capítulo e grupos) ou por lances, encontrando a posição mesmo com outra ordem de lances. */

/** Minúsculas e sem acentos, para "petrov" achar "Petrov" e "dragao" achar "Dragão". */
export function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

const PT_PARA_EN: Record<string, string> = { C: 'N', D: 'Q', T: 'R', R: 'K', B: 'B' }

/**
 * Maneiras de ler um lance digitado, da mais provável para a menos.
 * Aceita inglês e português, maiúsculas ou minúsculas ("Nf3", "Cf3", "cf3") e roque com zero.
 */
function leituras(token: string): string[] {
  const limpo = token.replace(/[,;]/g, '').replace(/0/g, 'O').replace(/[!?]+$/, '')
  if (/^o-o(-o)?[+#]?$/i.test(limpo)) return [limpo.toUpperCase()]
  const maiuscula = limpo.charAt(0).toUpperCase() + limpo.slice(1)
  const emPortugues = (texto: string) =>
    texto.replace(/^[CDTRB]/, (peca) => PT_PARA_EN[peca]).replace(/=([CDTB])/i, (_, peca: string) => `=${PT_PARA_EN[peca.toUpperCase()]}`)
  return [...new Set([limpo, emPortugues(limpo), maiuscula, emPortugues(maiuscula)])]
}

export interface SequenciaLida {
  /** Lances em SAN inglês, como o chess.js escreve. */
  sans: string[]
  /** Chave da posição depois de cada lance (índice 0 = depois do 1º lance). */
  posicoes: string[]
}

/** Lê o texto como uma sequência de lances a partir da posição inicial; null se algum lance não fizer sentido. */
export function lerLances(texto: string): SequenciaLida | null {
  const tokens = separarLances(texto.replace(/(\d+)\.+/g, '$1. '))
  if (!tokens.length) return null
  const chess = new Chess()
  const sans: string[] = []
  const posicoes: string[] = []
  for (const token of tokens) {
    const opcoes = leituras(token)
    // O chess.js é tolerante e lê "cc6" como o peão c6; uma leitura que ele reescreve fica por último.
    const lance =
      opcoes.map((leitura) => tentar(chess, leitura, true)).find(Boolean) ??
      opcoes.map((leitura) => tentar(chess, leitura, false)).find(Boolean)
    if (!lance) return null
    sans.push(lance)
    posicoes.push(chaveDaPosicao(chess.fen()))
  }
  return { sans, posicoes }
}

/** Joga o lance se for legal; com `exato`, só aceita se o SAN do chess.js for o mesmo texto (sem +/#). */
function tentar(chess: Chess, san: string, exato: boolean): string | null {
  try {
    const lance = chess.move(san)
    const semXeque = (texto: string) => texto.replace(/[+#]/g, '')
    if (exato && semXeque(lance.san) !== semXeque(san)) {
      chess.undo()
      return null
    }
    return lance.san
  } catch {
    return null
  }
}

/** Caminho mais curto do início até uma posição na árvore do capítulo (para abrir no Explorar). */
export function caminhoAte(arvore: Arvore, chave: string): Aresta[] | null {
  const anterior = new Map<string, Aresta | null>([[arvore.raiz, null]])
  const fila = [arvore.raiz]
  while (fila.length) {
    const atual = fila.shift()!
    if (atual === chave) {
      const caminho: Aresta[] = []
      for (let aresta = anterior.get(atual); aresta; aresta = anterior.get(aresta.de)) caminho.unshift(aresta)
      return caminho
    }
    for (const saida of arvore.nos.get(atual)?.saidas ?? []) {
      if (anterior.has(saida.para)) continue
      anterior.set(saida.para, saida)
      fila.push(saida.para)
    }
  }
  return null
}

export interface ResultadoLances {
  capitulo: CapituloCarregado
  /** Lances do livro até a posição, que podem estar em outra ordem que a digitada. */
  caminho: string[]
  /** true se a ordem do livro for diferente da digitada (transposição). */
  transposicao: boolean
  /** Colunas que passam pela posição. */
  linhas: Linha[]
  /** Quantas notas de rodapé passam pela posição. */
  notas: number
}

export interface BuscaPorLances {
  tipo: 'lances'
  sans: string[]
  /** Capítulos que têm a posição final. */
  resultados: ResultadoLances[]
  /** Se nenhum capítulo tem a posição final: até onde a sequência fica no livro (em lances) e onde. */
  parcial: { lances: number; resultados: ResultadoLances[] } | null
}

function resultadoNaPosicao(capitulo: CapituloCarregado, chave: string, sansDigitados: string[]): ResultadoLances | null {
  const no = capitulo.arvore.nos.get(chave)
  if (!no) return null
  const caminho = caminhoAte(capitulo.arvore, chave)
  if (!caminho) return null
  const ids = new Set([...no.entradas, ...no.saidas].flatMap((aresta) => aresta.linhas))
  const linhas = capitulo.capitulo.linhas.filter((linha) => ids.has(linha.id) && !capitulo.desativadas.includes(linha.id))
  const notas = (capitulo.capitulo.notas ?? []).filter((nota) => ids.has(nota.id)).length
  const sans = caminho.map((aresta) => aresta.san)
  return { capitulo, caminho: sans, transposicao: sans.join(' ') !== sansDigitados.join(' '), linhas, notas }
}

export function buscarPorLances(capitulos: CapituloCarregado[], lida: SequenciaLida): BuscaPorLances {
  const naPosicao = (indice: number) =>
    capitulos
      .map((capitulo) => resultadoNaPosicao(capitulo, lida.posicoes[indice], lida.sans.slice(0, indice + 1)))
      .filter((resultado): resultado is ResultadoLances => resultado !== null)

  const ultima = lida.posicoes.length - 1
  const resultados = naPosicao(ultima)
  let parcial: BuscaPorLances['parcial'] = null
  if (!resultados.length) {
    for (let indice = ultima - 1; indice >= 0; indice--) {
      const achados = naPosicao(indice)
      if (achados.length) {
        parcial = { lances: indice + 1, resultados: achados }
        break
      }
    }
  }
  return { tipo: 'lances', sans: lida.sans, resultados, parcial }
}

export interface ResultadoNome {
  capitulo: CapituloCarregado
  /** Grupos cujo nome também bate com a busca (mostrados como detalhe). */
  grupos: Grupo[]
}

export interface BuscaPorNome {
  tipo: 'nome'
  resultados: ResultadoNome[]
}

/** Todas as palavras da busca precisam aparecer no nome do capítulo, no nome de um grupo ou nos lances-base. */
export function buscarPorNome(capitulos: CapituloCarregado[], texto: string): BuscaPorNome {
  const palavras = normalizar(texto).split(/\s+/).filter(Boolean)
  const contem = (alvo: string) => palavras.every((palavra) => normalizar(alvo).includes(palavra))
  const resultados: ResultadoNome[] = []
  for (const capitulo of capitulos) {
    const { nome, base, grupos } = capitulo.capitulo
    const gruposAchados = grupos.filter((grupo) => contem(`${nome} ${grupo.nome}`))
    if (contem(`${nome} ${base}`) || gruposAchados.length) {
      resultados.push({ capitulo, grupos: contem(nome) ? [] : gruposAchados })
    }
  }
  return { tipo: 'nome', resultados }
}

/**
 * Decide o tipo de busca: se o texto inteiro for uma sequência legal de lances, busca a posição;
 * senão, busca pelo nome. Assim "e4 c5" acha a Siciliana e "siciliana" também.
 */
export function buscarAberturas(capitulos: CapituloCarregado[], texto: string): BuscaPorLances | BuscaPorNome | null {
  if (!texto.trim()) return null
  const lida = lerLances(texto)
  if (lida) return buscarPorLances(capitulos, lida)
  return buscarPorNome(capitulos, texto)
}
