import { reactive, watch } from 'vue'
import { gravar, ler, remover } from './armazenamento'
import type { EscolhaCor, Profundidade } from './escopo'
import type { Notacao } from './notacao'
import type { PartidaAnalisada } from './partidas'
import type { Cartao } from './srs'

export interface Configuracoes {
  notacao: Notacao
  dicasNoTreino: 'sempre' | 'erro' | 'nunca'
  /** Quanto o adversário espera depois de mostrar a dica de um acerto. */
  tempoDica: 'normal' | 'longo' | 'toque'
  animacaoMs: number
  som: boolean
  orientacaoAutomatica: boolean
  novasPorDia: number
  tema: 'auto' | 'claro' | 'escuro'
  /** Seta azul e avaliação do Stockfish no Estudo e no Explorar. */
  mostrarMotor: boolean
  /** Stockfish rodando no navegador no Explorar (baixa ≈1,9 MB na primeira vez). */
  motorAoVivo: boolean
  /** Lista de cravadas, ataques duplos etc. no Estudo e no Explorar. */
  mostrarTaticas: boolean
  /** Setas de todas as táticas sem precisar tocar nos itens. */
  taticasAutomaticas: boolean
  /** Estudo e Explorar: esconde as setas e os lances do livro até a pessoa tentar o lance. */
  adivinhar: boolean
  /** Última escolha da tela de Treino, usada também por "Revisar agora". */
  profundidade: Profundidade
}

export interface ErroAresta {
  capitulo: string
  erros: number
  /** Sequência SAN até o lance (inclusive), para exibi-lo e abrir a posição no Explorar. */
  caminho: string[]
  /** Linhas que passam pelo lance, para priorizá-las no Treino. */
  linhas: string[]
}

/** O que foi estudado num dia: partidas de treino terminadas e problemas resolvidos. */
export interface Atividade {
  linhas: number
  exercicios: number
}

/** Como o problema foi resolvido da última vez: sem ajuda ou depois de errar/pedir pista. */
export type EstadoExercicio = 'primeira' | 'ajuda'

export interface Progresso {
  cartoes: Record<string, Cartao>
  errosPorAresta: Record<string, ErroAresta>
  notasConferidas: string[]
  /** Cor escolhida no Treino de cada capítulo; sem escolha, vale a cor padrão dele. */
  corPorCapitulo: Record<string, EscolhaCor>
  /** Por conjunto de exercícios, o estado de cada problema resolvido (chave = número). */
  exercicios: Record<string, Record<string, EstadoExercicio>>
  /** Repetição espaçada dos exercícios errados ou feitos com pista (chave "conjunto/n"). */
  cartoesExercicios: Record<string, Cartao>
  /** Último conjunto de exercícios aberto, para o "Continuar" da página inicial. */
  ultimoConjunto: string | null
  /** Partidas importadas do lichess e do chess.com, já comparadas com o repertório. */
  partidas: {
    lichess: string
    chesscom: string
    analisadas: Record<string, PartidaAnalisada>
    /** Repertório usado na última análise; quando muda, as partidas são analisadas de novo. */
    assinatura?: string
  }
  /** Atividade por dia (AAAA-MM-DD), para a sequência de dias e o calendário do painel. */
  atividade: Record<string, Atividade>
  config: Configuracoes
}

const CHAVE = 'aberturas.progresso.v1'

export const CONFIG_PADRAO: Configuracoes = {
  notacao: 'en',
  dicasNoTreino: 'sempre',
  tempoDica: 'normal',
  animacaoMs: 200,
  som: true,
  orientacaoAutomatica: true,
  novasPorDia: 5,
  tema: 'auto',
  mostrarMotor: true,
  motorAoVivo: false,
  mostrarTaticas: true,
  taticasAutomaticas: false,
  adivinhar: false,
  profundidade: 'colunas',
}

function progressoVazio(): Progresso {
  return {
    cartoes: {},
    errosPorAresta: {},
    notasConferidas: [],
    corPorCapitulo: {},
    exercicios: {},
    cartoesExercicios: {},
    ultimoConjunto: null,
    partidas: { lichess: '', chesscom: '', analisadas: {} },
    atividade: {},
    config: { ...CONFIG_PADRAO },
  }
}

/** Aceita dados salvos ou importados, completando o que faltar com os padrões. */
export function normalizarProgresso(dados: unknown): Progresso | null {
  if (typeof dados !== 'object' || dados === null) return null
  const parcial = dados as Partial<Progresso>
  const ehObjeto = (valor: unknown) => typeof valor === 'object' && valor !== null
  if (!ehObjeto(parcial.cartoes)) return null
  return {
    cartoes: parcial.cartoes!,
    errosPorAresta: ehObjeto(parcial.errosPorAresta) ? parcial.errosPorAresta! : {},
    notasConferidas: Array.isArray(parcial.notasConferidas) ? parcial.notasConferidas : [],
    corPorCapitulo: ehObjeto(parcial.corPorCapitulo) ? parcial.corPorCapitulo! : {},
    exercicios: ehObjeto(parcial.exercicios) ? parcial.exercicios! : {},
    cartoesExercicios: ehObjeto(parcial.cartoesExercicios) ? parcial.cartoesExercicios! : {},
    ultimoConjunto: typeof parcial.ultimoConjunto === 'string' ? parcial.ultimoConjunto : null,
    partidas: {
      lichess: '',
      chesscom: '',
      analisadas: {},
      ...(ehObjeto(parcial.partidas) ? parcial.partidas : {}),
    },
    atividade: ehObjeto(parcial.atividade) ? parcial.atividade! : {},
    config: { ...CONFIG_PADRAO, ...(ehObjeto(parcial.config) ? parcial.config : {}) },
  }
}

/**
 * Progresso de antes do login (uma única chave por aparelho). Hoje cada conta tem a sua
 * chave; este só é lido para oferecer juntá-lo à conta de quem entrar.
 */
const CHAVE_SEM_CONTA = CHAVE

const chaveDaConta = (uid: string) => `${CHAVE}.${uid}`

/** Conta cujo progresso está carregado; sem conta, nada é gravado. */
let chaveAtual: string | null = null

/** Estado único do app; com uma conta aberta, toda mudança é gravada no localStorage dela. */
export const progresso = reactive<Progresso>(progressoVazio())

watch(
  progresso,
  (valor) => {
    if (chaveAtual) gravar(chaveAtual, valor)
  },
  { deep: true },
)

/** Carrega o progresso desta conta guardado neste aparelho (ou começa do zero). */
export function abrirProgressoDaConta(uid: string): void {
  const salvo = normalizarProgresso(ler<unknown>(chaveDaConta(uid), null))
  // Conta nova no aparelho: herda as preferências que já estavam em uso aqui (antes do login).
  const configDoAparelho = normalizarProgresso(ler<unknown>(CHAVE_SEM_CONTA, null))?.config ?? progresso.config
  const novo = salvo ?? { ...progressoVazio(), config: { ...configDoAparelho } }
  chaveAtual = chaveDaConta(uid)
  substituirProgresso(novo)
  gravar(chaveAtual, progresso)
}

/** Ao sair da conta: a tela volta vazia e o progresso fica guardado na chave da conta. */
export function fecharProgresso(): void {
  chaveAtual = null
  substituirProgresso({ ...progressoVazio(), config: { ...progresso.config } })
}

function temEstudo(dados: Progresso): boolean {
  return (
    Object.keys(dados.cartoes).length > 0 ||
    Object.keys(dados.cartoesExercicios).length > 0 ||
    Object.keys(dados.exercicios).length > 0 ||
    Object.keys(dados.errosPorAresta).length > 0 ||
    dados.notasConferidas.length > 0 ||
    Object.keys(dados.partidas.analisadas).length > 0
  )
}

/** Progresso feito neste aparelho antes de existir login, se houver algum estudo nele. */
export function progressoSemConta(): Progresso | null {
  const dados = normalizarProgresso(ler<unknown>(CHAVE_SEM_CONTA, null))
  return dados && temEstudo(dados) ? dados : null
}

export function apagarProgressoSemConta(): void {
  remover(CHAVE_SEM_CONTA)
}

function substituirProgresso({ config, ...resto }: Progresso): void {
  Object.assign(progresso, resto)
  // As telas guardam referência a `progresso.config`, então o objeto precisa continuar o mesmo.
  Object.assign(progresso.config, config)
}

export function resetarProgresso(): void {
  // As preferências não são progresso: o reset mantém a configuração atual.
  substituirProgresso({ ...progressoVazio(), config: { ...progresso.config } })
}

export function exportarProgresso(): string {
  return JSON.stringify(progresso, null, 2)
}

/** Devolve false se o texto não for um progresso válido; nesse caso nada muda. */
export function importarProgresso(texto: string): boolean {
  let dados: unknown
  try {
    dados = JSON.parse(texto)
  } catch {
    return false
  }
  const novo = normalizarProgresso(dados)
  if (!novo) return false
  substituirProgresso(novo)
  return true
}
