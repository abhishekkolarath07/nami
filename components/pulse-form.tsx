"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function PulseForm({
  beachId,
}: {
  beachId: string
}) {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!content.trim()) return

    setLoading(true)

    const { error } = await supabase
      .from("pulse_posts")
      .insert({
        beach_id: beachId,
        content,
      })

    if (!error) {
      setContent("")
    }

    setLoading(false)
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-2xl">

      <h2 className="mb-6 text-xl font-semibold">
        Share an Update
      </h2>

      <div className="space-y-4">

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening at Rajodi?"
          rows={5}
          className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-zinc-500"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-full bg-white px-5 py-2 text-sm text-black transition hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Update"}
        </button>

      </div>

    </div>
  )
}