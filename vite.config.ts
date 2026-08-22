import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxying avoids CORS in dev. Backend URL/port is a guess — adjust
      // if it differs. /keywords 404s until the backend implements it.
      '/status': process.env.VITE_BACKEND_URL ?? 'http://localhost:3000',
      '/keywords': process.env.VITE_BACKEND_URL ?? 'http://localhost:3000',
    },
  },
})
