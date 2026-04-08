import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/transfereES/',
  build: {
    // Aumentar warning limit pois dados-es.json é carregado separadamente
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Separar vendor libs em chunk próprio para cache independente no browser
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'icons': ['lucide-react'],
        },
      },
    },
  },
})
