import { Button } from 'rocokingdom-ui'

export function ButtonSizeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button material="stone" shadow size="small">
        Small
      </Button>
      <Button material="default" shadow size="middle">
        Middle
      </Button>
      <Button material="paper" shadow size="large">
        Large
      </Button>
      <Button disabled material="stone" shadow>
        Disabled
      </Button>
    </div>
  )
}
