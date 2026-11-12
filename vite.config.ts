import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { pluginServiceWorker } from './scripts/pwa/serviceWorker.ts'

export default defineConfig({
  // Caminhos relativos para funcionar em qualquer hospedagem estática.
  base: './',
  // <piece> é a tag das peças do chessground (usada na paleta do editor de posição).
  plugins: [vue({ template: { compilerOptions: { isCustomElement: (tag) => tag === 'piece' } } }), pluginServiceWorker()],
  test: {
    include: ['tests/**/*.test.ts'],
  },
})
