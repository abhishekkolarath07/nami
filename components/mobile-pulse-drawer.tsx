"use client"

import { useState } from "react"

import CoastlinePanel from "./coastline-panel"

interface Props {
  beachId: string
  slug: string
}

export default function MobilePulseDrawer({
  beachId,
  slug,
}: Props) {

  const [open, setOpen] =
    useState(false)

  return (
    <>

      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-28 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-5 py-3 text-sm text-white backdrop-blur-2xl md:hidden"
      >
        Explore Coastline
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 h-[85vh] rounded-t-[2rem] border-t border-white/10 bg-black/90 p-5 backdrop-blur-3xl transition-transform duration-300 md:hidden ${
          open
            ? "translate-y-0"
            : "translate-y-full"
        }`}
      >

        {/* Handle */}
        <div className="mx-auto mb-5 h-1 w-14 rounded-full bg-white/20" />

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">

          <div>

            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              COASTLINE
            </p>

            <h2 className="mt-2 text-xl text-white">
              Explore Coastline
            </h2>

          </div>

          <button
            onClick={() => setOpen(false)}
            className="text-sm text-zinc-400"
          >
            Close
          </button>

        </div>

        {/* Coastline Content */}
        <div className="h-[calc(100%-80px)] overflow-y-auto">

          <CoastlinePanel
            beachId={beachId}
            slug={slug}
          />

        </div>

      </div>

    </>
  )
}