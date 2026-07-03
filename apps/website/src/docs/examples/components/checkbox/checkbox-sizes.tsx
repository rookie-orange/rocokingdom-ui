import { Checkbox } from 'rocokingdom-ui'

export function CheckboxSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-7">
      <Checkbox boxMaterial="stone" checkMaterial="danger" defaultChecked size="small">
        small
      </Checkbox>
      <Checkbox boxMaterial="primaryMuted" defaultChecked size="middle" variant="outline">
        middle
      </Checkbox>
      <Checkbox boxMaterial="paperStrong" defaultChecked shadow size="large">
        large
      </Checkbox>
    </div>
  )
}
