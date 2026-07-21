import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import {
  Avatar,
  AvatarGroup,
  Descriptions,
  List,
  ListItem,
  Statistic,
  Tag,
  Timeline,
} from './index'

const dataDisplaySource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('renders list and descriptions from structured data', () => {
  const list = renderToString(
    createElement(List, {
      dataSource: ['Map', 'Bag'],
      renderItem: (item) => createElement(ListItem, null, String(item)),
    }),
  )
  const descriptions = renderToString(
    createElement(Descriptions, { items: [{ label: 'Level', value: '42' }], title: 'Pet' }),
  )
  expect(list).toContain('rk-list-item')
  expect(list).toContain('Map')
  expect(descriptions).toContain('<dt>Level</dt>')
  expect(descriptions).toContain('<dd>42</dd>')
})

test('renders shape based avatars and tags', () => {
  const avatars = renderToString(
    createElement(
      AvatarGroup,
      { max: 1 },
      createElement(Avatar, { alt: 'Roco' }),
      createElement(Avatar, { alt: 'Lulu' }),
    ),
  )
  const tag = renderToString(createElement(Tag, { closable: true }, 'Fire'))
  expect(avatars).toContain('rk-roco-shape')
  expect(avatars.replaceAll('<!-- -->', '')).toContain('+1')
  expect(tag).toContain('Remove tag')
  expect(dataDisplaySource).toContain("import * as RadixAvatar from '@radix-ui/react-avatar'")
})

test('renders timeline and formatted statistic', () => {
  const timeline = renderToString(
    createElement(Timeline, { items: [{ children: 'Arrived', label: '09:30', title: 'Castle' }] }),
  )
  const statistic = renderToString(
    createElement(Statistic, { precision: 1, trend: 'up', value: 12.5 }),
  )
  expect(timeline).toContain('Castle')
  expect(statistic).toContain('up trend')
  expect(statistic).toContain('12.5')
})
