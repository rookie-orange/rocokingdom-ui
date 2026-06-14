import { expect, test } from 'vite-plus/test'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import packageJson from '../package.json' with { type: 'json' }
import {
  Button,
  ConfigProvider,
  buttonPrefixCls,
  defaultSeedToken,
  derivativeToken,
  mergeComponentToken,
  mergeToken,
} from '../src/index.ts'

test('exports a single button prefix class', () => {
  expect(buttonPrefixCls).toBe('rk-button')
})

test('renders a React button component with modern class name slots', () => {
  const html = renderToString(
    createElement(Button, {
      children: 'Start',
      className: 'custom-button',
      rootClassName: 'app-button',
    }),
  )

  expect(html).toContain('<button')
  expect(html).toContain('rk-button')
  expect(html).toContain('app-button')
  expect(html).toContain('custom-button')
  expect(html).toContain('type="button"')
})

test('renders button variants without runtime style registration', () => {
  const html = renderToString(
    createElement(Button, {
      children: 'Outline',
      size: 'large',
      variant: 'outline',
    }),
  )

  expect(html).toContain('rk-button')
  expect(html).toContain('Outline')
})

test('derives component tokens from ui-owned seed tokens', () => {
  const seed = mergeToken()
  const token = derivativeToken(seed)

  expect(token.buttonBg).toBe(seed.colorPrimary)
  expect(token.buttonColor).toBe(seed.colorTextLightSolid)
  expect(token.buttonHeight).toBe(seed.controlHeight)
})

test('lets ConfigProvider override tokens through css variables', () => {
  const html = renderToString(
    createElement(
      ConfigProvider,
      {
        theme: {
          components: {
            Button: {
              buttonPaddingInline: 24,
            },
          },
          token: {
            colorPrimary: '#00ff88',
            colorText: '#001a10',
            controlHeight: 48,
          },
        },
      },
      createElement(Button, { children: 'Themed' }),
    ),
  )

  expect(html).toContain('rocokingdom-ui')
  expect(html).toContain('--rk-color-primary:#00ff88')
  expect(html).toContain('--rk-color-text:#001a10')
  expect(html).toContain('--rk-button-height:48px')
  expect(html).toContain('--rk-button-padding-inline:24px')
})

test('merges component-level token overrides after derivative tokens', () => {
  const seed = mergeToken({ colorPrimary: '#123456' })
  const token = mergeComponentToken(derivativeToken(seed), {
    Button: {
      buttonBg: '#654321',
    },
  })

  expect(token.colorPrimary).toBe('#123456')
  expect(token.buttonBg).toBe('#654321')
})

test('merges partial theme tokens with defaults', () => {
  expect(mergeToken({ colorPrimary: '#123456' })).toMatchObject({
    ...defaultSeedToken,
    colorPrimary: '#123456',
  })
})

test('only exposes the package root as the public component entry', () => {
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
