import { defineConfig, splitVendorChunkPlugin } from 'vite'
import preact from '@preact/preset-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: false,
  },
  plugins: [preact(), tsconfigPaths(), splitVendorChunkPlugin()],
  watch: {
    chokidar: {
      // paths: 'src/**',
      usePolling: true,
    },
  },
})
