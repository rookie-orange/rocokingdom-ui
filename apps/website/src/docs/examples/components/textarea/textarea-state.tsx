import { Textarea } from 'rocokingdom-ui'

export function TextareaStateDemo() {
  return (
    <div className="grid max-w-2xl gap-4">
      <Textarea material="success" placeholder="成功状态" shadow />
      <Textarea material="danger" placeholder="危险状态" shadow />
      <Textarea material="stone" placeholder="描边文本域" variant="outline" />
      <Textarea disabled placeholder="禁用状态" />
      <Textarea readOnly value="只读内容不可编辑" />
    </div>
  )
}
