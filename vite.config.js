import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// Duas páginas: a LP e a de obrigado (/obrigado), para onde o formulário leva.
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        obrigado: fileURLToPath(new URL('./obrigado/index.html', import.meta.url)),
      },
    },
  },
})
