"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface Pulse {
  id: string
  message: string
  created_at: string
  image_url?: string
  handle?: string
}

interface Props {
  beachId: string
}

export default function LivePulseFeed({
  beachId,
}: Props) {

  const [pulses, setPulses] =
    useState<Pulse[]>([])

  async function fetchPulses() {

    const { data } = await supabase
      .from("pulses")
      .select("*")
      .eq("beach_id", beachId)
      .order("created_at", {
        ascending: false,
      })
      .limit(20)

    if (data) {
      setPulses(data)
    }
  }

  function formatTime(
    timestamp: string
  ) {

    const seconds =
      Math.floor(
        (Date.now() -
          new Date(timestamp).getTime()) / 1000
      )

    if (seconds < 60) {
      return "just now"
    }

    const minutes =
      Math.floor(seconds / 60)

    if (minutes < 60) {
      return `${minutes} min ago`
    }

    const hours =
      Math.floor(minutes / 60)

    return `${hours} hr ago`
  }

  useEffect(() => {

    fetchPulses()

    const channel = supabase.channel(
      `pulse-${beachId}-${Math.random()}`
    )

    channel.on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "pulses",
      },
      () => {
        fetchPulses()
      }
    )

    channel.subscribe()

    return () => {
      supabase.removeChannel(channel)
    }

  }, [beachId])

  return (
    <div className="space-y-4">

      {pulses.map((pulse) => (

        <div
          key={pulse.id}
          className="rounded-[1.5rem] border border-white/5 bg-white/5 p-4 backdrop-blur-xl"
        >

          {/* Handle */}
          <div className="flex items-center gap-2">

            <div className="h-2 w-2 rounded-full bg-emerald-400" />

            <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">
              {pulse.handle || "Coastline Presence"}
            </p>

          </div>

          {/* Message */}
          <p className="mt-3 text-sm leading-relaxed text-zinc-200">
            {pulse.message}
          </p>

          {/* Image */}
          {pulse.image_url && (

            <img
              src={pulse.image_url}
              alt="Pulse"
              className="mt-4 rounded-2xl border border-white/10 object-cover"
            />

          )}

          {/* Time */}
          <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            {formatTime(pulse.created_at)}
          </p>

        </div>

      ))}

    </div>
  )
}