import { useEffect, useMemo, useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import WeatherCard from './components/WeatherCard.jsx'
import Forecast from './components/Forecast.jsx'
import './App.css'

const STORAGE_KEYS = {
  favorites: 'weather-favorites',
  history: 'weather-history',
  theme: 'weather-theme',
}

function App() {
  const [city, setCity] = useState('')
  const [weatherDetails, setWeatherDetails] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [history, setHistory] = useState([])
  const [theme, setTheme] = useState('light')
  const forecastDays = [
    { day: 'Mon', temp: 31, weather: 'Sunny', icon: '☀️' },
    { day: 'Tue', temp: 29, weather: 'Rain', icon: '🌧️' },
    { day: 'Wed', temp: 27, weather: 'Cloudy', icon: '☁️' },
    { day: 'Thu', temp: 30, weather: 'Partly Cloudy', icon: '🌤️' },
    { day: 'Fri', temp: 26, weather: 'Thunderstorm', icon: '⛈️' },
  ]

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) || '[]')
    const savedHistory = JSON.parse(localStorage.getItem(STORAGE_KEYS.history) || '[]')
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || 'light'
    setFavorites(savedFavorites)
    setHistory(savedHistory)
    setTheme(savedTheme)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history))
  }, [history])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.theme, theme)
    document.body.dataset.theme = theme
  }, [theme])

  const weatherThemeClass = useMemo(() => {
    const description = (weatherDetails?.weather || '').toLowerCase()
    if (description.includes('rain') || description.includes('drizzle')) return 'weather-rain'
    if (description.includes('snow')) return 'weather-snow'
    if (description.includes('storm') || description.includes('thunder')) return 'weather-storm'
    if (description.includes('clear')) return 'weather-clear'
    return 'weather-cloudy'
  }, [weatherDetails])

  async function handleSearch(event) {
    event.preventDefault()

    const trimmedCity = city.trim()
    if (!trimmedCity) {
      setWeatherDetails(null)
      setErrorMessage('Please enter a city name.')
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      const response = await fetch(`http://127.0.0.1:8000/weather/${encodeURIComponent(trimmedCity)}`)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'City not found. Please try another location.')
      }

      const data = await response.json()
      setWeatherDetails(data)
      setHistory((prev) => [data.city, ...prev.filter((item) => item !== data.city)].slice(0, 6))
      setCity(data.city)
    } catch (error) {
      setWeatherDetails(null)
      setErrorMessage(error.message || 'Something went wrong while loading the weather.')
    } finally {
      setIsLoading(false)
    }
  }

  function toggleFavorite(cityName) {
    if (!cityName) return
    setFavorites((prev) => {
      if (prev.includes(cityName)) {
        return prev.filter((item) => item !== cityName)
      }
      return [...prev, cityName]
    })
  }

  return (
    <main className={`page-shell ${weatherThemeClass}`}>
      <section className="dashboard-card">
        <div className="dashboard-topbar">
          <h1 className="dashboard-title">Weather Dashboard</h1>
          <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        <SearchBar value={city} onChange={setCity} onSearch={handleSearch} />

        <div className="utility-row">
          <div className="favorites-list">
            <p className="section-label">Favorites</p>
            {favorites.length === 0 ? <span>No favorites yet</span> : favorites.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>

          <div className="history-list">
            <p className="section-label">Recent Searches</p>
            {history.length === 0 ? <span>No history yet</span> : history.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
        </div>

        <WeatherCard
          details={weatherDetails}
          isLoading={isLoading}
          errorMessage={errorMessage}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />

        <Forecast days={forecastDays} />
      </section>
    </main>
  )
}

export default App
