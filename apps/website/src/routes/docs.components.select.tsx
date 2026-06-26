import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Select, SelectGroup, SelectItem, SelectLabel, SelectSeparator } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/select')({
  component: SelectExamplePage,
})

const selectCode = `import { Select } from 'rocokingdom-ui'

export function RegionSelect() {
  return (
    <Select
      ariaLabel="选择区域"
      defaultValue="castle"
      material="stone"
      options={[
        { label: '王国城堡', value: 'castle' },
        { label: '宠物园', value: 'garden' },
      ]}
    />
  )
}`

const regionOptions = [
  { label: '王国城堡', value: 'castle' },
  { label: '宠物园', value: 'garden' },
  { label: '魔法学院', value: 'academy' },
  { disabled: true, label: '雪人谷维护中', value: 'snow' },
] as const

function SelectExamplePage() {
  const [region, setRegion] = useState('academy')

  return (
    <ExampleShell
      code={selectCode}
      description="Select 封装 Radix Select，提供游戏风格触发器和菜单，可用 options 快速渲染，也可组合低层子组件。"
      highlights={[
        'options 覆盖普通项、禁用项和 placeholder。',
        'material 支持 stone、paper、primary 等主题材质。',
        'value/onValueChange 展示受控选择。',
        'SelectGroup、SelectLabel、SelectSeparator、SelectItem 可组合自定义菜单。',
      ]}
      title="Select"
    >
      <ExampleSection title="快速 options 用法">
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-4">
            <Select
              ariaLabel="选择区域"
              defaultValue="castle"
              options={regionOptions}
              placeholder="选择区域"
            />
            <Select ariaLabel="禁用选择器" disabled options={regionOptions} placeholder="已禁用" />
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="受控选择">
        <PreviewSurface>
          <div className="grid gap-5">
            <Select
              ariaLabel="选择传送点"
              material="paper"
              onValueChange={setRegion}
              options={regionOptions}
              placeholder="选择传送点"
              value={region}
            />
            <p className="text-base font-black text-stone/70">
              当前传送点：<span className="text-on-paper">{region}</span>
            </p>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="组合式菜单">
        <PreviewSurface>
          <Select
            ariaLabel="选择技能"
            defaultValue="fire"
            placeholder="选择技能"
            triggerClassName="min-w-[220px]"
          >
            <SelectGroup>
              <SelectLabel className="px-4 py-2 text-sm font-black text-primary">
                元素技能
              </SelectLabel>
              <SelectItem value="fire">火焰喷发</SelectItem>
              <SelectItem value="water">水泡术</SelectItem>
              <SelectItem value="wind">风之打击</SelectItem>
            </SelectGroup>
            <SelectSeparator className="my-2 h-px bg-on-stone/20" />
            <SelectGroup>
              <SelectLabel className="px-4 py-2 text-sm font-black text-primary">
                辅助技能
              </SelectLabel>
              <SelectItem value="shield">守护之力</SelectItem>
              <SelectItem disabled value="heal">
                治愈术冷却中
              </SelectItem>
            </SelectGroup>
          </Select>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
