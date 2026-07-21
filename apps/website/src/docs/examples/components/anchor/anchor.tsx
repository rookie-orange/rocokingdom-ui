import { Anchor } from 'rocokingdom-ui'

const items = [
  { href: '#anchor-overview', title: '概览' },
  {
    children: [{ href: '#anchor-rewards', title: '任务奖励' }],
    href: '#anchor-quest',
    title: '任务流程',
  },
]

export function AnchorExample() {
  return (
    <div className="grid grid-cols-[150px_minmax(0,1fr)] gap-8 max-sm:grid-cols-1">
      <Anchor defaultActiveKey="#anchor-overview" items={items} />
      <div className="grid gap-5 text-sm leading-6">
        <section id="anchor-overview">
          <strong>概览</strong>
          <p className="text-stone/65">王国委托的基本信息。</p>
        </section>
        <section id="anchor-quest">
          <strong>任务流程</strong>
          <p className="text-stone/65">依次完成探索与收集。</p>
        </section>
        <section id="anchor-rewards">
          <strong>任务奖励</strong>
          <p className="text-stone/65">完成后领取经验与洛克贝。</p>
        </section>
      </div>
    </div>
  )
}
