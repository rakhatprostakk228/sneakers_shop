import React, { useState } from 'react'
import { FaShoppingBasket, FaHeart, FaUser } from "react-icons/fa"
import Order from './Order'

const showOrders = (props) => {
  let summa = 0
  props.orders.forEach(el => {
    const count = props.cartItemCounts[el.id] || 1
    summa += Number.parseFloat(el.price) * count
  })
  
  return (
    <div>
      {props.orders.map(el => (
        <Order 
          onDelete={props.onDelete} 
          key={el.id} 
          item={el}
          count={props.cartItemCounts[el.id] || 1}
          onUpdateCount={props.onUpdateCount}
        />
      ))}
      <div className="cart-total">
        <p className='summa'>Итого: ${new Intl.NumberFormat().format(summa)}</p>
        <button className="checkout-btn" onClick={props.onCheckout}>
          Оформить заказ
        </button>
      </div>
    </div>
  )
}

const showNothing = () => {
  return (
    <div className='empty'>
      <h2>Корзина пуста</h2>
      <p>Добавьте товары для покупки</p>
    </div>
  )
}

export default function Header(props) {
  let [cartOpen, setCartOpen] = useState(false)
  
  const getTotalItems = () => {
    return Object.values(props.cartItemCounts).reduce((sum, count) => sum + count, 0)
  }

  return (
    <header>
      <div className="header-content">
        <div className="header-left">
          <span className='logo'>Sneakers Shop</span>
        </div>
        
        <ul className='nav'>
          <li>О нас</li>
          <li>Контакты</li>
          <li><FaUser className="nav-icon" /> Профиль</li>
        </ul>
        
        <div className="header-actions">
          <div className="wishlist-icon-wrapper" onClick={props.onToggleWishlist}>
            <FaHeart className="header-icon" />
            {props.wishlistCount > 0 && (
              <span className="badge">{props.wishlistCount}</span>
            )}
          </div>
          
          <div className="cart-icon-wrapper">
            <FaShoppingBasket 
              onClick={() => setCartOpen(!cartOpen)} 
              className={`shop-cart-button ${cartOpen && 'active'}`}
            />
            {getTotalItems() > 0 && (
              <span className="badge">{getTotalItems()}</span>
            )}
          </div>
          
          {cartOpen && (
            <div className='shop-cart'>
              {props.orders.length > 0 ? 
                showOrders({
                  ...props,
                  onUpdateCount: (itemId, count) => {
                    if (count <= 0) {
                      props.onDelete(itemId)
                    } else {
                      props.onUpdateCount && props.onUpdateCount(itemId, count)
                    }
                  }
                }) : showNothing()
              }
            </div>
          )}
        </div>
      </div>
      
      <div className='presentation'>
        <div className="presentation-content">
          <h1>Лучшие кроссовки</h1>
          <p>Найди свой стиль в нашей коллекции премиальных кроссовок</p>
        </div>
      </div>
    </header>
  )
}