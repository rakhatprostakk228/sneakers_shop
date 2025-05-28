import React from 'react'
import { FaTimes, FaShoppingCart, FaTrash } from 'react-icons/fa'

export default function Wishlist({ wishlist, onClose, onRemove, onAddToCart }) {
  return (
    <div className="wishlist-overlay">
      <div className="wishlist-modal">
        <div className="wishlist-header">
          <h2>Избранное</h2>
          <FaTimes className="close-btn" onClick={onClose} />
        </div>
        
        <div className="wishlist-content">
          {wishlist.length === 0 ? (
            <div className="empty-wishlist">
              <h3>Ваш список избранного пуст</h3>
              <p>Добавьте товары, нажав на иконку сердца</p>
            </div>
          ) : (
            <div className="wishlist-items">
              {wishlist.map(item => (
                <div key={item.id} className="wishlist-item">
                  <img src={"./img/" + item.img} alt={item.title} />
                  <div className="wishlist-item-details">
                    <h3>{item.title}</h3>
                    <p className="wishlist-item-price">${item.price}</p>
                    <div className="wishlist-item-actions">
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => onAddToCart(item)}
                        disabled={!item.inStock}
                      >
                        <FaShoppingCart />
                        {item.inStock ? 'В корзину' : 'Нет в наличии'}
                      </button>
                      <button 
                        className="remove-btn"
                        onClick={() => onRemove(item)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}