import { Select } from 'rocokingdom-ui'

export function RegionSelect() {
  return (
    <Select
      ariaLabel="选择区域"
      defaultValue="castle"
      material="stone"
      options={[
        { label: '王国城堡', value: 'castle' },
        { label: '宠物园', value: 'garden' },
      ]}
    />
  )
}
