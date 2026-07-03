import { Input } from 'rocokingdom-ui'

export function InputAffixDemo() {
  return (
    <div className="grid max-w-2xl gap-4">
      <Input prefix="ID" placeholder="small" size="small" suffix="#" />
      <Input prefix="Lv." placeholder="middle" suffix="/100" />
      <Input prefix="Quest" placeholder="large" size="large" suffix="GO" />
    </div>
  )
}
