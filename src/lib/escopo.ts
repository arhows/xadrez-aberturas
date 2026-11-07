import type { CapituloCarregado } from './capitulos'
import type { Cor } from './lances'
import { filaDoDia, type Cartao, type UnidadeRevisao } from './srs'
import type { Linha, Nota } from './tipos'

export type EscolhaCor = Cor | 'ambas'
export type Profundidade = 'colunas' | 'notas'

export type Escopo =
  | { tipo: 'capitulo' }
  | { tipo: 'grupo'; id: string }
  | { tipo: 'linha'; id: string }

export function linhasDoGrupo(capitulo: CapituloCarregado, grupo: string): Linha[] {
  return capitulo.capitulo.linhas.filter((linha) => linha.grupo === grupo)
}

export function buscarLinha(capitulo: CapituloCarregado, id: string): Linha | undefined {
  return capitulo.capitulo.linhas.find((linha) => linha.id === id)
}

export function buscarNota(capitulo: CapituloCarregado, id: string): Nota | undefined {
  return capitulo.capitulo.notas?.find((nota) => nota.id === id)
}

function linhasDoEscopo(capitulo: CapituloCarregado, escopo: Escopo): Linha[] {
  if (escopo.tipo === 'grupo') return linhasDoGrupo(capitulo, escopo.id)
  if (escopo.tipo === 'linha') {
    const linha = buscarLinha(capitulo, escopo.id)
    return linha ? [linha] : []
  }
  return capitulo.capitulo.linhas
}

/** Ids treináveis: sem linhas desativadas e sem notas ainda não conferidas (SPEC 3.2 e 3.4). */
export function idsDoEscopo(
  capitulo: CapituloCarregado,
  escopo: Escopo,
  profundidade: Profundidade,
  conferidas: string[],
): string[] {
  const linhas = linhasDoEscopo(capitulo, escopo)
  const ids = linhas.map((linha) => linha.id)

  if (profundidade === 'notas') {
    const colunas = new Set(linhas.map((linha) => linha.coluna))
    for (const nota of capitulo.capitulo.notas ?? []) {
      if (colunas.has(nota.coluna) && (!nota.conferir || conferidas.includes(nota.id))) {
        ids.push(nota.id)
      }
    }
  }

  return ids.filter((id) => !capitulo.desativadas.includes(id))
}

export function coresDaEscolha(escolha: EscolhaCor): Cor[] {
  return escolha === 'ambas' ? ['w', 'b'] : [escolha]
}

export function unidadesDeRevisao(
  capitulo: CapituloCarregado,
  ids: string[],
  cores: Cor[],
): UnidadeRevisao[] {
  return ids.flatMap((linha) => cores.map((cor) => ({ capitulo: capitulo.capitulo.id, linha, cor })))
}

export interface DescricaoUnidade {
  titulo: string
  nome?: string
  resumo?: string
  avaliacao?: string | null
  referencia?: string
}

/** O título não cita lances, para poder aparecer durante o Treino sem entregar a resposta. */
export function descreverUnidade(capitulo: CapituloCarregado, id: string): DescricaoUnidade {
  const linha = buscarLinha(capitulo, id)
  if (linha) {
    return {
      titulo: linha.coluna === null ? 'Linha bônus' : `Coluna ${linha.coluna}`,
      nome: linha.nome,
      resumo: linha.resumo,
      avaliacao: linha.avaliacao,
    }
  }
  const nota = buscarNota(capitulo, id)
  return {
    titulo: `Nota ${nota?.rotulo ?? id} · coluna ${nota?.coluna ?? '?'}`,
    resumo: nota?.comentario,
    avaliacao: nota?.avaliacao,
    referencia: nota?.referencia,
  }
}

/**
 * Fila de "Revisar agora": tudo o que venceu, de qualquer cor e profundidade,
 * mais as novas do dia conforme as últimas escolhas do Treino.
 */
export function filaDeRevisao(
  capitulo: CapituloCarregado,
  cartoes: Record<string, Cartao>,
  hoje: string,
  opcoes: { cor: EscolhaCor; profundidade: Profundidade; limiteNovas: number; conferidas: string[] },
): { fila: UnidadeRevisao[]; ids: string[] } {
  const todos = idsDoEscopo(capitulo, { tipo: 'capitulo' }, 'notas', opcoes.conferidas)
  const { pendentes } = filaDoDia(
    unidadesDeRevisao(capitulo, todos, ['w', 'b']),
    cartoes,
    hoje,
    0,
  )

  const escolhidos = idsDoEscopo(
    capitulo,
    { tipo: 'capitulo' },
    opcoes.profundidade,
    opcoes.conferidas,
  )
  const { novas } = filaDoDia(
    unidadesDeRevisao(capitulo, escolhidos, coresDaEscolha(opcoes.cor)),
    cartoes,
    hoje,
    opcoes.limiteNovas,
  )

  const fila = [...pendentes, ...novas]
  return { fila, ids: [...new Set([...escolhidos, ...fila.map((unidade) => unidade.linha)])] }
}
