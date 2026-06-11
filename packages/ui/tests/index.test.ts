import { expect, test } from 'vite-plus/test'
import {
  buttonClassName,
  buttonCss,
  buttonSizes,
  buttonTokens,
  buttonVariants,
} from '../src/index.ts'

test('creates stable button class names', () => {
  expect(buttonClassName()).toBe('rk-button rk-button--primary rk-button--md')
  expect(
    buttonClassName({
      variant: 'secondary',
      size: 'lg',
      pressed: true,
      className: 'quest-action',
    }),
  ).toBe('rk-button rk-button--secondary rk-button--lg rk-button--pressed quest-action')
})

test('exposes button variants, sizes, and material tokens', () => {
  expect(buttonVariants).toEqual(['primary', 'secondary', 'gold', 'ghost'])
  expect(buttonSizes).toEqual(['sm', 'md', 'lg'])
  expect(buttonTokens.variant.primary.background).toBe('#f6f3ec')
  expect(buttonTokens.variant.secondary.background).toBe('#2c2e31')
})

test('exports button CSS using token variables', () => {
  expect(buttonCss).toContain('.rk-button--primary')
  expect(buttonCss).toContain('var(--rk-button-variant-primary-background, #f6f3ec)')
  expect(buttonCss).toContain('border-bottom-width: var(--rk-button-base-bottom-edge, 4px);')
})
