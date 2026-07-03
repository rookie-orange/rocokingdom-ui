import { Panel } from 'rocokingdom-ui'

export function PanelBasicDemo() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Panel material="paper">
        <p className="font-roco text-3xl leading-none">纸张面板</p>
        <p>用于常规说明、表单区和轻量内容。</p>
      </Panel>
      <Panel material="stone">
        <p className="font-roco text-3xl leading-none">石材面板</p>
        <p>用于高对比导航、弹层内强调内容。</p>
      </Panel>
    </div>
  )
}
