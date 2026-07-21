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
  expect(html).toContain('data-before-cap="range"')
  expect(html).toContain('data-after-cap="track"')
  expect(html).toContain('--rk-slider-range-background:var(--rk-primary)')
  expect(html).toContain('var(--rk-primary)')
  expect(html).not.toContain('material="paper"')
  expect(html).toContain('--rk-slider-thumb-background:var(--rk-paper)')
  expect(html).toContain('var(--rk-stone-muted)')
})

test('keeps range caps on the real track endpoints only', () => {
  const rangeHtml = renderToString(
    createElement(Slider, {
      defaultValue: [24, 72],
      max: 100,
      min: 0,
      rangeMaterial: 'success',
      thumbAriaLabel: '范围',
    }),
  )
  const fullRangeHtml = renderToString(
    createElement(Slider, {
      defaultValue: [0, 100],
      max: 100,
      min: 0,
      rangeMaterial: 'success',
      thumbAriaLabel: '范围',
    }),
  )

  expect(rangeHtml).toContain('data-before-cap="track"')
  expect(rangeHtml).toContain('data-after-cap="track"')
  expect(rangeHtml).toContain('--rk-slider-range-background:var(--rk-success)')
  expect(fullRangeHtml).toContain('data-before-cap="range"')
  expect(fullRangeHtml).toContain('data-after-cap="range"')
})

test('uses radix slider and material-backed pieces', () => {
  expect(sliderSource).toContain("import * as RadixSlider from '@radix-ui/react-slider'")
  expect(sliderSource).toContain(
    "import { Material, resolveMaterial, type MaterialPreset } from '../material'",
  )
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

test('matches the reference slider proportions with aligned caps and thumb', () => {
  expect(sliderCss).toContain('height: 56px;')
  expect(sliderCss).toContain('height: 8px;')
  expect(sliderCss).toContain('height: 28px;')
  expect(sliderCss).toContain('width: 11px;')
  expect(sliderCss).toContain('height: 22px;')
  expect(sliderCss).toContain('width: 8px;')
  expect(sliderCss).toContain('height: 34px;')
  expect(sliderCss).toContain('width: 14px;')
  expect(sliderCss).toContain('.track::before')
  expect(sliderCss).toContain('.track::after')
  expect(sliderCss).toContain(`.thumb {
  background: var(--rk-slider-thumb-background);
  border: 0;
  border-radius: 999px;
  box-shadow:
    0 3px 0 var(--rk-shadow-color),
    inset 0 1px 0 rgb(255 255 255 / 0.38);
  cursor: grab;
  display: block;
  height: 28px;`)
  expect(sliderCss).toContain(`.small .thumb {
  height: 22px;
  width: 8px;
}`)
  expect(sliderCss).toContain(`.large .thumb {
  height: 34px;
  width: 14px;
}`)
  expect(sliderCss).toContain('left: 0;')
  expect(sliderCss).toContain('right: 0;')
  expect(sliderCss).toContain("[data-before-cap='range']")
  expect(sliderCss).toContain("[data-after-cap='range']")
  expect(sliderCss).not.toContain('.range::before')
  expect(sliderCss).not.toContain('--rk-slider-thumb-track-offset')
  expect(sliderCss).not.toContain("style*='right")
  expect(sliderCss).not.toContain("style*='top")
  expect(sliderCss).not.toContain('.range::after')
  expect(sliderCss).not.toContain('--rk-slider-range-cover-extra')
  expect(sliderCss).toContain('.slider > span:has(.thumb)')
  expect(sliderCss).toContain('border-radius: 999px;')
  expect(sliderCss).toContain('cursor: grab;')
  expect(sliderCss).toContain('@media (prefers-reduced-motion: reduce)')
})
