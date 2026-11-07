import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // Caminhos relativos para funcionar em qualquer hospedagem estática.
  base: './',
  plugins: [vue()],
  test: {
    include: ['tests/**/*.test.ts'],
  },
})
