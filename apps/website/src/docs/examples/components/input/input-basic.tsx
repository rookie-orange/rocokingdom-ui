import { Input } from 'rocokingdom-ui'

export function InputBasicDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Input placeholder="搜索宠物或任务" />
      <Input defaultValue="洛克王国" material="paper" placeholder="请输入名称" />
      <Input material="primary" placeholder="金色高亮" />
    </div>
  )
}
