import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    dts: true,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
})
