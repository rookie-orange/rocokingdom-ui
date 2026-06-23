import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from 'rocokingdom-ui'
import heroUrl from '../assets/hero.png'
import backgroundUrl from '../assets/rocom-home-bg.jpg'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const navigate = useNavigate()

  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden bg-stone px-6 py-20 text-on-stone max-sm:px-4 max-sm:py-14">
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
        src={backgroundUrl}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0_/_0.36),rgb(29_24_18_/_0.56)),radial-gradient(circle_at_center,rgb(255_255_255_/_0.08),transparent_58%)]"
      />
      <img
        alt=""
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 w-[min(58rem,92vw)] -translate-x-1/2 -translate-y-1/2 opacity-35 mix-blend-screen max-sm:w-[34rem]"
        src={heroUrl}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-3 opacity-90 max-sm:bottom-6"
      >
        <span className="size-3 rounded-full bg-primary-soft" />
        <span className="size-3 rounded-full bg-primary" />
        <span className="size-3 rounded-full bg-primary-muted" />
        <span className="size-3 rounded-full bg-primary-strong" />
        <span className="size-3 rounded-full bg-success" />
        <span className="size-3 rounded-full bg-danger" />
      </div>
      <section
        aria-label="Rocokingdom UI"
        className="relative z-10 grid w-full max-w-6xl justify-items-center"
      >
        <div aria-label="洛克王国 UI" className="flex gap-2 items-center justify-center">
          <p className="flex flex-col">
            <span className="text-8xl">洛克王国</span>
            <span className="text-5xl tracking-[0.22em]">ROCOKINGDOM</span>
          </p>
          <p className="text-[13rem] leading-none">UI</p>
        </div>

        <div className="flex mt-20 gap-4 items-center justify-center w-full">
          <Button material="stone" rootClassName="font-roco text-xl!" size="large">
            npm install rocokingdom-ui
          </Button>
          <Button
            material="paper"
            onClick={() => navigate({ to: '/docs' })}
            rootClassName="font-roco text-lg font-black min-w-44"
            shadow
            size="large"
          >
            前往文档
          </Button>
        </div>
      </section>
    </main>
  )
}
