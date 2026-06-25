import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from 'rocokingdom-ui'
import birdFlightUrl from '../assets/roco-bird-flight.png'
import logoUrl from '../assets/roco-kingdom-logo.png'
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
        <img
          alt="洛克王国 Rocokingdom UI"
          className="max-h-4/5 object-contain h-64 drop-shadow-2xl drop-shadow-stone"
          src={logoUrl}
        />

        <div className="mt-2 flex w-full flex-wrap items-center justify-center gap-4 max-sm:mt-12 max-sm:flex-col">
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
