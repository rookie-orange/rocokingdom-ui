import { RocoShape } from 'rocokingdom-ui'

export function RocoShapeVariantDemo() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-5">
        <RocoShape shadow style={{ color: 'var(--rk-primary)', height: 44, width: 180 }} />
        <RocoShape style={{ color: 'var(--rk-stone)', height: 44, width: 180 }} />
        <RocoShape style={{ color: 'var(--rk-stone)', height: 44, width: 180 }} variant="outline" />
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <RocoShape shadow style={{ color: '#2f7dd1', height: 32, width: 120 }} />
        <RocoShape shadow style={{ color: '#d94b4b', height: 52, width: 240 }} />
      </div>
    </div>
  )
}
