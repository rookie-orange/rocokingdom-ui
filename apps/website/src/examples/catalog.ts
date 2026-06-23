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
    path: '/examples/button',
    slug: 'button',
  },
  {
    description: '传统胶囊按钮，适合轻量操作和兼容场景。',
    name: 'ButtonNormal',
    path: '/examples/button-normal',
    slug: 'button-normal',
  },
  {
    description: '侧向或纵向进入的抽屉面板，覆盖方向、尺寸和遮罩。',
    name: 'Drawer',
    path: '/examples/drawer',
    slug: 'drawer',
  },
  {
    description: '低层颜色表面原语，支持预设和自定义色值。',
    name: 'Material',
    path: '/examples/material',
    slug: 'material',
  },
  {
    description: '游戏面板风格弹窗，覆盖标题、描述、页脚和自定义头部。',
    name: 'Modal',
    path: '/examples/modal',
    slug: 'modal',
  },
  {
    description: '带直边或曲线边缘的内容容器。',
    name: 'Panel',
    path: '/examples/panel',
    slug: 'panel',
  },
  {
    description: '复合单选控件，覆盖方向、受控值、禁用项和键盘导航。',
    name: 'RadioGroup',
    path: '/examples/radio-group',
    slug: 'radio-group',
  },
  {
    description: '全局主题变量注入器，用于运行时切换品牌色。',
    name: 'RocoProvider',
    path: '/examples/roco-provider',
    slug: 'roco-provider',
  },
  {
    description: '可拉伸的洛克王国按钮底形，支持实心、描边和阴影。',
    name: 'RocoShape',
    path: '/examples/roco-shape',
    slug: 'roco-shape',
  },
  {
    description: '装饰性符文文字，可改变渲染元素和字号。',
    name: 'RuneText',
    path: '/examples/rune-text',
    slug: 'rune-text',
  },
  {
    description: 'Radix Select 封装，覆盖选项、禁用项、分组和自定义内容。',
    name: 'Select',
    path: '/examples/select',
    slug: 'select',
  },
  {
    description: '游戏侧边导航，覆盖堆叠模式、窄轨模式、徽标和禁用项。',
    name: 'SideNav',
    path: '/examples/side-nav',
    slug: 'side-nav',
  },
]

export function getExampleBySlug(slug: string) {
  return examples.find((example) => example.slug === slug)
}
