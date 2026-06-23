import { createFileRoute } from '@tanstack/react-router'
import { Material } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/material')({
  component: MaterialExamplePage,
})

const materialCode = `import { Material } from 'rocokingdom-ui'

export function Notice() {
  return (
    <Material as="section" material="stone">
      石材表面
    </Material>
  )
}`

function MaterialExamplePage() {
  return (
    <ExampleShell
      code={materialCode}
      description="Material 是颜色表面原语，负责把 Rocokingdom 色板或自定义色值注入到任意元素。"
      highlights={[
        'material 覆盖 default、primary、primarySoft、primaryMuted、primaryStrong、paper、stone 以及状态色。',
        'as 可切换渲染元素。',
        'background 和 color 可用于一次性自定义表面。',
      ]}
      title="Material"
    >
      <ExampleSection title="预设材质">
        <PreviewSurface>
          <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {(
              [
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
            ).map((material) => (
              <Material
                className="min-h-36 rounded-lg border border-black/10 p-5 shadow-[0_6px_0_var(--shadow-soft-color)]"
                key={material}
                material={material}
              >
                <p className="font-roco text-3xl font-black leading-none">{material}</p>
                <p className="mt-4 text-sm font-bold leading-6 opacity-75">
                  背景和前景色来自 Rocokingdom 主题变量。
                </p>
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
              className="rounded-lg p-5 text-left shadow-[0_6px_0_var(--shadow-strong-color)]"
              color="#f7fbff"
              type="button"
            >
              <span className="block font-roco text-2xl font-black leading-none">水系活动</span>
              <span className="mt-3 block text-sm font-bold opacity-80">as=&quot;button&quot;</span>
            </Material>
            <Material
              as="article"
              background="#f7d56f"
              className="rounded-lg p-5 shadow-[0_6px_0_var(--shadow-color)]"
              color="#2b2414"
            >
              <span className="block font-roco text-2xl font-black leading-none">宠物档案</span>
              <span className="mt-3 block text-sm font-bold opacity-75">自定义 foreground</span>
            </Material>
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
