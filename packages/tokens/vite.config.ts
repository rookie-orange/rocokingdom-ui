import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
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
