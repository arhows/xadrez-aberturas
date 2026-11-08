import { createRouter, createWebHashHistory, type RouteLocationNormalized } from 'vue-router'
import { buscarCapitulo } from './lib/capitulos'
import { buscarConjunto, carregarConjuntos } from './lib/exercicios'
import AberturasView from './views/AberturasView.vue'
import AberturaView from './views/AberturaView.vue'
import ConfigView from './views/ConfigView.vue'
import DiagnosticoView from './views/DiagnosticoView.vue'
import EstudoView from './views/EstudoView.vue'
import ExercicioView from './views/ExercicioView.vue'
import PartidasView from './views/PartidasView.vue'
import ExerciciosView from './views/ExerciciosView.vue'
import ExplorarView from './views/ExplorarView.vue'
import InicioView from './views/InicioView.vue'
import TreinoView from './views/TreinoView.vue'

const exigirCapitulo = (destino: RouteLocationNormalized) =>
  buscarCapitulo(destino.params.cap as string) ? true : { name: 'inicio' }

// Rotas com hash funcionam em qualquer hospedagem estática, sem regra de reescrita.
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'inicio', component: InicioView },
    { path: '/aberturas', name: 'aberturas', component: AberturasView },
    { path: '/abertura/:cap', name: 'abertura', component: AberturaView, beforeEnter: exigirCapitulo },
    { path: '/partidas', name: 'partidas', component: PartidasView },
    { path: '/explorar/:cap', name: 'explorar', component: ExplorarView, beforeEnter: exigirCapitulo },
    { path: '/estudo/:cap/:linha', name: 'estudo', component: EstudoView, beforeEnter: exigirCapitulo },
    { path: '/treino/:cap', name: 'treino', component: TreinoView, beforeEnter: exigirCapitulo },
    { path: '/exercicios', name: 'exercicios', component: ExerciciosView, beforeEnter: () => carregarConjuntos().then(() => true) },
    {
      path: '/exercicios/:conjunto',
      name: 'exercicio',
      component: ExercicioView,
      beforeEnter: async (destino) => {
        await carregarConjuntos()
        return buscarConjunto(destino.params.conjunto as string) ? true : { name: 'exercicios' }
      },
    },
    { path: '/diagnostico', name: 'diagnostico', component: DiagnosticoView },
    { path: '/config', name: 'config', component: ConfigView },
    { path: '/:resto(.*)', redirect: '/' },
  ],
})
