import { ToggleGroup, ToggleItem } from 'rocokingdom-ui'

export function ToggleBasicDemo() {
  return (
    <ToggleGroup defaultValue="quest" name="menu">
      <ToggleItem value="quest">任务</ToggleItem>
      <ToggleItem value="bag">背包</ToggleItem>
      <ToggleItem value="event">活动</ToggleItem>
      <ToggleItem disabled value="arena">
        竞技
      </ToggleItem>
    </ToggleGroup>
  )
}
