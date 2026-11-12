import type { Aresta } from './arvore'
import type { CapituloCarregado } from './capitulos'
import { chaveDaPosicao, separarLances, type LanceJogado } from './lances'
import type { AnaliseMotor } from './motor'
import { chanceDasBrancas } from './probabilidade'

/**
 * Qualidade de cada lance do livro, de duas fontes:
 * - a marca do MCO (!!, !, !?, ?!, ?, ??), escrita nos lances ou citada nos comentários;
 * - o Stockfish: quanto de chance de vitória o lance perde em relação ao melhor lance.
 */

export type MarcaLivro = '!!' | '!' | '!?' | '?!' | '?' | '??'

export const LEGENDA_MARCAS: { simbolo: MarcaLivro; nome: string; texto: string }[] = [
  { simbolo: '!!', nome: 'Brilhante', texto: 'lance excelente e difícil de achar' },
  { simbolo: '!', nome: 'Bom lance', texto: 'o melhor da posição, ou bem acima das alternativas' },
  { simbolo: '!?', nome: 'Interessante', texto: 'lance arriscado ou criativo, que vale a tentativa' },
  { simbolo: '?!', nome: 'Duvidoso', texto: 'tem um problema; há coisa melhor' },
  { simbolo: '?', nome: 'Erro', texto: 'piora bem a posição' },
  { simbolo: '??', nome: 'Erro grave', texto: 'perde material ou a partida' },
]

export const NOME_MARCA = Object.fromEntries(LEGENDA_MARCAS.map((m) => [m.simbolo, m.nome])) as Record<MarcaLivro, string>

/** Tom da marca, para a cor do símbolo na tela. */
export function tomDaMarca(marca: MarcaLivro): 'otimo' | 'bom' | 'interessante' | 'duvidoso' | 'erro' {
  if (marca === '!!') return 'otimo'
  if (marca === '!') return 'bom'
  if (marca === '!?') return 'interessante'
  if (marca === '?!') return 'duvidoso'
  return 'erro'
}

const MARCA_NO_FIM = /(!!|!\?|\?!|\?\?|!|\?)$/
/** "7...Nf6!?", "16.Nxe6!?", "3 e5 d4!" não (sem número antes do lance marcado). */
const MARCA_NO_TEXTO = /(\d+)\.(\.\.)?\s*(O-O-O|O-O|[KQRBN]?[a-h]?[1-8]?x?[a-h][1-8](?:=[QRBN])?)[+#]?(!!|!\?|\?!|\?\?|!|\?)/g

const semXeque = (san: string) => san.replace(/[+#]/g, '')
const idDaAresta = (lance: LanceJogado) => `${chaveDaPosicao(lance.fenAntes)}|${lance.san}`

/**
 * Marca do MCO de cada aresta do livro (chave = id da aresta). Vale a primeira encontrada:
 * as escritas nos lances, depois as citadas no texto da própria linha ou nota (ou da linha
 * de onde a nota sai).
 */
export function marcasDoLivro(capitulo: CapituloCarregado): Map<string, MarcaLivro> {
  const marcas = new Map<string, MarcaLivro>()
  const unidades = new Map(capitulo.unidades.map((u) => [u.id, u]))
  const textos = new Map<string, { textos: string[]; lances: string; base?: string }>()
  for (const linha of capitulo.capitulo.linhas) {
    textos.set(linha.id, { textos: [linha.nome, linha.resumo, ...Object.values(linha.dicas ?? {})], lances: linha.lances })
  }
  for (const nota of capitulo.capitulo.notas ?? []) {
    textos.set(nota.id, {
      textos: [nota.comentario ?? '', ...Object.values(nota.dicas ?? {})],
      lances: nota.lances,
      base: nota.linhaBase,
    })
  }
  const marcar = (lance: LanceJogado | undefined, marca: MarcaLivro) => {
    if (lance && !marcas.has(idDaAresta(lance))) marcas.set(idDaAresta(lance), marca)
  }

  // 1) Marcas escritas nos próprios lances ("8. Be2!").
  for (const [id, dados] of textos) {
    const unidade = unidades.get(id)
    if (!unidade) continue
    separarLances(dados.lances).forEach((token, i) => {
      const m = token.match(MARCA_NO_FIM)
      if (m) marcar(unidade.lances[i], m[1] as MarcaLivro)
    })
  }

  // 2) Marcas citadas nos comentários, presas ao lance com o mesmo número e SAN.
  for (const [id, dados] of textos) {
    const cadeia = [unidades.get(id)]
    for (let base = dados.base; base && cadeia.length < 6; base = textos.get(base)?.base) cadeia.push(unidades.get(base))
    for (const texto of dados.textos) {
      for (const m of texto.matchAll(MARCA_NO_TEXTO)) {
        const ply = Number(m[1]) * 2 - (m[2] ? 0 : 1)
        const san = m[3]
        for (const unidade of cadeia) {
          const lance = unidade?.lances[ply - 1]
          if (lance && semXeque(lance.san) === san) {
            marcar(lance, m[4] as MarcaLivro)
            break
          }
        }
      }
    }
  }
  return marcas
}

export type ClasseMotor = 'melhor' | 'bom' | 'imprecisao' | 'erro' | 'grave'

export const NOME_CLASSE_MOTOR: Record<ClasseMotor, string> = {
  melhor: 'Melhor lance',
  bom: 'Bom',
  imprecisao: 'Imprecisão',
  erro: 'Erro',
  grave: 'Erro grave',
}

export interface QualidadeMotor {
  classe: ClasseMotor | null
  /** Pontos de chance de vitória perdidos pelo lado que jogou (0 = nada perdido). */
  perda: number
}

/**
 * O que o Stockfish acha do lance: compara a chance antes (com o melhor lance) e depois do
 * lance jogado, do ponto de vista de quem jogou. Entre 5 e 10 pontos não ganha rótulo.
 */
export function qualidadeDoMotor(
  aresta: Pick<Aresta, 'de' | 'para' | 'san'>,
  posicoes: Record<string, AnaliseMotor> | undefined,
): QualidadeMotor | null {
  const antes = posicoes?.[aresta.de]
  const depois = posicoes?.[aresta.para]
  if (!antes || !depois) return null
  return classificarLance(antes.cp, depois.cp, aresta.de.split(' ')[1] === 'w', antes.lance, aresta.san)
}

/** A mesma régua para qualquer lance: avaliação antes/depois, de quem é a vez e o melhor lance. */
export function classificarLance(
  cpAntes: number,
  cpDepois: number,
  brancasJogam: boolean,
  melhorSan: string | null,
  san: string,
): QualidadeMotor {
  const diferenca = chanceDasBrancas(cpAntes) - chanceDasBrancas(cpDepois)
  const perda = Math.max(0, brancasJogam ? diferenca : -diferenca)
  let classe: ClasseMotor | null = null
  if (melhorSan && semXeque(melhorSan) === semXeque(san)) classe = 'melhor'
  else if (perda >= 30) classe = 'grave'
  else if (perda >= 20) classe = 'erro'
  else if (perda >= 10) classe = 'imprecisao'
  else if (perda < 5) classe = 'bom'
  return { classe, perda }
}

/**
 * Marca do MCO do último lance de uma sequência que ainda está no livro (procura primeiro no
 * capítulo preferido, depois em todos). null se a sequência saiu do livro ou não tem marca.
 */
export function marcaNaSequencia(
  sans: string[],
  capitulos: CapituloCarregado[],
  preferido?: CapituloCarregado,
): MarcaLivro | null {
  if (!sans.length) return null
  for (const capitulo of preferido ? [preferido, ...capitulos] : capitulos) {
    let no = capitulo.arvore.nos.get(capitulo.arvore.raiz)
    let ultima: Aresta | undefined
    for (const san of sans) {
      ultima = no?.saidas.find((aresta) => aresta.san === san)
      if (!ultima) break
      no = capitulo.arvore.nos.get(ultima.para)
    }
    if (ultima && no) return marcasDoCapitulo(capitulo).get(ultima.id) ?? null
  }
  return null
}

const cacheMarcas = new WeakMap<CapituloCarregado, Map<string, MarcaLivro>>()

/** As marcas do capítulo, calculadas uma vez. */
export function marcasDoCapitulo(capitulo: CapituloCarregado): Map<string, MarcaLivro> {
  let marcas = cacheMarcas.get(capitulo)
  if (!marcas) cacheMarcas.set(capitulo, (marcas = marcasDoLivro(capitulo)))
  return marcas
}
