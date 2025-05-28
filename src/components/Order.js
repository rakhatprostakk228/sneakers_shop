import React, { Component } from 'react'
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'

export class Order extends Component {
  render() {
    const { item, count, onDelete, onUpdateCount } = this.props
    
    return (
      <div className='order-item'>
        <img src={"./img/" + item.img} alt={item.title} />
        <div className="order-details">
          <h3>{item.title}</h3>
          <div className="order-controls">
            <div className="quantity-controls">
              <button 
                className="quantity-btn"
                onClick={() => onUpdateCount(item.id, count - 1)}
              >
                <FaMinus />
              </button>
              <span className="quantity">{count}</span>
              <button 
                className="quantity-btn"
                onClick={() => onUpdateCount(item.id, count + 1)}
              >
                <FaPlus />
              </button>
            </div>
            <b className="item-price">${(item.price * count).toFixed(2)}</b>
            <FaTrash 
              className='delete-icon' 
              onClick={() => onDelete(item.id)}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Order