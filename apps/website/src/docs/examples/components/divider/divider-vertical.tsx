import { Button, Divider, Space } from 'rocokingdom-ui'

export function DividerVerticalDemo() {
  return (
    <Space>
      <Button material="stone" shadow>
        背包
      </Button>
      <Divider orientation="vertical" />
      <Button material="default" shadow>
        宠物
      </Button>
      <Divider orientation="vertical" />
      <Button material="paper" shadow>
        任务
      </Button>
    </Space>
  )
}
