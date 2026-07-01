import { createFileRoute } from '@tanstack/react-router'
import { Button, Divider, Space, Stack } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/divider')({
  component: DividerExamplePage,
})

const dividerCode = `import { Divider } from 'rocokingdom-ui'

export function QuestDivider() {
  return <Divider align="start">任务奖励</Divider>
}`

const dividerBasicCode = `import { Divider } from 'rocokingdom-ui'

export function DividerBasicDemo() {
  return (
    <div>
      <p>洛克新闻</p>
      <Divider />
      <p>今日活动</p>
    </div>
  )
}`

const dividerLabelCode = `import { Divider } from 'rocokingdom-ui'

export function DividerLabelDemo() {
  return (
    <div>
      <Divider align="start">主线任务</Divider>
      <Divider dashed>支线委托</Divider>
      <Divider align="end" variant="dotted">
        训练计划
      </Divider>
    </div>
  )
}`

const dividerVerticalCode = `import { Button, Divider, Space } from 'rocokingdom-ui'

export function DividerVerticalDemo() {
  return (
    <Space>
      <Button material="stone" shadow>背包</Button>
      <Divider orientation="vertical" />
      <Button material="default" shadow>宠物</Button>
      <Divider orientation="vertical" />
      <Button material="paper" shadow>任务</Button>
    </Space>
  )
}`

function DividerExamplePage() {
  return (
    <ExampleShell
      code={dividerCode}
      description="Divider 用于分隔内容区块、菜单项和内联操作，支持水平/垂直方向、线型、粗细、颜色以及水平标题。"
      highlights={[
        'orientation 覆盖 horizontal、vertical，并同步 aria-orientation。',
        'variant 支持 solid、dashed、dotted。',
        '水平分割线可放置文字，并通过 align 控制位置。',
      ]}
      title="Divider"
    >
      <ExampleSection code={dividerBasicCode} title="基础分割">
        <PreviewSurface>
          <Stack size="small">
            <p className="font-roco text-3xl leading-none">洛克新闻</p>
            <p className="text-sm leading-6 text-stone/65">王国边境出现新的魔法矿脉。</p>
            <Divider />
            <p className="font-roco text-3xl leading-none">今日活动</p>
            <p className="text-sm leading-6 text-stone/65">完成三场训练可领取徽章碎片。</p>
          </Stack>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection
        code={dividerLabelCode}
        description="带文字的 Divider 适合在长表单、设置项或任务日志里标记信息层级。"
        title="标题与线型"
      >
        <PreviewSurface>
          <Stack size="small">
            <Divider align="start" color="var(--rk-primary-strong)" thickness={2}>
              主线任务
            </Divider>
            <p className="text-sm leading-6 text-stone/70">前往彼得大道，寻找新的地图线索。</p>
            <Divider dashed>支线委托</Divider>
            <p className="text-sm leading-6 text-stone/70">帮助商队整理三份补给清单。</p>
            <Divider align="end" variant="dotted">
              训练计划
            </Divider>
          </Stack>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection code={dividerVerticalCode} title="垂直分割">
        <PreviewSurface>
          <Space wrap>
            <Button material="stone" shadow>
              背包
            </Button>
            <Divider orientation="vertical" />
            <Button material="default" shadow>
              宠物
            </Button>
            <Divider orientation="vertical" />
            <Button material="paper" shadow>
              任务
            </Button>
          </Space>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
