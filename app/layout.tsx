import type { Metadata } from "next"
import "./globals.css"

import {
  Inter,
  Cormorant_Garamond,
} from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Nami",
  description: "Realtime coastal intelligence.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorant.variable} bg-zinc-950 text-white antialiased`}
      >
        {children}
      </body>
    </html>
  )
}