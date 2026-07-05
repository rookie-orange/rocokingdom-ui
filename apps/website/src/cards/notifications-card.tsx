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
    <HomeCard className={className} contentClassName="grid gap-3 sm:gap-4">
      <CardHeading description="切换即时推送，勾选每日汇总。" title="提醒设置" />

      <div className="grid grid-cols-2 items-center gap-4 border-t border-stone/15 pt-4">
        <div>
          <strong className="text-sm font-extrabold leading-none text-on-paper">即时推送</strong>
          <CardDescription>任务变更时马上提醒。</CardDescription>
        </div>
        <Switch checked={notifyEnabled} onCheckedChange={setNotifyEnabled}>
          推送
        </Switch>
      </div>

      <div className="grid grid-cols-2 items-center gap-4 border-t border-stone/15 pt-4">
        <div>
          <strong className="text-sm font-extrabold leading-none text-on-paper">每日汇总</strong>
          <CardDescription>晚上整理一次队伍进度。</CardDescription>
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
