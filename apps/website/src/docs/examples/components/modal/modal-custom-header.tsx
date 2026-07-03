import { Button, Modal, ModalClose } from 'rocokingdom-ui'

export function ModalCustomHeaderDemo() {
  return (
    <Modal
      footer={
        <ModalClose asChild>
          <Button material="paper" shadow>
            记住了
          </Button>
        </ModalClose>
      }
      header={
        <div>
          <p className="text-sm text-primary">EVENT</p>
          <p className="mt-1 text-xl leading-none">周年庆活动说明</p>
        </div>
      }
      title="周年庆活动说明"
      trigger={
        <Button material="stone" shadow>
          打开自定义头部
        </Button>
      }
      width={760}
    >
      <div className="mx-auto max-w-xl text-left">
        <p>本弹窗使用 header 传入自定义内容，同时 title 仍会用于无障碍标题。</p>
        <p>width 支持数字或 CSS 长度，内容区域保持滚动安全。</p>
      </div>
    </Modal>
  )
}
