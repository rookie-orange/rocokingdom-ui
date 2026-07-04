import { Slider } from 'rocokingdom-ui'
import { HomeCard } from './home-card'

interface TemperatureCardProps {
  className?: string
}

export function TemperatureCard({ className }: TemperatureCardProps) {
  return (
    <HomeCard className={className} contentClassName="grid gap-[0.85rem]">
      <div className="flex justify-between font-extrabold text-primary-strong">
        <span>20°C</span>
        <span>50°C</span>
        <span>80°C</span>
      </div>
      <Slider
        defaultValue={[35, 65]}
        max={100}
        min={0}
        rangeMaterial="primary"
        thumbAriaLabel={(index) => `温度值 ${index + 1}`}
        thumbMaterial="primary"
        trackMaterial="paperStrong"
      />
    </HomeCard>
  )
}
