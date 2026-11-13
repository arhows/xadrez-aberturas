import {
  chaveDaPosicao,
  chaveDoLance,
  jogarLances,
  lanceDaAmeaca,
  type LanceJogado,
} from './lances'
import type { Armadilha, Nota } from './tipos'
import type { CapituloValidado } from './validacao'

export interface SeloNota {
  id: string
  rotulo: string
  comentario?: string
  referencia?: string
  avaliacao?: string | null
}

export interface AmeacaAresta {
  san: string
  from: string
  to: string
  texto: string
}

export interface Aresta {
  /** Chave da posição de origem + SAN. */
  id: string
  de: string
  para: string
  san: string
  from: string
  to: string
  promotion?: string
  dica: string | null
  /** Ids das linhas e notas que passam por esta aresta. */
  linhas: string[]
  /** Notas que saem da linha base exatamente nesta aresta. */
  selos: SeloNota[]
  /** O que o lado que fez este lance ameaça jogar em seguida. */
  ameaca: AmeacaAresta | null
  /** Armadilhas em que este é o lance natural que cai nelas. */
  armadilhas: Armadilha[]
}

export interface No {
  /** FEN sem contadores de lance. */
  chave: string
  /** FEN completo da primeira vez que a posição apareceu. */
  fen: string
  saidas: Aresta[]
  entradas: Aresta[]
}

export interface Arvore {
  raiz: string
  nos: Map<string, No>
}

const FEN_INICIAL = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

/**
 * Mescla linhas e notas numa árvore de posições (SPEC 3.3 e 3.4).
 * Como o nó é a posição, transposições convergem para o mesmo nó.
 */
export function construirArvore(validado: CapituloValidado): Arvore {
  const nos = new Map<string, No>()

  const obterNo = (fen: string): No => {
    const chave = chaveDaPosicao(fen)
    let no = nos.get(chave)
    if (!no) {
      no = { chave, fen, saidas: [], entradas: [] }
      nos.set(chave, no)
    }
    return no
  }

  const obterAresta = (lance: LanceJogado): Aresta => {
    const origem = obterNo(lance.fenAntes)
    let aresta = origem.saidas.find((saida) => saida.san === lance.san)
    if (!aresta) {
      const destino = obterNo(lance.fenDepois)
      aresta = {
        id: `${origem.chave}|${lance.san}`,
        de: origem.chave,
        para: destino.chave,
        san: lance.san,
        from: lance.from,
        to: lance.to,
        promotion: lance.promotion,
        dica: null,
        linhas: [],
        selos: [],
        ameaca: null,
        armadilhas: [],
      }
      origem.saidas.push(aresta)
      destino.entradas.push(aresta)
    }
    return aresta
  }

  const raiz = obterNo(FEN_INICIAL).chave
  const dicasPorLinha = new Map<string, Record<string, string> | undefined>([
    ...validado.capitulo.linhas.map((linha) => [linha.id, linha.dicas] as const),
    ...(validado.capitulo.notas ?? []).map((nota) => [nota.id, nota.dicas] as const),
  ])
  const ameacasPorLinha = new Map(validado.capitulo.linhas.map((linha) => [linha.id, linha.ameacas]))
  const notasPorId = new Map<string, Nota>((validado.capitulo.notas ?? []).map((n) => [n.id, n]))

  // A ordem das unidades segue o JSON, então a primeira dica não vazia prevalece.
  for (const unidade of validado.unidades) {
    const dicas = dicasPorLinha.get(unidade.id)
    const ameacas = ameacasPorLinha.get(unidade.id)
    const nota = notasPorId.get(unidade.id)

    for (const lance of unidade.lances) {
      const aresta = obterAresta(lance)
      if (!aresta.linhas.includes(unidade.id)) aresta.linhas.push(unidade.id)

      const dica = dicas?.[chaveDoLance(lance.ply, lance.san)]
      if (!aresta.dica && dica) aresta.dica = dica

      const ameaca = ameacas?.[chaveDoLance(lance.ply, lance.san)]
      const lanceAmeaca = ameaca && lanceDaAmeaca(lance.fenDepois, ameaca.lance)
      if (!aresta.ameaca && ameaca && lanceAmeaca) {
        aresta.ameaca = { ...lanceAmeaca, texto: ameaca.texto }
      }

      if (nota && lance.ply === nota.desvioNoLance) {
        aresta.selos.push({
          id: nota.id,
          rotulo: nota.rotulo,
          comentario: nota.comentario,
          referencia: nota.referencia,
          avaliacao: nota.avaliacao,
        })
      }
    }
  }

  const arvore = { raiz, nos }
  for (const armadilha of validado.capitulo.armadilhas ?? []) {
    const caminho = percorrer(arvore, caminhoDaArmadilha(armadilha))
    caminho?.at(-1)?.armadilhas.push(armadilha)
  }
  return arvore
}

/** Os lances até o erro, para marcar a aresta e abrir a posição no Explorar. */
export function caminhoDaArmadilha(armadilha: Armadilha): string[] {
  return jogarLances(armadilha.lances, armadilha._jogo)
    .lances.slice(0, armadilha.erroNoLance)
    .map((lance) => lance.san)
}

/** Percorre a árvore a partir da raiz seguindo uma sequência de lances SAN. */
export function percorrer(arvore: Arvore, sans: string[]): Aresta[] | null {
  const caminho: Aresta[] = []
  let atual = arvore.nos.get(arvore.raiz)
  for (const san of sans) {
    const aresta = atual?.saidas.find((saida) => saida.san === san)
    if (!aresta) return null
    caminho.push(aresta)
    atual = arvore.nos.get(aresta.para)
  }
  return caminho
}
