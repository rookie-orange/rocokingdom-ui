import { Button } from 'rocokingdom-ui'

export function CompactButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button material="default" shadow size="small">
        背包
      </Button>
      <Button material="stone" shadow size="small" variant="outline">
        任务
      </Button>
    </div>
  )
}
