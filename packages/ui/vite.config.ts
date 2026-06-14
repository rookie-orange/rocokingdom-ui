import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    entry: {
      index: 'src/index.ts',
      style: 'src/style.ts',
    },
    dts: true,
    css: {
      fileName: 'style.css',
      inject: false,
      minify: true,
      splitting: false,
    },
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
