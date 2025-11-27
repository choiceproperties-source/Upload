// Vite Optimization Configuration
// Add to your vite.config.js for production builds

export const optimizationConfig = {
  build: {
    // Minify code aggressively
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Enable source maps for debugging without shipping full code
    sourcemap: false,
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Optimize dependencies
    rollupOptions: {
      output: [
        {
          format: 'es',
          entryFileNames: '[name]-[hash].js',
          chunkFileNames: 'chunks/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]'
        }
      ],
      // Manually specify chunks for better caching
      external: [],
    }
  },
  // Preload critical resources
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'axios',
      'react-router-dom'
    ],
    exclude: []
  }
};

// Cache configuration for assets
export const cacheConfig = {
  '/api/': { maxAge: 0, sMaxAge: 3600 }, // APIs: 1 hour server cache
  '/*.js': { maxAge: 31536000, sMaxAge: 31536000 }, // JS: 1 year cache
  '/*.css': { maxAge: 31536000, sMaxAge: 31536000 }, // CSS: 1 year cache
  '/*.webp': { maxAge: 31536000, sMaxAge: 31536000 }, // Images: 1 year cache
  '/': { maxAge: 0, sMaxAge: 60 } // HTML: 60s server cache
};
