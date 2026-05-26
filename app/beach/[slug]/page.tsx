import { supabase } from "@/lib/supabase"
import PulseForm from "@/components/pulse-form"
import PulseFeed from "@/components/pulse-feed"
import LivePlayer from "@/components/live-player"

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function BeachPage({ params }: Props) {
  const { slug } = await params

  const { data: beach, error } = await supabase
    .from("beaches")
    .select("*")
    .eq("slug", slug)
    .maybeSingle()

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Database error.</p>
      </main>
    )
  }

  if (!beach) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Beach not found.</p>
      </main>
    )
  }

  const { data: pulsePosts } = await supabase
    .from("pulse_posts")
    .select("*")
    .eq("beach_id", beach.id)
    .order("created_at", { ascending: false })
    .limit(10)

  const { data: activities } = await supabase
    .from("activities")
    .select("*")
    .eq("beach_id", beach.id)
    .order("created_at", { ascending: false })
    .limit(3)

  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      {/* HERO */}
      <section className="relative h-[78vh] overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')] bg-cover bg-center opacity-40" />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-10 md:p-16">

          <div className="space-y-6">

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm backdrop-blur-xl">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              LIVE NOW
            </div>

            <div className="space-y-3">

              <h1 className="text-6xl font-semibold tracking-tight md:text-8xl">
                {beach.name}
              </h1>

              <p className="max-w-2xl text-lg text-zinc-300 md:text-xl">
                Live coastal conditions and local community pulse.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                <span>23 people around</span>
                <span>•</span>
                <span>Sunset conditions</span>
                <span>•</span>
                <span>28°C</span>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* LIVE CAMERA */}
      <section className="px-6 pb-4 md:px-10">
        <LivePlayer />
      </section>

      {/* CONTENT GRID */}
      <section className="grid gap-6 p-6 md:p-10 lg:grid-cols-4">

        {/* CONDITIONS */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-2xl">

          <h2 className="mb-6 text-xl font-semibold">
            Conditions
          </h2>

          <div className="space-y-4 text-zinc-300">

            <div>
              <p className="text-sm text-zinc-500">
                Wave
              </p>

              <p className="text-lg">
                Fair
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Wind
              </p>

              <p className="text-lg">
                Offshore
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Tide
              </p>

              <p className="text-lg">
                Rising
              </p>
            </div>

          </div>

        </div>

        {/* COMMUNITY PULSE */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-2xl">

          <h2 className="mb-6 text-xl font-semibold">
            Community Pulse
          </h2>

          <PulseFeed initialPosts={pulsePosts || []} />

        </div>

        {/* ACTIVITIES */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-2xl">

          <h2 className="mb-6 text-xl font-semibold">
            Activity
          </h2>

          <div className="space-y-5">

            {activities && activities.length > 0 ? (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="border-b border-white/10 pb-4"
                >
                  <p className="text-lg text-zinc-200">
                    {activity.title}
                  </p>

                  <p className="mt-2 text-sm text-zinc-500">
                    {activity.attendees} attending
                  </p>
                </div>
              ))
            ) : (
              <p className="text-zinc-500">
                No activities yet.
              </p>
            )}

          </div>

        </div>

        {/* SHARE UPDATE */}
        <PulseForm beachId={beach.id} />

      </section>

    </main>
  )
}