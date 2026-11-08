import type { CapituloCarregado } from './capitulos'
import { analisarPartida, baixarChessCom, baixarLichess, type PartidaAnalisada, type PartidaBaixada } from './partidas'
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

  let novas = 0
  let desviosNovos = 0
  for (const { partida, usuario } of baixadas) {
    if (!partida.sans.length) continue
    const analise = analisarPartida(partida, usuario, capitulos)
    const jaExistia = partida.id in progresso.partidas.analisadas
    progresso.partidas.analisadas[partida.id] = analise
    if (jaExistia) continue
    novas++
    if (registrarDesvio(analise)) desviosNovos++
  }
  return { baixadas: baixadas.length, novas, desviosNovos, erros }
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
