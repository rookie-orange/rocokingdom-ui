import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import { defineConfig } from 'vite-plus'

const tokensSource = new URL('../../packages/tokens/src/index.ts', import.meta.url).pathname
const uiSource = new URL('../../packages/ui/src/index.ts', import.meta.url).pathname
const uiStyleSource = new URL('../../packages/ui/src/style.css.ts', import.meta.url).pathname

export default defineConfig({
  plugins: [vanillaExtractPlugin()],
  resolve: {
    alias: {
      '@rocokingdom-ui/tokens': tokensSource,
      'rocokingdom-ui/style.css': uiStyleSource,
      'rocokingdom-ui': uiSource,
    },
  },
})
