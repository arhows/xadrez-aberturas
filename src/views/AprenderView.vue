<script setup lang="ts">
import ListaDeAtalhos from '../components/ListaDeAtalhos.vue'
import { obterCapitulos } from '../lib/capitulos'
import { feitosNaLicao } from '../lib/fundamentos'
import { LICOES } from '../lib/licoes'
import { progresso } from '../lib/progresso'
import { capitulosDoRepertorio, repertorioEscolhido } from '../lib/repertorio'
import { dominadoNasLinhasAtivas } from '../lib/resumoAberturas'
import { APRENDER } from '../lib/secoes'

const dominado = dominadoNasLinhasAtivas(capitulosDoRepertorio(obterCapitulos()))
const totalFundamentos = LICOES.reduce((soma, l) => soma + l.exercicios.length, 0)
const feitosFundamentos = LICOES.reduce((soma, l) => soma + feitosNaLicao(l, progresso.fundamentos), 0)
const selos = {
  fundamentos: feitosFundamentos ? `${feitosFundamentos} DE ${totalFundamentos}` : undefined,
  aberturas: dominado ? `${dominado}% ${repertorioEscolhido.value ? 'DO REPERTÓRIO' : 'DOMINADO'}` : undefined,
}
</script>

<template>
  <div class="pagina secao-app">
    <header>
      <h1>{{ APRENDER.nome }}</h1>
      <p class="corpo suave">{{ APRENDER.descricao }}</p>
    </header>
    <ListaDeAtalhos tom="aprender" :grupos="APRENDER.grupos" :selos="selos" />
    <p class="apoio suave">
      Depois de estudar, fixe em <RouterLink to="/praticar">Praticar</RouterLink>: o app traz de volta o que você aprendeu no dia certo.
    </p>
  </div>
</template>

<style scoped>
.secao-app {
  display: grid;
  gap: var(--espaco-5);
}
header {
  display: grid;
  gap: var(--espaco-1);
}
h1,
p {
  margin: 0;
}
.suave {
  color: var(--texto-suave);
}
</style>
