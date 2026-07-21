import { Button, Space, Tooltip } from 'rocokingdom-ui'

export function TooltipExample() {
  return (
    <Space size="large">
      <Tooltip content="查看当前任务详情" placement="top">
        <Button>任务</Button>
      </Tooltip>
      <Tooltip content="背包已满" material="danger" placement="right">
        <Button material="stone">背包</Button>
      </Tooltip>
    </Space>
  )
}
