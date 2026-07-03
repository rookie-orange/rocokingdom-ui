import type { DocsProp } from '../content/registry'

interface DocsPropTableProps {
  props: readonly DocsProp[]
}

export function DocsPropTable({ props }: DocsPropTableProps) {
  if (props.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-stone/20 bg-paper-soft p-5 text-sm leading-6 text-stone/60">
        当前页面还没有公开属性表。
      </p>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-stone/15 bg-paper-soft shadow-[0_12px_0_var(--rk-shadow-soft-color)]">
      <div className="grid grid-cols-[minmax(9rem,0.82fr)_minmax(13rem,1.1fr)_7rem_minmax(18rem,1.4fr)] border-b border-stone/15 bg-stone px-4 py-3 text-xs font-bold uppercase tracking-normal text-on-stone/70 max-lg:hidden">
        <span>属性</span>
        <span>类型</span>
        <span>默认值</span>
        <span>说明</span>
      </div>
      <div className="divide-y divide-stone/10">
        {props.map((prop) => (
          <div
            className="grid grid-cols-[minmax(9rem,0.82fr)_minmax(13rem,1.1fr)_7rem_minmax(18rem,1.4fr)] gap-4 px-4 py-4 text-sm max-lg:grid-cols-1 max-lg:gap-2"
            key={prop.name}
          >
            <div>
              <p className="font-mono text-sm font-semibold text-on-paper">{prop.name}</p>
              {prop.required ? (
                <span className="mt-1 inline-flex rounded bg-danger/10 px-2 py-0.5 text-xs text-danger">
                  required
                </span>
              ) : null}
            </div>
            <code className="break-words rounded bg-stone/10 px-2 py-1 text-xs leading-5 text-stone">
              {prop.type}
            </code>
            <code className="text-xs leading-5 text-stone/65">{prop.defaultValue ?? '-'}</code>
            <p className="text-sm leading-6 text-stone/70">{prop.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
