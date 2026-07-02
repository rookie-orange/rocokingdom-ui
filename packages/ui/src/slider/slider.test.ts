import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Slider, SliderRange, SliderRoot, SliderThumb, SliderTrack, sliderPrefixCls } from './index'

const sliderCss = readFileSync(new URL('./slider.module.css', import.meta.url), 'utf8')
const sliderSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('exports prefix class and radix primitives', () => {
  expect(sliderPrefixCls).toBe('rk-slider')
  expect(SliderRoot).toBeTruthy()
  expect(SliderTrack).toBeTruthy()
  expect(SliderRange).toBeTruthy()
  expect(SliderThumb).toBeTruthy()
})

test('renders a radix-backed slider with styled track, range and thumb', () => {
  const html = renderToString(
    createElement(Slider, {
      className: 'custom-slider',
      defaultValue: [42],
      max: 100,
      min: 0,
      name: 'volume',
      rootClassName: 'app-slider',
      thumbAriaLabel: '音量',
    }),
  )

  expect(html).toContain('rk-slider')
  expect(html).toContain('rk-slider-track')
  expect(html).toContain('rk-slider-range')
  expect(html).toContain('rk-slider-thumb')
  expect(html).toContain('app-slider')
  expect(html).toContain('custom-slider')
  expect(html).toContain('role="slider"')
  expect(html).toContain('aria-label="音量"')
  expect(html).toContain('right:58%')
  expect(html).toContain('<input')
  expect(html).toContain('name="volume"')
  expect(html).toContain('var(--rk-primary)')
  expect(html).toContain('material="paper"')
  expect(html).toContain('var(--rk-stone-muted)')
})

test('uses radix slider and material-backed pieces', () => {
  expect(sliderSource).toContain("import * as RadixSlider from '@radix-ui/react-slider'")
  expect(sliderSource).toContain("import { Material, type MaterialPreset } from '../material'")
  expect(sliderSource).toContain('export const SliderRoot = RadixSlider.Root')
  expect(sliderSource).toContain('export const SliderTrack = RadixSlider.Track')
  expect(sliderSource).toContain('export const SliderRange = RadixSlider.Range')
  expect(sliderSource).toContain('export const SliderThumb = RadixSlider.Thumb')
  expect(sliderSource).toContain('<RadixSlider.Root')
  expect(sliderSource).toContain('<RadixSlider.Track')
  expect(sliderSource).toContain('<RadixSlider.Range')
  expect(sliderSource).toContain('<RadixSlider.Thumb')
  expect(sliderSource).toContain('<Material asChild material={trackMaterial}>')
  expect(sliderSource).toContain('<Material asChild material={rangeMaterial}>')
  expect(sliderSource).toContain('<Material asChild key={index} material={thumbMaterial}>')
})

test('matches the reference slider proportions with caps and a pill thumb', () => {
  expect(sliderCss).toContain('--rk-slider-track-size: 8px;')
  expect(sliderCss).toContain('--rk-slider-track-cap-size: 28px;')
  expect(sliderCss).toContain('--rk-slider-cap-width: calc(var(--rk-slider-track-size) * 1.35);')
  expect(sliderCss).toContain(
    '--rk-slider-thumb-width: calc(var(--rk-slider-track-cap-size) * 0.82);',
  )
  expect(sliderCss).toContain('--rk-slider-thumb-height: var(--rk-slider-track-cap-size);')
  expect(sliderCss).toContain('.track::before')
  expect(sliderCss).toContain('.track::after')
  expect(sliderCss).toContain('.range::before')
  expect(sliderCss).not.toContain('.range::after')
  expect(sliderCss).not.toContain('--rk-slider-range-cover-extra')
  expect(sliderCss).toContain('.slider > span:has(.thumb)')
  expect(sliderCss).toContain('border-radius: 999px;')
  expect(sliderCss).toContain('cursor: grab;')
  expect(sliderCss).toContain('@media (prefers-reduced-motion: reduce)')
})
