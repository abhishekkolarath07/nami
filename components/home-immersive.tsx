import Link from "next/link"

import { supabase } from "@/lib/supabase"
import { getLiveNodePresence } from "@/lib/live-node-stats"

export default async function HomeImmersive() {

  // FETCH BEACHES
  const { data: beaches } = await supabase
    .from("beaches")
    .select("*")

  const rajodi =
    beaches?.find(
      (b) => b.slug === "rajodi"
    )

  const wavedutts =
    beaches?.find(
      (b) => b.slug === "wavedutts-sandbar"
    )

  // LIVE PRESENCE
  const rajodiPresence =
    rajodi
      ? await getLiveNodePresence(rajodi.id)
      : 0

  const waveduttsPresence =
    wavedutts
      ? await getLiveNodePresence(wavedutts.id)
      : 0

  return (
    <main className="relative h-screen overflow-hidden bg-black text-white">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="/videos/home.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/10" />

      {/* Main Content */}
      <div className="relative z-20 flex h-full flex-col justify-between p-6 md:p-10">

        {/* TOP */}
        <div>

          <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 md:text-xs">
            LIVE COASTLINE NETWORK
          </p>

        </div>

        {/* CENTER */}
        <div className="flex flex-col items-center text-center">

          <h1 className="display-font text-6xl leading-none text-white md:text-9xl">
            NAMI
          </h1>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-300 md:text-base">
            Immersive environmental intelligence for living coastlines.
          </p>

        </div>

        {/* NODE PORTALS */}
        <div className="grid gap-4 md:grid-cols-2">

          {/* Rajodi */}
          <Link
            href="/beach/rajodi"
            className="group rounded-[2rem] border border-white/10 bg-black/30 p-6 backdrop-blur-2xl transition duration-300 hover:bg-black/40"
          >

            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              ACTIVE NODE
            </p>

            <h2 className="display-font mt-4 text-3xl text-white">
              Rajodi Point Break
            </h2>

            <p className="mt-3 text-sm text-zinc-300">
              Dense pulse energy with rising coastal movement.
            </p>

            <div className="mt-6 flex items-center justify-between">

              <p className="text-sm text-zinc-400">
                {rajodiPresence} present
              </p>

              <p className="text-sm text-zinc-500 transition group-hover:text-white">
                Enter Node →
              </p>

            </div>

          </Link>

          {/* Wavedutt */}
          <Link
            href="/beach/wavedutts-sandbar"
            className="group rounded-[2rem] border border-white/10 bg-black/20 p-6 backdrop-blur-2xl transition duration-300 hover:bg-black/30"
          >

            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              ACTIVE NODE
            </p>

            <h2 className="display-font mt-4 text-3xl text-white">
              Wavedutt’s Sandbar
            </h2>

            <p className="mt-3 text-sm text-zinc-300">
              Cleaner offshore calm settling across the shoreline.
            </p>

            <div className="mt-6 flex items-center justify-between">

              <p className="text-sm text-zinc-400">
                {waveduttsPresence} present
              </p>

              <p className="text-sm text-zinc-500 transition group-hover:text-white">
                Enter Node →
              </p>

            </div>

          </Link>

        </div>

      </div>

    </main>
  )
}