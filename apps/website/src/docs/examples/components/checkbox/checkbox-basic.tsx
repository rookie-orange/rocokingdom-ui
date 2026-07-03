import { Checkbox } from 'rocokingdom-ui'

export function CheckboxBasicDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Checkbox defaultChecked name="reward" value="coin">
        金币
      </Checkbox>
      <Checkbox
        boxMaterial="paperStrong"
        checkMaterial="danger"
        defaultChecked
        name="reward"
        value="badge"
      >
        徽章
      </Checkbox>
      <Checkbox disabled defaultChecked name="reward" value="locked">
        已锁定
      </Checkbox>
    </div>
  )
}
