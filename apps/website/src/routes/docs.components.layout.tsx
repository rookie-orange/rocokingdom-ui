import { createFileRoute } from '@tanstack/react-router'
import {
  Button,
  Divider,
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSider,
  Panel,
  Space,
  Stack,
} from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/layout')({
  component: LayoutExamplePage,
})

const layoutCode = `import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutSider,
} from 'rocokingdom-ui'

export function AppShell() {
  return (
    <Layout direction="horizontal" fullHeight>
      <LayoutSider width={240}>导航</LayoutSider>
      <Layout>
        <LayoutHeader>洛克王国</LayoutHeader>
        <LayoutContent>页面内容</LayoutContent>
      </Layout>
    </Layout>
  )
}`

const layoutShellCode = `import {
  Button,
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSider,
  Panel,
  Space,
  Stack,
} from 'rocokingdom-ui'

export function LayoutShellDemo() {
  return (
    <Layout className="min-h-96 overflow-hidden rounded-lg" direction="horizontal">
      <LayoutSider width={220}>
        <Stack size="small">
          <strong>王国菜单</strong>
          <Button material="paper" size="small">任务</Button>
          <Button material="paper" size="small">背包</Button>
        </Stack>
      </LayoutSider>
      <Layout>
        <LayoutHeader height={56}>
          <Space block justify="between">
            <strong>宠物训练室</strong>
            <Button material="default" shadow size="small">开始</Button>
          </Space>
        </LayoutHeader>
        <LayoutContent>
          <Panel material="paper">训练计划</Panel>
        </LayoutContent>
        <LayoutFooter height={44}>Rocokingdom UI</LayoutFooter>
      </Layout>
    </Layout>
  )
}`

const layoutCollapsedCode = `import { Layout, LayoutContent, LayoutSider } from 'rocokingdom-ui'

export function LayoutCollapsedDemo() {
  return (
    <Layout className="min-h-56 overflow-hidden rounded-lg" direction="horizontal">
      <LayoutSider collapsed collapsedWidth={72} width={220}>
        Nav
      </LayoutSider>
      <LayoutContent>折叠侧栏会保留固定宽度。</LayoutContent>
    </Layout>
  )
}`

function LayoutExamplePage() {
  return (
    <ExampleShell
      code={layoutCode}
      description="Layout 是页面骨架组件，提供 Header、Sider、Content、Footer 四个区域，并与 Material 语义色和响应式方向配合。"
      highlights={[
        'Layout 可嵌套，外层 horizontal 常用于侧栏布局。',
        'LayoutSider 支持 width、collapsed、collapsedWidth。',
        'LayoutHeader 和 LayoutFooter 支持高度变量，LayoutContent 可关闭默认 padding。',
      ]}
      title="Layout"
    >
      <ExampleSection
        code={layoutShellCode}
        description="典型两栏应用壳：左侧导航、上方标题栏、中间内容区和底部状态栏。"
        title="应用骨架"
      >
        <PreviewSurface>
          <Layout
            className="min-h-96 overflow-hidden rounded-lg border border-stone/15"
            direction="horizontal"
          >
            <LayoutSider width={220}>
              <Stack size="small">
                <p className="font-roco text-3xl leading-none text-primary">王国菜单</p>
                <Divider color="var(--rk-primary)" />
                <Button material="paper" size="small">
                  任务
                </Button>
                <Button material="paper" size="small">
                  背包
                </Button>
                <Button material="paper" size="small">
                  宠物
                </Button>
              </Stack>
            </LayoutSider>
            <Layout>
              <LayoutHeader height={56}>
                <Space block justify="between">
                  <strong>宠物训练室</strong>
                  <Button material="default" shadow size="small">
                    开始
                  </Button>
                </Space>
              </LayoutHeader>
              <LayoutContent>
                <Panel material="paper" contentClassName="!p-5">
                  <p className="font-roco text-3xl leading-none">训练计划</p>
                  <p className="mt-3 text-sm leading-6 text-stone/70">
                    今日推荐完成速度、魔攻和防御三项基础训练。
                  </p>
                </Panel>
              </LayoutContent>
              <LayoutFooter height={44}>
                <span className="text-sm text-stone/70">Rocokingdom UI</span>
              </LayoutFooter>
            </Layout>
          </Layout>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection code={layoutCollapsedCode} title="折叠侧栏">
        <PreviewSurface>
          <Layout
            className="min-h-56 overflow-hidden rounded-lg border border-stone/15"
            direction="horizontal"
          >
            <LayoutSider collapsed collapsedWidth={72} width={220}>
              <Stack align="center" size="small">
                <span className="grid size-9 place-items-center rounded bg-primary text-on-primary">
                  任
                </span>
                <span className="grid size-9 place-items-center rounded bg-paper text-on-paper">
                  包
                </span>
                <span className="grid size-9 place-items-center rounded bg-paper text-on-paper">
                  宠
                </span>
              </Stack>
            </LayoutSider>
            <LayoutContent>
              <p className="font-roco text-3xl leading-none">折叠状态</p>
              <p className="mt-3 text-sm leading-6 text-stone/70">
                collapsedWidth 适合保留图标轨道，也可以接业务状态切换。
              </p>
            </LayoutContent>
          </Layout>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
