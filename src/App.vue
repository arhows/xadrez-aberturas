<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter, type RouteMeta } from 'vue-router'
import { juntarProgressoSemConta, nuvem, recusarProgressoSemConta } from './lib/nuvem'
import { progresso } from './lib/progresso'
import { atualizarAgora, pwa } from './lib/pwa'

const rota = useRoute()
const roteador = useRouter()

// Entrou ou saiu da conta (inclusive em outra aba): leva para a tela certa.
watch(
  () => nuvem.uid,
  (uid, anterior) => {
    if (nuvem.estado === 'verificando') return
    if (!uid && rota.name !== 'entrar') void roteador.replace({ name: 'entrar' })
    else if (uid && uid !== anterior && rota.name === 'entrar') {
      const volta = rota.query.volta
      void roteador.replace(typeof volta === 'string' && volta.startsWith('/') ? volta : { name: 'inicio' })
    }
  },
)

watchEffect(() => {
  document.documentElement.dataset.tema = progresso.config.tema
})

const icone = `${import.meta.env.BASE_URL}icones/icone-192.png`
const secao = computed(() => rota.meta.secao)
/** Treino e Exercício: no celular a barra inferior some para o tabuleiro ganhar altura. */
const foco = computed(() => rota.meta.foco === true)

type Secao = NonNullable<RouteMeta['secao']>
const LINKS: { secao: Secao; para: string; nome: string }[] = [
  { secao: 'inicio', para: '/', nome: 'Início' },
  { secao: 'aberturas', para: '/aberturas', nome: 'Aberturas' },
  { secao: 'exercicios', para: '/exercicios', nome: 'Exercícios' },
  { secao: 'partidas', para: '/partidas', nome: 'Partidas' },
  { secao: 'progresso', para: '/progresso', nome: 'Progresso' },
  { secao: 'diagnostico', para: '/diagnostico', nome: 'Diagnóstico' },
  { secao: 'config', para: '/config', nome: 'Configurações' },
]
const NA_BARRA = LINKS.slice(0, 4)
const NO_MAIS = LINKS.slice(4)
const noMais = computed(() => NO_MAIS.some((link) => link.secao === secao.value))

// "Mais" (celular): folha com Progresso, Diagnóstico e Configurações.
const maisAberto = ref(false)
watch(() => rota.fullPath, () => (maisAberto.value = false))
</script>

<template>
  <template v-if="nuvem.uid">
    <nav class="topo so-computador" aria-label="Principal">
      <RouterLink to="/" class="marca"><img :src="icone" alt="" />Xadrez</RouterLink>
      <RouterLink
        v-for="link in LINKS"
        :key="link.secao"
        :to="link.para"
        :aria-current="secao === link.secao ? 'page' : undefined"
      >{{ link.nome }}</RouterLink>
    </nav>
    <header v-if="!foco" class="marca-movel so-celular">
      <RouterLink to="/" class="marca"><img :src="icone" alt="" />Xadrez</RouterLink>
    </header>
  </template>

  <div v-if="pwa.atualizacaoDisponivel" class="faixa" role="status">
    <span class="texto">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" />
      </svg>
      Há uma versão nova do app.
    </span>
    <span class="acoes">
      <button type="button" class="botao primario" @click="atualizarAgora">Atualizar</button>
    </span>
  </div>
  <div v-if="nuvem.perguntarSemConta" class="faixa" role="status">
    <span class="texto">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" /><path d="M12 8v5M12 16v.5" />
      </svg>
      Este aparelho tem progresso de antes do login. É seu?
    </span>
    <span class="acoes">
      <button type="button" class="botao primario" @click="juntarProgressoSemConta">Sim, juntar à minha conta</button>
      <button type="button" class="botao" @click="recusarProgressoSemConta">Não é meu</button>
    </span>
  </div>

  <p v-if="nuvem.estado === 'verificando'" class="carregando">Carregando…</p>
  <main v-else :class="{ 'com-barra': nuvem.uid && !foco }">
    <RouterView :key="$route.fullPath" />
  </main>

  <template v-if="nuvem.uid && !foco">
    <div v-if="maisAberto" class="fundo-folha so-celular" @click="maisAberto = false"></div>
    <div v-if="maisAberto" id="folha-mais" class="folha so-celular" role="dialog" aria-label="Mais opções">
      <RouterLink
        v-for="link in NO_MAIS"
        :key="link.secao"
        :to="link.para"
        class="linha-lista"
        :aria-current="secao === link.secao ? 'page' : undefined"
      ><span class="nome">{{ link.nome }}</span></RouterLink>
    </div>

    <nav class="barra-inferior so-celular" aria-label="Principal">
      <RouterLink
        v-for="link in NA_BARRA"
        :key="link.secao"
        :to="link.para"
        :aria-current="secao === link.secao && !maisAberto ? 'page' : undefined"
      >
        <span class="icone">
          <svg v-if="link.secao === 'inicio'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1H15v-6H9v6H4.5a1 1 0 0 1-1-1z" /></svg>
          <svg v-else-if="link.secao === 'aberturas'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 18V6a2.5 2.5 0 0 1 2.5-2.5H19v13H7.5A2.5 2.5 0 0 0 5 19a2 2 0 0 0 2 2h12v-4.5" /></svg>
          <svg v-else-if="link.secao === 'exercicios'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.8" fill="currentColor" /></svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.5" cy="6" r="1" fill="currentColor" /><circle cx="4.5" cy="12" r="1" fill="currentColor" /><circle cx="4.5" cy="18" r="1" fill="currentColor" /></svg>
        </span>
        {{ link.nome }}
      </RouterLink>
      <button
        type="button"
        :aria-expanded="maisAberto"
        aria-controls="folha-mais"
        :aria-current="noMais && !maisAberto ? 'page' : undefined"
        @click="maisAberto = !maisAberto"
      >
        <span class="icone">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><circle cx="5" cy="12" r="1.4" fill="currentColor" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /><circle cx="19" cy="12" r="1.4" fill="currentColor" /></svg>
        </span>
        Mais
      </button>
    </nav>
  </template>
</template>

<style scoped>
.carregando {
  margin: 3rem auto;
  color: var(--texto-suave);
  text-align: center;
}
.marca-movel {
  display: flex;
  align-items: center;
  min-height: 52px;
  padding: 0 var(--espaco-4);
}
.marca-movel .marca {
  display: flex;
  align-items: center;
  gap: var(--espaco-2);
  min-height: var(--alvo-toque);
  color: var(--texto);
  font: 600 20px/26px var(--font-titulo);
  text-decoration: none;
}
.marca-movel img {
  width: 28px;
  height: 28px;
  border-radius: 7px;
}
.fundo-folha {
  position: fixed;
  inset: 0;
  z-index: 9;
  background: rgba(0, 0, 0, 0.3);
}
.folha {
  position: fixed;
  right: var(--espaco-3);
  bottom: calc(var(--barra-inferior) + env(safe-area-inset-bottom) + var(--espaco-2));
  left: var(--espaco-3);
  z-index: 11;
  display: grid;
  overflow: hidden;
  border: 1px solid var(--borda);
  border-radius: var(--raio-lg);
  background: var(--superficie);
  box-shadow: var(--sombra-cartao);
}
.folha .linha-lista {
  min-height: 56px;
}
.folha .linha-lista[aria-current='page'] {
  color: var(--destaque);
  background: var(--destaque-suave);
}

@media (max-width: 799.98px) {
  .so-computador {
    display: none;
  }
  main.com-barra {
    padding-bottom: calc(var(--barra-inferior) + env(safe-area-inset-bottom));
  }
}
@media (min-width: 800px) {
  .so-celular {
    display: none;
  }
}
</style>
