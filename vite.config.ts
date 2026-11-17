import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/frontend'),
      '@/platform': path.resolve(__dirname, './src/frontend/platform'),
      '@/shared': path.resolve(__dirname, './src/frontend/shared'),
      '@/components': path.resolve(__dirname, './src/frontend/shared'),
      '@/portals': path.resolve(__dirname, './src/frontend/platform'),
      '@/services': path.resolve(__dirname, './src/frontend/services'),
      '@/store': path.resolve(__dirname, './src/frontend/store'),
      '@/theme': path.resolve(__dirname, './src/frontend/theme'),
      '@/types': path.resolve(__dirname, './src/frontend/types'),
      '@/language': path.resolve(__dirname, './src/frontend/language'),
      '@/locales': path.resolve(__dirname, './src/frontend/language'),
      '@/lib': path.resolve(__dirname, './src/frontend/shared/lib'),
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
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
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
