"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

interface Props {
  beachId: string
}

export default function PulseForm({
  beachId,
}: Props) {

  const [message, setMessage] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  async function submitPulse() {

    if (!message.trim()) return

    setLoading(true)

    await supabase
      .from("pulses")
      .insert({
        beach_id: beachId,
        message,
      })

    setMessage("")
    setLoading(false)
  }

  return (
    <div className="flex gap-2">

      <input
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        placeholder="Share coastline pulse..."
        className="w-full rounded-full border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none backdrop-blur-xl"
      />

      <button
        onClick={submitPulse}
        disabled={loading}
        className="rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm text-white transition hover:bg-white/20"
      >
        Send
      </button>

    </div>
  )
}