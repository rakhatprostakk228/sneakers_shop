import React from 'react'
import { FaSort } from 'react-icons/fa'

export default function Sort({ onSort }) {
  return (
    <div className="sort-wrapper">
      <FaSort className="sort-icon" />
      <select onChange={(e) => onSort(e.target.value)} className="sort-select">
        <option value="default">По умолчанию</option>
        <option value="price-low">Цена: по возрастанию</option>
        <option value="price-high">Цена: по убыванию</option>
        <option value="rating">По рейтингу</option>
        <option value="name">По названию</option>
      </select>
    </div>
  )
}