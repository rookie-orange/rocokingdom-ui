import { Button, Modal, ModalClose } from 'rocokingdom-ui'

export function ModalBasicDemo() {
  return (
    <Modal
      description="挑战期间无法更换宠物队伍。"
      footer={
        <>
          <ModalClose asChild>
            <Button material="paper" shadow>
              取消
            </Button>
          </ModalClose>
          <ModalClose asChild>
            <Button material="paper" shadow>
              开始挑战
            </Button>
          </ModalClose>
        </>
      }
      headerRuneText="NOTICE"
      title="挑战确认"
      trigger={
        <Button material="default" shadow>
          打开确认弹窗
        </Button>
      }
    >
      <p>是否进入本次挑战？</p>
    </Modal>
  )
}
