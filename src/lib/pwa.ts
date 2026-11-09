import { reactive } from 'vue'

interface EventoInstalar extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

/** Estado do app instalável: atualização pendente e convite de instalação. */
export const pwa = reactive({
  /** Há uma versão nova baixada esperando para entrar. */
  atualizacaoDisponivel: false,
  /** O navegador ofereceu o convite de instalação (Chrome/Edge/Android). */
  podeInstalar: false,
  /** Já está aberto como app instalado. */
  instalado: false,
})

let convite: EventoInstalar | null = null
let registro: ServiceWorkerRegistration | null = null

function observarEspera(reg: ServiceWorkerRegistration) {
  const marcar = () => {
    // Só é "atualização" se já havia uma versão controlando a página.
    if (reg.waiting && navigator.serviceWorker.controller) pwa.atualizacaoDisponivel = true
  }
  marcar()
  reg.addEventListener('updatefound', () => {
    const novo = reg.installing
    novo?.addEventListener('statechange', () => {
      if (novo.state === 'installed') marcar()
    })
  })
}

export function iniciarPwa() {
  pwa.instalado =
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true

  window.addEventListener('beforeinstallprompt', (evento) => {
    evento.preventDefault()
    convite = evento as EventoInstalar
    pwa.podeInstalar = true
  })
  window.addEventListener('appinstalled', () => {
    convite = null
    pwa.podeInstalar = false
    pwa.instalado = true
  })

  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return

  // Na primeira visita o service worker assume a página sem precisar recarregar;
  // só recarrega quando uma versão nova substitui a anterior.
  const tinhaVersao = !!navigator.serviceWorker.controller
  let recarregando = false
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (recarregando || !tinhaVersao) return
    recarregando = true
    window.location.reload()
  })

  navigator.serviceWorker
    .register('./sw.js')
    .then((reg) => {
      registro = reg
      observarEspera(reg)
      // Procura versão nova quando o app volta para a tela.
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') reg.update().catch(() => {})
      })
    })
    .catch(() => {
      // Sem service worker o site continua funcionando, só não fica offline.
    })
}

/** Troca para a versão nova (a página recarrega). */
export function atualizarAgora() {
  registro?.waiting?.postMessage('atualizar')
}

export async function instalar() {
  if (!convite) return
  await convite.prompt()
  await convite.userChoice
  convite = null
  pwa.podeInstalar = false
}

/** iPhone/iPad não têm convite: instala-se pelo Compartilhar → Adicionar à Tela de Início. */
export function ehIos(): boolean {
  return /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

export function ehAndroid(): boolean {
  return /android/i.test(navigator.userAgent)
}

/** Celular ou tablet (onde faz sentido oferecer a instalação na tela de entrada). */
export function ehCelular(): boolean {
  return ehAndroid() || ehIos()
}
