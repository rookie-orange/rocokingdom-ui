interface CompletedComponentProp {
  defaultValue?: string
  description: string
  name: string
  required?: boolean
  type: string
}

interface CompletedComponentDefinition {
  description: string
  highlights: readonly string[]
  importName: string
  props: readonly CompletedComponentProp[]
  slug: string
  source: string
  title: string
}

const materialProp = {
  description: '选择语义材质，并通过 --rk-material-* 变量传递表面与前景色。',
  name: 'material',
  type: 'MaterialPreset',
} as const

const controlledProp = (type: string): CompletedComponentProp => ({
  description: '受控值；配合对应的 onChange / onValueChange 回调使用。',
  name: 'value',
  type,
})

export const completedComponentDefinitions = [
  {
    slug: 'input-number',
    title: 'InputNumber',
    importName: 'InputNumber',
    source: 'packages/ui/src/input-number',
    description: '带不规则方形步进按钮的数字输入，支持范围、精度、格式化与受控值。',
    highlights: [
      '加减按钮使用 RocoShape square。',
      '输入区读取 Material 变量。',
      '保留 spinbutton 语义。',
    ],
    props: [
      controlledProp('number'),
      { name: 'min / max / step', type: 'number', description: '约束输入范围与步进值。' },
    ],
  },
  {
    slug: 'date-picker',
    title: 'DatePicker',
    importName: 'DatePicker',
    source: 'packages/ui/src/advanced-form',
    description: '基于 Radix Popover 与 react-day-picker 的日期选择器，覆盖单值与日期范围。',
    highlights: [
      'mode="range" 渲染起止日期。',
      'DayPicker 提供月份导航、范围选择、禁用日期与键盘能力。',
      '尺寸、材质和描边可组合。',
    ],
    props: [
      controlledProp('string | readonly [string, string]'),
      {
        name: 'mode',
        type: "'single' | 'range'",
        defaultValue: "'single'",
        description: '选择单日期或日期范围。',
      },
      {
        name: 'min / max / disabledDates',
        type: 'string | Matcher | Matcher[]',
        description: '约束可选日期并禁用不可用日期。',
      },
    ],
  },
  {
    slug: 'time-picker',
    title: 'TimePicker',
    importName: 'TimePicker',
    source: 'packages/ui/src/advanced-form',
    description: '支持单时间、时间范围、秒级精度和快捷选项的时间选择器。',
    highlights: [
      'Radix Select 提供小时、分钟、秒的可键盘时间面板。',
      'presets 提供常用时间快捷入口。',
      'range 模式自动约束结束时间。',
    ],
    props: [
      controlledProp('string | readonly [string, string]'),
      {
        name: 'presets',
        type: 'readonly TimePickerPreset[]',
        description: '渲染常用时间快捷按钮。',
      },
      {
        name: 'showSeconds / minuteStep',
        type: 'boolean | number',
        description: '开启秒选择并设置分钟步长。',
      },
    ],
  },
  {
    slug: 'upload',
    title: 'Upload',
    importName: 'Upload',
    source: 'packages/ui/src/advanced-form',
    description: '文件选择与拖拽上传入口，包含上传前检查、数量限制和可移除文件列表。',
    highlights: [
      'variant="drag" 提供拖放区域。',
      'beforeUpload 支持同步或异步检查。',
      '文件列表可受控。',
    ],
    props: [
      { name: 'fileList', type: 'readonly File[]', description: '受控文件列表。' },
      {
        name: 'beforeUpload',
        type: '(file: File) => boolean | Promise<boolean>',
        description: '文件进入列表前的检查。',
      },
    ],
  },
  {
    slug: 'form',
    title: 'Form',
    importName: 'Form',
    source: 'packages/ui/src/advanced-form',
    description: '负责字段布局、原生校验、提交态和 FormData 归一化的表单容器。',
    highlights: [
      'FormItem 统一标签、帮助和错误信息。',
      '提交时尊重原生 required 等约束。',
      '支持纵向、横向与行内布局。',
    ],
    props: [
      {
        name: 'onFinish',
        type: '(values: FormValues, event) => void',
        description: '校验通过后的提交回调。',
      },
      {
        name: 'layout',
        type: "'vertical' | 'horizontal' | 'inline'",
        defaultValue: "'vertical'",
        description: '字段排列方向。',
      },
    ],
  },
  {
    slug: 'autocomplete',
    title: 'Autocomplete',
    importName: 'Autocomplete',
    source: 'packages/ui/src/advanced-form',
    description: '带延迟过滤、键盘高亮和 listbox 语义的搜索建议输入。',
    highlights: [
      'cmdk 负责候选过滤、活动项与键盘选择。',
      'Radix Popover 管理定位、Escape 与焦点回归。',
      '支持自定义过滤函数。',
    ],
    props: [
      controlledProp('string'),
      {
        name: 'options',
        type: 'readonly (AutocompleteOption | string)[]',
        required: true,
        description: '候选项列表。',
      },
    ],
  },
  {
    slug: 'menu',
    title: 'Menu',
    importName: 'Menu',
    source: 'packages/ui/src/navigation',
    description: '基于 Radix Navigation Menu 的横向或纵向菜单，支持激活、图标和禁用项。',
    highlights: [
      'Radix 管理导航结构和焦点语义。',
      '激活项使用 RocoShape 与 Material。',
      'items 和组合式 MenuItem 均可用。',
    ],
    props: [
      controlledProp('string'),
      { name: 'items', type: 'readonly MenuItemData[]', description: '快速渲染菜单项。' },
    ],
  },
  {
    slug: 'pagination',
    title: 'Pagination',
    importName: 'Pagination',
    source: 'packages/ui/src/navigation',
    description: '带页码折叠、前后翻页和快速跳转的分页组件。',
    highlights: ['当前页使用 RocoShape square 强调。', '自动压缩长页码区间。', '支持受控页码。'],
    props: [
      { name: 'total', type: 'number', required: true, description: '数据总数。' },
      { name: 'current / pageSize', type: 'number', description: '当前页与每页数量。' },
    ],
  },
  {
    slug: 'steps',
    title: 'Steps',
    importName: 'Steps',
    source: 'packages/ui/src/navigation',
    description: '展示等待、进行、完成和错误状态的横向或纵向步骤条。',
    highlights: [
      '步骤节点使用 RocoShape circle。',
      '完成线与状态材质同步。',
      '可点击步骤通过 onChange 受控。',
    ],
    props: [
      {
        name: 'items',
        type: 'readonly StepItem[]',
        required: true,
        description: '步骤标题、描述和显式状态。',
      },
      { name: 'current', type: 'number', defaultValue: '0', description: '当前步骤索引。' },
    ],
  },
  {
    slug: 'anchor',
    title: 'Anchor',
    importName: 'Anchor',
    source: 'packages/ui/src/navigation',
    description: '支持嵌套层级、平滑滚动和顶部偏移的页内锚点导航。',
    highlights: ['使用真实 href 保留链接语义。', 'activeKey 可受控。', 'offset 适配固定头部。'],
    props: [
      { name: 'items', type: 'readonly AnchorItem[]', required: true, description: '锚点树。' },
      { name: 'offset', type: 'number', defaultValue: '0', description: '滚动定位的顶部偏移。' },
    ],
  },
  {
    slug: 'command',
    title: 'Command',
    importName: 'Command',
    source: 'packages/ui/src/command',
    description: '支持分组、过滤、快捷键和完整键盘选择的命令面板。',
    highlights: [
      '默认监听 Command/Ctrl + K。',
      'cmdk 负责过滤、循环键盘导航与活动项。',
      'Radix Dialog 管理模态焦点、Escape 与 Portal。',
      '激活项由 RocoShape 强调。',
    ],
    props: [
      {
        name: 'items',
        type: 'readonly CommandItem[]',
        required: true,
        description: '命令、关键词、分组和快捷键。',
      },
      { name: 'open', type: 'boolean', description: '受控打开状态。' },
    ],
  },
  {
    slug: 'tooltip',
    title: 'Tooltip',
    importName: 'Tooltip',
    source: 'packages/ui/src/overlay',
    description: '基于 Radix Tooltip 的短文本提示，具备延迟、碰撞处理和焦点支持。',
    highlights: [
      'Radix 管理悬停、焦点与 Portal。',
      '内容使用 RocoShape 与 Material。',
      '支持八个常用方位。',
    ],
    props: [
      { name: 'content', type: 'ReactNode', required: true, description: '提示内容。' },
      { name: 'delay', type: 'number', defaultValue: '320', description: '打开延迟，单位毫秒。' },
    ],
  },
  {
    slug: 'popover',
    title: 'Popover',
    importName: 'Popover',
    source: 'packages/ui/src/overlay',
    description: '基于 Radix Popover 的交互浮层，支持标题、关闭、定位与外部点击。',
    highlights: [
      'Radix 负责焦点、Escape 和碰撞定位。',
      '内容表面读取 Material。',
      '可受控或非受控打开。',
    ],
    props: [
      {
        name: 'trigger / content',
        type: 'ReactNode',
        required: true,
        description: '触发器与浮层内容。',
      },
      {
        name: 'placement',
        type: 'OverlayPlacement',
        defaultValue: "'bottom'",
        description: '首选弹出方向。',
      },
    ],
  },
  {
    slug: 'message',
    title: 'Toast / Message',
    importName: 'Message',
    source: 'packages/ui/src/overlay',
    description: '基于 Radix Toast 的全局轻提示，支持状态快捷方法、持续时间和滑动关闭。',
    highlights: [
      'MessageProvider 提供命令式 API。',
      'Radix 管理计时、播报和滑动手势。',
      '状态映射到语义 Material。',
    ],
    props: [
      {
        name: 'status',
        type: 'MessageStatus',
        defaultValue: "'info'",
        description: '信息、成功、警告、危险或加载状态。',
      },
      {
        name: 'duration',
        type: 'number',
        defaultValue: '3000',
        description: 'Provider 消息显示时长；0 表示持续显示。',
      },
    ],
  },
  {
    slug: 'notification',
    title: 'Notification',
    importName: 'Notification',
    source: 'packages/ui/src/overlay',
    description: '支持标题、描述、操作和手动关闭的通知卡片与全局通知队列。',
    highlights: [
      'NotificationProvider 管理队列。',
      '基于 Radix Toast 获得播报和滑动关闭。',
      '状态图标使用圆形 RocoShape。',
    ],
    props: [
      { name: 'title', type: 'ReactNode', required: true, description: '通知标题。' },
      { name: 'description / action', type: 'ReactNode', description: '详情与可选操作区。' },
    ],
  },
  {
    slug: 'alert',
    title: 'Alert',
    importName: 'Alert',
    source: 'packages/ui/src/feedback',
    description: '页面内的成功、信息、警告与危险提示，支持操作区和关闭。',
    highlights: [
      '整体使用可拉伸 RocoShape。',
      '状态自动选择 Material。',
      '危险状态使用 alert 语义。',
    ],
    props: [
      { name: 'title', type: 'ReactNode', required: true, description: '提示标题。' },
      { name: 'status', type: 'FeedbackStatus', defaultValue: "'info'", description: '语义状态。' },
    ],
  },
  {
    slug: 'spin',
    title: 'Spin / Loading',
    importName: 'Spin',
    source: 'packages/ui/src/feedback',
    description: '独立或覆盖内容的加载状态，使用不规则圆形作为旋转指示器。',
    highlights: ['支持内容遮罩。', '遵循 reduced-motion。', 'label 提供无障碍状态文本。'],
    props: [
      { name: 'spinning', type: 'boolean', defaultValue: 'true', description: '是否显示加载态。' },
      { name: 'delay', type: 'number', defaultValue: '0', description: '动画延迟。' },
    ],
  },
  {
    slug: 'skeleton',
    title: 'Skeleton',
    importName: 'Skeleton',
    source: 'packages/ui/src/feedback',
    description: '等待内容时使用的圆形、圆角和方形骨架占位。',
    highlights: ['宽高支持数字或 CSS 字符串。', 'active 提供扫光动画。', '材质可跟随所在表面。'],
    props: [
      {
        name: 'shape',
        type: "'circle' | 'round' | 'square'",
        defaultValue: "'round'",
        description: '占位形态。',
      },
      { name: 'width / height', type: 'number | string', description: '稳定占位尺寸。' },
    ],
  },
  {
    slug: 'progress',
    title: 'Progress',
    importName: 'Progress',
    source: 'packages/ui/src/feedback',
    description: '基于 Radix Progress 的线性与环形进度，支持状态材质和自定义文本。',
    highlights: [
      'Radix 提供 progressbar 语义。',
      '线性进度使用可拉伸 RocoShape。',
      '支持 success 与 danger 状态。',
    ],
    props: [
      { name: 'percent', type: 'number', defaultValue: '0', description: '0 到 100 的进度。' },
      {
        name: 'type',
        type: "'line' | 'circle'",
        defaultValue: "'line'",
        description: '进度形态。',
      },
    ],
  },
  {
    slug: 'result',
    title: 'Empty / Result',
    importName: 'Result',
    source: 'packages/ui/src/feedback',
    description: '用于空数据、成功、错误和完成页面的结果展示。',
    highlights: [
      'Empty 是 Result 的空状态预设。',
      '语义图标使用圆形 RocoShape。',
      'extra 承载后续操作。',
    ],
    props: [
      { name: 'title', type: 'ReactNode', required: true, description: '结果标题。' },
      { name: 'status', type: 'FeedbackStatus', defaultValue: "'info'", description: '结果状态。' },
    ],
  },
  {
    slug: 'table',
    title: 'Table',
    importName: 'Table',
    source: 'packages/ui/src/data-rich',
    description: '支持排序、筛选、固定列、加载骨架与空状态的数据表格。',
    highlights: [
      '泛型 columns 保持行数据类型。',
      '排序与筛选状态统一回调。',
      '固定列在横向滚动中保持可见。',
    ],
    props: [
      {
        name: 'columns',
        type: 'readonly TableColumn<RecordType>[]',
        required: true,
        description: '列定义。',
      },
      {
        name: 'dataSource / rowKey',
        type: 'readonly RecordType[] / keyof RecordType | function',
        required: true,
        description: '行数据与稳定键。',
      },
    ],
  },
  {
    slug: 'list',
    title: 'List',
    importName: 'List',
    source: 'packages/ui/src/data-display',
    description: '带头尾、分割线、加载态、操作区和元信息布局的列表。',
    highlights: [
      'dataSource 与 renderItem 快速渲染。',
      'ListItem 支持 actions 与 extra。',
      'Material 提供列表表面。',
    ],
    props: [
      { name: 'dataSource', type: 'readonly Item[]', description: '列表数据。' },
      { name: 'renderItem', type: '(item, index) => ReactNode', description: '数据项渲染函数。' },
    ],
  },
  {
    slug: 'descriptions',
    title: 'Descriptions',
    importName: 'Descriptions',
    source: 'packages/ui/src/data-display',
    description: '用于详情字段与键值信息的响应式描述列表。',
    highlights: ['column 控制桌面列数。', '单项 span 支持跨列。', '移动端自动回到单列。'],
    props: [
      {
        name: 'items',
        type: 'readonly DescriptionItem[]',
        required: true,
        description: '标签、值与跨列信息。',
      },
      {
        name: 'layout',
        type: "'horizontal' | 'vertical'",
        defaultValue: "'horizontal'",
        description: '标签和值的排列。',
      },
    ],
  },
  {
    slug: 'avatar',
    title: 'Avatar',
    importName: 'Avatar',
    source: 'packages/ui/src/data-display',
    description: '基于 Radix Avatar 的图片、回退文本和组合头像。',
    highlights: [
      'Radix 处理图片加载与回退时序。',
      '圆形或方形均使用 RocoShape。',
      'AvatarGroup 提供溢出计数。',
    ],
    props: [
      { name: 'src / alt / fallback', type: 'string / ReactNode', description: '图片与回退内容。' },
      {
        name: 'size',
        type: "'small' | 'middle' | 'large' | number",
        defaultValue: "'middle'",
        description: '预设或自定义尺寸。',
      },
    ],
  },
  {
    slug: 'tag',
    title: 'Tag / Chip',
    importName: 'Tag',
    source: 'packages/ui/src/data-display',
    description: '使用可拉伸底形的分类或状态标签，支持关闭、尺寸和描边。',
    highlights: [
      'RocoShape 保持动态文本两端曲线。',
      'Material 控制状态色。',
      '关闭按钮阻止父级点击。',
    ],
    props: [
      materialProp,
      {
        name: 'closable / onClose',
        type: 'boolean / () => void',
        description: '是否显示关闭动作及其回调。',
      },
    ],
  },
  {
    slug: 'accordion',
    title: 'Accordion / Collapse',
    importName: 'Accordion',
    source: 'packages/ui/src/data-rich',
    description: '基于 Radix Accordion 的单开或多开折叠面板。',
    highlights: [
      'Radix 管理键盘导航与展开状态。',
      '打开项使用 RocoShape outline。',
      'Collapse 是同组件别名。',
    ],
    props: [
      {
        name: 'items',
        type: 'readonly AccordionItem[]',
        required: true,
        description: '面板标题、内容和禁用状态。',
      },
      {
        name: 'multiple',
        type: 'boolean',
        defaultValue: 'false',
        description: '是否允许多个面板同时展开。',
      },
    ],
  },
  {
    slug: 'tree',
    title: 'Tree',
    importName: 'Tree',
    source: 'packages/ui/src/data-rich',
    description: '支持递归层级、展开、选择、勾选和连接线的树。',
    highlights: [
      '使用 tree/treeitem/group 语义。',
      '展开、选择和勾选均可受控。',
      '勾选框使用方形 RocoShape。',
    ],
    props: [
      {
        name: 'treeData',
        type: 'readonly TreeNodeData[]',
        required: true,
        description: '递归节点数据。',
      },
      {
        name: 'expandedKeys / checkedKeys / selectedKey',
        type: 'controlled keys',
        description: '受控树状态。',
      },
    ],
  },
  {
    slug: 'timeline',
    title: 'Timeline',
    importName: 'Timeline',
    source: 'packages/ui/src/data-display',
    description: '用于任务记录与事件流的纵向时间轴。',
    highlights: [
      '节点使用圆形 RocoShape。',
      '每项可提供时间、标题、正文和自定义点。',
      'pending 追加等待项。',
    ],
    props: [
      {
        name: 'items',
        type: 'readonly TimelineItemData[]',
        required: true,
        description: '时间轴事件。',
      },
      { name: 'pending', type: 'ReactNode', description: '末尾等待状态。' },
    ],
  },
  {
    slug: 'carousel',
    title: 'Carousel',
    importName: 'Carousel',
    source: 'packages/ui/src/data-rich',
    description: '支持自动播放、循环、方向按钮和指示器的轮播。',
    highlights: [
      'Embla 提供拖拽、惯性滚动、循环与滚动快照。',
      '悬停暂停自动播放。',
      '方向按钮使用圆形 RocoShape。',
    ],
    props: [
      { name: 'items', type: 'readonly ReactNode[]', required: true, description: '轮播内容。' },
      {
        name: 'autoplay',
        type: 'boolean | number',
        defaultValue: 'false',
        description: '自动播放开关或间隔毫秒数。',
      },
    ],
  },
  {
    slug: 'image',
    title: 'Image',
    importName: 'Image',
    source: 'packages/ui/src/data-rich',
    description: '带加载占位、失败回退和全屏缩放旋转预览的图片。',
    highlights: [
      '加载阶段使用 Skeleton。',
      '失败时提供可替换回退。',
      '预览工具栏支持缩放、旋转和关闭。',
    ],
    props: [
      { name: 'src / alt', type: 'string', required: true, description: '图片地址与替代文本。' },
      { name: 'preview', type: 'boolean', defaultValue: 'true', description: '是否允许点击预览。' },
    ],
  },
  {
    slug: 'statistic',
    title: 'Statistic',
    importName: 'Statistic',
    source: 'packages/ui/src/data-display',
    description: '展示数字指标、单位、精度和趋势方向的统计数值。',
    highlights: [
      '数字使用装饰字体强调。',
      '支持格式化函数和本地化分组。',
      '趋势图标自动使用状态色。',
    ],
    props: [
      { name: 'value', type: 'number | string', required: true, description: '指标值。' },
      { name: 'trend', type: "'up' | 'down'", description: '趋势方向。' },
    ],
  },
] as const satisfies readonly CompletedComponentDefinition[]

export const completedComponentRecords = completedComponentDefinitions.map((definition) => ({
  category: 'components' as const,
  description: definition.description,
  importName: definition.importName,
  notes: definition.highlights,
  packageName: 'rocokingdom-ui',
  path: `/docs/components/${definition.slug}`,
  props: definition.props,
  slug: definition.slug,
  source: definition.source,
  status: 'beta' as const,
  title: definition.title,
}))

export const completedComponentPages = completedComponentDefinitions.map((definition) => ({
  description: definition.description,
  examples: [
    {
      sourceId: `components/${definition.slug}/${definition.slug}`,
      title: `${definition.title} 示例`,
    },
  ],
  highlights: definition.highlights,
  path: `/docs/components/${definition.slug}`,
  sourceId: `components/${definition.slug}/${definition.slug}`,
  title: definition.title,
}))
