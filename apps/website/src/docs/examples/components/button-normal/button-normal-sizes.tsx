import { ButtonNormal } from 'rocokingdom-ui'

export function ButtonNormalSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <ButtonNormal material="stone" size="small">
        Small
      </ButtonNormal>
      <ButtonNormal material="default" size="middle">
        Middle
      </ButtonNormal>
      <ButtonNormal material="paper" size="large">
        Large
      </ButtonNormal>
      <ButtonNormal disabled material="stone">
        Disabled
      </ButtonNormal>
    </div>
  )
}
