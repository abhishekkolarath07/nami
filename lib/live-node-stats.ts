import { supabase } from "./supabase"

export async function getLiveNodePresence(
  beachId: string
) {

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

  return count || 0
}