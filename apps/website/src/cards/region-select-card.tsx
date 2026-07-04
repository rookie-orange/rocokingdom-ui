import { BadgeIndicator, Select } from 'rocokingdom-ui'
import { CardField, HomeCard } from './home-card'

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
  return (
    <HomeCard
      className={className}
      contentClassName="grid grid-cols-[minmax(10rem,1fr)_auto] items-center gap-[0.85rem] max-sm:grid-cols-1"
    >
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
      <BadgeIndicator material="primaryStrong" shadow>
        已选择
      </BadgeIndicator>
    </HomeCard>
  )
}
