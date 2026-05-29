"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

interface Props {
  userId: string
  onComplete: () => void
}

export default function HandleOnboarding({
  userId,
  onComplete,
}: Props) {

  const [handle, setHandle] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  async function saveHandle() {

    if (!handle.trim()) return

    setLoading(true)

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        handle,
      })

    setLoading(false)

    if (!error) {
      onComplete()
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-2xl">

      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-black/60 p-8 backdrop-blur-2xl">

        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
          COASTAL IDENTITY
        </p>

        <h2 className="display-font mt-4 text-4xl text-white">
          Choose Your Presence
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          This is how the coastline will know you.
        </p>

        <input
          type="text"
          placeholder="DriftObserver"
          value={handle}
          onChange={(e) =>
            setHandle(e.target.value)
          }
          className="mt-6 w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
        />

        <button
          onClick={saveHandle}
          disabled={loading}
          className="mt-5 w-full rounded-full border border-white/10 bg-white/10 py-3 text-sm text-white transition hover:bg-white/20"
        >
          {loading
            ? "Entering Coastline..."
            : "Enter Coastline"}
        </button>

      </div>

    </div>
  )
}