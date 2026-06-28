import { createFileRoute } from '@tanstack/react-router'
import { Material, type MaterialPreset } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/design/material')({
  component: MaterialExamplePage,
})

const materialCode = `import { Material } from 'rocokingdom-ui'

export function Notice() {
  return (
    <Material as="section" material="paperSoft">
      纸质浅表面
    </Material>
  )
}`

interface MaterialVariant {
  label: string
  material: MaterialPreset
  token: string
}

interface MaterialFamily {
  base: MaterialVariant
  variants: readonly MaterialVariant[]
}

const materialFamilies: readonly MaterialFamily[] = [
  {
    base: { label: 'primary', material: 'primary', token: '--rk-primary' },
    variants: [
      { label: 'soft', material: 'primarySoft', token: '--rk-primary-soft' },
      { label: 'muted', material: 'primaryMuted', token: '--rk-primary-muted' },
      { label: 'strong', material: 'primaryStrong', token: '--rk-primary-strong' },
    ],
  },
  {
    base: { label: 'paper', material: 'paper', token: '--rk-paper' },
    variants: [
      { label: 'soft', material: 'paperSoft', token: '--rk-paper-soft' },
      { label: 'muted', material: 'paperMuted', token: '--rk-paper-muted' },
      { label: 'strong', material: 'paperStrong', token: '--rk-paper-strong' },
    ],
  },
  {
    base: { label: 'stone', material: 'stone', token: '--rk-stone' },
    variants: [
      { label: 'soft', material: 'stoneSoft', token: '--rk-stone-soft' },
      { label: 'muted', material: 'stoneMuted', token: '--rk-stone-muted' },
      { label: 'strong', material: 'stoneStrong', token: '--rk-stone-strong' },
    ],
  },
]

const stateMaterials: readonly MaterialVariant[] = [
  { label: 'success', material: 'success', token: '--rk-success' },
  { label: 'danger', material: 'danger', token: '--rk-danger' },
]

function MaterialExamplePage() {
  return (
    <ExampleShell
      code={materialCode}
      description="Material 是颜色表面原语，负责把 Rocokingdom 色板或自定义色值注入到任意元素。"
      highlights={[
        'material 覆盖 primary、paper、stone 的 base、soft、muted、strong，以及状态色。',
        'default 等同 primary，适合作为主操作表面。',
        'as 可切换渲染元素。',
        'background 和 color 可用于一次性自定义表面。',
      ]}
      title="Material"
    >
      <ExampleSection title="预设材质">
        <PreviewSurface>
          <div className="grid gap-5">
            {materialFamilies.map((family) => (
              <section
                className="overflow-hidden rounded-lg border border-stone/15 shadow-[0_8px_0_var(--rk-shadow-soft-color)]"
                key={family.base.material}
              >
                <Material className="min-h-28 p-5" material={family.base.material}>
                  <p className="font-roco text-4xl leading-none max-sm:text-3xl">
                    {family.base.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 opacity-75">{family.base.token}</p>
                </Material>
                <div className="grid grid-cols-3 border-t border-black/10 max-md:grid-cols-1">
                  {family.variants.map((variant) => (
                    <Material
                      className="min-h-24 border-r border-black/10 p-4 last:border-r-0 max-md:border-r-0 max-md:border-b max-md:last:border-b-0"
                      key={variant.material}
                      material={variant.material}
                    >
                      <p className="font-roco text-3xl leading-none max-sm:text-2xl">
                        {variant.label}
                      </p>
                      <p className="mt-3 text-xs leading-5 opacity-75">{variant.token}</p>
                    </Material>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="状态材质">
        <PreviewSurface>
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            {stateMaterials.map((material) => (
              <Material
                className="min-h-28 rounded-lg border border-black/10 p-5 shadow-[0_6px_0_var(--rk-shadow-soft-color)]"
                key={material.material}
                material={material.material}
              >
                <p className="font-roco text-3xl leading-none">{material.label}</p>
                <p className="mt-3 text-sm leading-6 opacity-75">{material.token}</p>
              </Material>
            ))}
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="自定义表面">
        <PreviewSurface>
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <Material
              as="button"
              background="#2f7dd1"
              className="rounded-lg p-5 text-left shadow-[0_6px_0_var(--rk-shadow-strong-color)]"
              color="#f7fbff"
              type="button"
            >
              <span className="block font-roco text-2xl leading-none">水系活动</span>
              <span className="mt-3 block text-sm opacity-80">as=&quot;button&quot;</span>
            </Material>
            <Material
              as="article"
              background="#f7d56f"
              className="rounded-lg p-5 shadow-[0_6px_0_var(--rk-shadow-color)]"
              color="#2b2414"
            >
              <span className="block font-roco text-2xl leading-none">宠物档案</span>
              <span className="mt-3 block text-sm opacity-75">自定义 foreground</span>
            </Material>
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
