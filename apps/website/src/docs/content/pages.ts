import { completedComponentPages } from './completed-components'

export interface DocsExampleSpec {
  description?: string
  sourceId: string
  title: string
}

export interface DocsPageSpec {
  description: string
  examples: readonly DocsExampleSpec[]
  highlights?: readonly string[]
  path: string
  sourceId: string
  title: string
}

export const docsPages = [
  ...completedComponentPages,
  {
    path: '/docs/components/badge',
    title: 'Badge',
    description:
      'Badge 用于计数、状态点和角标展示，可独立渲染，也可以包裹按钮、头像或任意内联内容。',
    sourceId: 'components/badge/badge',
    highlights: [
      'count 支持数字、文本和 maxCount 溢出展示。',
      'dot 可渲染状态点，offset 可微调角标位置。',
      'BadgeIndicator 可作为独立徽标原语使用。',
    ],
    examples: [
      {
        title: '基础徽标',
        description: '独立徽标适合状态标签、计数摘要和列表中的轻量提示。',
        sourceId: 'components/badge/badge-basic',
      },
      {
        title: '角标',
        sourceId: 'components/badge/badge-corner',
      },
      {
        title: '尺寸与描边',
        sourceId: 'components/badge/badge-sizes',
      },
    ],
  },
  {
    path: '/docs/components/breadcrumb',
    title: 'Breadcrumb',
    description:
      'Breadcrumb 使用 nav、ol、li 和 aria-current 呈现当前位置层级，并通过 Radix Slot 支持 asChild 链接。',
    sourceId: 'components/breadcrumb/breadcrumb',
    highlights: [
      'BreadcrumbLink 默认渲染 a，也可 asChild 接入 TanStack Router Link。',
      'BreadcrumbPage 默认设置 aria-current="page"。',
      'BreadcrumbSeparator 与 BreadcrumbEllipsis 覆盖分隔符和折叠路径。',
    ],
    examples: [
      {
        title: '基础面包屑',
        description:
          '基础结构由 Breadcrumb、BreadcrumbList、BreadcrumbItem、BreadcrumbLink 和 BreadcrumbPage 组合。',
        sourceId: 'components/breadcrumb/breadcrumb-basic',
      },
      {
        title: '省略路径',
        sourceId: 'components/breadcrumb/breadcrumb-ellipsis',
      },
      {
        title: '自定义分隔符',
        sourceId: 'components/breadcrumb/breadcrumb-separator',
      },
    ],
  },
  {
    path: '/docs/components/button-normal',
    title: 'ButtonNormal',
    description: 'ButtonNormal 是更轻量的胶囊按钮，适合表单、工具栏或不需要 SVG 底形的场景。',
    sourceId: 'components/button-normal/button-normal',
    highlights: [
      'material 覆盖 default、primary、primarySoft、primaryMuted、primaryStrong、paper、stone 以及状态色。',
      'size 覆盖 small、middle、large。',
      'variant 覆盖 solid、outline、text，并展示 disabled。',
    ],
    examples: [
      {
        title: '材质与变体',
        sourceId: 'components/button-normal/button-normal-materials',
      },
      {
        title: '尺寸与禁用状态',
        sourceId: 'components/button-normal/button-normal-sizes',
      },
    ],
  },
  {
    path: '/docs/components/button',
    title: 'Button',
    description:
      'Button 使用 RocoShape 作为底形，支持多种语义材质、三种尺寸、solid/outline/text 变体、阴影和禁用状态。',
    sourceId: 'components/button/button',
    highlights: [
      'material 覆盖 default、primary、primarySoft、primaryMuted、primaryStrong、paper、stone 以及状态色。',
      'size 覆盖 small、middle、large。',
      'variant 覆盖 solid、outline、text，并展示 shadow 与 disabled。',
    ],
    examples: [
      {
        title: '材质与变体',
        description: '常用动作按钮建议使用 solid + shadow，次级动作使用 outline 或 text。',
        sourceId: 'components/button/button-materials',
      },
      {
        title: '尺寸与状态',
        sourceId: 'components/button/button-size',
      },
      {
        title: '紧凑按钮',
        description: '小尺寸按钮适合密集工具栏和紧凑操作区。',
        sourceId: 'components/button/button-compact',
      },
    ],
  },
  {
    path: '/docs/components/checkbox',
    title: 'Checkbox',
    description:
      'Checkbox 使用原生 input 承载表单语义，以 square RocoShape 作为底形，选中状态渲染外溢的 Check 图标。',
    sourceId: 'components/checkbox/checkbox',
    highlights: [
      'checked/defaultChecked 与 onChange 均可使用。',
      '默认使用 success 勾选图标与 stone 方形底框。',
      'checkMaterial、boxMaterial、size、variant、shadow 可组合出不同状态。',
    ],
    examples: [
      {
        title: '基础多选框',
        description: '默认会渲染隐藏的原生 checkbox input，外层 label 扩大点击区域。',
        sourceId: 'components/checkbox/checkbox-basic',
      },
      {
        title: '受控值',
        sourceId: 'components/checkbox/checkbox-controlled',
      },
      {
        title: '尺寸与描边',
        sourceId: 'components/checkbox/checkbox-sizes',
      },
    ],
  },
  {
    path: '/docs/components/divider',
    title: 'Divider',
    description:
      'Divider 用于分隔内容区块、菜单项和内联操作，支持水平/垂直方向、线型、粗细、颜色以及水平标题。',
    sourceId: 'components/divider/divider',
    highlights: [
      'orientation 覆盖 horizontal、vertical，并同步 aria-orientation。',
      'variant 支持 solid、dashed、dotted。',
      '水平分割线可放置文字，并通过 align 控制位置。',
    ],
    examples: [
      {
        title: '基础分割',
        sourceId: 'components/divider/divider-basic',
      },
      {
        title: '标题与线型',
        description: '带文字的 Divider 适合在长表单、设置项或任务日志里标记信息层级。',
        sourceId: 'components/divider/divider-label',
      },
      {
        title: '垂直分割',
        sourceId: 'components/divider/divider-vertical',
      },
    ],
  },
  {
    path: '/docs/components/drawer',
    title: 'Drawer',
    description:
      'Drawer 适合详情、公告、筛选器和移动端全屏面板，支持四个方向、遮罩、材质和 full 尺寸。',
    sourceId: 'components/drawer/drawer',
    highlights: [
      'side 覆盖 right、left、top、bottom。',
      'size 支持数字、CSS 长度和 full。',
      'overlay、closable、curve、material 可按场景组合。',
    ],
    examples: [
      {
        title: '四个方向',
        sourceId: 'components/drawer/drawer-sides',
      },
      {
        title: '全屏和无遮罩',
        sourceId: 'components/drawer/drawer-full',
      },
    ],
  },
  {
    path: '/docs/components/input',
    title: 'Input',
    description:
      'Input 使用与 Button 相同的 RocoShape stretch 底形，默认 material 为 stone，支持尺寸、前后缀、描边、阴影、禁用和只读状态。',
    sourceId: 'components/input/input',
    highlights: [
      '默认 material="stone"，可切换到 paper、primary、success、danger 等语义材质。',
      'shape 与 Button 一致，外层由 RocoShape 承载，真实输入仍保留原生 input 行为。',
      'size 覆盖 small、middle、large，可通过 prefix 和 suffix 放置短标签或单位。',
    ],
    examples: [
      {
        title: '基础用法',
        description: '默认输入框使用 stone 材质，适合放在纸面或浅色面板上。',
        sourceId: 'components/input/input-basic',
      },
      {
        title: '尺寸与前后缀',
        sourceId: 'components/input/input-affix',
      },
      {
        title: '状态与变体',
        description: 'outline 适合低强调字段；状态色可以直接通过 material 切换。',
        sourceId: 'components/input/input-state',
      },
    ],
  },
  {
    path: '/docs/components/layout',
    title: 'Layout',
    description:
      'Layout 是页面骨架组件，提供 Header、Sider、Content、Footer 四个区域，并与 Material 语义色和响应式方向配合。',
    sourceId: 'components/layout/layout',
    highlights: [
      'Layout 可嵌套，外层 horizontal 常用于侧栏布局。',
      'LayoutSider 支持 width、collapsed、collapsedWidth。',
      'LayoutHeader 和 LayoutFooter 支持高度变量，LayoutContent 可关闭默认 padding。',
    ],
    examples: [
      {
        title: '应用骨架',
        description: '典型两栏应用壳：左侧导航、上方标题栏、中间内容区和底部状态栏。',
        sourceId: 'components/layout/layout-shell',
      },
      {
        title: '折叠侧栏',
        sourceId: 'components/layout/layout-collapsed',
      },
    ],
  },
  {
    path: '/docs/components/modal',
    title: 'Modal',
    description:
      'Modal 基于 Radix Dialog，保留 Rocokingdom 游戏面板、标题栏、关闭按钮、描述和页脚动作。',
    sourceId: 'components/modal/modal',
    highlights: [
      'trigger、title、description、footer 是最常用组合。',
      'headerRuneText 可增加标题栏装饰文字。',
      '保留标题栏时建议使用默认关闭按钮位置；隐藏标题栏时可将关闭按钮放到面板外侧。',
      'header={false}、closable={false}、width 可覆盖特殊弹窗。',
    ],
    examples: [
      {
        title: '基础确认弹窗',
        sourceId: 'components/modal/modal-basic',
      },
      {
        title: '自定义头部和宽度',
        sourceId: 'components/modal/modal-custom-header',
      },
      {
        title: '隐藏可见头部',
        sourceId: 'components/modal/modal-headerless',
      },
    ],
  },
  {
    path: '/docs/components/panel',
    title: 'Panel',
    description: 'Panel 提供纸张和石材两种内容容器，并可用 SVG 曲线边缘模拟游戏面板。',
    sourceId: 'components/panel/panel',
    highlights: [
      'material 覆盖 paper、stone。',
      'curve 覆盖 none、left、right、both。',
      'curveInset 可调整内容避让曲线的距离。',
    ],
    examples: [
      {
        title: '基础容器',
        sourceId: 'components/panel/panel-basic',
      },
      {
        title: '曲线边缘',
        sourceId: 'components/panel/panel-curve',
      },
      {
        title: '自定义曲线避让',
        sourceId: 'components/panel/panel-inset',
      },
    ],
  },
  {
    path: '/docs/components/radio-group',
    title: 'RadioGroup',
    description:
      'RadioGroup 基于 Radix RadioGroup 封装，使用圆形 radio 控件承载互斥选择，并保留受控、非受控、表单和键盘语义。',
    sourceId: 'components/radio-group/radio-group',
    highlights: [
      'defaultValue 与 value/onValueChange 两种模式都可用。',
      'orientation 覆盖 horizontal、vertical。',
      'active/inactive 的 material、variant、shadow 可分别配置圆形控件。',
    ],
    examples: [
      {
        title: '基础单选组',
        description: '默认非受控用法会通过 Radix 的 radio input 保留表单提交能力。',
        sourceId: 'components/radio-group/radio-basic',
      },
      {
        title: '受控值',
        sourceId: 'components/radio-group/radio-controlled',
      },
      {
        title: '垂直方向与尺寸',
        sourceId: 'components/radio-group/radio-layout',
      },
    ],
  },
  {
    path: '/docs/components/rune-text',
    title: 'RuneText',
    description: 'RuneText 使用装饰字体渲染短英文标识，适合标题背景、水印和徽章。',
    sourceId: 'components/rune-text/rune-text',
    highlights: [
      'as 可切换渲染元素。',
      '默认使用 roco base 字体，font="rune" 可切换为装饰字体。',
      '继承当前颜色、字号和行高，使用 className 控制局部排版。',
      '适合短文本，不建议承载正文。',
    ],
    examples: [
      {
        title: '字号和颜色',
        sourceId: 'components/rune-text/rune-text-size',
      },
      {
        title: '字体选择',
        sourceId: 'components/rune-text/rune-text-font',
      },
      {
        title: '作为背景层',
        sourceId: 'components/rune-text/rune-text-background',
      },
    ],
  },
  {
    path: '/docs/components/select',
    title: 'Select',
    description:
      'Select 封装 Radix Select，提供游戏风格触发器和菜单，可用 options 快速渲染，也可组合低层子组件。',
    sourceId: 'components/select/select',
    highlights: [
      'options 覆盖普通项、禁用项和 placeholder。',
      'material 支持 stone、paper、primary 等主题材质。',
      'value/onValueChange 展示受控选择。',
      'SelectGroup、SelectLabel、SelectSeparator、SelectItem 可组合自定义菜单。',
    ],
    examples: [
      {
        title: '快速 options 用法',
        sourceId: 'components/select/select-options',
      },
      {
        title: '受控选择',
        sourceId: 'components/select/select-controlled',
      },
      {
        title: '组合式菜单',
        sourceId: 'components/select/select-composition',
      },
    ],
  },
  {
    path: '/docs/components/side-nav',
    title: 'SideNav',
    description: 'SideNav 提供游戏菜单样式，支持完整堆叠侧栏和窄轨图标栏。',
    sourceId: 'components/side-nav/side-nav',
    highlights: [
      'variant 覆盖 stack、rail。',
      'Header 支持 icon、eyebrow、title 或自定义 children。',
      'Item 覆盖 active、badge、dot badge、disabled 和 icon。',
    ],
    examples: [
      {
        title: '堆叠导航',
        sourceId: 'components/side-nav/side-nav-stack',
      },
      {
        title: '窄轨导航',
        sourceId: 'components/side-nav/side-nav-rail',
      },
    ],
  },
  {
    path: '/docs/components/slider',
    title: 'Slider',
    description:
      'Slider 基于 Radix Slider 封装，提供可访问的键盘交互、表单 input 和洛克王国风格的轨道、进度与竖向滑块。',
    sourceId: 'components/slider/slider',
    highlights: [
      'value/defaultValue、onValueChange 与 onValueCommit 均沿用 Radix Slider。',
      '默认使用 stoneMuted 轨道、primary 进度和 paper 滑块。',
      '支持单滑块、范围选择、横向/纵向、禁用和自定义材质。',
    ],
    examples: [
      {
        title: '基础滑块',
        description: '默认样式贴近参考图：灰色轨道、黄色进度、端帽和奶白色竖向圆角滑块。',
        sourceId: 'components/slider/slider-basic',
      },
      {
        title: '受控值',
        sourceId: 'components/slider/slider-controlled',
      },
      {
        title: '范围与尺寸',
        sourceId: 'components/slider/slider-range',
      },
    ],
  },
  {
    path: '/docs/components/space',
    title: 'Space / Stack',
    description:
      'Space 和 Stack 负责统一组件之间的距离、对齐、换行和分隔符，适合按钮组、标签组、表单段落和面板内部结构。',
    sourceId: 'components/space/space',
    highlights: [
      'Space 默认 horizontal + inline-flex，适合紧凑横向编排。',
      'Stack 默认 vertical + block，适合纵向内容组。',
      'size 支持预设、数字、CSS 字符串和 [horizontal, vertical] 元组。',
    ],
    examples: [
      {
        title: '横向间距',
        sourceId: 'components/space/space-basic',
      },
      {
        title: '分隔符与换行',
        description: 'split 会插入到相邻子元素之间，适合元信息、面包屑片段和短标签。',
        sourceId: 'components/space/space-split',
      },
      {
        title: '纵向堆叠',
        sourceId: 'components/space/stack',
      },
    ],
  },
  {
    path: '/docs/components/switch',
    title: 'Switch',
    description:
      'Switch 使用原生 checkbox input 承载表单语义，并以 stretch RocoShape 作为轨道，适合即时开启或关闭设置。',
    sourceId: 'components/switch/switch',
    highlights: [
      'checked/defaultChecked、onChange 与 onCheckedChange 均可使用。',
      '默认开启状态使用 success 轨道，关闭状态使用 stone 轨道。',
      'checkedMaterial、uncheckedMaterial、thumbMaterial 和 size 可组合状态视觉。',
    ],
    examples: [
      {
        title: '基础开关',
        description: '默认会渲染隐藏的原生 checkbox input，外层 label 扩大点击区域。',
        sourceId: 'components/switch/switch-basic',
      },
      {
        title: '受控值',
        sourceId: 'components/switch/switch-controlled',
      },
      {
        title: '尺寸与材质',
        sourceId: 'components/switch/switch-sizes',
      },
    ],
  },
  {
    path: '/docs/components/tabs',
    title: 'Tabs',
    description:
      'Tabs 是按钮造型的标签页组件，外层 TabList 和选中 Tab 都使用与 Button 一致的 RocoShape stretch 底形。外层用底色承载，不提供描边样式。',
    sourceId: 'components/tabs/tabs',
    highlights: [
      '支持 defaultValue 与 value/onValueChange 两种模式。',
      'TabList 默认使用 stoneSoft 实心底色，选中 Tab 使用 solid shape。',
      '未选中 Tab 使用前景色，深色和浅色底都能保持可读。',
    ],
    examples: [
      {
        title: '基础标签页',
        description: '默认外层使用浅石色底形，选中项使用默认主色实心底形。',
        sourceId: 'components/tabs/tabs-basic',
      },
      {
        title: '受控值与材质',
        sourceId: 'components/tabs/tabs-controlled',
      },
      {
        title: '尺寸与紧凑间距',
        sourceId: 'components/tabs/tabs-size',
      },
    ],
  },
  {
    path: '/docs/components/textarea',
    title: 'Textarea',
    description:
      'Textarea 使用专用四角不规则容器形状：四个角保持固定曲线，四条边和中间区域随宽高自由伸展。',
    sourceId: 'components/textarea/textarea',
    highlights: [
      '不同于 Button 的左右端帽，TextareaFrame 会同时处理四个角。',
      'material、variant、size、resize 和 shadow 可组合出不同输入区域。',
      'showCount 会根据当前值和 maxLength 显示字数统计。',
    ],
    examples: [
      {
        title: '基础文本域',
        description: '默认使用 stone 材质，适合浅色纸面上的任务记录、备注或长文本输入。',
        sourceId: 'components/textarea/textarea-basic',
      },
      {
        title: '自由尺寸',
        description: '可以通过 style 直接控制根容器宽高，四角不会被整块拉伸。',
        sourceId: 'components/textarea/textarea-size',
      },
      {
        title: '状态与变体',
        sourceId: 'components/textarea/textarea-state',
      },
    ],
  },
  {
    path: '/docs/components/toggle-group',
    title: 'ToggleGroup',
    description:
      'ToggleGroup 是按钮风格的单选切换组，默认未选中项使用 stone，选中项使用 paper，并在选中时拉宽底形。',
    sourceId: 'components/toggle-group/toggle-group',
    highlights: [
      'selectedMaterial 和 unselectedMaterial 可分别配置选中、未选中的材质。',
      'value/onValueChange 与 defaultValue 都可用。',
      'orientation、size、shadow 与 Button 风格保持一致。',
    ],
    examples: [
      {
        title: '基础切换组',
        description: '默认材质下，选中的按钮会从 stone 切到 paper，同时增加宽度和内边距。',
        sourceId: 'components/toggle-group/toggle-basic',
      },
      {
        title: '受控值与材质',
        sourceId: 'components/toggle-group/toggle-controlled',
      },
      {
        title: '垂直方向与尺寸',
        sourceId: 'components/toggle-group/toggle-layout',
      },
    ],
  },
  {
    path: '/docs/design/material',
    title: 'Material',
    description: 'Material 是颜色表面原语，负责把 Rocokingdom 色板或自定义色值注入到任意元素。',
    sourceId: 'design/material/material',
    highlights: [
      'material 覆盖 primary、paper、stone 的 base、soft、muted、strong，以及状态色。',
      'default 等同 primary，适合作为主操作表面。',
      'as 可切换渲染元素。',
      'background 和 color 可用于一次性自定义表面。',
    ],
    examples: [
      {
        title: '预设材质',
        sourceId: 'design/material/material-presets',
      },
      {
        title: '状态材质',
        sourceId: 'design/material/material-state',
      },
      {
        title: '自定义表面',
        sourceId: 'design/material/material-custom',
      },
    ],
  },
  {
    path: '/docs/design/roco-shape',
    title: 'RocoShape',
    description:
      'RocoShape 是可拉伸的造型表面，左右弧线保持比例，中间区域自动延展，也可以直接承载文字内容。',
    sourceId: 'design/roco-shape/roco-shape',
    highlights: [
      'shape 覆盖 stretch、circle、square。',
      'variant 覆盖 solid、outline。',
      'shadow 仅对实心填充生效。',
      'children 会自动生成内容层，不需要手写 position、inset 或 z-index。',
      'Material 可以通过 asChild 提供表面变量，RocoShape 负责消费这些颜色。',
    ],
    examples: [
      {
        title: '实心与描边',
        sourceId: 'design/roco-shape/roco-shape-variant',
      },
      {
        title: '圆形与正方形',
        sourceId: 'design/roco-shape/roco-shape-fixed',
      },
      {
        title: '文字背景',
        sourceId: 'design/roco-shape/roco-shape-text',
      },
      {
        title: '材质与自定义颜色',
        sourceId: 'design/roco-shape/roco-shape-material',
      },
    ],
  },
  {
    path: '/docs/icon',
    title: 'Icons',
    description: 'Icons 提供填充风格 SVG 组件，默认尺寸为 1em，颜色继承 currentColor。',
    sourceId: 'icon/icons',
    highlights: [
      '组件名不带 Icon 后缀：Check、Cross。',
      '同时导出 RocoCheck、RocoCross 作为同组件别名。',
      'SVG 使用 fill=currentColor，无 stroke，可用文本颜色和字号控制外观。',
    ],
    examples: [
      {
        title: '基础图标',
        description: '图标会继承父级文本颜色，可直接配合 Tailwind text-* 和 text-[size] 使用。',
        sourceId: 'icon/icons-basic',
      },
      {
        title: 'Roco 别名',
        description: '别名导出和基础导出指向同一个组件，适合在业务侧统一使用 Roco 前缀。',
        sourceId: 'icon/icons-alias',
      },
      {
        title: '尺寸',
        sourceId: 'icon/icons-size',
      },
    ],
  },
  {
    path: '/docs/overview/roco-theme',
    title: 'RocoTheme',
    description: 'RocoTheme 渲染一个主题作用域元素，把 colors 映射成该作用域上的 --rk-* CSS 变量。',
    sourceId: 'overview/roco-theme/theme',
    highlights: [
      'colors 可覆盖基础色、语义色及对应前景色。',
      '变量会被子树继承，嵌套 RocoTheme 可以覆盖最近作用域。',
      '默认主题仍由 style.css 的 :root 变量提供，局部主题只影响被包裹内容。',
    ],
    examples: [
      {
        title: '默认主题',
        sourceId: 'overview/roco-theme/theme-default',
      },
      {
        title: '运行时主题切换',
        description:
          '启用后，只有被 RocoTheme 包裹的面板读取新的 --rk-* 颜色；关闭后回到外层默认变量。',
        sourceId: 'overview/roco-theme/theme-runtime',
      },
      {
        title: '嵌套主题',
        description: '内层作用域只覆盖自己的子树，外层按钮继续读取蓝色变量。',
        sourceId: 'overview/roco-theme/theme-nested',
      },
    ],
  },
] as const satisfies readonly DocsPageSpec[]

const docsPagesByPath = new Map<string, DocsPageSpec>(docsPages.map((page) => [page.path, page]))

export function getDocsPageSpec(path: string) {
  return docsPagesByPath.get(path)
}
