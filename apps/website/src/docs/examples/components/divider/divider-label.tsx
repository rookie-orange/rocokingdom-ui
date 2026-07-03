import { Divider } from 'rocokingdom-ui'

export function DividerLabelDemo() {
  return (
    <div>
      <Divider align="start">主线任务</Divider>
      <Divider dashed>支线委托</Divider>
      <Divider align="end" variant="dotted">
        训练计划
      </Divider>
    </div>
  )
}
