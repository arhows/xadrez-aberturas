<script setup lang="ts">
import { LEGENDA_MARCAS } from '../lib/qualidade'
</script>

<template>
  <details class="legenda-qualidade">
    <summary>O que significam os símbolos dos lances?</summary>
    <dl>
      <template v-for="item in LEGENDA_MARCAS" :key="item.simbolo">
        <dt>{{ item.simbolo }}</dt>
        <dd><strong>{{ item.nome }}:</strong> {{ item.texto }}.</dd>
      </template>
    </dl>
    <p>
      <strong>MCO</strong> é a marca que o livro dá ao lance. <strong>Stockfish</strong> compara a chance de vitória
      antes e depois do lance: ★ melhor lance, ✓ bom (perde menos de 5 pontos), ?! imprecisão (10 ou mais),
      ? erro (20 ou mais) e ?? erro grave (30 ou mais). Os dois podem discordar: o livro olha a ideia e a prática;
      o motor, só a posição.
    </p>
  </details>
</template>

<style scoped>
.legenda-qualidade {
  font-size: 14px;
}
.legenda-qualidade summary {
  min-height: var(--alvo-toque);
  display: flex;
  align-items: center;
  color: var(--destaque);
  cursor: pointer;
}
dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2px 12px;
  margin: 0 0 0.5rem;
}
dt {
  font-weight: 700;
}
dd {
  margin: 0;
}
p {
  margin: 0;
  color: var(--texto-suave);
}
</style>
