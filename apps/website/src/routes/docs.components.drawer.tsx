import { createFileRoute } from '@tanstack/react-router'
import { Button, Drawer, DrawerClose } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/drawer')({
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

const drawerSidesCode = `import { Button, Drawer, DrawerClose } from 'rocokingdom-ui'

export function DrawerSidesDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      {(['right', 'left', 'top', 'bottom'] as const).map((side) => (
        <Drawer
          key={side}
          overlay
          side={side}
          size={side === 'left' || side === 'right' ? 460 : 320}
          title="任务详情"
          trigger={
            <Button material="default" shadow>
              {side}
            </Button>
          }
        >
          <div className="grid gap-5">
            <p>这里可以放置长内容、公告列表、筛选条件或配置项。</p>
            <DrawerClose asChild>
              <Button material="paper" shadow>
                完成
              </Button>
            </DrawerClose>
          </div>
        </Drawer>
      ))}
    </div>
  )
}`

const drawerFullCode = `import { Button, Drawer } from 'rocokingdom-ui'

export function DrawerFullDemo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Drawer
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
        <div className="grid gap-5 text-on-stone">
          <p className="font-roco text-5xl leading-none">背包</p>
          <p>size="full" 会根据方向展开到 100vw 或 100svh。</p>
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
      title="Drawer"
    >
      <ExampleSection code={drawerSidesCode} title="四个方向">
        <PreviewSurface>
          <div className="flex flex-wrap gap-4">
            {(['right', 'left', 'top', 'bottom'] as const).map((side) => (
              <Drawer
                key={side}
                overlay
                side={side}
                size={side === 'left' || side === 'right' ? 460 : 320}
                title="任务详情"
                trigger={
                  <Button material="default" shadow>
                    {side}
                  </Button>
                }
              >
                <div className="grid gap-5">
                  <p className="text-base leading-7">
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

      <ExampleSection code={drawerFullCode} title="全屏和无遮罩">
        <PreviewSurface>
          <div className="flex flex-wrap gap-4">
            <Drawer
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
              <div className="grid gap-5 text-on-stone">
                <p className="font-roco text-5xl leading-none">背包</p>
                <p className="max-w-2xl text-base leading-7">
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
