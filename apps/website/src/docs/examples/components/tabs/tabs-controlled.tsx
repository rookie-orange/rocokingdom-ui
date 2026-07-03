import { useState } from 'react'
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
}
