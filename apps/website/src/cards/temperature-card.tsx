import { Slider, Tab, TabList, TabPanel, Tabs } from 'rocokingdom-ui'
import { CardHeading, HomeCard } from './home-card'

interface TemperatureCardProps {
  className?: string
}

export function TemperatureCard({ className }: TemperatureCardProps) {
  return (
    <HomeCard className={className} contentClassName="grid gap-3 sm:gap-4">
      <CardHeading description="拖动滑杆设置宠物训练区间。" title="能量调校" />
      <Tabs
        defaultValue="steady"
        listMaterial="stone"
        rootClassName="!w-full !justify-items-stretch"
        selectedMaterial="primaryStrong"
        size="small"
      >
        <TabList contentClassName="!flex !w-full" rootClassName="!w-full">
          <Tab rootClassName="!flex-1 justify-center" value="steady">
            稳定
          </Tab>
          <Tab rootClassName="!flex-1 justify-center" value="burst">
            爆发
          </Tab>
          <Tab rootClassName="!flex-1 justify-center" value="rest">
            休整
          </Tab>
        </TabList>
        <TabPanel rootClassName="pt-2 text-sm leading-6 text-stone/60" value="steady">
          适合日常训练节奏。
        </TabPanel>
        <TabPanel rootClassName="pt-2 text-sm leading-6 text-stone/60" value="burst">
          适合短时冲刺训练。
        </TabPanel>
        <TabPanel rootClassName="pt-2 text-sm leading-6 text-stone/60" value="rest">
          适合恢复和观察状态。
        </TabPanel>
      </Tabs>
      <Slider
        defaultValue={[65]}
        max={100}
        min={0}
        rangeMaterial="primary"
        thumbAriaLabel={(index) => `温度值 ${index + 1}`}
        thumbMaterial="primary"
        trackMaterial="paperStrong"
      />
    </HomeCard>
  )
}
