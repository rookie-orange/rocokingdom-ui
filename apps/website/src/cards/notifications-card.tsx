import { useState } from 'react'
import { Checkbox, Switch } from 'rocokingdom-ui'
import { CardDescription, CardHeading, HomeCard } from './home-card'

interface NotificationsCardProps {
  className?: string
}

export function NotificationsCard({ className }: NotificationsCardProps) {
  const [notifyEnabled, setNotifyEnabled] = useState(true)
  const [dailyChecked, setDailyChecked] = useState(true)

  return (
    <HomeCard className={className} contentClassName="grid gap-4">
      <CardHeading description="管理任务、收藏和协作通知。" title="消息提醒" />

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-[0.9rem] border-t border-stone/15 pt-[0.9rem]">
        <div>
          <strong className="text-[0.95rem] font-extrabold leading-none text-on-paper">
            评论提醒
          </strong>
          <CardDescription>有人提到你时及时收到提醒。</CardDescription>
        </div>
        <Switch checked={notifyEnabled} onCheckedChange={setNotifyEnabled}>
          推送
        </Switch>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-[0.9rem] border-t border-stone/15 pt-[0.9rem]">
        <div>
          <strong className="text-[0.95rem] font-extrabold leading-none text-on-paper">
            收藏更新
          </strong>
          <CardDescription>追踪已收藏组件的状态变化。</CardDescription>
        </div>
        <Checkbox
          boxMaterial="stoneStrong"
          checked={dailyChecked}
          checkMaterial="primary"
          onChange={(event) => setDailyChecked(event.currentTarget.checked)}
          shadow
        >
          邮件
        </Checkbox>
      </div>
    </HomeCard>
  )
}
