import { RadioGroup, RadioItem } from 'rocokingdom-ui'

export function PetElementPicker() {
  return (
    <RadioGroup defaultValue="water" name="element">
      <RadioItem value="water">水系</RadioItem>
      <RadioItem value="fire">火系</RadioItem>
      <RadioItem value="grass">草系</RadioItem>
    </RadioGroup>
  )
}
