import { Link, createFileRoute } from '@tanstack/react-router'
import { Checkbox, RuneText } from 'rocokingdom-ui'
import { componentExamples, examples } from '../examples/catalog'

interface ComponentTodoItem {
  description: string
  implementedSlug?: string
  name: string
}

interface ComponentTodoGroup {
  items: readonly ComponentTodoItem[]
  title: string
}

const cardTones = [
  {
    action: 'group-hover:bg-primary group-hover:text-on-primary',
    badge: 'bg-primary/20 text-on-paper',
    border: 'hover:border-primary',
    marker: 'bg-primary',
  },
  {
    action: 'group-hover:bg-primary-muted group-hover:text-on-primary-muted',
    badge: 'bg-primary-soft text-on-primary-soft',
    border: 'hover:border-primary-muted',
    marker: 'bg-primary-muted',
  },
  {
    action: 'group-hover:bg-primary-strong group-hover:text-on-primary-strong',
    badge: 'bg-primary-muted/20 text-primary-strong',
    border: 'hover:border-primary-strong',
    marker: 'bg-primary-strong',
  },
  {
    action: 'group-hover:bg-success group-hover:text-on-success',
    badge: 'bg-success/15 text-success',
    border: 'hover:border-success',
    marker: 'bg-success',
  },
  {
    action: 'group-hover:bg-danger group-hover:text-on-danger',
    badge: 'bg-danger/15 text-danger',
    border: 'hover:border-danger',
    marker: 'bg-danger',
  },
]

const componentTodoGroups: readonly ComponentTodoGroup[] = [
  {
    title: '基础与样式',
    items: [
      {
        description: '操作入口，覆盖尺寸、材质、禁用和强调状态。',
        implementedSlug: 'button',
        name: 'Button 按钮',
      },
      {
        description: '传统胶囊按钮，作为轻量操作的兼容形态。',
        implementedSlug: 'button-normal',
        name: 'ButtonNormal 传统按钮',
      },
      {
        description: '图标资产、尺寸规范和语义颜色映射。',
        implementedSlug: 'icons',
        name: 'Icon 图标',
      },
      {
        description: '标题、正文、辅助文字和装饰文字体系。',
        implementedSlug: 'rune-text',
        name: 'Typography 文字',
      },
      {
        description: '设计 token、主题变量和局部主题作用域。',
        implementedSlug: 'roco-theme',
        name: 'Theme 主题',
      },
      {
        description: '颜色表面原语，用于统一背景和前景色。',
        implementedSlug: 'material',
        name: 'Material 材质',
      },
      {
        description: '可拉伸造型原语，用于承载按钮和面板视觉。',
        implementedSlug: 'roco-shape',
        name: 'Shape 造型',
      },
      {
        description: '卡片、容器和游戏面板类内容承载。',
        implementedSlug: 'panel',
        name: 'Panel / Card 面板',
      },
      {
        description: '分割内容区块或菜单项。',
        name: 'Divider 分割线',
      },
      {
        description: '标准化行列间距、堆叠和内联布局。',
        name: 'Space / Stack 间距',
      },
      {
        description: '页面骨架、栅格、两栏和响应式布局。',
        name: 'Layout 布局',
      },
    ],
  },
  {
    title: '表单与输入',
    items: [
      {
        description: '单行文本、前后缀、错误和禁用状态。',
        implementedSlug: 'input',
        name: 'Input 输入框',
      },
      {
        description: '多行文本、计数和自适应高度。',
        name: 'Textarea 文本域',
      },
      {
        description: '下拉选择、分组、禁用项和自定义选项。',
        implementedSlug: 'select',
        name: 'Select 选择器',
      },
      {
        description: '布尔选择、半选和表单联动。',
        implementedSlug: 'checkbox',
        name: 'Checkbox 多选框',
      },
      {
        description: '互斥选择，支持横向、纵向和键盘导航。',
        implementedSlug: 'radio-group',
        name: 'RadioGroup 单选组',
      },
      {
        description: '二元开关，适合即时启用或关闭设置。',
        name: 'Switch 开关',
      },
      {
        description: '范围选择、步进值和标记刻度。',
        name: 'Slider 滑块',
      },
      {
        description: '数字输入、步进器和数值格式化。',
        name: 'InputNumber 数字输入',
      },
      {
        description: '日期、日期范围和日历面板。',
        name: 'DatePicker 日期选择',
      },
      {
        description: '时间、时间范围和快捷选项。',
        name: 'TimePicker 时间选择',
      },
      {
        description: '文件选择、拖拽上传和上传列表。',
        name: 'Upload 上传',
      },
      {
        description: '字段布局、校验信息和提交状态。',
        name: 'Form 表单',
      },
      {
        description: '搜索建议、过滤和键盘选择。',
        name: 'Autocomplete 自动完成',
      },
    ],
  },
  {
    title: '导航',
    items: [
      {
        description: '侧边导航、窄轨模式、徽标和禁用项。',
        implementedSlug: 'side-nav',
        name: 'SideNav 侧边导航',
      },
      {
        description: '顶部或上下文菜单，支持分组和激活态。',
        name: 'Menu 菜单',
      },
      {
        description: '同层内容切换和受控激活状态。',
        implementedSlug: 'tabs',
        name: 'Tabs 标签页',
      },
      {
        description: '当前位置层级和返回上级入口。',
        name: 'Breadcrumb 面包屑',
      },
      {
        description: '列表分页、页码、跳转和每页数量。',
        name: 'Pagination 分页',
      },
      {
        description: '流程步骤、当前步骤和完成状态。',
        name: 'Steps 步骤条',
      },
      {
        description: '锚点导航和滚动定位。',
        name: 'Anchor 锚点',
      },
      {
        description: '命令搜索、快捷操作和键盘导航。',
        name: 'Command 命令面板',
      },
    ],
  },
  {
    title: '反馈与浮层',
    items: [
      {
        description: '居中对话框，覆盖标题、描述、页脚和关闭。',
        implementedSlug: 'modal',
        name: 'Modal / Dialog 弹窗',
      },
      {
        description: '从边缘进入的面板，支持方向、尺寸和遮罩。',
        implementedSlug: 'drawer',
        name: 'Drawer 抽屉',
      },
      {
        description: '短文本提示、延迟展示和定位策略。',
        name: 'Tooltip 文字提示',
      },
      {
        description: '轻量浮层内容和可交互弹出面板。',
        name: 'Popover 气泡卡片',
      },
      {
        description: '全局轻提示和短时反馈。',
        name: 'Toast / Message 消息',
      },
      {
        description: '通知列表、手动关闭和异步反馈。',
        name: 'Notification 通知',
      },
      {
        description: '页面内警告、成功、错误和信息提示。',
        name: 'Alert 警告提示',
      },
      {
        description: '加载状态、遮罩和内联忙碌反馈。',
        name: 'Spin / Loading 加载',
      },
      {
        description: '等待内容时的占位骨架。',
        name: 'Skeleton 骨架屏',
      },
      {
        description: '线性、环形进度和步骤进度。',
        name: 'Progress 进度条',
      },
      {
        description: '空数据、错误结果和完成结果展示。',
        name: 'Empty / Result 结果',
      },
    ],
  },
  {
    title: '数据展示',
    items: [
      {
        description: '表格、排序、筛选、固定列和空状态。',
        name: 'Table 表格',
      },
      {
        description: '列表项、操作区、分割线和加载更多。',
        name: 'List 列表',
      },
      {
        description: '键值信息、详情字段和紧凑布局。',
        name: 'Descriptions 描述列表',
      },
      {
        description: '用户或角色头像、占位和组合头像。',
        name: 'Avatar 头像',
      },
      {
        description: '计数、状态点和角标。',
        name: 'Badge 徽标',
      },
      {
        description: '分类、状态和可关闭标签。',
        name: 'Tag / Chip 标签',
      },
      {
        description: '折叠内容区块和手风琴模式。',
        name: 'Accordion / Collapse 折叠面板',
      },
      {
        description: '层级数据、展开收起和选择状态。',
        name: 'Tree 树',
      },
      {
        description: '时间轴、事件状态和纵向叙事。',
        name: 'Timeline 时间轴',
      },
      {
        description: '轮播展示、指示器和切换控制。',
        name: 'Carousel 轮播',
      },
      {
        description: '图片预览、缩放和占位状态。',
        name: 'Image 图片',
      },
      {
        description: '数字指标、趋势和强调数值。',
        name: 'Statistic 统计数值',
      },
    ],
  },
]

const implementedExampleBySlug = new Map(examples.map((example) => [example.slug, example]))
const todoCount = componentTodoGroups.reduce((count, group) => count + group.items.length, 0)
const completedTodoCount = componentTodoGroups.reduce(
  (count, group) =>
    count +
    group.items.filter(
      (item) => item.implementedSlug && implementedExampleBySlug.has(item.implementedSlug),
    ).length,
  0,
)

export const Route = createFileRoute('/docs/overview/components')({
  component: DocsComponentsPage,
})

function DocsComponentsPage() {
  return (
    <article className="h-full min-h-0 overflow-y-auto">
      <div className="mx-auto w-full max-w-6xl px-10 py-14 max-[980px]:px-5 max-[980px]:py-10">
        <section className="grid gap-7 border-b border-stone/15 pb-10">
          <div className="flex items-end justify-between gap-5 max-sm:block">
            <div>
              <RuneText className="block text-base leading-none text-primary-strong">
                COMPONENTS
              </RuneText>
              <h1 className="mt-4 font-roco text-6xl leading-none text-on-paper max-sm:text-4xl">
                组件
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-stone/70">
                这里集中展示组件入口和完整能力清单。已有文档入口的项目会自动打勾，并链接到对应文档。
              </p>
            </div>
            <p className="rounded-lg bg-primary-soft px-4 py-3 text-sm text-on-primary-soft shadow-[0_6px_0_var(--rk-shadow-soft-color)] max-sm:mt-5 max-sm:inline-flex">
              {completedTodoCount} / {todoCount} 已实现
            </p>
          </div>
        </section>

        <section className="grid gap-5 py-12">
          <div>
            <p className="text-sm text-primary-strong">Docs</p>
            <h2 className="mt-2 font-roco text-3xl leading-none text-on-paper">已实现组件</h2>
          </div>

          <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {componentExamples.map((example, index) => {
              const tone = cardTones[index % cardTones.length]

              return (
                <Link
                  className={[
                    'group rounded-lg border border-stone/15 bg-white/55 p-5 shadow-[0_8px_0_var(--rk-shadow-soft-color)] transition hover:-translate-y-1 hover:bg-white',
                    tone.border,
                  ].join(' ')}
                  key={example.slug}
                  to={example.path}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-roco text-3xl leading-none text-on-paper">{example.name}</p>
                    <span
                      aria-hidden="true"
                      className={['mt-1 size-3 shrink-0 rounded-full', tone.marker].join(' ')}
                    />
                  </div>
                  <p className="mt-4 min-h-16 text-base leading-7 text-stone/70">
                    {example.description}
                  </p>
                  <span
                    className={[
                      'mt-5 inline-flex rounded-lg px-3 py-2 text-sm transition',
                      tone.badge,
                      tone.action,
                    ].join(' ')}
                  >
                    打开文档
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="grid gap-10 border-t border-stone/15 py-12">
          <div>
            <p className="text-sm text-primary-strong">Roadmap</p>
            <h2 className="mt-2 font-roco text-3xl leading-none text-on-paper">组件能力清单</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-stone/70">
              以常见 React 组件库为参照整理基础能力，方便持续补齐文档和实现。
            </p>
          </div>

          {componentTodoGroups.map((group) => {
            const groupDoneCount = group.items.filter(
              (item) => item.implementedSlug && implementedExampleBySlug.has(item.implementedSlug),
            ).length

            return (
              <section className="grid gap-4" key={group.title}>
                <div className="flex items-center justify-between gap-4 border-b border-stone/15 pb-3">
                  <h3 className="font-roco text-3xl leading-none text-on-paper max-sm:text-2xl">
                    {group.title}
                  </h3>
                  <span className="shrink-0 text-sm text-primary-strong">
                    {groupDoneCount} / {group.items.length}
                  </span>
                </div>

                <ul className="grid grid-cols-2 gap-x-8 max-lg:grid-cols-1">
                  {group.items.map((item) => {
                    const implementedExample = item.implementedSlug
                      ? implementedExampleBySlug.get(item.implementedSlug)
                      : undefined
                    const isDone = Boolean(implementedExample)

                    return (
                      <li
                        className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 border-b border-stone/10 py-4"
                        key={item.name}
                      >
                        <Checkbox
                          aria-label={`${item.name} ${isDone ? '已实现' : '待实现'}`}
                          checked={isDone}
                          className="mt-1 shrink-0"
                          onClick={(event) => event.preventDefault()}
                          readOnly
                        />
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            {implementedExample ? (
                              <Link
                                className="font-roco text-xl leading-none text-on-paper underline decoration-primary-strong/35 underline-offset-4 transition hover:text-primary-strong"
                                to={implementedExample.path}
                              >
                                {item.name}
                              </Link>
                            ) : (
                              <span className="font-roco text-xl leading-none text-on-paper">
                                {item.name}
                              </span>
                            )}
                            <span
                              className={[
                                'rounded px-2 py-1 text-xs',
                                isDone ? 'bg-success/15 text-success' : 'bg-stone/10 text-stone/60',
                              ].join(' ')}
                            >
                              {isDone ? '已实现' : 'TODO'}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-stone/65">{item.description}</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </section>
            )
          })}
        </section>
      </div>
    </article>
  )
}
