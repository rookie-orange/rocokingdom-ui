import { createFileRoute } from '@tanstack/react-router'
import { Button, Drawer, DrawerClose } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/examples/drawer')({
  component: DrawerExamplePage,
})

const drawerCode = `import { Button, Drawer } from 'rocokingdom-ui'

export function QuestDrawer() {
  return (
    <Drawer
      overlay
      side="right"
      size={520}
      title="任务详情"
      trigger={<Button shadow>打开抽屉</Button>}
    >
      今日任务详情
    </Drawer>
  )
}`

function DrawerExamplePage() {
  return (
    <ExampleShell
      code={drawerCode}
      description="Drawer 适合详情、公告、筛选器和移动端全屏面板，支持四个方向、遮罩、材质和 full 尺寸。"
      highlights={[
        'side 覆盖 right、left、top、bottom。',
        'size 支持数字、CSS 长度和 full。',
        'overlay、closable、curve、material 可按场景组合。',
      ]}
      slug="drawer"
      title="Drawer"
    >
      <ExampleSection title="四个方向">
        <PreviewSurface>
          <div className="flex flex-wrap gap-4">
            {(['right', 'left', 'top', 'bottom'] as const).map((side) => (
              <Drawer
                description={`当前抽屉方向：${side}`}
                key={side}
                overlay
                side={side}
                size={side === 'left' || side === 'right' ? 460 : 320}
                title={`${side} drawer`}
                trigger={
                  <Button material="default" shadow>
                    {side}
                  </Button>
                }
              >
                <div className="grid gap-5">
                  <p className="font-roco text-4xl font-black leading-none">任务详情</p>
                  <p className="text-base font-bold leading-7">
                    这里可以放置长内容、公告列表、筛选条件或配置项。
                  </p>
                  <DrawerClose asChild>
                    <Button material="paper" shadow>
                      完成
                    </Button>
                  </DrawerClose>
                </div>
              </Drawer>
            ))}
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="全屏和无遮罩">
        <PreviewSurface>
          <div className="flex flex-wrap gap-4">
            <Drawer
              material="paper"
              overlay
              side="right"
              size="full"
              title="全屏背包"
              trigger={
                <Button material="stone" shadow>
                  full
                </Button>
              }
            >
              <div className="grid gap-5 text-on-paper">
                <p className="font-roco text-5xl font-black leading-none">背包</p>
                <p className="max-w-2xl text-base font-bold leading-7 text-stone/70">
                  size=&quot;full&quot; 会根据方向展开到 100vw 或 100svh，适合移动端主流程。
                </p>
              </div>
            </Drawer>
            <Drawer
              description="overlay=false 时背景不变暗。"
              overlay={false}
              side="left"
              size="360px"
              title="无遮罩抽屉"
              trigger={
                <Button material="paper" shadow>
                  无遮罩
                </Button>
              }
            >
              <p>可用于非阻断工具面板。</p>
            </Drawer>
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
