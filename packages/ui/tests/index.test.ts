import { expect, test } from 'vite-plus/test'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import packageJson from '../package.json' with { type: 'json' }
import { Button, RocoProvider, buttonPrefixCls } from '../src/index.ts'

test('exports a single button prefix class', () => {
  expect(buttonPrefixCls).toBe('rk-button')
})

test('renders a React button component with css module classes', () => {
  const html = renderToString(
    createElement(Button, {
      children: 'Start',
      className: 'custom-button',
      material: 'stone',
      rootClassName: 'app-button',
      size: 'large',
      variant: 'outline',
    }),
  )

  expect(html).toContain('<button')
  expect(html).toContain('rk-button')
  expect(html).toContain('app-button')
  expect(html).toContain('custom-button')
  expect(html).toContain('type="button"')
})

test('renders a color variable provider without extra markup', () => {
  const html = renderToString(
    createElement(
      RocoProvider,
      {
        colors: {
          onPrimary: '#10201a',
          primary: '#6ee7b7',
        },
      },
      createElement(Button, {
        children: 'Scoped',
      }),
    ),
  )

  expect(html).not.toContain('<div')
  expect(html).not.toContain('--rk-primary:#6ee7b7')
  expect(html).not.toContain('--rk-on-primary:#10201a')
  expect(html).toContain('Scoped')
})

test('only exposes root components and the manual style entry', () => {
  expect(packageJson.exports).toEqual({
    '.': {
      types: './dist/index.d.mts',
      import: './dist/index.mjs',
    },
    './style.css': './dist/style.css',
    './package.json': './package.json',
  })
  expect(packageJson.exports).not.toHaveProperty('./button')
  expect(packageJson.sideEffects).toEqual(['**/*.css'])
})
