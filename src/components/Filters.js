import React, { useState } from 'react'
import { FaFilter, FaTimes, FaStar } from 'react-icons/fa'

export default function Filters({ onFilterChange, onClear }) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: { min: '', max: '' },
    rating: 0,
    inStock: false,
    brand: ''
  })

  const brands = ['Nike', 'Adidas']

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePriceChange = (type, value) => {
    const newPriceRange = { ...filters.priceRange, [type]: value }
    const newFilters = { ...filters, priceRange: newPriceRange }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearAllFilters = () => {
    const defaultFilters = {
      priceRange: { min: '', max: '' },
      rating: 0,
      inStock: false,
      brand: ''
    }
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
    onClear()
  }

  const renderStars = (rating, onRatingChange) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`star ${i <= rating ? 'filled' : ''} interactive`}
          onClick={() => onRatingChange(i === rating ? 0 : i)}
        />
      )
    }
    return stars
  }

  const hasActiveFilters = () => {
    return filters.priceRange.min || filters.priceRange.max || 
           filters.rating > 0 || filters.inStock || filters.brand
  }

  return (
    <div className="filters-wrapper">
      <button 
        className={`filters-toggle ${hasActiveFilters() ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaFilter />
        Фильтры
        {hasActiveFilters() && <span className="filter-count">●</span>}
      </button>

      {isOpen && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3>Фильтры</h3>
            <div className="filters-actions">
              <button className="clear-filters" onClick={clearAllFilters}>
                Очистить все
              </button>
              <button className="close-filters" onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </div>
          </div>

          <div className="filters-content">
            <div className="filter-group">
              <h4>Цена</h4>
              <div className="price-range">
                <input
                  type="number"
                  placeholder="От"
                  value={filters.priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                />
                <span>—</span>
                <input
                  type="number"
                  placeholder="До"
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                />
              </div>
            </div>

            <div className="filter-group">
              <h4>Бренд</h4>
              <select 
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
              >
                <option value="">Все бренды</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <h4>Рейтинг от</h4>
              <div className="rating-filter">
                {renderStars(filters.rating, (rating) => handleFilterChange('rating', rating))}
                {filters.rating > 0 && (
                  <span className="rating-text">от {filters.rating} звезд</span>
                )}
              </div>
            </div>

            <div className="filter-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                />
                <span className="checkmark"></span>
                Только в наличии
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}