import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from 'rocokingdom-ui'
import birdFlightUrl from '../assets/roco-bird-flight.png'
import backgroundUrl from '../assets/roco-map-bg.png'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const birdClassNames = [
  'home-bird home-bird--one',
  'home-bird home-bird--two',
  'home-bird home-bird--three',
] as const

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
      <BirdFlight />
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 z-2 flex -translate-x-1/2 gap-3 opacity-90 max-sm:bottom-6"
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
          className="flex flex-wrap items-center justify-center gap-2 text-center drop-shadow-2xl drop-shadow-stone max-sm:gap-1"
        >
          <p className="flex flex-col">
            <span className="text-8xl max-md:text-7xl max-sm:text-5xl">洛克王国</span>
            <span className="text-5xl tracking-[0.22em] max-md:text-4xl max-sm:text-2xl max-sm:tracking-[0.16em]">
              ROCOKINGDOM
            </span>
          </p>
          <p className="text-[13rem] leading-none max-md:text-[9rem] max-sm:text-[5.5rem]">UI</p>
        </div>

        <div className="mt-20 flex w-full flex-wrap items-center justify-center gap-4 max-sm:mt-12 max-sm:flex-col">
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

function BirdFlight() {
  return (
    <div aria-hidden="true" className="home-bird-flight">
      {birdClassNames.map((className) => (
        <span className={className} key={className}>
          <img alt="" className="home-bird__sprite" draggable="false" src={birdFlightUrl} />
        </span>
      ))}
    </div>
  )
}
