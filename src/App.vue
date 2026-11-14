<script setup lang="ts">
import { computed, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Avatar from './components/Avatar.vue'
import { meuNome } from './lib/apelido'
import { juntarProgressoSemConta, nuvem, recusarProgressoSemConta } from './lib/nuvem'
import { progresso } from './lib/progresso'
import { atualizarAgora, pwa } from './lib/pwa'
import type { Secao } from './lib/secoes'

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

/** As três partes do app (aprender, praticar, jogar), o Início e o Eu: as mesmas no topo e na barra. */
const LINKS: { secao: Secao; para: string; nome: string }[] = [
  { secao: 'inicio', para: '/', nome: 'Início' },
  { secao: 'aprender', para: '/aprender', nome: 'Aprender' },
  { secao: 'praticar', para: '/praticar', nome: 'Praticar' },
  { secao: 'jogar', para: '/jogar', nome: 'Jogar' },
  { secao: 'eu', para: '/eu', nome: 'Eu' },
]
</script>

<template>
  <template v-if="nuvem.uid">
    <nav class="topo so-computador" aria-label="Principal">
      <RouterLink to="/" class="marca"><img :src="icone" alt="" />Xadrez</RouterLink>
      <RouterLink
        v-for="link in LINKS"
        :key="link.secao"
        :to="link.para"
        :class="{ eu: link.secao === 'eu' }"
        :aria-current="secao === link.secao ? 'page' : undefined"
      >
        <template v-if="link.secao === 'eu'">
          <Avatar :uid="nuvem.uid" :nome="meuNome()" :tamanho="28" />
          <span>{{ meuNome().split(' ')[0] }}</span>
        </template>
        <template v-else>{{ link.nome }}</template>
      </RouterLink>
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

  <nav v-if="nuvem.uid && !foco" class="barra-inferior so-celular" aria-label="Principal">
    <RouterLink
      v-for="link in LINKS"
      :key="link.secao"
      :to="link.para"
      :aria-current="secao === link.secao ? 'page' : undefined"
    >
      <span class="icone">
        <svg v-if="link.secao === 'inicio'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1H15v-6H9v6H4.5a1 1 0 0 1-1-1z" /></svg>
        <svg v-else-if="link.secao === 'aprender'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 18V6a2.5 2.5 0 0 1 2.5-2.5H19v13H7.5A2.5 2.5 0 0 0 5 19a2 2 0 0 0 2 2h12v-4.5" /></svg>
        <svg v-else-if="link.secao === 'praticar'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.8" fill="currentColor" /></svg>
        <svg v-else-if="link.secao === 'jogar'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="2" /><path d="M3.5 12h17M12 3.5v17" /></svg>
        <Avatar v-else :uid="nuvem.uid" :nome="meuNome()" :tamanho="26" />
      </span>
      {{ link.nome }}
    </RouterLink>
  </nav>
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
.topo .eu {
  display: inline-flex;
  align-items: center;
  gap: var(--espaco-2);
  margin-left: auto;
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
