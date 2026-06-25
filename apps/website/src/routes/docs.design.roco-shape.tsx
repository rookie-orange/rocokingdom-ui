import { createFileRoute } from '@tanstack/react-router'
import { RocoShape } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/design/roco-shape')({
  component: RocoShapeExamplePage,
})

const rocoShapeCode = `import { RocoShape } from 'rocokingdom-ui'

export function NoticeBadge() {
  return (
    <RocoShape material="paper" shadow>
      今日活动
    </RocoShape>
  )
}`

function RocoShapeExamplePage() {
  return (
    <ExampleShell
      code={rocoShapeCode}
      description="RocoShape 是可拉伸的造型表面，左右弧线保持比例，中间区域自动延展，也可以直接承载文字内容。"
      highlights={[
        'shape 覆盖 stretch、circle、square。',
        'variant 覆盖 solid、outline。',
        'shadow 仅对实心填充生效。',
        'children 会自动生成内容层，不需要手写 position、inset 或 z-index。',
        'material、background 和 color 与 Material 使用同一组表面变量。',
      ]}
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

      <ExampleSection title="圆形与正方形">
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-5">
            <RocoShape
              shadow
              shape="circle"
              style={{ color: 'var(--rk-primary)', height: 56, width: 56 }}
            />
            <RocoShape
              shape="circle"
              style={{ color: 'var(--rk-stone)', height: 56, width: 56 }}
              variant="outline"
            />
            <RocoShape shadow shape="square" style={{ color: '#d94b4b', height: 56, width: 56 }} />
            <RocoShape
              shape="square"
              style={{ color: '#2f7dd1', height: 56, width: 56 }}
              variant="outline"
            />
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="文字背景">
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-5">
            <RocoShape
              className="h-[72px] [--rk-roco-shape-padding-inline:42px] font-roco text-3xl font-black"
              material="stone"
              shadow
            >
              今日活动
            </RocoShape>
            <RocoShape
              className="h-14 [--rk-roco-shape-padding-inline:34px] font-roco text-2xl font-black"
              material="paper"
              shadow
            >
              宠物档案
            </RocoShape>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="材质与自定义颜色">
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-5">
            <RocoShape
              className="h-14 [--rk-roco-shape-padding-inline:34px] font-roco text-2xl font-black"
              material="paper"
              shadow
            >
              纸张表面
            </RocoShape>
            <RocoShape
              background="#2f7dd1"
              className="h-14 [--rk-roco-shape-padding-inline:34px] font-roco text-2xl font-black"
              color="#f7fbff"
              shadow
            >
              水系活动
            </RocoShape>
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
