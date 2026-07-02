import { createFileRoute } from '@tanstack/react-router'
import { Badge, BadgeIndicator, Button } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/badge')({
  component: BadgeExamplePage,
})

const badgeCode = `import { Badge, Button } from 'rocokingdom-ui'

export function MailBadge() {
  return (
    <Badge count={12}>
      <Button material="stone">消息</Button>
    </Badge>
  )
}`

function BadgeExamplePage() {
  return (
    <ExampleShell
      code={badgeCode}
      description="Badge 用于计数、状态点和角标展示，可独立渲染，也可以包裹按钮、头像或任意内联内容。"
      highlights={[
        'count 支持数字、文本和 maxCount 溢出展示。',
        'dot 可渲染状态点，offset 可微调角标位置。',
        'BadgeIndicator 可作为独立徽标原语使用。',
      ]}
      title="Badge"
    >
      <ExampleSection
        description="独立徽标适合状态标签、计数摘要和列表中的轻量提示。"
        title="基础徽标"
      >
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-5">
            <Badge count={8} />
            <Badge count={128} maxCount={99} material="primary" />
            <Badge count="NEW" material="success" />
            <Badge count={0} material="stone" showZero />
            <BadgeIndicator material="primaryStrong" size="large">
              SSR
            </BadgeIndicator>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="角标">
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-8">
            <Badge count={12}>
              <Button material="stone" shadow>
                消息
              </Button>
            </Badge>
            <Badge count={3} material="primary" offset={[-4, 2]}>
              <Button material="paperStrong">背包</Button>
            </Badge>
            <Badge dot material="success">
              <Button material="stoneSoft">在线</Button>
            </Badge>
            <Badge dot material="danger">
              <span className="inline-flex size-12 items-center justify-center rounded-lg bg-paper-strong font-roco text-3xl text-on-paper shadow-[0_8px_0_var(--rk-shadow-soft-color)]">
                R
              </span>
            </Badge>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="尺寸与描边">
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-5">
            <Badge count={2} size="small" />
            <Badge count={24} material="primary" size="middle" />
            <Badge count={128} maxCount={99} material="danger" shadow size="large" />
            <BadgeIndicator material="stone" variant="outline">
              BOSS
            </BadgeIndicator>
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
