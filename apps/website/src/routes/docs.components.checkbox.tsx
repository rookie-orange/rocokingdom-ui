import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Checkbox } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/checkbox')({
  component: CheckboxExamplePage,
})

const checkboxCode = `import { Checkbox } from 'rocokingdom-ui'

export function QuestCheckbox() {
  return (
    <Checkbox defaultChecked name="questReward" value="gold">
      领取金币奖励
    </Checkbox>
  )
}`

function CheckboxExamplePage() {
  const [checked, setChecked] = useState(true)

  return (
    <ExampleShell
      code={checkboxCode}
      description="Checkbox 使用原生 input 承载表单语义，以 square RocoShape 作为底形，选中状态渲染 Check 图标。"
      highlights={[
        'checked/defaultChecked 与 onChange 均可使用。',
        '未选中时保留方形底形，选中时渲染 Check 图标。',
        'material、size、variant、shadow 可组合出不同状态。',
      ]}
      title="Checkbox"
    >
      <ExampleSection
        description="默认会渲染隐藏的原生 checkbox input，外层 label 扩大点击区域。"
        title="基础多选框"
      >
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-6">
            <Checkbox defaultChecked name="reward" value="coin">
              金币
            </Checkbox>
            <Checkbox material="success" name="reward" value="badge">
              徽章
            </Checkbox>
            <Checkbox disabled defaultChecked material="stone" name="reward" value="locked">
              已锁定
            </Checkbox>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="受控值">
        <PreviewSurface>
          <div className="grid gap-5">
            <Checkbox
              checked={checked}
              material="primaryStrong"
              onChange={(event) => setChecked(event.currentTarget.checked)}
              shadow
            >
              开启每日提醒
            </Checkbox>
            <p className="text-base font-black text-stone/70">
              当前状态：<span className="text-on-paper">{checked ? '已开启' : '已关闭'}</span>
            </p>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="尺寸与描边">
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-7">
            <Checkbox defaultChecked material="danger" size="small">
              small
            </Checkbox>
            <Checkbox defaultChecked material="primaryMuted" size="middle" variant="outline">
              middle
            </Checkbox>
            <Checkbox defaultChecked material="success" shadow size="large">
              large
            </Checkbox>
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
