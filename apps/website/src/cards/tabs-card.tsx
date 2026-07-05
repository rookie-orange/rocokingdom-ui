import { Tab, TabList, TabPanel, Tabs } from 'rocokingdom-ui'
import { HomeCard } from './home-card'

interface TabsCardProps {
  className?: string
}

const panelClassName = 'px-1 pt-2 text-sm leading-6 text-stone/60'

export function TabsCard({ className }: TabsCardProps) {
  return (
    <HomeCard className={className}>
      <Tabs
        defaultValue="team"
        listMaterial="stone"
        rootClassName="min-w-0"
        selectedMaterial="primaryStrong"
        size="small"
      >
        <TabList rootClassName="w-full">
          <Tab value="team">队伍</Tab>
          <Tab value="bag">背包</Tab>
          <Tab value="quest">任务</Tab>
        </TabList>
        <TabPanel rootClassName={panelClassName} value="team">
          三只宠物已就绪。
        </TabPanel>
        <TabPanel rootClassName={panelClassName} value="bag">
          补给与技能石充足。
        </TabPanel>
        <TabPanel rootClassName={panelClassName} value="quest">
          今日任务进度 82%。
        </TabPanel>
      </Tabs>
    </HomeCard>
  )
}
