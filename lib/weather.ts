export async function getWeather(
    lat: number,
    lon: number
  ) {
    try {
  
      const apiKey =
        process.env.OPENWEATHER_API_KEY
  
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
        {
          next: {
            revalidate: 300,
          },
        }
      )
  
      if (!res.ok) {
        return null
      }
  
      return res.json()
  
    } catch {
      return null
    }
  }