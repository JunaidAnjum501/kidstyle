import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react'

const WishlistPage = () => {
  // Mock wishlist data
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Colorful Striped T-Shirt',
      price: 24.99,
      originalPrice: 29.99,
      image: 'https://via.placeholder.com/300x400',
      rating: 4.5,
      reviewCount: 28,
      inStock: true,
      colors: ['blue', 'red', 'green'],
      sizes: ['2T', '3T', '4T', '5T']
    },
    {
      id: 2,
      name: 'Denim Overall Shorts',
      price: 39.99,
      originalPrice: 39.99,
      image: 'https://via.placeholder.com/300x400',
      rating: 4.8,
      reviewCount: 42,
      inStock: true,
      colors: ['blue', 'light-blue'],
      sizes: ['2T', '3T', '4T', '5T']
    },
    {
      id: 3,
      name: 'Dinosaur Print Pajama Set',
      price: 29.99,
      originalPrice: 34.99,
      image: 'https://via.placeholder.com/300x400',
      rating: 4.7,
      reviewCount: 36,
      inStock: false,
      colors: ['green', 'blue'],
      sizes: ['2-3Y', '4-5Y', '6-7Y']
    },
    {
      id: 4,
      name: 'Floral Summer Dress',
      price: 32.99,
      originalPrice: 32.99,
      image: 'https://via.placeholder.com/300x400',
      rating: 4.6,
      reviewCount: 19,
      inStock: true,
      colors: ['pink', 'yellow', 'white'],
      sizes: ['2T', '3T', '4T', '5T']
    }
  ])
  
  // Handle remove from wishlist
  const handleRemove = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id))
  }
  
  // Handle add to cart
  const handleAddToCart = (item) => {
    // In a real app, you would add to cart logic here
    console.log('Added to cart:', item)
    
    // Show a success message (in a real app, this would be a toast notification)
    alert(`${item.name} added to your cart!`)
    
    // Optionally remove from wishlist
    // handleRemove(item.id)
  }
  
  // Format price
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`
  }
  
  // Render star rating
  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        <Star className="h-4 w-4 text-yellow-400 fill-current" />
        <span className="ml-1 text-sm font-medium">{rating}</span>
      </div>
    )
  }
  
  // Render color options
  const renderColorOptions = (colors) => {
    return (
      <div className="flex space-x-1">
        {colors.map((color, index) => (
          <div 
            key={index}
            className="w-4 h-4 rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    )
  }
  
  return (
    <div>
      <div className="flex justify-between items-center m-6">
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        <span className="text-gray-500">{wishlistItems.length} items</span>
      </div>
      
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-4">
          {wishlistItems.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <Link to={`/products/${item.id}`}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-64 object-cover"
                  />
                </Link>
                
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  title="Remove from wishlist"
                >
                  <Heart className="h-5 w-5 text-primary-600 fill-current" />
                </button>
                
                {item.originalPrice > item.price && (
                  <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded">
                    Sale
                  </div>
                )}
                
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <span className="bg-white text-gray-800 px-4 py-2 rounded-md font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <Link to={`/products/${item.id}`} className="block mb-1">
                  <h3 className="font-medium text-gray-900 hover:text-primary-600 transition-colors">
                    {item.name}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {item.originalPrice > item.price ? (
                      <>
                        <span className="font-bold text-primary-600">{formatPrice(item.price)}</span>
                        <span className="ml-2 text-sm text-gray-500 line-through">{formatPrice(item.originalPrice)}</span>
                      </>
                    ) : (
                      <span className="font-bold">{formatPrice(item.price)}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    {renderRating(item.rating)}
                    <span className="ml-1 text-xs text-gray-500">({item.reviewCount})</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Colors:</p>
                    {renderColorOptions(item.colors)}
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Sizes:</p>
                    <p className="text-sm">{item.sizes.join(', ')}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.inStock}
                  className={`w-full flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors ${item.inStock ? 'bg-primary-600 hover:bg-primary-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
          <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-6">Save your favorite items to your wishlist.</p>
          <Link 
            to="/products" 
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-md text-white font-medium transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  )
}

export default WishlistPage