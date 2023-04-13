import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [preact(), tsconfigPaths()],
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
})
