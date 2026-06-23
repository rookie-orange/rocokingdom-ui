import { createFileRoute } from '@tanstack/react-router'
import { ButtonNormal } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/examples/button-normal')({
  component: ButtonNormalExamplePage,
})

const buttonNormalCode = `import { ButtonNormal } from 'rocokingdom-ui'

export function ToolbarButton() {
  return <ButtonNormal material="stone">普通按钮</ButtonNormal>
}`

function ButtonNormalExamplePage() {
  return (
    <ExampleShell
      code={buttonNormalCode}
      description="ButtonNormal 是更轻量的胶囊按钮，适合表单、工具栏或不需要 SVG 底形的场景。"
      highlights={[
        'material 覆盖 default、paper、stone。',
        'size 覆盖 small、middle、large。',
        'variant 覆盖 solid、outline、text，并展示 disabled。',
      ]}
      slug="button-normal"
      title="ButtonNormal"
    >
      <ExampleSection title="材质与变体">
        <PreviewSurface>
          <div className="grid gap-6">
            {(['default', 'paper', 'stone'] as const).map((material) => (
              <div className="flex flex-wrap items-center gap-4" key={material}>
                <span className="w-20 text-sm font-black uppercase text-stone/60">{material}</span>
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

      <ExampleSection title="尺寸与禁用状态">
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
