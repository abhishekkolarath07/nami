import type { Metadata } from "next"

import "./globals.css"

import AuthGate from "@/components/auth-gate"

export const metadata: Metadata = {
  title: "Nami",
  description:
    "Live immersive coastline presence.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">

      <body className="bg-black text-white antialiased">

        <AuthGate>
          {children}
        </AuthGate>

      </body>

    </html>
  )
}