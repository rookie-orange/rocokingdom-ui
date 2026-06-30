import { createFileRoute } from '@tanstack/react-router'
import { Textarea } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/textarea')({
  component: TextareaExamplePage,
})

const textareaCode = `import { Textarea } from 'rocokingdom-ui'

export function QuestTextarea() {
  return (
    <Textarea
      maxLength={120}
      name="questNote"
      placeholder="记录任务线索"
      showCount
    />
  )
}`

function TextareaExamplePage() {
  return (
    <ExampleShell
      code={textareaCode}
      description="Textarea 使用专用四角不规则容器形状：四个角保持固定曲线，四条边和中间区域随宽高自由伸展。"
      highlights={[
        '不同于 Button 的左右端帽，TextareaFrame 会同时处理四个角。',
        'material、variant、size、resize 和 shadow 可组合出不同输入区域。',
        'showCount 会根据当前值和 maxLength 显示字数统计。',
      ]}
      title="Textarea"
    >
      <ExampleSection
        description="默认使用 stone 材质，适合浅色纸面上的任务记录、备注或长文本输入。"
        title="基础文本域"
      >
        <PreviewSurface>
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
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection
        description="可以通过 style 直接控制根容器宽高，四角不会被整块拉伸。"
        title="自由尺寸"
      >
        <PreviewSurface>
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
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="状态与变体">
        <PreviewSurface>
          <div className="grid max-w-2xl gap-4">
            <Textarea material="success" placeholder="成功状态" shadow />
            <Textarea material="danger" placeholder="危险状态" shadow />
            <Textarea material="stone" placeholder="描边文本域" variant="outline" />
            <Textarea disabled placeholder="禁用状态" />
            <Textarea readOnly value="只读内容不可编辑" />
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
