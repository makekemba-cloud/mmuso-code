import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path/win32'

export default defineConfig({
   plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ← this maps @ to the src folder
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // ← your backend proxy
    },
  },

  build: {
    rollupOptions: {
      // Make sure font files are handled
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.(woff|woff2|ttf|eot)$/.test(assetInfo.name ?? '')) {
            return 'assets/fonts/[name]-[hash][extname]'
          }

          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
})