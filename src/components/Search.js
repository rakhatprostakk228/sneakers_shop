import React, { useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

export default function Search({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  const clearSearch = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Поиск товаров..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        {query && (
          <FaTimes className="clear-search" onClick={clearSearch} />
        )}
      </div>
    </form>
  )
}