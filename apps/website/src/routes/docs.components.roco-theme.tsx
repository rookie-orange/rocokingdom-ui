import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Button, Material, Panel, RocoTheme, RuneText } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/roco-theme')({
  component: RocoThemeExamplePage,
})

const themeCode = `import { Button, RocoTheme } from 'rocokingdom-ui'

export function CustomTheme() {
  return (
    <RocoTheme colors={{ primaryStrong: '#6e4c12', onPrimaryStrong: '#fff8df' }}>
      <Button shadow>主题按钮</Button>
    </RocoTheme>
  )
}`

function RocoThemeExamplePage() {
  const [customThemeEnabled, setCustomThemeEnabled] = useState(false)
  const scopedTheme = customThemeEnabled
    ? {
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
      }
    : undefined

  return (
    <ExampleShell
      code={themeCode}
      description="RocoTheme 渲染一个主题作用域元素，把 colors 映射成该作用域上的 --rk-* CSS 变量。"
      highlights={[
        'colors 可覆盖基础色、语义色及对应前景色。',
        '变量会被子树继承，嵌套 RocoTheme 可以覆盖最近作用域。',
        '默认主题仍由 style.css 的 :root 变量提供，局部主题只影响被包裹内容。',
      ]}
      title="RocoTheme"
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
        description="启用后，只有被 RocoTheme 包裹的面板读取新的 --rk-* 颜色；关闭后回到外层默认变量。"
        title="运行时主题切换"
      >
        <PreviewSurface>
          <RocoTheme colors={scopedTheme}>
            <Panel material="stone">
              <div className="grid gap-5">
                <RuneText className="text-5xl leading-none text-primary max-sm:text-4xl">
                  {customThemeEnabled ? 'GREEN THEME' : 'DEFAULT THEME'}
                </RuneText>
                <p className="max-w-2xl text-base font-bold leading-7 text-on-stone/80">
                  RocoTheme 通过包裹元素创建主题作用域，内部组件会读取最近的 --rk-* 变量。
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
          </RocoTheme>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection
        description="内层作用域只覆盖自己的子树，外层按钮继续读取蓝色变量。"
        title="嵌套主题"
      >
        <PreviewSurface>
          <RocoTheme
            className="grid gap-4"
            colors={{
              onPrimary: '#f8fbff',
              primary: '#2f7dd1',
              primarySoft: '#d9ebff',
            }}
          >
            <div className="grid gap-5">
              <div className="flex flex-wrap gap-4">
                <Button material="default" shadow>
                  外层蓝色主题
                </Button>
                <RocoTheme
                  colors={{
                    onPrimary: '#10201a',
                    primary: '#34d399',
                    primarySoft: '#dff8e9',
                  }}
                >
                  <Button material="default" shadow>
                    内层绿色主题
                  </Button>
                </RocoTheme>
                <Button material="primarySoft" shadow>
                  回到外层浅蓝
                </Button>
              </div>
            </div>
          </RocoTheme>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
