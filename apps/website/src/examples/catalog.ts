export type ExampleCategory = 'components' | 'design' | 'icon' | 'overview'

export interface ExampleMeta {
  category: ExampleCategory
  description: string
  name: string
  path: string
  slug: string
}

export const examples: ExampleMeta[] = [
  {
    category: 'components',
    description: 'SVG 造型按钮，覆盖材质、尺寸、状态和变体。',
    name: 'Button',
    path: '/docs/components/button',
    slug: 'button',
  },
  {
    category: 'components',
    description: '传统胶囊按钮，适合轻量操作和兼容场景。',
    name: 'ButtonNormal',
    path: '/docs/components/button-normal',
    slug: 'button-normal',
  },
  {
    category: 'components',
    description: '以方形 RocoShape 为底的多选控件，选中时渲染 Check 图标。',
    name: 'Checkbox',
    path: '/docs/components/checkbox',
    slug: 'checkbox',
  },
  {
    category: 'components',
    description: '侧向或纵向进入的抽屉面板，覆盖方向、尺寸和遮罩。',
    name: 'Drawer',
    path: '/docs/components/drawer',
    slug: 'drawer',
  },
  {
    category: 'design',
    description: '低层颜色表面原语，支持预设和自定义色值。',
    name: 'Material',
    path: '/docs/design/material',
    slug: 'material',
  },
  {
    category: 'icon',
    description: '填充风格 SVG 图标，继承 currentColor 并提供 Roco 前缀别名。',
    name: 'Icons',
    path: '/docs/icon',
    slug: 'icons',
  },
  {
    category: 'components',
    description: '与按钮保持同款 RocoShape 底形的单行输入框。',
    name: 'Input',
    path: '/docs/components/input',
    slug: 'input',
  },
  {
    category: 'components',
    description: '游戏面板风格弹窗，覆盖标题、描述、页脚和自定义头部。',
    name: 'Modal',
    path: '/docs/components/modal',
    slug: 'modal',
  },
  {
    category: 'components',
    description: '带直边或曲线边缘的内容容器。',
    name: 'Panel',
    path: '/docs/components/panel',
    slug: 'panel',
  },
  {
    category: 'components',
    description: '复合单选控件，覆盖方向、受控值、禁用项和键盘导航。',
    name: 'RadioGroup',
    path: '/docs/components/radio-group',
    slug: 'radio-group',
  },
  {
    category: 'components',
    description: '按钮风格切换组，选中时变色并拉宽底形。',
    name: 'ToggleGroup',
    path: '/docs/components/toggle-group',
    slug: 'toggle-group',
  },
  {
    category: 'overview',
    description: '全局主题变量注入器，用于运行时切换品牌色。',
    name: 'RocoTheme',
    path: '/docs/overview/roco-theme',
    slug: 'roco-theme',
  },
  {
    category: 'design',
    description: '可拉伸的洛克王国按钮底形，支持实心、描边和阴影。',
    name: 'RocoShape',
    path: '/docs/design/roco-shape',
    slug: 'roco-shape',
  },
  {
    category: 'components',
    description: '装饰性符文文字，可改变渲染元素和字号。',
    name: 'RuneText',
    path: '/docs/components/rune-text',
    slug: 'rune-text',
  },
  {
    category: 'components',
    description: 'Radix Select 封装，覆盖选项、禁用项、分组和自定义内容。',
    name: 'Select',
    path: '/docs/components/select',
    slug: 'select',
  },
  {
    category: 'components',
    description: '二元开关控件，覆盖表单语义、尺寸、材质和受控状态。',
    name: 'Switch',
    path: '/docs/components/switch',
    slug: 'switch',
  },
  {
    category: 'components',
    description: '游戏侧边导航，覆盖堆叠模式、窄轨模式、徽标和禁用项。',
    name: 'SideNav',
    path: '/docs/components/side-nav',
    slug: 'side-nav',
  },
  {
    category: 'components',
    description: '外层与选中项都使用按钮同款 RocoShape 的标签页。',
    name: 'Tabs',
    path: '/docs/components/tabs',
    slug: 'tabs',
  },
]

export const componentExamples = examples.filter((example) => example.category === 'components')
export const designExamples = examples.filter((example) => example.category === 'design')
export const iconExamples = examples.filter((example) => example.category === 'icon')
export const overviewExamples = examples.filter((example) => example.category === 'overview')

export function getExampleBySlug(slug: string) {
  return examples.find((example) => example.slug === slug)
}
