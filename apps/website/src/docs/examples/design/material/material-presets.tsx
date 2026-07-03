import { Material, type MaterialPreset } from 'rocokingdom-ui'

const materialFamilies: readonly {
  base: MaterialPreset
  variants: readonly MaterialPreset[]
}[] = [
  { base: 'primary', variants: ['primarySoft', 'primaryMuted', 'primaryStrong'] },
  { base: 'paper', variants: ['paperSoft', 'paperMuted', 'paperStrong'] },
  { base: 'stone', variants: ['stoneSoft', 'stoneMuted', 'stoneStrong'] },
]

export function MaterialPresetsDemo() {
  return (
    <div className="grid gap-5">
      {materialFamilies.map((family) => (
        <section className="overflow-hidden rounded-lg border" key={family.base}>
          <Material className="min-h-28 p-5" material={family.base}>
            <p className="font-roco text-4xl leading-none">{family.base}</p>
          </Material>
          <div className="grid grid-cols-3">
            {family.variants.map((material) => (
              <Material className="min-h-24 p-4" key={material} material={material}>
                <p className="font-roco text-3xl leading-none">{material}</p>
              </Material>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
