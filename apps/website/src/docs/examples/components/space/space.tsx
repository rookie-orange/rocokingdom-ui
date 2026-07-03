import { Button, Space } from 'rocokingdom-ui'

export function Toolbar() {
  return (
    <Space wrap>
      <Button material="stone" shadow>
        背包
      </Button>
      <Button material="default" shadow>
        宠物
      </Button>
      <Button material="paper" shadow>
        任务
      </Button>
    </Space>
  )
}
