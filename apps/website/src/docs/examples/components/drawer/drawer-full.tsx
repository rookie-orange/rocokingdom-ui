import { Button, Drawer } from 'rocokingdom-ui'

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
}
