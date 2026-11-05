import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    // Dev proxy: any request to /api/* is forwarded to the Express server.
    // This means in dev the browser talks to localhost:5173 (same origin),
    // so the browser never makes a cross-origin request and CORS is not
    // an issue during development.
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
