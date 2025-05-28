import React, { Component } from 'react'

export class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [
                {
                    key: 'all',
                    name: 'Все товары'
                },
                {
                    key: 'Nike',
                    name: 'Nike'
                },
                {
                    key: 'Adidas',
                    name: 'Adidas'
                }
            ]
        }
    }
  render() {
    return (
      <div className='categories'>
        {this.state.categories.map(el => (
            <div 
              key={el.key} 
              className={`category ${this.props.selectedCategory === el.key ? 'active' : ''}`}
              onClick={() => this.props.chooseCategory(el.key)}
            >
              {el.name}
            </div>
        ))}
      </div>
    )
  }
}

export default Categories