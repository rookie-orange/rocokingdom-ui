import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Slider } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/slider')({
  component: SliderExamplePage,
})

const sliderCode = `import { Slider } from 'rocokingdom-ui'

export function VolumeSlider() {
  return <Slider defaultValue={[46]} max={100} name="volume" />
}`

function SliderExamplePage() {
  const [volume, setVolume] = useState([46])
  const [range, setRange] = useState([24, 72])

  return (
    <ExampleShell
      code={sliderCode}
      description="Slider 基于 Radix Slider 封装，提供可访问的键盘交互、表单 input 和洛克王国风格的轨道、进度与竖向滑块。"
      highlights={[
        'value/defaultValue、onValueChange 与 onValueCommit 均沿用 Radix Slider。',
        '默认使用 stoneMuted 轨道、primary 进度和 paper 滑块。',
        '支持单滑块、范围选择、横向/纵向、禁用和自定义材质。',
      ]}
      title="Slider"
    >
      <ExampleSection
        description="默认样式贴近参考图：灰色轨道、黄色进度、端帽和奶白色竖向圆角滑块。"
        title="基础滑块"
      >
        <PreviewSurface>
          <div className="rounded-full bg-stone px-8 py-5 shadow-[0_10px_0_var(--rk-shadow-color)]">
            <Slider
              className="w-full!"
              defaultValue={[46]}
              max={100}
              name="volume"
              size="large"
              thumbAriaLabel="音量"
            />
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="受控值">
        <PreviewSurface>
          <div className="grid gap-5">
            <Slider max={100} onValueChange={setVolume} thumbAriaLabel="当前音量" value={volume} />
            <p className="text-base text-stone/70">
              当前音量：<span className="text-on-paper">{volume[0]}</span>
            </p>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="范围与尺寸">
        <PreviewSurface>
          <div className="grid gap-8">
            <Slider
              max={100}
              onValueChange={setRange}
              rangeMaterial="success"
              size="small"
              thumbAriaLabel={(index) => (index === 0 ? '最小等级' : '最大等级')}
              value={range}
            />
            <Slider defaultValue={[62]} rangeMaterial="danger" size="middle" />
            <div className="flex items-end gap-10">
              <Slider
                defaultValue={[34]}
                orientation="vertical"
                rangeMaterial="primaryStrong"
                size="large"
                thumbAriaLabel="纵向数值"
              />
              <p className="pb-5 text-base text-stone/70">
                范围：<span className="text-on-paper">{range.join(' - ')}</span>
              </p>
            </div>
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
