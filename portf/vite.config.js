import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'gsap': ['gsap', '@gsap/react'],
          'framer-motion': ['framer-motion'],
          'sanity': ['@sanity/client', '@sanity/image-url'],
        },
      },
    },
  },
})
