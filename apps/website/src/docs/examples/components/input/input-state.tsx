import { Input } from 'rocokingdom-ui'

export function InputStateDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Input material="stone" placeholder="描边输入" variant="outline" />
      <Input material="success" placeholder="成功状态" shadow />
      <Input material="danger" placeholder="错误状态" shadow />
      <Input disabled placeholder="禁用状态" />
      <Input readOnly value="只读内容" />
    </div>
  )
}
