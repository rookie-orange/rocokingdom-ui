import { Alert, Stack } from 'rocokingdom-ui'

export function AlertExample() {
  return (
    <Stack rootClassName="w-full" size="middle">
      <Alert description="新的地图区域已经开放。" status="success" title="探索许可已更新" />
      <Alert closable description="部分资源仍在下载中。" status="warning" title="请稍候" />
      <Alert description="无法连接到当前频道。" status="danger" title="连接失败" />
    </Stack>
  )
}
