import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { RadioGroup, RadioItem, radioGroupPrefixCls, radioItemPrefixCls } from './index'

const radioGroupCss = readFileSync(new URL('./radio-group.module.css', import.meta.url), 'utf8')
const radioGroupSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('exports prefix classes', () => {
  expect(radioGroupPrefixCls).toBe('rk-radio-group')
  expect(radioItemPrefixCls).toBe('rk-radio-item')
})

test('supports semantic materials for lightweight controls', () => {
  expect(radioGroupSource).toContain("import { Material, type MaterialPreset } from '../material'")
  expect(radioGroupSource).toContain('<Material asChild material={resolvedMaterial}>')
  expect(radioGroupCss).not.toContain('--rk-material-background')
  expect(radioGroupCss).not.toContain('--rk-material-color')
  expect(radioGroupCss).not.toContain('--rk-radio-item-material')
  expect(radioGroupCss).not.toContain('--rk-radio-item-on-material')
})

test('renders a compound radio group with default active and inactive materials', () => {
  const html = renderToString(
    createElement(
      RadioGroup,
      {
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
  expect(html).toContain('app-radio-group')
  expect(html).toContain('custom-radio-group')
  expect(html).toContain('role="radio"')
  expect(html).toContain('aria-checked="true"')
  expect(html).toContain('aria-checked="false"')
  expect(html).toContain('selected-item')
  expect(html).toContain('idle-item')
  expect(html).toContain('option-item')
  expect(html).not.toContain('rk-button')
  expect(html).toContain('paper')
  expect(html).toContain('stone')
  expect(html).toContain('type="hidden"')
  expect(html).toContain('name="pet"')
  expect(html).toContain('value="paper"')
})

test('lets radio group item styles be customized', () => {
  const html = renderToString(
    createElement(
      RadioGroup,
      {
        activeMaterial: 'default',
        activeVariant: 'outline',
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

  expect(html).toContain('default')
  expect(html).toContain('outline')
  expect(html).toContain('stone')
  expect(html).toContain('text')
  expect(html).toContain('water-item')
  expect(html).toContain('min-width:96px')
})

test('implements radio items without the shared button component', () => {
  expect(radioGroupSource).not.toContain("from '../button'")
  expect(radioGroupSource).toContain("import { RocoShape } from '../roco-shape'")
  expect(radioGroupSource).toContain('export function RadioItem')
})

test('animates the selected radio item with the modal spring scale', () => {
  expect(radioGroupCss).toContain('@keyframes rk-radio-item-spring-scale')
  expect(radioGroupCss).toContain('animation: rk-radio-item-spring-scale 260ms linear;')
  expect(radioGroupCss).toContain('transform: scale(0.9);')
  expect(radioGroupCss).toContain('transform: scaleY(0.9) scaleX(1.2);')
  expect(radioGroupCss).toContain('transform: scaleY(1.1) scaleX(0.9);')
  expect(radioGroupCss).toContain('transform: scale(1.08);')
  expect(radioGroupCss).not.toContain('--rk-radio-')
  expect(radioGroupCss).toContain('@media (prefers-reduced-motion: reduce)')
})
