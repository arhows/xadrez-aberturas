import type { Secao } from './lib/secoes'
import { createRouter, createWebHashHistory, type RouteLocationNormalized } from 'vue-router'
import { ehArquivoDeVersaoAntiga, recarregarNaVersaoNova } from './lib/versaoNova'
import { buscarCapitulo, carregarCapitulos } from './lib/capitulos'
import { buscarConjunto, carregarConjuntos } from './lib/exercicios'
import { esperarSessao, nuvem } from './lib/nuvem'
import { atualizarAnalises } from './lib/partidasRepertorio'
import { progresso } from './lib/progresso'
import AberturasView from './views/AberturasView.vue'
import AnaliseView from './views/AnaliseView.vue'
import AberturaView from './views/AberturaView.vue'
import ConfigView from './views/ConfigView.vue'
import DiagnosticoView from './views/DiagnosticoView.vue'
import EntrarView from './views/EntrarView.vue'
import ErrosView from './views/ErrosView.vue'
import EstudoView from './views/EstudoView.vue'
import ExercicioView from './views/ExercicioView.vue'
import PartidasView from './views/PartidasView.vue'
import ProgressoView from './views/ProgressoView.vue'
import RelampagoView from './views/RelampagoView.vue'
import FundamentosView from './views/FundamentosView.vue'
import LicaoView from './views/LicaoView.vue'
import { buscarLicao } from './lib/licoes'
import EditorView from './views/EditorView.vue'
import AnalisarView from './views/AnalisarView.vue'
import PreparacaoView from './views/PreparacaoView.vue'
import JogadorView from './views/JogadorView.vue'
import TaticaView from './views/TaticaView.vue'
import { buscarEstrutura, carregarEstrategia } from './lib/estrategia'
import { buscarPartidaLogica, carregarLogico, partidaPronta } from './lib/logico'
import { buscarQuiz, carregarQuizzes } from './lib/quizzes'
import { buscarArmadilha, carregarArmadilhas } from './lib/armadilhas'
import ExerciciosView from './views/ExerciciosView.vue'
import ExplorarView from './views/ExplorarView.vue'
import InicioView from './views/InicioView.vue'
import JogarView from './views/JogarView.vue'
import TreinoView from './views/TreinoView.vue'

const exigirCapitulo = (destino: RouteLocationNormalized) =>
  buscarCapitulo(destino.params.cap as string) ? true : { name: 'inicio' }

declare module 'vue-router' {
  interface RouteMeta {
    /** Item do menu que fica marcado nesta tela. */
    secao?: Secao
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
    { path: '/aprender', name: 'aprender', component: () => import('./views/AprenderView.vue'), meta: { secao: 'aprender' } },
    { path: '/praticar', name: 'praticar', component: () => import('./views/PraticarView.vue'), beforeEnter: () => carregarConjuntos().then(() => true), meta: { secao: 'praticar' } },
    { path: '/jogar', name: 'secao-jogar', component: () => import('./views/JogarSecaoView.vue'), meta: { secao: 'jogar' } },
    { path: '/eu', name: 'eu', component: () => import('./views/EuView.vue'), meta: { secao: 'eu' } },
    { path: '/aberturas', name: 'aberturas', component: AberturasView, meta: { secao: 'aprender' } },
    { path: '/abertura/:cap', name: 'abertura', component: AberturaView, beforeEnter: exigirCapitulo, meta: { secao: 'aprender' } },
    { path: '/partida', name: 'jogar', component: JogarView, meta: { secao: 'jogar', foco: true } },
    { path: '/analise', name: 'analise', component: AnaliseView, meta: { secao: 'jogar' } },
    { path: '/relampago', name: 'relampago', component: RelampagoView, meta: { secao: 'praticar', foco: true } },
    { path: '/erros', name: 'erros', component: ErrosView, meta: { secao: 'praticar', foco: true } },
    { path: '/partidas', name: 'partidas', component: PartidasView, meta: { secao: 'jogar' } },
    { path: '/progresso', name: 'progresso', component: ProgressoView, beforeEnter: () => carregarConjuntos().then(() => true), meta: { secao: 'eu' } },
    { path: '/explorar/:cap', name: 'explorar', component: ExplorarView, beforeEnter: exigirCapitulo, meta: { secao: 'aprender', foco: true } },
    { path: '/estudo/:cap/:linha', name: 'estudo', component: EstudoView, beforeEnter: exigirCapitulo, meta: { secao: 'aprender', foco: true } },
    { path: '/treino/:cap', name: 'treino', component: TreinoView, beforeEnter: exigirCapitulo, meta: { secao: 'praticar', foco: true } },
    { path: '/exercicios', name: 'exercicios', component: ExerciciosView, beforeEnter: () => carregarConjuntos().then(() => true), meta: { secao: 'praticar' } },
    {
      path: '/exercicios/:conjunto',
      name: 'exercicio',
      component: ExercicioView,
      meta: { secao: 'praticar', foco: true },
      beforeEnter: async (destino) => {
        await carregarConjuntos()
        const conjunto = buscarConjunto(destino.params.conjunto as string)
        if (!conjunto) return { name: 'exercicios' }
        // Os conjuntos de táticas têm tela própria (a revisão de hoje chega por aqui também).
        return conjunto.tipo === 'tatica' ? { name: 'tatica', params: destino.params, query: destino.query } : true
      },
    },
    {
      path: '/taticas/:conjunto',
      name: 'tatica',
      component: TaticaView,
      meta: { secao: 'praticar', foco: true },
      beforeEnter: async (destino) => {
        await carregarConjuntos()
        return buscarConjunto(destino.params.conjunto as string)?.tipo === 'tatica' ? true : { name: 'exercicios' }
      },
    },
    {
      path: '/revisao-rapida',
      name: 'revisao-rapida',
      component: () => import('./views/RevisaoRapidaView.vue'),
      beforeEnter: () => carregarConjuntos().then(() => true),
      meta: { secao: 'praticar' },
    },
    {
      path: '/diario',
      name: 'diario',
      component: () => import('./views/DiarioView.vue'),
      beforeEnter: () => carregarConjuntos().then(() => true),
      meta: { secao: 'praticar', foco: true },
    },
    { path: '/fundamentos', name: 'fundamentos', component: FundamentosView, meta: { secao: 'aprender' } },
    {
      path: '/fundamentos/:licao',
      name: 'licao',
      component: LicaoView,
      meta: { secao: 'aprender', foco: true },
      beforeEnter: (destino) => (buscarLicao(destino.params.licao as string) ? true : { name: 'fundamentos' }),
    },
    { path: '/editor', name: 'editor', component: EditorView, meta: { secao: 'jogar' } },
    { path: '/analisar', name: 'analisar', component: AnalisarView, meta: { secao: 'jogar' } },
    { path: '/preparacao', name: 'preparacao', component: PreparacaoView, meta: { secao: 'jogar' } },
    { path: '/jogador', name: 'jogador', component: JogadorView, meta: { secao: 'jogar' } },
    { path: '/online', name: 'online', component: () => import('./views/OnlineView.vue'), meta: { secao: 'jogar' } },
    { path: '/online/:id', name: 'partida-online', component: () => import('./views/PartidaOnlineView.vue'), meta: { secao: 'jogar', foco: true } },
    { path: '/ranking', name: 'ranking', component: () => import('./views/RankingView.vue'), meta: { secao: 'jogar' } },
    {
      path: '/estrategia',
      name: 'estrategia',
      component: () => import('./views/EstrategiaView.vue'),
      beforeEnter: () => Promise.all([carregarEstrategia(), carregarQuizzes()]).then(() => true),
      meta: { secao: 'aprender' },
    },
    {
      path: '/armadilhas',
      name: 'armadilhas',
      component: () => import('./views/ArmadilhasView.vue'),
      beforeEnter: () => carregarArmadilhas().then(() => true),
      meta: { secao: 'aprender' },
    },
    {
      path: '/armadilhas/:id',
      name: 'armadilha',
      component: () => import('./views/ArmadilhaView.vue'),
      meta: { secao: 'aprender', foco: true },
      beforeEnter: async (destino) => {
        await carregarArmadilhas()
        return buscarArmadilha(destino.params.id as string) ? true : { name: 'armadilhas' }
      },
    },
    {
      path: '/estrategia/quiz/:id',
      name: 'quiz',
      component: () => import('./views/QuizView.vue'),
      meta: { secao: 'praticar', foco: true },
      beforeEnter: async (destino) => {
        await carregarQuizzes()
        return buscarQuiz(destino.params.id as string) ? true : { name: 'estrategia' }
      },
    },
    {
      path: '/estrategia/:id',
      name: 'estrutura',
      component: () => import('./views/EstruturaView.vue'),
      meta: { secao: 'aprender' },
      beforeEnter: async (destino) => {
        await carregarEstrategia()
        return buscarEstrutura(destino.params.id as string) ? true : { name: 'estrategia' }
      },
    },
    {
      path: '/estrategia/:id/:n',
      name: 'partida-modelo',
      component: () => import('./views/PartidaModeloView.vue'),
      meta: { secao: 'aprender', foco: true },
      beforeEnter: async (destino) => {
        await carregarEstrategia()
        const estrutura = buscarEstrutura(destino.params.id as string)
        return estrutura?.partidas.some((p) => p.n === Number(destino.params.n)) ? true : { name: 'estrategia' }
      },
    },
    {
      path: '/lance-a-lance',
      name: 'lance-a-lance',
      component: () => import('./views/LanceALanceView.vue'),
      meta: { secao: 'aprender' },
      beforeEnter: () => carregarLogico().then(() => true),
    },
    {
      path: '/lance-a-lance/:n',
      name: 'lance-a-lance-partida',
      component: () => import('./views/PartidaLogicaView.vue'),
      meta: { secao: 'aprender', foco: true },
      beforeEnter: async (destino) => {
        await carregarLogico()
        const partida = buscarPartidaLogica(Number(destino.params.n))
        return partida && partidaPronta(partida) ? true : { name: 'lance-a-lance' }
      },
    },
    { path: '/diagnostico', name: 'diagnostico', component: DiagnosticoView, meta: { secao: 'eu' } },
    { path: '/config', name: 'config', component: ConfigView, meta: { secao: 'eu' } },
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
  // As telas do app usam os capítulos de forma síncrona: baixa todos antes da primeira tela.
  if (!destino.meta.publica) {
    // Partidas importadas antes de uma abertura nova entrar no app passam a contar nela.
    atualizarAnalises(progresso.partidas, await carregarCapitulos())
  }
  return true
})

// Tela de uma versão que já saiu do site (aba aberta antes da publicação): recarrega no destino.
router.onError((erro, destino) => {
  if (ehArquivoDeVersaoAntiga(erro)) recarregarNaVersaoNova(destino.fullPath)
})
