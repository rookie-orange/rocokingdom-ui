import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { RocoShape } from '../roco-shape'
import { Material, materialPrefixCls, resolveMaterial } from './index'

const materialCss = readFileSync(new URL('./material.module.css', import.meta.url), 'utf8')

test('exports a prefix class', () => {
  expect(materialPrefixCls).toBe('rk-material')
})

test('renders a polymorphic material surface with background and color variables', () => {
  const html = renderToString(
    createElement(
      Material,
      {
        as: 'a',
        background: 'var(--rk-primary)',
        className: 'custom-material',
        color: 'var(--rk-on-primary)',
        href: '/kingdom',
        material: 'stone',
        rootClassName: 'app-material',
      },
      'Kingdom',
    ),
  )

  expect(html).toContain('<a')
  expect(html).toContain('href="/kingdom"')
  expect(html).toContain('rk-material')
  expect(html).toContain('app-material')
  expect(html).toContain('custom-material')
  expect(html).toContain('--rk-material-background:var(--rk-primary)')
  expect(html).toContain('--rk-material-color:var(--rk-on-primary)')
  expect(html).toContain('Kingdom')
})

test('lets material render colors without adding a wrapper', () => {
  const html = renderToString(
    createElement(Material, {
      material: 'stone',
      render: ({ background, color, style }) =>
        createElement(
          RocoShape,
          {
            'data-background': background,
            'data-color': color,
            style,
          },
          'Stone shape',
        ),
    }),
  )

  expect(html).toContain('<span')
  expect(html).toContain('rk-roco-shape')
  expect(html).not.toContain('class="rk-material')
  expect(html).toContain('data-background="var(--rk-stone)"')
  expect(html).toContain('data-color="var(--rk-on-stone)"')
  expect(html).toContain('--rk-material-background:var(--rk-stone)')
  expect(html).toContain('--rk-material-color:var(--rk-on-stone)')
  expect(html).toContain('Stone shape')
})

test('lets material provide colors to an asChild roco shape', () => {
  const html = renderToString(
    createElement(
      Material,
      {
        asChild: true,
        material: 'paper',
      },
      createElement(RocoShape, { shadow: true }, 'Paper shape'),
    ),
  )

  expect(html.startsWith('<span')).toBe(true)
  expect(html).toContain('rk-material')
  expect(html).toContain('rk-roco-shape')
  expect(html).toContain('--rk-material-background:var(--rk-paper)')
  expect(html).toContain('--rk-material-color:var(--rk-on-paper)')
  expect(html).toContain('withShadow')
  expect(html).toContain('Paper shape')
})

test('resolves material presets to base background and foreground variables', () => {
  expect(resolveMaterial()).toMatchObject({
    background: 'var(--rk-paper)',
    color: 'var(--rk-on-paper)',
  })
  expect(resolveMaterial({ material: 'default' })).toMatchObject({
    background: 'var(--rk-primary)',
    color: 'var(--rk-on-primary)',
  })
  expect(resolveMaterial({ material: 'stone' })).toMatchObject({
    background: 'var(--rk-stone)',
    color: 'var(--rk-on-stone)',
  })
  expect(resolveMaterial({ material: 'paperSoft' })).toMatchObject({
    background: 'var(--rk-paper-soft)',
    color: 'var(--rk-on-paper-soft)',
  })
  expect(resolveMaterial({ material: 'paperMuted' })).toMatchObject({
    background: 'var(--rk-paper-muted)',
    color: 'var(--rk-on-paper-muted)',
  })
  expect(resolveMaterial({ material: 'paperStrong' })).toMatchObject({
    background: 'var(--rk-paper-strong)',
    color: 'var(--rk-on-paper-strong)',
  })
  expect(resolveMaterial({ material: 'stoneSoft' })).toMatchObject({
    background: 'var(--rk-stone-soft)',
    color: 'var(--rk-on-stone-soft)',
  })
  expect(resolveMaterial({ material: 'stoneMuted' })).toMatchObject({
    background: 'var(--rk-stone-muted)',
    color: 'var(--rk-on-stone-muted)',
  })
  expect(resolveMaterial({ material: 'stoneStrong' })).toMatchObject({
    background: 'var(--rk-stone-strong)',
    color: 'var(--rk-on-stone-strong)',
  })
  expect(resolveMaterial({ material: 'primarySoft' })).toMatchObject({
    background: 'var(--rk-primary-soft)',
    color: 'var(--rk-on-primary-soft)',
  })
  expect(resolveMaterial({ material: 'primaryMuted' })).toMatchObject({
    background: 'var(--rk-primary-muted)',
    color: 'var(--rk-on-primary-muted)',
  })
  expect(resolveMaterial({ material: 'primaryStrong' })).toMatchObject({
    background: 'var(--rk-primary-strong)',
    color: 'var(--rk-on-primary-strong)',
  })
  expect(resolveMaterial({ material: 'success' })).toMatchObject({
    background: 'var(--rk-success)',
    color: 'var(--rk-on-success)',
  })
  expect(resolveMaterial({ material: 'danger' })).toMatchObject({
    background: 'var(--rk-danger)',
    color: 'var(--rk-on-danger)',
  })
  expect(
    resolveMaterial({
      background: 'var(--rk-primary)',
      color: 'var(--rk-on-primary)',
      material: 'stone',
    }),
  ).toMatchObject({
    background: 'var(--rk-primary)',
    color: 'var(--rk-on-primary)',
    style: {
      '--rk-material-background': 'var(--rk-primary)',
      '--rk-material-color': 'var(--rk-on-primary)',
    },
  })
  expect(materialCss).toContain('--rk-material-background: var(--rk-paper);')
  expect(materialCss).toContain('--rk-material-color: var(--rk-on-paper);')
  expect(materialCss).toContain('background: var(--rk-material-background);')
  expect(materialCss).toContain('color: var(--rk-material-color);')
  expect(materialCss).not.toContain('.primary')
  expect(materialCss).not.toContain('.stone')
})

test('lets material render the roco shape root for combined surfaces', () => {
  const html = renderToString(
    createElement(
      Material,
      {
        as: RocoShape,
        material: 'paper',
        rootClassName: 'material-shape',
        shadow: true,
      },
      'Notice',
    ),
  )

  expect(html).toContain('rk-material')
  expect(html).toContain('rk-roco-shape')
  expect(html).toContain('material-shape')
  expect(html).toContain('--rk-material-background:var(--rk-paper)')
  expect(html).toContain('--rk-material-color:var(--rk-on-paper)')
  expect(html).toContain('withContent')
  expect(html).toContain('withShadow')
  expect(html).toContain('Notice')
})
