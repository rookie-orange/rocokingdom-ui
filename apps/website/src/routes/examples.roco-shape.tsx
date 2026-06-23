import { createFileRoute } from '@tanstack/react-router'
import { RocoShape } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/examples/roco-shape')({
  component: RocoShapeExamplePage,
})

const rocoShapeCode = `import { RocoShape } from 'rocokingdom-ui'

export function ButtonBackplate() {
  return (
    <RocoShape
      shadow
      style={{ color: 'var(--rk-primary)', height: 44, width: 180 }}
    />
  )
}`

function RocoShapeExamplePage() {
  return (
    <ExampleShell
      code={rocoShapeCode}
      description="RocoShape 是可拉伸的按钮底形，左右弧线保持比例，中间区域自动延展。"
      highlights={[
        'variant 覆盖 solid、outline。',
        'shadow 仅对实心填充生效。',
        '通过 width、height、color 或 CSS 变量控制外观。',
      ]}
      slug="roco-shape"
      title="RocoShape"
    >
      <ExampleSection title="实心与描边">
        <PreviewSurface>
          <div className="grid gap-6">
            <div className="flex flex-wrap items-center gap-5">
              <RocoShape shadow style={{ color: 'var(--rk-primary)', height: 44, width: 180 }} />
              <RocoShape style={{ color: 'var(--rk-stone)', height: 44, width: 180 }} />
              <RocoShape
                style={{ color: 'var(--rk-stone)', height: 44, width: 180 }}
                variant="outline"
              />
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <RocoShape shadow style={{ color: '#2f7dd1', height: 32, width: 120 }} />
              <RocoShape shadow style={{ color: '#d94b4b', height: 52, width: 240 }} />
            </div>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="作为装饰底板">
        <PreviewSurface>
          <div className="relative grid min-h-32 max-w-xl place-items-center">
            <RocoShape
              className="absolute inset-x-0 mx-auto"
              shadow
              style={{ color: 'var(--rk-stone)', height: 72, width: 'min(100%, 460px)' }}
            />
            <span className="relative z-10 font-roco text-3xl font-black text-on-stone">
              今日活动
            </span>
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
