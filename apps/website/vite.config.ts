import { defineConfig } from 'vite-plus'
import { tokenVarsPlugin } from '../../packages/ui/build/token-vars-plugin.ts'

const tokensSource = new URL('../../packages/tokens/src/index.ts', import.meta.url).pathname
const uiSource = new URL('../../packages/ui/src/index.ts', import.meta.url).pathname
const uiStyleSource = new URL('../../packages/ui/src/style.ts', import.meta.url).pathname
const buttonSource = new URL('../../packages/ui/src/button/index.tsx', import.meta.url).pathname

export default defineConfig({
  plugins: [tokenVarsPlugin()],
  resolve: {
    alias: {
      '@rocokingdom-ui/tokens': tokensSource,
      'rocokingdom-ui/style.css': uiStyleSource,
      'rocokingdom-ui/button': buttonSource,
      'rocokingdom-ui': uiSource,
    },
  },
})
