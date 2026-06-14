import { defineConfig } from 'vite-plus'

const uiSource = new URL('../../packages/ui/src/index.ts', import.meta.url).pathname
const uiStyleSource = new URL('../../packages/ui/src/style.css', import.meta.url).pathname

export default defineConfig({
  resolve: {
    alias: {
      'rocokingdom-ui/style.css': uiStyleSource,
      'rocokingdom-ui': uiSource,
    },
  },
})
