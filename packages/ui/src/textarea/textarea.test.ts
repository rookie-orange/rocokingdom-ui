import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Textarea, textareaPrefixCls } from './index'

const textareaCss = readFileSync(new URL('./textarea.module.css', import.meta.url), 'utf8')
const textareaSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('exports a prefix class', () => {
  expect(textareaPrefixCls).toBe('rk-textarea')
})

test('renders a textarea inside the four-corner roco frame', () => {
  const html = renderToString(
    createElement(Textarea, {
      className: 'custom-textarea',
      defaultValue: '挑战记录',
      maxLength: 40,
      material: 'paperStrong',
      name: 'note',
      placeholder: '记录任务线索',
      rootClassName: 'app-textarea',
      shadow: true,
      showCount: true,
      textareaClassName: 'field-textarea',
    }),
  )

  expect(html).toContain('rk-textarea')
  expect(html).toContain('rk-textarea-control')
  expect(html).toContain('rk-textarea-count')
  expect(html).toContain('app-textarea')
  expect(html).toContain('custom-textarea')
  expect(html).toContain('field-textarea')
  expect(html).toContain('name="note"')
  expect(html).toContain('maxLength="40"')
  expect(html).toContain('placeholder="记录任务线索"')
  expect(html).toContain('挑战记录')
  expect(html).toContain('4 / 40')
  expect(html).toContain('--rk-material-background:var(--rk-paper-strong)')
  expect(html).toContain('--rk-material-color:var(--rk-on-paper-strong)')
  expect(html).toContain('rk-material')
  expect(html).toContain('<svg')
  expect(html).toContain('withShadow')
})

test('uses a dedicated four-corner frame instead of the two-end button shape', () => {
  expect(textareaSource).toContain('function TextareaFrame')
  expect(textareaSource).toContain('function TextareaFrameCorner')
  expect(textareaSource).toContain('textareaCornerFillPath')
  expect(textareaSource).toContain('textareaCornerStrokePath')
  expect(textareaSource).toContain('textareaCornerStrokePathByCorner')
  expect(textareaSource).toContain('corner: TextareaFrameCorner')
  expect(textareaSource).toContain('part: TextareaFramePart')
  expect(textareaSource).not.toContain("import { RocoShape } from '../roco-shape'")
  expect(textareaCss).toContain('--rk-textarea-corner-size: 48px;')
  expect(textareaCss).toContain('--rk-textarea-padding-block: 22px;')
  expect(textareaCss).toContain('--rk-textarea-padding-inline: 28px;')
  expect(textareaCss).toContain(
    'grid-template-columns: var(--rk-textarea-corner-size) minmax(0, 1fr) var(',
  )
  expect(textareaCss).toContain(
    'grid-template-rows: var(--rk-textarea-corner-size) minmax(0, 1fr) var(',
  )
  expect(textareaCss).toContain('.cornerTopLeft')
  expect(textareaCss).toContain('.cornerTopRight')
  expect(textareaCss).toContain('.cornerBottomLeft')
  expect(textareaCss).toContain('.cornerBottomRight')
  expect(textareaCss).toContain('resize: var(--rk-textarea-resize);')
})

test('renders rounded uneven corner paths for the outline frame', () => {
  const html = renderToString(createElement(Textarea, { variant: 'outline' }))
  const cornerPaths = Array.from(html.matchAll(/<path[^>]*d="([^"]+)"/g), (match) => match[1])

  expect(cornerPaths).toHaveLength(4)
  expect(new Set(cornerPaths).size).toBe(4)
  expect(cornerPaths.every((path) => (path.match(/C/g)?.length ?? 0) === 1)).toBe(true)
  expect(cornerPaths.every((path) => !path.includes('L'))).toBe(true)
  expect(cornerPaths.every((path) => !path.includes('Q'))).toBe(true)
})

test('supports outline variant, custom resize and large sizing', () => {
  const html = renderToString(
    createElement(Textarea, {
      material: 'success',
      resize: 'both',
      size: 'large',
      style: { width: 420 },
      variant: 'outline',
    }),
  )

  expect(html).toContain('outline')
  expect(html).toContain('large')
  expect(html).toContain('--rk-textarea-resize:both')
  expect(html).toContain('width:420px')
  expect(html).toContain('--rk-material-background:var(--rk-success)')
  expect(html).toContain('--rk-material-color:var(--rk-on-success)')
})
