import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Button } from '../button'
import { Modal, ModalClose, modalPrefixCls } from './index'

const modalCss = readFileSync(new URL('./modal.module.css', import.meta.url), 'utf8')
const modalSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')
const radixDialogSource = readFileSync(new URL('../radix-dialog.ts', import.meta.url), 'utf8')

test('exports a prefix class and close primitive', () => {
  expect(modalPrefixCls).toBe('rk-modal')
  expect(ModalClose).toBeTruthy()
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
  expect(modalSource).toContain("import { Cross } from '@rocokingdom-ui/icons'")
  expect(modalSource).toContain("import { RuneText } from '../rune-text'")
  expect(modalSource).toContain('headerRuneText?: ReactNode')
  expect(modalSource).toContain('headerRuneTextClassName?: string')
  expect(modalSource).toContain("export type ModalClosePosition = 'inside' | 'outside'")
  expect(modalSource).toContain('closePosition?: ModalClosePosition')
  expect(modalSource).toContain("closePosition = 'inside'")
  expect(modalSource).toContain('const hasHeaderRuneText = hasContent(headerRuneText)')
  expect(modalSource).toContain(
    'hasCustomHeader || hasTitle || hasHeaderRuneText || (closable && isCloseInside)',
  )
  expect(modalSource).toContain('`${prefixCls}-outside-close`')
  expect(modalSource).toContain('<Cross />')
  expect(modalSource).toContain('<RuneText')
  expect(modalSource).toContain('aria-hidden="true"')
  expect(modalSource).toContain('font="rune"')
  expect(modalSource).toContain('`${prefixCls}-header-rune-text`')
  expect(modalSource).toContain('<RadixDialogTitle asChild>')
  expect(modalSource).toContain('as="h2"')
  expect(modalCss).toContain('font-family: var(--rk-font-family-base, system-ui, sans-serif);')
  expect(modalCss).not.toContain(['font', 'weight:'].join('-'))
  expect(modalCss).not.toContain('--rk-rune-text-')
})

test('styles modal as an overlayed dialog with optional regions', () => {
  expect(modalSource).toContain("import { RocoTheme } from '../theme'")
  expect(modalSource).toContain('<RocoTheme asChild>')
  expect(modalSource).toContain('style={contentStyle}')
  expect(modalSource).not.toContain('useRocoThemeStyle')
  expect(modalSource).not.toContain('themeStyle')
  expect(modalSource).not.toContain('RocoThemeScope')
  expect(modalCss).toContain('.overlay')
  expect(modalCss).not.toContain('backdrop-filter:')
  expect(modalCss).toContain('--rk-modal-width: 680px;')
  expect(modalCss).toContain(".overlay[data-state='open']")
  expect(modalCss).toContain(".content[data-state='open'] .closeIcon")
  expect(modalCss).toContain(".content[data-state='closed'] .panel")
  expect(modalCss).toContain(".content[data-state='closed'] .closeIcon")
  expect(modalCss).toContain('@keyframes rk-modal-panel-in')
  expect(modalCss).toContain('@keyframes rk-modal-close-icon-in')
  expect(modalCss).toContain('@keyframes rk-modal-close-icon-out')
  expect(modalCss).toContain('transform: rotate(-180deg) scale(0.65);')
  expect(modalCss).toContain('transform: rotate(10deg) scale(1.08);')
  expect(modalCss).toContain('transform: rotate(180deg) scale(0.65);')
  expect(modalCss).toContain('transform: scale(0.9);')
  expect(modalCss).toContain('transform: scaleY(0.9) scaleX(1.1);')
  expect(modalCss).not.toContain('scale(1.014)')
  expect(modalCss).not.toContain('scale(1.003)')
  expect(modalCss).not.toContain('calc(-50% +')
  expect(modalCss).not.toContain('--rk-modal-z-index')
  expect(modalCss).not.toContain('--rk-modal-panel-border')
  expect(modalCss).not.toContain('--rk-modal-panel-radius')
  expect(modalCss).not.toContain('--rk-modal-title-font-size')
  expect(modalCss).not.toContain('--rk-modal-body-padding')
  expect(modalCss).toContain('@media (prefers-reduced-motion: reduce)')
  expect(modalCss).toContain('.header')
  expect(modalCss).toContain('.headerRuneText')
  expect(modalCss).toContain('.outsideClose')
  expect(modalCss).toContain('.footer')
  expect(modalCss).toContain('.visuallyHidden')
})

test('uses radix dialog as the modal interaction primitive', () => {
  expect(radixDialogSource).toContain("import * as Dialog from '@radix-ui/react-dialog'")
})
