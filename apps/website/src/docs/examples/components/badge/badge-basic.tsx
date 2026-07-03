import { Badge, BadgeIndicator } from 'rocokingdom-ui'

export function BadgeBasicDemo() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <Badge count={8} />
      <Badge count={128} maxCount={99} material="primary" />
      <Badge count="NEW" material="success" />
      <Badge count={0} material="stone" showZero />
      <BadgeIndicator material="primaryStrong" size="large">
        SSR
      </BadgeIndicator>
    </div>
  )
}
