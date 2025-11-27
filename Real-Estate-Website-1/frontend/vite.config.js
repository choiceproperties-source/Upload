import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server:{
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: true,
    // Faster HMR for development
    middlewareMode: false,
    hmr: {
      host: 'localhost',
      port: 5000
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  build: {
    // Optimize for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: [],
      output: {
        manualChunks: (id) => {
          // Vendor chunks for better caching
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
          if (id.includes('node_modules/axios')) {
            return 'axios';
          }
          if (id.includes('node_modules/react-helmet-async')) {
            return 'react-helmet-async';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'css/[name]-[hash].css';
          } else if (/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(assetInfo.name)) {
            return 'images/[name]-[hash][extname]';
          } else if (/\.(woff|woff2|ttf|otf)$/i.test(assetInfo.name)) {
            return 'fonts/[name]-[hash][extname]';
          }
          return '[name]-[hash][extname]';
        }
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-helmet-async',
      'framer-motion',
      'axios',
      'react-router-dom',
      'lucide-react'
    ],
    exclude: ['node_modules']
  },
  // CSS optimization
  css: {
    postcss: './postcss.config.js'
  }
})
