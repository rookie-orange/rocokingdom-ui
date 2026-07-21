import { Button, Empty, Result, Stack } from 'rocokingdom-ui'

export function ResultExample() {
  return (
    <Stack rootClassName="w-full" size="large">
      <Empty description="当前区域没有可领取的任务" title="任务列表为空" />
      <Result
        description="奖励已放入背包。"
        extra={<Button shadow>继续探索</Button>}
        status="success"
        title="任务完成"
      />
    </Stack>
  )
}
