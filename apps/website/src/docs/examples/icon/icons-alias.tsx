import { RocoCheck, RocoCross } from '@rocokingdom-ui/icons'

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
}
