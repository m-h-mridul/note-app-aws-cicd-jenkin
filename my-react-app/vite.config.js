import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // server: {
  //   port: 8080,
  // },
  server: {
    host: '0.0.0.0',
    port: 8000, 
     watch: {
       usePolling: true
     }
  },
  plugins: [react()],
})
