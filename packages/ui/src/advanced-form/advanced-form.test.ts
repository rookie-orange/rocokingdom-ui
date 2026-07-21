import { createElement } from 'react'
import { readFileSync } from 'node:fs'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Autocomplete, DatePicker, Form, FormItem, TimePicker, Upload } from './index'

const pickerSource = readFileSync(new URL('./pickers.tsx', import.meta.url), 'utf8')
const advancedFormSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')
const advancedFormCss = readFileSync(new URL('./advanced-form.module.css', import.meta.url), 'utf8')

test('renders single and range pickers with shape fields', () => {
  const date = renderToString(createElement(DatePicker, { defaultValue: '2026-07-21' }))
  const time = renderToString(
    createElement(TimePicker, { defaultValue: ['09:00', '12:00'], mode: 'range' }),
  )
  expect(date).not.toContain('type="date"')
  expect(date).toContain('rk-roco-shape')
  expect(time).not.toContain('type="time"')
  expect(time).toContain('09:00')
  expect(pickerSource).toContain("from 'react-day-picker'")
  expect(pickerSource).toContain("from '@radix-ui/react-popover'")
  expect(pickerSource).toContain("from '@radix-ui/react-select'")
  expect(pickerSource).toContain("import { floatingContentClassName } from '../floating-content'")
  expect(pickerSource).not.toContain('shape="square"')
  expect(pickerSource).toContain('styles.pickerPopupSurface,')
  expect(pickerSource).toContain('shadow && styles.pickerPopupSurfaceShadow')
  expect(advancedFormCss).toContain(
    'font-family: var(--rk-font-family-base, system-ui, sans-serif);',
  )
  expect(advancedFormCss).toContain('border-radius: calc(var(--rk-radius, 8px) + 4px);')
  expect(advancedFormCss).toContain('.calendarNavButtonPrevious')
  expect(advancedFormCss).toContain('.calendarNavButtonNext')
  expect(advancedFormCss).toContain('.calendarRangeMiddle .calendarDayButton')
  expect(advancedFormCss).toContain('.calendarWeek > .calendarRangeMiddle:first-child')
  expect(advancedFormCss).toContain('.calendarWeek > .calendarRangeMiddle:last-child')
  expect(advancedFormCss).toContain('.calendarToday .calendarDayButton {\n  border-radius: 5px;')
})

test('renders upload trigger and form field semantics', () => {
  const upload = renderToString(createElement(Upload, { accept: 'image/*', variant: 'drag' }))
  const form = renderToString(
    createElement(
      Form,
      null,
      createElement(FormItem, { error: 'Required', label: 'Name', required: true }),
    ),
  )
  expect(upload).toContain('type="file"')
  expect(upload).toContain('role="button"')
  expect(form).toContain('role="alert"')
})

test('renders autocomplete as an accessible combobox', () => {
  const html = renderToString(createElement(Autocomplete, { options: ['Roco', 'Lulu'] }))
  expect(html).toContain('role="combobox"')
  expect(html).toContain('aria-autocomplete="list"')
  expect(html).toContain('cmdk-input')
  expect(advancedFormSource).toContain("from 'cmdk'")
  expect(advancedFormSource).toContain("from '@radix-ui/react-popover'")
  expect(advancedFormSource).toContain(
    "import { floatingContentClassName } from '../floating-content'",
  )
})
