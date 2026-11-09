import type { CapituloCarregado } from './capitulos'
import type { Cor } from './lances'
import {
  analisarPartida,
  baixarChessCom,
  baixarLichess,
  corDoUsuario,
  lerPgns,
  type PartidaAnalisada,
  type PartidaBaixada,
} from './partidas'
import { progresso } from './progresso'

export interface ResultadoImportacao {
  baixadas: number
  novas: number
  /** Novas partidas em que o usuário saiu do livro (cada uma conta como erro no Treino). */
  desviosNovos: number
  erros: string[]
}

/**
 * Baixa as partidas dos dois sites, compara com o repertório e guarda o resultado. Cada
 * partida nova em que o usuário saiu do livro soma um erro no lance que o livro indica, o
 * mesmo registro que o Treino usa para priorizar linhas. Reimportar não conta de novo.
 */
export async function importarPartidas(
  capitulos: CapituloCarregado[],
  aoProgredir: (texto: string) => void,
): Promise<ResultadoImportacao> {
  const { lichess, chesscom } = progresso.partidas
  const baixadas: { partida: PartidaBaixada; usuario: string }[] = []
  const erros: string[] = []

  if (chesscom.trim()) {
    try {
      const lista = await baixarChessCom(chesscom.trim(), (feitos, total) =>
        aoProgredir(`chess.com: mês ${Math.min(feitos + 1, total)} de ${total}…`),
      )
      baixadas.push(...lista.map((partida) => ({ partida, usuario: chesscom.trim() })))
    } catch (erro) {
      erros.push(erro instanceof Error ? erro.message : 'Não foi possível baixar do chess.com.')
    }
  }
  if (lichess.trim()) {
    aoProgredir('lichess…')
    try {
      const lista = await baixarLichess(lichess.trim())
      baixadas.push(...lista.map((partida) => ({ partida, usuario: lichess.trim() })))
    } catch (erro) {
      erros.push(erro instanceof Error ? erro.message : 'Não foi possível baixar do lichess.')
    }
  }

  const { novas, desviosNovos } = guardar(
    baixadas.map(({ partida, usuario }) => ({ partida, cor: corDoUsuario(partida, usuario) })),
    capitulos,
  )
  return { baixadas: baixadas.length, novas, desviosNovos, erros }
}

/** Analisa e guarda as partidas; só as novas contam desvio para o Treino. */
function guardar(lista: { partida: PartidaBaixada; cor: Cor }[], capitulos: CapituloCarregado[]) {
  let novas = 0
  let desviosNovos = 0
  for (const { partida, cor } of lista) {
    if (!partida.sans.length) continue
    const analise = analisarPartida(partida, cor, capitulos)
    const jaExistia = partida.id in progresso.partidas.analisadas
    progresso.partidas.analisadas[partida.id] = analise
    if (jaExistia) continue
    novas++
    if (registrarDesvio(analise)) desviosNovos++
  }
  return { novas, desviosNovos }
}

export interface ResultadoPgn {
  lidas: number
  novas: number
  desviosNovos: number
  erros: string[]
  /** Partidas em que não deu para saber a cor do usuário (nada foi guardado delas). */
  semCor: number
}

/**
 * Importa partidas coladas em PGN (ex.: as offline do app do lichess, que não ficam no site).
 * Com `cor` = 'auto', a cor vem dos nomes; as partidas sem cor detectada ficam de fora.
 */
export function importarPgn(texto: string, cor: Cor | 'auto', capitulos: CapituloCarregado[]): ResultadoPgn {
  const { lichess, chesscom } = progresso.partidas
  const { partidas, erros } = lerPgns(texto, [lichess, chesscom])
  const comCor = partidas.flatMap(({ partida, cor: detectada }) => {
    const escolhida = cor === 'auto' ? detectada : cor
    return escolhida ? [{ partida, cor: escolhida }] : []
  })
  const { novas, desviosNovos } = guardar(comCor, capitulos)
  return { lidas: partidas.length, novas, desviosNovos, erros, semCor: partidas.length - comCor.length }
}

function registrarDesvio(analise: PartidaAnalisada): boolean {
  const aresta = analise.desvio?.aresta
  if (!analise.capitulo || !aresta) return false
  const chave = `${analise.capitulo}|${aresta.id}`
  const anterior = progresso.errosPorAresta[chave]
  progresso.errosPorAresta[chave] = {
    capitulo: analise.capitulo,
    erros: (anterior?.erros ?? 0) + 1,
    caminho: [...analise.desvio!.caminho, aresta.san],
    linhas: aresta.linhas,
  }
  return true
}
