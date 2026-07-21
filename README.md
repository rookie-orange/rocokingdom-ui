<p align="center">
  <img src="apps/website/src/assets/roco-kingdom-logo.png" alt="Roco Kingdom UI" width="640" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node-%3E%3D22.12.0-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node >=22.12.0" />
  <img src="https://img.shields.io/badge/pnpm-11.5.3-F69220?style=flat-square&logo=pnpm&logoColor=white" alt="pnpm 11.5.3" />
  <img src="https://img.shields.io/badge/Vite%2B-latest-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite+ latest" />
  <img src="https://img.shields.io/badge/React-%5E19.2.7-61DAFB?style=flat-square&logo=react&logoColor=061B23" alt="React ^19.2.7" />
  <img src="https://img.shields.io/badge/TypeScript-~6.0.2-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript ~6.0.2" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-%5E4.3.1-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS ^4.3.1" />
  <img src="https://img.shields.io/badge/Radix_UI-%5E1.1.17-161618?style=flat-square&logo=radixui&logoColor=white" alt="Radix UI ^1.1.17" />
</p>

# RocoKingdom UI

《洛克王国：世界》风格的 React 组件库。

## 安装

```bash
pnpm add rocokingdom-ui
```

## 快速使用

1. 在应用入口导入样式：

```ts
import 'rocokingdom-ui/style.css'
```

2. 导入组件：

```tsx
import { Button, RocoTheme } from 'rocokingdom-ui'

export function App() {
  return (
    <RocoTheme>
      <Button shadow>开始</Button>
    </RocoTheme>
  )
}
```

## 组件

- 基础与布局：`Button`、`ButtonNormal`、`Material`、`RocoShape`、`RocoTheme`、`RuneText`、`Panel`、`Divider`、`Space`、`Stack`、`Layout`
- 表单与输入：`Input`、`Textarea`、`Select`、`Checkbox`、`RadioGroup`、`Switch`、`Slider`、`InputNumber`、`DatePicker`、`TimePicker`、`Upload`、`Form`、`Autocomplete`
- 导航：`SideNav`、`Menu`、`Tabs`、`Breadcrumb`、`Pagination`、`Steps`、`Anchor`、`Command`
- 反馈与浮层：`Modal`、`Drawer`、`Tooltip`、`Popover`、`Message`、`Notification`、`Alert`、`Spin`、`Skeleton`、`Progress`、`Empty`、`Result`
- 数据展示：`Table`、`List`、`Descriptions`、`Avatar`、`Badge`、`Tag`、`Accordion`、`Tree`、`Timeline`、`Carousel`、`Image`、`Statistic`

组件视觉以 `RocoShape` 负责轮廓、`Material` 负责表面与前景色。弹窗、菜单、提示、消息等复杂交互基于 Radix Primitives，并保留键盘操作、焦点管理和无障碍语义。

## 文档

前往 [RocoKingdom UI 文档](https://rocokingdom-ui.vercel.app/) 查看每个组件的交互示例、属性和源码入口。
