"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AuthModal() {

  const [email, setEmail] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [sent, setSent] =
    useState(false)

  async function signIn() {

    setLoading(true)

    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo:
          window.location.origin,
      },
    })

    setLoading(false)
    setSent(true)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-xl">

      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-black/60 p-8 backdrop-blur-2xl">

        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
          LIVE COASTLINE ACCESS
        </p>

        <h2 className="display-font mt-4 text-4xl text-white">
          Enter Nami
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          Enter your email to receive a magic link and join the live coastline.
        </p>

        {!sent ? (

          <div className="mt-6 space-y-4">

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
            />

            <button
              onClick={signIn}
              disabled={loading}
              className="w-full rounded-full border border-white/10 bg-white/10 py-3 text-sm text-white transition hover:bg-white/20"
            >
              {loading
                ? "Sending..."
                : "Send Magic Link"}
            </button>

          </div>

        ) : (

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
            Magic link sent. Check your inbox to enter the coastline.
          </div>

        )}

      </div>

    </div>
  )
}