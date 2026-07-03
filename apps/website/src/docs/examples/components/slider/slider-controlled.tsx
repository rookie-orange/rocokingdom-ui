import { useState } from 'react'
import { Slider } from 'rocokingdom-ui'

export function SliderControlledDemo() {
  const [volume, setVolume] = useState([46])

  return (
    <div className="grid gap-5">
      <Slider max={100} onValueChange={setVolume} thumbAriaLabel="当前音量" value={volume} />
      <p className="text-base text-stone/70">
        当前音量：<span className="text-on-paper">{volume[0]}</span>
      </p>
    </div>
  )
}
