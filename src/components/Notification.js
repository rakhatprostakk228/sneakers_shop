import React, { useEffect } from 'react'
import { FaCheck, FaExclamationTriangle, FaInfo, FaTimes } from 'react-icons/fa'

export default function Notification({ type, message, onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheck />
      case 'warning':
        return <FaExclamationTriangle />
      case 'info':
        return <FaInfo />
      default:
        return <FaInfo />
    }
  }

  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-content">
        <div className="notification-icon">
          {getIcon()}
        </div>
        <span className="notification-message">{message}</span>
        <button className="notification-close" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
    </div>
  )
}

export function NotificationContainer({ notifications, onRemove }) {
  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          onClose={() => onRemove(notification.id)}
          duration={notification.duration}
        />
      ))}
    </div>
  )
}