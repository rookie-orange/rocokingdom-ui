import { Button, RocoTheme } from 'rocokingdom-ui'

export function CustomTheme() {
  return (
    <RocoTheme colors={{ primaryStrong: '#6e4c12', onPrimaryStrong: '#fff8df' }}>
      <Button shadow>主题按钮</Button>
    </RocoTheme>
  )
}
