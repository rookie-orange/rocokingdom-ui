import { Layout, LayoutContent, LayoutHeader, LayoutSider } from 'rocokingdom-ui'

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
}
