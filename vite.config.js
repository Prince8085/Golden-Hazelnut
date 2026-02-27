import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173,
    strictPort: false,
    open: false,
    // HMR: Allow dynamic port detection for hot reload
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
        },
      },
    },
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})