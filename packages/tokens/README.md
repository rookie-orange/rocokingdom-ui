# tokens

Four direct color values for `rocokingdom-ui`.

```css
:root {
  --paper: #f4f0e8;
  --stone: #242628;
  --ink: #222222;
  --gold: #e7bf67;
}
```

## Usage

```ts
import { gold, paper, tokensCss } from '@rocokingdom-ui/tokens'

const pageBackground = paper
const buttonBackground = gold
```

```ts
const style = document.createElement('style')
style.textContent = tokensCss
document.head.append(style)
```

## Structure

- `paper`
- `stone`
- `ink`
- `gold`
- `colors`
- `tokensCss`

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
