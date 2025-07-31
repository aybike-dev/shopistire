import { useState } from 'react'
import './SearchBar.css'

const SearchBar = ({ onSearch, searchQuery }) => {
  const [query, setQuery] = useState(searchQuery || '')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }
  
  const handleClear = () => {
    setQuery('')
    onSearch('')
  }
  
  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Ürün ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-search-btn"
              aria-label="Aramayı temizle"
            >
              ✕
            </button>
          )}
        </div>
        <button type="submit" className="search-btn">
          🔍 Ara
        </button>
      </form>
    </div>
  )
}

export default SearchBar
