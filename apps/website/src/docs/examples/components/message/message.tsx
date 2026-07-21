import { Button, MessageProvider, Space, useMessage } from 'rocokingdom-ui'

function MessageActions() {
  const message = useMessage()
  return (
    <Space wrap>
      <Button onClick={() => message.success('进度已保存')} shadow>
        成功消息
      </Button>
      <Button material="danger" onClick={() => message.danger('连接已中断')}>
        错误消息
      </Button>
      <Button material="stone" onClick={() => message.loading('正在传送', { duration: 2200 })}>
        加载消息
      </Button>
    </Space>
  )
}

export function MessageExample() {
  return (
    <MessageProvider>
      <MessageActions />
    </MessageProvider>
  )
}
