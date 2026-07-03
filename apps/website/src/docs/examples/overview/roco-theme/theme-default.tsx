import { Button, Material, RuneText } from 'rocokingdom-ui'

export function ThemeDefaultDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button material="default" shadow>
        默认主色
      </Button>
      <Material className="rounded-lg p-4" material="stone">
        石材表面
      </Material>
      <RuneText className="text-4xl leading-none text-primary">DEFAULT</RuneText>
    </div>
  )
}
