import { createFileRoute } from '@tanstack/react-router'
import { Button } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/button')({
  component: ButtonExamplePage,
})

const buttonCode = `import { Button } from 'rocokingdom-ui'

export function ActionBar() {
  return (
    <Button material="default" shadow size="large">
      开始冒险
    </Button>
  )
}`

const buttonMaterialsCode = `import { Button } from 'rocokingdom-ui'

const materials = [
  'default',
  'primary',
  'primarySoft',
  'primaryMuted',
  'primaryStrong',
  'paper',
  'stone',
  'success',
  'danger',
] as const

export function ButtonMaterialsDemo() {
  return (
    <div className="grid gap-8">
      {materials.map((material) => (
        <div className="flex flex-wrap items-center gap-4" key={material}>
          <span className="w-36 capitalize text-sm text-stone/60">{material}</span>
          <Button material={material} shadow>
            实心按钮
          </Button>
          <Button material={material} shadow variant="outline">
            描边按钮
          </Button>
          <Button material={material} variant="text">
            文本按钮
          </Button>
        </div>
      ))}
    </div>
  )
}`

const buttonSizeCode = `import { Button } from 'rocokingdom-ui'

export function ButtonSizeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button material="stone" shadow size="small">
        Small
      </Button>
      <Button material="default" shadow size="middle">
        Middle
      </Button>
      <Button material="paper" shadow size="large">
        Large
      </Button>
      <Button disabled material="stone" shadow>
        Disabled
      </Button>
    </div>
  )
}`

const buttonCompactCode = `import { Button } from 'rocokingdom-ui'

export function CompactButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button material="default" shadow size="small">
        背包
      </Button>
      <Button material="stone" shadow size="small" variant="outline">
        任务
      </Button>
    </div>
  )
}`

function ButtonExamplePage() {
  const materials = [
    'default',
    'primary',
    'primarySoft',
    'primaryMuted',
    'primaryStrong',
    'paper',
    'stone',
    'success',
    'danger',
  ] as const

  return (
    <ExampleShell
      code={buttonCode}
      description="Button 使用 RocoShape 作为底形，支持多种语义材质、三种尺寸、solid/outline/text 变体、阴影和禁用状态。"
      highlights={[
        'material 覆盖 default、primary、primarySoft、primaryMuted、primaryStrong、paper、stone 以及状态色。',
        'size 覆盖 small、middle、large。',
        'variant 覆盖 solid、outline、text，并展示 shadow 与 disabled。',
      ]}
      title="Button"
    >
      <ExampleSection
        code={buttonMaterialsCode}
        description="常用动作按钮建议使用 solid + shadow，次级动作使用 outline 或 text。"
        title="材质与变体"
      >
        <PreviewSurface>
          <div className="grid gap-8">
            {materials.map((material) => (
              <div className="flex flex-wrap items-center gap-4" key={material}>
                <span className="w-36 capitalize text-sm text-stone/60">{material}</span>
                <Button material={material} shadow>
                  实心按钮
                </Button>
                <Button material={material} shadow variant="outline">
                  描边按钮
                </Button>
                <Button material={material} variant="text">
                  文本按钮
                </Button>
              </div>
            ))}
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection code={buttonSizeCode} title="尺寸与状态">
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-4">
            <Button material="stone" shadow size="small">
              Small
            </Button>
            <Button material="default" shadow size="middle">
              Middle
            </Button>
            <Button material="paper" shadow size="large">
              Large
            </Button>
            <Button disabled material="stone" shadow>
              Disabled
            </Button>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection
        code={buttonCompactCode}
        description="小尺寸按钮适合密集工具栏和紧凑操作区。"
        title="紧凑按钮"
      >
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-4">
            <Button material="default" shadow size="small">
              背包
            </Button>
            <Button material="stone" shadow size="small" variant="outline">
              任务
            </Button>
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
