import { Material } from 'rocokingdom-ui'

const stateMaterials = ['success', 'danger'] as const

export function MaterialStateDemo() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stateMaterials.map((material) => (
        <Material className="min-h-28 rounded-lg p-5" key={material} material={material}>
          <p className="font-roco text-3xl leading-none">{material}</p>
        </Material>
      ))}
    </div>
  )
}
