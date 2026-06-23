import { defineConfig } from 'vite-plus'

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  fmt: {
    ignorePatterns: ['apps/website/src/route-tree.gen.ts'],
    singleQuote: true,
    semi: false,
  },
  lint: {
    ignorePatterns: ['apps/website/src/route-tree.gen.ts'],
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
  },
})
