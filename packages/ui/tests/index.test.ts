import { readFileSync } from 'node:fs'
import { expect, test } from 'vite-plus/test'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import packageJson from '../package.json' with { type: 'json' }
import {
  Button,
  ButtonNormal,
  Modal,
  ModalClose,
  RadioGroup,
  RocoProvider,
  RocoShape,
  RuneText,
  buttonNormalPrefixCls,
  buttonPrefixCls,
  modalPrefixCls,
  radioGroupPrefixCls,
  runeTextPrefixCls,
  rocoShapePrefixCls,
} from '../src/index.ts'

const baseStyleCss = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8')
const fontCss = readFileSync(new URL('../src/font.css', import.meta.url), 'utf8')
const decorativeFontCss = readFileSync(
  new URL('../src/decorative-font.css', import.meta.url),
  'utf8',
)
const buttonCss = readFileSync(new URL('../src/button/button.module.css', import.meta.url), 'utf8')
const buttonNormalCss = readFileSync(
  new URL('../src/button-normal/button-normal.module.css', import.meta.url),
  'utf8',
)
const radioGroupCss = readFileSync(
  new URL('../src/radio-group/radio-group.module.css', import.meta.url),
  'utf8',
)
const modalSource = readFileSync(new URL('../src/modal/index.tsx', import.meta.url), 'utf8')
const modalCss = readFileSync(new URL('../src/modal/modal.module.css', import.meta.url), 'utf8')

test('exports a single button prefix class', () => {
  expect(buttonPrefixCls).toBe('rk-button')
  expect(buttonNormalPrefixCls).toBe('rk-button-normal')
  expect(modalPrefixCls).toBe('rk-modal')
  expect(radioGroupPrefixCls).toBe('rk-radio-group')
  expect(rocoShapePrefixCls).toBe('rk-roco-shape')
  expect(runeTextPrefixCls).toBe('rk-rune-text')
})

test('renders an svg-backed React button component with css module classes', () => {
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
  expect(html).toContain('<svg')
  expect(html).toContain('<path')
  expect(html).toContain('rk-button')
  expect(html).toContain('app-button')
  expect(html).toContain('custom-button')
  expect(html).toContain('type="button"')
})

test('passes the optional shadow prop from button to its shape', () => {
  const defaultHtml = renderToString(createElement(Button, { children: 'Plain' }))
  const shadowHtml = renderToString(createElement(Button, { children: 'Raised', shadow: true }))

  expect(defaultHtml).not.toContain('withShadow')
  expect(shadowHtml).toContain('withShadow')
})

test('pins button sizes with explicit heights in flex rows', () => {
  expect(buttonCss).toContain('box-sizing: border-box;')
  expect(buttonCss).toContain('height: var(--rk-button-height);')
  expect(buttonCss).not.toContain('min-height: var(--rk-button-height);')
  expect(buttonNormalCss).toContain('box-sizing: border-box;')
  expect(buttonNormalCss).toContain('height: 32px;')
  expect(buttonNormalCss).toContain('height: 40px;')
  expect(buttonNormalCss).toContain('height: 48px;')
  expect(buttonNormalCss).not.toContain('min-height:')
})

test('renders the reusable roco shape component', () => {
  const html = renderToString(
    createElement(RocoShape, {
      className: 'custom-shape',
      rootClassName: 'app-shape',
      variant: 'outline',
    }),
  )

  expect(html).toContain('rk-roco-shape')
  expect(html).toContain('app-shape')
  expect(html).toContain('custom-shape')
  expect(html).toContain('<svg')
  expect(html).toContain('<path')
  expect(html.match(/<path/g)).toHaveLength(3)
})

test('renders solid roco shape without a stroke layer', () => {
  const html = renderToString(createElement(RocoShape))

  expect(html).toContain('rk-roco-shape')
  expect(html).not.toContain('withShadow')
  expect(html.match(/<path/g)).toHaveLength(2)
})

test('renders roco shape shadow only when enabled', () => {
  const html = renderToString(createElement(RocoShape, { shadow: true }))

  expect(html).toContain('withShadow')
  expect(html.match(/<path/g)).toHaveLength(2)
})

test('renders the previous capsule button as button normal', () => {
  const html = renderToString(
    createElement(ButtonNormal, {
      children: 'Start',
      className: 'custom-button',
      material: 'stone',
      rootClassName: 'app-button',
      size: 'large',
      variant: 'outline',
    }),
  )

  expect(html).toContain('<button')
  expect(html).not.toContain('<svg')
  expect(html).toContain('rk-button-normal')
  expect(html).toContain('app-button')
  expect(html).toContain('custom-button')
  expect(html).toContain('type="button"')
})

test('renders a button-backed radio group with default active and inactive materials', () => {
  const html = renderToString(
    createElement(RadioGroup, {
      activeButtonClassName: 'selected-button',
      buttonClassName: 'option-button',
      className: 'custom-radio-group',
      inactiveButtonClassName: 'idle-button',
      name: 'pet',
      options: [
        { label: 'Stone', value: 'stone' },
        { label: 'Paper', value: 'paper' },
      ],
      rootClassName: 'app-radio-group',
      value: 'paper',
    }),
  )

  expect(html).toContain('role="radiogroup"')
  expect(html).toContain('rk-radio-group')
  expect(html).toContain('app-radio-group')
  expect(html).toContain('custom-radio-group')
  expect(html).toContain('role="radio"')
  expect(html).toContain('aria-checked="true"')
  expect(html).toContain('aria-checked="false"')
  expect(html).toContain('selected-button')
  expect(html).toContain('idle-button')
  expect(html).toContain('option-button')
  expect(html).toContain('paper')
  expect(html).toContain('stone')
  expect(html).toContain('type="hidden"')
  expect(html).toContain('name="pet"')
  expect(html).toContain('value="paper"')
})

test('lets radio group button styles be customized', () => {
  const html = renderToString(
    createElement(RadioGroup, {
      activeMaterial: 'default',
      activeVariant: 'outline',
      inactiveMaterial: 'paper',
      inactiveVariant: 'text',
      options: [
        { label: 'Fire', value: 'fire' },
        { label: 'Water', value: 'water' },
      ],
      value: 'fire',
    }),
  )

  expect(html).toContain('default')
  expect(html).toContain('outline')
  expect(html).toContain('paper')
  expect(html).toContain('text')
})

test('animates the selected radio group button scale', () => {
  expect(radioGroupCss).toContain('--rk-radio-group-active-scale: 1.08;')
  expect(radioGroupCss).toContain('transition:')
  expect(radioGroupCss).toContain('transform 180ms ease')
  expect(radioGroupCss).toContain('transform: scale(var(--rk-radio-group-active-scale));')
})

test('renders a radix-backed modal trigger on the server', () => {
  const html = renderToString(
    createElement(Modal, {
      footer: createElement(
        ModalClose,
        { asChild: true },
        createElement(Button, { children: '确定', material: 'paper' }),
      ),
      title: '提示',
      trigger: createElement(Button, { children: 'Open modal' }),
    }),
  )

  expect(html).toContain('Open modal')
})

test('supports optional modal header rune text behind the title', () => {
  expect(modalSource).toContain("import { RuneText } from '../rune-text'")
  expect(modalSource).toContain('headerRuneText?: ReactNode')
  expect(modalSource).toContain('headerRuneTextClassName?: string')
  expect(modalSource).toContain('const hasHeaderRuneText = hasContent(headerRuneText)')
  expect(modalSource).toContain('hasCustomHeader || hasTitle || hasHeaderRuneText || closable')
  expect(modalSource).toContain('<RuneText')
  expect(modalSource).toContain('aria-hidden="true"')
  expect(modalSource).toContain('`${prefixCls}-header-rune-text`')
})

test('styles modal as an overlayed game dialog with optional regions', () => {
  expect(modalCss).toContain('.overlay')
  expect(modalCss).toContain('backdrop-filter: blur(2px) saturate(0.85);')
  expect(modalCss).toContain('--rk-modal-width: 680px;')
  expect(modalCss).toContain(".overlay[data-state='open']")
  expect(modalCss).toContain(".content[data-state='closed']")
  expect(modalCss).toContain('@keyframes rk-modal-content-in')
  expect(modalCss).toContain('@media (prefers-reduced-motion: reduce)')
  expect(modalCss).toContain('.header')
  expect(modalCss).toContain('.headerRuneText')
  expect(modalCss).toContain('.footer')
  expect(modalCss).toContain('.visuallyHidden')
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

test('renders rune text without registering fonts from JavaScript', () => {
  const html = renderToString(
    createElement(RuneText, {
      as: 'strong',
      children: 'Rune',
      className: 'custom-text',
      rootClassName: 'app-text',
    }),
  )

  expect(html).toContain('<strong')
  expect(html).toContain('rk-rune-text')
  expect(html).toContain('app-text')
  expect(html).toContain('custom-text')
  expect(html).toContain('Rune')
})

test('keeps font registration out of the base style entry', () => {
  expect(baseStyleCss).not.toContain('@font-face')
  expect(fontCss).toContain('@font-face')
  expect(fontCss).toContain('Roco Kingdom Sans')
  expect(decorativeFontCss).toContain('@font-face')
  expect(decorativeFontCss).toContain('Roco Kingdom Rune')
})

test('only exposes root components and manual style/font entries', () => {
  expect(packageJson.exports).toEqual({
    '.': {
      types: './dist/index.d.mts',
      import: './dist/index.mjs',
    },
    './decorative-font.css': './dist/decorative-font.css',
    './font.css': './dist/font.css',
    './fonts/roco-kingdom-rune.ttf': './dist/fonts/roco-kingdom-rune.ttf',
    './fonts/roco-kingdom-sans.ttf': './dist/fonts/roco-kingdom-sans.ttf',
    './style.css': './dist/style.css',
    './package.json': './package.json',
  })
  expect(packageJson.exports).not.toHaveProperty('./button')
  expect(packageJson.sideEffects).toEqual(['**/*.css'])
})

test('uses radix dialog as the modal interaction primitive', () => {
  expect(packageJson.dependencies).toMatchObject({
    '@radix-ui/react-dialog': 'catalog:',
  })
})
