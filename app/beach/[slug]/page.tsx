import { supabase } from "@/lib/supabase"

import { surfNodes } from "@/lib/surf-nodes"
import { presence } from "@/lib/presence"

import { nodeThemes } from "@/lib/node-themes"

import { getEnvironmentData } from "@/lib/environment-data"
import { generateEnvironmentalState } from "@/lib/environment-engine"

import ImmersiveNode from "@/components/immersive-node"

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function BeachPage({
  params,
}: Props) {

  const { slug } = await params

  // NODE DATA
  const node =
    surfNodes[
      slug as keyof typeof surfNodes
    ]

  // NODE PRESENCE
  const nodePresence =
    presence[
      slug as keyof typeof presence
    ]

  // NODE THEME
  const theme =
    nodeThemes[
      slug as keyof typeof nodeThemes
    ]

  if (!node || !theme) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Node not found.
      </main>
    )
  }

  // FETCH BEACH RECORD
  const { data: beach } = await supabase
    .from("beaches")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!beach) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        Beach not found.
      </main>
    )
  }

  // REAL ENVIRONMENT DATA
  const environment =
    await getEnvironmentData()

  // ENVIRONMENTAL AI STATE
  const environmentalState =
    generateEnvironmentalState({
      tide: "rising",
      wind: environment.wind,
      time: environment.time,
      weather: environment.weather,
      crowd: 8,
    })

  return (
    <main className="bg-black text-white">

      <ImmersiveNode
        beachId={beach.id}
        slug={slug}
        name={node.name}
        tagline={node.tagline}
        energy={nodePresence?.energy ?? ""}
        environmentalState={environmentalState}
        theme={theme}
      />

    </main>
  )
}