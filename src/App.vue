<script setup lang="ts">
import { watch, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
</script>

<template>
  <nav v-if="nuvem.uid" class="topo">
    <RouterLink to="/" class="marca">Xadrez</RouterLink>
    <RouterLink to="/aberturas">Aberturas</RouterLink>
    <RouterLink to="/exercicios">Exercícios</RouterLink>
    <RouterLink to="/partidas">Partidas</RouterLink>
    <RouterLink to="/diagnostico">Diagnóstico</RouterLink>
    <RouterLink to="/config">Configurações</RouterLink>
  </nav>
  <div v-if="pwa.atualizacaoDisponivel" class="aviso-versao" role="status">
    <span>Há uma versão nova do app.</span>
    <button type="button" class="botao" @click="atualizarAgora">Atualizar</button>
  </div>
  <div v-if="nuvem.perguntarSemConta" class="aviso-versao" role="status">
    <span>Este aparelho tem progresso de antes do login. É seu?</span>
    <button type="button" class="botao primario" @click="juntarProgressoSemConta">Sim, juntar à minha conta</button>
    <button type="button" class="botao" @click="recusarProgressoSemConta">Não é meu</button>
  </div>
  <p v-if="nuvem.estado === 'verificando'" class="carregando">Carregando…</p>
  <main v-else>
    <RouterView :key="$route.fullPath" />
  </main>
</template>

<style scoped>
.topo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 1rem;
  padding: 0 1rem;
  border-bottom: 1px solid var(--borda);
}
.topo a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: var(--texto-suave);
  text-decoration: none;
  font-size: 0.875rem;
}
.topo .marca {
  margin-right: auto;
  color: var(--texto);
  font-size: 1rem;
  font-weight: 600;
}
.aviso-versao {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem 1rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--borda);
  background: var(--superficie);
  font-size: 0.875rem;
}
.carregando {
  margin: 3rem auto;
  color: var(--texto-suave);
  text-align: center;
}
</style>
