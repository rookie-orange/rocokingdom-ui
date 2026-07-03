import { RadioGroup, RadioItem } from 'rocokingdom-ui'

export function RadioLayoutDemo() {
  return (
    <div className="flex flex-wrap items-start gap-10">
      <RadioGroup defaultValue="left" orientation="vertical" size="small">
        <RadioItem value="left">左侧</RadioItem>
        <RadioItem value="right">右侧</RadioItem>
        <RadioItem value="top">顶部</RadioItem>
      </RadioGroup>
      <RadioGroup
        activeMaterial="stone"
        activeShadow
        defaultValue="team"
        inactiveMaterial="paper"
        inactiveVariant="outline"
        size="large"
      >
        <RadioItem value="solo">单人</RadioItem>
        <RadioItem value="team">组队</RadioItem>
        <RadioItem value="guild">公会</RadioItem>
      </RadioGroup>
    </div>
  )
}
