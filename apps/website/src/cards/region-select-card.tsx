import { Button, Drawer, Select } from 'rocokingdom-ui'
import { actionButtonClassName, CardField, CardHeading, HomeCard } from './home-card'

export interface RegionOption {
  label: string
  value: string
}

interface RegionSelectCardProps {
  className?: string
  onRegionChange: (region: string) => void
  options: readonly RegionOption[]
  region: string
}

export function RegionSelectCard({
  className,
  onRegionChange,
  options,
  region,
}: RegionSelectCardProps) {
  const selectedRegionLabel =
    options.find((option) => option.value === region)?.label ?? '未选择传送点'

  return (
    <HomeCard className={className} contentClassName="flex h-full min-h-0 flex-col gap-3 sm:gap-4">
      <CardHeading description="选择本次出发目的地。" title="传送计划" />

      <CardField label="传送点">
        <Select
          ariaLabel="选择传送点"
          material="stone"
          onValueChange={onRegionChange}
          options={options}
          placeholder="选择传送点"
          rootClassName="!w-full !min-w-0"
          value={region}
        />
      </CardField>

      <div className="mt-auto">
        <Drawer
          description="确认本次传送目标与随行安排。"
          overlay
          side="right"
          title="传送路线"
          trigger={
            <Button material="primary" rootClassName={actionButtonClassName} shadow>
              查看路线
            </Button>
          }
        >
          <div className="grid gap-4 text-on-stone">
            <p className="m-0 text-sm leading-6">当前传送点：{selectedRegionLabel}</p>
            <div className="grid gap-2 text-sm leading-6">
              <span>集合队伍并确认背包容量。</span>
              <span>启动地图符文，前往{selectedRegionLabel}。</span>
              <span>抵达后同步任务提醒。</span>
            </div>
          </div>
        </Drawer>
      </div>
    </HomeCard>
  )
}
