interface Props {
    state: string
  }
  
  export default function EnvironmentalState({
    state,
  }: Props) {
  
    return (
      <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 backdrop-blur-2xl">
  
        <p className="text-xs uppercase tracking-[0.22em] text-zinc-400">
          ENVIRONMENTAL STATE
        </p>
  
        <p className="mt-2 text-sm text-zinc-100">
          {state}
        </p>
  
      </div>
    )
  }