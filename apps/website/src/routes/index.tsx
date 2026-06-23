import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button, RuneText } from 'rocokingdom-ui'
import heroUrl from '../assets/hero.png'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const navigate = useNavigate()

  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden bg-stone px-6 py-20 text-on-stone max-sm:px-4 max-sm:py-14">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,var(--primary-soft),var(--primary),var(--primary-muted),var(--primary-strong),var(--success),var(--danger))]"
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
        <div
          aria-label="洛克王国 UI"
          className="grid items-center justify-center gap-5 text-center font-roco tracking-normal max-sm:gap-3"
        >
          <span className="whitespace-nowrap text-9xl font-black leading-none tracking-normal text-paper max-lg:text-7xl max-sm:text-5xl">
            洛克王国
          </span>
          <RuneText className="whitespace-nowrap text-5xl! text-primary font-black leading-none tracking-normal max-lg:text-4xl max-sm:text-3xl">
            ROCOKINGDOM:UI
          </RuneText>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-4 max-sm:mt-14">
          <Button
            material="primaryStrong"
            onClick={() => navigate({ to: '/docs' })}
            rootClassName="font-roco text-lg font-black"
            shadow
            size="large"
          >
            前往文档
          </Button>
          <Button
            material="paper"
            onClick={() => navigate({ to: '/examples' })}
            rootClassName="font-roco text-lg font-black"
            shadow
            size="large"
          >
            浏览示例
          </Button>
        </div>
      </section>
    </main>
  )
}
