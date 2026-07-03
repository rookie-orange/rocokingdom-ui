import { Badge, BadgeIndicator } from 'rocokingdom-ui'

export function BadgeSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <Badge count={2} size="small" />
      <Badge count={24} material="primary" size="middle" />
      <Badge count={128} maxCount={99} material="danger" shadow size="large" />
      <BadgeIndicator material="stone" variant="outline">
        BOSS
      </BadgeIndicator>
    </div>
  )
}
