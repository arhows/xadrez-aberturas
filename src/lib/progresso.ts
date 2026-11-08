import { reactive, watch } from 'vue'
import { gravar, ler } from './armazenamento'
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
  }
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
    config: { ...CONFIG_PADRAO, ...(ehObjeto(parcial.config) ? parcial.config : {}) },
  }
}

/** Estado único do app; toda mudança é gravada no localStorage. */
export const progresso = reactive<Progresso>(
  normalizarProgresso(ler<unknown>(CHAVE, null)) ?? progressoVazio(),
)

watch(progresso, (valor) => gravar(CHAVE, valor), { deep: true })

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
