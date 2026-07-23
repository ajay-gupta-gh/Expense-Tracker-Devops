import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
      // VitePWA disabled due to Node.js version compatibility (requires Node 20+)
      // Can be re-enabled after upgrading Node.js
      // VitePWA({
      //   registerType: 'autoUpdate',
      //   includeAssets: ['favicon.ico', 'robots.txt'],
      //   manifest: {
      //     name: 'Expense Tracker',
      //     short_name: 'Expenses',
      //     theme_color: '#6366f1',
      //     background_color: '#f8fafc',
      //     display: 'standalone'
      //   }
      // })
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          utils: ['axios', 'date-fns']
        }
      }
    }
  }
});