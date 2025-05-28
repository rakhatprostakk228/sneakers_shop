import React from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

export default function ThemeToggle({ darkTheme, onToggle }) {
  return (
    <div className="theme-toggle" onClick={onToggle}>
      {darkTheme ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
      <span>{darkTheme ? 'Светлая тема' : 'Темная тема'}</span>
    </div>
  )
}