import JoinSession from "./join-session"
import LivePresence from "./live-presence"
import EnvironmentalState from "./environmental-state"
import MobilePulseDrawer from "./mobile-pulse-drawer"
import CoastlinePanel from "./coastline-panel"

interface Props {
  beachId: string
  slug: string
  name: string
  tagline: string
  energy: string
  environmentalState: string

  theme: {
    video: string
    overlay: string
    gradient: string
    pulseStyle: string
    atmosphere: string
    glow: string
  }
}

export default function ImmersiveNode({
  beachId,
  slug,
  name,
  tagline,
  energy,
  environmentalState,
  theme,
}: Props) {

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      >
        <source
          src={theme.video}
          type="video/mp4"
        />
      </video>

      {/* Dynamic Overlay */}
      <div
        className={`pointer-events-none absolute inset-0 ${theme.overlay}`}
      />

      {/* Dynamic Gradient */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${theme.gradient}`}
      />

      {/* Main Layout */}
      <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col justify-between gap-6 p-5 md:p-8">

        {/* TOP SECTION */}
        <div>

          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 md:text-xs">
            LIVE COASTLINE
          </p>

          <h1 className="display-font mt-4 max-w-[90%] text-4xl leading-none text-white md:max-w-[620px] md:text-6xl">
            {name}
          </h1>

          <p className="mt-4 max-w-[320px] text-sm leading-relaxed text-zinc-300 md:max-w-md md:text-base">
            {tagline}
          </p>

          {/* Environmental State */}
          <div className="mt-6">
            <EnvironmentalState
              state={environmentalState}
            />
          </div>

        </div>

        {/* DESKTOP COASTLINE PANEL */}
        <div className="hidden justify-end pb-4 md:flex">

          <CoastlinePanel
            beachId={beachId}
            slug={slug}
          />

        </div>

        {/* MOBILE COMMUNITY DRAWER */}
        <MobilePulseDrawer beachId={beachId} />

        {/* BOTTOM HUD */}
        <div
          className={`mt-2 flex items-center justify-between gap-4 rounded-[2rem] border border-white/10 bg-black/30 p-4 backdrop-blur-2xl ${theme.glow}`}
        >

          {/* Presence */}
          <div>

            <LivePresence beachId={beachId} />

            <p className="display-font mt-2 text-lg leading-tight text-white md:text-2xl">
              {energy}
            </p>

          </div>

          {/* Join Session */}
          <JoinSession beachId={beachId} />

        </div>

      </div>

    </section>
  )
}