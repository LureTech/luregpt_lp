import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const pagina = (caminho) => fileURLToPath(new URL(caminho, import.meta.url))

// No dev, /1 sem a barra final caía na LP principal (fallback de SPA).
// Na Vercel quem resolve isso são os rewrites do vercel.json.
const barraFinal = {
  name: 'barra-final',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const [caminho, busca = ''] = req.url.split('?')
      if (/^\/(1|2|3|obrigado)$/.test(caminho)) {
        res.writeHead(301, { Location: `${caminho}/${busca ? `?${busca}` : ''}` })
        res.end()
        return
      }
      next()
    })
  },
}

// A LP, a de obrigado (/obrigado), para onde o formulário leva, e as três
// variações curtas da LP (/1, /2, /3 — ver src/data/variantes.js).
export default defineConfig({
  plugins: [react(), barraFinal],
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        main: pagina('./index.html'),
        obrigado: pagina('./obrigado/index.html'),
        v1: pagina('./1/index.html'),
        v2: pagina('./2/index.html'),
        v3: pagina('./3/index.html'),
      },
    },
  },
})
