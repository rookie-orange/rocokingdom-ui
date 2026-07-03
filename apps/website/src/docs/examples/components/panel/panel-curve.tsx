import { Panel } from 'rocokingdom-ui'

export function PanelCurveDemo() {
  return (
    <div className="grid grid-cols-2 gap-5">
      {(['left', 'right', 'both', 'none'] as const).map((curve) => (
        <Panel
          className="min-h-40"
          contentClassName="grid content-center"
          curve={curve}
          key={curve}
          material={curve === 'none' ? 'paper' : 'stone'}
        >
          <p className="font-roco text-3xl leading-none">curve={curve}</p>
          <p className="mt-3 text-sm opacity-75">适配抽屉和侧栏场景。</p>
        </Panel>
      ))}
    </div>
  )
}
