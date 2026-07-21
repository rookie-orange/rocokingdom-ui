import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { InputNumber, inputNumberPrefixCls } from './index'

test('renders an accessible material spinbutton with shape steppers', () => {
  const html = renderToString(
    createElement(InputNumber, { defaultValue: 4, material: 'paper', max: 9, min: 1, step: 2 }),
  )

  expect(inputNumberPrefixCls).toBe('rk-input-number')
  expect(html).toContain('role="spinbutton"')
  expect(html).toContain('aria-valuenow="4"')
  expect(html).toContain('Decrease value')
  expect(html).toContain('Increase value')
  expect(html.match(/rk-roco-shape/g)?.length).toBe(2)
  expect(html).toContain('var(--rk-paper)')
})
