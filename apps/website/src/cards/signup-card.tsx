import { Button, Input, Modal, ModalClose } from 'rocokingdom-ui'
import {
  actionButtonClassName,
  CardActions,
  CardField,
  CardHeading,
  HomeCard,
  modalCopyClassName,
} from './home-card'

interface SignupCardProps {
  className?: string
}

export function SignupCard({ className }: SignupCardProps) {
  return (
    <HomeCard className={className} contentClassName="grid gap-4">
      <CardHeading title="注册账号" />

      <CardField label="角色名称">
        <Input
          aria-label="角色名称"
          inputClassName="min-w-0 cursor-default"
          material="stone"
          readOnly
          rootClassName="!w-full !min-w-0"
          shadow
          value="洛克训练师"
        />
      </CardField>

      <CardField label="初始区域">
        <Input
          aria-label="初始区域"
          inputClassName="min-w-0 cursor-default"
          material="stone"
          readOnly
          rootClassName="!w-full !min-w-0"
          shadow
          value="魔法学院"
        />
      </CardField>

      <CardActions>
        <Modal
          description="确认后会创建一个可复用的组件配方。"
          footer={
            <>
              <ModalClose asChild>
                <Button material="paper" shadow>
                  取消
                </Button>
              </ModalClose>
              <ModalClose asChild>
                <Button material="primary" shadow>
                  开始
                </Button>
              </ModalClose>
            </>
          }
          headerRuneText="弹窗"
          title="创建组件"
          trigger={
            <Button material="paper" rootClassName={actionButtonClassName} shadow>
              弹窗
            </Button>
          }
        >
          <p className={modalCopyClassName}>选择主题、组合组件，然后导出你的王国界面。</p>
        </Modal>
        <Button material="primary" rootClassName={actionButtonClassName} shadow>
          登录
        </Button>
      </CardActions>
    </HomeCard>
  )
}
