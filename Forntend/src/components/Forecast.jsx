function Forecast({ days = [] }) {
  return (
    <section className="forecast-section">
      <h2 className="forecast-title">5-Day Forecast</h2>

      <div className="forecast-list">
        {days.map((day) => (
          <article key={day.day} className="forecast-card">
            <p className="forecast-day">{day.day}</p>
            <p className="forecast-icon" aria-hidden="true">{day.icon}</p>
            <p className="forecast-temp">{day.temp}°C</p>
            <p className="forecast-weather">{day.weather}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Forecast