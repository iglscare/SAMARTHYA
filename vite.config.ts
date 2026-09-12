import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3010,
    open: false,
    proxy: {
      '/api/ai-studio': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/api\/ai-studio/, ''),
        headers: {
          Connection: 'keep-alive',
        },
      },
      '/api/gemini': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/api\/gemini/, ''),
        headers: {
          Connection: 'keep-alive',
        },
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          animation: ['animejs'],
        },
      },
    },
  },
});
