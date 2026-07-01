import { createFileRoute } from '@tanstack/react-router'
import { ButtonNormal } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/button-normal')({
  component: ButtonNormalExamplePage,
})

const buttonNormalCode = `import { ButtonNormal } from 'rocokingdom-ui'

export function ToolbarButton() {
  return <ButtonNormal material="stone">普通按钮</ButtonNormal>
}`

const buttonNormalMaterialsCode = `import { ButtonNormal } from 'rocokingdom-ui'

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

export function ButtonNormalMaterialsDemo() {
  return (
    <div className="grid gap-6">
      {materials.map((material) => (
        <div className="flex flex-wrap items-center gap-4" key={material}>
          <span className="w-36 text-sm capitalize text-stone/60">{material}</span>
          <ButtonNormal material={material}>Solid</ButtonNormal>
          <ButtonNormal material={material} variant="outline">
            Outline
          </ButtonNormal>
          <ButtonNormal material={material} variant="text">
            Text
          </ButtonNormal>
        </div>
      ))}
    </div>
  )
}`

const buttonNormalSizesCode = `import { ButtonNormal } from 'rocokingdom-ui'

export function ButtonNormalSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <ButtonNormal material="stone" size="small">
        Small
      </ButtonNormal>
      <ButtonNormal material="default" size="middle">
        Middle
      </ButtonNormal>
      <ButtonNormal material="paper" size="large">
        Large
      </ButtonNormal>
      <ButtonNormal disabled material="stone">
        Disabled
      </ButtonNormal>
    </div>
  )
}`

function ButtonNormalExamplePage() {
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
      code={buttonNormalCode}
      description="ButtonNormal 是更轻量的胶囊按钮，适合表单、工具栏或不需要 SVG 底形的场景。"
      highlights={[
        'material 覆盖 default、primary、primarySoft、primaryMuted、primaryStrong、paper、stone 以及状态色。',
        'size 覆盖 small、middle、large。',
        'variant 覆盖 solid、outline、text，并展示 disabled。',
      ]}
      title="ButtonNormal"
    >
      <ExampleSection code={buttonNormalMaterialsCode} title="材质与变体">
        <PreviewSurface>
          <div className="grid gap-6">
            {materials.map((material) => (
              <div className="flex flex-wrap items-center gap-4" key={material}>
                <span className="w-36 text-sm capitalize text-stone/60">{material}</span>
                <ButtonNormal material={material}>Solid</ButtonNormal>
                <ButtonNormal material={material} variant="outline">
                  Outline
                </ButtonNormal>
                <ButtonNormal material={material} variant="text">
                  Text
                </ButtonNormal>
              </div>
            ))}
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection code={buttonNormalSizesCode} title="尺寸与禁用状态">
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-4">
            <ButtonNormal material="stone" size="small">
              Small
            </ButtonNormal>
            <ButtonNormal material="default" size="middle">
              Middle
            </ButtonNormal>
            <ButtonNormal material="paper" size="large">
              Large
            </ButtonNormal>
            <ButtonNormal disabled material="stone">
              Disabled
            </ButtonNormal>
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
