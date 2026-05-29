"use client"

import { useState } from "react"

import { coastlineContent } from "@/lib/coastline-content"

import LivePulseFeed from "./live-pulse-feed"
import PulseForm from "./pulse-form"

interface Props {
  beachId: string
  slug: string
}

export default function CoastlinePanel({
  beachId,
  slug,
}: Props) {

  const [tab, setTab] = useState<
    "pulse" | "events" | "local"
  >("pulse")

  const content =
    coastlineContent[
      slug as keyof typeof coastlineContent
    ]

  return (
    <div className="w-[360px] max-h-[70vh] overflow-y-auto rounded-[2rem] border border-white/10 bg-black/40 p-5 backdrop-blur-2xl">

      {/* Tabs */}
      <div className="mb-4 flex gap-2 border-b border-white/10 pb-4">

        <button
          onClick={() => setTab("pulse")}
          className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]
          ${
            tab === "pulse"
              ? "bg-white/10 text-white"
              : "text-zinc-500"
          }`}
        >
          Pulse
        </button>

        <button
          onClick={() => setTab("events")}
          className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]
          ${
            tab === "events"
              ? "bg-white/10 text-white"
              : "text-zinc-500"
          }`}
        >
          Events
        </button>

        <button
          onClick={() => setTab("local")}
          className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]
          ${
            tab === "local"
              ? "bg-white/10 text-white"
              : "text-zinc-500"
          }`}
        >
          Local
        </button>

      </div>

      {/* PULSE */}
      {tab === "pulse" && (

        <div>

          <LivePulseFeed beachId={beachId} />

          <div className="mt-4">
            <PulseForm beachId={beachId} />
          </div>

        </div>

      )}

      {/* EVENTS */}
      {tab === "events" && (

        <div className="space-y-3">

          {content?.events.map((event) => (

            <div
              key={event.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >

              <p className="text-white">
                {event.title}
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                {event.day} • {event.time}
              </p>

              <p className="mt-3 text-sm text-zinc-500">
                {event.description}
              </p>

            </div>

          ))}

        </div>

      )}

      {/* LOCAL */}
      {tab === "local" && (

        <div className="space-y-3">

          {content?.local.map((spot) => (

            <div
              key={spot.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >

              <p className="text-white">
                {spot.name}
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                {spot.category}
              </p>

              <p className="mt-3 text-sm text-zinc-500">
                {spot.description}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}