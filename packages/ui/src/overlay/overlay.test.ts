import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Message, MessageProvider, Notification, Popover, Tooltip } from './index'

const overlaySource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('renders tooltip and popover content with accessible relationships', () => {
  const tooltip = renderToString(
    createElement(
      Tooltip,
      { content: 'Hint', defaultOpen: true },
      createElement('button', null, 'Target'),
    ),
  )
  const popover = renderToString(
    createElement(Popover, {
      content: 'Details',
      defaultOpen: true,
      title: 'Pet',
      trigger: 'Open',
    }),
  )
  expect(tooltip).toContain('aria-describedby')
  expect(tooltip).toContain('data-state="instant-open"')
  expect(popover).toContain('aria-expanded="true"')
  expect(overlaySource).toContain("import * as RadixTooltip from '@radix-ui/react-tooltip'")
  expect(overlaySource).toContain("import * as RadixPopover from '@radix-ui/react-popover'")
})

test('renders direct message and notification feedback', () => {
  const message = renderToString(
    createElement(Message, { closable: true, status: 'success', title: 'Saved' }),
  )
  const notification = renderToString(
    createElement(Notification, { description: 'Quest complete', title: 'Adventure log' }),
  )
  expect(message).toContain('rk-roco-shape')
  expect(message).toContain('Close message')
  expect(notification).toContain('Close notification')
})

test('renders provider holders without messages', () => {
  const html = renderToString(
    createElement(MessageProvider, null, createElement('span', null, 'App')),
  )
  expect(html).toContain('<ol')
  expect(html).toContain('App')
  expect(overlaySource).toContain("import * as RadixToast from '@radix-ui/react-toast'")
})
