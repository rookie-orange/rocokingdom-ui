# ui

Rocokingdom UI components.

## Button

```ts
import 'rocokingdom-ui/style.css'
import { Button } from 'rocokingdom-ui'

export function App() {
  return <Button>Start</Button>
}
```

The button uses the root class `rk-button`.

Theme colors are plain CSS variables:

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
