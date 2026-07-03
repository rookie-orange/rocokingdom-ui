import { Tab, TabList, TabPanel, Tabs } from 'rocokingdom-ui'

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
}
