import { Panel } from 'rocokingdom-ui'

export function PanelInsetDemo() {
  return (
    <Panel
      className="min-h-44 max-w-3xl"
      contentClassName="grid content-center"
      curve="both"
      curveInset="120px"
      material="paper"
    >
      <p className="font-roco text-3xl leading-none">curveInset="120px"</p>
      <p>当面板较窄或内容较密时，可以显式增加文字区域与曲线边缘的距离。</p>
    </Panel>
  )
}
