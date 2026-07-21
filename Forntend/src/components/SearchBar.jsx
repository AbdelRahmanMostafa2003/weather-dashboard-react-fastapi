function SearchBar({ value, onChange, onSearch }) {
  return (
    <form className="search-bar" onSubmit={onSearch}>
      {/* Text field for entering a city name */}
      <input
        className="search-input"
        type="text"
        placeholder="Enter city..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />

      {/* Search button for the form */}
      <button className="search-button" type="submit">
        Search
      </button>
    </form>
  )
}

export default SearchBar