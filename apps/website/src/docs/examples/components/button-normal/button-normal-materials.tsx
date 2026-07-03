import { ButtonNormal } from 'rocokingdom-ui'

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

export function ButtonNormalMaterialsDemo() {
  return (
    <div className="grid gap-6">
      {materials.map((material) => (
        <div className="flex flex-wrap items-center gap-4" key={material}>
          <span className="w-36 text-sm capitalize text-stone/60">{material}</span>
          <ButtonNormal material={material}>Solid</ButtonNormal>
          <ButtonNormal material={material} variant="outline">
            Outline
          </ButtonNormal>
          <ButtonNormal material={material} variant="text">
            Text
          </ButtonNormal>
        </div>
      ))}
    </div>
  )
}
