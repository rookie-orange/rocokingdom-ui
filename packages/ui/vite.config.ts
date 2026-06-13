import { defineConfig } from 'vite-plus'
import { tokenVarsPlugin } from './build/token-vars-plugin.ts'

export default defineConfig({
  pack: {
    entry: ['src/index.ts', 'src/button/index.tsx', 'src/style.ts'],
    dts: true,
    css: {
      fileName: 'style.css',
    },
    deps: {
      neverBundle: ['react', 'react/jsx-runtime'],
    },
    plugins: [tokenVarsPlugin()],
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
})
