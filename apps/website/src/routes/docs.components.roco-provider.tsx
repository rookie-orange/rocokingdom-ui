import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Material, Panel, RocoProvider, RuneText } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/roco-provider')({
  component: RocoProviderExamplePage,
})

const providerCode = `import { Button, RocoProvider } from 'rocokingdom-ui'

export function CustomTheme() {
  return (
    <RocoProvider colors={{ primaryStrong: '#6e4c12', onPrimaryStrong: '#fff8df' }}>
      <Button shadow>主题按钮</Button>
    </RocoProvider>
  )
}`

function RocoProviderExamplePage() {
  const [customThemeEnabled, setCustomThemeEnabled] = useState(false)

  return (
    <ExampleShell
      code={providerCode}
      description="RocoProvider 不渲染额外 DOM，只在挂载期间把主题色写入 documentElement 的 --rk-* 变量。"
      highlights={[
        'colors 可覆盖基础色、语义色及对应前景色。',
        '挂载后会影响当前文档根节点上的 Rocokingdom 变量。',
        '卸载后会恢复之前的 CSS 变量值，适合作为主题切换或专题活动入口。',
      ]}
      title="RocoProvider"
    >
      <ExampleSection title="默认主题">
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-4">
            <Button material="default" shadow>
              默认主色
            </Button>
            <Material className="rounded-lg p-4" material="stone">
              石材表面
            </Material>
            <RuneText className="text-4xl leading-none text-primary">DEFAULT</RuneText>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection
        description="启用后会挂载 RocoProvider，当前页面使用新的 --rk-* 颜色；关闭后恢复默认主题。"
        title="运行时主题切换"
      >
        <PreviewSurface>
          {customThemeEnabled ? (
            <RocoProvider
              colors={{
                onPaper: '#182117',
                onPrimary: '#10201a',
                onPrimaryMuted: '#10201a',
                onPrimarySoft: '#10201a',
                onPrimaryStrong: '#fff8df',
                onStone: '#eef8ef',
                paper: '#f0f6de',
                primary: '#6ee7b7',
                primaryMuted: '#98e6be',
                primarySoft: '#dff8e9',
                primaryStrong: '#276948',
                stone: '#223529',
              }}
            />
          ) : null}

          <Panel material="stone">
            <div className="grid gap-5">
              <RuneText className="text-5xl leading-none text-primary max-sm:text-4xl">
                {customThemeEnabled ? 'GREEN THEME' : 'DEFAULT THEME'}
              </RuneText>
              <p className="max-w-2xl text-base font-bold leading-7 text-on-stone/80">
                RocoProvider 不创建包裹元素，它只在挂载期间更新 documentElement 上的主题变量。
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  material="default"
                  onClick={() => setCustomThemeEnabled((enabled) => !enabled)}
                  shadow
                >
                  {customThemeEnabled ? '恢复默认主题' : '启用绿色主题'}
                </Button>
                <Button material="paper" shadow>
                  主题按钮
                </Button>
              </div>
            </div>
          </Panel>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
