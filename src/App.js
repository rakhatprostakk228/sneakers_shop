import React from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Items from "./components/Items"
import Categories from "./components/Categories"
import ShowFullItem from "./components/ShowFullItem"
import Search from "./components/Search"
import Sort from "./components/Sort"
import Pagination from "./components/Pagination"
import Checkout from "./components/Checkout"
import Wishlist from "./components/Wishlist"
import ThemeToggle from "./components/ThemeToggle"
import Filters from "./components/Filters"
import Reviews from "./components/Reviews"
import { NotificationContainer } from "./components/Notification"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: JSON.parse(localStorage.getItem('cart')) || [],
      wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
      currentItems: [],
      allItems: [
        {
          id: 1,
          title: 'Air Jordan 1 Low OG Reverse Mocha',
          img: 'mocha.jpeg',
          desc: 'Brown, light beige, leather, Nike Swoosh logo, Air Jordan Wings logo, rounded toe, lace-up front, logo patch on the tongue, logo insole and rubber sole.',
          category: 'Nike',
          price: 1591,
          rating: 4.8,
          reviews: 245,
          inStock: true
        },
        {
          id: 2,
          title: "Dunk Low Retro PRM Valentine's Day 2023",
          img: 'valentine.jpg',
          desc: 'Burgundy, cream white, pink, leather, Nike Swoosh logo, embroidered logo on the back, rounded toe, lacing on the front, logo patch on the tongue, logo insole and rubber sole.',
          category: 'Nike',
          price: 111,
          rating: 4.5,
          reviews: 189,
          inStock: true
        },
        {
          id: 3,
          title: 'Dunk Low Retro Panda',
          img: 'dunk-panda.jpg',
          desc: 'White, Black Leather Rounded Toe Flat Rubber Outsole Lace-up Front Insole with Nike Swoosh Logo.',
          category: 'Nike',
          price: 103,
          rating: 4.9,
          reviews: 567,
          inStock: false
        },
        {
          id: 4,
          title: "Nike x Travis Scott Air Force 1 Low '07 Utopia Edition",
          img: 'utopia.jpg',
          desc: 'These styles are supplied by a premium sneaker marketplace. Stocking only the most sought-after footwear, they source and curate some of the most hard to find sneakers from around the world.',
          category: 'Nike',
          price: 148,
          rating: 4.7,
          reviews: 89,
          inStock: true
        },
        {
          id: 5,
          title: 'Air Jordan 1 Low OG Olive',
          img: 'olive.jpg',
          desc: 'Black, white, olive green, calfskin, Nike Swoosh logo, Air Jordan Wings logo, rounded toe, lace-up front, logo patch on the tongue, logo insole and rubber sole.',
          category: 'Nike',
          price: 892,
          rating: 4.6,
          reviews: 134,
          inStock: true
        },
        {
          id: 6,
          title: 'Adidas Forum 84',
          img: 'forum.jpg',
          desc: 'Grey/white, calfskin, inserts, perforated toe, iconic 3-Stripes logo, logo patch on the tongue, embossed logo on the side, logo on the sole, rounded toe, lacing in front.',
          category: 'Adidas',
          price: 148,
          rating: 4.4,
          reviews: 298,
          inStock: true
        },
        {
          id: 7,
          title: 'Adidas Stan Smith',
          img: 'stansmith.jpg',
          desc: 'Classic white leather tennis shoe with green accents, perforated 3-Stripes, iconic minimalist design.',
          category: 'Adidas',
          price: 85,
          rating: 4.7,
          reviews: 1245,
          inStock: true
        },
        {
          id: 8,
          title: 'Adidas Ultraboost 22',
          img: 'ultraboost.jpg',
          desc: 'Premium running shoe with Boost midsole technology, Primeknit upper, continental rubber outsole.',
          category: 'Adidas',
          price: 180,
          rating: 4.6,
          reviews: 687,
          inStock: true
        }
      ],
      showFullItem: false,
      showCheckout: false,
      showWishlist: false,
      fullItem: {},
      searchQuery: '',
      sortBy: 'default',
      currentPage: 1,
      itemsPerPage: 6,
      selectedCategory: 'all',
      darkTheme: JSON.parse(localStorage.getItem('darkTheme')) || false,
      cartItemCounts: JSON.parse(localStorage.getItem('cartItemCounts')) || {},
      filters: {
        priceRange: { min: '', max: '' },
        rating: 0,
        inStock: false,
        brand: ''
      },
      notifications: [],
      itemReviews: JSON.parse(localStorage.getItem('itemReviews')) || {}
    }
    
    this.updateCurrentItems()
    this.addToOrder = this.addToOrder.bind(this)
    this.deleteOrder = this.deleteOrder.bind(this)
    this.chooseCategory = this.chooseCategory.bind(this)
    this.onShowItem = this.onShowItem.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.toggleWishlist = this.toggleWishlist.bind(this)
    this.toggleTheme = this.toggleTheme.bind(this)
    this.updateCartItemCount = this.updateCartItemCount.bind(this)
    this.proceedToCheckout = this.proceedToCheckout.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.addNotification = this.addNotification.bind(this)
    this.removeNotification = this.removeNotification.bind(this)
    this.addReview = this.addReview.bind(this)
  }

  componentDidMount() {
    if (this.state.darkTheme) {
      document.body.classList.add('dark-theme')
    }
  }

  addNotification(type, message, duration = 3000) {
    const notification = {
      id: Date.now(),
      type,
      message,
      duration
    }
    this.setState(prevState => ({
      notifications: [...prevState.notifications, notification]
    }))
  }

  removeNotification(id) {
    this.setState(prevState => ({
      notifications: prevState.notifications.filter(n => n.id !== id)
    }))
  }

  addReview(itemId, review) {
    const newReviews = {
      ...this.state.itemReviews,
      [itemId]: [...(this.state.itemReviews[itemId] || []), review]
    }
    this.setState({ itemReviews: newReviews })
    localStorage.setItem('itemReviews', JSON.stringify(newReviews))
    this.addNotification('success', 'Отзыв добавлен!')
  }

  applyFilters(items) {
    const { filters } = this.state
    
    return items.filter(item => {
      if (filters.priceRange.min && item.price < parseFloat(filters.priceRange.min)) return false
      if (filters.priceRange.max && item.price > parseFloat(filters.priceRange.max)) return false
      if (filters.rating && item.rating < filters.rating) return false
      if (filters.inStock && !item.inStock) return false
      if (filters.brand && item.category !== filters.brand) return false
      return true
    })
  }

  updateCurrentItems() {
    let items = [...this.state.allItems]
    
    if (this.state.selectedCategory !== 'all') {
      items = items.filter(item => item.category === this.state.selectedCategory)
    }
    
    if (this.state.searchQuery) {
      items = items.filter(item => 
        item.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(this.state.searchQuery.toLowerCase())
      )
    }
    
    items = this.applyFilters(items)
    
    switch (this.state.sortBy) {
      case 'price-low':
        items.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        items.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        items.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        items.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }
    
    this.setState({ currentItems: items, currentPage: 1 })
  }

  handleFilterChange(newFilters) {
    this.setState({ filters: newFilters }, () => {
      this.updateCurrentItems()
    })
  }

  render() {
    const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage
    const endIndex = startIndex + this.state.itemsPerPage
    const currentPageItems = this.state.currentItems.slice(startIndex, endIndex)
    const totalPages = Math.ceil(this.state.currentItems.length / this.state.itemsPerPage)

    return (
      <div className={`wrapper ${this.state.darkTheme ? 'dark-theme' : ''}`}>
        <Header 
          orders={this.state.orders} 
          onDelete={this.deleteOrder}
          cartItemCounts={this.state.cartItemCounts}
          onCheckout={this.proceedToCheckout}
          onToggleWishlist={() => this.setState({showWishlist: !this.state.showWishlist})}
          wishlistCount={this.state.wishlist.length}
        />
        
        <div className="controls">
          <Search onSearch={this.handleSearch} />
          <Filters 
            onFilterChange={this.handleFilterChange}
            onClear={() => this.setState({ filters: { priceRange: { min: '', max: '' }, rating: 0, inStock: false, brand: '' } })}
          />
          <Sort onSort={this.handleSort} />
          <ThemeToggle darkTheme={this.state.darkTheme} onToggle={this.toggleTheme} />
        </div>
        
        <Categories chooseCategory={this.chooseCategory} selectedCategory={this.state.selectedCategory} />
        
        <Items 
          onShowItem={this.onShowItem} 
          items={currentPageItems} 
          onAdd={this.addToOrder}
          onWishlist={this.toggleWishlist}
          wishlist={this.state.wishlist}
          cartItemCounts={this.state.cartItemCounts}
          onUpdateCount={this.updateCartItemCount}
        />

        {totalPages > 1 && (
          <Pagination 
            currentPage={this.state.currentPage}
            totalPages={totalPages}
            onPageChange={this.handlePageChange}
          />
        )}

        {this.state.showFullItem && (
          <ShowFullItem 
            onAdd={this.addToOrder} 
            onShowItem={this.onShowItem} 
            item={this.state.fullItem}
            onWishlist={this.toggleWishlist}
            isInWishlist={this.state.wishlist.some(w => w.id === this.state.fullItem.id)}
            reviews={this.state.itemReviews[this.state.fullItem.id] || []}
            onAddReview={this.addReview}
          />
        )}

        {this.state.showCheckout && (
          <Checkout 
            orders={this.state.orders}
            onClose={() => this.setState({showCheckout: false})}
            onOrderComplete={() => {
              this.setState({orders: [], cartItemCounts: {}, showCheckout: false})
              localStorage.removeItem('cart')
              localStorage.removeItem('cartItemCounts')
              this.addNotification('success', 'Заказ успешно оформлен!')
            }}
          />
        )}

        {this.state.showWishlist && (
          <Wishlist 
            wishlist={this.state.wishlist}
            onClose={() => this.setState({showWishlist: false})}
            onRemove={this.toggleWishlist}
            onAddToCart={this.addToOrder}
          />
        )}

        <NotificationContainer 
          notifications={this.state.notifications}
          onRemove={this.removeNotification}
        />

        <Footer />
      </div>
    )
  }

  proceedToCheckout() {
    if (this.state.orders.length === 0) {
      this.addNotification('warning', 'Корзина пуста!')
      return
    }
    this.setState({showCheckout: true})
  }

  toggleTheme() {
    const newTheme = !this.state.darkTheme
    this.setState({darkTheme: newTheme})
    localStorage.setItem('darkTheme', JSON.stringify(newTheme))
    if (newTheme) {
      document.body.classList.add('dark-theme')
    } else {
      document.body.classList.remove('dark-theme')
    }
    this.addNotification('info', `Переключено на ${newTheme ? 'темную' : 'светлую'} тему`)
  }

  toggleWishlist(item) {
    const isInWishlist = this.state.wishlist.some(w => w.id === item.id)
    let newWishlist
    
    if (isInWishlist) {
      newWishlist = this.state.wishlist.filter(w => w.id !== item.id)
      this.addNotification('info', 'Товар удален из избранного')
    } else {
      newWishlist = [...this.state.wishlist, item]
      this.addNotification('success', 'Товар добавлен в избранное')
    }
    
    this.setState({wishlist: newWishlist})
    localStorage.setItem('wishlist', JSON.stringify(newWishlist))
  }

  updateCartItemCount(itemId, count) {
    const newCounts = {...this.state.cartItemCounts}
    if (count <= 0) {
      delete newCounts[itemId]
      this.setState({
        cartItemCounts: newCounts,
        orders: this.state.orders.filter(order => order.id !== itemId)
      })
      this.addNotification('info', 'Товар удален из корзины')
    } else {
      newCounts[itemId] = count
      this.setState({cartItemCounts: newCounts})
    }
    localStorage.setItem('cartItemCounts', JSON.stringify(newCounts))
    localStorage.setItem('cart', JSON.stringify(this.state.orders))
  }

  handlePageChange(page) {
    this.setState({currentPage: page})
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  handleSearch(query) {
    this.setState({searchQuery: query}, () => {
      this.updateCurrentItems()
    })
  }

  handleSort(sortBy) {
    this.setState({sortBy}, () => {
      this.updateCurrentItems()
    })
  }

  onShowItem(item) {
    this.setState({fullItem: item})
    this.setState({showFullItem: !this.state.showFullItem})
  }

  chooseCategory(category) {
    this.setState({selectedCategory: category}, () => {
      this.updateCurrentItems()
    })
  }

  deleteOrder(id) {
    const newOrders = this.state.orders.filter(el => el.id !== id)
    const newCounts = {...this.state.cartItemCounts}
    delete newCounts[id]
    
    this.setState({orders: newOrders, cartItemCounts: newCounts})
    localStorage.setItem('cart', JSON.stringify(newOrders))
    localStorage.setItem('cartItemCounts', JSON.stringify(newCounts))
    this.addNotification('info', 'Товар удален из корзины')
  }

  addToOrder(item) {
    if (!item.inStock) {
      this.addNotification('warning', 'Товар отсутствует в наличии')
      return
    }

    const isInArray = this.state.orders.some(el => el.id === item.id)
    const currentCount = this.state.cartItemCounts[item.id] || 0
    
    if (!isInArray) {
      const newOrders = [...this.state.orders, item]
      const newCounts = {...this.state.cartItemCounts, [item.id]: 1}
      
      this.setState({orders: newOrders, cartItemCounts: newCounts})
      localStorage.setItem('cart', JSON.stringify(newOrders))
      localStorage.setItem('cartItemCounts', JSON.stringify(newCounts))
      this.addNotification('success', 'Товар добавлен в корзину')
    } else {
      this.updateCartItemCount(item.id, currentCount + 1)
      this.addNotification('success', 'Количество товара увеличено')
    }
  }
}

export default App