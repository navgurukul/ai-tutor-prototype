import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// On GitHub Pages the app is served from /<repo name>/. The deploy workflow
// passes that in as BASE_PATH; locally the app runs from the root.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
})
