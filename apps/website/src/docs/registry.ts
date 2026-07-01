export type DocsCategory = 'components' | 'design' | 'icon' | 'overview'

export interface DocsProp {
  defaultValue?: string
  description: string
  name: string
  required?: boolean
  type: string
}

export interface DocsRecord {
  category: DocsCategory
  description: string
  importName?: string
  notes?: readonly string[]
  packageName?: string
  path: string
  props?: readonly DocsProp[]
  slug: string
  source?: string
  status?: 'stable' | 'beta'
  title: string
}

export interface DocsNavLink {
  description?: string
  label: string
  to: string
}

export interface DocsNavSection {
  links: readonly DocsNavLink[]
  title: string
}

const materialPreset =
  "'danger' | 'default' | 'paper' | 'paperMuted' | 'paperSoft' | 'paperStrong' | 'primary' | 'primaryMuted' | 'primarySoft' | 'primaryStrong' | 'stone' | 'stoneMuted' | 'stoneSoft' | 'stoneStrong' | 'success'"

const sizePreset = "'small' | 'middle' | 'large'"
const visualVariant = "'solid' | 'outline' | 'text'"
const inputVariant = "'solid' | 'outline'"

const componentNativeButton =
  '继承 React ButtonHTMLAttributes<HTMLButtonElement>，可继续传入 disabled、aria-*、onClick 等原生按钮属性。'
const classNameNote =
  '覆盖组件内部 class 前缀或追加根节点 class，通常只在主题集成和样式调试时使用。'

export const docsRecords: readonly DocsRecord[] = [
  {
    category: 'overview',
    description: '从安装、样式引入到第一个 Rocokingdom UI 组件的最短路径。',
    notes: [
      '业务项目必须先引入 style.css，font.css 只在需要洛克王国字体时引入。',
      '所有组件默认读取 :root 上的 --rk-* 变量，也可以用 RocoTheme 创建局部主题。',
      '组件以 ESM 发布，适合 Vite、Next.js、Rspack 等现代构建工具。',
    ],
    path: '/docs',
    slug: 'quick-start',
    status: 'stable',
    title: '快速开始',
  },
  {
    category: 'overview',
    description: '组件库的定位、视觉语言和当前文档范围。',
    path: '/docs/overview/introduction',
    slug: 'introduction',
    status: 'stable',
    title: '介绍',
  },
  {
    category: 'overview',
    description: '已实现组件、规划组件和设计系统覆盖面。',
    path: '/docs/overview/components',
    slug: 'components-overview',
    status: 'stable',
    title: '组件总览',
  },
  {
    category: 'overview',
    description: '局部主题作用域，把颜色和控制尺寸映射为 --rk-* CSS 变量。',
    importName: 'RocoTheme',
    notes: [
      '适合运行时主题切换、局部预览和品牌主题嵌套。',
      'colors 与 tokens 会和父级 RocoTheme 合并，只覆盖传入字段。',
      'useRocoTheme 必须在 RocoTheme 子树内调用，useRocoThemeStyle 会返回 CSSProperties。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/overview/roco-theme',
    props: [
      {
        description: '使用 Slot.Root 把主题变量注入到唯一子元素上，避免额外 DOM。',
        name: 'asChild',
        type: 'boolean',
      },
      {
        description: '覆盖纸面、石材、主色、成功、危险及对应前景色。',
        name: 'colors',
        type: 'RocoThemeColors',
      },
      {
        description: '覆盖字号、圆角、控件高度和内边距等设计 token。',
        name: 'tokens',
        type: 'RocoThemeTokens',
      },
      {
        description: classNameNote,
        name: 'prefixCls / rootClassName / className',
        type: 'string',
      },
      {
        description: '主题根节点样式，会与计算出的 CSS 变量合并。',
        name: 'style',
        type: 'CSSProperties',
      },
    ],
    slug: 'roco-theme',
    source: 'packages/ui/src/theme',
    status: 'stable',
    title: 'RocoTheme',
  },
  {
    category: 'design',
    description: '底层颜色表面原语，为子组件提供背景色、前景色和 CSS 变量。',
    importName: 'Material',
    notes: [
      'material 负责解析语义色，不负责形状；通常与 RocoShape、Panel 或自定义元素组合。',
      'background 和 color 会覆盖 preset，并写入 --rk-material-background / --rk-material-color。',
      'render 模式适合只取解析结果，不渲染额外节点。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/design/material',
    props: [
      {
        defaultValue: "'paper'",
        description: '选择预设材质，映射到对应 --rk-* 背景色和前景色变量。',
        name: 'material',
        type: materialPreset,
      },
      {
        description: '自定义背景色；传入后覆盖 material 的背景。',
        name: 'background',
        type: 'string',
      },
      {
        description: '自定义前景色；传入后覆盖 material 的文字颜色。',
        name: 'color',
        type: 'string',
      },
      {
        description: '改变渲染元素，默认渲染 div。',
        name: 'as',
        type: 'ElementType',
      },
      {
        description: '使用 Slot.Root 把材质变量透传给唯一子元素。',
        name: 'asChild',
        type: 'boolean',
      },
      {
        description: '函数式渲染入口，可拿到 background、color 和 style。',
        name: 'render',
        type: '(material: MaterialValue) => ReactNode',
      },
    ],
    slug: 'material',
    source: 'packages/ui/src/material',
    status: 'stable',
    title: 'Material',
  },
  {
    category: 'design',
    description: '可拉伸或固定形状的洛克王国视觉底形，是按钮和输入控件的基础。',
    importName: 'RocoShape',
    notes: [
      'stretch 形状会渲染左右 SVG 边缘和中段，可安全承载动态文字。',
      'circle / square 适合图标按钮、复选框和独立状态点。',
      'shadow 只在 solid 变体下生效。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/design/roco-shape',
    props: [
      {
        defaultValue: "'span'",
        description: '改变根节点元素，例如 button、a 或 div。',
        name: 'as',
        type: 'ElementType',
      },
      {
        defaultValue: "'stretch'",
        description: '控制底形类型：拉伸胶囊、圆形或方形。',
        name: 'shape',
        type: "'stretch' | 'circle' | 'square'",
      },
      {
        defaultValue: "'solid'",
        description: '控制填充、描边或仅文本模式。',
        name: 'variant',
        type: visualVariant,
      },
      {
        defaultValue: 'false',
        description: '为 solid 填充形态增加投影层。',
        name: 'shadow',
        type: 'boolean',
      },
      {
        description: '直接覆盖底形背景色变量。',
        name: 'background',
        type: 'string',
      },
      {
        description: '直接覆盖底形前景色变量。',
        name: 'color',
        type: 'string',
      },
      {
        description: '追加内容层 class，适合微调文字或图标排版。',
        name: 'contentClassName',
        type: 'string',
      },
    ],
    slug: 'roco-shape',
    source: 'packages/ui/src/roco-shape',
    status: 'stable',
    title: 'RocoShape',
  },
  {
    category: 'components',
    description: 'SVG 造型按钮，覆盖材质、尺寸、状态和变体。',
    importName: 'Button',
    notes: [
      '主要动作建议使用 material="default" 或 "primary" 并开启 shadow。',
      'variant="text" 会自动关闭 shadow，适合低强调命令。',
      componentNativeButton,
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/components/button',
    props: [
      {
        defaultValue: "'default'",
        description: '按钮底形材质，来自 MaterialPreset。',
        name: 'material',
        type: materialPreset,
      },
      {
        defaultValue: "'middle'",
        description: '按钮高度和横向内边距档位。',
        name: 'size',
        type: sizePreset,
      },
      {
        defaultValue: "'solid'",
        description: '按钮视觉层级：实心、描边或文本。',
        name: 'variant',
        type: visualVariant,
      },
      {
        defaultValue: 'false',
        description: '为非 text 按钮增加 RocoShape 投影。',
        name: 'shadow',
        type: 'boolean',
      },
      {
        defaultValue: "'button'",
        description: '按钮 type 默认安全地设为 button，避免表单中误提交。',
        name: 'type',
        type: "'button' | 'submit' | 'reset'",
      },
      {
        description: classNameNote,
        name: 'prefixCls / rootClassName / className',
        type: 'string',
      },
    ],
    slug: 'button',
    source: 'packages/ui/src/button',
    status: 'stable',
    title: 'Button',
  },
  {
    category: 'components',
    description: '传统胶囊按钮，适合轻量操作和兼容场景。',
    importName: 'ButtonNormal',
    notes: [
      'ButtonNormal 不使用 RocoShape，DOM 和样式更轻。',
      '需要强游戏化造型时优先使用 Button。',
      componentNativeButton,
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/components/button-normal',
    props: [
      {
        defaultValue: "'default'",
        description: '胶囊按钮材质色。',
        name: 'material',
        type: materialPreset,
      },
      {
        defaultValue: "'middle'",
        description: '尺寸档位。',
        name: 'size',
        type: sizePreset,
      },
      {
        defaultValue: "'solid'",
        description: '视觉变体。',
        name: 'variant',
        type: visualVariant,
      },
      {
        defaultValue: "'button'",
        description: '原生 button type。',
        name: 'type',
        type: "'button' | 'submit' | 'reset'",
      },
      {
        description: classNameNote,
        name: 'prefixCls / rootClassName / className',
        type: 'string',
      },
    ],
    slug: 'button-normal',
    source: 'packages/ui/src/button-normal',
    status: 'stable',
    title: 'ButtonNormal',
  },
  {
    category: 'components',
    description: '以方形 RocoShape 为底的多选控件，选中时渲染 Check 图标。',
    importName: 'Checkbox',
    notes: [
      '真实表单语义由隐藏的原生 checkbox input 承载。',
      'checked 传入时为受控模式；否则使用 defaultChecked 作为初始值。',
      'material 仍可用但已废弃，建议使用 boxMaterial。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/components/checkbox',
    props: [
      {
        description: '受控选中状态。',
        name: 'checked',
        type: 'boolean',
      },
      {
        defaultValue: 'false',
        description: '非受控模式下的初始选中状态。',
        name: 'defaultChecked',
        type: 'boolean',
      },
      {
        defaultValue: "'stone'",
        description: '复选框方形底色材质。',
        name: 'boxMaterial',
        type: materialPreset,
      },
      {
        defaultValue: "'success'",
        description: '勾选图标颜色材质。',
        name: 'checkMaterial',
        type: materialPreset,
      },
      {
        description: '替换默认 Check 图标。',
        name: 'icon',
        type: 'ReactNode',
      },
      {
        defaultValue: "'middle'",
        description: '控件尺寸。',
        name: 'size',
        type: sizePreset,
      },
      {
        defaultValue: "'solid'",
        description: '选中时方形底形变体。',
        name: 'variant',
        type: inputVariant,
      },
      {
        defaultValue: "'outline'",
        description: '未选中时方形底形变体。',
        name: 'uncheckedVariant',
        type: inputVariant,
      },
      {
        defaultValue: 'false',
        description: '选中时为方形底形增加投影。',
        name: 'shadow',
        type: 'boolean',
      },
      {
        description:
          '继承 InputHTMLAttributes<HTMLInputElement>，可传 name、value、disabled、onChange 等。',
        name: 'input props',
        type: 'Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "size" | "type">',
      },
    ],
    slug: 'checkbox',
    source: 'packages/ui/src/checkbox',
    status: 'stable',
    title: 'Checkbox',
  },
  {
    category: 'components',
    description: '侧向或纵向进入的抽屉面板，覆盖方向、尺寸和遮罩。',
    importName: 'Drawer',
    notes: [
      '基于 Radix Dialog，保留 open / defaultOpen / onOpenChange 等根属性。',
      '没有可见 title 时请传 ariaLabel，保证辅助技术有可读标题。',
      'size="full" 会根据 side 自动使用 100vw 或 100svh。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/components/drawer',
    props: [
      {
        defaultValue: "'right'",
        description: '抽屉进入方向。',
        name: 'side',
        type: "'right' | 'left' | 'top' | 'bottom'",
      },
      {
        description: '抽屉主尺寸；数字会转成 px，full 会铺满对应视口方向。',
        name: 'size',
        type: "number | 'full' | string",
      },
      {
        defaultValue: 'false',
        description: '是否显示遮罩暗层。',
        name: 'overlay',
        type: 'boolean',
      },
      {
        defaultValue: 'true',
        description: '是否渲染关闭按钮。',
        name: 'closable',
        type: 'boolean',
      },
      {
        defaultValue: "'stone'",
        description: '抽屉内部 Panel 的材质。',
        name: 'material',
        type: 'PanelMaterial',
      },
      {
        description: '覆盖抽屉边缘曲线；不传时根据 side 自动取相反方向。',
        name: 'curve',
        type: "'none' | 'bottom' | 'left' | 'right' | 'top' | 'both'",
      },
      {
        description: '触发抽屉打开的 ReactElement，会被 Radix Trigger 包裹。',
        name: 'trigger',
        type: 'ReactElement',
      },
      {
        description: '可见标题，会同步作为 DialogTitle。',
        name: 'title',
        type: 'ReactNode',
      },
      {
        description: '描述文字，会渲染为 Radix DialogDescription。',
        name: 'description',
        type: 'ReactNode',
      },
      {
        description: '透传到 Radix Dialog.Content 的属性。',
        name: 'contentProps',
        type: 'DialogContentProps',
      },
    ],
    slug: 'drawer',
    source: 'packages/ui/src/drawer',
    status: 'stable',
    title: 'Drawer',
  },
  {
    category: 'components',
    description: '与按钮保持同款 RocoShape 底形的单行输入框。',
    importName: 'Input',
    notes: [
      '外层是 label + RocoShape，真实输入仍是原生 input。',
      'prefix 和 suffix 适合短标签、单位或状态文本，避免放复杂交互。',
      '继承大部分 InputHTMLAttributes，但 size、prefix、children 被组件语义占用。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/components/input',
    props: [
      {
        defaultValue: "'stone'",
        description: '输入框底形材质。',
        name: 'material',
        type: materialPreset,
      },
      {
        defaultValue: "'middle'",
        description: '控件高度档位。',
        name: 'size',
        type: sizePreset,
      },
      {
        defaultValue: "'solid'",
        description: '输入框填充或描边形态。',
        name: 'variant',
        type: inputVariant,
      },
      {
        description: '输入框左侧短内容。',
        name: 'prefix',
        type: 'ReactNode',
      },
      {
        description: '输入框右侧短内容。',
        name: 'suffix',
        type: 'ReactNode',
      },
      {
        defaultValue: 'false',
        description: '为输入框底形增加投影。',
        name: 'shadow',
        type: 'boolean',
      },
      {
        description: '直接追加到内部 input 元素。',
        name: 'inputClassName',
        type: 'string',
      },
      {
        description:
          '继承 InputHTMLAttributes<HTMLInputElement>，可传 placeholder、value、onChange、disabled、readOnly 等。',
        name: 'input props',
        type: 'Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "prefix" | "size">',
      },
    ],
    slug: 'input',
    source: 'packages/ui/src/input',
    status: 'stable',
    title: 'Input',
  },
  {
    category: 'components',
    description: '四角不规则形状的多行文本输入，支持自由尺寸和字数统计。',
    importName: 'Textarea',
    notes: [
      'value 传入时为受控模式；否则组件会内部维护 defaultValue。',
      'showCount 会读取当前 value 长度，并在有 maxLength 时显示 x / maxLength。',
      'resize 写入 --rk-textarea-resize，可使用 CSS 覆盖。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/components/textarea',
    props: [
      {
        defaultValue: "'stone'",
        description: '文本域底层材质。',
        name: 'material',
        type: materialPreset,
      },
      {
        defaultValue: "'middle'",
        description: '字号、内边距和最小高度档位。',
        name: 'size',
        type: sizePreset,
      },
      {
        defaultValue: "'solid'",
        description: '填充或描边文本域边框。',
        name: 'variant',
        type: inputVariant,
      },
      {
        defaultValue: "'vertical'",
        description: '控制原生 textarea resize 方向。',
        name: 'resize',
        type: "'both' | 'horizontal' | 'none' | 'vertical'",
      },
      {
        defaultValue: 'false',
        description: '显示字数统计。',
        name: 'showCount',
        type: 'boolean',
      },
      {
        description: '配合 showCount 显示上限，并透传给内部 textarea。',
        name: 'maxLength',
        type: 'number',
      },
      {
        defaultValue: 'false',
        description: 'solid 变体下增加投影。',
        name: 'shadow',
        type: 'boolean',
      },
      {
        description: '直接追加到内部 textarea 元素。',
        name: 'textareaClassName',
        type: 'string',
      },
      {
        description:
          '继承 TextareaHTMLAttributes<HTMLTextAreaElement>，可传 value、defaultValue、onChange、disabled、readOnly 等。',
        name: 'textarea props',
        type: 'Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "children" | "size">',
      },
    ],
    slug: 'textarea',
    source: 'packages/ui/src/textarea',
    status: 'stable',
    title: 'Textarea',
  },
  {
    category: 'components',
    description: '游戏面板风格弹窗，覆盖标题、描述、页脚和自定义头部。',
    importName: 'Modal',
    notes: [
      '基于 Radix Dialog，open / defaultOpen / onOpenChange 由根属性透传。',
      'header={false} 会隐藏可见头部，但仍会渲染隐藏标题用于无障碍。',
      'title 不可见或省略时请传 ariaLabel。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/components/modal',
    props: [
      {
        description: '触发弹窗打开的 ReactElement。',
        name: 'trigger',
        type: 'ReactElement',
      },
      {
        description: '弹窗标题；默认渲染为 RuneText。',
        name: 'title',
        type: 'ReactNode',
      },
      {
        description: '标题不可见时提供辅助技术标题。',
        name: 'ariaLabel',
        type: 'string',
      },
      {
        description: '标题下方的描述内容。',
        name: 'description',
        type: 'ReactNode',
      },
      {
        description: '页脚动作区。',
        name: 'footer',
        type: 'ReactNode',
      },
      {
        description: '自定义头部；传 false 可隐藏可见头部。',
        name: 'header',
        type: 'ReactNode | false',
      },
      {
        description: '标题栏背景上的装饰符文文字。',
        name: 'headerRuneText',
        type: 'ReactNode',
      },
      {
        defaultValue: 'true',
        description: '是否显示关闭按钮。',
        name: 'closable',
        type: 'boolean',
      },
      {
        defaultValue: "'inside'",
        description: '关闭按钮位于标题栏内或面板外。',
        name: 'closePosition',
        type: "'inside' | 'outside'",
      },
      {
        description: '弹窗宽度；数字会转为 px。',
        name: 'width',
        type: 'number | string',
      },
    ],
    slug: 'modal',
    source: 'packages/ui/src/modal',
    status: 'stable',
    title: 'Modal',
  },
  {
    category: 'components',
    description: '带直边或曲线边缘的内容容器。',
    importName: 'Panel',
    notes: [
      'Panel 只负责容器材质与曲线外形，不内置标题、动作或间距规则。',
      'curve 不为 none 时会渲染可拉伸 SVG 形状。',
      'curveInset 可用于曲线侧预留内容避让空间。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/components/panel',
    props: [
      {
        defaultValue: "'section'",
        description: '根节点元素。',
        name: 'as',
        type: 'ElementType',
      },
      {
        defaultValue: "'paper'",
        description: '面板材质，仅允许 paper/stone 系列。',
        name: 'material',
        type: "'paper' | 'paperMuted' | 'paperSoft' | 'paperStrong' | 'stone' | 'stoneMuted' | 'stoneSoft' | 'stoneStrong'",
      },
      {
        defaultValue: "'none'",
        description: '曲线边缘位置。',
        name: 'curve',
        type: "'none' | 'bottom' | 'left' | 'right' | 'top' | 'both'",
      },
      {
        description: '曲线边缘内缩尺寸；数字会转成 px。',
        name: 'curveInset',
        type: 'number | string',
      },
      {
        description: '追加到内容层，常用于设置 padding 和布局。',
        name: 'contentClassName',
        type: 'string',
      },
      {
        description: '继承 HTMLAttributes<HTMLElement>。',
        name: 'html props',
        type: 'HTMLAttributes<HTMLElement>',
      },
    ],
    slug: 'panel',
    source: 'packages/ui/src/panel',
    status: 'stable',
    title: 'Panel',
  },
  {
    category: 'components',
    description: '内容、菜单和表单区块之间的语义分隔线。',
    importName: 'Divider',
    notes: [
      '默认渲染 role="separator"，并根据 orientation 写入 aria-orientation。',
      '水平分割线可带标题文字，并通过 align 控制标题位置。',
      'thickness 和 color 会写入 CSS 变量，便于主题或局部样式覆盖。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/components/divider',
    props: [
      {
        defaultValue: "'horizontal'",
        description: '分割线方向。',
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
      },
      {
        defaultValue: "'solid'",
        description: '线条样式。',
        name: 'variant',
        type: "'solid' | 'dashed' | 'dotted'",
      },
      {
        defaultValue: 'false',
        description: '便捷开启虚线，等价于 variant="dashed"。',
        name: 'dashed',
        type: 'boolean',
      },
      {
        defaultValue: "'center'",
        description: '水平带文字分割线的文字位置。',
        name: 'align',
        type: "'start' | 'center' | 'end'",
      },
      {
        description: '线条颜色，可传任意 CSS color。',
        name: 'color',
        type: 'string',
      },
      {
        description: '线条粗细；数字会转成 px。',
        name: 'thickness',
        type: 'number | string',
      },
      {
        defaultValue: "'div'",
        description: '根节点元素。',
        name: 'as',
        type: 'ElementType',
      },
      {
        description: '继承 HTMLAttributes<HTMLElement>。',
        name: 'html props',
        type: 'HTMLAttributes<HTMLElement>',
      },
    ],
    slug: 'divider',
    source: 'packages/ui/src/divider',
    status: 'stable',
    title: 'Divider',
  },
  {
    category: 'components',
    description: '统一元素间距、换行、分隔符和堆叠布局。',
    importName: 'Space / Stack',
    notes: [
      'Space 默认水平 inline-flex，适合按钮组、标签组和紧凑元信息。',
      'Stack 默认垂直 block 布局，适合表单段落、设置组和卡片内部结构。',
      'size 可传预设、数字、CSS 字符串，或 [horizontal, vertical] 元组。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/components/space',
    props: [
      {
        defaultValue: "'horizontal'",
        description: 'Space 排列方向；Stack 默认为 vertical。',
        name: 'direction',
        type: "'horizontal' | 'vertical'",
      },
      {
        defaultValue: "'middle'",
        description: '间距预设、数值、CSS 字符串或水平/垂直间距元组。',
        name: 'size',
        type: "'compact' | 'small' | 'middle' | 'large' | number | string | [SpaceSize, SpaceSize]",
      },
      {
        description: '交叉轴对齐方式。',
        name: 'align',
        type: "'start' | 'center' | 'end' | 'baseline' | 'stretch'",
      },
      {
        description: '主轴分布方式。',
        name: 'justify',
        type: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'",
      },
      {
        defaultValue: 'false',
        description: '是否允许换行。',
        name: 'wrap',
        type: 'boolean',
      },
      {
        defaultValue: 'false',
        description: 'Space 是否占满父容器；Stack 默认为 true。',
        name: 'block',
        type: 'boolean',
      },
      {
        description: '插入到相邻子元素之间的视觉分隔内容。',
        name: 'split',
        type: 'ReactNode',
      },
      {
        defaultValue: "'div'",
        description: '根节点元素。',
        name: 'as',
        type: 'ElementType',
      },
    ],
    slug: 'space',
    source: 'packages/ui/src/space',
    status: 'stable',
    title: 'Space / Stack',
  },
  {
    category: 'components',
    description: '页面级骨架布局，组合 Header、Sider、Content 和 Footer。',
    importName: 'Layout / LayoutHeader / LayoutSider / LayoutContent / LayoutFooter',
    notes: [
      'Layout 可嵌套，外层 horizontal 常用于侧栏，内层 vertical 承载头部、内容和页脚。',
      '各区块默认使用 Material 语义色，也可通过 material 单独覆盖。',
      'Sider 支持 width、collapsed 和 collapsedWidth，适合文档、后台和游戏面板导航。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/components/layout',
    props: [
      {
        defaultValue: "'vertical'",
        description: 'Layout 子区块排列方向。',
        name: 'Layout.direction',
        type: "'horizontal' | 'vertical'",
      },
      {
        defaultValue: 'false',
        description: '是否使用 100svh 最小高度。',
        name: 'Layout.fullHeight',
        type: 'boolean',
      },
      {
        defaultValue: "'paper'",
        description: 'Layout 根节点材质。',
        name: 'Layout.material',
        type: materialPreset,
      },
      {
        description: 'Header 高度；数字会转成 px。',
        name: 'LayoutHeader.height',
        type: 'number | string',
      },
      {
        description: 'Sider 宽度；数字会转成 px。',
        name: 'LayoutSider.width',
        type: 'number | string',
      },
      {
        defaultValue: 'false',
        description: 'Sider 是否折叠。',
        name: 'LayoutSider.collapsed',
        type: 'boolean',
      },
      {
        description: 'Sider 折叠宽度；数字会转成 px。',
        name: 'LayoutSider.collapsedWidth',
        type: 'number | string',
      },
      {
        defaultValue: 'true',
        description: 'Content 是否保留默认内边距。',
        name: 'LayoutContent.padded',
        type: 'boolean',
      },
      {
        description: 'Footer 高度；数字会转成 px。',
        name: 'LayoutFooter.height',
        type: 'number | string',
      },
    ],
    slug: 'layout',
    source: 'packages/ui/src/layout',
    status: 'stable',
    title: 'Layout',
  },
  {
    category: 'components',
    description: '复合单选控件，覆盖方向、受控值、禁用项和键盘导航。',
    importName: 'RadioGroup / RadioItem',
    notes: [
      'RadioGroup 管理值与键盘导航，RadioItem 必须放在 RadioGroup 内。',
      'name 存在且有选中值时会渲染隐藏 input，便于表单提交。',
      'RadioItem 支持覆盖选中/未选中材质和变体。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/components/radio-group',
    props: [
      {
        description: '受控选中值。',
        name: 'RadioGroup.value',
        type: 'Value',
      },
      {
        description: '非受控初始值。',
        name: 'RadioGroup.defaultValue',
        type: 'Value',
      },
      {
        description: '值变更回调。',
        name: 'RadioGroup.onValueChange',
        type: '(value: Value) => void',
      },
      {
        defaultValue: "'horizontal'",
        description: '排列方向，并同步 aria-orientation。',
        name: 'RadioGroup.orientation',
        type: "'horizontal' | 'vertical'",
      },
      {
        defaultValue: "'middle'",
        description: '组内默认尺寸。',
        name: 'RadioGroup.size',
        type: sizePreset,
      },
      {
        defaultValue: "'paper'",
        description: '选中项默认材质。',
        name: 'RadioGroup.activeMaterial',
        type: materialPreset,
      },
      {
        defaultValue: "'stone'",
        description: '未选中项默认材质。',
        name: 'RadioGroup.inactiveMaterial',
        type: materialPreset,
      },
      {
        description: 'RadioItem 的唯一值。',
        name: 'RadioItem.value',
        required: true,
        type: 'Value',
      },
      {
        description: '单项禁用状态。',
        name: 'RadioItem.disabled',
        type: 'boolean',
      },
    ],
    slug: 'radio-group',
    source: 'packages/ui/src/radio-group',
    status: 'stable',
    title: 'RadioGroup',
  },
  {
    category: 'components',
    description: '按钮风格切换组，选中时变色并拉宽底形。',
    importName: 'ToggleGroup / ToggleItem',
    notes: [
      '这是单选切换组；再次点击已选项不会取消选择。',
      'name 存在且有选中值时会渲染隐藏 input。',
      '支持 Arrow/Home/End 键盘导航。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/components/toggle-group',
    props: [
      {
        description: '受控选中值。',
        name: 'ToggleGroup.value',
        type: 'Value',
      },
      {
        description: '非受控初始值。',
        name: 'ToggleGroup.defaultValue',
        type: 'Value',
      },
      {
        description: '值变更回调。',
        name: 'ToggleGroup.onValueChange',
        type: '(value: Value) => void',
      },
      {
        defaultValue: "'horizontal'",
        description: '排列方向，并同步 aria-orientation。',
        name: 'ToggleGroup.orientation',
        type: "'horizontal' | 'vertical'",
      },
      {
        defaultValue: "'paper'",
        description: '选中项默认材质。',
        name: 'ToggleGroup.selectedMaterial',
        type: materialPreset,
      },
      {
        defaultValue: "'stone'",
        description: '未选中项默认材质。',
        name: 'ToggleGroup.unselectedMaterial',
        type: materialPreset,
      },
      {
        defaultValue: "'middle'",
        description: '组内默认尺寸。',
        name: 'ToggleGroup.size',
        type: sizePreset,
      },
      {
        description: 'ToggleItem 的唯一值。',
        name: 'ToggleItem.value',
        required: true,
        type: 'Value',
      },
      {
        description: '单项禁用状态。',
        name: 'ToggleItem.disabled',
        type: 'boolean',
      },
    ],
    slug: 'toggle-group',
    source: 'packages/ui/src/toggle-group',
    status: 'stable',
    title: 'ToggleGroup',
  },
  {
    category: 'components',
    description: 'Radix Select 封装，覆盖选项、禁用项、分组和自定义内容。',
    importName: 'Select',
    notes: [
      '简单场景传 options；复杂分组场景传 SelectGroup / SelectItem 作为 children。',
      'triggerProps、contentProps、viewportProps 分别透传到 Radix 对应节点。',
      'ariaLabel 会补给 Trigger，图标按钮式选择器也能保持可访问名称。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/components/select',
    props: [
      {
        description: '受控选中值，来自 Radix Select Root。',
        name: 'value',
        type: 'string',
      },
      {
        description: '非受控初始值。',
        name: 'defaultValue',
        type: 'string',
      },
      {
        description: '值变更回调。',
        name: 'onValueChange',
        type: '(value: string) => void',
      },
      {
        description: '快捷选项列表，适合无分组场景。',
        name: 'options',
        type: 'readonly SelectOption[]',
      },
      {
        description: '没有选中值时显示的占位内容。',
        name: 'placeholder',
        type: 'ReactNode',
      },
      {
        defaultValue: "'stone'",
        description: '触发器材质。',
        name: 'material',
        type: materialPreset,
      },
      {
        description: '替换触发器右侧默认箭头。',
        name: 'icon',
        type: 'ReactNode',
      },
      {
        description: '自定义下拉内容；传入后不会渲染 options。',
        name: 'children',
        type: 'ReactNode',
      },
      {
        description: '分别追加到 Trigger、Content、Viewport 和 Item。',
        name: 'triggerClassName / contentClassName / viewportClassName / itemClassName',
        type: 'string',
      },
    ],
    slug: 'select',
    source: 'packages/ui/src/select',
    status: 'stable',
    title: 'Select',
  },
  {
    category: 'components',
    description: '二元开关控件，覆盖表单语义、尺寸、材质和受控状态。',
    importName: 'Switch',
    notes: [
      '真实 input 使用 role="switch"，可直接参与表单。',
      'readOnly 会阻止内部状态和 onCheckedChange 变化，但仍允许聚焦。',
      'checked 传入时为受控模式。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/components/switch',
    props: [
      {
        description: '受控开启状态。',
        name: 'checked',
        type: 'boolean',
      },
      {
        defaultValue: 'false',
        description: '非受控初始开启状态。',
        name: 'defaultChecked',
        type: 'boolean',
      },
      {
        description: '开关状态变更回调，直接返回 boolean。',
        name: 'onCheckedChange',
        type: '(checked: boolean) => void',
      },
      {
        defaultValue: "'success'",
        description: '开启时轨道材质。',
        name: 'checkedMaterial',
        type: materialPreset,
      },
      {
        defaultValue: "'stone'",
        description: '关闭时轨道材质。',
        name: 'uncheckedMaterial',
        type: materialPreset,
      },
      {
        defaultValue: "'paper'",
        description: '圆形滑块材质。',
        name: 'thumbMaterial',
        type: materialPreset,
      },
      {
        defaultValue: "'middle'",
        description: '开关尺寸。',
        name: 'size',
        type: sizePreset,
      },
      {
        defaultValue: 'true',
        description: '开启时是否给轨道增加投影。',
        name: 'checkedShadow',
        type: 'boolean',
      },
      {
        description:
          '继承 InputHTMLAttributes<HTMLInputElement>，可传 name、disabled、readOnly 等。',
        name: 'input props',
        type: 'Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "size" | "type">',
      },
    ],
    slug: 'switch',
    source: 'packages/ui/src/switch',
    status: 'stable',
    title: 'Switch',
  },
  {
    category: 'components',
    description: '游戏侧边导航，覆盖堆叠模式、窄轨模式、徽标和禁用项。',
    importName: 'SideNav / SideNavItem',
    notes: [
      'SideNav 只管理视觉结构，不内置路由；结合 active 和业务路由状态使用。',
      'rail 模式适合窄侧栏，stack 模式适合完整导航。',
      'SideNavItem 是 button，可自行接 onClick 或在外层包装导航逻辑。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/components/side-nav',
    props: [
      {
        defaultValue: "'nav'",
        description: 'SideNav 根元素。',
        name: 'SideNav.as',
        type: 'ElementType',
      },
      {
        defaultValue: "'stack'",
        description: '导航布局模式。',
        name: 'SideNav.variant',
        type: "'rail' | 'stack'",
      },
      {
        description: 'Header 左侧图标。',
        name: 'SideNavHeader.icon',
        type: 'ReactNode',
      },
      {
        description: 'Header 上方短标签。',
        name: 'SideNavHeader.eyebrow',
        type: 'ReactNode',
      },
      {
        description: 'Header 主标题。',
        name: 'SideNavHeader.title',
        type: 'ReactNode',
      },
      {
        defaultValue: 'false',
        description: 'SideNavItem 当前激活状态，会设置 aria-current="page"。',
        name: 'SideNavItem.active',
        type: 'boolean',
      },
      {
        description: 'SideNavItem 前置图标。',
        name: 'SideNavItem.icon',
        type: 'ReactNode',
      },
      {
        description: '右侧徽标；传 true 时显示圆点。',
        name: 'SideNavItem.badge',
        type: 'ReactNode | true',
      },
      {
        description: '继承 ButtonHTMLAttributes<HTMLButtonElement>，可传 disabled、onClick 等。',
        name: 'SideNavItem button props',
        type: 'Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-current" | "type">',
      },
    ],
    slug: 'side-nav',
    source: 'packages/ui/src/side-nav',
    status: 'stable',
    title: 'SideNav',
  },
  {
    category: 'components',
    description: '外层与选中项都使用按钮同款 RocoShape 的标签页。',
    importName: 'Tabs / Tab / TabPanel',
    notes: [
      'Tabs 管理选中值；TabList、Tab、TabPanel 必须放在 Tabs 内。',
      'TabList 内置左右方向键、Home、End 键盘导航。',
      'TabPanel 默认 forceMount=true，会隐藏而不是卸载未选中面板。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/components/tabs',
    props: [
      {
        description: '受控激活 tab 值。',
        name: 'Tabs.value',
        type: 'Value',
      },
      {
        description: '非受控初始值。',
        name: 'Tabs.defaultValue',
        type: 'Value',
      },
      {
        description: '激活值变更回调。',
        name: 'Tabs.onValueChange',
        type: '(value: Value) => void',
      },
      {
        defaultValue: "'stoneSoft'",
        description: 'TabList 的默认材质。',
        name: 'Tabs.listMaterial',
        type: materialPreset,
      },
      {
        defaultValue: "'default'",
        description: '选中 Tab 的默认材质。',
        name: 'Tabs.selectedMaterial',
        type: materialPreset,
      },
      {
        defaultValue: "'middle'",
        description: 'Tab 默认尺寸。',
        name: 'Tabs.size',
        type: sizePreset,
      },
      {
        description: 'Tab 和 TabPanel 的匹配值。',
        name: 'Tab.value / TabPanel.value',
        required: true,
        type: 'Value',
      },
      {
        defaultValue: 'true',
        description: '未选中面板是否仍挂载。',
        name: 'TabPanel.forceMount',
        type: 'boolean',
      },
    ],
    slug: 'tabs',
    source: 'packages/ui/src/tabs',
    status: 'stable',
    title: 'Tabs',
  },
  {
    category: 'components',
    description: '装饰性符文文字，可改变渲染元素和字号。',
    importName: 'RuneText',
    notes: [
      'font="base" 使用常规洛克字体，font="rune" 使用符文装饰字体。',
      'RuneText 不改变语义层级，语义由 as 决定。',
      '组件继承 HTMLAttributes<HTMLElement>。',
    ],
    packageName: 'rocokingdom-ui',
    path: '/docs/components/rune-text',
    props: [
      {
        defaultValue: "'span'",
        description: '渲染元素，可传 h1、p、strong 等。',
        name: 'as',
        type: 'ElementType',
      },
      {
        defaultValue: "'base'",
        description: '字体族。',
        name: 'font',
        type: "'rune' | 'base'",
      },
      {
        description: classNameNote,
        name: 'prefixCls / rootClassName / className',
        type: 'string',
      },
      {
        description: '继承 HTMLAttributes<HTMLElement>。',
        name: 'html props',
        type: 'HTMLAttributes<HTMLElement>',
      },
    ],
    slug: 'rune-text',
    source: 'packages/ui/src/rune-text',
    status: 'stable',
    title: 'RuneText',
  },
  {
    category: 'icon',
    description: '填充风格 SVG 图标，继承 currentColor 并提供 Roco 前缀别名。',
    importName: 'Check / Cross',
    notes: [
      '图标默认使用 1em 尺寸，颜色继承 currentColor。',
      'Check 与 RocoCheck、Cross 与 RocoCross 分别是同组件别名。',
      '当前图标包只包含基础状态图标，后续可扩展更多游戏 UI 图标。',
    ],
    packageName: '@rocokingdom-ui/icons',
    path: '/docs/icon',
    props: [
      {
        defaultValue: '1em',
        description: '图标尺寸来自当前 font-size，可用 text-* 或 style.fontSize 控制。',
        name: 'size',
        type: 'CSS font-size',
      },
      {
        defaultValue: 'currentColor',
        description: 'SVG path 使用 fill=currentColor。',
        name: 'color',
        type: 'CSS color',
      },
      {
        description: '继承 SVGProps<SVGSVGElement>，可传 aria-label、className、style 等。',
        name: 'svg props',
        type: 'SVGProps<SVGSVGElement>',
      },
    ],
    slug: 'icons',
    source: 'packages/icons/src',
    status: 'stable',
    title: 'Icons',
  },
]

function isCategory(category: DocsCategory) {
  return (record: DocsRecord) => record.category === category
}

const overviewOrder = [
  '/docs/overview/introduction',
  '/docs',
  '/docs/overview/components',
  '/docs/overview/roco-theme',
]

function getPathOrder(path: string, order: readonly string[]) {
  const index = order.indexOf(path)

  return index === -1 ? order.length : index
}

export const overviewDocs = docsRecords
  .filter(isCategory('overview'))
  .toSorted(
    (first, second) =>
      getPathOrder(first.path, overviewOrder) - getPathOrder(second.path, overviewOrder),
  )
export const designDocs = docsRecords.filter(isCategory('design'))
export const componentDocs = docsRecords.filter(isCategory('components'))
export const iconDocs = docsRecords.filter(isCategory('icon'))

function toNavLink(record: DocsRecord): DocsNavLink {
  return {
    description: record.description,
    label: record.title,
    to: record.path,
  }
}

export const docsNavSections: readonly DocsNavSection[] = [
  {
    links: overviewDocs.map(toNavLink),
    title: 'Overview',
  },
  {
    links: designDocs.map(toNavLink),
    title: 'Design',
  },
  {
    links: componentDocs.map(toNavLink),
    title: 'Components',
  },
  {
    links: iconDocs.map(toNavLink),
    title: 'Icon',
  },
]

export const docsSearchLinks = docsNavSections.flatMap((section) =>
  section.links.map((link) => ({
    ...link,
    section: section.title,
  })),
)

export const docsLinearLinks = docsNavSections.flatMap((section) => section.links)

function normalizeDocPath(path: string) {
  if (path === '/docs/') {
    return '/docs'
  }

  return path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path
}

const docsByPath = new Map(docsRecords.map((record) => [normalizeDocPath(record.path), record]))
const docsByTitle = new Map(docsRecords.map((record) => [record.title, record]))

export function getDocByPath(path: string) {
  return docsByPath.get(normalizeDocPath(path))
}

export function getDocByTitle(title: string) {
  return docsByTitle.get(title)
}

export function getDocsPager(path: string) {
  const normalizedPath = normalizeDocPath(path)
  const index = docsLinearLinks.findIndex((link) => normalizeDocPath(link.to) === normalizedPath)

  return {
    next: index >= 0 ? docsLinearLinks[index + 1] : undefined,
    previous: index > 0 ? docsLinearLinks[index - 1] : undefined,
  }
}
