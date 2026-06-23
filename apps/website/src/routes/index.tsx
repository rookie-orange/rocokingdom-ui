import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button, RuneText } from 'rocokingdom-ui'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const navigate = useNavigate()

  return (
    <main className="grid min-h-svh place-items-center bg-stone px-6 py-20 text-on-stone max-sm:px-4 max-sm:py-14">
      <section aria-label="Rocokingdom UI" className="grid w-full max-w-6xl justify-items-center">
        <div
          aria-label="洛克王国 UI"
          className="grid items-center justify-center gap-5 text-center font-roco tracking-normal max-sm:gap-3"
        >
          <span className="whitespace-nowrap text-9xl font-black leading-none tracking-normal text-paper max-lg:text-7xl max-sm:text-5xl">
            洛克王国
          </span>
          <RuneText className="whitespace-nowrap text-5xl! text-paper font-black leading-none tracking-normal max-lg:text-4xl max-sm:text-3xl">
            ROCOKINGDOM:UI
          </RuneText>
        </div>

        <div className="mt-20 flex justify-center max-sm:mt-14">
          <Button
            material="default"
            onClick={() => navigate({ to: '/docs' })}
            rootClassName="font-roco text-lg font-black"
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
