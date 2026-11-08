import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { pluginServiceWorker } from './scripts/pwa/serviceWorker.ts'

export default defineConfig({
  // Caminhos relativos para funcionar em qualquer hospedagem estática.
  base: './',
  plugins: [vue(), pluginServiceWorker()],
  test: {
    include: ['tests/**/*.test.ts'],
  },
})
