import { createFileRoute } from '@tanstack/react-router'
import { Button, Divider, Panel, Space, Stack } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/space')({
  component: SpaceExamplePage,
})

const spaceCode = `import { Button, Space } from 'rocokingdom-ui'

export function Toolbar() {
  return (
    <Space wrap>
      <Button material="stone" shadow>背包</Button>
      <Button material="default" shadow>宠物</Button>
      <Button material="paper" shadow>任务</Button>
    </Space>
  )
}`

const spaceBasicCode = `import { Button, Space } from 'rocokingdom-ui'

export function SpaceBasicDemo() {
  return (
    <Space size="large" wrap>
      <Button material="stone" shadow>背包</Button>
      <Button material="default" shadow>宠物</Button>
      <Button material="paper" shadow>任务</Button>
    </Space>
  )
}`

const spaceSplitCode = `import { Divider, Space } from 'rocokingdom-ui'

export function SpaceSplitDemo() {
  return (
    <Space split={<Divider orientation="vertical" />} wrap>
      <span>草系徽章</span>
      <span>火系徽章</span>
      <span>水系徽章</span>
    </Space>
  )
}`

const stackCode = `import { Panel, Stack } from 'rocokingdom-ui'

export function StackDemo() {
  return (
    <Stack size="small">
      <Panel material="paper">
        <strong>每日训练</strong>
        <p>完成战斗、采集和探险三项任务。</p>
      </Panel>
      <Panel material="stone">
        <strong>Boss 情报</strong>
        <p>推荐携带高魔抗宠物。</p>
      </Panel>
    </Stack>
  )
}`

function SpaceExamplePage() {
  return (
    <ExampleShell
      code={spaceCode}
      description="Space 和 Stack 负责统一组件之间的距离、对齐、换行和分隔符，适合按钮组、标签组、表单段落和面板内部结构。"
      highlights={[
        'Space 默认 horizontal + inline-flex，适合紧凑横向编排。',
        'Stack 默认 vertical + block，适合纵向内容组。',
        'size 支持预设、数字、CSS 字符串和 [horizontal, vertical] 元组。',
      ]}
      title="Space / Stack"
    >
      <ExampleSection code={spaceBasicCode} title="横向间距">
        <PreviewSurface>
          <Space size="large" wrap>
            <Button material="stone" shadow>
              背包
            </Button>
            <Button material="default" shadow>
              宠物
            </Button>
            <Button material="paper" shadow>
              任务
            </Button>
          </Space>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection
        code={spaceSplitCode}
        description="split 会插入到相邻子元素之间，适合元信息、面包屑片段和短标签。"
        title="分隔符与换行"
      >
        <PreviewSurface>
          <Space
            align="center"
            size={['large', 'small']}
            split={<Divider orientation="vertical" />}
            wrap
          >
            <span className="rounded bg-primary-soft px-3 py-1 text-sm text-on-primary-soft">
              草系徽章
            </span>
            <span className="rounded bg-danger/15 px-3 py-1 text-sm text-danger">火系徽章</span>
            <span className="rounded bg-success/15 px-3 py-1 text-sm text-success">水系徽章</span>
          </Space>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection code={stackCode} title="纵向堆叠">
        <PreviewSurface>
          <Stack size="small">
            <Panel material="paper" contentClassName="!p-5">
              <p className="font-roco text-3xl leading-none">每日训练</p>
              <p className="mt-3 text-sm leading-6 text-stone/70">完成战斗、采集和探险三项任务。</p>
            </Panel>
            <Panel material="stone" contentClassName="!p-5">
              <p className="font-roco text-3xl leading-none">Boss 情报</p>
              <p className="mt-3 text-sm leading-6 text-on-stone/75">
                推荐携带高魔抗宠物，并准备回复药剂。
              </p>
            </Panel>
          </Stack>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
