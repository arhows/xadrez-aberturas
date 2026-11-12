import type { Problema } from './exercicios'

/**
 * Problemas táticos do lichess: depois do lance do adversário (`previo`), a pessoa joga os
 * lances da `linha` e o adversário responde com os seguintes. Vale a regra do lichess: o lance
 * precisa ser o da linha, mas qualquer lance que dá xeque-mate também resolve.
 */

export type Conferencia = 'certo' | 'fim' | 'errado'

const semSinais = (san: string) => san.replace(/[+#]/g, '')

/** `passo` = quantos lances da linha já foram jogados (o da pessoa é sempre par). */
export function conferirLanceTatico(problema: Problema, passo: number, san: string, deuMate: boolean): Conferencia {
  const linha = problema.linha ?? []
  if (deuMate) return 'fim'
  if (semSinais(san) !== semSinais(linha[passo] ?? '')) return 'errado'
  return passo + 1 >= linha.length ? 'fim' : 'certo'
}

export const NOMES_DAS_FAIXAS: Record<NonNullable<Problema['faixa']>, string> = {
  facil: 'Fácil',
  medio: 'Médio',
  dificil: 'Difícil',
}

/** Explicação curta de cada tema, mostrada antes dos problemas. */
export const EXPLICACOES: Record<string, string> = {
  hangingPiece:
    'Uma peça desprotegida (ou mal protegida) pode ser capturada de graça. Antes de qualquer plano, olhe o que o adversário deixou sem defesa — e o que você deixou.',
  fork: 'Garfo: uma peça ataca duas (ou mais) peças ao mesmo tempo, e o adversário só consegue salvar uma. O cavalo é o rei dos garfos, mas peões, damas e até o rei também garfam.',
  pin: 'Cravada: uma peça não pode (ou não deve) sair do lugar porque deixaria exposta uma peça mais valiosa atrás dela. Se atrás está o rei, a cravada é absoluta: mover a peça é ilegal.',
  skewer:
    'Espeto: o contrário da cravada. A peça mais valiosa está na frente, é atacada e precisa sair, deixando a de trás para ser capturada.',
  discoveredAttack:
    'Ataque descoberto: uma peça sai da frente e abre a linha de outra (torre, bispo ou dama), que passa a atacar. A peça que se move pode fazer uma segunda ameaça ao mesmo tempo.',
  doubleCheck:
    'Xeque duplo: um ataque descoberto em que as duas peças dão xeque. Não dá para bloquear nem capturar as duas: o rei é obrigado a fugir.',
  capturingDefender:
    'Remoção do defensor: capture (ou troque) a peça que defende outra peça ou uma casa importante. Sem o defensor, o alvo cai.',
  deflection:
    'Desvio: force uma peça adversária a sair da casa ou da linha que ela precisa defender, geralmente com um sacrifício ou uma ameaça que ela é obrigada a responder.',
  attraction:
    'Atração: obrigue uma peça (muitas vezes o rei) a ir para uma casa ruim, normalmente com um sacrifício, e aproveite a posição dela lá.',
  trappedPiece: 'Peça presa: a peça adversária não tem casa segura para fugir. Ataque-a e ganhe-a.',
  backRankMate:
    'Mate do corredor: o rei está preso na última fileira pelos próprios peões, e uma torre ou dama dá o mate nela. Abrir uma "janela" (h3/h6) evita isso.',
  smotheredMate:
    'Mate sufocado: o rei está cercado pelas próprias peças e um cavalo dá o mate. O clássico tem sacrifício de dama para tapar a última casa.',
  advancedPawn:
    'Peão avançado: um peão perto da promoção é uma arma poderosa. Ameace promover, desvie quem o bloqueia ou empurre-o mesmo com sacrifício.',
  intermezzo:
    'Lance intermediário: em vez da resposta "óbvia" (recapturar, por exemplo), jogue antes uma ameaça mais forte — um xeque, um ataque — e só depois faça o lance esperado.',
  interference:
    'Interferência: coloque uma peça entre uma peça adversária e aquilo que ela defende, cortando a linha de defesa.',
  clearance:
    'Liberação: tire uma peça sua do caminho (às vezes com ganho de tempo ou sacrifício) para abrir uma casa ou uma linha para outra peça.',
  xRayAttack:
    'Raio X: uma peça age "através" de outra na mesma linha, atacando ou defendendo uma casa além dela.',
  quietMove:
    'Lance silencioso: não captura nem dá xeque, mas prepara uma ameaça impossível de parar. Costuma ser o lance mais difícil de enxergar.',
  sacrifice:
    'Sacrifício: entregar material de propósito para conseguir algo maior — mate, ganho de material mais à frente ou um ataque decisivo.',
  zugzwang:
    'Zugzwang: o adversário é obrigado a jogar, e qualquer lance piora a posição dele. Comum nos finais: às vezes o melhor é "passar a vez" com um lance de espera.',
}
