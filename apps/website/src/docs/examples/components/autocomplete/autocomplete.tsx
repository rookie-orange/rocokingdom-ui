import { useState } from 'react'
import { Autocomplete, Stack } from 'rocokingdom-ui'

const options = ['迪莫', '喵喵', '火花', '水蓝蓝', '阿布']

export function AutocompleteExample() {
  const [value, setValue] = useState('')

  return (
    <Stack size="middle">
      <Autocomplete onChange={setValue} options={options} placeholder="搜索宠物" value={value} />
      <span className="text-sm text-stone/65">搜索：{value || '全部宠物'}</span>
    </Stack>
  )
}
