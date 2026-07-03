import { Badge, Button } from 'rocokingdom-ui'

export function BadgeCornerDemo() {
  return (
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
  )
}
