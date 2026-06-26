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

# Roco Kingdom UI

Roco Kingdom UI 是面向洛克王国风格界面的前端 monorepo，包含 React 组件库、图标、设计 token、共享工具和官网示例应用。

## 项目结构

```txt
apps/
  website/          官网与组件示例
packages/
  ui/               React 组件库，包名 rocokingdom-ui
  icons/            图标库，包名 @rocokingdom-ui/icons
  tokens/           设计 token，包名 @rocokingdom-ui/tokens
  shared/           共享基础能力
  utils/            通用工具
```

## 技术栈

- Vite+ 统一工具链
- React
- TypeScript
- Tailwind CSS
- Radix UI

## 开发

安装依赖：

```bash
vp install
```

启动官网开发服务：

```bash
vp run dev
```

检查、测试并构建整个 workspace：

```bash
vp run ready
```

分别运行测试和构建：

```bash
vp run -r test
vp run -r build
```

## 包命令

组件库、图标库、tokens、shared 和 utils 包都遵循相同的 Vite+ 脚本：

```bash
vp run <package>#dev
vp run <package>#check
vp run <package>#test
vp run <package>#build
```

例如：

```bash
vp run rocokingdom-ui#build
vp run @rocokingdom-ui/icons#build
```
