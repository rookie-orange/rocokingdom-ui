import { Material, RocoShape } from 'rocokingdom-ui'

export function NoticeBadge() {
  return (
    <Material asChild material="paper">
      <RocoShape shadow>今日活动</RocoShape>
    </Material>
  )
}
