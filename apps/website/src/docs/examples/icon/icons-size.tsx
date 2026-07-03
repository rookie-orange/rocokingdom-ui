import { Check, Cross } from '@rocokingdom-ui/icons'

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
}
