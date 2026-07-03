import { Button, Modal, ModalClose } from 'rocokingdom-ui'

export function ModalHeaderlessDemo() {
  return (
    <Modal
      ariaLabel="无标题提示"
      closePosition="outside"
      footer={
        <ModalClose asChild>
          <Button material="stone" shadow>
            关闭
          </Button>
        </ModalClose>
      }
      header={false}
      title="无标题提示"
      trigger={
        <Button material="paper" shadow>
          打开无头部弹窗
        </Button>
      }
      width="min(520px, calc(100vw - 32px))"
    >
      <p>header=false 会隐藏可见标题栏，但仍保留辅助技术可读标题。</p>
    </Modal>
  )
}
