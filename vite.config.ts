import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
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