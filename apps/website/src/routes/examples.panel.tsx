import { createFileRoute } from '@tanstack/react-router'
import { Panel } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/examples/panel')({
  component: PanelExamplePage,
})

const panelCode = `import { Panel } from 'rocokingdom-ui'

export function QuestPanel() {
  return (
    <Panel curve="both" material="stone">
      今日任务
    </Panel>
  )
}`

function PanelExamplePage() {
  return (
    <ExampleShell
      code={panelCode}
      description="Panel 提供纸张和石材两种内容容器，并可用 SVG 曲线边缘模拟游戏面板。"
      highlights={[
        'material 覆盖 paper、stone。',
        'curve 覆盖 none、left、right、both。',
        'curveInset 可调整内容避让曲线的距离。',
      ]}
      slug="panel"
      title="Panel"
    >
      <ExampleSection title="基础容器">
        <PreviewSurface>
          <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            <Panel material="paper">
              <p className="font-roco text-3xl font-black leading-none">纸张面板</p>
              <p className="mt-4 text-base font-bold leading-7 text-stone/70">
                用于常规说明、表单区和轻量内容。
              </p>
            </Panel>
            <Panel material="stone">
              <p className="font-roco text-3xl font-black leading-none">石材面板</p>
              <p className="mt-4 text-base font-bold leading-7 text-on-stone/75">
                用于高对比导航、弹层内强调内容。
              </p>
            </Panel>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="曲线边缘">
        <PreviewSurface>
          <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            {(['left', 'right', 'both', 'none'] as const).map((curve) => (
              <Panel
                className="min-h-40"
                contentClassName="grid content-center"
                curve={curve}
                key={curve}
                material={curve === 'none' ? 'paper' : 'stone'}
              >
                <p className="font-roco text-3xl font-black leading-none">curve={curve}</p>
                <p className="mt-3 text-sm font-bold opacity-75">适配抽屉和侧栏场景。</p>
              </Panel>
            ))}
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="自定义曲线避让">
        <PreviewSurface>
          <Panel
            className="min-h-44 max-w-3xl"
            contentClassName="grid content-center"
            curve="both"
            curveInset="120px"
            material="paper"
          >
            <p className="font-roco text-3xl font-black leading-none">
              curveInset=&quot;120px&quot;
            </p>
            <p className="mt-3 text-base font-bold leading-7 text-stone/70">
              当面板较窄或内容较密时，可以显式增加文字区域与曲线边缘的距离。
            </p>
          </Panel>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
