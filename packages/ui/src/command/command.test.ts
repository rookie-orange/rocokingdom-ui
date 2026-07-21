import { createElement } from 'react'
import { readFileSync } from 'node:fs'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Command, commandPrefixCls } from './index'

const commandSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('renders an open command palette with grouped options', () => {
  const html = renderToString(
    createElement(Command, {
      defaultOpen: true,
      items: [{ group: 'Travel', key: 'map', label: 'Open map', shortcut: 'M' }],
    }),
  )
  expect(commandPrefixCls).toBe('rk-command')
  expect(html).toBe('')
  expect(commandSource).toContain("from 'cmdk'")
  expect(commandSource).toContain("from '../radix-dialog'")
  expect(commandSource).toContain('<CommandPrimitive.List')
  expect(commandSource).toContain('<CommandPrimitive.Item')
})
