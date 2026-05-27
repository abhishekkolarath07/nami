interface EnvironmentData {
    wind: "offshore" | "onshore" | "calm"
    time: "morning" | "sunset" | "night"
    weather: string
  }
  
  export async function getEnvironmentData(): Promise<EnvironmentData> {
  
    const response = await fetch(
  
      `https://api.openweathermap.org/data/2.5/weather?lat=19.3516&lon=72.7514&appid=${process.env.OPENWEATHER_API_KEY}`,
  
      {
        next: {
          revalidate: 300,
        },
      }
    )
  
    const data = await response.json()
  
    // TIME
    const hour =
      new Date().getHours()
  
    let time:
      | "morning"
      | "sunset"
      | "night"
  
    if (hour >= 5 && hour < 12) {
      time = "morning"
    } else if (hour >= 12 && hour < 19) {
      time = "sunset"
    } else {
      time = "night"
    }
  
    // WIND
    const windSpeed =
      data.wind?.speed || 0
  
    let wind:
      | "offshore"
      | "onshore"
      | "calm"
  
    if (windSpeed < 2) {
      wind = "calm"
    } else if (windSpeed < 6) {
      wind = "offshore"
    } else {
      wind = "onshore"
    }
  
    // WEATHER
    const weather =
      data.weather?.[0]?.main || "Clear"
  
    return {
      wind,
      time,
      weather,
    }
  }