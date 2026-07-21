import { useState } from 'react'
import { InputNumber, Stack } from 'rocokingdom-ui'

export function InputNumberExample() {
  const [value, setValue] = useState<number | undefined>(12)

  return (
    <Stack size="middle">
      <InputNumber max={20} min={0} onValueChange={setValue} shadow step={2} value={value} />
      <span className="text-sm text-stone/65">当前数量：{value ?? '未设置'}</span>
    </Stack>
  )
}
