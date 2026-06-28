import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { RadioGroup, RadioItem } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/radio-group')({
  component: RadioGroupExamplePage,
})

const radioGroupCode = `import { RadioGroup, RadioItem } from 'rocokingdom-ui'

export function PetElementPicker() {
  return (
    <RadioGroup defaultValue="water" name="element">
      <RadioItem value="water">水系</RadioItem>
      <RadioItem value="fire">火系</RadioItem>
      <RadioItem value="grass">草系</RadioItem>
    </RadioGroup>
  )
}`

function RadioGroupExamplePage() {
  const [controlledValue, setControlledValue] = useState('normal')

  return (
    <ExampleShell
      code={radioGroupCode}
      description="RadioGroup 是自绘单选组，支持受控与非受控值、方向、材质、尺寸、禁用和键盘切换。"
      highlights={[
        'defaultValue 与 value/onValueChange 两种模式都可用。',
        'orientation 覆盖 horizontal、vertical。',
        'active/inactive 的 material、variant、shadow 可分别配置。',
      ]}
      title="RadioGroup"
    >
      <ExampleSection
        description="默认非受控用法会把当前值写入隐藏 input，适合表单提交。"
        title="基础单选组"
      >
        <PreviewSurface>
          <RadioGroup defaultValue="water" name="element">
            <RadioItem activeMaterial="primaryStrong" value="water">
              水系
            </RadioItem>
            <RadioItem activeMaterial="danger" value="fire">
              火系
            </RadioItem>
            <RadioItem activeMaterial="success" value="grass">
              草系
            </RadioItem>
            <RadioItem disabled value="dragon">
              龙系
            </RadioItem>
          </RadioGroup>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="受控值">
        <PreviewSurface>
          <div className="grid gap-5">
            <RadioGroup
              activeMaterial="primaryMuted"
              inactiveMaterial="paper"
              onValueChange={setControlledValue}
              value={controlledValue}
            >
              <RadioItem value="normal">普通</RadioItem>
              <RadioItem value="hard">困难</RadioItem>
              <RadioItem value="nightmare">噩梦</RadioItem>
            </RadioGroup>
            <p className="text-base text-stone/70">
              当前难度：<span className="text-on-paper">{controlledValue}</span>
            </p>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="垂直方向与尺寸">
        <PreviewSurface>
          <div className="flex flex-wrap items-start gap-10">
            <RadioGroup defaultValue="left" orientation="vertical" size="small">
              <RadioItem value="left">左侧</RadioItem>
              <RadioItem value="right">右侧</RadioItem>
              <RadioItem value="top">顶部</RadioItem>
            </RadioGroup>
            <RadioGroup
              activeMaterial="stone"
              activeShadow
              defaultValue="team"
              inactiveMaterial="paper"
              inactiveVariant="outline"
              size="large"
            >
              <RadioItem value="solo">单人</RadioItem>
              <RadioItem value="team">组队</RadioItem>
              <RadioItem value="guild">公会</RadioItem>
            </RadioGroup>
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
