import { useState } from 'react'
import { Select } from 'rocokingdom-ui'

const regionOptions = [
  { label: '王国城堡', value: 'castle' },
  { label: '宠物园', value: 'garden' },
  { label: '魔法学院', value: 'academy' },
  { disabled: true, label: '雪人谷维护中', value: 'snow' },
] as const

export function SelectControlledDemo() {
  const [region, setRegion] = useState('academy')

  return (
    <div className="grid gap-5">
      <Select
        ariaLabel="选择传送点"
        material="paper"
        onValueChange={setRegion}
        options={regionOptions}
        placeholder="选择传送点"
        value={region}
      />
      <p>当前传送点：{region}</p>
    </div>
  )
}
