interface EnvironmentInput {
    tide: "rising" | "falling" | "high" | "low"
    wind: "offshore" | "onshore" | "calm"
    time: "morning" | "sunset" | "night"
    weather: string
    crowd: number
  }
  
  export function generateEnvironmentalState({
    tide,
    wind,
    time,
    weather,
    crowd,
  }: EnvironmentInput) {
  
    // RAIN CONDITIONS
    if (
      weather.toLowerCase().includes("rain")
    ) {
      return "Rain drifting softly across the coastline."
    }
  
    // STORM CONDITIONS
    if (
      weather.toLowerCase().includes("storm")
    ) {
      return "Heavy ocean energy building offshore."
    }
  
    // SUNSET + RISING TIDE
    if (
      tide === "rising" &&
      time === "sunset"
    ) {
      return "Incoming tidal window forming slowly."
    }
  
    // CLEAN OFFSHORE
    if (
      wind === "offshore" &&
      tide === "rising"
    ) {
      return "Cleaner offshore conditions stabilizing."
    }
  
    // CALM CONDITIONS
    if (
      wind === "calm"
    ) {
      return "Glassier water texture settling across the bay."
    }
  
    // QUIET MORNING
    if (
      time === "morning" &&
      crowd < 5
    ) {
      return "Quiet morning energy across the coastline."
    }
  
    // CROWD BUILDUP
    if (
      crowd > 10
    ) {
      return "Session energy building across the lineup."
    }
  
    // NIGHT CONDITIONS
    if (
      time === "night"
    ) {
      return "Low-light coastal calm settling over the shoreline."
    }
  
    // DEFAULT STATE
    return "Calm environmental conditions holding steady."
  }