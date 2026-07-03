import { Panel, Stack } from 'rocokingdom-ui'

export function StackDemo() {
  return (
    <Stack size="small">
      <Panel material="paper">
        <strong>每日训练</strong>
        <p>完成战斗、采集和探险三项任务。</p>
      </Panel>
      <Panel material="stone">
        <strong>Boss 情报</strong>
        <p>推荐携带高魔抗宠物。</p>
      </Panel>
    </Stack>
  )
}
