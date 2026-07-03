import { useState } from 'react'
import { RadioGroup, RadioItem } from 'rocokingdom-ui'

export function RadioControlledDemo() {
  const [controlledValue, setControlledValue] = useState('normal')

  return (
    <div className="grid gap-5">
      <RadioGroup
        activeMaterial="primaryMuted"
        inactiveMaterial="paper"
        onValueChange={setControlledValue}
        value={controlledValue}
      >
        <RadioItem value="normal">普通</RadioItem>
        <RadioItem value="hard">困难</RadioItem>
        <RadioItem value="nightmare">噩梦</RadioItem>
      </RadioGroup>
      <p>当前难度：{controlledValue}</p>
    </div>
  )
}
