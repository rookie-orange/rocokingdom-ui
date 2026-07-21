import { DatePicker, Stack } from 'rocokingdom-ui'

export function DatePickerExample() {
  return (
    <Stack size="large">
      <DatePicker
        defaultValue="2026-07-21"
        disabledDates={{ dayOfWeek: [0, 6] }}
        min="2026-07-01"
        shadow
      />
      <DatePicker
        defaultValue={['2026-07-21', '2026-07-28']}
        mode="range"
        startPlaceholder="出发日期"
        endPlaceholder="返回日期"
        material="paperStrong"
      />
    </Stack>
  )
}
