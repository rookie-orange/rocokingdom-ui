import { BadgeIndicator } from 'rocokingdom-ui'
import { CardHeading, HomeCard } from './home-card'
import { cn } from './utils'

interface FinanceCardProps {
  className?: string
}

export function FinanceCard({ className }: FinanceCardProps) {
  return (
    <HomeCard className={cn('max-sm:hidden', className)} contentClassName="grid gap-3">
      <CardHeading description="查看今日组件收益。" title="王国资产" />
      <strong className="text-5xl leading-none tracking-normal">$35.8K</strong>
      <BadgeIndicator material="success" shadow size="small">
        +3.4%
      </BadgeIndicator>
    </HomeCard>
  )
}
