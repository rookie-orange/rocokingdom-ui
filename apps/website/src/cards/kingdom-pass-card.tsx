import { Button, Drawer, Modal, ModalClose } from 'rocokingdom-ui'
import {
  actionButtonClassName,
  CardActions,
  CardHeading,
  HomeCard,
  modalCopyClassName,
} from './home-card'

interface KingdomPassCardProps {
  className?: string
  regionLabel: string | undefined
}

export function KingdomPassCard({ className, regionLabel }: KingdomPassCardProps) {
  return (
    <HomeCard className={className} contentClassName="grid gap-4">
      <CardHeading description="查看并管理你的组件通行证。" title="王国通行卡" />

      <div className="grid min-h-[7.6rem] gap-[0.8rem] rounded-xl bg-[linear-gradient(135deg,rgb(255_198_95_/_0.24),transparent_46%),var(--rk-stone)] p-[1.1rem] text-on-stone shadow-[inset_0_1px_0_rgb(255_255_255_/_0.12)]">
        <strong>洛克王国 UI</strong>
        <span className="self-end font-mono text-[0.95rem] text-primary">4929 3849 5027 1846</span>
        <small className="text-on-stone/80">01 / 27 · 999</small>
      </div>

      <CardActions>
        <Modal
          description="弹窗组件适合确认危险操作、展示说明或承载短流程。"
          footer={
            <>
              <ModalClose asChild>
                <Button material="paper" shadow>
                  取消
                </Button>
              </ModalClose>
              <ModalClose asChild>
                <Button material="primary" shadow>
                  确认
                </Button>
              </ModalClose>
            </>
          }
          headerRuneText="弹窗"
          title="弹窗预览"
          trigger={
            <Button material="paper" rootClassName={actionButtonClassName} shadow>
              弹窗
            </Button>
          }
        >
          <p className={modalCopyClassName}>这里展示的是来自 rocokingdom-ui 的弹窗组件。</p>
        </Modal>
        <Drawer
          description="抽屉适合承载区域设置、任务简报和侧边详情。"
          overlay
          side="right"
          size={420}
          title="抽屉预览"
          trigger={
            <Button material="primary" rootClassName={actionButtonClassName} shadow>
              抽屉
            </Button>
          }
        >
          <div className="grid gap-[0.65rem] text-on-stone leading-normal">
            <span>✓</span>
            <p className="m-0">当前选择：{regionLabel}。</p>
            <p className="m-0">抽屉内容可以继续组合按钮、表单和状态提示。</p>
          </div>
        </Drawer>
      </CardActions>
    </HomeCard>
  )
}
