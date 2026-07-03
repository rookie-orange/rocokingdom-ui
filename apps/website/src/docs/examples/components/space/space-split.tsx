import { Divider, Space } from 'rocokingdom-ui'

export function SpaceSplitDemo() {
  return (
    <Space split={<Divider orientation="vertical" />} wrap>
      <span>草系徽章</span>
      <span>火系徽章</span>
      <span>水系徽章</span>
    </Space>
  )
}
