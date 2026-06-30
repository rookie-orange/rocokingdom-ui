import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { ToggleGroup, ToggleItem, toggleGroupPrefixCls, toggleItemPrefixCls } from './index'

const toggleGroupCss = readFileSync(new URL('./toggle-group.module.css', import.meta.url), 'utf8')
const toggleGroupSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('exports prefix classes', () => {
  expect(toggleGroupPrefixCls).toBe('rk-toggle-group')
  expect(toggleItemPrefixCls).toBe('rk-toggle-item')
})

test('supports semantic materials for lightweight controls', () => {
  expect(toggleGroupSource).toContain("import { Material, type MaterialPreset } from '../material'")
  expect(toggleGroupSource).toContain("import { RocoShape } from '../roco-shape'")
  expect(toggleGroupSource).toContain('material={resolvedMaterial}')
  expect(toggleGroupSource).toContain('<Material asChild material={resolvedMaterial}>')
  expect(toggleGroupCss).not.toContain('--rk-toggle-item-material')
  expect(toggleGroupCss).not.toContain('--rk-toggle-item-on-material')
})

test('renders a compound toggle group with default selected and unselected materials', () => {
  const html = renderToString(
    createElement(
      ToggleGroup,
      {
        className: 'custom-toggle-group',
        name: 'section',
        rootClassName: 'app-toggle-group',
        value: 'paper',
      },
      createElement(
        ToggleItem,
        {
          className: 'toggle-option',
          unselectedClassName: 'idle-toggle',
          value: 'stone',
        },
        'Stone',
      ),
      createElement(
        ToggleItem,
        {
          className: 'toggle-option',
          selectedClassName: 'selected-toggle',
          value: 'paper',
        },
        'Paper',
      ),
    ),
  )

  expect(html).toContain('role="group"')
  expect(html).toContain('rk-toggle-group')
  expect(html).toContain('rk-toggle-item')
  expect(html).toContain('app-toggle-group')
  expect(html).toContain('custom-toggle-group')
  expect(html).toContain('aria-pressed="true"')
  expect(html).toContain('aria-pressed="false"')
  expect(html).toContain('selected-toggle')
  expect(html).toContain('idle-toggle')
  expect(html).toContain('toggle-option')
  expect(html).toContain('rk-rune-text')
  expect(html).toContain('paper')
  expect(html).toContain('stone')
  expect(html).toContain('type="hidden"')
  expect(html).toContain('name="section"')
  expect(html).toContain('value="paper"')
})

test('lets toggle group item styles be customized and expands selected items', () => {
  const html = renderToString(
    createElement(
      ToggleGroup,
      {
        selectedMaterial: 'primaryStrong',
        unselectedMaterial: 'paper',
        value: 'map',
      },
      createElement(ToggleItem, { style: { minWidth: 96 }, value: 'map' }, 'Map'),
      createElement(
        ToggleItem,
        {
          className: 'bag-toggle',
          unselectedMaterial: 'stone',
          value: 'bag',
        },
        'Bag',
      ),
    ),
  )

  expect(html).toContain('--rk-primary-strong')
  expect(html).toContain('stone')
  expect(html).toContain('bag-toggle')
  expect(html).toContain('min-width:96px')
  expect(toggleGroupSource).not.toContain("from '../button'")
  expect(toggleGroupSource).toContain("import { RocoShape } from '../roco-shape'")
  expect(toggleGroupSource).toContain("import { RuneText } from '../rune-text'")
  expect(toggleGroupSource).not.toContain('ToggleGroupVariant')
  expect(toggleGroupSource).not.toContain('selectedVariant')
  expect(toggleGroupSource).not.toContain('unselectedVariant')
  expect(toggleGroupSource).not.toContain('variant={')
  expect(toggleGroupCss).toContain('min-width: 118px;')
  expect(toggleGroupCss).toContain('padding-inline: 30px;')
  expect(toggleGroupCss).toContain('min-width: 96px;')
  expect(toggleGroupCss).toContain('min-width: 136px;')
  expect(toggleGroupCss).toContain('min-width 220ms ease')
  expect(toggleGroupCss).toContain('padding-inline 220ms ease')
  expect(toggleGroupCss).not.toContain('--rk-toggle-')
  expect(toggleGroupCss).not.toContain('--rk-roco-shape-')
})

test('animates the selected toggle item with a spring pop', () => {
  expect(toggleGroupCss).toContain('@keyframes rk-toggle-item-spring-select')
  expect(toggleGroupCss).toContain('animation: rk-toggle-item-spring-select 260ms linear;')
  expect(toggleGroupCss).toContain('transform: scale(0.9);')
  expect(toggleGroupCss).toContain('transform: scaleY(0.9) scaleX(1.18);')
  expect(toggleGroupCss).toContain('transform: scaleY(1.08) scaleX(0.94);')
  expect(toggleGroupCss).toContain('transform: scale(1);')
  expect(toggleGroupCss).toContain('@media (prefers-reduced-motion: reduce)')
})
