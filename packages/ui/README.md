# ui

Rocokingdom UI components.

## Button

```ts
import { tokensCss } from '@rocokingdom-ui/tokens'
import { buttonCss, createButton } from 'rocokingdom-ui'

const style = document.createElement('style')
style.textContent = `${tokensCss}\n\n${buttonCss}`
document.head.append(style)

const button = createButton('Start')
```

The button uses one class: `rk-button`.

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
