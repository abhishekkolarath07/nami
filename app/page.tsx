export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur">
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          Rajodi Live
        </div>

        <h1 className="text-7xl font-semibold tracking-tight">
          Nami
        </h1>

        <p className="max-w-md text-zinc-400 text-lg">
          Live coastal communities.
        </p>

        <a
          href="/beach/rajodi"
          className="inline-flex items-center rounded-full border border-white/10 px-6 py-3 text-sm hover:bg-white hover:text-black transition-all duration-300"
        >
          Enter Rajodi
        </a>

      </div>
    </main>
  )
}