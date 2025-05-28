import React, { Component } from 'react'
import Item from './Item'

export class Items extends Component {
  render() {
    const { items, onShowItem, onAdd, onWishlist, wishlist, cartItemCounts, onUpdateCount } = this.props
    
    if (items.length === 0) {
      return (
        <main className="items-container">
          <div className="no-items">
            <h2>Товары не найдены</h2>
            <p>Попробуйте изменить параметры поиска или фильтры</p>
          </div>
        </main>
      )
    }

    return (
      <main className="items-container">
        <div className="items-grid">
          {items.map(el => (
            <Item 
              key={el.id}
              onShowItem={onShowItem} 
              item={el} 
              onAdd={onAdd}
              onWishlist={onWishlist}
              wishlist={wishlist}
              cartItemCounts={cartItemCounts}
              onUpdateCount={onUpdateCount}
            />
          ))}
        </div>
      </main>
    )
  }
}

export default Items