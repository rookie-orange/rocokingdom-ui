import { Button, Drawer, DrawerClose } from 'rocokingdom-ui'

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
}
