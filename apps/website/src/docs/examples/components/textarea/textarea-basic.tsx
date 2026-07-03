import { Textarea } from 'rocokingdom-ui'

export function TextareaBasicDemo() {
  return (
    <div className="grid max-w-2xl gap-4">
      <Textarea
        defaultValue="今天在商店街遇到了新的任务线索。"
        maxLength={120}
        name="questNote"
        placeholder="记录任务线索"
        showCount
      />
      <Textarea material="paper" placeholder="写下宠物培养计划" />
    </div>
  )
}
