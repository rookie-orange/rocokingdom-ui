import { useState } from 'react'
import { Button, Panel, RocoTheme, RuneText } from 'rocokingdom-ui'

export function ThemeRuntimeDemo() {
  const [customThemeEnabled, setCustomThemeEnabled] = useState(false)
  const scopedTheme = customThemeEnabled
    ? {
        onPaper: '#182117',
        onPrimary: '#10201a',
        onStone: '#eef8ef',
        paper: '#f0f6de',
        primary: '#6ee7b7',
        primaryStrong: '#276948',
        stone: '#223529',
      }
    : undefined

  return (
    <RocoTheme colors={scopedTheme}>
      <Panel material="stone">
        <div className="grid gap-5">
          <RuneText className="text-5xl leading-none text-primary">
            {customThemeEnabled ? 'GREEN THEME' : 'DEFAULT THEME'}
          </RuneText>
          <Button
            material="default"
            onClick={() => setCustomThemeEnabled((enabled) => !enabled)}
            shadow
          >
            {customThemeEnabled ? '恢复默认主题' : '启用绿色主题'}
          </Button>
        </div>
      </Panel>
    </RocoTheme>
  )
}
