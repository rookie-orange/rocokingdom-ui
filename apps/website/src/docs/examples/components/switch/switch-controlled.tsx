import { useState } from 'react'
import { Switch } from 'rocokingdom-ui'

export function SwitchControlledDemo() {
  const [enabled, setEnabled] = useState(true)

  return (
    <div className="grid gap-5">
      <Switch
        checked={enabled}
        checkedMaterial="success"
        onCheckedChange={setEnabled}
        thumbMaterial="paperSoft"
        uncheckedMaterial="stoneStrong"
      >
        开启活动提醒
      </Switch>
      <p>当前状态：{enabled ? '已开启' : '已关闭'}</p>
    </div>
  )
}
