import { readFileSync } from 'node:fs'
import { expect, test } from 'vite-plus/test'
import { floatingContentClassName, floatingContentPrefixCls } from './index'

const floatingContentCss = readFileSync(
  new URL('./floating-content.module.css', import.meta.url),
  'utf8',
)

test('provides one motion contract for portalled floating content', () => {
  expect(floatingContentPrefixCls).toBe('rk-floating-content')
  expect(floatingContentClassName).toContain(floatingContentPrefixCls)
  expect(floatingContentCss).toContain(".content[data-state='open']")
  expect(floatingContentCss).toContain(".content[data-state='delayed-open']")
  expect(floatingContentCss).toContain(".content[data-state='instant-open']")
  expect(floatingContentCss).toContain(".content[data-state='closed']")
  expect(floatingContentCss).toContain('@keyframes rk-floating-content-in')
  expect(floatingContentCss).toContain('@keyframes rk-floating-content-out')
  expect(floatingContentCss).toContain('@media (prefers-reduced-motion: reduce)')
})
