import { Link, createFileRoute } from '@tanstack/react-router'
import { RuneText } from 'rocokingdom-ui'
import { examples } from '../examples/catalog'

export const Route = createFileRoute('/examples/')({
  component: ExamplesIndexPage,
})

function ExamplesIndexPage() {
  return (
    <main className="min-h-svh bg-paper text-on-paper">
      <header className="flex min-h-20 items-center justify-between gap-6 border-b border-stone/15 bg-stone px-8 text-on-stone max-sm:px-5">
        <Link className="font-roco text-2xl font-black leading-none" to="/docs">
          洛克王国:UI
        </Link>
        <Link
          className="rounded-lg bg-primary px-4 py-2 text-sm font-black text-on-primary transition hover:brightness-105"
          to="/docs"
        >
          返回文档
        </Link>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-8 py-16 max-sm:px-5 max-sm:py-10">
        <div>
          <RuneText className="block text-base leading-none text-primary">EXAMPLES</RuneText>
          <h1 className="mt-4 font-roco text-6xl font-black leading-none max-sm:text-4xl">
            组件示例
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-bold leading-8 text-stone/70">
            每个组件都有独立路由，示例尽量覆盖材质、尺寸、状态、受控交互和自定义入口。
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {examples.map((example) => (
            <Link
              className="group rounded-lg border border-stone/15 bg-white/50 p-5 shadow-[0_8px_0_rgb(36_38_40_/_0.08)] transition hover:-translate-y-1 hover:border-primary hover:bg-white"
              key={example.slug}
              to={example.path}
            >
              <p className="font-roco text-3xl font-black leading-none text-on-paper">
                {example.name}
              </p>
              <p className="mt-4 min-h-16 text-base font-bold leading-7 text-stone/70">
                {example.description}
              </p>
              <span className="mt-5 inline-flex rounded-lg bg-stone px-3 py-2 text-sm font-black text-on-stone transition group-hover:bg-primary group-hover:text-on-primary">
                查看示例
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
