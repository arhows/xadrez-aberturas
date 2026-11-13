<script setup lang="ts">
import 'chessground/assets/chessground.base.css'
import 'chessground/assets/chessground.cburnett.css'
import { computed } from 'vue'

/**
 * Tabuleiro pequeno, só para mostrar uma posição (listas de aberturas e armadilhas).
 * Não monta o chessground: desenha as casas com um gradiente e as peças com as mesmas imagens,
 * então dezenas cabem numa página sem custo.
 */
const props = withDefaults(defineProps<{ fen: string; orientacao?: 'white' | 'black'; rotulo?: string }>(), { orientacao: 'white', rotulo: undefined })

const NOMES: Record<string, string> = { p: 'pawn', n: 'knight', b: 'bishop', r: 'rook', q: 'queen', k: 'king' }

const pecas = computed(() => {
  const lista: { chave: string; classe: string; left: string; top: string }[] = []
  props.fen
    .split(' ')[0]
    .split('/')
    .forEach((fileira, f) => {
      let c = 0
      for (const ch of fileira) {
        if (/\d/.test(ch)) {
          c += Number(ch)
          continue
        }
        const coluna = props.orientacao === 'white' ? c : 7 - c
        const linha = props.orientacao === 'white' ? f : 7 - f
        lista.push({
          chave: `${f}-${c}`,
          classe: `${NOMES[ch.toLowerCase()]} ${ch === ch.toUpperCase() ? 'white' : 'black'}`,
          left: `${coluna * 12.5}%`,
          top: `${linha * 12.5}%`,
        })
        c++
      }
    })
  return lista
})
</script>

<template>
  <div class="cg-wrap mini-tabuleiro" role="img" :aria-label="rotulo ?? 'Posição no tabuleiro'">
    <piece v-for="p in pecas" :key="p.chave" :class="p.classe" :style="{ left: p.left, top: p.top }"></piece>
  </div>
</template>

<style scoped>
.mini-tabuleiro {
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--raio-sm);
  overflow: hidden;
  /* Quadrante superior esquerdo de cada bloco 2×2 é a casa clara (a8 e h1 claras). */
  background: repeating-conic-gradient(var(--casa-escura) 0 25%, var(--casa-clara) 0 50%) 0 0 / 25% 25%;
}
</style>
