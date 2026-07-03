import { useState } from 'react'
import { Slider } from 'rocokingdom-ui'

export function SliderRangeDemo() {
  const [range, setRange] = useState([24, 72])

  return (
    <div className="grid gap-8">
      <Slider
        max={100}
        onValueChange={setRange}
        rangeMaterial="success"
        size="small"
        thumbAriaLabel={(index) => (index === 0 ? '最小等级' : '最大等级')}
        value={range}
      />
      <Slider defaultValue={[62]} rangeMaterial="danger" size="middle" />
      <div className="flex items-end gap-10">
        <Slider
          defaultValue={[34]}
          orientation="vertical"
          rangeMaterial="primaryStrong"
          size="large"
          thumbAriaLabel="纵向数值"
        />
        <p className="pb-5 text-base text-stone/70">
          范围：<span className="text-on-paper">{range.join(' - ')}</span>
        </p>
      </div>
    </div>
  )
}
