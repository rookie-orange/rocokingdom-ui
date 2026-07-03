import { Switch } from 'rocokingdom-ui'

export function SwitchBasicDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Switch defaultChecked name="settings" value="notice">
        每日提醒
      </Switch>
      <Switch checkedMaterial="primaryStrong" defaultChecked name="settings" value="music">
        背景音乐
      </Switch>
      <Switch disabled defaultChecked name="settings" value="locked">
        已锁定
      </Switch>
    </div>
  )
}
