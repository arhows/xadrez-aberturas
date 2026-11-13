<script setup lang="ts">
import ListaDeAtalhos from '../components/ListaDeAtalhos.vue'
import { obterCapitulos } from '../lib/capitulos'
import { diasSeguidos } from '../lib/diario'
import { nuvem, sair } from '../lib/nuvem'
import { progresso } from '../lib/progresso'
import { capitulosDoRepertorio } from '../lib/repertorio'
import { dominadoNasLinhasAtivas } from '../lib/resumoAberturas'
import { EU } from '../lib/secoes'
import { dataLocal } from '../lib/srs'

const inicial = (nuvem.nome || nuvem.email || '?').trim().charAt(0).toUpperCase()
const dias = diasSeguidos(progresso.diario, dataLocal())
const dominado = dominadoNasLinhasAtivas(capitulosDoRepertorio(obterCapitulos()))
</script>

<template>
  <div class="pagina secao-app">
    <header>
      <span class="avatar" aria-hidden="true">{{ inicial }}</span>
      <span>
        <h1>{{ nuvem.nome || 'Eu' }}</h1>
        <span class="apoio suave">{{ nuvem.email }}</span>
      </span>
    </header>

    <div class="numeros">
      <div class="cartao"><span class="titulo-pagina">{{ dias }}</span><span class="apoio suave">{{ dias === 1 ? 'dia seguido' : 'dias seguidos' }}</span></div>
      <div class="cartao"><span class="titulo-pagina">{{ progresso.sequencia }}</span><span class="apoio suave">recorde da Sequência</span></div>
      <div class="cartao"><span class="titulo-pagina">{{ dominado }}%</span><span class="apoio suave">das aberturas dominado</span></div>
    </div>

    <ListaDeAtalhos tom="eu" :grupos="EU.grupos" />

    <button type="button" class="botao perigo sair" @click="sair">Sair da conta</button>
  </div>
</template>

<style scoped>
.secao-app {
  display: grid;
  gap: var(--espaco-5);
}
header {
  display: flex;
  align-items: center;
  gap: var(--espaco-3);
}
header > span:last-child {
  display: grid;
  min-width: 0;
}
h1 {
  margin: 0;
}
.avatar {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: var(--raio-pill);
  background: var(--destaque-suave);
  color: var(--destaque);
  font: 600 22px/1 var(--font-titulo);
}
.numeros {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--espaco-2);
}
.numeros .cartao {
  gap: var(--espaco-1);
  padding: var(--espaco-3);
}
.suave {
  color: var(--texto-suave);
}
.sair {
  justify-self: start;
}
</style>
