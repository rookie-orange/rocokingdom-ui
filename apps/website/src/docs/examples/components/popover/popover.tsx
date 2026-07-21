import { Button, Popover } from 'rocokingdom-ui'

export function PopoverExample() {
  return (
    <Popover
      content={
        <div className="grid gap-2">
          <strong>迪莫 Lv. 42</strong>
          <span className="text-stone/65">亲密度：好友</span>
          <Button size="small" shadow>
            查看资料
          </Button>
        </div>
      }
      placement="bottom-start"
      title="宠物信息"
      trigger={<Button shadow>查看宠物</Button>}
    />
  )
}
