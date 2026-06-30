import { createFileRoute } from '@tanstack/react-router'
import { Input } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/input')({
  component: InputExamplePage,
})

const inputCode = `import { Input } from 'rocokingdom-ui'

export function SearchBox() {
  return <Input placeholder="搜索宠物或任务" />
}`

function InputExamplePage() {
  return (
    <ExampleShell
      code={inputCode}
      description="Input 使用与 Button 相同的 RocoShape stretch 底形，默认 material 为 stone，支持尺寸、前后缀、描边、阴影、禁用和只读状态。"
      highlights={[
        '默认 material="stone"，可切换到 paper、primary、success、danger 等语义材质。',
        'shape 与 Button 一致，外层由 RocoShape 承载，真实输入仍保留原生 input 行为。',
        'size 覆盖 small、middle、large，可通过 prefix 和 suffix 放置短标签或单位。',
      ]}
      title="Input"
    >
      <ExampleSection
        description="默认输入框使用 stone 材质，适合放在纸面或浅色面板上。"
        title="基础用法"
      >
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-4">
            <Input placeholder="搜索宠物或任务" />
            <Input defaultValue="洛克王国" material="paper" placeholder="请输入名称" />
            <Input material="primary" placeholder="金色高亮" />
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="尺寸与前后缀">
        <PreviewSurface>
          <div className="grid max-w-2xl gap-4">
            <Input prefix="ID" placeholder="small" size="small" suffix="#" />
            <Input prefix="Lv." placeholder="middle" suffix="/100" />
            <Input prefix="Quest" placeholder="large" size="large" suffix="GO" />
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection
        description="outline 适合低强调字段；状态色可以直接通过 material 切换。"
        title="状态与变体"
      >
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-4">
            <Input material="stone" placeholder="描边输入" variant="outline" />
            <Input material="success" placeholder="成功状态" shadow />
            <Input material="danger" placeholder="错误状态" shadow />
            <Input disabled placeholder="禁用状态" />
            <Input readOnly value="只读内容" />
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
