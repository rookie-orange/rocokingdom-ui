# tokens

Material-first design tokens for `rocokingdom-ui`.

The token language follows the visual direction of a fantasy game UI: mostly neutral paper and stone surfaces, gold brand accents, low-saturation magic state colors, and rarity colors for creatures/items.

## Usage

```ts
import { cssVar, tokens } from 'tokens'

const paper = tokens.primitive.material.paper
const buttonBg = cssVar('button.variant.primary.background')
```

```ts
import 'tokens/css'
```

Set `data-rk-theme="dark"` on a root element to switch global semantic theme variables.

## Structure

- `primitive`: neutral, gold, magic, rarity, material, spacing, radius, typography, motion.
- `semantic`: surface, text, border, and state aliases.
- `component`: button, dialog, and drawer tokens.
- `themes`: light and dark semantic theme maps.

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
