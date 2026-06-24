export interface ExampleMeta {
  description: string
  name: string
  path: string
  slug: string
}

export const examples: ExampleMeta[] = [
  {
    description: 'SVG 造型按钮，覆盖材质、尺寸、状态和变体。',
    name: 'Button',
    path: '/docs/components/button',
    slug: 'button',
  },
  {
    description: '传统胶囊按钮，适合轻量操作和兼容场景。',
    name: 'ButtonNormal',
    path: '/docs/components/button-normal',
    slug: 'button-normal',
  },
  {
    description: '侧向或纵向进入的抽屉面板，覆盖方向、尺寸和遮罩。',
    name: 'Drawer',
    path: '/docs/components/drawer',
    slug: 'drawer',
  },
  {
    description: '低层颜色表面原语，支持预设和自定义色值。',
    name: 'Material',
    path: '/docs/components/material',
    slug: 'material',
  },
  {
    description: '填充风格 SVG 图标，继承 currentColor 并提供 Roco 前缀别名。',
    name: 'Icons',
    path: '/docs/components/icons',
    slug: 'icons',
  },
  {
    description: '游戏面板风格弹窗，覆盖标题、描述、页脚和自定义头部。',
    name: 'Modal',
    path: '/docs/components/modal',
    slug: 'modal',
  },
  {
    description: '带直边或曲线边缘的内容容器。',
    name: 'Panel',
    path: '/docs/components/panel',
    slug: 'panel',
  },
  {
    description: '复合单选控件，覆盖方向、受控值、禁用项和键盘导航。',
    name: 'RadioGroup',
    path: '/docs/components/radio-group',
    slug: 'radio-group',
  },
  {
    description: '全局主题变量注入器，用于运行时切换品牌色。',
    name: 'RocoTheme',
    path: '/docs/components/roco-theme',
    slug: 'roco-theme',
  },
  {
    description: '可拉伸的洛克王国按钮底形，支持实心、描边和阴影。',
    name: 'RocoShape',
    path: '/docs/components/roco-shape',
    slug: 'roco-shape',
  },
  {
    description: '装饰性符文文字，可改变渲染元素和字号。',
    name: 'RuneText',
    path: '/docs/components/rune-text',
    slug: 'rune-text',
  },
  {
    description: 'Radix Select 封装，覆盖选项、禁用项、分组和自定义内容。',
    name: 'Select',
    path: '/docs/components/select',
    slug: 'select',
  },
  {
    description: '游戏侧边导航，覆盖堆叠模式、窄轨模式、徽标和禁用项。',
    name: 'SideNav',
    path: '/docs/components/side-nav',
    slug: 'side-nav',
  },
]

export function getExampleBySlug(slug: string) {
  return examples.find((example) => example.slug === slug)
}
