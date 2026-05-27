export default function AmbientBackground() {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
  
        {/* Orb 1 */}
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] animate-pulse rounded-full bg-orange-500/10 blur-3xl" />
  
        {/* Orb 2 */}
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] animate-pulse rounded-full bg-cyan-500/10 blur-3xl" />
  
        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light">
          <div className="h-full w-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
  
      </div>
    )
  }