import { Button, NotificationProvider, useNotification } from 'rocokingdom-ui'

function NotificationAction() {
  const notification = useNotification()
  return (
    <Button
      onClick={() =>
        notification.open({
          action: (
            <Button size="small" variant="outline">
              查看任务
            </Button>
          ),
          description: '前往彼得大道与罗宾对话，领取新的探索委托。',
          status: 'success',
          title: '新任务已解锁',
        })
      }
      shadow
    >
      显示通知
    </Button>
  )
}

export function NotificationExample() {
  return (
    <NotificationProvider>
      <NotificationAction />
    </NotificationProvider>
  )
}
