import { Stack, TimePicker } from 'rocokingdom-ui'

const presets = [
  { label: '清晨', value: '06:30' },
  { label: '正午', value: '12:00' },
  { label: '夜晚', value: '20:00' },
]

export function TimePickerExample() {
  return (
    <Stack size="large">
      <TimePicker defaultValue="09:30" minuteStep={15} presets={presets} shadow showSeconds />
      <TimePicker defaultValue={['14:00', '16:30']} mode="range" material="paperStrong" />
    </Stack>
  )
}
