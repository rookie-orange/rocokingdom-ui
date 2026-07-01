import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Switch } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/switch')({
  component: SwitchExamplePage,
})

const switchCode = `import { Switch } from 'rocokingdom-ui'

export function NoticeSwitch() {
  return (
    <Switch defaultChecked name="dailyNotice">
      每日提醒
    </Switch>
  )
}`

const switchBasicCode = `import { Switch } from 'rocokingdom-ui'

export function SwitchBasicDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Switch defaultChecked name="settings" value="notice">
        每日提醒
      </Switch>
      <Switch checkedMaterial="primaryStrong" defaultChecked name="settings" value="music">
        背景音乐
      </Switch>
      <Switch disabled defaultChecked name="settings" value="locked">
        已锁定
      </Switch>
    </div>
  )
}`

const switchControlledCode = `import { useState } from 'react'
import { Switch } from 'rocokingdom-ui'

export function SwitchControlledDemo() {
  const [enabled, setEnabled] = useState(true)

  return (
    <div className="grid gap-5">
      <Switch
        checked={enabled}
        checkedMaterial="success"
        onCheckedChange={setEnabled}
        thumbMaterial="paperSoft"
        uncheckedMaterial="stoneStrong"
      >
        开启活动提醒
      </Switch>
      <p>当前状态：{enabled ? '已开启' : '已关闭'}</p>
    </div>
  )
}`

const switchSizesCode = `import { Switch } from 'rocokingdom-ui'

export function SwitchSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-7">
      <Switch checkedMaterial="danger" defaultChecked size="small">
        small
      </Switch>
      <Switch
        defaultChecked
        size="middle"
        thumbMaterial="primarySoft"
        uncheckedMaterial="paperStrong"
      >
        middle
      </Switch>
      <Switch checkedMaterial="stone" defaultChecked size="large" thumbMaterial="primary">
        large
      </Switch>
    </div>
  )
}`

function SwitchExamplePage() {
  const [enabled, setEnabled] = useState(true)

  return (
    <ExampleShell
      code={switchCode}
      description="Switch 使用原生 checkbox input 承载表单语义，并以 stretch RocoShape 作为轨道，适合即时开启或关闭设置。"
      highlights={[
        'checked/defaultChecked、onChange 与 onCheckedChange 均可使用。',
        '默认开启状态使用 success 轨道，关闭状态使用 stone 轨道。',
        'checkedMaterial、uncheckedMaterial、thumbMaterial 和 size 可组合状态视觉。',
      ]}
      title="Switch"
    >
      <ExampleSection
        code={switchBasicCode}
        description="默认会渲染隐藏的原生 checkbox input，外层 label 扩大点击区域。"
        title="基础开关"
      >
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-6">
            <Switch defaultChecked name="settings" value="notice">
              每日提醒
            </Switch>
            <Switch checkedMaterial="primaryStrong" defaultChecked name="settings" value="music">
              背景音乐
            </Switch>
            <Switch disabled defaultChecked name="settings" value="locked">
              已锁定
            </Switch>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection code={switchControlledCode} title="受控值">
        <PreviewSurface>
          <div className="grid gap-5">
            <Switch
              checked={enabled}
              checkedMaterial="success"
              onCheckedChange={setEnabled}
              thumbMaterial="paperSoft"
              uncheckedMaterial="stoneStrong"
            >
              开启活动提醒
            </Switch>
            <p className="text-base text-stone/70">
              当前状态：<span className="text-on-paper">{enabled ? '已开启' : '已关闭'}</span>
            </p>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection code={switchSizesCode} title="尺寸与材质">
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-7">
            <Switch checkedMaterial="danger" defaultChecked size="small">
              small
            </Switch>
            <Switch
              defaultChecked
              size="middle"
              thumbMaterial="primarySoft"
              uncheckedMaterial="paperStrong"
            >
              middle
            </Switch>
            <Switch checkedMaterial="stone" defaultChecked size="large" thumbMaterial="primary">
              large
            </Switch>
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
