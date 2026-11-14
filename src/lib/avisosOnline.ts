import { computed, reactive, watch } from 'vue'
import { nuvem } from './nuvem'
import { corDe, vezDe, type PartidaOnline } from './partidaOnline'

/**
 * Avisos das partidas on-line para o menu: desafios recebidos e partidas esperando o lance da
 * pessoa. Acompanha o Firestore em tempo real enquanto a conta está aberta; o módulo das
 * partidas on-line só carrega uns segundos depois da abertura, para não atrasar a primeira tela.
 */
export const avisosOnline = reactive({ desafios: 0, minhaVez: 0 })
export const totalDeAvisos = computed(() => avisosOnline.desafios + avisosOnline.minhaVez)

const ESPERA_MS = 2500

/** Conta os avisos de uma lista de partidas (separado para testar sem Firestore). */
export function contarAvisos(partidas: PartidaOnline[], uid: string): { desafios: number; minhaVez: number } {
  let desafios = 0
  let minhaVez = 0
  for (const p of partidas) {
    if (p.estado === 'aguardando' && p.convidado === uid) desafios++
    else if (p.estado === 'jogando' && corDe(p, uid) === vezDe(p)) minhaVez++
  }
  return { desafios, minhaVez }
}

let parar: (() => void) | null = null
let temporizador: ReturnType<typeof setTimeout> | undefined

function zerar() {
  parar?.()
  parar = null
  clearTimeout(temporizador)
  avisosOnline.desafios = 0
  avisosOnline.minhaVez = 0
}

watch(
  () => nuvem.uid,
  (uid) => {
    zerar()
    if (!uid || uid === 'teste-visual') return
    temporizador = setTimeout(async () => {
      try {
        const { observarMinhasPartidas } = await import('./servidorOnline')
        if (uid !== nuvem.uid) return
        parar = observarMinhasPartidas(
          uid,
          (lista) => Object.assign(avisosOnline, contarAvisos(lista, uid)),
          () => {},
        )
      } catch {
        // Sem internet ou módulo indisponível: fica sem avisos.
      }
    }, ESPERA_MS)
  },
  { immediate: true },
)

// No app instalado, o número também aparece no ícone (onde o sistema permite).
watch(totalDeAvisos, (n) => {
  const nav = navigator as Navigator & { setAppBadge?: (n?: number) => Promise<void>; clearAppBadge?: () => Promise<void> }
  if (n > 0) nav.setAppBadge?.(n).catch(() => {})
  else nav.clearAppBadge?.().catch(() => {})
})
