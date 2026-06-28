import { createFileRoute } from '@tanstack/react-router'
import { Button, Modal, ModalClose } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/modal')({
  component: ModalExamplePage,
})

const modalCode = `import { Button, Modal, ModalClose } from 'rocokingdom-ui'

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
}`

function ModalExamplePage() {
  return (
    <ExampleShell
      code={modalCode}
      description="Modal 基于 Radix Dialog，保留 Rocokingdom 游戏面板、标题栏、关闭按钮、描述和页脚动作。"
      highlights={[
        'trigger、title、description、footer 是最常用组合。',
        'headerRuneText 可增加标题栏装饰文字。',
        'header={false}、closable={false}、width 可覆盖特殊弹窗。',
      ]}
      title="Modal"
    >
      <ExampleSection title="基础确认弹窗">
        <PreviewSurface>
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
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="自定义头部和宽度">
        <PreviewSurface>
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
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="隐藏可见头部">
        <PreviewSurface>
          <Modal
            ariaLabel="无标题提示"
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
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
