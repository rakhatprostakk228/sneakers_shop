import React, { Component } from 'react'
import { FaTimes, FaHeart, FaRegHeart, FaStar, FaShoppingCart } from 'react-icons/fa'
import Reviews from './Reviews'

export class ShowFullItem extends Component {
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
    const { item, onAdd, onShowItem, onWishlist, isInWishlist, reviews, onAddReview } = this.props
    
    return (
      <div className='full-item-overlay'>
        <div className='full-item'>
          <div className="full-item-header">
            <FaTimes className="close-btn" onClick={() => onShowItem(item)} />
          </div>
          
          <div className="full-item-content">
            <div className="full-item-image">
              <img src={"./img/" + item.img} alt={item.title} />
            </div>
            
            <div className="full-item-details">
              <h1>{item.title}</h1>
              
              <div className="rating-section">
                <div className="stars">
                  {this.renderStars(item.rating)}
                </div>
                <span className="rating-text">
                  {item.rating} ({item.reviews} отзывов)
                </span>
              </div>
              
              <p className="full-item-description">{item.desc}</p>
              
              <div className="price-section">
                <span className="price-label">Цена:</span>
                <b className="price">${item.price}</b>
              </div>
              
              <div className="stock-status">
                {item.inStock ? (
                  <span className="in-stock">✓ В наличии</span>
                ) : (
                  <span className="out-of-stock">✗ Нет в наличии</span>
                )}
              </div>
              
              <div className="action-buttons">
                {item.inStock && (
                  <button className='add-to-cart-full' onClick={() => onAdd(item)}>
                    <FaShoppingCart />
                    Добавить в корзину
                  </button>
                )}
                
                <button 
                  className={`wishlist-btn-full ${isInWishlist ? 'active' : ''}`}
                  onClick={() => onWishlist(item)}
                >
                  {isInWishlist ? <FaHeart /> : <FaRegHeart />}
                  {isInWishlist ? 'Убрать из избранного' : 'В избранное'}
                </button>
              </div>
              
              <div className="additional-info">
                <h3>Характеристики:</h3>
                <ul>
                  <li>Категория: {item.category}</li>
                  <li>Материал: Натуральная кожа</li>
                  <li>Подошва: Резина</li>
                  <li>Страна производства: Вьетнам</li>
                </ul>
              </div>
            </div>
          </div>
          
          <Reviews 
            itemId={item.id}
            reviews={reviews || []}
            onAddReview={onAddReview}
          />
        </div>
      </div>
    )
  }
}

export default ShowFullItem