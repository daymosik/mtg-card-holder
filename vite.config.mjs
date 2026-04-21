import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: false,
  },
  plugins: [preact()],
  resolve: {
    tsconfigPaths: true,
  },
})
