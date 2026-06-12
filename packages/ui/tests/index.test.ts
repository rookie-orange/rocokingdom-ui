import { expect, test } from 'vite-plus/test'
import { buttonClassName, buttonCss } from '../src/index.ts'

test('exports a single button class', () => {
  expect(buttonClassName).toBe('rk-button')
})

test('exports minimal button CSS', () => {
  expect(buttonCss).toContain('.rk-button')
  expect(buttonCss).toContain('background-color: var(--gold, #e7bf67);')
  expect(buttonCss).toContain('color: var(--ink, #222222);')
  expect(buttonCss).toContain('border: 0;')
  expect(buttonCss).toContain('border-radius: 999px;')
  expect(buttonCss).toContain('background-color 160ms ease')
  expect(buttonCss).toContain('filter: brightness(1.08);')
  expect(buttonCss).toContain('transform: scale(0.98);')
})
