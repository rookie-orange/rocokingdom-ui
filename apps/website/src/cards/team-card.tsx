import { BadgeIndicator, Button, Input } from 'rocokingdom-ui'
import { CardHeading, HomeCard } from './home-card'

const teamMembers = ['迪莫', '喵喵', '水蓝蓝', '火花'] as const

interface TeamCardProps {
  className?: string
}

export function TeamCard({ className }: TeamCardProps) {
  return (
    <HomeCard className={className} contentClassName="grid gap-4">
      <CardHeading description="邀请并管理你的冒险伙伴。" title="王国队伍" />

      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-[0.7rem]">
        <Input material="paper" placeholder="输入伙伴邮箱" readOnly rootClassName="!w-full" />
        <Button material="primary" shadow>
          邀请
        </Button>
      </div>

      <div className="grid">
        {teamMembers.map((name, index) => (
          <div
            className="grid min-h-12 grid-cols-[auto_minmax(5rem,0.75fr)_minmax(0,1fr)] items-center gap-3 border-t border-stone/15"
            key={name}
          >
            <BadgeIndicator material={index % 2 === 0 ? 'primarySoft' : 'paperStrong'} shadow>
              {name.slice(0, 1)}
            </BadgeIndicator>
            <strong className="font-extrabold text-primary-strong">{name}</strong>
            <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-stone/55">
              {name.toLowerCase()}@kingdom.ui
            </span>
          </div>
        ))}
      </div>
    </HomeCard>
  )
}
