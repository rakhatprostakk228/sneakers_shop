import React, { Component } from 'react'
import { FaHeart, FaRegHeart, FaStar, FaPlus, FaMinus } from 'react-icons/fa'

export class Item extends Component {
  renderStars(rating) {
    const stars = []
    const fullStars = Math.floor(rating)
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={i < fullStars ? 'star filled' : 'star'} 
        />
      )
    }
    return stars
  }

  render() {
    const { item, onShowItem, onAdd, onWishlist, wishlist, cartItemCounts, onUpdateCount } = this.props
    const isInWishlist = wishlist.some(w => w.id === item.id)
    const cartCount = cartItemCounts[item.id] || 0

    return (
      <div className={`item ${!item.inStock ? 'out-of-stock' : ''}`}>
        <div className="item-image-wrapper">
          <img 
            src={"./img/" + item.img} 
            onClick={() => onShowItem(item)}
            alt={item.title}
          />
          <div className="wishlist-btn" onClick={() => onWishlist(item)}>
            {isInWishlist ? <FaHeart className="heart-filled" /> : <FaRegHeart />}
          </div>
          {!item.inStock && <div className="out-of-stock-badge">Нет в наличии</div>}
        </div>
        
        <div className="item-content">
          <h2>{item.title}</h2>
          <p className="item-description">{item.desc}</p>
          
          <div className="rating">
            <div className="stars">
              {this.renderStars(item.rating)}
            </div>
            <span className="rating-text">
              {item.rating} ({item.reviews} отзывов)
            </span>
          </div>
          
          <div className="price-section">
            <b className="price">${item.price}</b>
          </div>
          
          {item.inStock && (
            <div className="cart-controls">
              {cartCount > 0 ? (
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => onUpdateCount(item.id, cartCount - 1)}
                  >
                    <FaMinus />
                  </button>
                  <span className="quantity">{cartCount}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => onUpdateCount(item.id, cartCount + 1)}
                  >
                    <FaPlus />
                  </button>
                </div>
              ) : (
                <button className="add-to-cart" onClick={() => onAdd(item)}>
                  <FaPlus />
                  <span>В корзину</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Item