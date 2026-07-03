import { RadioGroup, RadioItem } from 'rocokingdom-ui'

export function RadioBasicDemo() {
  return (
    <RadioGroup defaultValue="water" name="element">
      <RadioItem activeMaterial="primaryStrong" value="water">
        水系
      </RadioItem>
      <RadioItem activeMaterial="danger" value="fire">
        火系
      </RadioItem>
      <RadioItem activeMaterial="success" value="grass">
        草系
      </RadioItem>
      <RadioItem disabled value="dragon">
        龙系
      </RadioItem>
    </RadioGroup>
  )
}
