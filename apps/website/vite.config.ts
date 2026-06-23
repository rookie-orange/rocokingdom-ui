import { defineConfig } from 'vite-plus'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

const uiSource = new URL('../../packages/ui/src/index.ts', import.meta.url).pathname
const uiFontSource = new URL('../../packages/ui/src/font.css', import.meta.url).pathname
const uiDecorativeFontSource = new URL('../../packages/ui/src/decorative-font.css', import.meta.url)
  .pathname
const uiStyleSource = new URL('../../packages/ui/src/style.css', import.meta.url).pathname

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      routesDirectory: './src/routes',
      generatedRouteTree: './src/route-tree.gen.ts',
      autoCodeSplitting: true,
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      'rocokingdom-ui/font.css': uiFontSource,
      'rocokingdom-ui/decorative-font.css': uiDecorativeFontSource,
      'rocokingdom-ui/style.css': uiStyleSource,
      'rocokingdom-ui': uiSource,
    },
  },
})
