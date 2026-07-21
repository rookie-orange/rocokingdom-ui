# ui

Rocokingdom UI components.

## Installation

```bash
pnpm add rocokingdom-ui
```

Import the base stylesheet once at the application entry. Fonts are optional.

```ts
import 'rocokingdom-ui/style.css'
import 'rocokingdom-ui/font.css'
```

## Component catalog

| Group                 | Components                                                                                                                                                                          |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Foundations           | `Button`, `ButtonNormal`, `Material`, `RocoShape`, `RocoTheme`, `RuneText`, `Panel`, `Divider`, `Space`, `Stack`, `Layout`                                                          |
| Forms                 | `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, `InputNumber`, `DatePicker`, `TimePicker`, `Upload`, `Form`, `FormItem`, `Autocomplete`, `ToggleGroup` |
| Navigation            | `SideNav`, `Menu`, `Tabs`, `Breadcrumb`, `Pagination`, `Steps`, `Anchor`, `Command`                                                                                                 |
| Feedback and overlays | `Modal`, `Drawer`, `Tooltip`, `Popover`, `Message`, `Toast`, `Notification`, `Alert`, `Spin`, `Skeleton`, `Progress`, `Empty`, `Result`                                             |
| Data display          | `Table`, `List`, `Descriptions`, `Avatar`, `Badge`, `Tag`, `Accordion`, `Collapse`, `Tree`, `Timeline`, `Carousel`, `Image`, `Statistic`                                            |

The documentation website contains an interactive example, API summary, and source link for every catalog entry.

## Shape and material

`RocoShape` owns the silhouette, including the stretched capsule and fixed circle or square shapes. `Material` owns the semantic surface and foreground color. Components compose both primitives so that geometry, colors, borders, and shadows remain independently configurable.

Use `Material asChild` when a custom composition should apply a material without adding a DOM wrapper:

```tsx
<Material asChild material="paper">
  <RocoShape shadow>今日活动</RocoShape>
</Material>
```

Prefer semantic presets such as `paper`, `stone`, `primary`, `success`, and `danger`. Use explicit `background` and `color` only for one-off surfaces.

## Radix-backed interactions

`Select`, `RadioGroup`, `Slider`, `Modal`, `Drawer`, `Menu`, `Tooltip`, `Popover`, `Message`, `Notification`, `Avatar`, `Progress`, and `Accordion` use Radix Primitives for the relevant behavior. Rocokingdom UI supplies the shape, material, and package API while Radix handles focus, keyboard navigation, portals, live-region announcements, and interaction state.

The complex controls use the same mature primitives used by shadcn-style components:

- `DatePicker` composes Radix Popover with `react-day-picker` and `date-fns`. It keeps the string API (`yyyy-MM-dd`), supports single/range selection, month navigation, `min`/`max`, custom disabled matchers, and hidden form values.
- `TimePicker` uses Radix Popover and Radix Select for hour/minute/second columns. `showSeconds`, `minuteStep`, ranges, bounds, presets, and Clear/Done actions are available without a browser-native time input.
- `Autocomplete` uses `cmdk` for filtering and keyboard selection inside a Radix Popover. `filterOption`, disabled options, controlled values, and listbox semantics remain part of the public API.
- `Command` uses `cmdk` inside the package's Radix Dialog wrapper. Command/Ctrl + K, grouped items, keywords, looped navigation, Escape, focus trapping, and selection callbacks are handled by the primitives.
- `Carousel` uses `embla-carousel-react` for pointer dragging, inertial scrolling, looping, scroll snapshots, indicators, and autoplay while keeping the existing `items` and controlled `index` API.

Popover, Tooltip, Select, DatePicker, TimePicker, and Autocomplete content share the same directional scale/fade motion. Closing motion is preserved through Radix presence state, and `prefers-reduced-motion` reduces it to a single frame. Large picker panels use a Material-backed rounded rectangle because the fixed square RocoShape artwork is intended for square controls, not resizable content surfaces. Date range backgrounds stay continuous within each week: only the visible row edges and selected endpoints are rounded, while today's marker keeps a rounded inset outline in every selection state. Picker triggers and portalled content explicitly use `--rk-font-family-base`.

These dependencies are runtime dependencies of the UI package; consumers do not need to install separate Radix, calendar, command, or carousel packages.

Global messages and notifications require their providers near the application root:

```tsx
import { Button, MessageProvider, NotificationProvider, useMessage } from 'rocokingdom-ui'

function SaveButton() {
  const message = useMessage()

  return <Button onClick={() => message.success('保存成功')}>保存</Button>
}

export function App() {
  return (
    <MessageProvider>
      <NotificationProvider>
        <SaveButton />
      </NotificationProvider>
    </MessageProvider>
  )
}
```

Portal-based components recreate the active `RocoTheme` scope inside portal content, so locally scoped colors continue to apply.

## Quick example

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
      <Material asChild material="paper">
        <RocoShape shadow>
          今日活动
        </RocoShape>
      </Material>
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
<Material asChild material="paper">
  <RocoShape shadow>今日活动</RocoShape>
</Material>
```

It consumes the same material variables as `Material`. Use `Material asChild` to
provide those variables, or use `background` and `color` when the shape needs an
explicit one-off fill and foreground color:

```tsx
<RocoShape background="#2f7dd1" color="#f7fbff" shadow>
  Water badge
</RocoShape>
```

Set `background` and `color` from props or set the material CSS variables when
you want a surface with text on top. The left and right arcs keep their aspect
ratio while the center segment stretches. Pass `shape="circle"` or
`shape="square"` for the fixed 49x49 SVG-backed shapes.

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
  --rk-paper-soft: #fffaf2;
  --rk-paper-muted: #e5dccd;
  --rk-paper-strong: #cdbcaa;
  --rk-stone: #242628;
  --rk-stone-soft: #393d40;
  --rk-stone-muted: #4d5358;
  --rk-stone-strong: #141719;
  --rk-primary: #ffc65f;
  --rk-primary-soft: #fff1cf;
  --rk-primary-muted: #f7d56f;
  --rk-primary-strong: #d89522;
  --rk-success: #2f9e66;
  --rk-danger: #d94b4b;
  --rk-on-paper: #222222;
  --rk-on-paper-soft: #222222;
  --rk-on-paper-muted: #222222;
  --rk-on-paper-strong: #222222;
  --rk-on-stone: #f4f0e8;
  --rk-on-stone-soft: #f4f0e8;
  --rk-on-stone-muted: #f4f0e8;
  --rk-on-stone-strong: #f4f0e8;
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
`Modal`, `Drawer`, `Select`, `Tooltip`, `Popover`, `DatePicker`, `TimePicker`, and
`Autocomplete` recreate the current theme scope inside their portal content, so
local themes continue to apply even when the DOM is mounted outside the theme
subtree.

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
