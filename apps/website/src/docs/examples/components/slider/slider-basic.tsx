import { Slider } from 'rocokingdom-ui'

export function SliderBasicDemo() {
  return (
    <div className="rounded-full bg-stone px-8 py-5 shadow-[0_10px_0_var(--rk-shadow-color)]">
      <Slider
        className="w-full!"
        defaultValue={[46]}
        max={100}
        name="volume"
        size="large"
        thumbAriaLabel="音量"
      />
    </div>
  )
}
