import { Textarea } from 'rocokingdom-ui'

export function TextareaSizeDemo() {
  return (
    <div className="flex flex-wrap items-start gap-5">
      <Textarea
        material="primarySoft"
        placeholder="宽一点的记录面板"
        resize="both"
        style={{ minHeight: 164, width: 420 }}
      />
      <Textarea
        material="stoneStrong"
        placeholder="紧凑备注"
        resize="none"
        size="small"
        style={{ minHeight: 112, width: 260 }}
      />
    </div>
  )
}
