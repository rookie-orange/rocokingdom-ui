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

const checkboxBasicCode = `import { Checkbox } from 'rocokingdom-ui'

export function CheckboxBasicDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Checkbox defaultChecked name="reward" value="coin">
        金币
      </Checkbox>
      <Checkbox
        boxMaterial="paperStrong"
        checkMaterial="danger"
        defaultChecked
        name="reward"
        value="badge"
      >
        徽章
      </Checkbox>
      <Checkbox disabled defaultChecked name="reward" value="locked">
        已锁定
      </Checkbox>
    </div>
  )
}`

const checkboxControlledCode = `import { useState } from 'react'
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
}`

const checkboxSizesCode = `import { Checkbox } from 'rocokingdom-ui'

export function CheckboxSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-7">
      <Checkbox boxMaterial="stone" checkMaterial="danger" defaultChecked size="small">
        small
      </Checkbox>
      <Checkbox boxMaterial="primaryMuted" defaultChecked size="middle" variant="outline">
        middle
      </Checkbox>
      <Checkbox boxMaterial="paperStrong" defaultChecked shadow size="large">
        large
      </Checkbox>
    </div>
  )
}`

function CheckboxExamplePage() {
  const [checked, setChecked] = useState(true)

  return (
    <ExampleShell
      code={checkboxCode}
      description="Checkbox 使用原生 input 承载表单语义，以 square RocoShape 作为底形，选中状态渲染外溢的 Check 图标。"
      highlights={[
        'checked/defaultChecked 与 onChange 均可使用。',
        '默认使用 success 勾选图标与 stone 方形底框。',
        'checkMaterial、boxMaterial、size、variant、shadow 可组合出不同状态。',
      ]}
      title="Checkbox"
    >
      <ExampleSection
        code={checkboxBasicCode}
        description="默认会渲染隐藏的原生 checkbox input，外层 label 扩大点击区域。"
        title="基础多选框"
      >
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-6">
            <Checkbox defaultChecked name="reward" value="coin">
              金币
            </Checkbox>
            <Checkbox
              boxMaterial="paperStrong"
              checkMaterial="danger"
              defaultChecked
              name="reward"
              value="badge"
            >
              徽章
            </Checkbox>
            <Checkbox disabled defaultChecked name="reward" value="locked">
              已锁定
            </Checkbox>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection code={checkboxControlledCode} title="受控值">
        <PreviewSurface>
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
            <p className="text-base text-stone/70">
              当前状态：<span className="text-on-paper">{checked ? '已开启' : '已关闭'}</span>
            </p>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection code={checkboxSizesCode} title="尺寸与描边">
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-7">
            <Checkbox boxMaterial="stone" checkMaterial="danger" defaultChecked size="small">
              small
            </Checkbox>
            <Checkbox boxMaterial="primaryMuted" defaultChecked size="middle" variant="outline">
              middle
            </Checkbox>
            <Checkbox boxMaterial="paperStrong" defaultChecked shadow size="large">
              large
            </Checkbox>
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
