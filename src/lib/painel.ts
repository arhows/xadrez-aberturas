import type { CapituloCarregado } from './capitulos'
import { corDoCapitulo, coresDaEscolha, type EscolhaCor } from './escopo'
import { familiaDaAbertura, type Familia } from './familias'
import type { Atividade } from './progresso'
import { ultimaRevisao } from './sincronizacao'
import { dataLocal, estaDominado, estaPendente, idCartao, somarDias, type Cartao } from './srs'

/** Contas do painel de progresso. Tudo puro (recebe o estado), para testar sem a tela. */

/** Soma uma partida de treino ou um problema resolvido na atividade do dia. */
export function somarAtividade(
  atividade: Record<string, Atividade>,
  tipo: keyof Atividade,
  hoje = dataLocal(),
): void {
  const dia = (atividade[hoje] ??= { linhas: 0, exercicios: 0 })
  dia[tipo]++
}

/**
 * Atividade por dia. O registro diário só existe a partir desta versão; antes dela, o dia em
 * que cada cartão foi criado e o da última revisão dão uma ideia aproximada do que foi estudado.
 * Em cada dia fica o maior dos dois.
 */
export function atividadePorDia(
  registro: Record<string, Atividade>,
  cartoes: Record<string, Cartao>,
  cartoesExercicios: Record<string, Cartao>,
): Map<string, Atividade> {
  const dias = new Map<string, Atividade>()
  const estimar = (lista: Record<string, Cartao>, campo: keyof Atividade) => {
    for (const cartao of Object.values(lista)) {
      for (const dia of new Set([cartao.criado, ultimaRevisao(cartao)])) {
        const atual = dias.get(dia) ?? { linhas: 0, exercicios: 0 }
        atual[campo]++
        dias.set(dia, atual)
      }
    }
  }
  estimar(cartoes, 'linhas')
  estimar(cartoesExercicios, 'exercicios')
  for (const [dia, valor] of Object.entries(registro)) {
    const estimado = dias.get(dia) ?? { linhas: 0, exercicios: 0 }
    dias.set(dia, {
      linhas: Math.max(estimado.linhas, valor.linhas),
      exercicios: Math.max(estimado.exercicios, valor.exercicios),
    })
  }
  return dias
}

const total = (atividade: Atividade | undefined) => (atividade ? atividade.linhas + atividade.exercicios : 0)

/**
 * Dias seguidos com estudo até hoje. Se hoje ainda não teve estudo, a sequência que vem
 * até ontem continua valendo (ainda dá tempo de mantê-la).
 */
export function sequenciaDeDias(dias: Map<string, Atividade>, hoje = dataLocal()): number {
  let dia = total(dias.get(hoje)) > 0 ? hoje : somarDias(hoje, -1)
  let seguidos = 0
  while (total(dias.get(dia)) > 0) {
    seguidos++
    dia = somarDias(dia, -1)
  }
  return seguidos
}

/** Maior sequência de dias seguidos já feita. */
export function melhorSequencia(dias: Map<string, Atividade>): number {
  const ativos = [...dias.keys()].filter((dia) => total(dias.get(dia)) > 0).sort()
  let melhor = 0
  let atual = 0
  let anterior: string | null = null
  for (const dia of ativos) {
    atual = anterior !== null && somarDias(anterior, 1) === dia ? atual + 1 : 1
    melhor = Math.max(melhor, atual)
    anterior = dia
  }
  return melhor
}

export interface DiaDoCalendario {
  data: string
  total: number
  atividade: Atividade
  /** 0 = nada; 1–4 = intensidade relativa ao dia mais cheio do período. */
  nivel: 0 | 1 | 2 | 3 | 4
  futuro: boolean
}

/** Semanas (domingo a sábado) terminando na semana de hoje, para o calendário de atividade. */
export function calendario(dias: Map<string, Atividade>, semanas: number, hoje = dataLocal()): DiaDoCalendario[][] {
  const [ano, mes, dia] = hoje.split('-').map(Number)
  const domingo = somarDias(hoje, -new Date(ano, mes - 1, dia).getDay())
  const inicio = somarDias(domingo, -7 * (semanas - 1))
  const grade: DiaDoCalendario[][] = []
  let maximo = 0
  for (let s = 0; s < semanas; s++) {
    const semana: DiaDoCalendario[] = []
    for (let d = 0; d < 7; d++) {
      const data = somarDias(inicio, s * 7 + d)
      const atividade = dias.get(data) ?? { linhas: 0, exercicios: 0 }
      maximo = Math.max(maximo, total(atividade))
      semana.push({ data, total: total(atividade), atividade, nivel: 0, futuro: data > hoje })
    }
    grade.push(semana)
  }
  for (const celula of grade.flat()) {
    if (celula.total > 0) celula.nivel = Math.min(4, Math.max(1, Math.ceil((celula.total / maximo) * 4))) as DiaDoCalendario['nivel']
  }
  return grade
}

export interface Estagios {
  novas: number
  aprendendo: number
  dominadas: number
}

const somar = (a: Estagios, b: Estagios): Estagios => ({
  novas: a.novas + b.novas,
  aprendendo: a.aprendendo + b.aprendendo,
  dominadas: a.dominadas + b.dominadas,
})

export interface ResumoCapitulo {
  capitulo: CapituloCarregado
  familia: Familia
  estagios: Estagios
  /** Unidades (linha + cor) cobradas no Treino com a cor escolhida para o capítulo. */
  total: number
  pendentes: number
}

/** Estágio de cada coluna ativa nas cores que o usuário treina naquele capítulo. */
export function resumoDosCapitulos(
  capitulos: CapituloCarregado[],
  cartoes: Record<string, Cartao>,
  corPorCapitulo: Record<string, EscolhaCor>,
  hoje = dataLocal(),
): ResumoCapitulo[] {
  return capitulos.map((capitulo) => {
    const cores = coresDaEscolha(corDoCapitulo(capitulo, corPorCapitulo))
    const estagios: Estagios = { novas: 0, aprendendo: 0, dominadas: 0 }
    let pendentes = 0
    for (const linha of capitulo.capitulo.linhas) {
      if (capitulo.desativadas.includes(linha.id)) continue
      for (const cor of cores) {
        const cartao = cartoes[idCartao({ capitulo: capitulo.capitulo.id, linha: linha.id, cor })]
        if (!cartao) estagios.novas++
        else if (estaDominado(cartao)) estagios.dominadas++
        else estagios.aprendendo++
        if (estaPendente(cartao, hoje)) pendentes++
      }
    }
    const total = estagios.novas + estagios.aprendendo + estagios.dominadas
    return { capitulo, familia: familiaDaAbertura(capitulo.capitulo.base), estagios, total, pendentes }
  })
}

export function somarEstagios(resumos: { estagios: Estagios }[]): Estagios {
  return resumos.reduce((soma, r) => somar(soma, r.estagios), { novas: 0, aprendendo: 0, dominadas: 0 })
}

/** Revisões marcadas para cada um dos próximos dias; as atrasadas entram em hoje. */
export function previsaoDeRevisoes(
  cartoes: Record<string, Cartao>,
  dias: number,
  hoje = dataLocal(),
  valido: (id: string) => boolean = () => true,
): { data: string; total: number }[] {
  const previsao = Array.from({ length: dias }, (_, i) => ({ data: somarDias(hoje, i), total: 0 }))
  const ultimo = previsao[dias - 1].data
  for (const [id, cartao] of Object.entries(cartoes)) {
    if (!valido(id) || cartao.proxima > ultimo) continue
    const indice = cartao.proxima <= hoje ? 0 : previsao.findIndex((dia) => dia.data === cartao.proxima)
    if (indice >= 0) previsao[indice].total++
  }
  return previsao
}

export interface LinhaDificil {
  capitulo: string
  linha: string
  cor: 'w' | 'b'
  cartao: Cartao
}

/**
 * Linhas que mais custam: a facilidade do SM-2 cai a cada erro e sobe devagar com acertos,
 * então a mais baixa é a que mais foi errada. Só entram as que já foram erradas alguma vez.
 */
export function linhasDificeis(
  cartoes: Record<string, Cartao>,
  limite: number,
  valido: (capitulo: string, linha: string) => boolean = () => true,
): LinhaDificil[] {
  return Object.entries(cartoes)
    .map(([id, cartao]) => {
      const [caminho, cor] = id.split('|')
      const barra = caminho.indexOf('/')
      return { capitulo: caminho.slice(0, barra), linha: caminho.slice(barra + 1), cor: cor as 'w' | 'b', cartao }
    })
    .filter((item) => item.cartao.facilidade < 2.5 && valido(item.capitulo, item.linha))
    .sort((a, b) => a.cartao.facilidade - b.cartao.facilidade || a.cartao.repeticoes - b.cartao.repeticoes)
    .slice(0, limite)
}

// ---------- Evolução por semana ----------

/** Uma semana (domingo a sábado) com o valor do gráfico; `valor` null = sem dados naquela semana. */
export interface PontoSemanal {
  /** Domingo que abre a semana (AAAA-MM-DD). */
  inicio: string
  valor: number | null
  /** Texto do tooltip. */
  detalhe: string
}

/** Domingos das últimas `n` semanas, da mais antiga à atual. */
export function semanas(n: number, hoje = dataLocal()): string[] {
  const [ano, mes, dia] = hoje.split('-').map(Number)
  const domingo = somarDias(hoje, -new Date(ano, mes - 1, dia).getDay())
  return Array.from({ length: n }, (_, i) => somarDias(domingo, (i - n + 1) * 7))
}

const naSemana = (data: string, inicio: string) => data >= inicio && data <= somarDias(inicio, 6)
const plural = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`

/** Linhas de abertura treinadas e exercícios resolvidos em cada semana. */
export function atividadePorSemana(dias: Map<string, Atividade>, n: number, hoje = dataLocal()): PontoSemanal[] {
  return semanas(n, hoje).map((inicio) => {
    let linhas = 0
    let exercicios = 0
    for (const [data, a] of dias) {
      if (!naSemana(data, inicio)) continue
      linhas += a.linhas
      exercicios += a.exercicios
    }
    return { inicio, valor: linhas + exercicios, detalhe: `${plural(linhas, 'linha', 'linhas')}, ${plural(exercicios, 'exercício', 'exercícios')}` }
  })
}

/**
 * Linhas de abertura já começadas (com cartão), acumulado até o fim de cada semana: mostra o
 * repertório crescendo. `conta` filtra os cartões (só os do repertório, por exemplo).
 */
export function linhasComecadasAteCadaSemana(
  cartoes: Record<string, Cartao>,
  n: number,
  hoje = dataLocal(),
  conta: (id: string) => boolean = () => true,
): PontoSemanal[] {
  const criados = Object.entries(cartoes)
    .filter(([id]) => conta(id))
    .map(([, c]) => c.criado)
  return semanas(n, hoje).map((inicio) => {
    const fim = somarDias(inicio, 6)
    const total = criados.filter((data) => data <= fim).length
    const naquela = criados.filter((data) => naSemana(data, inicio)).length
    return { inicio, valor: total, detalhe: `${plural(total, 'linha', 'linhas')} no total (${naquela} nesta semana)` }
  })
}

/** % dos exercícios do dia resolvidos de primeira em cada semana (null se não fez nenhum). */
export function acertoDePrimeiraPorSemana(
  diario: Record<string, Record<string, string>>,
  n: number,
  hoje = dataLocal(),
): PontoSemanal[] {
  return semanas(n, hoje).map((inicio) => {
    let feitos = 0
    let primeira = 0
    for (const [data, serie] of Object.entries(diario)) {
      if (!naSemana(data, inicio)) continue
      for (const estado of Object.values(serie)) {
        feitos++
        if (estado === 'primeira') primeira++
      }
    }
    if (!feitos) return { inicio, valor: null, detalhe: 'Sem exercícios do dia nesta semana' }
    const pct = Math.round((primeira / feitos) * 100)
    return { inicio, valor: pct, detalhe: `${pct}% de primeira (${primeira} de ${feitos})` }
  })
}
