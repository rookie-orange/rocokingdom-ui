import { Tab, TabList, TabPanel, Tabs } from 'rocokingdom-ui'

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
}
