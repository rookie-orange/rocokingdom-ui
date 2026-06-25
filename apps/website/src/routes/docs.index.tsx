import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button, Panel, RuneText } from 'rocokingdom-ui'
import { componentExamples } from '../examples/catalog'

const overviewStats = [
  {
    label: '主题',
    value: '2',
  },
  {
    label: '组件',
    value: String(componentExamples.length),
  },
  {
    label: '材质',
    value: '9',
  },
]

export const Route = createFileRoute('/docs/')({
  component: DocsOverviewPage,
})

function DocsOverviewPage() {
  const navigate = useNavigate()

  return (
    <article className="mx-auto w-full max-w-6xl px-10 py-14 max-[980px]:px-5 max-[980px]:py-10">
      <section className="grid gap-7 border-b border-stone/15 pb-10">
        <div>
          <RuneText className="block text-base leading-none text-primary-strong">OVERVIEW</RuneText>
          <h1 className="mt-4 font-roco text-6xl font-black leading-none text-on-paper max-sm:text-4xl">
            文档总览
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-bold leading-8 text-stone/70">
            Rocokingdom UI 将洛克王国风格的材质、造型、图标和交互组件整理成
            Overview、Design、Components、Icon 四类文档入口。
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
          {overviewStats.map((stat) => (
            <Panel
              className="min-h-32"
              contentClassName="grid content-between gap-4 p-5"
              key={stat.label}
              material="paper"
            >
              <p className="text-sm font-black text-primary-strong">{stat.label}</p>
              <p className="font-roco text-5xl font-black leading-none text-on-paper">
                {stat.value}
              </p>
            </Panel>
          ))}
        </div>
      </section>

      <section className="grid gap-5 py-12">
        <div>
          <p className="text-sm font-black text-primary-strong">Start</p>
          <h2 className="mt-2 font-roco text-3xl font-black leading-none text-on-paper">
            开始浏览
          </h2>
          <p className="mt-3 max-w-2xl text-base font-bold leading-7 text-stone/70">
            先从组件总览进入，再按需打开 Button、Panel、Modal、Select 等具体页面。
          </p>
        </div>
        <div>
          <Button
            material="primaryStrong"
            onClick={() => navigate({ to: '/docs/overview/components' })}
            rootClassName="font-roco font-black"
            shadow
          >
            查看 Components
          </Button>
        </div>
      </section>
    </article>
  )
}
