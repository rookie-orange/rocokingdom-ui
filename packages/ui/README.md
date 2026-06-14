# ui

Rocokingdom UI components.

## Button

```ts
import 'rocokingdom-ui/style.css'
import { Button, ConfigProvider } from 'rocokingdom-ui'

export function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#6ee7b7' } }}>
      <Button>Start</Button>
    </ConfigProvider>
  )
}
```

The button uses the root class `rk-button`.

## Development

- Install dependencies:

```bash
vp install
```

- Run the unit tests:

```bash
vp test
```

- Build the library:

```bash
vp run build
```
