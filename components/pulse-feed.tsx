"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { formatDistanceToNow } from "date-fns"

interface PulsePost {
  id: string
  content: string
  created_at: string
}

export default function PulseFeed({
  initialPosts,
}: {
  initialPosts: PulsePost[]
}) {
  const [posts, setPosts] = useState(initialPosts)

  useEffect(() => {
    const channel = supabase
      .channel("pulse-feed")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "pulse_posts",
        },
        (payload) => {
          setPosts((current) => [
            payload.new as PulsePost,
            ...current,
          ])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="space-y-5">

      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            className="border-b border-white/10 pb-4"
          >
            <p className="text-zinc-200 leading-relaxed">
              “{post.content}”
            </p>

            <p className="mt-2 text-xs text-zinc-500">
              {formatDistanceToNow(new Date(post.created_at), {
                addSuffix: true,
              })}
            </p>
          </div>
        ))
      ) : (
        <p className="text-zinc-500">
          No updates yet.
        </p>
      )}

    </div>
  )
}