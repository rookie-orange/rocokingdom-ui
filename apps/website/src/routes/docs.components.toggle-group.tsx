import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ToggleGroup, ToggleItem } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/toggle-group')({
  component: ToggleGroupExamplePage,
})

const toggleGroupCode = `import { ToggleGroup, ToggleItem } from 'rocokingdom-ui'

export function MenuToggle() {
  return (
    <ToggleGroup defaultValue="quest">
      <ToggleItem value="quest">任务</ToggleItem>
      <ToggleItem value="bag">背包</ToggleItem>
      <ToggleItem value="event">活动</ToggleItem>
    </ToggleGroup>
  )
}`

function ToggleGroupExamplePage() {
  const [section, setSection] = useState('quest')

  return (
    <ExampleShell
      code={toggleGroupCode}
      description="ToggleGroup 是按钮风格的单选切换组，默认未选中项使用 stone，选中项使用 paper，并在选中时拉宽底形。"
      highlights={[
        'selectedMaterial 和 unselectedMaterial 可分别配置选中、未选中的材质。',
        'value/onValueChange 与 defaultValue 都可用。',
        'orientation、size、variant、shadow 与 Button 风格保持一致。',
      ]}
      title="ToggleGroup"
    >
      <ExampleSection
        description="默认材质下，选中的按钮会从 stone 切到 paper，同时增加宽度和内边距。"
        title="基础切换组"
      >
        <PreviewSurface>
          <ToggleGroup defaultValue="quest" name="menu">
            <ToggleItem value="quest">任务</ToggleItem>
            <ToggleItem value="bag">背包</ToggleItem>
            <ToggleItem value="event">活动</ToggleItem>
            <ToggleItem disabled value="arena">
              竞技
            </ToggleItem>
          </ToggleGroup>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="受控值与材质">
        <PreviewSurface>
          <div className="grid gap-5">
            <ToggleGroup
              onValueChange={setSection}
              selectedMaterial="primaryStrong"
              unselectedMaterial="primarySoft"
              value={section}
            >
              <ToggleItem value="quest">今日任务</ToggleItem>
              <ToggleItem value="bag">宠物背包</ToggleItem>
              <ToggleItem value="event">活动中心</ToggleItem>
            </ToggleGroup>
            <p className="text-base text-stone/70">
              当前入口：<span className="text-on-paper">{section}</span>
            </p>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="垂直方向与尺寸">
        <PreviewSurface>
          <div className="flex flex-wrap items-start gap-10">
            <ToggleGroup defaultValue="home" orientation="vertical" size="small">
              <ToggleItem value="home">家园</ToggleItem>
              <ToggleItem value="friend">好友</ToggleItem>
              <ToggleItem value="shop">商店</ToggleItem>
            </ToggleGroup>
            <ToggleGroup
              defaultValue="guild"
              selectedMaterial="stone"
              selectedShadow
              unselectedMaterial="paper"
              unselectedVariant="outline"
              size="large"
            >
              <ToggleItem value="solo">单人</ToggleItem>
              <ToggleItem value="team">组队</ToggleItem>
              <ToggleItem value="guild">公会</ToggleItem>
            </ToggleGroup>
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
