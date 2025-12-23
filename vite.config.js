import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap' 
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({
      hostname: 'https://eliteacademy.pro',
      dynamicRoutes: [
        '/',
        '/punjabi-typing',
        '/pdf-purchase',
        '/contact-us',
        '/privacy-policy',
        '/terms-and-conditions',
        '/shipping-delivery-policy',
        '/cancellation-and-refund-policy'
      ],
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date()
    })
  ],
})
