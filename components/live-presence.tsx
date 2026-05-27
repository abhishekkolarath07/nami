"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface Props {
  beachId: string
}

export default function LivePresence({
  beachId,
}: Props) {

  const [count, setCount] =
    useState<number | null>(null)

  async function fetchCount() {

    const thirtyMinutesAgo =
      new Date(
        Date.now() - 30 * 60 * 1000
      ).toISOString()

    const { count } = await supabase
      .from("sessions")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("beach_id", beachId)
      .gte("created_at", thirtyMinutesAgo)

    setCount(count || 0)
  }

  useEffect(() => {

    fetchCount()

    const channel = supabase
      .channel(`presence-${beachId}`)

      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "sessions",
        },
        () => {
          fetchCount()
        }
      )

      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }

  }, [beachId])

  return (
    <p className="text-sm text-zinc-300">
      {count === null
        ? "Connecting..."
        : `${count} currently present`}
    </p>
  )
}