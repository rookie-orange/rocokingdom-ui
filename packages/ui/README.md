# ui

Rocokingdom UI components.

## Button

```ts
import { buttonClassName, createButton } from 'ui'
import 'tokens/css'
import 'ui/button.css'

const button = createButton({
  label: 'Start Quest',
  variant: 'primary',
  size: 'md',
})
```

The first button implementation is framework-agnostic: use the exported class names and CSS directly, or wrap `buttonClassName` in React/Vue/Svelte components later.

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
vp pack
```
