import './style/index.css'
import 'rocokingdom-ui/style.css'
import 'rocokingdom-ui/font.css'
import 'rocokingdom-ui/decorative-font.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Button,
  ButtonNormal,
  Modal,
  ModalClose,
  RadioGroup,
  RadioItem,
  RuneText,
} from 'rocokingdom-ui'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Missing #app root.')
}

const guidanceCopy = [
  '1. 本游戏是一款玩法简单、单局耗时中等的精灵收集类开放世界游戏，适用于年满12周岁及以上的用户，建议未成年人在家长监护下使用游戏产品。',
  '2. 本游戏为三维卡通风格，画面丰富，色彩鲜明，配乐轻快活泼。游戏基于洛克王国IP的架空奇幻世界观展开剧情，玩家扮演一名魔法世界的学院新生，在旅途中结识精灵伙伴，逐步了解世界。',
  '3. 根据国家相关要求，游戏中有用户实名认证系统，未通过实名认证的用户不可进入游戏。',
]

function App() {
  return (
    <main className="showcase">
      <section className="showcase__shell">
        <header className="showcase__header">
          <p>Rocokingdom UI</p>
          <h1>
            <RuneText>Button</RuneText>
          </h1>
        </header>

        <section aria-labelledby="button-title" className="showcase__section">
          <h2 id="button-title">Button</h2>
          <div className="button-row">
            <Button size="small" material="paper" shadow>
              确定
            </Button>
            <Button shadow>Default</Button>
            <Button size="large" material="paper" shadow>
              Paper
            </Button>
            <Button material="stone">Stone</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="text">Text</Button>
            <Button rootClassName="showcase__danger-button">Danger</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <section aria-labelledby="button-normal-title" className="showcase__section">
          <h2 id="button-normal-title">Button Normal</h2>
          <div className="button-row">
            <ButtonNormal>Default</ButtonNormal>
            <ButtonNormal material="paper">Paper</ButtonNormal>
            <ButtonNormal material="stone">Stone</ButtonNormal>
            <ButtonNormal variant="outline">Outline</ButtonNormal>
            <ButtonNormal variant="text">Text</ButtonNormal>
          </div>
        </section>

        <section aria-labelledby="radio-group-title" className="showcase__section">
          <h2 id="radio-group-title">Radio Group</h2>
          <RadioGroup aria-label="Pet element" defaultValue="water" activeMaterial="default">
            <RadioItem value="grass">草系</RadioItem>
            <RadioItem value="water">水系</RadioItem>
            <RadioItem value="fire">火系</RadioItem>
          </RadioGroup>
        </section>

        <section aria-labelledby="modal-title" className="showcase__section">
          <h2 id="modal-title">Modal</h2>
          <div className="button-row">
            <Modal
              closable={false}
              footer={
                <ModalClose asChild>
                  <Button material="paper" rootClassName="showcase__modal-confirm" shadow>
                    确定
                  </Button>
                </ModalClose>
              }
              title="提示"
              trigger={<Button shadow>更新提示</Button>}
            >
              更新完成！请手动重启游戏...
            </Modal>

            <Modal
              bodyClassName="showcase__modal-copy"
              headerRuneText="AGE NOTICE"
              title="适龄提示"
              trigger={<Button material="paper">适龄提示</Button>}
            >
              {guidanceCopy.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </Modal>

            <Modal
              footer={
                <ModalClose asChild>
                  <Button material="paper">知道了</Button>
                </ModalClose>
              }
              header={false}
              trigger={<Button material="stone">无标题弹窗</Button>}
              width={520}
            >
              背包空间不足，请整理后再继续。
            </Modal>
          </div>
        </section>
      </section>
    </main>
  )
}

createRoot(app).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
