import { Button, Drawer } from 'rocokingdom-ui'

export function QuestDrawer() {
  return (
    <Drawer
      overlay
      side="right"
      size={520}
      title="任务详情"
      trigger={<Button shadow>打开抽屉</Button>}
    >
      今日任务详情
    </Drawer>
  )
}
