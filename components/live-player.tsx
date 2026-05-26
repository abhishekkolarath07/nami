"use client"

import { useEffect, useRef, useState } from "react"
import Hls from "hls.js"

export default function LivePlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const [loading, setLoading] = useState(true)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current

    const streamUrl =
      "http://localhost:8888/rajodi/index.m3u8"

    if (Hls.isSupported()) {
      const hls = new Hls({
        lowLatencyMode: true,
      })

      hls.loadSource(streamUrl)
      hls.attachMedia(video)

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoading(false)
        setIsLive(true)

        video.play()
      })

      hls.on(Hls.Events.ERROR, () => {
        setLoading(true)
        setIsLive(false)
      })

      return () => {
        hls.destroy()
      }
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl
    }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl">

      {/* VIDEO AREA */}
      <div className="relative aspect-video overflow-hidden bg-black">

        {/* VIDEO */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          controls
          className="h-full w-full object-cover"
        />

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md">

            <div className="flex flex-col items-center gap-4">

              <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />

              <p className="text-sm text-zinc-300">
                Connecting to Rajodi feed...
              </p>

            </div>

          </div>
        )}

        {/* Top Overlay */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">

          {/* LIVE BADGE */}
          <div className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/20 px-4 py-2 text-xs font-medium text-white backdrop-blur-xl">

            <div className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />

            {isLive ? "LIVE" : "OFFLINE"}

          </div>

          {/* STATUS */}
          <div className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs text-zinc-300 backdrop-blur-xl">
            {isLive ? "Signal Stable" : "Reconnecting"}
          </div>

        </div>

        {/* Bottom Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent" />

      </div>

      {/* INFO PANEL */}
      <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-2xl">

        {/* LEFT */}
        <div>

          <p className="text-lg font-medium text-white">
            Rajodi Beach
          </p>

          <p className="text-sm text-zinc-500">
            Live coastal conditions and surf activity
          </p>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-8 text-sm">

          <div>
            <p className="text-zinc-500">
              Watching
            </p>

            <p className="text-white">
              23 live
            </p>
          </div>

          <div>
            <p className="text-zinc-500">
              Stream
            </p>

            <p className="text-green-400">
              Stable
            </p>
          </div>

          <div>
            <p className="text-zinc-500">
              Latency
            </p>

            <p className="text-white">
              ~3s
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}