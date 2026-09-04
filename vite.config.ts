import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Electron loads the production renderer from a file:// URL.
  base: './',
  plugins: [react()],
})
