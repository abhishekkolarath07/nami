import { surfNodes } from "@/lib/surf-nodes"
import { getWeather } from "@/lib/weather"

interface Props {
  slug: string
}

export default async function SurfIntelligence({
  slug,
}: Props) {

  const node =
    surfNodes[slug as keyof typeof surfNodes]

  if (!node) return null

  const weather = await getWeather(
    node.coordinates.lat,
    node.coordinates.lon
  )

  const temp = weather?.main?.temp ?? "--"

  const windSpeed =
    weather?.wind?.speed ?? "--"

  const weatherCondition =
    weather?.weather?.[0]?.main ??
    "Unavailable"

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-2xl">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div>

          <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
            AI SURF INTELLIGENCE
          </p>

          <h2 className="display-font mt-2 text-4xl tracking-tight text-white">
            {node.name}
          </h2>

          <p className="mt-3 max-w-2xl text-zinc-400">
            {node.tagline}
          </p>

        </div>

        <div className="rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-400">
          Live Analysis
        </div>

      </div>

      {/* Score */}
      <div className="mb-10 flex items-end gap-4">

        <h1 className="display-font text-7xl font-semibold tracking-tight text-white">
          {node.surfScore}
        </h1>

        <div className="pb-3">

          <p className="text-zinc-400">
            Surf Score
          </p>

          <p className="text-sm text-green-400">
            {node.condition}
          </p>

        </div>

      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2">

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

          <p className="text-sm text-zinc-500">
            Wave Height
          </p>

          <p className="mt-2 text-2xl text-white">
            {node.waveHeight}
          </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

          <p className="text-sm text-zinc-500">
            Wind Speed
          </p>

          <p className="mt-2 text-2xl text-white">
            {windSpeed} m/s
          </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

          <p className="text-sm text-zinc-500">
            Temperature
          </p>

          <p className="mt-2 text-2xl text-white">
            {temp}°C
          </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

          <p className="text-sm text-zinc-500">
            Weather
          </p>

          <p className="mt-2 text-2xl text-white">
            {weatherCondition}
          </p>

        </div>

      </div>

      {/* Personality Layer */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

          <p className="text-sm text-zinc-500">
            Surf Type
          </p>

          <p className="mt-2 text-xl text-white">
            {node.surfType}
          </p>

        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

          <p className="text-sm text-zinc-500">
            Personality
          </p>

          <p className="mt-2 text-xl text-white">
            {node.personality}
          </p>

        </div>

      </div>

      {/* Atmosphere */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">

        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
          Atmosphere
        </p>

        <p className="mt-3 text-zinc-300 leading-relaxed">
          {node.atmosphere}
        </p>

      </div>

      {/* AI Insight */}
      <div className="mt-8 rounded-2xl border border-cyan-500/10 bg-cyan-500/5 p-5">

        <p className="text-sm leading-relaxed text-zinc-300">
          {node.insight}
        </p>

      </div>

    </div>
  )
}