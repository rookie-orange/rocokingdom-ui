import { RocoShape } from 'rocokingdom-ui'

export function RocoShapeFixedDemo() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <RocoShape
        shadow
        shape="circle"
        style={{ color: 'var(--rk-primary)', height: 56, width: 56 }}
      />
      <RocoShape
        shape="circle"
        style={{ color: 'var(--rk-stone)', height: 56, width: 56 }}
        variant="outline"
      />
      <RocoShape shadow shape="square" style={{ color: '#d94b4b', height: 56, width: 56 }} />
      <RocoShape
        shape="square"
        style={{ color: '#2f7dd1', height: 56, width: 56 }}
        variant="outline"
      />
    </div>
  )
}
