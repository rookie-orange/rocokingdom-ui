import { defineConfig } from 'vite-plus'

const uiSource = new URL('../../packages/ui/src/index.ts', import.meta.url).pathname
const uiDecorativeFontSource = new URL('../../packages/ui/src/decorative-font.css', import.meta.url)
  .pathname
const uiFontSource = new URL('../../packages/ui/src/font.css', import.meta.url).pathname
const uiStyleSource = new URL('../../packages/ui/src/style.css', import.meta.url).pathname

export default defineConfig({
  resolve: {
    alias: {
      'rocokingdom-ui/decorative-font.css': uiDecorativeFontSource,
      'rocokingdom-ui/font.css': uiFontSource,
      'rocokingdom-ui/style.css': uiStyleSource,
      'rocokingdom-ui': uiSource,
    },
  },
})
