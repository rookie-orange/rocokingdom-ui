import { BadgeIndicator } from 'rocokingdom-ui'
import { CardDescription, CardTitle, HomeCard } from './home-card'
import { cn } from './utils'

interface SettlementCardProps {
  className?: string
}

export function SettlementCard({ className }: SettlementCardProps) {
  return (
    <HomeCard
      className={cn('max-sm:hidden', className)}
      contentClassName="grid min-h-36 items-center justify-items-center gap-2 text-center"
    >
      <BadgeIndicator material="success" shadow>
        ✓
      </BadgeIndicator>
      <CardTitle>奖励已结算</CardTitle>
      <CardDescription>你已完成今日任务奖励结算。</CardDescription>
    </HomeCard>
  )
}
