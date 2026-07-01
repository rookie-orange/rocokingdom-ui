import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Tab, TabList, TabPanel, Tabs } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/tabs')({
  component: TabsExamplePage,
})

const tabsCode = `import { Tab, TabList, TabPanel, Tabs } from 'rocokingdom-ui'

export function PetTabs() {
  return (
    <Tabs defaultValue="team">
      <TabList>
        <Tab value="team">队伍</Tab>
        <Tab value="bag">背包</Tab>
        <Tab value="quest">任务</Tab>
      </TabList>
      <TabPanel value="team">队伍内容</TabPanel>
      <TabPanel value="bag">背包内容</TabPanel>
      <TabPanel value="quest">任务内容</TabPanel>
    </Tabs>
  )
}`

const tabsBasicCode = `import { Tab, TabList, TabPanel, Tabs } from 'rocokingdom-ui'

export function TabsBasicDemo() {
  return (
    <Tabs defaultValue="team" name="petSection">
      <TabList>
        <Tab value="team">队伍</Tab>
        <Tab value="bag">背包</Tab>
        <Tab value="quest">任务</Tab>
        <Tab disabled value="arena">
          竞技
        </Tab>
      </TabList>
      <TabPanel value="team">查看当前上阵宠物、血量和携带技能。</TabPanel>
      <TabPanel value="bag">整理宠物背包，快速筛选属性与等级。</TabPanel>
      <TabPanel value="quest">跟踪每日任务、活动任务和奖励进度。</TabPanel>
    </Tabs>
  )
}`

const tabsControlledCode = `import { useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'rocokingdom-ui'

export function TabsControlledDemo() {
  const [section, setSection] = useState('team')

  return (
    <div className="grid gap-5">
      <Tabs
        listMaterial="primarySoft"
        onValueChange={setSection}
        selectedMaterial="paper"
        value={section}
      >
        <TabList>
          <Tab value="team">今日队伍</Tab>
          <Tab value="bag">宠物仓库</Tab>
          <Tab value="quest">冒险任务</Tab>
        </TabList>
        <TabPanel value="team">队伍标签已激活。</TabPanel>
        <TabPanel value="bag">仓库标签已激活。</TabPanel>
        <TabPanel value="quest">任务标签已激活。</TabPanel>
      </Tabs>
      <p>当前标签：{section}</p>
    </div>
  )
}`

const tabsSizeCode = `import { Tab, TabList, TabPanel, Tabs } from 'rocokingdom-ui'

export function TabsSizeDemo() {
  return (
    <Tabs defaultValue="map" listMaterial="stone" selectedMaterial="primaryStrong" size="large">
      <TabList>
        <Tab value="map">王国地图</Tab>
        <Tab value="friend">好友列表</Tab>
        <Tab value="shop">商店补给</Tab>
      </TabList>
      <TabPanel value="map">大尺寸标签会保留按钮同款拉伸底形。</TabPanel>
      <TabPanel value="friend">好友状态、邀请和组队入口可以放在同一组标签页内。</TabPanel>
      <TabPanel value="shop">大尺寸标签在操作型面板中更容易点击。</TabPanel>
    </Tabs>
  )
}`

function TabsExamplePage() {
  const [section, setSection] = useState('team')

  return (
    <ExampleShell
      code={tabsCode}
      description="Tabs 是按钮造型的标签页组件，外层 TabList 和选中 Tab 都使用与 Button 一致的 RocoShape stretch 底形。外层用底色承载，不提供描边样式。"
      highlights={[
        '支持 defaultValue 与 value/onValueChange 两种模式。',
        'TabList 默认使用 stoneSoft 实心底色，选中 Tab 使用 solid shape。',
        '未选中 Tab 使用前景色，深色和浅色底都能保持可读。',
      ]}
      title="Tabs"
    >
      <ExampleSection
        code={tabsBasicCode}
        description="默认外层使用浅石色底形，选中项使用默认主色实心底形。"
        title="基础标签页"
      >
        <PreviewSurface>
          <Tabs defaultValue="team" name="petSection">
            <TabList>
              <Tab value="team">队伍</Tab>
              <Tab value="bag">背包</Tab>
              <Tab value="quest">任务</Tab>
              <Tab disabled value="arena">
                竞技
              </Tab>
            </TabList>
            <TabPanel value="team">
              <p className="max-w-2xl text-base leading-7 text-stone/75">
                查看当前上阵宠物、血量和携带技能。
              </p>
            </TabPanel>
            <TabPanel value="bag">
              <p className="max-w-2xl text-base leading-7 text-stone/75">
                整理宠物背包，快速筛选属性与等级。
              </p>
            </TabPanel>
            <TabPanel value="quest">
              <p className="max-w-2xl text-base leading-7 text-stone/75">
                跟踪每日任务、活动任务和奖励进度。
              </p>
            </TabPanel>
          </Tabs>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection code={tabsControlledCode} title="受控值与材质">
        <PreviewSurface>
          <div className="grid gap-5">
            <Tabs
              listMaterial="primarySoft"
              onValueChange={setSection}
              selectedMaterial="paper"
              value={section}
            >
              <TabList>
                <Tab value="team">今日队伍</Tab>
                <Tab value="bag">宠物仓库</Tab>
                <Tab value="quest">冒险任务</Tab>
              </TabList>
              <TabPanel value="team">
                <p className="text-base leading-7 text-stone/75">队伍标签已激活。</p>
              </TabPanel>
              <TabPanel value="bag">
                <p className="text-base leading-7 text-stone/75">仓库标签已激活。</p>
              </TabPanel>
              <TabPanel value="quest">
                <p className="text-base leading-7 text-stone/75">任务标签已激活。</p>
              </TabPanel>
            </Tabs>
            <p className="text-base text-stone/70">
              当前标签：<span className="text-on-paper">{section}</span>
            </p>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection code={tabsSizeCode} title="尺寸与紧凑间距">
        <PreviewSurface>
          <Tabs
            defaultValue="map"
            listMaterial="stone"
            selectedMaterial="primaryStrong"
            size="large"
          >
            <TabList>
              <Tab value="map">王国地图</Tab>
              <Tab value="friend">好友列表</Tab>
              <Tab value="shop">商店补给</Tab>
            </TabList>
            <TabPanel value="map">
              <p className="max-w-xl text-base leading-7 text-stone/75">
                大尺寸标签会保留按钮同款拉伸底形，外层和内部标签之间保持更紧凑的间距。
              </p>
            </TabPanel>
            <TabPanel value="friend">
              <p className="max-w-xl text-base leading-7 text-stone/75">
                好友状态、邀请和组队入口可以放在同一组标签页内。
              </p>
            </TabPanel>
            <TabPanel value="shop">
              <p className="max-w-xl text-base leading-7 text-stone/75">
                大尺寸标签在操作型面板中更容易点击。
              </p>
            </TabPanel>
          </Tabs>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
