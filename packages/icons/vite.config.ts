import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    entry: {
      index: 'src/index.ts',
    },
    dts: true,
    deps: {
      neverBundle: ['react', 'react/jsx-runtime'],
    },
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
})
