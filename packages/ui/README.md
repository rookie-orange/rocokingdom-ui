# ui

Rocokingdom UI components.

## Button

```ts
import 'rocokingdom-ui/style.css'
import 'rocokingdom-ui/font.css'
import 'rocokingdom-ui/decorative-font.css'
import {
  Button,
  ButtonNormal,
  Modal,
  ModalClose,
  RadioGroup,
  RocoProvider,
  RocoShape,
  RuneText,
} from 'rocokingdom-ui'

export function App() {
  return (
    <RocoProvider
      colors={{
        primary: '#6ee7b7',
        onPrimary: '#10201a',
      }}
    >
      <Button shadow>Start</Button>
      <ButtonNormal>Classic</ButtonNormal>
      <RadioGroup
        defaultValue="paper"
        options={[
          { label: 'Stone', value: 'stone' },
          { label: 'Paper', value: 'paper' },
        ]}
      />
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
      <RocoShape style={{ color: '#ffc65f', height: 44, width: 180 }} />
    </RocoProvider>
  )
}
```

The SVG-backed button uses the root class `rk-button`. The previous capsule
button remains available as `ButtonNormal` with the root class
`rk-button-normal`.

`RadioGroup` renders a set of `Button` options with `role="radiogroup"`.
Inactive options use the stone material by default and the active option uses
paper. Change them with `inactiveMaterial` and `activeMaterial`, or tune the
button look further with `inactiveVariant`, `activeVariant`, `size`, and
`buttonProps`.

`RocoShape` renders the reusable stretched shape behind the SVG-backed button.
Set its `color`, `width`, and `height` from CSS or inline styles. The left and
right arcs keep their aspect ratio while the center segment stretches.

`Button` does not render a shadow by default. Pass `shadow` to enable the
shape shadow.

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
  --rk-button-line-height: 1.4;
}
```

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

Fonts are opt-in. The base style entry defines font variables with system
fallbacks, but it does not load font files.

Import the regular font at the app level when you want Rocokingdom UI
components to use it:

```ts
import 'rocokingdom-ui/font.css'
```

Import the decorative font only when you use decorative text:

```ts
import 'rocokingdom-ui/decorative-font.css'
import { RuneText } from 'rocokingdom-ui'

export function LogoText() {
  return <RuneText>ROCO</RuneText>
}
```

`font.css` registers `Roco Kingdom Sans` and sets `--rk-font-family-base`.
`decorative-font.css` registers `Roco Kingdom Rune` and sets
`--rk-font-family-rune` plus `--rk-font-family-decorative`.

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

`Button` uses `--rk-font-family-base` by default. `RuneText` uses the
decorative font and renders a `span`; change the element with `as`.

Rune text typography can be customized with CSS variables:

```css
.logo-text {
  --rk-rune-text-font-family: var(--rk-font-family-decorative);
  --rk-rune-text-font-size: 24px;
  --rk-rune-text-font-weight: 400;
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
