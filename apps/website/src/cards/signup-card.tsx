import { Button, Input, Modal, ModalClose, RadioGroup, RadioItem } from 'rocokingdom-ui'
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
    <HomeCard className={className} contentClassName="flex h-full min-h-0 flex-col gap-3 sm:gap-4">
      <CardHeading description="填写角色、队伍和性别，再确认创建。" title="冒险等级" />

      <CardField label="角色名称">
        <Input
          aria-label="角色名称"
          inputClassName="min-w-0"
          material="stone"
          rootClassName="!w-full !min-w-0"
          shadow
          defaultValue="洛克训练师"
        />
      </CardField>

      <CardField label="队伍代号">
        <Input
          aria-label="队伍代号"
          inputClassName="min-w-0"
          material="stone"
          rootClassName="!w-full !min-w-0"
          shadow
          defaultValue="星辉巡游队"
        />
      </CardField>

      <CardField label="性别">
        <RadioGroup defaultValue="girl" name="gender" size="small">
          <RadioItem activeMaterial="primaryStrong" value="girl">
            女生
          </RadioItem>
          <RadioItem activeMaterial="stone" value="boy">
            男生
          </RadioItem>
        </RadioGroup>
      </CardField>

      <CardActions className="mt-auto">
        <Modal
          description="确认后会生成一份当前界面的搭建草稿。"
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
          title="确认登记"
          trigger={
            <Button material="paper" rootClassName={actionButtonClassName} shadow>
              预览
            </Button>
          }
        >
          <p className={modalCopyClassName}>角色、队伍和主题会一起写入本次界面草稿。</p>
        </Modal>
        <Button material="primary" rootClassName={actionButtonClassName} shadow>
          创建
        </Button>
      </CardActions>
    </HomeCard>
  )
}
