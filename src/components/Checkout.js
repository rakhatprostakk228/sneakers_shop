import React, { useState } from 'react'
import { FaTimes, FaCreditCard, FaCheck } from 'react-icons/fa'

export default function Checkout({ orders, onClose, onOrderComplete }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })
  
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)

  const calculateTotal = () => {
    return orders.reduce((sum, item) => sum + item.price, 0)
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Введите имя'
    if (!formData.lastName.trim()) newErrors.lastName = 'Введите фамилию'
    if (!formData.email.trim()) newErrors.email = 'Введите email'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Неверный формат email'
    if (!formData.phone.trim()) newErrors.phone = 'Введите телефон'
    if (!formData.address.trim()) newErrors.address = 'Введите адрес'
    if (!formData.city.trim()) newErrors.city = 'Введите город'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Введите индекс'
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Введите номер карты'
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Введите срок действия'
    if (!formData.cvv.trim()) newErrors.cvv = 'Введите CVV'
    if (!formData.cardName.trim()) newErrors.cardName = 'Введите имя владельца карты'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsProcessing(true)
    
    setTimeout(() => {
      setIsProcessing(false)
      setOrderCompleted(true)
      
      setTimeout(() => {
        onOrderComplete()
      }, 2000)
    }, 3000)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  if (orderCompleted) {
    return (
      <div className="checkout-overlay">
        <div className="checkout-modal success">
          <FaCheck className="success-icon" />
          <h2>Заказ успешно оформлен!</h2>
          <p>Спасибо за покупку. Ваш заказ будет доставлен в течение 3-5 рабочих дней.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-overlay">
      <div className="checkout-modal">
        <div className="checkout-header">
          <h2>Оформление заказа</h2>
          <FaTimes className="close-btn" onClick={onClose} />
        </div>
        
        <div className="checkout-content">
          <div className="order-summary">
            <h3>Ваш заказ</h3>
            {orders.map(item => (
              <div key={item.id} className="checkout-item">
                <img src={"./img/" + item.img} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <b>${item.price}</b>
                </div>
              </div>
            ))}
            <div className="total">
              <h3>Итого: ${calculateTotal()}</h3>
            </div>
          </div>
          
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Контактная информация</h3>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Имя"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Фамилия"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>
            
            <div className="form-section">
              <h3>Адрес доставки</h3>
              <div className="form-group">
                <input
                  type="text"
                  name="address"
                  placeholder="Адрес"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="city"
                    placeholder="Город"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Индекс"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={errors.zipCode ? 'error' : ''}
                  />
                  {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
                </div>
              </div>
            </div>
            
            <div className="form-section">
              <h3><FaCreditCard /> Оплата</h3>
              <div className="form-group">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Номер карты"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className={errors.cardNumber ? 'error' : ''}
                />
                {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className={errors.expiryDate ? 'error' : ''}
                  />
                  {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className={errors.cvv ? 'error' : ''}
                  />
                  {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                </div>
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  name="cardName"
                  placeholder="Имя владельца карты"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className={errors.cardName ? 'error' : ''}
                />
                {errors.cardName && <span className="error-text">{errors.cardName}</span>}
              </div>
            </div>
            
            <button 
              type="submit" 
              className="submit-order-btn"
              disabled={isProcessing}
            >
              {isProcessing ? 'Обработка...' : `Оплатить $${calculateTotal()}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}