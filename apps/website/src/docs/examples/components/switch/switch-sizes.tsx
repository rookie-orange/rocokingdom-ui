import { Switch } from 'rocokingdom-ui'

export function SwitchSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-7">
      <Switch checkedMaterial="danger" defaultChecked size="small">
        small
      </Switch>
      <Switch
        defaultChecked
        size="middle"
        thumbMaterial="primarySoft"
        uncheckedMaterial="paperStrong"
      >
        middle
      </Switch>
      <Switch checkedMaterial="stone" defaultChecked size="large" thumbMaterial="primary">
        large
      </Switch>
    </div>
  )
}
