import {
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
          <Button material="paper" size="small">
            任务
          </Button>
          <Button material="paper" size="small">
            背包
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
          <Panel material="paper">训练计划</Panel>
        </LayoutContent>
        <LayoutFooter height={44}>Rocokingdom UI</LayoutFooter>
      </Layout>
    </Layout>
  )
}
