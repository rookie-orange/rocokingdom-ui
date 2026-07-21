import { Space, Tag } from 'rocokingdom-ui'

export function TagExample() {
  return (
    <Space size="middle" wrap>
      <Tag material="primary" shadow>
        主线任务
      </Tag>
      <Tag material="success">已完成</Tag>
      <Tag material="danger" closable>
        高风险
      </Tag>
      <Tag material="stone" variant="outline">
        夜间限定
      </Tag>
      <Tag material="paperStrong" size="large">
        活动区域
      </Tag>
    </Space>
  )
}
