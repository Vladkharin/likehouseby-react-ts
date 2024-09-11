import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },

    })
  ],
  build : {
    outDir: 'dist'
  },
  define : {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
    'process.env.VITE_ID_INSTANCE': JSON.stringify(process.env.VITE_ID_INSTANCE),
    'process.env.VITE_API_TOKEN_INSTANCE': JSON.stringify(process.env.VITE_API_TOKEN_INSTANCE)
  }
})