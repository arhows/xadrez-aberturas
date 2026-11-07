import type { CapituloCarregado } from './capitulos'
import type { Cor } from './lances'
import {
  filaDoDia,
  idCartao,
  repartirVagas,
  vagasDoDia,
  type Cartao,
  type UnidadeRevisao,
} from './srs'
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

export function corDoCapitulo(
  capitulo: CapituloCarregado,
  corPorCapitulo: Record<string, EscolhaCor>,
): EscolhaCor {
  return corPorCapitulo[capitulo.capitulo.id] ?? capitulo.capitulo.corPadrao ?? 'ambas'
}

export interface EstadoDaRevisao {
  cartoes: Record<string, Cartao>
  notasConferidas: string[]
  corPorCapitulo: Record<string, EscolhaCor>
  profundidade: Profundidade
  novasPorDia: number
}

export interface PlanoDeRevisao {
  capitulo: CapituloCarregado
  fila: UnidadeRevisao[]
  /** Tudo o que conta como lance do livro durante a revisão deste capítulo. */
  ids: string[]
}

/**
 * Fila de "Revisar agora" de cada capítulo: tudo o que venceu, de qualquer cor e
 * profundidade, mais as linhas novas, com o limite diário repartido entre os capítulos.
 */
export function planoDeRevisao(
  capitulos: CapituloCarregado[],
  estado: EstadoDaRevisao,
  hoje: string,
): PlanoDeRevisao[] {
  const { cartoes, notasConferidas } = estado

  const bases = capitulos.map((capitulo) => {
    const todos = idsDoEscopo(capitulo, { tipo: 'capitulo' }, 'notas', notasConferidas)
    const { pendentes } = filaDoDia(unidadesDeRevisao(capitulo, todos, ['w', 'b']), cartoes, hoje, 0)

    const escolhidos = idsDoEscopo(
      capitulo,
      { tipo: 'capitulo' },
      estado.profundidade,
      notasConferidas,
    )
    const cores = coresDaEscolha(corDoCapitulo(capitulo, estado.corPorCapitulo))
    const novas = unidadesDeRevisao(capitulo, escolhidos, cores).filter(
      (unidade) => !cartoes[idCartao(unidade)],
    )
    return { capitulo, pendentes, novas, escolhidos }
  })

  const vagas = repartirVagas(
    bases.map(({ capitulo, novas }) => {
      const doCapitulo = Object.entries(cartoes).filter(([id]) =>
        id.startsWith(`${capitulo.capitulo.id}/`),
      )
      return {
        id: capitulo.capitulo.id,
        disponiveis: novas.length,
        criadasHoje: doCapitulo.filter(([, cartao]) => cartao.criado === hoje).length,
        iniciadas: doCapitulo.length,
      }
    }),
    vagasDoDia(cartoes, hoje, estado.novasPorDia),
  )

  return bases.map(({ capitulo, pendentes, novas, escolhidos }) => {
    const fila = [...pendentes, ...novas.slice(0, vagas.get(capitulo.capitulo.id) ?? 0)]
    return {
      capitulo,
      fila,
      ids: [...new Set([...escolhidos, ...fila.map((unidade) => unidade.linha)])],
    }
  })
}
