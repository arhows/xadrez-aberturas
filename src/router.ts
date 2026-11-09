import { createRouter, createWebHashHistory, type RouteLocationNormalized } from 'vue-router'
import { buscarCapitulo } from './lib/capitulos'
import { buscarConjunto, carregarConjuntos } from './lib/exercicios'
import { esperarSessao, nuvem } from './lib/nuvem'
import AberturasView from './views/AberturasView.vue'
import AberturaView from './views/AberturaView.vue'
import ConfigView from './views/ConfigView.vue'
import DiagnosticoView from './views/DiagnosticoView.vue'
import EntrarView from './views/EntrarView.vue'
import EstudoView from './views/EstudoView.vue'
import ExercicioView from './views/ExercicioView.vue'
import PartidasView from './views/PartidasView.vue'
import ExerciciosView from './views/ExerciciosView.vue'
import ExplorarView from './views/ExplorarView.vue'
import InicioView from './views/InicioView.vue'
import TreinoView from './views/TreinoView.vue'

const exigirCapitulo = (destino: RouteLocationNormalized) =>
  buscarCapitulo(destino.params.cap as string) ? true : { name: 'inicio' }

declare module 'vue-router' {
  interface RouteMeta {
    /** Item do menu que fica marcado nesta tela. */
    secao?: 'inicio' | 'aberturas' | 'exercicios' | 'partidas' | 'diagnostico' | 'config'
    /** Tela de foco (Treino, Exercício): no celular some a barra inferior. */
    foco?: boolean
    publica?: boolean
  }
}

// Rotas com hash funcionam em qualquer hospedagem estática, sem regra de reescrita.
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/entrar', name: 'entrar', component: EntrarView, meta: { publica: true } },
    { path: '/', name: 'inicio', component: InicioView, meta: { secao: 'inicio' } },
    { path: '/aberturas', name: 'aberturas', component: AberturasView, meta: { secao: 'aberturas' } },
    { path: '/abertura/:cap', name: 'abertura', component: AberturaView, beforeEnter: exigirCapitulo, meta: { secao: 'aberturas' } },
    { path: '/partidas', name: 'partidas', component: PartidasView, meta: { secao: 'partidas' } },
    { path: '/explorar/:cap', name: 'explorar', component: ExplorarView, beforeEnter: exigirCapitulo, meta: { secao: 'aberturas' } },
    { path: '/estudo/:cap/:linha', name: 'estudo', component: EstudoView, beforeEnter: exigirCapitulo, meta: { secao: 'aberturas' } },
    { path: '/treino/:cap', name: 'treino', component: TreinoView, beforeEnter: exigirCapitulo, meta: { secao: 'aberturas', foco: true } },
    { path: '/exercicios', name: 'exercicios', component: ExerciciosView, beforeEnter: () => carregarConjuntos().then(() => true), meta: { secao: 'exercicios' } },
    {
      path: '/exercicios/:conjunto',
      name: 'exercicio',
      component: ExercicioView,
      meta: { secao: 'exercicios', foco: true },
      beforeEnter: async (destino) => {
        await carregarConjuntos()
        return buscarConjunto(destino.params.conjunto as string) ? true : { name: 'exercicios' }
      },
    },
    { path: '/diagnostico', name: 'diagnostico', component: DiagnosticoView, meta: { secao: 'diagnostico' } },
    { path: '/config', name: 'config', component: ConfigView, meta: { secao: 'config' } },
    { path: '/:resto(.*)', redirect: '/' },
  ],
})

// Só quem entrou na conta usa o app; cada conta tem o próprio progresso.
router.beforeEach(async (destino) => {
  await esperarSessao()
  const conectado = nuvem.uid !== null
  if (!conectado && !destino.meta.publica) {
    return destino.fullPath === '/' ? { name: 'entrar' } : { name: 'entrar', query: { volta: destino.fullPath } }
  }
  if (conectado && destino.name === 'entrar') {
    const volta = destino.query.volta
    return typeof volta === 'string' && volta.startsWith('/') ? volta : { name: 'inicio' }
  }
  return true
})
