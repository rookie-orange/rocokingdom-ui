import { ToggleGroup, ToggleItem } from 'rocokingdom-ui'

export function MenuToggle() {
  return (
    <ToggleGroup defaultValue="quest">
      <ToggleItem value="quest">任务</ToggleItem>
      <ToggleItem value="bag">背包</ToggleItem>
      <ToggleItem value="event">活动</ToggleItem>
    </ToggleGroup>
  )
}
