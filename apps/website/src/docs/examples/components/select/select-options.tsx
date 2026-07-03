import { Select } from 'rocokingdom-ui'

const regionOptions = [
  { label: '王国城堡', value: 'castle' },
  { label: '宠物园', value: 'garden' },
  { label: '魔法学院', value: 'academy' },
  { disabled: true, label: '雪人谷维护中', value: 'snow' },
] as const

export function SelectOptionsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select
        ariaLabel="选择区域"
        defaultValue="castle"
        options={regionOptions}
        placeholder="选择区域"
      />
      <Select ariaLabel="禁用选择器" disabled options={regionOptions} placeholder="已禁用" />
    </div>
  )
}
