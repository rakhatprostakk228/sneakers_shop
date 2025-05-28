import React, { useState } from 'react'
import { FaStar, FaUser } from 'react-icons/fa'

export default function Reviews({ itemId, reviews, onAddReview }) {
  const [showForm, setShowForm] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    author: ''
  })

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`star ${i <= rating ? 'filled' : ''} ${interactive ? 'interactive' : ''}`}
          onClick={interactive ? () => onRatingChange(i) : undefined}
        />
      )
    }
    return stars
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newReview.author.trim() && newReview.comment.trim()) {
      onAddReview(itemId, {
        ...newReview,
        id: Date.now(),
        date: new Date().toLocaleDateString()
      })
      setNewReview({ rating: 5, comment: '', author: '' })
      setShowForm(false)
    }
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h3>Отзывы ({reviews.length})</h3>
        {reviews.length > 0 && (
          <div className="average-rating">
            <div className="stars">
              {renderStars(Math.round(averageRating))}
            </div>
            <span>{averageRating}/5</span>
          </div>
        )}
        <button 
          className="add-review-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Отмена' : 'Написать отзыв'}
        </button>
      </div>

      {showForm && (
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ваше имя:</label>
            <input
              type="text"
              value={newReview.author}
              onChange={(e) => setNewReview({...newReview, author: e.target.value})}
              placeholder="Введите ваше имя"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Оценка:</label>
            <div className="rating-input">
              {renderStars(newReview.rating, true, (rating) => 
                setNewReview({...newReview, rating})
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label>Комментарий:</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              placeholder="Поделитесь своим мнением о товаре"
              rows="4"
              required
            />
          </div>
          
          <button type="submit" className="submit-review-btn">
            Опубликовать отзыв
          </button>
        </form>
      )}

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <div className="no-reviews">
            <p>Пока нет отзывов. Будьте первым!</p>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <FaUser className="user-icon" />
                  <span className="reviewer-name">{review.author}</span>
                </div>
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
                <span className="review-date">{review.date}</span>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}