import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'
import { getSitemapPluginOptions } from './src/config/publicSeo.js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Sitemap(getSitemapPluginOptions()),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('firebase') || id.includes('@firebase')) return 'firebase'
          if (id.includes('framer-motion')) return 'motion'
          if (/node_modules[\/](react|react-dom|react-router|react-router-dom|scheduler)[\/]/.test(id)) return 'react'
          return undefined
        },
      },
    },
  },
})
