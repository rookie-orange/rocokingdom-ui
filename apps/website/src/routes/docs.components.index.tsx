import { Link, createFileRoute } from '@tanstack/react-router'
import { RuneText } from 'rocokingdom-ui'
import { examples } from '../examples/catalog'

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

export const Route = createFileRoute('/docs/components/')({
  component: DocsComponentsPage,
})

function DocsComponentsPage() {
  return (
    <article className="mx-auto w-full max-w-6xl px-10 py-14 max-[980px]:px-5 max-[980px]:py-10">
      <section className="grid gap-7 border-b border-stone/15 pb-10">
        <div>
          <RuneText className="block text-base leading-none text-primary-strong">
            COMPONENTS
          </RuneText>
          <h1 className="mt-4 font-roco text-6xl font-black leading-none text-on-paper max-sm:text-4xl">
            组件
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-bold leading-8 text-stone/70">
            这里集中展示组件入口。每个组件都有独立文档路由，覆盖主要材质、状态、交互和组合用法。
          </p>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-5 py-12 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {examples.map((example, index) => {
          const tone = cardTones[index % cardTones.length]

          return (
            <Link
              className={[
                'group rounded-lg border border-stone/15 bg-white/55 p-5 shadow-[0_8px_0_var(--shadow-soft-color)] transition hover:-translate-y-1 hover:bg-white',
                tone.border,
              ].join(' ')}
              key={example.slug}
              to={example.path}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-roco text-3xl font-black leading-none text-on-paper">
                  {example.name}
                </p>
                <span
                  aria-hidden="true"
                  className={['mt-1 size-3 shrink-0 rounded-full', tone.marker].join(' ')}
                />
              </div>
              <p className="mt-4 min-h-16 text-base font-bold leading-7 text-stone/70">
                {example.description}
              </p>
              <span
                className={[
                  'mt-5 inline-flex rounded-lg px-3 py-2 text-sm font-black transition',
                  tone.badge,
                  tone.action,
                ].join(' ')}
              >
                打开文档
              </span>
            </Link>
          )
        })}
      </section>
    </article>
  )
}
