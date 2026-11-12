import type { Atividade, ErroAresta, EstadoExercicio, Progresso } from './progresso'
import { somarDias, type Cartao } from './srs'

/**
 * O que vai para a nuvem: tudo menos as configurações, que são de cada aparelho
 * (tema, Stockfish ao vivo no celular etc.).
 */
export type ProgressoSincronizado = Omit<Progresso, 'config'>

export function paraNuvem({ config: _config, ...resto }: Progresso): ProgressoSincronizado {
  return resto
}

/** Dia da última revisão do cartão: a próxima menos o intervalo. */
export function ultimaRevisao(cartao: Cartao): string {
  return somarDias(cartao.proxima, -cartao.intervalo)
}

/** Fica o cartão revisado por último; no empate, o com mais repetições. */
export function cartaoMaisRecente(a: Cartao, b: Cartao): Cartao {
  const ra = ultimaRevisao(a)
  const rb = ultimaRevisao(b)
  if (ra !== rb) return ra > rb ? a : b
  if (a.repeticoes !== b.repeticoes) return a.repeticoes > b.repeticoes ? a : b
  return a.proxima >= b.proxima ? a : b
}

function juntarPorChave<T>(a: Record<string, T>, b: Record<string, T>, escolher: (x: T, y: T) => T) {
  const saida: Record<string, T> = { ...a }
  for (const [chave, valor] of Object.entries(b)) {
    saida[chave] = chave in saida ? escolher(saida[chave], valor) : valor
  }
  return saida
}

function juntarErros(a: ErroAresta, b: ErroAresta): ErroAresta {
  // Com datas, vale a mudança mais recente (um erro resolvido não volta); sem elas, o maior número.
  const base =
    a.atualizado && b.atualizado && a.atualizado !== b.atualizado
      ? a.atualizado > b.atualizado
        ? a
        : b
      : a.erros >= b.erros
        ? a
        : b
  return { ...base, linhas: [...new Set([...a.linhas, ...b.linhas])] }
}

/**
 * Cada aparelho conta o que estudou nele; somar contaria duas vezes a cada sincronização,
 * então fica o maior de cada campo (a junção pode ser repetida sem mudar o resultado).
 */
function juntarAtividade(a: Atividade, b: Atividade): Atividade {
  return { linhas: Math.max(a.linhas, b.linhas), exercicios: Math.max(a.exercicios, b.exercicios) }
}

/** Resolvido sem ajuda em algum aparelho conta como resolvido sem ajuda. */
function juntarEstado(a: EstadoExercicio, b: EstadoExercicio): EstadoExercicio {
  return a === 'primeira' || b === 'primeira' ? 'primeira' : 'ajuda'
}

/**
 * Junta o progresso deste aparelho com o da nuvem sem perder estudo de nenhum dos dois.
 * Nas escolhas simples (cor do capítulo, último conjunto, nomes de usuário) vale o deste aparelho.
 */
export function juntarProgresso(local: ProgressoSincronizado, nuvem: ProgressoSincronizado): ProgressoSincronizado {
  return {
    cartoes: juntarPorChave(nuvem.cartoes, local.cartoes, cartaoMaisRecente),
    cartoesExercicios: juntarPorChave(nuvem.cartoesExercicios, local.cartoesExercicios, cartaoMaisRecente),
    errosPorAresta: juntarPorChave(nuvem.errosPorAresta, local.errosPorAresta, juntarErros),
    notasConferidas: [...new Set([...nuvem.notasConferidas, ...local.notasConferidas])],
    corPorCapitulo: { ...nuvem.corPorCapitulo, ...local.corPorCapitulo },
    exercicios: juntarPorChave(nuvem.exercicios, local.exercicios, (x, y) =>
      juntarPorChave(x, y, juntarEstado),
    ),
    ultimoConjunto: local.ultimoConjunto ?? nuvem.ultimoConjunto,
    partidas: {
      lichess: local.partidas.lichess || nuvem.partidas.lichess,
      chesscom: local.partidas.chesscom || nuvem.partidas.chesscom,
      analisadas: { ...nuvem.partidas.analisadas, ...local.partidas.analisadas },
    },
    atividade: juntarPorChave(nuvem.atividade ?? {}, local.atividade ?? {}, juntarAtividade),
    relampago: juntarPorChave(nuvem.relampago ?? {}, local.relampago ?? {}, (a, b) => Math.max(a, b)),
    anotacoes: juntarPorChave(nuvem.anotacoes ?? {}, local.anotacoes ?? {}, (a, b) => (b.atualizado > a.atualizado ? b : a)),
    // A escolha do repertório é uma lista inteira: vale a mudada por último.
    repertorio:
      (nuvem.repertorio?.atualizado ?? '') > (local.repertorio?.atualizado ?? '')
        ? nuvem.repertorio
        : (local.repertorio ?? { capitulos: [], atualizado: '' }),
  }
}
