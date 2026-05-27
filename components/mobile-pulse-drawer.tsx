"use client"

import { useState } from "react"

import LivePulseFeed from "./live-pulse-feed"
import PulseForm from "./pulse-form"

interface Props {
  beachId: string
}

export default function MobilePulseDrawer({
  beachId,
}: Props) {

  const [open, setOpen] =
    useState(false)

  return (
    <>

      {/* Floating Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-28 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-5 py-3 text-sm text-white backdrop-blur-2xl md:hidden"
      >
        Community Pulse
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-[2rem] border-t border-white/10 bg-black/80 p-5 backdrop-blur-3xl transition-transform duration-300 md:hidden ${
          open
            ? "translate-y-0"
            : "translate-y-full"
        }`}
      >

        {/* Handle */}
        <div className="mx-auto mb-5 h-1 w-14 rounded-full bg-white/20" />

        <div className="flex items-center justify-between">

          <div>

            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              LIVE COMMUNITY
            </p>

            <h2 className="mt-2 text-xl text-white">
              Coastal Pulse
            </h2>

          </div>

          <button
            onClick={() => setOpen(false)}
            className="text-sm text-zinc-400"
          >
            Close
          </button>

        </div>

        {/* Feed */}
        <div className="mt-6 max-h-[40vh] overflow-y-auto">

          <LivePulseFeed beachId={beachId} />

        </div>

        {/* Form */}
        <div className="mt-5">

          <PulseForm beachId={beachId} />

        </div>

      </div>

    </>
  )
}