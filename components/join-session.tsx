"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

interface Props {
  beachId: string
}

export default function JoinSession({
  beachId,
}: Props) {

  const [joined, setJoined] =
    useState(false)

  const [loading, setLoading] =
    useState(false)

  async function handleJoin() {

    if (loading || joined) return

    setLoading(true)

    const { error } = await supabase
      .from("sessions")
      .insert({
        beach_id: beachId,
      })

    if (!error) {
      setJoined(true)
    }

    setLoading(false)
  }

  return (
    <button
      onClick={handleJoin}
      disabled={loading}
      className={`rounded-full border px-5 py-3 text-sm text-white backdrop-blur-xl transition

      ${
        joined
          ? "border-green-400/30 bg-green-400/10"
          : "border-white/10 bg-white/10 hover:bg-white/20"
      }`}
    >

      {loading
        ? "Joining..."
        : joined
        ? "Presence Active"
        : "Join Session"}

    </button>
  )
}