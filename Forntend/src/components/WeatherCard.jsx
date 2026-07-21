function getWeatherDisplay(description = '') {
  const normalized = description.toLowerCase()

  const mapping = {
    'clear sky': { label: 'Clear sky', icon: '☀️' },
    'few clouds': { label: 'A few clouds', icon: '🌤️' },
    'scattered clouds': { label: 'Scattered clouds', icon: '⛅' },
    'broken clouds': { label: 'Mostly cloudy', icon: '☁️' },
    'overcast clouds': { label: 'Completely cloudy', icon: '☁️' },
    mist: { label: 'Mist', icon: '🌫️' },
    fog: { label: 'Fog', icon: '🌁' },
    haze: { label: 'Haze', icon: '🌫️' },
    smoke: { label: 'Smoke', icon: '🌫️' },
    dust: { label: 'Dust', icon: '🌪️' },
    sand: { label: 'Sandstorm', icon: '🏜️' },
    ash: { label: 'Volcanic ash', icon: '🌋' },
    squall: { label: 'Sudden strong wind', icon: '💨' },
    tornado: { label: 'Tornado', icon: '🌪️' },
  }

  return mapping[normalized] || { label: description || 'Weather update', icon: '🌦️' }
}

function WeatherCard({ details, isLoading, errorMessage, favorites = [], onToggleFavorite }) {
  if (isLoading) {
    return (
      <section className="weather-card loading-card">
        <div className="loading-spinner" />
        <p>Loading weather...</p>
      </section>
    )
  }

  if (errorMessage) {
    return <section className="weather-card error-card">{errorMessage}</section>
  }

  if (!details) {
    return <section className="weather-card">Enter a city to see live weather.</section>
  }

  const weatherDisplay = getWeatherDisplay(details.weather)
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section className="weather-card">
      <div className="weather-header">
        <div>
          <p className="section-label">Current Weather</p>
          <h2>{details.city}{details.country ? `, ${details.country}` : ''}</h2>
        </div>
        <button className="favorite-btn" onClick={() => onToggleFavorite?.(details.city)}>
          {favorites.includes(details.city) ? '★' : '☆'}
        </button>
      </div>

      <p className="weather-date">{today}</p>

      <div className="weather-state-row">
        <p className="weather-summary">{weatherDisplay.label}</p>
        <span className="weather-emoji" aria-hidden="true">{weatherDisplay.icon}</span>
      </div>

      <p className="weather-temperature">{`${Math.round(details.temperature)}°C`}</p>
      <p className="weather-feels-like">Feels like {Math.round(details.feels_like || details.temperature)}°C</p>

      <div className="weather-sunrise-row">
        <span>🌅 Sunrise: {details.sunrise ? new Date(details.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</span>
        <span>🌇 Sunset: {details.sunset ? new Date(details.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'}</span>
      </div>

      <div className="weather-stats">
        <span>Humidity: {details.humidity}%</span>
        <span>Wind Speed: {details.wind_speed} m/s</span>
        <span>Pressure: {details.pressure} hPa</span>
        <span>Visibility: {Math.round((details.visibility || 0) / 1000)} km</span>
        <span>Min: {Math.round(details.temp_min || details.temperature)}°C</span>
        <span>Max: {Math.round(details.temp_max || details.temperature)}°C</span>
      </div>
    </section>
  )
}

export default WeatherCard