import { Button, RocoTheme } from 'rocokingdom-ui'

export function ThemeNestedDemo() {
  return (
    <RocoTheme
      className="grid gap-4"
      colors={{
        onPrimary: '#f8fbff',
        primary: '#2f7dd1',
        primarySoft: '#d9ebff',
      }}
    >
      <div className="flex flex-wrap gap-4">
        <Button material="default" shadow>
          外层蓝色主题
        </Button>
        <RocoTheme colors={{ onPrimary: '#10201a', primary: '#34d399' }}>
          <Button material="default" shadow>
            内层绿色主题
          </Button>
        </RocoTheme>
        <Button material="primarySoft" shadow>
          回到外层浅蓝
        </Button>
      </div>
    </RocoTheme>
  )
}
