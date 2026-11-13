import { chaveDoLance, jogarLances, lanceDaAmeaca, type LanceJogado } from './lances'
import type { JogoPrecalculado } from './jogoPrecalculado'
import type { Capitulo } from './tipos'

export type TipoProblema =
  | 'lance-ilegal'
  | 'dica-sem-lance'
  | 'linha-base-inexistente'
  | 'desvio-inconsistente'
  | 'grupo-inexistente'
  | 'id-duplicado'
  | 'ameaca-invalida'
  | 'armadilha-invalida'

export interface Problema {
  tipo: TipoProblema
  /** Id da linha ou nota. */
  linha: string
  /** O lance ou a chave de dica envolvida, quando houver. */
  lance?: string
  fen?: string
  mensagem: string
}

/** Linha ou nota já jogada no tabuleiro. */
export interface Unidade {
  id: string
  tipo: 'linha' | 'nota'
  lances: LanceJogado[]
}

export interface Estatisticas {
  linhas: number
  notas: number
  lances: number
  dicas: number
}

export interface CapituloValidado {
  capitulo: Capitulo
  /** Só as unidades sem lance ilegal; as demais ficam desativadas. */
  unidades: Unidade[]
  desativadas: string[]
  problemas: Problema[]
  estatisticas: Estatisticas
}

function validarDesvio(
  nota: { id: string; linhaBase: string; desvioNoLance: number },
  lances: LanceJogado[],
  base: LanceJogado[] | undefined,
): Problema | null {
  if (!base) {
    return {
      tipo: 'linha-base-inexistente',
      linha: nota.id,
      mensagem: `A linha base "${nota.linhaBase}" não existe ou foi desativada.`,
    }
  }

  const desvio = nota.desvioNoLance
  const inconsistente = (detalhe: string): Problema => ({
    tipo: 'desvio-inconsistente',
    linha: nota.id,
    mensagem: `desvioNoLance = ${desvio} em relação a "${nota.linhaBase}": ${detalhe}`,
  })

  const lanceNoDesvio = lances[desvio - 1]
  if (!lanceNoDesvio) return inconsistente('a nota termina antes desse lance.')

  for (let i = 0; i < desvio - 1; i++) {
    if (lances[i]?.san !== base[i]?.san) {
      return inconsistente(
        `a nota já difere antes, em ${chaveDoLance(i + 1, lances[i]?.san ?? '?')}.`,
      )
    }
  }

  if (base[desvio - 1]?.san === lanceNoDesvio.san) {
    return inconsistente(`${chaveDoLance(desvio, lanceNoDesvio.san)} ainda é o lance da linha base.`)
  }

  return null
}

/** Joga todas as linhas e notas e reúne os problemas encontrados (SPEC 3.2). */
export function validarCapitulo(capitulo: Capitulo): CapituloValidado {
  const notas = capitulo.notas ?? []
  const problemas: Problema[] = []
  const unidades: Unidade[] = []
  const desativadas: string[] = []
  const lancesPorId = new Map<string, LanceJogado[]>()

  const idsVistos = new Set<string>()

  const jogar = (id: string, tipo: Unidade['tipo'], texto: string, pre?: JogoPrecalculado): LanceJogado[] | null => {
    // A primeira ocorrência continua valendo; a repetida fica de fora e vai para o Diagnóstico.
    if (idsVistos.has(id)) {
      problemas.push({
        tipo: 'id-duplicado',
        linha: id,
        mensagem: `O id "${id}" aparece mais de uma vez; só a primeira ocorrência foi usada.`,
      })
      return null
    }
    idsVistos.add(id)

    const { lances, erro } = jogarLances(texto, pre)
    if (erro) {
      problemas.push({
        tipo: 'lance-ilegal',
        linha: id,
        lance: erro.lance,
        fen: erro.fen,
        mensagem: `Lance ilegal: ${erro.lance}`,
      })
      desativadas.push(id)
      return null
    }
    unidades.push({ id, tipo, lances })
    lancesPorId.set(id, lances)
    return lances
  }

  const grupos = new Set(capitulo.grupos.map((grupo) => grupo.id))
  let totalDicas = 0
  for (const linha of capitulo.linhas) {
    // Sem grupo válido, a linha não aparece na lista da tela inicial.
    if (!grupos.has(linha.grupo)) {
      problemas.push({
        tipo: 'grupo-inexistente',
        linha: linha.id,
        mensagem: `O grupo "${linha.grupo}" não existe em "grupos"; a linha não aparece na tela inicial.`,
      })
    }

    const entradas = Object.keys(linha.dicas ?? {})
    totalDicas += entradas.length

    const lances = jogar(linha.id, 'linha', linha.lances, linha._jogo)
    if (!lances) continue

    const chaves = new Set(lances.map((lance) => chaveDoLance(lance.ply, lance.san)))
    for (const chave of entradas) {
      if (!chaves.has(chave)) {
        problemas.push({
          tipo: 'dica-sem-lance',
          linha: linha.id,
          lance: chave,
          mensagem: `A dica "${chave}" não corresponde a nenhum lance da linha.`,
        })
      }
    }

    const porChave = new Map(lances.map((lance) => [chaveDoLance(lance.ply, lance.san), lance]))
    for (const [chave, ameaca] of Object.entries(linha.ameacas ?? {})) {
      const lance = porChave.get(chave)
      if (!lance || !lanceDaAmeaca(lance.fenDepois, ameaca.lance)) {
        problemas.push({
          tipo: 'ameaca-invalida',
          linha: linha.id,
          lance: chave,
          fen: lance?.fenDepois,
          mensagem: lance
            ? `A ameaça ${ameaca.lance} não é possível depois de ${chave}.`
            : `A ameaça em "${chave}" não corresponde a nenhum lance da linha.`,
        })
      }
    }
  }

  for (const nota of notas) {
    const entradas = Object.keys(nota.dicas ?? {})
    totalDicas += entradas.length
    const lances = jogar(nota.id, 'nota', nota.lances, nota._jogo)
    if (!lances) continue
    const chaves = new Set(lances.map((lance) => chaveDoLance(lance.ply, lance.san)))
    for (const chave of entradas) {
      if (!chaves.has(chave)) {
        problemas.push({
          tipo: 'dica-sem-lance',
          linha: nota.id,
          lance: chave,
          mensagem: `A dica "${chave}" não corresponde a nenhum lance da nota.`,
        })
      }
    }
  }

  // Depois de jogar tudo, porque uma nota pode ter como base outra nota.
  for (const nota of notas) {
    const lances = lancesPorId.get(nota.id)
    if (!lances) continue
    const problema = validarDesvio(nota, lances, lancesPorId.get(nota.linhaBase))
    if (problema) problemas.push(problema)
  }

  for (const armadilha of capitulo.armadilhas ?? []) {
    const { lances, erro } = jogarLances(armadilha.lances, armadilha._jogo)
    const sans = lances.map((lance) => lance.san)
    const noLivro = unidades.some((unidade) =>
      sans.every((san, i) => unidade.lances[i]?.san === san),
    )
    const motivo = erro
      ? `tem o lance ilegal ${erro.lance}`
      : !noLivro
        ? 'não é o início de nenhuma linha ou nota do capítulo'
        : armadilha.erroNoLance < 1 || armadilha.erroNoLance > sans.length
          ? `erroNoLance = ${armadilha.erroNoLance} está fora da sequência`
          : null
    if (motivo) {
      problemas.push({
        tipo: 'armadilha-invalida',
        linha: armadilha.id,
        mensagem: `A armadilha "${armadilha.titulo}" ${motivo}.`,
      })
    }
  }

  return {
    capitulo,
    unidades,
    desativadas,
    problemas,
    estatisticas: {
      linhas: capitulo.linhas.length,
      notas: notas.length,
      lances: unidades.reduce((total, unidade) => total + unidade.lances.length, 0),
      dicas: totalDicas,
    },
  }
}
