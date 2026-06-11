import { defineConfig } from 'vite-plus'

const tokensSource = new URL('../../packages/tokens/src/index.ts', import.meta.url).pathname
const uiSource = new URL('../../packages/ui/src/index.ts', import.meta.url).pathname

export default defineConfig({
  resolve: {
    alias: {
      tokens: tokensSource,
      ui: uiSource,
    },
  },
})
