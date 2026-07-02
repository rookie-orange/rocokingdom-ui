import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import {
  RadioGroup,
  RadioGroupRoot,
  RadioIndicator,
  RadioItem,
  radioGroupPrefixCls,
  radioItemPrefixCls,
} from './index'

const radioGroupCss = readFileSync(new URL('./radio-group.module.css', import.meta.url), 'utf8')
const radioGroupSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('exports prefix classes and radix primitives', () => {
  expect(radioGroupPrefixCls).toBe('rk-radio-group')
  expect(radioItemPrefixCls).toBe('rk-radio-item')
  expect(RadioGroupRoot).toBeTruthy()
  expect(RadioIndicator).toBeTruthy()
})

test('renders a radix-backed circular radio group with form semantics', () => {
  const html = renderToString(
    createElement(
      RadioGroup,
      {
        activeMaterial: 'paper',
        className: 'custom-radio-group',
        name: 'pet',
        rootClassName: 'app-radio-group',
        value: 'paper',
      },
      createElement(
        RadioItem,
        {
          className: 'option-item',
          inactiveClassName: 'idle-item',
          value: 'stone',
        },
        'Stone',
      ),
      createElement(
        RadioItem,
        {
          activeClassName: 'selected-item',
          className: 'option-item',
          value: 'paper',
        },
        'Paper',
      ),
    ),
  )

  expect(html).toContain('role="radiogroup"')
  expect(html).toContain('rk-radio-group')
  expect(html).toContain('rk-radio-item')
  expect(html).toContain('rk-roco-shape')
  expect(html).toContain('app-radio-group')
  expect(html).toContain('custom-radio-group')
  expect(html).toContain('role="radio"')
  expect(html).toContain('aria-checked="true"')
  expect(html).toContain('aria-checked="false"')
  expect(html).toContain('selected-item')
  expect(html).toContain('idle-item')
  expect(html).toContain('option-item')
  expect(html).toContain('type="radio"')
  expect(html).toContain('name="pet"')
  expect(html).toContain('value="paper"')
  expect(html).toContain('var(--rk-paper)')
  expect(html).toContain('var(--rk-stone)')
  expect(html).not.toContain('type="hidden"')
  expect(html).not.toContain('rk-button')
})

test('lets radio item styles be customized', () => {
  const html = renderToString(
    createElement(
      RadioGroup,
      {
        activeMaterial: 'default',
        activeVariant: 'solid',
        inactiveMaterial: 'paper',
        inactiveVariant: 'text',
        value: 'fire',
      },
      createElement(RadioItem, { style: { minWidth: 96 }, value: 'fire' }, 'Fire'),
      createElement(
        RadioItem,
        {
          className: 'water-item',
          inactiveMaterial: 'stone',
          value: 'water',
        },
        'Water',
      ),
    ),
  )

  expect(html).toContain('var(--rk-primary)')
  expect(html).toContain('var(--rk-stone)')
  expect(html).toContain('water-item')
  expect(html).toContain('min-width:96px')
})

test('uses radix radio group instead of handwritten roving focus', () => {
  expect(radioGroupSource).toContain(
    "import * as RadixRadioGroup from '@radix-ui/react-radio-group'",
  )
  expect(radioGroupSource).toContain('export const RadioGroupRoot = RadixRadioGroup.Root')
  expect(radioGroupSource).toContain('export const RadioIndicator = RadixRadioGroup.Indicator')
  expect(radioGroupSource).toContain('<RadixRadioGroup.Root')
  expect(radioGroupSource).toContain('<RadixRadioGroup.Item')
  expect(radioGroupSource).toContain('<RadixRadioGroup.Indicator')
  expect(radioGroupSource).toContain('shape="circle"')
  expect(radioGroupSource).not.toContain('getRadioItems')
  expect(radioGroupSource).not.toContain("event.key === 'ArrowLeft'")
  expect(radioGroupSource).not.toContain('role="radio"')
})

test('styles radio items as stable circular controls', () => {
  expect(radioGroupCss).toContain('--rk-radio-control-size: 22px;')
  expect(radioGroupCss).toContain('--rk-radio-dot-size: 10px;')
  expect(radioGroupCss).toContain('.indicatorDot')
  expect(radioGroupCss).toContain(".item[data-state='checked'] .indicatorDot")
  expect(radioGroupCss).toContain('animation: rk-radio-control-pop 220ms linear;')
  expect(radioGroupCss).not.toContain('padding: 2px var(--rk-control-padding-inline-middle')
  expect(radioGroupCss).not.toContain('scale(1.08)')
  expect(radioGroupCss).not.toContain('--rk-radio-item-material')
})
