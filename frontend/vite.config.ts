import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


export default defineConfig({
  plugins: [react( )],
  server: {
    host: true, // This makes the server accessible externally
    hmr: {
      host: 'localhost',
    },
    // Add this block to allow ngrok
    watch: {
      usePolling: true,
    },
    // This is the key part for your ngrok issue
    allowedHosts: [
      '.ngrok-free.app' // Allows any domain ending in .ngrok-free.app
    ],
  }
})