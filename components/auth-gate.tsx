"use client"

import { useEffect, useState } from "react"

import { supabase } from "@/lib/supabase"

import AuthModal from "./auth-modal"
import HandleOnboarding from "./handle-onboarding"

interface Props {
  children: React.ReactNode
}

export default function AuthGate({
  children,
}: Props) {

  const [loading, setLoading] =
    useState(true)

  const [authenticated, setAuthenticated] =
    useState(false)

  const [hasHandle, setHasHandle] =
    useState(false)

  const [userId, setUserId] =
    useState("")

  async function loadUser() {

    try {

      console.log("LOAD USER STARTED")

      const {
        data: { session },
      } = await supabase.auth.getSession()

      console.log("SESSION:", session)

      // NO SESSION
      if (!session) {

        console.log("NO SESSION FOUND")

        setAuthenticated(false)
        setLoading(false)

        return
      }

      const user = session.user

      console.log("USER ID:", user.id)

      setAuthenticated(true)
      setUserId(user.id)

      // PROFILE CHECK
      const { data, error } = await supabase
        .from("profiles")
        .select("handle")
        .eq("id", user.id)
        .maybeSingle()

      console.log("PROFILE DATA:", data)
      console.log("PROFILE ERROR:", error)

      // PROFILE EXISTS
      if (data?.handle) {

        console.log("HANDLE FOUND:", data.handle)

        setHasHandle(true)

      } else {

        console.log("NO HANDLE FOUND")

        setHasHandle(false)

      }

      if (error) {
        console.log("PROFILE QUERY ERROR:", error)
      }

      console.log("LOAD USER COMPLETE")

      setLoading(false)

    } catch (err) {

      console.log("LOAD USER CRASHED:", err)

      setLoading(false)
    }
  }

  useEffect(() => {

    loadUser()

    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange(
      async (event) => {

        console.log("AUTH EVENT:", event)

        // Ignore startup auth events
        if (
          event === "SIGNED_IN" ||
          event === "TOKEN_REFRESHED"
        ) {
          return
        }

        await loadUser()
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }

  }, [])

  // LOADING
  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-sm tracking-[0.2em] text-zinc-500">
        ENTERING COASTLINE...
      </div>
    )
  }

  // NOT AUTHENTICATED
  if (!authenticated) {
    return <AuthModal />
  }

  // NO HANDLE YET
  if (!hasHandle) {

    return (
      <HandleOnboarding
        userId={userId}
        onComplete={() =>
          setHasHandle(true)
        }
      />
    )
  }

  // SUCCESS
  return <>{children}</>
}