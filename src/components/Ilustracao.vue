<script setup lang="ts">
import 'chessground/assets/chessground.base.css'
import 'chessground/assets/chessground.cburnett.css'

/**
 * Uma peça grande num círculo colorido, para telas vazias e de conquista. Com `festa`, a peça
 * dá um pulo e solta confetes (só uma vez; nada se mexe com "reduzir movimento" ligado).
 */
withDefaults(
  defineProps<{
    peca?: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
    cor?: 'white' | 'black'
    tom?: 'aprender' | 'praticar' | 'jogar' | 'eu'
    festa?: boolean
    pequena?: boolean
  }>(),
  { peca: 'knight', cor: 'white', tom: 'praticar', festa: false, pequena: false },
)

/** Ângulo e distância de cada confete, fixos para o desenho sair sempre igual. */
const CONFETES = Array.from({ length: 14 }, (_, i) => ({
  angulo: `${(i * 360) / 14 + (i % 2 ? 8 : -8)}deg`,
  distancia: `${i % 3 === 0 ? 1 : i % 3 === 1 ? 0.8 : 0.65}`,
  cor: ['var(--cor-jogar)', 'var(--cor-praticar)', 'var(--cor-aprender)', 'var(--aviso)', 'var(--cor-eu)'][i % 5],
  atraso: `${(i % 4) * 40}ms`,
}))
</script>

<template>
  <div class="ilustracao" :class="[`tom-${tom}`, { festa, pequena }]" aria-hidden="true">
    <span class="halo"></span>
    <span class="cg-wrap peca-grande"><piece :class="`${peca} ${cor}`"></piece></span>
    <template v-if="festa">
      <span
        v-for="(c, i) in CONFETES"
        :key="i"
        class="confete"
        :style="{ '--angulo': c.angulo, '--distancia': c.distancia, background: c.cor, animationDelay: c.atraso }"
      ></span>
    </template>
  </div>
</template>

<style scoped>
.ilustracao {
  --tamanho: 112px;
  position: relative;
  display: grid;
  place-items: center;
  width: var(--tamanho);
  height: var(--tamanho);
  margin: 0 auto;
}
.ilustracao.pequena {
  --tamanho: 72px;
}
.halo {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: color-mix(in srgb, var(--tom) 16%, transparent);
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--tom) 22%, transparent);
}
.peca-grande {
  position: relative;
  width: 68%;
  height: 68%;
}
.peca-grande piece {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 3px 2px rgba(0, 0, 0, 0.18));
}
.confete {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 12px;
  margin: -6px 0 0 -4px;
  border-radius: 2px;
  opacity: 0;
}
@media (prefers-reduced-motion: no-preference) {
  .festa .peca-grande {
    animation: pulo 0.7s cubic-bezier(0.3, 1.6, 0.5, 1) both;
  }
  .festa .confete {
    animation: estouro 1.1s ease-out both;
  }
}
@keyframes pulo {
  0% {
    transform: scale(0.6) translateY(12px);
  }
  100% {
    transform: none;
  }
}
@keyframes estouro {
  0% {
    opacity: 1;
    transform: rotate(var(--angulo)) translateY(0) rotate(0deg);
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(var(--angulo)) translateY(calc(var(--tamanho) * -0.9 * var(--distancia))) rotate(220deg);
  }
}
</style>
