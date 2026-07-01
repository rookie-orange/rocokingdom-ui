import { Check, Cross, RocoCheck, RocoCross } from '@rocokingdom-ui/icons'
import { createFileRoute } from '@tanstack/react-router'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/icon')({
  component: IconsExamplePage,
})

const iconsCode = `import { Check, Cross, RocoCheck, RocoCross } from '@rocokingdom-ui/icons'

export function StatusIcons() {
  return (
    <div>
      <Check />
      <Cross />
      <RocoCheck />
      <RocoCross />
    </div>
  )
}`

const icons = [
  {
    Component: Check,
    alias: 'RocoCheck',
    color: 'text-success',
    name: 'Check',
    surface: 'bg-success/10',
  },
  {
    Component: Cross,
    alias: 'RocoCross',
    color: 'text-danger',
    name: 'Cross',
    surface: 'bg-danger/10',
  },
]

const aliasIcons = [
  {
    Component: RocoCheck,
    color: 'text-success',
    name: 'RocoCheck',
  },
  {
    Component: RocoCross,
    color: 'text-danger',
    name: 'RocoCross',
  },
]

const iconsBasicCode = `import { Check, Cross } from '@rocokingdom-ui/icons'

export function IconsBasicDemo() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="rounded-lg border p-5 text-success">
        <Check aria-label="Check" className="text-5xl" />
        <p>Check</p>
      </div>
      <div className="rounded-lg border p-5 text-danger">
        <Cross aria-label="Cross" className="text-5xl" />
        <p>Cross</p>
      </div>
    </div>
  )
}`

const iconsAliasCode = `import { RocoCheck, RocoCross } from '@rocokingdom-ui/icons'

export function IconsAliasDemo() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <div className="flex items-center gap-4 rounded-lg border px-5 py-4">
        <RocoCheck className="text-4xl text-success" aria-label="RocoCheck" />
        <span>RocoCheck</span>
      </div>
      <div className="flex items-center gap-4 rounded-lg border px-5 py-4">
        <RocoCross className="text-4xl text-danger" aria-label="RocoCross" />
        <span>RocoCross</span>
      </div>
    </div>
  )
}`

const iconsSizeCode = `import { Check, Cross } from '@rocokingdom-ui/icons'

export function IconsSizeDemo() {
  return (
    <div className="flex flex-wrap items-end gap-8 text-primary-strong">
      <Check aria-label="small check" className="text-2xl" />
      <Check aria-label="medium check" className="text-5xl" />
      <Check aria-label="large check" className="text-7xl" />
      <Cross aria-label="small cross" className="text-2xl text-danger" />
      <Cross aria-label="medium cross" className="text-5xl text-danger" />
      <Cross aria-label="large cross" className="text-7xl text-danger" />
    </div>
  )
}`

function IconsExamplePage() {
  return (
    <ExampleShell
      code={iconsCode}
      description="Icons 提供填充风格 SVG 组件，默认尺寸为 1em，颜色继承 currentColor。"
      highlights={[
        '组件名不带 Icon 后缀：Check、Cross。',
        '同时导出 RocoCheck、RocoCross 作为同组件别名。',
        'SVG 使用 fill=currentColor，无 stroke，可用文本颜色和字号控制外观。',
      ]}
      title="Icons"
    >
      <ExampleSection
        code={iconsBasicCode}
        description="图标会继承父级文本颜色，可直接配合 Tailwind text-* 和 text-[size] 使用。"
        title="基础图标"
      >
        <PreviewSurface>
          <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            {icons.map((icon) => {
              const Icon = icon.Component

              return (
                <div
                  className={[
                    'rounded-lg border border-stone/15 p-5 shadow-[0_8px_0_var(--rk-shadow-soft-color)]',
                    icon.surface,
                  ].join(' ')}
                  key={icon.name}
                >
                  <div className="flex items-center gap-5">
                    <span
                      className={[
                        'grid size-20 place-items-center rounded-lg bg-white/75 text-5xl shadow-[0_6px_0_var(--rk-shadow-soft-color)]',
                        icon.color,
                      ].join(' ')}
                    >
                      <Icon aria-label={icon.name} />
                    </span>
                    <div>
                      <p className="font-roco text-3xl leading-none text-on-paper">{icon.name}</p>
                      <p className="mt-2 text-sm text-stone/60">{icon.alias}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection
        code={iconsAliasCode}
        description="别名导出和基础导出指向同一个组件，适合在业务侧统一使用 Roco 前缀。"
        title="Roco 别名"
      >
        <PreviewSurface>
          <div className="flex flex-wrap items-center gap-5">
            {aliasIcons.map((icon) => {
              const Icon = icon.Component

              return (
                <div
                  className="flex min-w-44 items-center gap-4 rounded-lg border border-stone/15 bg-white/60 px-5 py-4 shadow-[0_6px_0_var(--rk-shadow-soft-color)]"
                  key={icon.name}
                >
                  <Icon className={['text-4xl', icon.color].join(' ')} aria-label={icon.name} />
                  <span className="text-on-paper">{icon.name}</span>
                </div>
              )
            })}
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection code={iconsSizeCode} title="尺寸">
        <PreviewSurface>
          <div className="flex flex-wrap items-end gap-8 text-primary-strong">
            <Check aria-label="small check" className="text-2xl" />
            <Check aria-label="medium check" className="text-5xl" />
            <Check aria-label="large check" className="text-7xl" />
            <Cross aria-label="small cross" className="text-2xl text-danger" />
            <Cross aria-label="medium cross" className="text-5xl text-danger" />
            <Cross aria-label="large cross" className="text-7xl text-danger" />
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
