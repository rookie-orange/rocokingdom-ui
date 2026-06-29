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
  onToken: string
  onValue: string
  token: string
  value: string
}

interface MaterialFamily {
  base: MaterialVariant
  variants: readonly MaterialVariant[]
}

const materialFamilies: readonly MaterialFamily[] = [
  {
    base: {
      label: 'primary',
      material: 'primary',
      onToken: '--rk-on-primary',
      onValue: '#242628',
      token: '--rk-primary',
      value: '#ffc65f',
    },
    variants: [
      {
        label: 'soft',
        material: 'primarySoft',
        onToken: '--rk-on-primary-soft',
        onValue: '#2b2414',
        token: '--rk-primary-soft',
        value: '#fff1cf',
      },
      {
        label: 'muted',
        material: 'primaryMuted',
        onToken: '--rk-on-primary-muted',
        onValue: '#2b2414',
        token: '--rk-primary-muted',
        value: '#f7d56f',
      },
      {
        label: 'strong',
        material: 'primaryStrong',
        onToken: '--rk-on-primary-strong',
        onValue: '#fff9ec',
        token: '--rk-primary-strong',
        value: '#d89522',
      },
    ],
  },
  {
    base: {
      label: 'paper',
      material: 'paper',
      onToken: '--rk-on-paper',
      onValue: '#222222',
      token: '--rk-paper',
      value: '#f4f0e8',
    },
    variants: [
      {
        label: 'soft',
        material: 'paperSoft',
        onToken: '--rk-on-paper-soft',
        onValue: '#222222',
        token: '--rk-paper-soft',
        value: '#fffaf2',
      },
      {
        label: 'muted',
        material: 'paperMuted',
        onToken: '--rk-on-paper-muted',
        onValue: '#222222',
        token: '--rk-paper-muted',
        value: '#e5dccd',
      },
      {
        label: 'strong',
        material: 'paperStrong',
        onToken: '--rk-on-paper-strong',
        onValue: '#222222',
        token: '--rk-paper-strong',
        value: '#cdbcaa',
      },
    ],
  },
  {
    base: {
      label: 'stone',
      material: 'stone',
      onToken: '--rk-on-stone',
      onValue: '#f4f0e8',
      token: '--rk-stone',
      value: '#1f1f1f',
    },
    variants: [
      {
        label: 'soft',
        material: 'stoneSoft',
        onToken: '--rk-on-stone-soft',
        onValue: '#f4f0e8',
        token: '--rk-stone-soft',
        value: '#292d2d',
      },
      {
        label: 'muted',
        material: 'stoneMuted',
        onToken: '--rk-on-stone-muted',
        onValue: '#f4f0e8',
        token: '--rk-stone-muted',
        value: '#4d5358',
      },
      {
        label: 'strong',
        material: 'stoneStrong',
        onToken: '--rk-on-stone-strong',
        onValue: '#f4f0e8',
        token: '--rk-stone-strong',
        value: '#151515',
      },
    ],
  },
]

const stateMaterials: readonly MaterialVariant[] = [
  {
    label: 'success',
    material: 'success',
    onToken: '--rk-on-success',
    onValue: '#f3fff8',
    token: '--rk-success',
    value: '#2f9e66',
  },
  {
    label: 'danger',
    material: 'danger',
    onToken: '--rk-on-danger',
    onValue: '#fff6f4',
    token: '--rk-danger',
    value: '#d94b4b',
  },
]

function MaterialValueLines({
  onToken,
  onValue,
  token,
  value,
}: Pick<MaterialVariant, 'onToken' | 'onValue' | 'token' | 'value'>) {
  return (
    <dl className="mt-3 grid gap-1 font-mono text-xs leading-5 opacity-75">
      <div className="flex flex-wrap gap-x-2">
        <dt>{token}</dt>
        <dd>{value}</dd>
      </div>
      <div className="flex flex-wrap gap-x-2">
        <dt>{onToken}</dt>
        <dd>{onValue}</dd>
      </div>
    </dl>
  )
}

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
                  <MaterialValueLines {...family.base} />
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
                      <MaterialValueLines {...variant} />
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
                <MaterialValueLines {...material} />
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
              <span className="mt-3 block font-mono text-xs leading-5 opacity-80">
                background #2f7dd1
              </span>
              <span className="block font-mono text-xs leading-5 opacity-80">color #f7fbff</span>
              <span className="mt-2 block text-sm opacity-80">as=&quot;button&quot;</span>
            </Material>
            <Material
              as="article"
              background="#f7d56f"
              className="rounded-lg p-5 shadow-[0_6px_0_var(--rk-shadow-color)]"
              color="#2b2414"
            >
              <span className="block font-roco text-2xl leading-none">宠物档案</span>
              <span className="mt-3 block font-mono text-xs leading-5 opacity-75">
                background #f7d56f
              </span>
              <span className="block font-mono text-xs leading-5 opacity-75">color #2b2414</span>
              <span className="mt-2 block text-sm opacity-75">自定义 foreground</span>
            </Material>
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
