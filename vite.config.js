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
})
