import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Accordion, Carousel, Image, Table, Tree } from './index'

const dataRichSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('renders structured table with sortable and filterable headers', () => {
  const html = renderToString(
    createElement(Table<{ id: number; name: string }>, {
      columns: [
        {
          dataIndex: 'name',
          filters: [{ text: 'A', value: 'a' }],
          key: 'name',
          sorter: true,
          title: 'Name',
        },
      ],
      dataSource: [{ id: 1, name: 'Roco' }],
      rowKey: 'id',
    }),
  )
  expect(html).toContain('<table')
  expect(html).toContain('Filter Name')
  expect(html).toContain('Roco')
})

test('renders expanded accordion and tree hierarchy', () => {
  const accordion = renderToString(
    createElement(Accordion, {
      defaultValue: 'a',
      items: [{ children: 'Details', key: 'a', title: 'Title' }],
    }),
  )
  const tree = renderToString(
    createElement(Tree, {
      defaultExpandedKeys: ['root'],
      treeData: [{ children: [{ key: 'child', title: 'Child' }], key: 'root', title: 'Root' }],
    }),
  )
  expect(accordion).toContain('aria-expanded="true"')
  expect(accordion).toContain('--rk-material-background:var(--rk-primary)')
  expect(dataRichSource).toContain("import * as RadixAccordion from '@radix-ui/react-accordion'")
  expect(tree).toContain('role="tree"')
  expect(tree).toContain('Child')
})

test('renders carousel controls and image placeholder', () => {
  const carousel = renderToString(createElement(Carousel, { items: ['One', 'Two'] }))
  const image = renderToString(createElement(Image, { alt: 'Map', src: '/map.png' }))
  expect(carousel).toContain('Previous slide')
  expect(carousel).toContain('Go to slide 2')
  expect(image).toContain('rk-skeleton')
  expect(image).toContain('alt="Map"')
  expect(image).toContain('aria-haspopup="dialog"')
  expect(image).toContain('aria-label="Preview Map"')
  expect(dataRichSource).toContain("from '../radix-dialog'")
  expect(dataRichSource).toContain("from 'embla-carousel-react'")
  expect(dataRichSource).toContain('useEmblaCarousel')
})
