import { Button, Modal, ModalClose } from 'rocokingdom-ui'

export function ConfirmModal() {
  return (
    <Modal
      headerRuneText="NOTICE"
      title="挑战确认"
      trigger={<Button shadow>打开弹窗</Button>}
      footer={
        <ModalClose asChild>
          <Button material="paper">确认</Button>
        </ModalClose>
      }
    >
      是否进入本次挑战？
    </Modal>
  )
}
