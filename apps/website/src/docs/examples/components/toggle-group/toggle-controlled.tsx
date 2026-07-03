import { useState } from 'react'
import { ToggleGroup, ToggleItem } from 'rocokingdom-ui'

export function ToggleControlledDemo() {
  const [section, setSection] = useState('quest')

  return (
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
      <p>当前入口：{section}</p>
    </div>
  )
}
