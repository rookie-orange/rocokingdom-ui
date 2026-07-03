import { Layout, LayoutContent, LayoutSider } from 'rocokingdom-ui'

export function LayoutCollapsedDemo() {
  return (
    <Layout className="min-h-56 overflow-hidden rounded-lg" direction="horizontal">
      <LayoutSider collapsed collapsedWidth={72} width={220}>
        Nav
      </LayoutSider>
      <LayoutContent>折叠侧栏会保留固定宽度。</LayoutContent>
    </Layout>
  )
}
