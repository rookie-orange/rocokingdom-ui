import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs')({
  component: DocsPage,
})

const components = [
  {
    name: 'Button',
    intro: '按钮用于承载明确的页面动作，支持普通、纸张、石材等洛克王国风格材质。',
  },
  {
    name: 'Modal',
    intro: '弹窗用于承载短流程确认、提示或适龄说明，适合需要阻断当前操作的内容。',
  },
  {
    name: 'Drawer',
    intro: '抽屉适合展示公告、详情和长内容，保留侧向进入的空间关系。',
  },
  {
    name: 'Select',
    intro: '选择器用于从固定选项中完成单选，适合设置项和筛选条件。',
  },
  {
    name: 'Radio Group',
    intro: '单选组用于少量互斥选项，保持当前选择状态清晰可见。',
  },
]

function DocsPage() {
  return (
    <main className="min-h-svh bg-paper text-on-paper">
      <header className="sticky top-0 z-20 flex min-h-20 items-center justify-between gap-6 border-b border-stone/15 bg-stone text-on-stone px-8 max-[860px]:flex-wrap max-[860px]:gap-4 max-[860px]:px-5 max-[860px]:py-4">
        <Link
          aria-label="返回首页"
          className="inline-flex items-center gap-3 font-roco text-2xl font-black"
          to="/"
        >
          <span>洛克王国:UI</span>
        </Link>
        <label className="flex w-full max-w-sm items-center gap-3 rounded-lg border border-stone/20 bg-paper px-4 py-3 max-[860px]:max-w-none">
          <span className="whitespace-nowrap text-sm font-black text-stone">搜索组件</span>
          <input
            aria-label="搜索组件"
            className="min-w-0 flex-1 border-0 bg-transparent text-base font-bold text-on-paper outline-none placeholder:text-stone/45"
            placeholder="搜索组件..."
            type="search"
          />
        </label>
      </header>

      <div className="flex max-[860px]:block">
        <aside
          aria-label="组件列表"
          className="sticky top-20 h-[calc(100svh-5rem)] w-72 shrink-0 border-r border-stone/15 bg-paper px-8 py-8 max-[860px]:relative max-[860px]:top-0 max-[860px]:h-auto max-[860px]:w-full max-[860px]:border-r-0 max-[860px]:border-b max-[860px]:px-5 max-[860px]:py-5"
        >
          <a className="font-roco text-3xl font-black leading-none text-on-paper" href="#overview">
            组件
          </a>
          <nav className="mt-8 grid gap-2 max-[860px]:mt-5 max-[860px]:flex max-[860px]:overflow-x-auto max-[860px]:pb-1">
            {components.map((component) => (
              <a
                className="rounded-lg px-3 py-2 text-base font-black text-stone/70 transition hover:bg-primary hover:text-on-primary max-[860px]:shrink-0"
                href={`#${component.name.toLowerCase().replaceAll(' ', '-')}`}
                key={component.name}
              >
                {component.name}
              </a>
            ))}
          </nav>
        </aside>

        <article className="mx-auto w-full max-w-5xl px-10 py-20 max-[860px]:px-5 max-[860px]:py-12">
          <section className="border-b border-stone/15 pb-12" id="overview">
            <p className="text-base font-black text-primary">文档</p>
            <h1 className="mt-3 font-roco text-7xl font-black leading-none text-on-paper max-sm:text-5xl">
              组件说明
            </h1>
            <span className="mt-6 block max-w-2xl text-lg font-bold leading-8 text-stone/70">
              这里先放置基础介绍和组件导航，后续可以逐步接入真实示例、API 表格和交互预览。
            </span>
          </section>

          <div className="mt-4">
            {components.map((component) => (
              <section
                className="border-b border-stone/15 py-10"
                id={component.name.toLowerCase().replaceAll(' ', '-')}
                key={component.name}
              >
                <p className="text-base font-black text-primary">Component</p>
                <h2 className="mt-3 font-roco text-4xl font-black leading-tight text-on-paper">
                  {component.name}
                </h2>
                <span className="mt-4 block text-lg font-bold leading-8 text-stone/70">
                  {component.intro}
                </span>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  )
}
