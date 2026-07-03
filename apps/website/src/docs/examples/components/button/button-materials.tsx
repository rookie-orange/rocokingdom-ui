import { Button } from 'rocokingdom-ui'

const materials = [
  'default',
  'primary',
  'primarySoft',
  'primaryMuted',
  'primaryStrong',
  'paper',
  'stone',
  'success',
  'danger',
] as const

export function ButtonMaterialsDemo() {
  return (
    <div className="grid gap-8">
      {materials.map((material) => (
        <div className="flex flex-wrap items-center gap-4" key={material}>
          <span className="w-36 capitalize text-sm text-stone/60">{material}</span>
          <Button material={material} shadow>
            实心按钮
          </Button>
          <Button material={material} shadow variant="outline">
            描边按钮
          </Button>
          <Button material={material} variant="text">
            文本按钮
          </Button>
        </div>
      ))}
    </div>
  )
}
