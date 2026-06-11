import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite-plus'

const tokensSource = fileURLToPath(new URL('../tokens/src/index.ts', import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      tokens: tokensSource,
    },
  },
  pack: {
    entry: ['src/index.ts', 'src/button/index.ts'],
    dts: true,
  },
  run: {
    tasks: {
      build: {
        command: 'vp pack && node scripts/build-css.mjs',
        cache: false,
      },
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
