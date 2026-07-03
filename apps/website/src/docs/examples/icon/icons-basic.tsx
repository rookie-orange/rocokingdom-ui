import { Check, Cross } from '@rocokingdom-ui/icons'

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
}
