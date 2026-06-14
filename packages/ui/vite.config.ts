import { defineConfig } from 'vite-plus'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

const tokensSource = new URL('../tokens/src/index.ts', import.meta.url).pathname

export default defineConfig({
  plugins: vanillaExtractPlugin(),
  build: {
    emptyOutDir: false,
    lib: {
      cssFileName: 'style',
      entry: 'src/index.ts',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', '@rocokingdom-ui/tokens'],
      output: {
        assetFileNames: 'style.css',
        entryFileNames: 'index.mjs',
      },
    },
  },
  resolve: {
    alias: {
      '@rocokingdom-ui/tokens': tokensSource,
    },
  },
  pack: {
    entry: ['src/index.ts'],
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
