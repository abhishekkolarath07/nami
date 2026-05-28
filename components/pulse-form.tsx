"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface Props {
  beachId: string
}

export default function PulseForm({
  beachId,
}: Props) {

  const [message, setMessage] =
    useState("")

  const [uploading, setUploading] =
    useState(false)

  const [image, setImage] =
    useState<File | null>(null)

  const [handle, setHandle] =
    useState("")

  const [userId, setUserId] =
    useState("")

  useEffect(() => {

    async function loadUser() {

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      setUserId(user.id)

      const { data } = await supabase
        .from("profiles")
        .select("handle")
        .eq("id", user.id)
        .single()

      if (data?.handle) {
        setHandle(data.handle)
      }
    }

    loadUser()

  }, [])

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault()

    if (!message.trim()) return

    setUploading(true)

    let imageUrl = ""

    // OPTIONAL IMAGE
    if (image) {

      const fileName =
        `${Date.now()}-${image.name}`

      const { error } = await supabase
        .storage
        .from("pulse-media")
        .upload(fileName, image)

      if (!error) {

        const { data } = supabase
          .storage
          .from("pulse-media")
          .getPublicUrl(fileName)

        imageUrl = data.publicUrl
      }
    }

    // INSERT PULSE
    await supabase
      .from("pulses")
      .insert({
        beach_id: beachId,
        message,
        image_url: imageUrl,
        user_id: userId,
        handle,
      })

    setMessage("")
    setImage(null)
    setUploading(false)
  }

  if (!userId) {

    return (
      <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-400">
        Enter the coastline to participate in the pulse.
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      {/* Message */}
      <textarea
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        placeholder={`Share the coastline energy, ${handle}...`}
        className="min-h-[120px] w-full rounded-[1.5rem] border border-white/10 bg-black/30 p-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
      />

      {/* Bottom Row */}
      <div className="flex items-center justify-between">

        {/* Attachment */}
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400 transition hover:text-white">

          <span>📎</span>

          <span>
            {image
              ? image.name
              : "Attach Photo"}
          </span>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(
                e.target.files?.[0] || null
              )
            }
            className="hidden"
          />

        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading}
          className="rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm text-white transition hover:bg-white/20"
        >
          {uploading
            ? "Sending..."
            : "Send Pulse"}
        </button>

      </div>

    </form>
  )
}