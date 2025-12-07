import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Change to '/repo-name/' if deploying to GitHub Pages subdirectory
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@content': resolve(__dirname, './src/content'),
      '@components': resolve(__dirname, './src/components'),
      '@pages': resolve(__dirname, './src/pages'),
    },
  },
  build: {
    outDir: 'dist',
  },
})
