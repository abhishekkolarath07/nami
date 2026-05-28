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

      const {
        data: { session },
      } = await supabase.auth.getSession()

      // NO SESSION
      if (!session) {

        setAuthenticated(false)
        setLoading(false)

        return
      }

      const user = session.user

      setAuthenticated(true)
      setUserId(user.id)

      // PROFILE CHECK
      const { data, error } = await supabase
        .from("profiles")
        .select("handle")
        .eq("id", user.id)
        .maybeSingle()

      // PROFILE EXISTS
      if (data?.handle) {
        setHasHandle(true)
      } else {
        setHasHandle(false)
      }

      // EVEN IF PROFILE FAILS
      // NEVER BLOCK APP
      if (error) {
        console.log(error)
      }

      setLoading(false)

    } catch (err) {

      console.log(err)

      setLoading(false)
    }
  }

  useEffect(() => {

    loadUser()

    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange(
      async (event) => {

        // IGNORE TOKEN REFRESH
        if (
          event === "TOKEN_REFRESHED"
        ) return

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