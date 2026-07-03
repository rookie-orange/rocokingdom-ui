import { useState } from 'react'
import { Checkbox } from 'rocokingdom-ui'

export function CheckboxControlledDemo() {
  const [checked, setChecked] = useState(true)

  return (
    <div className="grid gap-5">
      <Checkbox
        boxMaterial="stoneStrong"
        checked={checked}
        checkMaterial="success"
        onChange={(event) => setChecked(event.currentTarget.checked)}
        shadow
      >
        开启每日提醒
      </Checkbox>
      <p>当前状态：{checked ? '已开启' : '已关闭'}</p>
    </div>
  )
}
