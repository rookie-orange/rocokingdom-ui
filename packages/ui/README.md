# ui

Rocokingdom UI components.

## Button

```ts
import 'rocokingdom-ui/style.css'
import 'rocokingdom-ui/font.css'
import {
  Button,
  ButtonNormal,
  Material,
  Modal,
  ModalClose,
  RadioGroup,
  RadioItem,
  RocoTheme,
  RocoShape,
  RuneText,
} from 'rocokingdom-ui'

export function App() {
  return (
    <RocoTheme
      colors={{
        primary: '#6ee7b7',
        onPrimary: '#10201a',
      }}
    >
      <Button shadow>Start</Button>
      <Material as="section" material="stone">
        Stone surface
      </Material>
      <ButtonNormal>Classic</ButtonNormal>
      <RadioGroup defaultValue="paper">
        <RadioItem value="stone">Stone</RadioItem>
        <RadioItem value="paper">Paper</RadioItem>
      </RadioGroup>
      <Modal
        headerRuneText="NOTICE"
        title="提示"
        trigger={<Button shadow>Open modal</Button>}
        footer={
          <ModalClose asChild>
            <Button material="paper">确定</Button>
          </ModalClose>
        }
      >
        更新完成！请手动重启游戏...
      </Modal>
      <RuneText>START</RuneText>
      <RocoShape material="paper" shadow>
        今日活动
      </RocoShape>
      <RocoShape shape="circle" variant="outline" style={{ color: '#2f7dd1', height: 49, width: 49 }} />
      <RocoShape shape="square" style={{ color: '#d94b4b', height: 49, width: 49 }} />
    </RocoTheme>
  )
}
```

The SVG-backed button uses the root class `rk-button`. The previous capsule
button remains available as `ButtonNormal` with the root class
`rk-button-normal`.

`RadioGroup` and `RadioItem` render a compound radio control with
`role="radiogroup"` and `role="radio"`. Inactive items use the stone material by
default and the active item uses paper. Change them at the group level with
`inactiveMaterial` and `activeMaterial`, or customize each `RadioItem` directly
with `className`, `style`, `material`, `activeMaterial`, `inactiveMaterial`,
`variant`, `shadow`, and size props.

`RocoShape` renders the reusable stretched shape behind the SVG-backed button or
as a content surface. Pass children to place text above the generated shape
without writing separate positioning layers:

```tsx
<RocoShape material="paper" shadow>
  今日活动
</RocoShape>
```

It uses the same material variables as `Material`, so `material`, `background`,
and `color` set the shape fill and foreground color together:

```tsx
<RocoShape background="#2f7dd1" color="#f7fbff" shadow>
  Water badge
</RocoShape>
```

Set its `material`, `background`, and `color` from props or CSS when you want a
surface with text on top. The left and right arcs keep their aspect ratio while
the center segment stretches. Pass `shape="circle"` or `shape="square"` for the
fixed 49x49 SVG-backed shapes.

`Button` does not render a shadow by default. Pass `shadow` to enable the
shape shadow.

`Material` is the low-level color surface primitive. It renders a `div` by
default and can render another element with `as`. Use `material="paper"`,
`material="stone"`, or `material="default"`/`material="primary"` for the base
palette, and use `background` plus `color` when a one-off surface needs explicit
background and foreground values:

```tsx
<Material as="button" background="var(--rk-primary)" color="var(--rk-on-primary)">
  Enter
</Material>
```

`Modal` is backed by Radix Dialog and keeps the Rocokingdom game-panel styling
in this package. Pass `header={false}` to hide the visible header, `closable={false}`
to hide the close button, and omit `footer` when no action area is needed.
Pass `headerRuneText` with short English copy to render the faint decorative
RuneText layer behind the modal title. Footer actions can close the dialog with
`ModalClose asChild`.

Button sizing can be customized with CSS variables:

```css
.my-button {
  --rk-button-font-family: var(--rk-font-family-base, inherit);
  --rk-button-height: 40px;
  --rk-button-min-width: auto;
  --rk-button-padding-inline: 18px;
  --rk-button-text-padding-inline: 8px;
  --rk-button-font-size: 14px;
  --rk-button-font-weight: 700;
}
```

Colors and effects are plain CSS variables:

```css
:root {
  --rk-paper: #f4f0e8;
  --rk-stone: #242628;
  --rk-primary: #ffc65f;
  --rk-primary-soft: #fff1cf;
  --rk-primary-muted: #f7d56f;
  --rk-primary-strong: #d89522;
  --rk-success: #2f9e66;
  --rk-danger: #d94b4b;
  --rk-on-paper: #222222;
  --rk-on-stone: #f4f0e8;
  --rk-on-primary: #242628;
  --rk-on-primary-soft: #2b2414;
  --rk-on-primary-muted: #2b2414;
  --rk-on-primary-strong: #fff9ec;
  --rk-on-success: #f3fff8;
  --rk-on-danger: #fff6f4;
  --rk-shadow-soft-color: rgb(36 38 40 / 0.08);
  --rk-shadow-color: rgb(36 38 40 / 0.16);
  --rk-shadow-strong-color: rgb(36 38 40 / 0.32);
}
```

You can override them with CSS, or create a scoped theme with `RocoTheme`.
`RocoTheme` renders a `div` with the `rk-theme` root class and writes
provided color tokens as inline `--rk-*` variables on that element. Descendant
components inherit the nearest variables, so themes can be nested for local
brand or feature themes.

Pass `asChild` to apply that theme scope to an existing element instead of
rendering the default `div`.

`RocoTheme` also keeps the merged theme in React context. Use `useRocoTheme`
when React code needs the current theme values. Portal-based components such as
`Modal`, `Drawer`, and `Select` recreate the current theme scope inside their
portal content, so local themes continue to apply even when the DOM is mounted
outside the theme subtree.

Fonts are opt-in. The base style entry defines font variables with system
fallbacks, but it does not load font files.

Import the fonts at the app level when you want Rocokingdom UI components and
decorative text to use them:

```ts
import 'rocokingdom-ui/font.css'
```

`font.css` registers `Roco Kingdom Sans` and `Roco Kingdom Rune`, then sets
`--rk-font-family-base`, `--rk-font-family-rune`, and
`--rk-font-family-decorative`.

You can also host the font files yourself and point the variables at your own
font-family names:

```css
@font-face {
  font-family: 'My Roco Sans';
  src: url('/fonts/roco-kingdom-sans.ttf') format('truetype');
}

@font-face {
  font-family: 'My Roco Rune';
  src: url('/fonts/roco-kingdom-rune.ttf') format('truetype');
}

:root {
  --rk-font-family-base: 'My Roco Sans', system-ui, sans-serif;
  --rk-font-family-rune: 'My Roco Rune', var(--rk-font-family-base);
  --rk-font-family-decorative: var(--rk-font-family-rune);
}
```

`RuneText` uses `--rk-font-family-base` by default and renders a `span`; change
the element with `as`. Pass `font="rune"` when a short label should use the
decorative rune font instead. Keep both styles to short labels because the roco
fonts can reduce readability on longer text. `Button` content and the visible
`Modal` title are rendered with `RuneText`.

```tsx
<RuneText>任务公告</RuneText>
<RuneText font="rune">ROCO KINGDOM</RuneText>
```

Rune text typography can be customized with CSS variables:

```css
.logo-text {
  --rk-rune-text-rune-font-family: var(--rk-font-family-decorative);
  --rk-rune-text-base-font-family: var(--rk-font-family-base);
  --rk-rune-text-font-size: 24px;
  --rk-rune-text-rune-font-weight: 400;
  --rk-rune-text-base-font-weight: 400;
  --rk-rune-text-line-height: 1;
}
```

Modal header rune text can be tuned with CSS variables:

```css
.my-modal {
  --rk-modal-header-rune-text-color: color-mix(in srgb, var(--rk-on-stone) 18%, var(--rk-stone));
  --rk-modal-header-rune-text-font-size: 28px;
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
