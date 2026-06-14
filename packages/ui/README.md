# ui

Rocokingdom UI components.

## Button

```ts
import 'rocokingdom-ui/style.css'
import { Button, RocoProvider } from 'rocokingdom-ui'

export function App() {
  return (
    <RocoProvider
      colors={{
        primary: '#6ee7b7',
        onPrimary: '#10201a',
      }}
    >
      <Button>Start</Button>
    </RocoProvider>
  )
}
```

The button uses the root class `rk-button`.

Colors are plain CSS variables:

```css
:root {
  --rk-paper: #f4f0e8;
  --rk-stone: #242628;
  --rk-primary: #ffc65f;
  --rk-on-paper: #222222;
  --rk-on-stone: #f4f0e8;
  --rk-on-primary: #242628;
}
```

You can override them with CSS, or set them on the document root with `RocoProvider`.
`RocoProvider` does not render a wrapper element.
In React Server Components, render `RocoProvider` from a client component.

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
