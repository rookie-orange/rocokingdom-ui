# Drawer `size="full"` 设计

## 背景

`Drawer` 组件通过 `size` prop 控制展开宽度（左右抽屉）或高度（上下抽屉），底层落到 CSS 变量 `--rk-drawer-size`（默认 `760px`）。当前 `size` 接受 `number`（自动转 px）或任意 CSS 长度字符串。

用户希望提供一个直接让 drawer 铺满整个视口的尺寸取值。

## 目标

- 允许通过 `size="full"` 让 drawer 的内容面板铺满视口维度。
- 圆弧形状不受影响——继续由现有 `curve` prop 控制。
- 不引入新的 prop，尺寸控制统一收敛到 `size` 这一个入口。

## 非目标

- 不改变圆弧形状或 `--rk-drawer-curve-inset` 行为。
- 不引入响应式断点控制。
- 不新增 `fullscreen` 之类的独立布尔 prop（已放弃该方案）。

## 设计

### 类型

`DrawerProps.size` 类型扩展为 `number | 'full' | string`：

```ts
size?: number | 'full' | string
```

显式列出 `'full'` 字面量类型，便于 IDE 自动补全与文档提示；任意 CSS 长度字符串仍可用，行为不变。`'full'` 作为保留的语义化取值。

### 语义

当 `size === 'full'` 时，`--rk-drawer-size` 按抽屉方向解析为视口维度：

| `side`           | `--rk-drawer-size` |
| ---------------- | ------------------ |
| `left` / `right` | `100vw`            |
| `top` / `bottom` | `100svh`           |

### 实现位置

仅修改 `packages/ui/src/drawer/index.tsx`。现有设置 `--rk-drawer-size` 的逻辑位于构造 `contentStyle` 处：

```ts
const resolvedSize = resolveSize(size)

if (resolvedSize) {
  contentStyle['--rk-drawer-size'] = resolvedSize
}
```

新增一个 `full` 分支：当 `size === 'full'` 时，按 `side` 解析为 `100vw` 或 `100svh`，跳过 `resolveSize` 的常规转换。

### 为何不需要改 CSS

`.right` / `.left` 的宽度定义为 `width: min(100vw, var(--rk-drawer-size))`（`drawer.module.css`）。把变量设成 `100vw` 后 `min(100vw, 100vw) = 100vw`，自然铺满；上下方向同理用 `100svh`，且对应规则为 `height: min(100svh, var(--rk-drawer-size))`。现有的 `min()` 越界保护依然有效。

### 向后兼容

`number` 与普通 CSS 长度字符串的行为完全不变。

## 测试

沿用现有 drawer SSR 测试风格（对渲染 HTML 做字符串包含断言），新增以下断言：

- `<Drawer size="full" />` → content style 含 `--rk-drawer-size:100vw`（默认 `side="right"`）。
- `<Drawer size="full" side="bottom" />` → 含 `100svh`。
- `<Drawer size="full" side="left" />` → 含 `100vw`。
- `<Drawer size="full" side="top" />` → 含 `100svh`。
- `<Drawer size={720} />` → 含 `--rk-drawer-size:720px`（回归，行为不变）。
- `<Drawer size="50vw" />` → 原样透传（回归，行为不变）。
- `<Drawer />`（未传 `size`）→ 不含 `--rk-drawer-size`（回归，行为不变）。

测试命令：`vp run -r test`。

## 验证状态

2026-06-30 已修复 workspace 的 `vitest` pin，`vp run -r test` 可正常执行。
